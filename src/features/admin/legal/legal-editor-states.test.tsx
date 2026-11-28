import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, fireEvent, screen, waitFor, within } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { renderPanel as render } from "@/components/ui/dialog-parts-test-render";
import { en } from "@/i18n/locales/en";
import { am } from "@/i18n/locales/am";
import { ownValue } from "@/lib/own-key";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import type { LegalSettings, LegalVersionDetail } from "./legal-service";
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

const version: LegalVersionDetail = {
  version_id: "scratch-version",
  document_id: "scratch-legal",
  kind: "terms",
  country_code: null,
  version: 2,
  status: "published",
  label: "Scratch",
  material: false,
  effective_at: "2026-11-17T00:00:00Z",
  published_at: "2026-11-17T00:00:00Z",
  created_at: "2026-11-17T00:00:00Z",
  body_en: "Body",
  body_am: "",
  texts: {},
  changelog: "Change",
  settings_snapshot: {},
  missing_languages: [],
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
  state.version.mockResolvedValue(version);
  state.languages.mockResolvedValue([]);
  state.saveFacts.mockResolvedValue(undefined);
  state.guard.mockImplementation(async (action: () => Promise<unknown>) => action());
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});
import { LegalEditor } from "./legal-editor";
import { LegalEditorForm } from "./legal-editor-form";
it("UFA-49 invalid kind and country are rejected; editor reads and language read show loading, failure and working Retry uf:A17.1", async () => {
  for (const props of [{ kind: "invalid-kind" }, { kind: "terms", country: "invalid-country" }]) {
    draw(<LegalEditor {...props} />);
    expect(screen.getByTestId("legal-bad-document")).toHaveTextContent(
      en["admin.legal.badDocument"],
    );
    cleanup();
  }
  for (const source of [state.docs, state.facts]) {
    source.mockReturnValueOnce(new Promise(() => {}));
    draw(<LegalEditor kind="terms" />);
    expect(screen.getByRole("status")).toHaveTextContent(en["common.loading"]);
    cleanup();
    source.mockRejectedValueOnce(new TypeError("Failed to fetch"));
    draw(<LegalEditor kind="terms" />);
    const alert = await screen.findByTestId("legal-editor-failed");
    expect(alert).toHaveTextContent(en["admin.legal.error.load"]);
    expect(alert).toHaveTextContent(en["failure.network"]);
    const calls = source.mock.calls.length;
    fireEvent.click(within(alert).getByRole("button", { name: en["common.retry"] }));
    await waitFor(() => expect(source).toHaveBeenCalledTimes(calls + 1));
    await waitFor(() => expect(screen.queryByTestId("legal-editor-failed")).toBeNull());
    cleanup();
  }
  state.languages.mockReturnValueOnce(new Promise(() => {}));
  draw(<LegalEditorForm kind="terms" facts={facts} first draft={false} />);
  expect(screen.getByRole("status")).toHaveTextContent(en["common.loading"]);
  cleanup();
  state.languages.mockRejectedValueOnce(new TypeError("Failed to fetch"));
  draw(<LegalEditorForm kind="terms" facts={facts} first draft={false} />);
  const alert = await screen.findByTestId("legal-editor-languages-failed");
  expect(alert).toHaveTextContent(en["admin.legal.error.load"]);
  const calls = state.languages.mock.calls.length;
  fireEvent.click(within(alert).getByRole("button", { name: en["common.retry"] }));
  await waitFor(() => expect(state.languages).toHaveBeenCalledTimes(calls + 1));
  await waitFor(() => expect(screen.queryByTestId("legal-editor-languages-failed")).toBeNull());
});
it("UFA-50 preview names unknown tokens and empty facts uf:A17.3", async () => {
  draw(<LegalEditorForm kind="terms" facts={facts} first draft={false} />);
  const body = screen.getByTestId("legal-field-body-en");
  body.focus();
  fireEvent.change(body, { target: { value: "{{unknown_fact}} {{operator_details}}" } });
  fireEvent.click(screen.getByRole("button", { name: en["admin.legal.action.preview"] }));
  expect(screen.getByTestId("legal-unknown-tokens")).toHaveTextContent(
    en["admin.legal.unknownTokens"].replace("{tokens}", "unknown_fact"),
  );
  expect(screen.getByTestId("legal-empty-facts")).toHaveTextContent(
    en["admin.legal.emptyFacts"].replace("{tokens}", "operator_details"),
  );
});
it("UFA-51 Back is a named link to the legal console without following it uf:A17.6", () => {
  draw(<LegalEditorForm kind="terms" facts={facts} first draft={false} />);
  expect(screen.getByRole("link", { name: en["admin.legal.action.back"] })).toHaveAttribute(
    "href",
    "/admin/legal",
  );
});
it("UFA-52 editor labels, preview, Save and Back are Amharic without English fallback uf:A17.7", async () => {
  state.language = "am";
  draw(<LegalEditorForm kind="terms" facts={facts} first draft={false} />);
  await waitFor(() => expect(state.languages).toHaveBeenCalled());
  for (const key of [
    "admin.legal.field.label",
    "admin.legal.action.preview",
    "admin.legal.action.back",
    "admin.legal.action.saveDraft",
  ] as const) {
    expect(screen.getByText(am[key])).toBeInTheDocument();
    expect(am[key]).not.toBe(en[key]);
    expect(screen.queryByText(en[key])).toBeNull();
  }
});
