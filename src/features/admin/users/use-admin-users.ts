import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import {
  assignRole,
  getUser,
  listRoles,
  listUserActivity,
  listUsers,
  revokeRole,
  setAccountStatus,
  type AccountStatus,
  type ListUsersInput,
} from "./admin-users-service";

/** Cache keys — one namespace so a mutation can invalidate the whole section. */
export const ADMIN_USERS_KEY = ["admin", "users"] as const;

/** 300ms debounce for the search box (U1: one request per pause, not per key). */
export function useDebounced<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

export function useAdminUsers(input: ListUsersInput) {
  return useQuery({
    queryKey: [...ADMIN_USERS_KEY, "list", input],
    queryFn: () => listUsers(input),
    staleTime: 30_000,
  });
}

export function useAdminUser(userId: string) {
  return useQuery({
    queryKey: [...ADMIN_USERS_KEY, "detail", userId],
    queryFn: () => getUser(userId),
    staleTime: 30_000,
  });
}

export function useAdminUserActivity(userId: string) {
  return useQuery({
    queryKey: [...ADMIN_USERS_KEY, "activity", userId],
    queryFn: () => listUserActivity(userId),
    staleTime: 15_000,
  });
}

export function useAdminRoles() {
  return useQuery({
    queryKey: [...ADMIN_USERS_KEY, "roles"],
    queryFn: listRoles,
    staleTime: 5 * 60_000,
  });
}

export function useSetAccountStatus(userId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: { status: AccountStatus; reason?: string }) =>
      setAccountStatus({ userId, ...input }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ADMIN_USERS_KEY }),
  });
}

export function useRoleAssignment(userId: string) {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ADMIN_USERS_KEY });

  const assign = useMutation({
    mutationFn: (roleName: string) => assignRole(userId, roleName),
    onSuccess: invalidate,
  });
  const revoke = useMutation({
    mutationFn: (roleName: string) => revokeRole(userId, roleName),
    onSuccess: invalidate,
  });
  return { assign, revoke };
}
