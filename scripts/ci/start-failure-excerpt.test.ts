import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, join } from "node:path";
import { describe, expect, it } from "vitest";
import { walkFiles } from "../conformance/kit";
import { ECHO_LINES, startFailureExcerpt, TAIL_LINES } from "./start-failure-excerpt.mjs";

/**
 * INC-999 (Foundations turn L-1, A1/A2) — a failed backend start names its cause in the evidence,
 * however long the CLI's statement echo is. The third of its class (INC-984, INC-992): SXC-4 is the
 * class guard over every workflow.
 */

const excerpt = startFailureExcerpt;

/** The fixture without its "# " header (shape from source; see the file). */
const LOG = readFileSync("scripts/ci/fixtures/start-failure-cli.log", "utf8")
  .split("\n")
  .filter((line) => !line.startsWith("# "))
  .join("\n");

/**
 * DEC-340 (INC-1051) — the REAL `local-backend-db-error.txt` of run 41966759770 (lane smoke, the
 * planted failure; ci-evidence e6a15b73b, local-backend-proof.md :90–:100), copied by script with
 * its sha256 (c769adbc…), redacted as captured, never retyped. The raw stream is by design never
 * kept, so the record's own server lines — between the mechanism's two fences, before its
 * "(N statement lines dropped)" note — are the captured server log the tests feed back in.
 */
const DB_ERROR = readFileSync("scripts/ci/fixtures/start-failure-db-error.txt", "utf8")
  .split("\n")
  .filter((line) => line !== "");
const SERVER_LINES = DB_ERROR.slice(
  DB_ERROR.indexOf("```text") + 1,
  DB_ERROR.lastIndexOf("```"),
).filter((line) => !/^\(\d+ statement lines dropped\)$/.test(line));
const ERROR_LINE = SERVER_LINES[0] ?? "";
const CONTEXT_LINE = SERVER_LINES.find((line) => line.includes(" CONTEXT:  ")) ?? "";
const FRAME_LINES = SERVER_LINES.filter((line) => line.startsWith("\t"));
const STATEMENT_LINES = SERVER_LINES.filter((line) => line.includes(" STATEMENT:  "));

/** A capture directory holding the given stream lines (no meta.txt, as a lane that wrote none). */
function captureDir(streamLines: string[]): string {
  const dir = mkdtempSync(join(tmpdir(), "sxc-capture-"));
  writeFileSync(
    join(dir, "stream.log"),
    streamLines.length === 0 ? "" : streamLines.join("\n") + "\n",
  );
  return dir;
}

/** Inline excerpts of a failure log a workflow may not cut by itself (INC-984, INC-992, INC-999). */
const INLINE_CUT = /splitlines\(\)\s*\[\s*-\s*\d+\s*:\s*\]|\btail\s+-n\s*\+?\d+/;
const FAILURE_LOG = /\.log\b|\.err\b|failure|stderr|start_log|text\.splitlines/i;
const THROUGH_MECHANISM = /start-failure-excerpt\.mjs|step-failures\.mjs/;

export function inlineFailureCuts(dir: string): string[] {
  const found: string[] = [];
  for (const file of walkFiles([dir], { ext: ["yml", "yaml"] })) {
    const name = basename(file);
    readFileSync(file, "utf8")
      .split("\n")
      .forEach((line, index) => {
        if (INLINE_CUT.test(line) && FAILURE_LOG.test(line) && !THROUGH_MECHANISM.test(line))
          found.push(
            `${name}:${index + 1} cuts a failure log inline; use scripts/ci/start-failure-excerpt.mjs`,
          );
      });
  }
  return found;
}

