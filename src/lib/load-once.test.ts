import { describe, expect, it, vi } from "vitest";

import { loadOnce } from "./load-once";

/** D234 speed turn S1 — a module fetched on demand is fetched once per visit. */
describe("loadOnce (D234)", () => {
  it("LO-1 one download serves every ask; the value is ready once it has arrived", async () => {
    const fetchModule = vi.fn(async () => "the module");
    const module = loadOnce(fetchModule);
    expect(module.ready()).toBeNull();
    const [first, second] = await Promise.all([module.load(), module.load()]);
    expect(first).toBe("the module");
    expect(second).toBe("the module");
    expect(await module.load()).toBe("the module");
    expect(module.ready()).toBe("the module");
    expect(fetchModule).toHaveBeenCalledTimes(1);
  });

  it("LO-2 a failed download is forgotten: the next ask tries again", async () => {
    const fetchModule = vi
      .fn<() => Promise<string>>()
      .mockRejectedValueOnce(new Error("offline"))
      .mockResolvedValueOnce("the module");
    const module = loadOnce(fetchModule);
    await expect(module.load()).rejects.toThrow("offline");
    expect(module.ready()).toBeNull();
    expect(await module.load()).toBe("the module");
    expect(fetchModule).toHaveBeenCalledTimes(2);
  });
});
