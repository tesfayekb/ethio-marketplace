import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, fireEvent, screen, within } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { renderPanel as render } from "@/components/ui/dialog-parts-test-render";
import { en } from "@/i18n/locales/en";
import { am } from "@/i18n/locales/am";
import { ownValue } from "@/lib/own-key";
import { readFailed } from "@/lib/reader-failure";
import type { AdminListingDetail, AdminListingCertification } from "./use-admin-listing";

const levelState = vi.hoisted(() => ({
  error: null as unknown,
  retry: (() => undefined) as () => void,
}));
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
  useLevelRows: () => ({
    rows: [],
    isLoading: false,
    error: levelState.error,
    retry: levelState.retry,
  }),
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
  levelState.error = null;
  levelState.retry = vi.fn();
});
afterEach(cleanup);

it("UFL-1 a failed levels read draws the shared notice beside the level", () => {
  levelState.error = new TypeError("Failed to fetch");
  draw();
  const notice = screen.getByTestId("listing-levels-error");
  expect(notice).toHaveTextContent(en["common.error"]);
  expect(notice).toHaveAttribute("data-failure-reason", "network");
  expect(screen.getByTestId("listing-fact-tier")).toBeInTheDocument();
});

it("UFL-2 Retry on the levels notice reads the levels again", () => {
  levelState.error = new TypeError("Failed to fetch");
  const retry = vi.fn();
  levelState.retry = retry;
  draw();
  const notice = screen.getByTestId("listing-levels-error");
  fireEvent.click(within(notice).getByRole("button", { name: en["common.retry"] }));
  expect(retry).toHaveBeenCalledTimes(1);
});

it("UFL-3 a refused levels read draws the notice with no Retry", () => {
  levelState.error = readFailed({ code: "P0D01", message: "badValue:level" }, 400);
  draw();
  const notice = screen.getByTestId("listing-levels-error");
  expect(notice).toHaveAttribute("data-failure-reason", "refused");
  expect(within(notice).queryByRole("button", { name: en["common.retry"] })).toBeNull();
});
