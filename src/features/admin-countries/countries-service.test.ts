import { beforeEach, describe, expect, it, vi } from "vitest";

const door = vi.hoisted(() => ({ rpc: vi.fn() }));
vi.mock("@/lib/supabase-door", () => ({ rpc: door.rpc }));

import { ReaderError } from "@/lib/reader-failure";
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

  it("KSV-2 a refusal is the door's own error, typed (INC-1256), for every write door", async () => {
    const refusal = { message: "scopedRolesExist", code: "P0D01", details: "", hint: "" };
    door.rpc.mockResolvedValue({ data: null, error: refusal });
    await expectTypedRefusal(setCountryActive({ code: "KE", active: false }), refusal);
    await expectTypedRefusal(setCountryRootOrder({ code: "KE", categoryIds: ["c-1"] }), refusal);
    await expectTypedRefusal(
      upsertCountry({
        code: "KE",
        nameEn: "K",
        unitSystem: "metric",
        currencyCode: null,
        displayOrder: 0,
      }),
      refusal,
    );
  });
});

/** INC-1256 — a refusal rejects as the typed failure, carrying the door's message and code. */
async function expectTypedRefusal(
  pending: Promise<unknown>,
  refusal: { message: string; code: string },
): Promise<void> {
  const thrown: unknown = await pending.then(
    () => null,
    (error: unknown) => error,
  );
  expect(thrown).toBeInstanceOf(ReaderError);
  expect(thrown).toMatchObject({
    message: refusal.message,
    code: refusal.code,
    failure: { code: refusal.code },
  });
}

describe("a failed door call is the typed failure (INC-1256)", () => {
  it("RFT-U5 a failed activate rejects as a ReaderError with the database's code and message", async () => {
    const raw = { message: "duplicate key", code: "23505", details: "d", hint: "h" };
    door.rpc.mockResolvedValueOnce({ data: null, error: raw });
    await expectTypedRefusal(setCountryActive({ code: "KE", active: true }), raw);
  });
});
