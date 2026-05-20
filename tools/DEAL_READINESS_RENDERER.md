# FusionEQ Deal Readiness Report Renderer

This is the local laptop rendering workflow for the customer-facing **FusionEQ Deal Readiness Report**.

The Deal Analyzer / ChatGPT should create the report content from a **Diagnostic Deal Briefing Analysis**. This renderer turns that content into a branded HTML and PDF report. The website is not part of this workflow.

## Files

- `tools/render_deal_readiness_report.js` - local renderer
- `tools/clean_deal_readiness_json.js` - cleans copied GPT JSON and saves a renderer-ready input file
- `tools/deal-readiness-sample.json` - sample input file to duplicate for a client
- `inputs/client-reports/` - cleaned renderer-ready JSON inputs
- `outputs/client-reports/` - generated HTML and PDF reports

`outputs/` is ignored by git, so generated client reports stay local.

## Basic Use

1. Duplicate `tools/deal-readiness-client-template.json`.
2. Rename the duplicate for the client or deal, for example `tools/acme-deal-readiness-report.json`.
3. Replace every placeholder value with the customer-facing Deal Readiness Report content.
4. Validate the JSON:

```bash
node tools/validate_deal_readiness_json.js tools/acme-deal-readiness-report.json
```

5. Run:

```bash
node tools/render_deal_readiness_report.js tools/acme-deal-readiness-report.json
```

The renderer creates:

- `outputs/client-reports/<fileName>.html`
- `outputs/client-reports/<fileName>.pdf`

## Input Rule

The JSON input should contain the **Deal Readiness Report**, not the full Diagnostic Deal Briefing Analysis.

The diagnostic remains the deeper working artifact. The rendered PDF is the polished customer-facing output.

## Easiest Workflow

Ask ChatGPT / Deal Analyzer to produce the customer-facing report, then ask:

```text
Convert only the Deal Readiness Report into the FusionEQ renderer JSON shape.
Do not include the Diagnostic Deal Briefing Analysis.
Use the same field names as tools/deal-readiness-client-template.json.
```

Codex clipboard path:

1. Copy the renderer-ready JSON from ChatGPT / Deal Analyzer.
2. Open Codex and say: `render my clipboard`.
3. Codex cleans the clipboard JSON, saves a copy under `inputs/client-reports`, validates it, renders the report, and opens the PDF.

Note: macOS may block small Desktop launcher apps from reading copied GPT text. Codex can read it reliably in this workspace.

File-picker path:

1. Save the GPT output as a `.json` or `.txt` file.
2. Double-click **FusionEQ Report Renderer** on the Desktop.
3. Choose the saved file. The app cleans common copy/paste issues such as smart quotes before validating and rendering.

## Chrome Requirement

PDF export uses the local Chrome app at:

```text
/Applications/Google Chrome.app/Contents/MacOS/Google Chrome
```

If Chrome is not installed there, the renderer still creates HTML and prints a warning instead of creating a PDF.
