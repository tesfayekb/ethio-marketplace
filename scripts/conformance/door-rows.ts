import { flaggedPattern, pattern } from "../lib/pattern";
import type { LastDeclaration } from "./migration-reader";

/**
 * CF-DOOR-ROWS-1 (cursor-bundle-7a Part 4, INC-1282's class, DEC-471) — A DOOR THAT IS NOT STAFF
 * NAMES THE RULE THAT LIMITS ITS ROWS. A door a person calls for themselves — an `owner`, a
 * `signed-in-reader` or a `helper` line of the doors manifest — decides whose rows it reads or
 * writes. In its last declaration it either compares a column of a row it selects, updates or
 * deletes with the caller (`auth.uid()`, the gate's `v_ctx.uid`, or a variable assigned from
 * either), or it has a line in `door-rows-allowlist.txt` naming why it limits no row.
 *
 * The matching rule (ruling 1, decision 11): the column compared comes from a table row the body
 * selects, updates or deletes — a qualified column of a table or alias the body names, a bare
 * column beside such a table, or a variable the body loaded from one (`SELECT seller_id INTO
 * v_seller FROM …`, `FOR v_row IN SELECT … FROM …`). A literal, a function argument and a
 * variable the body fills from anywhere else do not count. A body the check cannot read (built at
 * run time, or no declaration) fails: it is never passed.
 *
 * The allowlist's lines are `door | <class>: <reason> | <until>`: `public` (reads no person's row;
 * DEC-471) and `delegates` (a helper whose callee compares) are permanent and carry `DEC-471`; any
 * other reason (`held`: a row the caller holds by a grant) carries a date or an `INC-n`. A line
 * for a door that does compare is idle, and fails.
 */

export type DoorRowsFinding = { door: string; file: string; line: number; what: string };

/** The door classes a person calls for themselves: the ones this check judges. */
export const PERSONAL_CLASSES = ["owner", "signed-in-reader", "helper"] as const;

export const PERMANENT_CLASSES = ["public", "delegates"] as const;
export const TEMPORARY_CLASSES = ["held"] as const;
/** The one decision the permanent classes cite. */
export const PERMANENT_UNTIL = "DEC-471";

type Reader = Pick<LastDeclaration, "body" | "header" | "file" | "bodyLine"> & {
  computed?: boolean;
};

const WORDS = new Set([
  "all",
  "and",
  "any",
  "as",
  "asc",
  "begin",
  "between",
  "by",
  "case",
  "cross",
  "current_date",
  "current_timestamp",
  "current_user",
  "default",
  "delete",
  "desc",
  "distinct",
  "do",
  "else",
  "elsif",
  "end",
  "exists",
  "false",
  "for",
  "from",
  "full",
  "group",
  "having",
  "if",
  "in",
  "inner",
  "insert",
  "into",
  "is",
  "join",
  "left",
  "like",
  "limit",
  "lateral",
  "loop",
  "natural",
  "new",
  "not",
  "nothing",
  "null",
  "of",
  "offset",
  "old",
  "on",
  "only",
  "or",
  "order",
  "outer",
  "returning",
  "right",
  "select",
  "session_user",
  "set",
  "some",
  "then",
  "true",
  "union",
  "update",
  "using",
  "values",
  "when",
  "where",
  "with",
]);

/** A name, or `owner.name`. */
const TOKEN = /[a-z_][a-z0-9_]*(?:\.[a-z_][a-z0-9_]*)?/;
/** A table name, schema-qualified or not, whole (not a function call). */
const TABLE = /(?:[a-z_][a-z0-9_]*\.)*[a-z_][a-z0-9_]*(?![a-z0-9_.])(?!\s*\()/;
const global = flaggedPattern("g");
const CALLER_TOKENS = ["auth_uid", "v_ctx.uid"];

/** The body as lower-case code: literals emptied, casts and the wrapped caller call read as the token. */
function normalised(body: string): string {
  return body
    .replace(/'(?:[^']|'')*'/g, "''")
    .toLowerCase()
    .replace(/::\s*[a-z_][a-z0-9_]*(?:\s*\[\s*\])*/g, "")
    .replace(/\bauth\s*\.\s*uid\s*\(\s*\)/g, "auth_uid")
    .replace(/\(\s*select\s+(auth_uid|v_ctx\.uid)\s*\)/g, "$1");
}

