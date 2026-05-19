const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "outputs");
const logoPath = path.join(root, "assets", "fusioneq-marketing-lockup.png");
const outPdf = path.join(outDir, "FusionEQ_Three_Deal_Readiness_Reports.pdf");
const outHtml = path.join(outDir, "FusionEQ_Three_Deal_Readiness_Reports.html");
const previewPng = path.join(outDir, "FusionEQ_Three_Deal_Readiness_Reports_preview.png");

fs.mkdirSync(outDir, { recursive: true });

const logoData = fs.existsSync(logoPath)
  ? `data:image/png;base64,${fs.readFileSync(logoPath).toString("base64")}`
  : "";

const today = "May 19, 2026";
const tagline = "Decision evidence. Readiness clarity. Better next moves.";

const reports = [
  {
    id: "Enterprise Team A / JR / 201",
    shortName: "Enterprise Team A",
    stage: "Late-stage commercial validation",
    forecast: "Commit assumption supported, with final execution discipline required",
    belief: "The current team belief is that the deal belongs in Commit because the buying organization has evidenced decision ownership, approval sequencing, finance participation, legal progress, and buyer-owned milestone movement.",
    score: { overall: ["90", "Strong"], alignment: ["88", "Strong"], control: ["91", "Strong"], momentum: ["90", "Strong"] },
    pattern: "Strong But Still Needs Forecast Discipline",
    informationProvidedSummary: [
      "The information provided described a late-stage deal context in which the economic buyer had attended the last two meetings, finance had reviewed the business case, procurement had confirmed the signer and approval sequence, and legal redlines had started.",
      "The information also indicated that the buyer returned a mutual action plan with dates, owners, and target signature timing, and that the champion had introduced operations and finance into the process.",
      "The current team belief was that the deal belonged in Commit because buyer participation, approval sequencing, and legal movement all appeared to support close readiness."
    ],
    summary: [
      "Enterprise Team A shows a high-readiness deal because the buyer has moved beyond interest into decision evidence. The economic buyer has participated directly, finance has reviewed the business case, procurement has confirmed the signer and approval sequence, legal redlines have started, and the buyer returned a mutual action plan with dates, owners, and target signature timing.",
      "The current forecast confidence is supported by decision evidence, not simply by positive sentiment or internal belief. The remaining readiness question is execution discipline: whether the final approval gates, signature timing, and implementation dependencies remain aligned through close.",
      "The recommended next move is to run a formal close-plan validation review with procurement, legal, and the economic buyer to confirm remaining approval gates, signature timing, implementation dependencies, and any final execution blockers."
    ],
    snapshot: [
      ["Current Stage", "Late-stage commercial validation"],
      ["Forecast Read", "Supported"],
      ["Current Next Step", "Close-plan validation review"],
      ["Stakeholder Coverage", "Economic buyer, finance, operations, procurement, legal, champion"],
      ["Decision Owner", "Evidenced through economic buyer involvement"],
      ["Approval Path", "Confirmed by procurement"],
      ["Buyer-Owned Movement", "Mutual action plan returned with dates and owners"]
    ],
    overview: [
      "Alignment is strong because the economic buyer, finance, operations, and procurement are operating around the same business driver: board-level cost reduction timing this quarter.",
      "Control is strong because the signer and approval sequence have been confirmed, the economic buyer is engaged, and procurement has clarified the path rather than merely requesting paperwork.",
      "Momentum is strong because the buyer is carrying decision work forward: returning the mutual action plan, initiating legal redlines, coordinating internal stakeholders, and asking implementation timing questions."
    ],
    evidenced: [
      "Economic buyer engagement across multiple meetings",
      "Board-level business driver tied to current-quarter cost reduction",
      "Finance participation in business-case review",
      "Finance questions focused on implementation timing rather than concessions",
      "Procurement-confirmed signer and approval sequence",
      "Legal redlines initiated",
      "Buyer-owned mutual action plan returned with dates, owners, and target signature date",
      "Champion coordinating internal follow-up and expanding stakeholder involvement",
      "Operations and finance introduced into the process",
      "Buyer-owned momentum and coordinated internal movement"
    ],
    unproven: [
      "Final signature execution",
      "Completion of all internal approvals on the expected timeline",
      "Implementation timing dependencies through final approval",
      "Whether any final commercial or legal issue could alter timing"
    ],
    recorded: [
      "Economic buyer attended the last two meetings",
      "Finance attended the business-case review",
      "Legal started redlines",
      "Procurement confirmed signer and approval sequence",
      "Buyer returned the mutual action plan",
      "Champion introduced operations and finance"
    ],
    decisionEvidence: [
      "Decision ownership is evidenced through economic buyer participation",
      "Approval path is evidenced through procurement confirmation",
      "Buyer-owned momentum is evidenced through returned mutual action plan",
      "Cross-functional alignment is evidenced through finance and operations participation",
      "Legal progression is evidenced through active redlines",
      "Business timing is evidenced by board-level cost-reduction target"
    ],
    momentum: [
      "Buyer-owned momentum is strongly evidenced. The buyer has not only responded to team activity; the buyer has created structure, returned a dated plan, named owners, introduced functional stakeholders, and advanced legal review.",
      "The current deal should be managed as an execution path rather than a discovery or persuasion path. The deal team's work is to protect readiness, confirm timing, and prevent late-stage drift."
    ],
    ownership: [
      "Decision ownership is verified at a high level. The economic buyer is participating, procurement has confirmed the signer, and the approval sequence is known.",
      "The remaining ownership question is not who owns the decision, but whether each final approval dependency has an accountable owner and confirmed date."
    ],
    alignmentUrgency: [
      "Alignment appears strong across economic, financial, operational, procurement, and legal dimensions. The business driver is tied to current-quarter board-level cost reduction, which gives the deal a credible urgency basis.",
      "Urgency is buyer-owned because the timing pressure is connected to the buyer's business objective rather than team-created close pressure."
    ],
    forecast: "Supported",
    nextMove: [
      "Run a formal close-plan validation review with procurement, legal, and the economic buyer.",
      "The conversation should confirm remaining approval gates, signature timing, implementation readiness dependencies, and any final execution blockers.",
      "The evidence needed is confirmation that the existing buyer-owned plan still reflects the buyer's actual internal approval path and current-quarter execution intent."
    ],
    leadershipQuestions: [
      "What final approval gates remain between redlines and signature?",
      "Who owns each remaining gate and date on the buyer side?",
      "What implementation dependency could alter signature timing?",
      "What must be true for finance, legal, and procurement to remain aligned through close?",
      "What buyer action will confirm the current-quarter timeline is still intact?"
    ],
    coach: [
      "FusionEQ Coach is optional for this deal. It could help optimize final negotiation language and close orchestration, but the deal does not currently require structural recovery coaching.",
      "Use Coach if the deal team needs help preparing the close-plan validation conversation or handling final approval objections without reopening the deal."
    ],
    appendix: [
      "No score cap was required because Alignment, Control, and Momentum are all supported by decision evidence.",
      "The readiness score should remain high unless buyer-owned dates slip, legal stalls, finance reopens commercial terms, or the economic buyer disengages.",
      "This is an example of forecast confidence supported by decision readiness rather than activity volume."
    ]
  },
  {
    id: "Enterprise Team B / TS / 202",
    shortName: "Enterprise Team B",
    stage: "Active evaluation with limited decision evidence",
    forecast: "Progression assumption should be corrected",
    belief: "The current team belief is that the deal is progressing because engagement is high: eight meetings, many emails, strong demo feedback, technical questions, and positive champion sentiment.",
    score: { overall: ["31", "Incomplete"], alignment: ["38", "Fragmented"], control: ["24", "Unverified"], momentum: ["33", "Stalled"] },
    pattern: "False Momentum",
    informationProvidedSummary: [
      "The information provided described a deal context with high visible engagement: eight meetings, frequent email activity, positive demo feedback, continuing technical questions, and a champion who said the team liked the platform.",
      "The information also indicated that end users requested another product deep dive, but did not include evidence of budget ownership, procurement involvement, executive sponsorship, finance alignment, approval criteria, or a confirmed decision path.",
      "The current team belief was that the deal was progressing because activity, sentiment, and product interest remained high."
    ],
    summary: [
      "Enterprise Team B shows high activity but limited decision readiness. The deal has meetings, emails, technical interest, and positive demo sentiment, but the evidence does not prove budget ownership, decision authority, procurement involvement, finance alignment, executive sponsorship, approval criteria, or buyer-owned progression.",
      "The current interpretation should be corrected. Engagement is real, but it is not yet evidence that the organization is moving toward a purchase decision. Additional product deep dives may increase activity while leaving the readiness questions unresolved.",
      "The recommended next move is to pause further technical expansion until the champion validates budget ownership, decision control, approval criteria, and the internal step that would convert user interest into decision movement."
    ],
    snapshot: [
      ["Current Stage", "Product evaluation activity"],
      ["Forecast Read", "Overextended if treated as progressing"],
      ["Current Next Step", "Another product deep dive requested by end users"],
      ["Stakeholder Coverage", "Champion and end users, with authority functions absent"],
      ["Decision Owner", "Unverified"],
      ["Approval Path", "Unproven"],
      ["Buyer-Owned Movement", "Not evidenced"]
    ],
    overview: [
      "Alignment is fragmented because interest exists among users, but there is no evidence that economic, financial, executive, procurement, or approval stakeholders share the same decision criteria.",
      "Control is unverified because no budget owner, decision authority, procurement path, or executive sponsor has been confirmed.",
      "Momentum is stalled from a decision-readiness perspective because the next step is more product evaluation, not buyer-owned decision movement."
    ],
    evidenced: [
      "Strong end-user engagement",
      "Multiple technical conversations",
      "Positive demo sentiment",
      "Repeated stakeholder interaction",
      "Continued product interest",
      "Champion accessibility"
    ],
    unproven: [
      "Budget ownership",
      "Economic buyer involvement",
      "Decision criteria",
      "Procurement participation",
      "Finance alignment",
      "Executive sponsorship",
      "Approval process",
      "Business urgency",
      "Buyer-owned progression",
      "Decision timeline"
    ],
    recorded: [
      "Eight meetings have occurred",
      "Many emails have been exchanged",
      "Demo feedback has been positive",
      "Technical questions have continued",
      "Champion says the team likes the platform",
      "End users requested another product deep dive"
    ],
    decisionEvidence: [
      "Product interest is evidenced",
      "End-user engagement is evidenced",
      "Champion access is evidenced",
      "Decision ownership is not evidenced",
      "Budget authority is not evidenced",
      "Approval criteria are not evidenced"
    ],
    momentum: [
      "Buyer-owned momentum is not yet evidenced. The buyer is engaging with product information, but there is no validated internal movement toward budget approval, authority alignment, procurement review, or decision criteria.",
      "The deal is being maintained through activity. It is not yet progressing through decision structure."
    ],
    ownership: [
      "Decision ownership is the primary constraint. The deal lacks validated budget ownership, approval authority, and decision control.",
      "The champion may be supportive, but support is not the same as ownership. Until the champion can name who controls budget and approval, the deal should remain in an incomplete readiness state."
    ],
    alignmentUrgency: [
      "Alignment is currently concentrated around product interest rather than organizational commitment. End users may like the platform, but the business case, budget path, and executive priority are not yet evidenced.",
      "Urgency is not buyer-owned. The current next step creates more product knowledge, but it does not create decision evidence."
    ],
    forecast: "Overextended",
    nextMove: [
      "Pause additional technical expansion until the champion validates who owns budget authority, who controls the decision, what business problem is important enough to fund, and what criteria will determine approval.",
      "Require a stakeholder-mapping conversation before continuing deeper product evaluation cycles.",
      "The evidence needed is a named decision owner, validated criteria, and a buyer-owned internal action that moves beyond product interest."
    ],
    leadershipQuestions: [
      "What has the buyer done that proves movement toward a decision, not just interest in the product?",
      "Who owns budget authority for this purchase?",
      "What decision criteria will determine approval?",
      "Why is another product deep dive the right next step if decision ownership is still unverified?",
      "What buyer-owned action would prove this deal is progressing?"
    ],
    coach: [
      "Use FusionEQ Coach next. The deal team needs conversation strategy, buyer-facing language, and stakeholder expansion planning to shift the deal from user engagement into decision validation.",
      "Recommended Coach focus: champion testing, budget ownership discovery, stakeholder map creation, and language for pausing product expansion until decision structure is clarified."
    ],
    appendix: [
      "Control is capped because no decision authority, budget owner, or approval path has been evidenced.",
      "Momentum is capped because buyer activity is product engagement, not decision movement.",
      "The overall readiness score should remain low until the buyer names ownership, criteria, and an internal decision step."
    ]
  },
  {
    id: "Enterprise Team C / AL / 203",
    shortName: "Enterprise Team C",
    stage: "Late-stage activity with incomplete approval readiness",
    forecast: "Commit-level confidence should be corrected",
    belief: "The current team belief is that the deal will close this month because procurement requested final pricing and vendor forms, the signer is known, and the champion says it is basically done.",
    score: { overall: ["43", "Incomplete"], alignment: ["47", "Partial"], control: ["58", "Partial"], momentum: ["39", "Stalled"] },
    pattern: "Confidence Without Evidence",
    informationProvidedSummary: [
      "The information provided described a late-stage deal context in which procurement requested final pricing and vendor forms, the signer was known, and the champion described the deal as basically done.",
      "The information also included counter-signals: legal had not started because risk committee approval was incomplete, the CIO had been absent from the last three calls, finance had reduced budget, and finance had asked whether the purchase could delay to next quarter.",
      "The current team belief was that the deal would close this month because procurement activity and signer visibility appeared to support a Commit forecast."
    ],
    summary: [
      "Enterprise Team C is a late-stage overconfidence deal. Procurement activity and champion optimism create the appearance of close proximity, but the current decision evidence does not support Commit-level confidence for this month.",
      "The signer is known and procurement is active, which gives the deal more control evidence than Enterprise Team B. However, legal has not started, risk committee approval is incomplete, the CIO has been absent from recent calls, finance reduced budget, and finance has raised delay timing. Those conditions materially constrain readiness.",
      "The recommended next move is a direct decision-readiness review with the champion and executive sponsor to validate risk committee timing, budget commitment, current-quarter priority, legal initiation conditions, and realistic signature timing."
    ],
    snapshot: [
      ["Current Stage", "Late-stage operational activity"],
      ["Forecast Read", "Overextended if held at Commit"],
      ["Current Next Step", "Decision-readiness review"],
      ["Stakeholder Coverage", "Champion, procurement, finance, prior CIO support, signer known"],
      ["Decision Owner", "Partially evidenced through signer visibility"],
      ["Approval Path", "Incomplete because risk committee and legal are not cleared"],
      ["Buyer-Owned Movement", "Not currently evidenced at close-ready level"]
    ],
    overview: [
      "Alignment is partial because procurement and the champion are active, but finance has reduced budget and asked about delay timing while current executive sponsorship evidence has faded.",
      "Control is partial because the signer is known, but the approval path is not fully verified. The risk committee condition and legal delay limit control confidence.",
      "Momentum is stalled from a readiness perspective because procurement requests are not enough to prove current-quarter execution when legal has not started and finance is questioning timing."
    ],
    evidenced: [
      "Procurement engagement",
      "Final pricing discussions",
      "Vendor form requests",
      "Signer identified",
      "Earlier CIO support",
      "Champion optimism",
      "Existing late-stage operational activity"
    ],
    unproven: [
      "Risk committee approval",
      "Executive sponsorship continuity",
      "Current CIO commitment",
      "Budget stability",
      "Close timing",
      "Buyer-owned urgency",
      "Legal progression timing",
      "Internal prioritization for current-quarter execution"
    ],
    recorded: [
      "Forecast is currently Commit",
      "Procurement requested final pricing",
      "Procurement requested vendor forms",
      "Champion says it is basically done",
      "Legal has not started because risk committee approval is not complete",
      "CIO has been absent from the last three calls",
      "Finance reduced budget",
      "Finance asked whether the purchase can delay to next quarter",
      "Signer is known but timing is not confirmed"
    ],
    decisionEvidence: [
      "Signer visibility is evidenced",
      "Procurement process activity is evidenced",
      "Some prior executive support is evidenced",
      "Final pricing and vendor form activity are evidenced",
      "Current approval readiness is not evidenced",
      "Current-quarter execution intent is not evidenced"
    ],
    momentum: [
      "Buyer-owned momentum is not sufficiently evidenced for a current-month close. Procurement is moving paperwork, but approval readiness has not caught up to the forecast.",
      "The deal may still be viable, but the current signal set points to an incomplete approval state rather than a clear close path."
    ],
    ownership: [
      "Decision ownership is partially evidenced because the signer is known. However, ownership is not the same as approval readiness.",
      "The deal still needs proof that the signer, risk committee, finance, legal, and executive sponsor are aligned around current-quarter execution."
    ],
    alignmentUrgency: [
      "Alignment is incomplete. Champion optimism and procurement movement are offset by finance budget reduction, finance delay questions, incomplete risk committee approval, and current CIO absence.",
      "Urgency is not yet buyer-owned at close-ready strength. If finance is asking about next-quarter delay, current-quarter urgency must be revalidated."
    ],
    forecast: "Overextended",
    nextMove: [
      "Secure a direct decision-readiness review involving the champion and executive sponsor.",
      "The review should test risk committee timing, budget commitment status, current-quarter prioritization, legal initiation conditions, and realistic signature timing.",
      "The objective is to validate whether the organization still intends to execute this quarter or is actively shifting the purchase timeline."
    ],
    leadershipQuestions: [
      "Has risk committee approval been scheduled, completed, or delayed?",
      "Does finance still support current-quarter execution after reducing budget?",
      "Who will re-engage the CIO or executive sponsor to confirm priority?",
      "What exact condition must be met before legal starts?",
      "What buyer-owned action would prove this is still a current-month close?"
    ],
    coach: [
      "Use FusionEQ Coach next. The deal team needs executive re-engagement strategy, forecast recalibration language, and buyer-facing conversation planning to test true close readiness.",
      "Recommended Coach focus: how to challenge the Commit assumption professionally, how to discuss delay signals without sounding alarmist, and how to re-anchor the buyer around approval evidence."
    ],
    appendix: [
      "Momentum is capped because legal has not started and risk committee approval is incomplete.",
      "Overall readiness is capped because procurement activity does not override finance delay signals, budget reduction, and current executive sponsorship gaps.",
      "The forecast should not be treated as Commit-supported until approval readiness and current-quarter execution intent are evidenced."
    ]
  }
];

