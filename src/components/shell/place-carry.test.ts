import { describe, expect, it } from "vitest";

import { parseAreaCookie, readAreaCookie, writeAreaCookie } from "./location-data";
import { chooseCarry, parseAccountPlace, type AccountPlace } from "./place-carry";

/** D106 — the saved area's time, the account read's shape and the newest-pick rule. */

const A = "aaaaaaaa-0000-4000-8000-000000000001";
const B = "bbbbbbbb-0000-4000-8000-000000000002";

describe("parseAreaCookie", () => {
  it("PC-1 reads the cookie with and without the pick's time, and refuses anything else", () => {
    expect(parseAreaCookie(`et:${A}`)).toEqual({ country: "ET", id: A, at: null });
    expect(parseAreaCookie(`ET:${A}:1760000000000`)).toEqual({
      country: "ET",
      id: A,
      at: 1760000000000,
    });
    for (const bad of [`ET:${A}:`, `ET:${A}:12a`, `ET:${A}:1:2`, `ETH:${A}:1`, `ET:nope:1`, ""]) {
      expect(parseAreaCookie(bad), bad).toBeNull();
    }
  });

  it("PC-2 a pick is written with its time and read back", () => {
    writeAreaCookie("et", A, 1760000000123.9);
    expect(readAreaCookie()).toEqual({ country: "ET", id: A, at: 1760000000123 });
    const before = Date.now();
    writeAreaCookie("ET", B);
    const saved = readAreaCookie();
    expect(saved?.id).toBe(B);
    expect(saved?.at).toBeGreaterThanOrEqual(before);
  });
});

describe("parseAccountPlace", () => {
  it("PC-3 reads a place, reads no place as null, and refuses a malformed answer", () => {
    const at = "2026-10-10T06:41:13.667398+00:00";
    expect(parseAccountPlace({ id: A, country: "et", at, usable: true })).toEqual({
      id: A,
      country: "ET",
      at: Date.parse(at),
      usable: true,
    });
    expect(parseAccountPlace({ id: null, country: null, at: null, usable: false })).toBeNull();
    for (const bad of [
      null,
      [],
      { id: "x", country: "ET", at, usable: true },
      { id: A, country: "ETH", at, usable: true },
      { id: A, country: "ET", at: "not a time", usable: true },
      { id: A, country: "ET", at, usable: "yes" },
    ]) {
      expect(parseAccountPlace(bad), JSON.stringify(bad)).toBeUndefined();
    }
  });
});

describe("chooseCarry", () => {
  const account = (id: string, at: number, usable = true): AccountPlace => ({
    id,
    country: "ET",
    at,
    usable,
  });
  const device = (id: string, at: number | null) => ({ country: "ET", id, at });

  it("PC-4 the newest pick wins between this browser and the account", () => {
    expect(chooseCarry(device(A, 200), account(B, 100))).toEqual({ kind: "upload", id: A });
    expect(chooseCarry(device(A, 100), account(B, 200))).toEqual({
      kind: "apply",
      country: "ET",
      id: B,
      at: 200,
    });
    expect(chooseCarry(device(A, 100), account(B, 100))).toMatchObject({ kind: "apply", id: B });
  });

  it("PC-5 one side alone decides; a browser pick without a time loses; a place no longer shown counts as none", () => {
    expect(chooseCarry(null, account(B, 100))).toMatchObject({ kind: "apply", id: B });
    expect(chooseCarry(device(A, 100), null)).toEqual({ kind: "upload", id: A });
    expect(chooseCarry(device(A, null), null)).toEqual({ kind: "upload", id: A });
    expect(chooseCarry(device(A, null), account(B, 1))).toMatchObject({ kind: "apply", id: B });
    expect(chooseCarry(device(A, 100), account(B, 200, false))).toEqual({ kind: "upload", id: A });
    expect(chooseCarry(null, account(B, 200, false))).toEqual({ kind: "none" });
    expect(chooseCarry(null, null)).toEqual({ kind: "none" });
  });

  it("PC-6 the same place on both: this browser takes the account's time, or nothing changes", () => {
    expect(chooseCarry(device(A, 100), account(A, 200))).toEqual({
      kind: "align",
      country: "ET",
      id: A,
      at: 200,
    });
    expect(chooseCarry(device(A, null), account(A, 200))).toMatchObject({ kind: "align" });
    expect(chooseCarry(device(A, 200), account(A, 200))).toEqual({ kind: "none" });
  });
});
