import { describe, expect, it, vi } from "vitest";

const rpc = vi.fn();
// DEC-261 — the database call through the client's door.
vi.mock("@/lib/supabase-door", () => ({
  rpc: (...args: unknown[]) => rpc(...args),
}));

const { revealContact, telegramHref, whatsappHref, telHref } = await import("./contact");

describe("contact link helpers (bundle 19 turn 11)", () => {
  it("telegramHref strips the @ and refuses an empty handle", () => {
    expect(telegramHref("@scratch_seller")).toBe("https://t.me/scratch_seller");
    expect(telegramHref("")).toBeNull();
    expect(telegramHref("@!!")).toBeNull();
  });

  it("whatsappHref keeps digits only, drops the +, encodes the text, refuses short numbers", () => {
    expect(whatsappHref("+251 911 000001", "hi")).toBe("https://wa.me/251911000001?text=hi");
    expect(whatsappHref("+12345", "hi")).toBeNull();
  });

  it("telHref removes spaces", () => {
    expect(telHref("+251 911 000 001")).toBe("tel:+251911000001");
  });

  it("telHref keeps the stored value's digits and one leading + only, and refuses under three digits (DEC-370)", () => {
    expect(telHref("(0911) 000-001")).toBe("tel:0911000001");
    expect(telHref(" ++251-911 ")).toBe("tel:+251911");
    expect(telHref("911;javascript:alert(1)")).toBe("tel:9111");
    expect(telHref("12")).toBeNull();
    expect(telHref("call me")).toBeNull();
    expect(telHref("")).toBeNull();
  });
});

describe("revealContact's parser (bundle 19 turn 11)", () => {
  it("keeps shown channels with values and drops messages and hidden rows", async () => {
    rpc.mockResolvedValueOnce({
      data: {
        ok: true,
        channels: {
          phone: { show: true, value: "+251911000001" },
          phone2: { show: false, value: "+251911000002" },
          telegram: { show: true, value: "  " },
          messages: true,
        },
      },
      error: null,
    });
    expect(await revealContact("abc")).toEqual({ ok: true, channels: { phone: "+251911000001" } });
  });

  it("passes the body's two returned ceilings through", async () => {
    rpc.mockResolvedValueOnce({
      data: { ok: false, reason: "sellersCapReached", resets_at: "2026-11-18T00:00:00Z" },
      error: null,
    });
    expect(await revealContact("abc")).toEqual({ ok: false, reason: "sellersCapReached" });
    rpc.mockResolvedValueOnce({
      data: { ok: false, reason: "rateLimited", resets_at: "2026-11-18T00:00:00Z" },
      error: null,
    });
    expect(await revealContact("abc")).toEqual({ ok: false, reason: "rateLimited" });
  });

  it("reads the shell's codes as errors: listingNotAvailable and the gate's rateLimited", async () => {
    rpc.mockResolvedValueOnce({ data: null, error: { message: "listingNotAvailable" } });
    expect(await revealContact("abc")).toEqual({ ok: false, reason: "listingNotAvailable" });
    rpc.mockResolvedValueOnce({ data: null, error: { message: "rateLimited" } });
    expect(await revealContact("abc")).toEqual({ ok: false, reason: "rateLimited" });
  });

  it("maps any other error to failed", async () => {
    for (const message of ["notSignedIn", "accountDeactivated", "boom"]) {
      rpc.mockResolvedValueOnce({ data: null, error: { message } });
      expect(await revealContact("abc")).toEqual({ ok: false, reason: "failed" });
    }
  });
});

describe("contact acceptance (bundle 22 turn 6)", () => {
  it("reads acceptanceRequired, now the shell's code, as an error", async () => {
    rpc.mockResolvedValueOnce({ data: null, error: { message: "acceptanceRequired" } });
    expect(await revealContact("abc")).toEqual({ ok: false, reason: "acceptanceRequired" });
  });
  it("still refuses an unknown reason as failed", async () => {
    rpc.mockResolvedValueOnce({ data: { ok: false, reason: "unknown" }, error: null });
    expect(await revealContact("abc")).toEqual({ ok: false, reason: "failed" });
  });
});
