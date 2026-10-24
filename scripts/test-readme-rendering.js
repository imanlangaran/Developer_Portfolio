import assert from "node:assert";
import {
  CACHE_CAP,
  readmeCache,
  getCachedReadme,
  setCachedReadme,
  parsers,
  getParser,
  loadMarked,
  isExternalLink,
  decorateExternalLink,
  SANITIZE_CONFIG,
} from "../src/hooks/useProjectReadme.js";

// 1. LRU Cache behavior check using real exported cache helpers
readmeCache.clear();
for (let i = 0; i < CACHE_CAP; i++) {
  setCachedReadme(`key-${i}`, `content-${i}`);
}
assert.strictEqual(readmeCache.size, CACHE_CAP, `Cache size should be at cap (${CACHE_CAP})`);

// Access oldest item ('key-0') to make it MRU
assert.strictEqual(getCachedReadme("key-0"), "content-0");

// Add one more entry beyond capacity; 'key-1' was the oldest untouched and must be evicted
setCachedReadme("key-overflow", "content-overflow");
assert.strictEqual(readmeCache.size, CACHE_CAP);
assert.strictEqual(readmeCache.has("key-1"), false, "key-1 was oldest and should be evicted");
assert.strictEqual(readmeCache.has("key-0"), true, "key-0 was refreshed and should remain");
assert.strictEqual(readmeCache.has("key-overflow"), true, "new entry should remain");
readmeCache.clear();

// 2. Parser URL rewriting check using real exported parser factory
const { Marked, baseUrl, DOMPurify } = await loadMarked();
assert.strictEqual(typeof Marked, "function", "Marked constructor should be loaded");
assert.strictEqual(typeof baseUrl, "function", "baseUrl plugin should be loaded");
assert.strictEqual(typeof DOMPurify, "function", "DOMPurify should be loaded");

const baseUrlString = "https://example.com/docs/test/";
parsers.clear();
const parser1 = getParser(Marked, baseUrl, baseUrlString);
const parser2 = getParser(Marked, baseUrl, baseUrlString);
assert.strictEqual(parser1, parser2, "getParser should cache parser instances by baseUrl");

const markdown = `
# Title
- [ ] Incomplete task
- [x] Completed task
![relative image](./diagram.png)
<img src="./raw.png" alt="raw" onerror="alert(1)">
<img src="https://cdn.example.com/pic.png">
[External Link](https://google.com)
[In-page Anchor](#overview)
`;

const parsed = parser1.parse(markdown);
assert(parsed.includes("https://example.com/docs/test/diagram.png"), "markdown relative image resolved");
assert(parsed.includes("https://example.com/docs/test/raw.png"), "raw html relative image resolved");
assert(parsed.includes("https://cdn.example.com/pic.png"), "absolute image untouched");
assert(parsed.includes("<input"), "task list checkbox rendered as input tag");

// 3. Link classification check
assert.strictEqual(isExternalLink("https://github.com"), true);
assert.strictEqual(isExternalLink("http://example.com"), true);
assert.strictEqual(isExternalLink("//cdn.example.com"), true);
assert.strictEqual(isExternalLink("#section-heading"), false);
assert.strictEqual(isExternalLink("/docs/slug/README.md"), false);
assert.strictEqual(isExternalLink("mailto:user@example.com"), false);

const makeMockNode = (href) => {
  const attrs = { href };
  return {
    tagName: "a",
    attrs,
    hasAttribute(k) { return k in attrs; },
    getAttribute(k) { return attrs[k]; },
    setAttribute(k, v) { attrs[k] = v; },
  };
};

const externalNode = makeMockNode("https://github.com/imanlangaran");
decorateExternalLink(externalNode);
assert.strictEqual(externalNode.attrs.target, "_blank");
assert.strictEqual(externalNode.attrs.rel, "noopener noreferrer");

const internalNode = makeMockNode("#installation");
decorateExternalLink(internalNode);
assert.strictEqual(externalNode.attrs.href, "https://github.com/imanlangaran");
assert.strictEqual(internalNode.attrs.target, undefined);
assert.strictEqual(internalNode.attrs.rel, undefined);

// 4. Sanitize configuration check
assert(SANITIZE_CONFIG.ALLOWED_TAGS.includes("input"), "input allowed for task list checkboxes");
assert(SANITIZE_CONFIG.ALLOWED_ATTR.includes("type"), "type allowed for checkboxes");
assert(SANITIZE_CONFIG.ALLOWED_ATTR.includes("checked"), "checked allowed for checkboxes");
assert(SANITIZE_CONFIG.ALLOWED_ATTR.includes("disabled"), "disabled allowed for checkboxes");
assert(SANITIZE_CONFIG.FORBID_TAGS.includes("script"), "script forbidden");
assert(SANITIZE_CONFIG.FORBID_TAGS.includes("iframe"), "iframe forbidden");
assert(SANITIZE_CONFIG.FORBID_ATTR.includes("style"), "inline style forbidden");
assert(SANITIZE_CONFIG.ADD_ATTR.includes("target"), "target added to allowed/clean attributes");
assert(SANITIZE_CONFIG.ADD_ATTR.includes("rel"), "rel added to allowed/clean attributes");

console.log("All self-checks passed.");
