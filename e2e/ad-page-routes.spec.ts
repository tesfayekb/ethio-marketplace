import { expect, test } from "./fixtures";

// J-audit: no identity, mutable fixture, database read or cleanup is needed.
test.describe("AD PAGE ROUTES", () => {
  test("AP-1 the QR route answers an immutable SVG of the ad's short address", async ({ page }) => {
    const response = await page.request.get("/l/abcdefghjk/qr.svg");
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toMatch(/^image\/svg\+xml/);
    expect(response.headers()["cache-control"]).toBe("public, max-age=31536000, immutable");
    const body = await response.text();
    expect(body.startsWith("<svg")).toBe(true);
    expect(body).not.toContain("<script");
  });

  test("AP-2 a malformed id gets a plain 404", async ({ page }) => {
    for (const id of ["ABCDEFGHJK", "abcdefghj", "abcdefghjk0", "abcdefgh1k"]) {
      const response = await page.request.get(`/l/${id}/qr.svg`);
      expect(response.status()).toBe(404);
      expect(response.headers()["content-type"]).toMatch(/^text\/plain/);
    }
  });
});
