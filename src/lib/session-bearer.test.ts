import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * DEC-261 (Foundations turn 34, ruling 2 R2-5) — THE SESSION'S BEARER ON A SERVER FUNCTION
 * CALL, proven on the module's real export: the middleware's client step (TanStack Start's
 * `createMiddleware(...).client(fn)` keeps `fn` as `options.client`) is called with a
 * stand-in `next`, and the headers it hands on are read.
 */
const door = vi.hoisted(() => ({ currentSession: vi.fn() }));
vi.mock("@/lib/supabase-door", () => ({ currentSession: () => door.currentSession() }));

const { attachSessionBearer } = await import("./session-bearer");

/** The client step, called as the framework calls it; answers the headers handed to next(). */
async function headersSent(): Promise<unknown> {
  const step: unknown = attachSessionBearer.options.client;
  if (typeof step !== "function") throw new Error("the middleware has no client step");
  const next = vi.fn(async (options: unknown) => options);
  await Reflect.apply(step, undefined, [{ next }]);
  expect(next).toHaveBeenCalledTimes(1);
  const [options] = next.mock.calls[0] ?? [];
  return options;
}

beforeEach(() => {
  door.currentSession.mockReset();
});

describe("the session's bearer (DEC-261)", () => {
  it("SBB-1 a session's access token is sent as the bearer", async () => {
    door.currentSession.mockResolvedValue({ session: { access_token: "tok-1" }, failed: false });
    expect(await headersSent()).toEqual({ headers: { Authorization: "Bearer tok-1" } });
  });

  it("SBB-2 no session: no header is added", async () => {
    door.currentSession.mockResolvedValue({ session: null, failed: false });
    expect(await headersSent()).toEqual({ headers: {} });
  });

  it("SBB-3 a failed session read: no header and no throw", async () => {
    door.currentSession.mockResolvedValue({ session: null, failed: true });
    expect(await headersSent()).toEqual({ headers: {} });
  });
});
