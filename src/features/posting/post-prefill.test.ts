/**
 * D119 — the invite's address: what /post keeps, the way back from sign-in, and
 * the level step 1 opens on.
 */
import { describe, expect, it } from "vitest";

import { buildTree, type CategoryNode } from "@/features/categories/category-tree";

import { postReturnPath, postSearchOf, prefillCursor } from "./post-prefill";

const C = "0b0c5f4e-6a1d-4c2b-9e8f-1a2b3c4d5e6f";
const P = "1a2b3c4d-5e6f-4a1b-8c2d-3e4f5a6b7c8d";

function node(id: string, allowListings: boolean): CategoryNode {
  return {
    id,
    nameEn: id,
    nameAm: null,
    slug: id,
    icon: null,
    allowListings,
    isCatchall: false,
    imageUrl: null,
    imageThumbUrl: null,
    displayOrder: 1,
  };
}

const tree = buildTree(
  [node("folder", false), node("leaf", true), node("top-leaf", true)],
  [
    { child_id: "folder", parent_id: null, display_order: 1, is_primary: true },
    { child_id: "top-leaf", parent_id: null, display_order: 2, is_primary: true },
    { child_id: "leaf", parent_id: "folder", display_order: 1, is_primary: true },
  ],
);

describe("postSearchOf", () => {
  it("PF-1 keeps two lowercase uuids and drops everything else", () => {
    expect(postSearchOf({ category: C, place: P })).toEqual({ category: C, place: P });
    expect(postSearchOf({ category: C.toUpperCase(), place: "not-a-uuid", other: C })).toEqual({});
    expect(postSearchOf({ category: 42, place: [P] })).toEqual({});
  });
});

describe("postReturnPath", () => {
  it("PF-2 /post, with the invite kept in a fixed order", () => {
    expect(postReturnPath({})).toBe("/post");
    expect(postReturnPath({ place: P })).toBe(`/post?place=${P}`);
    expect(postReturnPath({ place: P, category: C })).toBe(`/post?category=${C}&place=${P}`);
  });
});

describe("prefillCursor", () => {
  it("PF-3 a folder opens inside itself, a leaf on its parent's level, an unknown id nowhere", () => {
    expect(prefillCursor(tree, "folder")).toBe("folder");
    expect(prefillCursor(tree, "leaf")).toBe("folder");
    expect(prefillCursor(tree, "top-leaf")).toBeNull();
    expect(prefillCursor(tree, "missing")).toBeUndefined();
  });
});
