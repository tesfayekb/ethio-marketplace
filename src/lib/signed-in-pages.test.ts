import { describe, expect, it } from "vitest";

import { sendsToSignIn, SIGNED_IN_PAGES } from "./signed-in-pages";

describe("the door-step's pages (INC-925)", () => {
  it("SIP-1 sendsToSignIn answers each door-step page and the pages below it, and nothing beside them", () => {
    for (const page of SIGNED_IN_PAGES) {
      expect(sendsToSignIn(page), page).toBe(true);
      expect(sendsToSignIn(`${page}/x`), `${page}/x`).toBe(true);
      expect(sendsToSignIn(`${page}x`), `${page}x`).toBe(false);
    }
    for (const page of ["/", "/auth", "/legal/terms", "/admin", "/c/vehicles", "/l/x"])
      expect(sendsToSignIn(page), page).toBe(false);
  });
});
