import { useCallback, useEffect, useMemo, useState } from "react";
import { Marked } from "marked";
import { baseUrl } from "marked-base-url";

import { getProjectReadmeUrl } from "../utils/getProjectReadmeUrl";

export default function useProjectReadme(project, language) {
  const [readmeHtml, setReadmeHtml] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
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

  const localizedUrl = readmeUrls?.localized;
  const fallbackUrl = readmeUrls?.fallback;
  const baseUrlString = readmeUrls?.base;

  // --------------------------------------------------
  // FETCH README
  // --------------------------------------------------
  useEffect(() => {
    if (!localizedUrl || !fallbackUrl || !baseUrlString) {
      setReadmeHtml("");
      setIsLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController();

    const fetchReadme = async () => {
      setIsLoading(true);
      setError(null);

      try {
        let response = null;

        // 1. localized README
        try {
          response = await fetch(localizedUrl, {
            signal: controller.signal,
          });
        } catch (fetchErr) {
          if (fetchErr.name === "AbortError" || controller.signal.aborted) throw fetchErr;
        }

        // 2. fallback README (only if localized fetch failed and fallback is different)
        if ((!response || !response.ok) && localizedUrl !== fallbackUrl) {
          response = await fetch(fallbackUrl, {
            signal: controller.signal,
          });
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

        const parser = new Marked();

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

        const html = parser.parse(markdown);

        if (!controller.signal.aborted) {
          setReadmeHtml(html);
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
  }, [localizedUrl, fallbackUrl, baseUrlString, reloadKey]);

  return {
    readmeHtml,
    isLoading,
    error,
    refetch,
    reloadKey,
  };
}
