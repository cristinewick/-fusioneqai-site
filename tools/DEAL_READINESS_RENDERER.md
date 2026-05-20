# FusionEQ Deal Readiness Report Renderer

This is the local laptop rendering workflow for the customer-facing **FusionEQ Deal Readiness Report**.

The Deal Analyzer / ChatGPT should create the report content from a **Diagnostic Deal Briefing Analysis**. This renderer turns that content into a branded HTML and PDF report. The website is not part of this workflow.

## Files

- `tools/render_deal_readiness_report.js` - local renderer
- `tools/deal-readiness-sample.json` - sample input file to duplicate for a client
- `outputs/client-reports/` - generated HTML and PDF reports

`outputs/` is ignored by git, so generated client reports stay local.

## Basic Use

1. Duplicate `tools/deal-readiness-client-template.json`.
2. Rename the duplicate for the client or deal, for example `tools/acme-deal-readiness-report.json`.
3. Replace every placeholder value with the customer-facing Deal Readiness Report content.
4. Run:

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

Then paste that JSON into your duplicated client file and run the renderer command.

## Chrome Requirement

PDF export uses the local Chrome app at:

```text
/Applications/Google Chrome.app/Contents/MacOS/Google Chrome
```

If Chrome is not installed there, the renderer still creates HTML and prints a warning instead of creating a PDF.
