import { expect, it } from "vitest";
import type { NavItem } from "@/config/panels.types";
import { ADMIN_LEGAL_KEY } from "./legal/use-legal";
import { LEGAL_REVIEW_OVERDUE_KEY } from "./nav-alerts";
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

it("keeps the legal review mark under the admin legal query key", () => {
  expect(LEGAL_REVIEW_OVERDUE_KEY.slice(0, ADMIN_LEGAL_KEY.length)).toEqual([...ADMIN_LEGAL_KEY]);
});
