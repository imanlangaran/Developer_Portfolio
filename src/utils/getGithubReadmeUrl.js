// utils/getGithubReadmeUrl.js

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

    const base = `https://raw.githubusercontent.com/${owner}/${cleanRepo}/HEAD`;

    return {
      localized: `${base}/README.${locale}.md`,
      fallback: `${base}/README.md`,
      owner,
      repo: cleanRepo,
    };
  } catch {
    return null;
  }
}


// import { getGithubReadmeUrl } from "../utils/getGithubReadmeUrl";

// const readme = getGithubReadmeUrl(
//   "https://github.com/facebook/react",
//   "fa"
// );

// console.log(readme);

/*
{
  localized: "https://raw.githubusercontent.com/facebook/react/HEAD/README.fa.md",
  fallback: "https://raw.githubusercontent.com/facebook/react/HEAD/README.md",
  owner: "facebook",
  repo: "react"
}
*/


// optional fetch helper

// export async function fetchGithubReadme(githubUrl, locale = "en") {
//   const urls = getGithubReadmeUrl(githubUrl, locale);

//   if (!urls) {
//     throw new Error("Invalid GitHub URL");
//   }

//   try {
//     const localizedRes = await fetch(urls.localized);

//     if (localizedRes.ok) {
//       return await localizedRes.text();
//     }

//     const fallbackRes = await fetch(urls.fallback);

//     if (!fallbackRes.ok) {
//       throw new Error("README not found");
//     }

//     return await fallbackRes.text();
//   } catch (err) {
//     throw err;
//   }
// }