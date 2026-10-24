import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import { codeOf, readAllowlist, report, walkFiles } from "./kit";

/**
 * Foundations turn 11/12 (DEC-237, INC-860) — THE STAFF FILE DOORS (IMD-1…6).
 * An import route is a `defineImportRoute(` call and nothing else; an export
 * is a `defineRoute` with staff auth; `has_permission` is asked through
 * `callerHasPermission` alone (allowlisted callers, reasoned); no process-local
 * meter remains; every word the factory answers is declared in
 * src/server/imports/route.ts, and no database text reaches an answer.
 */

const HOME = "src/server/supabase/user-client.ts";
const ALLOWLIST = "scripts/conformance/has-permission-allowlist.txt";
const FACTORY = "src/server/imports/route.ts";
const GATE = "src/server/imports/gate.ts";
type Finding = { file: string; line: number; what: string };

const lineOf = (code: string, index: number) => code.slice(0, index).split("\n").length;

/** IMD-1 — an import route is the factory call and nothing else. */
export function importRouteFindings(file: string, text: string): Finding[] {
  const code = codeOf(text);
  const findings: Finding[] = [];
  if (!/\bdefineImportRoute\s*\(/.test(code))
    findings.push({ file, line: 1, what: "is not a defineImportRoute call" });
  for (const [re, what] of [
    [/\brequest\./g, "touches the request"],
    [/\bnew Response\s*\(/g, "builds a Response"],
    [/\.rpc\s*\(/g, "calls an RPC"],
    [/\bdefineRoute\s*\(/g, "hand-writes a defineRoute"],
  ] as const) {
    for (const match of code.matchAll(re))
      findings.push({ file, line: lineOf(code, match.index ?? 0), what });
  }
  return findings;
}

/** IMD-2 — an export is a defineRoute with staff auth. */
export function exportFindings(file: string, text: string): Finding[] {
  const code = codeOf(text);
  if (!/\bdefineRoute\s*\(/.test(code) || !/\bauth:\s*\{\s*staff:/.test(code))
    return [{ file, line: 1, what: "is not a defineRoute with auth: { staff: … }" }];
  return [];
}

/** IMD-3 — has_permission through .rpc( outside the one staff check. */
export function permissionFindings(file: string, text: string): Finding[] {
  if (file === HOME) return [];
  const code = codeOf(text);
  const findings: Finding[] = [];
  for (const match of code.matchAll(/\.rpc\s*\(\s*["'`]has_permission["'`]/g))
    findings.push({ file, line: lineOf(code, match.index ?? 0), what: "calls has_permission" });
  return findings;
}

/** IMD-5 — no process-local meter: its names, or a module-level Map in the import code. */
export function meterFindings(file: string, text: string): Finding[] {
  const code = codeOf(text);
  const findings: Finding[] = [];
  for (const match of code.matchAll(
    /\b(?:takeSlot|releaseSlot|bucketFor|hasBucket|PREVIEW_BUDGET|BUCKET_IDLE_MS)\b/g,
  ))
    findings.push({ file, line: lineOf(code, match.index ?? 0), what: `names ${match[0]}` });
  if (file.startsWith("src/server/imports/"))
    for (const match of code.matchAll(/^(?:export\s+)?const\s+\w+\s*=\s*new Map\b/gm))
      findings.push({ file, line: lineOf(code, match.index ?? 0), what: "keeps a module Map" });
  return findings;
}

const ANSWER_CALL =
  /\b(?:clientError|ok|routeJson|verdict|json|download|plain|stepUpRequired)\s*\(/g;

/** IMD-6 (b) — no `.message` / `.details` / `.hint` / errorText( inside an answer's arguments. */
export function leakFindings(file: string, text: string): Finding[] {
  const code = codeOf(text);
  const findings: Finding[] = [];
  for (const match of code.matchAll(ANSWER_CALL)) {
    let depth = 0;
    let end = (match.index ?? 0) + match[0].length - 1;
    for (; end < code.length; end += 1) {
      if (code[end] === "(") depth += 1;
      else if (code[end] === ")" && --depth === 0) break;
    }
    const args = code.slice((match.index ?? 0) + match[0].length, end);
    if (/\.(?:message|details|hint)\b|\berrorText\s*\(/.test(args))
      findings.push({
        file,
        line: lineOf(code, match.index ?? 0),
        what: "passes database text to an answer",
      });
  }
  return findings;
}

/** IMD-6 (a) — the declared vocabulary, read from the factory's own source. */
export function declaredWords(factory: string): Set<string> {
  const code = codeOf(factory);
  const words = new Set<string>();
  const table = code.slice(code.indexOf("export const IMPORT_REFUSALS"));
  const tableEnd = table.indexOf("];");
  for (const entry of table.slice(0, tableEnd).matchAll(/\{[^}]*\}/g)) {
    const match = /match:\s*"([^"]+)"/.exec(entry[0]);
    const error = /error:\s*"([^"]+)"/.exec(entry[0]);
    if (match !== null) words.add(error?.[1] ?? match[1]);
  }
  const list = code.slice(code.indexOf("export const IMPORT_WORDS"));
  for (const word of list.slice(0, list.indexOf("] as const")).matchAll(/"([^"]+)"/g))
    words.add(word[1]);
  return words;
}

/** Every literal word the factory and the gate answer. */
export function answeredWords(
  factory: string,
  gate: string,
): Array<{ file: string; word: string }> {
  const out: Array<{ file: string; word: string }> = [];
  for (const match of codeOf(factory).matchAll(/\bclientError\s*\(\s*"([^"]+)"/g))
    out.push({ file: FACTORY, word: match[1] });
  const gateCode = codeOf(gate);
  for (const match of gateCode.matchAll(/\brefuse\([^;]*?,\s*(?:400|413),\s*"([^"]+)"/g))
    out.push({ file: GATE, word: match[1] });
  for (const match of gateCode.matchAll(/\berror:\s*"([A-Za-z]+)"/g))
    out.push({ file: GATE, word: match[1] });
  return out;
}

const read = (file: string) => readFileSync(file, "utf8");
const routes = walkFiles(["src/routes/api/admin"], { ext: ["ts"], skipTests: true });

describe("the staff file doors", () => {
  it("IMD-1 every admin import route is a defineImportRoute call and nothing else", () => {
    const imports = routes.filter((file) => /\/import\.ts$/.test(file));
    expect(imports.length).toBe(4);
    expect(report(imports.flatMap((file) => importRouteFindings(file, read(file))))).toBe("");
  });

  it("IMD-2 every admin export route is a defineRoute with staff auth", () => {
    const exports = routes.filter((file) => /\/export\.ts$/.test(file));
    expect(exports.length).toBe(3);
    expect(report(exports.flatMap((file) => exportFindings(file, read(file))))).toBe("");
  });

  it("IMD-3 has_permission is asked through callerHasPermission (or an allowlisted caller)", () => {
    const findings = walkFiles(["src"], { ext: ["ts", "tsx"], skipTests: true }).flatMap((file) =>
      permissionFindings(file, read(file)),
    );
    const allowed = readAllowlist(
      ALLOWLIST,
      findings.map((finding) => finding.file),
    );
    expect(report(findings.filter((finding) => !allowed.has(finding.file)))).toBe("");
    expect(permissionFindings(HOME, read(HOME))).toEqual([]);
    expect(read(HOME)).toMatch(/rpc\("has_permission"/);
  });

  it("IMD-4 a planted hand-written import route is reported", () => {
    const planted = [
      "POST: async ({ request }) => {",
      "  // defineImportRoute( in a comment does not count",
      "  const raw = await request.arrayBuffer();",
      '  const { error } = await supabase.rpc("admin_commit_category_import", {});',
      "  return new Response(raw);",
      "}",
    ].join("\n");
    expect(importRouteFindings("planted/import.ts", planted)).toEqual([
      { file: "planted/import.ts", line: 1, what: "is not a defineImportRoute call" },
      { file: "planted/import.ts", line: 3, what: "touches the request" },
      { file: "planted/import.ts", line: 5, what: "builds a Response" },
      { file: "planted/import.ts", line: 4, what: "calls an RPC" },
    ]);
    expect(
      permissionFindings("planted.ts", 'await supabase.rpc(\n  "has_permission", {});'),
    ).toEqual([{ file: "planted.ts", line: 1, what: "calls has_permission" }]);
    expect(exportFindings("planted/export.ts", "createFileRoute(PATH)")).toHaveLength(1);
  });

  it("IMD-5 no process-local import meter remains in src/**", () => {
    const findings = walkFiles(["src"], { ext: ["ts", "tsx"], skipTests: true }).flatMap((file) =>
      meterFindings(file, read(file)),
    );
    expect(report(findings)).toBe("");
    expect(
      meterFindings(
        "src/server/imports/planted.ts",
        "const buckets = new Map<string, number>();\nreleaseSlot(userId);",
      ).map((finding) => finding.what),
    ).toEqual(["names releaseSlot", "keeps a module Map"]);
  });

  it("IMD-6 every answered word is declared, and no database text reaches an answer", () => {
    const words = declaredWords(read(FACTORY));
    expect(words.has("forbidden")).toBe(true);
    expect(words.has("tooManyRows")).toBe(true);
    const answered = answeredWords(read(FACTORY), read(GATE));
    expect(answered.length).toBeGreaterThan(10);
    expect(
      report(
        answered
          .filter((entry) => !words.has(entry.word))
          .map((entry) => ({ file: entry.file, line: 1, what: `answers "${entry.word}"` })),
      ),
    ).toBe("");
    const files = walkFiles(["src/server/imports", "src/routes/api/admin"], {
      ext: ["ts"],
      skipTests: true,
    });
    expect(report(files.flatMap((file) => leakFindings(file, read(file))))).toBe("");
    expect(
      leakFindings("planted.ts", "return clientError(error.message, 500);\n// ok(error.hint)"),
    ).toEqual([{ file: "planted.ts", line: 1, what: "passes database text to an answer" }]);
  });
});
