import { expect, test } from "./fixtures";

/**
 * LOCATIONS ERA L4a — THE GEO-GUESS SPIKE (GE-1..GE-3).
 *
 * Anonymous `request` only: the route reads the request and nothing else, so
 * there is no identity, no fixture and nothing to clean up (J1 is vacuous
 * here). Anchors are the JSON shape and the header, never English text.
 *
 * GE-2 is an HONEST SEAM: locally nothing sets `cf-ipcountry`, so the spec
 * sends it. In production Cloudflare's edge overwrites the header on every
 * inbound request, so a spoofed value never survives the hop.
 */

const GEO = "/api/geo";

test.describe("L4a geo guess", () => {
  test("GE-1 the node runtime has no edge guess: source none, three nulls, no-store", async ({
    request,
  }) => {
    const response = await request.get(GEO);
    expect(response.status()).toBe(200);
    expect(response.headers()["cache-control"] ?? "").toContain("no-store");

    const body = (await response.json()) as Record<string, unknown>;
    expect(body["source"]).toBe("none");
    expect(body["country"]).toBeNull();
    expect(body["regionCode"]).toBeNull();
    expect(body["city"]).toBeNull();
  });

  test("GE-2 a cf-ipcountry header is the second source: the country only", async ({
    playwright,
    baseURL,
  }) => {
    const context = await playwright.request.newContext({
      baseURL,
      extraHTTPHeaders: { "cf-ipcountry": "et" },
    });
    try {
      const response = await context.get(GEO);
      expect(response.status()).toBe(200);
      const body = (await response.json()) as Record<string, unknown>;
      expect(body["country"]).toBe("ET");
      expect(body["regionCode"]).toBeNull();
      expect(body["city"]).toBeNull();
      expect(body["source"]).toBe("cf-header");
    } finally {
      await context.dispose();
    }
  });

  test("GE-3 a malformed header is no guess at all", async ({ playwright, baseURL }) => {
    for (const value of ["e", "ETH", "<b>"]) {
      const context = await playwright.request.newContext({
        baseURL,
        extraHTTPHeaders: { "cf-ipcountry": value },
      });
      try {
        const response = await context.get(GEO);
        expect(response.status()).toBe(200);
        const body = (await response.json()) as Record<string, unknown>;
        expect(body["source"], `the header ${value} was judged a guess`).toBe("none");
        expect(body["country"]).toBeNull();
        expect(body["regionCode"]).toBeNull();
        expect(body["city"]).toBeNull();
      } finally {
        await context.dispose();
      }
    }
  });
});
