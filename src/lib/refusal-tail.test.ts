import { describe, expect, it } from "vitest";

import { doorKeyText, fillRefusal, splitRefusal } from "./refusal-tail";

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

describe("doorKeyText (T7)", () => {
  const words: Record<string, string> = {
    "admin.attributes.error.parentAfterChild": "Order refused in {detail}.",
    "admin.categories.error.delete_has_children": "{count} categories sit under this one.",
  };
  const translate = (key: string) => words[key] ?? key;

  it("reads any family's door key, its tail filled", () => {
    expect(doorKeyText("admin.attributes.error.parentAfterChild:leaf-x: a → b", translate)).toBe(
      "Order refused in leaf-x: a → b.",
    );
    expect(doorKeyText("admin.categories.error.delete_has_children:2", translate)).toBe(
      "2 categories sit under this one.",
    );
  });

  it("gives null for a key the catalog does not hold, and for words that are not a key", () => {
    expect(doorKeyText("admin.categories.error.unknownThing", translate)).toBeNull();
    expect(doorKeyText("permission denied", translate)).toBeNull();
    expect(doorKeyText("", translate)).toBeNull();
  });
});
