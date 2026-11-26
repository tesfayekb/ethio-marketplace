import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * INC-1291 (cursor bundle 7b) — the light read of a session's second-factor state: the level comes from
 * the token, the verified factors from one request to the auth server; nothing here loads the database
 * client, and a failed read is a typed failure, never "no factor". Seams: the session door and `fetch`.
 */
const door = vi.hoisted(() => ({ session: vi.fn(), forget: vi.fn(), ended: vi.fn() }));
vi.mock("@/lib/ended-sign-in", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/lib/ended-sign-in")>()),
  reportEndedSignIn: (error: unknown) => door.ended(error),
}));
vi.mock("@/lib/supabase-door", () => ({
  currentSession: () => door.session(),
  forgetStoredSession: () => door.forget(),
  projectEnv: () => ({ url: "https://p.example.invalid", key: "sb_publishable_test" }),
}));

import { readSessionLevel, readVerifiedFactors } from "./session-level";

function token(claims: object): string {
  const part = (value: object) => btoa(JSON.stringify(value)).replace(/=+$/, "");
  return `${part({ alg: "none" })}.${part(claims)}.sig`;
}

beforeEach(() => {
  door.session.mockReset();
  door.forget.mockReset();
  door.ended.mockReset();
  vi.unstubAllGlobals();
});

describe("readSessionLevel", () => {
  it("SLV-1 reads the level from the token's claim", async () => {
    door.session.mockResolvedValue({
      session: { access_token: token({ aal: "aal2" }) },
      failed: false,
    });
    expect(await readSessionLevel()).toMatchObject({ ok: true, current: "aal2" });
    door.session.mockResolvedValue({
      session: { access_token: token({ aal: "aal1" }) },
      failed: false,
    });
    expect(await readSessionLevel()).toMatchObject({ ok: true, current: "aal1" });
  });

  it("SLV-2 a session that could not be read, or none, is a typed failure and never a level", async () => {
    door.session.mockResolvedValue({
      session: null,
      failed: true,
      error: new TypeError("offline"),
    });
    const failed = await readSessionLevel();
    expect(failed.ok).toBe(false);
    door.session.mockResolvedValue({ session: null, failed: false });
    const none = await readSessionLevel();
    expect(none).toMatchObject({ ok: false });
    expect(Reflect.get(none.ok ? {} : (none.error as object), "failure")).toMatchObject({
      status: 401,
    });
  });
});

describe("readVerifiedFactors", () => {
  function answer(body: unknown, status = 200) {
    const call = vi.fn(
      async (_url: string, _init?: RequestInit) => new Response(JSON.stringify(body), { status }),
    );
    vi.stubGlobal("fetch", call);
    return call;
  }

  it("SLV-3 counts the verified TOTP factors from one authenticated request", async () => {
    const call = answer({
      factors: [
        { factor_type: "totp", status: "verified" },
        { factor_type: "totp", status: "unverified" },
        { factor_type: "phone", status: "verified" },
      ],
    });
    expect(await readVerifiedFactors("t0k")).toEqual({ ok: true, verified: 1 });
    expect(call).toHaveBeenCalledTimes(1);
    const [url, init] = call.mock.calls[0] ?? [];
    expect(url).toBe("https://p.example.invalid/auth/v1/user");
    expect(init?.headers).toMatchObject({ Authorization: "Bearer t0k" });
  });

  it("SLV-4 an account with no factors answers none, not a failure", async () => {
    answer({ id: "u" });
    expect(await readVerifiedFactors("t")).toEqual({ ok: true, verified: 0 });
    answer({ factors: null });
    expect(await readVerifiedFactors("t")).toEqual({ ok: true, verified: 0 });
  });

  it("SLV-5 a refused or unreachable read is a failure, never zero factors", async () => {
    answer({ message: "x" }, 503);
    expect(await readVerifiedFactors("t")).toMatchObject({ ok: false });
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new TypeError("Failed to fetch");
      }),
    );
    expect(await readVerifiedFactors("t")).toMatchObject({ ok: false });
    answer({ factors: "nope" });
    expect(await readVerifiedFactors("t")).toMatchObject({ ok: false });
  });

  it("SLV-6 an answer that says the session is gone forgets the stored session and tells the shell", async () => {
    answer(
      {
        code: 403,
        error_code: "session_not_found",
        msg: "Session from session_id claim in JWT does not exist",
      },
      403,
    );
    expect(await readVerifiedFactors("t")).toMatchObject({ ok: false });
    expect(door.forget).toHaveBeenCalledTimes(1);
    expect(door.ended).toHaveBeenCalledWith({ status: 403, code: "session_not_found" });
  });

  it("SLV-7 a 401 is reported without dropping the session; a server failure does not drop it either (the shell reads the report itself)", async () => {
    answer({}, 401);
    expect(await readVerifiedFactors("t")).toMatchObject({ ok: false });
    expect(door.forget).not.toHaveBeenCalled();
    expect(door.ended).toHaveBeenCalledWith({ status: 401, code: null });
    door.ended.mockReset();
    answer({}, 503);
    expect(await readVerifiedFactors("t")).toMatchObject({ ok: false });
    expect(door.forget).not.toHaveBeenCalled();
    expect(door.ended).toHaveBeenCalledWith({ status: 503, code: null });
  });
});
