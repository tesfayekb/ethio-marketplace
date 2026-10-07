import { describe, expect, it } from "vitest";

import type { AttrOption } from "./attribute-options";
import type { AttrDef } from "./posting-service";
import { dependencyMap, resetAfterMove, type ScopeInput } from "./reset-scope";

/**
 * Bundle 7 Part A (DEC-144 rule 1) — a changed answer resets only the questions
 * that depend on it. Each case states one clause of the rule on a scratch shape.
 */
function def(attrKey: string, attrType: string, extra: Partial<AttrDef> = {}): AttrDef {
  return {
    attributeId: `id-${attrKey}`,
    attrKey,
    attrType,
    nameEn: attrKey,
    nameAm: null,
    helpTextEn: null,
    helpTextAm: null,
    isRequired: false,
    unit: null,
    minBound: null,
    maxBound: null,
    decimals: null,
    format: null,
    preset: null,
    maxLength: null,
    optionCount: 0,
    allowOther: false,
    allowedOptions: null,
    defaultValue: null,
    visibleWhen: null,
    cardRank: null,
    ...extra,
  } as AttrDef;
}

function opt(value: string, extra: Partial<AttrOption> = {}): AttrOption {
  return {
    value,
    labelEn: value,
    labelAm: null,
    parent: null,
    facts: null,
    allowed: null,
    bounds: null,
    ...extra,
  } as AttrOption;
}

function input(
  definitions: AttrDef[],
  options: Record<string, AttrOption[]>,
  folds: Record<string, string> = {},
): ScopeInput {
  const ownBounds: ScopeInput["ownBounds"] = {};
  for (const entry of definitions) ownBounds[entry.attrKey] = { min: null, max: null };
  return { definitions, options, folds, ownBounds };
}

