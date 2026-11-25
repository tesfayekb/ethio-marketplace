import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { afterAll, describe, expect, it } from "vitest";
import { walkFiles } from "../conformance/kit";

/**
 * DEC-394 (the tests and CI turn, Part C) — scripts/ci/lovable-branch-guard.sh: a pull request from
 * a `lovable/*` branch changes only what Lovable may change (Knowledge v3.14's ROLE paragraph,
 * DEC-386; the two DEC-390 exceptions and the third, DEC-396, judged by content). Every case plants
 * the GitHub API's own shape — the pull request's files, one JSON array per page — on the script's
 * stdin. DEC-398 (CF-LVB-13, CF-LVB-14): a patchless exception file is read from a planted git
 * history, the two sides fetched from a planted remote.
 */

const SCRIPT = "scripts/ci/lovable-branch-guard.sh";
const WORKFLOW = ".github/workflows/lovable-branch-guard.yml";

/**
 * DEC-413 — the guard's workflow, read by its lines: the one event `pull_request_target` on dev,
 * a job for `lovable/*` heads only, the token reading the contents and the pull request alone, no
 * secret, and exactly two steps — the base commit checked out without a kept credential, and the
 * base's script fed the API's files. The head's sha appears only as the guard's PR_HEAD_SHA (read
 * by `git diff`, DEC-398); its ref nowhere but the job's condition.
 */
function workflowShapeFindings(yml: string): string[] {
  const findings: string[] = [];
  const lines = yml.split("\n");
  const block = (key: string) => {
    const start = lines.indexOf(key);
    if (start === -1) return [];
    const end = lines.findIndex((line, i) => i > start && /^\S/.test(line));
    return lines
      .slice(start + 1, end === -1 ? undefined : end)
      .filter((line) => line.trim() !== "");
  };
  if (block("on:").join("\n") !== "  pull_request_target:\n    branches: [dev]")
    findings.push("the one event is pull_request_target on dev");
  if (block("permissions:").join("\n") !== "  contents: read\n  pull-requests: read")
    findings.push("the token reads the contents and the pull request, nothing more");
  if (lines.filter((line) => line.trim() === "permissions:").length !== 1)
    findings.push("no job widens the token");
  if (!yml.includes("    if: startsWith(github.head_ref, 'lovable/')\n"))
    findings.push("the job runs for lovable/* heads only");
  if (/\bsecrets\./.test(yml)) findings.push("no secret beyond the default token");
  const steps = lines.filter((line) => /^ {6}- /.test(line));
  if (
    steps.join("\n") !==
    "      - uses: actions/checkout@v5\n      - name: Lovable branch guard (DEC-394, DEC-413)"
  )
    findings.push("exactly two steps: the base checkout and the guard");
  if (
    !yml.includes(
      "        with:\n          ref: ${{ github.event.pull_request.base.sha }}\n          persist-credentials: false\n",
    )
  )
    findings.push("the checkout is the base commit, keeping no credential");
  const run = yml.slice(yml.indexOf("        run: |\n"));
  if (
    run !==
    '        run: |\n          set -o pipefail\n          gh api --paginate "repos/${REPO}/pulls/${PR_NUMBER}/files" | bash scripts/ci/lovable-branch-guard.sh\n'
  )
    findings.push("the one command feeds the API's files to the base's script");
  const headSha = lines.filter((line) => line.includes("pull_request.head."));
  if (headSha.join("\n") !== "          PR_HEAD_SHA: ${{ github.event.pull_request.head.sha }}")
    findings.push("the head's sha only as PR_HEAD_SHA");
  if (lines.filter((line) => line.includes("github.head_ref")).length !== 1)
    findings.push("the head's ref only in the job's condition");
  return findings;
}

type Entry = { filename: string; status: string; patch?: string; previous_filename?: string };

function run(pages: Entry[][] | string) {
  const input = typeof pages === "string" ? pages : pages.map((p) => JSON.stringify(p)).join("");
  const result = spawnSync("bash", [SCRIPT], { encoding: "utf8", input, timeout: 20_000 });
  return { code: result.status, out: `${result.stdout}${result.stderr}` };
}

const modified = (filename: string, patch = "@@ -1 +1 @@\n-a\n+b"): Entry => ({
  filename,
  status: "modified",
  patch,
});

/**
 * A ceiling line in DEC-296's form (an invented route), and the same line with its ceiling one
 * higher. INC-1201: written here, never read from the live file a ceilings turn rewrites.
 */
const CEILING_LINE =
  '  "/fixture-page": { ceiling: 268, public: false }, // DEC-296 (fixture turn): local 266.6 KiB; 270 → 268 = ceilingForLocal(266.6); was 270.';
const CEILING = {
  line: CEILING_LINE,
  grown: CEILING_LINE.replace("ceiling: 268,", "ceiling: 269,"),
};

/**
 * Four allowance lines in the allowlist's form (invented paths): two kept around two removed.
 * INC-1201: written here, never read from the live allowlist the form-kit turns shrink.
 */
const FORMS_ALLOWLIST = "scripts/conformance/forms-allowlist.txt";
const KEPT_A =
  "CF-FORM-1 src/features/fixture-a/fixture-a.tsx (1) | fixture: a kept line | DEC-339";
const GONE_B =
  "CF-FORM-1 src/features/fixture-b/fixture-b.tsx (2) | fixture: a removed line | DEC-339";
const GONE_C =
  "CF-FORM-1 src/features/fixture-c/fixture-c.tsx (1) | fixture: a removed line | DEC-339";
const KEPT_D =
  "CF-FORM-1 src/features/fixture-d/fixture-d.tsx (1) | fixture: a kept line | DEC-339";
/** The API's patch for a removal of two lines between two kept ones: `-` lines only. */
const REMOVED_ONLY = `@@ -14,4 +14,2 @@\n ${KEPT_A}\n-${GONE_B}\n-${GONE_C}\n ${KEPT_D}`;
const NOT_REMOVAL = (path: string) =>
  `${path} — a Lovable branch may only remove an allowance — DEC-396; an added or changed line is refused`;

