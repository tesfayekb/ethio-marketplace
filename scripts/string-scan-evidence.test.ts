import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * INC-994 — a refused string reaches the CI evidence. guards-last-failure.md keeps only
 * the log lines the reporter's EVIDENCE filter matches (ci-status-report.yml); the scan's
 * findings printed bare, so the evidence showed the verdict and not what was refused.
 * The filter is read from the workflow itself, never copied, and the scan runs on its own
 * bad fixture.
 */
const ROOT = join(__dirname, "..");

function evidenceFilter(): RegExp {
  const yml = readFileSync(join(ROOT, ".github/workflows/ci-status-report.yml"), "utf8");
  const match = /const EVIDENCE =\s*\n?\s*\/(.+)\/;/.exec(yml);
  if (!match?.[1]) throw new Error("the reporter's EVIDENCE filter was not found");
  return new RegExp(match[1]);
}

function scan(target: string): { out: string; code: number } {
  try {
    const out = execFileSync("bash", ["scripts/check-hardcoded-strings.sh", target], {
      cwd: ROOT,
      encoding: "utf8",
    });
    return { out, code: 0 };
  } catch (error) {
    const failed = error as { stdout?: string; status?: number };
    return { out: failed.stdout ?? "", code: failed.status ?? 1 };
  }
}

describe("the string scan's findings reach the evidence (INC-994)", () => {
  it("SCAN-EV-1 every finding on the bad fixture is a line the reporter keeps", () => {
    const filter = evidenceFilter();
    const { out, code } = scan("scripts/fixtures/string-scan-bad");
    expect(code).toBe(1);
    const findings = out.split("\n").filter((line) => line.includes("hardcoded-text-example"));
    expect(findings.length).toBeGreaterThan(0);
    for (const line of findings) expect(filter.test(line), line).toBe(true);
  });

  it("SCAN-EV-2 the good fixture prints no finding line", () => {
    const { out, code } = scan("scripts/fixtures/string-scan-good");
    expect(code).toBe(0);
    expect(out).not.toContain("FAIL finding:");
  });
});
