/**
 * D30 / D33 — THE ORDER OF A LEVEL.
 *
 * A host's own children come first, a surfaced (secondary) category follows them
 * in its pointer's order, and any `other-` row is last wherever it sits. The
 * breadcrumb's home is the FIRST pointer — the primary one.
 */
import { describe, expect, it } from "vitest";

import {
  buildTree,
  childrenOf,
  isPostable,
  pathOf,
  rootsOf,
  type CategoryNode,
} from "./category-tree";

function node(slug: string, displayOrder: number): CategoryNode {
  return {
    id: slug,
    nameEn: slug,
    nameAm: null,
    slug,
    icon: null,
    allowListings: true,
    isCatchall: slug.startsWith("other-"),
    imageUrl: null,
    imageThumbUrl: null,
    displayOrder,
  };
}

const rows = [
  node("babies-kids", 1),
  node("food-drink", 2),
  node("baby-gear", 1),
  node("other-babies", 99),
  node("baby-food", 5),
  node("drinks", 1),
];

// baby-food's PRIMARY home is food-drink (its first pointer); it is surfaced
// under babies-kids, where it must follow baby-gear and precede other-babies.
const pointers = [
  { child_id: "baby-gear", parent_id: "babies-kids", display_order: 1 },
  { child_id: "baby-food", parent_id: "food-drink", display_order: 1 },
  { child_id: "drinks", parent_id: "food-drink", display_order: 2 },
  { child_id: "other-babies", parent_id: "babies-kids", display_order: 2 },
  { child_id: "baby-food", parent_id: "babies-kids", display_order: 3 },
];

const tree = buildTree(rows, pointers);

describe("a level's order", () => {
  it("puts the host's own children first, the guest next and other- last", () => {
    expect(childrenOf(tree, "babies-kids").map((entry) => entry.slug)).toEqual([
      "baby-gear",
      "baby-food",
      "other-babies",
    ]);
  });

  it("orders two guests by their pointer order, not by the category's", () => {
    const withTwoGuests = buildTree(rows, [
      ...pointers,
      { child_id: "drinks", parent_id: "babies-kids", display_order: 2 },
    ]);
    expect(withTwoGuests.childrenOf.get("babies-kids")?.map((entry) => entry.slug)).toEqual([
      "baby-gear",
      "drinks",
      "baby-food",
      "other-babies",
    ]);
  });

  it("keeps every surfacing as a branch", () => {
    // DEC-080 — both are own children here, so their POINTER order decides
    // (baby-food 1, drinks 2), not the rows' display_order.
    expect(childrenOf(tree, "food-drink").map((entry) => entry.slug)).toEqual([
      "baby-food",
      "drinks",
    ]);
  });

  it("DEC-080 (i) orders roots by their root pointers, not by displayOrder", () => {
    const rooted = buildTree(rows, [
      ...pointers,
      { child_id: "babies-kids", parent_id: null, display_order: 2 },
      { child_id: "food-drink", parent_id: null, display_order: 1 },
    ]);
    expect(rootsOf(rooted).map((entry) => entry.slug)).toEqual(["food-drink", "babies-kids"]);
  });

  it("DEC-080 (ii) orders own children by pointer order when it disagrees with displayOrder", () => {
    const own = buildTree(
      [node("root", 1), node("late-row", 1), node("early-row", 9)],
      [
        { child_id: "late-row", parent_id: "root", display_order: 2 },
        { child_id: "early-row", parent_id: "root", display_order: 1 },
      ],
    );
    expect(childrenOf(own, "root").map((entry) => entry.slug)).toEqual(["early-row", "late-row"]);
  });

  it("DEC-080 (iii) the flagged pointer is the home even when a guest pointer sorts first", () => {
    const flagged = buildTree(rows, [
      { child_id: "baby-food", parent_id: "babies-kids", display_order: 0 },
      { child_id: "baby-food", parent_id: "food-drink", display_order: 5, is_primary: true },
      { child_id: "baby-gear", parent_id: "babies-kids", display_order: 1 },
    ]);
    expect(pathOf(flagged, "baby-food").map((entry) => entry.slug)).toEqual([
      "food-drink",
      "baby-food",
    ]);
    // Under babies-kids it is a guest, so it follows the own child despite order 0.
    expect(childrenOf(flagged, "babies-kids").map((entry) => entry.slug)).toEqual([
      "baby-gear",
      "baby-food",
    ]);
  });

  it("DEC-080 (iv) with no flag anywhere the first pointer is the home", () => {
    expect(pointers.some((pointer) => "is_primary" in pointer)).toBe(false);
    expect(pathOf(tree, "baby-food").map((entry) => entry.slug)).toEqual([
      "food-drink",
      "baby-food",
    ]);
  });

  it("shows the PRIMARY home in the breadcrumb", () => {
    expect(pathOf(tree, "baby-food").map((entry) => entry.slug)).toEqual([
      "food-drink",
      "baby-food",
    ]);
  });

  it("sends an other- root to the end of the rail", () => {
    const rail = buildTree([...rows, node("other-everything", 3)], pointers);
    expect(rootsOf(rail).map((entry) => entry.slug)).toEqual([
      "babies-kids",
      "food-drink",
      "other-everything",
    ]);
  });
});

/**
 * D34 — AN "OTHER" LEAF IS A POSTING TARGET. It is last on its level and it is
 * selectable; only a folder (children, or `allow_listings` false) is not.
 */
describe("what a seller may post into", () => {
  it("accepts an other- leaf", () => {
    expect(isPostable(tree, tree.byId.get("other-babies")!)).toBe(true);
  });

  it("still refuses a level with children", () => {
    expect(isPostable(tree, tree.byId.get("food-drink")!)).toBe(false);
  });

  it("still refuses a folder that forbids listings", () => {
    const folder = { ...node("keepsakes", 7), allowListings: false };
    const withFolder = buildTree([...rows, folder], pointers);
    expect(isPostable(withFolder, folder)).toBe(false);
  });
});
