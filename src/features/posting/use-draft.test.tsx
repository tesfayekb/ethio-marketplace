import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import type { saveDraft } from "./posting-service";

type DoorAnswer = Awaited<ReturnType<typeof saveDraft>>;

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

function unreachable(): DoorAnswer {
  return {
    ok: false,
    status: 0,
    unreachable: true,
    payload: {},
    refusals: [],
  } as unknown as DoorAnswer;
}

function dialSpent(): DoorAnswer {
  return {
    ok: false,
    status: 200,
    unreachable: false,
    payload: {},
    refusals: [{ field: "door", reason: "rateLimited", detail: "2099-01-01T00:00:00Z" }],
  } as unknown as DoorAnswer;
}

/**
 * INC-455 (DEC-139 R1) — A Next on step S is sent and judged at S, and leaving a
 * step ends its unanswered claim. One test per path that used to leave a higher
 * step queued: a claim still in the air, a transport retry, a dial pause.
 */
describe("useDraft — a Next is judged at its own step (INC-455)", () => {
  it("a price claim still in the air shows nothing after the seller goes back", async () => {
    pending.length = 0;
    sent.length = 0;
    const { result } = renderHook(() => useDraft(null));
    let price!: Promise<boolean>;
    await act(async () => {
      price = result.current.saveAt(5);
      await settle();
      result.current.goTo(3);
    });
    await act(async () => {
      pending[0]!(refused());
      await settle();
    });
    await expect(price).resolves.toBe(false);
    expect(result.current.refusals).toEqual([]);
    let specs!: Promise<boolean>;
    await act(async () => {
      specs = result.current.saveAt(3);
      await settle();
    });
    expect(sent.at(-1)).toBe(3);
    await act(async () => {
      pending.at(-1)!(took());
      await settle();
    });
    await expect(specs).resolves.toBe(true);
  });

  it("a transport retry left at price never raises the Specifications Next", async () => {
    vi.useFakeTimers();
    try {
      pending.length = 0;
      sent.length = 0;
      const { result } = renderHook(() => useDraft(null));
      let price!: Promise<boolean>;
      await act(async () => {
        price = result.current.saveAt(5);
        await settle();
        pending[0]!(unreachable());
        await settle();
      });
      await expect(price).resolves.toBe(false);
      let specs!: Promise<boolean>;
      await act(async () => {
        result.current.goTo(3);
        specs = result.current.saveAt(3);
        await settle();
      });
      expect(sent).toEqual([5, 3]);
      await act(async () => {
        pending[1]!(took());
        await settle();
      });
      await expect(specs).resolves.toBe(true);
      expect(result.current.refusals).toEqual([]);
    } finally {
      vi.useRealTimers();
    }
  });

  it("a dial pause left at price never raises the Specifications Next", async () => {
    pending.length = 0;
    sent.length = 0;
    const { result } = renderHook(() => useDraft(null));
    let price!: Promise<boolean>;
    await act(async () => {
      price = result.current.saveAt(5);
      await settle();
      pending[0]!(dialSpent());
      await settle();
    });
    await expect(price).resolves.toBe(false);
    let specs!: Promise<boolean>;
    await act(async () => {
      result.current.goTo(3);
      specs = result.current.saveAt(3);
      await settle();
    });
    expect(sent).toEqual([5, 3]);
    await act(async () => {
      pending[1]!(took());
      await settle();
    });
    await expect(specs).resolves.toBe(true);
  });
});

/**
 * INC-465 — a queued save is never sent below step 1. The door refuses
 * p_step < 1 with 'unknown step'; going to step 1 used to lower a queued save
 * to 0, and an edit made on step 1 queued 0 by itself.
 */
describe("useDraft — a queued save is never sent below step 1 (INC-465)", () => {
  it("(i, iv) an edit queued at step 3, then goTo(1): sent at step 1, and saved", async () => {
    pending.length = 0;
    sent.length = 0;
    const { result } = renderHook(() => useDraft(null));
    await act(async () => {
      result.current.goTo(3);
      result.current.change({ categoryId: "c-1", title: "a" }, false);
      result.current.goTo(1);
      result.current.retry();
      await settle();
    });
    expect(sent).toEqual([1]);
    await act(async () => {
      pending[0]!(took());
      await settle();
    });
    expect(result.current.saveState).toBe("saved");
  });

  it("(ii) an edit made while step 1 is on screen is sent at step 1", async () => {
    pending.length = 0;
    sent.length = 0;
    const { result } = renderHook(() => useDraft(null));
    await act(async () => {
      result.current.change({ categoryId: "c-1" }, true);
      await settle();
    });
    expect(sent).toEqual([1]);
    await act(async () => {
      pending[0]!(took());
      await settle();
    });
  });

  it("(iii) with no category chosen nothing is sent, and the save stays queued", async () => {
    pending.length = 0;
    sent.length = 0;
    const { result } = renderHook(() => useDraft(null));
    await act(async () => {
      result.current.goTo(3);
      result.current.change({ title: "a" }, false);
      result.current.goTo(1);
      result.current.retry();
      await settle();
    });
    expect(sent).toEqual([]);
    expect(result.current.saveState).toBe("unsaved");
    await act(async () => {
      result.current.change({ categoryId: "c-1" }, true);
      await settle();
    });
    expect(sent).toEqual([1]);
    await act(async () => {
      pending[0]!(took());
      await settle();
    });
  });
});
