import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { AUTH_DERIVED_ROOT } from "@/lib/query-keys";

import {
  assignRole,
  getUser,
  listCountries,
  listRoles,
  listUserActivity,
  listUsers,
  revokeRole,
  setAccountStatus,
  updateProfile,
  type AccountStatus,
  type ListUsersInput,
  type UpdateProfileInput,
} from "./admin-users-service";

/** Cache keys — one namespace so a mutation can invalidate the whole section. */
export const ADMIN_USERS_KEY = [AUTH_DERIVED_ROOT, "admin", "users"] as const;

/**
 * INC-110 — MUTATIONS INVALIDATE THE EXACT KEYS THEIR AUDIT ROWS FEED.
 *
 * The per-user activity list is fed by `admin_user_activity`, and every
 * audited mutation (status change, role assign/revoke, profile edit) writes
 * the row that list must show. A prefix invalidation alone was not enough:
 * it refetched with `refetchType: "active"` only, did not wait, and the
 * activity query's own staleTime could answer the very next mount from a
 * cache captured BEFORE the audit row landed. The exact keys are named here
 * and every mutation awaits them with `refetchType: "all"`.
 */
export const adminUserActivityKey = (userId: string) =>
  [...ADMIN_USERS_KEY, "activity", userId] as const;
export const adminUserDetailKey = (userId: string) =>
  [...ADMIN_USERS_KEY, "detail", userId] as const;

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
    queryKey: adminUserActivityKey(userId),
    queryFn: () => listUserActivity(userId),
    // INC-110 — audit rows land as a side effect of mutations elsewhere in the
    // section, so this list is stale the moment it is served: it re-reads on
    // every mount and after every invalidation, on BOTH twins.
    staleTime: 0,
    refetchOnMount: "always",
  });
}

export function useAdminRoles() {
  return useQuery({
    queryKey: [...ADMIN_USERS_KEY, "roles"],
    queryFn: listRoles,
    staleTime: 5 * 60_000,
  });
}

/**
 * INC-110 — one invalidation contract for every audited user mutation: the
 * section prefix (lists), plus the two EXACT keys the audit row feeds, forced
 * to refetch whether or not an observer is currently mounted, and AWAITED so
 * `mutateAsync` only settles once the reads are in flight.
 */
function useUserMutationInvalidator(userId: string) {
  const queryClient = useQueryClient();
  return () =>
    Promise.all([
      queryClient.invalidateQueries({ queryKey: ADMIN_USERS_KEY }),
      queryClient.invalidateQueries({
        queryKey: adminUserDetailKey(userId),
        refetchType: "all",
      }),
      queryClient.invalidateQueries({
        queryKey: adminUserActivityKey(userId),
        refetchType: "all",
      }),
    ]);
}

export function useSetAccountStatus(userId: string) {
  const invalidate = useUserMutationInvalidator(userId);
  return useMutation({
    mutationFn: (input: { status: AccountStatus; reason?: string }) =>
      setAccountStatus({ userId, ...input }),
    onSuccess: invalidate,
  });
}

export function useRoleAssignment(userId: string) {
  const invalidate = useUserMutationInvalidator(userId);

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

/** U1g — countries for the edit form's select (public reference data). */
export function useCountries() {
  return useQuery({
    queryKey: [AUTH_DERIVED_ROOT, "admin", "countries"],
    queryFn: listCountries,
    staleTime: 60 * 60_000,
  });
}

/** U1g — the audited, step-up-gated profile edit. */
export function useUpdateProfile(userId: string) {
  const invalidate = useUserMutationInvalidator(userId);
  return useMutation({
    mutationFn: (input: Omit<UpdateProfileInput, "userId">) => updateProfile({ userId, ...input }),
    onSuccess: invalidate,
  });
}
