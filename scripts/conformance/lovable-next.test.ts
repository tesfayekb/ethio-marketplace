import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { readWorkflow } from "./workflow-reader";

/**
 * DEC-416 (cursor-bundle-1, ruling 1, item 8) — THE STANDING LOVABLE BRANCH. `lovable-next.yml`
 * moves `lovable/next` up to dev's head on every push to dev, when the branch holds nothing dev
 * lacks. It is the one workflow that writes a ref, so its shape is held:
 *   - the one event is a push to dev (never `pull_request`, `pull_request_target`, a dispatch);
 *   - the one permission is `contents: write`, on the job;
 *   - the one write is `git push origin "${head_sha}:refs/heads/lovable/next"` — no force flag, no
 *     `+` refspec — and it sits in the branch of the ancestor test that answered 0;
 *   - it runs git and nothing else: no script, no install, no secret, one action (the checkout of
 *     dev's own commit with its history);
 *   - every job and step declares its deadline (the deadlines guard, CF-CID-1, reads this file too).
 * CF-LVB-15 judges the shape and plants each breach; CF-LVB-16 runs the step's own shell over planted
 * git histories — the branch absent, an ancestor, a branch with a commit dev lacks, equal, and a
 * remote that refuses the push (a red job, never a silent pass). The family is CF-LVB (the Lovable
 * branch guard judges `lovable/next` as any `lovable/*` branch).
 */

const WORKFLOW = ".github/workflows/lovable-next.yml";
const PUSH = 'git push origin "${head_sha}:refs/heads/lovable/next"';
const ANCESTOR_TEST = 'git merge-base --is-ancestor "$next_sha" "$head_sha" || ancestor=$?';
const GATE = 'if [ "$ancestor" -eq 0 ]; then';

/** The text of a block opened by a top-level key (`on:`), its non-blank lines. */
function blockOf(lines: string[], key: string): string[] {
  const start = lines.indexOf(key);
  if (start === -1) return [];
  const end = lines.findIndex((line, i) => i > start && /^\S/.test(line));
  return lines.slice(start + 1, end === -1 ? undefined : end).filter((line) => line.trim() !== "");
}

