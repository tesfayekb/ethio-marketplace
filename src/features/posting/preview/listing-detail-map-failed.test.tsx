import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { en } from "@/i18n/locales/en";
import { ownValue } from "@/lib/own-key";
import { ListingDetail, type ListingDetailView } from "./listing-detail";

vi.mock("@/i18n", async (original) => ({
  ...(await original<typeof import("@/i18n")>()),
  useI18n: () => ({
    t: (key: string) => ownValue(en, key) ?? key,
    language: "en",
    entities: { map: {}, lang: "en" },
  }),
}));
vi.mock("@/components/shell/location-data", async (original) => ({
  ...(await original<typeof import("@/components/shell/location-data")>()),
  useCountryTree: vi.fn(() => ({ loadedCountry: null, nodes: [] })),
}));
vi.mock("../catalog-scope", () => ({
  useCatalogScope: () => ({ country: "country", categoryPath: () => null, moveTo: null }),
}));
vi.mock("../use-photo-links", () => ({
  usePhotoLinks: (photos: readonly { id: string }[]) =>
    Object.fromEntries(
      photos
        .filter((photo) => photo.id === "ld-18-photo")
        .map((photo) => [photo.id, { card: "https://cdn.example/scratch.jpg" }]),
    ),
}));
vi.mock("@tanstack/react-router", () => ({
  Link: ({ to, search, children, ...rest }: Record<string, unknown>) => (
    <a
      href={`${String(to)}?return=${String((search as { return?: string })?.return ?? "")}`}
      {...rest}
    >
      {children as never}
    </a>
  ),
}));
// INC-956 — the maps' code cannot download (offline): both imports fail.
vi.mock("../map/map-preview", () => {
  throw new Error("offline: the map's code did not download");
});
vi.mock("../map/map-large", () => {
  throw new Error("offline: the large map's code did not download");
});
const reported = vi.hoisted(() => vi.fn());
vi.mock("@/lib/on-demand-failure", async (original) => ({
  ...(await original<typeof import("@/lib/on-demand-failure")>()),
  reportOnDemandFailure: reported,
}));

const BASE: ListingDetailView = {
  actor: "owner",
  title: "Scratch ad",
  description: "",
  priceMode: "contact",
  priceAmount: null,
  priceCurrency: null,
  pricePeriod: null,
  attributes: {},
  definitions: [],
  attributeOptions: {},
  photos: [],
  illustrationUrl: null,
  coverage: [],
  country: null,
  contactPref: {
    phone: { show: true, value: "+251911000001" },
    telegram: { show: true, value: "@scratch" },
    phone2: { show: false, value: "+251911000002" },
  },
  sellerAlias: null,
  sellerBusinessName: null,
};

/**
 * INC-956 (the operator's walk of 2026-10-27, line 8) — offline, the ad page's map said "Map pin",
 * its loading word, where it had failed. A map whose code cannot download says the failure and
 * offers Refresh in its own box, and does not also raise the shell's notice.
 */
describe("a map that cannot download says so in its box (INC-956)", () => {
  it("LDF-1 the still map's box shows the failure and Refresh, never the loading word, and the shell's notice is not raised", async () => {
    const errors = vi.spyOn(console, "error").mockImplementation(() => undefined);
    render(
      <ListingDetail
        {...BASE}
        actor="buyer"
        pin={{ lat: 9.0054, lng: 38.7636, precision: "approx" }}
      />,
    );
    const map = screen.getByTestId("listing-detail-map");
    const failed = await within(map).findByTestId("listing-map-failed");
    expect(failed).toHaveTextContent(en["common.loadFailed"]);
    expect(within(failed).getByTestId("listing-map-refresh")).toHaveTextContent(
      en["common.refreshPage"],
    );
    expect(map).not.toHaveTextContent(en["post.pin.title"]);
    expect(within(map).getByTestId("map-frame")).toContainElement(failed);
    expect(reported).not.toHaveBeenCalled();
    expect(
      errors.mock.calls.some((call) => String(call[0]).startsWith("[client-error] the map")),
    ).toBe(true);
    errors.mockRestore();
  });
});
