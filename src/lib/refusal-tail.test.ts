import { describe, expect, expectTypeOf, it } from "vitest";

import type { MessageKey } from "@/i18n";
import { readRefusal, refusalText, type RefusalFamily } from "@/lib/refusal";
import { relativeTime } from "@/lib/relative-time";

import { ADMIN_REFUSALS, fillRefusal, splitRefusal } from "./refusal-tail";

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

describe("a rate sentence says WHEN (L22)", () => {
  const soon = () => new Date(Date.now() + 2 * 3_600_000).toISOString();
  const t = (key: string) =>
    key === "admin.error.rateLimitedWhen" ? "Try again {when}." : `T(${key})`;
  const read = (tail: string | undefined) =>
    readRefusal(tail === undefined ? "rateLimited" : `rateLimited:${tail}`, ADMIN_REFUSALS);

  it("RTW-1 {when} is the instant from relativeTime, in English and in Amharic", () => {
    const at = soon();
    for (const language of ["en", "am"]) {
      expect(fillRefusal("Try again {when}.", at, language)).toBe(
        `Try again ${relativeTime(at, language)}.`,
      );
      expect(refusalText(read(at), t, undefined, language)).toBe(
        `Try again ${relativeTime(at, language)}.`,
      );
    }
    expect(relativeTime(at, "en")).toMatch(/2 hours/);
  });

  it("RTW-2 no tail, a bad or a past instant, or no language keeps the plain sentence", () => {
    expect(refusalText(read(undefined), t, undefined, "en")).toBe("T(admin.error.rateLimited)");
    expect(refusalText(read("not-a-time"), t, undefined, "en")).toBe("T(admin.error.rateLimited)");
    expect(refusalText(read("2001-01-01T00:00:00Z"), t, undefined, "en")).toBe(
      "T(admin.error.rateLimited)",
    );
    expect(refusalText(read(soon()), t)).toBe("T(admin.error.rateLimited)");
  });

  it("RTW-3 readRefusal fills when from the family; refusalText chooses it only for a future instant with a language", () => {
    const at = soon();
    expect(read(at)).toMatchObject({
      key: "admin.error.rateLimited",
      when: "admin.error.rateLimitedWhen",
      branch: "family",
    });
    expect(readRefusal("rateLimited", {}).when).toBeUndefined();
    expect(
      readRefusal("rateLimited", { words: { rateLimited: "admin.error.rateLimited" } }).when,
    ).toBeUndefined();
    expect(refusalText(read(at), t, undefined, "en")).toBe(`Try again ${relativeTime(at, "en")}.`);
    expect(refusalText(read(at), t)).toBe("T(admin.error.rateLimited)");
    expectTypeOf<RefusalFamily["when"]>().toEqualTypeOf<
      Readonly<Record<string, MessageKey>> | undefined
    >();
  });
});
