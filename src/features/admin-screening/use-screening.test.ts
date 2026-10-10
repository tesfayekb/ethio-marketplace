import { describe, expect, it, vi } from "vitest";

vi.mock("@/integrations/supabase/client", () => ({ supabase: {} }));

import { parseScreeningFacts } from "./use-screening";

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
