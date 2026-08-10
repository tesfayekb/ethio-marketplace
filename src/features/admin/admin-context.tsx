import { createContext, useContext, useMemo, type ReactNode } from "react";

/**
 * The admin shell's permission carrier.
 *
 * The RBAC seam (src/features/permissions) may only be imported by the admin
 * ROUTE chunk and the shell gate (scripts/check-browse-imports.sh). So the
 * route reads permissions once — the same cached read the shell already made —
 * and hands them down here. No new permission fetch exists anywhere.
 */
type AdminShellValue = {
  /** 'resource:action' slugs held by the signed-in user. */
  permissions: readonly string[];
  /** True when a deep link was refused and the landing must say so. */
  accessDenied: boolean;
};

const AdminShellContext = createContext<AdminShellValue | null>(null);

export function AdminShellProvider({
  permissions,
  accessDenied,
  children,
}: AdminShellValue & { children: ReactNode }) {
  const value = useMemo<AdminShellValue>(
    () => ({ permissions, accessDenied }),
    [permissions, accessDenied],
  );
  return <AdminShellContext.Provider value={value}>{children}</AdminShellContext.Provider>;
}

export function useAdminShell(): AdminShellValue {
  const ctx = useContext(AdminShellContext);
  if (!ctx) throw new Error("useAdminShell must be used within <AdminShellProvider>");
  return ctx;
}
