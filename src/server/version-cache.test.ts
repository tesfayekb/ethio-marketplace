import { afterEach, describe, expect, it, vi } from "vitest";

import { versionCache } from "@/server/version-cache";

afterEach(() => vi.useRealTimers());

describe("the reader version cache", () => {
  it("VRC-1 within the TTL serves the entry without another version read", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(0);
    const cache = versionCache<string, number>({ ttlMs: 15_000, max: 2 });
    const version = vi.fn(async () => "one");
    const build = vi.fn(async () => 1);
    expect(await cache.get("key", version, build)).toEqual({ version: "one", value: 1 });
    vi.setSystemTime(14_999);
    expect(await cache.get("key", version, build)).toEqual({ version: "one", value: 1 });
    expect(version).toHaveBeenCalledTimes(1);
    expect(build).toHaveBeenCalledTimes(1);
    vi.setSystemTime(15_000);
    await cache.get("key", version, build);
    expect(version).toHaveBeenCalledTimes(2);
  });

  it("VRC-2 ttl zero reads the version on every call even at the same time", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(0);
    const cache = versionCache<string, number>({ ttlMs: 0, max: 2 });
    const version = vi.fn(async () => "one");
    const build = vi.fn(async () => 1);
    await cache.get("key", version, build);
    await cache.get("key", version, build);
    expect(version).toHaveBeenCalledTimes(2);
    expect(build).toHaveBeenCalledTimes(1);
  });

  it("VRC-3 an unmoved version reuses its value and a moved version rebuilds", async () => {
    const cache = versionCache<string, string>({ ttlMs: 0, max: 2 });
    const version = vi.fn().mockResolvedValueOnce("one").mockResolvedValueOnce("one").mockResolvedValueOnce("two");
    const build = vi.fn(async (value: string) => `built-${value}`);
    expect(await cache.get("key", version, build)).toEqual({ version: "one", value: "built-one" });
    expect(await cache.get("key", version, build)).toEqual({ version: "one", value: "built-one" });
    expect(await cache.get("key", version, build)).toEqual({ version: "two", value: "built-two" });
    expect(build.mock.calls).toEqual([["one"], ["two"]]);
  });

  it("VRC-4 null versions, null builds and throws are never cached or served as stale entries", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(0);
    for (const failure of ["null-version", "null-build", "throw-version", "throw-build"]) {
      const cache = versionCache<string, number>({ ttlMs: 10, max: 2 });
      const version = vi.fn(async () => "one" as string | null);
      const build = vi.fn(async () => 1 as number | null);
      await cache.get("key", version, build);
      vi.advanceTimersByTime(10);
      const error = new Error(failure);
      if (failure === "null-version") version.mockResolvedValueOnce(null);
      if (failure === "null-build") {
        version.mockResolvedValueOnce("two");
        build.mockResolvedValueOnce(null);
      }
      if (failure === "throw-version") version.mockRejectedValueOnce(error);
      if (failure === "throw-build") {
        version.mockResolvedValueOnce("two");
        build.mockRejectedValueOnce(error);
      }
      if (failure.startsWith("throw")) await expect(cache.get("key", version, build)).rejects.toBe(error);
      else expect(await cache.get("key", version, build)).toBeNull();
      const before = version.mock.calls.length;
      expect(await cache.get("key", version, build)).toEqual({ version: "one", value: 1 });
      expect(version).toHaveBeenCalledTimes(before + 1);
      expect(build).toHaveBeenLastCalledWith("one");
      expect(build.mock.calls.length).toBe(failure.endsWith("build") ? 3 : 2);
    }
  });

  it("VRC-5 the least recently used key is evicted past max", async () => {
    const cache = versionCache<string, number>({ ttlMs: 15_000, max: 2 });
    const version = vi.fn(async () => "one");
    const a = vi.fn(async () => 1);
    const b = vi.fn(async () => 2);
    const c = vi.fn(async () => 3);
    await cache.get("a", version, a);
    await cache.get("b", version, b);
    await cache.get("a", version, a);
    await cache.get("c", version, c);
    await cache.get("a", version, a);
    expect(a).toHaveBeenCalledTimes(1);
    await cache.get("b", version, b);
    expect(b).toHaveBeenCalledTimes(2);
    expect(c).toHaveBeenCalledTimes(1);
  });

  it("invalid cache bounds refuse instead of creating an unbounded cache", () => {
    for (const max of [0, -1, 1.5, Infinity]) expect(() => versionCache({ max, ttlMs: 0 })).toThrow();
    for (const ttlMs of [-1, Infinity, NaN]) expect(() => versionCache({ max: 1, ttlMs })).toThrow();
  });
});