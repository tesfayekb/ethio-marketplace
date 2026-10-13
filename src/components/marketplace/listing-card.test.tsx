import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import type { FeedListing } from "@/features/feed/feed-page";

import { InviteCard } from "./invite-card";
import { ListingCard } from "./listing-card";

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
  Link: ({ children, ...props }: { children?: React.ReactNode }) => <a {...props}>{children}</a>,
}));

const BASE: FeedListing = {
  id: "l1",
  title: "Toyota Vitz 2015",
  tier: "regular",
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
  publishedAt: "2026-10-10T08:00:00Z",
  categoryId: "c1",
  locationId: null,
  locationNameEn: "Bole",
  locationNameAm: null,
  step: 1,
};

/**
 * Bundle 11 V2b (the operator, 2026-10-11) — every card on the listings pages
 * is one size: the card fills its cell, its slots sit in the same places, and
 * the invitation fills its cell without growing past a card.
 */
describe("ListingCard and InviteCard — one card shape", () => {
  it("LC-1 the card fills its cell; the tier pill sits on the picture; the place line is kept without a place; the price slot is reserved", () => {
    const { unmount } = render(
      <ListingCard listing={{ ...BASE, tier: "premium", locationNameEn: null }} />,
    );
    const card = screen.getByTestId("listing-card");
    expect(card.className).toContain("h-full");
    const pill = within(card).getByTestId("listing-card-tier");
    expect(pill).toHaveAttribute("data-tier", "premium");
    // On the picture's corner, never in the title's line.
    expect(pill.parentElement!.contains(within(card).getByTestId("listing-card-picture"))).toBe(
      true,
    );
    expect(card.querySelector("h3")!.contains(pill)).toBe(false);
    const place = within(card).getByTestId("listing-card-place");
    expect(place).toBeEmptyDOMElement();
    expect(place.className).toContain("mt-auto");
    const price = within(card).getByTestId("listing-card-price").parentElement!;
    expect(price.className).toContain("min-h-[3.625rem]");
    expect(price.className).toContain("@min-[11rem]:min-h-[2.75rem]");
    unmount();

    render(<ListingCard listing={BASE} />);
    expect(screen.getByTestId("listing-card-place")).toHaveTextContent("Bole");
    expect(screen.queryByTestId("listing-card-tier")).toBeNull();
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
});
