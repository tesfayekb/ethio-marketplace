import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, fireEvent, screen, waitFor, within } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { renderPanel as render } from "@/components/ui/dialog-parts-test-render";
import { en } from "@/i18n/locales/en";
import { am } from "@/i18n/locales/am";
import { ownValue } from "@/lib/own-key";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import type { LegalSettings } from "./legal-service";
const state = vi.hoisted(() => ({
  language: "en",
  may: true,
  docs: vi.fn(),
  facts: vi.fn(),
  version: vi.fn(),
  languages: vi.fn(),
  saveFacts: vi.fn(),
  guard: vi.fn(),
}));
vi.mock("@/i18n", async (original) => ({
  ...(await original<typeof import("@/i18n")>()),
  useI18n: () => ({
    t: (key: string) => ownValue(state.language === "am" ? am : en, key) ?? key,
    language: state.language,
    entities: { map: {}, lang: state.language },
  }),
}));
vi.mock("@tanstack/react-router", async (original) => ({
  ...(await original<typeof import("@tanstack/react-router")>()),
  useSearch: () => ({}),
  useNavigate: () => vi.fn(),
  Link: ({ to, children, ...rest }: { to: string; children: ReactNode }) => (
    <a href={to} {...rest}>
      {children}
    </a>
  ),
}));
vi.mock("@/features/permissions/use-may-call", () => ({
  useMayCall: () => ({ mayCall: () => state.may }),
}));
vi.mock("@/features/admin/users/use-admin-users", () => ({
  useCountries: () => ({ data: [], error: null }),
}));
vi.mock("@/features/auth/mfa/step-up-gate", () => ({
  StepUpGate: ({ children }: { children: (guard: GuardFn) => ReactNode }) => children(state.guard),
}));
vi.mock("./legal-service", async (original) => ({
  ...(await original<typeof import("./legal-service")>()),
  listLegalDocuments: state.docs,
  getLegalSettings: state.facts,
  getLegalVersion: state.version,
  listBaseLanguages: state.languages,
  setLegalSettings: state.saveFacts,
}));
const facts: LegalSettings = {
  operator_name: "Scratch",
  operator_address: "Address",
  governing_law: "Law",
  legal_email: "legal@example.invalid",
  privacy_email: "privacy@example.invalid",
  security_email: "security@example.invalid",
  operator_details: "",
  legal_phone: "",
  copyright_agent: "",
  liability_limit_usd: 0,
  notice_days: 30,
  response_days: 30,
  response_extra_days: 30,
  listed_ad_keep_months: 12,
  deleted_ad_keep_months: 12,
  dispute_keep_years: 5,
  account_keep_months: 24,
  technical_keep_months: 12,
  sold_visible_days: 30,
  appeal_months: 6,
  claims_limit_months: 24,
  talk_first_days: 30,
  complaint_ack_days: 30,
  review_months: 6,
};

