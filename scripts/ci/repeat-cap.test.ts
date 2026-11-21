import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  cappedBeforeLoad,
  capVerdict,
  capVerdictOfFile,
  isGlobalTimeout,
  mergedReport,
  SERIAL_CAP_LINE,
} from "./repeat-cap";

/**
 * DEC-283 / INC-966 (Foundations turn K5) — scripts/ci/repeat-cap.ts, the one reader of the
 * repeat lane's time cap. Fixtures are built from Playwright's own template
 * (playwright 1.58.1 lib/runner/taskRunner.js:91) and its red, applyStyle(31, 39, …)
 * (playwright-core lib/utils/isomorphic/colors.js:36, :67).
 */

const plain = (seconds: number, task: string) =>
  `Timed out waiting ${seconds}s for the ${task} to run`;
const red = (text: string) => `\x1B[31m${text}\x1B[39m`;

const interruptedSuite = {
  title: "geo.spec.ts",
  specs: [
    {
      title: "GEO-1 the feed is scoped",
      tests: [
        { projectName: "mobile-360", status: "expected", results: [{ status: "passed" }] },
        { projectName: "desktop-1280", status: "skipped", results: [{ status: "interrupted" }] },
      ],
    },
  ],
  suites: [],
};

const report = (errors: unknown[], suites: unknown[] = [interruptedSuite]) => ({
  errors: errors.map((message) => ({ message })),
  suites,
});

