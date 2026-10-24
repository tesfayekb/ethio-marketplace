import { afterEach, beforeEach, expect, it, vi } from "vitest";

const state = vi.hoisted(() => ({ upstream: vi.fn() }));
vi.mock("@/server/upstream", async (original) => ({
  ...(await original<typeof import("@/server/upstream")>()),
  upstream: state.upstream,
}));

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
  vi.spyOn(console, "error").mockImplementation(() => undefined);
});
afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

it("GEC-1 a second geoCached call for the same key does not build again and says cached", async () => {
  const { geoCached } = await import("./geocode");
  const build = vi.fn(async () => ["one"]);
  expect(await geoCached("search:bole", build)).toEqual({ value: ["one"], cached: false });
  expect(await geoCached("search:bole", build)).toEqual({ value: ["one"], cached: true });
  expect(build).toHaveBeenCalledTimes(1);
});

it("GEC-2 a build that throws is not cached", async () => {
  const { geoCached } = await import("./geocode");
  await expect(
    geoCached("search:x", async () => {
      throw new Error("boom");
    }),
  ).rejects.toThrow("boom");
  const build = vi.fn(async () => "two");
  expect(await geoCached("search:x", build)).toEqual({ value: "two", cached: false });
  expect(build).toHaveBeenCalledTimes(1);
});

it("GEC-3 nominatim is null on a timeout and on a 503, and sends the User-Agent", async () => {
  const { UpstreamTimeout } = await import("@/server/upstream");
  const { nominatim } = await import("./geocode");
  state.upstream.mockRejectedValueOnce(new UpstreamTimeout("nominatim:search", 6000));
  expect(await nominatim("search", { q: "bole" })).toBeNull();
  state.upstream.mockResolvedValueOnce(new Response("no", { status: 503 }));
  expect(await nominatim("search", { q: "bole" })).toBeNull();
  const [, init, opts] = state.upstream.mock.calls[0] as [
    string,
    { headers: Record<string, string> },
    { timeoutMs: number; label: string },
  ];
  expect(init.headers["User-Agent"]).toMatch(/^ethio\.com classifieds/);
  expect(opts).toEqual({ timeoutMs: 6000, label: "nominatim:search" });
});

it("GEC-4 an entry inserted at 23:59 UTC is served at 00:01 UTC and rebuilt after 24 hours", async () => {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date("2026-10-24T23:59:00Z"));
  const { geoCached } = await import("./geocode");
  const build = vi.fn(async () => "street");
  expect((await geoCached("reverse:1,1", build)).cached).toBe(false);
  vi.setSystemTime(new Date("2026-10-25T00:01:00Z"));
  expect((await geoCached("reverse:1,1", build)).cached).toBe(true);
  expect(build).toHaveBeenCalledTimes(1);
  vi.setSystemTime(new Date("2026-10-25T23:59:01Z"));
  expect((await geoCached("reverse:1,1", build)).cached).toBe(false);
  expect(build).toHaveBeenCalledTimes(2);
});
