import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Bundle 3 Part D — the place step's region picker lists A to Z by the shown
 * name in the reader's language, never in the stored order. The tree's stored
 * order (Tigray, Amhara, Oromia) disagrees with both the English and the
 * Amharic alphabetical orders.
 */

const state = vi.hoisted(() => ({ language: "en", names: {} as Record<string, string> }));

vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, entities: {}, language: state.language }),
}));
vi.mock("@/i18n/entity", () => ({
  entityName: (_type: string, row: { id: string; nameEn: string }) =>
    state.names[row.id] ?? row.nameEn,
}));

const { CountryBox } = await import("./step-where");

const node = (id: string, parentId: string | null, level: string, nameEn: string) => ({
  id,
  parentId,
  level,
  slug: id,
  nameEn,
  centerLat: null,
  centerLng: null,
  isoCode: null,
});

// Stored order: Tigray, Amhara, Oromia.
const nodes = [
  node("et", null, "country", "Ethiopia"),
  node("r-ti", "et", "region", "Tigray"),
  node("r-am", "et", "region", "Amhara"),
  node("r-or", "et", "region", "Oromia"),
];

function regionNames(): string[] {
  const select = screen.getByTestId("post-where-region") as HTMLSelectElement;
  return Array.from(select.options)
    .slice(1)
    .map((option) => option.textContent ?? "");
}

function draw() {
  const noop = () => undefined;
  render(
    <CountryBox
      primary
      code="ET"
      nodes={nodes as never}
      rows={[{ key: "primary", country: "ET", region: null, city: null, subCity: null }]}
      room={{ city: true, region: true }}
      refused={false}
      market={null}
      itemKey="primary"
      canRemove={false}
      onTick={noop}
      onRegion={noop}
      onRow={noop}
      onCity={noop}
      onRemove={noop}
      onAddCity={noop}
      onAddSubCity={noop}
      onAddRegion={noop}
    />,
  );
}

describe("place step region picker order", () => {
  beforeEach(() => {
    state.names = {};
  });

  it("lists regions A to Z in English", () => {
    state.language = "en";
    draw();
    expect(regionNames()).toEqual(["Amhara", "Oromia", "Tigray"]);
  });

  it("lists regions in Amharic order by the Amharic names", () => {
    state.language = "am";
    state.names = { "r-ti": "ትግራይ", "r-am": "አማራ", "r-or": "ኦሮሚያ" };
    draw();
    // ት (t) before አ (glottal) before ኦ in the Ethiopic block's collation.
    expect(regionNames()).toEqual(
      ["ትግራይ", "አማራ", "ኦሮሚያ"].sort(new Intl.Collator("am").compare),
    );
    expect(regionNames()).not.toEqual(["ትግራይ", "አማራ", "ኦሮሚያ"].slice().reverse());
  });
});
