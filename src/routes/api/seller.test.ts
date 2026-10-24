import { beforeEach, expect, it, vi } from "vitest";
import { encodeCursor } from "@/lib/schemas/cursor";

const state = vi.hoisted(() => ({
  rpc: vi.fn(),
}));
vi.mock("@supabase/supabase-js", () => ({ createClient: () => ({ rpc: state.rpc }) }));
import { Route } from "./seller";
const get = (query: string) => {
  const handlers = (
    Route.options as unknown as {
      server: {
        handlers: { GET: (ctx: { request: Request; params: unknown }) => Promise<Response> };
      };
    }
  ).server.handlers;
  return handlers.GET({
    request: new Request(`https://example.test/api/seller${query}`),
    params: {},
  });
};
beforeEach(() => {
  vi.clearAllMocks();
  process.env.SUPABASE_URL = "https://example.test";
  process.env.SUPABASE_PUBLISHABLE_KEY = "test-key";
  state.rpc.mockResolvedValue({
    data: { seller: null, cards: [], next: null },
    error: null,
    status: 200,
  });
});
it("SLR-1 missing key answers badKey before rpc", async () => {
  const response = await get("");
  expect(response.status).toBe(400);
  expect(await response.json()).toEqual({ error: "badKey" });
  expect(state.rpc).not.toHaveBeenCalled();
});
it("SLR-2 a 61-character key is refused before rpc", async () => {
  const response = await get(`?key=${"a".repeat(61)}`);
  expect(response.status).toBe(400);
  expect(await response.json()).toEqual({ error: "badKey" });
  expect(state.rpc).not.toHaveBeenCalled();
});
it("SLR-3 encoded cursor round-trips to the door argument", async () => {
  const after = { step: 2, id: "cursor-id", text: "ሀ" };
  const response = await get(`?key=seller&after=${encodeCursor(after)}`);
  expect(response.status).toBe(200);
  expect(state.rpc).toHaveBeenCalledWith("seller_feed_page", {
    p_seller_key: "seller",
    p_after: after,
    p_size: 20,
  });
});
it("SLR-4 unknownSeller keeps its 404", async () => {
  state.rpc.mockResolvedValue({
    data: null,
    error: { message: "seller_feed_page: unknownSeller" },
    status: 400,
  });
  const response = await get("?key=unknown");
  expect(response.status).toBe(404);
  expect(await response.json()).toEqual({ error: "unknownSeller" });
});
