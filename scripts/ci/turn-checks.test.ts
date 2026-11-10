import { changedTestFolders, semgrepPins, semgrepTargets, turnBase } from "./laws-changed";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import {
  ALLOWLIST,
  CI_FILE,
  LOCAL,
  LOCAL_UNIT_BOUND,
  allowed,
  assetMachine,
  budgetVerdict,
  fastFirst,
  isTestStep,
  lawsFirst,
  LAWS_CHANGED_UNITS,
  LAWS_STEP,
  LAWS_SEMGREP,
  LAWS_STEPS,
  fastLine,
  fetchFailure,
  lineText,
  localSecretsScan,
  localUnitTests,
  nearBand,
  nearNamed,
  noteLine,
  pageSizes,
  parseArgs,
  pinnedAsset,
  planFrom,
  platformReason,
  summary,
  typecheckVerdict,
  uncovered,
  type Line,
  type Step,
} from "./turn-checks";

/**
 * Foundations turn CI-2 — `bun run checks` (scripts/ci/turn-checks.sh → turn-checks.ts) mirrors
 * ci.yml: TCK-1 coverage, TCK-2 the allowlist's law, TCK-3 NOT RUN never PASS, TCK-4 the last
 * line's counts, TCK-5 the NEAR band (DEC-296's one band, a NOTE — DEC-361), TCK-6 the local unit
 * step's worker bound (INC-1001), TCK-7 a pinned binary built for another machine is NOT RUN
 * (INC-1094), TCK-8 `--no-tests` (INC-1064), TCK-9 the budget step's NEAR-only failure is a PASS
 * with its NOTE lines (DEC-361).
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
    // The secrets scan's local walk replaces both of CI's ranges, so it never walks the old history.
    const scan = steps.find((s) => s.key === "secrets-scan › Secrets scan (gitleaks, pinned)");
    const local = localSecretsScan(scan?.run ?? "", "f9569298");
    expect(local).not.toMatch(/range="(?:origin\/main\.\.)?HEAD"/);
    expect(local.match(/range="f9569298\.\.HEAD"/g)?.length).toBe(2);
    expect(local).toContain("git --pre-commit");
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
    expect(
      typecheckVerdict({ mtimeMs: 3_000, text: "=== build x ===\nbuild OK\n" }, 2_000),
    ).toEqual({
      verdict: "PASS",
    });
    expect(
      typecheckVerdict(
        {
          mtimeMs: 3_000,
          text: "=== build a ===\nbuild OK\n=== build b ===\nsrc/x.ts(1,1): error TS2304\n",
        },
        2_000,
      ).verdict,
    ).toBe("FAIL");
    const pinned = steps.find((s) => s.key === "secrets-scan › Secrets scan (gitleaks, pinned)");
    expect(pinned).toBeDefined();
    if (pinned === undefined) return;
    expect(fetchFailure(pinned, "curl: (6) Could not resolve host: github.com")).toMatch(
      /could not be fetched/,
    );
    expect(
      fetchFailure(
        pinned,
        "/tmp/x.tar.gz: FAILED\nsha256sum: WARNING: 1 computed checksum did NOT match",
      ),
    ).toMatch(/checksum failed/);
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

  it("TCK-5 the NEAR band is DEC-296's one band (budget-band.mjs), and a NEAR page is a NOTE with its growth, never a FAIL (DEC-361)", () => {
    const now = pageSizes(
      [
        "JS: 214.8 KiB / 215 KiB — ok",
        "CSS: 23.1 KiB / 40 KiB — ok",
        "Per-page first download (entry + the page's chunks, gzipped):",
        "    219.7 / 220 KiB  /",
        "    306.8 / 307 KiB  /admin/roles_/$roleId",
        "    300.0 / 304 KiB  /admin/users",
        "    276.8 / 277 KiB  /admin/legal",
        "    372.6 / 373 KiB  /admin/screening",
      ].join("\n"),
    );
    const base = pageSizes(
      [
        "JS: 214.8 KiB / 215 KiB — ok",
        "    219.2 / 220 KiB  /",
        "    276.9 / 277 KiB  /admin/legal",
      ].join("\n"),
    );
    // The local size is judged with budget-band.mjs's local allowance (+0.1), as the budget step
    // judges it: 219.7 → 219.8 sits 0.2 under 220; 300.0 → 300.1 sits 3.9 under 304.
    expect(nearBand(now, base)).toEqual([
      { page: "/", kib: 219.7, ceiling: 220, growth: 0.5 },
      { page: "/admin/legal", kib: 276.8, ceiling: 277, growth: -0.1 },
      { page: "/admin/roles_/$roleId", kib: 306.8, ceiling: 307, growth: null },
      { page: "entry JS", kib: 214.8, ceiling: 215, growth: 0 },
    ]);
    // D320: 372.61 prints as 372.6 — outside the band at one decimal, inside it unrounded. A page
    // the budget step itself names is NEAR whatever its printed size reads.
    expect(nearBand(now, base, new Set(["/admin/screening"])).map((n) => n.page)).toContain(
      "/admin/screening",
    );
    expect(noteLine({ page: "/", kib: 219.7, ceiling: 220, growth: 0.5 }, "2b11a9d2")).toBe(
      "NEAR / 219.7 / 220 KiB, grew +0.5 since 2b11a9d2 — CI's bundle-budget job judges; raise the line only with a named cause",
    );
    expect(
      noteLine({ page: "/admin/roles_/$roleId", kib: 306.8, ceiling: 307, growth: null }, null),
    ).toBe("NEAR /admin/roles_/$roleId 306.8 / 307 KiB, NOT RUN — NEAR: base not built, CI judges");
    const source = readFileSync("scripts/ci/turn-checks.ts", "utf8");
    expect(source).toContain('from "../budget-band.mjs"');
    expect(source).not.toMatch(/NEAR_KIB\s*=/);
  });

  it("TCK-6 the local unit step carries the 2-worker bound; ci.yml's command does not", () => {
    const key = "component-tests › Component tests (vitest + RTL + jsdom)";
    const unit = steps.find((s) => s.key === key);
    expect(unit?.run).toBe("bun run test:unit");
    expect(unit?.run).not.toContain("maxWorkers");
    expect(ciText).not.toContain("maxWorkers");
    expect(localUnitTests(unit?.run ?? "")).toBe("bun run test:unit -- --maxWorkers=2");
    expect(LOCAL_UNIT_BOUND).toBe("--maxWorkers=2");
    expect(LOCAL[key]).toBe(
      "the sandbox's shared CPU: the full suite at default workers times out (INC-1001)",
    );
  });

  it("TCK-7 a pinned binary built for another machine is NOT RUN with the platform reason; a native one runs (INC-1094)", () => {
    const planted = (asset: string): Step => ({
      job: "planted",
      name: "Planted pinned tool",
      key: "planted › Planted pinned tool",
      run: `tarball="${asset}"\ncurl -sSfL -o "$RUNNER_TEMP/$tarball" "https://example.invalid/releases/download/v\${TOOL_VERSION}/$tarball"`,
      env: { TOOL_VERSION: "1.0", TOOL_SHA256: "planted" },
      timeoutS: 60,
      conditional: false,
    });
    const mac = { platform: "darwin", arch: "arm64" };
    const linux = { platform: "linux", arch: "x64" };
    const foreign = planted("tool_${TOOL_VERSION}_linux_amd64.tar.gz");
    expect(pinnedAsset(foreign)).toBe("tool_1.0_linux_amd64.tar.gz");
    expect(platformReason(foreign, mac)).toBe(
      "pinned binary linux/x64 (tool_1.0_linux_amd64.tar.gz); this machine darwin/arm64",
    );
    expect(platformReason(foreign, linux)).toBeUndefined();
    expect(
      platformReason(planted("tool_${TOOL_VERSION}_darwin_arm64.tar.gz"), mac),
    ).toBeUndefined();
    expect(assetMachine("tool-1.0-x86_64-unknown-linux-gnu.tar.gz")).toEqual(linux);
    expect(assetMachine("tool_1.0_macOS_arm64.tar.gz")).toEqual(mac);
    expect(platformReason(planted("tool_${TOOL_VERSION}.tar.gz"), mac)).toBe(
      "pinned asset platform unknown: tool_1.0.tar.gz",
    );
    // ci.yml's own two pinned tools, read from their text: Linux x64, so NOT RUN on this Mac's
    // kind of machine and run on CI's. A step with no checksum is not a pinned asset.
    for (const key of [
      "build-and-check › Workflow lint (actionlint, pinned)",
      "secrets-scan › Secrets scan (gitleaks, pinned)",
    ]) {
      const step = steps.find((s) => s.key === key);
      expect(step, key).toBeDefined();
      if (step === undefined) continue;
      expect(platformReason(step, linux), key).toBeUndefined();
      expect(platformReason(step, mac), key).toMatch(
        /^pinned binary linux\/x64 \((?:actionlint_1\.7\.7_linux_amd64|gitleaks_8\.24\.3_linux_x64)\.tar\.gz\); this machine darwin\/arm64$/,
      );
    }
    const pinnedKeys = steps.filter((s) => pinnedAsset(s) !== null).map((s) => s.key);
    expect(pinnedKeys).toEqual([
      "build-and-check › Workflow lint (actionlint, pinned)",
      "secrets-scan › Secrets scan (gitleaks, pinned)",
    ]);
  });

  it("TCK-8 --no-tests leaves every vitest and playwright step NOT RUN and every other step as before (INC-1064)", () => {
    expect(parseArgs([])).toEqual({ noTests: false });
    expect(parseArgs(["--no-tests"])).toEqual({ noTests: true });
    expect(parseArgs(["--no-test"])).toEqual({ error: "unknown argument --no-test" });
    const scripts = new Map(
      Object.entries(
        (JSON.parse(readFileSync("package.json", "utf8")) as { scripts: Record<string, string> })
          .scripts,
      ),
    );
    const plan = lawsFirst([...fastFirst(steps).fast, ...fastFirst(steps).slow]);
    expect(plan.filter((s) => isTestStep(s, scripts)).map((s) => s.key)).toEqual([
      LAWS_STEP.key,
      LAWS_CHANGED_UNITS.key,
      "component-tests › Component tests (vitest + RTL + jsdom)",
    ]);
    // Planted: a `bun run` script that reaches a test runner, and the runner's own marked step.
    const planted = (run: string, tests?: boolean): Step => ({
      job: "planted",
      name: run,
      key: `planted › ${run}`,
      run,
      env: {},
      timeoutS: 60,
      conditional: false,
      ...(tests === undefined ? {} : { tests }),
    });
    const plantedScripts = new Map([
      ["test:unit", "vitest run"],
      ["e2e:x", "playwright test"],
      ["lint", "eslint ."],
    ]);
    expect(isTestStep(planted("bun run test:unit"), plantedScripts)).toBe(true);
    expect(isTestStep(planted("bun run e2e:x -- a.spec.ts"), plantedScripts)).toBe(true);
    expect(isTestStep(planted("bun run lint"), plantedScripts)).toBe(false);
    expect(isTestStep(planted("bun scripts/ci/laws-changed.ts units"), plantedScripts)).toBe(false);
    expect(isTestStep(planted("bun scripts/ci/laws-changed.ts units", true), plantedScripts)).toBe(
      true,
    );
    const lines: Line[] = [
      { verdict: "PASS", key: "a › b", seconds: 1 },
      { verdict: "NOT RUN", key: LAWS_STEP.key, seconds: 0, reason: "--no-tests" },
    ];
    expect(summary(lines, 3, true)).toBe(
      "checks: 1 PASS · 0 FAIL · 1 NOT RUN · 3s · --no-tests (the laws and the unit tests not run)",
    );
    expect(summary(lines, 3)).toBe("checks: 1 PASS · 0 FAIL · 1 NOT RUN · 3s");
  });

  it("TCK-9 the budget step's NEAR-only failure is a PASS with a NOTE per NEAR page; any other budget failure stays its FAIL (DEC-361)", () => {
    // Lines copied from two real runs of scripts/check-bundle-size.mjs (one page's ceiling moved in
    // a scratch copy of route-budgets.mjs: into the band, then under the size).
    const nearOnly = [
      "    216.1 / 216.3 KiB  /auth_/callback",
      "Tier flag: card pages only (CF-TIER-3) — ok",
      "",
      "NEAR band failed (DEC-296):",
      "  /auth_/callback: 216.1 KiB + 0.1 KiB local allowance sits within the NEAR band (0.3 KiB) of its ceiling of 216.3 KiB — DEC-296: set it to ceilingForLocal(size) = 217",
    ].join("\n");
    const perPage = [
      "",
      "Per-page budget failed (D234):",
      "  /auth_/callback: 216.2 KiB, over its ceiling of 216 KiB",
      "",
      "Code-split the addition behind a dynamic import, or change the page's line in",
      "scripts/route-budgets.mjs in a commit that states why (a saving lowers it).",
    ].join("\n");
    expect(budgetVerdict(1, nearOnly)).toBe("PASS");
    expect(nearNamed(nearOnly)).toEqual(new Set(["/auth_/callback"]));
    expect(budgetVerdict(1, perPage)).toBe("FAIL");
    expect(budgetVerdict(1, `${perPage}\n${nearOnly}`)).toBe("FAIL");
    expect(budgetVerdict(0, "Bundle budget OK.")).toBe("PASS");
    expect(budgetVerdict(1, "Bundle budget: no client build output found.")).toBe("FAIL");
    // The markers the reader keys on are the budget script's own words.
    const check = readFileSync("scripts/check-bundle-size.mjs", "utf8");
    expect(check).toContain('"\\nNEAR band failed (DEC-296):"');
    expect(check).toContain('"\\nPer-page budget failed (D234):"');
    expect(readFileSync("scripts/budget-band.mjs", "utf8")).toContain("sits within the NEAR band");
  });

  it("TC-E1 the fast steps run first, no step is dropped, each job keeps its order, and no build is fast (DEC-311)", () => {
    const steps = planFrom(readFileSync(CI_FILE, "utf8"));
    const { fast, slow } = fastFirst(steps);
    expect(new Set([...fast, ...slow])).toEqual(new Set(steps));
    expect(fast.length + slow.length).toBe(steps.length);
    expect(fast.some((s) => /\bbun run build\b/.test(s.run))).toBe(false);
    expect(fast.map((s) => s.key)).toContain(
      "component-tests › Component tests (vitest + RTL + jsdom)",
    );
    expect(slow.map((s) => s.key)).toContain("bundle-budget › Check the first-paint budget");
    const order = [...fast, ...slow];
    for (const job of new Set(steps.map((s) => s.job)))
      expect(order.filter((s) => s.job === job)).toEqual(steps.filter((s) => s.job === job));
  });

  it("TC-E2 the fast line is never the verdict: it never begins 'checks:', and a fast FAIL stays in the final count", () => {
    const lines: Line[] = [
      { verdict: "PASS", key: "a › b", seconds: 1 },
      { verdict: "FAIL", key: "a › c", seconds: 2, reason: "exit 1" },
    ];
    const line = fastLine(lines, 5, ["a"]);
    expect(line.startsWith("checks (fast): 1 PASS · 1 FAIL · 5s — a")).toBe(true);
    expect(/^checks: /.test(line)).toBe(false);
    expect(summary(lines, 9)).toBe("checks: 1 PASS · 1 FAIL · 0 NOT RUN · 9s");
  });

  it("TC-E3 the scripts/ tests run before any other unit test, and their failure shows in the fast line (INC-1030)", () => {
    const steps = planFrom(readFileSync(CI_FILE, "utf8"));
    const fast = lawsFirst(fastFirst(steps).fast);
    expect(fast[0]).toBe(LAWS_STEP);
    expect(LAWS_STEP.run).toMatch(/^bunx vitest run scripts\b/);
    const unit = fast.findIndex(
      (s) => s.key === "component-tests › Component tests (vitest + RTL + jsdom)",
    );
    expect(unit).toBeGreaterThan(0);
    expect(fast.filter((s) => /\bvitest\b/.test(s.run)).indexOf(LAWS_STEP)).toBe(0);
    expect(LAWS_STEP.job).not.toBe(fast[unit].job);
    const line = fastLine(
      [{ verdict: "FAIL", key: LAWS_STEP.key, seconds: 60, reason: "exit 1" }],
      60,
      [LAWS_STEP.job],
    );
    expect(line).toContain("0 PASS · 1 FAIL");
  });
  it("TC-E4 the laws step also runs the changed folders' unit tests and Semgrep on the changed files with CI's pins, in the fast line (INC-1030)", () => {
    const ci = readFileSync(CI_FILE, "utf8");
    const fast = lawsFirst(fastFirst(planFrom(ci)).fast);
    expect(fast.slice(0, 3)).toEqual(LAWS_STEPS);
    expect(fast[1]?.run).toBe("bun scripts/ci/laws-changed.ts units");
    expect(fast[2]?.run).toBe("bun scripts/ci/laws-changed.ts semgrep");
    expect(semgrepPins(ci)).toEqual({
      version: "1.179.0",
      rules: "a84ff9cc2453ca91d581380de4b8b3f272f6f4be",
    });
    const tests: Record<string, string[]> = {
      "src/lib": ["themes.test.ts", "themes.ts"],
      e2e: ["x.spec.ts"],
      "src/a": ["a.tsx"],
    };
    expect(
      changedTestFolders(
        ["src/styles.css", "src/lib/themes.ts", "src/a/a.tsx", "e2e/x.spec.ts"],
        (d) => tests[d] ?? [],
      ),
    ).toEqual(["src/lib"]);
    expect(
      semgrepTargets([
        "e2e/dark-cards.spec.ts",
        "src/styles.css",
        "scripts/fixtures/semgrep/bad.js",
      ]),
    ).toEqual(["e2e/dark-cards.spec.ts"]);
    const line = fastLine(
      [{ verdict: "FAIL", key: LAWS_SEMGREP.key, seconds: 9, reason: "exit 1" }],
      9,
      ["laws-first"],
    );
    expect(line).toContain("0 PASS · 1 FAIL");
  });

  it("TC-E5 the laws step's base is TURN_BASE, else the roadmap brief's Base line, else a loud failure — never HEAD~1 (F4b)", () => {
    const roadmap =
      "# Roadmap\n\nThe brief in force: docs/governance/briefs/foundations-turn-x.md (x)\n";
    const brief = (p: string) =>
      p === "docs/governance/briefs/foundations-turn-x.md"
        ? "RULING — Base: dev e1e736df. Tier B."
        : null;
    expect(turnBase("abc1234", roadmap, brief)).toBe("abc1234");
    expect(turnBase(undefined, roadmap, brief)).toBe("e1e736df");
    expect(turnBase("", roadmap, brief)).toBe("e1e736df");
    expect(turnBase(undefined, roadmap, () => "no base here")).toBeNull();
    expect(turnBase(undefined, "# Roadmap\n\nnothing\n", brief)).toBeNull();
    expect(readFileSync("scripts/ci/laws-changed.ts", "utf8")).not.toMatch(/HEAD~1/);
  });
});
