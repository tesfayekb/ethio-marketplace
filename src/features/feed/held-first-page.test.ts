import { describe, expect, it } from "vitest";

import { feedPath, type FirstFeedPage } from "./feed-page";
import { HeldFirstPage, heldFirstPageAdapter } from "./held-first-page";

/**
 * D234 S6 — HFP-1…HFP-3. The feed's first page as the root loader hands it
 * over: travelling as its promise, wrapped again on arrival, and readable at
 * once once it has arrived (the browser's first render then draws the server's
 * cards and React keeps them).
 */
const PAGE: FirstFeedPage = {
  path: feedPath(null, null, null),
  page: { cards: [], ladder: ["00000000-0000-0000-0000-000000000000"], next: null },
  covers: [],
  places: [],
};

describe("HeldFirstPage (D234 S6)", () => {
  it("HFP-1 the page is read at once after it arrives; nothing while it travels", async () => {
    let arrive: (value: FirstFeedPage | null) => void = () => undefined;
    const held = new HeldFirstPage(new Promise((resolve) => (arrive = resolve)));
    expect(held.settled).toBeUndefined();
    arrive(PAGE);
    await held.page;
    expect(held.settled).toEqual({ page: PAGE });
  });

  it("HFP-2 a page that never arrives reads as no first page", async () => {
    const held = new HeldFirstPage(Promise.reject(new Error("lost")));
    await held.page.catch(() => undefined);
    await Promise.resolve();
    expect(held.settled).toEqual({ page: null });
  });

  it("HFP-3 the router's adapter: it claims only a HeldFirstPage, sends its promise, wraps it again", async () => {
    const held = new HeldFirstPage(Promise.resolve(PAGE));
    expect(heldFirstPageAdapter.test(held)).toBe(true);
    expect(heldFirstPageAdapter.test(held.page)).toBe(false);
    expect(heldFirstPageAdapter.test({ page: held.page })).toBe(false);
    expect(heldFirstPageAdapter.toSerializable(held)).toBe(held.page);
    const arrived = heldFirstPageAdapter.fromSerializable(Promise.resolve(PAGE));
    expect(arrived).toBeInstanceOf(HeldFirstPage);
    await arrived.page;
    expect(arrived.settled).toEqual({ page: PAGE });
  });
});