describe("a Lovable branch's pull request changes only screen files (DEC-394)", () => {
  it("CF-LVB-1 every forbidden path refuses with its rule and DEC", () => {
    const table: [string, string][] = [
      ["supabase/migrations/20261116000000_x.sql", "supabase/** — the database (DEC-386)"],
      ["supabase/config.toml", "supabase/** — the database (DEC-386)"],
      ["src/features/auth/sign-in-form.tsx", "src/features/auth/** — sign-in code (DEC-386)"],
      ["src/lib/supabase-door.ts", "src/lib/supabase-door.ts — sign-in code (DEC-386)"],
      ["src/server/route.ts", "src/server/** — server code (DEC-386)"],
      ["src/routes/api/listings.ts", "src/routes/api/** — server routes (DEC-386)"],
      [
        "src/integrations/supabase/client.ts",
        "src/integrations/supabase/** — the platform's client",
      ],
      [".github/workflows/ci.yml", ".github/** — workflows (DEC-386)"],
      ["e2e/helpers/ui.ts", "e2e/helpers/** — e2e helpers (DEC-386)"],
      ["e2e/global-setup.ts", "e2e/global-setup.ts — e2e global setup (DEC-386)"],
      ["e2e/global-teardown.ts", "e2e/global-teardown.ts — e2e global setup (DEC-386)"],
      ["e2e/fixtures.ts", "e2e/fixtures.ts — e2e global setup (DEC-386)"],
      ["package.json", "package.json — dependencies (DEC-386)"],
      ["bun.lock", "bun.lock — dependencies (DEC-386)"],
      ["roadmap.md", "roadmap.md — a ledger (DEC-386)"],
      ["docs/tracking/incidental-findings.md", "docs/tracking/** — a ledger (DEC-386"],
      ["docs/governance/mechanisms.md", "docs/governance/mechanisms.md — a ledger (DEC-386)"],
      ["docs/_changelog.md", "docs/_changelog.md — a ledger (DEC-386)"],
      ["docs/spec/spec-ledger.md", "docs/spec/** — a ledger (DEC-386)"],
    ];
    for (const [path, rule] of table) {
      const result = run([[modified(path)]]);
      expect(result.code, path).toBe(1);
      expect(result.out, path).toContain(`${path} — modified: ${rule}`);
    }
    const both = run([[modified("package.json"), modified("bun.lock")]]);
    expect(both.out).toContain("2 change(s) outside what a Lovable branch may change (DEC-394)");
    expect(both.out).toContain("package.json — modified");
    expect(both.out).toContain("bun.lock — modified");
  });

  it("CF-LVB-2 a .sql file outside supabase/ refuses", () => {
    const result = run([
      [
        {
          filename: "src/features/posting/query.sql",
          status: "added",
          patch: "@@ -0,0 +1 @@\n+select 1;",
        },
      ],
    ]);
    expect(result.code).toBe(1);
    expect(result.out).toContain(
      "src/features/posting/query.sql — added: *.sql — SQL anywhere (DEC-386)",
    );
  });

  it("CF-LVB-3 the deletions ledger: an added line passes, a removed or changed one refuses", () => {
    const path = "docs/tracking/intentional-deletions.txt";
    const added = run([[modified(path, "@@ -10,2 +10,3 @@\n src/a.tsx\n src/b.tsx\n+src/c.tsx")]]);
    expect(added.code).toBe(0);
    const removed = run([[modified(path, "@@ -10,2 +10,1 @@\n src/a.tsx\n-src/b.tsx")]]);
    expect(removed.code).toBe(1);
    expect(removed.out).toContain(
      `${path} — a removed or changed line; DEC-390 allows added lines only`,
    );
    const changed = run([[modified(path, "@@ -10 +10 @@\n-src/b.tsx\n+src/bb.tsx")]]);
    expect(changed.code).toBe(1);
  });

  it("CF-LVB-4 the ceilings file: a ceiling line passes, any other edit refuses", () => {
    const path = "scripts/route-budgets.mjs";
    const ceiling = run([
      [
        modified(
          path,
          `@@ -30 +30 @@\n-${CEILING.line}\n+${CEILING.grown}\n\\ No newline at end of file`,
        ),
      ],
    ]);
    expect(ceiling.code).toBe(0);
    const other = run([
      [modified(path, `@@ -30 +30,2 @@\n ${CEILING.line}\n+export const LOOSE = true;`)],
    ]);
    expect(other.code).toBe(1);
    expect(other.out).toContain(
      `${path} — a changed line that is not a ceiling line; DEC-390 allows ceiling lines only`,
    );
    const widened = run([
      [
        modified(
          path,
          `@@ -30 +30 @@\n-${CEILING.line}\n+${CEILING.line.replace(" }, //", ", extra: 1 }, //")}`,
        ),
      ],
    ]);
    expect(widened.code).toBe(1);
  });

  it("CF-LVB-5 the platform's notes (.lovable/**) refuse", () => {
    const result = run([
      [{ filename: ".lovable/plan.md", status: "added", patch: "@@ -0,0 +1 @@\n+notes" }],
    ]);
    expect(result.code).toBe(1);
    expect(result.out).toContain(
      ".lovable/plan.md — added: .lovable/** — the platform's notes (INC-1168, DEC-386)",
    );
  });

  it("CF-LVB-6 screen files pass, across pages", () => {
    const result = run([
      [modified("src/components/shell/menu-row.ts"), modified("src/routes/index.tsx")],
      [
        modified("src/features/posting/components/step-photos.tsx"),
        modified("e2e/post-wizard.spec.ts"),
      ],
    ]);
    expect(result.code).toBe(0);
    expect(result.out).toContain(
      "lovable-branch-guard: 4 file(s), none outside what a Lovable branch may change (DEC-394).",
    );
  });

  it("CF-LVB-7 an exception file whose patch the API does not carry refuses", () => {
    for (const path of ["docs/tracking/intentional-deletions.txt", "scripts/route-budgets.mjs"]) {
      const result = run([[{ filename: path, status: "modified" }]]);
      expect(result.code, path).toBe(1);
      expect(result.out, path).toContain(`${path} — the API carries no patch for it`);
    }
  });

  it("CF-LVB-8 a rename away from a forbidden path refuses; a forbidden path on a later page refuses", () => {
    const renamed = run([
      [
        {
          filename: "src/components/x.ts",
          previous_filename: "src/server/x.ts",
          status: "renamed",
        },
      ],
    ]);
    expect(renamed.code).toBe(1);
    expect(renamed.out).toContain(
      "src/server/x.ts — renamed to src/components/x.ts: src/server/** — server code (DEC-386)",
    );
    const later = run([[modified("src/routes/index.tsx")], [modified("package.json")]]);
    expect(later.code).toBe(1);
    expect(later.out).toContain("package.json — modified");
  });

  it("CF-LVB-9 input that is not the API's JSON arrays is an error, never a pass", () => {
    for (const input of [
      "",
      "not json",
      '{"message":"Not Found"}',
      '[{"filename":"a"}]{"message":"x"}',
    ]) {
      const result = run(input);
      expect(result.code, input).toBe(2);
      expect(result.out, input).toContain(
        "the input is not the pull request's files from the GitHub API",
      );
    }
  });

  it("CF-LVB-10 its own workflow judges it from the base: pull_request_target on lovable/* heads, the base checked out, no step that runs the head's code (DEC-413)", () => {
    expect(workflowShapeFindings(readFileSync(WORKFLOW, "utf8"))).toEqual([]);
    const ci = readFileSync(".github/workflows/ci.yml", "utf8");
    expect(ci).not.toContain("lovable-branch-guard.sh");
    expect(ci).not.toContain("- name: Lovable branch guard");

    // Planted: each way the workflow could run or reach the head's code is found.
    const live = readFileSync(WORKFLOW, "utf8");
    const planted: Array<[string, string, string]> = [
      ["the pull_request event", "  pull_request_target:\n", "  pull_request:\n"],
      [
        "a head checkout",
        "ref: ${{ github.event.pull_request.base.sha }}",
        "ref: ${{ github.event.pull_request.head.sha }}",
      ],
      ["a kept credential", "persist-credentials: false", "persist-credentials: true"],
      ["a write permission", "  contents: read\n", "  contents: write\n"],
      [
        "a step that installs",
        "      - name: Lovable branch guard (DEC-394, DEC-413)",
        "      - run: bun install\n      - name: Lovable branch guard (DEC-394, DEC-413)",
      ],
      ["a secret", "GH_TOKEN: ${{ github.token }}", "GH_TOKEN: ${{ secrets.ADMIN_TOKEN }}"],
      ["every head", "if: startsWith(github.head_ref, 'lovable/')", "if: true"],
    ];
    for (const [what, from, to] of planted) {
      const yml = live.replace(from, to);
      expect(yml, what).not.toBe(live);
      expect(workflowShapeFindings(yml).length, what).toBeGreaterThan(0);
    }
  });

  it("CF-LVB-11 an allowlist under scripts/conformance/ may lose lines: removed lines only pass (DEC-396)", () => {
    const removed = run([[modified(FORMS_ALLOWLIST, REMOVED_ONLY)]]);
    expect(removed.code).toBe(0);
    expect(removed.out).toContain(
      "lovable-branch-guard: 1 file(s), none outside what a Lovable branch may change (DEC-394).",
    );
    // Beside the other two exceptions and a screen file, as wave 3's own pull request ships it.
    const wave = run([
      [
        modified("src/features/admin-countries/country-dialogs.tsx"),
        modified(FORMS_ALLOWLIST, REMOVED_ONLY),
        modified(
          "docs/tracking/intentional-deletions.txt",
          "@@ -10 +10,2 @@\n src/a.tsx\n+src/c.tsx",
        ),
      ],
    ]);
    expect(wave.code).toBe(0);
    // Every allowlist file of the tree takes the exception, not only the forms one.
    const paths = walkFiles(["scripts/conformance"], { ext: ["txt"] }).filter(
      (f) => f.endsWith("-allowlist.txt") && f.split("/").length === 3,
    );
    expect(paths.length).toBeGreaterThan(1);
    const every = run([paths.map((path) => modified(path, REMOVED_ONLY))]);
    expect(every.code, every.out).toBe(0);
  });

  it("CF-LVB-12 an allowlist's added or changed line, a rename, a new file or no patch refuses, and nothing else under scripts/ gains the exception (DEC-396)", () => {
    const added = run([
      [modified(FORMS_ALLOWLIST, `@@ -14,2 +14,3 @@\n ${KEPT_A}\n+${GONE_B}\n ${KEPT_D}`)],
    ]);
    expect(added.code).toBe(1);
    expect(added.out).toContain(NOT_REMOVAL(FORMS_ALLOWLIST));
    const changed = run([
      [modified(FORMS_ALLOWLIST, `@@ -14 +14 @@\n-${GONE_B}\n+${GONE_B.replace("(", "(9")}`)],
    ]);
    expect(changed.code).toBe(1);
    expect(changed.out).toContain(NOT_REMOVAL(FORMS_ALLOWLIST));
    const mixed = run([[modified(FORMS_ALLOWLIST, `${REMOVED_ONLY}\n+${GONE_B}`)]]);
    expect(mixed.code).toBe(1);
    expect(mixed.out).toContain(NOT_REMOVAL(FORMS_ALLOWLIST));

    const noPatch = run([[{ filename: FORMS_ALLOWLIST, status: "modified" }]]);
    expect(noPatch.code).toBe(1);
    expect(noPatch.out).toContain(`${FORMS_ALLOWLIST} — the API carries no patch for it`);
    expect(noPatch.out).toContain("DEC-396's exception cannot be read");

    // A new, renamed or deleted allowlist is not "a line removed": refused, whatever its patch.
    for (const status of ["added", "renamed", "removed"]) {
      const result = run([
        [{ filename: "scripts/conformance/new-allowlist.txt", status, patch: REMOVED_ONLY }],
      ]);
      expect(result.code, status).toBe(1);
      expect(result.out, status).toContain(
        `scripts/conformance/new-allowlist.txt — ${status}; a Lovable branch may only remove lines of an existing allowlist — DEC-396`,
      );
    }
    // A rename away from an allowlist reads the old path under the scripts/** rule.
    const renamedAway = run([
      [{ filename: "docs/old-list.txt", previous_filename: FORMS_ALLOWLIST, status: "renamed" }],
    ]);
    expect(renamedAway.code).toBe(1);
    expect(renamedAway.out).toContain(
      `${FORMS_ALLOWLIST} — renamed to docs/old-list.txt: scripts/** — the guards and tools (DEC-386; the three exceptions: a ceiling line, DEC-390; a removed allowlist line, DEC-396; the stylesheet's limit line, DEC-425; the entry's limit line, DEC-468)`,
    );

    // Nothing else under scripts/ takes the exception, with a removal-only patch or not.
    const scriptsRule =
      "scripts/** — the guards and tools (DEC-386; the three exceptions: a ceiling line, DEC-390; a removed allowlist line, DEC-396; the stylesheet's limit line, DEC-425; the entry's limit line, DEC-468)";
    for (const path of [
      "scripts/conformance/kit.ts",
      "scripts/doors/manifest.txt",
      "scripts/conformance/nested/x-allowlist.txt",
      "scripts/conformance/forms-allowlist.txt.bak",
      "scripts/conformance/allowlist.txt",
      "scripts/forms-allowlist.txt",
    ]) {
      const result = run([[modified(path, REMOVED_ONLY)]]);
      expect(result.code, path).toBe(1);
      expect(result.out, path).toContain(`${path} — modified: ${scriptsRule}`);
    }
  });
});

