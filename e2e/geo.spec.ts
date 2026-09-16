import { expect, test } from "./fixtures";

/**
 * LOCATIONS ERA L4b-2 — THE GEO-GUESS ROUTE (GE-1..GE-5).
 *
 * Anonymous `request` only: the route reads the request and nothing else, so
 * there is no identity, no fixture and nothing to clean up (J1 is vacuous
 * here). Anchors are the JSON shape and the headers, never English text.
 *
 * GE-2/GE-4 are HONEST SEAMS: locally nothing sets the Cloudflare visitor
 * headers, so the spec sends them. In production Cloudflare's edge overwrites
 * them on every inbound request, so a spoofed value never survives the hop —
 * and until the ethio.com cutover the edge sends the country header only.
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

  test("GE-4 the visitor-location headers are the deepest source", async ({
    playwright,
    baseURL,
  }) => {
    const context = await playwright.request.newContext({
      baseURL,
      extraHTTPHeaders: {
        "cf-ipcountry": "ET",
        "cf-iplatitude": "8.54",
        "cf-iplongitude": "39.27",
        "cf-ipcity": "Adama",
        "cf-region-code": "OR",
      },
    });
    try {
      const response = await context.get(GEO);
      expect(response.status()).toBe(200);
      expect(response.headers()["cache-control"] ?? "").toContain("no-store");
      const body = (await response.json()) as Record<string, unknown>;
      expect(body["source"]).toBe("cf-visitor");
      expect(body["country"]).toBe("ET");
      expect(body["lat"]).toBe(8.54);
      expect(body["lng"]).toBe(39.27);
      expect(body["city"]).toBe("Adama");
      expect(body["regionCode"]).toBe("OR");
    } finally {
      await context.dispose();
    }
  });

  test("GE-5 malformed coordinates fall to the country header", async ({ playwright, baseURL }) => {
    for (const [lat, lng] of [
      ["north", "39.27"],
      ["91", "39.27"],
      ["8.54", "181"],
    ]) {
      const context = await playwright.request.newContext({
        baseURL,
        extraHTTPHeaders: {
          "cf-ipcountry": "ET",
          "cf-iplatitude": lat!,
          "cf-iplongitude": lng!,
          "cf-ipcity": "Adama",
        },
      });
      try {
        const response = await context.get(GEO);
        expect(response.status()).toBe(200);
        const body = (await response.json()) as Record<string, unknown>;
        expect(body["source"], `${lat}/${lng} was judged a coordinate pair`).toBe("cf-header");
        expect(body["country"]).toBe("ET");
        expect(body["lat"]).toBeNull();
        expect(body["lng"]).toBeNull();
        expect(body["city"]).toBeNull();
      } finally {
        await context.dispose();
      }
    }
  });
});
