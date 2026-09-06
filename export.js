// Injected into the active tab by background.js when the toolbar icon is clicked.
// Nothing runs until the user clicks — no host permissions, no persistent script.

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

function toast(msg) {
  const t = document.createElement("div");
  t.textContent = msg;
  t.style.cssText = `
    position:fixed; bottom:24px; right:24px; z-index:2147483647;
    padding:12px 18px; border-radius:10px;
    font:600 14px/1 system-ui,-apple-system,"Segoe UI",sans-serif;
    color:#fff; background:linear-gradient(135deg,#4f46e5,#7c3aed);
    box-shadow:0 6px 20px rgba(79,70,229,.35);`;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2500);
}

const container = document.querySelector(".asin-list-container");
if (!container) {
  toast("No ASIN table found on this page");
} else {
  const rows = scrape(container);
  download(rows);
  toast(`Downloaded ${rows.length} ASINs`);
}
