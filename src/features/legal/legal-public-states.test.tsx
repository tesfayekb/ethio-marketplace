import { fireEvent, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { en } from "@/i18n/locales/en";
import { readFailed } from "@/lib/reader-failure";

/**
 * UF-1 Part 1 (DEC-493) — the public legal pages (S4) and the publishing statement's failed read
 * (S5.10). Seams: the router (Retry re-runs the route's loader), the page shell, the session
 * check of the publishing route; the words are the real catalogue.
 */
const router = vi.hoisted(() => ({ invalidate: vi.fn() }));
vi.mock("@tanstack/react-router", () => ({
  useRouter: () => router,
  createFileRoute: () => (options: Record<string, unknown>) => ({ options }),
}));
vi.mock("@/i18n", async () => {
  const { en: EN } = await import("@/i18n/locales/en");
  const { ownValue: own } = await import("@/lib/own-key");
  return { useI18n: () => ({ t: (key: string) => own(EN, key) ?? key, language: "en" }) };
});
vi.mock("@/components/layout/page-shell", () => ({
  PageShell: ({ children, ...rest }: { children: ReactNode }) => <main {...rest}>{children}</main>,
}));
vi.mock("@/lib/supabase-door", () => ({ getSupabase: vi.fn() }));
vi.mock("@/lib/signed-in-route", () => ({ requireSignedIn: vi.fn() }));

import { LegalDocumentPage } from "./legal-document-page";

const version = (n: number, body: string) => ({
  version_id: `v${n}`,
  kind: "publishing",
  country_code: null,
  version: n,
  label: `L${n}`,
  body_en: body,
  body_am: body,
  texts: {} as Record<string, string>,
  material: false,
  effective_at: "2026-10-01T00:00:00Z",
  published_at: "2026-10-01T00:00:00Z",
  settings_snapshot: {},
});

beforeEach(() => router.invalidate.mockReset());

describe("UF-1 the public legal pages", () => {
  it("UFP-22 a failed page read says This page could not be loaded, and Retry runs the read again uf:S4.5", () => {
    render(<LegalDocumentPage kind="terms" title={"Terms"} data={null} />);
    expect(screen.getByTestId("legal-public-load-error")).toHaveTextContent(
      en["legal.page.loadError"],
    );
    fireEvent.click(screen.getByRole("button", { name: en["common.retry"] }));
    expect(router.invalidate).toHaveBeenCalledTimes(1);
  });

  it("UFP-23 each country draws its own section under its name: its text, none, or its failed read uf:S4.6", () => {
    render(
      <LegalDocumentPage
        kind="publishing"
        title={"Publishing"}
        data={{ inForce: version(1, "Global body"), scheduled: null }}
        sections={[
          { countryCode: "ET", data: { inForce: version(2, "Country body"), scheduled: null } },
          { countryCode: "KE", data: { inForce: null, scheduled: null } },
          { countryCode: "ER", data: null },
        ]}
      />,
    );
    const sections = screen.getAllByTestId("legal-public-section");
    expect(sections).toHaveLength(3);
    expect(sections[0]).toHaveTextContent("Country body");
    expect(sections[1]).toHaveTextContent(
      en["legal.page.none"].replace("{document}", "Publishing"),
    );
    expect(sections[2]).toHaveTextContent(en["legal.page.loadError"]);
    for (const section of sections) {
      expect(section.querySelector('[data-testid="legal-public-country"]')?.textContent).toMatch(
        new RegExp(en["legal.certify.forCountry"].replace("{country}", ".+")),
      );
    }
  });

  it("UFP-24 the publishing statement's failed read draws the page's notice and carries its class uf:S5.10", async () => {
    const { Route } = await import("@/routes/legal.publishing");
    const PublishingError = Route.options.errorComponent;
    if (typeof PublishingError !== "function") {
      throw new Error("the publishing route has no error view");
    }
    render(<PublishingError error={readFailed("route 503", 503)} reset={() => {}} />);
    expect(screen.getByTestId("legal-public-load-error")).toHaveTextContent(
      en["legal.page.loadError"],
    );
    expect(screen.getByTestId("legal-public-error-class").dataset.failureClass).toMatch(/ 503$/);
    expect(screen.getByRole("button", { name: en["common.retry"] })).toBeInTheDocument();
  });
});
