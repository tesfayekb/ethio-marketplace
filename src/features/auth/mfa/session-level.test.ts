import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * INC-1291 (cursor bundle 7b) — the light read of a session's second-factor state: the level comes from
 * the token, the verified factors from one request to the auth server; nothing here loads the database
 * client, and a failed read is a typed failure, never "no factor". Seams: the session door and `fetch`.
 */
const door = vi.hoisted(() => ({ session: vi.fn() }));
vi.mock("@/lib/supabase-door", () => ({
  currentSession: () => door.session(),
  projectEnv: () => ({ url: "https://p.example.invalid", key: "sb_publishable_test" }),
}));

import { readSessionLevel, readVerifiedFactors } from "./session-level";

function token(claims: object): string {
  const part = (value: object) => btoa(JSON.stringify(value)).replace(/=+$/, "");
  return `${part({ alg: "none" })}.${part(claims)}.sig`;
}

beforeEach(() => {
  door.session.mockReset();
  vi.unstubAllGlobals();
});

describe("readSessionLevel", () => {
  it("SL-1 reads the level from the token's claim", async () => {
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

  it("SL-2 a session that could not be read, or none, is a typed failure and never a level", async () => {
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
    const call = vi.fn(async () => new Response(JSON.stringify(body), { status }));
    vi.stubGlobal("fetch", call);
    return call;
  }

  it("SL-3 counts the verified TOTP factors from one authenticated request", async () => {
    const call = answer({
      factors: [
        { factor_type: "totp", status: "verified" },
        { factor_type: "totp", status: "unverified" },
        { factor_type: "phone", status: "verified" },
      ],
    });
    expect(await readVerifiedFactors("t0k")).toEqual({ ok: true, verified: 1 });
    expect(call).toHaveBeenCalledTimes(1);
    const [url, init] = call.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("https://p.example.invalid/auth/v1/user");
    expect(init.headers).toMatchObject({ Authorization: "Bearer t0k" });
  });

  it("SL-4 an account with no factors answers none, not a failure", async () => {
    answer({ id: "u" });
    expect(await readVerifiedFactors("t")).toEqual({ ok: true, verified: 0 });
    answer({ factors: null });
    expect(await readVerifiedFactors("t")).toEqual({ ok: true, verified: 0 });
  });

  it("SL-5 a refused or unreachable read is a failure, never zero factors", async () => {
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
});
