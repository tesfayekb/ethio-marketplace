import { beforeEach, describe, expect, it, vi } from "vitest";

import { countView, viewSessionId } from "./count-view";

vi.mock("@/integrations/supabase/client", () => ({
  supabase: { auth: { getSession: vi.fn().mockResolvedValue({ data: { session: null } }) } },
}));

const ID = "2345678923";
const lastBody = () => JSON.parse((fetch as ReturnType<typeof vi.fn>).mock.calls.at(-1)?.[1].body);

describe("view session counting (turn 23)", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    sessionStorage.clear();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("{}")));
  });

  it("VC-1 the first call creates ethio.viewSession and sends it; the second call sends the same id", async () => {
    expect(sessionStorage.getItem("ethio.viewSession")).toBeNull();
    await countView(ID);
    const created = sessionStorage.getItem("ethio.viewSession");
    expect(created).toMatch(/^[A-Za-z0-9]{22}$/);
    expect(lastBody()).toEqual({ publicId: ID, session: created });
    await countView(ID);
    expect(lastBody()).toEqual({ publicId: ID, session: created });
    expect(sessionStorage.getItem("ethio.viewSession")).toBe(created);
  });

  it("VC-1 when sessionStorage throws, the body has no session and the call still goes", async () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    expect(viewSessionId()).toBeNull();
    await countView(ID);
    expect(lastBody()).toEqual({ publicId: ID });
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
