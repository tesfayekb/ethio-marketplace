import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { errorText } from "../../src/lib/error-text";
import { readAllowlist } from "./kit";
import { COMPUTED_BY_HAND, sqlCodeOf, type LastDeclaration } from "./migration-reader";

/**
 * N1b-2c (INC-977, R6) and DEC-359 — A SELLER'S NAME REACHES ANYONE WHO IS NOT
 * ITS OWNER OR STAFF ONLY THROUGH THE ONE HELPER. The two columns that carry a
 * public name are profiles.seller_alias and alias_history.alias. Only the two
 * helpers (seller_public_alias, seller_public_previous_alias) may read them
 * unexcused; every other reader is a line in seller-names-allowlist.txt
 * (`function | reason | until`; stale or expired lines fail).
 *
 * The law has two halves (DEC-359):
 * - the file census (seller-names.test.ts SPA-10a) judges every readable last
 *   declaration the migration reader answers; a computed body (INC-1083) is
 *   printed with its reason, and its line is judged live, never stale there;
 * - the live judge (this file, the smoke lane after the door guard) judges every
 *   live body of schema public, computed ones included:
 *
 *   bun scripts/conformance/seller-names.ts --live-query    prints LIVE_QUERY for the workflow's psql
 *   bun scripts/conformance/seller-names.ts --live <tsv>    judges the live bodies (LIVE_QUERY's answer)
 *   SELF_TEST=1 bun scripts/conformance/seller-names.ts     the planted rows only
 *
 * Every mode but --live-query runs the self-test FIRST, in the same process,
 * and judges nothing until it passes (DEC-334's form).
 */

export const HELPERS = new Set(["seller_public_alias", "seller_public_previous_alias"]);
const READS = [/\bseller_alias\b/, /\balias_history\b/];

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
export const ALLOWLIST = join(ROOT, "scripts", "conformance", "seller-names-allowlist.txt");

export type Finding = { file: string; line: number; what: string };

/** A body (comments already removed) reads a seller-name column. */
export function readsName(body: string): boolean {
  return READS.some((re) => re.test(body));
}

/** The file census's readers: each readable last declaration that reads a name column, helpers aside. */
export function nameReaders(last: Map<string, LastDeclaration>): Finding[] {
  const found: Finding[] = [];
  for (const [name, { file, body, computed }] of last)
    if (computed !== true && !HELPERS.has(name) && readsName(body))
      found.push({ file: basename(file), line: 1, what: name });
  return found;
}

/** Each computed function's line: its name and why the file census cannot read its body. */
export function computedLines(last: Map<string, LastDeclaration>): string[] {
  return [...last]
    .filter(([, { computed }]) => computed === true)
    .map(
      ([name, { file }]) =>
        `${name} — ${COMPUTED_BY_HAND[name]?.reason ?? `built by a format() template in ${basename(file)}`}`,
    );
}

/**
 * The file census's allowances: a line excuses a finding; a computed function's
 * line is judged live, so it is never stale on the file side.
 */
export function fileAllowances(
  findings: Finding[],
  last: Map<string, LastDeclaration>,
  path = ALLOWLIST,
): Set<string> {
  const computed = [...last].filter(([, d]) => d.computed === true).map(([name]) => name);
  return new Set(readAllowlist(path, [...findings.map((f) => f.what), ...computed]).keys());
}

/**
 * The one query the smoke lane runs (DEC-310's form: live names stay in
 * RUNNER_TEMP), printed as it is by `--live-query` — one literal, never text
 * code assembles (INC-1070). One row per function of schema public that no
 * extension owns: its name, and its body as UTF-8 hex (one line whatever it
 * holds); comments are stripped on this side, by the reader's own sqlCodeOf.
 */
export const LIVE_QUERY = `select p.proname, encode(convert_to(p.prosrc, 'UTF8'), 'hex')
from pg_proc p
where p.pronamespace = 'public'::regnamespace and p.prokind = 'f'
  and not exists (select 1 from pg_depend d where d.classid = 'pg_proc'::regclass and d.objid = p.oid and d.deptype = 'e')
order by 1, 2;
`;