describe("a failed backend start names its cause (INC-999)", () => {
  it("SXC-1 the captured CLI failure keeps the migration, the ERROR/SQLSTATE line and the cut statement", () => {
    const { section, failure } = excerpt(LOG);
    expect(section[0]).toBe(
      "Last migration line: Applying migration 20261029073342_cba46fd4.sql...",
    );
    expect(section).toContain("ERROR: proof: replay accepted (SQLSTATE P0001)");
    expect(section).toContain("At statement: 41");
    expect(section).toContain("(121 lines omitted)");
    expect(section.slice(-TAIL_LINES - 1, -1)).toContain(
      "Try rerunning the command with --debug to troubleshoot the error.",
    );
    expect(failure).toEqual([
      "migration: Applying migration 20261029073342_cba46fd4.sql...",
      "ERROR: proof: replay accepted (SQLSTATE P0001)",
    ]);
  });

  it("SXC-2 a 5,000-line echo with DETAIL, HINT and CONTEXT never cuts a cause line", () => {
    const lines = LOG.split("\n");
    const at = lines.indexOf("At statement: 41");
    const padded = [
      ...lines.slice(0, at),
      "DETAIL:  Key (id)=(1) already exists.",
      "HINT:  Check the proof's scratch rows.",
      "CONTEXT:  PL/pgSQL function inline_code_block line 3 at RAISE",
      ...lines.slice(at, at + 1),
      ...Array.from({ length: 5_000 }, (_, i) => `  -- echo ${i}`),
      "Try rerunning the command with --debug to troubleshoot the error.",
    ].join("\n");
    const { section, failure } = excerpt(padded);
    for (const cause of [
      "ERROR: proof: replay accepted (SQLSTATE P0001)",
      "DETAIL:  Key (id)=(1) already exists.",
      "HINT:  Check the proof's scratch rows.",
      "CONTEXT:  PL/pgSQL function inline_code_block line 3 at RAISE",
    ]) {
      expect(section).toContain(cause);
      expect(failure).toContain(cause);
    }
    expect(section).toContain(`(${5_000 - ECHO_LINES * 2} lines omitted)`);
    expect(section.length).toBeLessThan(80);
  });

  it("SXC-3 a log with no cause line says so, never an empty block", () => {
    const { section, failure } = excerpt("Starting database...\nfailed to start: timeout\n");
    expect(section).toContain("no ERROR/SQLSTATE line in the log");
    expect(section[0]).toBe("Last migration line: no migration reached");
    expect(failure).toEqual([
      "migration: no migration reached",
      "no ERROR/SQLSTATE line in the log",
    ]);
  });

  it("SXC-5 the real server record keeps the ERROR line, the CONTEXT stack and one cut STATEMENT line, in every consumer (DEC-340)", () => {
    expect(ERROR_LINE).toContain(" ERROR:  DEC-340 planted failure");
    expect(CONTEXT_LINE).toContain("PL/pgSQL function dec340_planted_raise() line 3 at RAISE");
    expect(FRAME_LINES.length).toBe(2);
    const dir = captureDir(SERVER_LINES);
    try {
      const { section, failure, server } = excerpt(LOG, dir);
      expect(server[0]).toBe("Server record (DEC-340, stream):");
      for (const consumer of [section, failure, server]) {
        expect(consumer).toContain("Server record (DEC-340, stream):");
        expect(consumer).toContain(ERROR_LINE);
        expect(consumer).toContain(CONTEXT_LINE);
        for (const frame of FRAME_LINES) expect(consumer).toContain(frame);
        const statements = consumer.filter((line) => line.includes(" STATEMENT:  "));
        expect(statements.length).toBe(1);
        expect(statements[0]?.length).toBeLessThanOrEqual(201);
      }
      // The planted DO block's body never reaches the record (the capture dropped it after the
      // STATEMENT line); the section's own "Statement:" echo is the CLI's and is judged by SXC-1.
      for (const body of ["BEGIN", "  PERFORM public.dec340_planted_raise();", "END;"]) {
        expect(server).not.toContain(body);
        expect(failure).not.toContain(body);
      }
      expect(STATEMENT_LINES.length).toBe(1);
      expect(server.length).toBeLessThanOrEqual(83);
      // The record sits after the Cause block and before the Statement echo, in the section.
      const at = section.indexOf("Server record (DEC-340, stream):");
      expect(at).toBeGreaterThan(section.indexOf("Cause:"));
      expect(at).toBeLessThan(section.indexOf("Statement:"));
      // SXC-1's one-argument form is untouched: the same log without a capture carries no record.
      expect(excerpt(LOG).section).not.toContain("Server record (DEC-340, stream):");
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("SXC-6 a log without its last record says so with its counts; no capture says not captured (DEC-340)", () => {
    const dir = captureDir(SERVER_LINES.slice(0, SERVER_LINES.indexOf(ERROR_LINE)));
    try {
      const { section, failure, server } = excerpt(LOG, dir);
      expect(server).toEqual([
        "Server record (DEC-340, none): no ERROR record in the database log (0 lines read since not reported; channels: stream not reported; file not reported)",
      ]);
      expect(section).toContain(server[0]);
      expect(failure).toContain(server[0]);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
    const none = excerpt(LOG, null);
    expect(none.server).toEqual([
      "Server record (DEC-340): not captured (the apply did not begin)",
    ]);
    expect(none.failure).toContain(none.server[0]);
  });

  it("SXC-4 no workflow cuts a failure log inline, and a planted cut is caught", () => {
    expect(inlineFailureCuts(".github/workflows")).toEqual([]);
    const scratch = mkdtempSync(join(tmpdir(), "sxc-4-"));
    try {
      writeFileSync(
        join(scratch, "planted.yml"),
        "    run: |\n      lines += [*text.splitlines()[-60:]]\n      tail -n 40 local-backend-start.log\n      find dist | du -ch | tail -n 1\n",
      );
      expect(inlineFailureCuts(scratch)).toEqual([
        "planted.yml:2 cuts a failure log inline; use scripts/ci/start-failure-excerpt.mjs",
        "planted.yml:3 cuts a failure log inline; use scripts/ci/start-failure-excerpt.mjs",
      ]);
    } finally {
      rmSync(scratch, { recursive: true, force: true });
    }
  });
});
