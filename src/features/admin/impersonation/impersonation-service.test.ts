import { expect, it } from "vitest";

import { isExpiredSessionError } from "./impersonation-service";

it("reads an expired-session database refusal object", () => {
  expect(isExpiredSessionError({ message: "impersonation session expired", code: "P0001" })).toBe(
    true,
  );
});
