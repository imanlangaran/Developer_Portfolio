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

    return {
      localized: `${base}README-${locale.toLowerCase()}.md`,
      fallback: `${base}README.md`,
      base
    };
  } catch {
    return null;
  }
}
