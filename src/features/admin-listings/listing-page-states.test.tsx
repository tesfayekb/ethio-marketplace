import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, fireEvent, screen, within } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { renderPanel as render } from "@/components/ui/dialog-parts-test-render";
import { en } from "@/i18n/locales/en";
import { am } from "@/i18n/locales/am";
import { ownValue } from "@/lib/own-key";
import type { AdminListingDetail, AdminListingCertification } from "./use-admin-listing";

const state = vi.hoisted(() => ({
  detail: null as AdminListingDetail | null,
  certifications: [] as AdminListingCertification[],
  language: "en" as "en" | "am",
  legal: true,
}));
vi.mock("@/i18n", async (original) => ({
  ...(await original<typeof import("@/i18n")>()),
  useI18n: () => ({
    t: (key: string) => ownValue(state.language === "am" ? am : en, key) ?? key,
    language: state.language,
    has: () => true,
    entities: { map: {}, lang: state.language },
    publicLanguages: [],
  }),
}));
vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => vi.fn(),
  Link: ({
    to,
    params,
    children,
    ...rest
  }: {
    to: string;
    params?: Record<string, string>;
    children: ReactNode;
  }) => (
    <a href={params ? to.replace(/\$\w+/g, (key) => params[key.slice(1)] ?? key) : to} {...rest}>
      {children}
    </a>
  ),
}));
vi.mock("@/features/admin/admin-context", () => ({
  useAdminShell: () => ({ permissions: state.legal ? ["legal:view"] : [] }),
}));
vi.mock("@/features/permissions/use-may-call", () => ({
  useMayCall: () => ({ mayCall: () => false }),
}));
vi.mock("@/components/shell-context", () => ({ useShell: () => ({ user: null }) }));
vi.mock("@/features/auth/mfa/step-up-gate", () => ({
  StepUpGate: ({ children }: { children: (guard: unknown) => ReactNode }) => children(vi.fn()),
}));
vi.mock("@/features/categories/category-tree", () => ({
  useCategoryTree: () => ({ tree: { byId: new Map() } }),
  nearestCategoryPicture: () => null,
}));
vi.mock("@/features/levels/use-level-rows", () => ({
  useLevelRows: () => ({ rows: [] }),
  useLevelLook: () => null,
}));
vi.mock("@/features/posting/use-price-unit-labels", () => ({ usePriceUnitLabels: () => ({}) }));
vi.mock("@/features/posting/preview/listing-detail", () => ({ ListingDetail: () => null }));
vi.mock("./listing-photos", () => ({ ListingPhotos: () => null }));
vi.mock("./use-listing-reports", () => ({
  useListingReports: () => ({ data: [], error: null, isLoading: false }),
}));
vi.mock("@/features/admin-screening/use-screening", async (original) => ({
  ...(await original<typeof import("@/features/admin-screening/use-screening")>()),
  useScreeningPhotos: () => ({ data: [] }),
  useScreeningSchema: () => ({ data: null }),
}));
vi.mock("./use-admin-listing", async (original) => ({
  ...(await original<typeof import("./use-admin-listing")>()),
  useAdminListing: () => ({ data: state.detail, error: null, isLoading: false, isFetching: false }),
  useAdminListingCertifications: () => ({
    data: state.certifications,
    isPending: false,
    isError: false,
  }),
}));
import { AdminListingPage } from "./listing-page";

const AT = "2026-11-26T12:00:00Z";
function detail(): AdminListingDetail {
  return {
    listing: {
      id: "l1",
      title: "T",
      description: "",
      status: "active",
      tier: null,
      tierUntil: null,
      tierSource: null,
      reach: null,
      reachUntil: null,
      reachSource: null,
      severe: false,
      categoryId: null,
      categoryNameEn: null,
      categoryNameAm: null,
      locationId: null,
      placeNameEn: null,
      placeNameAm: null,
      countryCode: null,
      priceMode: "contact",
      priceAmount: null,
      priceCurrency: null,
      pricePeriod: null,
      priceBp: null,
      priceNegotiable: false,
      priceUnit: null,
      priceUnitText: null,
      attributes: {},
      photosSoon: false,
      photoCount: 0,
      createdAt: AT,
      publishedFirstAt: null,
      publishedAt: null,
      expiresAt: null,
      posterExpiresAt: null,
      renewedCount: 0,
      updatedAt: AT,
    },
    seller: {
      id: "s1",
      alias: null,
      businessName: null,
      email: null,
      memberSince: null,
      accountStatus: null,
    },
    channels: { phone: false, phone2: false, telegram: false, whatsapp: false },
    history: [
      {
        at: AT,
        kind: "edit",
        by: "staff",
        byName: "Reviewer",
        fields: ["title"],
        before: { title: "Before title" },
        after: { title: "After title" },
        reason: "other",
        note: "Staff note",
      },
    ],
    historyTotal: 1,
  };
}
function draw() {
  render(
    <QueryClientProvider
      client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}
    >
      <AdminListingPage listingId="l1" />
    </QueryClientProvider>,
  );
}
beforeEach(() => {
  state.detail = detail();
  state.certifications = [];
  state.language = "en";
  state.legal = true;
});
afterEach(cleanup);

