// DEC-115 — unit tests for the e2e selector (scripts/e2e-select.ts).
import { spawnSync } from "node:child_process";
import { copyFileSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  changedIds,
  globToRegExp,
  matches,
  repeatRanks,
  repeatSpecs,
  selectSpecs,
  selfTest,
} from "./e2e-select";

describe("globToRegExp", () => {
  it("matches * within one directory and ** across directories", () => {
    expect(matches("e2e/post-wizard-*.spec.ts", "e2e/post-wizard-place.spec.ts")).toBe(true);
    expect(matches("e2e/post-wizard-*.spec.ts", "e2e/helpers/post-wizard.spec.ts")).toBe(false);
    expect(matches("src/features/posting/**", "src/features/posting/step-who.tsx")).toBe(true);
    expect(matches("src/features/posting/**", "src/features/posting/deep/nested.ts")).toBe(true);
    expect(matches("src/routes/api/attributes*", "src/routes/api/attributes.$id.options.ts")).toBe(
      true,
    );
    expect(
      matches("src/routes/api/admin/*/import*", "src/routes/api/admin/categories/import.ts"),
    ).toBe(true);
  });
});

describe("selectSpecs", () => {
  it("a posting file selects the post-wizard specs", () => {
    const out = selectSpecs(["src/features/posting/step-who.tsx"]);
    expect(out).not.toBe("ALL");
    const list = out as string[];
    expect(list).toContain("e2e/post-wizard-place.spec.ts");
    expect(list).toContain("e2e/posting-routes.spec.ts");
    expect(list).toContain("e2e/posting-routes-catalog.spec.ts");
    expect(list.some((s) => s.startsWith("e2e/admin-"))).toBe(false);
  });

  it("an admin-categories file selects the admin-categories specs", () => {
    const out = selectSpecs(["src/features/admin-categories/console.tsx"]);
    expect(out).not.toBe("ALL");
    const list = out as string[];
    expect(list).toContain("e2e/admin-categories-console.spec.ts");
    expect(list).toContain("e2e/category-image-routes.spec.ts");
    expect(list.some((s) => s.startsWith("e2e/post-wizard-"))).toBe(false);
  });

  it("an unmapped src file gives ALL", () => {
    expect(selectSpecs(["src/lib/something-unmapped.ts"])).toBe("ALL");
  });

  it("a changed helper selects the specs that import it", () => {
    const out = selectSpecs(["e2e/helpers/posting.ts"]);
    expect(out).not.toBe("ALL");
    const list = out as string[];
    expect(list).toContain("e2e/post-wizard-place.spec.ts");
    expect(list).toContain("e2e/posting-routes.spec.ts");
    expect(list).not.toContain("e2e/helpers/posting.ts");
  });

  it("a changed spec selects itself", () => {
    expect(selectSpecs(["e2e/geo.spec.ts"])).toEqual(["e2e/geo.spec.ts"]);
  });

  it("a migration with the e2e-areas header selects the named areas", () => {
    const readFile = () => "-- e2e-areas: posting, admin-categories\nCREATE TABLE x(id int);\n";
    const out = selectSpecs(["supabase/migrations/20990101000000_test.sql"], { readFile });
    expect(out).not.toBe("ALL");
    const list = out as string[];
    expect(list).toContain("e2e/post-wizard-place.spec.ts");
    expect(list).toContain("e2e/admin-categories-console.spec.ts");
    expect(list).not.toContain("e2e/auth-signup.spec.ts");
  });

  it("a migration without the header line selects ALL", () => {
    const readFile = () => "CREATE TABLE x(id int);\n";
    expect(selectSpecs(["supabase/migrations/20990101000000_test.sql"], { readFile })).toBe("ALL");
  });

  it("a migration naming an unknown area selects ALL", () => {
    const readFile = () => "-- e2e-areas: nope\n";
    expect(selectSpecs(["supabase/migrations/20990101000000_test.sql"], { readFile })).toBe("ALL");
  });

  it("playwright.config.ts and the e2e harness files select ALL", () => {
    expect(selectSpecs(["playwright.config.ts"])).toBe("ALL");
    expect(selectSpecs(["e2e/global-setup.ts"])).toBe("ALL");
    expect(selectSpecs(["e2e/global-teardown.ts"])).toBe("ALL");
    expect(selectSpecs(["scripts/serve-e2e-node.ts"])).toBe("ALL");
  });

  it("docs and scripts select nothing", () => {
    expect(selectSpecs(["docs/_changelog.md", "scripts/check-migrations.sh"])).toEqual([]);
  });
});

