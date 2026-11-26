import { readFileSync } from "node:fs";
import { join, relative } from "node:path";
import ts from "typescript";

import { parseManifest } from "../doors/manifest";
import { visitTs, walkFiles } from "./kit";

/**
 * INC-1281 (cursor bundle 7c, Part 3) — THE PERMISSION COMPARISONS OF BROWSER CODE. A control
 * shows what its door allows through `useMayCall` (src/features/permissions/use-may-call.ts),
 * which reads the manifest's permission; a copy of a permission's slug in a screen is a second
 * version of it. This reads every comparison of a permission written in browser code:
 *   - a permission-shaped literal (`resource:action`) or a `*_PERMISSION` constant handed to
 *     `.includes(…)`, `.has(…)` or `has(…)`;
 *   - a permission the manifest names, as a literal on either side of `===` / `!==` (by name:
 *     `"og:title"` has a permission's shape);
 *   - a permission-shaped literal as a `permission:` property (a page or section gate).
 * Server code (src/server, src/routes/api) holds the authority and is not read; nor are the
 * generated files, the hook, tests or the platform's client.
 *
 * A finding's key is `<file> <slug>`, with `#2`, `#3` … for the second and later comparisons of
 * one slug in one file, so a new comparison is a new key whichever line it lands on.
 */

export const PERMISSION_SHAPE = /^[a-z][a-z0-9_]*:[a-z][a-z0-9_]*$/;
const PERMISSION_CONSTANT = /^[A-Z][A-Z0-9_]*PERMISSION[A-Z0-9_]*$/;
const HOOK = "src/features/permissions/use-may-call.ts";
const SKIP =
  /\/src\/(?:server|routes\/api|integrations|i18n)\/|\.gen(?:erated)?\.ts$|\/src\/features\/permissions\/use-may-call\.ts$/;

export type PermissionComparison = {
  file: string;
  line: number;
  slug: string;
  form: "call" | "equality" | "gate";
  key: string;
};

function slugOf(node: ts.Expression): string | null {
  if (
    (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) &&
    PERMISSION_SHAPE.test(node.text)
  )
    return node.text;
  return null;
}

/** Every permission a manifest line asks. */
export function manifestPermissions(root: string): Set<string> {
  const manifest = parseManifest(readFileSync(join(root, "scripts/doors/manifest.txt"), "utf8"));
  const out = new Set<string>();
  for (const line of manifest.lines.values())
    if (line.permission !== null) out.add(`${line.permission.resource}:${line.permission.action}`);
  return out;
}

function comparedOf(
  node: ts.Node,
  known: Set<string>,
): { slug: string; form: PermissionComparison["form"] } | null {
  if (ts.isCallExpression(node)) {
    const callee = node.expression;
    const name = ts.isPropertyAccessExpression(callee)
      ? callee.name.text
      : ts.isIdentifier(callee)
        ? callee.text
        : null;
    if (name !== "includes" && name !== "has") return null;
    const argument = node.arguments[0];
    if (argument === undefined) return null;
    const slug = slugOf(argument);
    if (slug !== null) return { slug, form: "call" };
    if (ts.isIdentifier(argument) && PERMISSION_CONSTANT.test(argument.text))
      return { slug: argument.text, form: "call" };
    return null;
  }
  if (
    ts.isBinaryExpression(node) &&
    (node.operatorToken.kind === ts.SyntaxKind.EqualsEqualsEqualsToken ||
      node.operatorToken.kind === ts.SyntaxKind.ExclamationEqualsEqualsToken)
  ) {
    const slug = slugOf(node.left) ?? slugOf(node.right);
    return slug === null || !known.has(slug) ? null : { slug, form: "equality" };
  }
  if (ts.isPropertyAssignment(node) && node.name.getText() === "permission") {
    const slug = slugOf(node.initializer);
    return slug === null ? null : { slug, form: "gate" };
  }
  return null;
}

export type NamedRoute = { file: string; line: number; text: string; route: string | null };

const HOLE = "\u0000";

