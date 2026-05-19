const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "outputs");
const symbolPath = path.join(root, "assets", "fusioneq-report-symbol.png");
const outBase = "FusionEQ_Deal_Readiness_Report_Travel_Risk_Management";
const outHtml = path.join(outDir, `${outBase}.html`);
const outPdf = path.join(outDir, `${outBase}.pdf`);
const outPreview = path.join(outDir, `${outBase}_preview.png`);

fs.mkdirSync(outDir, { recursive: true });

const symbolData = fs.existsSync(symbolPath)
  ? `data:image/png;base64,${fs.readFileSync(symbolPath).toString("base64")}`
  : "";

const report = {
  id: "Travel Risk Management / Test / 001",
  type: "Travel Risk Management / Platform Modernization",
  motion: "Competitive RFP with incumbent upgrade positioning",
  value: "Approx. $391K annual recurring revenue",
  competitive: "Formal evaluation process involving multiple vendors including ISOS",
  source: "Opportunity summary, stakeholder activity, pricing strategy, timeline updates, and engagement history provided by the deal team.",
  score: {
    overall: ["51", "Developing"],
    alignment: ["63", "Partial"],
    control: ["38", "Unverified"],
    momentum: ["52", "Partial"]
  },
  pattern: "Decision Ownership Gap",
  forecast: "Conditional",
  stage: "Competitive RFP with platform migration component",
  readinessImplication:
    "The opportunity remains credible and commercially important, but readiness is moderate because the decision structure, procurement weighting, and final ownership are not yet sufficiently evidenced.",
  belief:
    "The team has reason to believe the opportunity is viable because engagement is strong, solution fit is credible, and the incumbent position creates a meaningful strategic advantage.",
  summary: [
    "The opportunity remains strategically credible and commercially important, with meaningful engagement from security stakeholders and a strong solution-fit narrative around integrated travel risk management capabilities.",
    "The current level of deal readiness remains moderate rather than fully mature. The available signals show active evaluation activity, positive stakeholder engagement, and operational interest in the proposed solution. At the same time, the decision structure itself remains only partially evidenced.",
    "Final decision ownership, procurement influence, internal recommendation dynamics, and approval sequencing are not yet fully validated. The opportunity appears viable, but the current evidence supports a developing readiness state rather than a fully controlled late-stage opportunity."
  ],
  informationProvided: [
    "The information provided included an opportunity summary, RFP activity history, pricing strategy notes, stakeholder engagement updates, meeting history, procurement activity, and internal strategy commentary.",
    "The source material described a competitive RFP involving an incumbent platform position, an EOL-driven modernization need, stakeholder engagement across security and procurement, pricing refinements, repeated timeline updates, and ongoing clarification around platform and global support capabilities.",
    "No direct buyer interviews, procurement artifacts, evaluation scorecards, approval-path documentation, or validated decision criteria beyond the provided information were included."
  ],
  snapshot: [
    ["Opportunity Type", "Travel Risk Management / Platform Modernization"],
    ["Commercial Motion", "Competitive RFP with incumbent upgrade positioning"],
    ["Estimated Revenue Impact", "Approx. $391K annual recurring revenue"],
    ["Competitive Context", "Formal evaluation process involving multiple vendors including ISOS"],
    ["Current Stage", "Active RFP evaluation with repeated timeline movement"],
    ["Current Next Step", "Decision-structure clarification with procurement and security leadership"],
    ["Decision Owner", "Not yet verified"],
    ["Approval Path", "Not yet sufficiently evidenced"]
  ],
  overview: [
    "Alignment is partial because portions of the security organization appear to see value in the unified platform approach, but broader buying-group convergence across procurement, operational stakeholders, executive authority, and commercial approval groups remains incomplete.",
    "Control is unverified because the process is governed by a formal RFP, procurement is structurally influential, and the final accountable decision owner has not been verified.",
    "Momentum is partial because the opportunity continues moving operationally through meetings, pricing updates, and clarification exchanges, but much of the movement appears process-driven rather than buyer-owned decision advancement."
  ],
  evidenced: [
    "Stakeholder participation across security and procurement functions",
    "Operational interest in integrated traveler safety capabilities",
    "Continued buyer engagement throughout the RFP process",
    "Buyer willingness to refine pricing assumptions collaboratively",
    "Recognition that the current platform environment requires modernization",
    "Positive engagement during executive and event-based discussions",
    "Buyer focus on global support capability and response quality"
  ],
  unproven: [
    "Final accountable decision owner",
    "Internal recommendation structure",
    "Procurement influence weighting",
    "Executive approval mechanics",
    "Degree of stakeholder alignment across the broader buying group",
    "Competitive standing versus ISOS",
    "Buyer-owned urgency beyond operational acknowledgement",
    "Whether internal selection momentum is increasing toward award"
  ],
  recorded: [
    "RFP submitted",
    "Presentation delivered",
    "Demo conducted",
    "Pricing revised multiple times",
    "Security stakeholders engaged",
    "Procurement involved",
    "MSA sent to legal",
    "Timeline updates requested repeatedly"
  ],
  decisionEvidence: [
    "Buyer confirmed EOL pressure around the current platform",
    "Security stakeholders invested significant meeting time",
    "Buyer clarified traveler counts for pricing accuracy",
    "Buyer requested price-per-traveler detail",
    "Stakeholders engaged deeply around functionality and operational fit",
    "Buyer concerns surfaced specifically around global reach capabilities"
  ],
  momentum: [
    "Buyer engagement is active, but buyer-owned momentum remains only partially evidenced. Most progression currently appears connected to ongoing process activity, clarification exchanges, and coordinated interactions rather than visible internal buyer advancement toward final selection.",
    "The opportunity is moving, but not yet with decisively evidenced internal acceleration. The RFP creates real activity, but activity alone does not prove that the buying organization has converged around a preferred decision."
  ],
  ownership: [
    "Decision ownership remains insufficiently validated. Multiple stakeholders are involved, but the information provided does not yet confirm who owns final vendor selection, how procurement authority interacts with operational leadership, or how final approval sequencing occurs.",
    "This materially constrains confidence in the current forecast posture because a competitive RFP can maintain visible activity while leaving final authority and influence weighting opaque."
  ],
  alignmentUrgency: [
    "There is evidence of operational alignment around traveler safety modernization and integrated platform value. Security engagement, EOL pressure, and platform-fit conversations all support the commercial relevance of the opportunity.",
    "However, broader buying-group alignment remains only partially validated. Procurement dynamics, executive weighting, and competitive evaluation criteria may still materially influence the outcome. Urgency exists operationally due to platform lifecycle pressure, though buyer-owned urgency has not yet clearly translated into accelerated selection behavior."
  ],
  nextMove: [
    "Conduct a decision-structure clarification motion with both procurement leadership and security leadership.",
    "The conversation should focus on award mechanics, evaluation weighting, approval ownership, unresolved capability concerns, and final selection sequencing.",
    "The objective is to validate how the organization will actually decide, not simply continue product evaluation discussions."
  ],
  actionPath: {
    evidence:
      "Create proof of decision ownership, selection weighting, internal recommendation structure, and buyer-owned selection timing.",
    assumption:
      "Strong security engagement and incumbent positioning will materially influence the final award outcome.",
    involved:
      "Procurement leadership, security leadership, executive sponsor, and the stakeholder who can explain final approval mechanics."
  },
  questions: [
    "Who ultimately owns the vendor selection decision?",
    "What weighting does procurement carry versus operational leadership?",
    "Has the organization internally narrowed toward a preferred provider?",
    "What unresolved concerns could still alter the outcome?",
    "What event or condition would accelerate final selection timing?",
    "What internal business consequence exists if migration timing slips further?"
  ],
  coach: [
    "Use FusionEQ Coach next to develop the conversation strategy, buyer-facing language, and follow-up plan for this move.",
    "Recommended coaching focus: executive alignment strategy, procurement-navigation planning, decision-ownership validation, and forecast calibration discipline."
  ],
  appendix: [
    "The opportunity history reflects sustained engagement over several months including RFI and RFP progression, proposal revisions, pricing refinement, executive stakeholder meetings, event-based engagement, procurement coordination, and capability clarification activity.",
    "The evidence currently supports continued active evaluation, though not yet fully evidenced internal decision convergence."
  ]
};

