import { readFileSync } from "node:fs";
import { relative } from "node:path";

import { describe, expect, it } from "vitest";

import { walkFiles } from "../../../scripts/conformance/kit";

/**
 * DEC-464 / INC-1279 — THE FAILURE NOTICE'S CENSUS. Every `.tsx` under src/features,
 * src/routes and src/components that draws a query's or an action's failure draws it through
 * `<FailureNotice` (failure-notice.tsx) or a shared outlet that does (DataTable with `retry=`,
 * StatCard `failed` with `onRetry=`, DetailPanel / ChartFrame `error=` with `onRetry=`, FieldSelect
 * with `read=`). A
 * failure's class or status, or an error's raw text, is never drawn as words.
 *
 * It MISSES: an error renamed to any other name (`problem`, `phase`) and drawn; a catch → helper
 * → state → child chain; toasts; a Retry that cannot succeed (behaviour, not text). The
 * notice's own tests and the browser tests cover those.
 *
 * Allowlist lines read `path | reason | until`; a line whose file no longer trips the census, or
 * no longer exists, fails as stale.
 */

const ROOTS = ["src/features", "src/routes", "src/components"];

/** A branch that draws a failure. */
export const FAILURE_BRANCH =
  /\.isError\b|\.error\s*(?:\?\s|&&|\)\s*(?:return|\{))|\bif\s*\(\s*\w+\.error\s*\)|===\s*["']failed["']|\bfailed\s*\?\s*\(/;
/** A shared outlet that draws the notice. */
export const OUTLET =
  /<(?:FailureNotice|DataTable|StatCard|DetailPanel|ChartFrame|LoadFailedHere)\b/;
/** Raw diagnostics drawn as words (always red). */
export const RAW = [
  /(?<![=$])\{[^{}\n]*\b\w*[Ff]ailure\w*\s*\.\s*(?:class|status)\b[^{}\n]*\}/,
  /\{\s*(?:\w+\.)?error\s*\.\s*message\s*\}/,
  /\{\s*String\(\s*\w*[eE]rr\w*\s*\)\s*\}/,
  // Q11 (cursor bundle 7b) — `${errorText(…)}` inside a template string is a log line, not words.
  /(?<!\$)\{\s*errorText\(/,
  // INC-1280 — a refusal code with no words, drawn as `code — detail`.
  /\?\s*code\s*:\s*`\$\{code\} — /,
];

/** Each `<Tag …>` element's props, up to its own closing line (same indentation), or its line. */
function block(text: string, tag: string): string[] {
  const lines = text.split("\n");
  const out: string[] = [];
  lines.forEach((line, at) => {
    const open = line.indexOf(`<${tag}`);
    if (open === -1 || !/^<\w+(?:[\s>]|$)/.test(line.slice(open).replace(/^<\w+<[^>]*>/, "<x ")))
      return;
    if (/\/>\s*$/.test(line) || line.includes(`</${tag}>`)) {
      out.push(line);
      return;
    }
    const indent = /^\s*/.exec(line)?.[0] ?? "";
    let end = at + 1;
    while (end < lines.length) {
      const next = lines[end] ?? "";
      if (next === `${indent}/>` || next === `${indent}>` || next.startsWith(`${indent}</${tag}`))
        break;
      end += 1;
    }
    out.push(lines.slice(at, end + 1).join("\n"));
  });
  return out;
}

/** The census's reasons a file trips, empty when it passes. */
export function trips(text: string): string[] {
  const why: string[] = [];
  for (const raw of RAW) if (raw.test(text)) why.push(`raw:${raw.source.slice(0, 24)}`);
  // A FieldSelect handed its read draws the one notice itself (field-select.tsx).
  const selectOutlet = block(text, "FieldSelect").some((b) => /\bread=/.test(b));
  if (FAILURE_BRANCH.test(text) && !OUTLET.test(text) && !selectOutlet)
    why.push("branch-without-notice");
  for (const b of block(text, "DataTable"))
    if (/\berror=/.test(b) && !/\bretry=/.test(b)) why.push("datatable-without-retry");
  for (const b of block(text, "StatCard"))
    if (/\bfailed=/.test(b) && !/\bonRetry=/.test(b)) why.push("statcard-without-retry");
  // The tile's old path (failed, no error) bypasses the notice; it is deleted in bundle 10b.
  for (const b of block(text, "StatCard"))
    if (/\bfailed(?:=|\s|\/>)/.test(b) && !/\berror=/.test(b)) why.push("statcard-without-error");
  for (const tag of ["DetailPanel", "ChartFrame"])
    for (const b of block(text, tag))
      if (/\berror=/.test(b) && !/\bonRetry=/.test(b)) why.push(`${tag}-without-retry`);
  // A made-up error hides the read's own answer; a page reload hides its own retry.
  for (const b of block(text, "FailureNotice")) {
    if (/\berror=\{[^}]*\bnew\s+Error\(/.test(b)) why.push("notice-made-up-error");
    if (/\bonRetry=\{[^}]*(?:location\.reload|refreshPage)\b/.test(b))
      why.push("notice-retry-reloads");
  }
  return why;
}

/**
 * INC-1338 (cursor-bundle-8c-2b) — THE CENSUS JUDGES EACH BRANCH, NOT THE FILE. `trips` passes a file
 * once it draws the notice anywhere, so a second failure branch in it that draws its own sentence
 * went unseen (`markets.failed ? (<p>…</p>)`, `tree.failed && (<p>…</p>)` in the place step). A
 * BRANCH is a line that tests a failure flag or state (FAILURE_BRANCH, `.failed ?`, `.failed &&`),
 * the flag not negated (`!q.error` is the success branch); its SPAN is that line and the lines it
 * governs, to the line that closes at the same indentation. A branch whose span draws an element
 * (`<p`, `<span`, `<Thing`) and no outlet — a shared one (OUTLET), or a component of the same file
 * that itself draws `<FailureNotice` — is a hit, keyed `path::<the branch's line, trimmed>` so a
 * moved line does not move its allowance. A branch that draws nothing (`error ? undefined : …`) is
 * not a hit.
 *
 * It MISSES, as FNC-2 does: a failure carried through a renamed flag, and a branch drawn by a
 * component of another file.
 */
export const BRANCH_LINE = new RegExp(`${FAILURE_BRANCH.source}|\\.failed\\s*(?:&&|\\?)`);
/** An element opened in JSX: `<p`, `<span`, `<Thing` — never a comparison (`a < b`) or a type. */
const ELEMENT = /(?<![\w)\]])<(?:[a-z][\w-]*|[A-Z]\w*)(?=[\s>/])/;
/** A flag the line negates: removed before the line is read, so only a failure branch is left. */
const NEGATED = /!\s*[\w.?[\]]+/g;

/** The components of this file that draw the notice themselves (`function FeedError` → `<FailureNotice`). */
function localOutlets(text: string): string[] {
  const lines = text.split("\n");
  const names: string[] = [];
  lines.forEach((line, at) => {
    const name = /^(?:export\s+)?function\s+([A-Z]\w*)\s*\(/.exec(line)?.[1];
    if (name === undefined) return;
    let end = at + 1;
    while (end < lines.length && !/^\}\s*$/.test(lines[end] ?? "")) end += 1;
    if (lines.slice(at, end + 1).some((inner) => inner.includes("<FailureNotice")))
      names.push(name);
  });
  return names;
}

export function branchHits(text: string): Array<{ line: number; code: string }> {
  const lines = text.split("\n");
  const outlets = localOutlets(text).map((name) => new RegExp(`<${name}\\b`));
  const hits: Array<{ line: number; code: string }> = [];
  lines.forEach((code, at) => {
    if (/^\s*(?:\/\/|\*|\/\*)/.test(code)) return;
    const read = code.replace(NEGATED, "");
    if (!BRANCH_LINE.test(read) || /\?\s*(?:undefined|null)\b/.test(read)) return;
    const indent = (/^\s*/.exec(code)?.[0] ?? "").length;
    let end = at + 1;
    while (end < lines.length) {
      const next = lines[end] ?? "";
      if (next.trim() !== "" && (/^\s*/.exec(next)?.[0] ?? "").length <= indent) break;
      end += 1;
    }
    const closer = (lines[end] ?? "").trim();
    const span = lines.slice(at, /^(?:\)|\}|\]|<\/|\/>)/.test(closer) ? end + 1 : end).join("\n");
    if (ELEMENT.test(span) && !OUTLET.test(span) && !outlets.some((outlet) => outlet.test(span)))
      hits.push({ line: at + 1, code: code.trim() });
  });
  return hits;
}

