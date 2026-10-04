/**
 * INC-421 — THE 5xx BODY PASS-THROUGH CONTRACT.
 *
 * `normalizeCatastrophicSsrResponse` must read a 5xx JSON body to recognise
 * h3's swallowed-error shape, and reading a CLONE left the ORIGINAL body
 * disturbed — the wire answer went out with `Content-Length: 0` and every
 * route's 5xx answer reached the client empty (AT-58's refused commit lost
 * its forwarded message). These tests pin the fix: a 5xx JSON answer that
 * is not the swallowed shape passes through byte for byte, and the swallowed
 * shape still becomes the error page.
 */
import { describe, expect, it } from "vitest";

import { normalizeCatastrophicSsrResponse } from "./server";

const REQUEST = new Request("https://example.test/api/example");

describe("normalizeCatastrophicSsrResponse (INC-421)", () => {
  it("passes a 5xx JSON answer through with its body byte for byte", async () => {
    const body = JSON.stringify({
      error: "server error",
      message: 'duplicate key value violates unique constraint "rank_unique"',
      detail: "Key (category_id, card_rank)=(…, 3) already exists.",
    });
    const original = new Response(body, {
      status: 500,
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
    });

    const out = await normalizeCatastrophicSsrResponse(REQUEST, original);

    expect(out.status).toBe(500);
    expect(out.headers.get("content-type")).toBe("application/json");
    expect(out.headers.get("cache-control")).toBe("no-store");
    expect(await out.text()).toBe(body);
  });

  it("still turns h3's swallowed-error shape into the error page", async () => {
    const swallowed = new Response(JSON.stringify({ unhandled: true, message: "HTTPError" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });

    const out = await normalizeCatastrophicSsrResponse(REQUEST, swallowed);

    expect(out.status).toBe(500);
    expect(out.headers.get("content-type")).toBe("text/html; charset=utf-8");
    expect(await out.text()).toContain("<");
  });

  it("leaves non-JSON 5xx and sub-500 answers untouched", async () => {
    const html = new Response("<h1>oops</h1>", {
      status: 502,
      headers: { "Content-Type": "text/html" },
    });
    expect(await normalizeCatastrophicSsrResponse(REQUEST, html)).toBe(html);

    const ok = new Response("{}", {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
    expect(await normalizeCatastrophicSsrResponse(REQUEST, ok)).toBe(ok);
  });
});
