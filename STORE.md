# Chrome Web Store submission notes

## 1. Package

    cd asin-json-extension
    zip -r ../asin-json-extension-1.1.0.zip manifest.json background.js export.js icon*.png

Upload the zip at https://chrome.google.com/webstore/devconsole (one-time $5 developer fee).

## 2. Store listing

- **Name:** ASIN List to JSON
- **Category:** Workflow & Planning
- **Version:** 1.1.0
- **Short description (132 max):**
  Export the ASIN result table on the query editor page to a JSON file, with serial numbers and a timestamped filename.
- **Detailed description:**

  Click the extension's toolbar icon on the query editor page and every
  visible row of the ASIN table — serial number,
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
  - `activeTab` — "When the user clicks the extension's toolbar icon, the export script needs to read the product table rendered on that one tab. activeTab grants that access only for that click, which is why no host permission is requested."
  - `scripting` — "Used by chrome.scripting.executeScript to run the export script in the active tab after the user clicks the toolbar icon. It is the only way the extension runs at all."
  - Host permissions — none requested.
- **Remote code:** No, this extension does not use remote code.
- **Data usage:** tick nothing. Then certify all three statements:
  not being sold to third parties / not used for unrelated purposes /
  not used to determine creditworthiness.
- **Privacy policy URL:** required. Host PRIVACY.md and paste the URL —
  a public GitHub repo file, GitHub Pages, or a public Gist all count.

## 4. Things that slow approval — already handled

- No host permissions at all — `activeTab` means the extension is inert until
  the user clicks its icon, which avoids the in-depth host-permission review.
- No `tabs`, `downloads` or `storage` — the download uses a blob URL, which
  needs no permission, and nothing is persisted.
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
