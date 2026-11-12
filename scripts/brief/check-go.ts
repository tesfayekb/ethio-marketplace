/**
 * THE GO CHECK (housekeeping turn 2, ruling 1) — every law of scripts/brief/go-laws.ts over one
 * brief or ruling and a named tree root:
 *
 *   bun scripts/brief/check-go.ts <file> [--root <tree>] [--at <commit>]
 *
 * The supervisor runs it on its lock-exact clone before a GO is sent; the executor runs it at
 * STEP 0 on the tree as saved, and after its checks `--at` the commit STEP 0 began from. `--at`
 * (housekeeping turn 3c, ruling 1): the tree laws read a snapshot of that commit of the `--root`
 * repository (`git archive <commit> | tar -x` under the OS temp dir, removed in a `finally`); a COUNT
 * whose command is a git read runs in the repository, every other COUNT in the snapshot; the
 * allowlist and the template are read from `--root`. The first line names the commit and that split;
 * a commit the repository does not hold is refused (exit 2), never judged on another tree. The file's
 * rulings (`<stem>-ruling-<n>.md` beside it) answer its
 * census items; the root's briefs-allowlist.txt is judged against the file and those rulings. A
 * ruling given as the file is judged as its brief's ruling: no base line of its own (its base is
 * its branch's) and no census of its own.
 * Prints one line per finding and exits 1, or prints "no finding" and exits 0. A root the laws
 * cannot read, an unreadable file, a missing template or allowlist is a finding, never a pass.
 * scripts/conformance/briefs.test.ts CF-BRIEF-14 runs it on planted fixtures.
 */
import { spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, join, relative, resolve } from "node:path";
import { walkFiles } from "../conformance/kit";
import { pattern } from "../lib/pattern";
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

const ARCHIVE_BYTES = 1024 * 1024 * 1024;

type Args = { file: string; root: string; at: string | null };

function argsOf(argv: string[]): Args | null {
  const rest = [...argv];
  const option = (name: string): string | null | undefined => {
    const index = rest.indexOf(name);
    if (index < 0) return null;
    const value = rest[index + 1];
    rest.splice(index, 2);
    return value;
  };
  const root = option("--root");
  const at = option("--at");
  if (root === undefined || at === undefined || at?.startsWith("-") || rest.length !== 1)
    return null;
  return { file: rest[0], root: resolve(root ?? process.cwd()), at };
}

/** The full id of `commit` in the repository at `root`, or null when it holds no such commit. */
function commitOf(root: string, commit: string): string | null {
  const run = spawnSync("git", ["rev-parse", "--verify", "--quiet", `${commit}^{commit}`], {
    cwd: root,
    encoding: "utf8",
  });
  const sha = run.status === 0 ? run.stdout.trim() : "";
  return /^[0-9a-f]{40}$/.test(sha) ? sha : null;
}

/** A snapshot of `sha`'s tree under the OS temp dir: `git archive` unpacked by `tar`. */
function snapshotOf(root: string, sha: string): { dir: string; problem: string | null } {
  const dir = mkdtempSync(join(tmpdir(), "check-go-at-"));
  const archive = spawnSync("git", ["archive", sha], { cwd: root, maxBuffer: ARCHIVE_BYTES });
  if (archive.status !== 0)
    return { dir, problem: `git archive ${sha} exited ${archive.status ?? archive.signal}` };
  const unpack = spawnSync("tar", ["-x", "-C", dir], { input: archive.stdout });
  if (unpack.status !== 0)
    return { dir, problem: `tar -x of ${sha} exited ${unpack.status ?? unpack.signal}` };
  return { dir, problem: null };
}

function rulingsOf(file: string): Ruling[] {
  const dir = dirname(file);
  const stem = basename(file).replace(/\.md$/, "");
  const rx = pattern`^${stem}-ruling-\\d+\\.md$`;
  return walkFiles([dir], { ext: ["md"] })
    .filter((path) => dirname(path) === dir && rx.test(basename(path)))
    .map((path) => ({ file: path, text: readFileSync(path, "utf8") }));
}

function check(file: string, root: string, tree: string): Finding[] {
  if (!existsSync(file))
    return [{ law: "CF-BRIEF-1", file, line: 1, text: "the file cannot be read" }];
  const text = readFileSync(file, "utf8");
  const ruling = RULING.exec(file);
  const brief = ruling === null ? file : `${ruling[1]}.md`;
  const rulings = rulingsOf(brief);
  const findings = [
    ...textFindings(text, file).filter((f) => ruling === null || f.law !== "CF-BRIEF-1"),
    ...treeFindings(text, file, tree, root),
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

/** The findings, or the refusal that judged nothing. */
function judged(args: Args): Finding[] | string {
  if (args.at === null) return check(args.file, args.root, args.root);
  const sha = commitOf(args.root, args.at);
  if (sha === null) return `the repository at ${args.root} holds no such commit`;
  const snapshot = snapshotOf(args.root, sha);
  try {
    console.log(
      `[check-go] at ${sha} (--at ${args.at}): the tree laws and every other COUNT read its snapshot ${snapshot.dir}; a COUNT that is a git read runs in ${args.root}; the allowlist and the template are read from ${args.root}`,
    );
    return snapshot.problem ?? check(args.file, args.root, snapshot.dir);
  } finally {
    rmSync(snapshot.dir, { recursive: true, force: true });
  }
}

const args = argsOf(process.argv.slice(2));
if (args === null) {
  console.error("usage: bun scripts/brief/check-go.ts <file> [--root <tree>] [--at <commit>]");
  process.exit(2);
}
const findings = judged(args);
if (typeof findings === "string") {
  console.error(`[check-go] --at ${args.at ?? ""}: ${findings}; nothing judged`);
  process.exit(2);
}
for (const f of findings) console.log(`${f.law} ${f.file}:${f.line} ${f.text}`);
if (findings.length > 0) {
  console.log(`[check-go] ${findings.length} finding(s)`);
  process.exit(1);
}
console.log("[check-go] no finding");