/**
 * DEC-398 — the git the script reads for a patchless exception file. A planted remote holds a base
 * commit and a head commit; the work tree the script runs in has it as `origin` and nothing else
 * (a shallow checkout holds neither commit, as the scope job's does not).
 */
const SCRATCH = mkdtempSync(join(tmpdir(), "lvb-"));
afterAll(() => rmSync(SCRATCH, { recursive: true, force: true }));

const GIT_ENV = {
  ...process.env,
  GIT_AUTHOR_NAME: "planted",
  GIT_AUTHOR_EMAIL: "planted@example.invalid",
  GIT_COMMITTER_NAME: "planted",
  GIT_COMMITTER_EMAIL: "planted@example.invalid",
  GIT_CONFIG_GLOBAL: "/dev/null",
  GIT_CONFIG_SYSTEM: "/dev/null",
};

function git(cwd: string, ...args: string[]): string {
  const result = spawnSync("git", args, { cwd, encoding: "utf8", env: GIT_ENV, timeout: 20_000 });
  if (result.status !== 0) throw new Error(`git ${args.join(" ")}: ${result.stderr}`);
  return result.stdout.trim();
}

type Side = Record<string, string | Buffer>;
let planted = 0;

/** A remote with two commits (`base`, then `head`) holding `files`, and the work tree for it. */
function plant(base: Side, head: Side) {
  const root = join(SCRATCH, `case-${(planted += 1)}`);
  const remote = join(root, "remote");
  const work = join(root, "work");
  mkdirSync(remote, { recursive: true });
  mkdirSync(work, { recursive: true });
  git(remote, "init", "--quiet", "--template=", "--initial-branch=main");
  git(remote, "config", "uploadpack.allowAnySHA1InWant", "true");
  git(remote, "config", "uploadpack.allowFilter", "true");
  const commit = (files: Side, message: string) => {
    for (const [path, body] of Object.entries(files)) {
      mkdirSync(dirname(join(remote, path)), { recursive: true });
      writeFileSync(join(remote, path), body);
    }
    git(remote, "add", "--all");
    git(remote, "commit", "--quiet", "--allow-empty", "-m", message);
    return git(remote, "rev-parse", "HEAD");
  };
  const baseSha = commit(base, "base");
  const headSha = commit(head, "head");
  git(work, "init", "--quiet", "--template=");
  git(work, "remote", "add", "origin", `file://${remote}`);
  return { work, baseSha, headSha };
}

function runInGit(
  pages: Entry[][],
  tree: { work: string; baseSha: string; headSha: string },
  env: Record<string, string> = {},
) {
  const input = pages.map((p) => JSON.stringify(p)).join("");
  const result = spawnSync("bash", [resolve(SCRIPT)], {
    encoding: "utf8",
    input,
    cwd: tree.work,
    timeout: 60_000,
    env: { ...GIT_ENV, PR_BASE_SHA: tree.baseSha, PR_HEAD_SHA: tree.headSha, ...env },
  });
  return { code: result.status, out: `${result.stdout}${result.stderr}` };
}

const noPatch = (filename: string): Entry => ({ filename, status: "modified" });

/**
 * INC-1206 — the ceilings file's path with a text of the test's own, in its form: twelve ceiling
 * lines of about 4 KB each, as the real file's lines are (why the API carries no patch for it), so
 * a change to the live scripts/route-budgets.mjs never changes a verdict here.
 */
