import { describe, expect, it } from "vitest";

import { categoryPath, isCurrentAt, menuAtOf, panelOf, parseMenuAt } from "./menu-current";

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
    expect(
      isCurrentAt({ path: "/settings", hash: "security" }, at("/settings", "security"), true),
    ).toBe(true);
    expect(isCurrentAt({ path: "/settings" }, at("/settings", "security"), true)).toBe(false);
    expect(isCurrentAt({ path: "/settings" }, at("/settings"), true)).toBe(true);
  });
  it("a category's page is its own path", () => {
    expect(isCurrentAt({ path: categoryPath("vehicles") }, at("/c/vehicles"))).toBe(true);
    expect(isCurrentAt({ path: categoryPath("vehicles") }, at("/c/vehicles-parts"))).toBe(false);
  });
});

describe("useMenuAt's place (turn C2, D263/D271)", () => {
  const match = (pathname: string) => ({ routeId: `/r${pathname}`, pathname });
  it("MA-U1: while a navigation is pending, the chosen page is the mark's place", () => {
    const key = menuAtOf({
      status: "pending",
      location: { pathname: "/settings", hash: "#security" },
      matches: [{ routeId: "__root__", pathname: "/" }, match("/account")],
    });
    expect(parseMenuAt(key)).toEqual({ pathname: "/settings", hash: "security" });
    expect(isCurrentAt({ path: "/settings", hash: "security" }, parseMenuAt(key), true)).toBe(true);
    expect(isCurrentAt({ path: "/account" }, parseMenuAt(key))).toBe(false);
  });
  it("MA-U2: once settled, the shown page is the place (the frame's page)", () => {
    const key = menuAtOf({
      status: "idle",
      location: { pathname: "/settings", hash: "" },
      matches: [{ routeId: "__root__", pathname: "/" }, match("/account")],
    });
    expect(parseMenuAt(key)).toEqual({ pathname: "/account", hash: "" });
  });
  it("MA-U3: a cancelled choice brings the old place back — the next state names it again", () => {
    const shown = [{ routeId: "__root__", pathname: "/" }, match("/account")];
    const chosen = menuAtOf({
      status: "pending",
      location: { pathname: "/settings", hash: "" },
      matches: shown,
    });
    const back = menuAtOf({
      status: "idle",
      location: { pathname: "/account", hash: "" },
      matches: shown,
    });
    expect(parseMenuAt(chosen).pathname).toBe("/settings");
    expect(parseMenuAt(back).pathname).toBe("/account");
    // A page no route matched commits the root alone: the location names it.
    expect(
      parseMenuAt(
        menuAtOf({
          status: "idle",
          location: { pathname: "/nope", hash: "" },
          matches: [{ routeId: "__root__", pathname: "/" }],
        }),
      ).pathname,
    ).toBe("/nope");
  });
});

describe("panelOf — the one section rule (turn C fix 1, INC-359)", () => {
  it("PO-U1: the posting pages and /my-listings belong to My Listings", () => {
    for (const p of ["/post", "/post/abc", "/my-listings", "/my-listings/x"])
      expect(panelOf(p), p).toBe("my-listings");
    expect(panelOf("/poster")).toBeNull();
  });
  it("PO-U2: account, settings and admin; the feed and sign-in own no section", () => {
    expect(panelOf("/account")).toBe("account");
    expect(panelOf("/settings/x")).toBe("account");
    expect(panelOf("/admin/users")).toBe("admin");
    for (const p of ["/", "/c/cars", "/auth"]) expect(panelOf(p), p).toBeNull();
  });
});
