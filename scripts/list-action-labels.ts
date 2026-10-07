/**
 * Bundle 8 D0 (a) — lists every interface string drawn as the visible words of
 * something a person presses, and writes docs/governance/briefs/bundle-8-labels.csv.
 *
 * Method (read-only; static reading of src/**.tsx):
 * 1. A control is an element whose tag is a pressable primitive (Button, button,
 *    menu items, dialog action/cancel/close, tab triggers, toggles), a Link that
 *    carries buttonVariants, or an element whose attributes name a chip.
 * 2. Every t("key") between the control's opening tag and its closing tag is a
 *    label of that kind (a bracket flag is "(" or "[" — the {token} braces
 *    are not words); a t("key") inside the opening tag's aria-label is `aria`.
 * 3. Labels handed down as props: a `{name}` rendered inside a control, where
 *    `name` is a typed prop of the file's component whose name says it is
 *    words (label, text, title, action, confirm, cancel …), makes `name` a label prop; every
 *    `name={t("key")}` passed anywhere in src/ is then a label of that kind.
 * Keys built at run time (t(variable)) are not listed; their count is printed.
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";

import { am } from "../src/i18n/locales/am";
import { en } from "../src/i18n/locales/en";

type Kind = "button" | "link" | "menu" | "dialog" | "tab" | "toggle" | "chip" | "aria";

const ROOT = join(import.meta.dir, "..");
const SRC = join(ROOT, "src");
const OUT = join(ROOT, "docs/governance/briefs/bundle-8-labels.csv");

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

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path, out);
    else if (path.endsWith(".tsx") && !path.endsWith(".test.tsx")) out.push(path);
  }
  return out;
}

const KEY_RE = /\bt\(\s*["'`]([A-Za-z0-9_.-]+)["'`]/g;
const DYNAMIC_RE = /\bt\(\s*[A-Za-z_$][\w$.[\]]*\s*[,)]/g;

type Use = { kind: Kind; file: string; line: number };
const uses = new Map<string, Use[]>();
function add(key: string, use: Use) {
  const list = uses.get(key) ?? [];
  list.push(use);
  uses.set(key, list);
}

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

const labelProps = new Map<string, Kind>();
let dynamic = 0;
const files = walk(SRC);

for (const path of files) {
  const text = readFileSync(path, "utf8");
  const file = relative(ROOT, path);
  dynamic += (text.match(DYNAMIC_RE) ?? []).length;
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
      if (
        new RegExp(`\\b${name}\\s*[?]?:\\s*(string|ReactNode|React\\.ReactNode|MessageKey)`).test(
          text,
        )
      ) {
        if (!labelProps.has(name)) labelProps.set(name, kind);
      }
    }
  }
}

let fromProps = 0;
for (const path of files) {
  const text = readFileSync(path, "utf8");
  const file = relative(ROOT, path);
  for (const [name, kind] of labelProps) {
    const re = new RegExp(`\\s${name}=\\{\\s*t\\(\\s*["'\`]([A-Za-z0-9_.-]+)["'\`]`, "g");
    for (const m of text.matchAll(re)) {
      add(m[1], { kind, file, line: lineOf(text, m.index ?? 0) });
      fromProps++;
    }
  }
}

const csv = (v: string) => (/[",\n\r]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);
const enMap = en as Record<string, string>;
const amMap = am as Record<string, string>;
const rows = ["key,en,am,words_en,kind,file,line,uses,flags"];
const flagCount: Record<string, number> = { over3: 0, article: 0, bracket: 0 };
for (const key of [...uses.keys()].sort()) {
  const list = uses.get(key) ?? [];
  const pressed = list.find((u) => u.kind !== "aria");
  const first = pressed ?? list[0];
  const enText = Object.hasOwn(enMap, key) ? enMap[key] : "";
  const amText = Object.hasOwn(amMap, key) ? amMap[key] : "";
  const words = enText.trim() === "" ? 0 : enText.trim().split(/\s+/).length;
  const flags: string[] = [];
  if (pressed) {
    if (words > 3) flags.push("over3");
    if (/\b(a|an|the)\b/i.test(enText)) flags.push("article");
    if (/[()[\]]/.test(enText)) flags.push("bracket");
  }
  for (const f of flags) flagCount[f]++;
  rows.push(
    [
      key,
      enText,
      amText,
      String(words),
      first.kind,
      first.file,
      String(first.line),
      String(list.length),
      flags.join(" "),
    ]
      .map(csv)
      .join(","),
  );
}
writeFileSync(OUT, rows.join("\n") + "\n");
console.log(
  `rows ${rows.length - 1}; over3 ${flagCount.over3}; article ${flagCount.article}; bracket ${flagCount.bracket}; label props ${labelProps.size} (${[...labelProps.keys()].join(", ")}); prop-passed uses ${fromProps}; dynamic t() sites ${dynamic}`,
);
