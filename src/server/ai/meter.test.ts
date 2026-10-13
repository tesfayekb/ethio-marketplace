import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Bundle 13, turn 1 — the AI meter's server side (D158, INC-600). The doors
 * themselves are proven by the migration's proofs and by SV-1..SV-3 on
 * ethio-staging; these tests prove what the server makes of their answers.
 */

const calls: { fn: string; args: Record<string, unknown> }[] = [];
const next: { answer: () => Promise<{ data: unknown; error: { message: string } | null }> } = {
  answer: async () => ({ data: null, error: null }),
};

vi.mock("@/integrations/supabase/client.server", () => ({
  supabaseAdmin: {
    rpc: async (fn: string, args: Record<string, unknown>) => {
      calls.push({ fn, args });
      return next.answer();
    },
  },
}));

const { AI_FEATURES, aiGate, recordAiSpend } = await import("./meter");

beforeEach(() => {
  calls.length = 0;
  next.answer = async () => ({ data: null, error: null });
});

describe("the AI meter (D158)", () => {
  it("AIM-1 the gate answers on, or off with its reason", async () => {
    const log = vi.fn();
    next.answer = async () => ({ data: { on: true, off_reason: null }, error: null });
    expect(await aiGate("writing_helper", log)).toEqual({ on: true });
    expect(calls).toEqual([{ fn: "ai_feature_gate", args: { p_feature: "writing_helper" } }]);

    next.answer = async () => ({ data: { on: false, off_reason: "budget" }, error: null });
    expect(await aiGate("name_check", log)).toEqual({ on: false, reason: "budget" });
    next.answer = async () => ({ data: { on: false, off_reason: "staff" }, error: null });
    expect(await aiGate("translations", log)).toEqual({ on: false, reason: "staff" });
    expect(log).not.toHaveBeenCalled();
  });

  it("AIM-2 a gate that cannot be read is off ('unavailable') and says so in the log", async () => {
    const log = vi.fn();
    next.answer = async () => ({ data: null, error: { message: "upstream" } });
    expect(await aiGate("photo_screen", log)).toEqual({ on: false, reason: "unavailable" });
    next.answer = async () => ({ data: { surprise: 1 }, error: null });
    expect(await aiGate("photo_screen", log)).toEqual({ on: false, reason: "unavailable" });
    next.answer = async () => {
      throw new Error("network");
    };
    expect(await aiGate("photo_screen", log)).toEqual({ on: false, reason: "unavailable" });
    expect(log.mock.calls.map((call) => call[0])).toEqual([
      "ai gate photo_screen: upstream",
      "ai gate photo_screen: unreadable answer",
      "ai gate photo_screen: network",
    ]);
  });

  it("AIM-3 the meter sends whole units, logs a failed write and never throws", async () => {
    const log = vi.fn();
    await recordAiSpend("translations", 1234.9, log);
    await recordAiSpend("photo_screen", -3, log);
    await recordAiSpend("writing_helper", Number.NaN, log);
    expect(calls).toEqual([
      { fn: "ai_record_spend", args: { p_feature: "translations", p_units: 1234 } },
      { fn: "ai_record_spend", args: { p_feature: "photo_screen", p_units: 0 } },
      { fn: "ai_record_spend", args: { p_feature: "writing_helper", p_units: 0 } },
    ]);
    expect(log).not.toHaveBeenCalled();

    next.answer = async () => ({ data: null, error: { message: "unknownFeature" } });
    await expect(recordAiSpend("name_check", 1, log)).resolves.toBeUndefined();
    next.answer = async () => {
      throw new Error("network");
    };
    await expect(recordAiSpend("name_check", 1, log)).resolves.toBeUndefined();
    expect(log.mock.calls.map((call) => call[0])).toEqual([
      "ai meter name_check: unknownFeature",
      "ai meter name_check: network",
    ]);
  });

  it("AIM-4 the six features the doors know, in the server's own list", () => {
    expect([...AI_FEATURES].sort()).toEqual([
      "category_icons",
      "category_images",
      "name_check",
      "photo_screen",
      "translations",
      "writing_helper",
    ]);
  });
});