function esc(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[char]));
}

function list(items) {
  return `<ul>${items.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`;
}

function paragraphs(items) {
  return items.map((item) => `<p>${esc(item)}</p>`).join("");
}

function snapshot(rows) {
  return `<table class="snapshot"><tbody>${rows.map(([a, b]) => `<tr><th>${esc(a)}</th><td>${esc(b)}</td></tr>`).join("")}</tbody></table>`;
}

function scoreBlock(report) {
  const rows = [
    ["Overall Deal Readiness", ...report.score.overall],
    ["Alignment", ...report.score.alignment],
    ["Control", ...report.score.control],
    ["Momentum", ...report.score.momentum]
  ];
  return `<div class="score-grid">${rows.map(([label, score, read]) => `
    <div class="score-card">
      <span>${esc(label)}</span>
      <strong>${esc(score)}</strong>
      <em>${esc(read)}</em>
    </div>`).join("")}</div>`;
}

function scoreInterpretation(report) {
  const cleanReason = (text, dimension) => text
    .replace(new RegExp(`^${dimension} is strong because `, "i"), "")
    .replace(new RegExp(`^${dimension} is fragmented because `, "i"), "")
    .replace(new RegExp(`^${dimension} is partial because `, "i"), "")
    .replace(new RegExp(`^${dimension} is incomplete because `, "i"), "")
    .replace(new RegExp(`^${dimension} is unverified because `, "i"), "")
    .replace(new RegExp(`^${dimension} is stalled from a decision-readiness perspective because `, "i"), "")
    .replace(new RegExp(`^${dimension} is stalled from a readiness perspective because `, "i"), "")
    .replace(/\.$/, "");
  return [
    `Alignment scored ${report.score.alignment[0]} because ${cleanReason(report.overview[0], "Alignment")}.`,
    `Control scored ${report.score.control[0]} because ${cleanReason(report.overview[1], "Control")}.`,
    `Momentum scored ${report.score.momentum[0]} because ${cleanReason(report.overview[2], "Momentum")}.`
  ];
}

