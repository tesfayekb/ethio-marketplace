import { describe, expect, it } from "vitest";

import { Route } from "./__root";

/**
 * DEC-272 (Foundations turn 34w-2, INC-927) — the root's server facts are read once per page
 * load: a navigation to the page already shown does not read them again (offline, that read
 * failed and the root's error view replaced the app — the offline sign-out, SO-12).
 */
describe("the root reads its facts once (DEC-272)", () => {
  it("RRO-1 the root route never reloads on a navigation; only an invalidation reads it again", () => {
    expect(Route.options.shouldReload).toBe(false);
  });
});
