import {
  BadgeCheck,
  Bell,
  BookOpen,
  Building2,
  CircleUser,
  ClipboardList,
  Cog,
  Flag,
  FolderTree,
  Gauge,
  Globe2,
  Heart,
  HelpCircle,
  KeyRound,
  LayoutDashboard,
  LifeBuoy,
  ListChecks,
  MapPin,
  MessageSquare,
  PlusCircle,
  ScrollText,
  Settings,
  Shield,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  Users,
} from "lucide-react";

import type { NavItem, Panel, PanelAuthContext, PanelId } from "./panels.types";

/**
 * The panel/nav configuration — the single source of truth for the shell's
 * navigation. See docs/features/panels.md.
 *
 * Marketplace's items are NOT listed here: they are the live category tree,
 * read from public.categories at render time by the rail.
 */
export const PANELS: Record<PanelId, Panel> = {
  marketplace: {
    id: "marketplace",
    labelKey: "panel.marketplace",
    icon: Store,
    items: [],
  },
  "my-listings": {
    id: "my-listings",
    labelKey: "panel.myListings",
    icon: ClipboardList,
    items: [
      { id: "ml-dashboard", labelKey: "nav.dashboard", icon: LayoutDashboard },
      { id: "ml-post", labelKey: "nav.postListing", icon: PlusCircle },
      { id: "ml-listings", labelKey: "nav.myListings", icon: ListChecks },
      { id: "ml-messages", labelKey: "nav.messages", icon: MessageSquare },
      { id: "ml-featured", labelKey: "nav.featured", icon: Sparkles },
      { id: "ml-settings", labelKey: "nav.settings", icon: Settings, path: "/settings" },
    ],
  },
  account: {
    id: "account",
    labelKey: "panel.account",
    icon: CircleUser,
    items: [
      { id: "ac-overview", labelKey: "nav.overview", icon: Gauge },
      { id: "ac-saved", labelKey: "nav.saved", icon: Heart },
      { id: "ac-activity", labelKey: "nav.activity", icon: ScrollText },
      { id: "ac-notifications", labelKey: "nav.notifications", icon: Bell },
      { id: "ac-addresses", labelKey: "nav.addresses", icon: MapPin },
      { id: "ac-profile", labelKey: "nav.profile", icon: CircleUser },
      // P1-f already owns this surface — link to it, never rebuild it.
      { id: "ac-security", labelKey: "nav.signInSecurity", icon: KeyRound, path: "/settings" },
      { id: "ac-settings", labelKey: "nav.settings", icon: Settings, path: "/settings" },
      { id: "ac-help", labelKey: "nav.help", icon: HelpCircle },
    ],
  },
  admin: {
    id: "admin",
    labelKey: "panel.admin",
    icon: Shield,
    items: [
      {
        id: "ad-dashboard",
        labelKey: "nav.dashboard",
        icon: LayoutDashboard,
        section: "navSection.menu",
        requiredPermission: "admin.dashboard.view",
      },
      {
        id: "ad-users",
        labelKey: "nav.users",
        icon: Users,
        section: "navSection.identity",
        requiredPermission: "identity.users.view",
      },
      {
        id: "ad-verification",
        labelKey: "nav.verification",
        icon: BadgeCheck,
        section: "navSection.identity",
        requiredPermission: "identity.verification.view",
      },
      {
        id: "ad-roles",
        labelKey: "nav.roles",
        icon: ShieldCheck,
        section: "navSection.accessControl",
        requiredPermission: "access.roles.view",
      },
      {
        id: "ad-permissions",
        labelKey: "nav.permissions",
        icon: KeyRound,
        section: "navSection.accessControl",
        requiredPermission: "access.permissions.view",
      },
      {
        id: "ad-reports",
        labelKey: "nav.reports",
        icon: Flag,
        section: "navSection.moderation",
        requiredPermission: "moderation.reports.view",
      },
      {
        id: "ad-screening",
        labelKey: "nav.screeningQueue",
        icon: ShieldCheck,
        section: "navSection.moderation",
        requiredPermission: "moderation.screening.view",
      },
      {
        id: "ad-listings",
        labelKey: "nav.allListings",
        icon: ShoppingBag,
        section: "navSection.marketplace",
        requiredPermission: "marketplace.listings.view",
      },
      {
        id: "ad-categories",
        labelKey: "nav.categories",
        icon: FolderTree,
        section: "navSection.marketplace",
        requiredPermission: "marketplace.categories.view",
      },
      {
        id: "ad-locations",
        labelKey: "nav.locations",
        icon: Globe2,
        section: "navSection.marketplace",
        requiredPermission: "marketplace.locations.view",
      },
      {
        id: "ad-pages",
        labelKey: "nav.pages",
        icon: BookOpen,
        section: "navSection.content",
        requiredPermission: "content.pages.view",
      },
      {
        id: "ad-translations",
        labelKey: "nav.translations",
        icon: Globe2,
        section: "navSection.content",
        requiredPermission: "content.translations.view",
      },
      {
        id: "ad-tickets",
        labelKey: "nav.supportTickets",
        icon: LifeBuoy,
        section: "navSection.support",
        requiredPermission: "support.tickets.view",
      },
      {
        id: "ad-organisation",
        labelKey: "nav.organisation",
        icon: Building2,
        section: "navSection.system",
        requiredPermission: "system.organisation.view",
      },
      {
        id: "ad-system-settings",
        labelKey: "nav.systemSettings",
        icon: Cog,
        section: "navSection.system",
        requiredPermission: "system.settings.view",
      },
    ],
  },
};

/**
 * The ordered panels this user may see.
 *   logged out            -> [marketplace]
 *   logged in, non-admin  -> [marketplace, my-listings, account]
 *   admin                 -> all four
 * Marketplace is always first and always present.
 */
export function panelsForUser(auth: PanelAuthContext): Panel[] {
  const panels: Panel[] = [PANELS.marketplace];
  if (auth.isAuthenticated) {
    panels.push(PANELS["my-listings"], PANELS.account);
  }
  if (auth.isAdmin) {
    panels.push(PANELS.admin);
  }
  return panels;
}

/** Items the user may see: anything gated by a permission they lack is dropped. */
export function visibleItems(items: readonly NavItem[], auth: PanelAuthContext): NavItem[] {
  return items
    .filter((item) => !item.requiredPermission || auth.permissions.includes(item.requiredPermission))
    .map((item) => (item.children ? { ...item, children: visibleItems(item.children, auth) } : item));
}
