import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Bundle 7 F1 (INC-459) — every changed list reader joins its pages in order.
 * The fake data API answers like PostgREST: ordered by the key, after the last
 * key, cut at the limit. A page size of 2 forces three pages from five rows.
 */
const rows = vi.hoisted(() => ({ current: [] as Record<string, unknown>[], key: "id" }));
const calls = vi.hoisted(() => ({ count: 0 }));

vi.mock("@/integrations/supabase/client", () => {
  function builder() {
    let after: string | null = null;
    let limit = 1000;
    const chain = {
      order: () => chain,
      limit: (n: number) => {
        limit = n;
        return chain;
      },
      gt: (_column: string, value: string) => {
        after = value;
        return chain;
      },
      then: (resolve: (value: unknown) => unknown) => {
        calls.count += 1;
        const key = rows.key;
        const sorted = [...rows.current].sort((a, b) =>
          String(a[key]).localeCompare(String(b[key])),
        );
        const page = sorted
          .filter((row) => after === null || String(row[key]) > after)
          .slice(0, limit);
        return Promise.resolve(resolve({ data: page, error: null }));
      },
    };
    return chain;
  }
  return { supabase: { rpc: () => builder(), from: () => ({ select: () => builder() }) } };
});

import { listLocations } from "@/features/admin-locations/locations-service";
import { listCategoriesPaged } from "@/features/admin-categories/categories-service";
import {
  listAttributeCategoriesPaged,
  listCategoryLinks,
  listEffectiveCategoryLinks,
} from "@/features/admin-attributes/attributes-service";

beforeEach(() => {
  calls.count = 0;
});

function location(id: string, country: string, level: string, order: number, name: string) {
  return {
    id,
    parent_id: null,
    level,
    country_code: country,
    region_id: null,
    city_id: null,
    slug: id,
    name_en: name,
    iso_3166_2: null,
    aliases: [],
    display_order: order,
    center_lat: null,
    center_lng: null,
    is_active: true,
    source: "admin",
    path: name,
    child_count: 0,
    listing_count: 0,
    coverage_count: 0,
    profile_default_count: 0,
  };
}

function link(linkId: string, order: number, name: string, inherited = false) {
  return {
    link_id: linkId,
    attribute_id: `a-${linkId}`,
    attr_key: `k-${linkId}`,
    name_en: name,
    attr_type: "text",
    options: [],
    is_required: false,
    is_filterable: false,
    display_order: order,
    card_rank: null,
    depends_on_key: null,
    allowed_options: null,
    default_value: null,
    visible_when: null,
    inherited,
    origin_id: "c",
    origin_slug: "c",
    origin_name_en: "C",
  };
}

describe("list readers join every page (INC-459)", () => {
  it("locations: five rows over three pages, sorted back to the door's order", async () => {
    rows.key = "id";
    rows.current = [
      location("1", "ET", "city", 0, "Adama"),
      location("2", "ER", "country", 0, "Eritrea"),
      location("3", "ET", "country", 0, "Ethiopia"),
      location("4", "ET", "region", 1, "Oromia"),
      location("5", "ET", "region", 0, "Amhara"),
    ];
    const out = await listLocations("", 2);
    expect(calls.count).toBe(3);
    expect(out.map((row) => row.nameEn)).toEqual([
      "Eritrea",
      "Ethiopia",
      "Amhara",
      "Oromia",
      "Adama",
    ]);
  });

  it("categories: every page joined", async () => {
    rows.key = "id";
    rows.current = ["e", "a", "d", "b", "c"].map((id) => ({ id, slug: id, name_en: id }));
    const out = await listCategoriesPaged(2);
    expect(calls.count).toBe(3);
    expect(out.map((row) => row.id)).toEqual(["a", "b", "c", "d", "e"]);
  });

  it("category links: joined, then display order and name", async () => {
    rows.key = "link_id";
    rows.current = [
      link("1", 2, "Year"),
      link("2", 1, "Model"),
      link("3", 1, "Make"),
      link("4", 0, "Fuel"),
      link("5", 3, "Colour"),
    ];
    const out = await listCategoryLinks("c", 2);
    expect(calls.count).toBe(3);
    expect(out.map((row) => row.nameEn)).toEqual(["Fuel", "Make", "Model", "Year", "Colour"]);
  });

  it("effective links: own before inherited, then display order", async () => {
    rows.key = "link_id";
    rows.current = [
      link("1", 0, "Inherited A", true),
      link("2", 1, "Own B"),
      link("3", 0, "Own A"),
      link("4", 1, "Inherited B", true),
      link("5", 2, "Own C"),
    ];
    const out = await listEffectiveCategoryLinks("c", 2);
    expect(calls.count).toBe(3);
    expect(out.map((row) => row.nameEn)).toEqual([
      "Own A",
      "Own B",
      "Own C",
      "Inherited A",
      "Inherited B",
    ]);
  });

  it("attribute categories: joined, then category name and slug", async () => {
    rows.key = "link_id";
    rows.current = [
      {
        link_id: "1",
        attribute_id: "x",
        category_id: "c1",
        category_slug: "s-b",
        category_name_en: "Cars",
        is_active: true,
      },
      {
        link_id: "2",
        attribute_id: "x",
        category_id: "c2",
        category_slug: "s",
        category_name_en: "Bikes",
        is_active: true,
      },
      {
        link_id: "3",
        attribute_id: "x",
        category_id: "c3",
        category_slug: "s-a",
        category_name_en: "Cars",
        is_active: true,
      },
      {
        link_id: "4",
        attribute_id: "x",
        category_id: "c4",
        category_slug: "s",
        category_name_en: "Vans",
        is_active: true,
      },
      {
        link_id: "5",
        attribute_id: "x",
        category_id: "c5",
        category_slug: "s",
        category_name_en: "Boats",
        is_active: true,
      },
    ];
    const out = await listAttributeCategoriesPaged(2);
    expect(calls.count).toBe(3);
    expect(out.map((row) => row.categoryId)).toEqual(["c2", "c5", "c3", "c1", "c4"]);
  });
  it("names are ordered by the one collator pinned to en, not by code point (H5)", async () => {
    rows.key = "link_id";
    rows.current = [
      {
        link_id: "1",
        attribute_id: "x",
        category_id: "z",
        category_slug: "s",
        category_name_en: "Zebra",
        is_active: true,
      },
      {
        link_id: "2",
        attribute_id: "x",
        category_id: "e2",
        category_slug: "s",
        category_name_en: "école",
        is_active: true,
      },
      {
        link_id: "3",
        attribute_id: "x",
        category_id: "e1",
        category_slug: "s",
        category_name_en: "Ecole",
        is_active: true,
      },
    ];
    const out = await listAttributeCategoriesPaged(2);
    expect(out.map((row) => row.categoryId)).toEqual(["e1", "e2", "z"]);
  });
});
