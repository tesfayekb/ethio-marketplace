import { expect, it } from "vitest";

import { moveErrorKey } from "./move-reasons";

/** INC-1350 — the move family words a deleted ad as gone, never its generic line. */
it("UFG-1 the move family reads ownerDeleted as failure.gone", () => {
  expect(moveErrorKey({ code: "P0D01", message: "ownerDeleted" })).toBe("failure.gone");
});
