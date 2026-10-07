import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    auth: { getSession: async () => ({ data: { session: { access_token: "t" } } }) },
  },
}));

import { attributeDisplayValue } from "./attribute-display";
import {
  findHeldOption,
  forgetAttributeOptions,
  loadAttributeOptions,
  retiredAttributeOptions,
} from "./attribute-options";
import type { AttrDef } from "./posting-service";

/** Bundle 7 D1 (INC-466) — a switched-off answer prints its label, never offered. */
const def = {
  attributeId: "a1",
  attrKey: "fuel",
  attrType: "single_select",
  unit: null,
  unitAm: null,
  format: null,
} as unknown as AttrDef;
const tokens = {} as never;

beforeEach(() => {
  forgetAttributeOptions();
  vi.stubGlobal(
    "fetch",
    vi.fn(
      async () =>
        new Response(
          JSON.stringify({
            version: "v",
            options: [{ value: "petrol", label_en: "Petrol", label_am: "ቤንዚን" }],
            retired: [{ value: "lpg", label_en: "Gas", label_am: "ጋዝ" }],
          }),
          { status: 200 },
        ),
    ),
  );
});
afterEach(() => vi.unstubAllGlobals());

describe("retired options (INC-466)", () => {
  it("the offered list is unchanged: no retired option in it", async () => {
    const offered = await loadAttributeOptions("a1");
    expect(offered?.map((option) => option.value)).toEqual(["petrol"]);
    expect(retiredAttributeOptions("a1").map((option) => option.value)).toEqual(["lpg"]);
  });
  it("a retired value prints its label in both languages", async () => {
    const offered = (await loadAttributeOptions("a1"))!;
    expect(attributeDisplayValue(def, "lpg", offered, "en", "", "", "", tokens)).toBe("Gas");
    expect(attributeDisplayValue(def, "lpg", offered, "am", "", "", "", tokens)).toBe("ጋዝ");
  });
  it("an unknown value prints as before", async () => {
    const offered = (await loadAttributeOptions("a1"))!;
    expect(attributeDisplayValue(def, "zzz", offered, "en", "", "", "", tokens)).toBe("zzz");
  });
  it("the basis caption's lookup: offered first, then retired, else undefined", async () => {
    const offered = (await loadAttributeOptions("a1"))!;
    expect(findHeldOption("petrol", offered, "a1")?.labelEn).toBe("Petrol");
    expect(findHeldOption("lpg", offered, "a1")?.labelEn).toBe("Gas");
    expect(findHeldOption("zzz", offered, "a1")).toBeUndefined();
  });
});

describe("freshOnly (K4)", () => {
  async function expireAndFail() {
    vi.useFakeTimers({ now: Date.now() });
    await loadAttributeOptions("a1");
    vi.setSystemTime(Date.now() + 61_000);
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("", { status: 500 })),
    );
  }
  afterEach(() => vi.useRealTimers());
  it("an expired copy and a failing fetch answer null with the option", async () => {
    await expireAndFail();
    expect(await loadAttributeOptions("a1", { freshOnly: true })).toBeNull();
  });
  it("without the option the expired copy is handed back", async () => {
    await expireAndFail();
    expect((await loadAttributeOptions("a1"))?.map((o) => o.value)).toEqual(["petrol"]);
  });
  it("a copy inside its life is used with the option", async () => {
    await loadAttributeOptions("a1");
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("", { status: 500 })),
    );
    expect((await loadAttributeOptions("a1", { freshOnly: true }))?.length).toBe(1);
  });
});
