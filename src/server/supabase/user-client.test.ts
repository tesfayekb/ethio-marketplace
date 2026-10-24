import { describe, expect, it } from "vitest";

import { callerHasPermission } from "@/server/supabase/user-client";

/**
 * Foundations turn 11 (DEC-237) — THE ONE STAFF CHECK (PRM-1…3): the split,
 * the call as the caller, an error never a pass.
 */

function client(answer: { data: unknown; error: unknown }) {
  const calls: { name: string; args: unknown }[] = [];
  return {
    calls,
    supabase: {
      rpc: async (name: string, args: unknown) => {
        calls.push({ name, args });
        return answer;
      },
    } as never,
  };
}

describe("callerHasPermission", () => {
  it("PRM-1 splits resource:action and asks has_permission as the caller", async () => {
    const yes = client({ data: true, error: null });
    expect(await callerHasPermission(yes.supabase, "user-1", "translations:update")).toBe(true);
    expect(yes.calls).toEqual([
      {
        name: "has_permission",
        args: { p_user_id: "user-1", p_resource: "translations", p_action: "update" },
      },
    ]);
    const no = client({ data: false, error: null });
    expect(await callerHasPermission(no.supabase, "user-1", "categories:view")).toBe(false);
    const odd = client({ data: "true", error: null });
    expect(await callerHasPermission(odd.supabase, "user-1", "categories:view")).toBe(false);
  });

  it("PRM-2 an rpc error throws, never a pass", async () => {
    const failing = client({ data: true, error: { message: "boom" } });
    await expect(
      callerHasPermission(failing.supabase, "user-1", "categories:view"),
    ).rejects.toEqual({ message: "boom" });
  });

  it("PRM-3 a malformed permission throws before any call", async () => {
    for (const bad of ["categories", "a:b:c", ":view", "categories:"]) {
      const spy = client({ data: true, error: null });
      await expect(callerHasPermission(spy.supabase, "user-1", bad)).rejects.toThrow(
        "malformed permission",
      );
      expect(spy.calls).toEqual([]);
    }
  });
});