const BUDGETS = "scripts/route-budgets.mjs";
const budgetsText = [
  "/** The first-download ceilings (a fixture in the file's form). */",
  "export const ROUTE_BUDGETS_KIB = {",
  ...Array.from(
    { length: 12 },
    (_, i) =>
      `  "/page-${i + 1}": { ceiling: ${210 + i}, public: ${i % 2 === 0} }, // DEC-296 (fixture ${i + 1}): ${"a cause measured and named; ".repeat(150)}`,
  ),
  "};",
  "",
].join("\n");
function grown(count: number, extra?: (lines: string[]) => void): string {
  const lines = budgetsText.split("\n");
  let done = 0;
  for (let i = 0; i < lines.length && done < count; i += 1) {
    if (/^ {2}"[^"]+": \{ ceiling: \d+, public: (true|false) \}, \/\/ .+$/.test(lines[i] ?? "")) {
      lines[i] = (lines[i] ?? "").replace(
        /ceiling: (\d+)/,
        (_, n: string) => `ceiling: ${Number(n) + 1}`,
      );
      done += 1;
    }
  }
  if (done < count) throw new Error("the ceilings fixture has too few ceiling lines");
  extra?.(lines);
  return lines.join("\n");
}

describe("a patchless exception file is read from git (DEC-398)", () => {
  it("CF-LVB-13 a ceilings file the API carries no patch for passes when git's changed lines are ceiling lines; every unreadable side refuses", () => {
    const tree = plant({ [BUDGETS]: budgetsText }, { [BUDGETS]: grown(9) });
    const passes = runInGit([[noPatch(BUDGETS)]], tree);
    expect(passes.code, passes.out).toBe(0);
    expect(passes.out).toContain(
      "lovable-branch-guard: 1 file(s), none outside what a Lovable branch may change (DEC-394).",
    );

    // Beside a screen file and a path-rule refusal: the verdict is per file, git read once.
    const beside = runInGit(
      [[modified("src/routes/index.tsx"), noPatch(BUDGETS), modified("package.json")]],
      tree,
    );
    expect(beside.code).toBe(1);
    expect(beside.out).toContain("1 change(s) outside what a Lovable branch may change (DEC-394)");
    expect(beside.out).toContain("package.json — modified");
    expect(beside.out).not.toContain(BUDGETS);

    // The same two sides under the other exceptions: an added ledger line; an allowlist's removals.
    const ledger = "docs/tracking/intentional-deletions.txt";
    const lists = plant(
      {
        [ledger]: "src/a.tsx\n",
        [FORMS_ALLOWLIST]: `${KEPT_A}\n${GONE_B}\n${GONE_C}\n${KEPT_D}\n`,
      },
      { [ledger]: "src/a.tsx\nsrc/c.tsx\n", [FORMS_ALLOWLIST]: `${KEPT_A}\n${KEPT_D}\n` },
    );
    const listed = runInGit([[noPatch(ledger), noPatch(FORMS_ALLOWLIST)]], lists);
    expect(listed.code, listed.out).toBe(0);

    // The two sides alike: no changed line, nothing to refuse.
    const alike = runInGit([[noPatch(BUDGETS)]], plant({ [BUDGETS]: budgetsText }, {}));
    expect(alike.code, alike.out).toBe(0);

    // A side that cannot be read is a refusal, never a pass.
    const unreadable = "its two sides could not be read from git";
    const noShas = runInGit([[noPatch(BUDGETS)]], tree, { PR_BASE_SHA: "", PR_HEAD_SHA: "" });
    expect(noShas.code).toBe(1);
    expect(noShas.out).toContain(`${BUDGETS} — the API carries no patch for it`);
    expect(noShas.out).toContain(unreadable);
    expect(noShas.out).toContain("not both a commit's forty hex digits");
    const malformed = runInGit([[noPatch(BUDGETS)]], tree, { PR_HEAD_SHA: "--upload-pack=x" });
    expect(malformed.code).toBe(1);
    expect(malformed.out).toContain("not both a commit's forty hex digits");
    const absent = runInGit([[noPatch(BUDGETS)]], tree, { PR_HEAD_SHA: "0".repeat(40) });
    expect(absent.code).toBe(1);
    expect(absent.out).toContain("git fetch of the base and head commits failed");
    expect(absent.out).toContain("DEC-390's exception cannot be read");
    const binary = runInGit(
      [[noPatch(BUDGETS)]],
      plant({ [BUDGETS]: Buffer.from([0, 1, 2, 3]) }, { [BUDGETS]: Buffer.from([0, 1, 2, 4]) }),
    );
    expect(binary.code).toBe(1);
    expect(binary.out).toContain("git holds no text hunk for it (a binary file)");

    // A patchless file under no exception keeps its path rule, and git is not read for it.
    const plain = runInGit([[noPatch("src/routes/index.tsx"), noPatch("package.json")]], tree, {
      PR_BASE_SHA: "",
      PR_HEAD_SHA: "",
    });
    expect(plain.code).toBe(1);
    expect(plain.out).toContain("1 change(s) outside what a Lovable branch may change (DEC-394)");
    expect(plain.out).toContain("package.json — modified: package.json — dependencies (DEC-386)");
    expect(plain.out).not.toContain("src/routes/index.tsx");

    // The step names the two commits and the guard reads nothing else of the pull request's git.
    const workflow = readFileSync(WORKFLOW, "utf8");
    const step = workflow.slice(
      workflow.indexOf("- name: Lovable branch guard (DEC-394, DEC-413)"),
    );
    const env = step.slice(0, step.indexOf("        run: |"));
    expect(env).toContain("PR_BASE_SHA: ${{ github.event.pull_request.base.sha }}");
    expect(env).toContain("PR_HEAD_SHA: ${{ github.event.pull_request.head.sha }}");
  }, 30_000);

  it("CF-LVB-14 the same file with one changed line that is not a ceiling line refuses with DEC-390 named", () => {
    const other = plant(
      { [BUDGETS]: budgetsText },
      { [BUDGETS]: grown(9, (lines) => lines.push("export const LOOSE = true;")) },
    );
    const refused = runInGit([[noPatch(BUDGETS)]], other);
    expect(refused.code).toBe(1);
    expect(refused.out).toContain(
      `${BUDGETS} — a changed line that is not a ceiling line; DEC-390 allows ceiling lines only`,
    );
    expect(refused.out).toContain("1 change(s) outside what a Lovable branch may change (DEC-394)");

    // A ceiling line widened with a key is no ceiling line.
    const widened = plant(
      { [BUDGETS]: budgetsText },
      {
        [BUDGETS]: grown(1, (lines) => {
          const at = lines.findIndex((l) => l.includes(" }, // "));
          lines[at] = (lines[at] ?? "").replace(" }, //", ", extra: 1 }, //");
        }),
      },
    );
    const wide = runInGit([[noPatch(BUDGETS)]], widened);
    expect(wide.code).toBe(1);
    expect(wide.out).toContain("DEC-390 allows ceiling lines only");

    // The other exceptions judge git's lines as they judge the API's: a removed ledger line, an
    // allowlist's added line, and a new allowlist file refuse.
    const ledger = "docs/tracking/intentional-deletions.txt";
    const lists = plant(
      {
        [ledger]: "src/a.tsx\nsrc/b.tsx\n",
        [FORMS_ALLOWLIST]: `${KEPT_A}\n${KEPT_D}\n`,
      },
      { [ledger]: "src/a.tsx\n", [FORMS_ALLOWLIST]: `${KEPT_A}\n${GONE_B}\n${KEPT_D}\n` },
    );
    const bad = runInGit([[noPatch(ledger), noPatch(FORMS_ALLOWLIST)]], lists);
    expect(bad.code).toBe(1);
    expect(bad.out).toContain(
      `${ledger} — a removed or changed line; DEC-390 allows added lines only`,
    );
    expect(bad.out).toContain(NOT_REMOVAL(FORMS_ALLOWLIST));
    const fresh = plant({}, { "scripts/conformance/new-allowlist.txt": `${KEPT_A}\n` });
    const added = runInGit(
      [[{ filename: "scripts/conformance/new-allowlist.txt", status: "added" }]],
      fresh,
    );
    expect(added.code).toBe(1);
    expect(added.out).toContain(
      "scripts/conformance/new-allowlist.txt — added; a Lovable branch may only remove lines of an existing allowlist — DEC-396",
    );
  }, 30_000);
});

