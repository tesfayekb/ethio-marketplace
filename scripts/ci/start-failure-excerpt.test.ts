import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, join } from "node:path";
import { describe, expect, it } from "vitest";
import { walkFiles } from "../conformance/kit";
// @ts-expect-error — plain Node module (the lane job runs it with node), no declaration file.
import { ECHO_LINES, startFailureExcerpt, TAIL_LINES } from "./start-failure-excerpt.mjs";

/**
 * INC-999 (Foundations turn L-1, A1/A2) — a failed backend start names its cause in the evidence,
 * however long the CLI's statement echo is. The third of its class (INC-984, INC-992): SXC-4 is the
 * class guard over every workflow.
 */

type Excerpt = { section: string[]; failure: string[] };
const excerpt = startFailureExcerpt as (text: string) => Excerpt;

/** The fixture without its "# " header (shape from source; see the file). */
const LOG = readFileSync("scripts/ci/fixtures/start-failure-cli.log", "utf8")
  .split("\n")
  .filter((line) => !line.startsWith("# "))
  .join("\n");

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
          found.push(`${name}:${index + 1} cuts a failure log inline; use scripts/ci/start-failure-excerpt.mjs`);
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
