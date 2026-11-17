import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";

const calls = vi.hoisted(() => ({
  save: vi.fn(),
  facts: vi.fn(),
  review: vi.fn(),
  translation: vi.fn(),
  publish: vi.fn(),
}));
vi.mock("@/i18n", () => ({ useI18n: () => ({ t: (key: string) => key, language: "en" }) }));
vi.mock("@/integrations/supabase/client", () => ({ supabase: {} }));
vi.mock("@tanstack/react-router", () => ({
  Link: ({ children }: { children: ReactNode }) => <span>{children}</span>,
  useNavigate: () => vi.fn(),
  useSearch: () => ({}),
}));
vi.mock("@/features/admin/admin-context", () => ({
  useAdminShell: () => ({ permissions: ["legal:edit", "legal:publish"] }),
}));
vi.mock("@/features/admin/users/use-admin-users", () => ({
  useCountries: () => ({ data: [], error: null }),
}));
vi.mock("@/features/auth/mfa/step-up-gate", () => ({
  StepUpGate: ({ children }: { children: (guard: GuardFn) => ReactNode }) =>
    children(async (run) => run()),
}));
vi.mock("@/features/legal/legal-text", () => ({ LegalText: () => null }));
vi.mock("./use-legal", () => ({
  useBaseLanguages: () => ({ data: [], isPending: false, error: null }),
  useLegalSettings: () => ({
    data: { notice_days: 30, review_months: 6 },
    isPending: false,
    error: null,
  }),
  useLegalDocuments: () => ({
    data: [
      {
        document_id: "scratch-legal",
        kind: "qz_legal",
        country_code: null,
        review: {
          at: "2026-11-17T00:00:00Z",
          kind: "review",
          by_name: null,
          note: null,
          due_at: "2026-11-17T00:00:00Z",
        },
        versions: [],
      },
    ],
    isPending: false,
    error: null,
  }),
  useLegalVersion: () => ({
    data: {
      document_id: "scratch-legal",
      version_id: "scratch-version",
      kind: "qz_legal",
      country_code: null,
      version: 1,
      status: "published",
      label: "Scratch",
      body_en: "Body",
      body_am: "",
      texts: {},
      changelog: "",
      settings_snapshot: {},
      missing_languages: [{ code: "zxy", name_en: "Scratch language" }],
      published_at: "2026-11-17T00:00:00Z",
      effective_at: "2026-11-17T00:00:00Z",
    },
    isPending: false,
    error: null,
  }),
  useLegalWrites: () =>
    Object.fromEntries(
      Object.entries(calls).map(([key, mutateAsync]) => [key, { mutateAsync, isPending: false }]),
    ),
}));

import { LegalEditorForm } from "./legal-editor-form";
import { LegalFactsCard } from "./legal-facts-card";
import { LegalPage } from "./legal-page";
import { LegalVersionView } from "./legal-version-view";
import { LegalPublishDialog } from "./legal-publish-dialog";
import type { LegalSettings } from "./legal-service";

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
const guard: GuardFn = async (run) => run();
beforeEach(() => {
  Object.values(calls).forEach((call) => call.mockReset().mockResolvedValue(undefined));
});

describe("legal console form gates", () => {
  it("KFL-3 a blank draft label sends nothing; optional draft bodies and log stay optional", async () => {
    calls.save.mockResolvedValue({ version_id: "scratch-version", version: 1 });
    render(<LegalEditorForm kind="qz_legal" facts={facts} draft={false} first />);
    fireEvent.click(screen.getByTestId("legal-save-draft"));
    expect(calls.save).not.toHaveBeenCalled();
    fireEvent.change(screen.getByTestId("legal-field-label"), {
      target: { value: "Scratch label" },
    });
    fireEvent.click(screen.getByTestId("legal-save-draft"));
    await waitFor(() =>
      expect(calls.save).toHaveBeenCalledWith({
        kind: "qz_legal",
        country: null,
        label: "Scratch label",
        body_en: "",
        body_am: "",
        texts: {},
        changelog: "",
      }),
    );
  });
  it("KFL-4 invalid notice days block facts save; correction sends numbers and retains other facts", async () => {
    render(<LegalFactsCard facts={facts} guard={guard} />);
    fireEvent.click(screen.getByTestId("legal-facts-edit"));
    fireEvent.change(screen.getByTestId("legal-fact-input-notice_days"), {
      target: { value: "366" },
    });
    fireEvent.click(screen.getByTestId("legal-facts-save"));
    expect(calls.facts).not.toHaveBeenCalled();
    fireEvent.change(screen.getByTestId("legal-fact-input-notice_days"), {
      target: { value: "365" },
    });
    fireEvent.click(screen.getByTestId("legal-facts-save"));
    await waitFor(() => expect(calls.facts).toHaveBeenCalledWith({ ...facts, notice_days: 365 }));
  });
  it("KFL-5 a blank review sends nothing and an answered review uses the existing write", async () => {
    render(<LegalPage />);
    fireEvent.click(screen.getByTestId("legal-review-mark"));
    fireEvent.click(screen.getByTestId("legal-review-save"));
    expect(calls.review).not.toHaveBeenCalled();
    fireEvent.change(screen.getByTestId("legal-review-note"), {
      target: { value: " Checked facts " },
    });
    fireEvent.click(screen.getByTestId("legal-review-save"));
    await waitFor(() =>
      expect(calls.review).toHaveBeenCalledWith({
        documentId: "scratch-legal",
        note: "Checked facts",
      }),
    );
  });
  it("KFL-6 translation requires both language and body before sending", async () => {
    render(<LegalVersionView versionId="scratch-version" openTranslation />);
    fireEvent.click(screen.getByTestId("legal-translation-save"));
    expect(calls.translation).not.toHaveBeenCalled();
    fireEvent.change(screen.getByTestId("legal-translation-language"), {
      target: { value: "zxy" },
    });
    fireEvent.click(screen.getByTestId("legal-translation-save"));
    expect(calls.translation).not.toHaveBeenCalled();
    fireEvent.change(screen.getByTestId("legal-translation-body"), {
      target: { value: "Scratch translation" },
    });
    fireEvent.click(screen.getByTestId("legal-translation-save"));
    await waitFor(() =>
      expect(calls.translation).toHaveBeenCalledWith({
        versionId: "scratch-version",
        language: "zxy",
        body: "Scratch translation",
      }),
    );
  });
  it("KFL-7 material publication requires a date, while correction still sends without one", async () => {
    render(
      <LegalPublishDialog
        id="scratch-version"
        version={2}
        document="Scratch"
        first={false}
        noticeDays={30}
        guard={guard}
        onClose={vi.fn()}
        onPublished={vi.fn()}
      />,
    );
    fireEvent.click(screen.getByTestId("legal-publish-material"));
    fireEvent.change(screen.getByTestId("legal-publish-date"), { target: { value: "" } });
    fireEvent.click(screen.getByTestId("legal-publish-confirm"));
    expect(calls.publish).not.toHaveBeenCalled();
    fireEvent.click(screen.getByTestId("legal-publish-correction"));
    fireEvent.click(screen.getByTestId("legal-publish-confirm"));
    await waitFor(() =>
      expect(calls.publish).toHaveBeenCalledWith({ id: "scratch-version", material: false }),
    );
  });
});
