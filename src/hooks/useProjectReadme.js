import { useEffect, useMemo, useState } from "react";

import { marked } from "marked";
import { baseUrl } from "marked-base-url";

import { getGithubReadmeUrl } from "../utils/getGithubReadmeUrl";

export default function useProjectReadme(githubUrl, language) {
  const [readmeHtml, setReadmeHtml] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // --------------------------------------------------
  // README URLS
  // --------------------------------------------------
  const readmeUrls = useMemo(() => {
    if (!githubUrl) return null;

    return getGithubReadmeUrl(githubUrl, language);
  }, [githubUrl, language]);

  // --------------------------------------------------
  // FETCH README
  // --------------------------------------------------
  useEffect(() => {
    if (!readmeUrls) return;

    const controller = new AbortController();

    const fetchReadme = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // 1. localized README
        let response = await fetch(readmeUrls.localized, {
          signal: controller.signal,
        });

        // 2. fallback README
        if (!response.ok) {
          response = await fetch(readmeUrls.fallback, {
            signal: controller.signal,
          });
        }

        if (!response.ok) {
          throw new Error("README not found");
        }

        const markdown = await response.text();

        marked.use(baseUrl(readmeUrls.base), {
          walkTokens(token) {
            if (token.type !== "html") return;

            token.text = token.text.replace(
              /<img\b([^>]*?)\bsrc=(["'])(.*?)\2([^>]*?)>/gi,
              (match, before, quote, src, after) => {
                if (/^(https?:|data:|blob:|\/\/)/i.test(src)) {
                  return match;
                }

                return `<img${before}src=${quote}${new URL(src, readmeUrls.base).href}${quote}${after}>`;
              },
            );
          },
        });

        const html = marked(markdown);

        setReadmeHtml(html);
      } catch (err) {
        if (err.name === "AbortError") return;

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
  }, [readmeUrls]);

  return {
    readmeHtml,
    isLoading,
    error,
  };
}