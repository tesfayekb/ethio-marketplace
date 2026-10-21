import { expect, it } from "vitest";
import type { NavItem } from "@/config/panels.types";
import { ADMIN_NAV_ITEMS } from "./rail-items";

const all = (items: readonly NavItem[]): NavItem[] =>
  items.flatMap((item) => [item, ...all(item.children ?? [])]);

it("gives the legal entry the legalReview alert and no other entry an alert", () => {
  const items = all(ADMIN_NAV_ITEMS);
  expect(items.filter((item) => item.path === "/admin/legal").map((item) => item.alert)).toEqual([
    "legalReview",
  ]);
  expect(items.filter((item) => item.alert !== undefined).map((item) => item.path)).toEqual([
    "/admin/legal",
  ]);
});