function executiveReadHtml(report) {
  return `
    <h2>2. Executive Readiness Read</h2>
    <div class="readiness-brief">
      <div>
        <span>Readiness Position</span>
        <strong>${esc(report.score.overall[0])} / ${esc(report.score.overall[1])}</strong>
      </div>
      <div>
        <span>Primary Pattern</span>
        <strong>${esc(report.pattern)}</strong>
      </div>
      <div>
        <span>Primary Clarity Needed</span>
        <strong>${esc(report.unproven[0])}</strong>
      </div>
    </div>
    <div class="readiness-triad" aria-label="Executive readiness read">
      <div>
        <span>Visible Signal</span>
        <p>${esc(report.recorded.slice(0, 3).join(". "))}.</p>
      </div>
      <div>
        <span>FusionEQ Read</span>
        <p>${esc(report.pattern)}. ${esc(report.summary[1])}</p>
      </div>
      <div>
        <span>Better Move</span>
        <p>${esc(report.nextMove[0])}</p>
      </div>
    </div>

    <h2>3. Information Provided / FusionEQ Interpretation</h2>
    <div class="interpretation-split" aria-label="Information provided and FusionEQ interpretation">
      <div>
        <span>Information Provided</span>
        ${paragraphs(report.informationProvidedSummary)}
      </div>
      <div>
        <span>FusionEQ Interpretation</span>
        <p><strong>Readiness:</strong> ${esc(report.score.overall[0])} / ${esc(report.score.overall[1])}</p>
        <p><strong>Pattern:</strong> ${esc(report.pattern)}</p>
        <p><strong>Forecast Read:</strong> ${esc(report.forecast)}</p>
        <p><strong>Primary Clarity Needed:</strong> ${esc(report.unproven[0])}</p>
      </div>
    </div>`;
}

