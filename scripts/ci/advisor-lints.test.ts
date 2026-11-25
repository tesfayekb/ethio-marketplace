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

const planted = (...names: string[]) => JSON.stringify(names.map((name) => ({ name })));

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
    const answer = JSON.stringify([
      {
        name: "duplicate_index",
        detail: "Table public.e2e_secret has identical indexes",
        metadata: { name: "e2e_secret" },
      },
    ]);
    const verdict = judgeFindings(readFindings(answer));
    expect(verdict.failed).toBe(true);
    expect(verdict.lines.join("\n")).not.toContain("e2e_secret");
  });

  it("CF-ADVISOR-1d the object form's `lints` list reads as the list", () => {
    const answer = JSON.stringify({ lints: [{ name: "auth_rls_initplan" }] });
    expect(judgeFindings(readFindings(answer)).failed).toBe(true);
    expect(judgeFindings(readFindings(JSON.stringify({ lints: [] }))).failed).toBe(false);
  });

  it("CF-ADVISOR-1e an answer it cannot understand fails, never reads as clean", () => {
    for (const text of [
      "",
      "  \n",
      "not json",
      "null",
      "{}",
      '{"lints":"x"}',
      "[1]",
      '[{"name":""}]',
    ])
      expect(() => readFindings(text), JSON.stringify(text)).toThrow(/advisors:/);
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
