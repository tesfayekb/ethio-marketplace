import { describe, expect, it } from "vitest";

import type { CatalogTokens } from "@/i18n";
import { en } from "@/i18n/locales/en";
import type { MessageKey } from "@/i18n";
import { dealLines } from "./deal-lines";
import type { AttrDef } from "./posting-service";

const PLAIN: CatalogTokens = { country: "Ethiopia", categoryPath: () => null };

const t = (key: MessageKey) => (en as Record<string, string>)[key] ?? key;
const def = (attrKey: string, nameEn: string, unit: string | null, attrType = "number") =>
  ({
    attributeId: `id-${attrKey}`,
    attrKey,
    attrType,
    nameEn,
    nameAm: null,
    unit,
    format: null,
  }) as unknown as AttrDef;

const definitions = [
  def("pack_quantity", "Pieces per Pack", "pieces"),
  def("net_weight_g", "Net Weight", "g"),
  def("lease_term", "Lease term", "months"),
  def("payment_plan", "Payment plan", null, "text"),
];
const deal = {
  basis: ["unit_of_sale"],
  size: ["pack_quantity", "net_weight_g"],
  quantity: [],
  terms: ["lease_term", "payment_plan"],
};
const entities = { lang: "en", map: {} } as never;
const run = (attributes: Record<string, unknown>, unit: string | null) =>
  dealLines({
    deal,
    attributes,
    definitions,
    attributeOptions: {},
    unit,
    language: "en",
    entities,
    tokens: PLAIN,
    t,
  });

describe("bundle 4 step 10 — the deal lines under the price", () => {
  it("the size is one line, named by the unit", () => {
    expect(run({ pack_quantity: 12, net_weight_g: 500 }, "pack").size).toBe(
      "One pack: 12 pieces · 500 g",
    );
  });
  it("the size with no unit prints the values alone", () => {
    expect(run({ net_weight_g: 500 }, null).size).toBe("500 g");
  });
  it("no size answer prints no size line", () => {
    expect(run({}, "pack").size).toBe(null);
  });
  it("each term is label: value, in display order", () => {
    expect(run({ payment_plan: "monthly", lease_term: 12 }, null).terms).toEqual([
      "Lease term: 12 months",
      "Payment plan: monthly",
    ]);
  });
  it("no deal lists print nothing", () => {
    expect(
      dealLines({
        deal: null,
        attributes: { lease_term: 12 },
        definitions,
        attributeOptions: {},
        unit: null,
        language: "en",
        entities,
    tokens: PLAIN,
        t,
      }),
    ).toEqual({ size: null, terms: [] });
  });
});

describe("turn 5 item 2 — a choice is never printed as a raw token", () => {
  const choice = def("deposit_terms", "Deposit", null, "single_select");
  const call = (options: Record<string, { value: string; labelEn: string }[]>) =>
    dealLines({
      deal: { basis: [], size: [], quantity: [], terms: ["deposit_terms"] },
      attributes: { deposit_terms: "two_months" },
      definitions: [choice],
      attributeOptions: options as never,
      unit: null,
      language: "en",
      entities,
    tokens: PLAIN,
      t,
    }).terms;
  it("a choice whose label is not held prints nothing", () => {
    expect(call({})).toEqual([]);
  });
  it("a choice whose label is held prints the label", () => {
    expect(call({ deposit_terms: [{ value: "two_months", labelEn: "Two months" }] })).toEqual([
      "Deposit: Two months",
    ]);
  });
});
