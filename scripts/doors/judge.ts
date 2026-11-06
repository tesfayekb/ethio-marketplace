import { splitTopLevel, type UnseenGrant } from "./catalogue";
import { CONTEXT_CLASS, scopeModeOf, type Manifest, type ManifestLine } from "./manifest";
import { browserCallable, type DoorRow } from "./rows";

/**
 * Foundations 1 (DEC-333) — THE JUDGEMENT of the manifest against the rows.
 * Seven finding kinds, each planted in check-doors' self-test (DEC-334):
 *
 * - missing-line           a browser-callable function with no manifest line;
 * - line-without-door      a line whose function is absent or closed to the browser;
 * - gate-missing-for-class a door body without its class's gate: a legacy
 *                          VOLATILE door with none of the four old gates (the
 *                          caller-gates rule, DEC-241), or a door on
 *                          door_context without the shell (no P0D01 handler);
 * - class-mismatch         a body whose shape or door_context literals (class,
 *                          permission, dial, codes, audit, roles, volatility)
 *                          disagree with its line;
 * - grant-unseen           a dynamic GRANT the static reader could not resolve;
 * - grant-without-caller   a browser grant nothing in the tree calls by name;
 * - scope-mode-missing     a staff body whose p_scope_mode (or country
 *                          argument) does not carry the line's country scope.
 *
 * A legacy body (no door_context yet) is judged by the old rule only; its line
 * is the promise its family's turn keeps (plan §5).
 */

export const FINDING_KINDS = [
  "missing-line",
  "line-without-door",
  "gate-missing-for-class",
  "class-mismatch",
  "grant-unseen",
  "grant-without-caller",
  "scope-mode-missing",
] as const;
export type FindingKind = (typeof FINDING_KINDS)[number];

export type Finding = { kind: FindingKind; key: string; what: string; where: string };

/** The old caller-gates rule (DEC-241): a live write door names one of these. */
export const LEGACY_GATE =
  /\b(?:assert_caller_active|rate_gate|has_permission|is_super_admin)\s*\(/;
const SHELL = /EXCEPTION\s+WHEN\s+SQLSTATE\s+'P0D01'/i;

export type ContextArg = { literal: string } | { expression: string } | null;

/** The first `door_context(...)` call of a body: its six arguments, literal, NULL or an expression. */
export function doorContextCall(body: string): ContextArg[] | null {
  const start = body.search(/\bdoor_context\s*\(/);
  if (start < 0) return null;
  const open = body.indexOf("(", start);
  let depth = 0;
  let quote = false;
  let end = -1;
  for (let at = open; at < body.length; at += 1) {
    const ch = body[at];
    if (quote) {
      if (ch === "'") quote = false;
      continue;
    }
    if (ch === "'") quote = true;
    else if (ch === "(") depth += 1;
    else if (ch === ")") {
      depth -= 1;
      if (depth === 0) {
        end = at;
        break;
      }
    }
  }
  if (end < 0) return null;
  const args = splitTopLevel(body.slice(open + 1, end)).map((arg): ContextArg => {
    const text = arg.trim();
    if (/^null$/i.test(text)) return null;
    const literal = /^'([^']*)'(?:::\w+)?$/.exec(text);
    if (literal !== null) return { literal: literal[1] ?? "" };
    return { expression: text };
  });
  while (args.length < 6) args.push(null);
  return args;
}

const literalOf = (arg: ContextArg | undefined): string | null =>
  arg !== null && arg !== undefined && "literal" in arg ? arg.literal : null;

function isDoor(line: ManifestLine): boolean {
  return line.class === "owner" || line.class === "staff" || line.class === "public-door";
}

function isStaff(line: ManifestLine): boolean {
  return line.class === "staff" || line.class === "staff-reader";
}

