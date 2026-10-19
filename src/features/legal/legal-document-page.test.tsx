import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/i18n", () => ({ useI18n: () => ({ t: (k: string) => k, language: "en" }) }));
vi.mock("@/components/layout/page-shell", () => ({
  PageShell: ({ children, ...rest }: { children: React.ReactNode }) => (
    <main {...rest}>{children}</main>
  ),
}));
import { LegalDocumentPage } from "./legal-document-page";

const v = (n: number, en: string, am: string, email: string, at: string) => ({
  version_id: `v${n}`,
  kind: "e2e-x",
  country_code: null,
  version: n,
  label: `L${n}`,
  body_en: en,
  body_am: am,
  material: n > 1,
  effective_at: at,
  published_at: at,
  settings_snapshot: { legal_email: email },
});

describe("LegalDocumentPage", () => {
  it("says soon when nothing is in force", () => {
    render(<LegalDocumentPage kind="terms" title="T" data={{ inForce: null, scheduled: null }} />);
    expect(screen.getByTestId("legal-public-none")).toHaveTextContent("legal.page.none");
  });
  it("switches language and between the version in force and the next, with each version's facts", () => {
    render(
      <LegalDocumentPage
        kind="e2e-x"
        title="T"
        data={{
          inForce: v(
            1,
            "One {{legal_email}}",
            "Amharic one",
            "a@example.invalid",
            "2026-10-01T00:00:00Z",
          ),
          scheduled: v(
            2,
            "Two {{legal_email}}",
            "Amharic two",
            "b@example.invalid",
            "2026-11-01T00:00:00Z",
          ),
        }}
      />,
    );
    const text = () => screen.getByTestId("legal-text").textContent;
    expect(text()).toContain("One a@example.invalid");
    expect(screen.getByTestId("legal-public-upcoming")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("legal-public-lang-am"));
    expect(text()).toContain("Amharic one");
    fireEvent.click(screen.getByTestId("legal-public-lang-en"));
    fireEvent.click(screen.getByTestId("legal-public-show-upcoming"));
    expect(text()).toContain("Two b@example.invalid");
    fireEvent.click(screen.getByTestId("legal-public-show-current"));
    expect(text()).toContain("One a@example.invalid");
  });
  it("shows the load error", () => {
    render(<LegalDocumentPage kind="terms" title="T" data={null} />);
    expect(screen.getByTestId("legal-public-load-error")).toBeInTheDocument();
  });
});
