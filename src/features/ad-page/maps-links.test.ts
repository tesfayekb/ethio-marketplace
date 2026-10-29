import { describe, expect, it } from "vitest";
import type { TreeNode } from "@/components/shell/location-data";
import {
  mapsPlaceQuery,
  mapsPathQuery,
  webPlaceUrl,
  webPinUrl,
  appPlaceUrl,
  appPinUrl,
  isIosHomeScreen,
} from "./maps-links";

const node = (id: string, parentId: string | null, nameEn: string | null, slug = id): TreeNode => ({
  id,
  parentId,
  nameEn,
  slug,
  level: parentId === null ? "country" : "city",
  centerLat: null,
  centerLng: null,
  isoCode: null,
});
const nodes = [
  node("et", null, "Ethiopia"),
  node("addis", "et", "Addis Ababa"),
  node("bole", "addis", "Bole"),
  node("kirkos", "addis", "Kirkos"),
  node("adama", "et", "Adama"),
];

describe("Maps links", () => {
  it("GML-1 searches the deepest common place with its full path", () => {
    expect(mapsPlaceQuery(nodes, ["bole"])).toBe("Bole, Addis Ababa, Ethiopia");
    expect(mapsPlaceQuery(nodes, ["bole", "kirkos"])).toBe("Addis Ababa, Ethiopia");
    expect(mapsPlaceQuery(nodes, ["bole", "adama"])).toBe("Ethiopia");
    expect(mapsPlaceQuery(nodes, ["unknown", "bole"])).toBe("Bole, Addis Ababa, Ethiopia");
    expect(mapsPlaceQuery(nodes, ["unknown"])).toBe("");
  });
  it("GML-4 builds the address from the document's paths, never the tree (INC-949)", () => {
    const et = { id: "et", nameEn: "Ethiopia" };
    const addis = { id: "addis", nameEn: "Addis Ababa" };
    const bole = { id: "bole", nameEn: "Bole", path: [et, addis] };
    const kirkos = { id: "kirkos", nameEn: "Kirkos", path: [et, addis] };
    const adama = { id: "adama", nameEn: "Adama", path: [et] };
    expect(mapsPathQuery([bole])).toBe("Bole, Addis Ababa, Ethiopia");
    expect(mapsPathQuery([bole, kirkos])).toBe("Addis Ababa, Ethiopia");
    expect(mapsPathQuery([bole, adama])).toBe("Ethiopia");
  });
  it("GML-5 a place without a path, or no place, gives no path address", () => {
    expect(mapsPathQuery([])).toBe("");
    expect(mapsPathQuery([{ id: "bole", nameEn: "Bole" }])).toBe("");
    expect(
      mapsPathQuery([
        { id: "bole", nameEn: "Bole", path: [{ id: "et", nameEn: "Ethiopia" }] },
        { id: "kirkos", nameEn: "Kirkos" },
      ]),
    ).toBe("");
  });
  it("GML-2 uses the slug when the English name is absent", () => {
    expect(
      mapsPlaceQuery([...nodes, node("unnamed", "addis", null, "scratch-place")], ["unnamed"]),
    ).toBe("scratch-place, Addis Ababa, Ethiopia");
  });
  it("GML-3 preserves the four web and app addresses", () => {
    expect(webPlaceUrl("Bole, Addis Ababa, Ethiopia")).toBe(
      "https://www.google.com/maps/search/?api=1&query=Bole%2C%20Addis%20Ababa%2C%20Ethiopia",
    );
    expect(appPlaceUrl("Bole, Addis Ababa, Ethiopia")).toBe(
      "comgooglemaps://?q=Bole%2C%20Addis%20Ababa%2C%20Ethiopia",
    );
    expect(webPinUrl(8.9876543, 38.7612345)).toBe(
      "https://www.google.com/maps/search/?api=1&query=8.9876543%2C38.7612345",
    );
    expect(appPinUrl(9.01, 38.76, 13)).toBe(
      "comgooglemaps://?q=9.01,38.76&center=9.01,38.76&zoom=13",
    );
  });
  it("GML-6 detects only standalone true", () => {
    const original = Object.getOwnPropertyDescriptor(navigator, "standalone");
    try {
      for (const value of [true, false, undefined]) {
        if (value === undefined) Reflect.deleteProperty(navigator, "standalone");
        else Object.defineProperty(navigator, "standalone", { configurable: true, value });
        expect(isIosHomeScreen()).toBe(value === true);
      }
    } finally {
      if (original) Object.defineProperty(navigator, "standalone", original);
      else Reflect.deleteProperty(navigator, "standalone");
    }
  });
});
