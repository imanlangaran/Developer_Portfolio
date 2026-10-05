import { useEffect, useState } from "react";
import { PROJECTS } from "../utils/data";

const CACHE_KEY = "project-commit-dates:v1";
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24h — keeps us well under GitHub's 60 unauth requests/hour/IP
const FAILURE_BACKOFF = 15 * 60 * 1000; // retry after 15min when the last attempt got nothing
const GITHUB_API = "https://api.github.com";

/** Extracts `{ owner, repo }` from a GitHub repo URL, or `null` when it isn't one. */
const parseGithubRepo = (url) => {
  if (!url) return null;
  const match = url.match(/github\.com\/([^/]+)\/([^/?#]+)/i);
  if (!match) return null;
  return { owner: match[1], repo: match[2].replace(/\.git$/i, "") };
};

/** Reads `{ fetchedAt, ok, dates }` from localStorage, or `null` on any failure. */
const readCache = () => {
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed.fetchedAt !== "number" || !parsed.dates) return null;
    return parsed;
  } catch {
    return null; // private mode, disabled storage, corrupt JSON…
  }
};

/** True when the cache can still be trusted (fresh success, or backoff not yet elapsed). */
const isCacheUsable = (cache) => {
  if (!cache) return false;
  const ttl = cache.ok ? CACHE_TTL : FAILURE_BACKOFF;
  return Date.now() - cache.fetchedAt < ttl;
};

/** Persists `{ fetchedAt, ok, dates }`; never throws (storage may be unavailable). */
const writeCache = (dates, ok) => {
  try {
    window.localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ fetchedAt: Date.now(), ok, dates })
    );
  } catch {
    /* ignore */
  }
};

/** Dedupes concurrent requests (e.g. React StrictMode double-mounting). */
let pendingFetch = null;

const fetchPublicProjectDates = (publicProjects) => {
  if (pendingFetch) return pendingFetch;

  pendingFetch = Promise.allSettled(
    publicProjects.map((project) => {
      const repo = parseGithubRepo(project.githubUrl);
      const url = `${GITHUB_API}/repos/${repo.owner}/${repo.repo}/commits?per_page=1`;
      return fetch(url, { headers: { Accept: "application/vnd.github+json" } })
        .then((res) => {
          if (!res.ok) throw new Error(`GitHub API ${res.status}`);
          return res.json();
        })
        .then((commits) => {
          const commit = Array.isArray(commits) ? commits[0] : null;
          const date =
            commit?.commit?.committer?.date ?? commit?.commit?.author?.date;
          if (!date) throw new Error("No commit date in response");
          return { id: project.id, date };
        });
    })
  ).then((results) =>
    results.reduce((acc, result) => {
      if (result.status === "fulfilled" && result.value) {
        acc[result.value.id] = result.value.date;
      }
      return acc;
    }, {})
  );

  pendingFetch.then(
    () => {
      pendingFetch = null;
    },
    () => {
      pendingFetch = null;
    }
  );

  return pendingFetch;
};

/**
 * Resolves the effective commit date of a project:
 * fetched GitHub date (public) → `lastCommitDate` config → `null`.
 *
 * @param {import("../utils/data").Project} project
 * @param {Record<string, string>} dates - Map of project id → ISO date from the hook.
 * @returns {string|null}
 */
export const resolveProjectDate = (project, dates) =>
  dates?.[project.id] ?? project.lastCommitDate ?? null;

/**
 * Fetches the last commit date (default branch) of every public project from
 * the GitHub API at runtime, cached in localStorage for 24h.
 *
 * Behavior on failure (rate limit, offline, private repo…):
 * - keeps whatever stale cache exists,
 * - falls back to the project's `lastCommitDate` config via `resolveProjectDate`,
 * - never surfaces an error to the UI (cards just omit the time tag).
 *
 * @returns {{ dates: Record<string, string>, isLoading: boolean }}
 *   `dates`: map of project id → ISO commit date.
 *   `isLoading`: true only while a fetch is actually in flight — drives the
 *   skeleton placeholders. Never stays true after the request settles (or when
 *   a usable cache means no request is made at all).
 */
export const useProjectDates = () => {
  const [dates, setDates] = useState(() => readCache()?.dates ?? {});
  const [isLoading, setIsLoading] = useState(() => !isCacheUsable(readCache()));

  useEffect(() => {
    const cache = readCache();
    if (isCacheUsable(cache)) {
      setIsLoading(false);
      return; // fresh (or in failure backoff) — nothing to do
    }

    const publicProjects = PROJECTS.filter(
      (project) => project.type !== "private" && parseGithubRepo(project.githubUrl)
    );
    if (publicProjects.length === 0) {
      setIsLoading(false); // nothing will ever be fetched
      return;
    }

    let active = true;

    fetchPublicProjectDates(publicProjects)
      .then((freshDates) => {
        if (!active) return;
        const merged = { ...(cache?.dates ?? {}), ...freshDates };
        const ok = Object.keys(freshDates).length > 0;
        writeCache(merged, ok); // failures get a short backoff instead of a 24h freeze
        setDates(merged);
      })
      .catch(() => {
        /* offline / rate-limited → keep stale cache, hide unknown time tags */
      })
      .finally(() => {
        setIsLoading(false); // settled either way — skeletons must resolve
      });

    return () => {
      active = false;
    };
  }, []);

  return { dates, isLoading };
};

export default useProjectDates;
