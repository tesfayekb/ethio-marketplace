import { describe, expect, it, vi } from "vitest";

vi.mock("@/integrations/supabase/client", () => ({ supabase: {} }));

const { accessRefusalKey } = await import("./access-refusals");
const coded = (code: string) => Object.assign(new Error(code), { code: "P0D01" });

/** INC-1280 (10a-2, D30) — the status and role doors' codes reach words. */
describe("account status and role words (INC-1280)", () => {
  it("RWU-U1 the status door's codes", () => {
    expect(accessRefusalKey(coded("unknownUser"), "status")).toBe("admin.users.error.unknownUser");
    expect(accessRefusalKey(coded("required:reason"), "status")).toBe("post.refusal.required");
  });
  it("RWU-U2 the role doors' codes", () => {
    expect(accessRefusalKey(coded("roleReserved"), "roles")).toBe("admin.users.roles.reserved");
    expect(accessRefusalKey(coded("unknownRole"), "roles")).toBe("admin.users.roles.unknown");
    expect(accessRefusalKey(coded("badCountryCode"), "roles")).toBe(
      "admin.countries.error.badCountryCode",
    );
  });
  it("RWU-U3 a door code with no line draws the block's generic", () => {
    expect(accessRefusalKey(coded("badValue:status"), "status")).toBe("admin.users.status.failed");
    expect(accessRefusalKey(coded("badValue:x"), "roles")).toBe("admin.users.roles.failed");
  });
  it("RWU-U4 a network failure is the notice's, not a refusal line", () => {
    expect(accessRefusalKey(new TypeError("Failed to fetch"), "status")).toBeNull();
  });
});
