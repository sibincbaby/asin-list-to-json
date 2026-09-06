# Chrome Web Store submission notes

## 1. Package

    cd asin-json-extension
    zip -r ../asin-json-extension-1.0.0.zip . -x 'check.mjs' 'icon.svg' 'STORE.md' 'PRIVACY.md' '*.zip'

Upload the zip at https://chrome.google.com/webstore/devconsole (one-time $5 developer fee).

## 2. Store listing

- **Name:** ASIN List to JSON
- **Category:** Workflow & Planning
- **Short description (132 max):**
  Export the ASIN result table on the query editor page to a JSON file, with serial numbers and a timestamped filename.
- **Detailed description:**

  Adds a "Download ASINs as JSON" button to the ASIN result table on the
  query editor page. One click saves every visible row — serial number,
  image URL, ASIN, item name, model name and model number — as a JSON file
  named with the date, time and page number, e.g.
  ASINS_06-09-2026_10-54-01_page1.json.

  Columns are read from the table header, so extra columns are exported
  automatically. Nothing is uploaded anywhere: the file is generated in your
  browser and saved straight to your computer.

- **Screenshots (required):** at least one, 1280x800 or 640x400 PNG. Open the
  page with the table, screenshot it with the button visible, crop to size.

## 3. Privacy practices tab

- **Single purpose:** "Export the product table shown on the query editor page to a JSON file."
- **Permission justifications** (paste verbatim):
  - `storage` — "Stores one boolean setting: whether the download button is shown. No user data is stored."
  - Host `https://browse-query-editor-eu.aka.amazon.com/*` — "The only page containing the ASIN table this extension exports. The content script reads that table and adds the download button."
  - Host `http://localhost/*`, `http://127.0.0.1/*` — "Used to test the same table markup against a locally served sample page during development."
- **Remote code:** No, this extension does not use remote code.
- **Data usage:** tick nothing. Then certify all three statements:
  not being sold to third parties / not used for unrelated purposes /
  not used to determine creditworthiness.
- **Privacy policy URL:** required. Host PRIVACY.md and paste the URL —
  a public GitHub repo file, GitHub Pages, or a public Gist all count.

## 4. Things that slow approval — already handled

- No `<all_urls>`, no broad host permissions — matches are three specific hosts.
- No `tabs`, `downloads`, `scripting`, or `activeTab` — the download uses a
  blob URL, which needs no permission.
- No remote scripts, no bundled libraries, no eval, no analytics.
- Icons at all four sizes; description under 132 chars; semantic version.

## 5. Two things to decide before you submit

1. **Reviewers cannot reach `*.aka.amazon.com`** — it is an internal host, so
   they cannot see the extension work. Expect either a slower review or a
   request for a demo. Add this to "Notes for reviewers", plus a short screen
   recording link if you have one:

   > The target site is an internal corporate tool that is not publicly
   > reachable. The extension only reads a table that is already rendered on
   > that page and saves it as a JSON file locally. No data is transmitted.

2. **Set visibility to Unlisted** (or Private, limited to trusted testers)
   unless you actually want public discovery. Same review, smaller audience,
   and it avoids questions about publishing a tool for an internal site.
   Check with your employer before publishing anything tied to internal
   tooling publicly.
