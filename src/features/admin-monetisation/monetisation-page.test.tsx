import { fireEvent, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";

import type { MonetisationConsole } from "./monetisation-service";

/**
 * P-1c (D313) — the Monetisation page keeps ONE h1: every block (and every
 * inner table a product opens) heads itself with an h2 (TableActions
 * `level="h2"`); the order strip is one named list before the blocks. Seams:
 * the one read, the names, the admin shell, the step-up gate, the router.
 */
const ATTRIBUTION = {
  createdByName: "Abebe",
  updatedByName: "Sara",
  updatedAt: "2026-11-03T09:00:00+00:00",
};
const CONSOLE: MonetisationConsole = {
  markets: [
    {
      ...ATTRIBUTION,
      id: "m1",
      countryCode: null,
      freeRegularAds: 3,
      includedReach: "city",
      paidLevels: false,
      launchCredits: null,
      launchDays: null,
      paidLevelsSince: null,
    },
  ],
  products: [
    {
      ...ATTRIBUTION,
      key: "featured",
      kind: "level",
      nameEn: "Featured",
      nameAm: null,
      days: 30,
      maxPhotos: 10,
      placement: "boost",
      badge: true,
      enabled: true,
      selfServe: true,
      extendsLifetime: false,
      sort: 2,
    },
    {
      ...ATTRIBUTION,
      key: "country",
      kind: "reach",
      nameEn: "Country",
      nameAm: null,
      days: 30,
      maxPhotos: null,
      placement: null,
      badge: false,
      enabled: true,
      selfServe: true,
      extendsLifetime: false,
      sort: 1,
    },
  ],
  overrides: [],
  prices: [],
};

vi.mock("@/i18n", () => ({
  STRINGS_LAYERS: ["admin", "member", "guide"],
  isStringsLayer: (value: string) => ["admin", "member", "guide"].includes(value),
  useI18n: () => ({ t: (key: string) => key, language: "en", entities: new Map() }),
  useStringsLayers: () => ({ state: "ready" }),
}));
vi.mock("@tanstack/react-router", () => ({
  useLocation: ({ select }: { select: (location: { hash: string }) => string }) =>
    select({ hash: "" }),
  useNavigate: () => vi.fn(),
  Link: ({ children, ...rest }: { children: ReactNode; [key: string]: unknown }) => (
    <a {...rest}>{children}</a>
  ),
}));
vi.mock("@/features/admin/admin-context", () => ({
  useAdminShell: () => ({
    permissions: ["packages:view", "packages:update"],
    accessDenied: false,
  }),
}));
vi.mock("@/features/auth/mfa/step-up-gate", () => ({
  StepUpGate: ({ children }: { children: (guard: () => Promise<void>) => ReactNode }) =>
    children(() => Promise.resolve()),
}));
vi.mock("@/lib/use-settling", () => ({ useSettling: () => false }));
vi.mock("./use-monetisation", () => ({
  ADMIN_MONETISATION_KEY: ["test", "admin", "monetisation"],
  useMonetisation: () => ({ data: CONSOLE, isLoading: false, error: null }),
}));
vi.mock("./use-monetisation-names", () => ({
  useMonetisationNames: (products: { key: string; nameEn: string }[]) => ({
    marketName: (code: string | null) => code ?? "Every market",
    categoryName: (id: string | null) => id ?? "Every category",
    productName: (key: string) => products.find((p) => p.key === key)?.nameEn ?? key,
    markets: [],
    tree: { roots: [], byId: new Map() },
  }),
}));

const { AdminMonetisationPage } = await import("./monetisation-page");

describe("AdminMonetisationPage (D313)", () => {
  it("MNP-1 one h1; every block an h2; the strip's three steps; a product opens to its own h2 tables", () => {
    render(<AdminMonetisationPage />);
    expect(document.querySelectorAll("h1").length).toBe(1);
    const blocks = [...document.querySelectorAll("h2")].map((heading) => heading.textContent);
    expect(blocks).toEqual([
      "admin.monetisation.markets.title",
      "admin.monetisation.levels.title",
      "admin.monetisation.reach.title",
    ]);
    const strip = screen.getByTestId("monetisation-order");
    expect(strip.tagName).toBe("OL");
    expect(strip.querySelectorAll("a").length).toBe(3);
    expect(screen.getByTestId("monetisation-order-prices-state").textContent).toBe(
      "prim.orderStrip.set",
    );
    // Every block carries its Guide control.
    for (const anchor of [
      "admin-monetisation-markets",
      "admin-monetisation-level",
      "admin-monetisation-reach",
    ]) {
      expect(screen.getAllByTestId(`${anchor}-guide`).length).toBeGreaterThan(0);
      expect(document.getElementById(anchor)).not.toBeNull();
    }

    fireEvent.click(screen.getAllByTestId("product-featured-open")[0] as HTMLElement);
    expect(document.querySelectorAll("h1").length).toBe(1);
    const opened = [...document.querySelectorAll("h2")].map((heading) => heading.textContent);
    expect(opened).toContain("admin.monetisation.overrides.title");
    expect(opened).toContain("admin.monetisation.prices.title");
    expect(document.getElementById("product-featured-perks")).not.toBeNull();
    expect(document.getElementById("product-featured-prices")).not.toBeNull();
    expect(screen.getAllByTestId("product-featured-prices-guide").length).toBeGreaterThan(0);
  });
});
