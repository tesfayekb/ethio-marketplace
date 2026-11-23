import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { readAllowlist, report, TREE_SCAN_MS, walkFiles } from "./kit";
import { lastDeclarations } from "./migration-reader";
import {
  classDrift,
  clientMarkOf,
  failureThrowFindings,
  markDrift,
  mirrorOf,
  READER_SETS,
  REFUSAL_MECHANISM,
  refusalReadingFindings,
  refusedCodesOf,
  refuseMarksOf,
  setDrift,
  setOf,
  statusDrift,
  tableOf,
} from "./refusal-readers";
import { readerFailure } from "../../src/lib/reader-failure";

/**
 * DEC-429 (CF-REFUSAL-3, CF-REFUSAL-4) — a failed read is thrown as the typed failure through
 * `readFailed`, and the client reads the door mechanism's mark, not a second list of codes.
 *
 * F1-7d (CF-REFUSAL-1, CF-REFUSAL-2) — a refusal is read one way: through
 * `splitRefusal` (src/lib/refusal.ts), at the status `door_refusal_status`
 * gives its code, mirrored by `refusalStatus` (src/lib/reader-failure.ts).
 * Allowances (`<file>:<line> | reason | until`) in
 * refusal-readers-allowlist.txt — one file for CFRR-1 and CFRR-5; a line neither census finds is
 * stale, and a stale or expired line fails.
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

const keyOf = (finding: { file: string; line: number }) => `${finding.file}:${finding.line}`;

describe("a refusal is read one way (CF-REFUSAL-1, CF-REFUSAL-2)", () => {
  it(
    "CFRR-1 no file in src/ reads a refusal's text by hand, or its line holds it",
    () => {
      const files = sources();
      const findings = refusalReadingFindings(files);
      const allowed = readAllowlist(ALLOWLIST, [
        ...findings.map(keyOf),
        ...failureThrowFindings(files).map(keyOf),
      ]);
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

describe("a failed read is one typed failure (CF-REFUSAL-3)", () => {
  it(
    "CFRR-5 no client file throws a bare Error built from a failed call, or builds a typed failure by hand",
    () => {
      const files = sources();
      const findings = failureThrowFindings(files);
      const allowed = readAllowlist(ALLOWLIST, [
        ...refusalReadingFindings(files).map(keyOf),
        ...findings.map(keyOf),
      ]);
      const unexcused = findings.filter((finding) => !allowed.has(keyOf(finding)));
      console.log(
        `[refusal-readers] failure throws: ${findings.length}, held: ${findings.filter((finding) => allowed.has(keyOf(finding))).length}`,
      );
      // The walk is not blind: the one factory's own file is among the files read.
      expect(files.map(({ file }) => file)).toContain("src/lib/reader-failure.ts");
      expect(report(unexcused)).toBe("");
    },
    TREE_SCAN_MS,
  );

  it("CFRR-6 the census names each form of a hand-built failure and passes readFailed(error), a fixed sentence, a comment, a test and the server side", () => {
    const planted = [
      "export function a(error: { message: string }, other: unknown) {",
      "  if (error) throw new Error(error.message);",
      "  if (error) throw new Error(`reading: ${error.message}`);",
      "  if (other) throw new Error(errorText(other));",
      "  if (other) throw new Error(`${errorText(other)} twice`);",
      "  if (error) throw new ReaderError(readerFailure(error));",
      "  if (error)",
      "    throw new Error(",
      "      error.message,",
      "    );",
      "  if (error) throw readFailed(error);",
      '  if (error) throw new Error("a fixed sentence");',
      "  // throw new Error(error.message);",
      "  return reportError(new Error(errorText(other)));",
      "}",
    ].join("\n");
    const planting = (file: string) => failureThrowFindings([{ file, text: planted }]);
    expect(
      planting("src/features/x/planted.ts").map(({ line, what }) => `${line} ${what}`),
    ).toEqual([
      "2 throws a bare Error built from a failed call's message",
      "3 throws a bare Error built from a failed call's message",
      "4 throws a bare Error built from a failed call's message",
      "5 throws a bare Error built from a failed call's message",
      "8 throws a bare Error built from a failed call's message",
      "6 builds a typed failure by hand instead of readFailed(error)",
    ]);
    // The mechanism may build its own failure; a test, the server side, the route handlers and
    // the platform's client are not the client side.
    expect(planting("src/lib/reader-failure.ts").map(({ line }) => line)).toEqual([2, 3, 4, 5, 8]);
    for (const file of [
      "src/features/x/planted.test.ts",
      "src/server/planted.ts",
      "src/routes/api/planted.ts",
      "src/integrations/supabase/planted.ts",
    ])
      expect(planting(file), file).toEqual([]);
  });
});

describe("the database holds the list of refusal codes; the client reads its mark (CF-REFUSAL-4)", () => {
  const declarations = () => lastDeclarations(ROOT);
  const readerSource = () => readFileSync(MIRROR, "utf8");

  it("CFRR-7 (a) the client's mark is the code door_refuse writes, in both of its branches; (b) every literal code the last declarations pass to door_refuse is classed auth or refused when it arrives marked; (c) every name in the three sets and in REFUSAL_STATUS is a literal some last declaration holds, and the fallback is inside the refused set", () => {
    const decls = declarations();
    // (a)
    const refuse = refuseMarksOf(decls.get("door_refuse"));
    expect(markDrift(clientMarkOf(readerSource()), refuse)).toEqual([]);
    // (b)
    const codes = refusedCodesOf(decls);
    const table = tableOf(decls.get("door_refusal_status") ?? { body: "" });
    expect(refuse.reader, "door_refuse writes a code").toBeDefined();
    // The census is not blind: the gates' codes and a family's code are among those read.
    expect([...codes.keys()]).toEqual(
      expect.arrayContaining(["notSignedIn", "accountDeactivated", "permissionDenied", "badValue"]),
    );
    expect(
      classDrift(
        codes.keys(),
        refuse.reader ?? "",
        (code) => table.rows.get(code) ?? table.fallback ?? 0,
        (error) => readerFailure(error).class,
      ),
    ).toEqual([]);
    // (c)
    expect(setDrift(readerSource(), decls)).toEqual([]);
    // The read is not blind: each set holds names.
    for (const set of READER_SETS)
      expect(setOf(readerSource(), set).length, set).toBeGreaterThan(0);
  });

  it("CFRR-8 another mark, a marked code read as malformed and a name the database never raises are each named", () => {
    const refuse = refuseMarksOf({
      body: "RAISE SQLSTATE 'PGRST' USING MESSAGE = jsonb_build_object('code', 'P0D01', 'message', p_code)::text; RAISE EXCEPTION USING ERRCODE = 'P0D01', MESSAGE = p_code;",
    });
    expect(refuse).toEqual({ reader: "P0D01", door: "P0D01" });
    // (a)
    expect(markDrift(clientMarkOf('const DOOR_MARK = "P0D02";'), refuse)).toEqual([
      "reader branch: door_refuse writes P0D01, the client reads P0D02",
      "door branch: door_refuse writes P0D01, the client reads P0D02",
    ]);
    expect(markDrift(clientMarkOf('const DOOR_MARK = "P0D01";'), refuse)).toEqual([]);
    expect(
      markDrift("P0D01", refuseMarksOf({ body: "RAISE EXCEPTION USING ERRCODE = 'P0D09';" })),
    ).toEqual([
      "door_refuse writes no code in its reader branch",
      "door branch: door_refuse writes P0D09, the client reads P0D01",
    ]);
    // (b)
    const asMalformed = (error: unknown) =>
      (error as { message: string }).message === "badValue" ? "malformed" : "refused";
    expect(classDrift(["badValue", "notYours"], "P0D01", () => 400, asMalformed)).toEqual([
      "badValue at its status: read as malformed, not refused",
      "badValue with no status: read as malformed, not refused",
    ]);
    expect(
      classDrift(
        ["badValue"],
        "P0D01",
        () => 400,
        (error) => readerFailure(error).class,
      ),
    ).toEqual([]);
    expect(
      classDrift(
        ["notSignedIn"],
        "P0D01",
        () => 401,
        () => "refused",
      ),
    ).toEqual([
      "notSignedIn at its status: read as refused, not auth",
      "notSignedIn at its status with a detail: read as refused, not auth",
      "notSignedIn with no status: read as refused, not auth",
    ]);
    // (c)
    const held = new Map([
      [
        "a_door",
        {
          body: "PERFORM door_refuse('rateLimited'); 'notYours'; 'permissionDenied'; 'notSignedIn'; 'accountDeactivated'; 'badValue'; 'badSize'; 'notYourListing'; 'stepUpRequired'; 'notInForce'",
        },
      ],
    ]);
    const source = [
      'const GATE_AUTH_CODES = new Set(["notSignedIn", "accountDeactivated"]);',
      'const GATE_REFUSED_CODES = new Set(["notYours", "neverRaised", "rateLimited"]);',
      'const FALLBACK_REFUSED_CODES = new Set(["rateLimited", "notInTheRefusedSet"]);',
      "const REFUSAL_STATUS = { notSignedIn: 401, alsoNeverRaised: 403 };",
    ].join("\n");
    expect(setDrift(source, held)).toEqual([
      "GATE_REFUSED_CODES: neverRaised is no literal in a last declaration",
      "FALLBACK_REFUSED_CODES: notInTheRefusedSet is no literal in a last declaration",
      "REFUSAL_STATUS: alsoNeverRaised is no literal in a last declaration",
      "FALLBACK_REFUSED_CODES: notInTheRefusedSet is not in GATE_REFUSED_CODES",
    ]);
  });
});
