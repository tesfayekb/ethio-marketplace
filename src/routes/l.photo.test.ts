import { beforeEach, expect, it, vi } from "vitest";

const state = vi.hoisted(() => ({
  spend: vi.fn(),
  rpc: vi.fn(),
  sign: vi.fn(),
}));
vi.mock("@/server/dials", async (original) => ({
  ...(await original<typeof import("@/server/dials")>()),
  spend: state.spend,
}));
vi.mock("@/server/supabase/user-client", async (original) => ({
  ...(await original<typeof import("@/server/supabase/user-client")>()),
  anonymousClient: () => ({ rpc: state.rpc }),
}));
vi.mock("@/server/media/links", () => ({ signPublicPhotos: state.sign }));

type Handler = (ctx: { request: Request; params: unknown }) => Promise<Response>;
async function get(id: string): Promise<Response> {
  const { Route } = (await import("./l.$id.photo[.]jpg")) as { Route: { options: unknown } };
  const GET = (Route.options as { server: { handlers: { GET: Handler } } }).server.handlers.GET;
  return GET({ request: new Request(`https://example.test/l/${id}/photo.jpg`), params: { id } });
}
const ID = "abcdefghjk";
const SIGNED = "https://storage.example.test/signed/card.jpg?token=t";

beforeEach(() => {
  vi.clearAllMocks();
  state.spend.mockResolvedValue({ allowed: true, remaining: 9, resetsAt: null });
  state.rpc.mockResolvedValue({
    data: { cover_photo_id: "p1", photos: [{ id: "p1", paths: {} }] },
    error: null,
  });
  state.sign.mockResolvedValue({ p1: { card: SIGNED } });
});

it("PHR-1 a bad id is 404 not found, with no dial, no rpc and no redirect", async () => {
  const response = await get("NOT-AN-ID");
  expect(response.status).toBe(404);
  expect(await response.text()).toBe("not found");
  expect(response.headers.get("Content-Type")).toBe("text/plain; charset=utf-8");
  expect(response.headers.get("Location")).toBeNull();
  expect(state.spend).not.toHaveBeenCalled();
  expect(state.rpc).not.toHaveBeenCalled();
});

it("PHR-2 a spent dial is 429 rate limited", async () => {
  state.spend.mockResolvedValue({ allowed: false, remaining: 0, resetsAt: null });
  const response = await get(ID);
  expect(response.status).toBe(429);
  expect(await response.text()).toBe("rate limited");
  expect(state.rpc).not.toHaveBeenCalled();
});

it("PHR-3 a cover is a 302 to the signed https link with private, max-age=1800", async () => {
  const response = await get(ID);
  expect(response.status).toBe(302);
  expect(response.headers.get("Location")).toBe(SIGNED);
  expect(response.headers.get("Cache-Control")).toBe("private, max-age=1800");
  expect(response.headers.get("X-Content-Type-Options")).toBe("nosniff");
  // D234 S2 — the document's cover is signed as it stands, its card size only.
  expect(state.sign).toHaveBeenCalledWith([{ id: "p1", paths: {} }], ["card"]);
});

it("PHR-4 no cover is 404", async () => {
  state.rpc.mockResolvedValue({ data: { cover_photo_id: null, photos: [] }, error: null });
  const response = await get(ID);
  expect(response.status).toBe(404);
  expect(await response.text()).toBe("not found");
});
