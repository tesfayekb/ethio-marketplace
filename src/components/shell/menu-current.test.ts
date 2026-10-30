import { describe, expect, it } from "vitest";

import { categoryPath, isCurrentAt } from "./menu-current";

const at = (pathname: string, hash = "") => ({ pathname, hash });

describe("MCU-1 one current-item rule for every menu (R1d-c)", () => {
  it("Home is current on / and only there", () => {
    expect(isCurrentAt({ path: "/" }, at("/"))).toBe(true);
    expect(isCurrentAt({ path: "/" }, at("/c/vehicles"))).toBe(false);
    expect(isCurrentAt({ path: "/" }, at("/account"))).toBe(false);
  });
  it("a path is current on itself and beneath it, never on a sibling sharing its prefix", () => {
    expect(isCurrentAt({ path: "/admin/users" }, at("/admin/users"))).toBe(true);
    expect(isCurrentAt({ path: "/admin/users" }, at("/admin/users/42"))).toBe(true);
    expect(isCurrentAt({ path: "/admin/users" }, at("/admin/users-import"))).toBe(false);
    expect(isCurrentAt({}, at("/admin/users"))).toBe(false);
  });
  it("an anchored item needs the path and the hash exactly", () => {
    expect(isCurrentAt({ path: "/settings", hash: "security" }, at("/settings", "security"), true)).toBe(true);
    expect(isCurrentAt({ path: "/settings" }, at("/settings", "security"), true)).toBe(false);
    expect(isCurrentAt({ path: "/settings" }, at("/settings"), true)).toBe(true);
  });
  it("a category's page is its own path", () => {
    expect(isCurrentAt({ path: categoryPath("vehicles") }, at("/c/vehicles"))).toBe(true);
    expect(isCurrentAt({ path: categoryPath("vehicles") }, at("/c/vehicles-parts"))).toBe(false);
  });
});