const UNTIL_10B = "INC-1279 until bundle 10b";
const ALLOW: ReadonlyArray<string> = [
  // EXCLUDED (Cursor bundle 6's folders)
  // LEFT (ruling 1 decision 9 / not a reader)
  `src/components/ui/picture.tsx | an image's fallback, not a read | INC-1279 permanent`,
  `src/routes/dev.primitives.tsx | the board's demonstration states | INC-1279 permanent`,
];

/**
 * INC-1338 — THE BRANCHES FNC-4 FOUND THAT NEED MORE THAN THE DROP-IN (listed with file and line in the
 * turn's report, §13, for the supervisor to number). A line reads `path::<the branch's line> | reason |
 * until`; `until` is an ISO date no later than 2026-12-31, and a line that no longer matches a branch,
 * or whose date has passed, fails.
 */
const BRANCH_UNTIL = "2026-12-31";
const BRANCH_ALLOW: ReadonlyArray<string> = [
  `src/features/admin-listings/listings-page.tsx::{mayReview && reportsQuery.error && ( | a notice per table row would report the one failed read once for every row; it needs one table-level notice | ${BRANCH_UNTIL}`,
  `src/features/posting/map/map-pin-dropper.tsx::{state === "failed" && ( | an action's refusal drawn in the posting family's words (INC-1341), which the notice's kinds cannot word | ${BRANCH_UNTIL}`,
  `src/features/posting/step-photos.tsx::{item.state === "failed" && item.reading == null && item.file !== null && ( | the Retry control of a failed upload, not a failure sentence: the row's refusal is drawn above it | ${BRANCH_UNTIL}`,
  `src/features/posting/step-specifications.tsx::{held.state === "failed" && ( | a held options read that carries a state and a rate flag, no error: the notice needs a reading it can be handed | ${BRANCH_UNTIL}`,
  `src/features/posting/step-where.tsx::{pinState === "failed" && ( | the pin line's own action failure, a saved state with no error to hand the notice; its words and test id are asserted by the place step's tests | ${BRANCH_UNTIL}`,
  `src/features/posting/step-where.tsx::{(dirState === "failed" || dirState === "rateLimited") && ( | the directions line's own action failure and the dial's words by the family (draftRateText), asserted by the place step's tests | ${BRANCH_UNTIL}`,
  `src/features/posting/step-where.tsx::{(noteState === "failed" || noteState === "rateLimited") && ( | the location details line's own action failure and the dial's words by the family (draftRateText), asserted by the place step's tests | ${BRANCH_UNTIL}`,
];
const branchAllowed = new Map(
  BRANCH_ALLOW.map((line) => {
    const [key = "", reason = "", until = ""] = line.split(" | ").map((cell) => cell.trim());
    return [key, { reason, until }] as const;
  }),
);

