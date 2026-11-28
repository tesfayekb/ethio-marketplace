import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, fireEvent, screen, waitFor, within } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { renderPanel as render } from "@/components/ui/dialog-parts-test-render";
import { en } from "@/i18n/locales/en";
import { am } from "@/i18n/locales/am";
import { ownValue } from "@/lib/own-key";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import type { LegalSettings, LegalVersionDetail, LegalDocument } from "./legal-service";
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
import { LegalVersionView } from "./legal-version-view";
it("UFA-47 version loading, not found, failed and comparison loading failure each use their proper words and Retry uf:A16.5", async () => {
  state.version.mockReturnValueOnce(new Promise(() => {}));
  draw(<LegalVersionView versionId="scratch-version" />);
  expect(screen.getByRole("status")).toHaveTextContent(en["common.loading"]);
  cleanup();
  state.version.mockRejectedValueOnce({
    code: "P0D01",
    message: "unknownVersion",
    refusals: [{ reason: "unknownVersion" }],
  });
  draw(<LegalVersionView versionId="scratch-version" />);
  expect(await screen.findByTestId("legal-version-not-found")).toHaveTextContent(
    en["admin.legal.notFound"],
  );
  expect(screen.queryByTestId("legal-version-view-failed")).toBeNull();
  cleanup();
  state.version.mockRejectedValueOnce(new TypeError("Failed to fetch"));
  draw(<LegalVersionView versionId="scratch-version" />);
  const alert = await screen.findByTestId("legal-version-view-failed");
  expect(alert).toHaveTextContent(en["admin.legal.error.load"]);
  expect(alert).toHaveTextContent(en["failure.network"]);
  fireEvent.click(within(alert).getByRole("button", { name: en["common.retry"] }));
  await screen.findByRole("heading", { level: 1 });
  cleanup();
  const previous = { ...version, version_id: "previous", version: 1, languages: [] };
  const documents: LegalDocument[] = [
    {
      document_id: version.document_id,
      kind: version.kind,
      country_code: null,
      review: null,
      versions: [{ ...version, languages: [] }, previous],
    },
  ];
  state.docs.mockResolvedValue(documents);
  let release: ((value: LegalVersionDetail) => void) | undefined;
  state.version.mockImplementation((id: string) =>
    id === "previous"
      ? new Promise<LegalVersionDetail>((resolve) => {
          release = resolve;
        })
      : Promise.resolve(version),
  );
  draw(<LegalVersionView versionId="scratch-version" />);
  fireEvent.click(await screen.findByRole("button", { name: en["admin.legal.action.compare"] }));
  expect(screen.getByRole("status")).toHaveTextContent(en["common.loading"]);
  if (!release) throw new Error("Comparison did not start");
  release({ ...version, version: 1 });
  await screen.findByTestId("legal-diff");
  cleanup();
  state.version.mockImplementation((id: string) =>
    id === "previous" ? Promise.reject(new TypeError("Failed to fetch")) : Promise.resolve(version),
  );
  draw(<LegalVersionView versionId="scratch-version" />);
  fireEvent.click(await screen.findByRole("button", { name: en["admin.legal.action.compare"] }));
  const failed = await screen.findByTestId("legal-previous-failed");
  expect(failed).toHaveTextContent(en["admin.legal.error.load"]);
  state.version.mockResolvedValue(version);
  const calls = state.version.mock.calls.length;
  fireEvent.click(within(failed).getByRole("button", { name: en["common.retry"] }));
  await waitFor(() => expect(state.version).toHaveBeenCalledTimes(calls + 1));
  await screen.findByTestId("legal-diff");
});
it("UFA-48 legal version changelog, language tabs and action words are Amharic without English fallback uf:A16.6", async () => {
  state.language = "am";
  draw(<LegalVersionView versionId="scratch-version" />);
  await screen.findByRole("heading", { level: 1 });
  for (const key of [
    "admin.legal.view.changelog",
    "admin.legal.lang.en",
    "admin.legal.lang.am",
    "admin.legal.action.download",
    "admin.legal.action.print",
  ] as const) {
    expect(screen.getByText(am[key])).toBeInTheDocument();
    expect(am[key]).not.toBe(en[key]);
    expect(screen.queryByText(en[key])).toBeNull();
  }
});
