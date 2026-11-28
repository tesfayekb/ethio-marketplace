import { expect, it } from "vitest";

import { decisionRefusalKey } from "./use-screening";

/** INC-1350 — the decision family words an ad deleted under the reviewer as gone. */
it("UFG-2 the decision family reads notYourListing as failure.gone", () => {
  expect(decisionRefusalKey({ code: "P0D01", message: "notYourListing" })).toBe("failure.gone");
});