describe("selfTest", () => {
  it("every spec is reachable and every area glob matches", () => {
    expect(selfTest()).toEqual([]);
  });
});

// DEC-283 — the repeat lane's selection (`--repeat`).
describe("repeatSpecs", () => {
  it("RPS-1 a changed spec selects itself", () => {
    expect(repeatSpecs(["e2e/geo.spec.ts"])).toEqual(["e2e/geo.spec.ts"]);
  });

  it("RPS-2 a changed helper selects its importers, transitively", () => {
    const list = repeatSpecs(["e2e/helpers/posting.ts"]);
    expect(list).toContain("e2e/post-wizard-place.spec.ts");
    expect(list).toContain("e2e/posting-routes.spec.ts");
    expect(list).not.toContain("e2e/helpers/posting.ts");
  });

  it("RPS-3 a src-only change, the config and the global setup print nothing (never ALL)", () => {
    expect(
      repeatSpecs([
        "src/lib/something-unmapped.ts",
        "playwright.config.ts",
        "e2e/global-setup.ts",
        "supabase/migrations/20990101000000_test.sql",
      ]),
    ).toEqual([]);
  });

  it("RPS-4 a deleted spec is not printed", () => {
    expect(repeatSpecs(["e2e/no-such-deleted-file.spec.ts"])).toEqual([]);
  });

  it("RPS-5 the output is sorted inside each rank and unique", () => {
    const changed = ["e2e/geo.spec.ts", "e2e/helpers/posting.ts", "e2e/geo.spec.ts"];
    const ranked = repeatRanks(changed);
    const one = ranked.filter((r) => r.rank === 1).map((r) => r.spec);
    const two = ranked.filter((r) => r.rank === 2).map((r) => r.spec);
    expect(one).toEqual([...one].sort());
    expect(two).toEqual([...two].sort());
    expect(repeatSpecs(changed)).toEqual([...one, ...two]);
    expect(new Set(repeatSpecs(changed)).size).toBe(repeatSpecs(changed).length);
    expect(repeatSpecs(changed).filter((s) => s === "e2e/geo.spec.ts")).toHaveLength(1);
  });

  // INC-967 — what the push changed itself comes first.
  it("RPS-6 a changed spec comes before a changed helper's importers that sort before it", () => {
    const list = repeatSpecs(["e2e/helpers/posting.ts", "e2e/geo.spec.ts"]);
    expect(list.some((s) => s < "e2e/geo.spec.ts")).toBe(true);
    expect(list[0]).toBe("e2e/geo.spec.ts");
    expect(repeatRanks(["e2e/helpers/posting.ts", "e2e/geo.spec.ts"])[0]).toEqual({
      spec: "e2e/geo.spec.ts",
      rank: 1,
    });
  });

  it("RPS-7 a spec both changed and importing the changed helper appears once, in rank one", () => {
    const ranked = repeatRanks(["e2e/helpers/posting.ts", "e2e/posting-routes.spec.ts"]);
    const hits = ranked.filter((r) => r.spec === "e2e/posting-routes.spec.ts");
    expect(hits).toEqual([{ spec: "e2e/posting-routes.spec.ts", rank: 1 }]);
    expect(ranked[0]?.spec).toBe("e2e/posting-routes.spec.ts");
    expect(ranked.filter((r) => r.rank === 1)).toHaveLength(1);
  });
});

