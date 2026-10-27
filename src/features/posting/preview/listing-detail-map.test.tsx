import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { en } from "@/i18n/locales/en";
import { ownValue } from "@/lib/own-key";
import { ListingDetail, type ListingDetailView } from "./listing-detail";
import { STILL_MAP_BOX } from "../map/still-map";

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
// INC-940 — the still map's code arrives only when the test lets it: its places are read first.
const download = vi.hoisted(() => {
  let release = () => undefined as void;
  const arrived = new Promise<void>((resolve) => {
    release = resolve;
  });
  return { arrived, release: () => release() };
});
vi.mock("../map/map-preview", async () => {
  await download.arrived;
  return {
    MapPreview: () => <div data-testid="listing-map-pin" />,
    snap: (value: number) => Math.round(value / 0.01) * 0.01,
  };
});
vi.mock("../map/map-large", () => ({ MapLarge: () => null }));

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
 * INC-940 (AP-36's four retried passes): the Location box measured one height before the still
 * map's code arrived and another after it. While the code downloads, the map's place is the still
 * map's box and its caption, so the box does not grow when the map arrives.
 */
describe("the ad page's map holds its box while its code downloads (INC-940)", () => {
  it("LDM-1 the Location box shows the still map's box and caption until the map arrives, then the map", async () => {
    render(
      <ListingDetail
        {...BASE}
        actor="buyer"
        pinLat={9.0054}
        pinLng={38.7636}
        pinPrecision="approx"
      />,
    );
    const map = screen.getByTestId("listing-detail-map");
    const frame = within(map).getByTestId("map-frame");
    const [wrapper, caption] = Array.from(frame.children);
    const box = wrapper?.firstElementChild;
    expect(box).toHaveClass(...STILL_MAP_BOX.split(" "));
    expect(box).toHaveTextContent(en["post.pin.title"]);
    expect(caption).toHaveTextContent(en["adPage.map.approx"]);
    download.release();
    expect(await within(map).findByTestId("listing-map-pin")).toBeInTheDocument();
    expect(within(map).queryByTestId("map-frame")).toBeNull();
  });
});

/**
 * INC-940 (turn 34f stop 1) — ALS-1 on mobile-360: the Location box grew 32 px when the place line
 * arrived with the country tree after the page had painted. The ad page's view carries the places'
 * names from the server's document, so both place lines are in the first paint.
 */
describe("the ad page's place lines come with the page (INC-940)", () => {
  it("LDM-2 with the document's names and no country tree, the title box and the Location box show the places at once", () => {
    render(
      <ListingDetail
        {...BASE}
        actor="buyer"
        country="ET"
        coverage={["scratch-b", "scratch-a"]}
        placeList={[
          { id: "scratch-b", nameEn: "Scratch Subcity" },
          { id: "scratch-a", nameEn: "Scratch City" },
        ]}
        directions="scratch directions"
      />,
    );
    expect(screen.getByTestId("listing-detail-places")).toHaveTextContent(
      "Scratch Subcity, Scratch City",
    );
    expect(screen.getByTestId("listing-detail-location")).toHaveTextContent(
      "Scratch Subcity, Scratch City",
    );
  });
});
