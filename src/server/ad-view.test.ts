import { beforeEach, describe, expect, it, vi } from "vitest";
import { countAdView, VIEW_LIMIT_PER_ADDRESS_AD, VIEW_LIMIT_PER_HOUR } from "./ad-view";
import { hashAddress } from "./catalog-find.server";

const mocks = vi.hoisted(() => ({ rate: vi.fn(), rpc: vi.fn(), caller: vi.fn(), log: vi.fn() }));
vi.mock("@/server/supabase/user-client", async (original) => ({
  ...(await original<typeof import("@/server/supabase/user-client")>()),
  consumeRate: mocks.rate,
  userClientFromRequest: mocks.caller,
  logRouteError: mocks.log,
  envDial: (_name: string, fallback: number) => fallback,
}));
vi.mock("@/integrations/supabase/client.server", () => ({ supabaseAdmin: { rpc: mocks.rpc } }));
const ID = "2345678923";
const request = (body: unknown) =>
  new Request("http://local/api/listings/view", {
    method: "POST",
    headers: { "cf-connecting-ip": "192.0.2.7" },
    body: JSON.stringify(body),
  });
beforeEach(() => {
  vi.clearAllMocks();
  mocks.rate.mockResolvedValue({ allowed: true });
  mocks.rpc.mockResolvedValue({ data: true, error: null, status: 200 });
  mocks.caller.mockResolvedValue({ userId: null, reason: "missingBearer" });
});
describe("view count route", () => {
  it("VW-1 a malformed id is 400 before any dial or door", async () => {
    for (const body of [{ publicId: "nope" }, {}]) {
      const response = await countAdView(request(body));
      expect(response.status).toBe(400);
      expect(await response.json()).toEqual({ error: "bad request" });
    }
    expect(mocks.rate).not.toHaveBeenCalled();
    expect(mocks.rpc).not.toHaveBeenCalled();
  });
  it("VW-2 the dial comes before the door, and a spent dial answers counted false", async () => {
    expect(VIEW_LIMIT_PER_HOUR).toBe(600);
    mocks.rate.mockResolvedValueOnce({ allowed: false });
    const spent = await countAdView(request({ publicId: ID }));
    expect(spent.status).toBe(200);
    expect(await spent.json()).toEqual({ counted: false });
    expect(mocks.rpc).not.toHaveBeenCalled();
    await countAdView(request({ publicId: ID }));
    expect(mocks.rate).toHaveBeenLastCalledWith("listing-view:address", "192.0.2.7", 600, "1 hour");
    expect(mocks.rpc).toHaveBeenCalledExactlyOnceWith("count_listing_view", {
      p_public_id: ID,
      p_rate_key: hashAddress("192.0.2.7"),
      p_viewer: undefined,
    });
    expect(hashAddress("192.0.2.7")).toMatch(/^[0-9a-f]{64}$/);
    expect(mocks.rate.mock.invocationCallOrder[1]).toBeLessThan(
      mocks.rpc.mock.invocationCallOrder[0] ?? 0,
    );
  });
  it("VW-3 a signed-in viewer's id reaches the door; a deactivated or unknown bearer does not; a door that cannot be reached is 503", async () => {
    mocks.caller.mockResolvedValueOnce({ userId: "u1", reason: null });
    await countAdView(request({ publicId: ID }));
    expect(mocks.rpc).toHaveBeenLastCalledWith(
      "count_listing_view",
      expect.objectContaining({ p_viewer: "u1" }),
    );
    for (const reason of ["deactivated", "notSignedIn"]) {
      mocks.caller.mockResolvedValueOnce({ userId: null, reason });
      await countAdView(request({ publicId: ID }));
      expect(mocks.rpc).toHaveBeenLastCalledWith(
        "count_listing_view",
        expect.objectContaining({ p_viewer: undefined }),
      );
    }
    mocks.rpc.mockResolvedValueOnce({ data: null, error: { message: "gateway" }, status: 502 });
    const response = await countAdView(request({ publicId: ID }));
    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ error: "upstream unavailable" });
  });
  it("VW-4 a valid session: the session gate, the address-and-ad ceiling, then the door with the session key (turn 23)", async () => {
    expect(VIEW_LIMIT_PER_ADDRESS_AD).toBe(30);
    const session = "Ab3dEf5gHj8kLm2nPq4rSt";
    await countAdView(request({ publicId: ID, session }));
    const sessionKey = hashAddress(session);
    expect(mocks.rate).toHaveBeenNthCalledWith(
      1,
      "listing-view:address",
      "192.0.2.7",
      600,
      "1 hour",
    );
    expect(mocks.rate).toHaveBeenNthCalledWith(
      2,
      "listing-view:session",
      `${sessionKey}:${ID}`,
      1,
      "24 hours",
    );
    expect(mocks.rate).toHaveBeenNthCalledWith(
      3,
      "listing-view:address-ad",
      `192.0.2.7:${ID}`,
      30,
      "1 hour",
    );
    expect(mocks.rpc).toHaveBeenCalledExactlyOnceWith("count_listing_view", {
      p_public_id: ID,
      p_rate_key: `s:${sessionKey}`,
      p_viewer: undefined,
    });
    // A spent session gate answers counted false and never reaches the ceiling or the door.
    mocks.rate.mockReset();
    mocks.rpc.mockClear();
    mocks.rate.mockResolvedValueOnce({ allowed: true }).mockResolvedValueOnce({ allowed: false });
    const spentSession = await countAdView(request({ publicId: ID, session }));
    expect(await spentSession.json()).toEqual({ counted: false });
    expect(mocks.rate).toHaveBeenCalledTimes(2);
    expect(mocks.rpc).not.toHaveBeenCalled();
    // A spent ceiling answers counted false and never reaches the door.
    mocks.rate.mockReset();
    mocks.rate
      .mockResolvedValueOnce({ allowed: true })
      .mockResolvedValueOnce({ allowed: true })
      .mockResolvedValueOnce({ allowed: false });
    const spentCeiling = await countAdView(request({ publicId: ID, session }));
    expect(await spentCeiling.json()).toEqual({ counted: false });
    expect(mocks.rate).toHaveBeenCalledTimes(3);
    expect(mocks.rpc).not.toHaveBeenCalled();
  });
  it("VW-5 a session of the wrong shape takes the original address path (turn 23)", async () => {
    for (const bad of ["short", " ".repeat(17), 42, "a".repeat(65)]) {
      mocks.rate.mockClear();
      mocks.rpc.mockClear();
      await countAdView(request({ publicId: ID, session: bad }));
      expect(mocks.rate).toHaveBeenCalledTimes(1);
      expect(mocks.rate).toHaveBeenLastCalledWith(
        "listing-view:address",
        "192.0.2.7",
        600,
        "1 hour",
      );
      expect(mocks.rpc).toHaveBeenCalledExactlyOnceWith("count_listing_view", {
        p_public_id: ID,
        p_rate_key: hashAddress("192.0.2.7"),
        p_viewer: undefined,
      });
    }
  });
});
