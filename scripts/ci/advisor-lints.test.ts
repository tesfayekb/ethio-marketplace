import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { GATED_LINTS, judgeFindings, readFindings, selfTest } from "./advisor-lints";

/**
 * CF-ADVISOR-1 (cursor-bundle-7a, decision 9, DEC-472) — the platform's performance lints on CI's
 * backend. Planted answers only: a finding of each gated name fails, a finding of any other name
 * passes, and an answer the reader cannot understand fails (it is never read as clean). The planted
 * files live under the OS temp directory and are removed (PPF-1).
 */

/**
 * The fixtures follow the pinned CLI's (2.120.0) own expressions, read by cursor-bundle-7a ruling 2
 * from the release's bundled code: `success("db advisors",{results:e})` through the JSON writer
 * `success:(l,H)=>i({...H,message:l})`, so stdout is `{"results":[…],"message":"db advisors"}`, and
 * `{"results":[],…}` when there is nothing to report. This is the source's shape, not a capture
 * (rule 20): the report pastes the pull request's first smoke run as the capture.
 */
const envelope = (results: unknown[]) => JSON.stringify({ results, message: "db advisors" });
const planted = (...names: string[]) => envelope(names.map((name) => ({ name })));

describe("the advisor gate (CF-ADVISOR-1)", () => {
  it("CF-ADVISOR-1a a planted finding of each gated name fails the step", () => {
    expect([...GATED_LINTS].sort()).toEqual(["auth_rls_initplan", "duplicate_index"]);
    for (const name of GATED_LINTS) {
      const verdict = judgeFindings(readFindings(planted(name)));
      expect(verdict.failed, name).toBe(true);
      expect(verdict.lines.join("\n")).toContain(`::error::advisors: 1 finding(s) of ${name}`);
    }
  });

  it("CF-ADVISOR-1b a finding of any other name passes, its count printed and no more", () => {
    const verdict = judgeFindings(
      readFindings(planted("unindexed_foreign_keys", "unused_index", "unused_index")),
    );
    expect(verdict.failed).toBe(false);
    expect(verdict.lines).toContain("advisors: unused_index 2");
    expect(verdict.lines).toContain("advisors: unindexed_foreign_keys 1");
    expect(verdict.lines.some((line) => line.startsWith("::error::"))).toBe(false);
  });

  it("CF-ADVISOR-1c a finding's detail and metadata never reach the log", () => {
    const answer = envelope([
      {
        name: "duplicate_index",
        title: "Duplicate Index",
        level: "WARN",
        facing: "EXTERNAL",
        categories: ["PERFORMANCE"],
        description: "Detects identical indexes.",
        detail: "Table public.e2e_secret has identical indexes",
        remediation: "https://example.invalid/e2e-remediation",
        metadata: { name: "e2e_secret", schema: "public", type: "table" },
        cacheKey: "duplicate_index_public_e2e_secret",
      },
    ]);
    const verdict = judgeFindings(readFindings(answer));
    expect(verdict.failed).toBe(true);
    const log = verdict.lines.join("\n");
    expect(log).not.toContain("e2e_secret");
    expect(log).not.toContain("e2e-remediation");
  });

  it("CF-ADVISOR-1d the CLI's results envelope reads as the list, the empty one included", () => {
    expect(readFindings(envelope([]))).toEqual([]);
    expect(judgeFindings(readFindings(envelope([]))).failed).toBe(false);
    expect(readFindings(`${planted("auth_rls_initplan")}\n`)).toEqual([
      { name: "auth_rls_initplan" },
    ]);
    expect(judgeFindings(readFindings(planted("auth_rls_initplan"))).failed).toBe(true);
  });

  it("CF-ADVISOR-1e an answer it cannot understand fails, never reads as clean", () => {
    const refused = [
      "",
      "  \n",
      "not json",
      "null",
      "{}",
      '{"results":"x"}',
      '{"results":[1]}',
      '{"results":[{"name":""}]}',
      '{"results":[{"title":"no name"}]}',
      // The shapes the first build guessed, and the hosted API's: none is the pinned CLI's.
      '[{"name":"duplicate_index"}]',
      '{"lints":[{"name":"duplicate_index"}]}',
    ];
    for (const text of refused) expect(() => readFindings(text), text).toThrow(/advisors:/);
  });

  it("CF-ADVISOR-1f the self-test passes on the real judge and the step runs it first", () => {
    expect(selfTest()).toEqual([]);
    const dir = mkdtempSync(join(tmpdir(), "e2e-advisor-"));
    try {
      const run = (text: string) => {
        const file = join(dir, "answer.json");
        writeFileSync(file, text);
        return spawnSync("bun", ["scripts/ci/advisor-lints.ts", file], { encoding: "utf8" });
      };
      const bad = run(planted("duplicate_index"));
      expect(bad.status).toBe(1);
      expect(bad.stdout).toContain("advisors self-test OK");
      const good = run(planted("unused_index"));
      expect(good.status).toBe(0);
      expect(good.stdout).toContain("advisors: auth_rls_initplan gate clear (0)");
      expect(run("").status).toBe(1);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
