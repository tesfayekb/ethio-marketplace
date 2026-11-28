import { renderPanel as render } from "@/components/ui/dialog-parts-test-render";
import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { en } from "@/i18n/locales/en";
import { am } from "@/i18n/locales/am";
import { ListingDetail, type ListingDetailView } from "./listing-detail";

vi.mock("@/i18n", async (original) => {
  const { am: AM } = await import("@/i18n/locales/am");
  const { ownValue: own } = await import("@/lib/own-key");
  return {
    ...(await original<typeof import("@/i18n")>()),
    useI18n: () => ({
      t: (key: string) => own(AM, key) ?? key,
      language: "am",
      entities: { map: {}, lang: "am" },
    }),
  };
});
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
// LD-18 renders the real PhotoGallery, so this file mocks no gallery.
vi.mock("../map/map-preview", () => ({ MapPreview: () => null }));
vi.mock("../map/map-large", () => ({ MapLarge: () => null }));

const BASE: ListingDetailView = {
  tier: null,
  look: null,
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

/** UF-1 Part 1 (DEC-493) — the ad page in Amharic: each of its own keys draws its am value. */
describe("UF-1 the ad page in Amharic", () => {
  it("UFP-16 the ad page's own words are the Amharic catalogue's, none falling back to English uf:S2.23", () => {
    const { unmount } = render(<ListingDetail {...BASE} counts={null} />);
    expect(screen.getByTestId("listing-detail-counts")).toHaveTextContent(
      am["adPage.counts.unavailable"],
    );
    unmount();
    render(
      <ListingDetail
        {...BASE}
        actor="buyer"
        pin={{ lat: 9.0054, lng: 38.7636, precision: "exact" }}
        save={{
          viewer: "signedIn",
          saved: false,
          count: 0,
          busy: false,
          refusal: "failed",
          signInTo: { to: "/auth", search: { return: "/l/scratch" } },
          onToggle: () => {},
        }}
        contact={{
          viewer: "signedIn",
          signInTo: { to: "/auth", search: { return: "/l/scratch#contact" } },
          state: { kind: "refused", reason: "sellersCapReached" },
          onReveal: () => {},
          onSignInTap: () => {},
          whatsappText: "scratch",
        }}
      />,
    );
    const keys = [
      "adPage.save.failed",
      "adPage.contact.sellersCap",
      "adPage.map.enlarge",
      "adPage.map.google",
      "adPage.section.location",
    ] as const;
    const text = document.body.textContent ?? "";
    for (const key of keys) expect(text).toContain(am[key]);
    for (const key of [...keys, "adPage.counts.unavailable"] as const) {
      if (am[key] !== en[key]) expect(text).not.toContain(en[key]);
    }
  });
});
