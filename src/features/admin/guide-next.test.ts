import { describe, expect, it } from "vitest";

import { resolveGuideNext } from "./guide-next";
import { sectionById } from "./sections";

/** P-1c (D313) — a Guide's next step resolves through the section register, under its permission. */
describe("resolveGuideNext (D313)", () => {
  it("GN-1 a section the caller may see resolves to its path, the block as the hash", () => {
    const monetisation = sectionById("monetisation");
    expect(
      resolveGuideNext({ section: "monetisation", block: "admin-monetisation-level" }, [
        monetisation.permission,
      ]),
    ).toEqual({ to: monetisation.path, hash: "admin-monetisation-level", allowed: true });
    expect(resolveGuideNext({ section: "countries" }, ["countries:view"])).toEqual({
      to: sectionById("countries").path,
      hash: undefined,
      allowed: true,
    });
  });

  it("GN-2 a section the caller may not see leads to the admin landing, never a refused page", () => {
    expect(resolveGuideNext({ section: "monetisation", block: "x" }, ["countries:view"])).toEqual({
      to: "/admin",
      hash: undefined,
      allowed: false,
    });
  });

  it("GN-3 (D315) a route form resolves to its route and hash with no permission asked; a section form outside the admin shell leads to the landing", () => {
    expect(resolveGuideNext({ to: "/post" }, null)).toEqual({
      to: "/post",
      hash: undefined,
      allowed: true,
    });
    expect(resolveGuideNext({ to: "/my-listings", hash: "my-listings-page" }, [])).toEqual({
      to: "/my-listings",
      hash: "my-listings-page",
      allowed: true,
    });
    expect(resolveGuideNext({ section: "monetisation" }, null)).toEqual({
      to: "/admin",
      hash: undefined,
      allowed: false,
    });
  });
});
