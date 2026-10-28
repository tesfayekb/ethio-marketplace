import { describe, expect, it } from "vitest";
import { adPageView, type PublicListingDoc } from "./public-listing";

function document(): PublicListingDoc {
  return {
    public_id: "abcdefghjk",
    title: "Ad",
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
      unit: "piece",
      unit_text: null,
      unit_label: { en: "piece", am: "ቁራጭ" },
      was: null,
      drop_at: null,
    },
    category: {
      id: "leaf",
      slug: "leaf",
      name_en: "Leaf",
      name_am: null,
      capabilities: [],
      illustration_url: null,
      deal: { basis: [], size: [], quantity: [], terms: [] },
      path: [],
    },
    attributes: {},
    definitions: [],
    photos: [],
    cover_photo_id: null,
    places: {
      location_id: null,
      coverage: [],
      list: [],
      pin: { lat: 8.99, lng: 38.76, precision: "approx", zoom: 14 },
      directions: null,
      street_address: null,
    },
    seller: { alias: "seller", business_name: null, previous_alias: null, member_since: null },
    contact_channels: [],
    counts: { views: 0, shares: 0, saves: 0 },
    viewer: { owner: false, saved: false },
  };
}

describe("ad page view mapping", () => {
  it("AV-1 price basis uses other text, Amharic label, English fallback or null", () => {
    const doc = document();
    doc.price.unit = "other";
    doc.price.unit_text = "basket";
    expect(adPageView(doc, "am").basisLabel).toBe("basket");
    doc.price.unit = "piece";
    expect(adPageView(doc, "am").basisLabel).toBe("ቁራጭ");
    expect(adPageView(doc, "en").basisLabel).toBe("piece");
    doc.price.unit_label = { en: "piece", am: "" };
    expect(adPageView(doc, "am").basisLabel).toBe("piece");
    doc.price.unit_label = null;
    expect(adPageView(doc, "am").basisLabel).toBeNull();
  });
  it("AV-1b a third language with no label of its own reads the English (catalogText)", () => {
    const doc = document();
    doc.price.unit = "piece";
    expect(adPageView(doc, "om").basisLabel).toBe("piece");
  });
  it("AV-2 contact preferences carry shown channel names and no values", () => {
    const doc = document();
    doc.contact_channels = ["phone", "telegram"];
    expect(adPageView(doc, "en").contactPref).toEqual({
      phone: { show: true },
      telegram: { show: true },
    });
    doc.contact_channels = [];
    expect(adPageView(doc, "en").contactPref).toEqual({});
  });
  it("AV-3 sold outranks reserved and reduced; plain has no ribbon", () => {
    const doc = document();
    expect(adPageView(doc, "en").ribbon).toBeNull();
    doc.price.was = 120;
    expect(adPageView(doc, "en").ribbon).toBe("feed.priceReduced");
    doc.reserved = true;
    expect(adPageView(doc, "en").ribbon).toBe("feed.reserved");
    doc.sold_word = "sold";
    expect(adPageView(doc, "en").ribbon).toBe("feed.ribbon.sold");
  });
  it("AV-4 embedded single and multiple choices retain their definition and option labels", () => {
    const doc = document();
    doc.attributes = { fuel: "petrol", features: ["aircon", "camera"] };
    doc.definitions = [
      {
        attribute_id: "fuel-id",
        attr_key: "fuel",
        attr_type: "single_select",
        name_en: "Fuel",
        name_am: "ነዳጅ",
        options: [{ value: "petrol", label_en: "Petrol", label_am: "ቤንዚን" }],
      },
      {
        attribute_id: "features-id",
        attr_key: "features",
        attr_type: "multi_select",
        name_en: "Features",
        name_am: "ባህሪያት",
        options: [
          { value: "aircon", label_en: "Air conditioning", label_am: "ማቀዝቀዣ" },
          { value: "camera", label_en: "Camera", label_am: "ካሜራ" },
        ],
      },
    ];
    const view = adPageView(doc, "am");
    expect(
      view.definitions.map(({ attrType, nameEn, nameAm }) => ({ attrType, nameEn, nameAm })),
    ).toEqual([
      { attrType: "single_select", nameEn: "Fuel", nameAm: "ነዳጅ" },
      { attrType: "multi_select", nameEn: "Features", nameAm: "ባህሪያት" },
    ]);
    expect(
      view.attributeOptions["fuel"]?.map(({ value, labelEn, labelAm }) => ({
        value,
        labelEn,
        labelAm,
      })),
    ).toEqual([{ value: "petrol", labelEn: "Petrol", labelAm: "ቤንዚን" }]);
    expect(
      view.attributeOptions["features"]?.map(({ value, labelEn, labelAm }) => ({
        value,
        labelEn,
        labelAm,
      })),
    ).toEqual([
      { value: "aircon", labelEn: "Air conditioning", labelAm: "ማቀዝቀዣ" },
      { value: "camera", labelEn: "Camera", labelAm: "ካሜራ" },
    ]);
    expect(view.attributes).toEqual({ fuel: "petrol", features: ["aircon", "camera"] });
  });
  it("AV-5 a null shown pin maps to no pin and leaves the rest unchanged", () => {
    const doc = document();
    const before = adPageView(doc, "en");
    doc.places.pin = null;
    expect(adPageView(doc, "en")).toEqual({
      ...before,
      pin: null,
      pinZoom: null,
    });
  });
  it("AV-6 a number definition without answered options keeps an empty list under its key", () => {
    const doc = document();
    doc.attributes = { mileage: 12000 };
    doc.definitions = [
      {
        attribute_id: "mileage-id",
        attr_key: "mileage",
        attr_type: "number",
        name_en: "Mileage",
        name_am: null,
      },
    ];
    expect(adPageView(doc, "en").attributeOptions).toEqual({ mileage: [] });
  });
});

