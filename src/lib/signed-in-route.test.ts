import { beforeEach, describe, expect, it, vi } from "vitest";

const getSession = vi.fn();
vi.mock("@/integrations/supabase/client", () => ({
  supabase: { auth: { getSession: (...args: unknown[]) => getSession(...args) } },
}));

import { requireSignedIn } from "./signed-in-route";

describe("requireSignedIn (INC-852)", () => {
  beforeEach(() => getSession.mockReset());

  it("SIR-1 a visitor is thrown to /auth with the exact way back", async () => {
    getSession.mockResolvedValue({ data: { session: null } });
    const failure = await requireSignedIn("/account").catch((thrown: unknown) => thrown);
    expect(failure).toMatchObject({ to: "/auth", search: { return: "/account" } });
  });

  it("SIR-2 a session answers the user's id", async () => {
    getSession.mockResolvedValue({ data: { session: { user: { id: "u-1" } } } });
    await expect(requireSignedIn("/account")).resolves.toEqual({ userId: "u-1" });
  });
});
