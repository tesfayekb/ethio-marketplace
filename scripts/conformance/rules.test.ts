import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { report } from "./kit";

/**
 * CF-RULES-1 (the speed turn, DEC-374) — the executor's pre-push gate is one text in every file that
 * states it: rule 00, rule 20, rule 60 and AGENTS.md each name `bun run checks`, DEC-374 and the
 * browser check by test id (`--grep`); and no rule file or AGENTS.md asks for a changed spec file to
 * run whole locally (the sentences DEC-374 retired: "each whole, both projects" and "each touched
 * spec file whole and alone"). CI on the pull request is the full proof of every test.
 */

type Finding = { file: string; line: number; what: string };

const RULES = ".cursor/rules";
/** The files that state the gate. */
export const GATE_FILES = [
  `${RULES}/00-protocol.mdc`,
  `${RULES}/20-tests.mdc`,
  `${RULES}/60-report.mdc`,
  "AGENTS.md",
];
/** What each gate file names. */
export const GATE_TERMS = ["`bun run checks`", "DEC-374", "--grep"];
/** A local whole-file run of a changed spec, in the forms the rules used before DEC-374. */
const WHOLE_FILE_RUN = [
  /\beach whole\b/i,
  /\b(?:each|every) (?:touched|changed) spec files? whole\b/i,
  /\bwhole and alone\b/i,
];

/** One text's findings: a gate file missing a term, any file asking for a whole-file local run. */
export function ruleFindings(file: string, text: string, isGateFile: boolean): Finding[] {
  const findings: Finding[] = [];
  const flat = text.replace(/\s+/g, " ");
  if (isGateFile)
    for (const term of GATE_TERMS)
      if (!flat.includes(term))
        findings.push({ file, line: 1, what: `does not name ${term} (the pre-push gate)` });
  const lines = text.split("\n");
  lines.forEach((content, index) => {
    const joined = `${content} ${lines[index + 1] ?? ""}`.replace(/\s+/g, " ");
    for (const pattern of WHOLE_FILE_RUN) {
      const match = pattern.exec(joined);
      if (match !== null && match.index < content.replace(/\s+/g, " ").length)
        findings.push({
          file,
          line: index + 1,
          what: `asks for a changed spec file to run whole locally ("${match[0]}")`,
        });
    }
  });
  return findings;
}

function treeFindings(root: string): Finding[] {
  const files = [
    ...readdirSync(join(root, RULES))
      .filter((name) => name.endsWith(".mdc"))
      .map((name) => `${RULES}/${name}`),
    "AGENTS.md",
  ];
  return files.flatMap((file) =>
    ruleFindings(file, readFileSync(join(root, file), "utf8"), GATE_FILES.includes(file)),
  );
}

describe("one pre-push gate in every rule (DEC-374)", () => {
  it("CF-RULES-1 rule 00, 20, 60 and AGENTS.md name the gate and the by-id browser check; no rule asks for a whole-file local run; the old sentences are named", () => {
    expect(report(treeFindings(process.cwd()))).toBe("");
    const old =
      "7. **THE BROWSER CHECK.** When the E2E values are in your environment (rule 50), the spec files the\n" +
      "   task changed or added — each whole, both projects (`mobile-360`, `desktop-1280`), 0 retries —\n";
    expect(report(ruleFindings("planted-00.mdc", old, false))).toBe(
      'planted-00.mdc:2 asks for a changed spec file to run whole locally ("each whole")',
    );
    const oldTwenty =
      "  values) — Both projects (`mobile-360`, `desktop-1280`), 2 workers, fake mode, 0 retries; each\n" +
      "  touched spec file whole and alone; named ids by `--grep`.\n";
    expect(ruleFindings("planted-20.mdc", oldTwenty, false).map((finding) => finding.line)).toEqual(
      [1, 2],
    );
    expect(
      report(ruleFindings("AGENTS.md", "- Before every push, run `bun run checks`.", true)),
    ).toBe(
      [
        "AGENTS.md:1 does not name --grep (the pre-push gate)",
        "AGENTS.md:1 does not name DEC-374 (the pre-push gate)",
      ].join("\n"),
    );
  });
});
