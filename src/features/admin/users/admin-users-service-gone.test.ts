import { expect, it } from "vitest";

import { profileEditRefusalKey } from "./admin-users-service";

/** INC-1350 — the profile edit family words a deleted account as gone. */
it("UFG-3 the profile edit family reads unknownUser as failure.gone", () => {
  expect(profileEditRefusalKey({ code: "P0D01", message: "unknownUser" })).toBe("failure.gone");
});