function pairFindings(row: DoorRow, line: ManifestLine): Finding[] {
  const found: Finding[] = [];
  const add = (kind: FindingKind, what: string) =>
    found.push({ kind, key: row.key, what, where: row.where });
  const wantsAnon = line.roles.includes("anon");
  if (wantsAnon !== row.anon)
    add("class-mismatch", `the line's roles (${line.roles.join(",")}) disagree with the grants`);
  if (isDoor(line) && row.volatility !== "v") add("class-mismatch", "a door is VOLATILE");
  if (!isDoor(line) && line.class !== "helper" && row.volatility === "v")
    add("class-mismatch", "a reader is not VOLATILE");
  const ctx = doorContextCall(row.body);
  if (line.class === "helper") {
    if (ctx !== null) add("class-mismatch", "a helper calls door_context");
    return found;
  }
  if (ctx === null) {
    if (isDoor(line) && row.volatility === "v" && !LEGACY_GATE.test(row.body))
      add(
        "gate-missing-for-class",
        `a ${line.class} door names no caller gate (DEC-241) and no door_context`,
      );
    return found;
  }
  const expected = CONTEXT_CLASS[line.class];
  const cls = literalOf(ctx[0]);
  if (cls !== expected)
    add("class-mismatch", `door_context class ${cls ?? "?"} for a ${line.class} line`);
  if (isStaff(line)) {
    const resource = literalOf(ctx[1]);
    const action = literalOf(ctx[2]);
    if (resource !== line.permission?.resource || action !== line.permission?.action)
      add(
        "class-mismatch",
        `door_context permission ${resource ?? "?"}:${action ?? "?"} for ${line.permission?.resource}:${line.permission?.action}`,
      );
  }
  const dial = literalOf(ctx[3]);
  if (isDoor(line)) {
    if (dial !== line.dial)
      add("class-mismatch", `door_context dial ${dial ?? "none"} for ${line.dial ?? "none"}`);
    if (!SHELL.test(row.body))
      add(
        "gate-missing-for-class",
        "a door on door_context takes the shell (P0D01 → door_refused)",
      );
  } else if (ctx[3] !== null) add("class-mismatch", "a reader spends no dial");
  if (isStaff(line)) {
    const mode = scopeModeOf(line);
    const bodyMode = literalOf(ctx[5]) ?? (ctx[5] === null ? "none" : "?");
    if (bodyMode !== mode)
      add("scope-mode-missing", `p_scope_mode ${bodyMode} for the line's ${mode}`);
    if (mode === "match" && ctx[4] === null)
      add("scope-mode-missing", "a match scope passes its country");
  }
  const codes = [...row.body.matchAll(/\bdoor_refuse\s*\(\s*'([A-Za-z]+)'/g)].map(
    (match) => match[1] ?? "",
  );
  const own = [...new Set(codes)].sort().join(",");
  const listed = [...line.codes].sort().join(",");
  if (own !== listed) add("class-mismatch", `codes ${own || "-"} for the line's ${listed || "-"}`);
  const audit = /\bdoor_audit\s*\(\s*\w+\s*,\s*'([A-Za-z0-9_.-]+)'/.exec(row.body);
  if (audit !== null && audit[1] !== line.audit)
    add("class-mismatch", `door_audit ${audit[1]} for the line's ${line.audit ?? "-"}`);
  return found;
}

export type Evidence = {
  /** The static reader's unresolved dynamic grants (static only). */
  unseen?: UnseenGrant[];
  /** Whether the tree names a function (static only). */
  callers?: (name: string) => boolean;
};

/** Every finding of the rows against the manifest. */
export function judge(rows: DoorRow[], manifest: Manifest, evidence: Evidence = {}): Finding[] {
  const found: Finding[] = [];
  const byKey = new Map(rows.map((row) => [row.key, row]));
  for (const error of manifest.errors)
    found.push({
      kind: "line-without-door",
      key: `manifest:${error.line}`,
      what: error.what,
      where: `manifest.txt:${error.line}`,
    });
  for (const row of rows) {
    if (row.trigger || !browserCallable(row)) continue;
    const line = manifest.lines.get(row.key);
    if (line === undefined) {
      found.push({
        kind: "missing-line",
        key: row.key,
        what: "browser-callable, no manifest line",
        where: row.where,
      });
      continue;
    }
    found.push(...pairFindings(row, line));
  }
  for (const line of manifest.lines.values()) {
    const row = byKey.get(line.key);
    if (row === undefined || row.trigger || !browserCallable(row))
      found.push({
        kind: "line-without-door",
        key: line.key,
        what: row === undefined ? "no such function" : "closed to the browser roles",
        where: `manifest.txt:${line.line}`,
      });
  }
  for (const grant of evidence.unseen ?? [])
    found.push({
      kind: "grant-unseen",
      key: grant.text,
      what: "a dynamic grant the reader cannot resolve",
      where: `${grant.file}:${grant.line}`,
    });
  if (evidence.callers !== undefined)
    for (const row of rows) {
      if (row.trigger || !browserCallable(row)) continue;
      if (!evidence.callers(row.name))
        found.push({
          kind: "grant-without-caller",
          key: row.key,
          what: "a browser grant nothing in the tree calls by name",
          where: row.where,
        });
    }
  return found.sort((a, b) => a.kind.localeCompare(b.kind) || a.key.localeCompare(b.key));
}