function esc(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[char]));
}

function paragraphs(items) {
  return items.map((item) => `<p>${esc(item)}</p>`).join("");
}

function list(items) {
  return `<ul>${items.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`;
}

function snapshot(rows) {
  return `<table><tbody>${rows.map(([a, b]) => `<tr><th>${esc(a)}</th><td>${esc(b)}</td></tr>`).join("")}</tbody></table>`;
}

function brand() {
  return `
    <div class="brand">
      <div>
        <div class="fusion-brand">
          ${symbolData ? `<img src="${symbolData}" alt="">` : ""}
          <span><strong>Fusion</strong><em>EQ</em></span>
        </div>
        <div class="tagline">Decision evidence. Readiness clarity. Better next moves.</div>
      </div>
      <b>Deal Readiness Intelligence</b>
    </div>`;
}

function scoreCards() {
  const rows = [
    ["Alignment", ...report.score.alignment],
    ["Control", ...report.score.control],
    ["Momentum", ...report.score.momentum]
  ];
  return `<div class="score-strip">${rows.map(([name, score, read], i) => `
    <div class="score-${i}">
      <span>${esc(name)}</span>
      <strong>${esc(score)}</strong>
      <em>${esc(read)}</em>
    </div>
  `).join("")}</div>`;
}

function actionPath() {
  return `
    <h2>Path to Decision Readiness</h2>
    <p class="intro">This path translates the readiness read into the next buyer-facing move: the evidence to create, the assumption to validate, and the people who need to be involved.</p>
    <div class="action-path">
      <div class="ai"><span>Evidence to Create</span><p>${esc(report.actionPath.evidence)}</p></div>
      <div class="fusion"><span>Assumption to Validate</span><p>${esc(report.actionPath.assumption)}</p></div>
      <div class="human"><span>Who to Involve</span><p>${esc(report.actionPath.involved)}</p></div>
    </div>`;
}

