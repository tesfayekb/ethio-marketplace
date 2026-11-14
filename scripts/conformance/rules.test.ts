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
 *
 * The CI turn (S604) — one order in every file that states it: rule 00, rule 60, rule 80, AGENTS.md
 * and the GO template each name "the self-review before the push"; no rule file, AGENTS.md or the
 * template keeps the order it retired (the push "at once" or "right after step 7", the self-review
 * and the report "while it runs").
 */

type Finding = { file: string; line: number; what: string };

const RULES = ".cursor/rules";
const TEMPLATE = "docs/governance/go-template.md";
/** The files that state the gate. */
export const GATE_FILES = [
  `${RULES}/00-protocol.mdc`,
  `${RULES}/20-tests.mdc`,
  `${RULES}/60-report.mdc`,
  "AGENTS.md",
];
/** What each gate file names. */
export const GATE_TERMS = ["`bun run checks`", "DEC-374", "--grep"];
/** The files that state the order of the self-review and the push. */
export const ORDER_FILES = [
  `${RULES}/00-protocol.mdc`,
  `${RULES}/60-report.mdc`,
  `${RULES}/80-review.mdc`,
  "AGENTS.md",
  TEMPLATE,
];
/** What each order file names. */
export const ORDER_TERM = "the self-review before the push";
/** A local whole-file run of a changed spec, in the forms the rules used before DEC-374. */
const WHOLE_FILE_RUN = [
  /\beach whole\b/i,
  /\b(?:each|every) (?:touched|changed) spec files? whole\b/i,
  /\bwhole and alone\b/i,
];
/** The order S604 retired: the push straight after the browser check, the review while CI runs. */
const OLD_ORDER = [
  /\bpush at once\b/i,
  /\bright after step 7\b/i,
  /\bsteps 8 and 9\b.*\bwhile it runs\b/i,
];

type Roles = { gate: boolean; order: boolean };

/** Each line's findings for the patterns: a match that begins on that line (read with the next). */
function lineFindings(
  file: string,
  text: string,
  patterns: RegExp[],
  what: (match: string) => string,
) {
  const findings: Finding[] = [];
  const lines = text.split("\n");
  lines.forEach((content, index) => {
    const joined = `${content} ${lines[index + 1] ?? ""}`.replace(/\s+/g, " ");
    for (const pattern of patterns) {
      const match = pattern.exec(joined);
      if (match !== null && match.index < content.replace(/\s+/g, " ").length)
        findings.push({ file, line: index + 1, what: what(match[0]) });
    }
  });
  return findings;
}

/**
 * One text's findings: a gate file missing a term, an order file not naming the order, any file
 * asking for a whole-file local run or keeping the retired order.
 */
export function ruleFindings(file: string, text: string, roles: Roles): Finding[] {
  const findings: Finding[] = [];
  const flat = text.replace(/\s+/g, " ");
  if (roles.gate)
    for (const term of GATE_TERMS)
      if (!flat.includes(term))
        findings.push({ file, line: 1, what: `does not name ${term} (the pre-push gate)` });
  if (roles.order && !flat.toLowerCase().includes(ORDER_TERM))
    findings.push({ file, line: 1, what: `does not name "${ORDER_TERM}"` });
  findings.push(
    ...lineFindings(
      file,
      text,
      WHOLE_FILE_RUN,
      (match) => `asks for a changed spec file to run whole locally ("${match}")`,
    ),
    ...lineFindings(
      file,
      text,
      OLD_ORDER,
      (match) => `keeps the order the self-review before the push retired ("${match}")`,
    ),
  );
  return findings;
}

function treeFindings(root: string): Finding[] {
  const files = [
    ...readdirSync(join(root, RULES))
      .filter((name) => name.endsWith(".mdc"))
      .map((name) => `${RULES}/${name}`),
    "AGENTS.md",
    TEMPLATE,
  ];
  return files.flatMap((file) =>
    ruleFindings(file, readFileSync(join(root, file), "utf8"), {
      gate: GATE_FILES.includes(file),
      order: ORDER_FILES.includes(file),
    }),
  );
}

const NONE: Roles = { gate: false, order: false };

describe("one pre-push gate and one order in every rule (DEC-374, S604)", () => {
  it("CF-RULES-1 rule 00, 20, 60 and AGENTS.md name the gate and the by-id browser check; no rule asks for a whole-file local run; every file that states the order has the self-review before the push; the old sentences are named", () => {
    expect(report(treeFindings(process.cwd()))).toBe("");
    const old =
      "7. **THE BROWSER CHECK.** When the E2E values are in your environment (rule 50), the spec files the\n" +
      "   task changed or added — each whole, both projects (`mobile-360`, `desktop-1280`), 0 retries —\n";
    expect(report(ruleFindings("planted-00.mdc", old, NONE))).toBe(
      'planted-00.mdc:2 asks for a changed spec file to run whole locally ("each whole")',
    );
    const oldTwenty =
      "  values) — Both projects (`mobile-360`, `desktop-1280`), 2 workers, fake mode, 0 retries; each\n" +
      "  touched spec file whole and alone; named ids by `--grep`.\n";
    expect(ruleFindings("planted-20.mdc", oldTwenty, NONE).map((finding) => finding.line)).toEqual([
      1, 2,
    ]);
    expect(
      report(
        ruleFindings("AGENTS.md", "- Before every push, run `bun run checks`.", {
          gate: true,
          order: true,
        }),
      ),
    ).toBe(
      [
        'AGENTS.md:1 does not name "the self-review before the push"',
        "AGENTS.md:1 does not name --grep (the pre-push gate)",
        "AGENTS.md:1 does not name DEC-374 (the pre-push gate)",
      ].join("\n"),
    );
    // The order S604 retired, as rule 00's steps 7 and 10 stated it before the CI turn.
    const oldOrder =
      "   When the values are not set, say so. Then push at once (step 10): CI on the pull request is the\n" +
      "   full proof — every test in its lane, and the repeat lane repeating the changed specs that fit\n" +
      "   its budget (DEC-283) — and steps 8 and 9, and any by-id run that remains, happen while it runs.\n" +
      "10. **PUSH, OPEN THE PULL REQUEST, AND WAIT FOR ITS CI.** `git push -u origin cursor/<stem>` (never\n" +
      '    `--force`), right after step 7. `gh pr create --base dev --title "<the task\'s title line>" --body\n';
    expect(report(ruleFindings("planted-00.mdc", oldOrder, { gate: false, order: true }))).toBe(
      [
        'planted-00.mdc:1 does not name "the self-review before the push"',
        'planted-00.mdc:1 keeps the order the self-review before the push retired ("push at once")',
        'planted-00.mdc:3 keeps the order the self-review before the push retired ("steps 8 and 9, and any by-id run that remains, happen while it runs")',
        'planted-00.mdc:5 keeps the order the self-review before the push retired ("right after step 7")',
      ].join("\n"),
    );
  });
});
