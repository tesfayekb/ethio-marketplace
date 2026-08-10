import { useAdminShell } from "./admin-context";
import { ADMIN_SECTIONS, type AdminSection } from "./sections";

/**
 * The sections this user may see. Purely derived from the permissions the
 * admin route already read — this hook never fetches.
 */
export function useAdminSections(): {
  sections: AdminSection[];
  can: (permission: string) => boolean;
} {
  const { permissions } = useAdminShell();
  const can = (permission: string) => permissions.includes(permission);
  return {
    sections: ADMIN_SECTIONS.filter((section) => can(section.permission)),
    can,
  };
}
