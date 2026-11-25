import { describe, expect, it } from "vitest";

import { callerHasPermission, doorAnswer } from "@/server/supabase/user-client";

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
  it("PRM-1 splits resource:action and asks my_permission_answer as the caller, answering its four words", async () => {
    for (const word of ["denied", "allowed", "stepUp", "stepUpNoFactor"]) {
      const spy = client({ data: word, error: null });
      expect(await callerHasPermission(spy.supabase, "translations:update")).toBe(word);
      expect(spy.calls).toEqual([
        {
          name: "my_permission_answer",
          args: { p_resource: "translations", p_action: "update" },
        },
      ]);
    }
  });

  it("PRM-2 an rpc error throws, never a pass", async () => {
    const failing = client({ data: "allowed", error: { message: "boom" } });
    await expect(callerHasPermission(failing.supabase, "categories:view")).rejects.toEqual({
      message: "boom",
    });
  });

  it("PRM-3 a malformed permission throws before any call", async () => {
    for (const bad of ["categories", "a:b:c", ":view", "categories:"]) {
      const spy = client({ data: "allowed", error: null });
      await expect(callerHasPermission(spy.supabase, bad)).rejects.toThrow("malformed permission");
      expect(spy.calls).toEqual([]);
    }
  });

  it("PRM-4 DEC-465 — an answer that is none of the four words throws, never a pass or a refusal", async () => {
    for (const data of [true, false, "true", null, "Allowed", ""]) {
      const odd = client({ data, error: null });
      await expect(callerHasPermission(odd.supabase, "categories:view")).rejects.toThrow(
        "answered no known word",
      );
    }
  });
});

/**
 * F1-7a (INC-1170) — the `resets_at → detail` mapping is retired: a door's answer reaches the
 * route's answer as it is. The reset time of a gate refusal travels in the refusal's own detail
 * (`rateLimited:<instant>`, read by `doorRefusal`), never in a `resets_at` field this rewrites.
 */
describe("doorAnswer (the mapping retired)", () => {
  it("DAN-1 an answer is returned as it is: a refusal entry's resets_at is not rewritten, a detail is kept", () => {
    const withTime = {
      ok: false,
      refusals: [{ field: "door", reason: "rateLimited", resets_at: "2026-11-19T20:05:12+00:00" }],
    };
    expect(doorAnswer(withTime)).toBe(withTime);
    const withDetail = {
      ok: false,
      refusals: [{ field: "door", reason: "rateLimited", detail: "2026-11-19T20:05:12+00:00" }],
    };
    expect(doorAnswer(withDetail)).toBe(withDetail);
    for (const plain of [null, undefined, "x", 3, [], { ok: true }]) {
      expect(doorAnswer(plain)).toBe(plain);
    }
  });
});
