import { useRouterState } from "@tanstack/react-router";
import { useMemo } from "react";

/**
 * R1d-c (R1d Item 3) — ONE RULE FOR "THE CURRENT ITEM" IN EVERY MENU: the category list,
 * the admin, account and seller menus, their side panels and the phone strip. An item is
 * current when the URL's path is its path or lies beneath it; an ANCHORED item (a section
 * of a page another item owns, U6-C1-R3a) is current only when the path and the hash both
 * match exactly, so exactly one item is ever current. "/" is current on "/" alone.
 */
export type MenuTarget = { path?: string; hash?: string };
export type MenuAt = { pathname: string; hash: string };

export function isCurrentAt(target: MenuTarget, at: MenuAt, anchored = false): boolean {
  const path = target.path;
  if (path === undefined) return false;
  if (anchored) return at.pathname === path && at.hash === (target.hash ?? "");
  if (path === "/") return at.pathname === "/";
  return at.pathname === path || at.pathname.startsWith(`${path}/`);
}

/** The category page's own path (the category list's items). */
export const categoryPath = (slug: string) => `/c/${encodeURIComponent(slug)}`;

/**
 * The router's Link marks itself `aria-current="page"` by its own matching, which would
 * overrule this rule (it lit "Sign-in and security" on /settings). Every menu row's Link
 * takes these options, so the router's own mark is only ever a subset of this rule's.
 */
export const MENU_LINK_ACTIVE = { exact: true, includeHash: true, includeSearch: false } as const;

/** The part of the router's state the chosen mark reads (a structural subset). */
export type MenuAtState = {
  status: string;
  location: { pathname: string; hash: string };
  matches: ReadonlyArray<{ routeId: string; pathname: string }>;
};

/**
 * D263/D271 (turn C2, DEC-317 item 1) — THE CHOSEN MARK MOVES AT ONCE. While a navigation is
 * in flight the router's location is already the chosen page; the frame still reads the shown
 * page (useShownPathname, INC-581), but a menu item's mark reads the chosen one. Once the
 * navigation settles — or a later one supersedes it — the location and the shown page agree
 * again, so a cancelled choice brings the old mark back by itself. Returned as one string,
 * `pathname#hash`, so the selector's result compares by value.
 */
export function menuAtOf(state: MenuAtState): string {
  const hash = state.location.hash.replace(/^#/, "");
  if (state.status === "pending") return `${state.location.pathname}#${hash}`;
  const leaf = state.matches[state.matches.length - 1];
  const shown =
    leaf !== undefined && leaf.routeId !== "__root__" ? leaf.pathname : state.location.pathname;
  return `${shown}#${hash}`;
}

/** Splits menuAtOf's string back into the rule's place. */
export function parseMenuAt(key: string): MenuAt {
  const cut = key.indexOf("#");
  return { pathname: key.slice(0, cut), hash: key.slice(cut + 1) };
}

/** The place every menu's current mark reads (isCurrentAt's `at`). */
export function useMenuAt(): MenuAt {
  const key = useRouterState({ select: menuAtOf });
  return useMemo(() => parseMenuAt(key), [key]);
}