function reportCover(report) {
  return `
  <section class="cover report-cover">
    <div class="brand">
      <div class="brand-lockup">
        ${logoData ? `<img src="${logoData}" alt="FusionEQ">` : `<strong>FusionEQ</strong>`}
        <em>${esc(tagline)}</em>
      </div>
      <span>Deal Readiness Intelligence</span>
    </div>
    <div class="cover-kicker">FusionEQ Deal Readiness Report</div>
    <h1>Deal Readiness Report</h1>
    <div class="cover-label">Deal Memory ID</div>
    <p class="cover-id">${esc(report.id)}</p>
    <div class="subtitle">What the deal has evidenced, what remains unproven, and the next move most likely to create decision clarity.</div>
    <div class="executive-score">
      <div>
        <span>Overall Deal Readiness</span>
        <strong>${esc(report.score.overall[0])}</strong>
        <em>${esc(report.score.overall[1])}</em>
      </div>
      <div>
        <span>Identified Pattern</span>
        <strong>${esc(report.pattern)}</strong>
        <em>${esc(report.forecast)} forecast read</em>
      </div>
    </div>
    <div class="cover-next-move">
      <span>Recommended Next Move</span>
      <p>${esc(report.nextMove[0])}</p>
    </div>
    <div class="cover-meta-grid">
      <div><span>Report Type</span><strong>Deal Readiness Report</strong></div>
      <div><span>Forecast Confidence Read</span><strong>${esc(report.forecast)}</strong></div>
      <div><span>Current Stage</span><strong>${esc(report.stage)}</strong></div>
    </div>
    <div class="cover-note">
      <strong>Readiness Lens</strong>
      <p>This report separates what was recorded from what has been evidenced. FusionEQ does not replace judgment. It sharpens it.</p>
    </div>
  </section>`;
}

