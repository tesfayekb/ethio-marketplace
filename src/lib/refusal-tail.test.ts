import { describe, expect, expectTypeOf, it } from "vitest";

import type { MessageKey } from "@/i18n";
import { readRefusal } from "@/lib/refusal";
import { relativeTime } from "@/lib/relative-time";

import {
  ADMIN_REFUSALS,
  doorKeyText,
  fillRefusal,
  RATE_WORDS,
  rateText,
  splitRefusal,
  type RateWords,
} from "./refusal-tail";

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

describe("a rate sentence says WHEN (L22)", () => {
  const soon = () => new Date(Date.now() + 2 * 3_600_000).toISOString();
  const t = (key: string) =>
    key === "admin.error.rateLimitedWhen" ? "Try again {when}." : `T(${key})`;

  it("RTW-1 {when} is the instant from relativeTime, in English and in Amharic", () => {
    const at = soon();
    for (const language of ["en", "am"]) {
      expect(fillRefusal("Try again {when}.", at, language)).toBe(
        `Try again ${relativeTime(at, language)}.`,
      );
    }
    expect(relativeTime(at, "en")).toMatch(/2 hours/);
  });

  it("RTW-2 no tail, a bad or a past instant, or no language keeps the plain sentence", () => {
    const read = (tail: string | undefined) =>
      readRefusal(tail === undefined ? "rateLimited" : `rateLimited:${tail}`, ADMIN_REFUSALS);
    expect(rateText(read(undefined), t, "en")).toBe("T(admin.error.rateLimited)");
    expect(rateText(read("not-a-time"), t, "en")).toBe("T(admin.error.rateLimited)");
    expect(rateText(read("2001-01-01T00:00:00Z"), t, "en")).toBe("T(admin.error.rateLimited)");
    expect(rateText(read(soon()), t)).toBe("T(admin.error.rateLimited)");
  });

  it("RTW-3 rateText chooses the when key for a future instant; other refusals are refusalText", () => {
    const at = soon();
    const read = readRefusal(`rateLimited:${at}`, ADMIN_REFUSALS);
    expect(rateText(read, t, "en")).toBe(`Try again ${relativeTime(at, "en")}.`);
    expect(rateText(readRefusal("someCode", ADMIN_REFUSALS), t, "en")).toBe("T(common.error)");
    expectTypeOf(RATE_WORDS).toEqualTypeOf<readonly RateWords[]>();
    expectTypeOf<RateWords>().toEqualTypeOf<{
      readonly plain: MessageKey;
      readonly when: MessageKey;
    }>();
  });
});
