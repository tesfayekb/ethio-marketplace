import { renderPanel as render } from "@/components/ui/dialog-parts-test-render";
import { screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { en } from "@/i18n/locales/en";
import { ownValue } from "@/lib/own-key";
import type { PublicListingDoc } from "@/features/ad-page/public-listing";

/**
 * UF-1 Part 1 (DEC-493) — the owner's own ad page (S2.20): no Save, no Report, and the notice
 * that the seller name is held for review. Seams: the route's loader data, the shell's session,
 * the viewer's saved state, the seller-review read and the page's side reads; the ad page's
 * body (ListingDetail) is the real one.
 */
const page = vi.hoisted(() => ({ doc: null as unknown, owner: true, held: true }));

vi.mock("@tanstack/react-start", () => ({
  createServerFn: () => ({ validator: () => ({ handler: () => vi.fn() }) }),
}));
vi.mock("@tanstack/react-start/server", () => ({ getRequest: vi.fn() }));
vi.mock("@tanstack/react-router", () => ({
  createFileRoute: () => (options: Record<string, unknown>) => ({
    options,
    useLoaderData: () => ({ doc: page.doc, canonical: "/l/ad-abcdefghjk", photoLinks: {} }),
  }),
  Link: ({ to, children, ...rest }: { to: string; children: ReactNode }) => (
    <a href={String(to)} {...rest}>
      {children}
    </a>
  ),
  notFound: vi.fn(),
  redirect: vi.fn(),
  useNavigate: () => vi.fn(),
}));
vi.mock("@/i18n", async (original) => ({
  ...(await original<typeof import("@/i18n")>()),
  useI18n: () => ({
    t: (key: string) => ownValue(en, key) ?? key,
    language: "en",
    entities: { map: {}, lang: "en" },
  }),
}));
vi.mock("@/components/shell-context", () => ({
  useShell: () => ({ user: { id: "owner" }, authLoading: false }),
}));
vi.mock("@/features/ad-page/use-saved-state", () => ({
  useSavedState: () => ({ saved: false, owner: page.owner, count: 0, beginWrite: () => vi.fn() }),
}));
vi.mock("@/features/seller/seller-review", () => ({
  readSellerReview: () => Promise.resolve(page.held),
}));
vi.mock("@/features/ad-page/count-view", () => ({ countView: vi.fn() }));
vi.mock("@/features/ad-page/similar-ads", () => ({ SimilarAds: () => null }));
vi.mock("@/features/ad-page/share-ad", () => ({ ShareAd: () => null }));
vi.mock("@/features/ad-page/report-ad", () => ({
  ReportAd: () => <button type="button">{en["adPage.report.open"] ?? "report"}</button>,
}));
vi.mock("@/components/shell/page-guide", () => ({ PageGuide: () => null }));
vi.mock("@/components/shell/location-data", async (original) => ({
  ...(await original<typeof import("@/components/shell/location-data")>()),
  useCountryTree: vi.fn(() => ({ loadedCountry: null, nodes: [] })),
}));
vi.mock("@/features/posting/catalog-scope", () => ({
  useCatalogScope: () => ({ country: "country", categoryPath: () => null, moveTo: null }),
}));
vi.mock("@/features/posting/use-photo-links", () => ({ usePhotoLinks: () => ({}) }));
vi.mock("@/features/posting/map/map-preview", () => ({ MapPreview: () => null }));
vi.mock("@/features/posting/map/map-large", () => ({ MapLarge: () => null }));

const { Route } = await import("./l.$slug");
const AdPage = Route.options.component;
if (typeof AdPage !== "function") throw new Error("the ad route has no page component");

/** The ad document's shape, as public-listing.test.ts declares it. */
function document(): PublicListingDoc {
  return {
    public_id: "abcdefghjk",
    title: "Ad",
    description: "Description",
    status: "active",
    is_sold: false,
    sold_at: null,
    sold_word: null,
    reserved: false,
    published_at: null,
    expires_at: null,
    renewed_at: null,
    tier: "regular",
    photos_soon: false,
    video_url: null,
    country: "ET",
    price: {
      mode: "fixed",
      amount: 100,
      currency: "ETB",
      period: "once",
      bp: null,
      negotiable: false,
      unit: "piece",
      unit_text: null,
      unit_label: { en: "piece", am: "ቁራጭ" },
      was: null,
      drop_at: null,
    },
    category: null,
    attributes: {},
    definitions: [],
    photos: [],
    cover_photo_id: null,
    places: {
      location_id: null,
      coverage: [],
      list: [],
      pin: null,
      directions: null,
      street_address: null,
    },
    seller: { alias: "seller", business_name: null, previous_alias: null, member_since: null },
    contact_channels: [],
    counts: { views: 0, shares: 0, saves: 0 },
    viewer: { owner: true, saved: false },
  };
}

beforeEach(() => {
  page.doc = document();
  page.owner = true;
  page.held = true;
});

describe("UF-1 the owner's own ad page", () => {
  it("UFP-12 the owner's own page offers no Save and no Report, and says the name is held for review uf:S2.20", async () => {
    render(<AdPage />);
    expect(screen.getByTestId("ad-page")).toBeInTheDocument();
    const notice = await screen.findByTestId("listing-detail-seller-review");
    expect(notice).toHaveTextContent(en["post.seller.underReview"]);
    expect(screen.queryByTestId("listing-save")).toBeNull();
    expect(screen.queryByTestId("listing-detail-report")).toBeNull();
  });

  it("UFP-13 a signed-in visitor who is not the owner gets Save and Report and no held-name notice uf:S2.20", async () => {
    page.owner = false;
    page.doc = { ...document(), viewer: { owner: false, saved: false } };
    render(<AdPage />);
    expect(await screen.findByTestId("listing-save")).toBeInTheDocument();
    expect(screen.getByTestId("listing-detail-report")).toBeInTheDocument();
    expect(screen.queryByTestId("listing-detail-seller-review")).toBeNull();
  });
});
