/**
 * Bundle 11, Part C (turn C1; D118, D128, D132, DEC-170) — EVERY ADMIN TABLE ON
 * THE AGREED BLOCKS, checked. Each rule below is written in
 * docs/features/display-primitives.md ("The agreed tables — the rules and
 * their check"); this check reads every file that draws a `DataTable` and
 * refuses a file that breaks one.
 *
 * Bundle 16 turn R1 (INC-630) — EVERY table, not only the admin's: the check read
 * src/features/admin and the src/features/admin-… folders alone, so the first
 * table a user sees (My listings) was built without the toolbar, Columns or the
 * row's actions and nothing refused it. It now reads every file under
 * src/features (tests left out), so each user-facing table — My listings today,
 * favourites, saved searches, messages and the seller's page as they come — is
 * held to the same rules:
 *
 * - T1 the page's heading sits in the header (`TableActions`). A table drawn
 *   inside another page (declared in SECTIONS) takes its host's heading: the
 *   host must draw the section and pass T1 itself.
 * - T2 the toolbar (`TableToolbar`: the search, Filters, Columns).
 * - T3 Columns (`ColumnsButton`, with `useHiddenColumns`).
 * - T4 a Filters button shows its choices as chips (`FilterChips`).
 * - T5 a row's actions are `RowActions` (Edit, a red Delete, the three-dots
 *   menu) — or, where the row only opens its own details, the toggle of the
 *   table's `expandedRow`.
 * - T6 the footer (`DataTablePagination`) with its page size kept in this
 *   browser by the one hook, `useKeptPage`; no page keeps it its own way
 *   (`localStorage`).
 * - T7 a phone card: one column is the card's title (`card: "title"`).
 * - T8 tick-boxes (`selection`) only where a bulk action acts on the ticked
 *   rows (`selectionActions`; D128).
 * - T9 a row that opens its own page (`rowHref`) and carries a three-dots menu
 *   offers Open in it (`key: "open"`; D142, turn C4).
 *
 * The baseline of existing screens reached zero in this turn, so there is
 * none: a new table is built on the blocks or the check refuses it.
 * Run by the unit tests (scripts/admin-tables.test.ts).
 */
import { readFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { walkFiles } from "./conformance/kit";

export type Rule = "T1" | "T2" | "T3" | "T4" | "T5" | "T6" | "T7" | "T8" | "T9";

export const RULES: Record<Rule, string> = {
  T1: "the page's heading in the header (TableActions)",
  T2: "the toolbar (TableToolbar)",
  T3: "Columns (ColumnsButton with useHiddenColumns)",
  T4: "a Filters button's choices as chips (FilterChips)",
  T5: "the row's actions as RowActions (or the toggle of the row's expandedRow)",
  T6: "the footer (DataTablePagination) with the page size kept by useKeptPage, never by localStorage",
  T7: 'a phone card with a title (a column with card: "title")',
  T8: "tick-boxes only with a bulk action (selection with selectionActions)",
  T9: 'a row that opens its page offers Open in its three-dots menu (key: "open")',
};

/** Tables drawn inside another page: the section's file → its host page's file. */
export const SECTIONS: Record<string, string> = {
  "src/features/admin-ai/ai-calls.tsx": "src/features/admin-ai/ai-page.tsx",
  "src/features/admin/translations/data-scope.tsx":
    "src/features/admin/translations/strings-page.tsx",
};

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

/** The file's code without its comments (a comment that names a block is not the block). */
export function codeOf(text: string): string {
  return text.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
}

/** True when the file draws a DataTable (not only its footer). */
export function drawsTable(text: string): boolean {
  return /<DataTable(?![A-Za-z])/.test(codeOf(text));
}

/** The rules one file breaks; T1 of a declared section is judged on its host. */
export function breaches(file: string, text: string): Rule[] {
  const code = codeOf(text);
  const out: Rule[] = [];
  if (!(file in SECTIONS) && !/<TableActions\b/.test(code)) out.push("T1");
  if (!/<TableToolbar\b/.test(code)) out.push("T2");
  if (!/<ColumnsButton\b/.test(code) || !/\buseHiddenColumns\(/.test(code)) out.push("T3");
  if (/<FiltersButton\b/.test(code) && !/<FilterChips\b/.test(code)) out.push("T4");
  if (/\browActions=/.test(code) && !/<RowActions\b/.test(code) && !/\bexpandedRow=/.test(code)) {
    out.push("T5");
  }
  if (
    (!/\bkeyset=\{/.test(code) &&
      (!/<DataTablePagination\b/.test(code) || !/\buseKeptPage\(/.test(code))) ||
    /\blocalStorage\b/.test(code)
  ) {
    out.push("T6");
  }
  if (!/\bcard:\s*["']title["']/.test(code)) out.push("T7");
  if (/\bselection=/.test(code) && !/\bselectionActions=/.test(code)) out.push("T8");
  if (
    /\browHref=/.test(code) &&
    /\bmore(?:=\{|\.push\()/.test(code) &&
    !/\bkey:\s*["']open["']/.test(code)
  ) {
    out.push("T9");
  }
  return out;
}

export type Source = { file: string; text: string };

/** Every feature source file (tests left out): the admin's and the user's alike (INC-630). */
export function readTableSources(root = ROOT): Source[] {
  return walkFiles([join(root, "src/features")], { ext: ["tsx"], skipTests: true })
    .map((path) => ({
      file: relative(root, path).split("\\").join("/"),
      text: readFileSync(path, "utf8"),
    }))
    .sort((a, b) => a.file.localeCompare(b.file));
}

/** The refusals over a set of sources: "<file>: <rule> — <what is missing>". */
export function check(sources: Source[]): { tables: string[]; refusals: string[] } {
  const byFile = new Map(sources.map((source) => [source.file, source.text]));
  const tables = sources.filter((source) => drawsTable(source.text)).map((source) => source.file);
  const refusals: string[] = [];
  for (const file of tables) {
    for (const rule of breaches(file, byFile.get(file) ?? "")) {
      refusals.push(`${file}: ${rule} — ${RULES[rule]}`);
    }
  }
  for (const [section, host] of Object.entries(SECTIONS)) {
    const hostText = byFile.get(host);
    const name = section.replace(/^.*\//, "").replace(/\.tsx$/, "");
    if (!byFile.has(section)) continue;
    if (hostText === undefined || !new RegExp(`from "\\./${name}"|import\\("\\./${name}"\\)`).test(hostText)) {
      refusals.push(`${section}: T1 — its host ${host} does not draw it`);
    } else if (breaches(host, hostText).includes("T1")) {
      refusals.push(`${section}: T1 — its host ${host} has no heading in the header`);
    }
  }
  return { tables, refusals };
}
