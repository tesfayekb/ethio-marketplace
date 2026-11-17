import { beforeEach, describe, expect, it, vi } from "vitest";
const rpc = vi.fn();
// DEC-261 — the database call through the client's door.
vi.mock("@/lib/supabase-door", () => ({
  rpc: (...args: unknown[]) => rpc(...args),
}));
const { reportListing } = await import("./report");
beforeEach(() => rpc.mockReset());
describe("reportListing", () => {
  it("RD-1 trims a note and sends a blank note as null", async () => {
    rpc.mockResolvedValue({ data: { ok: true }, error: null });
    await reportListing("2345678923", "spam", "  scratch  ");
    expect(rpc).toHaveBeenLastCalledWith("report_listing", {
      p_public_id: "2345678923",
      p_reason: "spam",
      p_note: "scratch",
    });
    await reportListing("2345678923", "other", "  ");
    expect(rpc).toHaveBeenLastCalledWith("report_listing", {
      p_public_id: "2345678923",
      p_reason: "other",
      p_note: null,
    });
  });
  it("RD-2 passes success", async () => {
    rpc.mockResolvedValue({ data: { ok: true }, error: null });
    expect(await reportListing("2345678923", "spam", "")).toEqual({ ok: true });
  });
  it.each(["alreadyReported", "rateLimited", "ownListing"])(
    "RD-3 reads the shell's %s code",
    async (reason) => {
      rpc.mockResolvedValue({ data: null, error: { message: reason } });
      expect(await reportListing("2345678923", "spam", "")).toEqual({ ok: false, reason });
    },
  );
  it.each(["badReason", "noteTooLong", "listingNotAvailable", "notSignedIn", "accountDeactivated"])(
    "RD-3 reads the shell's %s code as the generic line",
    async (message) => {
      rpc.mockResolvedValue({ data: null, error: { message } });
      expect(await reportListing("2345678923", "spam", "")).toEqual({
        ok: false,
        reason: "failed",
      });
    },
  );
  it.each([
    { ok: false, reason: "alreadyReported" },
    { ok: false, reason: "badReason" },
    { ok: false, reason: "noteTooLong" },
    {},
    null,
    { ok: true, reason: "unknown" },
  ])("RD-4 refuses unknown failure shapes except literal success: %j", async (data) => {
    rpc.mockResolvedValue({ data, error: null });
    expect(await reportListing("2345678923", "spam", "")).toEqual(
      data?.ok === true ? { ok: true } : { ok: false, reason: "failed" },
    );
  });
  it("RD-4 an error is failed", async () => {
    rpc.mockResolvedValue({ data: null, error: { message: "scratch failure" } });
    expect(await reportListing("2345678923", "spam", "")).toEqual({ ok: false, reason: "failed" });
  });
});
