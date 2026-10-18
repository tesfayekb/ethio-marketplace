import { act, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { en } from "@/i18n/locales/en";
import { shapePostingSchema } from "../posting-service";
import { ownValue } from "@/lib/own-key";
import { ListingDetail, type ListingDetailView } from "./listing-detail";
import { ShareAd } from "@/features/ad-page/share-ad";

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
// LD-18 renders the real PhotoGallery, so this file mocks no gallery.
vi.mock("../map/map-preview", () => ({ MapPreview: () => null }));
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
    onSignInTap: vi.fn(),
    whatsappText: "I'm interested in your ethio.com ad: /l/scratch",
  };
  const { rerender } = render(<ListingDetail {...BASE} actor="buyer" contact={contact} />);
  expect(screen.getByTestId("listing-contact-sign-in")).toHaveTextContent(
    en["adPage.contact.link"],
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
    viewer: "signedOut" as const,
    saved: false,
    count: 0,
    busy: false,
    refusal: null,
    signInTo: { to: "/auth" as const, search: { return: "/l/scratch" } },
    onToggle: vi.fn(),
  };
  const { rerender } = render(<ListingDetail {...BASE} actor="buyer" save={save} />);
  expect(screen.getByRole("link", { name: en["adPage.save.signIn"] })).toHaveAttribute(
    "href",
    "/auth?return=/l/scratch",
  );
  rerender(<ListingDetail {...BASE} actor="buyer" save={{ ...save, viewer: "signedIn" }} />);
  expect(screen.getByTestId("listing-save")).toHaveAttribute("aria-pressed", "false");
  expect(screen.queryByTestId("listing-save-count")).toBeNull();
  rerender(
    <ListingDetail
      {...BASE}
      actor="buyer"
      save={{ ...save, viewer: "signedIn", saved: true, count: 3 }}
    />,
  );
  expect(screen.getByTestId("listing-save")).toHaveAttribute("aria-pressed", "true");
  expect(screen.getByTestId("listing-save-count")).toHaveTextContent("Saved by 3");
  rerender(
    <ListingDetail
      {...BASE}
      actor="buyer"
      save={{ ...save, viewer: "signedIn", busy: true, refusal: "rateLimited" }}
    />,
  );
  expect(screen.getByTestId("listing-save")).toBeDisabled();
  expect(screen.getByRole("status")).toHaveTextContent(en["adPage.save.rateLimited"]);
  rerender(
    <ListingDetail {...BASE} actor="buyer" save={{ ...save, viewer: "unknown", saved: null }} />,
  );
  expect(screen.getByTestId("listing-save")).toHaveAttribute("data-state", "unknown");
  expect(screen.getByTestId("listing-save")).toBeDisabled();
  for (const actor of ["owner", "staff"] as const) {
    rerender(<ListingDetail {...BASE} actor={actor} />);
    expect(screen.queryByTestId("listing-save")).toBeNull();
  }
  rerender(<ListingDetail {...BASE} counts={{ views: 0, contacts: 0, saves: 2 }} />);
  expect(
    screen.getAllByTestId("listing-detail-count").find((node) => node.dataset.count === "saves"),
  ).toHaveTextContent("2 saves");
});

