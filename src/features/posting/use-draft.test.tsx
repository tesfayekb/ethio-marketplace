import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import type { DoorAnswer } from "./posting-service";

/**
 * INC-367 — a late refusal answering an EARLIER claim must never block, or
 * clear, a newer claim. The save door is replaced by hand-resolved answers so
 * the interleaving is exact: claim 1 is still in the air when claim 2 is made.
 */
const pending: Array<(answer: DoorAnswer) => void> = [];
const sent: number[] = [];

vi.mock("./posting-service", () => ({
  readDraft: vi.fn(async () => null),
  saveDraft: vi.fn(
    (body: { step: number }) =>
      new Promise<DoorAnswer>((resolve) => {
        sent.push(body.step);
        pending.push(resolve);
      }),
  ),
}));

const { useDraft } = await import("./use-draft");

function refused(): DoorAnswer {
  return {
    ok: false,
    status: 200,
    unreachable: false,
    payload: {},
    refusals: [{ field: "price_bp", reason: "required" }],
  } as unknown as DoorAnswer;
}

function took(): DoorAnswer {
  return {
    ok: true,
    status: 200,
    unreachable: false,
    payload: { listing_id: "l-1", draft_step: 5 },
    refusals: [],
  } as unknown as DoorAnswer;
}

async function settle(): Promise<void> {
  for (let i = 0; i < 5; i += 1) await Promise.resolve();
}

describe("useDraft — claim tokens (INC-367)", () => {
  it("an earlier claim refused late does not block the newer claim", async () => {
    const { result } = renderHook(() => useDraft(null));
    let first!: Promise<boolean>;
    let second!: Promise<boolean>;
    await act(async () => {
      first = result.current.saveAt(5);
      await settle();
      second = result.current.saveAt(5);
      await settle();
    });
    expect(pending).toHaveLength(1);
    await act(async () => {
      pending[0]!(refused());
      await settle();
    });
    // The newer claim is still queued and judged on its own pass.
    expect(pending).toHaveLength(2);
    expect(sent).toEqual([5, 5]);
    await act(async () => {
      pending[1]!(took());
      await settle();
    });
    await expect(first).resolves.toBe(false);
    await expect(second).resolves.toBe(true);
    expect(result.current.refusals).toEqual([]);
  });
});
