import { useMemo, type ReactNode } from "react";

import { AdminShellContext, type AdminShellValue } from "./admin-context";

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
