import { describe, expect, it } from "vitest";

import { doorErrorDetail, doorRefusal } from "./door-error";

describe("doorErrorDetail (INC-447)", () => {
  it("names the constraint a message carries", () => {
    expect(doorErrorDetail('new row for relation "listings" violates check constraint "x"')).toBe(
      "x",
    );
  });

  it("answers undefined when the message names no constraint", () => {
    expect(doorErrorDetail("listing not found")).toBeUndefined();
  });
});

describe("doorRefusal (INC-447)", () => {
  it("keeps a door's own machine code", () => {
    expect(doorRefusal("tooManyPhotos:10")).toEqual({ field: "door", reason: "tooManyPhotos:10" });
    expect(doorRefusal("rateLimited")).toEqual({ field: "door", reason: "rateLimited" });
  });

  // F1-7a (ruling 2, decision 11) — the gate's rateLimited carries its reset instant, which holds `:` and `+`.
  it("DE-1 a code with an instant as its detail is the code and its detail", () => {
    for (const instant of [
      "2026-11-19T20:05:12.123456+00:00",
      "2026-11-19T20:05:12+00:00",
      "2026-11-19T20:05:12Z",
    ]) {
      expect(doorRefusal(`rateLimited:${instant}`), instant).toEqual({
        field: "door",
        reason: "rateLimited",
        detail: instant,
      });
    }
  });

  it("DE-2 the code is cut at the FIRST colon: a detail may hold colons, plus signs and spaces", () => {
    expect(doorRefusal("sameLevel:a:b + c")).toEqual({
      field: "door",
      reason: "sameLevel",
      detail: "a:b + c",
    });
    // The surrounding whitespace is not part of the refusal.
    expect(doorRefusal("  rateLimited:2026-11-19T20:05:12+00:00\n")).toEqual({
      field: "door",
      reason: "rateLimited",
      detail: "2026-11-19T20:05:12+00:00",
    });
  });

  it("DE-3 the code keeps its strict pattern: a head that is not a bare camelCase code is a sentence", () => {
    for (const message of [
      "illegal transition: draft -> sold",
      "my_saved_listings: badSize",
      "Rate:limited",
      "2fast:soon",
      ":2026-11-19T20:05:12+00:00",
    ]) {
      expect(doorRefusal(message).reason, message).toBe("doorError");
    }
  });

  it("RRD-1 a sentence is not a code (INC-1220): an unlisted head and a space after the colon is doorError; a real code's free detail stays", () => {
    expect(doorRefusal("lowercaseword: some sentence")).toEqual({
      field: "door",
      reason: "doorError",
    });
    expect(doorRefusal("deleteHasDependents:a, b")).toEqual({
      field: "door",
      reason: "deleteHasDependents",
      detail: "a, b",
    });
    expect(doorRefusal("rateLimited: 2026-11-19 20:05:12+00")).toEqual({
      field: "door",
      reason: "rateLimited",
      detail: " 2026-11-19 20:05:12+00",
    });
  });

  it("never sends raw text: doorError with the constraint or nothing", () => {
    expect(doorRefusal('violates check constraint "listings_place_unless_draft"')).toEqual({
      field: "door",
      reason: "doorError",
      detail: "listings_place_unless_draft",
    });
    expect(doorRefusal("illegal transition: draft -> sold")).toEqual({
      field: "door",
      reason: "doorError",
    });
  });
});