/** The bodies of a LIVE_QUERY answer, by name (overloads kept); a malformed row is an error. */
export function liveBodies(tsv: string): Map<string, string[]> {
  const bodies = new Map<string, string[]>();
  tsv.split(/\r?\n/).forEach((line, index) => {
    if (line.trim() === "") return;
    const cells = line.split("\t");
    const [name, hex] = cells;
    if (
      cells.length !== 2 ||
      name === undefined ||
      hex === undefined ||
      !/^[a-z_][a-z0-9_]*$/.test(name) ||
      !/^(?:[0-9a-f]{2})*$/.test(hex)
    )
      throw new Error(`seller-names live: row ${index + 1} is malformed`);
    const body = sqlCodeOf(Buffer.from(hex, "hex").toString("utf8"));
    bodies.set(name, [...(bodies.get(name) ?? []), body]);
  });
  return bodies;
}

/** The live readers: each live function, helpers aside, any of whose bodies reads a name column. */
export function liveReaders(bodies: Map<string, string[]>): string[] {
  return [...bodies]
    .filter(([name, list]) => !HELPERS.has(name) && list.some(readsName))
    .map(([name]) => name)
    .sort();
}

/** The live judgement: the unexcused readers (kit throws on a stale or expired line). */
export function judgeLive(tsv: string, path = ALLOWLIST): { readers: string[]; open: string[] } {
  const found = liveReaders(liveBodies(tsv));
  const allowed = readAllowlist(path, found);
  return { readers: found, open: found.filter((name) => !allowed.has(name)) };
}

const hexOf = (text: string) => Buffer.from(text, "utf8").toString("hex");
const PLANTED_ROWS = [
  ["seller_public_alias", hexOf("SELECT seller_alias FROM public.profiles WHERE user_id = p")],
  ["e2e_planted_quiet", hexOf("BEGIN\n  -- seller_alias in a comment only\n  RETURN 1;\nEND")],
  ["e2e_planted_name", hexOf("BEGIN\n  RETURN (SELECT seller_alias FROM public.profiles);\nEND")],
]
  .map((row) => row.join("\t"))
  .join("\n");
const PLANTED_LINE = "e2e_planted_name | planted owner door | 2099-12-31\n";
const PLANTED_GONE = "e2e_planted_gone | planted line for a function not live | 2099-12-31\n";

/** The self-test's failures: each planted case that did not answer as it must. */
export function selfTest(): string[] {
  const failures: string[] = [];
  const dir = mkdtempSync(join(tmpdir(), "seller-names-self-test-"));
  try {
    const allowlist = (text: string) => {
      const path = join(dir, `allowlist-${failures.length}-${text.length}.txt`);
      writeFileSync(path, text);
      return path;
    };
    /** The open readers of a planted judgement, or the error it threw. */
    const judged = (text: string): string => {
      try {
        return judgeLive(PLANTED_ROWS, allowlist(text)).open.join(", ");
      } catch (error) {
        return `error: ${errorText(error)}`;
      }
    };
    const bare = judged("");
    if (bare !== "e2e_planted_name")
      failures.push(`a live reader with no line answered [${bare}], not one finding`);
    const excused = judged(PLANTED_LINE);
    if (excused !== "") failures.push(`a live reader with its line answered [${excused}]`);
    if (!judged(PLANTED_LINE + PLANTED_GONE).includes("stale allowance"))
      failures.push("a line for a function not live was not stale");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
  return failures;
}

if (process.argv[1] !== undefined && fileURLToPath(import.meta.url) === process.argv[1]) {
  const [mode, path] = process.argv.slice(2);
  if (mode === "--live-query") {
    process.stdout.write(LIVE_QUERY);
    process.exit(0);
  }
  const proof = selfTest();
  if (proof.length > 0) {
    for (const line of proof) console.error(`seller-names self-test FAILED: ${line}`);
    console.error("seller-names: the judge did not prove itself, so it judged nothing (DEC-334)");
    process.exit(1);
  }
  console.log(
    "seller-names self-test OK: an unexcused live reader fired, an excused one did not, a line for a function not live was stale",
  );
  if (process.env["SELF_TEST"] === "1") process.exit(0);
  if (mode !== "--live" || path === undefined)
    throw new Error("seller-names: use --live <tsv>, --live-query, or SELF_TEST=1");
  const { readers, open } = judgeLive(readFileSync(path, "utf8"));
  if (open.length > 0) {
    for (const name of open)
      console.error(
        `seller-names live FAIL: ${name} reads a seller-name column and is neither a helper nor allowlisted`,
      );
    process.exit(1);
  }
  console.log(
    `seller-names live OK: ${readers.length} live readers, each excused by seller-names-allowlist.txt`,
  );
}
