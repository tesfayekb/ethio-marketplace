/**
 * D30 / D33 — THE ORDER OF A LEVEL.
 *
 * A host's own children come first, a surfaced (secondary) category follows them
 * in its pointer's order, and any `other-` row is last wherever it sits. The
 * breadcrumb's home is the FIRST pointer — the primary one.
 */
import { describe, expect, it } from "vitest";

import { buildTree, childrenOf, pathOf, rootsOf, type CategoryNode } from "./category-tree";

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
    // Both are primary children here, so the categories' own order decides.
    expect(childrenOf(tree, "food-drink").map((entry) => entry.slug)).toEqual([
      "drinks",
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
