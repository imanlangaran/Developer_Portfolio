import { useEffect, useMemo, useState } from "react";
import { Marked } from "marked";
import { baseUrl } from "marked-base-url";

import { getProjectReadmeUrl } from "../utils/getProjectReadmeUrl";

export default function useProjectReadme(project, language) {
  const [readmeHtml, setReadmeHtml] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
        // 1. localized README
        let response = await fetch(localizedUrl, {
          signal: controller.signal,
        });

        // 2. fallback README (only if localized fetch failed and fallback is different)
        if (!response.ok && localizedUrl !== fallbackUrl) {
          response = await fetch(fallbackUrl, {
            signal: controller.signal,
          });
        }

        if (!response.ok) {
          throw new Error("README not found");
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

        setError(err);

        setReadmeHtml(`
          <p>
            Failed to load README.
          </p>
        `);
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
  }, [localizedUrl, fallbackUrl, baseUrlString]);

  return {
    readmeHtml,
    isLoading,
    error,
  };
}