/** The command lines of a step's `run: |` block (comments dropped), indentation removed. */
function runLines(stepText: string): string[] {
  const lines = stepText.split("\n");
  const start = lines.findIndex((line) => /^ {8}run: \|\s*$/.test(line));
  if (start === -1) return [];
  return lines
    .slice(start + 1)
    .filter((line) => line.trim() !== "" && !/^\s*#/.test(line))
    .map((line) => line.slice(10));
}

/** Every breach of the workflow's shape (DEC-416). */
export function lovableNextFindings(yml: string): string[] {
  const findings: string[] = [];
  const lines = yml.split("\n");
  if (blockOf(lines, "on:").join("\n") !== "  push:\n    branches: [dev]")
    findings.push("the one event is a push to dev");
  const permissionKeys = lines.filter((line) => line.trim() === "permissions:");
  if (permissionKeys.length !== 1 || !yml.includes("    permissions:\n      contents: write\n"))
    findings.push("the one permission is contents: write, on the job");
  if (
    lines.some((line) => /^\s+\S[^:]*:\s*(?:write|admin)\b/.test(line) && !/contents:/.test(line))
  )
    findings.push("no permission beyond contents: write");
  if (/\bsecrets\./.test(yml)) findings.push("no secret beyond the default token");
  if (!lines.includes("concurrency:"))
    findings.push("a concurrency group so two pushes do not race");
  const jobs = readWorkflow(WORKFLOW, yml);
  const job = jobs[0];
  if (jobs.length !== 1 || job === undefined) {
    findings.push("exactly one job");
    return findings;
  }
  if (!job.timeout) findings.push("the job declares its timeout-minutes");
  if (job.steps.some((step) => !step.timeout))
    findings.push("every step declares its timeout-minutes");
  if (job.steps.length !== 2) {
    findings.push("exactly two steps: the checkout and the move");
    return findings;
  }
  const [checkout, move] = job.steps;
  if (checkout === undefined || move === undefined) return findings;
  if (!/^ {6}- uses: actions\/checkout@v5$/m.test(checkout.text) || /\bref:/.test(checkout.text))
    findings.push("the checkout is dev's own commit, by the pinned action");
  if (!/^ {10}fetch-depth: 0$/m.test(checkout.text))
    findings.push("the checkout carries the history");
  if (/\buses:/.test(move.text)) findings.push("the move step uses no action");
  const commands = runLines(move.text);
  const forbidden = commands.filter((line) =>
    /\b(?:bun|bunx|npm|npx|node|python3?|pip|curl|wget|eval|bash|sh)\b|scripts\/|\.\/|workflow_dispatch/.test(
      line,
    ),
  );
  if (forbidden.length > 0)
    findings.push(`the move step runs git and nothing else: ${forbidden[0]}`);
  const pushes = commands.filter((line) => /\bgit\s+(?:-\S+\s+)*push\b/.test(line));
  if (pushes.length !== 1 || pushes[0]?.trim() !== PUSH)
    findings.push(`the one write is ${PUSH}, never forced`);
  const at = commands.findIndex((line) => line.trim() === PUSH);
  if (at > 0) {
    if (commands[at - 1]?.trim() !== GATE)
      findings.push("the push sits directly in the ancestor test's 0 branch");
    const test = commands.findIndex((line) => line.trim() === ANCESTOR_TEST);
    if (test === -1 || test > at - 1) findings.push("the ancestor test comes before the push");
  }
  return findings;
}

describe("the standing Lovable branch moves by fast-forward only (DEC-416)", () => {
  it("CF-LVB-15 the workflow's shape: one push-to-dev event, contents: write, one fast-forward push behind the ancestor test, git only; each breach planted is found", () => {
    const live = readFileSync(WORKFLOW, "utf8");
    expect(lovableNextFindings(live)).toEqual([]);
    const planted: Array<[string, string, string]> = [
      [
        "a pull_request event",
        "  push:\n    branches: [dev]\n",
        "  pull_request:\n    branches: [dev]\n",
      ],
      [
        "a pull_request_target event",
        "  push:\n    branches: [dev]\n",
        "  pull_request_target:\n    branches: [dev]\n",
      ],
      [
        "a dispatch beside the push",
        "  push:\n    branches: [dev]\n",
        "  push:\n    branches: [dev]\n  workflow_dispatch:\n",
      ],
      ["another branch", "    branches: [dev]\n", "    branches: [dev, main]\n"],
      [
        "a second permission",
        "    permissions:\n      contents: write\n",
        "    permissions:\n      contents: write\n      pull-requests: write\n",
      ],
      ["a workflow-wide permission", "jobs:\n", "permissions:\n  contents: write\njobs:\n"],
      [
        "a secret",
        "    runs-on: ubuntu-24.04\n",
        "    runs-on: ubuntu-24.04\n    env:\n      T: ${{ secrets.ADMIN_TOKEN }}\n",
      ],
      ["a forced push", PUSH, 'git push --force origin "${head_sha}:refs/heads/lovable/next"'],
      ["a plus refspec", PUSH, 'git push origin "+${head_sha}:refs/heads/lovable/next"'],
      [
        "a lease push",
        PUSH,
        'git push --force-with-lease origin "${head_sha}:refs/heads/lovable/next"',
      ],
      ["a push of another ref", PUSH, 'git push origin "${head_sha}:refs/heads/dev"'],
      ["a push outside the ancestor test", GATE, "if true; then"],
      ["a push before the test", ANCESTOR_TEST, "true"],
      [
        "a step that runs a script",
        "      - name: Move lovable/next to dev's head\n",
        "      - name: Check\n        timeout-minutes: 1\n        run: bash scripts/x.sh\n      - name: Move lovable/next to dev's head\n",
      ],
      ["a missing step deadline", "        timeout-minutes: 3\n", ""],
      ["a missing job deadline", "    timeout-minutes: 10\n", ""],
      [
        "a checkout of another ref",
        "        with:\n",
        "        with:\n          ref: lovable/next\n",
      ],
      ["a checkout without history", "          fetch-depth: 0\n", ""],
    ];
    for (const [what, from, to] of planted) {
      const yml = live.replace(from, to);
      expect(yml, what).not.toBe(live);
      expect(lovableNextFindings(yml).length, what).toBeGreaterThan(0);
    }
  });
});

const GIT_ENV = {
  GIT_AUTHOR_NAME: "t",
  GIT_AUTHOR_EMAIL: "t@example.invalid",
  GIT_COMMITTER_NAME: "t",
  GIT_COMMITTER_EMAIL: "t@example.invalid",
  GIT_CONFIG_GLOBAL: "/dev/null",
  GIT_CONFIG_SYSTEM: "/dev/null",
};

function git(cwd: string, ...args: string[]): string {
  const result = spawnSync("git", args, {
    cwd,
    encoding: "utf8",
    env: { PATH: process.env["PATH"] ?? "", HOME: cwd, ...GIT_ENV },
    timeout: 20_000,
  });
  if (result.status !== 0) throw new Error(`git ${args.join(" ")}: ${result.stderr}`);
  return result.stdout.trim();
}

type Plant = {
  /** The commit lovable/next starts at: a name of the planted history, or null for no branch. */
  next: "none" | "behind" | "equal" | "ahead";
  /** A pre-receive hook that refuses every push. */
  refuse?: boolean;
};

/** The planted remotes of the running test: afterEach removes them. */
const scratch: string[] = [];
afterEach(() => {
  for (const dir of scratch.splice(0)) rmSync(dir, { recursive: true, force: true });
});

/** Run the step's own shell as the job would, over a planted remote; the verdict and what moved. */
function runStep(plant: Plant) {
  const dir = mkdtempSync(join(tmpdir(), "lvn-"));
  scratch.push(dir);
  const remote = join(dir, "remote.git");
  const seed = join(dir, "seed");
  mkdirSync(seed);
  git(dir, "init", "--bare", "--initial-branch=dev", remote);
  git(seed, "init", "--initial-branch=dev");
  const commit = (name: string) => {
    writeFileSync(join(seed, name), name);
    git(seed, "add", name);
    git(seed, "commit", "-m", name);
    return git(seed, "rev-parse", "HEAD");
  };
  const c1 = commit("c1");
  const c2 = commit("c2");
  const c3 = commit("c3");
  git(seed, "remote", "add", "origin", remote);
  git(seed, "push", "origin", "dev");
  const nextAt: Record<string, string> = {};
  if (plant.next === "behind") nextAt["sha"] = c1;
  if (plant.next === "equal") nextAt["sha"] = c3;
  if (plant.next === "ahead") {
    git(seed, "switch", "-c", "bundle", c2);
    nextAt["sha"] = commit("bundle");
  }
  if (nextAt["sha"] !== undefined)
    git(seed, "push", "origin", `${nextAt["sha"]}:refs/heads/lovable/next`);
  if (plant.refuse) {
    const hook = join(remote, "hooks", "pre-receive");
    writeFileSync(hook, "#!/bin/sh\necho refused >&2\nexit 1\n", { mode: 0o755 });
  }
  // The checkout step's result: every branch of the remote, dev's head the pushed commit.
  const work = join(dir, "work");
  git(dir, "clone", remote, work);
  const live = readWorkflow(WORKFLOW, readFileSync(WORKFLOW, "utf8"));
  const step = live[0]?.steps[1];
  if (step === undefined) throw new Error("the move step is not found");
  const summary = join(dir, "summary.md");
  writeFileSync(summary, "");
  const result = spawnSync("bash", ["-c", runLines(step.text).join("\n")], {
    cwd: work,
    encoding: "utf8",
    env: {
      PATH: process.env["PATH"] ?? "",
      HOME: dir,
      ...GIT_ENV,
      GITHUB_SHA: c3,
      GITHUB_STEP_SUMMARY: summary,
    },
    timeout: 30_000,
  });
  const remoteNext = spawnSync(
    "git",
    ["rev-parse", "--verify", "--quiet", "refs/heads/lovable/next"],
    {
      cwd: remote,
      encoding: "utf8",
      env: { PATH: process.env["PATH"] ?? "", ...GIT_ENV },
    },
  );
  return {
    code: result.status,
    summary: readFileSync(summary, "utf8"),
    after: remoteNext.status === 0 ? remoteNext.stdout.trim() : null,
    c1,
    c3,
    bundle: nextAt["sha"] ?? null,
  };
}

describe("the standing Lovable branch, run over planted histories (DEC-416)", () => {
  it("CF-LVB-16 an absent branch is left; an ancestor is fast-forwarded; a branch with a commit dev lacks and an equal one stay; a refused push is red", () => {
    const absent = runStep({ next: "none" });
    expect(absent.code).toBe(0);
    expect(absent.summary).toContain("lovable/next does not exist; nothing moved");
    expect(absent.after).toBeNull();

    const behind = runStep({ next: "behind" });
    expect(behind.code).toBe(0);
    expect(behind.after).toBe(behind.c3);
    expect(behind.summary).toContain("a fast-forward");

    const ahead = runStep({ next: "ahead" });
    expect(ahead.code).toBe(0);
    expect(ahead.after).toBe(ahead.bundle);
    expect(ahead.summary).toContain("holds a commit");
    expect(ahead.summary).toContain("nothing moved");

    const equal = runStep({ next: "equal" });
    expect(equal.code).toBe(0);
    expect(equal.after).toBe(equal.c3);
    expect(equal.summary).toContain("nothing to move");

    const refused = runStep({ next: "behind", refuse: true });
    expect(refused.code).not.toBe(0);
    expect(refused.after).toBe(refused.c1);
    expect(refused.summary).not.toContain("a fast-forward");
  });
});
