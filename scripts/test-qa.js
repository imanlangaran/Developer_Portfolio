import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { getProjectReadmeUrl } from "../src/utils/getProjectReadmeUrl.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 1. Projects data contract (read data file directly without png loader dependency)
const dataFilePath = path.join(__dirname, "../src/utils/data.js");
const dataContent = fs.readFileSync(dataFilePath, "utf-8");
const idRegex = /id:\s*(\d+)/g;
const projectIds = [];
let match;
while ((match = idRegex.exec(dataContent)) !== null) {
  projectIds.push(parseInt(match[1]));
}
assert(projectIds.length > 0, "PROJECTS must contain project IDs");

// 2. Project lookup logic (matches ProjectDetail route params)
assert(projectIds.includes(9), "Project 9 must exist");
assert(!projectIds.includes(999), "Project 999 must not exist");

// 3. Localized README candidates
const sampleProject = { id: 9, type: "public", githubUrl: "https://github.com/imanlangaran/trade-agent" };
const resEn = getProjectReadmeUrl(sampleProject, "En");
assert(Array.isArray(resEn?.candidates) && resEn.candidates.length > 0, "Must return candidate URLs");
const resFa = getProjectReadmeUrl(sampleProject, "Fa");
assert(resFa.candidates.some((u) => u.toLowerCase().includes("readme-fa.md")), "Must include fa candidate");

// 4. Sitemap coverage
const sitemapPath = path.join(__dirname, "../dist/sitemap.xml");
assert(fs.existsSync(sitemapPath), "dist/sitemap.xml must exist");
const sitemapContent = fs.readFileSync(sitemapPath, "utf-8");
for (const id of projectIds) {
  assert(sitemapContent.includes(`/project/${id}`), `Sitemap must contain /project/${id}`);
}

// 5. Built index.html checks
const indexPath = path.join(__dirname, "../dist/index.html");
assert(fs.existsSync(indexPath), "dist/index.html must exist");
const indexContent = fs.readFileSync(indexPath, "utf-8");
assert(indexContent.includes("localStorage.getItem('theme')"), "Theme script must be in index.html");

console.log("✅ All QA assertions passed successfully!");
