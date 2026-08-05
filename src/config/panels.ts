import {
  Baby,
  BadgeCheck,
  Bell,
  BookOpen,
  Briefcase,
  Building2,
  Car,
  CircleUser,
  ClipboardList,
  Cog,
  Cpu,
  Dumbbell,
  Flag,
  FolderTree,
  Gauge,
  Globe2,
  Heart,
  HelpCircle,
  Home,
  KeyRound,
  LayoutDashboard,
  LifeBuoy,
  ListChecks,
  MapPin,
  MessageSquare,
  PawPrint,
  PlusCircle,
  ScrollText,
  Settings,
  Shield,
  ShieldCheck,
  Shirt,
  ShoppingBag,
  Smartphone,
  Sofa,
  Sparkles,
  Store,
  Tag,
  Users,
  Wheat,
  Wrench,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

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
      {
        id: "ml-manage",
        labelKey: "navSection.manage",
        icon: Settings,
        children: [
          { id: "ml-settings", labelKey: "settings.navLabel", icon: Settings, path: "/settings" },
        ],
      },
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
      { id: "ac-settings", labelKey: "settings.navLabel", icon: Settings, path: "/settings" },
      { id: "ac-help", labelKey: "nav.help", icon: HelpCircle },
    ],
  },
  admin: {
    id: "admin",
    labelKey: "panel.admin",
    icon: Shield,
    /**
     * Admin nav is NESTED, not flat: each former `section` is now a parent
     * item carrying its members as `children`, so the rail renders it as an
     * expand/collapse submenu. Parents hold no permission of their own — a
     * parent disappears automatically once every child it owns is filtered
     * out (see visibleItems). Law F3 is untouched: this is UI shaping only.
     */
    items: [
      {
        id: "ad-dashboard",
        labelKey: "nav.dashboard",
        icon: LayoutDashboard,
        requiredPermission: "admin.dashboard.view",
      },
      {
        id: "ad-identity",
        labelKey: "navSection.identity",
        icon: Users,
        children: [
          {
            id: "ad-users",
            labelKey: "nav.users",
            icon: Users,
            requiredPermission: "identity.users.view",
          },
          {
            id: "ad-verification",
            labelKey: "nav.verification",
            icon: BadgeCheck,
            requiredPermission: "identity.verification.view",
          },
        ],
      },
      {
        id: "ad-access",
        labelKey: "navSection.accessControl",
        icon: ShieldCheck,
        children: [
          {
            id: "ad-roles",
            labelKey: "nav.roles",
            icon: ShieldCheck,
            requiredPermission: "access.roles.view",
          },
          {
            id: "ad-permissions",
            labelKey: "nav.permissions",
            icon: KeyRound,
            requiredPermission: "access.permissions.view",
          },
        ],
      },
      {
        id: "ad-moderation",
        labelKey: "navSection.moderation",
        icon: Flag,
        children: [
          {
            id: "ad-reports",
            labelKey: "nav.reports",
            icon: Flag,
            requiredPermission: "moderation.reports.view",
          },
          {
            id: "ad-screening",
            labelKey: "nav.screeningQueue",
            icon: ShieldCheck,
            requiredPermission: "moderation.screening.view",
          },
        ],
      },
      {
        id: "ad-marketplace",
        labelKey: "navSection.marketplace",
        icon: ShoppingBag,
        children: [
          {
            id: "ad-listings",
            labelKey: "nav.allListings",
            icon: ShoppingBag,
            requiredPermission: "marketplace.listings.view",
          },
          {
            id: "ad-categories",
            labelKey: "nav.categories",
            icon: FolderTree,
            requiredPermission: "marketplace.categories.view",
          },
          {
            id: "ad-locations",
            labelKey: "nav.locations",
            icon: Globe2,
            requiredPermission: "marketplace.locations.view",
          },
        ],
      },
      {
        id: "ad-content",
        labelKey: "navSection.content",
        icon: BookOpen,
        children: [
          {
            id: "ad-pages",
            labelKey: "nav.pages",
            icon: BookOpen,
            requiredPermission: "content.pages.view",
          },
          {
            id: "ad-translations",
            labelKey: "nav.translations",
            icon: Globe2,
            requiredPermission: "content.translations.view",
          },
        ],
      },
      {
        id: "ad-support",
        labelKey: "navSection.support",
        icon: LifeBuoy,
        children: [
          {
            id: "ad-tickets",
            labelKey: "nav.supportTickets",
            icon: LifeBuoy,
            requiredPermission: "support.tickets.view",
          },
        ],
      },
      {
        id: "ad-system",
        labelKey: "navSection.system",
        icon: Cog,
        children: [
          {
            id: "ad-organisation",
            labelKey: "nav.organisation",
            icon: Building2,
            requiredPermission: "system.organisation.view",
          },
          {
            id: "ad-system-settings",
            labelKey: "nav.systemSettings",
            icon: Cog,
            requiredPermission: "system.settings.view",
          },
        ],
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
  return (
    items
      .filter(
        (item) => !item.requiredPermission || auth.permissions.includes(item.requiredPermission),
      )
      .map((item) =>
        item.children ? { ...item, children: visibleItems(item.children, auth) } : item,
      )
      // A group whose every member was filtered out is not an empty heading —
      // it disappears entirely.
      .filter((item) => !item.children || item.children.length > 0)
  );
}

/**
 * PER-CATEGORY ICON MAP (slug -> lucide glyph).
 *
 * Categories are DATA (public.categories), so they cannot carry a component in
 * the database. This map is the presentation layer's opinion about the seeded
 * top-level slugs, so a collapsed icon-only rail is readable WITHOUT hovering
 * (INC-039: every category previously rendered the same Tag glyph).
 *
 * Unmapped slugs (new categories, subcategories) fall back to Tag — the rail
 * still has a glyph on the single gutter, so nothing shifts.
 */
export const CATEGORY_ICONS: Record<string, LucideIcon> = {
  vehicles: Car,
  "real-estate": Home,
  property: Home,
  electronics: Cpu,
  "phones-tablets": Smartphone,
  "home-furniture": Sofa,
  "home-garden": Sofa,
  "fashion-clothing": Shirt,
  fashion: Shirt,
  "health-beauty": Sparkles,
  "baby-kids": Baby,
  "sports-hobbies": Dumbbell,
  "pets-animals": PawPrint,
  "business-industrial": Briefcase,
  jobs: Briefcase,
  services: Wrench,
  agriculture: Wheat,
  food: Wheat,
  education: BookOpen,
  books: BookOpen,
};

/** The glyph for a category slug; Tag when the slug is not mapped. */
export function categoryIcon(slug: string | null | undefined): LucideIcon {
  return (slug ? CATEGORY_ICONS[slug] : undefined) ?? Tag;
}
