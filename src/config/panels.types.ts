import type { LucideIcon } from "lucide-react";

import type { MessageKey } from "@/i18n";

/** The four surfaces a user can be inside. Marketplace is always available. */
export type PanelId = "marketplace" | "my-listings" | "account" | "admin";

/**
 * Permission slug required to see a nav item. Strings, not an enum: the real
 * RBAC vocabulary is owned by the (not yet built) permissions table, and the
 * shell must not become a second source of truth for it.
 */
export type Permission = string;

export interface NavItem {
  id: string;
  labelKey: MessageKey;
  icon?: LucideIcon;
  /** Absolute route path. Absent = placeholder item (its page is a later feature). */
  path?: string;
  /** Section heading this item sits under (admin nav is sectioned). */
  section?: MessageKey;
  /** When set, the item renders only if the user holds this permission. */
  requiredPermission?: Permission;
  children?: NavItem[];
}

export interface Panel {
  id: PanelId;
  labelKey: MessageKey;
  icon: LucideIcon;
  /**
   * The route this panel OWNS (U0e, INC-071). Activating a panel navigates
   * here, so the route-derived `activePanel` and the rendered body always
   * agree. `null` = the panel has no route yet (grandfathered state path).
   */
  homePath: string | null;
  items: NavItem[];
}

/**
 * What the panel config is allowed to know about the current user.
 *
 * Authorization doctrine (law F3): this drives what the UI *renders*. It is a
 * convenience only — the server (RLS / has_permission) remains the sole
 * authority for what the user may actually do.
 */
export interface PanelAuthContext {
  isAuthenticated: boolean;
  isAdmin: boolean;
  permissions: readonly Permission[];
}
