import { describe, expect, it } from "vitest";
import { en } from "@/i18n/locales/en";
import {
  LEGAL_ACCEPT_CHANGED_KEY,
  LEGAL_ACCEPT_REFUSALS,
  acceptRefusalKey,
} from "./legal-accept-refusals";

describe("LAR-1 the acceptance screen's words (F1-5b)", () => {
  it("every word is a key the catalogue holds", () => {
    for (const key of [
      ...Object.values(LEGAL_ACCEPT_REFUSALS.words),
      LEGAL_ACCEPT_REFUSALS.generic,
    ]) {
      expect(Object.keys(en)).toContain(key);
    }
  });
  it("notInForce reads the changed line, with or without a detail", () => {
    expect(acceptRefusalKey({ message: "notInForce" })).toBe(LEGAL_ACCEPT_CHANGED_KEY);
    expect(acceptRefusalKey({ message: "notInForce:v2" })).toBe(LEGAL_ACCEPT_CHANGED_KEY);
  });
  it.each([
    "adultRequired",
    "badLanguage",
    "emptyList",
    "notApplicable",
    "rateLimited",
    "notSignedIn",
    "accountDeactivated",
    "boom",
    "",
  ])("%s reads the generic line", (code) => {
    expect(acceptRefusalKey({ message: code })).toBe("legal.accept.error");
  });
  it("a failure with no message reads the generic line", () => {
    expect(acceptRefusalKey(null)).toBe("legal.accept.error");
    expect(acceptRefusalKey(new Error("transport"))).toBe("legal.accept.error");
  });
});
