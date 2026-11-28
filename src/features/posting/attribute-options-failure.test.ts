import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { readerFailure } from "@/lib/reader-failure";

// DEC-261 — the session reaches route calls through the client's door (copied from
// attribute-options.test.ts).
vi.mock("@/lib/supabase-door", () => ({
  currentSession: async () => ({ session: { access_token: "t" }, failed: false }),
}));

import { forgetAttributeOptions, loadAttributeOptions } from "./attribute-options";

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
const offered = () =>
  json({ version: "v", options: [{ value: "petrol", label_en: "Petrol" }] }, 200);
const classOf = (read: Awaited<ReturnType<typeof loadAttributeOptions>>) =>
  read.ok ? null : readerFailure(read.failure).class;

beforeEach(() => forgetAttributeOptions());
afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe("INC-1356 the field-choices reader keeps what failed", () => {
  it("UFO-1 an unreachable read answers its network failure, never a list", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new TypeError("Failed to fetch");
      }),
    );
    const read = await loadAttributeOptions("a1");
    expect(read.ok).toBe(false);
    expect(classOf(read)).toBe("network");
  });
  it("UFO-2 a refused read answers its refusal", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => json({ error: "unknownAttribute" }, 400)),
    );
    const read = await loadAttributeOptions("a1");
    expect(read.ok).toBe(false);
    expect(classOf(read)).toBe("refused");
  });
  it("UFO-3 an answer without its list answers malformed", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => json({ version: "v" }, 200)),
    );
    const read = await loadAttributeOptions("a1");
    expect(read.ok).toBe(false);
    expect(classOf(read)).toBe("malformed");
  });
  it("UFO-4 K4: an expired copy and a failing read judge nothing with freshOnly, and are held without it", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => offered()),
    );
    vi.useFakeTimers({ now: Date.now() });
    await loadAttributeOptions("a1");
    vi.setSystemTime(Date.now() + 61_000);
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new TypeError("Failed to fetch");
      }),
    );
    const fresh = await loadAttributeOptions("a1", { freshOnly: true });
    expect(fresh).toMatchObject({ ok: false, held: null });
    const kept = await loadAttributeOptions("a1");
    expect(kept.ok ? null : kept.held?.map((option) => option.value)).toEqual(["petrol"]);
  });
});
