#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const inputPath = process.argv[2];
const raw = inputPath
  ? fs.readFileSync(path.resolve(inputPath), "utf8")
  : fs.readFileSync(0, "utf8");

const cleanedText = extractJson(normalizeQuotes(raw));
let data;

try {
  data = JSON.parse(cleanedText);
} catch (error) {
  console.error(`Could not parse renderer JSON: ${error.message}`);
  process.exit(1);
}

const outputDir = path.join(root, "inputs", "client-reports");
fs.mkdirSync(outputDir, { recursive: true });

const baseName = sanitizeFileName(data.fileName || `deal-readiness-report-${new Date().toISOString().slice(0, 10)}`);
const outputPath = path.join(outputDir, `${baseName}.json`);

fs.writeFileSync(outputPath, `${JSON.stringify(data, null, 2)}\n`);
process.stdout.write(outputPath);

function normalizeQuotes(value) {
  return value
    .replace(/[\u201C\u201D]/g, "\"")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/\u00a0/g, " ");
}

function extractJson(value) {
  const withoutFence = value
    .replace(/^\s*```(?:json)?\s*/i, "")
    .replace(/\s*```\s*$/i, "")
    .trim();

  if (withoutFence.startsWith("{") && withoutFence.endsWith("}")) {
    return withoutFence;
  }

  const start = withoutFence.indexOf("{");
  if (start === -1) {
    throw new Error("No JSON object was found in the provided text.");
  }

  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let index = start; index < withoutFence.length; index += 1) {
    const character = withoutFence[index];

    if (escaped) {
      escaped = false;
      continue;
    }

    if (character === "\\") {
      escaped = true;
      continue;
    }

    if (character === "\"") {
      inString = !inString;
      continue;
    }

    if (inString) continue;

    if (character === "{") depth += 1;
    if (character === "}") depth -= 1;

    if (depth === 0) {
      return withoutFence.slice(start, index + 1);
    }
  }

  throw new Error("The JSON object appears to be incomplete.");
}

function sanitizeFileName(value) {
  const safe = String(value)
    .trim()
    .replace(/[^a-z0-9._-]+/gi, "_")
    .replace(/^_+|_+$/g, "");

  return safe || "deal-readiness-report";
}
