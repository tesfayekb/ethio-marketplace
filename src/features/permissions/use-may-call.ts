import { useCallback } from "react";

import { ownValue } from "@/lib/own-key";

import {
  DOOR_PERMISSIONS,
  ROUTE_PERMISSIONS,
  type PermissionedDoor,
  type PermissionedRoute,
} from "./door-permissions.generated";
import { usePermissions } from "./usePermissions";

/**
 * cursor-bundle-7c Part 3 (INC-1281) — A CONTROL SHOWS WHAT ITS DOOR ALLOWS. A control that calls
 * a door names the door, never a copy of its permission: the permission is the manifest's
 * (`door-permissions.generated.ts`, from scripts/doors/manifest.txt). A control that calls a route
 * names the route and its method, answered from the route's own `auth: { staff }` (or its import
 * family's permission); a route that asks none is OPEN and answers yes. Visibility only: every
 * door and route still checks (`door_context`, `defineRoute`).
 *
 * A door the manifest lacks, or one that asks no permission, does not type. While the
 * permissions load, or when their read failed, nothing is allowed: the read's own failure is
 * drawn by the shell's notice, as before (`usePermissions`'s `error`).
 */

type RouteMethod<R extends PermissionedRoute> = keyof (typeof ROUTE_PERMISSIONS)[R] & string;

export type CallTarget =
  | { door: PermissionedDoor }
  | { [R in PermissionedRoute]: { route: R; method: RouteMethod<R> } }[PermissionedRoute];

/** The permission a target asks; null for an OPEN route. */
export function permissionOf(target: CallTarget): string | null {
  if ("door" in target) return DOOR_PERMISSIONS[target.door].permission;
  const methods: Readonly<Record<string, string | null>> = ROUTE_PERMISSIONS[target.route];
  return ownValue(methods, target.method) ?? null;
}

/**
 * The door's step-up cell: `row` when the permission's row decides, `none` for a recorded
 * opt-out, null when the manifest names none (a read).
 */
export function stepUpOf(door: PermissionedDoor): "row" | "none" | null {
  return DOOR_PERMISSIONS[door].stepUp;
}

export function useMayCall({ enabled = true }: { enabled?: boolean } = {}) {
  const { permissions, loading, error } = usePermissions({ enabled });
  const mayCall = useCallback(
    (target: CallTarget): boolean => {
      const permission = permissionOf(target);
      return permission === null || permissions.includes(permission);
    },
    [permissions],
  );
  return { mayCall, loading, error };
}
