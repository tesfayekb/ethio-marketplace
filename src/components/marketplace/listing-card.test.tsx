import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import type { FeedListing } from "@/features/feed/feed-page";
import { PLAIN_LOOK } from "@/features/levels/levels-store";

import { InviteCard } from "./invite-card";
import { ListingCard } from "./listing-card";
import { ListingPicture, RIBBON_BAND_CLASS } from "./listing-picture";

vi.mock("@/i18n", () => ({
  useI18n: () => ({
    t: (key: string) => key,
    language: "en",
    setLanguage: () => {},
    entities: {},
  }),
}));
vi.mock("@/features/categories/category-tree", () => ({
  useCategoryTree: () => ({ tree: null }),
  nearestCategoryPicture: () => null,
}));
vi.mock("@/features/posting/use-price-unit-labels", () => ({
  usePriceUnitLabels: () => null,
}));
vi.mock("@tanstack/react-router", () => ({
  // LC-7 reads the address the link would open: `to` with its search params.
  Link: ({
    children,
    to,
    search,
    ...props
  }: {
    children?: React.ReactNode;
    to?: string;
    search?: Record<string, string>;
  }) => {
    const query = search ? new URLSearchParams(search).toString() : "";
    return (
      <a {...props} href={query === "" ? to : `${to}?${query}`}>
        {children}
      </a>
    );
  },
}));

const BASE: FeedListing = {
  id: "l1",
  publicId: null,
  title: "Toyota Vitz 2015",
  tier: "lvl-standard",
  look: PLAIN_LOOK,
  levelRow: null,
  priceAmount: 1500000,
  priceCurrency: "ETB",
  priceMode: "fixed",
  priceBp: null,
  priceNegotiable: false,
  pricePeriod: "once",
  priceUnit: null,
  priceUnitText: null,
  photosSoon: false,
  coverPhotoId: null,
  soldWord: null,
  reserved: false,
  priceWas: null,
  publishedAt: "2026-10-10T08:00:00Z",
  categoryId: "c1",
  locationId: null,
  locationNameEn: "Bole",
  locationNameAm: null,
  step: 1,
};

/** P-2 (c) c2a — a card of a fixture level: its look on the two axes, its dictionary row's name. */
type Frame = "standard" | "boost" | "top";
const levelled = (frame: Frame, badge = frame !== "standard"): Partial<FeedListing> => ({
  tier: `lvl-${frame}`,
  look: { placement: frame, badge },
  levelRow: {
    key: `lvl-${frame}`,
    sort: 0,
    nameEn: `Level ${frame}`,
    nameAm: null,
    isBaseline: frame === "standard",
    look: null,
  },
});

/**
 * Bundle 11 V2b (the operator, 2026-10-11) — every card on the listings pages
 * is one size: the card fills its cell, its slots sit in the same places, and
 * the invitation fills its cell without growing past a card.
 */
