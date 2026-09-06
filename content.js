// Runs on the query editor + localhost test pages (see manifest matches).
// The table is rendered by React, so we watch for it instead of checking once —
// that one-shot check is what silently failed on slower page loads.

const text = (el) => (el ? el.textContent.trim() : "");

// Cells look like: { language_tag:en_IN, value:"CELLO Appam Patra..." }
function unwrap(s) {
  const m = s.match(/value:"([\s\S]*)"\s*}$/);
  return m ? m[1] : s;
}

function scrape(container) {
  const headers = [...container.querySelectorAll("thead th")].map(text);
  return [...container.querySelectorAll("tbody tr")].map((tr, n) => {
    const row = { sl_no: n + 1 };
    [...tr.children].forEach((td, i) => {
      if (td.querySelector('input[type="checkbox"]')) return;
      const img = td.querySelector("img");
      const key = headers[i] || `col${i}`;
      row[key] = img ? img.src : unwrap(text(td.querySelector("a") || td));
    });
    return row;
  });
}

const currentPage = () =>
  text(document.querySelector(".pagination li.active a")) || "1";

// ASINS_06-09-2026_14-30-05_page1.json
function filename() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, "0");
  const stamp = `${p(d.getDate())}-${p(d.getMonth() + 1)}-${d.getFullYear()}_${p(
    d.getHours()
  )}-${p(d.getMinutes())}-${p(d.getSeconds())}`;
  return `ASINS_${stamp}_page${currentPage()}.json`;
}

function download(rows) {
  const url = URL.createObjectURL(
    new Blob([JSON.stringify(rows, null, 2)], { type: "application/json" })
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = filename();
  a.click();
  URL.revokeObjectURL(url);
}

const api = globalThis.browser ?? globalThis.chrome;
const BTN_ID = "asin-json-btn";

function makeButton() {
  const btn = document.createElement("button");
  btn.id = BTN_ID;
  btn.type = "button";
  btn.textContent = "\u2b07  Download ASINs as JSON";
  btn.style.cssText = `
    position:fixed; bottom:24px; right:24px; z-index:99999;
    padding:12px 20px; border:0; border-radius:10px;
    font:600 14px/1 system-ui,-apple-system,"Segoe UI",sans-serif;
    color:#fff; background:linear-gradient(135deg,#4f46e5,#7c3aed);
    box-shadow:0 6px 20px rgba(79,70,229,.35); cursor:pointer;
    transition:transform .15s ease, box-shadow .15s ease, filter .15s ease;`;
  btn.onmouseenter = () => {
    btn.style.transform = "translateY(-2px)";
    btn.style.boxShadow = "0 10px 26px rgba(79,70,229,.45)";
  };
  btn.onmouseleave = () => {
    btn.style.transform = "";
    btn.style.boxShadow = "0 6px 20px rgba(79,70,229,.35)";
  };
  btn.onmousedown = () => (btn.style.filter = "brightness(.9)");
  btn.onmouseup = () => (btn.style.filter = "");
  return btn;
}

let enabled = true;

function sync() {
  const container = document.querySelector(".asin-list-container");
  const existing = document.getElementById(BTN_ID);
  if (!enabled || !container) return existing?.remove();
  if (existing) return;
  const btn = makeButton();
  btn.onclick = () => download(scrape(container));
  document.body.appendChild(btn);
}

api.storage.sync.get({ enabled: true }, (r) => {
  enabled = r.enabled;
  sync();
});
api.storage.onChanged.addListener((c) => {
  if (c.enabled) {
    enabled = c.enabled.newValue;
    sync();
  }
});
// ponytail: observe everything; sync() is a single querySelector, cheap enough.
new MutationObserver(sync).observe(document.documentElement, {
  childList: true,
  subtree: true,
});