it("UFA-17 history shows when, who, changes, reason and note; keyboard shows and hides before/after values uf:A6.8", () => {
  draw();
  const entry = screen.getByTestId("listing-history-entry-0");
  expect(entry.querySelector("time")).toHaveAttribute("datetime", AT);
  expect(within(entry).getByTestId("listing-history-who")).toHaveTextContent(
    `${en["admin.listings.history.by.staff"]} · Reviewer`,
  );
  expect(within(entry).getByTestId("listing-history-what")).toHaveTextContent(
    en["admin.listings.history.edited"].replace("{fields}", en["admin.listings.col.title"]),
  );
  expect(within(entry).getByTestId("listing-history-reason")).toHaveTextContent(
    en["admin.listings.history.reason"].replace("{reason}", en["admin.listings.reason.other"]),
  );
  expect(within(entry).getByTestId("listing-history-note")).toHaveTextContent(
    en["admin.listings.history.note"].replace("{note}", "Staff note"),
  );
  expect(screen.queryByTestId("listing-history-changes")).toBeNull();
  const show = within(entry).getByRole("button", { name: en["admin.listings.history.show"] });
  show.focus();
  fireEvent.keyDown(show, { key: "Enter" });
  fireEvent.click(show, { detail: 0 });
  const changes = screen.getByTestId("listing-history-changes");
  expect(changes).toHaveTextContent(`${en["admin.listings.history.before"]}: Before title`);
  expect(changes).toHaveTextContent(`${en["admin.listings.history.after"]}: After title`);
  const hide = within(entry).getByRole("button", { name: en["admin.listings.history.hide"] });
  hide.focus();
  fireEvent.keyDown(hide, { key: "Enter" });
  fireEvent.click(hide, { detail: 0 });
  expect(screen.queryByTestId("listing-history-changes")).toBeNull();
});

it("UFA-18 certifications show every action, language, country and statement version; legal permission controls the version link uf:A6.10", () => {
  state.certifications = ["publish", "edit", "renew"].map((action, index) => ({
    id: `cert-${index}`,
    action: action === "publish" ? "publish" : action === "edit" ? "edit" : "renew",
    certifiedAt: AT,
    language: "am",
    countries: ["ZZ"],
    versions: [
      {
        versionId: `v-${index}`,
        kind: "publishing",
        countryCode: null,
        version: index + 1,
        label: `Statement ${index}`,
      },
    ],
  }));
  draw();
  const rows = screen.getAllByTestId("listing-certification");
  expect(rows).toHaveLength(3);
  for (const [index, row] of rows.entries()) {
    const cert = state.certifications[index];
    if (!cert) throw new Error("Missing certification");
    expect(row).toHaveTextContent(en[`admin.listings.cert.action.${cert.action}`]);
    expect(row).toHaveTextContent(en["admin.legal.lang.am"]);
    expect(row).toHaveTextContent("ZZ");
    const name = [
      en["legal.kind.publishing"],
      en["admin.legal.scope.global"],
      en["admin.legal.version"].replace("{n}", String(index + 1)),
      `Statement ${index}`,
    ].join(" · ");
    expect(within(row).getByRole("link", { name })).toHaveAttribute(
      "href",
      `/admin/legal/v-${index}`,
    );
  }
  cleanup();
  state.legal = false;
  draw();
  expect(within(screen.getByTestId("listing-certifications")).queryByRole("link")).toBeNull();
  expect(screen.getByTestId("listing-certifications")).toHaveTextContent("Statement 0");
});

it("UFA-19 the listing detail's history, facts and certifications use Amharic without English fallback uf:A6.11", () => {
  state.language = "am";
  draw();
  for (const key of [
    "admin.listings.detail.history",
    "admin.listings.detail.created",
    "admin.listings.cert.title",
    "admin.listings.cert.none",
    "admin.listings.history.show",
  ] as const) {
    expect(screen.getAllByText(am[key]).length).toBeGreaterThan(0);
    expect(screen.queryByText(en[key])).toBeNull();
  }
});
