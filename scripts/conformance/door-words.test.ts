import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";

import { doorTypesDrift } from "../doors/door-types";
import {
  familyFaults,
  owedWords,
  readDoorWords,
  uncoveredDoors,
  type DoorWordsFinding,
} from "./door-words";
import { readAllowlist, report, TREE_SCAN_MS, typedProgram } from "./kit";

/**
 * INC-1280 (cursor bundle 7c, ruling 1) — EVERY DOOR'S CODES HAVE WORDS, OR A STATED REASON.
 * The family type (src/lib/door-family.ts) makes a missing word a type error; this census reads
 * the program with the type checker (door-words.ts) and judges what the type cannot:
 *   DW-1 the generated door codes and permissions match the manifest (scripts/doors/door-types.ts);
 *   DW-2 every door named under src/ is listed by a typed family, answers only gate codes, or
 *        carries an allowlist line saying why no refusal of its own reaches a person;
 *   DW-3 every word a typed family holds, a spread's included, is a code its doors answer, a gate
 *        code or a declared `also`; no `also` code is one a door answers; no excused code is one
 *        no door answers;
 *   DW-4 every owed code has its line `owed <code> <door> | words owed | INC-1307`;
 *   DW-5 every family no DoorFamily types has its line; the provider families say so, permanent;
 *   DW-6 a planted file's bypasses are each found;
 *   DW-7 a planted family missing a word, or naming a code wrongly, does not compile.
 * Exceptions: scripts/conformance/door-words-allowlist.txt (`key | reason | until`; `permanent`
 * allowed; a stale line fails).
 */

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const ALLOWLIST = join(ROOT, "scripts", "conformance", "door-words-allowlist.txt");
const PROVIDER_FAMILIES = [
  "family src/features/auth/auth-error-key.ts#AUTH_REFUSALS",
  "family src/features/auth/mfa/mfa-refusals.ts#MFA_REFUSALS",
  "family src/features/auth/mfa/mfa-service.ts#MFA_ENROLL_REFUSALS",
];
/** The census's floors at birth (47 families, 223 named doors): a reading that finds less is broken. */
const FAMILY_FLOOR = 40;
const NAMED_FLOOR = 200;

const PLANTED_PATH = "src/features/planted-door-words.ts";
const PLANTED = [
  'import type { DoorFamily } from "@/lib/door-family";',
  "",
  'const EXTRA = { madeUp: "common.error" } as const;',
  "",
  "export const MISSING_WORD = {",
  '  words: { catchallParent: "common.error" },',
  '} as const satisfies DoorFamily<{ doors: "admin_create_category" }>;',
  "",
  "export const ALSO_ANSWERED = {",
  '  words: { catchallParent: "common.error", slugTaken: "common.error" },',
  "} as const satisfies DoorFamily<{",
  '  doors: "admin_create_category";',
  '  also: { slugTaken: "route" };',
  "}>;",
  "",
  "export const EXCUSED_UNANSWERED = {",
  '  words: { catchallParent: "common.error", slugTaken: "common.error" },',
  "} as const satisfies DoorFamily<{",
  '  doors: "admin_create_category";',
  '  generic: { madeUp: "no door answers it" };',
  "}>;",
  "",
  "export const LITERAL_EXTRA = {",
  '  words: { catchallParent: "common.error", slugTaken: "common.error", madeUp: "common.error" },',
  '} as const satisfies DoorFamily<{ doors: "admin_create_category" }>;',
  "",
  "export const SPREAD_EXTRA = {",
  '  words: { ...EXTRA, catchallParent: "common.error", slugTaken: "common.error" },',
  '} as const satisfies DoorFamily<{ doors: "admin_create_category" }>;',
  "",
  'export const UNTYPED = { words: { slugTaken: "common.error" } };',
  "",
  'export const DOOR = "copy_my_listing";',
  "",
].join("\n");

const keysOf = (findings: DoorWordsFinding[]) => findings.map((finding) => finding.key);

