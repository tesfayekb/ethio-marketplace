/**
 * Bundle 8 D0 (a), made a check in D3 — lists every interface string drawn as
 * the visible words of something a person presses, flags the long ones, and
 * (run as a script) writes docs/governance/briefs/bundle-8-labels.csv.
 *
 * Method (read-only; static reading of src/**.tsx):
 * 1. A control is an element whose tag is a pressable primitive (Button, button,
 *    menu items, dialog action/cancel/close, tab triggers, toggles), a Link that
 *    carries buttonVariants, or an element whose attributes name a chip.
 * 2. Every t("key") between the control's opening tag and its closing tag is a
 *    label of that kind; a t("key") inside the opening tag's aria-label is `aria`.
 * 3. Labels handed down as props: a `{name}` rendered inside a control, where
 *    `name` is a typed prop of the file's component whose name says it is words
 *    (label, text, title, action, confirm, cancel …), makes that file's exported
 *    components RECEIVERS of `name`. A `name={t("key")}` handed to a receiver is
 *    a label of the control's kind; handed to any other component (FormField,
 *    Field, StatCard …) it names a field or a figure: kind `field`, never flagged.
 * 4. Keys picked at run time: the key literals handed to `verb(…)` as its label
 *    key in the two console verb bars (both arms of a ternary) are `button`
 *    labels. Every other t(variable) stays unlisted; its count is printed.
 * Flags (action kinds only): over3, article, bracket, am_over4.
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

export type Kind =
  | "button"
  | "link"
  | "menu"
  | "dialog"
  | "tab"
  | "toggle"
  | "chip"
  | "aria"
  | "field";

export type Use = { kind: Kind; file: string; line: number };
export type Source = { file: string; text: string };
export type Row = {
  key: string;
  en: string;
  am: string;
  wordsEn: number;
  kind: Kind;
  file: string;
  line: number;
  uses: number;
  flags: string[];
};

const TAG_KIND: Record<string, Kind> = {
  Button: "button",
  button: "button",
  DropdownMenuItem: "menu",
  DropdownMenuCheckboxItem: "menu",
  DropdownMenuRadioItem: "menu",
  ContextMenuItem: "menu",
  MenubarItem: "menu",
  CommandItem: "menu",
  AlertDialogAction: "dialog",
  AlertDialogCancel: "dialog",
  DialogClose: "dialog",
  SheetClose: "dialog",
  DrawerClose: "dialog",
  TabsTrigger: "tab",
  Toggle: "toggle",
  ToggleGroupItem: "toggle",
  Switch: "toggle",
};

/** The two files whose `verb(suffix, labelKey, …)` calls carry run-time label keys. */
export const VERB_FILES = [
  "src/features/admin-countries/country-verb-bar.tsx",
  "src/features/admin-locations/location-verb-bar.tsx",
];

