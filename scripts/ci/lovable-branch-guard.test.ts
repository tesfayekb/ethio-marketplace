import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { walkFiles } from "../conformance/kit";

/**
 * DEC-394 (the tests and CI turn, Part C) — scripts/ci/lovable-branch-guard.sh: a pull request from
 * a `lovable/*` branch changes only what Lovable may change (Knowledge v3.14's ROLE paragraph,
 * DEC-386; the two DEC-390 exceptions and the third, DEC-396, judged by content). Every case plants
 * the GitHub API's own shape — the pull request's files, one JSON array per page — on the script's
 * stdin.
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

/** Real lines of a real allowlist: the file wave 3's pull request removed two lines from. */
const FORMS_ALLOWLIST = "scripts/conformance/forms-allowlist.txt";
const ALLOWLIST_LINES = readFileSync(FORMS_ALLOWLIST, "utf8")
  .split("\n")
  .filter((l) => l.startsWith("CF-FORM-1 src/"));
if (ALLOWLIST_LINES.length < 4)
  throw new Error("forms-allowlist.txt has fewer than 4 CF-FORM-1 lines");
const [KEPT_A, GONE_B, GONE_C, KEPT_D] = ALLOWLIST_LINES;
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
      `${FORMS_ALLOWLIST} — renamed to docs/old-list.txt: scripts/** — the guards and tools (DEC-386; the two exceptions: a ceiling line, DEC-390; a removed allowlist line, DEC-396)`,
    );

    // Nothing else under scripts/ takes the exception, with a removal-only patch or not.
    const scriptsRule =
      "scripts/** — the guards and tools (DEC-386; the two exceptions: a ceiling line, DEC-390; a removed allowlist line, DEC-396)";
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