function reportHtml(report, index, options = {}) {
  const titlePrefix = options.single ? "FusionEQ Deal Readiness Report" : `FusionEQ Deal Readiness Report ${String(index + 1).padStart(2, "0")}`;
  return `
  <section class="report">
    <div class="report-kicker">${esc(titlePrefix)}</div>
    <h1>Deal Readiness Report</h1>
    <p class="lede">Deal Memory ID: ${esc(report.id)}</p>
    <div class="principle">FusionEQ does not replace judgment. It sharpens it.</div>

    <h2>1. Report Identity</h2>
    ${snapshot([
      ["Deal Memory ID", report.id],
      ["Report Type", "FusionEQ Deal Readiness Report"],
      ["Report Date", today],
      ["Source", "Information-provided calibration context"],
      ["Privacy Note", "Uses anonymized company or team identifier, initials, and number for calibration."]
    ])}

    ${executiveReadHtml(report)}

    <h2>4. Executive Readiness Summary</h2>
    ${paragraphs(report.summary)}

    <h2>5. Deal Snapshot</h2>
    ${snapshot(report.snapshot)}
    <p><strong>Team belief:</strong> ${esc(report.belief)}</p>

    <h2>6. Readiness Score</h2>
    ${scoreBlock(report)}
    <h3>Score Interpretation</h3>
    ${paragraphs(scoreInterpretation(report))}

    <div class="next-move-callout">
      <span>Recommended Next Move</span>
      ${paragraphs(report.nextMove)}
    </div>

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
    <p>This pattern matters because forecast confidence should follow decision evidence, not activity volume or positive sentiment alone.</p>

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
    <div class="next-move-section">
      ${paragraphs(report.nextMove)}
    </div>

    <h2>17. Questions to Create Clarity</h2>
    ${list(report.leadershipQuestions)}

    <h2>18. Deal Coach Guidance</h2>
    ${paragraphs(report.coach)}

    <div class="appendix-block">
      <h2>19. Appendix / Signal Detail</h2>
      ${paragraphs(report.appendix)}
    </div>
  </section>`;
}

