import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";
import {
  basisNoun,
  formatCommission,
  percentToBp,
  PRICE_BASIS_SHAPE,
  priceShapeFor,
} from "./price-basis";

/**
 * DEC-079 / D31 — SELF-DESCRIPTION CONSISTENCY (governance §11): the client's
 * table is read against the SQL it mirrors, never against a copy of itself.
 */
function sqlShapeTable(): Record<string, { forcedMode: string | null; period: string | null }> {
  const dir = join(process.cwd(), "supabase", "migrations");
  // D62-2 — the NEWEST declaration is the law (247a3ed0 re-declared it for DEC-081).
  const file = readdirSync(dir)
    .filter((name) => name.endsWith(".sql"))
    .sort()
    .filter((name) =>
      readFileSync(join(dir, name), "utf8").includes("FUNCTION public.price_shape_for_basis"),
    )
    .pop();
  if (file === undefined) throw new Error("no migration declares price_shape_for_basis");
  const sql = readFileSync(join(dir, file), "utf8");
  const start = sql.indexOf("FUNCTION public.price_shape_for_basis");
  const body = sql.slice(start, sql.indexOf("$$;", start));
  const cases = [...body.matchAll(/CASE p_value([\s\S]*?)END/g)].map((match) => match[1]);
  if (cases.length !== 2) throw new Error(`expected two CASE arms, found ${cases.length}`);
  const arms = (text: string) =>
    new Map(
      [...text.matchAll(/WHEN '([^']+)' THEN (NULL|'([^']*)')/g)].map((m) => [m[1], m[3] ?? null]),
    );
  const modes = arms(cases[0]);
  const periods = arms(cases[1]);
  const tokens = new Set([...modes.keys(), ...periods.keys()]);
  const out: Record<string, { forcedMode: string | null; period: string | null }> = {};
  for (const token of tokens) {
    out[token] = {
      forcedMode: modes.get(token) ?? null,
      period: periods.has(token) ? (periods.get(token) ?? null) : "once",
    };
  }
  return out;
}

describe("price basis", () => {
  it("mirrors price_shape_for_basis exactly", () => {
    // A flag-only row (DEC-081 negotiable) is the SQL's ELSE arm plus the toggle.
    const shapes = Object.fromEntries(
      Object.entries(PRICE_BASIS_SHAPE)
        .filter(([, shape]) => shape.negotiable !== true)
        .map(([token, shape]) => [token, { forcedMode: shape.forcedMode, period: shape.period }]),
    );
    expect(shapes).toEqual(sqlShapeTable());
  });

  it("reads negotiable as a flag, not a forced mode (DEC-081)", () => {
    expect(priceShapeFor("negotiable")).toEqual({
      forcedMode: null,
      period: "once",
      negotiable: true,
    });
    expect(sqlShapeTable()["negotiable"]).toBeUndefined();
    expect(priceShapeFor("hourly")).toEqual({ forcedMode: null, period: "hour" });
    expect(priceShapeFor("quote")).toEqual({ forcedMode: "contact", period: null });
    expect(priceShapeFor("commission")).toEqual({ forcedMode: "commission", period: "once" });
  });

  it("treats an unknown token as a unit priced once", () => {
    expect(priceShapeFor("per_quintal")).toEqual({ forcedMode: null, period: "once" });
    expect(priceShapeFor("toString")).toEqual({ forcedMode: null, period: "once" });
  });

  it("formats a commission from basis points", () => {
    expect(formatCommission(1250)).toBe("12.5");
    expect(formatCommission(1000)).toBe("10");
    expect(formatCommission(1234)).toBe("12.34");
    expect(formatCommission(5)).toBe("0.05");
    expect(formatCommission(10000)).toBe("100");
  });

  it("stores a typed percentage as rounded basis points", () => {
    expect(percentToBp(12.5)).toBe(1250);
    expect(percentToBp(2.345)).toBe(235);
    expect(percentToBp(null)).toBeNull();
  });

  it("derives the basis noun from a label that carries its own per (INC-297)", () => {
    expect(basisNoun("Per Kg")).toBe("Kg");
    expect(basisNoun("Per m²")).toBe("m²");
    expect(basisNoun("Per Tray (30 eggs)")).toBe("Tray (30 eggs)");
    expect(basisNoun("በኪሎ")).toBe("ኪሎ");
    expect(basisNoun("በትሬይ (30 እንቁላል)")).toBe("ትሬይ (30 እንቁላል)");
    expect(basisNoun("Fixed Price (per job)")).toBeNull();
    expect(basisNoun("Commission (%)")).toBeNull();
  });
});