/**
 * DEC-425 — the stylesheet's limit line of scripts/check-bundle-size.mjs. The guard places the
 * change from the BASE checkout's own file (it runs in the base, DEC-413), so each case runs in a
 * scratch directory that holds a fixture of that file in its form (INC-1201: never the live file a
 * ceilings turn rewrites), and every patch is `git diff`'s own output over two fixture texts.
 */
const BUNDLE = "scripts/check-bundle-size.mjs";
const bundleLines = [
  'import { readAllowlist } from "./conformance/kit.ts";',
  "",
  "/** Ceilings in KiB, gzipped, for everything the browser loads before paint. */",
  "const BUDGET_KIB = {",
  "  // DEC-231 (fixture): an older turn's cause.",
  "  // DEC-296 (fixture turn): JS local 201.7 KiB; 205 → 203 = ceilingForLocal(201.7); was 205. CSS local 22.54 KiB; 40 → 23 = ceilingForLocal(22.54); was 40.",
  "  js: 203,",
  "  css: 23,",
  "};",
  "",
  "const CANDIDATE_DIRS = [",
  '  ".output/public",',
  "];",
  "",
  "const OTHER = { js: 1, css: 2 };",
];
const CSS_AT = bundleLines.indexOf("  css: 23,");
const JS_AT = bundleLines.indexOf("  js: 203,");
const CSS_COMMENT =
  "  // DEC-296 (fixture C): CSS local 22.8 KiB; 23 → 24 = ceilingForLocal(22.8); was 23.";

/** The scratch directory the guard runs in: the fixture file is the base's. */
const baseDir = (() => {
  const dir = mkdtempSync(join(SCRATCH, "base-"));
  mkdirSync(join(dir, "scripts"), { recursive: true });
  writeFileSync(join(dir, BUNDLE), `${bundleLines.join("\n")}\n`);
  return dir;
})();

/** `git diff`'s patch (the API's form, three lines of context) of the fixture and a changed copy. */
function bundlePatch(change: (lines: string[]) => void, context = 3): string {
  const head = [...bundleLines];
  change(head);
  const dir = mkdtempSync(join(SCRATCH, "diff-"));
  writeFileSync(join(dir, "a"), `${bundleLines.join("\n")}\n`);
  writeFileSync(join(dir, "b"), `${head.join("\n")}\n`);
  const result = spawnSync("git", ["diff", "--no-index", `--unified=${context}`, "a", "b"], {
    cwd: dir,
    encoding: "utf8",
    env: GIT_ENV,
    timeout: 20_000,
  });
  const text = result.stdout;
  const patch = text.slice(text.indexOf("@@")).trimEnd();
  if (!patch.startsWith("@@")) throw new Error("the planted patch is empty");
  return patch;
}

function runAt(cwd: string, pages: Entry[][]) {
  const input = pages.map((p) => JSON.stringify(p)).join("");
  const result = spawnSync("bash", [resolve(SCRIPT)], {
    encoding: "utf8",
    input,
    cwd,
    timeout: 20_000,
    env: GIT_ENV,
  });
  return { code: result.status, out: `${result.stdout}${result.stderr}` };
}

const moveCss = (lines: string[]) => {
  lines[CSS_AT] = "  css: 24,";
};
const NONE_OUTSIDE =
  "lovable-branch-guard: 1 file(s), none outside what a Lovable branch may change (DEC-394).";

describe("the stylesheet's limit line of the bundle-size guard (DEC-425)", () => {
  it("CF-LVB-17 the css number alone, or with one DEC-296 comment above the limits, passes — by the API's patch and by git's", () => {
    const alone = runAt(baseDir, [[modified(BUNDLE, bundlePatch(moveCss))]]);
    expect(alone.code, alone.out).toBe(0);
    expect(alone.out).toContain(NONE_OUTSIDE);

    // The comment directly above `js:`, and at the block's first line after its opening.
    for (const at of [JS_AT, bundleLines.indexOf("const BUDGET_KIB = {") + 1]) {
      const withComment = (lines: string[]) => {
        moveCss(lines);
        lines.splice(at, 0, CSS_COMMENT);
      };
      const result = runAt(baseDir, [[modified(BUNDLE, bundlePatch(withComment))]]);
      expect(result.code, `${at}: ${result.out}`).toBe(0);
      // The same change as git holds it (no context lines), for a file the API carries no patch for.
      const zero = bundlePatch(withComment, 0);
      const viaGit = runAt(baseDir, [[modified(BUNDLE, zero)]]);
      expect(viaGit.code, `${at} u0: ${viaGit.out}`).toBe(0);
    }
    // The local form too: `ceilingFor(` and `CI`, a sixth-decimal size.
    const ci = (lines: string[]) => {
      moveCss(lines);
      lines.splice(
        JS_AT,
        0,
        "  // DEC-296 (fixture D): CSS CI 22.9 KiB; 23 → 24 = ceilingFor(22.9); was 23.",
      );
    };
    expect(runAt(baseDir, [[modified(BUNDLE, bundlePatch(ci))]]).code).toBe(0);

    // The file with no patch from the API is read from git, as DEC-398 reads the ceilings file.
    const tree = plant(
      { [BUNDLE]: `${bundleLines.join("\n")}\n` },
      {
        [BUNDLE]: `${bundleLines.map((l, i) => (i === CSS_AT ? "  css: 24," : l)).join("\n")}\n`,
      },
    );
    mkdirSync(join(tree.work, "scripts"), { recursive: true });
    writeFileSync(join(tree.work, BUNDLE), `${bundleLines.join("\n")}\n`);
    const patchless = runInGit([[noPatch(BUNDLE)]], tree);
    expect(patchless.code, patchless.out).toBe(0);
    expect(patchless.out).toContain(NONE_OUTSIDE);
  }, 30_000);

  it("CF-LVB-18 any other line of the file, the same line in another form, and a comment out of place or out of agreement refuse", () => {
    const why = `${BUNDLE} — a changed line that is not the entry's or the stylesheet's limit line; DEC-425 (css) and DEC-468 (js) admit those two numbers and their DEC-296 comments only`;
    const refused = (what: string, change: (lines: string[]) => void, expected: string) => {
      const result = runAt(baseDir, [[modified(BUNDLE, bundlePatch(change))]]);
      expect(result.code, what).toBe(1);
      expect(result.out, what).toContain(expected);
      expect(result.out, what).toContain("1 change(s) outside what a Lovable branch may change");
    };

    // The default patch of CF-LVB-1's table: a path of the file, no stylesheet line.
    const plain = run([[modified(BUNDLE)]]);
    expect(plain.code).toBe(1);
    expect(plain.out).toContain(why);

    refused("a line elsewhere", (l) => l.push("const MORE = true;"), why);
    refused("the other css", (l) => (l[l.length - 1] = "const OTHER = { js: 1, css: 3 };"), why);
    refused("a trailing comment", (l) => (l[CSS_AT] = "  css: 24, // loose"), why);
    refused("a quoted key", (l) => (l[CSS_AT] = '  "css": 24,'), why);
    refused(
      "a removed comment",
      (l) => {
        moveCss(l);
        l.splice(JS_AT - 1, 1);
      },
      why,
    );
    refused(
      "a comment in another form",
      (l) => {
        moveCss(l);
        l.splice(JS_AT, 0, "  // css moves to 24");
      },
      why,
    );
    refused(
      "a comment for both limits (two arrows)",
      (l) => {
        moveCss(l);
        l.splice(
          JS_AT,
          0,
          "  // DEC-296 (fixture E): JS local 201.7 KiB; 203 → 204 = ceilingForLocal(201.7); was 203. CSS local 22.8 KiB; 23 → 24 = ceilingForLocal(22.8); was 23.",
        );
      },
      why,
    );
    refused(
      "a second comment",
      (l) => {
        moveCss(l);
        l.splice(JS_AT, 0, CSS_COMMENT, CSS_COMMENT.replace("fixture C", "fixture F"));
      },
      `${BUNDLE} — a second comment line for one limit; DEC-425 and DEC-468 admit one DEC-296 comment for each limit`,
    );
    refused(
      "numbers that disagree",
      (l) => {
        moveCss(l);
        l.splice(JS_AT, 0, CSS_COMMENT.replace("23 → 24", "23 → 30"));
      },
      `${BUNDLE} — the comment says 23 → 30, was 23; the css lines say 23 → 24 (DEC-425, DEC-468)`,
    );
    refused(
      "a comment below the limits",
      (l) => {
        moveCss(l);
        l.splice(CSS_AT + 2, 0, CSS_COMMENT);
      },
      `${BUNDLE} — the comment is outside the block above the two limits`,
    );
    refused(
      "a comment above the block",
      (l) => {
        moveCss(l);
        l.splice(0, 0, CSS_COMMENT);
      },
      `${BUNDLE} — the comment is outside the block above the two limits`,
    );
    refused(
      "no css line change",
      (l) => l.splice(JS_AT, 0, CSS_COMMENT),
      `${BUNDLE} — DEC-425 and DEC-468 admit a limit as one removed and one added \`css:\` or \`js:\` line (0 removed, 0 added)`,
    );
    refused(
      "the css line moved",
      (l) => {
        l.splice(CSS_AT, 1);
        l.splice(CSS_AT + 4, 0, "  css: 24,");
      },
      "DEC-425, DEC-468",
    );

    // A new, renamed or deleted file is not a changed limit; a patch of no text refuses.
    for (const status of ["added", "renamed", "removed"]) {
      const result = runAt(baseDir, [[{ filename: BUNDLE, status, patch: bundlePatch(moveCss) }]]);
      expect(result.code, status).toBe(1);
      expect(result.out, status).toContain(
        `${BUNDLE} — ${status}; a Lovable branch may only move the stylesheet's or the entry's limit line of the existing file — DEC-425, DEC-468`,
      );
    }
    const unreadable = runAt(baseDir, [[{ filename: BUNDLE, status: "modified" }]]);
    expect(unreadable.code).toBe(1);
    expect(unreadable.out).toContain(`${BUNDLE} — the API carries no patch for it`);
    expect(unreadable.out).toContain("DEC-425, DEC-468's exception cannot be read");
    const garbled = runAt(baseDir, [[modified(BUNDLE, "no hunk here\n-  css: 23,\n+  css: 24,")]]);
    expect(garbled.code).toBe(1);

    // A base with no budget block to place the change in is a refusal, never a pass.
    const empty = mkdtempSync(join(SCRATCH, "empty-"));
    const blind = runAt(empty, [[modified(BUNDLE, bundlePatch(moveCss))]]);
    expect(blind.code).toBe(1);
    expect(blind.out).toContain("holds no BUDGET_KIB block above its `js:` line");

    // Beside a pass for the number: the other file's refusal stands.
    const beside = runAt(baseDir, [
      [modified(BUNDLE, bundlePatch(moveCss)), modified("package.json")],
    ]);
    expect(beside.code).toBe(1);
    expect(beside.out).toContain("1 change(s) outside what a Lovable branch may change");
    expect(beside.out).toContain("package.json — modified");
    expect(beside.out).not.toContain(`${BUNDLE} —`);
  }, 60_000);
});

