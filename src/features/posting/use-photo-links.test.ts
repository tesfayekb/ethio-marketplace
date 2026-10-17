import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { readPhotoLinks } from "./use-photo-links";

const { getSession } = vi.hoisted(() => ({ getSession: vi.fn() }));
vi.mock("@/integrations/supabase/client", () => ({
  supabase: { auth: { getSession } },
}));
const links = { photo: { card: "https://example.com/photo.jpg" } };
const fetchSpy = vi.fn();

beforeEach(() => {
  vi.stubGlobal("fetch", fetchSpy);
  getSession.mockResolvedValue({ data: { session: null } });
  fetchSpy.mockResolvedValue(new Response(JSON.stringify({ links }), { status: 200 }));
});
afterEach(() => {
  vi.resetAllMocks();
  vi.unstubAllGlobals();
});

describe("photo link reader", () => {
  it("UPL-1 without a session the request carries no Authorization header and the links come back", async () => {
    expect(await readPhotoLinks(["photo"])).toEqual(links);
    expect(fetchSpy).toHaveBeenCalledExactlyOnceWith("/api/media/photo-links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ photoIds: ["photo"] }),
    });
  });
  it("UPL-2 with a session the bearer travels", async () => {
    getSession.mockResolvedValue({ data: { session: { access_token: "scratch-token" } } });
    expect(await readPhotoLinks(["photo"])).toEqual(links);
    expect(fetchSpy).toHaveBeenCalledExactlyOnceWith("/api/media/photo-links", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: "Bearer scratch-token" },
      body: JSON.stringify({ photoIds: ["photo"] }),
    });
  });
  it("UPL-3 a refused answer throws with its status and gives no links", async () => {
    const json = vi.fn();
    fetchSpy.mockResolvedValue({ ok: false, status: 403, json });
    await expect(readPhotoLinks(["photo"])).rejects.toThrow("photo links: 403");
    expect(json).not.toHaveBeenCalled();
  });
});
