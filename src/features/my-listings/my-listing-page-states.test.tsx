import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { am } from "@/i18n/locales/am";
import { en } from "@/i18n/locales/en";
import { ownValue } from "@/lib/own-key";
import { readFailed } from "@/lib/reader-failure";
import { buildTree } from "@/features/categories/category-tree";
import type { MyListing } from "./my-listing";
import type { MyListingRow } from "./my-listings";

const language = vi.hoisted(() => ({ value: "en" as "en" | "am" }));
const reads = vi.hoisted(() => ({
  listing: vi.fn(),
  draft: vi.fn(),
  identity: vi.fn(),
  line: vi.fn(),
  history: vi.fn(),
  counts: vi.fn(),
  days: vi.fn(),
  schema: vi.fn(),
}));

vi.mock("@/i18n", async (original) => ({
  ...(await original<typeof import("@/i18n")>()),
  useI18n: () => ({
    t: (key: string) => ownValue(language.value === "am" ? am : en, key) ?? key,
    language: language.value,
    entities: { map: {}, lang: language.value },
  }),
}));
vi.mock("@tanstack/react-router", () => ({
  Link: ({ to, children, ...rest }: { to: string; children: ReactNode }) => (
    <a href={to} {...rest}>
      {children}
    </a>
  ),
  useNavigate: () => vi.fn(),
}));
vi.mock("@/features/categories/category-tree", async (original) => ({
  ...(await original<typeof import("@/features/categories/category-tree")>()),
  useCategoryTree: () => ({ tree: buildTree([], []) }),
}));
vi.mock("@/features/posting/use-price-unit-labels", () => ({
  usePriceUnitLabels: () => null,
}));
vi.mock("@/features/levels/use-level-rows", () => ({ useLevelLook: () => null }));
vi.mock("@/features/posting/preview/listing-detail", () => ({ ListingDetail: () => null }));
vi.mock("@/features/ad-page/share-ad", () => ({ ShareAd: () => null }));
vi.mock("@/features/legal/certify-confirm", () => ({ CertifyConfirm: () => null }));
vi.mock("@/components/shell/page-guide", () => ({ PageGuide: () => null }));
vi.mock("./promote-sheet-lazy", () => ({ LazyPromoteSheet: () => null }));
vi.mock("./my-listing", async (original) => ({
  ...(await original<typeof import("./my-listing")>()),
  readMyListing: reads.listing,
  readHistory: reads.history,
  readListingCounts: reads.counts,
  readSoldVisibleDays: reads.days,
}));
vi.mock("@/features/posting/posting-service", async (original) => ({
  ...(await original<typeof import("@/features/posting/posting-service")>()),
  readDraft: reads.draft,
  readSellerIdentity: reads.identity,
  readSellerLine: reads.line,
  readPostingSchema: reads.schema,
}));
vi.mock("@/features/posting/attribute-options", async (original) => ({
  ...(await original<typeof import("@/features/posting/attribute-options")>()),
  loadAttributeOptions: vi.fn(async () => ({ ok: true, options: [] })),
}));

import { MyListingPage } from "./my-listing-page";

const row: MyListingRow = {
  id: "listing-1",
  publicId: "abcdefghjk",
  status: "active",
  title: "Fridge",
  categoryId: null,
  coverPhotoId: null,
  photosSoon: false,
  priceMode: "fixed",
  priceAmount: 1000,
  priceCurrency: "ETB",
  pricePeriod: "once",
  priceBp: null,
  priceNegotiable: false,
  priceUnit: null,
  priceUnitText: null,
  priceWas: null,
  reserved: false,
  publishedFirstAt: "2026-10-01T08:00:00Z",
  publishedAt: "2026-10-01T08:00:00Z",
  renewedAt: null,
  expiresAt: "2026-10-31T08:00:00Z",
  daysLeft: 17,
  daysKept: null,
  soldAt: null,
  soldWord: "sold",
  createdAt: "2026-09-30T08:00:00Z",
  updatedAt: null,
  staffReason: null,
  level: "regular",
  levelUntil: null,
  levelSource: null,
  reach: null,
  reachUntil: null,
};
const ad: MyListing = {
  listing: row,
  group: "live",
  resumeStatus: null,
  countryCode: "ET",
  renewAllowed: true,
  renewDays: 30,
};

function draw() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={client}>
      <MyListingPage listingId="listing-1" />
    </QueryClientProvider>,
  );
}

beforeEach(() => {
  language.value = "en";
  for (const read of Object.values(reads)) read.mockReset();
  reads.days.mockResolvedValue(30);
  reads.history.mockResolvedValue([]);
  reads.counts.mockResolvedValue({ views: 0, shares: 0, contacts: 0, saves: 0 });
  reads.draft.mockResolvedValue({ draft: { tier: null }, photos: [], coverage: [] });
  reads.identity.mockResolvedValue(null);
  reads.line.mockResolvedValue(null);
  reads.schema.mockResolvedValue(null);
});

describe("UF-1 one member listing", () => {
  it("UFM-6 the page draws loading, its failed read with Retry, and not found uf:S9.2", async () => {
    reads.listing.mockReturnValueOnce(new Promise<MyListing | "notYours">(() => {}));
    draw();
    expect(screen.getByRole("status")).toHaveTextContent(en["common.loading"]);
    cleanup();

    reads.listing
      .mockRejectedValueOnce(readFailed("route 503", 503))
      .mockResolvedValueOnce("notYours");
    draw();
    const failure = await screen.findByTestId("my-listing-error");
    expect(failure).toHaveTextContent(en["myListings.ad.loadError"]);
    expect(failure).toHaveAttribute("data-failure-class", "server 503");
    fireEvent.click(screen.getByRole("button", { name: en["common.retry"] }));
    expect(await screen.findByTestId("my-listing-not-found")).toHaveTextContent(
      en["myListings.ad.notFound"],
    );
    expect(reads.listing).toHaveBeenCalledTimes(3);
  });

  it("UFM-7 a failed buyer-view identity read keeps its raw class uf:S9.11", async () => {
    reads.listing.mockResolvedValue(ad);
    reads.identity.mockRejectedValue(readFailed("route 503", 503));
    draw();
    const failure = await screen.findByTestId("my-listing-identity-error");
    expect(failure).toHaveTextContent(en["myListings.ad.loadError"]);
    expect(failure).toHaveAttribute("data-failure-class", "server 503");
    expect(screen.getByRole("button", { name: en["common.retry"] })).toBeInTheDocument();
  });

  it("UFM-8 the page's own words are the Amharic catalogue's uf:S9.13", async () => {
    language.value = "am";
    reads.listing.mockResolvedValue("notYours");
    draw();
    expect(await screen.findByTestId("my-listing-not-found")).toHaveTextContent(
      am["myListings.ad.notFound"],
    );
    expect(screen.getByRole("link", { name: am["nav.myListings"] })).toHaveAttribute(
      "href",
      "/my-listings",
    );
    for (const key of ["myListings.ad.notFound", "nav.myListings"] as const) {
      if (am[key] !== en[key]) expect(document.body.textContent).not.toContain(en[key]);
    }
  });
});
