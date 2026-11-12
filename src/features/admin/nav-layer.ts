import { provideAdminNav, type AdminNavLayer } from "@/components/shell/admin-nav-layer";

import { useNavAlerts } from "./nav-alerts";
import { ADMIN_NAV_ITEMS } from "./rail-items";
import { ADMIN_GROUPS, ADMIN_SECTIONS, groupForSection } from "./sections";

/**
 * INC-1042 (housekeeping turn 4) — THE ADMIN NAVIGATION LAYER: what the shell shows of
 * the admin sections (src/components/shell/admin-nav-layer.ts), derived from
 * sections.ts and never a second list. It rides the admin layout's chunk, never a
 * public page's first download (BC-16).
 */
export const ADMIN_NAV_LAYER: AdminNavLayer = {
  items: ADMIN_NAV_ITEMS,
  sections: ADMIN_SECTIONS.map((section) => ({
    path: section.path,
    titleKey: section.titleKey,
    permission: section.permission,
    group: groupForSection(section),
  })),
  groups: Object.values(ADMIN_GROUPS),
  useNavAlerts,
};

// The router runs the admin layout's chunk before it draws an admin page, so the shell
// holds the layer in that page's first render.
provideAdminNav(ADMIN_NAV_LAYER);
