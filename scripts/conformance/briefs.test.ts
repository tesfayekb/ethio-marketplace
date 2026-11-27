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
  citedPathFindings,
  countCommandRefusal,
  countFindings,
  type Finding,
  firstDownloadFindings,
  forbiddenScopeFindings,
  freeIdFindings,
  gateReachFindings,
  guardPathFindings,
  isTestId,
  keyOf,
  listReaderFindings,
  recordScopeFindings,
  newTestFindings,
  optionFindings,
  premiseSourceFindings,
  redFirstFindings,
  rulingFormFindings,
  scopeFindings,
  settingDecisionFindings,
  stopRuleFindings,
  templateKeys,
  textFindings,
  titleFindings,
  treeFindings,
  userCasesFindings,
} from "../brief/go-laws";
import { briefInForce } from "../ci/laws-changed";
import { pattern } from "../lib/pattern";
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
 *   one exception: a title that says RECORDS TURN or RULES TURN; a template with no item fails),
 *   CF-BRIEF-16 a SCOPE that names no path rule 00 forbids the executor (housekeeping turn 3c),
 *   CF-BRIEF-17 each ruling saved bare, its first line `RULING — …` (the pictures turn, ruling 2),
 *   CF-BRIEF-18 a setting named in a code span cites the newest decision the spec ledger records for
 *   it (the speed turn, ruling 1 item 6; it reads the ledger and the workflows, which the records
 *   turns alone change, so it runs here on the tree as well as through check-go.ts), CF-BRIEF-20 a
 *   cited allowlist or manifest under scripts/conformance/ comes with a cited test that reads it by
 *   name (the CI turn, S603; here on the turn's own tree, where a list the turn makes has its reader,
 *   and through check-go.ts), CF-BRIEF-19 each file under scripts/ that names an INC or DEC the
 *   brief's RECORDS fix or change lies inside its SCOPE, or the brief says why not (app-fixes ruling
 *   2, built by the CI turn's ruling 1 item 5).
 * - check-go.ts `--at <commit>` judges the tree laws on a snapshot of that commit; CF-BRIEF-14 plants
 *   a scratch repository whose working tree lost the cited line and the counted file.
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

  it("CF-BRIEF-2, CF-BRIEF-3, CF-BRIEF-11, CF-BRIEF-15, CF-BRIEF-16, CF-BRIEF-18, CF-BRIEF-19, CF-BRIEF-20, CF-BRIEF-21, CF-BRIEF-25 and CF-BRIEF-26 the brief and its rulings: no absolute stop rule, a SCOPE by area or with each file's test, titles that fit, every census item answered, no SCOPE path rule 00 forbids, each named setting's newest decision cited, each record's files inside SCOPE, each cited list's reader cited, the first-download tolerance in DEC-355's words, each premise's source, each fixed INC's red-first or control", () => {
    const { brief, rulings } = inForce();
    const findings: Finding[] = [];
    for (const file of [brief, ...rulings]) {
      const text = readFileSync(file, "utf8");
      findings.push(...textFindings(text, file).filter((f) => f.law !== "CF-BRIEF-1"));
      findings.push(...settingDecisionFindings(text, file, process.cwd()));
      const others = [brief, ...rulings].filter((other) => other !== file);
      findings.push(
        ...recordScopeFindings(
          text,
          file,
          process.cwd(),
          others.map((other) => readFileSync(other, "utf8")),
        ),
      );
      findings.push(...listReaderFindings(text, file, process.cwd()));
      findings.push(...firstDownloadFindings(text, file, process.cwd()));
      findings.push(...guardPathFindings(text, file, process.cwd()));
    }
    const keys = templateKeys(readFileSync(TEMPLATE, "utf8"));
    expect(new Set(keys).size, "the template's census items are unique").toBe(keys.length);
    expect(keys).toContain("definition");
    const answers = rulings.map((file) => ({ file, text: readFileSync(file, "utf8") }));
    findings.push(...censusFindings(readFileSync(brief, "utf8"), brief, answers, keys));
    findings.push(
      ...gateReachFindings(readFileSync(brief, "utf8"), brief, answers),
      ...userCasesFindings(readFileSync(brief, "utf8"), brief, answers),
      ...premiseSourceFindings(readFileSync(brief, "utf8"), brief),
      ...redFirstFindings(readFileSync(brief, "utf8"), brief),
    );
    const allowances = readAllowlist(ALLOWLIST, findings.map(keyOf));
    console.log(`[briefs] read ${1 + rulings.length} files, findings: ${findings.length}`);
    expect(report(asReported(findings.filter((f) => !allowances.has(keyOf(f)))))).toBe("");
  });

  it("CF-BRIEF-22 (BRIEF-22) a brief that gates through a mechanism answers gate-reach: named, never marked not applicable; a planted brief that does neither is named", () => {
    const gates = [
      "PLANTED — a GO. Base: dev 2b11a9d29",
      "",
      "The staff classes of `door_context` refuse a session that did not use its factor.",
      "",
      "STEP 1 — the census: the consumers.",
      "",
    ].join("\n");
    const named = gates.replace(
      "the consumers.",
      "the consumers; gate-reach — every sign-in it reaches.",
    );
    const f = "planted.md";
    expect(gateReachFindings(gates, f).map((x) => `${x.law} ${x.line}`)).toEqual(["CF-BRIEF-22 3"]);
    expect(gateReachFindings(named, f)).toEqual([]);
    expect(
      gateReachFindings(named, f, [
        { file: "r.md", text: "CENSUS-ITEM gate-reach: not applicable — nothing signs in" },
      ]).map((x) => x.law),
    ).toEqual(["CF-BRIEF-22"]);
    expect(
      gateReachFindings(gates, f, [
        { file: "r.md", text: "CENSUS-ITEM gate-reach: covered — the table below" },
      ]),
      "a ruling that answers the item satisfies it",
    ).toEqual([]);
    expect(
      gateReachFindings("PLANTED — a GO. Base: dev 2b11a9d29\n\nA door lists its rows.\n", f),
      "a brief that adds no gate is not read",
    ).toEqual([]);
  });

  it("CF-BRIEF-23 (BRIEF-23) a brief whose SCOPE names a route or component answers user-cases; a planted brief that does not is named", () => {
    const scoped = (area: string, step: string) =>
      [
        "PLANTED — a GO. Base: dev 2b11a9d29",
        "",
        `SCOPE: ${area} (each file's tests)`,
        "",
        `STEP 1 — the census: ${step}`,
        "",
      ].join("\n");
    const f = "planted.md";
    expect(
      userCasesFindings(scoped("`src/features/auth/`", "the consumers."), f).map(
        (x) => `${x.law} ${x.line}`,
      ),
    ).toEqual(["CF-BRIEF-23 3"]);
    expect(
      userCasesFindings(scoped("`src/routes/`", "the consumers; user-cases — each case."), f),
    ).toEqual([]);
    expect(
      userCasesFindings(scoped("`src/components/`", "the consumers."), f, [
        { file: "r.md", text: "CENSUS-ITEM user-cases: not applicable — a rename" },
      ]).map((x) => x.law),
    ).toEqual(["CF-BRIEF-23"]);
    expect(
      userCasesFindings(scoped("`scripts/ci/`, `supabase/`", "the consumers."), f),
      "a SCOPE with no route or component is not read",
    ).toEqual([]);
  });

  it("CF-BRIEF-24 (BRIEF-24) a CONFORMANCE GUARD names a path that exists at the base or is marked (new); a guard without a path, or a path that is neither, is named", () => {
    const f = "planted.md";
    const root = process.cwd();
    const guard = (line: string) =>
      `PLANTED — a GO. Base: dev 2b11a9d29\n\nCONFORMANCE GUARD: ${line}\n`;
    expect(guardPathFindings(guard("a unit census, no path."), f, root).map((x) => x.text)).toEqual(
      ["the CONFORMANCE GUARD names no path"],
    );
    expect(
      guardPathFindings(
        guard("`scripts/conformance/nothing-here.test.ts` plants it."),
        f,
        root,
      ).map((x) => x.text),
    ).toEqual([
      "the CONFORMANCE GUARD names scripts/conformance/nothing-here.test.ts, which the base does not hold and the line does not mark (new)",
    ]);
    expect(
      guardPathFindings(
        guard(
          "`scripts/conformance/briefs.test.ts` (exists); `scripts/conformance/nothing-here.test.ts` (new).",
        ),
        f,
        root,
      ),
    ).toEqual([]);
    expect(guardPathFindings("no guard line here\n", f, root)).toEqual([]);
  });

  it("CF-BRIEF-25 (S822) every premise of STEP 1 names its SOURCE: or OPEN:; a planted premise with neither, an item with no bullet and an absent item are named", () => {
    const f = "planted.md";
    const brief = (...step: string[]) =>
      ["PLANTED — a GO. Base: dev 2b11a9d29", "", ...step, "", "SCOPE: `src/`"].join("\n");
    const texts = (text: string) =>
      premiseSourceFindings(text, f).map((x) => `${x.line} ${x.text}`);
    expect(
      texts(
        brief(
          "STEP 1 — the census:",
          "- CENSUS-ITEM premises:",
          "  - INC-1 — SOURCE: run 7, the branch guard.",
          "  - the build is slow, from memory",
          "    and the second line of it",
          "  - the runner image — OPEN: which image?",
          "- CENSUS-ITEM callee-codes: not applicable — no door.",
        ),
      ),
      "a bullet with neither word is named at its own line, whatever its continuation says",
    ).toEqual([
      "6 a premise names no SOURCE: or OPEN: — - the build is slow, from memory and the second line of it",
    ]);
    expect(
      texts(brief("STEP 1 — the census:", "- premises — every premise is from memory.")),
      "an item with no bullet and no word",
    ).toEqual([
      "4 a premise names no SOURCE: or OPEN: — - premises — every premise is from memory.",
    ]);
    for (const own of [
      "- premises — SOURCE: the ledger.",
      "- premises — OPEN: the question.",
      "- CENSUS-ITEM premises: not applicable — no outside system.",
    ])
      expect(texts(brief("STEP 1 — the census:", own)), own).toEqual([]);
    expect(
      texts(brief("STEP 1 — the census:", "- premises:", "  - not applicable")),
      "a bullet is not excused by not applicable",
    ).toHaveLength(1);
    expect(
      texts(brief("STEP 1 — the census:", "- consumers — the readers.")),
      "a STEP 1 without its premises item is a finding, never a pass",
    ).toEqual(["3 STEP 1 carries no premises item"]);
    expect(texts("PLANTED — a GO. Base: dev 2b11a9d29\n"), "no STEP 1 is law 15's").toEqual([]);
    expect(
      texts(`RECORDS TURN R1 — planted\n${brief("STEP 1 — x", "- premises — from memory")}`),
      "a records turn is exempt",
    ).toEqual([]);
    expect(
      texts(brief("STEP 1 — the census:", "- premises:", "  - a — SOURCE: x", "- gate-reach — y")),
      "the item ends at the next census item",
    ).toEqual([]);
  });

  it("CF-BRIEF-26 (S817) an INC a COVERED HERE line names appears in the premises on a RED-FIRST: or CONTROL: bullet; a planted INC with none, a LEFT part and a missing item are judged", () => {
    const f = "planted.md";
    const brief = (system: string[], premises: string[]) =>
      [
        "PLANTED — a GO. Base: dev 2b11a9d29",
        "",
        "THE SYSTEM (G0) — the planted fix",
        ...system,
        "CONFORMANCE GUARD: `src/` (exists)",
        "",
        "SCOPE: `src/`",
        "",
        "STEP 1 — the census:",
        "- CENSUS-ITEM premises:",
        ...premises,
        "- CENSUS-ITEM findings: none.",
        "",
      ].join("\n");
    const texts = (text: string) => redFirstFindings(text, f).map((x) => `${x.line} ${x.text}`);
    const missing = (id: string) =>
      `${id} is covered here, but no premise of STEP 1 names it with RED-FIRST: or CONTROL:`;
    const system = [
      "COVERED HERE:",
      "  - INC-11: the fix.",
      "    - INC-12: nested, with INC-13.",
      "  - the rest, no id.",
    ];
    expect(
      texts(
        brief(system, [
          "  - INC-11 — SOURCE: run 1. RED-FIRST: T-1.",
          "  - INC-12 — SOURCE: run 2.",
          "  - INC-13 — SOURCE: run 3. CONTROL: T-3 is new behaviour.",
        ]),
      ),
    ).toEqual([`6 ${missing("INC-12")}`]);
    expect(
      texts(brief(system, ["  - INC-11 SOURCE: x RED-FIRST: y; INC-12 and INC-13 CONTROL: z"])),
      "one bullet may prove several",
    ).toEqual([]);
    expect(
      texts(brief(system, ["  - INC-11 — RED-FIRST: T", "    INC-12, INC-13 — CONTROL: T"])),
    ).toEqual([]);
    expect(
      texts(
        brief(
          ["COVERED HERE: INC-21 moves | LEFT: INC-22 — a roadmap line"],
          ["  - x — SOURCE: y"],
        ),
      ).map((x) => x.replace(/^\d+ /, "")),
      "a LEFT part is not covered here",
    ).toEqual([missing("INC-21")]);
    expect(
      texts(
        brief(["COVERED HERE: INC-31 moves."], ["  - INC-31 — RED-FIRST: T"]).replace(
          "- CENSUS-ITEM premises:\n",
          "",
        ),
      ),
      "a STEP 1 with no premises item judges every INC unproven",
    ).toEqual([`4 ${missing("INC-31")}`]);
    const outside = brief(["COVERED HERE: none."], ["  - x — SOURCE: y"]).replace(
      "CONFORMANCE GUARD",
      "COVERED HERE: INC-41 is named after the block.\nCONFORMANCE GUARD",
    );
    expect(texts(outside), "an INC inside the block is judged").toEqual([`5 ${missing("INC-41")}`]);
    expect(
      texts(
        `${brief(["COVERED HERE: none."], ["  - x — SOURCE: y"])}\nCOVERED HERE: INC-51 outside every block.\n`,
      ),
      "a COVERED HERE line outside a THE SYSTEM block is not read",
    ).toEqual([]);
    expect(
      texts(`RECORDS TURN R1 — planted\n${brief(system, ["  - x — SOURCE: y"])}`),
      "a records turn is exempt",
    ).toEqual([]);
  });

  it("CF-BRIEF-15 the template's census item `whole-app-calls` follows `callee-codes`, and a planted STEP 1 that leaves it out is named", () => {
    const keys = templateKeys(readFileSync(TEMPLATE, "utf8"));
    expect(keys.indexOf("whole-app-calls")).toBe(keys.indexOf("callee-codes") + 1);
    const step = (...named: string[]) =>
      [
        "PLANTED — a GO. Base: dev 2b11a9d29",
        "",
        `STEP 1 — the census: ${named.join(", ")}.`,
        "",
      ].join("\n");
    const without = keys.filter((key) => key !== "whole-app-calls");
    const f = "planted.md";
    expect(censusFindings(step(...without), f, [], keys).map((x) => x.text)).toEqual([
      "STEP 1 does not name the census item whole-app-calls",
    ]);
    expect(censusFindings(step(...keys), f, [], keys)).toEqual([]);
    expect(
      censusFindings(
        step(...without),
        f,
        [{ file: "r.md", text: "CENSUS-ITEM whole-app-calls: covered — no shared piece changes" }],
        keys,
      ),
      "a line `CENSUS-ITEM whole-app-calls: …` answers it",
    ).toEqual([]);
  });

  it("CF-BRIEF-17 every ruling of the brief in force is saved bare: its first line is the ruling's `RULING — …`; a planted wrapped ruling is named", () => {
    const { rulings } = inForce();
    const findings = rulings.flatMap((file) =>
      rulingFormFindings(readFileSync(file, "utf8"), file),
    );
    expect(report(asReported(findings))).toBe("");
    const bare =
      "RULING — planted, stop 1: the answers. Base: cursor/planted 2b11a9d29.\n\n1. Yes.\n";
    expect(rulingFormFindings(bare, "planted-ruling-1.md")).toEqual([]);
    const wrapped = `# Planted — ruling 1 (sha256 ${"0".repeat(64)})\n\n\`\`\`\`text\n${bare}\`\`\`\`\n`;
    expect(lawsOf(rulingFormFindings(wrapped, "planted-ruling-1.md"))).toEqual(["CF-BRIEF-17"]);
    expect(rulingFormFindings(`\`\`\`\`\n${bare}`, "planted-ruling-2.md")).toHaveLength(1);
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
    write(".github/workflows/ci.yml", 'jobs:\n  lane:\n    env:\n      E2E_WORKERS: "1"\n');
    write("playwright.config.ts", 'export const retries = process.env["PLANT_RETRIES"];\n');
    write(
      "docs/spec/spec-ledger.md",
      [
        '- DEC-217 (planted) — the lanes run 2 workers (E2E_WORKERS "2").',
        "- DEC-230 (planted) — DEC-217's revert rule was met; E2E_WORKERS stays.",
        "- DEC-232 (planted) — 16 lanes, 1 worker each.",
        "- Turn 22 (planted, DEC-299) — E2E_WORKERS back to one.",
        "- DEC-240 (planted) — PLANT_RETRIES_MAX is a different name.",
        "- DEC-355 (planted) — The tolerance: a page's first download grows only by a named cause the report lists chunk by chunk; an unexplained growth is a STOP; no bare number.",
        "",
      ].join("\n"),
    );
    write("scripts/conformance/briefs-allowlist.txt", "# planted header\n");
    write("scripts/conformance/plant-allowlist.txt", "# planted header\n");
    write("scripts/conformance/plant.test.ts", '// reads "plant-allowlist.txt"\n');
    write("scripts/ci/fixed.ts", "// INC-901: the planted fix\n");
    write("scripts/lib/other.ts", "// INC-901 is cited here too\n");
    write(
      "docs/governance/go-template.md",
      "<!-- CENSUS-ITEM: consumers -->\n<!-- CENSUS-ITEM: premises -->\n",
    );
    const clean = [
      "CLEAN — a planted GO. Base: dev 2b11a9d29",
      "",
      "SCOPE: `src/` (each file's tests), `scripts/fresh.test.ts` (new), `scripts/ci/`",
      "",
      "STEP 1 — the census: the consumers and the premises.",
      "- premises —",
      "  - INC-901 — SOURCE: the planted tree. RED-FIRST: the planted test.",
      "The function `alpha` at `src/alpha.ts` :2 is read; `src/alpha.ts` exists; `src/beta.ts` is new.",
      "A new id CF-PLANT-9 is free; the tolerance is two lines.",
      "OPTION: fresh in scripts/types.d.ts",
      "ASSERT-PRESENT: `export function alpha` in src/alpha.ts",
      "ASSERT-ABSENT: `function beta` in src",
      "COUNT: 1 := `find src -type f | wc -l`",
      "The lanes keep `E2E_WORKERS` as DEC-230 set it.",
      "The list `scripts/conformance/plant-allowlist.txt` is read by `scripts/conformance/plant.test.ts`.",
      "Commit `planted: task saved`.",
      "`scripts/lib/other.ts` names INC-901 and stays outside SCOPE: it cites the fix as history.",
      "",
      "CONFORMANCE GUARD: `src/alpha.ts` (exists) is read; `scripts/fresh.test.ts` (new) plants the bypass.",
      "",
      "TOLERANCES (G60). For the planted page: a page's first download grows only by a named cause the report lists chunk by chunk; an unexplained growth is a STOP; no bare number.",
      "",
      "RECORDS (word for word)",
      "INC-901 — the planted defect; FIXED.",
      "",
      "THE SYSTEM (G0) — the planted fix",
      "COVERED HERE: INC-901 is moved onto its mechanism.",
      "",
    ].join("\n");
    const planted = [
      "PLANTED — a planted GO with no base line.",
      "Any red is a STOP.",
      "",
      "SCOPE: src/lib/x.ts, `e2e/used.spec.ts` (new), `.claude/hooks/lib.ts`",
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
      "The lanes keep `E2E_WORKERS` as DEC-217 set it.",
      "The list `scripts/conformance/plant-allowlist.txt` gains a line.",
      "Commit `planted: a dictated commit title that runs well past the seventy-two characters kept`.",
      "",
      "CONFORMANCE GUARD: a unit census, no path named.",
      "",
      "TOLERANCES (G60). The first download may grow by 2 KiB.",
      "",
      "RECORDS (word for word)",
      "INC-901 — the planted defect; FIXED.",
      "",
      "THE SYSTEM (G0) — the planted fix",
      "COVERED HERE: INC-901 is moved onto its mechanism.",
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
      expect(newTestFindings(planted, f, root).map((x) => x.text)).toEqual([
        "SCOPE names used.spec.ts (new); the tree holds e2e/used.spec.ts",
      ]);
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
        'a bare count "3 files" — write COUNT: N := COMMAND',
        "COUNT 5 := find src -type f | wc -l — prints 1",
        "COUNT 1 := ls src > out.txt — refused: carries a redirect, a chain or a substitution",
      ]);
      expect(existsSync(join(root, "out.txt"))).toBe(false);
      expect(lawsOf(titleFindings(planted, f))).toEqual(["CF-BRIEF-11"]);
      expect(forbiddenScopeFindings(planted, f).map((x) => x.text)).toEqual([
        "SCOPE names .claude/hooks/lib.ts, which rule 00 forbids the executor",
      ]);
      expect(settingDecisionFindings(planted, f, root).map((x) => x.text)).toEqual([
        "names E2E_WORKERS; its newest decision is DEC-230",
      ]);
      expect(recordScopeFindings(planted, f, root).map((x) => x.text)).toEqual([
        "INC-901 (RECORDS) is named by scripts/ci/fixed.ts, outside SCOPE",
        "INC-901 (RECORDS) is named by scripts/lib/other.ts, outside SCOPE",
      ]);
      expect(recordScopeFindings(clean, "clean.md", root)).toEqual([]);
      expect(
        recordScopeFindings("RULING — planted.\n\nRECORDS\nINC-901 — FIXED.\n", f, root),
        "a ruling has no SCOPE of its own",
      ).toEqual([]);
      expect(listReaderFindings(planted, f, root).map((x) => x.text)).toEqual([
        "cites scripts/conformance/plant-allowlist.txt; no test it cites reads it by name (the tree's: scripts/conformance/plant.test.ts)",
      ]);
      const fresh = "The manifest `scripts/conformance/fresh.txt` (new) is made here.";
      expect(listReaderFindings(fresh, f, root).map((x) => x.text)).toEqual([
        "cites scripts/conformance/fresh.txt, which the tree does not hold, and no test to read it",
      ]);
      expect(firstDownloadFindings(planted, f, root).map((x) => `${x.line} ${x.text}`)).toEqual([
        `21 names a page's first download without DEC-355's sentence: "a page's first download grows only by a named cause the report lists chunk by chunk; an unexplained growth is a STOP; no bare number"`,
        '21 a bare figure beside "first download": The first download may grow by 2 KiB.',
      ]);
      expect(
        firstDownloadFindings("The first download stays 3% under its ceiling.", f, root),
        "a percentage outside a TOLERANCES paragraph is a finding too",
      ).toHaveLength(1);
      expect(
        firstDownloadFindings("TOLERANCES (G60). A red is a STOP.", f, root),
        "a TOLERANCES paragraph that names no first download is not read",
      ).toEqual([]);
      expect(
        listReaderFindings(
          `${fresh} Its census is \`scripts/conformance/plant.test.ts\`.`,
          f,
          root,
        ),
      ).toEqual([]);
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
      expect(premiseSourceFindings(planted, f).map((x) => x.text)).toEqual([
        "STEP 1 carries no premises item",
      ]);
      expect(redFirstFindings(planted, f).map((x) => `${x.line} ${x.text}`)).toEqual([
        "27 INC-901 is covered here, but no premise of STEP 1 names it with RED-FIRST: or CONTROL:",
      ]);
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
      expect(premiseSourceFindings(clean, f)).toEqual([]);
      expect(redFirstFindings(clean, f)).toEqual([]);
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
          "CF-BRIEF-18",
          "CF-BRIEF-19",
          "CF-BRIEF-20",
          "CF-BRIEF-21",
          "CF-BRIEF-24",
          "CF-BRIEF-3",
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
      const rx = pattern`^${name}$`;
      expect(rx.test(name)).toBe(true);
      expect(rx.test(String.raw`a\bxc$d(e)`)).toBe(false);
      expect(rx.test("ab.c$d(e)")).toBe(false);
    });

    it("CF-BRIEF-7 a test id is a whole run of capitals, tokens and digits: inside a word, at a `$`, lowercase or seven capitals is none", () => {
      for (const run of [
        "xCF-A-1",
        "$CF-A-1",
        "CF-A-1$",
        "CF-a-1",
        "ABCDEFG-1",
        "CF",
        "CF--1",
        "CF-1-",
      ])
        expect(isTestId(run), run).toBe(false);
      for (const run of ["CF-PLANT-9", "TCK-7", "CF-HELPERS-5", "AB-2B-10"])
        expect(isTestId(run), run).toBe(true);
      const f = "ids.md";
      for (const word of ["xTCK-7", "$TCK-7", "TCK-7$", "tck-7", "TCKTCKT-7"])
        expect(freeIdFindings(`A new id ${word} is free.`, f, root), word).toEqual([]);
      expect(freeIdFindings("A new id (TCK-7, is free.", f, root).map((x) => x.text)).toEqual([
        "calls TCK-7 new or free; the tree already uses it",
      ]);
    });

    it('CF-BRIEF-3\'s K1 clause reads a "(new)" test by its file name anywhere in the tree; CF-BRIEF-11 reads a title after `commit (`', () => {
      const scope = [
        "SCOPE: `scripts/ci/used.spec.ts` (new), alpha.test.ts (new), `e2e/fresh.selftest.sh` (new),",
        "src/alpha.ts with its test",
        "",
        "Not SCOPE: `e2e/used.spec.ts` (new).",
      ].join("\n");
      expect(newTestFindings(scope, "k1.md", root)).toEqual([
        {
          law: "CF-BRIEF-3",
          file: "k1.md",
          line: 1,
          text: "SCOPE names used.spec.ts (new); the tree holds e2e/used.spec.ts",
        },
      ]);
      expect(newTestFindings("no scope here, `e2e/used.spec.ts` (new)", "k1.md", root)).toEqual([]);
      const long =
        "planted: a dictated commit title that runs well past the seventy-two characters";
      expect(titleFindings(`One commit (\`${long}\`).`, "t.md").map((x) => x.law)).toEqual([
        "CF-BRIEF-11",
      ]);
      expect(titleFindings(`Commit (\`${long}\`)`, "t.md")).toHaveLength(1);
      expect(titleFindings("One commit (`planted: short`).", "t.md")).toEqual([]);
      const quotedForm =
        "law 11 also reads a backticked title that follows `commit (` or `Commit (`; law 10's message at :487 and the template's line 25 lose the angle-bracket placeholders (`COUNT: N := COMMAND` or a wording)";
      expect(titleFindings(quotedForm, "t.md"), "a quoted form is not a title").toEqual([]);
    });

    it("CF-BRIEF-18 a setting a brief names in a code span cites its newest decision: a key of a workflow or playwright.config.ts, a ledger line that begins with the decision's id", () => {
      const texts = (text: string) =>
        settingDecisionFindings(text, "s.md", root).map((x) => `${x.line} ${x.text}`);
      expect(texts('Line one.\n`E2E_WORKERS` and `E2E_WORKERS: "2"`.\n')).toEqual([
        "2 names E2E_WORKERS; its newest decision is DEC-230",
      ]);
      expect(texts("`E2E_WORKERS` (DEC-217, DEC-230).")).toEqual([]);
      expect(texts("`E2E_WORKERS` (DEC-2300).")).toHaveLength(1);
      expect(texts("E2E_WORKERS outside a code span, DEC-217.")).toEqual([]);
      expect(texts("`WALK_BOUND` is no key; `PLANT_UNSET` is in no file.")).toEqual([]);
      expect(texts("`PLANT_RETRIES` is read by the config; no ledger line names it.")).toEqual([]);
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
        "CF-BRIEF-16",
        "CF-BRIEF-18",
        "CF-BRIEF-19",
        "CF-BRIEF-2",
        "CF-BRIEF-20",
        "CF-BRIEF-21",
        "CF-BRIEF-24",
        "CF-BRIEF-25",
        "CF-BRIEF-26",
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

    it("CF-BRIEF-19 (INC-1260) a ruling's widening joins its brief's SCOPE: the ruling's records and the brief's are judged against the joined paths, a path neither grants is still named", () => {
      const brief = [
        "PLANTED — a GO. Base: dev 2b11a9d29",
        "",
        "SCOPE: `scripts/ci/`",
        "",
        "RECORDS (word for word)",
        "INC-901 — the planted defect; FIXED.",
        "",
      ].join("\n");
      const widened = [
        "RULING — planted, stop 1: the answers. Base: cursor/planted 2b11a9d29",
        "",
        "6. THE BRIEF'S SCOPE GROWS BY `scripts/lib/other.ts`. Never `scripts/lib/else.ts`.",
        "",
        "RECORDS (word for word)",
        "- INC-901 — the planted defect, built in the widened file.",
        "",
      ].join("\n");
      const unwidened = widened.replace("THE BRIEF'S SCOPE GROWS BY", "Nothing grows BY");
      const texts = (text: string, file: string, joined: string[]) =>
        recordScopeFindings(text, file, root, joined).map((x) => x.text);
      // The ruling's own records, judged against the brief's SCOPE and its own widening: no allowlist line.
      expect(texts(widened, "r.md", [brief])).toEqual([]);
      // The brief's records, judged with the ruling's widening joined.
      expect(texts(brief, "b.md", [widened])).toEqual([]);
      // The same ruling without its widening: the file neither grants is named, on both sides.
      expect(texts(unwidened, "r.md", [brief])).toEqual([
        "INC-901 (RECORDS) is named by scripts/lib/other.ts, outside SCOPE",
      ]);
      expect(texts(brief, "b.md", [unwidened])).toEqual([
        "INC-901 (RECORDS) is named by scripts/lib/other.ts, outside SCOPE",
      ]);
      // A "never" sentence grants nothing, and a ruling's own SCOPE paragraph widens, never replaces.
      const own = widened.replace(
        /6\. THE BRIEF'S SCOPE GROWS BY.*\n/,
        "SCOPE: `scripts/lib/other.ts`\n",
      );
      expect(texts(own, "r.md", [brief])).toEqual([]);
      // With no SCOPE in any joined text there is nothing to judge.
      expect(texts(unwidened, "r.md", [])).toEqual([]);
    });

    it("CF-BRIEF-16 a SCOPE path rule 00 forbids: `.claude/`, `CLAUDE.md`, and `supabase/migrations/` under no-migration", () => {
      const brief = (flags: string, scope: string) =>
        [`PLANTED — Base: dev 2b11a9d29. FLAGS: ${flags}.`, "", scope, "", "STEP 1 — x."].join(
          "\n",
        );
      const texts = (text: string) => forbiddenScopeFindings(text, "s.md").map((x) => x.text);
      const migrations = "SCOPE: `supabase/migrations/20261112_x.sql`, `src/` (each file's tests)";
      expect(texts(brief("no-migration, no-new-string", migrations))).toEqual([
        "SCOPE names supabase/migrations/20261112_x.sql, which rule 00 forbids the executor",
      ]);
      expect(texts(brief("no-new-string", migrations))).toEqual([]);
      expect(
        texts(
          brief(
            "no-new-string",
            "SCOPE, by area: `.claude/hooks/**/*.ts` and CLAUDE.md;\nthe dormant kit's `.claude/settings.json`",
          ),
        ),
      ).toEqual([
        "SCOPE names .claude/hooks/**/*.ts, which rule 00 forbids the executor",
        "SCOPE names CLAUDE.md, which rule 00 forbids the executor",
        "SCOPE names .claude/settings.json, which rule 00 forbids the executor",
      ]);
      expect(forbiddenScopeFindings(brief("x", "SCOPE: a\nb `CLAUDE.md`"), "s.md")[0]?.line).toBe(
        4,
      );
      expect(
        texts(
          brief(
            "no-migration",
            "SCOPE: `src/`. Nothing under `.claude/`; never `CLAUDE.md` or `supabase/migrations/`.",
          ),
        ),
        "a negated sentence is not a claim",
      ).toEqual([]);
      expect(texts("No scope here: `.claude/hooks/lib.ts`, CLAUDE.md.")).toEqual([]);
      const templateScope =
        readFileSync(TEMPLATE, "utf8")
          .split("\n")
          .find((line) => line.startsWith("SCOPE")) ?? "";
      expect(templateScope).toContain(
        "never a path rule 00 forbids: `.claude/`, `CLAUDE.md`; `supabase/migrations/` only with a migration flag",
      );
      expect(texts(brief("no-migration", templateScope)), "the template's own sentence").toEqual(
        [],
      );
    });

    it("check-go --at judges the commit's snapshot: a line the working tree lost passes there, a git-read COUNT runs in the repository, the brief's own path is not judged, an unknown commit is refused", () => {
      const repo = mkdtempSync(join(tmpdir(), "go-laws-at-"));
      try {
        const put = (path: string, text: string) => {
          mkdirSync(dirname(join(repo, path)), { recursive: true });
          writeFileSync(join(repo, path), text);
        };
        put("AGENTS.md", "planted\n");
        put("roadmap.md", "planted\n");
        put("src/alpha.ts", "// alpha\nexport function alpha() {}\n");
        put("scripts/conformance/briefs-allowlist.txt", "# planted header\n");
        put("docs/governance/go-template.md", "<!-- CENSUS-ITEM: consumers -->\n");
        const git = (...args: string[]) => {
          const run = spawnSync("git", args, { cwd: repo, encoding: "utf8" });
          expect(run.status, run.stderr).toBe(0);
          return run.stdout.trim();
        };
        git("init", "-q");
        git("config", "user.email", "e2e@ethio-e2e.invalid");
        git("config", "user.name", "e2e");
        git("add", "-A");
        git("commit", "-q", "--no-gpg-sign", "-m", "planted");
        const sha = git("rev-parse", "HEAD");
        put("src/alpha.ts", "// renamed\nexport function gamma() {}\n");
        put("src/extra.ts", "// not yet committed\n");
        put(
          "docs/governance/briefs/at.md",
          [
            `AT — a planted GO. Base: dev ${sha.slice(0, 9)}`,
            "",
            "SCOPE: `src/` (each file's tests)",
            "",
            "STEP 0 — save this brief as `docs/governance/briefs/at.md`, which the commit lacks.",
            "STEP 1 — the census: the consumers.",
            "- premises — not applicable — a planted census.",
            "The function `alpha` at `src/alpha.ts` :2 is read.",
            "COUNT: 1 := `find src -type f | wc -l`",
            "COUNT: 1 := `git log --oneline | wc -l`",
            "",
          ].join("\n"),
        );
        const run = (...extra: string[]) =>
          spawnSync(
            "bun",
            [
              "scripts/brief/check-go.ts",
              join(repo, "docs/governance/briefs/at.md"),
              "--root",
              repo,
              ...extra,
            ],
            { encoding: "utf8", timeout: 60_000 },
          );
        const here = run();
        expect(here.status, here.stdout).toBe(1);
        expect(
          here.stdout.split("\n").filter((line) => line.startsWith("CF-BRIEF-")),
          "without --at the working tree is judged",
        ).toEqual([
          expect.stringMatching(/^CF-BRIEF-6 .*src\/alpha\.ts :2 holds "export function gamma/),
          expect.stringMatching(/^CF-BRIEF-10 .*COUNT 1 := find src -type f \| wc -l — prints 2$/),
        ]);
        const at = run("--at", sha.slice(0, 9));
        expect(at.status, at.stdout).toBe(0);
        const [first] = at.stdout.split("\n");
        expect(first).toContain(`[check-go] at ${sha} (--at ${sha.slice(0, 9)})`);
        expect(first).toContain(`a COUNT that is a git read runs in ${repo}`);
        expect(at.stdout).toContain("[check-go] no finding");
        const snapshot = /its snapshot (\S+);/.exec(first ?? "")?.[1] ?? "";
        expect(snapshot.startsWith(tmpdir()), snapshot).toBe(true);
        expect(existsSync(snapshot), "the snapshot is removed").toBe(false);
        const unknown = run("--at", "0000000deadbeef");
        expect(unknown.status).toBe(2);
        expect(unknown.stderr).toContain("holds no such commit; nothing judged");
        expect(unknown.stdout).not.toContain("no finding");
        expect(run("--at").status, "--at with no commit is a usage error").toBe(2);
      } finally {
        rmSync(repo, { recursive: true, force: true });
      }
    }, 60_000);
  });
});
