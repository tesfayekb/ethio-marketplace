// INC-1295 — the page ceilings stay committed, laid out so two lanes that change two different
// pages never conflict: one blank line between page lines (scripts/route-budgets.mjs, LAYOUT).
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { ROUTE_BUDGETS_KIB } from "./route-budgets.mjs";

const FILE = "scripts/route-budgets.mjs";
const OPEN = "export const ROUTE_BUDGETS_KIB = {";

/** The one shape of a page line: the Lovable branch guard's own pattern, read from its file. */
function ceilingLine(): RegExp {
  const guard = readFileSync("scripts/ci/lovable-branch-guard.sh", "utf8");
  const pattern = /^readonly CEILING_LINE='(.+)'$/m.exec(guard)?.[1];
  if (pattern === undefined) throw new Error("CEILING_LINE not found in lovable-branch-guard.sh");
  return new RegExp(pattern);
}

function pageBlock(text: string): string[] {
  const lines = text.split("\n");
  const open = lines.indexOf(OPEN);
  const close = lines.indexOf("};", open);
  if (open < 0 || close < 0) throw new Error(`${OPEN} … }; not found`);
  return lines.slice(open + 1, close);
}

/** The file as it was laid out before INC-1295: page lines side by side. */
function sideBySide(text: string): string {
  const block = pageBlock(text);
  return text.replace(block.join("\n"), block.filter((line) => line !== "").join("\n"));
}

function raised(text: string, page: string): string {
  const prefix = `  ${JSON.stringify(page)}: { ceiling: `;
  return text
    .split("\n")
    .map((line) =>
      line.startsWith(prefix)
        ? line.replace(/ceiling: (\d+)/, (_, n: string) => `ceiling: ${Number(n) + 1}`)
        : line,
    )
    .join("\n");
}

const GIT_ENV = {
  GIT_AUTHOR_NAME: "t",
  GIT_AUTHOR_EMAIL: "t@example.invalid",
  GIT_COMMITTER_NAME: "t",
  GIT_COMMITTER_EMAIL: "t@example.invalid",
  GIT_CONFIG_GLOBAL: "/dev/null",
  GIT_CONFIG_SYSTEM: "/dev/null",
};
function git(cwd: string, ...args: string[]): { status: number | null; out: string } {
  const result = spawnSync("git", args, {
    cwd,
    encoding: "utf8",
    env: { PATH: process.env["PATH"] ?? "", HOME: cwd, ...GIT_ENV },
    timeout: 20_000,
  });
  return { status: result.status, out: `${result.stdout}${result.stderr}` };
}
function ok(cwd: string, ...args: string[]): void {
  const result = git(cwd, ...args);
  if (result.status !== 0) throw new Error(`git ${args.join(" ")}: ${result.out}`);
}

const dirs: string[] = [];
afterEach(() => {
  for (const dir of dirs.splice(0)) rmSync(dir, { recursive: true, force: true });
});

/** Two planted branches from `text`, each raising one page; the second merges the first. */
function mergeTwoLanes(text: string, first: string, second: string) {
  const dir = mkdtempSync(join(tmpdir(), "ceilings-merge-"));
  dirs.push(dir);
  const path = join(dir, "route-budgets.mjs");
  ok(dir, "init", "-q", "--initial-branch=dev");
  writeFileSync(path, text);
  ok(dir, "add", "route-budgets.mjs");
  ok(dir, "commit", "-qm", "base");
  ok(dir, "switch", "-qc", "lane-a");
  writeFileSync(path, raised(text, first));
  ok(dir, "commit", "-qam", `raise ${first}`);
  ok(dir, "switch", "-q", "dev");
  ok(dir, "switch", "-qc", "lane-b");
  writeFileSync(path, raised(text, second));
  ok(dir, "commit", "-qam", `raise ${second}`);
  const merge = git(dir, "merge", "--no-edit", "lane-a");
  return { status: merge.status, merged: readFileSync(path, "utf8") };
}

describe("the page ceilings merge page by page (INC-1295)", () => {
  it("RBL-1 every page has one ceiling line, and no two page lines are neighbours", () => {
    const block = pageBlock(readFileSync(FILE, "utf8"));
    const shape = ceilingLine();
    const pages = block.filter((line) => line !== "");
    expect(pages.filter((line) => !shape.test(line))).toEqual([]);
    expect(pages.length).toBe(Object.keys(ROUTE_BUDGETS_KIB).length);
    const neighbours = block
      .map((line, i) => [line, block[i + 1] ?? ""])
      .filter(([line, next]) => line !== "" && next !== "")
      .map(([line]) => line.slice(0, 60));
    expect(neighbours).toEqual([]);
    expect(block[0]).not.toBe("");
    expect(block.at(-1)).not.toBe("");
    expect(block.join("\n")).not.toContain("\n\n\n");
  });

  it("RBL-2 two lanes raising two neighbouring pages merge cleanly; side by side, the same lanes conflict", () => {
    const text = readFileSync(FILE, "utf8");
    const [first, second] = Object.keys(ROUTE_BUDGETS_KIB);
    if (first === undefined || second === undefined) throw new Error("fewer than two pages");
    const ceilingOf = (merged: string, page: string) =>
      new RegExp(
        `^ {2}${JSON.stringify(page).replace(/[$/]/g, "\\$&")}: \\{ ceiling: (\\d+),`,
        "m",
      ).exec(merged)?.[1];

    const spaced = mergeTwoLanes(text, first, second);
    expect(spaced.status).toBe(0);
    expect(ceilingOf(spaced.merged, first)).toBe(String(Number(ceilingOf(text, first)) + 1));
    expect(ceilingOf(spaced.merged, second)).toBe(String(Number(ceilingOf(text, second)) + 1));

    const old = sideBySide(text);
    expect(pageBlock(old)).toHaveLength(Object.keys(ROUTE_BUDGETS_KIB).length);
    const conflicted = mergeTwoLanes(old, first, second);
    expect(conflicted.status).not.toBe(0);
    expect(conflicted.merged).toContain("<<<<<<<");
  });
});