/**
 * DEC-468 — the entry's limit line (`js:`) of the same block, on DEC-425's terms. The same fixture
 * and the same `git diff` patches; a change of both limits is judged line by line.
 */
const JS_COMMENT =
  "  // DEC-296 (fixture G): JS local 201.9 KiB; 203 → 205 = ceilingForLocal(201.9); was 203.";
const moveJs = (lines: string[]) => {
  lines[JS_AT] = "  js: 205,";
};

describe("the entry's limit line of the bundle-size guard (DEC-468)", () => {
  it("CF-LVB-21 the js number alone, with its DEC-296 comment, and together with the css number, passes — by the API's patch and by git's", () => {
    const alone = runAt(baseDir, [[modified(BUNDLE, bundlePatch(moveJs))]]);
    expect(alone.code, alone.out).toBe(0);
    expect(alone.out).toContain(NONE_OUTSIDE);

    const withJsComment = (lines: string[]) => {
      moveJs(lines);
      lines.splice(JS_AT, 0, JS_COMMENT);
    };
    for (const context of [3, 0]) {
      const result = runAt(baseDir, [[modified(BUNDLE, bundlePatch(withJsComment, context))]]);
      expect(result.code, `u${context}: ${result.out}`).toBe(0);
    }

    // Both limits, each with its own comment, directly above `js:` and at the block's first line.
    const both = (lines: string[]) => {
      moveJs(lines);
      moveCss(lines);
      lines.splice(JS_AT, 0, JS_COMMENT, CSS_COMMENT);
    };
    for (const context of [3, 0]) {
      const result = runAt(baseDir, [[modified(BUNDLE, bundlePatch(both, context))]]);
      expect(result.code, `both u${context}: ${result.out}`).toBe(0);
    }
    const bothNoComments = (lines: string[]) => {
      moveJs(lines);
      moveCss(lines);
    };
    expect(runAt(baseDir, [[modified(BUNDLE, bundlePatch(bothNoComments))]]).code).toBe(0);
    const bothOneComment = (lines: string[]) => {
      moveJs(lines);
      moveCss(lines);
      lines.splice(JS_AT, 0, JS_COMMENT);
    };
    expect(runAt(baseDir, [[modified(BUNDLE, bundlePatch(bothOneComment))]]).code).toBe(0);

    // The file with no patch from the API is read from git, as DEC-398 reads the ceilings file.
    const tree = plant(
      { [BUNDLE]: `${bundleLines.join("\n")}\n` },
      {
        [BUNDLE]: `${bundleLines.map((l, i) => (i === JS_AT ? "  js: 205," : l)).join("\n")}\n`,
      },
    );
    mkdirSync(join(tree.work, "scripts"), { recursive: true });
    writeFileSync(join(tree.work, BUNDLE), `${bundleLines.join("\n")}\n`);
    const patchless = runInGit([[noPatch(BUNDLE)]], tree);
    expect(patchless.code, patchless.out).toBe(0);
    expect(patchless.out).toContain(NONE_OUTSIDE);
  }, 60_000);

  it("CF-LVB-22 a second js line, a comment that disagrees or names both limits, a moved line and any other line of the block refuse", () => {
    const why = `${BUNDLE} — a changed line that is not the entry's or the stylesheet's limit line; DEC-425 (css) and DEC-468 (js) admit those two numbers and their DEC-296 comments only`;
    const refused = (what: string, change: (lines: string[]) => void, expected: string) => {
      const result = runAt(baseDir, [[modified(BUNDLE, bundlePatch(change))]]);
      expect(result.code, what).toBe(1);
      expect(result.out, what).toContain(expected);
      expect(result.out, what).toContain("1 change(s) outside what a Lovable branch may change");
    };

    refused(
      "a second js line",
      (l) => {
        moveJs(l);
        l.splice(JS_AT + 1, 0, "  js: 206,");
      },
      `${BUNDLE} — DEC-425 and DEC-468 admit a limit as one removed and one added \`js:\` line (1 removed, 2 added)`,
    );
    refused(
      "a js line removed with none added",
      (l) => l.splice(JS_AT, 1),
      `${BUNDLE} — DEC-425 and DEC-468 admit a limit as one removed and one added \`js:\` line (1 removed, 0 added)`,
    );
    refused(
      "a js comment whose numbers disagree with the js lines",
      (l) => {
        moveJs(l);
        l.splice(JS_AT, 0, JS_COMMENT.replace("203 → 205", "203 → 210"));
      },
      `${BUNDLE} — the comment says 203 → 210, was 203; the js lines say 203 → 205 (DEC-425, DEC-468)`,
    );
    refused(
      "a js comment whose was-value disagrees",
      (l) => {
        moveJs(l);
        l.splice(JS_AT, 0, JS_COMMENT.replace("was 203", "was 190"));
      },
      `${BUNDLE} — the comment says 203 → 205, was 190; the js lines say 203 → 205 (DEC-425, DEC-468)`,
    );
    refused(
      "a js comment with no js change",
      (l) => {
        moveCss(l);
        l.splice(JS_AT, 0, JS_COMMENT);
      },
      `${BUNDLE} — the comment says 203 → 205, was 203; the js lines say none → none (DEC-425, DEC-468)`,
    );
    refused(
      "a second js comment",
      (l) => {
        moveJs(l);
        l.splice(JS_AT, 0, JS_COMMENT, JS_COMMENT.replace("fixture G", "fixture H"));
      },
      `${BUNDLE} — a second comment line for one limit; DEC-425 and DEC-468 admit one DEC-296 comment for each limit`,
    );
    refused(
      "one comment naming both limits",
      (l) => {
        moveJs(l);
        l.splice(
          JS_AT,
          0,
          "  // DEC-296 (fixture I): JS local 201.9 KiB, CSS local 22.8 KiB; 203 → 205 = ceilingForLocal(201.9); was 203.",
        );
      },
      why,
    );
    refused(
      "a js comment below the limits",
      (l) => {
        moveJs(l);
        l.splice(CSS_AT + 2, 0, JS_COMMENT);
      },
      `${BUNDLE} — the comment is outside the block above the two limits`,
    );
    refused(
      "a js comment above the block",
      (l) => {
        moveJs(l);
        l.splice(0, 0, JS_COMMENT);
      },
      `${BUNDLE} — the comment is outside the block above the two limits`,
    );
    refused(
      "the js line moved",
      (l) => {
        l.splice(JS_AT, 1);
        l.splice(JS_AT + 1, 0, "  js: 205,");
      },
      "DEC-425, DEC-468",
    );
    refused("the js line in another form", (l) => (l[JS_AT] = "  js: 205, // loose"), why);
    refused("the js line with a quoted key", (l) => (l[JS_AT] = '  "js": 205,'), why);
    refused(
      "a js change beside a change to a line elsewhere",
      (l) => {
        moveJs(l);
        l.push("const MORE = true;");
      },
      why,
    );
    refused(
      "a js change beside a change to another line of the block",
      (l) => {
        moveJs(l);
        l[JS_AT - 2] = "  // DEC-231 (fixture): an older turn's cause, edited.";
      },
      why,
    );
    refused(
      "a js change beside the other line of the file that holds a js key",
      (l) => {
        moveJs(l);
        l[l.length - 1] = "const OTHER = { js: 9, css: 2 };";
      },
      why,
    );

    // A refused css change beside an admitted js change is still refused, whole.
    refused(
      "a css line with a second css line beside a js change",
      (l) => {
        moveJs(l);
        moveCss(l);
        l.splice(CSS_AT + 1, 0, "  css: 25,");
      },
      `${BUNDLE} — DEC-425 and DEC-468 admit a limit as one removed and one added \`css:\` line (1 removed, 2 added)`,
    );

    // A new, renamed or deleted file is not a changed limit, for a js patch as for a css one.
    for (const status of ["added", "renamed", "removed"]) {
      const result = runAt(baseDir, [[{ filename: BUNDLE, status, patch: bundlePatch(moveJs) }]]);
      expect(result.code, status).toBe(1);
      expect(result.out, status).toContain(
        `${BUNDLE} — ${status}; a Lovable branch may only move the stylesheet's or the entry's limit line of the existing file — DEC-425, DEC-468`,
      );
    }
  }, 60_000);
});

