import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

import { format, resolveConfig } from "prettier";
import ts from "typescript";

import { walkFiles } from "../conformance/kit";
import { parseManifest, type ManifestLine } from "./manifest";

/**
 * cursor-bundle-7c (INC-1280, INC-1281) — THE DOOR TYPES' GENERATOR. The door manifest
 * (`scripts/doors/manifest.txt`) is the one source; this emits from it, formatted as the tree's
 * Prettier writes it:
 * - `src/lib/door-codes.generated.ts` — TYPES ONLY: each door's refusal codes (the manifest's
 *   codes cell, the shared gate codes aside), by name, overloads joined. A refusal family is typed
 *   over it (`DoorFamily`, src/lib/door-family.ts), so a code with no words does not build.
 * - `src/features/permissions/door-permissions.generated.ts` — each staff door's permission and
 *   step-up, and each API route's permission by method (its `auth: { staff }`, or the import
 *   registry's `permission` for a `defineImportRoute` family; `null` is OPEN: the route asks
 *   none), read by `useMayCall` (admin chunks only; MUST_STAY_LAZY_MODULES).
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

const METHODS = new Set(["GET", "POST", "PUT", "PATCH", "DELETE"]);

function stringOf(node: ts.Expression | undefined): string | null {
  return node !== undefined &&
    (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node))
    ? node.text
    : null;
}

function propertyOf(object: ts.ObjectLiteralExpression, name: string): ts.Expression | undefined {
  for (const property of object.properties)
    if (ts.isPropertyAssignment(property) && property.name.getText() === name)
      return property.initializer;
  return undefined;
}

function bareObject(node: ts.Expression | undefined): ts.ObjectLiteralExpression | undefined {
  let current = node;
  while (
    current !== undefined &&
    (ts.isAsExpression(current) || ts.isParenthesizedExpression(current))
  )
    current = current.expression;
  return current !== undefined && ts.isObjectLiteralExpression(current) ? current : undefined;
}

/** The import registry's permission by family (`FAMILIES` in src/server/imports/registry.ts). */
function importPermissions(root: string): Map<string, string> {
  const file = join(root, "src/server/imports/registry.ts");
  const source = ts.createSourceFile(
    file,
    readFileSync(file, "utf8"),
    ts.ScriptTarget.Latest,
    true,
  );
  const out = new Map<string, string>();
  const visit = (node: ts.Node) => {
    if (
      ts.isVariableDeclaration(node) &&
      node.name.getText() === "FAMILIES" &&
      node.initializer !== undefined
    ) {
      const families = bareObject(node.initializer);
      for (const family of families?.properties ?? []) {
        if (!ts.isPropertyAssignment(family)) continue;
        const spec = bareObject(family.initializer);
        const permission = spec === undefined ? null : stringOf(propertyOf(spec, "permission"));
        if (permission !== null) out.set(family.name.getText(), permission);
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return out;
}

/** A handler's `auth`: `{ staff: { resource, action } }` inline or by a const of the same file. */
function staffOf(
  auth: ts.Expression | undefined,
  consts: Map<string, ts.Expression>,
  file: string,
): string | null {
  const object = bareObject(
    auth !== undefined && ts.isIdentifier(auth) ? consts.get(auth.text) : auth,
  );
  const staff = object === undefined ? undefined : propertyOf(object, "staff");
  if (staff === undefined) return null;
  const pair = bareObject(staff);
  const resource = pair === undefined ? null : stringOf(propertyOf(pair, "resource"));
  const action = pair === undefined ? null : stringOf(propertyOf(pair, "action"));
  if (resource === null || action === null)
    throw new Error(`door-types: ${file} names a staff permission this reader cannot read`);
  return `${resource}:${action}`;
}

/** Each API route's permission by method, from the route files under src/routes/api. */
function routePermissions(root: string): Map<string, Map<string, string | null>> {
  const families = importPermissions(root);
  const out = new Map<string, Map<string, string | null>>();
  const files = walkFiles([join(root, "src/routes/api")], { ext: ["ts"], skipTests: true });
  for (const file of files.sort()) {
    const source = ts.createSourceFile(
      file,
      readFileSync(file, "utf8"),
      ts.ScriptTarget.Latest,
      true,
    );
    const rel = relative(root, file);
    const consts = new Map<string, ts.Expression>();
    for (const statement of source.statements)
      if (ts.isVariableStatement(statement))
        for (const declaration of statement.declarationList.declarations)
          if (ts.isIdentifier(declaration.name) && declaration.initializer)
            consts.set(declaration.name.text, declaration.initializer);
    let path: string | null = null;
    const methods = new Map<string, string | null>();
    const handlerOf = (method: string, value: ts.Expression) => {
      const call = ts.isIdentifier(value) ? consts.get(value.text) : value;
      const callee =
        call !== undefined && ts.isCallExpression(call)
          ? call.expression.getText(source).replace(/<.*$/s, "")
          : null;
      if (call === undefined || !ts.isCallExpression(call) || callee === null)
        throw new Error(`door-types: ${rel} ${method} is not a defineRoute or defineImportRoute`);
      if (callee === "defineImportRoute") {
        const family = stringOf(call.arguments[0]);
        const permission = family === null ? undefined : families.get(family);
        if (permission === undefined)
          throw new Error(`door-types: ${rel} names an import family the registry lacks`);
        return permission;
      }
      if (callee !== "defineRoute")
        throw new Error(`door-types: ${rel} ${method} is not a defineRoute or defineImportRoute`);
      const spec = bareObject(call.arguments[0]);
      return staffOf(spec === undefined ? undefined : propertyOf(spec, "auth"), consts, rel);
    };
    const visit = (node: ts.Node) => {
      if (ts.isCallExpression(node) && node.expression.getText(source) === "createFileRoute")
        path = stringOf(node.arguments[0]);
      if (ts.isPropertyAssignment(node) && node.name.getText(source) === "handlers") {
        const handlers = bareObject(node.initializer);
        if (handlers === undefined) throw new Error(`door-types: ${rel} handlers is not an object`);
        for (const handler of handlers.properties) {
          const method = handler.name?.getText(source) ?? "";
          if (!ts.isPropertyAssignment(handler) || !METHODS.has(method))
            throw new Error(`door-types: ${rel} handler ${method} is not a method property`);
          methods.set(method, handlerOf(method, handler.initializer));
        }
      }
      ts.forEachChild(node, visit);
    };
    visit(source);
    if (path === null && methods.size > 0)
      throw new Error(`door-types: ${rel} has handlers but no createFileRoute path`);
    if (path === null || methods.size === 0) continue;
    out.set(path, new Map([...methods].sort(([a], [b]) => a.localeCompare(b))));
  }
  return new Map([...out].sort(([a], [b]) => a.localeCompare(b)));
}

function routesText(routes: Map<string, Map<string, string | null>>): string[] {
  const entries = [...routes].map(([path, methods]) => {
    const cells = [...methods].map(
      ([method, permission]) => `${method}: ${permission === null ? "null" : `"${permission}"`}`,
    );
    return `  "${path}": { ${cells.join(", ")} },`;
  });
  return [
    "/**",
    " * Each API route's permission by method: its `auth: { staff }`, or the import registry's",
    " * `permission` for its family. `null` is OPEN: the route asks no staff permission.",
    " */",
    "export const ROUTE_PERMISSIONS = {",
    ...entries,
    "} as const;",
    "",
    "export type PermissionedRoute = keyof typeof ROUTE_PERMISSIONS;",
    "",
  ];
}

function permissionsText(
  byName: Map<string, ManifestLine[]>,
  routes: Map<string, Map<string, string | null>>,
): string {
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
    ...routesText(routes),
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
    [DOOR_PERMISSIONS_FILE, permissionsText(byName, routePermissions(root))],
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
