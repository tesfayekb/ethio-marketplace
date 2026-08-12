import {
  FolderTree,
  Globe2,
  Image,
  ScrollText,
  ShieldCheck,
  SlidersHorizontal,
  Users,
  type LucideIcon,
} from "lucide-react";

import type { NavItem } from "@/config/panels.types";

import { ADMIN_SECTIONS, type AdminSectionId } from "./sections";

/**
 * The Admin panel's shell rail/drawer items (U0b, INC-069).
 *
 * DERIVED, never a second list: sections.ts stays the single source of truth
 * for which sections exist, their order, their route and their permission.
 * This module only adds the presentation layer's glyph opinion, exactly as
 * src/config/panels.ts does for category slugs.
 *
 * Law F3: `requiredPermission` decides what the shell RENDERS. The server
 * (RLS / has_permission) remains the sole authorization authority.
 */
const SECTION_ICONS: Record<AdminSectionId, LucideIcon> = {
  users: Users,
  roles: ShieldCheck,
  audit: ScrollText,
  locations: Globe2,
  categories: FolderTree,
  attributes: SlidersHorizontal,
  images: Image,
};

export const ADMIN_NAV_ITEMS: readonly NavItem[] = ADMIN_SECTIONS.map((section) => ({
  id: `ad-${section.id}`,
  labelKey: section.titleKey,
  icon: SECTION_ICONS[section.id],
  path: section.path,
  requiredPermission: section.permission,
}));
