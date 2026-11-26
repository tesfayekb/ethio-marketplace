import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { format, resolveConfig } from "prettier";

import { parseManifest, type ManifestLine } from "./manifest";

/**
 * cursor-bundle-7c (INC-1280, INC-1281) — THE DOOR TYPES' GENERATOR. The door manifest
 * (`scripts/doors/manifest.txt`) is the one source; this emits from it, formatted as the tree's
 * Prettier writes it:
 * - `src/lib/door-codes.generated.ts` — TYPES ONLY: each door's refusal codes (the manifest's
 *   codes cell, the shared gate codes aside), by name, overloads joined. A refusal family is typed
 *   over it (`DoorFamily`, src/lib/door-family.ts), so a code with no words does not build.
 * - `src/features/permissions/door-permissions.generated.ts` — each staff door's permission and
 *   step-up, read by `useMayCallDoor` (admin chunks only; MUST_STAY_LAZY_MODULES).
 *
 *   bun scripts/doors/door-types.ts           writes both files
 *   bun scripts/doors/door-types.ts --check   exits 1 when either differs from the manifest
 *
 * The drift check (`scripts/conformance/door-words.test.ts`, DW-1) regenerates both and fails on
 * any difference, so a manifest line and its types never disagree.
 */

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

export const DOOR_CODES_FILE = "src/lib/door-codes.generated.ts";
export const DOOR_PERMISSIONS_FILE = "src/features/permissions/door-permissions.generated.ts";

const HEADER = [
  "// GENERATED from scripts/doors/manifest.txt by `bun scripts/doors/door-types.ts`; never edited",
  "// by hand: scripts/conformance/door-words.test.ts (DW-1) fails on any drift.",
].join("\n");

function linesByName(root: string): Map<string, ManifestLine[]> {
  const manifest = parseManifest(readFileSync(join(root, "scripts/doors/manifest.txt"), "utf8"));
  if (manifest.errors.length > 0)
    throw new Error(`door-types: the manifest does not parse (line ${manifest.errors[0]?.line})`);
  const byName = new Map<string, ManifestLine[]>();
  for (const line of manifest.lines.values())
    byName.set(line.name, [...(byName.get(line.name) ?? []), line]);
  return new Map([...byName].sort(([a], [b]) => a.localeCompare(b)));
}

function codesText(byName: Map<string, ManifestLine[]>): string {
  const entries = [...byName].map(([name, lines]) => {
    const codes = [...new Set(lines.flatMap((line) => line.codes))].sort();
    const union = codes.length === 0 ? "never" : codes.map((code) => `"${code}"`).join(" | ");
    return `  readonly ${name}: ${union};`;
  });
  return [
    HEADER,
    "",
    "/**",
    " * Each browser-callable function's refusal codes besides the shared gate codes",
    " * (door_context's), by name, its overloads joined: its own `door_refuse` codes and those of",
    " * every function and trigger it reaches (the manifest's codes cell). Types only.",
    " */",
    "export type DoorCodeMap = {",
    ...entries,
    "};",
    "",
  ].join("\n");
}

function stepUpOf(line: ManifestLine): "row" | "none" | null {
  if (line.stepUp === null) return null;
  return line.stepUp === "row" ? "row" : "none";
}

function permissionsText(byName: Map<string, ManifestLine[]>): string {
  const entries: string[] = [];
  for (const [name, lines] of byName) {
    const first = lines[0];
    if (first?.permission === undefined || first.permission === null) continue;
    const permission = `${first.permission.resource}:${first.permission.action}`;
    const stepUp = stepUpOf(first);
    for (const other of lines)
      if (
        `${other.permission?.resource}:${other.permission?.action}` !== permission ||
        stepUpOf(other) !== stepUp
      )
        throw new Error(`door-types: the overloads of ${name} ask different permissions`);
    entries.push(
      `  ${name}: { permission: "${permission}", stepUp: ${stepUp === null ? "null" : `"${stepUp}"`} },`,
    );
  }
  return [
    HEADER,
    "",
    "/**",
    " * Each door that asks a permission (the manifest's permission and step-up cells), by name:",
    " * `stepUp` is `row` when the permission's row decides, `none` for a recorded opt-out.",
    " */",
    "export const DOOR_PERMISSIONS = {",
    ...entries,
    "} as const;",
    "",
    "export type PermissionedDoor = keyof typeof DOOR_PERMISSIONS;",
    "",
  ].join("\n");
}

/** Both generated files, as Prettier writes them. */
export async function generatedDoorTypes(
  root: string = ROOT,
): Promise<Array<{ path: string; text: string }>> {
  const byName = linesByName(root);
  const out: Array<{ path: string; text: string }> = [];
  for (const [path, text] of [
    [DOOR_CODES_FILE, codesText(byName)],
    [DOOR_PERMISSIONS_FILE, permissionsText(byName)],
  ] as const) {
    const options = (await resolveConfig(join(root, path))) ?? {};
    out.push({ path, text: await format(text, { ...options, filepath: join(root, path) }) });
  }
  return out;
}

/** The generated files that differ from the tree's copy. */
export async function doorTypesDrift(root: string = ROOT): Promise<string[]> {
  const drifted: string[] = [];
  for (const { path, text } of await generatedDoorTypes(root)) {
    const file = join(root, path);
    if (!existsSync(file) || readFileSync(file, "utf8") !== text) drifted.push(path);
  }
  return drifted;
}

if (import.meta.main) {
  if (process.argv.includes("--check")) {
    const drifted = await doorTypesDrift();
    if (drifted.length > 0) {
      process.stderr.write(
        `door-types: ${drifted.join(", ")} differ from the manifest; run bun scripts/doors/door-types.ts\n`,
      );
      process.exit(1);
    }
    process.stdout.write("door-types: the generated files match the manifest\n");
  } else {
    for (const { path, text } of await generatedDoorTypes()) writeFileSync(join(ROOT, path), text);
    process.stdout.write(`door-types: wrote ${DOOR_CODES_FILE} and ${DOOR_PERMISSIONS_FILE}\n`);
  }
}
