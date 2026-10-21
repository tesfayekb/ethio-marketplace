import { describe, expect, it } from "vitest";

import { compiledAdminLoader } from "./compiled-catalog";

/**
 * DEC-231 — the admin layer's loader answers under the same own-key law as
 * compiledCatalogLoader (Part H1): a listed code gives its loader; an
 * unlisted code, and a code naming an inherited member, give undefined.
 */
describe("compiledAdminLoader (DEC-231)", () => {
  it("gives a loader for en and am, undefined for om and constructor", () => {
    expect(typeof compiledAdminLoader("en")).toBe("function");
    expect(typeof compiledAdminLoader("am")).toBe("function");
    expect(compiledAdminLoader("om")).toBeUndefined();
    expect(compiledAdminLoader("constructor")).toBeUndefined();
  });
});
