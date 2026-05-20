#!/usr/bin/env node

const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawnSync } = require("child_process");

const root = path.resolve(__dirname, "..");
const outRoot = path.join(root, "outputs", "client-reports");
const symbolPath = path.join(root, "assets", "fusioneq-report-symbol.png");
const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

function usage() {
  console.log(`
Usage:
  node tools/render_deal_readiness_report.js <report.json> [--out outputs/client-reports]

The input JSON should contain the Deal Readiness Report content generated from a
Diagnostic Deal Briefing Analysis. See tools/deal-readiness-sample.json.
`);
}

function argValue(name) {
  const index = process.argv.indexOf(name);
  return index === -1 ? null : process.argv[index + 1];
}

const inputPath = process.argv[2];
if (!inputPath || inputPath === "--help" || inputPath === "-h") {
  usage();
  process.exit(inputPath ? 0 : 1);
}

const outDir = path.resolve(argValue("--out") || outRoot);
fs.mkdirSync(outDir, { recursive: true });

const report = readJson(path.resolve(inputPath));
const fileBase = safeFileName(report.fileName || report.dealName || report.dealMemoryId || "Deal Readiness Report");
const outHtml = path.join(outDir, `${fileBase}.html`);
const outPdf = path.join(outDir, `${fileBase}.pdf`);

fs.writeFileSync(outHtml, buildHtml(report));
renderPdf(outHtml, outPdf);

console.log(JSON.stringify({ html: outHtml, pdf: outPdf }, null, 2));

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    throw new Error(`Could not read JSON input at ${file}: ${error.message}`);
  }
}

function renderPdf(htmlFile, pdfFile) {
  if (!fs.existsSync(chromePath)) {
    console.warn(`Chrome not found at ${chromePath}. HTML was created, but PDF was not rendered.`);
    return;
  }

  const profileDir = fs.mkdtempSync(path.join(os.tmpdir(), "fusioneq-chrome-"));
  const result = spawnSync(chromePath, [
    "--headless=new",
    "--disable-gpu",
    "--disable-dev-shm-usage",
    "--no-first-run",
    "--no-default-browser-check",
    "--no-pdf-header-footer",
    "--print-to-pdf-no-header",
    `--user-data-dir=${profileDir}`,
    `--print-to-pdf=${pdfFile}`,
    `file://${htmlFile}`
  ], { encoding: "utf8", timeout: 60000 });

  fs.rmSync(profileDir, { recursive: true, force: true });

  if (result.status !== 0) {
    throw new Error(`Chrome PDF render failed:
status: ${result.status}
signal: ${result.signal || ""}
error: ${result.error ? result.error.message : ""}
stdout: ${result.stdout || ""}
stderr: ${result.stderr || ""}`);
  }
}

