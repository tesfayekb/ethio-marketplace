#!/usr/bin/env node
/**
 * INC-999 (Foundations turn L-1, A1) — A FAILED BACKEND START NAMES ITS CAUSE IN THE EVIDENCE.
 * The lane job's backend start log (redacted first, by the workflow) is cut here, and only here,
 * for local-backend-proof.md's "## Migration/start failure" and for local-backend-start-failure.txt.
 *
 * The CLI prints a migration failure as `<pgconn error>` (`ERROR: … (SQLSTATE …)`), then
 * `At statement: N` and the whole statement, then the debug hint (supabase/cli v2.120.0,
 * apps/cli-go/pkg/migration/file.go :126–148, formatError). A long statement pushed the ERROR line
 * out of a plain 60-line tail (run 40884980032, lane 3). So the excerpt keeps, in order:
 *   1. the last migration line;
 *   2. the Cause block — every ERROR, FATAL, PANIC, SQLSTATE, DETAIL, HINT, CONTEXT, LINE n and
 *      QUERY line, whole, never cut by the tail (the newest CAUSE_LINES);
 *   3. the statement echo cut to its first and last ECHO_LINES lines, "N lines omitted" between;
 *   4. the last TAIL_LINES lines.
 * Usage: node scripts/ci/start-failure-excerpt.mjs <redacted-log> — prints JSON
 * { "section": string[], "failure": string[] }.
 */
import { readFileSync } from "node:fs";

export const CAUSE_LINES = 40;
export const ECHO_LINES = 10;
export const TAIL_LINES = 20;

const CAUSE =
  /^\s*(?:(?:ERROR|FATAL|PANIC|SQLSTATE|DETAIL|HINT|CONTEXT|QUERY)\b\s*:?|LINE \d+:)|\(SQLSTATE [0-9A-Z]{5}\)/i;
const STATEMENT = /^At statement:? \d+\s*$/;
const DEBUG_HINT = /^Try rerunning the command with --debug/;

/** The excerpt of one redacted start log. */
export function startFailureExcerpt(text) {
  const all = text.split(/\r?\n/);
  if (all.length > 0 && all[all.length - 1] === "") all.pop();
  const applied = all.filter((line) => line.includes("Applying migration"));
  const migration = applied.length > 0 ? applied[applied.length - 1] : "no migration reached";
  const causes = all.filter((line) => CAUSE.test(line));
  const kept = causes.slice(-CAUSE_LINES);
  const cause =
    kept.length === 0
      ? ["no ERROR/SQLSTATE line in the log"]
      : causes.length > kept.length
        ? [`(${causes.length - kept.length} earlier cause lines omitted)`, ...kept]
        : kept;
  let echo = [];
  const at = all.findLastIndex((line) => STATEMENT.test(line));
  if (at >= 0) {
    let end = all.findIndex((line, index) => index > at && DEBUG_HINT.test(line));
    if (end < 0) end = all.length;
    const body = all.slice(at + 1, end);
    echo =
      body.length > ECHO_LINES * 2
        ? [
            all[at],
            ...body.slice(0, ECHO_LINES),
            `(${body.length - ECHO_LINES * 2} lines omitted)`,
            ...body.slice(-ECHO_LINES),
          ]
        : [all[at], ...body];
  }
  const tail = all.slice(-TAIL_LINES);
  const section = [
    "Last migration line: " + migration,
    "Cause:",
    "```text",
    ...cause,
    "```",
    "Statement:",
    "```text",
    ...(echo.length > 0 ? echo : ["no statement echo in the log"]),
    "```",
    `Last ${TAIL_LINES} lines:`,
    "```text",
    ...tail,
    "```",
  ];
  const failure = ["migration: " + migration, ...cause];
  return { section, failure };
}

if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  const path = process.argv[2];
  if (!path) {
    console.error("usage: start-failure-excerpt.mjs <redacted-log>");
    process.exit(2);
  }
  process.stdout.write(JSON.stringify(startFailureExcerpt(readFileSync(path, "utf8"))) + "\n");
}
