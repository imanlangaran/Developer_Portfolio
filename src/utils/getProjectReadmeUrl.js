import { getGithubReadmeUrl, buildReadmeCandidates } from "./getGithubReadmeUrl.js";

export { getGithubReadmeUrl, buildReadmeCandidates };

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

    // If slug is a full URL
    if (/^https?:\/\//i.test(slug)) {
      const base = slug.endsWith("/") ? slug : `${slug}/`;
      return buildReadmeCandidates(base, language);
    }

    // Direct static replacement required by Vite for import.meta.env
    const baseUrl = import.meta.env?.BASE_URL || "/";
    const cleanBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
    const origin =
      typeof window !== "undefined" ? window.location.origin : "http://localhost";
    const cleanSlug = String(slug)
      .replace(/\/?README(-[a-z]{2})?\.md$/i, "")
      .replace(/\.md$/i, "")
      .replace(/^\/+|\/+$/g, "");
    const base = new URL(`${cleanBase}docs/${cleanSlug}/`, origin).href;

    return buildReadmeCandidates(base, language);
  }

  return getGithubReadmeUrl(project.githubUrl, language);
}

export default getProjectReadmeUrl;
