import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { DOOR_CODES, DOOR_REFUSED_KEY, doorCode } from "./door-codes";
import { DOOR_REFUSED_KEY as LEAF_KEY } from "./door-refused-key";

/** DRC-1…7 (DEC-333): the one reader of door refusal codes. */
describe("doorCode", () => {
  it("DRC-1 reads a bare code and a code with its detail from a RAISE's message", () => {
    expect(doorCode("notSignedIn")).toEqual({ code: "notSignedIn", detail: null });
    expect(doorCode({ message: "permissionDenied:scope", code: "P0D01" })).toEqual({
      code: "permissionDenied",
      detail: "scope",
    });
  });

  it("DRC-2 reads the shell's returned envelope through its message or its refusals", () => {
    expect(
      doorCode({ ok: false, code: "P0D01", message: "lastSignInMethod", refusals: [] }),
    ).toEqual({
      code: "lastSignInMethod",
      detail: null,
    });
    expect(doorCode({ refusals: [{ reason: "languageNotPublished", detail: null }] })).toEqual({
      code: "languageNotPublished",
      detail: null,
    });
  });

  it("DRC-3 answers null for a sentence, an unknown code or nothing — the screen renders the generic key", () => {
    expect(doorCode("last sign-in method: removing the password would leave no way in")).toEqual({
      code: null,
      detail: null,
    });
    expect(doorCode("someFutureCode:1")).toEqual({ code: null, detail: null });
    expect(doorCode(null)).toEqual({ code: null, detail: null });
    expect(doorCode({ message: 42 })).toEqual({ code: null, detail: null });
    expect(DOOR_REFUSED_KEY).toBe("door.refused");
  });

  it("DRC-4 the list is closed, code-shaped and starts with the five gate codes in the law's order", () => {
    expect(DOOR_CODES.slice(0, 5)).toEqual([
      "notSignedIn",
      "accountDeactivated",
      "permissionDenied",
      "stepUpRequired",
      "rateLimited",
    ]);
    for (const code of DOOR_CODES) expect(code).toMatch(/^[a-z][A-Za-z]*$/);
    expect(new Set(DOOR_CODES).size).toBe(DOOR_CODES.length);
  });

  it("DRC-6 P-2's family codes are on the list and read from a plain RAISE's message (DEC-349)", () => {
    const family = [
      "listingNotFound",
      "notLive",
      "notPaused",
      "unknownLevel",
      "sameLevel",
      "lowerLevel",
      "listingNotPlaced",
      "levelNotAvailable",
      "seasonEnded",
      "notOffered",
      "marketNotSet",
      "creditsNotAvailable",
      "noFreeSlot",
    ];
    for (const code of family) {
      expect(DOOR_CODES).toContain(code);
      expect(doorCode({ message: code, code: "P0001" })).toEqual({ code, detail: null });
    }
    expect(doorCode({ message: "noFreeSlot", details: "3" })).toEqual({
      code: "noFreeSlot",
      detail: null,
    });
    expect(doorCode("account is deactivated")).toEqual({ code: null, detail: null });
  });

  it("DRC-7 the reach's refusal codes are on the list and read from a plain RAISE's message; sameReach's DETAIL is not its detail", () => {
    for (const code of ["unknownReach", "sameReach", "lowerReach", "includedReach"]) {
      expect(DOOR_CODES).toContain(code);
      expect(doorCode({ message: code, code: "P0001" })).toEqual({ code, detail: null });
    }
    expect(doorCode({ message: "sameReach", details: "2026-11-20 10:00:00+00" })).toEqual({
      code: "sameReach",
      detail: null,
    });
  });

  it("DRC-5 a detail with colons stays whole", () => {
    expect(doorCode("rateLimited:2026-11-06T10:00:00Z")).toEqual({
      code: "rateLimited",
      detail: "2026-11-06T10:00:00Z",
    });
  });

  it("RRD-2 the code is cut at the first colon by the one reader: answers for real codes unchanged", () => {
    expect(doorCode("sameReach:2026-11-20 10:00:00+00")).toEqual({
      code: "sameReach",
      detail: "2026-11-20 10:00:00+00",
    });
    expect(doorCode("rateLimited:")).toEqual({ code: "rateLimited", detail: null });
    expect(doorCode("notSignedIn ")).toEqual({ code: "notSignedIn", detail: null });
  });

  it("DRC-8 the generic key is a leaf the shell can import without the list: both modules answer the same value (INC-1153)", () => {
    expect(LEAF_KEY).toBe("door.refused");
    expect(DOOR_REFUSED_KEY).toBe(LEAF_KEY);
    expect(readFileSync("src/lib/door-refused-key.ts", "utf8")).not.toMatch(/^import /m);
    // The shell's notice (every page) reads the leaf, never the list.
    const notice = readFileSync("src/components/shell/impersonation-notice.tsx", "utf8");
    expect(notice).toContain('from "@/lib/door-refused-key"');
    expect(notice).not.toContain("@/lib/door-codes");
  });
});