/** The caller's names: the tokens above and each variable assigned directly from one. */
function callerNames(code: string): Set<string> {
  const names = new Set(CALLER_TOKENS);
  // [variable, what it was assigned from]: `v := x;` (a DECLARE default too) and `SELECT x INTO v;`
  const assigned: Array<[string, string]> = [];
  for (const match of code.matchAll(
    /\b(v_[a-z0-9_]+)(?:\s+[a-z_][a-z0-9_.%]*(?:\(\d+\))?)?\s*:=\s*([a-z_][a-z0-9_.]*)\s*;/g,
  ))
    assigned.push([match[1] ?? "", match[2] ?? ""]);
  for (const match of code.matchAll(
    /\bselect\s+([a-z_][a-z0-9_.]*)\s+into\s+(?:strict\s+)?(v_[a-z0-9_]+)\s*;/g,
  ))
    assigned.push([match[2] ?? "", match[1] ?? ""]);
  for (let grew = true; grew; ) {
    grew = false;
    for (const [variable, from] of assigned)
      if (names.has(from) && !names.has(variable)) {
        names.add(variable);
        grew = true;
      }
  }
  return names;
}

/** The names of a function's arguments, read from its header. */
function argumentNames(header: string): Set<string> {
  const open = header.indexOf("(");
  if (open < 0) return new Set();
  let depth = 0;
  let end = open;
  for (; end < header.length; end++) {
    if (header[end] === "(") depth++;
    else if (header[end] === ")" && --depth === 0) break;
  }
  const names = new Set<string>();
  for (const part of header.slice(open + 1, end).split(",")) {
    const words = part.trim().toLowerCase().split(/\s+/);
    const first = words[0] ?? "";
    const name = ["in", "out", "inout", "variadic"].includes(first) ? (words[1] ?? "") : first;
    if (/^[a-z_][a-z0-9_]*$/.test(name)) names.add(name);
  }
  return names;
}

/** The tables the body selects from, joins, updates or deletes from, with their aliases. */
function rowSources(code: string): Set<string> {
  const sources = new Set<string>();
  const source = global`\\b(from|join|update|delete\\s+from)\\s+(?:only\\s+)?(${/(?:[a-z_][a-z0-9_]*\.)*[a-z_][a-z0-9_]*/})(\\s*\\()?`;
  for (const match of code.matchAll(source)) {
    if (match[3] !== undefined) continue;
    const verb = match[1] ?? "";
    const before = code.slice(0, match.index ?? 0);
    if (verb === "update" && /\b(?:for|do)\s*$/.test(before)) continue;
    const table = (match[2] ?? "").split(".").pop() ?? "";
    if (table === "" || WORDS.has(table)) continue;
    sources.add(table);
    const rest = code.slice((match.index ?? 0) + match[0].length);
    const alias = /^\s+(?:as\s+)?([a-z_][a-z0-9_]*)/.exec(rest)?.[1];
    if (alias !== undefined && !WORDS.has(alias)) sources.add(alias);
  }
  return sources;
}

/** The variables the body loads from a table row: `INTO` targets of a table read, and a FOR row. */
function rowVariables(code: string): Set<string> {
  const loaded = new Set<string>();
  const list = pattern`(${TOKEN}(?:\\s*,\\s*${TOKEN})*)`;
  const into = global`\\binto\\s+(?:strict\\s+)?${list}\\s+from\\s+${TABLE}`;
  const returning = global`\\breturning\\b[^;]*?\\binto\\s+(?:strict\\s+)?${list}\\s*;`;
  const loop = global`\\bfor\\s+(${TOKEN})\\s+in\\s+select\\b[^;]*?\\bfrom\\s+${TABLE}`;
  for (const each of [into, returning, loop])
    for (const match of code.matchAll(each))
      for (const name of (match[1] ?? "").split(",")) loaded.add(name.trim());
  return loaded;
}

/**
 * The columns the body compares with the caller: each is a token beside `=`, `<>`, `!=` or `IS
 * [NOT] DISTINCT FROM` whose other side is the caller, and that comes from a row the body reads.
 */
