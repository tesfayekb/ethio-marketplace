import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { en } from "@/i18n/locales/en";
import { ownValue } from "@/lib/own-key";
import { cardLookOf } from "@/components/marketplace/card-tier";
import { TierFlag, TierTag } from "@/components/marketplace/tier-flag";
import { shapePostingSchema } from "../posting-service";
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
      photos.map((photo) => [photo.id, { card: "https://cdn.example/scratch.jpg" }]),
    ),
}));
vi.mock("@tanstack/react-router", () => ({
  Link: ({ to, children, ...rest }: Record<string, unknown>) => (
    <a href={String(to)} {...rest}>
      {children as never}
    </a>
  ),
}));
vi.mock("../map/map-preview", () => ({ MapPreview: () => null }));
vi.mock("../map/map-large", () => ({ MapLarge: () => null }));

const definitions =
  shapePostingSchema({
    attributes: [
      { attr_key: "note", attr_type: "text", name_en: "Note", is_key_fact: true, fact_rank: 1 },
    ],
  })?.attributes ?? [];

/** A buyer's page with every box the look reaches: photo, facts, description, map, contact. */
const BUYER_PAGE: ListingDetailView = {
  tier: null,
  look: null,
  actor: "buyer",
  title: "Scratch ad",
  description: "scratch description",
  priceMode: "fixed",
  priceAmount: 100,
  priceCurrency: "ETB",
  pricePeriod: null,
  priceNegotiable: true,
  attributes: { note: "scratch fact" },
  definitions,
  attributeOptions: {},
  photos: [
    { id: "ldt-photo-1", displayOrder: 0, paths: null, storagePath: null },
    { id: "ldt-photo-2", displayOrder: 1, paths: null, storagePath: null },
  ],
  illustrationUrl: null,
  coverage: [],
  placeList: [{ id: "ldt-place", nameEn: "Scratch place" }],
  country: null,
  contactPref: { phone: { show: true } },
  sellerAlias: "scratch",
  sellerBusinessName: null,
  sellerAdsKey: "scratch",
  pin: { lat: 9.0054, lng: 38.7636, precision: "exact" },
  ribbon: "Reserved",
  contact: {
    viewer: "signedIn",
    signInTo: { to: "/auth", search: { return: "/l/scratch#contact" } },
    state: { kind: "idle" },
    onReveal: () => {},
    onSignInTap: () => {},
    whatsappText: "scratch",
  },
};

/** P-2 (c) c2a — a frame's look under a fixture level key (no level by name); a framed ad is badged. */
type Frame = "standard" | "boost" | "top";
const lookOf = (frame: Frame) => ({ placement: frame, badge: frame !== "standard" });

function buyerPage(frame: Frame | null, extra: Partial<ListingDetailView> = {}) {
  const look = frame === null ? null : lookOf(frame);
  const badge = look === null ? null : cardLookOf(look).badge;
  const flag =
    frame === null || badge === null
      ? null
      : { levelKey: `lvl-${frame}`, name: `Level ${frame}`, look: badge };
  return (
    <ListingDetail
      {...BUYER_PAGE}
      tier={frame === null ? null : `lvl-${frame}`}
      look={look}
      tierFlag={flag === null ? null : <TierFlag {...flag} on="photo" />}
      tierTag={flag === null ? null : <TierTag {...flag} />}
      share={<span />}
      {...extra}
    />
  );
}

const classesOf = (testId: string) =>
  (screen.getByTestId(testId).getAttribute("class") ?? "").split(/\s+/);
const sectionClasses = (id: string) =>
  (document.getElementById(id)?.getAttribute("class") ?? "").split(/\s+/);
const currentTab = () => {
  const tab = screen
    .getAllByTestId("listing-section-nav-item")
    .find((item) => item.getAttribute("aria-current") === "true");
  if (!tab) throw new Error("no current tab");
  return (tab.getAttribute("class") ?? "").split(/\s+/);
};