/** A path's text with each `${…}` as a hole, its query cut; null when it is no API path. */
function pathText(node: ts.Node): string | null {
  let text: string;
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) text = node.text;
  else if (ts.isTemplateExpression(node))
    text = node.head.text + node.templateSpans.map((span) => HOLE + span.literal.text).join("");
  else return null;
  if (!text.startsWith("/api/")) return null;
  const path = text.split("?")[0] ?? "";
  return path.endsWith(HOLE) && !path.endsWith(`/${HOLE}`) ? path.slice(0, -1) : path;
}

/** The route key a path names: a hole matches one `$param` segment, nothing else does. */
export function routeOf(path: string, routes: readonly string[]): string | null {
  const segments = path.split("/");
  for (const route of routes) {
    const parts = route.split("/");
    if (
      parts.length === segments.length &&
      parts.every((part, index) =>
        part.startsWith("$") ? segments[index] !== "" : part === segments[index],
      )
    )
      return route;
  }
  return null;
}

/** Every API path browser code writes under `root`, with the route key it names. */
export function namedRoutes(root: string, routes: readonly string[]): NamedRoute[] {
  const files = walkFiles([join(root, "src")], { ext: ["ts", "tsx"], skipTests: true, skip: SKIP });
  const out: NamedRoute[] = [];
  for (const file of files) {
    const rel = relative(root, file);
    visitTs(file, (node, source) => {
      const path = pathText(node);
      if (path === null) return;
      out.push({
        file: rel,
        line: source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1,
        text: path.replaceAll(HOLE, "${…}"),
        route: routeOf(path, routes),
      });
    });
  }
  return out;
}

type Planted = { path: string; text: string };

/** Browser code's files under `root` (never the hook's own), and a planted file besides. */
function browserSources(root: string, planted?: Planted): Array<{ file: string; text?: string }> {
  const files = walkFiles([join(root, "src")], { ext: ["ts", "tsx"], skipTests: true, skip: SKIP });
  const sources: Array<{ file: string; text?: string }> = files.map((file) => ({ file }));
  if (planted !== undefined) sources.push({ file: join(root, planted.path), text: planted.text });
  return sources;
}

export type HookCall = { file: string; line: number };

/** Every call of the hook's `mayCall` in browser code under `root`, or of a planted file besides. */
export function hookCalls(root: string, planted?: Planted): HookCall[] {
  const out: HookCall[] = [];
  for (const { file, text } of browserSources(root, planted)) {
    const rel = relative(root, file);
    visitTs(
      file,
      (node, source) => {
        if (!ts.isCallExpression(node)) return;
        const callee = node.expression;
        const name = ts.isPropertyAccessExpression(callee)
          ? callee.name.text
          : ts.isIdentifier(callee)
            ? callee.text
            : null;
        if (name !== "mayCall") return;
        out.push({
          file: rel,
          line: source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1,
        });
      },
      text,
    );
  }
  return out;
}

/**
 * INC-1308 — the census's floor reads the copies AND the hook's calls: a copy moved onto the hook
 * (the work the `until INC-1281` lines plan) leaves the one and joins the other, so the sum holds,
 * while a reader that finds nothing still falls under it. Answers the problem, or null.
 */
export function floorProblem(
  comparisons: readonly PermissionComparison[],
  calls: readonly HookCall[],
  floor: number,
): string | null {
  const read = comparisons.length + calls.length;
  return read >= floor
    ? null
    : `the census read ${comparisons.length} comparisons and ${calls.length} hook calls ` +
        `(${read}), under its floor of ${floor}: its reader is broken`;
}

/** Every permission comparison of browser code under `root`, or of a planted file besides. */
export function permissionComparisons(root: string, planted?: Planted): PermissionComparison[] {
  const sources = browserSources(root, planted);
  const known = manifestPermissions(root);
  const out: PermissionComparison[] = [];
  for (const { file, text } of sources) {
    const rel = relative(root, file);
    if (rel === HOOK) continue;
    const seen = new Map<string, number>();
    visitTs(
      file,
      (node, source) => {
        const compared = comparedOf(node, known);
        if (compared === null) return;
        const count = (seen.get(compared.slug) ?? 0) + 1;
        seen.set(compared.slug, count);
        out.push({
          file: rel,
          line: source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1,
          slug: compared.slug,
          form: compared.form,
          key: `${rel} ${compared.slug}${count === 1 ? "" : `#${count}`}`,
        });
      },
      text,
    );
  }
  return out;
}
