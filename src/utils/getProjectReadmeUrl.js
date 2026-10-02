import { getGithubReadmeUrl } from "./getGithubReadmeUrl.js";

export { getGithubReadmeUrl };

export function getProjectReadmeUrl(project, language = "en") {
  if (!project) return null;

  // Support string input as githubUrl for backwards compatibility
  if (typeof project === "string") {
    return getGithubReadmeUrl(project, language);
  }

  const isPrivate = project.type === "private";

  if (isPrivate) {
    const slug = project.readme || project.slug;
    if (!slug) return null;

    const baseUrl = import.meta?.env?.BASE_URL || "/";
    const cleanBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
    const origin =
      typeof window !== "undefined" ? window.location.origin : "http://localhost";
    const cleanSlug = String(slug).replace(/^\/+|\/+$/g, "");
    const base = new URL(`${cleanBase}docs/${cleanSlug}/`, origin).href;
    const lang = (language || "en").toLowerCase();
    const localized =
      lang === "en" ? `${base}README.md` : `${base}README-${lang}.md`;

    return {
      localized,
      fallback: `${base}README.md`,
      base,
    };
  }

  return getGithubReadmeUrl(project.githubUrl, language);
}

export default getProjectReadmeUrl;
