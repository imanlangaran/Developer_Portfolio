# TradeAgent — AI Market Analysis Agent

> I built a read-only AI trading agent: it syncs market data, computes indicators in code, and lets an LLM propose entry/exit/risk ideas — it never places a trade.

## What I built

- **Strategy-driven core** — every strategy is a folder with two files: `strategy.md` (the rules) and `config.py` (symbols, timeframes, indicators, risk params). Nothing is hardcoded, so adding a strategy means adding files, not editing the engine.
- **Multi-source market data** — one `MarketDataProvider` interface with four backends: CCXT, Yahoo Finance (`yfinance`), MetaTrader 5, and a file-backed provider for offline replay.
- **Deterministic indicators** — EMA, RSI, ATR and SMA are computed in Python and stored per symbol/timeframe in Parquet, so the model reasons over finished numbers instead of raw candles.
- **AI reasoning layer (Hermes)** — a scripted backend for tests and replay, or a live LLM backend over raw `httpx` (any OpenAI-compatible or Anthropic endpoint) with a bounded tool-call loop and schema-validated proposals.
- **Deterministic risk gate** — position sizing from `EQUITY × RISK_PER_TRADE`, plus max-risk and minimum risk/reward checks written in code that can reject any suggestion, no matter what the AI says.
- **Auditable runs** — `sync` (network) and `analyze` (offline) are separate commands, a cron-style scheduler loops over `schedule.toml`, and every run writes a JSON audit record.
- **MetaTrader 5 chart bridge** — a FastAPI service that draws the agent's market-structure reading (trendlines first) on a live MT5 chart.

## Tech stack

| Layer | Technology |
| --- | --- |
| Language | Python 3.12 |
| Data & indicators | pandas, pandas-ta-classic, pyarrow (Parquet) |
| Market data | CCXT, yfinance, MetaTrader5 |
| Validation | pydantic |
| AI backends | httpx → OpenAI-compatible + Anthropic APIs |
| Chart bridge | FastAPI, Uvicorn |
| Packaging & deploy | setuptools, Docker, docker compose |
| Quality | pytest (920 offline tests), ruff, GitHub Actions CI |

**Status:** v1.12.0, in development. The agent proposes, a human decides — order execution is intentionally out of scope.
