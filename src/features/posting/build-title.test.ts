import { describe, expect, it } from "vitest";

import type { CatalogTokens } from "@/i18n";
import type { AttrOption } from "./attribute-options";
import { buildTitle } from "./build-title";
import type { AttrDef } from "./posting-service";

const PLAIN: CatalogTokens = { country: "Ethiopia", categoryPath: () => null };

const def = (
  attrKey: string,
  attrType: string,
  cardRank: number | null,
  extra: Partial<AttrDef> = {},
) =>
  ({
    attributeId: `id-${attrKey}`,
    attrKey,
    attrType,
    nameEn: attrKey,
    nameAm: null,
    unit: null,
    format: null,
    visibleWhen: null,
    cardRank,
    ...extra,
  }) as unknown as AttrDef;

const opt = (value: string, labelEn: string, labelAm: string | null = null) =>
  ({ value, labelEn, labelAm }) as unknown as AttrOption;

const definitions = [
  def("brand", "single_select", 1),
  def("model", "single_select", 2),
  def("storage_gb", "number", 3, { unit: "GB" }),
  def("unit_of_sale", "single_select", 4),
];
const options = {
  brand: [opt("samsung", "Samsung", "ሳምሰንግ")],
  model: [opt("a54", "Galaxy A54")],
  unit_of_sale: [opt("per_pack", "per pack")],
};
const run = (
  answers: Record<string, unknown>,
  extra: Partial<Parameters<typeof buildTitle>[0]> = {},
) =>
  buildTitle({
    definitions,
    answers,
    options,
    language: "en",
    dealKeys: new Set(["unit_of_sale"]),
    tokens: PLAIN,
    yearSuffix: "",
    ...extra,
  });

describe("buildTitle (bundle 4 step 12)", () => {
  it("joins brand, model and storage in card-rank order", () => {
    expect(run({ storage_gb: 128, model: "a54", brand: "samsung" })).toBe(
      "Samsung Galaxy A54 128 GB",
    );
  });

  it("an other answer gives the written text", () => {
    expect(run({ brand: { value: "other", text: "Tecno" }, model: "a54" })).toBe(
      "Tecno Galaxy A54",
    );
  });

  it("skips a hidden row", () => {
    const hidden = [
      def("brand", "single_select", 1),
      def("model", "single_select", 2, { visibleWhen: { key: "brand", in: ["apple"] } }),
    ];
    expect(run({ brand: "samsung", model: "a54" }, { definitions: hidden })).toBe("Samsung");
  });

  it("skips a deal row", () => {
    expect(run({ brand: "samsung", unit_of_sale: "per_pack" })).toBe("Samsung");
  });

  it("stops before passing 70 characters", () => {
    const long = [def("a", "text", 1), def("b", "text", 2), def("c", "text", 3)];
    const part = "x".repeat(30);
    const built = run({ a: part, b: part, c: part }, { definitions: long });
    expect(built).toBe(`${part} ${part}`);
    expect(built.length).toBeLessThanOrEqual(70);
  });

  it("skips yes/no, more than two picks and long text", () => {
    const mixed = [
      def("used", "boolean", 1),
      def("colours", "multi_select", 2),
      def("note", "text", 3),
      def("brand", "single_select", 4),
    ];
    expect(
      run(
        { used: true, colours: ["a", "b", "c"], note: "y".repeat(31), brand: "samsung" },
        { definitions: mixed, options: { ...options, colours: [] } },
      ),
    ).toBe("Samsung");
  });

  it("language am gives Amharic labels", () => {
    expect(run({ brand: "samsung" }, { language: "am" })).toBe("ሳምሰንግ");
  });

  it("an empty result is empty", () => {
    expect(run({})).toBe("");
  });
});

describe("buildTitle (bundle 7 B3)", () => {
  const other = [def("item_name", "text", null, { isRequired: true }), ...definitions];

  it("the seller's own name for the item leads, then the ranked parts", () => {
    expect(run({ item_name: "  Handmade stool ", brand: "samsung" }, { definitions: other })).toBe(
      "Handmade stool Samsung",
    );
  });

  it("a long name uses the whole 70 and is cut at the last whole word", () => {
    const name = `${"word ".repeat(15)}end`;
    const built = run({ item_name: name, brand: "samsung" }, { definitions: other });
    expect(built.length).toBeLessThanOrEqual(70);
    expect(built.length).toBeGreaterThan(30);
    expect(built.endsWith("word")).toBe(true);
  });

  it("a first text that is not required, or ranked, does not lead", () => {
    const loose = [def("item_name", "text", null, { isRequired: false }), ...definitions];
    expect(run({ item_name: "Stool", brand: "samsung" }, { definitions: loose })).toBe("Samsung");
    const ranked = [def("item_name", "text", 9, { isRequired: true }), ...definitions];
    expect(run({ item_name: "Stool", brand: "samsung" }, { definitions: ranked })).toBe(
      "Samsung Stool",
    );
  });

  it("a label holding {country} is left out; one without is kept", () => {
    const withToken = {
      ...options,
      model: [opt("local", "Made in {country}"), opt("a54", "Galaxy A54")],
    };
    expect(run({ brand: "samsung", model: "local" }, { options: withToken })).toBe("Samsung");
    expect(run({ brand: "samsung", model: "a54" }, { options: withToken })).toBe(
      "Samsung Galaxy A54",
    );
  });
});
