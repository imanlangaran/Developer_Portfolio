import assert from "node:assert";
import { Marked } from "marked";
import { baseUrl } from "marked-base-url";

// 1. LRU Cache behavior check
const CACHE_CAP = 3;
const cache = new Map();

function getCached(key) {
  if (!cache.has(key)) return null;
  const value = cache.get(key);
  cache.delete(key);
  cache.set(key, value);
  return value;
}

function setCached(key, val) {
  if (cache.has(key)) {
    cache.delete(key);
  } else if (cache.size >= CACHE_CAP) {
    const oldest = cache.keys().next().value;
    cache.delete(oldest);
  }
  cache.set(key, val);
}

setCached("a", 1);
setCached("b", 2);
setCached("c", 3);
assert.strictEqual(cache.size, 3);

// Access 'a' so it becomes most recently used
assert.strictEqual(getCached("a"), 1);

// Add 'd', oldest should now be 'b'
setCached("d", 4);
assert.strictEqual(cache.has("b"), false, "b was oldest and should be evicted");
assert.strictEqual(cache.has("a"), true, "a was refreshed and should remain");
assert.strictEqual(cache.has("c"), true, "c should remain");
assert.strictEqual(cache.has("d"), true, "d should remain");

// 2. Parser URL rewriting check
const baseUrlString = "https://example.com/docs/test/";
const parser = new Marked();
parser.use(baseUrl(baseUrlString), {
  walkTokens(token) {
    if (token.type !== "html") return;
    token.text = token.text.replace(
      /<img\b([^>]*?)\bsrc=(["'])(.*?)\2([^>]*?)>/gi,
      (match, before, quote, src, after) => {
        if (/^(https?:|data:|blob:|\/\/)/i.test(src)) return match;
        try {
          return `<img${before}src=${quote}${new URL(src, baseUrlString).href}${quote}${after}>`;
        } catch {
          return match;
        }
      },
    );
  },
});
parser.setOptions({ gfm: true, breaks: true });

const markdown = `
# Title
![relative image](./diagram.png)
<img src="./raw.png" alt="raw" onerror="alert(1)">
<img src="https://cdn.example.com/pic.png">
[External Link](https://google.com)
[In-page Anchor](#overview)
`;

const parsed = parser.parse(markdown);
assert(parsed.includes("https://example.com/docs/test/diagram.png"), "markdown relative image resolved");
assert(parsed.includes("https://example.com/docs/test/raw.png"), "raw html relative image resolved");
assert(parsed.includes("https://cdn.example.com/pic.png"), "absolute image untouched");

// 3. Link classification regex check
const isExternal = (href) => /^(?:https?:)?\/\//i.test(href);
assert.strictEqual(isExternal("https://github.com"), true);
assert.strictEqual(isExternal("http://example.com"), true);
assert.strictEqual(isExternal("//cdn.example.com"), true);
assert.strictEqual(isExternal("#section-heading"), false);
assert.strictEqual(isExternal("/docs/slug/README.md"), false);
assert.strictEqual(isExternal("mailto:user@example.com"), false);

console.log("All self-checks passed.");
