import { beforeEach, describe, expect, it, vi } from "vitest";
import { countAdShare, SHARE_LIMIT_PER_HOUR } from "./ad-share";
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
  new Request("http://local/api/listings/share", {
    method: "POST",
    headers: { "cf-connecting-ip": "192.0.2.7" },
    body: JSON.stringify(body),
  });
beforeEach(() => {
  vi.clearAllMocks();
  mocks.rate.mockResolvedValue({ allowed: true });
  mocks.rpc.mockResolvedValue({ data: true, error: null, status: 200 });
  mocks.caller.mockResolvedValue({ userId: "viewer", reason: null });
});
describe("share count route", () => {
  it("SH-1 a good body sends the channel, hashed address and viewer", async () => {
    const answer = await countAdShare(request({ publicId: ID, channel: "copy" }));
    expect(await answer.json()).toEqual({ counted: true });
    expect(mocks.rpc).toHaveBeenCalledExactlyOnceWith("count_listing_share", {
      p_public_id: ID,
      p_channel: "copy",
      p_rate_key: hashAddress("192.0.2.7"),
      p_viewer: "viewer",
    });
    expect(mocks.rate.mock.invocationCallOrder[0]).toBeLessThan(
      mocks.rpc.mock.invocationCallOrder[0] ?? 0,
    );
  });
  it("SH-2 malformed channel, id and empty body are refused before a dial or door", async () => {
    for (const body of [
      { publicId: ID, channel: "email" },
      { publicId: "nope", channel: "copy" },
      {},
    ]) {
      const answer = await countAdShare(request(body));
      expect(answer.status).toBe(400);
      expect(await answer.json()).toEqual({ error: "bad request" });
    }
    expect(mocks.rate).not.toHaveBeenCalled();
    expect(mocks.rpc).not.toHaveBeenCalled();
  });
  it("SH-3 the address limit is 120 an hour and refusal never reaches the door", async () => {
    expect(SHARE_LIMIT_PER_HOUR).toBe(120);
    mocks.rate.mockResolvedValue({ allowed: false });
    const answer = await countAdShare(request({ publicId: ID, channel: "qr" }));
    expect(await answer.json()).toEqual({ counted: false });
    expect(mocks.rate).toHaveBeenCalledWith("listing-share:address", "192.0.2.7", 120, "1 hour");
    expect(mocks.rpc).not.toHaveBeenCalled();
  });
  it("SH-4 upstream failure answers 503, a door error answers counted false", async () => {
    mocks.rpc.mockResolvedValueOnce({ data: null, error: { message: "gateway" }, status: 504 });
    const unavailable = await countAdShare(request({ publicId: ID, channel: "copy" }));
    expect(unavailable.status).toBe(503);
    mocks.rpc.mockResolvedValueOnce({ data: null, error: { message: "refused" }, status: 400 });
    const refused = await countAdShare(request({ publicId: ID, channel: "copy" }));
    expect(await refused.json()).toEqual({ counted: false });
    expect(mocks.log).toHaveBeenCalledWith("/api/listings/share", "refused");
  });
});