describe("reset-scope (DEC-144 rule 1)", () => {
  it("(i) an identity change touches no detail that does not depend on it", () => {
    const scope = input(
      [def("idn", "single_select", { cardRank: 1 }), def("n", "number"), def("t", "text")],
      { idn: [opt("a"), opt("b")] },
    );
    const out = resetAfterMove(scope, "idn", { idn: "b", n: 5, t: "own" }, {});
    expect(out.answers).toEqual({ idn: "b", n: 5, t: "own" });
    expect(out.changed).toBe(false);
  });

  it("(ii) a parent's move does not touch a detail that depends on another parent", () => {
    const scope = input(
      [
        def("p1", "single_select"),
        def("c1", "single_select"),
        def("p2", "single_select"),
        def("c2", "single_select"),
      ],
      {
        p1: [opt("x"), opt("y")],
        c1: [opt("x_1", { parent: "x" }), opt("y_1", { parent: "y" })],
        p2: [opt("u"), opt("v")],
        c2: [opt("u_1", { parent: "u" }), opt("v_1", { parent: "v" })],
      },
      { c1: "p1", c2: "p2" },
    );
    const out = resetAfterMove(scope, "p1", { p1: "y", c1: "x_1", p2: "u", c2: "u_1" }, {});
    expect(out.answers).toEqual({ p1: "y", p2: "u", c2: "u_1" });
  });

  it("(iii) a detail that depends only on a condition naming another question is not touched", () => {
    const scope = input(
      [
        def("kind", "single_select"),
        def("fuel", "single_select"),
        def("charge", "text", { visibleWhen: { key: "fuel", in: ["ev"] } }),
      ],
      { kind: [opt("k1"), opt("k2")], fuel: [opt("ev"), opt("gas")] },
    );
    const out = resetAfterMove(scope, "kind", { kind: "k2", fuel: "ev", charge: "fast" }, {});
    expect(out.answers).toEqual({ kind: "k2", fuel: "ev", charge: "fast" });
    expect(dependencyMap(scope)["fuel"]).toEqual(["charge"]);
    expect(dependencyMap(scope)["kind"] ?? []).toEqual([]);
  });

  it("(iv) a prefill the seller left goes with the old choice, to the link default", () => {
    const scope = input(
      [def("model", "single_select"), def("body", "single_select", { defaultValue: "van" })],
      {
        model: [opt("golf", { facts: { body: "hatch" } }), opt("plain")],
        body: [opt("hatch"), opt("van")],
      },
    );
    const out = resetAfterMove(
      scope,
      "model",
      { model: "plain", body: "hatch" },
      { body: "hatch" },
    );
    expect(out.answers).toEqual({ model: "plain", body: "van" });
    expect(out.prefills).toEqual({});
    expect(out.changed).toBe(true);
  });

  it("(v) a prefill the seller changed is kept when it fits and cleared when it does not", () => {
    const scope = input([def("model", "single_select"), def("body", "single_select")], {
      model: [
        opt("golf", { facts: { body: "hatch" } }),
        opt("open"),
        opt("strict", { allowed: { body: ["hatch"] } }),
      ],
      body: [opt("hatch"), opt("sedan")],
    });
    const kept = resetAfterMove(
      scope,
      "model",
      { model: "open", body: "sedan" },
      { body: "hatch" },
    );
    expect(kept.answers["body"]).toBe("sedan");
    const cleared = resetAfterMove(
      scope,
      "model",
      { model: "strict", body: "sedan" },
      { body: "hatch" },
    );
    expect("body" in cleared.answers).toBe(false);
  });

  it("(vi) a year inside the new bounds is kept, outside is cleared", () => {
    const scope = input(
      [def("model", "single_select"), def("year", "number", { format: "year" })],
      {
        model: [
          opt("old", { bounds: { year: { min: 1990 } } }),
          opt("new", { bounds: { year: { min: 2015 } } }),
        ],
      },
    );
    expect(resetAfterMove(scope, "model", { model: "new", year: 2018 }, {}).answers["year"]).toBe(
      2018,
    );
    const out = resetAfterMove(scope, "model", { model: "new", year: 2000 }, {});
    expect("year" in out.answers).toBe(false);
    expect(out.changed).toBe(true);
  });

  it("(vii) a chain: brand moves, the model goes, what it filled goes, the colour stays", () => {
    const scope = input(
      [
        def("brand", "single_select"),
        def("model", "single_select"),
        def("ram", "single_select"),
        def("colour", "single_select"),
      ],
      {
        brand: [opt("b1"), opt("b2")],
        model: [opt("m1", { parent: "b1", facts: { ram: "r8" } }), opt("m2", { parent: "b2" })],
        ram: [opt("r8"), opt("r16")],
        colour: [opt("red"), opt("blue")],
      },
      { model: "brand" },
    );
    const out = resetAfterMove(
      scope,
      "brand",
      { brand: "b2", model: "m1", ram: "r8", colour: "red" },
      { ram: "r8" },
    );
    expect(out.answers).toEqual({ brand: "b2", colour: "red" });
    expect(out.prefills).toEqual({});
  });

  it("(viii) a multi-select keeps only the picks that fit", () => {
    const scope = input([def("type", "single_select"), def("dish", "multi_select")], {
      type: [opt("t1"), opt("t2", { allowed: { dish: ["a", "b"] } })],
      dish: [opt("a"), opt("b"), opt("c")],
    });
    const out = resetAfterMove(scope, "type", { type: "t2", dish: ["a", "c"] }, {});
    expect(out.answers["dish"]).toEqual(["a"]);
  });

  it("(ix) a first answer of the identity touches nothing above it", () => {
    const scope = input(
      [def("t", "text"), def("n", "number"), def("idn", "single_select", { cardRank: 1 })],
      { idn: [opt("a"), opt("b")] },
    );
    const out = resetAfterMove(scope, "idn", { t: "own", n: 4, idn: "a" }, {});
    expect(out.answers).toEqual({ t: "own", n: 4, idn: "a" });
    expect(out.changed).toBe(false);
  });

  it("a new option's fact prefills its dependent; a detail the move hides stores nothing", () => {
    const scope = input(
      [
        def("model", "single_select"),
        def("doors", "number"),
        def("bed", "number", { visibleWhen: { key: "model", in: ["truck"] } }),
      ],
      { model: [opt("truck"), opt("car", { facts: { doors: 4 } })] },
    );
    const out = resetAfterMove(scope, "model", { model: "car", doors: 2, bed: 6 }, {});
    expect(out.answers).toEqual({ model: "car", doors: 4 });
    expect(out.prefills).toEqual({ doors: 4 });
  });

  it("(x) D4: the moved parent carries no fact, another answered parent states one: D holds it", () => {
    const scope = input(
      [
        def("p1", "single_select"),
        def("p2", "single_select"),
        def("d", "single_select", { defaultValue: "van" }),
      ],
      {
        p1: [
          opt("old", { facts: { d: "hatch" } }),
          opt("new", { allowed: { d: ["hatch", "van", "suv"] } }),
        ],
        p2: [opt("u", { facts: { d: "suv" } })],
        d: [opt("hatch"), opt("van"), opt("suv")],
      },
    );
    const out = resetAfterMove(scope, "p1", { p1: "new", p2: "u", d: "hatch" }, { d: "hatch" });
    expect(out.answers).toEqual({ p1: "new", p2: "u", d: "suv" });
    expect(out.prefills).toEqual({ d: "suv" });
  });
});
