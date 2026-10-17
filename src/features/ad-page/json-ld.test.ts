import { describe, expect, it } from "vitest";
import { adJsonLd } from "./json-ld";
import type { PublicListingDoc } from "./public-listing";

const doc = (): PublicListingDoc => ({
  public_id: "2345678923",
  title: "Scratch",
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
    unit: null,
    unit_text: null,
    unit_label: null,
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
  seller: { alias: null, business_name: null, previous_alias: null, member_since: null },
  contact_channels: [],
  counts: { views: 0, shares: 0 },
  viewer: { owner: false },
});
const url = "https://ethio-market-dawn.lovable.app/l/scratch-2345678923";
const read = (value: PublicListingDoc, image: string | null = null) =>
  JSON.parse(adJsonLd(value, url, image));

describe("ad structured data", () => {
  it("JL-1 fixed price is an in-stock Offer with a string amount", () => {
    expect(read(doc(), `${url}/photo.jpg`)).toMatchObject({
      "@type": "Product",
      image: [`${url}/photo.jpg`],
      offers: {
        "@type": "Offer",
        url,
        price: "100",
        priceCurrency: "ETB",
        availability: "https://schema.org/InStock",
      },
    });
  });
  it("JL-2 sold means SoldOut", () => {
    expect(read({ ...doc(), is_sold: true }).offers.availability).toBe(
      "https://schema.org/SoldOut",
    );
  });
  it("JL-3 contact and per-period prices have no Offer", () => {
    for (const mode of ["contact", "commission", "free"]) {
      const value = doc();
      value.price.mode = mode;
      expect(read(value)).not.toHaveProperty("offers");
    }
    const value = doc();
    value.price.period = "month";
    expect(read(value)).not.toHaveProperty("offers");
    value.price.period = "once";
    value.price.amount = null;
    expect(read(value)).not.toHaveProperty("offers");
    value.price.amount = 100;
    value.price.currency = null;
    expect(read(value)).not.toHaveProperty("offers");
  });
  it("JL-4 a title cannot close the script", () => {
    const value = doc();
    value.title = "</script>";
    const json = adJsonLd(value, url, null);
    expect(json).not.toContain("<");
    expect(json).toContain("\\u003c/script>");
    expect(JSON.parse(json).name).toBe("</script>");
  });
  it("JL-5 no image means no image key", () => {
    expect(read(doc())).not.toHaveProperty("image");
  });
});