it("AV-7 the buyer's mapping says buyer and carries no value", () => {
  const doc = document();
  doc.contact_channels = ["phone", "telegram"];
  const view = adPageView(doc, "en");
  expect(view.actor).toBe("buyer");
  expect(Object.values(view.contactPref)).toEqual([{ show: true }, { show: true }]);
});

it("AV-9 the coverage places' names travel into the view in the document's order (INC-940)", () => {
  const doc = document();
  doc.places.coverage = ["b", "a"];
  doc.places.list = [
    {
      id: "b",
      name_en: "Bole",
      name_am: null,
      level: "subcity",
      slug: "bole",
      country_code: "ET",
      position: 0,
      map_visible: true,
    },
    {
      id: "a",
      name_en: "Addis Ababa",
      name_am: null,
      level: "city",
      slug: "addis-ababa",
      country_code: "ET",
      position: 1,
      map_visible: true,
    },
  ];
  expect(adPageView(doc, "en").placeList).toEqual([
    { id: "b", nameEn: "Bole" },
    { id: "a", nameEn: "Addis Ababa" },
  ]);
});

it("AV-10 a place's path travels into the view, country first (INC-949)", () => {
  const doc = document();
  doc.places.list = [
    {
      id: "b",
      name_en: "Bole",
      name_am: null,
      level: "sub_city",
      slug: "bole",
      country_code: "ET",
      position: 1,
      map_visible: true,
      path: [
        { id: "et", name_en: "Ethiopia", name_am: null, level: "country", slug: "et" },
        { id: "a", name_en: "Addis Ababa", name_am: null, level: "city", slug: "addis-ababa" },
      ],
    },
  ];
  expect(adPageView(doc, "en").placeList).toEqual([
    {
      id: "b",
      nameEn: "Bole",
      path: [
        { id: "et", nameEn: "Ethiopia" },
        { id: "a", nameEn: "Addis Ababa" },
      ],
    },
  ]);
});

it("AV-8 a definition's fact_rank and is_filterable travel into the view", () => {
  const doc = document();
  doc.definitions = [
    { attr_key: "distance", attr_type: "number", fact_rank: 2, is_filterable: true },
  ];
  expect(adPageView(doc, "en").definitions[0]).toMatchObject({ factRank: 2, isFilterable: true });
  doc.definitions = [{ attr_key: "distance", attr_type: "number" }];
  expect(adPageView(doc, "en").definitions[0]).toMatchObject({
    factRank: null,
    isFilterable: false,
  });
});