function baseHtml(body, title) {
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>${esc(title)}</title>
  <style>
    @page { size: Letter; margin: 0.58in; }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: Inter, Arial, Helvetica, sans-serif;
      color: #15201c;
      background: #f7f8f4;
      line-height: 1.38;
      font-size: 9.25pt;
    }
    .cover {
      min-height: 9.85in;
      padding: 0;
      page-break-after: always;
      position: relative;
    }
    .report-cover {
      background: #f7f8f4;
    }
    .cover-kicker {
      color: #8a742d;
      font-size: 9pt;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      font-weight: 800;
      margin-bottom: 0.15in;
    }
    .brand {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #d9ddcf;
      padding-bottom: 0.18in;
      margin-bottom: 0.38in;
    }
    .brand-lockup {
      display: flex;
      flex-direction: column;
      gap: 0.07in;
    }
    .brand img { width: 1.75in; height: auto; }
    .brand-lockup em {
      color: #2f3b35;
      font-size: 8.7pt;
      font-style: normal;
      letter-spacing: 0;
      font-weight: 700;
    }
    .brand span {
      font-size: 8.2pt;
      color: #687169;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }
    .cover h1 {
      font-family: Georgia, "Times New Roman", serif;
      font-size: 20pt;
      line-height: 1.08;
      margin: 0 0 0.04in;
      color: #15201c;
      max-width: 5.7in;
      letter-spacing: 0;
    }
    .cover-id {
      color: #59635c;
      font-size: 10pt;
      font-weight: 700;
      margin: 0 0 0.15in;
    }
    .cover-label {
      color: #7c857e;
      font-size: 7.4pt;
      letter-spacing: 0.07em;
      text-transform: uppercase;
      font-weight: 900;
      margin-bottom: 0.03in;
    }
    .cover .subtitle {
      font-size: 10.4pt;
      line-height: 1.35;
      color: #3f4943;
      max-width: 6.4in;
      margin-bottom: 0.24in;
    }
    .cover-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 0.14in;
      margin: 0.36in 0 0.42in;
    }
    .cover-card {
      border: 1px solid #d9ddcf;
      background: #ffffff;
      border-radius: 8px;
      padding: 0.18in;
      min-height: 1.26in;
    }
    .cover-card span {
      display: block;
      font-size: 8pt;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #7c857e;
      margin-bottom: 0.09in;
    }
    .cover-card strong {
      display: block;
      font-size: 18pt;
      color: #1b2b24;
      margin-bottom: 0.04in;
    }
    .cover-card em {
      font-style: normal;
      font-size: 9.5pt;
      color: #59635c;
    }
    .cover-note {
      background: #15201c;
      color: white;
      border-radius: 8px;
      padding: 0.2in 0.22in;
      max-width: 6.7in;
    }
    .cover-note strong {
      display: block;
      color: #d8bd6a;
      font-size: 12pt;
      margin-bottom: 0.08in;
    }
    .cover-note p { margin: 0; color: #eef1e9; }
    .executive-score {
      display: grid;
      grid-template-columns: 1fr 1.35fr;
      gap: 0.16in;
      margin: 0.28in 0 0.22in;
    }
    .executive-score div {
      background: #fff;
      border: 1px solid #d9ddcf;
      border-radius: 8px;
      padding: 0.17in 0.19in;
      min-height: 1.03in;
    }
    .executive-score span {
      display: block;
      color: #667069;
      font-size: 8pt;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      font-weight: 800;
      margin-bottom: 0.05in;
    }
    .executive-score strong {
      display: block;
      color: #15201c;
      font-family: Georgia, "Times New Roman", serif;
      font-size: 20pt;
      line-height: 1.05;
      margin-bottom: 0.04in;
      letter-spacing: 0;
    }
    .executive-score em {
      color: #536059;
      font-style: normal;
      font-size: 9.3pt;
    }
    .cover-next-move {
      border: 1px solid #c9b260;
      background: #fffaf0;
      border-radius: 8px;
      padding: 0.16in 0.2in;
      margin: 0 0 0.18in;
      max-width: 6.9in;
    }
    .cover-next-move span,
    .next-move-callout span {
      display: block;
      color: #8a742d;
      font-size: 8pt;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      font-weight: 900;
      margin-bottom: 0.05in;
    }
    .cover-next-move p {
      color: #17241f;
      font-family: Georgia, "Times New Roman", serif;
      font-size: 12.2pt;
      line-height: 1.25;
      margin: 0;
      letter-spacing: 0;
    }
    .cover-meta-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 0.1in;
      margin: 0 0 0.2in;
      max-width: 6.9in;
    }
    .cover-meta-grid div {
      border-top: 1px solid #d9ddcf;
      padding-top: 0.1in;
    }
    .cover-meta-grid span {
      display: block;
      color: #748078;
      font-size: 7.6pt;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      font-weight: 800;
      margin-bottom: 0.05in;
    }
    .cover-meta-grid strong {
      display: block;
      color: #1d2b25;
      font-size: 8.8pt;
      line-height: 1.25;
    }
    .report {
      background: #fff;
      border: 1px solid #dfe3d7;
      padding: 0.3in;
      border-radius: 8px;
      page-break-before: always;
      break-after: page;
    }
    .report:last-child {
      break-after: auto;
    }
    .report-kicker {
      color: #8a742d;
      font-size: 8.6pt;
      letter-spacing: 0.07em;
      text-transform: uppercase;
      font-weight: 700;
      margin-bottom: 0.08in;
    }
    .report h1 {
      font-family: Georgia, "Times New Roman", serif;
      font-size: 20pt;
      line-height: 1.05;
      margin: 0;
      color: #17241f;
      letter-spacing: 0;
    }
    .lede {
      color: #5d675f;
      margin-top: 0.07in;
      font-size: 11pt;
    }
    .principle {
      border-left: 4px solid #d8bd6a;
      padding: 0.11in 0.15in;
      background: #f8f5e8;
      color: #24342d;
      margin: 0.15in 0 0.18in;
      font-weight: 700;
    }
    h2 {
      font-size: 11.2pt;
      margin: 0.16in 0 0.055in;
      color: #17241f;
      page-break-after: avoid;
    }
    h3 {
      font-size: 9.7pt;
      margin: 0.1in 0 0.04in;
      color: #304039;
      page-break-after: avoid;
    }
    p { margin: 0 0 0.055in; }
    ul { margin: 0.025in 0 0.06in 0.19in; padding: 0; }
    li { margin: 0.015in 0; padding-left: 0.025in; }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 0.045in 0 0.1in;
      page-break-inside: avoid;
    }
    th, td {
      border: 1px solid #dfe3d7;
      padding: 0.058in 0.075in;
      vertical-align: top;
    }
    th {
      width: 31%;
      color: #516058;
      background: #f4f6ef;
      text-align: left;
      font-weight: 700;
    }
    .score-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0.065in;
      margin: 0.075in 0 0.12in;
      page-break-inside: avoid;
    }
    .score-card {
      background: #15201c;
      color: white;
      border-radius: 7px;
      padding: 0.105in 0.12in;
      min-height: 0.7in;
    }
    .score-card span {
      display: block;
      font-size: 7.2pt;
      text-transform: uppercase;
      letter-spacing: 0.045em;
      color: #cdd5cb;
      min-height: 0.22in;
    }
    .score-card strong {
      display: block;
      font-size: 18pt;
      line-height: 1;
      color: #d8bd6a;
      margin: 0.025in 0;
    }
    .score-card em {
      display: block;
      font-style: normal;
      color: #f2f5ed;
      font-size: 8.4pt;
    }
    .pattern, .forecast {
      display: inline-block;
      background: #eef3eb;
      color: #1b2b24;
      border: 1px solid #cbd8ca;
      border-radius: 7px;
      padding: 0.08in 0.12in;
      font-weight: 800;
      margin-bottom: 0.055in;
    }
    .readiness-brief {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 0.08in;
      margin: 0.065in 0 0.08in;
      page-break-inside: avoid;
    }
    .readiness-brief div {
      border-top: 3px solid #d8bd6a;
      background: #f8f5e8;
      padding: 0.075in 0.095in;
      min-height: 0.5in;
    }
    .readiness-brief span {
      display: block;
      color: #687169;
      font-size: 7.2pt;
      letter-spacing: 0.07em;
      text-transform: uppercase;
      font-weight: 900;
      margin-bottom: 0.04in;
    }
    .readiness-brief strong {
      display: block;
      color: #17241f;
      font-size: 8.8pt;
      line-height: 1.18;
    }
    .readiness-triad {
      display: grid;
      grid-template-columns: 0.92fr 1.18fr 1.05fr;
      gap: 0.08in;
      margin: 0 0 0.12in;
      page-break-inside: avoid;
    }
    .readiness-triad div,
    .interpretation-split div {
      border: 1px solid #dfe3d7;
      border-radius: 8px;
      background: #fbfcf7;
      padding: 0.105in;
    }
    .readiness-triad span,
    .interpretation-split span {
      display: block;
      color: #8a742d;
      font-size: 7.8pt;
      letter-spacing: 0.07em;
      text-transform: uppercase;
      font-weight: 900;
      margin-bottom: 0.045in;
    }
    .readiness-triad p,
    .interpretation-split p {
      margin-bottom: 0.04in;
    }
    .readiness-triad div:nth-child(2) {
      background: #f4f8f1;
      border-color: #cbd8ca;
    }
    .readiness-triad div:nth-child(3) {
      background: #fffaf0;
      border-color: #d9c57c;
    }
    .interpretation-split {
      display: grid;
      grid-template-columns: 1.08fr 0.92fr;
      gap: 0.1in;
      margin: 0.065in 0 0.11in;
      page-break-inside: avoid;
    }
    .interpretation-split strong {
      color: #17241f;
    }
    .next-move-callout {
      background: #15201c;
      color: #fff;
      border-radius: 8px;
      padding: 0.16in 0.19in;
      margin: 0.12in 0 0.15in;
      page-break-inside: avoid;
    }
    .next-move-callout p {
      color: #f2f5ed;
      font-size: 9.8pt;
      margin-bottom: 0.05in;
    }
    .next-move-callout p:last-child,
    .next-move-section p:last-child {
      margin-bottom: 0;
    }
    .next-move-section {
      border-left: 5px solid #d8bd6a;
      background: #fffaf0;
      padding: 0.12in 0.16in;
      margin-bottom: 0.11in;
      page-break-inside: avoid;
    }
    .appendix-block {
      border-top: 1px solid #dfe3d7;
      margin-top: 0.13in;
      padding-top: 0.08in;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .appendix-block h2 {
      margin-top: 0;
    }
    .appendix-block p {
      margin-bottom: 0.045in;
    }
  </style>
</head>
<body>
${body}
</body>
</html>`;
}

const combinedHtml = baseHtml(`
  <section class="cover">
    <div class="brand">
      <div class="brand-lockup">
        ${logoData ? `<img src="${logoData}" alt="FusionEQ">` : `<strong>FusionEQ</strong>`}
        <em>${esc(tagline)}</em>
      </div>
      <span>Deal Readiness Intelligence</span>
    </div>
    <h1>FusionEQ Deal Readiness Report</h1>
    <div class="subtitle">Three calibrated readiness reports showing how FusionEQ separates recorded activity from decision evidence, scores readiness, identifies the dominant pattern, and names the next move.</div>
    <div class="cover-grid">
      <div class="cover-card"><span>Enterprise Team A</span><strong>90</strong><em>Strong readiness</em></div>
      <div class="cover-card"><span>Enterprise Team B</span><strong>31</strong><em>Incomplete readiness</em></div>
      <div class="cover-card"><span>Enterprise Team C</span><strong>43</strong><em>Incomplete readiness</em></div>
    </div>
    <div class="cover-note">
      <strong>Purpose</strong>
      <p>This file shows the client-ready Deal Readiness Report output for three benchmark deals. The Diagnostic Deal Briefing Analysis remains the deeper working artifact; this report is the polished readiness deliverable.</p>
    </div>
  </section>
  ${reports.map((report, index) => reportHtml(report, index)).join("")}
`, "FusionEQ Three Deal Readiness Reports");

function singleReportHtml(report) {
  return baseHtml(`
    ${reportCover(report)}
    ${reportHtml(report, 0, { single: true })}
  `, `FusionEQ Deal Readiness Report - ${report.shortName}`);
}

function filenameFor(report) {
  return `FusionEQ_Deal_Readiness_Report_${report.shortName.replace(/[^A-Za-z0-9]+/g, "_").replace(/^_|_$/g, "")}`;
}

async function main() {
  fs.writeFileSync(outHtml, combinedHtml);
  const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  const launchOptions = fs.existsSync(chromePath)
    ? { headless: true, executablePath: chromePath }
    : { headless: true };
  const browser = await chromium.launch(launchOptions);
  const page = await browser.newPage({ viewport: { width: 1100, height: 1500 }, deviceScaleFactor: 1 });
  await page.goto(`file://${outHtml}`, { waitUntil: "networkidle" });
  await page.pdf({
    path: outPdf,
    format: "Letter",
    printBackground: true,
    preferCSSPageSize: true,
    displayHeaderFooter: false
  });
  await page.screenshot({ path: previewPng, fullPage: false });
  const individualReports = [];
  for (const report of reports) {
    const base = filenameFor(report);
    const htmlPath = path.join(outDir, `${base}.html`);
    const pdfPath = path.join(outDir, `${base}.pdf`);
    fs.writeFileSync(htmlPath, singleReportHtml(report));
    await page.goto(`file://${htmlPath}`, { waitUntil: "networkidle" });
    await page.pdf({
      path: pdfPath,
      format: "Letter",
      printBackground: true,
      preferCSSPageSize: true,
      displayHeaderFooter: false
    });
    individualReports.push({ htmlPath, pdfPath });
  }
  await browser.close();
  console.log(JSON.stringify({ outPdf, outHtml, previewPng, individualReports }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
