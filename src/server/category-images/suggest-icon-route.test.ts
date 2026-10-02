import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Bundle 2 step 18 — the route returns the fallback icon with fallback: true
 * for an off-list answer, and fallback: false for a listed one.
 */
const answer = { value: "" as unknown };

vi.mock("@/server/category-images/gate", () => ({
  gateCategoriesAssets: async () => ({ ok: true }),
  json: (body: unknown, status: number) =>
    new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } }),
  fail5xx: () => new Response("fail", { status: 500 }),
}));
vi.mock("@/server/category-images/gemini", () => ({
  isFakeMode: () => false,
  suggestIconName: async () => answer.value,
  GeminiError: class extends Error {
    status = 500;
  },
}));

const { Route } = await import("@/routes/api/admin/categories/suggest-icon");

async function call(): Promise<Record<string, unknown>> {
  const handlers = (
    Route.options as unknown as {
      server: { handlers: { POST: (ctx: { request: Request }) => Promise<Response> } };
    }
  ).server.handlers;
  const request = new Request("http://local/api/admin/categories/suggest-icon", {
    method: "POST",
    body: JSON.stringify({ name: "Sofas & armchairs", parentName: "Furniture" }),
  });
  const response = await handlers.POST({ request });
  expect(response.status).toBe(200);
  return (await response.json()) as Record<string, unknown>;
}

describe("POST /api/admin/categories/suggest-icon (bundle 2 step 18)", () => {
  beforeEach(() => {
    answer.value = "";
  });
  it("a listed answer returns that icon with fallback: false", async () => {
    answer.value = "Sofa";
    expect(await call()).toEqual({ icon: "Sofa", fallback: false, fake: false });
  });
  it.each(["NotARealIcon", "", 42])(
    "an off-list answer (%s) returns Package with fallback: true",
    async (raw) => {
      answer.value = raw;
      expect(await call()).toEqual({ icon: "Package", fallback: true, fake: false });
    },
  );
});
