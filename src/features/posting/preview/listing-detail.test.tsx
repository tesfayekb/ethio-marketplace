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
    expect(chips.map((chip) => chip.dataset.factKey)).toEqual(["distance", "color"]);
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
  expect(screen.getAllByTestId("listing-key-fact").map((chip) => chip.dataset.factKey)).toEqual([
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

it("LD-9 the buyer's contact block: sign in, show, the revealed links, a refusal (bundle 19 turn 11)", () => {
  const contact = {
    viewer: "signedOut" as const,
    signInTo: { to: "/auth" as const, search: { return: "/l/scratch#contact" } },
    state: { kind: "idle" as const },
    onReveal: () => {},
    whatsappText: "I'm interested in your ethio.com ad: /l/scratch",
  };
  const { rerender } = render(<ListingDetail {...BASE} actor="buyer" contact={contact} />);
  expect(screen.getByTestId("listing-contact-sign-in")).toHaveTextContent(
    en["adPage.contact.signIn"],
  );
  expect(screen.queryByTestId("listing-detail-channel")).toBeNull();
  expect(screen.queryByTestId("listing-contact-show")).toBeNull();

  // Unknown (first paint): the heading alone, no link, no rows.
  rerender(<ListingDetail {...BASE} actor="buyer" contact={{ ...contact, viewer: "unknown" }} />);
  expect(screen.queryByTestId("listing-contact-sign-in")).toBeNull();
  expect(screen.queryByTestId("listing-detail-channel")).toBeNull();

  // Signed in, idle: the shown channels' names and Show contact, never a value.
  rerender(<ListingDetail {...BASE} actor="buyer" contact={{ ...contact, viewer: "signedIn" }} />);
  expect(channel("phone")).toHaveTextContent(en["post.who.channel.phone"]);
  expect(channel("telegram")).toHaveTextContent(en["post.who.channel.telegram"]);
  expect(channel("phone2")).toBeUndefined();
  expect(screen.queryByTestId("listing-detail-channel-value")).toBeNull();
  const show = screen.getByTestId("listing-contact-show");
  expect(show).toHaveTextContent(en["adPage.contact.show"]);
  expect(show).toBeEnabled();

  // Revealed: the values as links, the button gone; a channel the door hid stays a name.
  rerender(
    <ListingDetail
      {...BASE}
      actor="buyer"
      contact={{
        ...contact,
        viewer: "signedIn",
        state: {
          kind: "revealed",
          channels: { phone: "+251911000001", telegram: "@scratch" },
        },
      }}
    />,
  );
  expect(screen.getByTestId("listing-contact-phone")).toHaveAttribute("href", "tel:+251911000001");
  expect(screen.getByTestId("listing-contact-telegram")).toHaveAttribute(
    "href",
    "https://t.me/scratch",
  );
  expect(screen.queryByTestId("listing-contact-show")).toBeNull();

  // Refused: the rows stay, the button stays enabled, the sentence names the rule.
  rerender(
    <ListingDetail
      {...BASE}
      actor="buyer"
      contact={{
        ...contact,
        viewer: "signedIn",
        state: { kind: "refused", reason: "sellersCapReached" },
      }}
    />,
  );
  expect(screen.getByTestId("listing-contact-refusal")).toHaveTextContent(
    en["adPage.contact.sellersCap"],
  );
  expect(screen.getByTestId("listing-contact-show")).toBeEnabled();
  rerender(
    <ListingDetail
      {...BASE}
      actor="buyer"
      contact={{
        ...contact,
        viewer: "signedIn",
        state: { kind: "refused", reason: "rateLimited" },
      }}
    />,
  );
  expect(screen.getByTestId("listing-contact-refusal")).toHaveTextContent(
    en["adPage.contact.rateLimited"],
  );
  rerender(
    <ListingDetail
      {...BASE}
      actor="buyer"
      contact={{
        ...contact,
        viewer: "signedIn",
        state: { kind: "refused", reason: "listingNotAvailable" },
      }}
    />,
  );
  expect(screen.getByTestId("listing-contact-refusal")).toHaveTextContent(
    en["adPage.contact.failed"],
  );
});

it("LD-8 a sold ad keeps the seller card and loses the contact block", () => {
  const { rerender } = render(<ListingDetail {...BASE} soldBadge="Sold" />);
  expect(screen.queryByTestId("listing-detail-contact")).toBeNull();
  expect(screen.getByTestId("listing-detail-seller")).toBeInTheDocument();
  rerender(<ListingDetail {...BASE} />);
  expect(screen.getByTestId("listing-detail-contact")).toBeInTheDocument();
});


it("LD-10 the heart: sign-in return, saved state, count, disabled and refusal; owner and staff previews omit it", () => {
  const save = {
    viewer: "signedOut" as const, saved: false, count: 0, busy: false, refusal: null,
    signInTo: { to: "/auth" as const, search: { return: "/l/scratch" } }, onToggle: vi.fn(),
  };
  const { rerender } = render(<ListingDetail {...BASE} actor="buyer" save={save} />);
  expect(screen.getByRole("link", { name: en["adPage.save.signIn"] })).toHaveAttribute("href", "/auth?return=/l/scratch");
  rerender(<ListingDetail {...BASE} actor="buyer" save={{ ...save, viewer: "signedIn" }} />);
  expect(screen.getByTestId("listing-save")).toHaveAttribute("aria-pressed", "false");
  expect(screen.queryByTestId("listing-save-count")).toBeNull();
  rerender(<ListingDetail {...BASE} actor="buyer" save={{ ...save, viewer: "signedIn", saved: true, count: 3 }} />);
  expect(screen.getByTestId("listing-save")).toHaveAttribute("aria-pressed", "true");
  expect(screen.getByTestId("listing-save-count")).toHaveTextContent("Saved by 3");
  rerender(<ListingDetail {...BASE} actor="buyer" save={{ ...save, viewer: "signedIn", busy: true, refusal: "rateLimited" }} />);
  expect(screen.getByTestId("listing-save")).toBeDisabled();
  expect(screen.getByRole("status")).toHaveTextContent(en["adPage.save.rateLimited"]);
  rerender(<ListingDetail {...BASE} actor="buyer" save={{ ...save, viewer: "unknown", saved: null }} />);
  expect(screen.getByTestId("listing-save")).toHaveAttribute("data-state", "unknown");
  expect(screen.getByTestId("listing-save")).toBeDisabled();
  for (const actor of ["owner", "staff"] as const) {
    rerender(<ListingDetail {...BASE} actor={actor} />);
    expect(screen.queryByTestId("listing-save")).toBeNull();
  }
  rerender(<ListingDetail {...BASE} counts={{ views: 0, contacts: 0, saves: 2 }} />);
  expect(screen.getAllByTestId("listing-detail-count").find((node) => node.dataset.count === "saves")).toHaveTextContent("2 saves");
});
