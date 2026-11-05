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
 *   3. the Server record (DEC-340, below), when a capture was given;
 *   4. the statement echo cut to its first and last ECHO_LINES lines, "N lines omitted" between;
 *   5. the last TAIL_LINES lines.
 *
 * DEC-340 (INC-1051) — THE DATABASE SERVER'S OWN ERROR RECORD. The CLI's line carries no HINT,
 * CONTEXT (the PL/pgSQL stack) or STATEMENT; the server's log does. The lane step captures the
 * database container's log since the apply began (raw, under $RUNNER_TEMP), the evidence step
 * redacts it file by file, and this module cuts the LAST error record out of it — keyed on the
 * ` ERROR:  ` token and the record boundary, never on the line prefix's layout:
 *   - a record START is a line that does not begin with whitespace (Postgres's stderr writer
 *     prefixes every field's first line and indents a field's further lines with a tab);
 *   - the record runs from the last start line containing ` ERROR:  ` through every following
 *     indented continuation line and every start line carrying one of the same record's field
 *     tokens (DETAIL, HINT, QUERY, CONTEXT, LOCATION, STATEMENT); the first other start line is
 *     the next record's, and ends it;
 *   - the STATEMENT line is kept as one line cut to STATEMENT_CHARS; its body lines are dropped
 *     and counted; CONTEXT continuation lines are kept whole;
 *   - at most RECORD_LINES lines.
 * The stream channel (meta's `docker logs`) answers first; the file channel when the stream has no
 * record; "none" says how many lines were read and what each channel reported.
 * Usage: node scripts/ci/start-failure-excerpt.mjs <redacted-log> [<redacted-capture-dir>] —
 * prints JSON { "section": string[], "failure": string[], "server": string[] }.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

export const CAUSE_LINES = 40;
export const ECHO_LINES = 10;
export const TAIL_LINES = 20;
export const RECORD_LINES = 80;
export const STATEMENT_CHARS = 200;

const CAUSE =
  /^\s*(?:(?:ERROR|FATAL|PANIC|SQLSTATE|DETAIL|HINT|CONTEXT|QUERY)\b\s*:?|LINE \d+:)|\(SQLSTATE [0-9A-Z]{5}\)/i;
const STATEMENT = /^At statement:? \d+\s*$/;
const DEBUG_HINT = /^Try rerunning the command with --debug/;

/** The server log's tokens: a field's first line carries ` <FIELD>:  ` after the prefix. */
const ERROR_TOKEN = " ERROR:  ";
const FIELD_TOKEN = / (?:DETAIL|HINT|QUERY|CONTEXT|LOCATION|STATEMENT):  /;
const STATEMENT_TOKEN = " STATEMENT:  ";

/** The lines of one redacted capture file, or null when the file is absent. */
function readLines(dir, name) {
  const path = join(dir, name);
  if (!existsSync(path)) return null;
  const lines = readFileSync(path, "utf8").split(/\r?\n/);
  if (lines.length > 0 && lines[lines.length - 1] === "") lines.pop();
  return lines;
}

/** DEC-340 — the last ERROR record of one server log, cut by the boundary rule; [] when none. */
export function serverErrorRecord(lines) {
  const isStart = (line) => line.length > 0 && !/^\s/.test(line);
  let at = -1;
  for (let i = lines.length - 1; i >= 0; i -= 1) {
    if (isStart(lines[i]) && lines[i].includes(ERROR_TOKEN)) {
      at = i;
      break;
    }
  }
  if (at < 0) return [];
  const record = [];
  let inStatement = false;
  let droppedStatementLines = 0;
  let cut = false;
  const push = (line) => {
    if (record.length >= RECORD_LINES) {
      cut = true;
      return;
    }
    record.push(line);
  };
  for (let i = at; i < lines.length; i += 1) {
    const line = lines[i];
    if (isStart(line)) {
      if (i > at && !FIELD_TOKEN.test(line)) break;
      inStatement = line.includes(STATEMENT_TOKEN);
      push(
        inStatement && line.length > STATEMENT_CHARS ? line.slice(0, STATEMENT_CHARS) + "…" : line,
      );
    } else if (inStatement) {
      droppedStatementLines += 1;
    } else {
      push(line);
    }
  }
  const notes = [];
  if (droppedStatementLines > 0) notes.push(`(${droppedStatementLines} statement lines dropped)`);
  if (cut) notes.push(`(cut at ${RECORD_LINES} lines)`);
  return [...record, ...notes];
}

/** DEC-340 — the "Server record" lines for a redacted capture directory (or none given). */
export function serverRecordLines(captureDir) {
  if (!captureDir) return ["Server record (DEC-340): not captured (the apply did not begin)"];
  const meta = readLines(captureDir, "meta.txt") ?? [];
  const field = (key) =>
    meta.find((line) => line.startsWith(key + "="))?.slice(key.length + 1) ?? "not reported";
  const channels = [
    ["stream", readLines(captureDir, "stream.log")],
    ["file", readLines(captureDir, "file.log")],
  ];
  for (const [channel, lines] of channels) {
    if (lines === null) continue;
    const record = serverErrorRecord(lines);
    if (record.length > 0)
      return [`Server record (DEC-340, ${channel}):`, "```text", ...record, "```"];
  }
  const read = channels.reduce((n, [, lines]) => n + (lines?.length ?? 0), 0);
  return [
    `Server record (DEC-340, none): no ERROR record in the database log (${read} lines read since ${field("began")}; channels: stream ${field("stream")}; file ${field("file")})`,
  ];
}

/** The excerpt of one redacted start log (and, DEC-340, of the redacted capture beside it). */
export function startFailureExcerpt(text, captureDir) {
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
  // DEC-340: with no capture argument the output is exactly INC-999's (SXC-1…3).
  const server = captureDir === undefined ? [] : serverRecordLines(captureDir);
  const section = [
    "Last migration line: " + migration,
    "Cause:",
    "```text",
    ...cause,
    "```",
    ...server,
    "Statement:",
    "```text",
    ...(echo.length > 0 ? echo : ["no statement echo in the log"]),
    "```",
    `Last ${TAIL_LINES} lines:`,
    "```text",
    ...tail,
    "```",
  ];
  const failure = [
    "migration: " + migration,
    ...cause,
    ...server.filter((line) => line !== "```text" && line !== "```"),
  ];
  return { section, failure, server };
}

if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  const path = process.argv[2];
  if (!path) {
    console.error("usage: start-failure-excerpt.mjs <redacted-log> [<redacted-capture-dir>]");
    process.exit(2);
  }
  // The workflow always asks for the server record: no capture directory means the apply never began.
  const captureDir = process.argv[3] ?? null;
  process.stdout.write(
    JSON.stringify(startFailureExcerpt(readFileSync(path, "utf8"), captureDir)) + "\n",
  );
}
