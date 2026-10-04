import { describe, expect, it, vi } from "vitest";

vi.mock("@/integrations/supabase/client", () => ({ supabase: {} }));

const { needsAliasReason, profileEditErrorKey } = await import("./admin-users-service");

/**
 * Bundle 3 step 22 — the admin page asks for a reason only when the door
 * refuses a name for want of one; shape and "taken" stay plain refusals.
 */
describe("admin alias reason", () => {
  it("asks for a reason when the door says the name needs one", () => {
    const error = { message: "seller alias needs a reason: e" };
    expect(needsAliasReason(error)).toBe(true);
    expect(profileEditErrorKey(error)).toBe("admin.users.edit.errorAliasReason");
  });

  it("does not ask for a reason for a taken name or a bad shape", () => {
    expect(needsAliasReason({ message: "seller alias already taken" })).toBe(false);
    expect(profileEditErrorKey({ message: "seller alias already taken" })).toBe(
      "admin.users.edit.errorAliasTaken",
    );
    expect(needsAliasReason({ message: "seller alias refused: shape" })).toBe(false);
    expect(profileEditErrorKey({ message: "seller alias refused: shape" })).toBe(
      "admin.users.edit.errorAliasFormat",
    );
  });
});
