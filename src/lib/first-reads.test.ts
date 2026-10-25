import { renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { useCountryTree, useOpenMarkets } from "@/components/shell/location-data";
import { readCategoryTree } from "@/features/categories/category-tree";
import { fetchUiBundle } from "@/i18n/bundle";

import { firstReadLinks } from "./first-reads";

/**
 * D234 speed turn S4 — FRL-1…FRL-5. The links the page's head names, and the
 * proof that each one is the very address its reader asks (the route client
 * and fetch are mocked; RCL-* own the transport's contract).
 */
const { callRoute } = vi.hoisted(() => ({ callRoute: vi.fn() }));
vi.mock("@/lib/route-client", () => ({ callRoute }));

const SAVED = "ET:3f2c1a9e-8b7d-4c6e-9a1b-2d3e4f5a6b7c:1761400000000";
const GATE = [{ code: "en" }, { code: "am" }];

function hrefs(links: ReturnType<typeof firstReadLinks>): string[] {
  return links.map((entry) => entry.href);
}

afterEach(() => {
  callRoute.mockReset();
  vi.unstubAllGlobals();
});

describe("firstReadLinks (D234 S4)", () => {
  it("FRL-1 a saved market and a listed star: the tree, the markets, that market's tree, the star's strings", () => {
    const links = firstReadLinks({
      areaCookie: SAVED,
      star: "am",
      requested: null,
      languages: GATE,
      base: "en",
    });
    expect(hrefs(links)).toEqual([
      "/api/categories/tree",
      "/api/locations",
      "/api/locations/ET",
      "/api/i18n/am",
    ]);
  });

  it("FRL-2 no saved market (none, or every area): no market tree; no star: the base language", () => {
    for (const areaCookie of [null, "everywhere:1761400000000"]) {
      const links = firstReadLinks({
        areaCookie,
        star: null,
        requested: null,
        languages: GATE,
        base: "en",
      });
      expect(hrefs(links)).toEqual(["/api/categories/tree", "/api/locations", "/api/i18n/en"]);
    }
  });

  it("FRL-3 the address's ?lang wins when the gate lists it; an unlisted one, or an unlisted star, gives the base", () => {
    const at = (requested: string | null, star: string | null) =>
      hrefs(firstReadLinks({ areaCookie: null, star, requested, languages: GATE, base: "en" })).at(
        -1,
      );
    expect(at("am", null)).toBe("/api/i18n/am");
    expect(at("en", "am")).toBe("/api/i18n/en");
    expect(at("om", "am")).toBe("/api/i18n/en");
    expect(at("x!", "am")).toBe("/api/i18n/en");
    expect(at(null, "om")).toBe("/api/i18n/en");
  });

  it("FRL-4 every link is a fetch preload in the readers' own mode (anonymous, same-origin credentials)", () => {
    const links = firstReadLinks({
      areaCookie: SAVED,
      star: "am",
      requested: null,
      languages: GATE,
      base: "en",
    });
    for (const entry of links) {
      expect(entry).toMatchObject({ rel: "preload", as: "fetch", crossOrigin: "anonymous" });
    }
  });

  it("FRL-5 each link is the very address its reader asks, so the preloaded answer is the one it takes", async () => {
    callRoute.mockResolvedValue({ kind: "unreachable", reason: "network" });
    const fetched: string[] = [];
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL) => {
        fetched.push(String(input));
        return new Response(JSON.stringify({ bundle: { "app.name": "x" } }), {
          status: 200,
          headers: { "content-type": "application/json" },
        });
      }),
    );

    await expect(readCategoryTree()).rejects.toThrow("category tree read failed");
    const markets = renderHook(() => useOpenMarkets());
    const tree = renderHook(() => useCountryTree("ET"));
    await waitFor(() => expect(markets.result.current.isLoading).toBe(false));
    await waitFor(() => expect(tree.result.current.isLoading).toBe(false));
    await fetchUiBundle("am");

    const asked = [...callRoute.mock.calls.map((call) => String(call[0])), ...fetched];
    const links = firstReadLinks({
      areaCookie: SAVED,
      star: "am",
      requested: null,
      languages: GATE,
      base: "en",
    });
    for (const href of hrefs(links)) expect(asked).toContain(href);
  });
});
