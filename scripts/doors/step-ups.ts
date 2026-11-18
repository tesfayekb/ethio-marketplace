import { readFileSync } from "node:fs";
import { join } from "node:path";

import { walkFiles } from "../conformance/kit";
import { sqlCodeOf } from "../conformance/migration-reader";
import { readOnce, type OnceOptions } from "./once";

/**
 * F1-6a (ruling 1, Part A; INC-1195's class) — EACH PERMISSION'S DECLARED STEP-UP. door_context's
 * staff form always asks `require_step_up_if_needed` of its permission, so a staff line's
 * `none:<DEC>` step-up cell holds only over a permission whose `requires_step_up` is false. The
 * judge asks this census for the newest flag the migrations declare (`opt-out-over-step-up`).
 *
 * Read in apply order (file names, then each file's statements in their own order), every
 * statement that writes the flag and names its resource by a literal:
 *  - `UPDATE public.permissions … SET requires_step_up = <value> …` whose resource is
 *    `<alias>.name = '<resource>'` (or `(<alias>.name, <alias>.action) IN (('<r>', '<a>'), …)`)
 *    and whose actions are `<alias>.action = '<a>'` or `<alias>.action IN ('<a>', …)`; no action
 *    filter writes every action of the resource;
 *  - `INSERT INTO public.permissions (…, requires_step_up, …) …` whose resource is
 *    `<alias>.name = '<resource>'` and whose column list names requires_step_up before
 *    assignable: each action literal's flag is the first `true` / `false` of its own tuple (a
 *    VALUES row or the SELECT list).
 * A value that is not a literal (a proof's saved variable, an expression) writes "unreadable"
 * (null); the judge holds an unreadable flag as true. A statement that names its resource only
 * by a variable (a proof's scratch resource) is not read.
 */

/** One write of the flag: `action` null is every action of the resource. */
export type StepUpWrite = { resource: string; action: string | null; value: boolean | null };

const STATEMENT = /\b(insert\s+into|update)\s+public\.permissions\b/gi;
const RESOURCE = /\b\w+\.name\s*=\s*'([a-z][a-z0-9_]*)'/i;
const PAIRS =
  /\(\s*\w+\.name\s*,\s*\w+\.action\s*\)\s*in\s*\(((?:\s*\(\s*'[^']*'\s*,\s*'[^']*'\s*\)\s*,?)+)\)/i;
const PAIR = /\(\s*'([a-z][a-z0-9_]*)'\s*,\s*'([a-z][a-z0-9_]*)'\s*\)/gi;
const ACTION_ONE = /\b\w+\.action\s*=\s*'([a-z][a-z0-9_]*)'/gi;
const ACTION_LIST = /\b\w+\.action\s+in\s*\(([^)]*)\)/gi;
const SET_VALUE = /\bset\s+requires_step_up\s*=\s*(true|false)\b/i;
const TOKEN = /'(?:[^']|'')*'|\(|\)|,|[^\s,()']+/g;

function literalsOf(text: string): string[] {
  return [...text.matchAll(/'([a-z][a-z0-9_]*)'/g)].map((match) => match[1] ?? "");
}

/** The first `true` / `false` of the tuple that follows offset `from`, or null. */
function flagAfter(text: string, from: number): boolean | null {
  let depth = 0;
  for (const match of text.slice(from).matchAll(TOKEN)) {
    const token = match[0];
    if (token === "(") depth += 1;
    else if (token === ")") {
      if (depth === 0) return null;
      depth -= 1;
    } else if (depth === 0 && /^from$/i.test(token)) return null;
    else if (depth === 0 && /^(true|false)$/i.test(token)) return token.toLowerCase() === "true";
  }
  return null;
}

function updateWrites(text: string): StepUpWrite[] {
  const set = SET_VALUE.exec(text);
  const value = set === null ? null : set[1]?.toLowerCase() === "true";
  const pairs = PAIRS.exec(text);
  if (pairs !== null)
    return [...(pairs[1] ?? "").matchAll(PAIR)].map((pair) => ({
      resource: pair[1] ?? "",
      action: pair[2] ?? "",
      value,
    }));
  const resource = RESOURCE.exec(text)?.[1];
  if (resource === undefined) return [];
  const actions = [
    ...[...text.matchAll(ACTION_ONE)].map((match) => match[1] ?? ""),
    ...[...text.matchAll(ACTION_LIST)].flatMap((match) => literalsOf(match[1] ?? "")),
  ];
  if (actions.length === 0) return [{ resource, action: null, value }];
  return actions.map((action) => ({ resource, action, value }));
}

function insertWrites(text: string): StepUpWrite[] {
  const columns = /public\.permissions\s*\(([^)]*)\)/i.exec(text)?.[1] ?? "";
  const names = columns.split(",").map((name) => name.trim().toLowerCase());
  const at = names.indexOf("requires_step_up");
  const assignable = names.indexOf("assignable");
  if (at === -1 || (assignable !== -1 && assignable < at)) return [];
  const resource = RESOURCE.exec(text)?.[1];
  if (resource === undefined) return [];
  const body = text.slice(text.indexOf(columns) + columns.length + 1);
  const guard = body.search(/\bwhere\b/i);
  const rows = guard === -1 ? body : body.slice(0, guard);
  const writes: StepUpWrite[] = [];
  for (const match of rows.matchAll(/'([a-z][a-z0-9_]*)'/g)) {
    const action = match[1] ?? "";
    if (action === resource) continue;
    const value = flagAfter(rows, (match.index ?? 0) + match[0].length);
    if (value !== null) writes.push({ resource, action, value });
  }
  return writes;
}

/** Every write of the flag one migration file makes, in its own order. */
export function stepUpWritesOf(sql: string): StepUpWrite[] {
  const code = sqlCodeOf(sql);
  const writes: StepUpWrite[] = [];
  for (const match of code.matchAll(STATEMENT)) {
    const start = match.index ?? 0;
    const end = code.indexOf(";", start);
    const text = code.slice(start, end === -1 ? code.length : end);
    if (!/\brequires_step_up\b/i.test(text)) continue;
    writes.push(...(/^update/i.test(match[1] ?? "") ? updateWrites(text) : insertWrites(text)));
  }
  return writes;
}

/**
 * The newest declared flag of `resource:action` over the files in apply order: true or false, null
 * when the newest write is unreadable, undefined when no file writes it.
 */
export function stepUpsOf(
  files: Array<{ file: string; sql: string }>,
): (permission: string) => boolean | null | undefined {
  const writes = [...files]
    .sort((a, b) => a.file.localeCompare(b.file))
    .flatMap(({ sql }) => stepUpWritesOf(sql));
  return (permission) => {
    const [resource, action] = permission.split(":");
    let found: boolean | null | undefined;
    for (const write of writes)
      if (write.resource === resource && (write.action === null || write.action === action))
        found = write.value;
    return found;
  };
}

/** The repository's migrations, read once per root (once.ts). */
export function declaredStepUps(
  root: string,
  options?: OnceOptions,
): (permission: string) => boolean | null | undefined {
  return readOnce(
    "step-ups",
    root,
    () =>
      stepUpsOf(
        walkFiles([join(root, "supabase", "migrations")], { ext: ["sql"] }).map((file) => ({
          file: file.slice(root.length + 1),
          sql: readFileSync(file, "utf8"),
        })),
      ),
    options,
  );
}
