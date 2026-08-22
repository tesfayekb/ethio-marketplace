import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { AUTH_DERIVED_ROOT } from "@/lib/query-keys";

import {
  createRole,
  deleteRole,
  getRole,
  listRolesDetailed,
  setRolePermission,
  updateRole,
  type CreateRoleInput,
} from "./roles-service";

/**
 * U1g-3 purge law: the key starts at AUTH_DERIVED_ROOT so a sign-out purges
 * every roles-console read with one removeQueries().
 */
export const ADMIN_ROLES_KEY = [AUTH_DERIVED_ROOT, "admin", "roles"] as const;

export function useAdminRolesDetailed() {
  return useQuery({
    queryKey: [...ADMIN_ROLES_KEY, "list"],
    queryFn: listRolesDetailed,
    staleTime: 30_000,
  });
}

export function useAdminRole(roleId: string) {
  return useQuery({
    queryKey: [...ADMIN_ROLES_KEY, "detail", roleId],
    queryFn: () => getRole(roleId),
    staleTime: 30_000,
  });
}

function useInvalidateRoles() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: ADMIN_ROLES_KEY });
}

export function useCreateRole() {
  const invalidate = useInvalidateRoles();
  return useMutation({
    mutationFn: (input: CreateRoleInput) => createRole(input),
    onSuccess: invalidate,
  });
}

export function useUpdateRole(roleId: string) {
  const invalidate = useInvalidateRoles();
  return useMutation({
    mutationFn: (input: { displayName: string; description: string }) =>
      updateRole({ roleId, ...input }),
    onSuccess: invalidate,
  });
}

export function useDeleteRole(roleId: string) {
  const invalidate = useInvalidateRoles();
  return useMutation({
    mutationFn: () => deleteRole(roleId),
    onSuccess: invalidate,
  });
}

export function useSetRolePermission(roleId: string) {
  const invalidate = useInvalidateRoles();
  return useMutation({
    mutationFn: (input: { permissionId: string; granted: boolean }) =>
      setRolePermission({ roleId, ...input }),
    // Refetch is the truth (F4): an optimistic tick is never left standing on
    // a server refusal.
    onSettled: invalidate,
  });
}
