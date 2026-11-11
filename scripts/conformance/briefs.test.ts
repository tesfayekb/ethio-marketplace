import { spawnSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { afterAll, describe, expect, it } from "vitest";
import {
  allowanceFindings,
  asReported,
  assertFindings,
  baseFindings,
  censusFindings,
  citedLineFindings,
  escapeRegExp,
  citedPathFindings,
  countCommandRefusal,
  countFindings,
  type Finding,
  freeIdFindings,
  keyOf,
  optionFindings,
  scopeFindings,
  stopRuleFindings,
  templateKeys,
  textFindings,
  titleFindings,
  treeFindings,
} from "../brief/go-laws";
import { briefInForce } from "../ci/laws-changed";
import { readAllowlist, report } from "./kit";

/**
 * DEC-361 (housekeeping turn 1), housekeeping turn 2 (ruling 1, D324) — a GO obeys the brief laws
 * by a script, not by the supervisor's eye. The laws live in scripts/brief/go-laws.ts, one function
 * each; this test and scripts/brief/check-go.ts are their two callers.
 * - On the brief roadmap line 3 names and its rulings (`<stem>-ruling-<n>.md` beside it; older
 *   briefs were written under earlier laws), the TEXT laws: CF-BRIEF-1 the base line (the brief's;
 *   a ruling's base is its branch's), CF-BRIEF-2 no absolute stop rule, CF-BRIEF-3 a SCOPE by area or
 *   with each file's test, CF-BRIEF-11 a dictated commit title of at most 72 characters,
 *   CF-BRIEF-13 the allowlist keyed only to the brief in force and its rulings, CF-BRIEF-15 the
 *   brief's STEP 1 or its rulings answer every `CENSUS-ITEM` of docs/governance/go-template.md (the
 *   one exception: a title that says RECORDS TURN or RULES TURN; a template with no item fails).
 * - The TREE laws (CF-BRIEF-5 cited path, 6 cited line, 7 free id, 8 option, 9 assert, 10 count)
 *   judge a GO against the tree it was written for — the supervisor's clone before sending, the
 *   executor's tree at STEP 0 — so they run through check-go.ts on a named root, not here on a
 *   tree the turn itself changes.
 * - CF-BRIEF-4 and CF-BRIEF-14 are the self-tests: a planted brief fails each law by name (every
 *   law's code, the tree laws on a planted tree in a scratch directory, and check-go.ts spawned on
 *   it), and a clean one passes all.
 * Allowlist: briefs-allowlist.txt, `<file>:<line> <text> | reason | until`.
 */

const BRIEFS = "docs/governance/briefs";
const ALLOWLIST = "scripts/conformance/briefs-allowlist.txt";
const TEMPLATE = "docs/governance/go-template.md";

/** The brief in force and its rulings, read from the tree. */
function inForce(): { brief: string; rulings: string[] } {
  const brief = briefInForce(readFileSync("roadmap.md", "utf8"));
  if (brief === null) throw new Error("roadmap.md line 3 names no brief in force");
  if (!existsSync(brief)) throw new Error(`the brief in force ${brief} is not in the tree`);
  const stem = brief.slice(`${BRIEFS}/`.length).replace(/\.md$/, "");
  const rulings = readdirSync(BRIEFS)
    .filter((name) => new RegExp(`^${stem}-ruling-\\d+\\.md$`).test(name))
    .map((name) => `${BRIEFS}/${name}`)
    .sort();
  return { brief, rulings };
}

const lawsOf = (findings: Finding[]) => [...new Set(findings.map((f) => f.law))].sort();

describe("a GO obeys the brief laws by a script (DEC-361)", () => {
  it("CF-BRIEF-1 the brief in force carries its `Base: dev <sha>` line", () => {
    const { brief } = inForce();
    expect(report(asReported(baseFindings(readFileSync(brief, "utf8"), brief)))).toBe("");
  });

  it("CF-BRIEF-2, CF-BRIEF-3, CF-BRIEF-11 and CF-BRIEF-15 the brief and its rulings: no absolute stop rule, a SCOPE by area or with each file's test, titles that fit, every census item answered", () => {
    const { brief, rulings } = inForce();
    const findings: Finding[] = [];
    for (const file of [brief, ...rulings]) {
      const text = readFileSync(file, "utf8");
      findings.push(...textFindings(text, file).filter((f) => f.law !== "CF-BRIEF-1"));
    }
    const keys = templateKeys(readFileSync(TEMPLATE, "utf8"));
    expect(new Set(keys).size, "the template's census items are unique").toBe(keys.length);
    expect(keys).toContain("definition");
    const answers = rulings.map((file) => ({ file, text: readFileSync(file, "utf8") }));
    findings.push(...censusFindings(readFileSync(brief, "utf8"), brief, answers, keys));
    const allowances = readAllowlist(ALLOWLIST, findings.map(keyOf));
    console.log(`[briefs] read ${1 + rulings.length} files, findings: ${findings.length}`);
    expect(report(asReported(findings.filter((f) => !allowances.has(keyOf(f)))))).toBe("");
  });

  it("CF-BRIEF-13 the allowlist holds no line keyed to a brief other than the one in force", () => {
    const { brief, rulings } = inForce();
    const findings = allowanceFindings(readFileSync(ALLOWLIST, "utf8"), ALLOWLIST, [
      brief,
      ...rulings,
    ]);
    expect(report(asReported(findings))).toBe("");
  });

  it("CF-BRIEF-4 a planted stop rule and a bare single-file SCOPE fail; a quotation, a negation and areas pass", () => {
    const planted = [
      "PLANTED — a brief. Base: dev 2b11a9d29",
      "",
      "Any red is a STOP.",
      "",
      "SCOPE: src/lib/x.ts, src/lib/y.ts",
      "",
      "The planted `Any red is a STOP.` still fails the law.",
    ].join("\n");
    expect(baseFindings(planted, "planted.md")).toEqual([]);
    expect(stopRuleFindings(planted, "planted.md")).toEqual([
      { law: "CF-BRIEF-2", file: "planted.md", line: 3, text: "any red" },
    ]);
    expect(stopRuleFindings(planted, "planted.md").map((f) => f.line)).not.toContain(7);
    expect(scopeFindings(planted, "planted.md")).toEqual([
      {
        law: "CF-BRIEF-3",
        file: "planted.md",
        line: 5,
        text: "SCOPE names src/lib/x.ts without its test",
      },
      {
        law: "CF-BRIEF-3",
        file: "planted.md",
        line: 5,
        text: "SCOPE names src/lib/y.ts without its test",
      },
    ]);
    expect(baseFindings("no base here", "planted.md")).toHaveLength(1);
    const allowedForms = [
      'A fixture with "any red is a STOP" fails the law.',
      "A fixture with “Any red is a STOP” fails the law.",
      "A rule that any red is a STOP is never written.",
      "Zero failures is the goal. A defect is a STOP.",
      "",
      "SCOPE: `src/lib/` (each file's tests), `src/features/**/*.tsx`, src/lib/z.ts and src/lib/z.test.ts, e2e/helpers/h.ts with e2e/a.spec.ts, docs/x.md, package.json",
    ].join("\n");
    expect(stopRuleFindings(allowedForms, "forms.md")).toEqual([]);
    expect(scopeFindings(allowedForms, "forms.md")).toEqual([]);
  });

  describe("CF-BRIEF-14 every law fails a planted brief by name and passes a clean one", () => {
    const root = mkdtempSync(join(tmpdir(), "go-laws-"));
    const write = (path: string, text: string) => {
      mkdirSync(dirname(join(root, path)), { recursive: true });
      writeFileSync(join(root, path), text);
    };
    write("AGENTS.md", "planted\n");
    write("roadmap.md", "planted\n");
    write(
      "src/alpha.ts",
      [
        "// alpha",
        "export function alpha() {",
        ...Array.from({ length: 8 }, (_, i) => `  // filler ${i + 1}`),
        "}",
        "",
      ].join("\n"),
    );
    write("e2e/used.spec.ts", "// TCK-7 is used here\n");
    write(
      "scripts/types.d.ts",
      [
        "export interface Opts {",
        "  /** @deprecated use fresh */",
        "  stale?: boolean;",
        "  fresh?: boolean;",
        "}",
        "",
      ].join("\n"),
    );
    write("scripts/conformance/briefs-allowlist.txt", "# planted header\n");
    write(
      "docs/governance/go-template.md",
      "<!-- CENSUS-ITEM: consumers -->\n<!-- CENSUS-ITEM: premises -->\n",
    );
    const clean = [
      "CLEAN — a planted GO. Base: dev 2b11a9d29",
      "",
      "SCOPE: `src/` (each file's tests)",
      "",
      "STEP 1 — the census: the consumers and the premises.",
      "The function `alpha` at `src/alpha.ts` :2 is read; `src/alpha.ts` exists; `src/beta.ts` is new.",
      "A new id CF-PLANT-9 is free; the tolerance is two lines.",
      "OPTION: fresh in scripts/types.d.ts",
      "ASSERT-PRESENT: `export function alpha` in src/alpha.ts",
      "ASSERT-ABSENT: `function beta` in src",
      "COUNT: 1 := `find src -type f | wc -l`",
      "Commit `planted: task saved`.",
      "",
    ].join("\n");
    const planted = [
      "PLANTED — a planted GO with no base line.",
      "Any red is a STOP.",
      "",
      "SCOPE: src/lib/x.ts",
      "",
      "STEP 1 — the census: the consumers only.",
      "The cited `src/missing.ts` is read.",
      "The function `alpha` at `src/alpha.ts` :9 is read.",
      "A new id TCK-7 is free.",
      "OPTION: stale in scripts/types.d.ts",
      "ASSERT-PRESENT: `function beta` in src",
      "The turn touches 3 files.",
      "COUNT: 5 := `find src -type f | wc -l`",
      "COUNT: 1 := `ls src > out.txt`",
      "Commit `planted: a dictated commit title that runs well past the seventy-two characters kept`.",
      "",
    ].join("\n");
    write("briefs/clean.md", clean);
    write("briefs/planted.md", planted);
    afterAll(() => rmSync(root, { recursive: true, force: true }));

    it("each law's code finds its planted violation", () => {
      const f = "planted.md";
      expect(lawsOf(baseFindings(planted, f))).toEqual(["CF-BRIEF-1"]);
      expect(lawsOf(stopRuleFindings(planted, f))).toEqual(["CF-BRIEF-2"]);
      expect(lawsOf(scopeFindings(planted, f))).toEqual(["CF-BRIEF-3"]);
      expect(citedPathFindings(planted, f, root).map((x) => x.text)).toEqual([
        "cites src/missing.ts, not in the tree",
      ]);
      expect(citedLineFindings(planted, f, root).map((x) => x.text)).toEqual([
        'src/alpha.ts :9 holds "// filler 7", not alpha',
      ]);
      expect(freeIdFindings(planted, f, root).map((x) => x.text)).toEqual([
        "calls TCK-7 new or free; the tree already uses it",
      ]);
      expect(optionFindings(planted, f, root).map((x) => x.text)).toEqual([
        "names the option stale, @deprecated in scripts/types.d.ts",
      ]);
      expect(assertFindings(planted, f, root).map((x) => x.text)).toEqual([
        "ASSERT-PRESENT function beta is absent from src",
      ]);
      expect(countFindings(planted, f, root).map((x) => x.text)).toEqual([
        'a bare count "3 files" — write COUNT: <n> := <command>',
        "COUNT 5 := find src -type f | wc -l — prints 1",
        "COUNT 1 := ls src > out.txt — refused: carries a redirect, a chain or a substitution",
      ]);
      expect(existsSync(join(root, "out.txt"))).toBe(false);
      expect(lawsOf(titleFindings(planted, f))).toEqual(["CF-BRIEF-11"]);
      const keys = templateKeys(readFileSync(join(root, "docs/governance/go-template.md"), "utf8"));
      expect(keys).toEqual(["consumers", "premises"]);
      expect(censusFindings(planted, f, [], keys).map((x) => x.text)).toEqual([
        "STEP 1 does not name the census item premises",
      ]);
      expect(
        censusFindings(planted, f, [{ file: "r.md", text: "CENSUS-ITEM premises: covered" }], keys),
      ).toEqual([]);
      expect(censusFindings(planted, f, [], []).map((x) => x.text)).toEqual([
        "the GO template marks no census item",
      ]);
      expect(censusFindings(`RECORDS TURN R1 — planted\n${planted}`, f, [], keys)).toEqual([]);
      expect(
        allowanceFindings("# header\nbriefs/old.md:3 any red | planted | INC-1\n", "allow.txt", [
          "briefs/planted.md",
        ]).map((x) => x.text),
      ).toEqual(["keyed to briefs/old.md, not the brief in force or its rulings"]);
    });

    it("the clean fixture passes every law", () => {
      const f = "clean.md";
      expect(textFindings(clean, f)).toEqual([]);
      expect(treeFindings(clean, f, root)).toEqual([]);
      expect(censusFindings(clean, f, [], ["consumers", "premises"])).toEqual([]);
      expect(
        allowanceFindings("# header\nbriefs/clean.md:3 any red | planted | INC-1\n", "allow.txt", [
          "briefs/clean.md",
        ]),
      ).toEqual([]);
    });

    it("a root that is not a tree fails every tree law, never a silent pass", () => {
      const bare = mkdtempSync(join(tmpdir(), "go-laws-bare-"));
      try {
        expect(lawsOf(treeFindings(clean, "clean.md", bare))).toEqual([
          "CF-BRIEF-10",
          "CF-BRIEF-5",
          "CF-BRIEF-6",
          "CF-BRIEF-7",
          "CF-BRIEF-8",
          "CF-BRIEF-9",
        ]);
      } finally {
        rmSync(bare, { recursive: true, force: true });
      }
    });

    it("a cited name enters a pattern as itself: every metacharacter, the backslash included", () => {
      const name = String.raw`a\b.c$d(e)`;
      const rx = new RegExp(`^${escapeRegExp(name)}$`);
      expect(rx.test(name)).toBe(true);
      expect(rx.test(String.raw`a\bxc$d(e)`)).toBe(false);
      expect(rx.test("ab.c$d(e)")).toBe(false);
    });

    it("a COUNT command carrying a write is refused; a read-only pipe runs", () => {
      for (const command of [
        "ls > x",
        "rm -f x",
        "mv a b",
        "cp a b",
        "git push origin x",
        "git checkout x",
        "curl example.com",
        "sed -i s/a/b/ x",
        "find . -delete",
        "rg a; touch x",
        `python3 -c "open('x', 'w')"`,
        `bun -e "Bun.write('x', '')"`,
        "touch x",
      ])
        expect(countCommandRefusal(command), command).not.toBeNull();
      for (const command of [
        'rg -n "^async function asPerson" e2e | wc -l',
        "git ls-files | wc -l",
        "git show HEAD:package.json | head -n 1",
        `python3 -c "print(1)"`,
        "find src -type f | sort | uniq | cut -c1-3 | tail -n 1",
      ])
        expect(countCommandRefusal(command), command).toBeNull();
    });

    it("check-go.ts runs the same laws: the planted brief exits 1 naming each, the clean one exits 0", () => {
      const run = (file: string) =>
        spawnSync("bun", ["scripts/brief/check-go.ts", join(root, file), "--root", root], {
          encoding: "utf8",
          timeout: 60_000,
        });
      const red = run("briefs/planted.md");
      expect(red.status, red.stderr).toBe(1);
      const named = [...red.stdout.matchAll(/^(CF-BRIEF-\d+) /gm)].map((m) => m[1]);
      expect([...new Set(named)].sort()).toEqual([
        "CF-BRIEF-1",
        "CF-BRIEF-10",
        "CF-BRIEF-11",
        "CF-BRIEF-15",
        "CF-BRIEF-2",
        "CF-BRIEF-3",
        "CF-BRIEF-5",
        "CF-BRIEF-6",
        "CF-BRIEF-7",
        "CF-BRIEF-8",
        "CF-BRIEF-9",
      ]);
      const green = run("briefs/clean.md");
      expect(green.status, green.stdout).toBe(0);
      expect(green.stdout).toContain("[check-go] no finding");
    }, 60_000);
  });
});
