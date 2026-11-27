import { describe, expect, it } from "vitest";

import { ErrorReportBody, type ErrorReport } from "@/lib/schemas/error-report";

const REPORT: ErrorReport = {
  kind: "notice",
  code: "500",
  message: "Read failed",
  place: "/assets/index-Ab12.js:42",
  path: "/l/some-ad",
  browser: "Chrome",
  engine: "Blink",
  browserVersion: "131.0",
  device: "phone",
  language: "am",
  appVersion: null,
};

describe("the error report's shape (DEC-474 Part F)", () => {
  it("ERSH-1 a browser's report in shape passes, every optional value absent too", () => {
    expect(ErrorReportBody.parse(REPORT)).toEqual(REPORT);
    const bare = {
      ...REPORT,
      code: null,
      place: null,
      browser: null,
      engine: null,
      browserVersion: null,
      device: null,
      language: null,
    };
    expect(ErrorReportBody.safeParse(bare).success).toBe(true);
  });

  it("ERSH-2 the server's own kinds, an unknown key and a missing key are refused", () => {
    for (const kind of ["route", "upstream", "render", "bogus"])
      expect(ErrorReportBody.safeParse({ ...REPORT, kind }).success).toBe(false);
    expect(ErrorReportBody.safeParse({ ...REPORT, signedIn: true }).success).toBe(false);
    expect(ErrorReportBody.safeParse({ ...REPORT, userId: "x" }).success).toBe(false);
    const { appVersion: _dropped, ...missing } = REPORT;
    expect(ErrorReportBody.safeParse(missing).success).toBe(false);
  });

  it("ERSH-3 each value out of its column's form is refused", () => {
    const bad: Array<Partial<Record<keyof ErrorReport, unknown>>> = [
      { code: "a b" },
      { message: "" },
      { message: "x".repeat(501) },
      { place: "" },
      { path: "l/no-slash" },
      { path: `/${"a".repeat(300)}` },
      { browser: "x".repeat(41) },
      { browserVersion: "1 2" },
      { device: "watch" },
      { language: "AM" },
      { appVersion: "a/b" },
    ];
    for (const change of bad)
      expect(
        ErrorReportBody.safeParse({ ...REPORT, ...change }).success,
        JSON.stringify(change),
      ).toBe(false);
  });

  it("ERSH-4 a length is counted in characters, as the table counts it", () => {
    expect(ErrorReportBody.safeParse({ ...REPORT, message: "😀".repeat(500) }).success).toBe(true);
    expect(ErrorReportBody.safeParse({ ...REPORT, message: "😀".repeat(501) }).success).toBe(false);
  });
});
