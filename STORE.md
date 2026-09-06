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

  Open the query editor page, run your query, then click the extension's
  toolbar icon. Every visible row of the ASIN table is saved to a JSON file
  on your computer.

  Each row includes:
  - sl_no, the serial number in table order
  - image, the product image URL
  - ASIN, taken from the product link
  - item_name, model_name and model_number, unwrapped from the
    { language_tag:en_IN, value:"..." } format so you get the plain text

  Columns are read from the table header, so any extra column in the table is
  exported automatically without an update.

  Files are named with the date, time and page number, for example
  ASINS_06-09-2026_10-54-01_page1.json, so exports from different pages never
  overwrite each other.

  The extension has no host permissions and runs nothing until you click its
  icon. It makes no network requests, contains no remote code and no
  analytics: the JSON file is generated in your browser and saved straight to
  your computer.

- **Screenshots (required):** at least one, 1280x800 or 640x400 PNG. Open the
  page with the table, screenshot it, crop to size.

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
