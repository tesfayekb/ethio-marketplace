import { pattern as template } from "../lib/pattern";
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

/* ---------------------------------------------------------------------------------------------
 * DEC-429 — CF-REFUSAL-3 (a failed read is thrown as the typed failure) and CF-REFUSAL-4 (the
 * database holds the list of refusal codes; the client reads its mark).
 * ------------------------------------------------------------------------------------------- */

/** The mechanism's own file: the one place a typed failure is built from `readerFailure` by hand. */
export const FAILURE_MECHANISM = "src/lib/reader-failure.ts";

/** Where the client side ends: the server, the route handlers and the platform's own client. */
const NOT_CLIENT_SIDE = [/^src\/server\//, /^src\/routes\/api\//, /^src\/integrations\//];

/** The argument text of the call whose `(` is at `open`, balanced; the offset after its `)`. */
function argumentAt(code: string, open: number): string {
  let depth = 0;
  for (let at = open; at < code.length; at += 1) {
    const ch = code[at];
    if (ch === "(") depth += 1;
    else if (ch === ")") {
      depth -= 1;
      if (depth === 0) return code.slice(open + 1, at);
    }
  }
  return code.slice(open + 1);
}

/**
 * CF-REFUSAL-3 (CFRR-5) — on the client side (every file of `files` that is no test and is not
 * under src/server/, src/routes/api/ or src/integrations/): no thrown `new Error(…)` is built from
 * a failed call's `.message` or `errorText(…)`, as a bare argument or inside a template; no
 * `if (error) throw error;` re-throws a failed call's raw error (CF-REFUSAL-5, CFRR-9: inline, or the
 * last statement of the `if (error) { … }` block); and no
 * `new ReaderError(readerFailure(` stands outside `src/lib/reader-failure.ts`. A failed read is
 * thrown by `readFailed(error)`, the one factory.
 */
export function failureThrowFindings(
  files: ReadonlyArray<{ file: string; text: string }>,
): Finding[] {
  const findings: Finding[] = [];
  for (const { file, text } of files) {
    if (/\.test\.tsx?$/.test(file) || NOT_CLIENT_SIDE.some((side) => side.test(file))) continue;
    const code = codeOf(text);
    const lineOf = (offset: number) => code.slice(0, offset).split("\n").length;
    for (const match of code.matchAll(/\bthrow\s+new\s+Error\s*\(/g)) {
      const argument = argumentAt(code, (match.index ?? 0) + match[0].length - 1);
      if (/\.message\b|\berrorText\s*\(/.test(argument))
        findings.push({
          file,
          line: lineOf(match.index ?? 0),
          what: "throws a bare Error built from a failed call's message",
        });
    }
    // CF-REFUSAL-5 (CFRR-9) — the raw form: `if (error) throw error;`, inline or the last statement
    // of the block, re-throws a failed call's error as it arrived. The line is the throw's.
    for (const match of code.matchAll(/\bif\s*\(\s*error\s*\)\s*(?:\{[^{}]*)?\bthrow\s+error\s*;/g))
      findings.push({
        file,
        line: lineOf((match.index ?? 0) + match[0].lastIndexOf("throw")),
        what: "re-throws a failed call's raw error instead of readFailed(error)",
      });
    if (file === FAILURE_MECHANISM) continue;
    for (const match of code.matchAll(/\bnew\s+ReaderError\s*\(\s*readerFailure\s*\(/g))
      findings.push({
        file,
        line: lineOf(match.index ?? 0),
        what: "builds a typed failure by hand instead of readFailed(error)",
      });
  }
  return findings;
}

/** The mark the client reads: `const DOOR_MARK = "…"` in src/lib/reader-failure.ts. */
export function clientMarkOf(source: string): string | undefined {
  return /\bDOOR_MARK\s*=\s*"([^"]+)"/.exec(codeOf(source))?.[1];
}

/** The code `door_refuse` writes, per branch: the body's `code` (a reader) and the ERRCODE. */
export function refuseMarksOf(declaration: Pick<LastDeclaration, "body"> | undefined): {
  reader?: string;
  door?: string;
} {
  const body = declaration?.body ?? "";
  const reader = /jsonb_build_object\(\s*'code'\s*,\s*'([^']+)'/.exec(body)?.[1];
  const door = /ERRCODE\s*=\s*'([^']+)'/.exec(body)?.[1];
  return { ...(reader === undefined ? {} : { reader }), ...(door === undefined ? {} : { door }) };
}

/** CFRR-7 (a) — the client's mark differs from a branch of `door_refuse`'s last declaration. */
export function markDrift(
  client: string | undefined,
  refuse: ReturnType<typeof refuseMarksOf>,
): string[] {
  const drift: string[] = [];
  if (client === undefined) drift.push("the client has no DOOR_MARK");
  if (refuse.reader === undefined) drift.push("door_refuse writes no code in its reader branch");
  if (refuse.door === undefined) drift.push("door_refuse writes no ERRCODE in its door branch");
  if (client !== undefined && refuse.reader !== undefined && client !== refuse.reader)
    drift.push(`reader branch: door_refuse writes ${refuse.reader}, the client reads ${client}`);
  if (client !== undefined && refuse.door !== undefined && client !== refuse.door)
    drift.push(`door branch: door_refuse writes ${refuse.door}, the client reads ${client}`);
  return drift;
}

/** Every literal code the last declarations pass to `door_refuse(`, each with the functions that do. */
export function refusedCodesOf(
  declarations: ReadonlyMap<string, Pick<LastDeclaration, "body">>,
): Map<string, string[]> {
  const codes = new Map<string, string[]>();
  for (const [name, { body }] of declarations)
    for (const match of body.matchAll(/\bdoor_refuse\s*\(\s*'([^']*)'/g)) {
      const code = match[1] ?? "";
      codes.set(code, [...(codes.get(code) ?? []), name]);
    }
  return codes;
}

/** The names of one `const <NAME> = new Set([...])` of the reader's source. */
export function setOf(source: string, name: string): string[] {
  const body = template`\\bconst\\s+${name}\\s*=\\s*new\\s+Set\\(\\[([^\\]]*)\\]\\)`.exec(
    codeOf(source),
  )?.[1];
  return [...(body ?? "").matchAll(/"([^"]*)"/g)].map((match) => match[1] ?? "");
}

export const READER_SETS = [
  "GATE_AUTH_CODES",
  "GATE_REFUSED_CODES",
  "FALLBACK_REFUSED_CODES",
] as const;

/**
 * CFRR-7 (c) — every name in the reader's three sets and in its status table is a quoted literal
 * in some last declaration; the fallback set is inside the refused set.
 */
export function setDrift(
  source: string,
  declarations: ReadonlyMap<string, Pick<LastDeclaration, "body">>,
): string[] {
  const bodies = [...declarations.values()].map(({ body }) => body);
  const raised = (name: string) => bodies.some((body) => body.includes(`'${name}'`));
  const drift: string[] = [];
  for (const set of READER_SETS) {
    const names = setOf(source, set);
    if (names.length === 0) drift.push(`${set}: no names read`);
    for (const name of names)
      if (!raised(name)) drift.push(`${set}: ${name} is no literal in a last declaration`);
  }
  for (const name of mirrorOf(source).rows.keys())
    if (!raised(name)) drift.push(`REFUSAL_STATUS: ${name} is no literal in a last declaration`);
  const refused = new Set(setOf(source, "GATE_REFUSED_CODES"));
  for (const name of setOf(source, "FALLBACK_REFUSED_CODES"))
    if (!refused.has(name))
      drift.push(`FALLBACK_REFUSED_CODES: ${name} is not in GATE_REFUSED_CODES`);
  return drift;
}

/** The two codes a session refusal carries: the caller's session is ended, not the request refused. */
export const SESSION_CODES: ReadonlySet<string> = new Set(["notSignedIn", "accountDeactivated"]);

/**
 * CFRR-7 (b) — every literal code `door_refuse` is given, arriving marked (at its status, with a
 * detail, and with no status), is classed `auth` (the session codes) or `refused` (every other).
 * `read` is the client's own reading (`readerFailure(error).class`); `statusOf` the database's table.
 */
export function classDrift(
  codes: Iterable<string>,
  mark: string,
  statusOf: (code: string) => number,
  read: (error: unknown) => string,
): string[] {
  const drift: string[] = [];
  for (const code of codes) {
    const want = SESSION_CODES.has(code) ? "auth" : "refused";
    const arrivals: Array<[string, unknown]> = [
      ["at its status", { status: statusOf(code), code: mark, message: code }],
      ["at its status with a detail", { status: statusOf(code), code: mark, message: `${code}:x` }],
      ["with no status", { code: mark, message: code }],
    ];
    for (const [how, error] of arrivals) {
      const got = read(error);
      if (got !== want) drift.push(`${code} ${how}: read as ${got}, not ${want}`);
    }
  }
  return drift;
}

/* ---------------------------------------------------------------------------------------------
 * cursor-bundle-7a (INC-1287) — CF-REFUSAL-6: every refusal code has exactly one class.
 * ------------------------------------------------------------------------------------------- */

/** One line of the 400 register: a code, or a family prefix (`bad*`), and its reason. */
export type ClassLine = { key: string; family: boolean; reason: string; line: number };

/**
 * The 400 CLASS REGISTER (`scripts/conformance/refusal-classes.txt`): `code | reason`, a key ending in
 * `*` a family prefix. A class is not an exception, so no `until`; a malformed or duplicate line throws,
 * never silently skipped.
 */
export function readClassRegister(text: string): ClassLine[] {
  const lines: ClassLine[] = [];
  const seen = new Set<string>();
  text.split(/\r?\n/).forEach((content, index) => {
    if (!content.trim() || content.trim().startsWith("#")) return;
    const line = index + 1;
    const cells = content.split("|").map((cell) => cell.trim());
    const key = cells[0] ?? "";
    const family = key.endsWith("*");
    const head = family ? key.slice(0, -1) : key;
    if (cells.length !== 2 || cells.some((cell) => !cell) || !/^[a-z][A-Za-z]*$/.test(head))
      throw new Error(`refusal-classes.txt:${line} expected \`code | reason\`: ${content}`);
    if (seen.has(key)) throw new Error(`refusal-classes.txt:${line} duplicate key ${key}`);
    seen.add(key);
    lines.push({ key: head, family, reason: cells[1] ?? "", line });
  });
  return lines;
}

const covers = (line: ClassLine, code: string) =>
  line.family ? code.startsWith(line.key) : code === line.key;

/**
 * CF-REFUSAL-6 — a refusal code's class is one of: a row of `door_refusal_status`'s table (the gate's
 * 401, 403, 428, 429; GONE 404; CHANGED 409) or a line of the 400 register. Fails on a raised or
 * manifest-listed code in no class; a code in two classes (a table row and a register line, or two
 * register lines); a register line that matches no raised or listed code; a family line that covers a
 * code the table gives another status.
 */
export function classFindings(input: {
  raised: Iterable<string>;
  manifest: Iterable<string>;
  table: ReadonlyMap<string, number>;
  register: readonly ClassLine[];
}): string[] {
  const findings: string[] = [];
  const codes = [...new Set([...input.raised, ...input.manifest])].sort();
  for (const code of codes) {
    const lines = input.register.filter((line) => covers(line, code));
    const status = input.table.get(code);
    if (status === undefined && lines.length === 0) findings.push(`${code}: in no class`);
    if (status !== undefined && lines.length > 0)
      findings.push(
        `${code}: in two classes (the table answers ${status}, the register lists it at 400)`,
      );
    if (lines.length > 1)
      findings.push(
        `${code}: on two register lines (${lines.map((line) => line.key + (line.family ? "*" : "")).join(", ")})`,
      );
  }
  for (const line of input.register) {
    const name = line.key + (line.family ? "*" : "");
    if (!codes.some((code) => covers(line, code)))
      findings.push(`${name}: matches no raised or listed code`);
    if (line.family)
      for (const [code, status] of input.table)
        if ((status === 404 || status === 409) && covers(line, code))
          findings.push(`${name}: the family covers the ${status} code ${code}`);
  }
  return findings;
}
