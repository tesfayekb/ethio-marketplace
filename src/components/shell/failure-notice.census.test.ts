import { readFileSync } from "node:fs";
import { relative } from "node:path";

import { describe, expect, it } from "vitest";

import { walkFiles } from "../../../scripts/conformance/kit";

/**
 * DEC-464 / INC-1279 — THE FAILURE NOTICE'S CENSUS. Every `.tsx` under src/features,
 * src/routes and src/components that draws a query's or an action's failure draws it through
 * `<FailureNotice` (failure-notice.tsx) or a shared outlet that does (DataTable with `retry=`,
 * StatCard `failed` with `onRetry=`, DetailPanel / ChartFrame `error=` with `onRetry=`). A
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
  /\{\s*errorText\(/,
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
  if (FAILURE_BRANCH.test(text) && !OUTLET.test(text)) why.push("branch-without-notice");
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

const UNTIL_10B = "INC-1279 until bundle 10b";
const ALLOW: ReadonlyArray<string> = [
  // EXCLUDED (Cursor bundle 6's folders)
  `src/features/admin-attributes/attribute-dialogs.tsx | excluded | ${UNTIL_10B}`,
  `src/features/auth/mfa/staff-factor-gate.tsx | excluded | ${UNTIL_10B}`,
  `src/routes/settings.tsx | excluded | ${UNTIL_10B}`,
  `src/components/app-shell.tsx | excluded | ${UNTIL_10B}`,
  // LEFT (ruling 1 decision 9 / not a reader)
  `src/routes/auth.tsx | excluded (auth) | ${UNTIL_10B}`,
  `src/features/admin/import-dialog.tsx | a code with no words drawn as data (INC-1280) | INC-1280 until bundle 7`,
  `src/features/posting/step-photos.tsx | a photo's action refusal (ruling 1 decision 9) | ${UNTIL_10B}`,
  `src/features/posting/photo-editor.tsx | the editor's action refusal (ruling 1 decision 9) | ${UNTIL_10B}`,
  `src/components/ui/picture.tsx | an image's fallback, not a read | INC-1279 permanent`,
  `src/routes/dev.primitives.tsx | the board's demonstration states | INC-1279 permanent`,
];

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
});
