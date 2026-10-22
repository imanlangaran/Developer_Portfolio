export function buildReadmeCandidates(base, locale = "en") {
  const lang = (locale || "en").toLowerCase();
  const fallback = `${base}README.md`;
  const candidates =
    lang === "en"
      ? [fallback]
      : [...new Set([`${base}README-${lang}.md`, `${base}README-${lang.toUpperCase()}.md`, fallback])];

  return {
    localized: candidates[0],
    fallback,
    candidates,
    base,
  };
}

export function getGithubReadmeUrl(githubUrl, locale = "en") {
  if (!githubUrl) return null;

  try {
    const url = new URL(githubUrl);

    // https://github.com/user/repo
    const [, owner, repo] = url.pathname.split("/");

    if (!owner || !repo) {
      return null;
    }

    const cleanRepo = repo.replace(".git", "");

    const base = `https://raw.githubusercontent.com/${owner}/${cleanRepo}/HEAD/`;

    return buildReadmeCandidates(base, locale);
  } catch {
    return null;
  }
}


