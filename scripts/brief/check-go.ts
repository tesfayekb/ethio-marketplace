/**
 * THE GO CHECK (housekeeping turn 2, ruling 1) — every law of scripts/brief/go-laws.ts over one
 * brief or ruling and a named tree root:
 *
 *   bun scripts/brief/check-go.ts <file> [--root <tree>]
 *
 * The supervisor runs it on its lock-exact clone before a GO is sent; the executor runs it at
 * STEP 0 on the tree as saved. The file's rulings (`<stem>-ruling-<n>.md` beside it) answer its
 * census items; the root's briefs-allowlist.txt is judged against the file and those rulings. A
 * ruling given as the file is judged as its brief's ruling: no base line of its own (its base is
 * its branch's) and no census of its own.
 * Prints one line per finding and exits 1, or prints "no finding" and exits 0. A root the laws
 * cannot read, an unreadable file, a missing template or allowlist is a finding, never a pass.
 * scripts/conformance/briefs.test.ts CF-BRIEF-14 runs it on planted fixtures.
 */
import { existsSync, readFileSync } from "node:fs";
import { basename, dirname, join, relative, resolve } from "node:path";
import { walkFiles } from "../conformance/kit";
import {
  allowanceFindings,
  censusFindings,
  type Finding,
  type Ruling,
  templateKeys,
  textFindings,
  treeFindings,
} from "./go-laws";

const TEMPLATE = "docs/governance/go-template.md";
const ALLOWLIST = "scripts/conformance/briefs-allowlist.txt";
const RULING = /^(.*)-ruling-\d+\.md$/;

function argsOf(argv: string[]): { file: string; root: string } | null {
  const rest = [...argv];
  let root = process.cwd();
  const at = rest.indexOf("--root");
  if (at >= 0) {
    const value = rest[at + 1];
    if (value === undefined) return null;
    root = value;
    rest.splice(at, 2);
  }
  return rest.length === 1 ? { file: rest[0], root: resolve(root) } : null;
}

function rulingsOf(file: string): Ruling[] {
  const dir = dirname(file);
  const stem = basename(file).replace(/\.md$/, "");
  const rx = new RegExp(`^${stem.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}-ruling-\\d+\\.md$`);
  return walkFiles([dir], { ext: ["md"] })
    .filter((path) => dirname(path) === dir && rx.test(basename(path)))
    .map((path) => ({ file: path, text: readFileSync(path, "utf8") }));
}

function check(file: string, root: string): Finding[] {
  if (!existsSync(file))
    return [{ law: "CF-BRIEF-1", file, line: 1, text: "the file cannot be read" }];
  const text = readFileSync(file, "utf8");
  const ruling = RULING.exec(file);
  const brief = ruling === null ? file : `${ruling[1]}.md`;
  const rulings = rulingsOf(brief);
  const findings = [
    ...textFindings(text, file).filter((f) => ruling === null || f.law !== "CF-BRIEF-1"),
    ...treeFindings(text, file, root),
  ];

  const allowlist = join(root, ALLOWLIST);
  if (existsSync(allowlist)) {
    const own = [brief, ...rulings.map((r) => r.file)].map((f) => {
      const inRoot = relative(root, resolve(f));
      return inRoot.startsWith("..") ? relative(process.cwd(), resolve(f)) : inRoot;
    });
    findings.push(...allowanceFindings(readFileSync(allowlist, "utf8"), ALLOWLIST, own));
  } else
    findings.push({ law: "CF-BRIEF-13", file, line: 1, text: `the root holds no ${ALLOWLIST}` });

  if (ruling !== null) return findings;
  const template = join(root, TEMPLATE);
  if (existsSync(template)) {
    const keys = templateKeys(readFileSync(template, "utf8"));
    findings.push(...censusFindings(text, file, rulings, keys));
  } else
    findings.push({ law: "CF-BRIEF-15", file, line: 1, text: `the root holds no ${TEMPLATE}` });
  return findings;
}

const args = argsOf(process.argv.slice(2));
if (args === null) {
  console.error("usage: bun scripts/brief/check-go.ts <file> [--root <tree>]");
  process.exit(2);
}
const findings = check(args.file, args.root);
for (const f of findings) console.log(`${f.law} ${f.file}:${f.line} ${f.text}`);
if (findings.length > 0) {
  console.log(`[check-go] ${findings.length} finding(s)`);
  process.exit(1);
}
console.log("[check-go] no finding");
