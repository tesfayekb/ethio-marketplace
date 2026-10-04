import { describe, expect, it } from "vitest";

import { savedChannels } from "./account-overview";

describe("savedChannels (bundle 4 step 23)", () => {
  it("lists only channels with a value, in the contact step's order", () => {
    expect(
      savedChannels({
        whatsapp: { value: "+251911000002", show: false },
        phone: { value: "+251911000001", show: true },
        telegram: { value: "  ", show: true },
        messages: true,
      }),
    ).toEqual([
      { channel: "phone", value: "+251911000001", show: true },
      { channel: "whatsapp", value: "+251911000002", show: false },
    ]);
  });

  it("reads nothing from an empty or unreadable profile value", () => {
    expect(savedChannels(null)).toEqual([]);
    expect(savedChannels({})).toEqual([]);
    expect(savedChannels({ phone: "+251911000001" })).toEqual([]);
  });
});
