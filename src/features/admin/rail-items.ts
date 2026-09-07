import {
  FolderTree,
  Globe2,
  Image,
  Languages,
  ScrollText,
  ShieldCheck,
  SlidersHorizontal,
  Users,
  type LucideIcon,
} from "lucide-react";

import type { NavItem } from "@/config/panels.types";

import {
  ADMIN_GROUPS,
  ADMIN_SECTIONS,
  sectionGroupId,
  type AdminGroupId,
  type AdminSection,
  type AdminSectionId,
} from "./sections";

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
  translations: Languages,
};

const GROUP_ICONS: Record<AdminGroupId, LucideIcon> = {
  categories: FolderTree,
};

function toItem(section: AdminSection): NavItem {
  return {
    id: `ad-${section.id}`,
    labelKey: section.titleKey,
    icon: SECTION_ICONS[section.id],
    path: section.path,
    requiredPermission: section.permission,
  };
}

/**
 * C3-UX-2 — GROUPED, still derived. A section that declares a group folds into
 * ONE parent item at the position of the group's first member; the group holds
 * no permission of its own, so `visibleItems` drops it only when every child
 * was filtered out (law F3: each sub-item keeps its own gate).
 */
export const ADMIN_NAV_ITEMS: readonly NavItem[] = (() => {
  const items: NavItem[] = [];
  const groups = new Map<AdminGroupId, NavItem>();
  for (const section of ADMIN_SECTIONS) {
    const groupId = sectionGroupId(section);
    if (!groupId) {
      items.push(toItem(section));
      continue;
    }
    let group = groups.get(groupId);
    if (!group) {
      group = {
        id: `ad-group-${groupId}`,
        testid: `admin-group-${groupId}`,
        labelKey: ADMIN_GROUPS[groupId].titleKey,
        icon: GROUP_ICONS[groupId],
        defaultOpen: true,
        children: [],
      };
      groups.set(groupId, group);
      items.push(group);
    }
    group.children!.push(toItem(section));
  }
  return items;
})();
