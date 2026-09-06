// Run: npm i jsdom && node check.mjs   (asserts scrape() against the saved page)
import { JSDOM } from "jsdom";
import { readFileSync } from "fs";
import assert from "assert";

const html = readFileSync("/home/sibin/my-works/moglix-auto-search/script src=moz-extensiona54a1c12-38.html", "utf8");
const dom = new JSDOM(html);
global.document = dom.window.document;

// load content.js body, stubbing the DOM-mutating tail
const src = readFileSync("/home/sibin/my-works/moglix-auto-search/asin-json-extension/export.js", "utf8")
  .split("function download")[0];
const { scrape, filename } = await import("data:text/javascript," + encodeURIComponent(src + "\nexport {scrape, filename};"));

const rows = scrape(document.querySelector(".asin-list-container"));
console.log(JSON.stringify(rows.slice(0, 2), null, 2));
console.log("rows:", rows.length);
assert(rows.length > 0);
assert(rows[0].sl_no === 1 && rows.at(-1).sl_no === rows.length, "sl_no");
assert(rows[0].ASIN === "B07PYJK5PH", rows[0].ASIN);
assert(rows[0].image.startsWith("https://m.media-amazon.com/"), rows[0].image);
assert(rows[0].item_name.startsWith("CELLO Aluminium"), rows[0].item_name);
assert(rows[0].model_number === "CLO_12CAVITY_APPMPATRA_SSLID_GRLL", rows[0].model_number);
assert(!("" in rows[0]), "checkbox column leaked");
const f = filename();
console.log("filename:", f);
assert(/^ASINS_\d{2}-\d{2}-\d{4}_\d{2}-\d{2}-\d{2}_page1\.json$/.test(f), f);
console.log("OK");
