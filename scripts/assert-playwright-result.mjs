#!/usr/bin/env node
// Judges a guard-proof run from Playwright's JSON reporter, never from the exit
// code. INC-021: an exit code cannot distinguish "the test ran and failed for the
// right reason" from "the command broke" (empty --grep, global-setup failure,
// browser launch failure). Usage:
//   node scripts/assert-playwright-result.mjs <json-report> <pass|fail> <label>

import { readFileSync } from "node:fs";

const [reportPath, expected, label] = process.argv.slice(2);

if (!reportPath || (expected !== "pass" && expected !== "fail") || !label) {
  console.error("usage: assert-playwright-result.mjs <json-report> <pass|fail> <label>");
  process.exit(1);
}

function die(message) {
  console.error(`::error::${message}`);
  process.exit(1);
}

let report;
try {
  report = JSON.parse(readFileSync(reportPath, "utf8"));
} catch (error) {
  die(`${label}: could not read the Playwright JSON report at ${reportPath} — ${error.message}`);
}

/**
 * Prefer `stats` (present in every modern Playwright JSON report). Fall back to
 * walking the suite tree only if it is absent, so a reporter-shape change is a
 * loud miscount rather than a silent zero.
 */
function totals(json) {
  const stats = json.stats;
  if (
    stats &&
    typeof stats.expected === "number" &&
    typeof stats.unexpected === "number" &&
    typeof stats.skipped === "number"
  ) {
    return {
      source: "stats",
      passed: stats.expected,
      failed: stats.unexpected + (stats.flaky ?? 0),
      skipped: stats.skipped,
    };
  }

  const counts = { source: "suites", passed: 0, failed: 0, skipped: 0 };
  const walk = (suites = []) => {
    for (const suite of suites) {
      for (const spec of suite.specs ?? []) {
        for (const test of spec.tests ?? []) {
          const status = test.status ?? test.results?.at(-1)?.status;
          if (status === "skipped") counts.skipped += 1;
          else if (status === "expected" || status === "passed") counts.passed += 1;
          else counts.failed += 1;
        }
      }
      walk(suite.suites);
    }
  };
  walk(json.suites);
  return counts;
}

const { source, passed, failed, skipped } = totals(report);
const ran = passed + failed + skipped;

if (ran === 0) {
  die(`${label}: NO TEST MATCHED — the proof harness is not testing anything`);
}
if (ran > 1) {
  die(`${label}: ${ran} tests ran, expected exactly 1 — the grep is too broad to prove anything precise`);
}
if (skipped === 1) {
  die(`${label}: the test was SKIPPED — a skipped test proves neither direction`);
}

if (expected === "pass" && passed !== 1) {
  die(`${label}: baseline FAILED — the test does not pass on clean source`);
}
if (expected === "fail" && failed !== 1) {
  die(`${label}: GUARD DID NOT BITE — test passed against broken code`);
}

console.log(
  `${label}: OK (1 test, ${expected === "pass" ? "passed" : "failed"} as expected) [counts from ${source}]`,
);