function html() {
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>FusionEQ Deal Readiness Report</title>
  <style>
    @page { size: Letter; margin: 0.58in; }
    * { box-sizing: border-box; }
    body { margin: 0; font-family: Inter, Arial, Helvetica, sans-serif; color: #15201c; background: #fff; font-size: 9.25pt; line-height: 1.4; }
    .cover { min-height: auto; page-break-after: auto; padding-bottom: 0.12in; }
    .brand { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #d6dcd3; padding-bottom: 0.14in; margin-bottom: 0.32in; }
    .brand b { color: #687169; font-size: 8pt; text-transform: uppercase; letter-spacing: 0.05em; }
    .fusion-brand { display: flex; align-items: center; gap: 0.11in; }
    .fusion-brand img { width: 0.5in; height: auto; }
    .fusion-brand span { font-size: 25pt; font-weight: 800; line-height: 1; }
    .fusion-brand strong { color: #17231d; }
    .fusion-brand em { color: #2f7d38; font-style: normal; }
    .tagline { margin-left: 0.61in; margin-top: 0.04in; color: #4f5b54; font-weight: 700; font-size: 8.4pt; }
    .kicker { color: #8a742d; font-size: 9pt; letter-spacing: 0.08em; text-transform: uppercase; font-weight: 800; margin-bottom: 0.12in; }
    .report-detail { color: #8a742d; font-size: 8.4pt; letter-spacing: 0.07em; text-transform: uppercase; font-weight: 800; margin: 0 0 0.08in; }
    h1 { font-family: Georgia, "Times New Roman", serif; font-size: 24pt; line-height: 1.08; margin: 0 0 0.03in; color: #15201c; letter-spacing: 0; }
    h2 { font-size: 11.2pt; margin: 0.17in 0 0.055in; color: #17241f; page-break-after: avoid; }
    h3 { font-size: 9.7pt; margin: 0.11in 0 0.04in; color: #304039; page-break-after: avoid; }
    p { margin: 0 0 0.055in; }
    ul { margin: 0.025in 0 0.06in 0.2in; padding: 0; }
    li { margin: 0.015in 0; }
    .label { color: #687169; font-size: 7.5pt; text-transform: uppercase; letter-spacing: 0.07em; font-weight: 900; }
    .subtitle { max-width: 6.55in; color: #3f4943; font-size: 10.3pt; margin: 0.15in 0; }
    .readout, .principle { border: 1px solid #d6dcd3; border-left: 5px solid #2f7d38; border-radius: 8px; padding: 0.13in 0.16in; max-width: 6.9in; margin: 0 0 0.18in; }
    .readout span, .principle strong { display: block; color: #2f7d38; font-size: 7.8pt; letter-spacing: 0.07em; text-transform: uppercase; font-weight: 900; margin-bottom: 0.045in; }
    .exec { display: grid; grid-template-columns: 1fr 1.35fr; gap: 0.16in; margin: 0.26in 0 0.16in; }
    .exec div, .score-strip div, .action-path div { border: 1px solid #d6dcd3; border-radius: 8px; background: #fff; padding: 0.105in 0.12in; }
    .exec span, .score-strip span, .action-path span, .meta span { display: block; color: #687169; font-size: 7.4pt; letter-spacing: 0.07em; text-transform: uppercase; font-weight: 900; margin-bottom: 0.035in; }
    .exec strong { display: block; font-family: Georgia, "Times New Roman", serif; font-size: 20pt; line-height: 1.05; }
    .exec em, .score-strip em { color: #536059; font-style: normal; font-size: 8.5pt; }
    .score-strip { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.1in; max-width: 6.9in; margin-bottom: 0.17in; }
    .score-strip .score-0 { border-top: 3px solid #2167a8; background: #f8fbff; }
    .score-strip .score-1 { border-top: 3px solid #2f7d38; background: #f8fbf6; }
    .score-strip .score-2 { border-top: 3px solid #d8bd6a; background: #fffdf6; }
    .score-strip strong { color: #17241f; font-size: 15pt; margin-right: 0.04in; }
    .next { border: 1px solid #c9b260; background: #fffdf6; border-radius: 8px; padding: 0.16in 0.19in; max-width: 6.9in; margin-bottom: 0.16in; }
    .next span { color: #8a742d; font-size: 8pt; letter-spacing: 0.08em; text-transform: uppercase; font-weight: 900; }
    .next p { margin-top: 0.05in; font-family: Georgia, "Times New Roman", serif; font-size: 12pt; line-height: 1.25; }
    .intro { color: #4c5852; max-width: 6.6in; margin-bottom: 0.07in; }
    .action-path { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.08in; margin: 0.06in 0 0.15in; }
    .action-path .ai { border-top: 3px solid #2167a8; background: #f8fbff; border-color: #cbd9e8; }
    .action-path .fusion { border-top: 3px solid #2f7d38; background: #f8fbf6; border-color: #b8d0b8; }
    .action-path .human { border-top: 3px solid #d8bd6a; background: #fffdf6; border-color: #d9c57c; }
    .usage { border-top: 1px solid #d6dcd3; border-bottom: 1px solid #d6dcd3; padding: 0.1in 0; max-width: 6.9in; margin: 0 0 0.16in; }
    .usage span { display: block; color: #8a742d; font-size: 7.8pt; letter-spacing: 0.07em; text-transform: uppercase; font-weight: 900; margin-bottom: 0.04in; }
    .meta { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.1in; max-width: 6.9in; }
    .meta div { border-top: 1px solid #d6dcd3; padding-top: 0.1in; }
    .report { page-break-before: auto; }
    .report .principle { max-width: none; border-radius: 0; border-right: 0; border-top: 0; border-bottom: 0; background: #fffdf6; font-weight: 700; }
    table { width: 100%; border-collapse: collapse; margin: 0.045in 0 0.1in; page-break-inside: avoid; }
    th, td { border: 1px solid #dfe3d7; padding: 0.058in 0.075in; vertical-align: top; }
    th { width: 31%; background: #f8faf6; color: #516058; text-align: left; }
    .triad, .split { display: grid; gap: 0.08in; margin: 0.06in 0 0.12in; page-break-inside: avoid; }
    .triad { grid-template-columns: 0.92fr 1.18fr 1.05fr; }
    .split { grid-template-columns: 1.08fr 0.92fr; }
    .triad div, .split div { border: 1px solid #dfe3d7; border-radius: 8px; padding: 0.105in; background: #fff; }
    .triad div:nth-child(1), .split div:nth-child(1) { border-top: 3px solid #2167a8; background: #f8fbff; border-color: #cbd9e8; }
    .triad div:nth-child(2), .split div:nth-child(2) { border-top: 3px solid #2f7d38; background: #f8fbf6; border-color: #b8d0b8; }
    .triad div:nth-child(3) { border-top: 3px solid #d8bd6a; background: #fffdf6; border-color: #d9c57c; }
    .triad span, .split span { display: block; color: #8a742d; font-size: 7.8pt; letter-spacing: 0.07em; text-transform: uppercase; font-weight: 900; margin-bottom: 0.045in; }
    .score-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.065in; margin: 0.075in 0 0.12in; page-break-inside: avoid; }
    .score-grid div { border: 1px solid #d6dcd3; border-top: 3px solid #2167a8; border-radius: 7px; padding: 0.105in 0.12in; }
    .score-grid div:first-child { border-top-color: #2f7d38; background: #fbfdf9; }
    .score-grid span { display: block; color: #687169; font-size: 7.2pt; letter-spacing: 0.045em; text-transform: uppercase; min-height: 0.22in; }
    .score-grid strong { display: block; font-size: 18pt; line-height: 1; color: #17241f; }
    .score-grid em { color: #536059; font-style: normal; font-size: 8.4pt; }
    .pattern, .forecast { display: inline-block; background: #eef3eb; color: #1b2b24; border: 1px solid #cbd8ca; border-radius: 7px; padding: 0.08in 0.12in; font-weight: 800; margin-bottom: 0.055in; }
  </style>
</head>
<body>
  <section class="cover">
    ${brand()}
    <div class="kicker">FusionEQ Deal Readiness Report</div>
    <h1>Deal Readiness Report</h1>
    <div class="label">Deal Memory ID</div>
    <p><strong>${esc(report.id)}</strong></p>
    <p class="subtitle">What the deal has evidenced, what remains unproven, and the next move most likely to create decision clarity.</p>
    <div class="readout"><span>Executive Readiness Read</span><p>${esc(report.readinessImplication)}</p></div>
    <div class="exec">
      <div><span>Overall Deal Readiness</span><strong>${esc(report.score.overall[0])}</strong><em>${esc(report.score.overall[1])}</em></div>
      <div><span>Identified Pattern</span><strong>${esc(report.pattern)}</strong><em>${esc(report.forecast)} forecast read</em></div>
    </div>
    ${scoreCards()}
    <div class="next"><span>Recommended Next Move</span>${paragraphs([report.nextMove[0]])}</div>
    ${actionPath()}
    <div class="usage"><span>How This Helps the Deal Team</span><p>The score calibrates forecast confidence. The evidence map separates activity from readiness. The next move identifies how to create the decision evidence the deal still needs.</p></div>
    <div class="meta">
      <div><span>Report Type</span><strong>Deal Readiness Report</strong></div>
      <div><span>Forecast Confidence Read</span><strong>${esc(report.forecast)}</strong></div>
      <div><span>Current Stage</span><strong>${esc(report.stage)}</strong></div>
    </div>
    <div class="readout" style="margin-top:.2in"><span>FusionEQ Readiness Principle</span><p>This report separates what was recorded from what has been evidenced. FusionEQ does not replace judgment. It sharpens it.</p></div>
  </section>

  <section class="report">
    <div class="report-detail">Report Detail · Deal Memory ID: ${esc(report.id)}</div>
    <div class="principle">FusionEQ does not replace judgment. It sharpens it.</div>
    <h2>1. Report Identity</h2>
    ${snapshot([
      ["Deal Memory ID", report.id],
      ["Report Type", "FusionEQ Deal Readiness Report"],
      ["Report Date", "May 19, 2026"],
      ["Source", "Information-provided calibration context"],
      ["Privacy Note", "Uses anonymized company or team identifier, initials, and number for calibration."]
    ])}
    <h2>2. Executive Readiness Read</h2>
    <div class="triad">
      <div><span>Visible Signal</span><p>${esc(report.recorded.slice(0, 3).join(". "))}.</p></div>
      <div><span>FusionEQ Read</span><p>${esc(report.pattern)}. ${esc(report.summary[1])}</p></div>
      <div><span>Better Move</span><p>${esc(report.nextMove[0])}</p></div>
    </div>
    <h2>3. Information Provided / FusionEQ Interpretation</h2>
    <div class="split">
      <div><span>Information Provided</span>${paragraphs(report.informationProvided)}</div>
      <div><span>FusionEQ Interpretation</span><p><strong>Readiness:</strong> ${esc(report.score.overall[0])} / ${esc(report.score.overall[1])}</p><p><strong>Pattern:</strong> ${esc(report.pattern)}</p><p><strong>Forecast Read:</strong> ${esc(report.forecast)}</p><p><strong>Primary Clarity Needed:</strong> ${esc(report.unproven[0])}</p></div>
    </div>
    <h2>4. Executive Readiness Summary</h2>
    ${paragraphs(report.summary)}
    <h2>5. Deal Snapshot</h2>
    ${snapshot(report.snapshot)}
    <p><strong>Team belief:</strong> ${esc(report.belief)}</p>
    <h2>6. Readiness Score</h2>
    <div class="score-grid">
      ${[["Overall Deal Readiness", ...report.score.overall], ["Alignment", ...report.score.alignment], ["Control", ...report.score.control], ["Momentum", ...report.score.momentum]].map(([label, score, read]) => `<div><span>${esc(label)}</span><strong>${esc(score)}</strong><em>${esc(read)}</em></div>`).join("")}
    </div>
    <h3>Score Interpretation</h3>
    ${paragraphs(report.overview)}
    <div class="next"><span>Recommended Next Move</span>${paragraphs(report.nextMove)}</div>
    ${actionPath()}
    <h2>7. Decision Readiness Overview</h2>
    ${paragraphs(report.overview)}
    <h2>8. What Has Been Evidenced</h2>
    ${list(report.evidenced)}
    <h2>9. What Remains Unproven</h2>
    ${list(report.unproven)}
    <h2>10. Key Readiness Signals</h2>
    <h3>Recorded Activity</h3>
    ${list(report.recorded)}
    <h3>Decision Evidence</h3>
    ${list(report.decisionEvidence)}
    <h2>11. Identified Pattern</h2>
    <div class="pattern">${esc(report.pattern)}</div>
    <p>This pattern matters because the opportunity is active and credible, but readiness is constrained until decision ownership, evaluation weighting, and approval authority are verified.</p>
    <h2>12. Buyer-Owned Momentum Read</h2>
    ${paragraphs(report.momentum)}
    <h2>13. Decision Ownership Read</h2>
    ${paragraphs(report.ownership)}
    <h2>14. Alignment and Urgency Read</h2>
    ${paragraphs(report.alignmentUrgency)}
    <h2>15. Forecast Confidence Read</h2>
    <div class="forecast">${esc(report.forecast)}</div>
    <p>Forecast confidence should remain tied to what the buyer has evidenced through ownership, alignment, approval movement, and buyer-owned next steps.</p>
    <h2>16. Recommended Next Move</h2>
    <div class="next">${paragraphs(report.nextMove)}</div>
    <h2>17. Questions to Create Clarity</h2>
    ${list(report.questions)}
    <h2>18. Deal Coach Guidance</h2>
    ${paragraphs(report.coach)}
    <h2>19. Appendix / Signal Detail</h2>
    ${paragraphs(report.appendix)}
  </section>
</body>
</html>`;
}

async function main() {
  fs.writeFileSync(outHtml, html());
  const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  const browser = await chromium.launch(fs.existsSync(chromePath) ? { headless: true, executablePath: chromePath } : { headless: true });
  const page = await browser.newPage({ viewport: { width: 1050, height: 1500 }, deviceScaleFactor: 1 });
  await page.goto(`file://${outHtml}`, { waitUntil: "networkidle" });
  await page.pdf({ path: outPdf, format: "Letter", printBackground: true, preferCSSPageSize: true });
  await page.screenshot({ path: outPreview, fullPage: false });
  await browser.close();
  console.log(JSON.stringify({ outHtml, outPdf, outPreview }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
