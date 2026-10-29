import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import {
  ALLOWLIST,
  CI_FILE,
  LOCAL,
  allowed,
  fetchFailure,
  lineText,
  nearBand,
  nearOwed,
  pageSizes,
  planFrom,
  summary,
  typecheckVerdict,
  uncovered,
  type Line,
} from "./turn-checks";

/**
 * Foundations turn CI-2 — `bun run checks` (scripts/ci/turn-checks.sh → turn-checks.ts) mirrors
 * ci.yml: TCK-1 coverage, TCK-2 the allowlist's law, TCK-3 NOT RUN never PASS, TCK-4 the last
 * line's counts, TCK-5 the NEAR band.
 */
const ciText = readFileSync(CI_FILE, "utf8");
const steps = planFrom(ciText);

function scratchAllowlist(text: string): string {
  const dir = mkdtempSync(join(tmpdir(), "tck-"));
  const path = join(dir, "allow.txt");
  writeFileSync(path, text);
  return path;
}

describe("bun run checks mirrors ci.yml (CI-2)", () => {
  it("TCK-1 every ci.yml step is run by the script or excused, and every local form names a real step", () => {
    const allow = allowed(steps);
    expect(uncovered(steps, allow)).toEqual([]);
    const keys = new Set(steps.map((s) => s.key));
    expect(Object.keys(LOCAL).filter((k) => !keys.has(k))).toEqual([]);
    // Planted: a new job's run step joins the plan by being written; a new `uses:` step must be excused.
    const planted = ciText.replace(
      /^jobs:\n/m,
      "jobs:\n  planted-guard:\n    runs-on: ubuntu-24.04\n    steps:\n      - name: Planted check\n        run: echo planted\n      - name: Planted upload\n        uses: actions/upload-artifact@v4\n",
    );
    const more = planFrom(planted);
    expect(more.find((s) => s.key === "planted-guard › Planted check")?.run).toBe("echo planted");
    expect(uncovered(more, allow)).toEqual(["planted-guard › Planted upload"]);
  });

  it("TCK-2 a stale, expired or reasonless allowlist line fails", () => {
    for (const line of [
      "build-and-check › A step ci.yml no longer has | gone | 2027-04-30",
      "promote › * | only CI promotes | 2020-01-01",
      "promote › * |  | 2027-04-30",
    ]) {
      const path = scratchAllowlist(`${line}\n`);
      try {
        expect(() => allowed(steps, path), line).toThrow(/stale|expired|three non-empty/);
      } finally {
        rmSync(join(path, ".."), { recursive: true, force: true });
      }
    }
    expect(() => allowed(steps, ALLOWLIST)).not.toThrow();
  });

  it("TCK-3 a check that cannot run says NOT RUN with its reason, never PASS", () => {
    expect(typecheckVerdict(null, 0).verdict).toBe("NOT RUN");
    const old = typecheckVerdict({ mtimeMs: 1_000, text: "=== build x ===\nbuild OK\n" }, 2_000);
    expect(old.verdict).toBe("NOT RUN");
    expect(old.reason).toMatch(/older than the newest change/);
    expect(typecheckVerdict({ mtimeMs: 3_000, text: "=== build x ===\nbuild OK\n" }, 2_000)).toEqual({
      verdict: "PASS",
    });
    expect(
      typecheckVerdict({ mtimeMs: 3_000, text: "=== build a ===\nbuild OK\n=== build b ===\nsrc/x.ts(1,1): error TS2304\n" }, 2_000)
        .verdict,
    ).toBe("FAIL");
    const pinned = steps.find((s) => s.key === "secrets-scan › Secrets scan (gitleaks, pinned)");
    expect(pinned).toBeDefined();
    if (pinned === undefined) return;
    expect(fetchFailure(pinned, "curl: (6) Could not resolve host: github.com")).toMatch(/could not be fetched/);
    expect(fetchFailure(pinned, "/tmp/x.tar.gz: FAILED\nsha256sum: WARNING: 1 computed checksum did NOT match")).toMatch(
      /checksum failed/,
    );
    // A real refusal from a pinned tool stays a FAIL, and an unpinned step never reads as a fetch.
    expect(fetchFailure(pinned, "leaks found: 1")).toBeUndefined();
    const unpinned = steps.find((s) => s.key === "string-scan › Run string scan");
    expect(unpinned && fetchFailure(unpinned, "curl: (6) Could not resolve host")).toBeUndefined();
  });

  it("TCK-4 the last line's counts equal the lines printed", () => {
    const lines: Line[] = [
      { verdict: "PASS", key: "a › b", seconds: 1 },
      { verdict: "FAIL", key: "a › c", seconds: 2, reason: "exit 1" },
      { verdict: "NOT RUN", key: "d › *", seconds: 0, reason: "why" },
      { verdict: "PASS", key: "e › f", seconds: 0 },
    ];
    expect(summary(lines, 12)).toBe("checks: 2 PASS · 1 FAIL · 1 NOT RUN · 12s");
    expect(lineText(lines[2])).toBe("NOT RUN  d › *  (0s) — why");
  });

  it("TCK-5 the NEAR band lists each page within 0.3 KiB with its growth; a grown NEAR page is owed", () => {
    const now = pageSizes(
      [
        "Per-page first download (entry + the page's chunks, gzipped):",
        "    219.9 / 220 KiB  /",
        "    306.8 / 307 KiB  /admin/roles_/$roleId",
        "    300.0 / 304 KiB  /admin/users",
        "    277.0 / 277 KiB  /admin/legal",
      ].join("\n"),
    );
    const base = pageSizes(["    219.4 / 220 KiB  /", "    277.0 / 277 KiB  /admin/legal"].join("\n"));
    const near = nearBand(now, base);
    expect(near).toEqual([
      { page: "/", kib: 219.9, ceiling: 220, growth: 0.5 },
      { page: "/admin/legal", kib: 277, ceiling: 277, growth: 0 },
      { page: "/admin/roles_/$roleId", kib: 306.8, ceiling: 307, growth: null },
    ]);
    expect(nearOwed(near).map((n) => n.page)).toEqual(["/"]);
  });
});
