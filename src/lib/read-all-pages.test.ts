import { describe, expect, it } from "vitest";

import { readAllPages } from "./read-all-pages";

const keyOf = (row: string) => row;
const pad = (i: number) => `k${String(i).padStart(5, "0")}`;

/** An in-memory list kept in key order, read the way the data API reads it. */
function keyed(list: string[]) {
  return (after: string | null, limit: number) =>
    Promise.resolve({
      data: list.filter((key) => after === null || key > after).slice(0, limit),
      error: null,
    });
}

describe("INC-452 — readAllPages (keyed)", () => {
  it("returns every row past the 1,000-row cap, in order", async () => {
    const list = Array.from({ length: 1688 }, (_, i) => pad(i));
    const rows = await readAllPages(keyed(list), keyOf);
    expect(rows).toEqual(list);
  });

  it("ends an exactly full last page with one empty read", async () => {
    const list = Array.from({ length: 2000 }, (_, i) => pad(i));
    const read = keyed(list);
    let calls = 0;
    const rows = await readAllPages((after, limit) => {
      calls += 1;
      return read(after, limit);
    }, keyOf);
    expect(rows).toHaveLength(2000);
    expect(calls).toBe(3);
  });

  it("throws a failed page instead of returning a partial list", async () => {
    const failure = new Error("boom");
    const list = Array.from({ length: 1500 }, (_, i) => pad(i));
    await expect(
      readAllPages(
        (after, limit) =>
          after === null
            ? keyed(list)(after, limit)
            : Promise.resolve({ data: null, error: failure }),
        keyOf,
      ),
    ).rejects.toBe(failure);
  });

  it("returns no row twice when a row is inserted below the boundary between reads", async () => {
    const list = ["k1", "k2", "k3", "k4", "k5", "k6"];
    const read = keyed(list);
    let calls = 0;
    const rows = await readAllPages(
      (after, limit) => {
        if (calls++ === 1) list.splice(0, 0, "k0");
        return read(after, limit);
      },
      keyOf,
      3,
    );
    expect(new Set(rows).size).toBe(rows.length);
    expect(rows).toEqual(["k1", "k2", "k3", "k4", "k5", "k6"]);
  });

  it("returns every steady row when a row is deleted below the boundary between reads", async () => {
    const list = ["k1", "k2", "k3", "k4", "k5", "k6"];
    const read = keyed(list);
    let calls = 0;
    const rows = await readAllPages(
      (after, limit) => {
        if (calls++ === 1) list.splice(0, 1);
        return read(after, limit);
      },
      keyOf,
      3,
    );
    for (const key of ["k2", "k3", "k4", "k5", "k6"]) expect(rows).toContain(key);
  });

  it("throws when a page makes no progress", async () => {
    await expect(
      readAllPages(() => Promise.resolve({ data: ["k1", "k1"], error: null }), keyOf, 2),
    ).rejects.toThrow(/no progress/);
  });
});
