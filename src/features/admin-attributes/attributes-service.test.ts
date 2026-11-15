import { describe, expect, it, vi } from "vitest";

const door = vi.hoisted(() => ({ rpc: vi.fn() }));
vi.mock("@/lib/supabase-door", () => ({ rpc: door.rpc }));

import { linkAttribute, updateAttributeLink } from "./attributes-service";

describe("the attribute doors' answers and arguments (F1-4a, INC-942)", () => {
  it("ATS-1 a link answers the door's id and sends an absent cell as NULL, never a cast", async () => {
    door.rpc.mockResolvedValueOnce({ data: { ok: true, id: "l-1" }, error: null });
    await expect(
      linkAttribute({
        categoryId: "c-1",
        attributeId: "a-1",
        isRequired: false,
        isFilterable: true,
        displayOrder: null,
      }),
    ).resolves.toBe("l-1");
    expect(door.rpc).toHaveBeenLastCalledWith("admin_link_attribute", {
      p_category_id: "c-1",
      p_attribute_id: "a-1",
      p_is_required: false,
      p_is_filterable: true,
      p_display_order: null,
      p_allowed_options: null,
      p_default_value: null,
      p_visible_when: null,
    });
    door.rpc.mockResolvedValueOnce({ data: { ok: true }, error: null });
    await expect(
      linkAttribute({
        categoryId: "c-1",
        attributeId: "a-1",
        isRequired: false,
        isFilterable: true,
        displayOrder: 1,
      }),
    ).rejects.toThrow("admin_link_attribute answered without an id");
  });

  it("ATS-2 a link edit leaves each flag it does not change NULL; a refusal is the door's own error", async () => {
    door.rpc.mockResolvedValueOnce({ data: { ok: true }, error: null });
    await updateAttributeLink({ linkId: "l-1", isRequired: true });
    expect(door.rpc).toHaveBeenLastCalledWith("admin_update_attribute_link", {
      p_link_id: "l-1",
      p_is_required: true,
      p_is_filterable: null,
      p_allowed_options: null,
      p_default_value: null,
      p_visible_when: null,
      p_clear_cells: null,
    });
    const refusal = { message: "unknownLink", code: "P0D01", details: "", hint: "" };
    door.rpc.mockResolvedValueOnce({ data: null, error: refusal });
    await expect(updateAttributeLink({ linkId: "l-1" })).rejects.toBe(refusal);
  });
});
