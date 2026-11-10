import { existsSync, readdirSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { briefInForce } from "../ci/laws-changed";
import { readAllowlist, report } from "./kit";

/**
 * DEC-361 (housekeeping turn 1) — a GO obeys the brief laws by a script, not by the supervisor's
 * eye. The brief roadmap line 3 names and its rulings (`<stem>-ruling-<n>.md` beside it) are read;
 * older briefs are not (they were written under earlier laws).
 * - CF-BRIEF-1: the brief carries `Base: dev <7–40 hex>` (a ruling's base is its branch's).
 * - CF-BRIEF-2: no absolute stop rule — none of "any red", "any growth", "at or below", "must be
 *   green", "zero failures" in a sentence that also says STOP, unless the sentence carries a
 *   negation (never, not, no, none, forbidden, refuses) or the phrase sits inside double quotes
 *   (straight or curly) or a Markdown code span: a quotation of the law being forbidden (ruling 1
 *   Q6; ruling 2 — backticks are how the records quote exact text). The law guards carelessness,
 *   not evasion — a stop rule written inside quotes or backticks passes here, and the supervisor's
 *   eye stays on it.
 * - CF-BRIEF-3: the SCOPE paragraph (from a line beginning `SCOPE` to the next blank line) names
 *   areas (a folder or a glob), or names each single code file under src/, e2e/ or scripts/ with
 *   its own test (`<stem>.test.ts(x)`; an e2e/ file, a spec). Text files (.txt .json .md .sql
 *   .yml) are not files for the rule; a test or spec file needs nothing.
 * - CF-BRIEF-4: the self-test — a planted brief with an unquoted stop rule and a bare single-file
 *   SCOPE fails CF-BRIEF-2 and CF-BRIEF-3.
 * The "restated count" and "premise grepped" checks stay the supervisor's: they need the fresh
 * tree, not a text law. Allowlist: briefs-allowlist.txt, `<file>:<line> <phrase> | reason | until`.
 */

type Finding = { file: string; line: number; what: string };

const BRIEFS = "docs/governance/briefs";
const ALLOWLIST = "scripts/conformance/briefs-allowlist.txt";
const PHRASE = /\b(?:any red|any growth|at or below|must be green|zero failures)\b/i;
const STOP = /\bSTOP\b/;
const NEGATION = /\b(?:never|not|no|none|forbidden|refuses)\b/i;
const QUOTED = /"[^"\n]*"|“[^”\n]*”|`[^`\n]*`/g;
const CODE_FILE = /(?<![\w/.-])((?:src|e2e|scripts)\/[\w$./-]*[\w$-]\.(?:tsx?|mjs|sh))(?![\w/*])/g;

/** CF-BRIEF-1 — the brief's own base line. */
export function baseFindings(text: string, file: string): Finding[] {
  return /Base: dev [0-9a-f]{7,40}\b/.test(text)
    ? []
    : [{ file, line: 1, what: "carries no `Base: dev <sha>` line" }];
}

/** CF-BRIEF-2 — a sentence that makes a phrase an absolute STOP. */
export function stopRuleFindings(text: string, file: string): Finding[] {
  const findings: Finding[] = [];
  text.split("\n").forEach((content, index) => {
    for (const sentence of content.split(/(?<=[.;!?])\s+/)) {
      const phrase = PHRASE.exec(sentence.replace(QUOTED, ""))?.[0];
      if (phrase === undefined || !STOP.test(sentence) || NEGATION.test(sentence)) continue;
      findings.push({ file, line: index + 1, what: phrase.toLowerCase() });
    }
  });
  return findings;
}

/** CF-BRIEF-3 — each single code file the SCOPE paragraph names comes with its test. */
export function scopeFindings(text: string, file: string): Finding[] {
  const lines = text.split("\n");
  const start = lines.findIndex((l) => /^SCOPE\b/.test(l));
  if (start < 0) return [];
  const end = lines.findIndex((l, i) => i > start && l.trim() === "");
  const scope = lines.slice(start, end < 0 ? lines.length : end).join("\n");
  const named = [...scope.matchAll(CODE_FILE)].map((m) => m[1]);
  const findings: Finding[] = [];
  for (const path of new Set(named)) {
    if (/\.(?:test|spec)\.tsx?$/.test(path)) continue;
    const stem = path.replace(/\.(?:tsx?|mjs|sh)$/, "");
    const ownTest = named.some((g) => g === `${stem}.test.ts` || g === `${stem}.test.tsx`);
    const spec = path.startsWith("e2e/") && named.some((g) => g.endsWith(".spec.ts"));
    if (!ownTest && !spec)
      findings.push({ file, line: start + 1, what: `SCOPE names ${path} without its test` });
  }
  return findings;
}

function keyOf(f: Finding): string {
  return `${f.file}:${f.line} ${f.what}`;
}

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

describe("a GO obeys the brief laws by a script (DEC-361)", () => {
  it("CF-BRIEF-1 the brief in force carries its `Base: dev <sha>` line", () => {
    const { brief } = inForce();
    expect(report(baseFindings(readFileSync(brief, "utf8"), brief))).toBe("");
  });

  it("CF-BRIEF-2 and CF-BRIEF-3 the brief and its rulings: no absolute stop rule, a SCOPE by area or with each file's test", () => {
    const { brief, rulings } = inForce();
    const findings: Finding[] = [];
    for (const file of [brief, ...rulings]) {
      const text = readFileSync(file, "utf8");
      findings.push(...stopRuleFindings(text, file), ...scopeFindings(text, file));
    }
    const allowances = readAllowlist(ALLOWLIST, findings.map(keyOf));
    console.log(`[briefs] read ${1 + rulings.length} files, findings: ${findings.length}`);
    expect(report(findings.filter((f) => !allowances.has(keyOf(f))))).toBe("");
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
      { file: "planted.md", line: 3, what: "any red" },
    ]);
    expect(stopRuleFindings(planted, "planted.md").map((f) => f.line)).not.toContain(7);
    expect(scopeFindings(planted, "planted.md")).toEqual([
      { file: "planted.md", line: 5, what: "SCOPE names src/lib/x.ts without its test" },
      { file: "planted.md", line: 5, what: "SCOPE names src/lib/y.ts without its test" },
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
});
