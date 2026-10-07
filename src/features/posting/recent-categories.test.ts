import { describe, expect, it } from "vitest";

import { buildTree, type CategoryNode } from "@/features/categories/category-tree";
import { recentChips } from "./recent-categories";

function node(id: string, allowListings = true): CategoryNode {
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
  [node("vehicles"), node("cars"), node("vans"), node("bikes"), node("closed", false)],
  [
    { child_id: "cars", parent_id: "vehicles" },
    { child_id: "vans", parent_id: "vehicles" },
    { child_id: "bikes", parent_id: "vehicles" },
    { child_id: "closed", parent_id: "vehicles" },
  ],
);

/** Bundle 7 D2 — two "used before" chips. */
describe("recentChips", () => {
  it("more than two: the first two, in the reader's order", () => {
    expect(recentChips(["vans", "cars", "bikes"], tree)).toEqual(["vans", "cars"]);
  });
  it("one not in the tree is skipped", () => {
    expect(recentChips(["gone", "cars", "bikes"], tree)).toEqual(["cars", "bikes"]);
  });
  it("one not postable (a folder, a closed leaf) is skipped", () => {
    expect(recentChips(["vehicles", "closed", "bikes"], tree)).toEqual(["bikes"]);
  });
  it("none, or a failed read, draws nothing", () => {
    expect(recentChips([], tree)).toEqual([]);
    expect(recentChips(null, tree)).toEqual([]);
  });
});
