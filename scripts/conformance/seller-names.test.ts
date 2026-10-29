import { readFileSync } from "node:fs";
import { basename } from "node:path";
import { describe, expect, it } from "vitest";
import { codeOf, readAllowlist, report, TREE_SCAN_MS, walkFiles } from "./kit";

/**
 * N1b-2c (INC-977, R6) — A SELLER'S NAME REACHES ANYONE WHO IS NOT ITS OWNER OR
 * STAFF ONLY THROUGH THE ONE HELPER. The two columns that carry a public name are
 * profiles.seller_alias and alias_history.alias. The census reads the LATEST
 * definition of every public function in supabase/migrations (comments stripped)
 * and names each body that reads either column. Only the two helpers
 * (seller_public_alias, seller_public_previous_alias) may, unexcused. Every other one
 * — an owner door, a staff door, an internal judge that answers no name — is a line
 * in seller-names-allowlist.txt (`function | reason | until`); a stale or expired
 * line fails. Server code (src/server, src/routes) that names either column is a
 * finding with no allowlist: the server reads names through the doors.
 */
type Finding = { file: string; line: number; what: string };
const HELPERS = new Set(["seller_public_alias", "seller_public_previous_alias"]);
const READS = [/\bseller_alias\b/, /\balias_history\b/];
const ALLOWLIST = "scripts/conformance/seller-names-allowlist.txt";

/** The latest body of each function, by name, over files in order. */
export function latestBodies(
  files: Array<{ file: string; text: string }>,
): Map<string, { file: string; body: string }> {
  const out = new Map<string, { file: string; body: string }>();
  const head =
    /CREATE\s+(?:OR\s+REPLACE\s+)?FUNCTION\s+(?:public\.)?"?(\w+)"?\s*\([\s\S]*?\bAS\s+(\$\w*\$)([\s\S]*?)\2/gi;
  for (const { file, text } of files)
    for (const m of text.matchAll(head))
      out.set(m[1], { file, body: m[3].replace(/--[^\n]*/g, "") });
  return out;
}

export function nameReaders(bodies: Map<string, { file: string; body: string }>): Finding[] {
  const found: Finding[] = [];
  for (const [name, { file, body }] of bodies)
    if (!HELPERS.has(name) && READS.some((re) => re.test(body)))
      found.push({ file: basename(file), line: 1, what: name });
  return found;
}

export function serverNameReads(entries: Array<{ file: string; text: string }>): Finding[] {
  return entries
    .filter(({ text }) => READS.some((re) => re.test(codeOf(text))))
    .map(({ file }) => ({ file, line: 1, what: "names a seller-name column" }));
}

const migrations = walkFiles(["supabase/migrations"], { ext: ["sql"] })
  .sort()
  .map((file) => ({ file, text: readFileSync(file, "utf8") }));
const bodies = latestBodies(migrations);
const findings = nameReaders(bodies);

describe("a seller's name reaches the public only through the helper (INC-977)", () => {
  it(
    "SPA-10a every function reading a name column is a helper or an allowlisted owner, staff or internal door",
    () => {
      for (const helper of HELPERS) expect(bodies.has(helper)).toBe(true);
      const allowed = readAllowlist(
        ALLOWLIST,
        findings.map((f) => f.what),
      );
      const open = findings.filter((f) => !allowed.has(f.what));
      console.log(`[SPA-10a] readers: ${findings.length}, allowlisted: ${allowed.size}`);
      expect(report(open)).toBe("");
    },
    TREE_SCAN_MS,
  );

  it(
    "SPA-10b no server file names a seller-name column",
    () => {
      const entries = walkFiles(["src/server", "src/routes"], {
        ext: ["ts", "tsx"],
        skipTests: true,
      }).map((file) => ({ file, text: readFileSync(file, "utf8") }));
      expect(report(serverNameReads(entries))).toBe("");
    },
    TREE_SCAN_MS,
  );

  it("SPA-10c the census refuses a planted public reader and a planted server read", () => {
    const planted = [
      {
        file: "29990101000000_planted.sql",
        text: "CREATE OR REPLACE FUNCTION public.e2e_planted_name(p uuid) RETURNS text LANGUAGE sql AS $f$ SELECT seller_alias FROM public.profiles WHERE user_id = p $f$;\nCREATE OR REPLACE FUNCTION public.e2e_planted_prev(p uuid) RETURNS text LANGUAGE sql AS $$ SELECT alias FROM public.alias_history WHERE user_id = p $$;\nCREATE OR REPLACE FUNCTION public.e2e_planted_quiet() RETURNS int LANGUAGE sql AS $$ -- seller_alias in a comment only\n SELECT 1 $$;\nCREATE OR REPLACE FUNCTION public.seller_public_alias(p uuid) RETURNS text LANGUAGE sql AS $$ SELECT seller_alias FROM public.profiles $$;",
      },
    ];
    expect(report(nameReaders(latestBodies(planted)))).toBe(
      [
        "29990101000000_planted.sql:1 e2e_planted_name",
        "29990101000000_planted.sql:1 e2e_planted_prev",
      ].join("\n"),
    );
    // A later redeclaration that stops reading the column clears its finding.
    const fixed = [
      ...planted,
      {
        file: "29990101000001_fixed.sql",
        text: "CREATE OR REPLACE FUNCTION public.e2e_planted_name(p uuid) RETURNS text LANGUAGE sql AS $$ SELECT public.seller_public_alias(p) $$;",
      },
    ];
    expect(report(nameReaders(latestBodies(fixed)))).toBe(
      "29990101000000_planted.sql:1 e2e_planted_prev",
    );
    expect(
      report(
        serverNameReads([
          {
            file: "src/server/planted.ts",
            text: 'await db.from("profiles").select("seller_alias");',
          },
          {
            file: "src/server/quiet.ts",
            text: "// seller_alias in a comment only\nexport const x = 1;",
          },
        ]),
      ),
    ).toBe("src/server/planted.ts:1 names a seller-name column");
  });
});
