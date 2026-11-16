import { spawnSync } from "node:child_process";
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  selfTestFailureLines,
  STAGING_SINK_FIXTURE,
  STAGING_SINK_LABEL,
} from "./e2e-failure-report";

const NIGHTLY_YML = readFileSync(".github/workflows/nightly-e2e.yml", "utf8");

/** The reporter as the nightly's evidence step runs it: one `nightly` source, every output a file. */
function runNightlyReporter(results: string) {
  const dir = mkdtempSync(join(tmpdir(), "efr-nightly-"));
  mkdirSync(join(dir, "results", "e2e-results-nightly"), { recursive: true });
  copyFileSync(results, join(dir, "results", "e2e-results-nightly", "results.json"));
  const env: Record<string, string> = {};
  for (const [key, value] of Object.entries(process.env)) {
    if (value === undefined || key === "SELF_TEST" || key.startsWith("E2E_")) continue;
    if (key.startsWith("GITHUB_")) continue;
    env[key] = value;
  }
  const result = spawnSync("bun", ["scripts/e2e-failure-report.ts"], {
    encoding: "utf8",
    env: {
      ...env,
      E2E_OUT_PATH: join(dir, "out.md"),
      E2E_SOURCE_LABEL: "nightly",
      E2E_RESULTS_DIR: join(dir, "results"),
      E2E_EXPECTED_SOURCES: "nightly",
      E2E_VERDICT_PATH: join(dir, "verdict.txt"),
      E2E_VERDICT_CLASS_PATH: join(dir, "class.txt"),
      E2E_FLAKE_LEDGER: join(dir, "ledger.md"),
    },
    timeout: 60_000,
  });
  return {
    status: result.status,
    out: readFileSync(join(dir, "out.md"), "utf8"),
    verdict: readFileSync(join(dir, "verdict.txt"), "utf8"),
    cls: readFileSync(join(dir, "class.txt"), "utf8"),
  };
}

/**
 * INC-1101 (housekeeping turn 3) — the E2E evidence writer's in-file self-test (SELF_TEST=1, its
 * real captured fixtures under scripts/fixtures/) runs inside `bunx vitest run scripts`, so a
 * fixture failure is seen before the push, not only in ci.yml's verdict job.
 */

describe("the E2E failure reporter's self-test runs in the unit suite (INC-1101)", () => {
  it("EFR-1 SELF_TEST=1 passes on every captured fixture, the INC-1101 step classes included", () => {
    const result = spawnSync("bun", ["scripts/e2e-failure-report.ts"], {
      encoding: "utf8",
      env: { ...process.env, SELF_TEST: "1" },
      timeout: 60_000,
    });
    const out = `${result.stdout}${result.stderr}`;
    expect(out).not.toContain("SELF-TEST FAILED");
    expect(result.status).toBe(0);
    expect(out).toContain("Self-test OK:");
  });

  it("EFR-2 a failed check prints under its own record; a name with none under the block's", () => {
    expect(
      selfTestFailureLines(
        [
          "INC-1101 an install death is INFRA",
          "54 [ssr-error] lines counted",
          "R1a census names the missing log",
          "INC-1101 the verdict class",
          "DEC-340 the server record's frames",
          "R1b a11y: all N logs read",
          "27 rows",
        ],
        "DEC-083/084 census",
      ),
    ).toEqual([
      "SELF-TEST FAILED — INC-1101: INC-1101 an install death is INFRA; INC-1101 the verdict class",
      "SELF-TEST FAILED — DEC-083/084 census: 54 [ssr-error] lines counted; 27 rows",
      "SELF-TEST FAILED — R1a: R1a census names the missing log",
      "SELF-TEST FAILED — DEC-340: DEC-340 the server record's frames",
      "SELF-TEST FAILED — R1b: R1b a11y: all N logs read",
    ]);
    expect(selfTestFailureLines([], "DEC-083/084 census")).toEqual([]);
  });
});

describe("the nightly's verdict without its serial run (DEC-393, INC-1175)", () => {
  it("EFR-3 the sink's refusal labels its failure, the class file and the heartbeat; it still gates", () => {
    const sink = runNightlyReporter(STAGING_SINK_FIXTURE);
    expect(sink.status).toBe(0);
    expect(sink.out.split(`- Class: **${STAGING_SINK_LABEL}**`)).toHaveLength(2);
    expect(sink.out).toMatch(
      /## [^\n]*CAP-1 a missing testid[^\n]*\n\n- Class: \*\*STAGING-SINK \(environment/,
    );
    expect(sink.out).toContain("- Gating failures: 2 · STAGING-SINK (INC-1175, still gating): 1");
    expect(sink.verdict).toBe("gating=2\nsilent=0\nflaky=0\n");
    expect(sink.cls).toBe(
      "TESTS\nSTAGING-SINK 1 (environment: the staging mail sink refused the send — INC-1175)\n",
    );
    // The heartbeat's Conclusion line carries the class file's STAGING-SINK line.
    expect(NIGHTLY_YML).toContain("E2E_VERDICT_CLASS_PATH: /tmp/nightly-verdict-class.txt");
    expect(NIGHTLY_YML).toMatch(/grep -m 1 '\^STAGING-SINK' \/tmp\/nightly-verdict-class\.txt/);
    expect(NIGHTLY_YML).toMatch(/Conclusion: FAILURE[^\n]*\$\{SINK\}/);

    const plain = runNightlyReporter("scripts/fixtures/e2e-results-sample.json");
    expect(plain.out).not.toContain("STAGING-SINK (environment");
    expect(plain.cls).toBe("TESTS\n");
    expect(plain.verdict).toBe("gating=2\nsilent=0\nflaky=0\n");
  });

  it("EFR-4 one source, read whole: no retired source is missed, no serial run remains", () => {
    const run = runNightlyReporter("scripts/fixtures/e2e-results-sample.json");
    expect(run.out).toContain("- Sources without results: none");
    expect(run.out).not.toMatch(/\bfull\b.*results/);
    expect(NIGHTLY_YML).toMatch(/^ {10}E2E_EXPECTED_SOURCES: nightly$/m);
    expect(NIGHTLY_YML).not.toMatch(/runfull|e2e-results-full|nightly-full|quarantin/i);
    expect(NIGHTLY_YML).toMatch(
      /^ {10}E2E_GREEN: \$\{\{ steps\.run\.outcome == 'success' && '1' \|\| '0' \}\}$/m,
    );
  });
});
