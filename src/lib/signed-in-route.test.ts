import { beforeEach, describe, expect, it, vi } from "vitest";

const currentSession = vi.fn();
// DEC-261 — the session through the client's door.
vi.mock("@/lib/supabase-door", () => ({
  currentSession: (...args: unknown[]) => currentSession(...args),
}));

import { requireSignedIn } from "./signed-in-route";

describe("requireSignedIn (INC-852)", () => {
  beforeEach(() => currentSession.mockReset());

  it("SIR-1 a visitor is thrown to /auth with the exact way back", async () => {
    currentSession.mockResolvedValue({ session: null, failed: false });
    const failure = await requireSignedIn("/account").catch((thrown: unknown) => thrown);
    expect(failure).toMatchObject({ options: { to: "/auth", search: { return: "/account" } } });
  });

  it("SIR-2 a session answers the user's id", async () => {
    currentSession.mockResolvedValue({ session: { user: { id: "u-1" } }, failed: false });
    await expect(requireSignedIn("/account")).resolves.toEqual({ userId: "u-1" });
  });
});
