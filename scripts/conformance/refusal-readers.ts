import { codeOf } from "./kit";
import type { LastDeclaration } from "./migration-reader";

/**
 * F1-7d (CF-REFUSAL-1, CF-REFUSAL-2) — A REFUSAL IS READ ONE WAY. A door's
 * refusal arrives as `code[:detail]`; the one reader is `splitRefusal`
 * (src/lib/refusal.ts, src/lib/refusal-split.ts) and the one status table is
 * `door_refusal_status`, mirrored by `refusalStatus` (src/lib/reader-failure.ts).
 *
 * CF-REFUSAL-1 names every other reading of a refusal's text in src/: its
 * whole text (`message`, `errorText(…)`) compared with a code or matched for a
 * code or sentence; a refusal's text (`message`, `reason`, `detail`,
 * `refusal`, `errorText(…)`) split at its colon by hand; a regex literal whose
 * code head is followed by its colon. By definition the census reads a
 * refusal's text only. Not refusals, and not read: a provider's error words
 * (mfa-service.ts reads the auth provider's sentence, never a door's code); a
 * Postgres constraint's snake_case name in a database error (draft.ts); a
 * compare with a literal that is no code (a code opens lower-case: the
 * server's `HTTPError`); a structured answer's `reason` field; a permission
 * slug, an event-stream line, an option token, a stored place key or a cookie
 * shape split or matched at their colons.
 */

export type Finding = { file: string; line: number; what: string };

/** The mechanism's own files: the one place a refusal's colon is read by hand. */
export const REFUSAL_MECHANISM = ["src/lib/refusal.ts", "src/lib/refusal-split.ts"];

// A whole text: `message` (never `typeof message`) or `errorText(…)`, optionally trimmed.
// A text to split: `message`, `reason`, `detail`, `refusal` or `errorText(…)`.
const READINGS: ReadonlyArray<{ pattern: RegExp; what: string }> = [
  {
    pattern:
      /(?:(?<!\btypeof\s+)\bmessage\b\??|\berrorText\([^()]*\))(?:\.trim\(\))?\s*[!=]==\s*["'`][a-z]/,
    what: "compares a refusal's whole text with a code",
  },
  {
    pattern:
      /(?:(?<!\btypeof\s+)\bmessage\b\??|\berrorText\([^()]*\))(?:\.trim\(\))?\.(?:includes|startsWith|endsWith)\(\s*(?!["'`][a-z0-9]+(?:_[a-z0-9]+)+["'`])/,
    what: "matches a code or sentence inside a refusal's text",
  },
  {
    pattern:
      /(?:\b(?:message|reason|detail|refusal)\b\??|\berrorText\([^()]*\))(?:\.trim\(\))?\.(?:split|indexOf)\(\s*["']:["']\s*\)/,
    what: "splits a refusal's text at its colon by hand",
  },
  {
    pattern: /\/\^\(?(?:\?:)?(?:\[a-z\]\[A-Za-z\]\*|[a-z][A-Za-z|]*)\)?\(\?::/,
    what: "reads a code followed by its colon with a regex literal",
  },
];

/** CF-REFUSAL-1 — every hand reading of a refusal's text in `files` (repo-relative paths). */
export function refusalReadingFindings(
  files: ReadonlyArray<{ file: string; text: string }>,
): Finding[] {
  const findings: Finding[] = [];
  for (const { file, text } of files) {
    if (REFUSAL_MECHANISM.includes(file)) continue;
    codeOf(text)
      .split("\n")
      .forEach((line, index) => {
        const reading = READINGS.find(({ pattern }) => pattern.test(line));
        if (reading !== undefined) findings.push({ file, line: index + 1, what: reading.what });
      });
  }
  return findings;
}

/** The client's mirror: `REFUSAL_STATUS`'s rows and `refusalStatus`'s fallback, read from source. */
export function mirrorOf(source: string): { rows: Map<string, number>; fallback?: number } {
  const code = codeOf(source);
  const table = /REFUSAL_STATUS\b[^=]*=\s*\{([^}]*)\}/.exec(code)?.[1] ?? "";
  const rows = new Map(
    [...table.matchAll(/([A-Za-z]+)\s*:\s*(\d{3})/g)].map(
      (match) => [match[1] ?? "", Number(match[2])] as const,
    ),
  );
  const fallback = /ownValue\(REFUSAL_STATUS,[^)]*\)\s*\?\?\s*(\d{3})/.exec(code)?.[1];
  return { rows, ...(fallback === undefined ? {} : { fallback: Number(fallback) }) };
}

/** The database's table: `door_refusal_status`'s WHEN rows and ELSE, from its last declaration. */
export function tableOf(declaration: Pick<LastDeclaration, "body">): {
  rows: Map<string, number>;
  fallback?: number;
} {
  const rows = new Map(
    [...declaration.body.matchAll(/WHEN\s+'([A-Za-z]+)'\s+THEN\s+'(\d{3})'/g)].map(
      (match) => [match[1] ?? "", Number(match[2])] as const,
    ),
  );
  const fallback = /ELSE\s+'(\d{3})'/.exec(declaration.body)?.[1];
  return { rows, ...(fallback === undefined ? {} : { fallback: Number(fallback) }) };
}

/** CF-REFUSAL-2 — the mirror and the table differ in either direction (a row, a status, the fallback). */
export function statusDrift(
  mirror: ReturnType<typeof mirrorOf>,
  table: ReturnType<typeof tableOf>,
): string[] {
  const drift: string[] = [];
  for (const [code, status] of table.rows) {
    const mine = mirror.rows.get(code);
    if (mine === undefined && status !== mirror.fallback)
      drift.push(`${code}: the table answers ${status}, the mirror has no row`);
    else if (mine !== undefined && mine !== status)
      drift.push(`${code}: the table answers ${status}, the mirror ${mine}`);
  }
  for (const [code, status] of mirror.rows) {
    if (!table.rows.has(code))
      drift.push(`${code}: the mirror answers ${status}, the table has no row`);
  }
  if (mirror.fallback === undefined || mirror.fallback !== table.fallback)
    drift.push(`fallback: the table answers ${table.fallback}, the mirror ${mirror.fallback}`);
  return drift;
}
