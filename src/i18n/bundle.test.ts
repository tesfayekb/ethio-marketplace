import { describe, expect, it } from "vitest";

import { bundleEtag, bundleUrl } from "./bundle";

/** DEC-026 coverage for U4i ④ — the cache validator. */
describe("④ bundle ETag", () => {
  it("is a strong validator that carries the language and the version", () => {
    expect(bundleEtag("am", "abc123")).toBe('"am.abc123"');
    expect(bundleEtag("am", "abc123").startsWith("W/")).toBe(false);
  });

  it("separates languages that share a version hash", () => {
    expect(bundleEtag("am", "same")).not.toBe(bundleEtag("om", "same"));
  });

  it("changes whenever the data version changes", () => {
    expect(bundleEtag("am", "v1")).not.toBe(bundleEtag("am", "v2"));
  });

  it("degrades to an explicit unknown rather than an empty tag", () => {
    expect(bundleEtag("am", "")).toBe('"am.unknown"');
  });

  it("encodes the language into the endpoint path", () => {
    expect(bundleUrl("am")).toBe("/api/i18n/am");
    expect(bundleUrl("zxx-mo")).toBe("/api/i18n/zxx-mo");
  });
});
