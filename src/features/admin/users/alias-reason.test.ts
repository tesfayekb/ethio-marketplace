import { describe, expect, it, vi } from "vitest";

import { StepUpCancelled, StepUpUnavailable } from "@/features/auth/mfa/mfa-service";

vi.mock("@/integrations/supabase/client", () => ({ supabase: {} }));

const { asksAliasReason, profileEditRefusalKey } = await import("./admin-users-service");

/**
 * Bundle 3 step 22 — the admin page asks for a reason only when the door
 * refuses a name for want of one; shape and "taken" stay plain refusals.
 * F1-2 — admin_update_profile answers codes (`code[:detail]`), read through
 * the one reader with the profile edit's words.
 */
describe("admin alias reason", () => {
  it("asks for a reason when the door answers aliasReserved:<rule>", () => {
    const error = { message: "aliasReserved:e" };
    expect(asksAliasReason(error)).toBe(true);
    expect(profileEditRefusalKey(error)).toBe("admin.users.edit.errorAliasReason");
  });

  it("does not ask for a reason for a taken name or a bad shape", () => {
    expect(asksAliasReason({ message: "aliasTaken" })).toBe(false);
    expect(profileEditRefusalKey({ message: "aliasTaken" })).toBe(
      "admin.users.edit.errorAliasTaken",
    );
    expect(asksAliasReason({ message: "aliasShape" })).toBe(false);
    expect(profileEditRefusalKey({ message: "aliasShape" })).toBe(
      "admin.users.edit.errorAliasFormat",
    );
  });
});

describe("profile edit refusals (F1-2)", () => {
  it.each([
    ["permissionDenied", "admin.users.edit.errorPermission"],
    ["permissionDenied:scope", "admin.users.edit.errorPermission"],
    ["nameRequired", "admin.users.edit.errorNameRequired"],
    ["unknownCountry", "admin.users.edit.errorCountry"],
    ["unknownUser", "admin.users.edit.failed"],
    ["rateLimited", "admin.users.edit.failed"],
    ["accountDeactivated", "admin.users.edit.failed"],
  ])("%s reads as %s", (message, key) => {
    expect(profileEditRefusalKey({ message })).toBe(key);
  });

  it("reads the step-up gate and the alias index's race by their sentences", () => {
    expect(profileEditRefusalKey({ code: "P0009", message: "step-up required" })).toBe(
      "admin.users.edit.errorStepUp",
    );
    expect(
      profileEditRefusalKey({
        message: 'duplicate key value violates unique constraint "profiles_seller_alias_unique"',
      }),
    ).toBe("admin.users.edit.errorAliasTaken");
  });

  it("says nothing for a cancelled step-up and the hint when no factor exists", () => {
    expect(profileEditRefusalKey(new StepUpCancelled())).toBeNull();
    expect(profileEditRefusalKey(new StepUpUnavailable())).toBe("mfa.stepUpUnavailableHint");
  });

  it("falls back to the editor's generic for anything else", () => {
    expect(profileEditRefusalKey({ message: "user not found" })).toBe("admin.users.edit.failed");
    expect(profileEditRefusalKey(new Error("network down"))).toBe("admin.users.edit.failed");
    expect(profileEditRefusalKey(null)).toBe("admin.users.edit.failed");
  });
});
