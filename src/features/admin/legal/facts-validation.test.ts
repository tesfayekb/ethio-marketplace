import { expect, it, vi } from "vitest";
vi.mock("@/integrations/supabase/client", () => ({ supabase: {} }));
import { validateLegalFacts } from "./facts-validation";
const valid = {
  operator_name: "Operator",
  operator_address: "Address",
  legal_email: "legal@example.invalid",
  privacy_email: "privacy@example.invalid",
  governing_law: "Law",
  providers: "Provider",
  copyright_agent: "",
  liability_limit_usd: "0",
  notice_days: "30",
  response_days: "30",
  response_extra_days: "30",
  deleted_ad_keep_months: "12",
  dispute_keep_years: "5",
};
it.each([
  ["liability_limit_usd", 0, 1000000],
  ["notice_days", 0, 365],
  ["response_days", 1, 90],
  ["response_extra_days", 0, 90],
  ["deleted_ad_keep_months", 1, 120],
  ["dispute_keep_years", 0, 20],
] as const)("checks both bounds and integrality of %s", (key, min, max) => {
  for (const value of [String(min), String(max)])
    expect(validateLegalFacts({ ...valid, [key]: value })).toEqual({});
  for (const value of [String(min - 1), String(max + 1), "1.5", ""])
    expect(validateLegalFacts({ ...valid, [key]: value })[key]).toEqual({
      type: "range",
      min,
      max,
    });
});
it.each(["legal_email", "privacy_email"] as const)("requires an email in %s", (key) => {
  expect(validateLegalFacts({ ...valid, [key]: "not-email" })[key]).toEqual({ type: "badEmail" });
});
it.each([
  "operator_name",
  "operator_address",
  "governing_law",
  "providers",
  "legal_email",
  "privacy_email",
] as const)("requires text %s", (key) => {
  expect(validateLegalFacts({ ...valid, [key]: "" })[key]).toEqual({ type: "required" });
});
it("allows clearing the optional copyright agent", () => {
  expect(validateLegalFacts(valid)).toEqual({});
});
