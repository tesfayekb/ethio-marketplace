import { expect, it } from "vitest";

import { dayRows } from "./day-rows";

it("ERP-10 the newest day first, each kind summed per day, and the day's total", () => {
  const rows = dayRows([
    { day: "2026-11-24", kind: "crash", count: 1 },
    { day: "2026-11-26", kind: "route", count: 2 },
    { day: "2026-11-26", kind: "route", count: 3 },
    { day: "2026-11-26", kind: "notice", count: 4 },
    { day: "2026-11-25", kind: "render", count: 6 },
  ]);
  expect(rows.map((row) => row.day)).toEqual(["2026-11-26", "2026-11-25", "2026-11-24"]);
  expect(rows[0]).toEqual({
    day: "2026-11-26",
    total: 9,
    notice: 4,
    crash: 0,
    unhandled: 0,
    route: 5,
    upstream: 0,
    render: 0,
  });
  expect(rows[1]?.render).toBe(6);
  expect(rows[2]?.total).toBe(1);
});
