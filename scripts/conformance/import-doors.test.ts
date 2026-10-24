import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import { codeOf, readAllowlist, report, walkFiles } from "./kit";

/**
 * Foundations turn 11 (DEC-237, INC-860 part 1) — THE STAFF FILE DOORS
 * (IMD-1…4). An import route asks `authorizeImport` before it reads a byte of
 * the body; an export is a `defineRoute` with staff auth; `has_permission` is
 * asked through `callerHasPermission` alone (allowlisted callers, reasoned).
 */

const HOME = "src/server/supabase/user-client.ts";
const ALLOWLIST = "scripts/conformance/has-permission-allowlist.txt";
type Finding = { file: string; line: number; what: string };

const lineOf = (code: string, index: number) => code.slice(0, index).split("\n").length;

/** IMD-1 — the door must come before the first body read, in source order. */
export function importDoorFindings(file: string, text: string): Finding[] {
  const code = codeOf(text);
  const door = code.search(/\bauthorizeImport\s*\(/);
  const read = code.search(/\brequest\.(?:arrayBuffer|json|text|formData|blob)\s*\(/);
  if (door === -1) return [{ file, line: 1, what: "never calls authorizeImport" }];
  if (read !== -1 && read < door)
    return [{ file, line: lineOf(code, read), what: "reads the body before authorizeImport" }];
  return [];
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

const read = (file: string) => readFileSync(file, "utf8");
const routes = walkFiles(["src/routes/api/admin"], { ext: ["ts"], skipTests: true });

describe("the staff file doors", () => {
  it("IMD-1 every admin import route calls authorizeImport before reading the body", () => {
    const imports = routes.filter((file) => /\/import\.ts$/.test(file));
    expect(imports.length).toBe(4);
    expect(report(imports.flatMap((file) => importDoorFindings(file, read(file))))).toBe("");
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

  it("IMD-4 a planted import route that reads the body first is reported", () => {
    const planted = [
      "POST: async ({ request }) => {",
      "  // authorizeImport( in a comment does not count",
      "  const raw = await request.arrayBuffer();",
      '  const door = await authorizeImport(request, PATH, "categories");',
      "}",
    ].join("\n");
    expect(importDoorFindings("planted/import.ts", planted)).toEqual([
      { file: "planted/import.ts", line: 3, what: "reads the body before authorizeImport" },
    ]);
    expect(importDoorFindings("planted/import.ts", "await request.json();")).toEqual([
      { file: "planted/import.ts", line: 1, what: "never calls authorizeImport" },
    ]);
    expect(permissionFindings("planted.ts", 'await supabase.rpc(\n  "has_permission", {});')).toEqual([
      { file: "planted.ts", line: 1, what: "calls has_permission" },
    ]);
    expect(exportFindings("planted/export.ts", "createFileRoute(PATH)")).toHaveLength(1);
  });
});