const KEY_RE = /\bt\(\s*["'`]([A-Za-z0-9_.-]+)["'`]/g;
const DYNAMIC_RE = /\bt\(\s*[A-Za-z_$][\w$.[\]]*\s*[,)]/g;
const LITERAL_KEY_RE = /["'`]([A-Za-z][A-Za-z0-9_-]*(?:\.[A-Za-z0-9_-]+)+)["'`]/g;

function lineOf(text: string, index: number): number {
  let n = 1;
  for (let i = 0; i < index; i++) if (text.charCodeAt(i) === 10) n++;
  return n;
}

/** The end of a JSX opening tag starting at `start` (index of "<"), braces respected. */
function openTagEnd(text: string, start: number): number {
  let depth = 0;
  let quote = "";
  for (let i = start + 1; i < text.length; i++) {
    const c = text[i];
    if (quote) {
      if (c === quote) quote = "";
      continue;
    }
    if (depth === 0 && (c === '"' || c === "'")) quote = c;
    else if (c === "{") depth++;
    else if (c === "}") depth--;
    else if (c === ">" && depth === 0) return i;
  }
  return -1;
}

/** The index of the matching close tag, nesting of the same tag respected. */
function closeTag(text: string, tag: string, from: number): number {
  if (!/^[A-Za-z]+$/.test(tag)) return -1;
  // Reviewed (DEC-153): tag is letters only (checked above): a TAG_KIND key or "Link".
  // nosemgrep: detect-non-literal-regexp
  const re = new RegExp(`<${tag}(?=[\\s>/])|</${tag}\\s*>`, "g");
  re.lastIndex = from;
  let depth = 1;
  for (let m = re.exec(text); m; m = re.exec(text)) {
    if (m[0].startsWith("</")) {
      depth--;
      if (depth === 0) return m.index;
    } else {
      const end = openTagEnd(text, m.index);
      if (end > 0 && text[end - 1] !== "/") depth++;
    }
  }
  return -1;
}

/** The text of a call's argument number `n` (0-based), from the index after "(". */
function argText(text: string, from: number, n: number): string | null {
  let depth = 0;
  let quote = "";
  let index = 0;
  let start = from;
  for (let i = from; i < text.length; i++) {
    const c = text[i];
    if (quote) {
      if (c === "\\") i++;
      else if (c === quote) quote = "";
      continue;
    }
    if (c === '"' || c === "'" || c === "`") quote = c;
    else if (c === "(" || c === "[" || c === "{") depth++;
    else if (c === ")" || c === "]" || c === "}") {
      if (depth === 0) return index === n ? text.slice(start, i) : null;
      depth--;
    } else if (c === "," && depth === 0) {
      if (index === n) return text.slice(start, i);
      index++;
      start = i + 1;
    }
  }
  return null;
}

/** Words of an English label: a {token} is one word, "…" is none. */
export function englishWords(value: string): number {
  return value
    .replace(/…/g, " ")
    .trim()
    .split(/\s+/)
    .filter((w) => w !== "").length;
}

/** Words of an Amharic label: tokens and lone punctuation are not words. */
export function amharicWords(value: string): number {
  return value
    .replace(/…/g, " ")
    .trim()
    .split(/\s+/)
    .filter((w) => w !== "" && !/^\{[^}]*\}$/.test(w) && /[\p{L}\p{N}]/u.test(w)).length;
}

/** The flags of one label; field and aria rows are never flagged. */
export function flagsOf(kind: Kind, enText: string, amText: string): string[] {
  if (kind === "field" || kind === "aria") return [];
  const flags: string[] = [];
  if (englishWords(enText) > 3) flags.push("over3");
  if (/\b(a|an|the)\b/i.test(enText)) flags.push("article");
  if (/[()[\]]/.test(enText)) flags.push("bracket");
  if (amharicWords(amText) > 4) flags.push("am_over4");
  return flags;
}

export type Scan = { uses: Map<string, Use[]>; dynamic: number; labelProps: string[] };

/** Reads the sources and returns every label use (pure; unit-tested). */
export function scan(sources: Source[]): Scan {
  const uses = new Map<string, Use[]>();
  const add = (key: string, use: Use) => {
    const list = uses.get(key) ?? [];
    list.push(use);
    uses.set(key, list);
  };
  /** prop name → (receiving component → the control kind it draws the prop in). */
  const receivers = new Map<string, Map<string, Kind>>();
  let dynamic = 0;

  for (const { file, text } of sources) {
    dynamic += (text.match(DYNAMIC_RE) ?? []).length;
    const exported = [
      ...text.matchAll(/export\s+(?:default\s+)?(?:function|const)\s+([A-Z][A-Za-z0-9]*)/g),
    ].map((m) => m[1]);
    const tagRe = /<([A-Za-z][\w.]*)(?=[\s>/])/g;
    for (let m = tagRe.exec(text); m; m = tagRe.exec(text)) {
      const tag = m[1];
      const end = openTagEnd(text, m.index);
      if (end < 0) continue;
      const attrs = text.slice(m.index, end);
      let kind: Kind | undefined = TAG_KIND[tag];
      if (!kind && tag === "Link" && /buttonVariants/.test(attrs)) kind = "link";
      if (!kind && /chip/i.test(attrs) && /onClick|role=["']button/.test(attrs)) kind = "chip";
      if (!kind) continue;
      for (const a of attrs.matchAll(/aria-label=\{\s*t\(\s*["'`]([A-Za-z0-9_.-]+)["'`]/g)) {
        add(a[1], { kind: "aria", file, line: lineOf(text, m.index) });
      }
      if (text[end - 1] === "/") continue;
      const close = closeTag(text, tag, end + 1);
      if (close < 0) continue;
      const body = text.slice(end + 1, close);
      for (const k of body.matchAll(KEY_RE)) {
        add(k[1], { kind, file, line: lineOf(text, end + 1 + (k.index ?? 0)) });
      }
      for (const p of body.matchAll(/\{\s*(?:props\.)?([a-z][A-Za-z0-9]*)\s*\}/g)) {
        const name = p[1];
        if (!/label|text|title|cta|action|confirm|cancel|verb/i.test(name)) continue;
        const typed = new RegExp(
          `\\b${name}\\s*[?]?:\\s*(string|ReactNode|React\\.ReactNode|MessageKey)`,
        );
        if (!typed.test(text)) continue;
        const byComponent = receivers.get(name) ?? new Map<string, Kind>();
        for (const component of exported) {
          if (!byComponent.has(component)) byComponent.set(component, kind);
        }
        receivers.set(name, byComponent);
      }
    }
  }

  const propNames = new Set<string>(["label", ...receivers.keys()]);
  for (const { file, text } of sources) {
    for (const name of propNames) {
      const re = new RegExp(`\\s${name}=\\{\\s*t\\(\\s*["'\`]([A-Za-z0-9_.-]+)["'\`]`, "g");
      for (const m of text.matchAll(re)) {
        const at = m.index ?? 0;
        const open = text.lastIndexOf("<", at);
        const tag = /^<([A-Za-z][\w.]*)/.exec(text.slice(open))?.[1] ?? "";
        const kind = receivers.get(name)?.get(tag) ?? "field";
        add(m[1], { kind, file, line: lineOf(text, at) });
      }
    }
  }

  for (const { file, text } of sources) {
    if (!VERB_FILES.includes(file)) continue;
    dynamic -= (text.match(/\bt\(\s*labelKey\s*[,)]/g) ?? []).length;
    for (const m of text.matchAll(/\bverb\(/g)) {
      const from = (m.index ?? 0) + m[0].length;
      const arg = argText(text, from, 1);
      if (arg === null || /^\s*suffix\b/.test(arg)) continue;
      for (const k of arg.matchAll(LITERAL_KEY_RE)) {
        add(k[1], { kind: "button", file, line: lineOf(text, from) });
      }
    }
  }

  return { uses, dynamic, labelProps: [...propNames] };
}

/** One row per key, with its flags (pure; unit-tested). */
export function rowsOf(
  uses: Map<string, Use[]>,
  enMap: Record<string, string>,
  amMap: Record<string, string>,
): Row[] {
  const rows: Row[] = [];
  for (const key of [...uses.keys()].sort()) {
    const list = uses.get(key) ?? [];
    const pressed = list.find((u) => u.kind !== "aria" && u.kind !== "field");
    const first = pressed ?? list.find((u) => u.kind === "field") ?? list[0];
    const enText = Object.hasOwn(enMap, key) ? enMap[key] : "";
    const amText = Object.hasOwn(amMap, key) ? amMap[key] : "";
    rows.push({
      key,
      en: enText,
      am: amText,
      wordsEn: englishWords(enText),
      kind: first.kind,
      file: first.file,
      line: first.line,
      uses: list.length,
      flags: flagsOf(first.kind, enText, amText),
    });
  }
  return rows;
}

/** The allowlist: one `key | reason` per line; a line without a reason is refused. */
export function readAllowlist(text: string): Map<string, string> {
  const out = new Map<string, string>();
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (line === "" || line.startsWith("#")) continue;
    const [key, ...rest] = line.split("|");
    const reason = rest.join("|").trim();
    if (!key?.trim() || reason === "") throw new Error(`allowlist line without a reason: ${line}`);
    out.set(key.trim(), reason);
  }
  return out;
}

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

export function readTree(): Source[] {
  const out: Source[] = [];
  const walk = (dir: string) => {
    for (const name of readdirSync(dir)) {
      const path = join(dir, name);
      if (statSync(path).isDirectory()) walk(path);
      else if (path.endsWith(".tsx") && !path.endsWith(".test.tsx")) {
        out.push({ file: relative(ROOT, path), text: readFileSync(path, "utf8") });
      }
    }
  };
  walk(join(ROOT, "src"));
  return out;
}

async function main() {
  const { am } = await import("../src/i18n/locales/am");
  const { en } = await import("../src/i18n/locales/en");
  const result = scan(readTree());
  const rows = rowsOf(
    result.uses,
    en as Record<string, string>,
    am as unknown as Record<string, string>,
  );
  const csv = (v: string) => (/[",\n\r]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);
  const lines = ["key,en,am,words_en,kind,file,line,uses,flags"];
  const count: Record<string, number> = { over3: 0, article: 0, bracket: 0, am_over4: 0 };
  for (const r of rows) {
    for (const f of r.flags) count[f]++;
    lines.push(
      [
        r.key,
        r.en,
        r.am,
        String(r.wordsEn),
        r.kind,
        r.file,
        String(r.line),
        String(r.uses),
        r.flags.join(" "),
      ]
        .map(csv)
        .join(","),
    );
  }
  writeFileSync(join(ROOT, "docs/governance/briefs/bundle-8-labels.csv"), lines.join("\n") + "\n");
  const fields = rows.filter((r) => r.kind === "field").length;
  console.log(
    `rows ${rows.length}; action ${rows.length - fields}; field ${fields}; flagged ${rows.filter((r) => r.flags.length > 0).length}; over3 ${count.over3}; article ${count.article}; bracket ${count.bracket}; am_over4 ${count.am_over4}; run-time places ${result.dynamic}`,
  );
}

if (process.argv[1]?.endsWith("list-action-labels.ts")) await main();
