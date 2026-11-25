import { describe, expect, it } from "vitest";

import { PROVIDER_ERRORS, providerError, type ProviderErrorEntry } from "./provider-errors";

/**
 * INC-1278 (b) — the one fixture of the provider's real errors: every entry carries its code (or the
 * name of an error the client library raises), its message, and the vendor file:line that sends it.
 */
const SOURCE =
  /^(?:supabase\/auth v2\.197\.0 internal\/[a-z]+\/[a-z_]+\.go|@supabase\/auth-js 2\.110\.9 dist\/module\/lib\/errors\.js|supabase\/migrations\/[0-9]{14}_[0-9a-f-]{36}\.sql):[1-9][0-9]*$/;

describe("PROVIDER_ERRORS (INC-1278 b)", () => {
  const entries: Array<[string, ProviderErrorEntry]> = Object.entries(PROVIDER_ERRORS);

  it("PEF-1 every entry carries its message, its code or name, and its source line", () => {
    expect(entries.length).toBeGreaterThanOrEqual(25);
    for (const [key, entry] of entries) {
      expect(entry.message.trim(), key).not.toBe("");
      expect(entry.source, key).toMatch(SOURCE);
      if (entry.code !== undefined) expect(entry.code, key).toBe(key);
      else expect(entry.name === key || key === "disposableEmail", key).toBe(true);
    }
  });

  it("PEF-2 a mocked error is the entry's message, code, name and status, and no other word", () => {
    expect(providerError("same_password")).toEqual({
      message: "New password should be different from the old password.",
      code: "same_password",
      status: 422,
    });
    expect(providerError("AuthSessionMissingError")).toEqual({
      message: "Auth session missing!",
      name: "AuthSessionMissingError",
      status: 400,
    });
  });
});
