import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { codeOf, report, TREE_SCAN_MS, walkFiles } from "./kit";
import { lastDeclarations } from "./migration-reader";
import {
  computedLines,
  fileAllowances,
  HELPERS,
  judgeLive,
  liveBodies,
  LIVE_QUERY,
  nameReaders,
  readsName,
  selfTest,
  type Finding,
} from "./seller-names";

/**
 * N1b-2c (INC-977, R6) — A SELLER'S NAME REACHES ANYONE WHO IS NOT ITS OWNER OR
 * STAFF ONLY THROUGH THE ONE HELPER (the law and its allowlist: seller-names.ts).
 * The file census reads the migration reader's LATEST definition of every public
 * function and names each readable body that reads either name column; a body
 * built at run time is computed (INC-1083), printed with its reason, and its
 * allowlist line is judged live by seller-names.ts --live on the smoke lane
 * (DEC-359). Server code (src/server, src/routes) that names either column is a
 * finding with no allowlist: the server reads names through the doors.
 */
export function serverNameReads(entries: Array<{ file: string; text: string }>): Finding[] {
  return entries
    .filter(({ text }) => readsName(codeOf(text)))
    .map(({ file }) => ({ file, line: 1, what: "names a seller-name column" }));
}

const last = lastDeclarations(process.cwd());
const findings = nameReaders(last);

const temps: string[] = [];
afterEach(() => {
  while (temps.length) rmSync(temps.pop() as string, { recursive: true, force: true });
});

/** A tree of migrations under a temporary root. */
function tree(files: Array<{ file: string; text: string }>): string {
  const root = mkdtempSync(join(tmpdir(), "seller-names-"));
  temps.push(root);
  mkdirSync(join(root, "supabase", "migrations"), { recursive: true });
  for (const { file, text } of files)
    writeFileSync(join(root, "supabase", "migrations", file), text);
  return root;
}

describe("a seller's name reaches the public only through the helper (INC-977)", () => {
  it(
    "SPA-10a every function reading a name column is a helper or an allowlisted owner, staff or internal door",
    () => {
      for (const helper of HELPERS) expect(last.has(helper)).toBe(true);
      const allowed = fileAllowances(findings, last);
      const open = findings.filter((f) => !allowed.has(f.what));
      for (const line of computedLines(last))
        console.log(`[SPA-10a] computed, judged live: ${line}`);
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
    expect(report(nameReaders(lastDeclarations(tree(planted), {})))).toBe(
      [
        "29990101000000_planted.sql:1 e2e_planted_name",
        "29990101000000_planted.sql:1 e2e_planted_prev",
      ].join("\n"),
    );
    // A later redeclaration that stops reading the column clears its finding; a
    // template's body is computed: printed with its reason, never judged.
    const fixed = [
      ...planted,
      {
        file: "29990101000001_fixed.sql",
        text:
          "CREATE OR REPLACE FUNCTION public.e2e_planted_name(p uuid) RETURNS text LANGUAGE sql AS $$ SELECT public.seller_public_alias(p) $$;\n" +
          "DO $t$ BEGIN EXECUTE format('CREATE OR REPLACE FUNCTION public.%I(p uuid) RETURNS text LANGUAGE sql AS $b$%s$b$', 'e2e_planted_prev', 'SELECT 1'); END $t$;",
      },
    ];
    const fixedLast = lastDeclarations(tree(fixed), {});
    expect(report(nameReaders(fixedLast))).toBe("");
    expect(computedLines(fixedLast)).toEqual([
      "e2e_planted_prev — built by a format() template in 29990101000001_fixed.sql",
    ]);
    // A computed function's line is judged live, never stale on the file side; a
    // readable function's line that excuses nothing is stale.
    const lines = tree([]);
    const computedLine = join(lines, "computed.txt");
    writeFileSync(computedLine, "e2e_planted_prev | planted owner door | 2099-12-31\n");
    expect([...fileAllowances(nameReaders(fixedLast), fixedLast, computedLine)]).toEqual([
      "e2e_planted_prev",
    ]);
    const readableLine = join(lines, "readable.txt");
    writeFileSync(readableLine, "e2e_planted_name | planted owner door | 2099-12-31\n");
    expect(() => fileAllowances(nameReaders(fixedLast), fixedLast, readableLine)).toThrow(
      "stale allowance",
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

  it("SPA-10d the live judge proves itself, reads hex bodies with comments stripped, and refuses a malformed row (DEC-359)", () => {
    expect(selfTest()).toEqual([]);
    const hex = (text: string) => Buffer.from(text, "utf8").toString("hex");
    const tsv = [
      `e2e_planted_twice\t${hex("SELECT 1")}`,
      `e2e_planted_twice\t${hex("SELECT a.alias FROM public.alias_history a")}`,
      `e2e_planted_quiet\t${hex("/* seller_alias */ SELECT 'x' -- alias_history\n")}`,
      `seller_public_previous_alias\t${hex("SELECT alias FROM public.alias_history")}`,
    ].join("\n");
    expect([...liveBodies(tsv).keys()]).toEqual([
      "e2e_planted_twice",
      "e2e_planted_quiet",
      "seller_public_previous_alias",
    ]);
    const lines = tree([]);
    const allowlist = join(lines, "allowlist.txt");
    writeFileSync(allowlist, "");
    expect(judgeLive(tsv, allowlist)).toEqual({
      readers: ["e2e_planted_twice"],
      open: ["e2e_planted_twice"],
    });
    expect(() => liveBodies("e2e_planted\tnot-hex")).toThrow("row 1 is malformed");
    expect(() => liveBodies("e2e_planted")).toThrow("row 1 is malformed");
    expect(LIVE_QUERY).toContain("encode(convert_to(p.prosrc, 'UTF8'), 'hex')");
    expect(LIVE_QUERY).toContain("p.pronamespace = 'public'::regnamespace");
  });
});
