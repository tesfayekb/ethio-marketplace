import { beforeEach, describe, expect, it, vi } from "vitest";

const door = vi.hoisted(() => ({ rpc: vi.fn() }));
vi.mock("@/lib/supabase-door", () => ({ rpc: door.rpc }));

import { setCountryActive, setCountryRootOrder, upsertCountry } from "./countries-service";

describe("the markets doors' calls (F1-4b)", () => {
  beforeEach(() => door.rpc.mockReset());

  it("KSV-1 each write door is called with its own arguments, a NULL currency as given", async () => {
    door.rpc.mockResolvedValue({ data: { ok: true }, error: null });
    await upsertCountry({
      code: "KE",
      nameEn: "Kenya",
      unitSystem: "metric",
      currencyCode: null,
      displayOrder: 3,
    });
    await setCountryActive({ code: "KE", active: false });
    await setCountryActive({ code: "KE", active: false, forceHide: true });
    await setCountryRootOrder({ code: "KE", categoryIds: [] });
    expect(door.rpc.mock.calls).toEqual([
      [
        "admin_upsert_country",
        {
          p_code: "KE",
          p_name_en: "Kenya",
          p_unit_system: "metric",
          p_currency_code: null,
          p_display_order: 3,
        },
      ],
      ["admin_set_country_active", { p_code: "KE", p_active: false, p_force_hide: false }],
      ["admin_set_country_active", { p_code: "KE", p_active: false, p_force_hide: true }],
      ["admin_set_country_root_order", { p_code: "KE", p_category_ids: [] }],
    ]);
  });

  it("KSV-2 a refusal is thrown as it arrived, for every write door", async () => {
    const refusal = { message: "scopedRolesExist", code: "P0D01", details: "", hint: "" };
    door.rpc.mockResolvedValue({ data: null, error: refusal });
    await expect(setCountryActive({ code: "KE", active: false })).rejects.toBe(refusal);
    await expect(setCountryRootOrder({ code: "KE", categoryIds: ["c-1"] })).rejects.toBe(refusal);
    await expect(
      upsertCountry({
        code: "KE",
        nameEn: "K",
        unitSystem: "metric",
        currencyCode: null,
        displayOrder: 0,
      }),
    ).rejects.toBe(refusal);
  });
});
