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
};

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
    permission: "categories:manage",
    titleKey: "admin.section.categories.title",
    bodyKey: "admin.section.categories.body",
  },
  {
    id: "attributes",
    path: "/admin/attributes",
    permission: "categories:manage",
    titleKey: "admin.section.attributes.title",
    bodyKey: "admin.section.attributes.body",
  },
  {
    id: "images",
    path: "/admin/images",
    permission: "categories:manage",
    titleKey: "admin.section.images.title",
    bodyKey: "admin.section.images.body",
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
