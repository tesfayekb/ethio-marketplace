import type { MessageKey } from "@/i18n";

/**
 * The admin epoch's section register (DEC-014, U0).
 *
 * ONE source of truth: nav, breadcrumbs, the landing grid, the deep-link guard
 * and every section page read this list. Components never name a section.
 *
 * Law F3: `permission` decides what the UI RENDERS. The server (RLS /
 * has_permission) remains the sole authorization authority for every action a
 * section will later perform.
 *
 * TAGS (REQ-041) is INTENTIONALLY ABSENT until U7 creates its own resource and
 * permission. It must never be gated on a borrowed permission.
 */
type AdminSectionShape = {
  readonly id: string;
  readonly path: string;
  readonly permission: string;
  readonly titleKey: MessageKey;
  readonly bodyKey: MessageKey;
  /**
   * C3-UX-2 — the MENU GROUP this section hangs under, when it has one. The
   * group is presentation only: it carries NO permission of its own and every
   * sub-item keeps its own gate (law F3 unchanged).
   */
  readonly group?: AdminGroupId;
};

/** The admin nav's groups. Brands and Tags join `categories` when they land. */
export const ADMIN_GROUPS = {
  // IE-1r PART C — the LABEL is "Catalog"; the id, route and testid carrier
  // (`admin-group-categories`) are unchanged.
  categories: { id: "categories", titleKey: "admin.nav.group.catalog" },
} as const satisfies Record<string, { readonly id: string; readonly titleKey: MessageKey }>;

export type AdminGroupId = keyof typeof ADMIN_GROUPS;

export const ADMIN_SECTIONS = [
  {
    id: "users",
    path: "/admin/users",
    permission: "profiles:view",
    titleKey: "admin.section.users.title",
    bodyKey: "admin.section.users.body",
  },
  {
    id: "roles",
    path: "/admin/roles",
    permission: "roles:view",
    titleKey: "admin.section.roles.title",
    bodyKey: "admin.section.roles.body",
  },
  {
    id: "audit",
    path: "/admin/audit",
    permission: "audit_logs:view",
    titleKey: "admin.section.audit.title",
    bodyKey: "admin.section.audit.body",
  },
  {
    id: "locations",
    path: "/admin/locations",
    permission: "locations:manage",
    titleKey: "admin.section.locations.title",
    bodyKey: "admin.section.locations.body",
  },
  {
    id: "categories",
    path: "/admin/categories",
    permission: "categories:view",
    titleKey: "admin.section.categories.title",
    bodyKey: "admin.section.categories.body",
    group: "categories",
  },
  {
    id: "attributes",
    path: "/admin/attributes",
    permission: "categories:view",
    titleKey: "admin.section.attributes.title",
    bodyKey: "admin.section.attributes.body",
    group: "categories",
  },
  {
    id: "images",
    path: "/admin/images",
    permission: "categories:view",
    titleKey: "admin.section.images.title",
    bodyKey: "admin.section.images.body",
    group: "categories",
  },
  {
    id: "translations",
    path: "/admin/translations",
    permission: "translations:view",
    titleKey: "admin.section.translations.title",
    bodyKey: "admin.section.translations.body",
  },
] as const satisfies readonly AdminSectionShape[];

export type AdminSection = (typeof ADMIN_SECTIONS)[number];
export type AdminSectionId = AdminSection["id"];

/** The section that owns a pathname, or null for the landing / unknown paths. */
export function sectionForPath(pathname: string): AdminSection | null {
  return (
    ADMIN_SECTIONS.find(
      (section) => pathname === section.path || pathname.startsWith(`${section.path}/`),
    ) ?? null
  );
}

/** Section id → its page's own section record (used by each section route). */
export function sectionById(id: AdminSectionId): AdminSection {
  const found = ADMIN_SECTIONS.find((section) => section.id === id);
  // Law F4 — a missing section is a programming error, never a silent blank.
  if (!found) throw new Error(`[admin] unknown section id: ${id}`);
  return found;
}

/** The group a section hangs under, or null when it sits at the top level. */
export function groupForSection(section: AdminSection) {
  const id = sectionGroupId(section);
  return id ? ADMIN_GROUPS[id] : null;
}

/** The declared group id of a section (the literal union hides the optional). */
export function sectionGroupId(section: AdminSection): AdminGroupId | null {
  return (section as { group?: AdminGroupId }).group ?? null;
}