describe("every door's codes have words, or a stated reason (INC-1280)", () => {
  const tree = readDoorWords(typedProgram(ROOT), ROOT);
  const uncovered = uncoveredDoors(tree);
  const owed = owedWords(tree);
  const findings = [...uncovered, ...owed, ...tree.untyped];
  const allowed = readAllowlist(
    ALLOWLIST,
    findings.map((finding) => finding.key),
    { permanent: true },
  );
  const unlisted = (findings: DoorWordsFinding[]) =>
    report(findings.filter((finding) => !allowed.has(finding.key)));

  it("DW-1 the generated door codes and permissions match the manifest", async () => {
    expect(await doorTypesDrift(ROOT)).toEqual([]);
  });

  it(
    "DW-2 every door named under src/ is listed by a typed family, answers only gate codes, or has its line",
    () => {
      expect(tree.families.length).toBeGreaterThanOrEqual(FAMILY_FLOOR);
      expect(tree.named.size).toBeGreaterThanOrEqual(NAMED_FLOOR);
      expect(unlisted(uncovered)).toBe("");
    },
    TREE_SCAN_MS,
  );

  it("DW-3 a family's words are its doors' codes, the gate codes and its also; its excuses are its doors' codes", () => {
    expect(report(familyFaults(tree))).toBe("");
  });

  it("DW-4 every owed code has its line: words owed, until INC-1307", () => {
    expect(unlisted(owed)).toBe("");
    for (const finding of owed) {
      const line = allowed.get(finding.key);
      expect([finding.key, line?.reason, line?.until]).toEqual([
        finding.key,
        "words owed",
        "INC-1307",
      ]);
    }
  });

  it("DW-5 every family no DoorFamily types has its line; the provider families' lines are permanent", () => {
    expect(unlisted(tree.untyped)).toBe("");
    for (const key of PROVIDER_FAMILIES) {
      const line = allowed.get(key);
      expect([key, line?.reason, line?.until]).toEqual([
        key,
        "provider family, no door",
        "permanent",
      ]);
    }
  });

  const plantedProgram = () => typedProgram(ROOT, { path: PLANTED_PATH, text: PLANTED });

  it(
    "DW-6 a planted file's spread word, also code, excused code, untyped family and uncovered door are each found",
    () => {
      const planted = readDoorWords(plantedProgram(), ROOT);
      const mine = (findings: DoorWordsFinding[]) =>
        keysOf(findings.filter((finding) => finding.file === PLANTED_PATH)).sort();
      expect(mine(familyFaults(planted))).toEqual([
        "also ALSO_ANSWERED slugTaken",
        "excused EXCUSED_UNANSWERED madeUp",
        "word LITERAL_EXTRA madeUp",
        "word SPREAD_EXTRA madeUp",
      ]);
      expect(mine(planted.untyped)).toEqual([`family ${PLANTED_PATH}#UNTYPED`]);
      expect(mine(uncoveredDoors(planted))).toEqual(["door copy_my_listing"]);
    },
    TREE_SCAN_MS,
  );

  it(
    "DW-7 a planted family missing a word, naming an answered also, excusing an unanswered code or holding a literal extra does not compile",
    () => {
      const program = plantedProgram();
      const source = program.getSourceFile(join(ROOT, PLANTED_PATH));
      expect(source).toBeDefined();
      const failing = new Set<string>();
      for (const diagnostic of ts.getPreEmitDiagnostics(program, source)) {
        if (diagnostic.file !== source || diagnostic.start === undefined) continue;
        const before = PLANTED.slice(0, diagnostic.start);
        const name = [...before.matchAll(/export const (\w+)/g)].at(-1)?.[1];
        if (name !== undefined) failing.add(name);
      }
      expect([...failing].sort()).toEqual([
        "ALSO_ANSWERED",
        "EXCUSED_UNANSWERED",
        "LITERAL_EXTRA",
        "MISSING_WORD",
      ]);
    },
    TREE_SCAN_MS,
  );
});