function buildHtml(data) {
  const score = normalizeScore(data.score);
  const sections = normalizeSections(data);
  const symbolData = fs.existsSync(symbolPath)
    ? `data:image/png;base64,${fs.readFileSync(symbolPath).toString("base64")}`
    : "";

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>${esc(data.reportTitle || "FusionEQ Deal Readiness Report")}</title>
  <style>
    @page { size: Letter; margin: 0.78in; }
    * { box-sizing: border-box; }
    body { margin: 0; font-family: Inter, Arial, Helvetica, sans-serif; color: #17231d; background: #fff; font-size: 9.1pt; line-height: 1.42; }
    h1, h2, h3, p { overflow-wrap: anywhere; }
    h1 { font-family: Georgia, "Times New Roman", serif; font-size: 23pt; line-height: 1.08; margin: 0 0 0.04in; letter-spacing: 0; }
    h2 { font-size: 11.5pt; margin: 0.18in 0 0.055in; page-break-after: avoid; color: #17231d; }
    h3 { font-size: 9.6pt; margin: 0.12in 0 0.04in; page-break-after: avoid; color: #314039; }
    p { margin: 0 0 0.065in; }
    ul { margin: 0.03in 0 0.075in 0.21in; padding: 0; }
    li { margin: 0.018in 0; }
    table { width: 100%; border-collapse: collapse; margin: 0.045in 0 0.1in; page-break-inside: avoid; }
    th, td { border: 1px solid #dfe5da; padding: 0.06in 0.075in; vertical-align: top; }
    th { width: 31%; background: #f8faf6; color: #536159; text-align: left; }
    .brand { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #d6dcd3; padding-bottom: 0.14in; margin-bottom: 0.24in; }
    .brand-mark { display: flex; align-items: center; gap: 0.11in; }
    .brand-mark img { width: 0.42in; height: auto; }
    .wordmark { font-size: 22pt; font-weight: 800; line-height: 1; }
    .wordmark strong { color: #17231d; }
    .wordmark em { color: #2f7d38; font-style: normal; }
    .tagline { margin-left: 0.61in; margin-top: 0.04in; color: #4f5b54; font-weight: 700; font-size: 8.4pt; }
    .brand b, .kicker, .label, .card span, .next span, .path span, .section-kicker, .meta-row span { color: #7b6b2d; font-size: 7.8pt; letter-spacing: 0.07em; text-transform: uppercase; font-weight: 900; }
    .brand b { color: #687169; }
    .subtitle { max-width: 5.7in; color: #3f4943; font-size: 9.8pt; margin: 0.12in 0 0.1in; }
    .meta-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.08in; border-top: 1px solid #e2e7de; border-bottom: 1px solid #e2e7de; padding: 0.07in 0; margin: 0.08in 0 0.16in; }
    .meta-row strong { display: block; color: #17231d; margin-top: 0.025in; font-size: 8.7pt; }
    .readout { border: 1px solid #d6dcd3; border-left: 5px solid #2f7d38; border-radius: 8px; padding: 0.12in 0.15in; margin: 0 0 0.15in; }
    .readout p { font-size: 8.6pt; line-height: 1.36; }
    .cover-grid { display: grid; grid-template-columns: 1fr 1.35fr; gap: 0.14in; margin: 0.2in 0 0.14in; }
    .score-strip, .path, .score-grid { display: grid; gap: 0.08in; page-break-inside: avoid; }
    .score-strip { grid-template-columns: repeat(3, 1fr); margin-bottom: 0.14in; }
    .score-grid { grid-template-columns: repeat(4, 1fr); margin: 0.075in 0 0.13in; }
    .card, .path div, .score-grid div { border: 1px solid #d6dcd3; border-radius: 8px; background: #fff; padding: 0.105in 0.12in; }
    .card strong { display: block; font-family: Georgia, "Times New Roman", serif; font-size: 20pt; line-height: 1.05; }
    .card em, .score-grid em { color: #536059; font-style: normal; font-size: 8.5pt; }
    .score-strip div { position: relative; border-radius: 8px; padding: 0.11in 0.12in 0.1in; border: 1px solid #d6dcd3; background: #fff; }
    .score-strip div:nth-child(1), .path div:nth-child(1) { border-top: 4px solid #2167a8; background: #f8fbff; border-color: #cbd9e8; }
    .score-strip div:nth-child(2), .path div:nth-child(2) { border-top: 4px solid #2f7d38; background: #f8fbf6; border-color: #b8d0b8; }
    .score-strip div:nth-child(3), .path div:nth-child(3) { border-top: 4px solid #d8bd6a; background: #fffdf6; border-color: #d9c57c; }
    .score-strip strong, .score-grid strong { display: block; color: #17231d; font-size: 16pt; line-height: 1.05; }
    .score-grid div:first-child { border-top: 3px solid #2f7d38; background: #fbfdf9; }
    .score-grid div:not(:first-child) { border-top: 3px solid #2167a8; }
    .next { border: 1px solid #c9b260; background: #fffdf6; border-radius: 8px; padding: 0.13in 0.16in; margin-bottom: 0.14in; page-break-inside: avoid; }
    .next p { margin-top: 0.05in; font-family: Georgia, "Times New Roman", serif; font-size: 11.3pt; line-height: 1.25; }
    .path { grid-template-columns: repeat(3, 1fr); margin: 0.06in 0 0.16in; }
    .principle { border-left: 5px solid #2f7d38; background: #fffdf6; padding: 0.1in 0.14in; margin: 0.08in 0 0.14in; font-weight: 700; }
    .split, .triad { display: grid; gap: 0.08in; margin: 0.06in 0 0.12in; page-break-inside: avoid; }
    .split { grid-template-columns: 1.08fr 0.92fr; }
    .triad { grid-template-columns: 0.92fr 1.18fr 1.05fr; }
    .split div, .triad div { border: 1px solid #dfe5da; border-radius: 8px; padding: 0.105in; background: #fff; }
    .chip { display: inline-block; background: #eef3eb; color: #1b2b24; border: 1px solid #cbd8ca; border-radius: 7px; padding: 0.08in 0.12in; font-weight: 800; margin-bottom: 0.055in; }
    .footer-note { margin-top: 0.2in; color: #647069; font-size: 8pt; border-top: 1px solid #d6dcd3; padding-top: 0.09in; }
    .cover { page-break-after: always; break-after: page; padding-bottom: 0.2in; }
    .report-body { page-break-before: always; break-before: page; }
  </style>
</head>
<body>
  <section class="cover">
    ${brand(symbolData)}
    <div class="kicker">FusionEQ Deal Readiness Report</div>
    <h1>${esc(data.reportTitle || "Deal Readiness Report")}</h1>
    <p class="subtitle">${esc(data.subtitle || "What the deal has evidenced, what remains unproven, and the next move most likely to create decision clarity.")}</p>
    <div class="meta-row">
      <div><span>Prepared For</span><strong>${esc(data.preparedFor || "Client")}</strong></div>
      <div><span>Report Date</span><strong>${esc(data.reportDate || new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }))}</strong></div>
      <div><span>Deal Memory ID</span><strong>${esc(data.dealMemoryId || "Unassigned")}</strong></div>
    </div>
    <div class="readout"><span class="section-kicker">Executive Readiness Read</span>${paragraphs(asArray(data.executiveReadinessRead || data.executiveSummary))}</div>
    <div class="cover-grid">
      <div class="card"><span>Overall Deal Readiness</span><strong>${esc(score.overall.value)}</strong><em>${esc(score.overall.label)}</em></div>
      <div class="card"><span>Identified Pattern</span><strong>${esc(data.identifiedPattern || "Not specified")}</strong><em>${esc(data.forecastConfidenceRead || "Forecast read not specified")}</em></div>
    </div>
    ${scoreStrip(score)}
    <div class="next"><span>Recommended Next Move</span>${paragraphs(asArray(data.recommendedNextMove).slice(0, 1))}</div>
    <div class="readout"><span class="section-kicker">FusionEQ Readiness Principle</span><p>This report separates what was recorded from what has been evidenced. FusionEQ does not replace judgment. It sharpens it.</p></div>
  </section>

  <section class="report-body">
    <div class="principle">Created from a Diagnostic Deal Briefing Analysis, this report presents deal readiness intelligence in a polished customer-facing format.</div>
    ${section("1. Report Identity", snapshot([
      ["Deal Memory ID", data.dealMemoryId || "Unassigned"],
      ["Report Type", "FusionEQ Deal Readiness Report"],
      ["Report Date", data.reportDate || new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })],
      ["Prepared For", data.preparedFor || "Client"],
      ["Source", data.source || "Information provided through Diagnostic Deal Briefing Analysis"],
      ["Privacy Note", data.privacyNote || "Use only customer, buyer, and deal details the client has approved for inclusion."]
    ]))}
    ${section("2. Executive Readiness Read", triad([
      ["Visible Signal", data.visibleSignal || firstItems(data.recordedActivity, 3)],
      ["FusionEQ Read", data.fusionEqRead || data.executiveReadinessRead || data.executiveSummary],
      ["Better Move", data.betterMove || data.recommendedNextMove]
    ]))}
    ${section("3. Information Provided / FusionEQ Interpretation", split([
      ["Information Provided", data.informationProvided],
      ["FusionEQ Interpretation", [
        `Readiness: ${score.overall.value} / ${score.overall.label}`,
        `Pattern: ${data.identifiedPattern || "Not specified"}`,
        `Forecast Read: ${data.forecastConfidenceRead || "Not specified"}`,
        `Primary Clarity Needed: ${firstItems(data.whatRemainsUnproven, 1)}`
      ]]
    ]))}
    ${section("4. Executive Readiness Summary", paragraphs(asArray(data.executiveSummary)))}
    ${section("5. Deal Snapshot", snapshot(rowsFromObject(data.dealSnapshot)))}
    ${section("6. Readiness Score", scoreGrid(score) + paragraphs(asArray(data.scoreInterpretation)))}
    ${section("Path to Decision Readiness", pathToReadiness(data))}
    ${sections.map(([title, value]) => section(title, contentBlock(value))).join("")}
    <p class="footer-note">FusionEQ Deal Readiness Report. Decision evidence. Readiness clarity. Better next moves.</p>
  </section>
</body>
</html>`;
}

function brand(symbolData) {
  return `
    <div class="brand">
      <div>
        <div class="brand-mark">
          ${symbolData ? `<img src="${symbolData}" alt="">` : ""}
          <span class="wordmark"><strong>Fusion</strong><em>EQ</em></span>
        </div>
        <div class="tagline">Decision evidence. Readiness clarity. Better next moves.</div>
      </div>
      <b>Deal Readiness Intelligence</b>
    </div>`;
}

function normalizeScore(score = {}) {
  return {
    overall: scorePart(score.overall),
    alignment: scorePart(score.alignment),
    control: scorePart(score.control),
    momentum: scorePart(score.momentum)
  };
}

function scorePart(value) {
  if (Array.isArray(value)) return { value: value[0] || "", label: value[1] || "" };
  if (value && typeof value === "object") return { value: value.value || value.score || "", label: value.label || value.read || "" };
  return { value: "", label: "" };
}

function normalizeSections(data) {
  return [
    ["7. Decision Readiness Overview", data.decisionReadinessOverview],
    ["8. What Has Been Evidenced", data.whatHasBeenEvidenced],
    ["9. What Remains Unproven", data.whatRemainsUnproven],
    ["10. Key Readiness Signals", keySignals(data)],
    ["11. Identified Pattern", [data.identifiedPattern, data.patternInterpretation]],
    ["12. Buyer-Owned Momentum Read", data.buyerOwnedMomentumRead],
    ["13. Decision Ownership Read", data.decisionOwnershipRead],
    ["14. Alignment and Urgency Read", data.alignmentAndUrgencyRead],
    ["15. Forecast Confidence Read", [data.forecastConfidenceRead, data.forecastConfidenceRationale]],
    ["16. Recommended Next Move", data.recommendedNextMove],
    ["17. Questions to Create Clarity", data.questionsToCreateClarity],
    ["18. Deal Coach Guidance", data.dealCoachGuidance],
    ["19. Appendix / Signal Detail", data.appendixSignalDetail],
    ["Export Options", data.exportOptions]
  ].filter(([, value]) => hasContent(value));
}

function keySignals(data) {
  return {
    "Recorded Activity": data.recordedActivity,
    "Decision Evidence": data.decisionEvidence
  };
}

function scoreStrip(score) {
  return `<div class="score-strip">
    ${["alignment", "control", "momentum"].map((name) => `<div><span>${titleCase(name)}</span><strong>${esc(score[name].value)}</strong><em>${esc(score[name].label)}</em></div>`).join("")}
  </div>`;
}

function scoreGrid(score) {
  return `<div class="score-grid">
    ${["overall", "alignment", "control", "momentum"].map((name) => `<div><span>${esc(name === "overall" ? "Overall Deal Readiness" : titleCase(name))}</span><strong>${esc(score[name].value)}</strong><em>${esc(score[name].label)}</em></div>`).join("")}
  </div>`;
}

function pathToReadiness(data) {
  const pathData = data.pathToDecisionReadiness || {};
  return `<div>
    <h2>Path to Decision Readiness</h2>
    <p>This path translates the readiness read into the next buyer-facing move: the evidence to create, the assumption to validate, and the people who need to be involved.</p>
    <div class="path">
      <div><span>Evidence to Create</span>${paragraphs(asArray(pathData.evidenceToCreate || data.evidenceToCreate))}</div>
      <div><span>Assumption to Validate</span>${paragraphs(asArray(pathData.assumptionToValidate || data.assumptionToValidate))}</div>
      <div><span>Who to Involve</span>${paragraphs(asArray(pathData.whoToInvolve || data.whoToInvolve))}</div>
    </div>
  </div>`;
}

function section(title, content) {
  return hasContent(content) ? `<h2>${esc(title)}</h2>${content}` : "";
}

function contentBlock(value) {
  if (!hasContent(value)) return "";
  if (Array.isArray(value)) {
    const clean = value.filter(hasContent);
    if (clean.length === 0) return "";
    return clean.length > 2 ? list(clean) : paragraphs(clean);
  }
  if (value && typeof value === "object") {
    return Object.entries(value)
      .filter(([, nested]) => hasContent(nested))
      .map(([title, nested]) => `<h3>${esc(title)}</h3>${contentBlock(nested)}`)
      .join("");
  }
  return paragraphs([value]);
}

function paragraphs(items) {
  return asArray(items).filter(hasContent).map((item) => `<p>${esc(item)}</p>`).join("");
}

function list(items) {
  return `<ul>${asArray(items).filter(hasContent).map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`;
}

function snapshot(rows) {
  const clean = rows.filter((row) => hasContent(row[1]));
  if (clean.length === 0) return "";
  return `<table><tbody>${clean.map(([label, value]) => `<tr><th>${esc(label)}</th><td>${esc(value)}</td></tr>`).join("")}</tbody></table>`;
}

function split(items) {
  return `<div class="split">${items.map(([title, value]) => `<div><span class="section-kicker">${esc(title)}</span>${contentBlock(value)}</div>`).join("")}</div>`;
}

function triad(items) {
  return `<div class="triad">${items.map(([title, value]) => `<div><span class="section-kicker">${esc(title)}</span>${contentBlock(value)}</div>`).join("")}</div>`;
}

function rowsFromObject(value = {}) {
  if (Array.isArray(value)) return value;
  return Object.entries(value).map(([key, item]) => [titleCase(key), item]);
}

function asArray(value) {
  if (Array.isArray(value)) return value;
  if (value === undefined || value === null || value === "") return [];
  return [value];
}

function firstItems(value, count) {
  return asArray(value).filter(hasContent).slice(0, count).join(". ");
}

function hasContent(value) {
  if (Array.isArray(value)) return value.some(hasContent);
  if (value && typeof value === "object") return Object.values(value).some(hasContent);
  return value !== undefined && value !== null && String(value).trim() !== "";
}

function safeFileName(value) {
  return String(value)
    .trim()
    .replace(/[^a-z0-9]+/gi, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 110) || "Deal_Readiness_Report";
}

function titleCase(value) {
  return String(value)
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]+/g, " ")
    .trim()
    .replace(/\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.slice(1));
}

function esc(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[char]));
}
