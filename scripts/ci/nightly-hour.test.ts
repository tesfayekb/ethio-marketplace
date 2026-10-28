import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * DEC-277 (Foundations turn K3) — scripts/ci/nightly-hour.sh: the nightly starts at 11:30 in New
 * York all year. Two UTC schedules (15:30 and 16:30); each run goes on only when its own schedule,
 * on the run's UTC day, is 11 o'clock in New York — so the clock changes of 1 November 2026 and
 * 14 March 2027 need no re-time, and a run GitHub starts late is judged by the hour it was due.
 */

const SCRIPT = "scripts/ci/nightly-hour.sh";
const SUMMER = "30 15 * * *";
const WINTER = "30 16 * * *";

function run(args: string[], output?: string) {
  const env: NodeJS.ProcessEnv = { ...process.env };
  delete env.GITHUB_OUTPUT;
  if (output !== undefined) env.GITHUB_OUTPUT = output;
  const result = spawnSync("bash", [SCRIPT, ...args], { encoding: "utf8", env, timeout: 20_000 });
  return { code: result.status, out: `${result.stdout}${result.stderr}` };
}

/** The verdict a run prints on its last line ("go=true" or "go=false"). */
function verdict(out: string): string {
  return out.trim().split("\n").at(-1) ?? "";
}

describe("the nightly starts at 11:30 in New York, all year (DEC-277)", () => {
  it("NH-1 in summer the 15:30 UTC schedule runs and the 16:30 one stands down", () => {
    const summer = run(["schedule", SUMMER, "2026-07-15"]);
    const winterCron = run(["schedule", WINTER, "2026-07-15"]);
    expect(summer.code).toBe(0);
    expect(summer.out).toContain("11:30 in New York");
    expect(verdict(summer.out)).toBe("go=true");
    expect(winterCron.code).toBe(0);
    expect(winterCron.out).toContain("12:30 in New York");
    expect(verdict(winterCron.out)).toBe("go=false");
  });

  it("NH-2 in winter the 16:30 UTC schedule runs and the 15:30 one stands down", () => {
    const summerCron = run(["schedule", SUMMER, "2026-12-15"]);
    const winter = run(["schedule", WINTER, "2026-12-15"]);
    expect(verdict(summerCron.out)).toBe("go=false");
    expect(summerCron.out).toContain("10:30 in New York");
    expect(verdict(winter.out)).toBe("go=true");
    expect(winter.out).toContain("11:30 in New York");
  });

  it("NH-3 each clock-change day has exactly one run at 11:30 (2026-11-01, 2027-03-14)", () => {
    for (const [day, runs] of [
      ["2026-11-01", WINTER],
      ["2027-03-14", SUMMER],
    ] as const) {
      const going = [SUMMER, WINTER].filter(
        (cron) => verdict(run(["schedule", cron, day]).out) === "go=true",
      );
      expect(going, day).toEqual([runs]);
    }
  });

  it("NH-4 a run started by hand always goes on, and the answer reaches GITHUB_OUTPUT", () => {
    const dir = mkdtempSync(join(tmpdir(), "nh-"));
    try {
      const output = join(dir, "output");
      const result = run(["workflow_dispatch"], output);
      expect(result.code).toBe(0);
      expect(verdict(result.out)).toBe("go=true");
      expect(readFileSync(output, "utf8")).toBe("go=true\n");
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("NH-5 a schedule, a day or a call it cannot read is an error, never a silent skip", () => {
    for (const args of [
      [],
      ["schedule", "0 18 * *", "2026-07-15"],
      ["schedule", "30 25 * * *", "2026-07-15"],
      ["schedule", SUMMER, "2026-13-40"],
      ["schedule", SUMMER, "15 July"],
    ]) {
      const result = run(args);
      expect(result.code, args.join(" ")).toBe(2);
      expect(result.out).toContain("::error title=nightly-hour::");
      expect(result.out).not.toContain("go=");
    }
  });
});
