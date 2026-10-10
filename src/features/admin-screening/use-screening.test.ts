import { describe, expect, it, vi } from "vitest";

/** Bundle 11 A3 — every call the queue read makes on the query builder, in order. */
const calls = vi.hoisted(() => [] as Array<[string, unknown[]]>);

vi.mock("@/integrations/supabase/client", () => {
  const builder: Record<string, (...args: unknown[]) => unknown> = {};
  for (const name of ["select", "eq", "not", "ilike", "order", "range"]) {
    builder[name] = (...args: unknown[]) => {
      calls.push([name, args]);
      return name === "range" ? Promise.resolve({ data: [], error: null, count: 0 }) : builder;
    };
  }
  return {
    supabase: {
      from: (table: string) => {
        calls.push(["from", [table]]);
        return builder;
      },
    },
  };
});

import { listScreening, parseScreeningFacts, revealProblemKey } from "./use-screening";

/** Bundle 11 A2 (D120) — the preview's facts as the door returns them. */
describe("parseScreeningFacts", () => {
  it("SF-1 reads the country, the channel flags and the public names; refuses a malformed answer", () => {
    expect(
      parseScreeningFacts({
        country: "ET",
        channels: { phone: true, phone2: false, telegram: true, whatsapp: false },
        seller: { alias: "abebe", business_name: "Abebe Trading" },
      }),
    ).toEqual({
      country: "ET",
      channels: { phone: true, phone2: false, telegram: true, whatsapp: false },
      alias: "abebe",
      businessName: "Abebe Trading",
    });
    expect(
      parseScreeningFacts({
        country: null,
        channels: { phone: "yes" },
        seller: { alias: "", business_name: null },
      }),
    ).toEqual({
      country: null,
      channels: { phone: false, phone2: false, telegram: false, whatsapp: false },
      alias: null,
      businessName: null,
    });
    for (const bad of [
      null,
      [],
      "x",
      { channels: {} },
      { seller: {} },
      { channels: [], seller: {} },
    ]) {
      expect(parseScreeningFacts(bad), JSON.stringify(bad)).toBeNull();
    }
  });
});

/** Bundle 11 A3 (INC-537) — the market filter as the read sends it. */
describe("listScreening", () => {
  it("SF-2 a market filter reads the ad's place, never home_country_code; no market sends no place filter", async () => {
    calls.length = 0;
    await listScreening(0, "", 25, { country: "ET" });
    expect(calls).toContainEqual(["eq", ["place.country_code", "ET"]]);
    expect(calls).toContainEqual(["not", ["place", "is", null]]);
    expect(JSON.stringify(calls)).not.toContain("home_country_code");

    calls.length = 0;
    await listScreening(0, "", 25, { country: null });
    expect(calls.filter(([name]) => name === "not")).toEqual([]);
    expect(calls.filter(([name, args]) => name === "eq" && args[0] !== "status")).toEqual([]);
  });
});

/** Bundle 11 A3 — a refused reveal is said in words under its own row. */
describe("revealProblemKey", () => {
  it("SF-3 names the hour's limit and a method the seller does not show", () => {
    expect(revealProblemKey("rateLimited")).toBe("admin.screening.revealLimited");
    expect(revealProblemKey("notShown")).toBe("admin.screening.revealNotShown");
  });
});