/**
 * DEC-432 (cursor-bundle-5) — THE RECORDS EXCEPTION. The body's one line names a list in the head;
 * each ledger path is admitted by its head content's sha256 against the list's line for it. The body
 * is the planted `gh`'s answer (a fake `gh` on PATH, as the step's token would read it); the head's
 * files come from a planted remote. INC-1201: every text here is the test's own.
 */
const RECORDS_LIST_PATH = "docs/governance/briefs/fixture-turn.records.sha256";
const LEDGERS: Record<string, string> = {
  "docs/_changelog.md": "# changelog\n- a planted line\n",
  "roadmap.md": "line 1\nline 2\nline 3\n[x] a planted tick\n",
  "docs/tracking/incidental-findings.md": "INC-9001 — a planted finding\n",
  "docs/governance/mechanisms.md": "| planted | row |\n",
};
const sha256 = (text: string | Buffer) => createHash("sha256").update(text).digest("hex");
const listOf = (files: Record<string, string>) =>
  `${Object.entries(files)
    .map(([path, body]) => `${sha256(body)}  ${path}`)
    .join("\n")}\n`;
const bodyLine = (path: string, sha: string) => `Records list: ${path} sha256 ${sha}`;
const FAKE_GH = `#!/usr/bin/env bash
if [ -n "\${FAKE_GH_FAIL:-}" ]; then exit 1; fi
if [ "$1" != "api" ] || [ "$2" != "repos/owner/name/pulls/7" ]; then echo "unexpected: $*" >&2; exit 1; fi
cat "$FAKE_GH_BODY"
`;
const ghBin = (() => {
  const dir = mkdtempSync(join(SCRATCH, "gh-"));
  writeFileSync(join(dir, "gh"), FAKE_GH, { mode: 0o755 });
  return dir;
})();
let bodies = 0;

/** The records plant: the base holds nothing of the ledgers; the head holds them and the list. */
function recordsRun(options: {
  head?: Record<string, string>;
  list?: string | null;
  body: (listSha: string) => string;
  entries?: string[];
  ghFails?: boolean;
}) {
  const head: Side = { ...(options.head ?? LEDGERS) };
  const list = options.list === undefined ? listOf(options.head ?? LEDGERS) : options.list;
  if (list !== null) head[RECORDS_LIST_PATH] = list;
  const tree = plant({ "README.md": "base\n" }, head);
  const bodyFile = join(SCRATCH, `body-${(bodies += 1)}.txt`);
  writeFileSync(bodyFile, options.body(sha256(list ?? "")));
  const paths = options.entries ?? Object.keys(options.head ?? LEDGERS);
  return runInGit([paths.map((path) => modified(path))], tree, {
    PATH: `${ghBin}:${process.env.PATH ?? ""}`,
    REPO: "owner/name",
    PR_NUMBER: "7",
    FAKE_GH_BODY: bodyFile,
    ...(options.ghFails ? { FAKE_GH_FAIL: "1" } : {}),
  });
}
const OLD = (path: string, rule: string) => `${path} — modified: ${path} — ${rule}`;
const LEDGER_RULES: Record<string, string> = {
  "docs/_changelog.md": "a ledger (DEC-386)",
  "roadmap.md": "a ledger (DEC-386)",
  "docs/tracking/incidental-findings.md":
    "docs/tracking/** — a ledger (DEC-386; the one exception: a deletion's line, DEC-390)",
  "docs/governance/mechanisms.md": "a ledger (DEC-386)",
};
const oldRefusal = (path: string) => {
  const rule = LEDGER_RULES[path] ?? "";
  return rule.startsWith("docs/tracking/") ? `${path} — modified: ${rule}` : OLD(path, rule);
};

