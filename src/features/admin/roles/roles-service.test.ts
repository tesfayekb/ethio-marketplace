import { describe, expect, it, vi } from "vitest";

import { StepUpCancelled, StepUpUnavailable } from "@/features/auth/mfa/mfa-service";

vi.mock("@/integrations/supabase/client", () => ({ supabase: {} }));

const { createdRoleId, roleRefusalKey } = await import("./roles-service");

/** F1-2 — the role doors answer codes (`code[:detail]`), read through the one reader. */
describe("role refusals", () => {
  it.each([
    ["permissionDenied", "admin.roles.error.permission"],
    ["systemRole", "admin.roles.error.systemLocked"],
    ["corePermission", "admin.roles.error.coreLocked"],
    ["permissionReserved", "admin.roles.perm.notAssignable"],
    ["hasDependents", "admin.roles.error.hasMembers"],
    ["duplicateKey:name", "admin.roles.error.nameTaken"],
    ["nameRequired", "admin.roles.error.nameRequired"],
    ["badSlug", "admin.roles.error.nameFormat"],
  ])("%s reads as %s", (message, key) => {
    expect(roleRefusalKey({ message }, "admin.roles.perm.failed")).toBe(key);
  });

  it("reads a code without words, or a gate code, as the screen's generic", () => {
    for (const message of [
      "unknownRole",
      "unknownPermission",
      "roleReserved:super_admin",
      "rateLimited:2026-11-14T10:00:00Z",
    ]) {
      expect(roleRefusalKey({ message }, "admin.roles.danger.failed")).toBe(
        "admin.roles.danger.failed",
      );
    }
    expect(roleRefusalKey({ message: "accountDeactivated" }, "admin.roles.meta.failed")).toBe(
      "admin.roles.meta.failed",
    );
  });

  it("reads the step-up gate by its sentence", () => {
    expect(
      roleRefusalKey({ code: "P0009", message: "step-up required" }, "admin.roles.perm.failed"),
    ).toBe("admin.roles.error.stepUp");
  });

  it("says nothing for a cancelled step-up and the hint when no factor exists", () => {
    expect(roleRefusalKey(new StepUpCancelled(), "admin.roles.perm.failed")).toBeNull();
    expect(roleRefusalKey(new StepUpUnavailable(), "admin.roles.perm.failed")).toBe(
      "mfa.stepUpUnavailableHint",
    );
  });

  it("falls back to the screen's generic for a retired sentence or anything else", () => {
    expect(roleRefusalKey({ message: "system role is locked" }, "admin.roles.meta.failed")).toBe(
      "admin.roles.meta.failed",
    );
    expect(roleRefusalKey(new Error("network down"), "admin.roles.create.failed")).toBe(
      "admin.roles.create.failed",
    );
    expect(roleRefusalKey(null, "admin.roles.create.failed")).toBe("admin.roles.create.failed");
  });
});

describe("admin_create_role's answer (the door shell)", () => {
  it("reads the new role's id from { ok: true, id }", () => {
    expect(createdRoleId({ ok: true, id: "r-1" })).toBe("r-1");
  });

  it.each([
    ["a refusal envelope", { ok: false, code: "P0D01", message: "duplicateKey:name" }],
    ["no id", { ok: true }],
    ["the old bare id", "r-1"],
    ["nothing", null],
  ])("answers no role for %s", (_label, data) => {
    expect(createdRoleId(data)).toBeNull();
  });
});