describe("ListingCard and InviteCard — one card shape", () => {
  it("LC-1 the card fills its cell; the level's flag sits on the picture; the place line is kept without a place, holding the level's word alone; the price slot is reserved", () => {
    const { unmount } = render(
      <ListingCard listing={{ ...BASE, ...levelled("top"), locationNameEn: null }} />,
    );
    const card = screen.getByTestId("listing-card");
    expect(card.className).toContain("h-full");
    const pill = within(card).getByTestId("listing-card-tier");
    expect(pill).toHaveAttribute("data-tier", "lvl-top");
    // On the picture's corner, never in the title's line.
    expect(pill.parentElement!.contains(within(card).getByTestId("listing-card-picture"))).toBe(
      true,
    );
    expect(card.querySelector("h3")!.contains(pill)).toBe(false);
    const place = within(card).getByTestId("listing-card-place");
    // S4 (G38): the place slot now carries the tier word; with no place, the word alone.
    expect(place.children).toHaveLength(1);
    expect(place.firstElementChild).toBe(within(place).getByTestId("listing-card-tier-word"));
    expect(place.className).toContain("mt-auto");
    const price = within(card).getByTestId("listing-card-price").parentElement!;
    expect(price.className).toContain("min-h-[3.625rem]");
    expect(price.className).toContain("@min-[11rem]:min-h-[2.75rem]");
    unmount();

    render(<ListingCard listing={BASE} />);
    expect(screen.getByTestId("listing-card-place")).toHaveTextContent("Bole");
    expect(screen.queryByTestId("listing-card-tier")).toBeNull();
    expect(screen.queryByTestId("listing-card-tier-word")).toBeNull();
  });

  it("LC-8 the level's look: fill and frame over the card's surface, divider and ink, flag, word and ribbon palette (S4)", () => {
    const cases = [
      { frame: "standard", fill: "bg-card", lift: "shadow-card", rule: "border-card-rule" },
      {
        frame: "top",
        fill: "bg-tier-premium",
        lift: "shadow-premium",
        rule: "border-tier-premium-rule",
      },
      {
        frame: "boost",
        fill: "bg-tier-featured",
        lift: "shadow-featured",
        rule: "border-tier-featured-rule",
      },
    ] as const;
    for (const { frame, fill, lift, rule } of cases) {
      const { unmount } = render(
        <ListingCard listing={{ ...BASE, ...levelled(frame), reserved: true }} />,
      );
      const card = screen.getByTestId("listing-card");
      const classes = card.className.split(" ");
      expect(classes).toContain(fill);
      expect(classes).toContain(lift);
      expect(classes.filter((c) => /^bg-/.test(c))).toEqual([fill]);
      expect(classes.filter((c) => /^shadow-/.test(c))).toEqual([lift]);
      // The fold and the caps show past the card's edges; the picture keeps its top corners.
      expect(classes).not.toContain("overflow-hidden");
      expect(screen.getByTestId("listing-card-picture").className).toContain("rounded-t-card");
      expect(screen.getByTestId("listing-card-place").className.split(" ")).toContain(rule);
      expect(screen.getByTestId("listing-ribbon")).toHaveAttribute(
        "data-ribbon",
        { standard: "pearl", top: "gold", boost: "sage" }[frame],
      );
      if (frame === "standard") {
        expect(screen.queryByTestId("listing-card-tier")).toBeNull();
      } else {
        const flag = screen.getByTestId("listing-card-tier");
        expect(flag).toHaveAttribute("role", "img");
        expect(flag).toHaveAttribute("aria-label", `Level ${frame}`);
        expect(screen.getByTestId("listing-card-tier-word")).toHaveAttribute("aria-hidden", "true");
        expect(screen.getByTestId("listing-card-tier-word")).toHaveTextContent(`Level ${frame}`);
      }
      unmount();
    }
  });

  it("LC-9 every compact card reserves the place slot's two lines, so grids with and without a paid card match (S4 ruling 3)", () => {
    for (const frame of ["standard", "top", "boost"] as const) {
      const { unmount } = render(<ListingCard listing={{ ...BASE, ...levelled(frame) }} />);
      const place = screen.getByTestId("listing-card-place").className.split(" ");
      expect(place).toContain("min-h-[2lh]");
      expect(place).toContain("@min-[11rem]:min-h-[1lh]");
      unmount();
    }
  });

  it("LC-11 the axes are independent: a badge on the plain frame flies the green flag; a badge whose key the dictionary does not hold keeps its frame and draws no flag (P-2 (c) c2a)", () => {
    const { unmount } = render(
      <ListingCard listing={{ ...BASE, ...levelled("standard", true) }} />,
    );
    const card = screen.getByTestId("listing-card");
    expect(card.className.split(" ").filter((c) => /^bg-/.test(c))).toEqual(["bg-card"]);
    expect(screen.getByTestId("listing-card-tier")).toHaveAttribute("aria-label", "Level standard");
    expect(screen.getByTestId("listing-card-tier-word").className).toContain(
      "text-tier-featured-ink",
    );
    unmount();
    render(<ListingCard listing={{ ...BASE, ...levelled("top"), levelRow: null }} />);
    const unnamed = screen.getByTestId("listing-card");
    expect(unnamed.className.split(" ")).toContain("bg-tier-premium");
    expect(unnamed).toHaveAttribute("data-tier", "lvl-top");
    expect(screen.queryByTestId("listing-card-tier")).toBeNull();
    expect(screen.queryByTestId("listing-card-tier-word")).toBeNull();
  });

  it("LC-2 the invitation fills its cell and holds its sentence to a card's height", () => {
    render(
      <InviteCard
        invite={{
          placeId: "p",
          placeName: "Bole",
          categoryId: null,
          categoryName: null,
          placeCount: 0,
        }}
        at="alone"
      />,
    );
    const invite = screen.getByTestId("feed-invite");
    expect(invite.className).toContain("h-full");
    expect((invite.firstElementChild as HTMLElement).className).toContain("overflow-hidden");
    expect((invite.firstElementChild as HTMLElement).className).not.toContain("min-h-56");
    const text = screen.getByTestId("feed-invite-text");
    expect(text.className).toContain("line-clamp-6");
    expect(text.className).toContain("@min-[11rem]:line-clamp-4");
    // The whole sentence stays in the page.
    expect(text).toHaveTextContent("feed.invite.place");
  });

  it("LC-10 the invitation's Sage look: warm fill, gold border, the card's lift, a raised disc, a raised button (S4 §9)", () => {
    render(
      <InviteCard
        invite={{
          placeId: null,
          placeName: null,
          categoryId: null,
          categoryName: null,
          placeCount: 0,
        }}
        at="alone"
      />,
    );
    const surface = screen.getByTestId("feed-invite-surface").className.split(" ");
    for (const c of ["bg-invite", "border-2", "border-gold", "rounded-card", "shadow-card"])
      expect(surface).toContain(c);
    expect(surface.filter((c) => c.startsWith("bg-"))).toEqual(["bg-invite"]);
    const star = screen.getByTestId("feed-invite-star").className.split(" ");
    for (const c of [
      "size-6",
      "md:@max-[11rem]:size-9",
      "@min-[11rem]:size-[46px]",
      "shadow-badge",
    ])
      expect(star).toContain(c);
    const text = screen.getByTestId("feed-invite-text").className.split(" ");
    for (const c of [
      "text-xs",
      "md:@max-[11rem]:text-[13px]",
      "@min-[11rem]:text-lg",
      "@min-[11rem]:font-display",
      "@min-[11rem]:font-bold",
    ])
      expect(text).toContain(c);
    const button = screen.getByTestId("feed-invite-post").className.split(" ");
    for (const c of ["rounded-sm", "md:rounded-md", "font-semibold", "shadow-button"])
      expect(button).toContain(c);
    expect(button).not.toContain("rounded-md");
  });

  it("LC-3 the seller's cover photo is drawn when the feed gives its link, else the category's picture (INC-606)", () => {
    const link = "https://stub.supabase.co/storage/v1/object/sign/listing-photos/card.webp?token=t";
    const { unmount } = render(
      <ListingCard listing={{ ...BASE, coverPhotoId: "p1" }} photoUrl={link} />,
    );
    const picture = screen.getByTestId("listing-card-picture");
    expect(picture.querySelector("img")).toHaveAttribute("src", link);
    unmount();

    render(<ListingCard listing={BASE} />);
    expect(screen.getByTestId("listing-card-picture").querySelector("img")).toBeNull();
  });

  it("LC-4 a live ad's ribbon: Reserved before Price reduced; the old price struck through before the price (D173, D180)", () => {
    const { unmount } = render(
      <ListingCard listing={{ ...BASE, reserved: true, priceWas: 1800000, photosSoon: true }} />,
    );
    const picture = screen.getByTestId("listing-card-picture");
    expect(picture.contains(screen.getByTestId("listing-ribbon"))).toBe(true);
    expect(screen.getByTestId("listing-ribbon-text")).toHaveTextContent("feed.reserved");
    // One band only: the photos-soon band gives way to the ribbon.
    expect(screen.queryByTestId("listing-photos-soon-ribbon")).toBeNull();
    const was = screen.getByTestId("listing-card-price-was");
    expect(was.querySelector("s")).toHaveAttribute("aria-hidden", "true");
    expect(was.querySelector("s")!.textContent).not.toBe("");
    expect(was.querySelector(".sr-only")).toHaveTextContent("feed.priceWas");
    const price = screen.getByTestId("listing-card-price");
    expect(was.parentElement).toBe(price.parentElement);
    expect(was.compareDocumentPosition(price) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    unmount();

    const second = render(<ListingCard listing={{ ...BASE, priceWas: 1800000 }} />);
    expect(screen.getByTestId("listing-ribbon-text")).toHaveTextContent("feed.priceReduced");
    second.unmount();

    render(<ListingCard listing={BASE} />);
    expect(screen.queryByTestId("listing-ribbon")).toBeNull();
    expect(screen.queryByTestId("listing-card-price-was")).toBeNull();
  });

  it("LC-5 a sold ad's ribbon is its word only, with no old price (D175 1, D180)", () => {
    for (const [word, key] of [
      ["sold", "feed.ribbon.sold"],
      ["rented", "feed.ribbon.rented"],
      ["filled", "feed.ribbon.filled"],
    ] as const) {
      const { unmount } = render(
        <ListingCard listing={{ ...BASE, soldWord: word, reserved: true, priceWas: 1800000 }} />,
      );
      expect(screen.getAllByTestId("listing-ribbon")).toHaveLength(1);
      expect(screen.getByTestId("listing-ribbon-text")).toHaveTextContent(key);
      expect(screen.queryByTestId("listing-card-price-was")).toBeNull();
      unmount();
    }
  });
});

describe("ListingPicture — ribbon colour", () => {
  it("D197 the photos-soon band takes the picture's palette like the status ribbons (S4: pearl unless the card names gold or sage)", () => {
    const pearl = render(<ListingPicture photoUrl={null} categoryUrl={null} photosSoon={true} />);
    const ribbon = screen.getByTestId("listing-photos-soon-ribbon");
    expect(ribbon).toHaveAttribute("data-ribbon", "pearl");
    expect((ribbon.firstElementChild as HTMLElement).className).toBe(RIBBON_BAND_CLASS);
    expect(ribbon.getAttribute("style")).toContain("--rb-ink: var(--ribbon-pearl-ink)");
    pearl.unmount();

    render(<ListingPicture photoUrl={null} categoryUrl={null} photosSoon={true} palette="sage" />);
    expect(screen.getByTestId("listing-photos-soon-ribbon")).toHaveAttribute("data-ribbon", "sage");
    expect(screen.getByTestId("listing-ribbon-ends")).toHaveAttribute("data-ribbon", "sage");
  });

  it("RBN-6 the photo and band stay inside the box's corners; the caps sit outside the clip, on a copy of the drawn frame", () => {
    const { unmount } = render(
      <ListingPicture
        photoUrl={null}
        categoryUrl="/c.webp"
        ribbon="Sold"
        palette="gold"
        boxTestId="box"
        imgTestId="img"
        rounded="rounded-t-card"
      />,
    );
    const box = screen.getByTestId("box");
    expect(box.className).not.toContain("overflow-hidden");
    expect(box.className).toContain("rounded-t-card");
    const frame = screen.getByTestId("img-frame");
    const clip = frame.parentElement as HTMLElement;
    expect(clip.className).toContain("overflow-hidden");
    expect(clip.className).toContain("rounded-[inherit]");
    // The band's own clip box is the frame (PW-141 reads it as the ribbon's parent).
    expect(screen.getByTestId("listing-ribbon").parentElement).toBe(frame);
    const ends = screen.getByTestId("listing-ribbon-ends");
    expect(clip.contains(ends)).toBe(false);
    expect(box.contains(ends)).toBe(true);
    expect((ends.parentElement as HTMLElement).getAttribute("style")).toBe(
      frame.getAttribute("style"),
    );
    expect(ends.querySelectorAll(".ribbon-cap-end, .ribbon-cap-foot")).toHaveLength(2);
    unmount();

    render(<ListingPicture photoUrl={null} categoryUrl={null} />);
    expect(screen.queryByTestId("listing-ribbon-ends")).toBeNull();
  });

  /**
   * INC-670 — ONE RIBBON: the photos-soon band and a status ribbon are the same
   * element, class for class and style for style (height, weight, tracking,
   * colour, shadow), so none reads thinner than another.
   */
  it("LC-6 the photos-soon band and a status ribbon share one class set and one text style (INC-670)", () => {
    const soon = render(<ListingPicture photoUrl={null} categoryUrl={null} photosSoon={true} />);
    const soonBand = screen.getByTestId("listing-photos-soon-ribbon")
      .firstElementChild as HTMLElement;
    const soonText = screen.getByTestId("listing-photos-soon-text");
    const soonShape = {
      wrapper: screen.getByTestId("listing-photos-soon-ribbon").className,
      band: soonBand.className,
      bandStyle: soonBand.getAttribute("style"),
      text: soonText.className,
      textStyle: soonText.getAttribute("style"),
    };
    soon.unmount();

    render(<ListingPicture photoUrl={null} categoryUrl={null} photosSoon={true} ribbon="Sold" />);
    const statusBand = screen.getByTestId("listing-ribbon").firstElementChild as HTMLElement;
    const statusText = screen.getByTestId("listing-ribbon-text");
    expect(soonShape).toEqual({
      wrapper: screen.getByTestId("listing-ribbon").className,
      band: statusBand.className,
      bandStyle: statusBand.getAttribute("style"),
      text: statusText.className,
      textStyle: statusText.getAttribute("style"),
    });
    expect(soonShape.band).toBe(RIBBON_BAND_CLASS);
    expect(soonShape.textStyle).toContain("clamp(9px, 5cqw, 20px)");
    // One band only (D180): the status word took the band's corner.
    expect(screen.queryByTestId("listing-photos-soon-ribbon")).toBeNull();
  });

  it("LC-7 with no place chosen the invitation names no place and its link carries none (D215)", () => {
    const base = { placeId: null, placeName: null, categoryId: null, categoryName: null };
    const cases = [
      { invite: { ...base, placeCount: 0 }, key: "feed.invite.none", href: "/post" },
      { invite: { ...base, placeCount: 2 }, key: "feed.invite.noneMore", href: "/post" },
      {
        invite: { ...base, categoryId: "c1", categoryName: "Phones", placeCount: 0 },
        key: "feed.invite.noneCategory",
        href: "/post?category=c1",
      },
      {
        invite: { ...base, categoryId: "c1", categoryName: "Phones", placeCount: 2 },
        key: "feed.invite.noneCategoryMore",
        href: "/post?category=c1",
      },
    ];
    for (const { invite, key, href } of cases) {
      const { unmount } = render(<InviteCard invite={invite} at="end" />);
      expect(screen.getByTestId("feed-invite-text")).toHaveTextContent(key);
      const link = screen.getByTestId("feed-invite-post");
      expect(link.getAttribute("href")).toBe(href);
      expect(link.getAttribute("href")).not.toContain("place=");
      expect(screen.getByTestId("feed-invite")).toHaveAttribute("data-at", "end");
      expect(screen.getByTestId("feed-invite")).not.toHaveAttribute("data-place");
      unmount();
    }
  });
});
