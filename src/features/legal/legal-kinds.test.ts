import { describe, expect, it } from "vitest";
import {
  gateExempt,
  gateKinds,
  legalDocName,
  legalRole,
  needsConsent,
  tickOneKey,
} from "./legal-kinds";

describe("legalRole", () => {
  it("reads real and scratch kinds", () => {
    expect(legalRole("terms")).toBe("terms");
    expect(legalRole("privacy")).toBe("privacy");
    expect(legalRole("e2e-run1-k-terms")).toBe("terms");
    expect(legalRole("e2e-run1-k-privacy")).toBe("privacy");
    expect(legalRole("publishing")).toBe("other");
    expect(legalRole("e2e-run1-other")).toBe("other");
    expect(legalRole("x-terms")).toBe("other");
  });
});
describe("tickOneKey", () => {
  it("names both, one or other documents", () => {
    expect(tickOneKey(["terms", "privacy"])).toBe("legal.accept.tick1.both");
    expect(tickOneKey(["terms"])).toBe("legal.accept.tick1.terms");
    expect(tickOneKey(["privacy", "other"])).toBe("legal.accept.tick1.privacy");
    expect(tickOneKey(["other"])).toBe("legal.accept.tick1.docs");
    expect(tickOneKey([])).toBe("legal.accept.tick1.docs");
  });
});
describe("needsConsent", () => {
  it("is true only with a privacy role", () => {
    expect(needsConsent([{ kind: "terms" }, { kind: "e2e-a-privacy" }])).toBe(true);
    expect(needsConsent([{ kind: "privacy" }])).toBe(true);
    expect(needsConsent([{ kind: "terms" }, { kind: "e2e-a-terms" }])).toBe(false);
    expect(needsConsent([])).toBe(false);
  });
});
describe("gateKinds", () => {
  it("always asks for terms and privacy first", () => {
    expect(gateKinds(undefined)).toEqual(["terms", "privacy"]);
    expect(gateKinds("e2e-a-terms")).toEqual(["terms", "privacy"]);
    expect(gateKinds([1, null])).toEqual(["terms", "privacy"]);
  });
  it("adds at most four scratch kinds and ignores everything else", () => {
    expect(gateKinds(["e2e-a-terms", "publishing", "terms", "E2E-x", 3, "e2e-b-privacy"])).toEqual([
      "terms",
      "privacy",
      "e2e-a-terms",
      "e2e-b-privacy",
    ]);
    expect(gateKinds(["e2e-1", "e2e-2", "e2e-3", "e2e-4", "e2e-5"])).toEqual([
      "terms",
      "privacy",
      "e2e-1",
      "e2e-2",
      "e2e-3",
      "e2e-4",
    ]);
    expect(gateKinds([`e2e-${"a".repeat(41)}`])).toEqual(["terms", "privacy"]);
  });
});
describe("gateExempt", () => {
  it.each([
    "/legal/accept",
    "/terms",
    "/privacy",
    "/legal/e2e-x",
    "/auth",
    "/auth/callback",
    "/auth/reset",
  ])("lets %s through", (path) => expect(gateExempt(path)).toBe(true));
  it.each([
    "/",
    "/account",
    "/account/legal",
    "/my-listings",
    "/post",
    "/settings",
    "/admin",
    "/abebe",
    "/termsx",
    "/authx",
  ])("stops %s", (path) => expect(gateExempt(path)).toBe(false));
});
describe("legalDocName", () => {
  const t = (key: string) => key;
  it("names by role, the raw kind otherwise, with the country", () => {
    expect(legalDocName({ kind: "e2e-a-terms", country_code: null }, t, "en")).toBe(
      "legal.kind.terms",
    );
    expect(legalDocName({ kind: "privacy", country_code: null }, t, "en")).toBe(
      "legal.kind.privacy",
    );
    expect(legalDocName({ kind: "e2e-other", country_code: "ET" }, t, "en")).toBe(
      "e2e-other · Ethiopia",
    );
  });
});
