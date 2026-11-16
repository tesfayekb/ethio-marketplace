import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

/**
 * DEC-394 (the tests and CI turn, Part C) — scripts/ci/lovable-branch-guard.sh: a pull request from
 * a `lovable/*` branch changes only what Lovable may change (Knowledge v3.14's ROLE paragraph,
 * DEC-386; the two DEC-390 exceptions judged by content). Every case plants the GitHub API's own
 * shape — the pull request's files, one JSON array per page — on the script's stdin.
 */

const SCRIPT = "scripts/ci/lovable-branch-guard.sh";

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

/** A real ceiling line of the file, and the same line with its ceiling one higher. */
const CEILING = (() => {
  const line = readFileSync("scripts/route-budgets.mjs", "utf8")
    .split("\n")
    .find((l) => l.startsWith('  "/account": { ceiling: '));
  if (line === undefined) throw new Error("route-budgets.mjs has no /account line");
  const grown = line.replace(/ceiling: (\d+)/, (_, n: string) => `ceiling: ${Number(n) + 1}`);
  return { line, grown };
})();

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
      ["scripts/check-bundle-size.mjs", "scripts/** — the guards and tools (DEC-386"],
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

  it("CF-LVB-10 ci.yml's scope job runs it on lovable/* pull requests, after the checkout, from the API", () => {
    const ci = readFileSync(".github/workflows/ci.yml", "utf8");
    const scope = ci.slice(ci.indexOf("\n  scope:\n"), ci.indexOf("\n  build-and-check:\n"));
    const step = scope.slice(scope.indexOf("- name: Lovable branch guard (DEC-394)"));
    expect(scope.indexOf("- uses: actions/checkout@v5")).toBeGreaterThan(-1);
    expect(scope.indexOf("- uses: actions/checkout@v5")).toBeLessThan(
      scope.indexOf("- name: Lovable branch guard (DEC-394)"),
    );
    expect(step).toContain(
      "if: github.event_name == 'pull_request' && startsWith(github.head_ref, 'lovable/')",
    );
    expect(step).toContain("GH_TOKEN: ${{ github.token }}");
    expect(step).toContain(
      'gh api --paginate "repos/${REPO}/pulls/${PR_NUMBER}/files" | bash scripts/ci/lovable-branch-guard.sh',
    );
    expect(scope).not.toContain("fetch-depth");
  });
});
