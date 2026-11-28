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

/** INC-1347 — a boolean in an outlet's `error=`: a literal, `x ? true : …`, `… : true`, `!!x`, `Boolean(x)`. */
const BOOLEAN_ERROR =
  /\berror=\{\s*(?:true|false|!!|Boolean\(|[^{}]*\?\s*(?:true|false)\b|[^{}]*:\s*(?:true|false)\s*\})/;

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
  // INC-1347 — an outlet handed `true` (or `x ? true : undefined`) as its failure loses the
  // failure's class: the notice cannot tell a refusal from a server fault. It takes the read's error.
  for (const tag of ["DataTable", "StatCard", "DetailPanel", "ChartFrame", "FailureNotice"])
    for (const b of block(text, tag)) if (BOOLEAN_ERROR.test(b)) why.push(`${tag}-boolean-error`);
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
/**
 * INC-1349 (cursor-bundle-8c-3a) — A FAILURE FLAG BY ITS BARE OR DESTRUCTURED NAME: `if (error) {`,
 * `) : error ? (`, `error &&`, `isError ? (`, `failed ? (` — the member form (`q.error`) is
 * FAILURE_BRANCH's. A `??` is no branch, and `!error` is removed before the line is read.
 */
export const BARE_BRANCH =
  /\bif\s*\(\s*(?:error|isError|failed)\s*\)|(?<![.\w])(?:error|isError|failed)\s*(?:\?(?!\?)|&&)/;
/**
 * INC-1349 — A FAILURE WORD: a catalogue key whose last segment is `error`, or ends in `Error`,
 * `Failed` or `failed` (`admin.roles.error`, `post.where.marketFailed`). A branch whose span draws
 * one is a failure branch whatever its condition is called (`line === null`, `phase`, `problem`).
 */
export const FAILURE_WORD =
  /\bt\((?:[^()]|\([^()]*\))*["'`](?:[\w-]+\.)+(?:error|\w*Error|\w*Failed|\w*failed)["'`]/;
/** A line that opens a conditional render or a conditional return: the place a renamed flag sits. */
const OPENS_BRANCH = /(?:\?(?!\?)|&&)\s*(?:[(<]|$)|\bif\s*\(.*\)\s*\{\s*$|:\s*\(\s*$/;
/** An element opened in JSX: `<p`, `<span`, `<Thing` — never a comparison (`a < b`) or a type. */
const ELEMENT = /(?<![\w)\]])<([a-z][\w-]*|[A-Z]\w*)(?=[\s>/])/g;
/**
 * A control is not a sentence: a span that opens only controls (the Retry of a failed upload)
 * draws no failure's words, so it is no failure branch — a rule, not a line (INC-1351).
 */
const CONTROL = new Set([
  "button",
  "Button",
  "a",
  "Link",
  "input",
  "Input",
  "select",
  "NativeSelect",
]);
/** True when the span opens an element that is not a control. */
function drawsSentence(span: string): boolean {
  for (const m of span.matchAll(ELEMENT)) if (!CONTROL.has(m[1] ?? "")) return true;
  return false;
}
/** A flag the line negates: removed before the line is read, so only a failure branch is left. */
const NEGATED = /!\s*[\w.?[\]]+/g;

/**
 * A refusal is drawn through its family's words (`refusalText`, `draftRefusalText`, `rateText`,
 * `draftRateText`, `*RefusalKey`, `*Refusal(`): the refusal is kept and worded by the family that
 * owns its codes, which the notice's kinds cannot word (INC-1341, INC-1351). Not a failure branch.
 * A failed on-demand download offers `refreshPage` (INC-911): the browser keeps a failed download
 * for the page's life, so a refresh is its one next step, which the notice's Retry cannot be.
 */
const FAMILY_WORDS =
  /\b(?:\w*[rR]efusalText|\w*[rR]ateText|\w*RefusalKey|\w*Refusal)\(|\brefreshPage\b/;

/** A FieldSelect handed its read draws the one notice itself (field-select.tsx), as `trips` reads it. */
const SELECT_READ = /<FieldSelect\b[^]*?\bread=/;

/**
 * A branch's own lines: the lines of a branch nested inside it are left out, so a failure word
 * drawn by an inner branch is judged on the inner branch's line (it is a branch of its own), not
 * charged to every conditional that wraps it.
 */
function ownText(span: string[]): string {
  const width = (line: string) => (/^\s*/.exec(line)?.[0] ?? "").length;
  const first = span[0] ?? "";
  const own = [first];
  for (let at = 1; at < span.length; at += 1) {
    const line = span[at] ?? "";
    if (!OPENS_BRANCH.test(line) || width(line) <= width(first)) {
      own.push(line);
      continue;
    }
    const inner = width(line);
    at += 1;
    while (at < span.length && (span[at]?.trim() === "" || width(span[at] ?? "") > inner)) at += 1;
    // The line that closes the inner branch (`)}`) is left out with it. A closer that opens the
    // next segment of the chain (`) : error ? (`, `) : (`) is an inner branch too, and any other
    // line at that depth is the outer branch's own: both are read again.
    const last = span[at] ?? "";
    const closes = width(last) === inner && /^\s*(?:\)|\}|\]|<\/|\/>)/.test(last);
    if (!closes || OPENS_BRANCH.test(last)) at -= 1;
  }
  return own.join("\n");
}

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
    const byFlag =
      (BRANCH_LINE.test(read) || BARE_BRANCH.test(read)) && !/\?\s*(?:undefined|null)\b/.test(read);
    const byWord = OPENS_BRANCH.test(code);
    if (!byFlag && !byWord) return;
    const indent = (/^\s*/.exec(code)?.[0] ?? "").length;
    let end = at + 1;
    while (end < lines.length) {
      const next = lines[end] ?? "";
      if (next.trim() !== "" && (/^\s*/.exec(next)?.[0] ?? "").length <= indent) break;
      end += 1;
    }
    const closer = (lines[end] ?? "").trim();
    const spanLines = lines.slice(at, /^(?:\)|\}|\]|<\/|\/>)/.test(closer) ? end + 1 : end);
    const span = spanLines.join("\n");
    const failure = byFlag || FAILURE_WORD.test(ownText(spanLines));
    // A flag that IS the words (`{error ? <p>{t(error)}</p> : null}`, `{error}`) holds a refusal
    // already worded by its family, not a failure to read: the words are drawn as they were given.
    const flag = /(?<![.\w])(error|errorKey|failed|isError)\b/.exec(read)?.[1];
    const worded =
      flag !== undefined &&
      new RegExp(`\\{\\s*(?:t\\(\\s*)?${flag}\\b(?!\\s*[.!=<>?&|])`).test(span.replace(code, ""));
    if (
      failure &&
      !worded &&
      drawsSentence(span) &&
      !FAMILY_WORDS.test(span) &&
      !OUTLET.test(span) &&
      !SELECT_READ.test(span) &&
      !outlets.some((outlet) => outlet.test(span))
    )
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
 * until`; `until` is an ISO date no later than 2026-12-31, or `permanent` when the reason names the
 * decision (DEC-n or INC-n) that makes the line right; a line that no longer matches a branch, or whose
 * date has passed, fails.
 */
const BRANCH_UNTIL = "2026-12-31";
const BRANCH_ALLOW: ReadonlyArray<string> = [
  `src/components/shell/stat-card.tsx::if (failed && error === undefined) { | the tile's own fallback for a failure handed with no error stays, under DEC-464; every app caller hands its error and FNC-6b judges that (Cursor 8c-3a ruling 1, decision 2.1) | permanent`,
  `src/features/account/saved-page.tsx::{failed.has(card.id) && ( | INC-1280 and DEC-503: the Remove's words come from its door family through savedRemoveKey, read in the handler (Cursor 8c-3a ruling 1, decision 2.2) | permanent`,
  `src/features/ad-page/share-ad-dialog.tsx::{status !== null && ( | DEC-503: a clipboard failure is a device's failure, not an answer from our server, and keeps its own words (Cursor 8c-3a ruling 1, decision 2.3) | permanent`,
  `src/features/admin-attributes/components/attribute-link-cells.tsx::) : states[cell] === "error" ? ( | DEC-333 and DEC-503: each cell's words come from ATTRIBUTE_REFUSALS through useAttributeRefusal().fail, read in the dialog's runCell (Cursor 8c-3a ruling 1, decision 2.4) | permanent`,
  `src/features/posting/step-review.tsx::{failed && ( | DEC-503: the flag is set only by the unreachable class; refusals are drawn through draftRefusalKey and signed-out has its own branch (Cursor 8c-3a ruling 1, decision 2.7) | permanent`,
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
      // INC-911 — a failed download whose one next step is a page refresh.
      '{phoneLibFailed && (\n  <p>\n    {t("post.who.phoneLibFailed")}\n    <Button onClick={refreshPage} />\n  </p>\n)}',
    ];
    for (const text of quiet) expect(branchHits(text), text).toEqual([]);
    // A single-line branch and a state test are hits too.
    expect(branchHits('{q.isError ? <p>{t("a")}</p> : null}')).toHaveLength(1);
    expect(branchHits('{phase === "failed" && (\n  <p>{t("a")}</p>\n)}')).toHaveLength(1);
  });

  // INC-1349 — the three branches the census did not see, as they stood at f61239565 (each in a
  // file that draws the notice elsewhere, or draws it nowhere): `if (error) {` on a destructured
  // flag (role-detail.tsx lines 38 to 45), `) : error ? (` (user-detail.tsx lines 98 to 103) and
  // `{line === null ? (` on a renamed flag that draws a failure word (job-line.tsx lines 97 to 101).
  const BASE_ROLE_DETAIL = [
    "  if (error) {",
    "    return (",
    "      <PageCard>",
    '        <p role="alert" className="text-sm text-destructive">',
    '          {t("admin.roles.error")}',
    "        </p>",
    "      </PageCard>",
    "    );",
    "  }",
  ].join("\n");
  const BASE_USER_DETAIL = [
    "        ) : error ? (",
    '          <PageCard testid="user-detail-error">',
    '            <p role="alert" className="text-sm text-destructive">',
    '              {t("admin.users.error")}',
    "            </p>",
    "          </PageCard>",
    "        ) : (",
  ].join("\n");
  const BASE_JOB_LINE = [
    '      <span className="font-medium">{t("admin.screening.job.title")}</span>',
    "      {line === null ? (",
    '        <span role="alert" className="text-destructive">',
    '          {t("admin.screening.job.error")}',
    "        </span>",
    "      ) : (",
    '        <span className="min-w-0 break-words">{sentence(line)}</span>',
    "      )}",
  ].join("\n");

  it("FNC-5 a failure branch is seen by its bare flag, and by the failure word it draws, whatever its condition is called", () => {
    expect(branchHits(BASE_ROLE_DETAIL)).toEqual([{ line: 1, code: "if (error) {" }]);
    expect(branchHits(BASE_USER_DETAIL)).toEqual([{ line: 1, code: ") : error ? (" }]);
    expect(branchHits(BASE_JOB_LINE)).toEqual([{ line: 2, code: "{line === null ? (" }]);
    // The same three with the notice drawn inside the branch are quiet.
    const notice = '<FailureNotice error={e} testid="x" onRetry={r} />';
    expect(branchHits(`if (error) {\n  return ${notice};\n}`)).toEqual([]);
    expect(branchHits(`) : error ? (\n  ${notice}\n) : (`)).toEqual([]);
    expect(
      branchHits(`{line === null ? (\n  <FailureNotice error={e} testid="x" />\n) : (`),
    ).toEqual([]);
    // Bare flags in one line, the word under a name that says nothing, a word as a key.
    expect(branchHits('{isError ? <p>{t("a")}</p> : null}')).toHaveLength(1);
    expect(branchHits('{failed && (\n  <p>{t("a")}</p>\n)}')).toHaveLength(1);
    expect(
      branchHits('{phase === "x" ? (\n  <p>{t("a.b.marketFailed")}</p>\n) : null}'),
    ).toHaveLength(1);
    // Quiet: a word that is not a failure's (`.errorTitle`, `.saved`), a control with no sentence
    // (the Retry of a failed upload), a negated bare flag, a `??`, a line that draws nothing.
    const quiet = [
      '{ready ? (\n  <p>{t("a.b.saved")}</p>\n) : null}',
      '{ready ? (\n  <p>{t("a.b.errorTitle")}</p>\n) : null}',
      '{item.state === "failed" && (\n  <button type="button">{t("post.photos.retry")}</button>\n)}',
      '{!error && (\n  <p>{t("a")}</p>\n)}',
      'const text = error ?? "x";',
      "const kept = error ? undefined : <Picture />;",
      'setNotice("a.b.failed");',
    ];
    for (const text of quiet) expect(branchHits(text), text).toEqual([]);
  });

  // INC-1347 — roles-list.tsx line 239 as it stood at b355cbe00 (`git show b355cbe00:src/features/
  // admin/roles/roles-list.tsx`, lines 178 and 239 to 251): a table handed `true` as its failure
  // loses the failure's class, so the notice cannot tell a refusal from a server fault.
  const BASE_ROLES_TABLE = [
    "      <DataTable<RoleSummary>",
    "        error={error ? true : undefined}",
    "        retry={retryFailed}",
    "        errorState={",
    '          <p role="alert" className="text-sm text-destructive">',
    '            {t("admin.roles.error")}',
    "          </p>",
    "        }",
    "      />",
  ].join("\n");

  it("FNC-6 a literal boolean handed to an outlet's error is a hit", () => {
    expect(trips(BASE_ROLES_TABLE)).toContain("DataTable-boolean-error");
    expect(trips('<DataTable error={true} retry={r} errorState="x" />')).toContain(
      "DataTable-boolean-error",
    );
    expect(trips("<DataTable error={q.error ? undefined : true} retry={r} />")).toContain(
      "DataTable-boolean-error",
    );
    expect(trips("<DetailPanel error={!!q.error} onRetry={r} />")).toContain(
      "DetailPanel-boolean-error",
    );
    expect(trips('<FailureNotice error={Boolean(e)} testid="x" />')).toContain(
      "FailureNotice-boolean-error",
    );
    // Quiet: the read's own error, or none.
    expect(trips("<DataTable error={q.error ?? undefined} retry={r} />")).toEqual([]);
    expect(trips("<DataTable error={q.error} retry={r} />")).toEqual([]);
    expect(trips('<FailureNotice error={e} testid="x" />')).toEqual([]);
  });

  // Cursor 8c-3a ruling 1 — a StatCard handed `failed` with no `error` is INC-1347's class too: the
  // tile cannot tell a refusal from a server fault. The dev board's tile as it stood at f61239565
  // (src/routes/dev.primitives.tsx lines 336 to 342) is the plant; an allowed file may not carry it
  // (the board's allowance is for its other states).
  const BASE_STAT_TILE = [
    "          <StatCard",
    '            label={"Pending ads"}',
    '            value={"0"}',
    "            failed",
    "            onRetry={() => {}}",
    '            testid="prim-stat-state-failed"',
    "          />",
  ].join("\n");

  it("FNC-6b a StatCard handed failed with no error is a hit, and no allowed file carries one", () => {
    expect(trips(BASE_STAT_TILE)).toContain("statcard-without-error");
    expect(trips(BASE_STAT_TILE.replace("failed\n", "failed\n            error={e}\n"))).toEqual(
      [],
    );
    const carrying = [...allowed.keys()].filter((path) =>
      trips(readFileSync(path, "utf8")).includes("statcard-without-error"),
    );
    expect(carrying).toEqual([]);
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
      ...(until === "permanent"
        ? /\b(?:DEC|INC)-\d+/.test(reason)
          ? []
          : [`${key}: a permanent line names no decision (DEC-n or INC-n)`]
        : /^\d{4}-\d{2}-\d{2}$/.test(until) && until <= BRANCH_UNTIL && until >= today
          ? []
          : [`${key}: until "${until}" is not a live date up to ${BRANCH_UNTIL}`]),
    ]);
    expect(problems).toEqual([]);
  });
});
