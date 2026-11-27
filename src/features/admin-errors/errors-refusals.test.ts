import { describe, expect, it } from "vitest";

import { errorsRefusalKey } from "./errors-refusals";

describe("the error doors' words (DEC-474 Part F)", () => {
  it("ERFW-1 each gate code the doors answer has its words; a badValue the readers never send draws the server's line", () => {
    const refused = (message: string) => ({ message, code: "P0D01" });
    expect(errorsRefusalKey(refused("notSignedIn"))).toBe("session.expired");
    expect(errorsRefusalKey(refused("permissionDenied"))).toBe("failure.noAccess");
    expect(errorsRefusalKey(refused("accountDeactivated"))).toBe("failure.noAccess");
    expect(errorsRefusalKey(refused("badValue:days"))).toBe("failure.server");
    expect(errorsRefusalKey(refused("badValue:group"))).toBe("failure.server");
  });
});
