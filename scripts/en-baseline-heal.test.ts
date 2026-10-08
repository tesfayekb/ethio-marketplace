import { describe, expect, it } from "vitest";

import { staleEnKeys } from "./en-baseline-heal";

const compiled = { "auth.resendCooldown": "Resend in {s}s", "app.name": "ethio" };

describe("staleEnKeys (INC-493)", () => {
  it("returns a row with an old text", () => {
    expect(
      staleEnKeys(compiled, [
        { key: "auth.resendCooldown", value: "Resend available in {s}s", status: "approved" },
      ]),
    ).toEqual(["auth.resendCooldown"]);
  });

  it("returns an unapproved row", () => {
    expect(staleEnKeys(compiled, [{ key: "app.name", value: "ethio", status: "draft" }])).toEqual([
      "app.name",
    ]);
  });

  it("does not return an equal approved row", () => {
    expect(staleEnKeys(compiled, [{ key: "app.name", value: "ethio", status: "approved" }])).toEqual(
      [],
    );
  });

  it("does not return a scratch key", () => {
    expect(
      staleEnKeys({ ...compiled, "e2e.scratch.x": "a" }, [
        { key: "e2e.scratch.x", value: "b", status: "draft" },
      ]),
    ).toEqual([]);
  });

  it("does not return a key the catalog no longer has", () => {
    expect(staleEnKeys(compiled, [{ key: "auth.retired", value: "x", status: "draft" }])).toEqual(
      [],
    );
  });
});
