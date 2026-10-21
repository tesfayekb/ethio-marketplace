import { expect, it, vi } from "vitest";
vi.mock("@/integrations/supabase/client", () => ({ supabase: {} }));
import { validateLegalFacts } from "./facts-validation";
const valid = {
  operator_name: "Operator",
  operator_address: "Address",
  legal_email: "legal@example.invalid",
  privacy_email: "privacy@example.invalid",
  governing_law: "Law",
  operator_details: "",
  security_email: "security@example.invalid",
  legal_phone: "",
  copyright_agent: "",
  listed_ad_keep_months: "12",
  account_keep_months: "120",
  technical_keep_months: "12",
  sold_visible_days: "30",
  appeal_months: "6",
  claims_limit_months: "1",
  talk_first_days: "30",
  complaint_ack_days: "30",
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
  ["listed_ad_keep_months", 1, 120],
  ["account_keep_months", 1, 120],
  ["technical_keep_months", 1, 120],
  ["sold_visible_days", 1, 365],
  ["appeal_months", 1, 24],
  ["claims_limit_months", 1, 60],
  ["talk_first_days", 1, 90],
  ["complaint_ack_days", 1, 90],
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
it("keeps a closed account's identity at least as long as the claims limit", () => {
  expect(
    validateLegalFacts({ ...valid, account_keep_months: "12", claims_limit_months: "24" })
      .account_keep_months,
  ).toEqual({ type: "shorterThanClaims", min: 24 });
  expect(
    validateLegalFacts({ ...valid, account_keep_months: "24", claims_limit_months: "24" }),
  ).toEqual({});
});
it.each(["legal_email", "privacy_email", "security_email"] as const)(
  "requires an email in %s",
  (key) => {
    expect(validateLegalFacts({ ...valid, [key]: "not-email" })[key]).toEqual({ type: "badEmail" });
  },
);
it.each([
  "operator_name",
  "operator_address",
  "governing_law",
  "legal_email",
  "privacy_email",
  "security_email",
] as const)("requires text %s", (key) => {
  expect(validateLegalFacts({ ...valid, [key]: "" })[key]).toEqual({ type: "required" });
});
it("allows clearing the optional copyright agent", () => {
  expect(validateLegalFacts(valid)).toEqual({});
});
it("allows the optional company details, phone and copyright agent to be empty", () => {
  expect(
    validateLegalFacts({ ...valid, operator_details: "", legal_phone: "", copyright_agent: "" }),
  ).toEqual({});
});
it.each(["+251 11 123 4567", "+1 (011) 555-0100", "12345 6"])("accepts the phone %s", (phone) => {
  expect(validateLegalFacts({ ...valid, legal_phone: phone })).toEqual({});
});
it.each(["abc", "+", "1234", "12345-", "+251 11 x 4567", `1${"2".repeat(40)}`])(
  "refuses the phone %s",
  (phone) => {
    expect(validateLegalFacts({ ...valid, legal_phone: phone }).legal_phone).toEqual({
      type: "badPhone",
    });
  },
);
it("limits the company details to 2,000 characters", () => {
  expect(validateLegalFacts({ ...valid, operator_details: "x".repeat(2000) })).toEqual({});
  expect(
    validateLegalFacts({ ...valid, operator_details: "x".repeat(2001) }).operator_details,
  ).toEqual({
    type: "tooLong",
    max: 2000,
  });
});
it("no longer checks the providers fact", () => {
  expect(validateLegalFacts(valid)).not.toHaveProperty("providers");
});
