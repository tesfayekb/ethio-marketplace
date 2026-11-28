import { renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { DOOR_PERMISSIONS, ROUTE_PERMISSIONS } from "./door-permissions.generated";
import { permissionOf, stepUpOf, useMayCall } from "./use-may-call";
import { usePermissions } from "./usePermissions";

vi.mock("./usePermissions", () => ({ usePermissions: vi.fn() }));

const read = vi.mocked(usePermissions);

function answers(permissions: string[], state: { loading?: boolean; error?: Error } = {}) {
  read.mockReturnValue({
    permissions,
    loading: state.loading ?? false,
    error: state.error ?? null,
    retry: vi.fn(),
    has: (permission: string) => permissions.includes(permission),
  });
}

afterEach(() => read.mockReset());

describe("useMayCall (cursor-bundle-7c Part 3, INC-1281)", () => {
  it("MAYC-1 a door's permission and step-up are the manifest's", () => {
    expect(permissionOf({ door: "admin_reorder_categories" })).toBe(
      DOOR_PERMISSIONS.admin_reorder_categories.permission,
    );
    expect(stepUpOf("admin_reorder_categories")).toBe("none");
    expect(stepUpOf("admin_add_category_pointer")).toBe("row");
    expect(stepUpOf("admin_ai_features")).toBeNull();
  });

  it("MAYC-2 a route's permission is its method's declared one; an OPEN route asks none", () => {
    expect(permissionOf({ route: "/api/translate", method: "POST" })).toBe(
      ROUTE_PERMISSIONS["/api/translate"].POST,
    );
    expect(permissionOf({ route: "/api/admin/categories/import", method: "POST" })).toBe(
      "categories:import",
    );
    expect(permissionOf({ route: "/api/catalog/find", method: "GET" })).toBeNull();
  });

  it("MAYC-3 the person may call what their permissions hold, and only that", () => {
    answers(["categories:update"]);
    const { result } = renderHook(() => useMayCall());
    expect(result.current.mayCall({ door: "admin_reorder_categories" })).toBe(true);
    expect(result.current.mayCall({ door: "admin_add_category_pointer" })).toBe(false);
    expect(result.current.mayCall({ route: "/api/translate", method: "POST" })).toBe(false);
    expect(result.current.mayCall({ route: "/api/catalog/find", method: "GET" })).toBe(true);
  });

  it("MAYC-4 while loading or after a failed read nothing permissioned is allowed, and the state is passed on", () => {
    answers([], { loading: true });
    const loading = renderHook(() => useMayCall()).result.current;
    expect(loading.loading).toBe(true);
    expect(loading.mayCall({ door: "admin_reorder_categories" })).toBe(false);
    const failure = new Error("read failed");
    answers([], { error: failure });
    const failed = renderHook(() => useMayCall()).result.current;
    expect(failed.error).toBe(failure);
    expect(failed.mayCall({ door: "admin_reorder_categories" })).toBe(false);
  });

  it("MAYC-5 the enabled switch reaches the permission read", () => {
    answers([]);
    renderHook(() => useMayCall({ enabled: false }));
    expect(read).toHaveBeenCalledWith({ enabled: false });
  });
});
