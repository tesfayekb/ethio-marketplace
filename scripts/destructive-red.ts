/**
 * Bundle 11, Part C (turn C2; the Reject-red class of turn A3, G29) — A
 * DESTRUCTIVE ACT IS RED on every control that performs or confirms it.
 *
 * A control's label is a destructive word when its key's last part starts with
 * delete, remove, reject, revoke, unlink, deactivate or discard (not the past
 * tense: "Removed" names a state, not an act), or is the confirmation under
 * such a part (`….delete.confirm`). The check reads every .tsx file
 * under src/ (tests left out) and, for each such label drawn by a control,
 * requires that control to be drawn red:
 * - a JSX control (`Button`, `button`, `AlertDialogAction`, `DropdownMenuItem`,
 *   `IconButton`): its opening tag says `destructive` or `danger` (a variant, a
 *   tone, a class, or a class constant whose name says danger);
 * - a row action object (`label: t(…)`): the object says `tone: "danger"`, or
 *   it is RowActions' `remove` slot (red by the primitive);
 * - a dialog's submit (`submitLabel={t(…)}`): the element carries `danger`;
 * - a verb bar's `verb(…)` call: its danger argument is `true`.
 * A label that is not drawn by a control (a status, an error line) is not
 * judged, nor a key picked at run time (`t(MOVE_LABEL[kind])`: the move
 * dialog's own rule draws Remove red). The exceptions are declared below, each with its reason; the check
 * refuses an exception that no longer matches a control (stale).
 * Run by the unit tests (scripts/destructive-red.test.ts).
 */
import { readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { walkFiles } from "./conformance/kit";

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

/** Labels that look destructive and are not, each with the reason (file → keys). */
export const NOT_DESTRUCTIVE: Record<string, Record<string, string>> = {
  "src/features/admin-attributes/components/attribute-option-row.tsx": {
    "admin.attributes.options.removeRow": "edits the form; nothing is removed until Save (turn B3)",
  },
  "src/features/posting/step-where.tsx": {
    "post.where.removePlace": "edits the draft's places; nothing is saved until Next",
  },
};

const ACT = "(?:delete|remove|reject|revoke|unlink|deactivate|discard)(?!e?d(?:[A-Z.]|$))";
/** The act's own key (`….delete`, `….removePassword`), or its confirmation (`….delete.confirm`). */
const DESTRUCTIVE = new RegExp(
  `\\.${ACT}[A-Za-z]*$|\\.${ACT}[A-Za-z]*\\.(?:confirm|go|yes|submit)$`,
  "i",
);
const KEY = /\bt\(\s*["'`]([A-Za-z0-9_.-]+)["'`]\s*\)/g;
const CONTROL = /<(Button|button|AlertDialogAction|DropdownMenuItem|IconButton)(?![A-Za-z])/g;
const RED = /destructive|danger/i;

export type Finding = { file: string; line: number; key: string; how: string; red: boolean };

/** The index of the bracket that closes the one at `open` (strings and template text skipped). */
function closing(text: string, open: number): number {
  const pairs: Record<string, string> = { "(": ")", "{": "}", "[": "]" };
  const stack: string[] = [];
  let quote: string | null = null;
  for (let i = open; i < text.length; i += 1) {
    const c = text[i]!;
    if (quote) {
      if (c === "\\") i += 1;
      else if (c === quote) quote = null;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") quote = c;
    else if (c in pairs) stack.push(pairs[c]!);
    else if (c === stack[stack.length - 1]) {
      stack.pop();
      if (stack.length === 0) return i;
    }
  }
  return -1;
}

/** The end of the JSX opening tag that starts at `start` (its `>`), braces skipped. */
function openTagEnd(text: string, start: number): number {
  for (let i = start + 1; i < text.length; i += 1) {
    const c = text[i]!;
    if (c === "{") {
      const end = closing(text, i);
      if (end < 0) return -1;
      i = end;
    } else if (c === ">") return i;
  }
  return -1;
}

/** Where the label sits and whether it is red; null when no control draws it. */
export function judge(text: string, at: number): { how: string; red: boolean } | null {
  const before = text.slice(0, at);
  // A JSX control whose children hold the label.
  let control: { tag: string; open: string } | null = null;
  for (const m of before.matchAll(CONTROL)) {
    const end = openTagEnd(text, m.index);
    if (end < 0 || end > at) continue;
    if (text.slice(end - 1, end + 1) === "/>") continue;
    const close = text.indexOf(`</${m[1]}>`, end);
    if (close < 0 || close < at) continue;
    control = { tag: m[1]!, open: text.slice(m.index, end + 1) };
  }
  // The nearest construct the label is an argument or a property of.
  const tail = before.slice(-400);
  const submit = /submitLabel=\{\s*$/.test(tail);
  const property = /\blabel:\s*$/.test(tail);
  const verbCall = before.lastIndexOf("verb(");
  if (submit) {
    const start = before.lastIndexOf("<");
    const end = openTagEnd(text, start);
    const open = text.slice(start, end + 1);
    return { how: "submit", red: /\bdanger\b/.test(open) };
  }
  if (property) {
    // The object literal the property belongs to.
    let depth = 0;
    let start = -1;
    for (let i = at - 1; i >= 0; i -= 1) {
      const c = text[i];
      if (c === "}") depth += 1;
      else if (c === "{") {
        if (depth === 0) {
          start = i;
          break;
        }
        depth -= 1;
      }
    }
    const end = closing(text, start);
    const object = text.slice(start, end + 1);
    // RowActions' `remove` slot is drawn red by the primitive itself.
    const slot = text.lastIndexOf("remove={", start);
    const inSlot = slot >= 0 && closing(text, slot + 7) > at;
    return {
      how: inSlot ? "remove slot" : "action",
      red: inSlot || /tone:\s*["']danger["']/.test(object),
    };
  }
  if (verbCall >= 0) {
    const end = closing(text, verbCall + 4);
    if (end > at) {
      const args = text.slice(verbCall + 5, end).trim();
      return { how: "verb", red: /,\s*true\s*,?$/.test(args) };
    }
  }
  if (control) return { how: control.tag, red: RED.test(control.open) };
  return null;
}

/** Every destructive label a control draws in one file. */
export function findingsIn(file: string, text: string): Finding[] {
  const out: Finding[] = [];
  for (const m of text.matchAll(KEY)) {
    const key = m[1]!;
    if (!DESTRUCTIVE.test(key)) continue;
    const verdict = judge(text, m.index);
    if (verdict === null) continue;
    const line = text.slice(0, m.index).split("\n").length;
    out.push({ file, line, key, ...verdict });
  }
  return out;
}

export type Source = { file: string; text: string };

export function readSources(root = ROOT): Source[] {
  return walkFiles([join(root, "src")], { ext: ["tsx"], skipTests: true })
    .map((path) => ({
      file: relative(root, path).split("\\").join("/"),
      text: readFileSync(path, "utf8"),
    }))
    .sort((a, b) => a.file.localeCompare(b.file));
}

/** The refusals: a destructive control not drawn red, and an exception that no longer matches. */
export function check(sources: Source[]): { findings: Finding[]; refusals: string[] } {
  const findings = sources.flatMap((source) => findingsIn(source.file, source.text));
  const refusals: string[] = [];
  const used = new Set<string>();
  for (const f of findings) {
    const reason = NOT_DESTRUCTIVE[f.file]?.[f.key];
    if (reason !== undefined) {
      used.add(`${f.file}|${f.key}`);
      continue;
    }
    if (!f.red) refusals.push(`${f.file}:${f.line} ${f.key} (${f.how}) is not drawn red`);
  }
  for (const [file, keys] of Object.entries(NOT_DESTRUCTIVE)) {
    for (const key of Object.keys(keys)) {
      if (!used.has(`${file}|${key}`))
        refusals.push(`${file}: the exception for ${key} matches no control`);
    }
  }
  return { findings, refusals };
}
