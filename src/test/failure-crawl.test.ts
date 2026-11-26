import { describe, expect, it } from "vitest";

import {
  allowedReads,
  failuresOf,
  forcedAnswer,
  isAllowed,
  judgeForced,
  judgeNormal,
  parseCrawlAllowlist,
  readOf,
  staleReads,
  type ForcedLoad,
} from "../../e2e/helpers/failure-crawl-judge";
import { PROVIDER_ERRORS } from "./provider-errors";

/**
 * DEC-459 (c), cursor-bundle-8a ruling 1 decision 2 — the failure crawl's judge
 * (e2e/helpers/failure-crawl-judge.ts) on planted loads: a page answer that swallows a failure
 * fails it; a notice, or an allowlist line, passes it.
 */
const ORIGINS = { app: "http://127.0.0.1:4173", backend: "https://abc.supabase.co" };

const load = (over: Partial<ForcedLoad>): ForcedLoad => ({
  read: "api /api/feed",
  forced: "network",
  asked: true,
  noticed: true,
  blank: false,
  pageErrors: [],
  text: "Listings near you",
  ...over,
});

describe("the failure crawl's judge (DEC-459 c)", () => {
  it("FCJ-1 a request is read under its backend's key; a row's id is read as :id", () => {
    expect(readOf(`${ORIGINS.backend}/rest/v1/rpc/feed_page`, "POST", ORIGINS)).toEqual({
      key: "rpc feed_page",
      backend: "data",
    });
    expect(readOf(`${ORIGINS.backend}/rest/v1/categories?select=id`, "GET", ORIGINS)).toEqual({
      key: "rest categories GET",
      backend: "data",
    });
    expect(
      readOf(`${ORIGINS.backend}/auth/v1/token?grant_type=refresh_token`, "POST", ORIGINS),
    ).toEqual({ key: "auth token?refresh_token", backend: "auth" });
    expect(
      readOf(`${ORIGINS.backend}/storage/v1/object/list/category-assets`, "POST", ORIGINS),
    ).toEqual({ key: "storage list category-assets", backend: "storage" });
    expect(
      readOf(
        `${ORIGINS.app}/api/admin/users/0b6f1c2e-6a4f-4c3e-9d7a-1f2e3d4c5b6a/roles`,
        "GET",
        ORIGINS,
      ),
    ).toEqual({ key: "api /api/admin/users/:id/roles", backend: "route" });
    expect(readOf(`${ORIGINS.app}/i18n-usage.json`, "GET", ORIGINS)).toEqual({
      key: "static /i18n-usage.json",
      backend: "static",
    });
    expect(readOf(`${ORIGINS.app}/assets/index-abc.js`, "GET", ORIGINS)).toBeNull();
    expect(readOf(`${ORIGINS.app}/api/catalog/find?q=x`, "GET", ORIGINS)).toBeNull();
    expect(readOf("https://tile.openstreetmap.org/1/1/1.png", "GET", ORIGINS)).toBeNull();
  });

  it("FCJ-2 a forced server error is the provider's captured answer; a malformed one the wrong shape", () => {
    expect(forcedAnswer("data", "server", "array")).toEqual({
      status: 503,
      contentType: "application/json",
      body: PROVIDER_ERRORS.PGRST000.body,
    });
    expect(forcedAnswer("route", "server", "object")?.body).toBe(
      '{"error":"upstream unavailable"}',
    );
    expect(forcedAnswer("data", "network", "array")).toBeNull();
    expect(forcedAnswer("route", "malformed", "array")?.body).toBe('{"crawl":"malformed"}');
    expect(forcedAnswer("route", "malformed", "object")?.body).toBe("[]");
    expect(failuresOf("auth")).toEqual(["network", "server"]);
    expect(failuresOf("serverFn")).toEqual(["network"]);
  });

  it("FCJ-3 planted: a page answer that swallows a failure (no notice, no allowlist line) fails", () => {
    const problems = judgeForced("/", load({ noticed: false }), new Map());
    expect(problems).toEqual([
      "/ api /api/feed (network): the read failed and the screen said nothing (no failure notice)",
    ]);
  });

  it("FCJ-4 a notice passes; an allowlist line passes a designed default; an unasked read passes", () => {
    expect(judgeForced("/", load({}), new Map())).toEqual([]);
    const lines = parseCrawlAllowlist(
      "# comment\nread / api /api/feed | the held first page stays | permanent\n",
    );
    expect(judgeForced("/", load({ noticed: false }), allowedReads(lines, "/"))).toEqual([]);
    expect(judgeForced("/", load({ noticed: false, asked: false }), new Map())).toEqual([]);
  });

  it("FCJ-5 a page error, a blank page and the failure's raw words each fail, notice or not", () => {
    const problems = judgeForced(
      "/",
      load({
        pageErrors: ["boom"],
        blank: true,
        text: "Database connection error.",
      }),
      new Map(),
    );
    expect(problems).toEqual([
      "/ api /api/feed (network): page error boom",
      "/ api /api/feed (network): the page drew nothing",
      "/ api /api/feed (network): the raw failure shows (“Database connection error.”)",
    ]);
  });

  it("FCJ-6 an ordinary load fails on a page error, a client error, sideways scroll and a cut control", () => {
    expect(
      judgeNormal("/", {
        width: 360,
        pageErrors: ["x"],
        consoleErrors: ["y"],
        serverErrors: [],
        scrollWidth: 400,
        clientWidth: 360,
        cut: ["button “Post” 300…380"],
        leaks: ["NaN"],
      }),
    ).toEqual([
      "/ at 360px: page error x",
      "/ at 360px: [client-error] y",
      "/ at 360px: sideways scroll (400 > 360)",
      "/ at 360px: control cut by the viewport button “Post” 300…380",
      "/ at 360px: rendered NaN",
    ]);
  });

  it("FCJ-7 an allowlist line the page never asked is stale; a bad line is refused", () => {
    const lines = parseCrawlAllowlist("read /post rpc peek_assist | advisory | permanent\n");
    expect(staleReads(new Set(["rpc other"]), allowedReads(lines, "/post"))).toEqual([
      "failure-crawl-allowlist.txt:1 stale allowance: read /post rpc peek_assist",
    ]);
    expect(() => parseCrawlAllowlist("read / x | reason\n")).toThrow(/three non-empty cells/);
    expect(() => parseCrawlAllowlist("route / | reason | permanent\n")).toThrow(/unknown key/);
  });

  it("FCJ-8 a line naming one forced failure allows that one only; its read still owes the rest", () => {
    const lines = parseCrawlAllowlist(
      "read /$name serverFn abc (malformed) | the wrong verdict, reported | INC-1278\n",
    );
    const allowed = allowedReads(lines, "/$name");
    expect(isAllowed(allowed, "serverFn abc", "malformed")).toBe(true);
    expect(isAllowed(allowed, "serverFn abc", "network")).toBe(false);
    const swallowed = { read: "serverFn abc", noticed: false };
    expect(judgeForced("/$name", load({ ...swallowed, forced: "malformed" }), allowed)).toEqual([]);
    expect(judgeForced("/$name", load({ ...swallowed, forced: "network" }), allowed)).toEqual([
      "/$name serverFn abc (network): the read failed and the screen said nothing (no failure notice)",
    ]);
    expect(staleReads(new Set(["serverFn abc"]), allowed)).toEqual([]);
    expect(staleReads(new Set(["serverFn other"]), allowed)).toHaveLength(1);
  });

  it("FCJ-10 a line naming an audience allows that audience's read only, never another's", () => {
    const lines = parseCrawlAllowlist(
      [
        "read /dev/tall as member rpc get_my_permissions | reported | INC-1278",
        "read /dev/tall api /api/categories/tree | the held tree | permanent",
      ].join("\n"),
    );
    const member = allowedReads(lines, "/dev/tall", "member");
    const visitor = allowedReads(lines, "/dev/tall", "visitor");
    expect([...member.keys()].sort()).toEqual([
      "api /api/categories/tree",
      "rpc get_my_permissions",
    ]);
    expect([...visitor.keys()]).toEqual(["api /api/categories/tree"]);
    expect(staleReads(new Set(["api /api/categories/tree"]), visitor)).toEqual([]);
    expect(staleReads(new Set(["api /api/categories/tree"]), member)).toEqual([
      "failure-crawl-allowlist.txt:1 stale allowance: read /dev/tall as member rpc get_my_permissions",
    ]);
  });

  it("FCJ-11 a designed line excuses the silence only; a reported defect's line, the whole load", () => {
    const broken = { read: "rpc my_listings", noticed: false, pageErrors: ["Database error."] };
    const designed = allowedReads(
      parseCrawlAllowlist("read /account rpc my_listings | designed | permanent\n"),
      "/account",
    );
    expect(judgeForced("/account", load(broken), designed)).toEqual([
      "/account rpc my_listings (network): page error Database error.",
    ]);
    const reported = allowedReads(
      parseCrawlAllowlist("read /account rpc my_listings | stuck loading, reported | INC-1278\n"),
      "/account",
    );
    expect(judgeForced("/account", load({ ...broken, blank: true }), reported)).toEqual([]);
  });

  it("FCJ-12 a shell-wide line allows its read on every page and is never stale on one", () => {
    const lines = parseCrawlAllowlist(
      "read * api /api/categories/tree | the held tree | permanent\n",
    );
    const allowed = allowedReads(lines, "/my-listings", "member");
    expect(isAllowed(allowed, "api /api/categories/tree", "server")).toBe(true);
    expect(isAllowed(allowedReads(lines, "/"), "api /api/categories/tree", "network")).toBe(true);
    expect(staleReads(new Set(), allowed)).toEqual([]);
  });

  it("FCJ-9 a market's code in a route's path is read as :country", () => {
    expect(readOf(`${ORIGINS.app}/api/locations/ER`, "GET", ORIGINS)).toEqual({
      key: "api /api/locations/:country",
      backend: "route",
    });
  });
});
