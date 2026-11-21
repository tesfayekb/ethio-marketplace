import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { readAllowlist, report, TREE_SCAN_MS, walkFiles } from "./kit";
import { lastDeclarations } from "./migration-reader";
import {
  mirrorOf,
  REFUSAL_MECHANISM,
  refusalReadingFindings,
  statusDrift,
  tableOf,
} from "./refusal-readers";

/**
 * F1-7d (CF-REFUSAL-1, CF-REFUSAL-2) — a refusal is read one way: through
 * `splitRefusal` (src/lib/refusal.ts), at the status `door_refusal_status`
 * gives its code, mirrored by `refusalStatus` (src/lib/reader-failure.ts).
 * Allowances (`<file>:<line> | reason | until`) in
 * refusal-readers-allowlist.txt; a stale or expired line fails.
 */

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const ALLOWLIST = join(ROOT, "scripts", "conformance", "refusal-readers-allowlist.txt");
const MIRROR = join(ROOT, "src", "lib", "reader-failure.ts");

function sources(): Array<{ file: string; text: string }> {
  return walkFiles([join(ROOT, "src")], { ext: ["ts", "tsx"] })
    .map((path) =>
      path
        .slice(ROOT.length + 1)
        .split("\\")
        .join("/"),
    )
    .filter(
      (file) =>
        !/\.test\.tsx?$/.test(file) &&
        !file.startsWith("src/integrations/") &&
        file !== "src/routeTree.gen.ts",
    )
    .map((file) => ({ file, text: readFileSync(join(ROOT, file), "utf8") }));
}

describe("a refusal is read one way (CF-REFUSAL-1, CF-REFUSAL-2)", () => {
  it(
    "CFRR-1 no file in src/ reads a refusal's text by hand, or its line holds it",
    () => {
      const files = sources();
      const findings = refusalReadingFindings(files);
      const allowed = readAllowlist(
        ALLOWLIST,
        findings.map((finding) => `${finding.file}:${finding.line}`),
      );
      const unexcused = findings.filter(
        (finding) => !allowed.has(`${finding.file}:${finding.line}`),
      );
      console.log(
        `[refusal-readers] files read: ${files.length}; hand readings: ${findings.length}, held: ${allowed.size}`,
      );
      // The walk is not blind: the mechanism is among the files read.
      expect(files.map(({ file }) => file)).toContain(REFUSAL_MECHANISM[0]);
      expect(report(unexcused)).toBe("");
    },
    TREE_SCAN_MS,
  );

  it("CFRR-2 the census names each hand reading and passes the mechanism, splitRefusal, a structured reason, typeof, a non-code literal, a constraint name and a cookie shape", () => {
    const planted = [
      "export function a(error: unknown, message: string, reason: string) {",
      '  if (errorText(error) === "unknownVersion") return 1;',
      '  if (errorText(error).startsWith("notARoot")) return 2;',
      '  if (message.includes("rateLimited")) return 3;',
      '  const word = message.trim().split(":")[0];',
      '  const colon = reason.indexOf(":");',
      "  if (/^noActiveSession(?::|$)/.test(message)) return 4;",
      '  if (message === "notYours") return 5;',
      '  if (splitRefusal(message).key === "notYours") return 6;',
      '  if (answer.reason === "badOption") return 7;',
      '  if (typeof message === "string") return 8;',
      '  if (payload.message === "HTTPError") return 9;',
      '  const [resource, action] = permission.split(":");',
      '  // message.includes("inAComment")',
      '  if (message.includes("listings_price_bp_check")) return 10;',
      "  const AREA = /^(?:[A-Za-z]{2}:[0-9a-f]{8}(?::\\d{1,15})?|everywhere:\\d{1,15})$/;",
      "  const CODE = /^([a-z][A-Za-z]*)(?::(.*))?$/s;",
      '  if (message.includes("session expired")) return 11;',
      "  return [word, colon, resource, action, AREA, CODE];",
      "}",
    ].join("\n");
    expect(
      refusalReadingFindings([{ file: "src/planted.ts", text: planted }]).map(
        ({ line, what }) => `${line} ${what}`,
      ),
    ).toEqual([
      "2 compares a refusal's whole text with a code",
      "3 matches a code or sentence inside a refusal's text",
      "4 matches a code or sentence inside a refusal's text",
      "5 splits a refusal's text at its colon by hand",
      "6 splits a refusal's text at its colon by hand",
      "7 reads a code followed by its colon with a regex literal",
      "8 compares a refusal's whole text with a code",
      "17 reads a code followed by its colon with a regex literal",
      "18 matches a code or sentence inside a refusal's text",
    ]);
    expect(refusalReadingFindings([{ file: REFUSAL_MECHANISM[0] ?? "", text: planted }])).toEqual(
      [],
    );
  });

  it("CFRR-3 the client's status mirror is door_refusal_status's last declaration, in both directions", () => {
    const declaration = lastDeclarations(ROOT).get("door_refusal_status");
    expect(declaration, "a migration declares door_refusal_status").toBeDefined();
    const table = tableOf(declaration ?? { body: "" });
    const mirror = mirrorOf(readFileSync(MIRROR, "utf8"));
    expect(table.rows.size).toBeGreaterThan(0);
    expect(mirror.rows.size).toBeGreaterThan(0);
    expect(statusDrift(mirror, table)).toEqual([]);
  });

  it("CFRR-4 a planted drift in either direction, or in the fallback, is named", () => {
    const table = tableOf({
      body: "SELECT CASE p_code WHEN 'notSignedIn' THEN '401' WHEN 'rateLimited' THEN '429' WHEN 'badValue' THEN '400' ELSE '400' END",
    });
    const mirror = mirrorOf(
      [
        "const REFUSAL_STATUS: Readonly<Record<string, number>> = {",
        "  notSignedIn: 403,",
        "  stepUpRequired: 428,",
        "};",
        "export function refusalStatus(code: string): number {",
        "  return ownValue(REFUSAL_STATUS, code) ?? 500;",
        "}",
      ].join("\n"),
    );
    expect(statusDrift(mirror, table)).toEqual([
      "notSignedIn: the table answers 401, the mirror 403",
      "rateLimited: the table answers 429, the mirror has no row",
      "badValue: the table answers 400, the mirror has no row",
      "stepUpRequired: the mirror answers 428, the table has no row",
      "fallback: the table answers 400, the mirror 500",
    ]);
    const agreeing = mirrorOf(
      "const REFUSAL_STATUS = { notSignedIn: 401, rateLimited: 429 };\nownValue(REFUSAL_STATUS, code) ?? 400;",
    );
    expect(statusDrift(agreeing, table)).toEqual([]);
  });
});
