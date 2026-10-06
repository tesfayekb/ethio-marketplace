import { describe, expect, it } from "vitest";

import { readAllPages } from "./read-all-pages";

const source = Array.from({ length: 1688 }, (_, i) => i);
const pager = (from: number, to: number) =>
  Promise.resolve({ data: source.slice(from, to + 1), error: null });

describe("INC-452 — readAllPages", () => {
  it("returns every row past the 1,000-row cap, in order", async () => {
    const rows = await readAllPages(pager);
    expect(rows).toHaveLength(1688);
    expect(rows[1687]).toBe(1687);
  });

  it("stops on an exactly full last page with one empty read", async () => {
    let calls = 0;
    const rows = await readAllPages((from, to) => {
      calls += 1;
      return Promise.resolve({ data: source.slice(0, 2000).slice(from, to + 1), error: null });
    });
    expect(rows).toHaveLength(1688);
    expect(calls).toBe(2);
  });

  it("throws a failed page instead of returning a partial list", async () => {
    const failure = new Error("boom");
    await expect(
      readAllPages((from) =>
        Promise.resolve(from === 0 ? { data: source.slice(0, 1000), error: null } : { data: null, error: failure }),
      ),
    ).rejects.toBe(failure);
  });
});
