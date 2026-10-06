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