describe("the repeat lane's cap reader (INC-966)", () => {
  it("RCAP-1 the coloured global-timeout message alone is capped, and names what it left", () => {
    expect(isGlobalTimeout(red(plain(720, "test suite")))).toBe(true);
    expect(capVerdict(report([red(plain(720, "test suite"))]))).toEqual({
      verdict: "capped",
      left: ["geo.spec.ts / GEO-1 the feed is scoped / desktop-1280"],
    });
  });

  it("RCAP-2 the plain global-timeout message alone is capped", () => {
    expect(isGlobalTimeout(plain(720, "test suite"))).toBe(true);
    expect(isGlobalTimeout(plain(0.5, "load tests"))).toBe(true);
    expect(capVerdict(report([plain(720, "test suite")])).verdict).toBe("capped");
  });

  it("RCAP-3 a different error is failed — the webServer timeout included", () => {
    expect(capVerdict(report(["Error: page.goto: net::ERR_CONNECTION_REFUSED"])).verdict).toBe(
      "failed",
    );
    const webServer = "Timed out waiting 120000ms from config.webServer.";
    expect(isGlobalTimeout(webServer)).toBe(false);
    expect(capVerdict(report([webServer])).verdict).toBe("failed");
    expect(isGlobalTimeout(`Error: ${plain(720, "test suite")}`)).toBe(false);
    expect(isGlobalTimeout(`${plain(720, "test suite")} and more`)).toBe(false);
  });

  it("RCAP-4 a mix of the cap and another error is failed", () => {
    expect(capVerdict(report([red(plain(720, "test suite")), "Error: boom"])).verdict).toBe(
      "failed",
    );
  });

  it("RCAP-5 no error at all is failed (a non-zero exit with nothing named is not a cap)", () => {
    expect(capVerdict(report([])).verdict).toBe("failed");
    expect(capVerdict({ suites: [] }).verdict).toBe("failed");
  });

  it("RCAP-6 a message it cannot read is failed, never capped", () => {
    expect(isGlobalTimeout(undefined)).toBe(false);
    expect(isGlobalTimeout(42)).toBe(false);
    expect(capVerdict({ errors: [{ value: "x" }], suites: [] }).verdict).toBe("failed");
    expect(capVerdict({ errors: ["not an object"], suites: [] }).verdict).toBe("failed");
    expect(capVerdict(null).verdict).toBe("failed");
  });

  it("RCAP-9 a report whose lists or entries are malformed is failed, never capped", () => {
    const cap = [{ message: plain(720, "test suite") }];
    const bad: unknown[] = [
      { errors: cap, suites: null },
      { errors: cap, suites: "x" },
      { errors: cap, suites: [7] },
      { errors: cap, suites: [{ title: "a", specs: null }] },
      { errors: cap, suites: [{ title: "a", specs: [null] }] },
      { errors: cap, suites: [{ title: "a", specs: [{ title: "s", tests: {} }] }] },
      { errors: cap, suites: [{ title: "a", specs: [{ title: "s", tests: ["t"] }] }] },
      {
        errors: cap,
        suites: [{ title: "a", specs: [{ title: "s", tests: [{ results: null }] }] }],
      },
      { errors: cap, suites: [{ title: "a", suites: [null] }] },
      { errors: cap, suites: [[]] },
      { errors: cap, suites: [{ title: "a", suites: [[]] }] },
      { errors: cap, suites: [{ title: "a", specs: [[]] }] },
      { errors: cap, suites: [{ title: "a", specs: [{ title: "s", tests: [[]] }] }] },
      {
        errors: cap,
        suites: [{ title: "a", specs: [{ title: "s", tests: [{ results: [[]] }] }] }],
      },
      { errors: [[]], suites: [] },
      ...[undefined, null, "failed", "passed"].map((status) => ({
        errors: cap,
        suites: [
          {
            title: "a",
            specs: [{ title: "s", tests: [{ status, results: [{ status: "failed" }] }] }],
          },
        ],
      })),
    ];
    for (const r of bad) expect(capVerdict(r).verdict, JSON.stringify(r)).toBe("failed");
    expect(capVerdict({ errors: cap }).verdict).toBe("capped");
  });

  it("RCAP-7 the cap with a failed repetition is failed", () => {
    const failedSuite = {
      title: "geo.spec.ts",
      specs: [
        {
          title: "GEO-2",
          tests: [
            { projectName: "mobile-360", status: "unexpected", results: [{ status: "failed" }] },
          ],
        },
      ],
    };
    expect(capVerdict(report([plain(720, "test suite")], [failedSuite])).verdict).toBe("failed");
  });

  it("RCAP-8 an absent or unreadable report file is failed; the command line exits 1 then, 0 when capped", () => {
    const dir = mkdtempSync(join(tmpdir(), "repeat-cap-"));
    try {
      expect(capVerdictOfFile(join(dir, "absent.json")).verdict).toBe("failed");
      writeFileSync(join(dir, "broken.json"), "{ not json");
      expect(capVerdictOfFile(join(dir, "broken.json")).verdict).toBe("failed");

      const evidence = join(dir, "evidence.txt");
      writeFileSync(evidence, "- Repeat: each 2\n");
      const cli = (file: string) =>
        spawnSync("bun", ["run", "scripts/ci/repeat-cap.ts", file, evidence], { encoding: "utf8" });
      expect(cli(join(dir, "absent.json")).status).toBe(1);
      expect(readFileSync(evidence, "utf8")).toBe("- Repeat: each 2\n");

      writeFileSync(
        join(dir, "capped.json"),
        JSON.stringify(report([red(plain(720, "test suite"))])),
      );
      expect(cli(join(dir, "capped.json")).status).toBe(0);
      expect(readFileSync(evidence, "utf8")).toBe(
        "- Repeat: each 2\n- Not repeated (time cap): geo.spec.ts / GEO-1 the feed is scoped / desktop-1280\n",
      );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  const passed = (title: string) => ({
    title: "rail.spec.ts",
    specs: [
      {
        title,
        tests: [
          { projectName: "desktop-1280", status: "expected", results: [{ status: "passed" }] },
        ],
      },
    ],
  });
  const withStats = (r: object, expected: number, unexpected: number) => ({
    ...r,
    config: { workers: 1 },
    stats: { startTime: "t", duration: 10, expected, skipped: 0, unexpected, flaky: 0 },
  });

  it("RCAP-10 the two passes join as one report: suites and errors in pass order, stats summed (DEC-415)", () => {
    const first = withStats(report([], [passed("PAR-1")]), 1, 0);
    const failedSerial = {
      title: "rail.spec.ts",
      specs: [
        {
          title: "SER-1",
          tests: [
            { projectName: "desktop-1280", status: "unexpected", results: [{ status: "failed" }] },
          ],
        },
      ],
    };
    const second = withStats(report([], [failedSerial]), 0, 1);
    const merged = mergedReport(first, second);
    expect(merged).toEqual({
      config: { workers: 1 },
      suites: [passed("PAR-1"), failedSerial],
      errors: [],
      stats: { startTime: "t", duration: 20, expected: 1, skipped: 0, unexpected: 1, flaky: 0 },
    });
    // A failure in the serial pass fails the cap over both; a cap in the serial pass alone is a cap.
    const capped = report([plain(30, "test suite")], [interruptedSuite]);
    expect(capVerdict(mergedReport(capped, second)).verdict).toBe("failed");
    expect(capVerdict(mergedReport(first, capped))).toEqual({
      verdict: "capped",
      left: ["geo.spec.ts / GEO-1 the feed is scoped / desktop-1280"],
    });
    // The parallel pass ran no test: its empty report keeps the serial pass's config and stats.
    expect(mergedReport({ suites: [], errors: [] }, second)).toEqual(second);
    expect(mergedReport(first, undefined)).toBeNull();
    expect(mergedReport(first, { suites: [] })).toBeNull();
    expect(cappedBeforeLoad(report([plain(1, "global setup")], []))).toBe(true);
    expect(cappedBeforeLoad(capped)).toBe(false);
    expect(cappedBeforeLoad(report([], []))).toBe(false);
  });

  it("RCAP-11 --merge joins the set-aside pass back; a cap before any test loaded is named, a missing report fails", () => {
    const dir = mkdtempSync(join(tmpdir(), "repeat-merge-"));
    try {
      const aside = join(dir, "aside");
      const results = join(dir, "test-results");
      const evidence = join(dir, "evidence.txt");
      const pass = (path: string, body: object, context: string) => {
        mkdirSync(join(path, "a-test"), { recursive: true });
        writeFileSync(join(path, "results.json"), JSON.stringify(body));
        writeFileSync(join(path, "a-test", `${context}.md`), context);
      };
      const cli = () =>
        spawnSync("bun", ["run", "scripts/ci/repeat-cap.ts", "--merge", aside, results, evidence], {
          encoding: "utf8",
        });
      writeFileSync(evidence, "- Repeat: each 2\n");
      pass(aside, report([], [passed("PAR-1")]), "parallel");
      pass(results, report([plain(1, "global setup")], []), "serial");
      expect(cli().status).toBe(0);
      const joined: unknown = JSON.parse(readFileSync(join(results, "results.json"), "utf8"));
      expect(joined).toEqual(
        mergedReport(report([], [passed("PAR-1")]), report([plain(1, "global setup")], [])),
      );
      expect(readFileSync(join(results, "a-test", "parallel.md"), "utf8")).toBe("parallel");
      expect(readFileSync(join(results, "a-test", "serial.md"), "utf8")).toBe("serial");
      expect(readFileSync(evidence, "utf8")).toBe(`- Repeat: each 2\n${SERIAL_CAP_LINE}`);

      rmSync(results, { recursive: true, force: true });
      expect(cli().status).toBe(1);
      expect(readFileSync(join(results, "results.json"), "utf8")).toBe(
        JSON.stringify(report([], [passed("PAR-1")])),
      );
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
