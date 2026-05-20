# FusionEQ Deal Analyzer GPT Update Handoff

Use this checklist to update the actual FusionEQ Deal Analyzer GPT.

## What The GPT Can And Cannot Do

The GPT can:

- Produce the Diagnostic Deal Briefing Analysis.
- Produce the customer-facing FusionEQ Deal Readiness Report.
- Convert the Deal Readiness Report into renderer-ready JSON.

The GPT cannot:

- Render the final branded PDF in the local FusionEQ template.
- Run the laptop renderer.
- Save local client PDF files automatically.

The branded PDF is created manually on the laptop with:

```bash
node tools/render_deal_readiness_report.js tools/<client-report>.json
```

## GPT Builder Update

1. Open the FusionEQ Deal Analyzer GPT in the GPT Builder.
2. Replace the instruction box with:

```text
custom-gpt/FusionEQ_Deal_Analyzer_Custom_GPT_Instructions.txt
```

3. Replace or upload the knowledge file:

```text
custom-gpt/FusionEQ_Deal_Analyzer_Operating_Spec.md
```

4. Save the GPT.

## Test Prompt

After the GPT is updated, test it with:

```text
Convert only the FusionEQ Deal Readiness Report into renderer-ready JSON.
Do not include the Diagnostic Deal Briefing Analysis.
Use the exact field names from tools/deal-readiness-client-template.json.
Output only valid JSON. Do not include markdown fences or commentary.
```

## Local Render Test

Save the GPT output as a file in `tools/`, then run:

```bash
node tools/render_deal_readiness_report.js tools/<client-report>.json
```

Expected output:

- `outputs/client-reports/<client-report>.html`
- `outputs/client-reports/<client-report>.pdf`

Review the PDF before sending it to a client.
