// DEC-115 — unit tests for the e2e selector (scripts/e2e-select.ts).
import { describe, expect, it } from "vitest";
import {
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
