# TradeAgent — AI Market Analysis Agent

> A read-only market analysis agent: it collects candle history, computes indicators deterministically, and produces auditable entry/exit/risk proposals for a market strategy.
>
> **The agent can read. The agent can analyze. The agent cannot trade.**

---

## Overview

TradeAgent maintains an up-to-date local record of candle history for the symbols and timeframes a strategy needs, then hands pre-computed data to an AI reasoning layer (**Hermes**) that evaluates the strategy and proposes trades — proposals only, never executions.

The system is **strategy-driven**: nothing is hardcoded in the core. A strategy is one folder with two files — `strategy.md` (the rules, readable by humans and by the agent) and `config.py` (the executable twin: symbols, timeframes, minimum candles, indicator functions, risk parameters). The core requires the symbols and timeframes from the config, fetches exactly those, computes the indicators in code, and only then lets the AI reason over finished numbers. If the two files disagree, the run fails loudly instead of analyzing with silently missing requirements.

---

## Key Features

1. **Two-file strategy contract** — `strategy.md` rules + `config.py` executable requirements; the loader validates the config side (symbols, timeframe/min-candle consistency, unique indicator names) and a template spells out the cross-file agreement the author must keep.
2. **Four market-data backends** behind one `MarketDataProvider` interface — CCXT (live exchange), Yahoo Finance via `yfinance`, a MetaTrader 5 terminal (Windows), and a file-backed provider for offline replay. Exactly one provider per run.
3. **Deterministic indicator layer** — indicator functions (`ema`, `rsi`, `atr`, `sma`, …) imported from a library and applied per declared timeframe; the AI never performs calculations on raw candles.
4. **Per-timeframe Parquet stores** — one isolated file per `(symbol, timeframe)` under `data/market/` holding candles **plus** their indicator columns; incremental sync, stored rows win over re-fetched duplicates, gap back-fill, continuity validation (`ContinuityError` on an irreparable hole) and no unfinished candle ever stored.
5. **Hermes — the reasoning layer** — a scripted backend (tests/replay, no API key) or a live LLM backend (`TRADEAGENT_LLM_*`, any OpenAI-compatible server or Anthropic over raw `httpx`) with a bounded tool-call loop, structured schema-validated proposals and an interactive multi-turn mode.
6. **Pre-checks and a deterministic risk engine** — data present, candles closed, indicator values and R/R arithmetic checked in code *before* the agent is called; position sizing from `EQUITY × RISK_PER_TRADE` with max-risk and minimum risk/reward gates that can reject any proposal regardless of what the AI says.
7. **Agent-owned analysis workspace** — `data/analysis/<symbol>/` with `registry.md` (CANDIDATE / OPEN / CLOSED rows), per-position folders (`checklist.md` + analyses) and knowledge files the agent reads and writes itself — manual open/close only, nothing executes orders.
8. **Split runs + built-in scheduler** — `sync` (network, collection only), `analyze` (offline, zero provider calls), `run` (the combined cycle) and `scheduler` (cron-style loop over `schedule.toml`, honoring the agent's own bounded `set_next_run` override).
9. **Full audit trail** — one JSON record per run under `data/runs/`: run id, clock, strategy slug + version, snapshot refs, the rendered instruction (path, sha256, prompts), agent output, decision, risk result and the backend that ran it.
10. **chartbridge** — a FastAPI bridge + expert advisor that draws the agent's market-structure reading (trendlines first) directly on a live MetaTrader 5 chart.

---

## Architecture

```text
 Strategy (two files)
   strategy.md    rules & requirements      (humans + agent)
   config.py      executable requirements   (the only thing the core reads)
        │
        ▼
 Market Data Provider ─────────────▶ Per-timeframe store
 CCXT · Yahoo · MT5 · file           data/market/<symbol>/<tf>.parquet
        │                                      │
        ▼                                      ▼
 sync    fetch → drop forming candle → continuity back-fill
         → recalculate indicators → save → sync-*.json
        │
        ▼
 analyze (offline, no network)
   snapshots + deterministic pre-checks ──▶ Hermes
                                             (scripted | live LLM)
                                                   │
        NO_TRADE · HOLD · ENTRY_CANDIDATE · EXIT_CANDIDATE
                                                   │
                                                   ▼
                              risk engine  PASS / REJECT
                                   │
                                   ▼
                    final proposal + audit record (data/runs/)
                    agent workspace updated (data/analysis/)
                                   │
                                   ▼
                    NOT EXECUTED — the agent cannot trade
```

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Language | Python 3.12 |
| Data & indicators | pandas, pandas-ta-classic, pyarrow (Parquet) |
| Market data | CCXT, yfinance, MetaTrader5 |
| Schemas & validation | pydantic |
| AI backends | httpx → OpenAI-compatible + Anthropic APIs (no SDK) |
| Chart bridge | FastAPI, Uvicorn |
| Configuration | `.env` (auto-loaded), `schedule.toml`, `logging.toml` |
| Packaging | setuptools — `tradeagent` console script, wheels & release bundles |
| Containers | Docker, docker compose |
| Quality | pytest (920 tests, offline), ruff, GitHub Actions CI |

---

## Quick Start

```bash
# install (from a source checkout, a wheel, or a release bundle)
python3 -m venv venv && source venv/bin/activate
pip install .
cp .env.example .env             # LLM keys, provider, directory overrides

# verify
tradeagent --help                # sync / analyze / run / scheduler
pytest -q                        # 920 tests (core + chartbridge), no network

# RUN 1 — collect candles (network), then RUN 2 — analyze them offline
# with a scripted agent: no LLM key needed
tradeagent sync --strategy price-action --provider yahoo
tradeagent analyze --strategy price-action \
    --scripted '{"XAU/USD": {"decision": "NO_TRADE", "symbol": "XAU/USD", "reasoning": "smoke test"}}'

# combined sync → analyze, or the built-in scheduler
tradeagent run --strategy price-action --provider yahoo --scripted '…'
tradeagent scheduler             # loop over schedule.toml (--once = single step)
```

Live reasoning is a flag-free switch: drop `--scripted` and set `TRADEAGENT_LLM_*` in `.env`; with neither configured the run exits `2` naming both options. `python -m trading.cli …` is always equivalent to the `tradeagent` console script.

**chartbridge** (two terminals):

```bash
uvicorn chartbridge.bridge.main:app --host 127.0.0.1 --port 8000
python -m chartbridge.agent.main --backend synthetic
```

**Docker** (no host Python needed): `docker compose build`, then `docker compose run --rm analysis --strategy price-action --scripted '…'` and `docker compose up -d bridge`.

---

## Project Structure

```text
TradeAgent/
├── src/trading/
│   ├── cli.py               # entry point: tradeagent & python -m trading.cli
│   │                        #   [sync | analyze | run | scheduler]
│   ├── config/              # env registry, stdlib .env loader, provider config
│   ├── indicators/          # library.py (functions) + calculator.py (specs)
│   ├── market/              # MarketDataProvider: ccxt · mt5 · yahoo · file
│   ├── storage/             # CandleStore — per (symbol, timeframe) Parquet
│   ├── strategy/            # StrategyConfig, IndicatorSpec, loader validation
│   ├── agent/               # loop, schema, scripted + live backends (Hermes)
│   ├── analysis/            # agent-owned workspace: registry, positions, tools
│   ├── risk/                # deterministic risk engine
│   ├── checks/              # deterministic pre-checks
│   ├── runs/                # sync/analyze runners + audit records
│   └── scheduler.py         # schedule.toml loop (+ agent set_next_run)
├── strategies/
│   ├── TEMPLATE.md          # the two-file contract
│   └── price-action/        # strategy.md + config.py + skills/
├── instructions/analyze.md  # default first-prompt template ({{placeholders}})
├── chartbridge/             # FastAPI bridge + agent client for MT5 charts
├── data/                    # market/ (Parquet) · analysis/ · runs/ (audit)
├── tests/                   # core suite; 920 tests with chartbridge/, offline
├── README.md                # requirements specification (FR-1..FR-32)
├── ARCHITECTURE.md          # design: layers, Hermes, risk engine, lifecycle
├── USAGE.md · SETUP.md · DOCKER.md · CHANGELOG.md · AGENTS.md
└── pyproject.toml · VERSION · schedule.toml · logging.toml · Dockerfile
```

---

## Testing & Quality

- **920 tests** (core + chartbridge) run fully offline — no network, no LLM key: `pytest -q` or `make test-local`.
- **Replay testing** — a file-backed provider serves stored Parquet snapshots, so the same market data + strategy always reproduces the same deterministic layers.
- **Lint & CI** — `make lint` (ruff) and GitHub Actions run ruff + pytest on every push/PR against Python 3.12.
- **Fail loud** — config drift, missing data, malformed agent output and provider errors abort the run rather than degrading silently.
- **Release discipline** — SemVer 2.0.0 in `VERSION`, Keep a Changelog 1.1.0 in `CHANGELOG.md`, Conventional Commits, enforced by versioning tests in the normal suite.

---

## Documentation

| Document | Contents |
| --- | --- |
| `README.md` | Requirements specification — the normative contract (FR-1..FR-32) |
| `ARCHITECTURE.md` | Design and behavior: deterministic layers, Hermes, agent tools, risk engine, run lifecycle |
| `USAGE.md` | Command reference, scheduler, chartbridge, troubleshooting |
| `SETUP.md` | Development setup for a fresh machine |
| `DOCKER.md` | Container guide (Linux + Windows) |
| `CHANGELOG.md` | Every change, past and upcoming (Keep a Changelog) |
| `AGENTS.md` | Rules every coding-agent session follows: branching, versioning, issue → PR |

---

## Status

Current version **1.12.0** — core phases A–G are delivered: per-timeframe storage & continuity, deterministic pre-checks, agent loop & risk engine, agent-owned analysis workspace, offline replay testing, the sync/analyze/scheduler split, and the live LLM backend.

Open roadmap: streamed tool visibility and persisted run transcripts, a strategy-driven trend agent for chartbridge, and swing-point analysis.

Deliberate non-goals: order execution / live trading, web UI, database, backtesting, and multiple simultaneous providers — **the agent proposes, a human decides.**