describe("the ad page by its level's look (Sage S5, spec §12; P-2 (c) c2a)", () => {
  it("LD-25 a free ad and an ad of unknown tier draw the free look: white boxes, green accents, no tier mark", () => {
    for (const frame of ["standard", null] as const) {
      const { unmount } = render(buyerPage(frame));
      const article = screen.getByTestId("listing-detail");
      if (frame === null) expect(article).not.toHaveAttribute("data-tier");
      else expect(article).toHaveAttribute("data-tier", "lvl-standard");
      expect(article.className).toContain("[--card-radius:var(--box-radius)]");
      for (const box of [
        "listing-detail-headline",
        "listing-detail-media",
        "listing-detail-seller",
      ])
        expect(classesOf(box), box).toEqual(expect.arrayContaining(["bg-card", "shadow-card"]));
      expect(classesOf("listing-detail-price")).toContain("text-primary");
      expect(classesOf("listing-places-maps")).toContain("text-primary");
      expect(classesOf("listing-seller-all-ads")).toContain("text-primary");
      expect(classesOf("listing-map-google")).toContain("text-primary");
      expect(classesOf("listing-contact-show")).toEqual(
        expect.arrayContaining([
          "bg-primary",
          "text-primary-foreground",
          "shadow-button",
          "h-12",
          "min-h-12",
          "w-full",
        ]),
      );
      expect(classesOf("listing-contact-show")).not.toContain("h-11");
      expect(classesOf("listing-contact-show")).not.toContain("min-h-11");
      expect(classesOf("price-negotiable-badge")).toContain("bg-success-soft");
      expect(currentTab()).toEqual(
        expect.arrayContaining(["rounded-full", "bg-nav-pill", "shadow-pill", "text-nav-ink"]),
      );
      expect(screen.getByTestId("listing-ribbon")).toHaveAttribute("data-ribbon", "pearl");
      expect(screen.queryByTestId("listing-detail-tier")).toBeNull();
      expect(screen.queryByTestId("listing-detail-tier-tag")).toBeNull();
      unmount();
    }
  });

  it("LD-26 Premium: only the title box tinted, every other box framed, the accents gold, the safety box untouched", () => {
    render(buyerPage("top"));
    expect(screen.getByTestId("listing-detail")).toHaveAttribute("data-tier", "lvl-top");
    expect(classesOf("listing-detail-headline")).toEqual(
      expect.arrayContaining(["bg-tier-premium", "shadow-premium"]),
    );
    expect(classesOf("listing-detail-headline")).not.toContain("bg-card");
    for (const box of ["listing-detail-media", "listing-detail-seller", "listing-section-nav"]) {
      expect(classesOf(box), box).toEqual(expect.arrayContaining(["bg-card", "shadow-premium"]));
      expect(classesOf(box), box).not.toContain("shadow-card");
    }
    for (const id of ["ad-details", "ad-description", "ad-location"])
      expect(sectionClasses(id), id).toEqual(expect.arrayContaining(["bg-card", "shadow-premium"]));
    for (const link of [
      "listing-detail-price",
      "listing-places-maps",
      "listing-seller-all-ads",
      "listing-map-google",
    ]) {
      expect(classesOf(link), link).toContain("text-tier-premium-ink");
      expect(classesOf(link), link).not.toContain("text-primary");
    }
    expect(classesOf("listing-contact-show")).toEqual(
      expect.arrayContaining([
        "bg-gold",
        "text-gold-foreground",
        "shadow-contact-premium",
        "h-12",
        "min-h-12",
        "w-full",
      ]),
    );
    expect(classesOf("listing-contact-show")).not.toContain("bg-primary");
    expect(classesOf("listing-contact-show")).not.toContain("h-11");
    expect(classesOf("listing-contact-show")).not.toContain("min-h-11");
    expect(classesOf("price-negotiable-badge")).toEqual(
      expect.arrayContaining(["bg-tier-premium-chip", "text-tier-premium-ink"]),
    );
    expect(classesOf("listing-key-fact")).toEqual(
      expect.arrayContaining(["bg-card", "rounded-list-row", "border-tier-premium-ring"]),
    );
    expect(classesOf("listing-map-enlarge")).toContain("border-tier-premium-edge");
    expect(currentTab()).toEqual(
      expect.arrayContaining([
        "bg-tier-premium",
        "text-tier-premium-ink",
        "ring-tier-premium-ring",
      ]),
    );
    expect(currentTab()).not.toContain("bg-nav-pill");
    expect(classesOf("listing-safety")).toEqual(
      expect.arrayContaining(["bg-card", "shadow-card", "border-s-gold"]),
    );
    expect(classesOf("listing-safety").some((c) => c.includes("tier"))).toBe(false);
  });

  it("LD-27 Featured: the title box tinted, the other boxes framed, the accents the site green", () => {
    render(buyerPage("boost"));
    expect(classesOf("listing-detail-headline")).toEqual(
      expect.arrayContaining(["bg-tier-featured", "shadow-featured"]),
    );
    for (const box of ["listing-detail-media", "listing-detail-seller", "listing-section-nav"])
      expect(classesOf(box), box).toContain("shadow-featured");
    expect(classesOf("listing-detail-price")).toContain("text-primary");
    expect(classesOf("listing-contact-show")).toContain("bg-primary");
    expect(classesOf("listing-detail-actions")).toContain("border-tier-featured-rule");
    expect(currentTab()).toContain("bg-nav-pill");
    expect(screen.getByTestId("listing-ribbon")).toHaveAttribute("data-ribbon", "sage");
  });

  it("LD-28 a paid ad's tag sits above the title and its flag on the main photo, the ribbon's caps beside the clip", () => {
    render(buyerPage("top"));
    const headline = screen.getByTestId("listing-detail-headline");
    const tag = within(headline).getByTestId("listing-detail-tier-tag");
    expect(headline.firstElementChild).toBe(tag);
    const flag = within(screen.getByTestId("listing-detail-gallery")).getByTestId(
      "listing-detail-tier",
    );
    expect(flag.parentElement).toBe(screen.getByTestId("gallery-flag"));
    expect(screen.getByTestId("listing-ribbon")).toHaveAttribute("data-ribbon", "gold");
    const ends = screen.getByTestId("listing-ribbon-ends");
    expect(ends.closest(".overflow-hidden")).toBeNull();
  });

  it("LD-29 with no photo the flag sits on the picture's corner; the map well is pressed in over the map, silent", () => {
    render(buyerPage("boost", { photos: [] }));
    const picture = screen.getByTestId("listing-detail-nophoto");
    expect(within(picture).getByTestId("listing-detail-tier")).toHaveAttribute(
      "data-tier",
      "lvl-boost",
    );
    const well = screen.getByTestId("listing-map-well");
    expect(well).toHaveAttribute("aria-hidden", "true");
    expect(well.className).toContain("pointer-events-none");
    expect(well.className).toContain("shadow-field");
    expect(well.className).toContain("border-transparent");
    expect(well.parentElement).toBe(screen.getByTestId("listing-detail-map"));
  });

  it("LD-30 the section bar sits on its own radius and its tabs are the band's: no underline", () => {
    render(buyerPage(null));
    expect(classesOf("listing-section-nav")).toContain("[--card-radius:var(--bar-radius)]");
    for (const item of screen.getAllByTestId("listing-section-nav-item")) {
      const classes = (item.getAttribute("class") ?? "").split(/\s+/);
      expect(classes).toEqual(expect.arrayContaining(["min-h-11", "rounded-full"]));
      expect(classes).not.toContain("border-b-2");
    }
  });

  it("LD-31 the seller's and staff's views take the tier look (tint, frames, data-tier) with no flag and no tag (turn T1)", () => {
    for (const actor of ["owner", "staff"] as const)
      for (const [frame, tier] of [
        ["top", "premium"],
        ["boost", "featured"],
      ] as const) {
        const { unmount } = render(
          <ListingDetail
            {...BUYER_PAGE}
            actor={actor}
            contact={undefined}
            tier={`lvl-${frame}`}
            look={lookOf(frame)}
          />,
        );
        const label = `${actor} ${frame}`;
        expect(screen.getByTestId("listing-detail"), label).toHaveAttribute(
          "data-tier",
          `lvl-${frame}`,
        );
        expect(classesOf("listing-detail-headline"), label).toEqual(
          expect.arrayContaining([`bg-tier-${tier}`, `shadow-${tier}`]),
        );
        expect(classesOf("listing-detail-media"), label).toContain(`shadow-${tier}`);
        expect(screen.queryByTestId("listing-detail-tier"), label).toBeNull();
        expect(screen.queryByTestId("listing-detail-tier-tag"), label).toBeNull();
        unmount();
      }
  });
});
