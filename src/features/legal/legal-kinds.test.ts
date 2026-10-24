import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { walkFiles } from "../../../scripts/conformance/kit";
import {
  gateExempt,
  gateKinds,
  legalDocName,
  legalMoment,
  legalRole,
  shapedCountries,
  signedInOnlyKind,
  tickKey,
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
describe("signedInOnlyKind (D236)", () => {
  it("LK-mirror the TypeScript answer equals the migration's predicate (M24)", () => {
    const text = walkFiles([resolve("supabase/migrations")], { ext: ["sql"] })
      .map((file) => readFileSync(file, "utf8"))
      .filter((migration) => migration.includes("FUNCTION public.legal_kind_signed_in_only"))
      .at(-1)!;
    const predicate = text.split("AS $function$")[1]!.split("$function$")[0]!;
    expect(predicate).toContain("'publishing'");
    expect(predicate).toContain("'^e2e-pub-'");
    expect(predicate.match(/'[^']*'/g)).toEqual(["'publishing'", "'^e2e-pub-'"]);
    expect(signedInOnlyKind("publishing")).toBe(true);
    expect(signedInOnlyKind("e2e-pub-x")).toBe(true);
    expect(signedInOnlyKind("terms")).toBe(false);
    expect(signedInOnlyKind("privacy")).toBe(false);
    expect(signedInOnlyKind("e2e-x-privacy")).toBe(false);
    expect(signedInOnlyKind("e2e-pub")).toBe(false);
  });
});
describe("shapedCountries", () => {
  it("keeps distinct uppercase codes only, at most five", () => {
    expect(shapedCountries("ET,US,zz,et,ET")).toEqual(["ET", "US"]);
    expect(shapedCountries(["ET", "US", "DE", "FR", "GB", "NL"])).toEqual([
      "ET",
      "US",
      "DE",
      "FR",
      "GB",
    ]);
    expect(shapedCountries(undefined)).toEqual([]);
  });
});
describe("tickKey", () => {
  it("names both, one or other documents, with the 18+ statement the first time only", () => {
    expect(tickKey(["terms", "privacy"], true)).toBe("legal.agree.first.both");
    expect(tickKey(["terms"], true)).toBe("legal.agree.first.terms");
    expect(tickKey(["privacy", "other"], true)).toBe("legal.agree.first.privacy");
    expect(tickKey(["other"], true)).toBe("legal.accept.agreeFirst.docs");
    expect(tickKey([], true)).toBe("legal.accept.agreeFirst.docs");
    expect(tickKey(["terms", "privacy"], false)).toBe("legal.agree.updated.both");
    expect(tickKey(["terms"], false)).toBe("legal.agree.updated.terms");
    expect(tickKey(["privacy", "other"], false)).toBe("legal.agree.updated.privacy");
    expect(tickKey(["other"], false)).toBe("legal.accept.agreeUpdated.docs");
    expect(tickKey([], false)).toBe("legal.accept.agreeUpdated.docs");
  });
});
describe("legalMoment", () => {
  it("shows a UTC moment in the viewer's time zone, with the zone named", () => {
    const at = "2026-10-20T03:24:26Z";
    expect(legalMoment(at, "en", "Africa/Addis_Ababa")).toBe("20 Oct 2026, 06:24:26 GMT+3");
    expect(legalMoment(at, "en", "America/New_York")).toBe("19 Oct 2026, 23:24:26 GMT-4");
    const local = Intl.DateTimeFormat().resolvedOptions().timeZone;
    expect(legalMoment(at, "en")).toBe(legalMoment(at, "en", local));
    expect(legalMoment(null, "en")).toBe("");
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
