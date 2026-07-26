import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://imanlangaran.github.io/Developer_Portfolio';

// Dynamically extract project IDs from the data file
// so the sitemap stays in sync as projects are added/removed
const dataFilePath = path.join(__dirname, '../src/utils/data.js');
const dataContent = fs.readFileSync(dataFilePath, 'utf-8');

const idRegex = /id:\s*(\d+)/g;
const projectIds = [];
let match;
while ((match = idRegex.exec(dataContent)) !== null) {
  projectIds.push(parseInt(match[1]));
}

const today = new Date().toISOString().split('T')[0];

const ROUTES = [
  { loc: '/', priority: 1.0, changefreq: 'weekly' },
  ...projectIds.map((id) => ({
    loc: `/project/${id}`,
    priority: 0.7,
    changefreq: 'monthly',
  })),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map(
  (route) => `  <url>
    <loc>${BASE_URL}${route.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
).join('\n')}
</urlset>`;

fs.writeFileSync(path.join(__dirname, '../dist/sitemap.xml'), sitemap);

console.log(`✅ Sitemap generated successfully! (${ROUTES.length} routes)`);
