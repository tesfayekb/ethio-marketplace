import { describe, expect, it } from "vitest";
import { sellerHead } from "./seller-head";

/** N1b-2c (INC-977, SPA-9) — the seller page's head names only what the loader found. */
describe("sellerHead", () => {
  it("SPA-9a a found seller's head carries the name it was given", () => {
    const head = sellerHead({ name: "abebephones" });
    expect(head.meta).toContainEqual({ title: "abebephones — ethio.com" });
    expect(head.meta).toContainEqual({ property: "og:title", content: "abebephones — ethio.com" });
  });

  it("SPA-9b a not-found (held or unknown) head carries no name and no title of its own", () => {
    const head = sellerHead(undefined);
    expect(head.meta).toEqual([{ name: "robots", content: "noindex" }]);
  });
});