function draw(node: ReactNode) {
  return render(
    <QueryClientProvider
      client={
        new QueryClient({
          defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
        })
      }
    >
      {node}
    </QueryClientProvider>,
  );
}
beforeEach(() => {
  vi.resetAllMocks();
  state.language = "en";
  state.may = true;
  state.docs.mockResolvedValue([]);
  state.facts.mockResolvedValue(facts);
  state.version.mockResolvedValue(undefined);
  state.languages.mockResolvedValue([]);
  state.saveFacts.mockResolvedValue(undefined);
  state.guard.mockImplementation(async (action: () => Promise<unknown>) => action());
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});
import { LegalPage } from "./legal-page";
import { LegalFactsCard } from "./legal-facts-card";
import { FACT_KEYS, legalRefusalKey } from "./legal-service";
it("UFA-44 legal facts show every value, local validation, Save and Cancel with door refusal words uf:A15.7", async () => {
  draw(<LegalFactsCard facts={facts} guard={state.guard} />);
  for (const key of FACT_KEYS)
    expect(screen.getByTestId(`legal-fact-${key}`)).toHaveTextContent(
      String(ownValue(facts, key) ?? "") || en["admin.legal.facts.notSet"],
    );
  fireEvent.click(screen.getByRole("button", { name: en["admin.legal.action.editFacts"] }));
  for (const [key, value, words] of [
    ["operator_name", "", en["admin.legal.facts.required"]],
    ["legal_email", "invalid", en["admin.legal.facts.badEmail"]],
    ["legal_phone", "invalid", en["admin.legal.facts.badPhone"]],
    [
      "notice_days",
      "366",
      en["admin.legal.facts.range"].replace("{min}", "0").replace("{max}", "365"),
    ],
    [
      "operator_details",
      "x".repeat(2001),
      en["admin.legal.error.tooLong"].replace("{max}", "2000"),
    ],
    ["account_keep_months", "1", en["admin.legal.facts.shorterThanClaims"].replace("{min}", "24")],
  ] as const) {
    const control = screen.getByTestId(`legal-fact-input-${key}`);
    control.focus();
    fireEvent.change(control, { target: { value } });
    fireEvent.click(screen.getByRole("button", { name: en["admin.legal.action.saveFacts"] }));
    expect(screen.getByTestId(`legal-fact-error-${key}`)).toHaveTextContent(words);
    expect(state.saveFacts).not.toHaveBeenCalled();
    fireEvent.change(control, { target: { value: String(ownValue(facts, key) ?? "") } });
  }
  const failure = new Error("permissionDenied");
  state.saveFacts.mockRejectedValueOnce(failure);
  fireEvent.click(screen.getByRole("button", { name: en["admin.legal.action.saveFacts"] }));
  const refusalKey = legalRefusalKey(failure);
  if (!refusalKey) throw new Error("Legal refusal has no words");
  expect(await screen.findByRole("alert")).toHaveTextContent(en[refusalKey]);
  expect(state.guard).toHaveBeenCalledTimes(1);
  expect(state.saveFacts.mock.calls[0]?.[0]).toEqual(facts);
  fireEvent.click(screen.getByRole("button", { name: en["common.cancel"] }));
  expect(screen.queryByTestId("legal-facts-save")).toBeNull();
  fireEvent.click(screen.getByTestId("legal-facts-edit"));
  state.saveFacts.mockResolvedValueOnce(undefined);
  fireEvent.click(screen.getByTestId("legal-facts-save"));
  expect(await screen.findByText(en["admin.legal.facts.saved"])).toBeInTheDocument();
  expect(screen.queryByTestId("legal-facts-save")).toBeNull();
});
it("UFA-44p legal facts edit is offered only with its door permission uf:A15.7", () => {
  state.may = false;
  draw(<LegalFactsCard facts={facts} guard={state.guard} />);
  expect(screen.queryByRole("button", { name: en["admin.legal.action.editFacts"] })).toBeNull();
});
it("UFA-45 legal page loads and shows each failed source with Retry that reads again uf:A15.8", async () => {
  for (const source of [state.docs, state.facts]) {
    source.mockReturnValueOnce(new Promise(() => {}));
    draw(<LegalPage />);
    expect(screen.getByRole("status")).toHaveTextContent(en["common.loading"]);
    cleanup();
    source.mockRejectedValueOnce(new TypeError("Failed to fetch"));
    draw(<LegalPage />);
    const alert = await screen.findByTestId("legal-page-failed");
    expect(alert).toHaveTextContent(en["admin.legal.error.load"]);
    expect(alert).toHaveTextContent(en["failure.network"]);
    const calls = source.mock.calls.length;
    fireEvent.click(within(alert).getByRole("button", { name: en["common.retry"] }));
    await waitFor(() => expect(source).toHaveBeenCalledTimes(calls + 1));
    await waitFor(() => expect(screen.queryByTestId("legal-page-failed")).toBeNull());
    cleanup();
  }
});
it("UFA-46 legal page headings, empty words and fact actions are Amharic without English fallback uf:A15.9", async () => {
  state.language = "am";
  draw(<LegalPage />);
  await screen.findByTestId("legal-facts");
  for (const key of [
    "admin.section.legal.title",
    "admin.legal.none",
    "admin.legal.facts.title",
    "admin.legal.action.editFacts",
  ] as const) {
    expect(screen.getAllByText(am[key]).length).toBeGreaterThan(0);
    expect(am[key]).not.toBe(en[key]);
    expect(screen.queryByText(en[key])).toBeNull();
  }
});
