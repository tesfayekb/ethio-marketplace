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
     * DERIVED from src/features/admin/sections.ts (U0b, INC-069): the admin
     * panel surfaces its sections through the SAME shell panel-item seam as
     * Account and My Listings — no panel carries its own parallel navigation.
     * visibleItems() filters them with the permissions the shell already read.
     */
    items: [...ADMIN_NAV_ITEMS],
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
