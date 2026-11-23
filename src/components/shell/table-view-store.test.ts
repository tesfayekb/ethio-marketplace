import { act, renderHook as renderBareHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useHiddenColumns } from "./columns-state";
import { tableViewTestShell } from "./table-view-test-shell";
import { forgetTableViewsForTests } from "./table-view-store";
import {
  parseTableViewEntry,
  tableOfPageKey,
  useTableView,
  useTableEntry,
} from "./table-view-store";
import { useKeptPage } from "./use-kept-page";

const KEY = (account: string, table: string) => `ethio:view:${account}:${table}`;
const stored = (account: string, table: string): unknown =>
  JSON.parse(window.localStorage.getItem(KEY(account, table)) ?? "null");

let account: string | null | undefined = "acc-a";
function renderHook<T>(callback: () => T) {
  return renderBareHook(callback, { wrapper: (props) => tableViewTestShell(account)(props) });
}

/** INC-1238 (DEC-420) — the kept view, one store per account and table. */
describe("table-view-store", () => {
  it("TV-U13 a date pair is stored once and read back for its account and table, surviving sign-out", () => {
    const hook = renderHook(() => useTableEntry("date-pair"));
    act(() => hook.result.current.setDates("made", { from: "2026-11-01", to: "2026-11-22" }));
    expect(stored("acc-a", "date-pair")).toMatchObject({
      dates: { made: { from: "2026-11-01", to: "2026-11-22" } },
    });
    hook.unmount();
    forgetTableViewsForTests();
    account = null;
    expect(renderHook(() => useTableEntry("date-pair")).result.current.entry.dates).toBeUndefined();
    account = "acc-b";
    expect(renderHook(() => useTableEntry("date-pair")).result.current.entry.dates).toBeUndefined();
    account = "acc-a";
    expect(renderHook(() => useTableEntry("date-pair")).result.current.entry.dates).toEqual({
      made: { from: "2026-11-01", to: "2026-11-22" },
    });
  });
  it("TV-U14 a broken calendar day reads without that side, preserving its valid partner", () => {
    expect(
      parseTableViewEntry(
        JSON.stringify({ v: 1, dates: { made: { from: "2026-02-30", to: "2026-11-22" } } }),
      )?.dates,
    ).toEqual({ made: { from: "", to: "2026-11-22" } });
  });
  it("TV-U15 anything not an exact YYYY-MM-DD day is refused as a stored date side", () => {
    for (const from of [
      "2026-2-01",
      "2026-11-01T00:00:00Z",
      " 2026-11-01",
      "private seller",
      20261101,
      null,
      { text: "private" },
    ]) {
      expect(
        parseTableViewEntry(JSON.stringify({ v: 1, dates: { made: { from, to: "2026-11-22" } } }))
          ?.dates,
      ).toEqual({ made: { from: "", to: "2026-11-22" } });
    }
    const hook = renderHook(() => useTableEntry("date-write"));
    act(() => hook.result.current.setDates("made", { from: "private seller", to: "2026-11-22" }));
    expect(stored("acc-a", "date-write")).toMatchObject({
      dates: { made: { from: "", to: "2026-11-22" } },
    });
  });
  beforeEach(() => {
    account = "acc-a";
    forgetTableViewsForTests();
  });
  afterEach(() => {
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  it("TV-U1 keeps the hidden columns, the page size and a filter's choices under the account's key", () => {
    const columns = renderHook(() => useHiddenColumns("admin-listings"));
    const paging = renderHook(() => useKeptPage("ethio.admin.listings.pageSize"));
    const view = renderHook(() => useTableView("admin-listings", { country: ["ET", "ER"] }));
    act(() => columns.result.current[1]("seller", false));
    act(() => paging.result.current.setPageSize(50));
    act(() => view.result.current.setFilter("country", ["ER"]));
    expect(stored("acc-a", "admin-listings")).toEqual({
      v: 1,
      hidden: ["seller"],
      pageSize: 50,
      filters: { country: ["ER"] },
    });
  });

  it("TV-U2 two hooks of one table share one copy: neither write overwrites the other's", () => {
    const columns = renderHook(() => useHiddenColumns("admin-users"));
    const paging = renderHook(() => useKeptPage("ethio.admin.users.pageSize"));
    act(() => paging.result.current.setPageSize(100));
    act(() => columns.result.current[1]("email", false));
    expect(paging.result.current.pageSize).toBe(100);
    expect(columns.result.current[0]).toEqual(["email"]);
    expect(stored("acc-a", "admin-users")).toMatchObject({ hidden: ["email"], pageSize: 100 });
  });

  it("TV-U3 a kept value the table no longer offers, or a filter it no longer has, is dropped", () => {
    window.localStorage.setItem(
      KEY("acc-a", "t-offer"),
      JSON.stringify({ v: 1, hidden: [], filters: { country: ["ET", "XX"], gone: ["a"] } }),
    );
    const view = renderHook(() => useTableView("t-offer", { country: ["ET", "ER"] }));
    expect(view.result.current.filters).toEqual({ country: ["ET"] });
  });

  it("TV-U4 a broken entry reads as nothing", () => {
    for (const raw of [
      "{not json",
      JSON.stringify({ v: 2, hidden: [] }),
      JSON.stringify({ v: 1, hidden: [1] }),
      JSON.stringify({ v: 1, extra: true }),
      JSON.stringify({ v: 1, hidden: Array.from({ length: 51 }, (_, i) => `c${i}`) }),
      JSON.stringify({ v: 1, filters: { f: Array.from({ length: 21 }, (_, i) => `v${i}`) } }),
      JSON.stringify({ v: 1, filters: { f: ["x".repeat(65)] } }),
      JSON.stringify({ v: 1, pageSize: -5 }),
    ]) {
      expect(parseTableViewEntry(raw), raw).toBeNull();
    }
    window.localStorage.setItem(KEY("acc-a", "t-broken"), "{not json");
    expect(renderHook(() => useHiddenColumns("t-broken")).result.current[0]).toEqual([]);
  });

  it("TV-U5 storage that refuses is not an error: the choice lasts for the visit", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    const columns = renderHook(() => useHiddenColumns("t-blocked"));
    act(() => columns.result.current[1]("a", false));
    expect(columns.result.current[0]).toEqual(["a"]);
  });

  it("TV-U6 signed out: nothing is read and nothing is written", () => {
    account = null;
    window.localStorage.setItem(KEY("acc-a", "t-out"), JSON.stringify({ v: 1, hidden: ["x"] }));
    const setItem = vi.spyOn(Storage.prototype, "setItem");
    const getItem = vi.spyOn(Storage.prototype, "getItem");
    const columns = renderHook(() => useHiddenColumns("t-out"));
    expect(columns.result.current[0]).toEqual([]);
    act(() => columns.result.current[1]("y", false));
    expect(columns.result.current[0]).toEqual(["y"]);
    expect(setItem).not.toHaveBeenCalled();
    expect(getItem).not.toHaveBeenCalled();
  });

  it("TV-U7 another account on the same device never reads the entry; sign-out removes nothing", () => {
    const first = renderHook(() => useHiddenColumns("t-two"));
    act(() => first.result.current[1]("a", false));
    act(() => {
      account = null;
      first.rerender();
    });
    expect(window.localStorage.getItem(KEY("acc-a", "t-two"))).not.toBeNull();
    act(() => {
      account = "acc-b";
      first.rerender();
    });
    expect(first.result.current[0]).toEqual([]);
    act(() => {
      account = "acc-a";
      first.rerender();
    });
    expect(first.result.current[0]).toEqual(["a"]);
  });

  it("TV-U8 the two old keys are read once as the account's first value, then removed", () => {
    window.localStorage.setItem("ethio:table-columns:admin-audit", JSON.stringify(["entity"]));
    window.localStorage.setItem("ethio.admin.audit.pageSize", "50");
    const columns = renderHook(() => useHiddenColumns("admin-audit"));
    const paging = renderHook(() => useKeptPage("ethio.admin.audit.pageSize"));
    expect(columns.result.current[0]).toEqual(["entity"]);
    expect(paging.result.current.pageSize).toBe(50);
    expect(window.localStorage.getItem("ethio:table-columns:admin-audit")).toBeNull();
    expect(window.localStorage.getItem("ethio.admin.audit.pageSize")).toBeNull();
    expect(stored("acc-a", "admin-audit")).toEqual({
      v: 1,
      hidden: ["entity"],
      pageSize: 50,
      filters: {},
    });
  });

  it("TV-U9 not known yet: the defaults, not ready, and nothing read", () => {
    account = undefined;
    const getItem = vi.spyOn(Storage.prototype, "getItem");
    const view = renderHook(() => useTableView("t-wait", { f: ["a"] }));
    expect(view.result.current.ready).toBe(false);
    expect(view.result.current.filters).toEqual({});
    act(() => view.result.current.setFilter("f", ["a"]));
    expect(view.result.current.filters).toEqual({});
    expect(getItem).not.toHaveBeenCalled();
  });

  it("TV-U11 without a shell each mounted hook owns its choices and remounts forget them", () => {
    const first = renderBareHook(() => useHiddenColumns("detached"));
    const second = renderBareHook(() => useHiddenColumns("detached"));
    act(() => first.result.current[1]("seller", false));
    expect(first.result.current[0]).toEqual(["seller"]);
    expect(second.result.current[0]).toEqual([]);
    first.unmount();
    expect(renderBareHook(() => useHiddenColumns("detached")).result.current[0]).toEqual([]);
  });

  it("TV-U12 a handed-out setter stays bound to its account after the holder changes", () => {
    const first = renderHook(() => useHiddenColumns("bound"));
    const oldSetter = first.result.current[1];
    act(() => {
      account = "acc-b";
      first.rerender();
    });
    act(() => oldSetter("seller", false));
    expect(first.result.current[0]).toEqual([]);
    expect(stored("acc-a", "bound")).toMatchObject({ hidden: ["seller"] });
  });

  it("TV-U10 every page-size key of a table with a columns id names that table's one entry", () => {
    expect(tableOfPageKey("ethio.admin.locations.pageSize")).toBe("admin-places");
    expect(tableOfPageKey("ethio.admin.impersonation.pageSize")).toBe(
      "admin-impersonated-listings",
    );
    expect(tableOfPageKey("ethio.admin.monetisation.boosts.pageSize")).toBe(
      "admin-monetisation-boosts",
    );
    expect(tableOfPageKey("ethio.admin.monetisation.levelOverrides.pageSize")).toBe(
      "admin-monetisation-level-overrides",
    );
    expect(tableOfPageKey("kp-other")).toBe("kp-other");
  });
});
