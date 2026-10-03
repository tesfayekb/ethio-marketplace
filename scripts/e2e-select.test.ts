// DEC-115 — unit tests for the e2e selector (scripts/e2e-select.ts).
import { describe, expect, it } from "vitest";
import { globToRegExp, matches, selectSpecs, selfTest } from "./e2e-select";

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