describe("the records exception (DEC-432)", () => {
  it("CF-LVB-19 every ledger path equal to the list's line passes; the file beside it keeps its own verdict", () => {
    const passes = recordsRun({
      body: (sha) => `Records turn.\n\n${bodyLine(RECORDS_LIST_PATH, sha)}\n`,
    });
    expect(passes.code, passes.out).toBe(0);
    expect(passes.out).toContain(
      "lovable-branch-guard: 4 file(s), none outside what a Lovable branch may change (DEC-394).",
    );
    // A CRLF body reads the same; the line may stand anywhere in it.
    const crlf = recordsRun({
      body: (sha) => `first\r\n${bodyLine(RECORDS_LIST_PATH, sha)}\r\nlast\r\n`,
    });
    expect(crlf.code, crlf.out).toBe(0);
    // Beside a path no list can admit: its refusal stands, even with a correct line for it.
    const beside = {
      ...LEDGERS,
      "supabase/config.toml": "planted = true\n",
      "package.json": "{}\n",
    };
    const refused = recordsRun({
      head: beside,
      body: (sha) => bodyLine(RECORDS_LIST_PATH, sha),
    });
    expect(refused.code).toBe(1);
    expect(refused.out).toContain("2 change(s) outside what a Lovable branch may change (DEC-394)");
    expect(refused.out).toContain(
      "supabase/config.toml — modified: supabase/** — the database (DEC-386)",
    );
    expect(refused.out).toContain("package.json — modified: package.json — dependencies (DEC-386)");
    for (const path of Object.keys(LEDGERS)) expect(refused.out).not.toContain(`${path} —`);
  }, 60_000);

  it("CF-LVB-20 one byte off, a list whose hash differs, a path with no line, no body line, a bad path, a deleted file and an unreadable list or body each leave the ledger refused", () => {
    const stated = (sha: string) => bodyLine(RECORDS_LIST_PATH, sha);
    const refuses = (
      what: string,
      result: { code: number | null; out: string },
      paths: string[],
      why?: string,
    ) => {
      expect(result.code, `${what}\n${result.out}`).toBe(1);
      expect(result.out, what).toContain(
        `${paths.length} change(s) outside what a Lovable branch may change (DEC-394)`,
      );
      for (const path of paths) expect(result.out, what).toContain(oldRefusal(path));
      if (why !== undefined) expect(result.out, what).toContain(`does not admit it: ${why}`);
    };
    const all = Object.keys(LEDGERS);

    // One byte off: the head's content differs from the list's line for it.
    const bytes = recordsRun({
      head: { ...LEDGERS, "roadmap.md": `${LEDGERS["roadmap.md"] ?? ""} ` },
      list: listOf(LEDGERS),
      body: stated,
    });
    refuses(
      "one byte off",
      bytes,
      ["roadmap.md"],
      "its head content is not the list's line for it",
    );

    // A list whose sha256 differs from the body's.
    const forged = recordsRun({ body: () => stated("0".repeat(64)) });
    refuses(
      "a list that differs from the body's",
      forged,
      all,
      `the list ${RECORDS_LIST_PATH} does not hash to the body's sha256`,
    );
    const swapped = recordsRun({
      list: listOf({ ...LEDGERS, "roadmap.md": "something else\n" }),
      body: () => stated(sha256(listOf(LEDGERS))),
    });
    refuses("a list swapped after the body's line", swapped, all);

    // A ledger path the list holds no line for; a path it names twice.
    const missing = recordsRun({
      list: listOf({ "docs/_changelog.md": LEDGERS["docs/_changelog.md"] ?? "" }),
      body: stated,
    });
    refuses(
      "a path with no line",
      missing,
      all.filter((path) => path !== "docs/_changelog.md"),
      "the list holds 0 lines for it, not one",
    );
    const twice = `${listOf(LEDGERS)}${sha256(LEDGERS["roadmap.md"] ?? "")}  roadmap.md\n`;
    refuses(
      "a path with two lines",
      recordsRun({ list: twice, body: stated }),
      ["roadmap.md"],
      "the list holds 2 lines for it, not one",
    );

    // No body line: the old refusals, with nothing said of a list.
    for (const body of [
      "",
      "no list here\n",
      `${stated("0".repeat(63))}\n`,
      ` ${stated("0".repeat(64))}\n`,
      `${stated("0".repeat(64))} \n`,
      `records list: ${RECORDS_LIST_PATH} sha256 ${"0".repeat(64)}\n`,
    ]) {
      const none = recordsRun({ body: () => body });
      refuses(`no body line: ${JSON.stringify(body)}`, none, all);
      expect(none.out).not.toContain("DEC-432");
    }

    // A body path with `..`, a space, another folder or another suffix never matches the one pattern.
    for (const path of [
      "docs/governance/briefs/../fixture-turn.records.sha256",
      "docs/governance/briefs/fixture turn.records.sha256",
      "docs/governance/briefs/fixture-turn.records.sha256 ",
      "docs/governance/fixture-turn.records.sha256",
      "docs/governance/briefs/Fixture.records.sha256",
      "docs/governance/briefs/fixture-turn.records.txt",
      "docs/governance/briefs/a/b.records.sha256",
    ]) {
      const bad = recordsRun({ body: (sha) => `${bodyLine(path, sha)}\n` });
      refuses(`a body path ${JSON.stringify(path)}`, bad, all);
    }

    // Two lines in the body: ambiguity is a refusal.
    refuses(
      "two body lines",
      recordsRun({ body: (sha) => `${stated(sha)}\n${stated("1".repeat(64))}\n` }),
      all,
      "the body states more than one records list",
    );

    // An unreadable list, an unreadable body, a malformed list line.
    refuses(
      "no list in the head",
      recordsRun({ list: null, body: stated }),
      all,
      `the list ${RECORDS_LIST_PATH} cannot be read from the head`,
    );
    refuses(
      "an unreadable body",
      recordsRun({ body: stated, ghFails: true }),
      all,
      "the pull request's body could not be read",
    );
    refuses(
      "a malformed list line",
      recordsRun({ list: `${listOf(LEDGERS)}not a line\n`, body: (sha) => stated(sha) }),
      all,
      `the list ${RECORDS_LIST_PATH} holds a line that is not '<sha256>  <path>'`,
    );
    refuses(
      "a one-space separator",
      recordsRun({ list: `${sha256("x")} roadmap.md\n`, body: (sha) => stated(sha) }),
      all,
    );

    // A deleted ledger file has no content to prove, whatever the list says.
    const tree = plant(
      { "README.md": "base\n" },
      { ...LEDGERS, [RECORDS_LIST_PATH]: listOf(LEDGERS) },
    );
    const bodyFile = join(SCRATCH, `body-${(bodies += 1)}.txt`);
    writeFileSync(bodyFile, `${stated(sha256(listOf(LEDGERS)))}\n`);
    const gone = runInGit([[{ filename: "roadmap.md", status: "removed" }]], tree, {
      PATH: `${ghBin}:${process.env.PATH ?? ""}`,
      REPO: "owner/name",
      PR_NUMBER: "7",
      FAKE_GH_BODY: bodyFile,
    });
    expect(gone.code, gone.out).toBe(1);
    expect(gone.out).toContain("a deleted ledger file has no content to prove");

    // The exception reads the pull request only for a ledger path: a screen file asks for nothing.
    const screen = runInGit([[modified("src/routes/index.tsx")]], tree, {
      PATH: `${ghBin}:${process.env.PATH ?? ""}`,
      REPO: "owner/name",
      PR_NUMBER: "7",
      FAKE_GH_BODY: join(SCRATCH, "absent.txt"),
      FAKE_GH_FAIL: "1",
    });
    expect(screen.code, screen.out).toBe(0);
  }, 120_000);
});
