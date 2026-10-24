import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const site = vi.hoisted(() => ({ language: "en" }));
vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (k: string) => k, language: site.language }),
}));
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
  texts: {} as Record<string, string>,
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
  it("shows the site's language only and switches between the version in force and the next, with each version's facts", () => {
    site.language = "en";
    const page = () => (
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
      />
    );
    const { rerender } = render(page());
    const text = () => screen.getByTestId("legal-text").textContent;
    expect(text()).toContain("One a@example.invalid");
    expect(screen.getByTestId("legal-public-upcoming")).toBeInTheDocument();
    site.language = "am";
    rerender(page());
    expect(text()).toContain("Amharic one");
    expect(screen.queryByTestId("legal-public-lang-am")).toBeNull();
    expect(screen.queryByTestId("legal-public-lang-en")).toBeNull();
    expect(screen.queryByTestId("legal-public-print")).toBeNull();
    site.language = "en";
    rerender(page());
    fireEvent.click(screen.getByTestId("legal-public-show-upcoming"));
    expect(text()).toContain("Two b@example.invalid");
    fireEvent.click(screen.getByTestId("legal-public-show-current"));
    expect(text()).toContain("One a@example.invalid");
  });
  it("shows the load error", () => {
    render(<LegalDocumentPage kind="terms" title="T" data={null} />);
    expect(screen.getByTestId("legal-public-load-error")).toBeInTheDocument();
  });
  it("selects English with a fallback when the reader language has no text", () => {
    site.language = "om";
    render(
      <LegalDocumentPage
        kind="terms"
        title="T"
        data={{
          inForce: v(1, "English body", "Amharic body", "", "2026-10-01T00:00:00Z"),
          scheduled: null,
        }}
      />,
    );
    expect(screen.getByTestId("legal-text")).toHaveTextContent("English body");
    expect(screen.getByTestId("legal-fallback-note")).toBeInTheDocument();
  });
  it("selects the reader language text without a fallback", () => {
    site.language = "om";
    const version = v(1, "English body", "Amharic body", "", "2026-10-01T00:00:00Z");
    version.texts = { om: "Oromo body" };
    render(
      <LegalDocumentPage kind="terms" title="T" data={{ inForce: version, scheduled: null }} />,
    );
    expect(screen.getByTestId("legal-text")).toHaveTextContent("Oromo body");
    expect(screen.queryByTestId("legal-fallback-note")).toBeNull();
  });
});

it("shows the global text and every requested country, including an absent statement", () => {
  site.language = "en";
  render(
    <LegalDocumentPage
      kind="publishing"
      title="Publishing"
      data={{ inForce: v(1, "Global body", "am", "", "2026-10-01T00:00:00Z"), scheduled: null }}
      sections={[
        {
          countryCode: "ET",
          data: {
            inForce: v(2, "Country body", "am", "", "2026-10-01T00:00:00Z"),
            scheduled: null,
          },
        },
        { countryCode: "KE", data: { inForce: null, scheduled: null } },
      ]}
    />,
  );
  expect(screen.getByTestId("legal-public-page")).toHaveTextContent("Global body");
  expect(screen.getByTestId("legal-public-page")).toHaveTextContent("Country body");
  expect(screen.getAllByTestId("legal-public-country")).toHaveLength(2);
  expect(screen.getByTestId("legal-public-none")).toHaveTextContent("legal.page.none");
});
