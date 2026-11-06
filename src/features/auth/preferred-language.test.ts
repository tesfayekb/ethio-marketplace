import { readFileSync } from "node:fs";
import { join } from "node:path";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ReaderError } from "@/lib/reader-failure";

/**
 * INC-1069 (F1-1) — THE ACCOUNT-SYNC PAIR IS A LEAF. The i18n provider every page draws
 * imports fetchPreferredLanguage and savePreferredLanguage from preferred-language.ts, which
 * reaches the door and auth-client.ts only — never auth-service.ts — so the provider chunk
 * carries no sign-up, OAuth, password or identity code (PRL-2). The pair keeps INC-915's
 * answers carried out of ASC-1: a client that did not load is a failure answer, never a
 * rejection (PRL-1). DEC-348 (ruling 5) applies the same rule one level up: the shell's hook
 * owns the session and sign-out through the leaf sign-out.ts, and no entry-path module
 * imports the auth service or door-codes (PRL-3).
 */
const door = vi.hoisted(() => ({
  getSupabase: vi.fn(),
  currentSession: vi.fn(),
}));

vi.mock("@/lib/supabase-door", async (importOriginal) => {
  const real = await importOriginal<typeof import("@/lib/supabase-door")>();
  return {
    ...real,
    getSupabase: () => door.getSupabase(),
    currentSession: () => door.currentSession(),
  };
});

const leaf = await import("./preferred-language");

let errors: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  door.getSupabase
    .mockReset()
    .mockRejectedValue(new TypeError("Failed to fetch dynamically imported module"));
  door.currentSession
    .mockReset()
    .mockResolvedValue({ session: { user: { id: "user-1" }, access_token: "t" }, failed: false });
  errors = vi.spyOn(console, "error").mockImplementation(() => undefined);
});

afterEach(() => {
  errors.mockRestore();
});

describe("the account-sync leaf (INC-1069)", () => {
  it("PRL-1 a client that did not load is each call's failure answer, never a rejection (INC-915)", async () => {
    expect(await leaf.fetchPreferredLanguage()).toEqual({
      ok: false,
      signedOut: false,
      error: new ReaderError({ class: "network", message: "the client did not load" }),
    });
    expect(await leaf.savePreferredLanguage(null)).toEqual({
      ok: false,
      reason: "the client did not load",
    });
    expect(errors).toHaveBeenCalledWith(
      "[client-error] the sign-in code did not load:",
      "Failed to fetch dynamically imported module",
    );
    // Signed out is its own answer and asks for no client (DEC-261).
    door.getSupabase.mockClear();
    door.currentSession.mockResolvedValue({ session: null, failed: false });
    expect(await leaf.fetchPreferredLanguage()).toEqual({ ok: false, signedOut: true });
    expect(await leaf.savePreferredLanguage("am")).toEqual({ ok: false, reason: "no session" });
    expect(door.getSupabase).not.toHaveBeenCalled();
  });

  it("PRL-2 the provider imports the leaf, and the leaf never imports the auth service", () => {
    const root = join(__dirname, "..", "..");
    const provider = readFileSync(join(root, "i18n", "provider.tsx"), "utf8");
    expect(provider).toContain('from "@/features/auth/preferred-language"');
    expect(provider).not.toContain("auth-service");
    for (const file of ["preferred-language.ts", "auth-client.ts"]) {
      const text = readFileSync(join(__dirname, file), "utf8");
      expect(text, file).not.toMatch(/from ["'][^"']*auth-service["']/);
      expect(text, file).not.toMatch(/from ["']@\/i18n/);
    }
  });

  it("PRL-3 the entry closure imports no auth service: the shell's hook owns the session and sign-out through the leaf (DEC-348)", () => {
    const root = join(__dirname, "..", "..");
    const entryPath = [
      "routes/__root.tsx",
      "components/app-shell.tsx",
      "features/auth/use-auth.ts",
      "i18n/provider.tsx",
    ];
    for (const file of entryPath) {
      const text = readFileSync(join(root, file), "utf8");
      expect(text, file).not.toMatch(/from ["'][^"']*auth-service["']/);
      expect(text, file).not.toMatch(/from ["']@\/lib\/door-codes["']/);
    }
    const hook = readFileSync(join(__dirname, "use-auth.ts"), "utf8");
    expect(hook).toContain('from "./sign-out"');
    // The leaves the hook reaches import nothing of the service.
    for (const file of ["sign-out.ts", "auth-result.ts", "auth-client.ts"]) {
      const text = readFileSync(join(__dirname, file), "utf8");
      expect(text, file).not.toMatch(/from ["'][^"']*auth-service["']/);
    }
    // The sign-in family is the auth route's own import from the service.
    const route = readFileSync(join(root, "routes", "auth.tsx"), "utf8");
    expect(route).toMatch(/signInWithPassword,[\s\S]*?from "@\/features\/auth\/auth-service"/);
    expect(route).not.toContain("use-auth");
  });
});