describe("LD-11 report slot", () => {
  it("the report slot is drawn after the seller card when passed; owner and staff previews draw none", () => {
    const { rerender } = render(
      <ListingDetail {...BASE} actor="buyer" report={<span>{en["adPage.report.open"]}</span>} />,
    );
    const slot = screen.getByTestId("listing-detail-report");
    const seller = screen.getByTestId("listing-detail-seller").closest("section");
    if (!seller) throw new Error("seller card missing");
    /* DEC-192 — the report slot closes the boxes (Location and the safety box
      lie between it and the seller card), so it follows the seller card. */
    expect(seller.compareDocumentPosition(slot) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    rerender(<ListingDetail {...BASE} actor="owner" />);
    expect(screen.queryByTestId("listing-detail-report")).toBeNull();
    rerender(<ListingDetail {...BASE} actor="staff" />);
    expect(screen.queryByTestId("listing-detail-report")).toBeNull();
  });
});

describe("turn 14 sharing and counts", () => {
  it("LD-12 the corner holds Share and the unchanged heart", () => {
    render(
      <ListingDetail
        {...BASE}
        share={<span data-testid="share-slot" />}
        save={{
          viewer: "signedIn",
          saved: true,
          count: 1,
          busy: false,
          refusal: null,
          signInTo: { to: "/auth", search: { return: "/l/scratch" } },
          onToggle: vi.fn(),
        }}
      />,
    );
    const heart = screen.getByTestId("listing-save");
    expect(heart).toHaveAttribute("data-state", "saved");
    expect(heart).toHaveAttribute("aria-pressed", "true");
    expect(heart.parentElement).toBe(screen.getByTestId("share-slot").parentElement);
  });
  it("LD-13 Seen from ten views, Shared from one; owners have Views Shares Saves Contacts", () => {
    const { rerender } = render(
      <ListingDetail {...BASE} actor="buyer" publicCounts={{ views: 0, shares: 0 }} />,
    );
    expect(screen.queryByTestId("listing-detail-public-counts")).toBeNull();
    // INC-712 — one view is under ten: Shared alone.
    rerender(<ListingDetail {...BASE} actor="buyer" publicCounts={{ views: 1, shares: 2 }} />);
    expect(screen.getByTestId("listing-detail-public-counts")).toHaveTextContent("Shared 2 times");
    // Nine views and no shares: no line at all.
    rerender(<ListingDetail {...BASE} actor="buyer" publicCounts={{ views: 9, shares: 0 }} />);
    expect(screen.queryByTestId("listing-detail-public-counts")).toBeNull();
    rerender(<ListingDetail {...BASE} actor="buyer" publicCounts={{ views: 10, shares: 2 }} />);
    expect(screen.getByTestId("listing-detail-public-counts")).toHaveTextContent(
      "Seen 10 times · Shared 2 times",
    );
    rerender(<ListingDetail {...BASE} actor="buyer" publicCounts={{ views: 10, shares: 0 }} />);
    expect(screen.getByTestId("listing-detail-public-counts")).toHaveTextContent("Seen 10 times");
    rerender(<ListingDetail {...BASE} actor="buyer" publicCounts={{ views: 0, shares: 1 }} />);
    expect(screen.getByTestId("listing-detail-public-counts")).toHaveTextContent("Shared 1 times");
    for (const actor of ["owner", "staff"] as const) {
      rerender(
        <ListingDetail
          {...BASE}
          actor={actor}
          publicCounts={{ views: 1, shares: 2 }}
          counts={{ views: 3, shares: 4, saves: 5, contacts: 6 }}
        />,
      );
      expect(screen.queryByTestId("listing-detail-public-counts")).toBeNull();
      if (actor === "owner")
        expect(screen.getByTestId("listing-detail-counts")).toHaveTextContent(
          "3 views · 4 shares · 5 saves · 6 contacts",
        );
    }
  });
  it("LD-14 the seller card's All ads link only with a key; none for owner or staff previews", () => {
    const { rerender } = render(<ListingDetail {...BASE} actor="buyer" sellerAdsKey="abebe" />);
    const link = screen.getByTestId("listing-seller-all-ads");
    expect(link).toHaveAttribute("href", expect.stringMatching(/^\/\$name/));
    expect(link).toHaveTextContent("All ads by this seller");
    // No key (a business named by its business name alone): no link.
    rerender(<ListingDetail {...BASE} actor="buyer" sellerAdsKey={null} />);
    expect(screen.queryByTestId("listing-seller-all-ads")).toBeNull();
    // The owner's and staff's previews pass nothing: no link.
    for (const actor of ["owner", "staff"] as const) {
      rerender(<ListingDetail {...BASE} actor={actor} />);
      expect(screen.queryByTestId("listing-seller-all-ads")).toBeNull();
    }
  });
});

it("LD-15 seller line precedes contact, which precedes All ads", () => {
  render(
    <ListingDetail
      {...BASE}
      actor="buyer"
      sellerAdsKey="scratch"
      contact={{
        viewer: "signedOut",
        signInTo: { to: "/auth", search: { return: "/l/scratch#contact" } },
        state: { kind: "idle" },
        onReveal: vi.fn(),
        onSignInTap: vi.fn(),
        whatsappText: "",
      }}
    />,
  );
  const seller = screen.getByTestId("listing-detail-seller").closest("section");
  if (!seller) throw new Error("seller card missing");
  const contact = within(seller).getByTestId("listing-detail-contact");
  const link = within(seller).getByTestId("listing-seller-all-ads");
  const identity = seller.firstElementChild;
  if (!identity) throw new Error("seller identity missing");
  expect(identity.compareDocumentPosition(contact) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  expect(contact.compareDocumentPosition(link) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
});
it("LD-16 no pin draws no map or placeholder; without any place of the seller's own the Location box is gone (turn 23)", () => {
  render(<ListingDetail {...BASE} />);
  expect(screen.queryByTestId("listing-detail-map")).toBeNull();
  expect(screen.queryByText(en["post.preview.mapPlaceholder"])).toBeNull();
  expect(screen.queryByTestId("listing-detail-location")).toBeNull();
});
it("LD-17 section bar belongs to buyers, with present sections only, and only when two or more sections show (turn 23: Location only with a place of the seller's own; turn 27: the seller card is no longer a section)", () => {
  const { rerender } = render(<ListingDetail {...BASE} actor="buyer" />);
  expect(screen.queryByTestId("listing-section-nav")).toBeNull();
  rerender(<ListingDetail {...BASE} actor="buyer" description="scratch description" />);
  expect(screen.queryByTestId("listing-section-nav")).toBeNull();
  rerender(
    <ListingDetail
      {...BASE}
      actor="buyer"
      description="scratch description"
      directions="scratch directions"
    />,
  );
  expect(
    screen.getAllByTestId("listing-section-nav-item").map((item) => item.dataset.target),
  ).toEqual(["description", "location"]);
  for (const actor of ["owner", "staff"] as const) {
    rerender(<ListingDetail {...BASE} actor={actor} />);
    expect(screen.queryByTestId("listing-section-nav")).toBeNull();
  }
  rerender(<ListingDetail {...BASE} actor="buyer" soldBadge="Sold" />);
  expect(screen.queryByTestId("listing-section-nav")).toBeNull();
});

it("LD-18 the buyer's page with photos holds each block's test id exactly once (INC-714)", () => {
  render(
    <ListingDetail
      {...BASE}
      actor="buyer"
      description="scratch description"
      directions="scratch directions"
      photos={[{ id: "ld-18-photo", displayOrder: 0, paths: null, storagePath: null }]}
      save={{
        viewer: "signedIn",
        saved: false,
        count: 0,
        busy: false,
        refusal: null,
        signInTo: { to: "/auth", search: { return: "/l/scratch" } },
        onToggle: vi.fn(),
      }}
    />,
  );
  for (const id of [
    "listing-detail-media",
    "listing-detail-gallery",
    "listing-detail-headline",
    "listing-detail-top",
    "listing-detail-boxes",
    "listing-detail-actions",
    "listing-detail-location",
    "listing-section-nav",
  ]) {
    expect(screen.queryAllByTestId(id), id).toHaveLength(1);
  }
  // DEC-192 — the old two-column wrappers are gone.
  expect(screen.queryAllByTestId("listing-detail-aside")).toHaveLength(0);
  expect(screen.queryAllByTestId("listing-detail-main")).toHaveLength(0);
  // DEC-197 — the seller card sits in the right column of the top row,
  // inside listing-detail-top, never in the boxes grid.
  const top = screen.getByTestId("listing-detail-top");
  const boxes = screen.getByTestId("listing-detail-boxes");
  const sellerCard = screen.getByTestId("listing-detail-seller");
  expect(top.contains(sellerCard)).toBe(true);
  expect(boxes.contains(sellerCard)).toBe(false);
});

it("LD-20 Save and Share sit at the title box's foot; the buyer's Directions label (INC-716)", () => {
  const save = {
    viewer: "signedIn" as const,
    saved: false,
    count: 0,
    busy: false,
    refusal: null,
    signInTo: { to: "/auth" as const, search: { return: "/l/scratch" } },
    onToggle: vi.fn(),
  };
  const share = (
    <ShareAd
      publicId="scratch"
      canonicalPath="/l/scratch"
      title={en["post.review.noTitle"]}
      priceText={null}
    />
  );
  const { rerender } = render(
    <ListingDetail
      {...BASE}
      actor="buyer"
      directions="scratch directions"
      save={save}
      share={share}
    />,
  );
  const headline = screen.getByTestId("listing-detail-headline");
  const actions = within(headline).getByTestId("listing-detail-actions");
  expect(within(actions).getByTestId("listing-save")).toHaveTextContent(en["adPage.save.add"]);
  expect(within(actions).getByTestId("listing-share-open")).toBeInTheDocument();
  const media = screen.getByTestId("listing-detail-media");
  expect(within(media).queryByTestId("listing-save")).toBeNull();
  expect(within(media).queryByTestId("listing-share-open")).toBeNull();
  rerender(
    <ListingDetail
      {...BASE}
      actor="buyer"
      directions="scratch directions"
      save={{ ...save, saved: true }}
      share={share}
    />,
  );
  expect(screen.getByTestId("listing-save")).toHaveTextContent(en["adPage.save.saved"]);
  rerender(
    <ListingDetail
      {...BASE}
      actor="buyer"
      directions="scratch directions"
      save={{ ...save, viewer: "signedOut" }}
      share={share}
    />,
  );
  expect(screen.getByTestId("listing-save")).toHaveTextContent(en["adPage.save.add"]);
  const directions = screen.getByTestId("listing-detail-directions");
  expect(within(directions).getByText(en["adPage.directions"])).toBeInTheDocument();
  expect(document.body.textContent ?? "").not.toContain("(optional)");
});

it("LD-21 the Location box and its tab only with a place of the seller's own (turn 23)", () => {
  const { rerender } = render(<ListingDetail {...BASE} actor="buyer" />);
  expect(screen.queryByTestId("listing-detail-location")).toBeNull();
  // DEC-197 — one section (or none) draws no bar at all, so no Location tab.
  expect(
    screen.queryAllByTestId("listing-section-nav-item").map((item) => item.dataset.target),
  ).not.toContain("location");
  // Directions alone: the box shows with the directions and no map.
  rerender(<ListingDetail {...BASE} actor="buyer" directions="scratch directions" />);
  expect(screen.getByTestId("listing-detail-location")).toBeInTheDocument();
  expect(screen.getByTestId("listing-detail-directions")).toHaveTextContent("scratch directions");
  expect(screen.queryByTestId("listing-detail-map")).toBeNull();
  // An exact pin alone: the box shows with the map.
  rerender(
    <ListingDetail {...BASE} actor="buyer" pinLat={9.0054} pinLng={38.7636} pinPrecision="exact" />,
  );
  expect(screen.getByTestId("listing-detail-location")).toBeInTheDocument();
  expect(screen.getByTestId("listing-detail-map")).toBeInTheDocument();
  expect(screen.queryByTestId("listing-detail-directions")).toBeNull();
  // Location details alone also show the box.
  rerender(<ListingDetail {...BASE} actor="buyer" streetAddress="Bole, near the stadium" />);
  expect(screen.getByTestId("listing-detail-location")).toBeInTheDocument();
  expect(screen.getByTestId("listing-detail-details")).toHaveTextContent("Bole, near the stadium");
  expect(screen.queryByTestId("listing-detail-map")).toBeNull();
});

it("LD-22 the sign-in return focuses Show contact and highlights the seller card for three seconds; it never reveals (DEC-196)", () => {
  const onReveal = vi.fn();
  const contact = {
    viewer: "signedIn" as const,
    signInTo: { to: "/auth" as const, search: { return: "/l/scratch#contact" } },
    state: { kind: "idle" as const },
    onReveal,
    onSignInTap: vi.fn(),
    whatsappText: "I'm interested in your ethio.com ad: /l/scratch",
  };

  // With the flag: the focus is on Show contact, the seller card is highlighted, no reveal.
  const { unmount } = render(
    <ListingDetail {...BASE} actor="buyer" contact={{ ...contact, focusOnReturn: true }} />,
  );
  expect(screen.getByTestId("listing-contact-show")).toHaveFocus();
  expect(screen.getByTestId("listing-detail-seller")).toHaveAttribute("data-highlight", "true");
  expect(onReveal).not.toHaveBeenCalled();
  unmount();

  // Without the flag: nothing focused, no highlight.
  const second = render(<ListingDetail {...BASE} actor="buyer" contact={contact} />);
  expect(screen.getByTestId("listing-contact-show")).not.toHaveFocus();
  expect(screen.getByTestId("listing-detail-seller")).not.toHaveAttribute("data-highlight");
  second.unmount();

  // Three seconds on, the highlight is gone.
  vi.useFakeTimers();
  try {
    render(<ListingDetail {...BASE} actor="buyer" contact={{ ...contact, focusOnReturn: true }} />);
    expect(screen.getByTestId("listing-detail-seller")).toHaveAttribute("data-highlight", "true");
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(screen.getByTestId("listing-detail-seller")).not.toHaveAttribute("data-highlight");
    expect(onReveal).not.toHaveBeenCalled();
  } finally {
    vi.useRealTimers();
  }
});