const allowed = new Map(
  ALLOW.map((line) => {
    const [path = "", reason = "", until = ""] = line.split("|").map((s) => s.trim());
    return [path, { reason, until }] as const;
  }),
);

describe("failure notice census (DEC-464)", () => {
  it("FNC-1 a planted bypass trips every rule", () => {
    expect(trips("const x = q.isError ? <p>{t('a')}</p> : null")).toContain(
      "branch-without-notice",
    );
    expect(trips("<p>{failure.class} {failure.status}</p>")[0]).toMatch(/^raw/);
    expect(trips("<p>{error.message}</p>")[0]).toMatch(/^raw/);
    expect(trips('<DataTable error={q.error} errorState="x" />')).toContain(
      "datatable-without-retry",
    );
    expect(trips("<StatCard failed={q.isError} />")).toContain("statcard-without-retry");
    expect(trips("<DataTable error={q.error} retry={q.refetch} />")).toEqual([]);
    expect(trips("<StatCard failed={q.isError} onRetry={r} />")).toContain(
      "statcard-without-error",
    );
    expect(trips("<StatCard failed={q.isError} error={q.error} onRetry={r} />")).toEqual([]);
    expect(trips('return detail === "" ? code : `${code} — ${detail}`;')[0]).toMatch(/^raw/);
    expect(trips("<p data-failure={failure.class}>x</p>")).toEqual([]);
    expect(trips("<p>{errorText(e)}</p>")[0]).toMatch(/^raw/);
    expect(trips("console.warn(`[shell] failed: ${errorText(e)}`);")).toEqual([]);
    expect(trips("const x = q.isError;\n<FieldSelect read={r} />")).toEqual([]);
    expect(trips('q.isError ? <p>{t("a")}</p> : null\n<FieldSelect id="x" />')).toContain(
      "branch-without-notice",
    );
  });

  const files = walkFiles(ROOTS, { ext: ["tsx"], skipTests: true }).map((p) =>
    relative(process.cwd(), p),
  );

  it("FNC-2 every failure render goes through the notice", () => {
    const bad = files
      .map((path) => ({ path, why: trips(readFileSync(path, "utf8")) }))
      .filter((f) => f.why.length > 0 && !allowed.has(f.path))
      .map((f) => `${f.path}: ${f.why.join(", ")}`);
    expect(bad).toEqual([]);
  });

  it("FNC-3 every allowlist line names a file that still trips", () => {
    const stale = [...allowed.keys()].filter(
      (path) => !files.includes(path) || trips(readFileSync(path, "utf8")).length === 0,
    );
    expect(stale).toEqual([]);
  });

  // INC-1338 — the place step's two branches as they stood before UF-1 (3c9086dc0:
  // src/features/posting/step-where.tsx lines 1572 and 1629), with the notice drawn elsewhere in the
  // same file, so the file-level census passes it.
  const BASE_WHERE = [
    "          markets.isLoading ? (",
    '            <p className="text-sm text-muted-foreground">{t("post.where.marketLoading")}</p>',
    "          ) : markets.failed ? (",
    '            <p className="text-sm text-destructive" data-testid="post-where-market-error">',
    '              {t("post.where.marketFailed")}',
    "            </p>",
    "          ) : (",
    "            <NativeSelect />",
    "          )",
    "      {tree.isLoading && (",
    '        <p className="text-sm text-muted-foreground">{t("post.where.treeLoading")}</p>',
    "      )}",
    "      {tree.failed && (",
    '        <p className="text-sm text-destructive" data-testid="post-where-tree-error">',
    '          {t("post.where.treeFailed")}',
    "        </p>",
    "      )}",
    '<FailureNotice error={e} testid="elsewhere" />',
  ].join("\n");

  it("FNC-4 a branch that draws a failure without the notice is a hit, even in a file that draws the notice elsewhere", () => {
    expect(trips(BASE_WHERE)).toEqual([]);
    expect(branchHits(BASE_WHERE)).toEqual([
      { line: 3, code: ") : markets.failed ? (" },
      { line: 13, code: "{tree.failed && (" },
    ]);
    // Quiet: the notice inside the branch, a local component that draws it, a negated flag (the
    // success branch), a branch that draws nothing, a flag that is only compared or logged.
    const quiet = [
      '{q.failed && (\n  <FailureNotice error={q.error} testid="a" />\n)}',
      'function Wrapped() {\n  return <FailureNotice error={null} testid="w" />;\n}\n{q.error && (\n  <Wrapped />\n)}',
      '{!query.isLoading && !query.error && rows.length === 0 ? (\n  <p>{t("a")}</p>\n) : null}',
      "const src = q.error ? undefined : <Picture />;",
      "{src !== null && !failed ? (\n  <img />\n) : null}",
      'if (q.error) console.error("x", q.error);',
    ];
    for (const text of quiet) expect(branchHits(text), text).toEqual([]);
    // A single-line branch and a state test are hits too.
    expect(branchHits('{q.isError ? <p>{t("a")}</p> : null}')).toHaveLength(1);
    expect(branchHits('{phase === "failed" && (\n  <p>{t("a")}</p>\n)}')).toHaveLength(1);
  });

  const branchFiles = walkFiles(ROOTS, { ext: ["tsx"], skipTests: true }).map((p) =>
    relative(process.cwd(), p),
  );
  const foundBranches = branchFiles.flatMap((path) =>
    branchHits(readFileSync(path, "utf8")).map((hit) => ({ ...hit, key: `${path}::${hit.code}` })),
  );

  it("FNC-4b every branch that draws a failure draws it through the notice, or a live line names it", () => {
    const bad = foundBranches
      .filter((hit) => !branchAllowed.has(hit.key))
      .map((hit) => `${hit.key} (line ${hit.line})`);
    expect(bad).toEqual([]);
  });

  it("FNC-4c every branch allowance still names a branch, and is dated no later than 2026-12-31 and not past", () => {
    const keys = new Set(foundBranches.map((hit) => hit.key));
    const today = new Date().toISOString().slice(0, 10);
    const problems = [...branchAllowed.entries()].flatMap(([key, { reason, until }]) => [
      ...(keys.has(key) ? [] : [`${key}: stale (no branch matches)`]),
      ...(reason === "" ? [`${key}: no reason`] : []),
      ...(/^\d{4}-\d{2}-\d{2}$/.test(until) && until <= BRANCH_UNTIL && until >= today
        ? []
        : [`${key}: until "${until}" is not a live date up to ${BRANCH_UNTIL}`]),
    ]);
    expect(problems).toEqual([]);
  });
});
