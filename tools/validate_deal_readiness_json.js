#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const requiredFields = [
  "fileName",
  "reportTitle",
  "dealMemoryId",
  "reportDate",
  "preparedFor",
  "executiveReadinessRead",
  "score",
  "identifiedPattern",
  "forecastConfidenceRead",
  "informationProvided",
  "executiveSummary",
  "dealSnapshot",
  "scoreInterpretation",
  "pathToDecisionReadiness",
  "decisionReadinessOverview",
  "whatHasBeenEvidenced",
  "whatRemainsUnproven",
  "recordedActivity",
  "decisionEvidence",
  "recommendedNextMove",
  "questionsToCreateClarity",
  "dealCoachGuidance"
];

const scoreFields = ["overall", "alignment", "control", "momentum"];
const pathFields = ["evidenceToCreate", "assumptionToValidate", "whoToInvolve"];

const file = process.argv[2];
if (!file || file === "--help" || file === "-h") {
  console.log("Usage: node tools/validate_deal_readiness_json.js tools/<client-report>.json");
  process.exit(file ? 0 : 1);
}

let data;
try {
  data = JSON.parse(fs.readFileSync(path.resolve(file), "utf8"));
} catch (error) {
  console.error(`Invalid JSON: ${error.message}`);
  process.exit(1);
}

const missing = requiredFields.filter((field) => !hasContent(data[field]));
const scoreMissing = scoreFields.filter((field) => !hasContent(data.score && data.score[field]));
const pathMissing = pathFields.filter((field) => !hasContent(data.pathToDecisionReadiness && data.pathToDecisionReadiness[field]));

if (missing.length || scoreMissing.length || pathMissing.length) {
  if (missing.length) console.error(`Missing required fields: ${missing.join(", ")}`);
  if (scoreMissing.length) console.error(`Missing score fields: ${scoreMissing.join(", ")}`);
  if (pathMissing.length) console.error(`Missing path fields: ${pathMissing.join(", ")}`);
  process.exit(1);
}

console.log(`OK: ${file} is renderer-ready.`);

function hasContent(value) {
  if (Array.isArray(value)) return value.some(hasContent);
  if (value && typeof value === "object") return Object.values(value).some(hasContent);
  return value !== undefined && value !== null && String(value).trim() !== "";
}
