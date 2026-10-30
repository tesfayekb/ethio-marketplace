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
