import { mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

/**
 * DEC-313 (Foundations turn CI-4, INC-1028; J1, G27) — CF-PROOF-KEY-1: A MIGRATION PROOF KEYS ITS
 * SCRATCH ROWS ON ITS OWN SCRATCH KEY. By definition, over every supabase/migrations/*.sql: inside a
 * `DO $tag$ … $tag$` block, an `INSERT INTO public.<table> (…) VALUES (…)` whose values carry
 * - "second": a variable the block declares as a bigint from `epoch FROM clock_timestamp()` or
 *   `epoch FROM now()` (the current second used as a key), or
 * - "fixed": a literal uuid beginning `00000000-` (a fixed key)
 * is a finding keyed `<file>:<table>:<second|fixed>`. Landed hits are lines in
 * migration-proof-keys-allowlist.txt (`key | reason | landed; G39`): landed files are never edited,
 * a new migration fixes a function, never a landed proof. A new file with such a proof fails; a
 * stale or duplicate line fails.
 */

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const MIGRATIONS = join(ROOT, "supabase", "migrations");
const ALLOWLIST = join(dirname(fileURLToPath(import.meta.url)), "migration-proof-keys-allowlist.txt");
const UNTIL = "landed; G39";

export function proofKeyFindings(file: string, text: string): string[] {
  const found = new Set<string>();
  for (const block of text.matchAll(/\bDO\s+(\$[A-Za-z_]*\$)([\s\S]*?)\1/gi)) {
    const body = block[2];
    const seconds = [
      ...body.matchAll(
        /\b(v_\w+)\s+bigint\s*:=\s*[^;]*epoch\s+from\s+(?:clock_timestamp|now)\(\)/gi,
      ),
    ].map((m) => m[1]);
    for (const insert of body.matchAll(
      /INSERT\s+INTO\s+public\.(\w+)\s*\([^)]*\)\s*VALUES\s*([\s\S]*?);/gi,
    )) {
      const [, table, values] = insert;
      if (seconds.some((v) => new RegExp(`\\b${v}\\b`).test(values)))
        found.add(`${file}:${table}:second`);
      if (/'0{8}-[0-9a-f-]{27}'/i.test(values)) found.add(`${file}:${table}:fixed`);
    }
  }
  return [...found];
}

export function readProofAllowlist(text: string, found: Set<string>): string[] {
  const problems: string[] = [];
  const seen = new Set<string>();
  text.split(/\r?\n/).forEach((line, index) => {
    if (!line.trim() || line.trim().startsWith("#")) return;
    const cells = line.split(" | ").map((c) => c.trim());
    const at = `line ${String(index + 1)}`;
    if (cells.length !== 3 || cells.some((c) => !c)) problems.push(`${at}: three cells`);
    else if (cells[2] !== UNTIL) problems.push(`${at}: until must be "${UNTIL}"`);
    else if (seen.has(cells[0])) problems.push(`${at}: duplicate ${cells[0]}`);
    else if (!found.has(cells[0])) problems.push(`${at}: stale ${cells[0]}`);
    seen.add(cells[0]);
  });
  for (const key of found) if (!seen.has(key)) problems.push(`unlisted ${key}`);
  return problems.sort();
}

function census(dir: string): Set<string> {
  const found = new Set<string>();
  for (const name of readdirSync(dir).filter((n) => n.endsWith(".sql")).sort())
    proofKeyFindings(name, readFileSync(join(dir, name), "utf8")).forEach((k) => found.add(k));
  return found;
}

const CLOCK = `DO $proof$
DECLARE v_now bigint := floor(extract(epoch FROM clock_timestamp()))::bigint;
BEGIN
  INSERT INTO public.job_runs(job, ts, outcome) VALUES ('name-check-catchup', v_now, 'dispatched');
  RAISE EXCEPTION 'rollback';
END $proof$;`;

describe("CF-PROOF-KEY-1 migration proofs key on their own scratch key (DEC-313)", () => {
  it("every landed hit is an allowlist line, and no line is stale", () => {
    const found = census(MIGRATIONS);
    expect(readProofAllowlist(readFileSync(ALLOWLIST, "utf8"), found)).toEqual([]);
  });

  it("PK-1 planted: a new proof keyed on the current second, or on a fixed uuid, fails", () => {
    const dir = mkdtempSync(join(tmpdir(), "proof-keys-"));
    try {
      writeFileSync(join(dir, "29990101000000_new.sql"), CLOCK);
      writeFileSync(
        join(dir, "29990101000001_fixed.sql"),
        `DO $p$ BEGIN INSERT INTO public.job_runs(id, job, outcome) VALUES ('00000000-0000-4000-8000-000000000001', 'x', 'ok'); END $p$;`,
      );
      writeFileSync(
        join(dir, "29990101000002_scratch.sql"),
        `DO $p$ DECLARE v_id uuid := gen_random_uuid(); BEGIN INSERT INTO public.job_runs(id, job, outcome) VALUES (v_id, 'x', 'ok'); END $p$;`,
      );
      const found = census(dir);
      expect([...found].sort()).toEqual([
        "29990101000000_new.sql:job_runs:second",
        "29990101000001_fixed.sql:job_runs:fixed",
      ]);
      expect(readProofAllowlist("", found)).toEqual([
        "unlisted 29990101000000_new.sql:job_runs:second",
        "unlisted 29990101000001_fixed.sql:job_runs:fixed",
      ]);
      expect(
        readProofAllowlist(
          "29990101000000_new.sql:job_runs:second | r | 2027-01-01\ngone.sql:t:fixed | r | landed; G39",
          new Set(["29990101000000_new.sql:job_runs:second"]),
        ),
      ).toEqual(['line 1: until must be "landed; G39"', "line 2: stale gone.sql:t:fixed"]);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
