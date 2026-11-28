import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, render, screen } from "@testing-library/react";
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
  reads.listing.mockResolvedValue(ad);
  reads.days.mockResolvedValue(30);
  reads.history.mockResolvedValue([]);
  reads.counts.mockResolvedValue({ views: 0, shares: 0, contacts: 0, saves: 0 });
  reads.identity.mockResolvedValue(null);
  reads.line.mockResolvedValue(null);
  reads.schema.mockResolvedValue(null);
});

describe("INC-1349 — the ad as buyers see it, when its draft is not the caller's", () => {
  it("MLD-1 a draft read that answers none draws the shared notice as a gone answer, with the old words and no Retry", async () => {
    reads.draft.mockResolvedValue(null);
    draw();
    const gone = await screen.findByTestId("my-listing-draft-gone");
    expect(gone).toHaveTextContent(en["myListings.ad.loadError"]);
    expect(gone).toHaveAttribute("data-failure-reason", "gone");
    expect(gone).toHaveAttribute("role", "alert");
    expect(screen.queryByTestId("my-listing-draft-gone-retry")).toBeNull();
  });

  it("MLD-2 a draft read still waiting draws the loading line, not a failure", async () => {
    reads.draft.mockReturnValue(new Promise(() => {}));
    draw();
    const asSeen = await screen.findByTestId("my-listing-as-seen");
    expect(asSeen).toHaveTextContent(en["common.loading"]);
    expect(screen.queryByTestId("my-listing-draft-gone")).toBeNull();
    cleanup();
  });
});
