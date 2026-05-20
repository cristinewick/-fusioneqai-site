# FusionEQ Deal Analyzer Source of Truth

Date: May 19, 2026

This folder preserves the current FusionEQ Deal Analyzer working package for the concept branch.

## Purpose

The Deal Analyzer produces two separate outputs from the same deal information:

1. FusionEQ Diagnostic Deal Briefing Analysis
2. FusionEQ Deal Readiness Report

The Diagnostic Deal Briefing Analysis is the deeper working artifact for analysis, challenge, pattern interpretation, and FusionEQ Coach development.

The FusionEQ Deal Readiness Report is the branded, client-ready deliverable. It should be easier to digest, polished, role-neutral, and structured around decision evidence, readiness clarity, and better next moves.

## Current Naming

- Process: Diagnostic Deal Briefing
- Diagnostic artifact: FusionEQ Diagnostic Deal Briefing Analysis
- Client-ready deliverable: FusionEQ Deal Readiness Report
- Product capability: FusionEQ Deal Analyzer

## Included Files

- `FusionEQ_Deal_Analyzer_Custom_GPT_Instructions.txt`
- `FusionEQ_Deal_Analyzer_Operating_Spec.md`
- `FusionEQ_Deal_Analyzer_Operating_Spec.pdf`
- `FusionEQ_Three_Deal_Readiness_Reports.pdf`
- `FusionEQ_Three_Deal_Readiness_Reports.html`
- `FusionEQ_Deal_Readiness_Report_Enterprise_Team_A.pdf`
- `FusionEQ_Deal_Readiness_Report_Enterprise_Team_A.html`
- `FusionEQ_Deal_Readiness_Report_Enterprise_Team_B.pdf`
- `FusionEQ_Deal_Readiness_Report_Enterprise_Team_B.html`
- `FusionEQ_Deal_Readiness_Report_Enterprise_Team_C.pdf`
- `FusionEQ_Deal_Readiness_Report_Enterprise_Team_C.html`
- `generate_three_deal_readiness_reports.js`
- `build_deal_analyzer_spec_pdf.py`

## Local Client Report Renderer

Current local renderer files live in `tools/`:

- `tools/render_deal_readiness_report.js`
- `tools/deal-readiness-client-template.json`
- `tools/deal-readiness-sample.json`
- `tools/travel-risk-management-deal-readiness-report.json`
- `tools/DEAL_READINESS_RENDERER.md`

The GPT does not render the final branded PDF. It can prepare renderer-ready JSON for the customer-facing Deal Readiness Report. The local laptop renderer turns that JSON into branded HTML/PDF output under `outputs/client-reports/`.

Renderer workflow:

1. Run the Diagnostic Deal Briefing Analysis.
2. Generate the customer-facing Deal Readiness Report.
3. Ask for renderer-ready JSON using the field names in `tools/deal-readiness-client-template.json`.
4. Save the JSON as a client report file.
5. Run `node tools/render_deal_readiness_report.js tools/<client-report>.json`.
6. Review the generated PDF before sending to the client.

## Language Guardrails

Use:

- deal readiness intelligence
- decision readiness
- decision evidence
- recorded vs evidenced
- proven / unproven
- buyer-owned momentum
- decision ownership
- alignment evidence
- forecast confidence
- next move
- FusionEQ does not replace judgment. It sharpens it.

Avoid:

- hidden risk
- weak / weakest
- uncertainty
- beneath
- generic AI language
- customer names or buyer names unless explicitly permitted
- seller-driven or rep-facing language in the Deal Readiness Report

## Report Identity Rule

Do not merge the two report types.

The Diagnostic Deal Briefing Analysis can be detailed, direct, and diagnostic.

The Deal Readiness Report must be the polished readiness deliverable created from that diagnostic, with clear scoring, information provided, what has been evidenced, what remains unproven, recommended next move, and Coach guidance when needed.
