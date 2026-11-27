import { beforeEach, describe, expect, it, vi } from "vitest";

import { ReaderError } from "@/lib/reader-failure";

import {
  ERROR_DAYS_MAX,
  OCCURRENCES_PAGE_MAX,
  listErrorGroups,
  listErrorOccurrences,
  readErrorStats,
  windowDays,
} from "./errors-service";

const mocks = vi.hoisted(() => ({ rpc: vi.fn() }));
vi.mock("@/lib/supabase-door", () => ({ rpc: mocks.rpc }));

const GROUP = "0123456789abcdef0123456789abcdef";
const AT = "2026-11-26T23:59:00.123+00:00";
const ID = "11111111-1111-4111-8111-111111111111";

/** Each door's answer in the shape its core builds (supabase/migrations/20261126233000_…sql). */
const GROUPS = {
  rows: [
    {
      group: GROUP,
      kind: "notice",
      code: "500",
      shape: "Read of item <n> failed",
      place: "src/features/feed/use-feed.ts:42",
      count: 3,
      first_seen: AT,
      last_seen: AT,
    },
  ],
  more: false,
};
const OCCURRENCE = {
  id: ID,
  seen_at: AT,
  kind: "crash",
  code: null,
  message: "TypeError: x is undefined",
  place: null,
  path: "/l/abc",
  browser: "Chrome",
  engine: "Blink",
  browser_version: "145",
  device: "phone",
  language: "am",
  app_version: null,
  signed_in: false,
};
const STATS = {
  days: [{ day: "2026-11-26", kind: "route", count: 2 }],
  pages: [{ path: "/", count: 2 }],
  browsers: [{ browser: null, version: null, count: 2 }],
  versions: [{ app_version: null, count: 2 }],
};

describe("the error reports' readers (DEC-474 Part F)", () => {
  beforeEach(() => mocks.rpc.mockReset());

  it("ERDR-1 the groups reader sends a bounded window and a kind only when chosen, and reads every group", async () => {
    mocks.rpc.mockResolvedValue({ data: GROUPS, error: null });
    const answer = await listErrorGroups({ days: 9999, kind: null });
    expect(mocks.rpc).toHaveBeenCalledWith("admin_error_groups", { p_days: ERROR_DAYS_MAX });
    expect(answer).toEqual({
      rows: [
        {
          group: GROUP,
          kind: "notice",
          code: "500",
          shape: "Read of item <n> failed",
          place: "src/features/feed/use-feed.ts:42",
          count: 3,
          firstSeen: AT,
          lastSeen: AT,
        },
      ],
      more: false,
    });
    await listErrorGroups({ days: 0, kind: "crash" });
    expect(mocks.rpc).toHaveBeenLastCalledWith("admin_error_groups", {
      p_days: 1,
      p_kind: "crash",
    });
  });

  it("ERDR-2 a door's refusal is thrown as the typed failure, never an empty answer", async () => {
    mocks.rpc.mockResolvedValue({
      data: null,
      error: { message: "permissionDenied", code: "P0D01" },
    });
    await expect(listErrorGroups({ days: 7, kind: null })).rejects.toBeInstanceOf(ReaderError);
    await expect(readErrorStats(7)).rejects.toBeInstanceOf(ReaderError);
    await expect(
      listErrorOccurrences({ group: GROUP, after: null, limit: 50 }),
    ).rejects.toBeInstanceOf(ReaderError);
  });

  it("ERDR-3 an answer out of its promised shape is refused, never drawn", async () => {
    for (const data of [
      null,
      { rows: GROUPS.rows },
      { rows: [{ ...GROUPS.rows[0], kind: "bogus" }], more: false },
      { rows: [{ ...GROUPS.rows[0], count: -1 }], more: false },
      { rows: [{ ...GROUPS.rows[0], group: "not-a-key" }], more: false },
    ]) {
      mocks.rpc.mockResolvedValueOnce({ data, error: null });
      await expect(listErrorGroups({ days: 7, kind: null }), JSON.stringify(data)).rejects.toThrow(
        "admin_error_groups: an answer out of shape",
      );
    }
  });

  it("ERDR-4 one group's page is keyset: a bounded limit, the cursor whole or absent, its next position read", async () => {
    mocks.rpc.mockResolvedValue({
      data: { rows: [OCCURRENCE], next: { at: AT, id: ID } },
      error: null,
    });
    const page = await listErrorOccurrences({ group: GROUP, after: null, limit: 5000 });
    expect(mocks.rpc).toHaveBeenCalledWith("admin_error_occurrences", {
      p_group: GROUP,
      p_limit: OCCURRENCES_PAGE_MAX,
    });
    expect(page.next).toEqual({ at: AT, id: ID });
    expect(page.rows[0]).toEqual({
      id: ID,
      seenAt: AT,
      kind: "crash",
      code: null,
      message: "TypeError: x is undefined",
      place: null,
      path: "/l/abc",
      browser: "Chrome",
      engine: "Blink",
      browserVersion: "145",
      device: "phone",
      language: "am",
      appVersion: null,
      signedIn: false,
    });
    mocks.rpc.mockResolvedValue({ data: { rows: [], next: null }, error: null });
    expect(
      await listErrorOccurrences({ group: GROUP, after: { at: AT, id: ID }, limit: 0 }),
    ).toEqual({
      rows: [],
      next: null,
    });
    expect(mocks.rpc).toHaveBeenLastCalledWith("admin_error_occurrences", {
      p_group: GROUP,
      p_limit: 1,
      p_before_at: AT,
      p_before_id: ID,
    });
    mocks.rpc.mockClear();
    await expect(listErrorOccurrences({ group: "bogus", after: null, limit: 5 })).rejects.toThrow(
      "not a group key",
    );
    expect(mocks.rpc).not.toHaveBeenCalled();
    mocks.rpc.mockResolvedValue({
      data: { rows: [{ ...OCCURRENCE, signed_in: "no" }], next: null },
      error: null,
    });
    await expect(listErrorOccurrences({ group: GROUP, after: null, limit: 5 })).rejects.toThrow(
      "out of shape",
    );
  });

  it("ERDR-5 the stats reader reads the days, pages, browsers and versions, a null bucket kept as null", async () => {
    mocks.rpc.mockResolvedValue({ data: STATS, error: null });
    expect(await readErrorStats(30)).toEqual({
      days: [{ day: "2026-11-26", kind: "route", count: 2 }],
      pages: [{ path: "/", count: 2 }],
      browsers: [{ browser: null, version: null, count: 2 }],
      versions: [{ appVersion: null, count: 2 }],
    });
    expect(mocks.rpc).toHaveBeenCalledWith("admin_error_stats", { p_days: 30 });
    mocks.rpc.mockResolvedValue({ data: { ...STATS, pages: [{ path: "/" }] }, error: null });
    await expect(readErrorStats(30)).rejects.toThrow("admin_error_stats: an answer out of shape");
  });

  it("ERDR-6 a window is whole days within what the doors take", () => {
    expect(windowDays(7)).toBe(7);
    expect(windowDays(7.9)).toBe(7);
    expect(windowDays(-3)).toBe(1);
    expect(windowDays(Number.NaN)).toBe(1);
    expect(windowDays(10_000)).toBe(ERROR_DAYS_MAX);
  });
});