export function callerComparisons(reader: Pick<Reader, "body" | "header">): string[] {
  const code = normalised(reader.body);
  const callers = callerNames(code);
  const sources = rowSources(code);
  const loaded = rowVariables(code);
  const args = argumentNames(reader.header);
  const fromRow = (token: string): boolean => {
    if (callers.has(token) || WORDS.has(token)) return false;
    const dot = token.indexOf(".");
    if (dot >= 0) {
      const owner = token.slice(0, dot);
      return owner !== "v_ctx" && (sources.has(owner) || loaded.has(owner));
    }
    if (loaded.has(token)) return true;
    if (args.has(token) || /^[pv]_/.test(token)) return false;
    return sources.size > 0;
  };
  const found = new Set<string>();
  for (const match of code.matchAll(
    /<>|!=|(?<![:<>!=])=(?![>=])|\bis\s+(?:not\s+)?distinct\s+from\b/g,
  )) {
    const at = match.index ?? 0;
    const left = pattern`(${TOKEN})\\s*$`.exec(code.slice(Math.max(0, at - 80), at))?.[1];
    const right = pattern`^\\s*(${TOKEN})`.exec(code.slice(at + match[0].length))?.[1];
    if (left === undefined || right === undefined) continue;
    if (callers.has(left) && fromRow(right)) found.add(right);
    else if (callers.has(right) && fromRow(left)) found.add(left);
  }
  return [...found].sort();
}

export type AllowedDoor = { class: string; reason: string; until: string };

/** One allowlist line's second cell, `<class>: <reason>`, and its `until`; a finding text when malformed. */
export function readClassCell(
  cell: string,
  until: string,
): { class: string; reason: string } | string {
  const match = /^([a-z]+): (\S.*)$/.exec(cell);
  if (match === null) return "the reason must read `<class>: <reason>`";
  const [, kind = "", reason = ""] = match;
  if ((PERMANENT_CLASSES as readonly string[]).includes(kind)) {
    if (until !== PERMANENT_UNTIL) return `the permanent class ${kind} carries ${PERMANENT_UNTIL}`;
  } else if ((TEMPORARY_CLASSES as readonly string[]).includes(kind)) {
    if (until === PERMANENT_UNTIL || !/^(?:\d{4}-\d{2}-\d{2}|INC-\d+)$/.test(until))
      return `the class ${kind} carries a date or an INC, not ${until}`;
  } else
    return `the class ${kind} is not one of ${[...PERMANENT_CLASSES, ...TEMPORARY_CLASSES].join(", ")}`;
  return { class: kind, reason };
}

/**
 * CF-DOOR-ROWS-1 — every personal door (`owner`, `signed-in-reader`, `helper`) compares a column of
 * a row it reads with the caller in its last declaration, or is allowlisted; a body that cannot be
 * read, and an allowlisted door that does compare, are findings.
 */
export function doorRowFindings(input: {
  doors: ReadonlyArray<{ name: string; class: string }>;
  declarations: ReadonlyMap<string, Reader>;
  allowed: ReadonlyMap<string, AllowedDoor>;
}): DoorRowsFinding[] {
  const findings: DoorRowsFinding[] = [];
  for (const door of [...input.doors].sort((a, b) => a.name.localeCompare(b.name))) {
    if (!(PERSONAL_CLASSES as readonly string[]).includes(door.class)) continue;
    const declared = input.declarations.get(door.name);
    const allowed = input.allowed.get(door.name);
    const at = { door: door.name, file: declared?.file ?? "-", line: declared?.bodyLine ?? 0 };
    if (declared === undefined || declared.computed === true || declared.body.trim() === "") {
      findings.push({
        ...at,
        what: "its last declaration cannot be read (built at run time, or none)",
      });
      continue;
    }
    const compared = callerComparisons(declared);
    if (compared.length === 0 && allowed === undefined)
      findings.push({
        ...at,
        what: `${door.class} door compares no column of a row it reads with the caller, and has no line in door-rows-allowlist.txt`,
      });
    if (compared.length > 0 && allowed !== undefined)
      findings.push({
        ...at,
        what: `its allowlist line is idle: it compares ${compared.join(", ")} with the caller`,
      });
  }
  return findings;
}
