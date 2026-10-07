import { describe, expect, it } from "vitest";

import { fillRefusal, splitRefusal } from "./refusal-tail";

describe("splitRefusal", () => {
  it("returns the key alone when there is no tail", () => {
    expect(splitRefusal("admin.categories.error.delete_active")).toEqual({
      key: "admin.categories.error.delete_active",
      tail: undefined,
    });
  });

  it("splits a count tail at the colon", () => {
    expect(splitRefusal("admin.categories.error.delete_has_children:2")).toEqual({
      key: "admin.categories.error.delete_has_children",
      tail: "2",
    });
  });

  it("keeps every later colon inside the tail", () => {
    expect(splitRefusal("admin.attributes.error.parentAfterChild:leaf-x: a → b")).toEqual({
      key: "admin.attributes.error.parentAfterChild",
      tail: "leaf-x: a → b",
    });
  });
});

describe("fillRefusal", () => {
  it("puts the number in {count}", () => {
    expect(fillRefusal("{count} categories sit under this one.", "1")).toBe(
      "1 categories sit under this one.",
    );
  });

  it("puts the whole text in {detail}", () => {
    expect(fillRefusal("Order refused in {detail}.", "leaf-x: a → b")).toBe(
      "Order refused in leaf-x: a → b.",
    );
  });

  it("names the first and last pipe parts as {attr} and {target}", () => {
    expect(fillRefusal("{attr} → {target}", "colour|red")).toBe("colour → red");
  });

  it("leaves a sentence unchanged when there is no tail", () => {
    expect(fillRefusal("Retire it first {count}", undefined)).toBe("Retire it first {count}");
  });
});
