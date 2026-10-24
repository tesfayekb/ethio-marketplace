import { expect, it } from "vitest";

import { qrSvg } from "@/server/qr";

type Handler = (ctx: { request: Request; params: unknown }) => Promise<Response>;
async function get(id: string): Promise<Response> {
  const { Route } = (await import("./l.$id.qr[.]svg")) as { Route: { options: unknown } };
  const GET = (Route.options as { server: { handlers: { GET: Handler } } }).server.handlers.GET;
  return GET({ request: new Request(`https://example.test/l/${id}/qr.svg`), params: { id } });
}

it("QRR-1 a bad id is 404 not found with no-store", async () => {
  const response = await get("NOT-AN-ID");
  expect(response.status).toBe(404);
  expect(await response.text()).toBe("not found");
  expect(response.headers.get("Cache-Control")).toBe("no-store");
  expect(response.headers.get("Content-Type")).toBe("text/plain; charset=utf-8");
});

it("QRR-2 a good id is a 200 SVG with the immutable cache and nosniff", async () => {
  const response = await get("abcdefghjk");
  expect(response.status).toBe(200);
  expect(response.headers.get("Content-Type")).toBe("image/svg+xml; charset=utf-8");
  expect(response.headers.get("Cache-Control")).toBe("public, max-age=31536000, immutable");
  expect(response.headers.get("X-Content-Type-Options")).toBe("nosniff");
});

it("QRR-3 the body is byte-identical to qrSvg(origin + /l/ + id)", async () => {
  const body = new Uint8Array(await (await get("abcdefghjk")).arrayBuffer());
  const expected = new TextEncoder().encode(qrSvg("https://example.test/l/abcdefghjk"));
  // Compared byte by byte as plain arrays (the test realm's Uint8Array differs).
  expect(Array.from(body)).toEqual(Array.from(expected));
});
