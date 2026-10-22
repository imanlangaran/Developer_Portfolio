import { useCallback, useEffect, useMemo, useState } from "react";
import DOMPurify from "dompurify";

import { getProjectReadmeUrl } from "../utils/getProjectReadmeUrl";

const SANITIZE_CONFIG = {
  ALLOWED_TAGS: [
    "h1", "h2", "h3", "h4", "h5", "h6",
    "p", "ul", "ol", "li",
    "code", "pre",
    "table", "thead", "tbody", "tfoot", "tr", "th", "td",
    "blockquote", "hr",
    "a", "img",
    "em", "strong", "b", "i", "s", "del", "strike",
    "details", "summary",
    "br", "span", "div", "kbd", "sub", "sup",
  ],
  ALLOWED_ATTR: [
    "href", "src", "alt", "title", "width", "height", "loading",
    "align", "class", "id", "name", "target", "rel", "open",
  ],
  FORBID_TAGS: ["script", "iframe", "object", "embed", "form", "style"],
  FORBID_ATTR: ["style"],
  ADD_ATTR: ["target", "rel"],
};

if (typeof DOMPurify?.addHook === "function") {
  DOMPurify.addHook("afterSanitizeAttributes", (node) => {
    if (node.tagName && node.tagName.toLowerCase() === "a" && node.hasAttribute("href")) {
      const href = node.getAttribute("href") || "";
      if (/^(?:https?:)?\/\//i.test(href)) {
        node.setAttribute("target", "_blank");
        node.setAttribute("rel", "noopener noreferrer");
      }
    }
  });
}

// ponytail: LRU cap of 20 covers all portfolio projects (~10) across languages without unbounded memory growth.
const CACHE_CAP = 20;
const readmeCache = new Map();

function getCachedReadme(key) {
  if (!readmeCache.has(key)) return null;
  const value = readmeCache.get(key);
  readmeCache.delete(key);
  readmeCache.set(key, value);
  return value;
}

function setCachedReadme(key, html) {
  if (readmeCache.has(key)) {
    readmeCache.delete(key);
  } else if (readmeCache.size >= CACHE_CAP) {
    const oldestKey = readmeCache.keys().next().value;
    readmeCache.delete(oldestKey);
  }
  readmeCache.set(key, html);
}

// ponytail: parser cache never evicts; bounded by unique project base URLs (~10 in data.js).
const parsers = new Map();

function getParser(Marked, baseUrl, baseUrlString) {
  let parser = parsers.get(baseUrlString);
  if (!parser) {
    parser = new Marked();
    parser.use(baseUrl(baseUrlString), {
      walkTokens(token) {
        if (token.type !== "html") return;

        token.text = token.text.replace(
          /<img\b([^>]*?)\bsrc=(["'])(.*?)\2([^>]*?)>/gi,
          (match, before, quote, src, after) => {
            if (/^(https?:|data:|blob:|\/\/)/i.test(src)) {
              return match;
            }

            try {
              return `<img${before}src=${quote}${new URL(src, baseUrlString).href}${quote}${after}>`;
            } catch {
              return match;
            }
          },
        );
      },
    });

    parser.setOptions({
      gfm: true,
      breaks: true,
    });

    parsers.set(baseUrlString, parser);
  }
  return parser;
}

let markedModulePromise = null;
function loadMarked() {
  if (!markedModulePromise) {
    markedModulePromise = Promise.all([
      import("marked"),
      import("marked-base-url"),
    ]).then(([{ Marked }, { baseUrl }]) => ({ Marked, baseUrl }));
  }
  return markedModulePromise;
}

export default function useProjectReadme(project, language) {
  const [reloadKey, setReloadKey] = useState(0);

  const refetch = useCallback(() => {
    setReloadKey((k) => k + 1);
  }, []);

  // --------------------------------------------------
  // README URLS
  // --------------------------------------------------
  const readmeUrls = useMemo(() => {
    return getProjectReadmeUrl(project, language);
  }, [project, language]);

  const candidates = readmeUrls?.candidates;
  const baseUrlString = readmeUrls?.base;
  const cacheKey = candidates?.[0] && baseUrlString ? `${candidates[0]}::${baseUrlString}` : null;

  const [prevCacheKey, setPrevCacheKey] = useState(cacheKey);
  const [readmeHtml, setReadmeHtml] = useState(() => {
    return cacheKey ? getCachedReadme(cacheKey) || "" : "";
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  if (cacheKey !== prevCacheKey) {
    setPrevCacheKey(cacheKey);
    const cached = cacheKey ? getCachedReadme(cacheKey) : null;
    setReadmeHtml(cached || "");
    setIsLoading(!cached && Boolean(baseUrlString && candidates?.length));
    setError(null);
  }

  // --------------------------------------------------
  // FETCH README
  // --------------------------------------------------
  useEffect(() => {
    if (!baseUrlString || !candidates || candidates.length === 0) {
      setReadmeHtml("");
      setIsLoading(false);
      setError(null);
      return;
    }

    if (reloadKey === 0) {
      const cached = getCachedReadme(cacheKey);
      if (cached) {
        setReadmeHtml(cached);
        setIsLoading(false);
        setError(null);
        return;
      }
    } else if (cacheKey) {
      readmeCache.delete(cacheKey);
    }

    const controller = new AbortController();

    const fetchReadme = async () => {
      setIsLoading(true);
      setError(null);

      try {
        let response = null;

        // ponytail: sequential probe stops on first ok; upgrade to parallel HEAD only if probe latency matters.
        for (const url of candidates) {
          try {
            response = await fetch(url, {
              signal: controller.signal,
            });
            if (response.ok) break;
          } catch (fetchErr) {
            if (fetchErr.name === "AbortError" || controller.signal.aborted) throw fetchErr;
          }
        }

        if (!response || !response.ok) {
          const status = response ? response.status : null;
          const err = new Error(
            status === 404 ? "README not found" : status ? `HTTP ${status}` : "Network error",
          );
          err.status = status;
          // ponytail: error classification only branches on 404 vs others; upgrade to status-specific handlers if needed.
          err.kind = status === 404 ? "not-found" : "failed";
          throw err;
        }

        const markdown = await response.text();

        const { Marked, baseUrl } = await loadMarked();
        if (controller.signal.aborted) return;

        const parser = getParser(Marked, baseUrl, baseUrlString);
        const rawHtml = parser.parse(markdown);

        const cleanHtml = DOMPurify.sanitize(rawHtml, SANITIZE_CONFIG);

        if (cacheKey) {
          setCachedReadme(cacheKey, cleanHtml);
        }

        if (!controller.signal.aborted) {
          setReadmeHtml(cleanHtml);
        }
      } catch (err) {
        if (err.name === "AbortError" || controller.signal.aborted) return;

        console.error(err);

        setError({
          kind: err.kind || "failed",
          status: typeof err.status === "number" ? err.status : null,
        });

        setReadmeHtml("");
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchReadme();

    return () => {
      controller.abort();
    };
  }, [candidates, baseUrlString, cacheKey, reloadKey]);

  return {
    readmeHtml,
    isLoading,
    error,
    refetch,
    reloadKey,
  };
}