describe("the repeat plan's inputs (INC-1311, INC-1333)", () => {
  it("RPS-8 the ids of a push's changed lines: added lines only, a data row as well as a title, an untracked file whole", () => {
    const diff = [
      "diff --git a/e2e/helpers/crawl-pages.ts b/e2e/helpers/crawl-pages.ts",
      "--- a/e2e/helpers/crawl-pages.ts",
      "+++ b/e2e/helpers/crawl-pages.ts",
      "@@ -133,0 +134,2 @@",
      '+  { id: "ZZ-21", route: "/a" },',
      '-  { id: "ZZ-22", route: "/b" },',
      '   { id: "ZZ-23", route: "/c" },',
      '+  test("ZZ-24 a title", () => {});',
      "+++ b/e2e/ZZ-25-named-file.ts",
    ].join("\n");
    expect([...changedIds(diff)].sort()).toEqual(["ZZ-21", "ZZ-24"]);
    expect([...changedIds("", ['test("ZZ-26 new", () => {});\n// ZZ-27'])].sort()).toEqual([
      "ZZ-26",
      "ZZ-27",
    ]);
  });

  it("RPS-9 --repeat-plan appends the evidence lines and the lane's variables, prints its counts, and an unreadable list is an error", () => {
    const dir = mkdtempSync(join(tmpdir(), "rps-"));
    try {
      const fixtures = "scripts/fixtures/repeat-lane";
      const ranks = join(dir, "ranks.txt");
      const evidence = join(dir, "evidence.txt");
      const env = join(dir, "env.txt");
      const rankLines = readFileSync(`${fixtures}/ranks.3c9086dc0.txt`, "utf8")
        .split("\n")
        .filter((line) => line !== "")
        .map((line) => line.split(" ").reverse().join(" "))
        .join("\n");
      copyFileSync(`${fixtures}/lane-weights.46081846257.json`, join(dir, "weights.json"));
      const run = (list: string) =>
        spawnSync(
          "bun",
          [
            "scripts/e2e-select.ts",
            "--repeat-plan",
            "--base",
            "HEAD",
            "--ranks",
            ranks,
            "--list",
            list,
            "--serial-list",
            `${fixtures}/serial-list.3c9086dc0.json`,
            "--weights",
            join(dir, "weights.json"),
            "--weights-source",
            "the evidence copy",
            "--budget",
            "841",
            "--evidence",
            evidence,
            "--env",
            env,
          ],
          { encoding: "utf8" },
        );
      writeFileSync(ranks, `${rankLines}\n`);
      const done = run(`${fixtures}/list.3c9086dc0.json`);
      expect(done.status, done.stderr).toBe(0);
      expect(done.stdout.trim()).toMatch(/^\d+ \d+ \d+ [1-9]\d*$/);
      const lines = readFileSync(evidence, "utf8").trim().split("\n");
      expect(lines.at(-1)).toMatch(/^- Repeat: each \d+ on both projects; 62 tests selected, /);
      expect(
        lines.some((line) => line.startsWith("- Repeat cost: weights from run 46081846257")),
      ).toBe(true);
      const vars = readFileSync(env, "utf8").trim().split("\n");
      expect(vars.map((line) => line.split("=")[0])).toEqual([
        "REPEAT_WEBKIT_PROJECTS",
        "REPEAT_SPECS",
        "REPEAT_SERIAL_SPECS",
        "REPEAT_GREP",
        "REPEAT_PARALLEL_TESTS",
        "REPEAT_SERIAL_TESTS",
        "REPEAT_TESTS",
        "REPEAT_EACH",
        "REPEAT_BUDGET_SECONDS",
        "REPEAT_GLOBAL_TIMEOUT_MS",
      ]);
      expect(vars).toContain("REPEAT_GLOBAL_TIMEOUT_MS=961000");
      const broken = run(join(dir, "no-such-list.json"));
      expect(broken.status).not.toBe(0);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
