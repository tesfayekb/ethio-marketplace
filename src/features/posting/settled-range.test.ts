import { describe, expect, it } from "vitest";

import { rangeDisplayValue, settledRanges } from "./attribute-display";
import type { AttrOption } from "./attribute-options";
import type { AttrDef } from "./posting-service";

const def = (attrKey: string, attrType: string, extra: Partial<AttrDef> = {}) =>
  ({ attrKey, attrType, visibleWhen: null, unit: null, ...extra }) as unknown as AttrDef;
const opt = (value: string, bounds: Record<string, unknown> | null) =>
  ({ value, bounds }) as unknown as AttrOption;

const model = def("model", "single_select");
const mah = def("battery_mah", "number", { unit: "mAh" });
const options = [
  opt("m1", { battery_mah: { min: 4056, max: 4288, settled: true } }),
  opt("m2", { battery_mah: { min: 3000, max: 5000 } }),
  opt("m3", { battery_mah: { min: 4100, max: 4100, settled: true } }),
];
const ranges = (values: Record<string, unknown>) =>
  settledRanges([model, mah], values, () => options);

describe("settledRanges (INC-374)", () => {
  it("settles the number when the chosen model says so", () => {
    expect(ranges({ model: "m1" })).toEqual({ battery_mah: { min: 4056, max: 4288 } });
  });
  it("asks again for a model without settled, and keeps min = max as DEC-085's pin", () => {
    expect(ranges({ model: "m2" })).toEqual({});
    expect(ranges({ model: "m3" })).toEqual({});
  });
  it("lists no range for a number that holds an answer", () => {
    expect(ranges({ model: "m1", battery_mah: 4100 })).toEqual({});
  });
  it("writes the range with its unit", () => {
    expect(rangeDisplayValue(mah, { min: 4056, max: 4288 }, "en")).toBe("4056–4288 mAh");
  });
});
