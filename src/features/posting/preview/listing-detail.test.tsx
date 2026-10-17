import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { en } from "@/i18n/locales/en";
import { shapePostingSchema } from "../posting-service";
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
vi.mock("@/components/shell/location-data", () => ({
  useCountryTree: () => ({ loadedCountry: null, nodes: [] }),
}));
vi.mock("../catalog-scope", () => ({
  useCatalogScope: () => ({ country: "country", categoryPath: () => null, moveTo: null }),
}));
vi.mock("../use-photo-links", () => ({ usePhotoLinks: () => ({}) }));
vi.mock("./photo-gallery", () => ({ PhotoGallery: () => null }));
vi.mock("../map/map-preview", () => ({ MapPreview: () => null }));

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
const channel = (name: string) =>
  screen.getAllByTestId("listing-detail-channel").find((row) => row.dataset.channel === name);

describe("ListingDetail actors", () => {
  it("LD-1 the owner sees his channel values and his views", () => {
    render(<ListingDetail {...BASE} counts={{ views: 12 }} />);
    expect(screen.getByTestId("listing-detail-counts")).toHaveAttribute("data-state", "ready");
    expect(screen.getByTestId("listing-detail-counts")).toHaveTextContent("12 views");
    const phone = channel("phone");
    const telegram = channel("telegram");
    if (!phone || !telegram) throw new Error("shown channels missing");
    expect(within(phone).getByTestId("listing-detail-channel-value")).toHaveTextContent(
      "+251911000001",
    );
    expect(within(telegram).getByTestId("listing-detail-channel-value")).toHaveTextContent(
      "@scratch",
    );
    expect(channel("phone2")).toBeUndefined();
    expect(channel("messages")).toBeUndefined();
    expect(screen.getByTestId("listing-detail")).toHaveAttribute("data-actor", "owner");
  });
  it("LD-2 the owner without counts, and with a failed read", () => {
    const { rerender } = render(<ListingDetail {...BASE} />);
    expect(screen.queryByTestId("listing-detail-counts")).toBeNull();
    rerender(<ListingDetail {...BASE} counts={null} />);
    expect(screen.getByTestId("listing-detail-counts")).toHaveAttribute(
      "data-state",
      "unavailable",
    );
    expect(screen.getByTestId("listing-detail-counts")).toHaveTextContent(
      en["adPage.counts.unavailable"],
    );
  });
  it("LD-3 the buyer never sees a value or a count", () => {
    render(<ListingDetail {...BASE} actor="buyer" counts={{ views: 12 }} />);
    expect(screen.queryByTestId("listing-detail-channel-value")).toBeNull();
    expect(screen.queryByTestId("listing-detail-counts")).toBeNull();
    expect(channel("phone")).toHaveTextContent(en["post.who.channel.phone"]);
    expect(channel("telegram")).toHaveTextContent(en["post.who.channel.telegram"]);
    expect(channel("messages")).toBeUndefined();
    expect(screen.getByTestId("listing-detail")).toHaveAttribute("data-actor", "buyer");
  });
  it("LD-4 staff: no value, no count, the row's action drawn", () => {
    render(
      <ListingDetail
        {...BASE}
        actor="staff"
        counts={{ views: 12 }}
        channelAction={() => <button data-testid="x-show" />}
      />,
    );
    expect(screen.queryByTestId("listing-detail-channel-value")).toBeNull();
    expect(screen.queryByTestId("listing-detail-counts")).toBeNull();
    for (const row of screen.getAllByTestId("listing-detail-channel"))
      expect(within(row).getByTestId("x-show")).toBeInTheDocument();
    expect(channel("messages")).toBeUndefined();
  });
  it("LD-5 the value is drawn only for a non-empty string", () => {
    render(
      <ListingDetail
        {...BASE}
        contactPref={{ phone: { show: true, value: "" }, telegram: { show: true } }}
      />,
    );
    expect(screen.getAllByTestId("listing-detail-channel")).toHaveLength(2);
    expect(screen.queryByTestId("listing-detail-channel-value")).toBeNull();
  });
  it("LD-6 the safety box is drawn on a live ad for every actor and not on a sold one; the sold badge carries the word", () => {
    const { rerender } = render(<ListingDetail {...BASE} actor="buyer" soldBadge={undefined} />);
    for (const actor of ["buyer", "owner", "staff"] as const) {
      rerender(<ListingDetail {...BASE} actor={actor} soldBadge={undefined} />);
      expect(screen.getByTestId("listing-safety")).toBeInTheDocument();
      expect(screen.getAllByTestId("listing-safety-line")).toHaveLength(4);
      expect(screen.queryByTestId("listing-detail-sold-badge")).toBeNull();
      rerender(<ListingDetail {...BASE} actor={actor} soldBadge="Sold" />);
      expect(screen.getByTestId("listing-detail-sold-badge")).toHaveTextContent("Sold");
      expect(screen.queryByTestId("listing-safety")).toBeNull();
    }
  });
});

it("LD-7 the strip under the price, for every actor, from the ranks; the Details list keeps every row", () => {
  const definitions =
    shapePostingSchema({
      attributes: [
        { attr_key: "color", attr_type: "single_select", name_en: "Color", fact_rank: 2 },
        {
          attr_key: "distance",
          attr_type: "number",
          name_en: "Distance",
          fact_rank: 1,
          unit: "km",
        },
        { attr_key: "note", attr_type: "text", name_en: "Note" },
      ],
    })?.attributes ?? [];
  const view = {
    ...BASE,
    definitions,
    attributes: { color: "blue", distance: 42, note: "scratch" },
    attributeOptions: {
      color: [
        {
          value: "blue",
          labelEn: "Blue",
          labelAm: null,
          parent: null,
          active: true,
          aliases: [],
          facts: null,
          allowed: null,
          bounds: null,
          swatch: null,
        },
      ],
    },
  };
  const { rerender } = render(<ListingDetail {...view} />);
  for (const actor of ["buyer", "owner", "staff"] as const) {
    rerender(<ListingDetail {...view} actor={actor} />);
    const chips = screen.getAllByTestId("listing-key-fact");
    expect(chips.map((chip) => chip.dataset.key)).toEqual(["distance", "color"]);
    expect(chips[0]).toHaveTextContent("42 km");
    expect(chips[1]).toHaveTextContent("Blue");
    expect(screen.getAllByTestId("listing-detail-spec")).toHaveLength(3);
  }
  const fallback = definitions.map((definition) => ({
    ...definition,
    factRank: null,
    isFilterable: definition.attrKey === "color",
  }));
  rerender(<ListingDetail {...view} definitions={fallback} />);
  expect(screen.getAllByTestId("listing-key-fact").map((chip) => chip.dataset.key)).toEqual([
    "color",
  ]);
  rerender(
    <ListingDetail
      {...view}
      definitions={fallback.map((definition) => ({
        ...definition,
        cardRank: definition.attrKey === "color" ? 1 : null,
      }))}
    />,
  );
  expect(screen.queryByTestId("listing-key-facts")).toBeNull();
  expect(screen.getAllByTestId("listing-detail-spec")).toHaveLength(3);
});
