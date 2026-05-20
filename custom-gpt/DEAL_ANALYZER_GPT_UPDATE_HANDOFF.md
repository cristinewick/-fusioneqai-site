# FusionEQ Deal Analyzer GPT Update Handoff

Use this checklist to update the actual FusionEQ Deal Analyzer GPT.

## What The GPT Can And Cannot Do

The GPT can:

- Produce the Diagnostic Deal Briefing Analysis.
- Produce the customer-facing FusionEQ Deal Readiness Report.

The GPT cannot:

- Render the final branded PDF from the local FusionEQ template by itself.
- Save local client PDF files automatically.

If a branded PDF is needed, bring the GPT's report content back to Codex and ask Codex to render it.

## GPT Builder Update

1. Open the FusionEQ Deal Analyzer GPT in the GPT Builder.
2. Replace the instruction box with the ultra-compact instruction file:

```text
custom-gpt/FusionEQ_Deal_Analyzer_Instructions_ULTRA_COMPACT_FOR_GPT_BOX.txt
```

3. Replace or upload the knowledge file:

```text
custom-gpt/FusionEQ_Deal_Analyzer_Operating_Spec.md
```

4. Save the GPT.

## Test Prompt

After the GPT is updated, test it with:

```text
Analyze this deal and produce the full default FusionEQ output:
1. FusionEQ Diagnostic Deal Briefing Analysis
2. FusionEQ Deal Readiness Report

Do not merge the diagnostic and the Deal Readiness Report.
```

## Render Handoff

Paste the GPT's Deal Readiness Report output into Codex and ask Codex to render it into the branded PDF.
Review the PDF before sending it to a client.
