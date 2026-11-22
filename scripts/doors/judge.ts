import { splitTopLevel, type DroppedGrant, type UnseenGrant } from "./catalogue";
import { pattern } from "../lib/pattern";
import { CONTEXT_CLASS, scopeModeOf, type Manifest, type ManifestLine } from "./manifest";
import { OPEN_RULE_KINDS, openRuleFindings, type OpenRuleEvidence } from "./open-rules";
import { browserCallable, type DoorRow } from "./rows";

/**
 * Foundations 1 (DEC-333) — THE JUDGEMENT of the manifest against the rows.
 * Eighteen finding kinds, each planted in check-doors' self-test (DEC-334):
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
 *                          argument) does not carry the line's country scope;
 * - row-column-unknown     a line's `row:<table.column>` cell names a column no
 *                          migration declares (F1-3, INC-1159's class);
 * - grant-dropped          a DROP + CREATE that does not restate a role the
 *                          function held (static only; catalogue.ts, F1-5a);
 * - opt-out-over-step-up   a staff line whose step-up cell is `none:<DEC>`
 *                          over a permission whose newest declared
 *                          `requires_step_up` is not false (step-ups.ts,
 *                          F1-6a ruling 1 Part A): door_context's staff
 *                          form would ask the second factor anyway;
 * - reader-off-gate        a reader line whose body takes no door_context: a
 *                          signed-in or staff reader (always), a public reader
 *                          without the reason `public-data`, or a `public-data`
 *                          reader whose body — or a function of schema public it
 *                          names, followed through their bodies — reads its
 *                          caller (`auth.uid()`, `auth.role()`, `auth.jwt()`, a
 *                          `request.` setting) (F1-7a ruling 1, decisions 4, 9);
 * - helper-reason-unproven a helper line whose reason is `policy` and names no
 *                          standing policy that calls the function (policies.ts,
 *                          F1-7a ruling 1 decision 7, INC-1212);
 * - dial-shell-mismatch    a body on the gate whose dial and shell disagree: a
 *                          dial (the line's cell or door_context's argument)
 *                          without the P0D01 shell, or neither with it.
 *                          door_context marks a call with a dial a door and one
 *                          without a reader, and door_refuse raises a reader's
 *                          refusal past any shell (F1-7c ruling 1 decision 3).
 *
 * - filter-off-helper      a browser-callable function whose last declaration holds a country, a category or a
 *                          scope argument that its body does not read through the list rule
 *                          (`door_filter_countries` / `door_filter_categories`, cursor-bundle-2, DEC-423):
 *                          a scalar argument, or a local comparison, on a list door; the arguments that are
 *                          no list filter (a value a door writes, a download's scope, the public feed's
 *                          own category) stand on an allowlist line with a reason and an until;
 * - open-rule-undeclared / open-rule-gone / open-rule-computed / open-rule-grants
 *                          the four kinds of scripts/doors/open-rules.txt (open-rules.ts,
 *                          cursor-bundle-1 item 6, INC-1166): a standing `USING (true)` /
 *                          `WITH CHECK (true)` policy with no line (or a line that differs), a
 *                          line whose policy is gone, an open policy built by dynamic SQL no
 *                          `(computed)` line names, and (live) a line whose grants are not the
 *                          catalogue's.
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
  "row-column-unknown",
  "grant-dropped",
  "opt-out-over-step-up",
  "reader-off-gate",
  "helper-reason-unproven",
  "dial-shell-mismatch",
  "filter-off-helper",
  ...OPEN_RULE_KINDS,
] as const;
export type FindingKind = (typeof FINDING_KINDS)[number];

export type Finding = { kind: FindingKind; key: string; what: string; where: string };

/** The old caller-gates rule (DEC-241): a live write door names one of these. */
export const LEGACY_GATE =
  /\b(?:assert_caller_active|rate_gate|has_permission|is_super_admin)\s*\(/;
const SHELL = /EXCEPTION\s+WHEN\s+SQLSTATE\s+'P0D01'/i;
/** A call of either list rule (cursor-bundle-2, DEC-423): its one refusal is `badValue`. */
const LIST_RULE = /\bdoor_filter_(?:countries|categories)\s*\(/;

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
  const spends = line.dial !== null || ctx[3] !== null;
  if (spends && !SHELL.test(row.body))
    add("dial-shell-mismatch", "a dial without the shell: door_context marks the call a door");
  if (!spends && SHELL.test(row.body))
    add("dial-shell-mismatch", "a shell without a dial: door_context marks the call a reader");
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
  // A list rule (door_filter_countries / door_filter_categories) refuses with badValue and nothing else.
  if (LIST_RULE.test(row.body)) codes.push("badValue");
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
  /** The static reader's roles a DROP + CREATE did not restate (static only). */
  dropped?: DroppedGrant[];
  /** Whether the tree names a function (static only). */
  callers?: (name: string) => boolean;
  /** Every `table.column` the migrations declare (columns.ts). */
  columns?: ReadonlySet<string>;
  /** A permission's newest declared `requires_step_up` (step-ups.ts): null unreadable, undefined unwritten. */
  stepUps?: (permission: string) => boolean | null | undefined;
  /** Whether a standing policy of that name calls the function (policies.ts). */
  policies?: (policy: string, fn: string) => boolean;
  /** The standing open rules, their dynamic twins and their file (open-rules.ts). */
  openRules?: OpenRuleEvidence;
};

/** A body's read of its caller: an `auth.` identity call or a `request.` setting. */
const CALLER_READ = /\bauth\s*\.\s*(?:uid|role|jwt)\s*\(|'request\./i;
const CALLED_NAME = /\b([a-z_][a-z0-9_]*)\s*\(/gi;

/**
 * The first function, from `row` through every function of schema public its body names (and
 * theirs), whose body reads its caller; null when none does. Each name is followed once.
 */
export function callerReadIn(row: DoorRow, rows: readonly DoorRow[]): string | null {
  const byName = new Map<string, DoorRow[]>();
  for (const other of rows) byName.set(other.name, [...(byName.get(other.name) ?? []), other]);
  const seen = new Set<string>([row.name]);
  const queue: DoorRow[] = [row];
  for (let next = queue.shift(); next !== undefined; next = queue.shift()) {
    if (CALLER_READ.test(next.body)) return next.key;
    for (const match of next.body.matchAll(CALLED_NAME)) {
      const name = (match[1] ?? "").toLowerCase();
      if (seen.has(name)) continue;
      seen.add(name);
      queue.push(...(byName.get(name) ?? []));
    }
  }
  return null;
}

/**
 * The arguments that filter by a country, a category or a scope, by name (cursor-bundle-2, DEC-423),
 * and the list rule each is read through. A scope names a country or a category too (a download's, an
 * import's); it has no helper, so it always stands on an allowlist line.
 */
const FILTER_ARGUMENTS: ReadonlyArray<{ kind: string; name: RegExp; helper: string | null }> = [
  { kind: "country", name: /countr/i, helper: "door_filter_countries" },
  { kind: "category", name: /categor/i, helper: "door_filter_categories" },
  { kind: "scope", name: /^p_scope$/i, helper: null },
];

/** The filter arguments of a row its body does not read through the list rule, as `name (kind)`. */
export function filterArgumentsOff(row: DoorRow): string[] {
  const off: string[] = [];
  for (const name of row.argNames ?? []) {
    const rule = FILTER_ARGUMENTS.find((candidate) => candidate.name.test(name));
    if (rule === undefined) continue;
    const through =
      rule.helper !== null && pattern`\\b${rule.helper}\\s*\\(\\s*${name}\\b`.test(row.body);
    if (!through) off.push(`${name} (${rule.kind})`);
  }
  return off;
}

const PUBLIC_DATA = "public-data";

function isReader(line: ManifestLine): boolean {
  return (
    line.class === "public-reader" ||
    line.class === "signed-in-reader" ||
    line.class === "staff-reader"
  );
}

/** A reader line off the gate (F1-7a ruling 1, decisions 4 and 9). */
function offGateFinding(row: DoorRow, line: ManifestLine, rows: readonly DoorRow[]): string | null {
  if (!isReader(line) || doorContextCall(row.body) !== null) return null;
  if (line.class !== "public-reader") return `a ${line.class} takes door_context`;
  if (line.reason.split(/\s/)[0] !== PUBLIC_DATA)
    return `a public reader off the gate carries the reason ${PUBLIC_DATA}`;
  const reader = callerReadIn(row, rows);
  return reader === null ? null : `${PUBLIC_DATA}, yet ${reader} reads its caller`;
}

/** The policies a helper's `policy <name>, …` reason names (empty for a bare `policy`). */
export function reasonPolicies(reason: string): string[] {
  return reason
    .replace(/^policy\b/, "")
    .split(",")
    .map((name) => name.trim())
    .filter((name) => name !== "");
}

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
    const off = filterArgumentsOff(row);
    if (off.length > 0)
      found.push({
        kind: "filter-off-helper",
        key: row.key,
        what: `${off.join(", ")} not read through the list rule (door_filter_countries / door_filter_categories)`,
        where: row.where,
      });
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
    const offGate = offGateFinding(row, line, rows);
    if (offGate !== null)
      found.push({ kind: "reader-off-gate", key: row.key, what: offGate, where: row.where });
  }
  const policies = evidence.policies;
  if (policies !== undefined)
    for (const line of manifest.lines.values()) {
      if (line.class !== "helper" || line.reason.split(/[\s:]/)[0] !== "policy") continue;
      const named = reasonPolicies(line.reason);
      const unproven = named.filter((policy) => !policies(policy, line.name));
      if (named.length > 0 && unproven.length === 0) continue;
      found.push({
        kind: "helper-reason-unproven",
        key: line.key,
        what:
          named.length === 0
            ? "the reason policy names no policy"
            : `no standing policy ${unproven.join(", ")} calls ${line.name}`,
        where: `manifest.txt:${line.line}`,
      });
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
  const columns = evidence.columns;
  if (columns !== undefined)
    for (const line of manifest.lines.values()) {
      if (line.country?.kind !== "row" || columns.has(line.country.column)) continue;
      found.push({
        kind: "row-column-unknown",
        key: line.key,
        what: `row:${line.country.column} names a column no migration declares`,
        where: `manifest.txt:${line.line}`,
      });
    }
  const stepUps = evidence.stepUps;
  if (stepUps !== undefined)
    for (const line of manifest.lines.values()) {
      if (!isStaff(line) || line.stepUp === null || line.stepUp === "row") continue;
      const permission = `${line.permission?.resource}:${line.permission?.action}`;
      const flag = stepUps(permission);
      if (flag === false) continue;
      found.push({
        kind: "opt-out-over-step-up",
        key: line.key,
        what: `none:${line.stepUp.none} over ${permission}, whose declared requires_step_up is ${flag === null ? "unreadable" : String(flag ?? "never written")}`,
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
  for (const loss of evidence.dropped ?? [])
    found.push({
      kind: "grant-dropped",
      key: `${loss.key} ${loss.role}`,
      what:
        loss.judge === "file"
          ? `dropped and re-created without restating ${loss.role} in the same file`
          : `dropped and re-created without restating ${loss.role}, and no later file gives it back`,
      where: `${loss.file}:${loss.line}`,
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
  if (evidence.openRules !== undefined) found.push(...openRuleFindings(evidence.openRules));
  return found.sort((a, b) => a.kind.localeCompare(b.kind) || a.key.localeCompare(b.key));
}
