import { useRouterState } from "@tanstack/react-router";
import { useSyncExternalStore } from "react";

import { useShell } from "@/components/shell-context";
import type { NavAlertId, NavItem } from "@/config/panels.types";
import type { MessageKey } from "@/i18n";

/**
 * INC-1042 (housekeeping turn 4, rulings 1 Q5 and 2) — THE ADMIN NAVIGATION LAYER. The admin
 * sections, the admin panel's rail items and the menu alerts are one module,
 * src/features/admin/nav-layer.ts, that no public page downloads (BC-16,
 * scripts/bundle-closure.mjs). The shell's breadcrumbs and rail are ANCESTORS of the
 * admin layout's outlet, so no context of that layout reaches them: the layer hands
 * itself to this store when its module runs, and the shell reads the store.
 *
 * The admin layout's chunk carries it (src/routes/admin.tsx reads its section from the
 * layer), and the router loads a matched route's chunk before it draws the route: on the
 * server, before the client hydrates and before a client navigation commits — so an
 * admin page's crumbs and rail are in the server's HTML and in the first client render,
 * with no flicker. The shell loads nothing itself: the admin panel is active only under
 * /admin (panelOf, menu-current.ts), where that chunk is always in.
 *
 * DEC-258's model: a route declares that its screens show the layer
 * (`staticData: { adminNav: true }`), as it declares its strings layers.
 */
declare module "@tanstack/react-router" {
  interface StaticDataRouteOption {
    /** The route's screens are admin screens: the shell shows the admin navigation layer. */
    adminNav?: true;
  }
}

/**
 * Bundle 22 turn 20 (DEC-219) — the words each menu alert adds to its entry's accessible name.
 * The rail draws them outside the strings gate (src/routes/__root.tsx), so their keys are
 * base keys and the map is the shell's (housekeeping turn 4, ruling 3).
 */
export const NAV_ALERT_LABELS: Readonly<Record<NavAlertId, MessageKey>> = {
  legalReview: "admin.nav.alert.legalReview",
};

/** A menu group, as the crumbs show it: its name, and its own page when it has one. */
export type AdminNavGroup = { readonly titleKey: MessageKey; readonly path?: string };

/** A section, as the layout and the crumbs read it. */
export type AdminNavSection = {
  readonly path: string;
  readonly titleKey: MessageKey;
  readonly permission: string;
  readonly group: AdminNavGroup | null;
};

export type AdminNavLayer = {
  /** The admin panel's rail items, grouped (src/features/admin/rail-items.ts). */
  readonly items: readonly NavItem[];
  readonly sections: readonly AdminNavSection[];
  readonly groups: readonly AdminNavGroup[];
  /** The menu's alerts (src/features/admin/nav-alerts.ts). */
  readonly useNavAlerts: (
    enabled: boolean,
    permissions: readonly string[],
  ) => ReadonlySet<NavAlertId>;
};

/** The section that owns a pathname (its own path or a page below it), or null. */
export function sectionAt<S extends { readonly path: string }>(
  sections: readonly S[],
  pathname: string,
): S | null {
  return (
    sections.find(
      (section) => pathname === section.path || pathname.startsWith(`${section.path}/`),
    ) ?? null
  );
}

/** The group whose own page is exactly this pathname, or null. */
export function groupAt<G extends AdminNavGroup>(groups: readonly G[], pathname: string): G | null {
  return groups.find((group) => group.path !== undefined && group.path === pathname) ?? null;
}

let provided: AdminNavLayer | null = null;
const listeners = new Set<() => void>();

/** The layer's module hands itself over when it runs (src/features/admin/nav-layer.ts). */
export function provideAdminNav(layer: AdminNavLayer): void {
  if (provided === layer) return;
  provided = layer;
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function current(): AdminNavLayer | null {
  return provided;
}

/**
 * The layer while the shell shows the admin navigation — a matched route declares it,
 * or the active panel is the admin panel — and null otherwise or before the layout's chunk
 * ran (the crumbs then show Home › Admin, the rail no admin item).
 */
export function useAdminNav(): AdminNavLayer | null {
  const declared = useRouterState({
    select: (state) => state.matches.some((match) => match.staticData.adminNav === true),
  });
  const { activePanel } = useShell();
  const asked = declared || activePanel === "admin";
  const layer = useSyncExternalStore(subscribe, current, current);
  return asked ? layer : null;
}
