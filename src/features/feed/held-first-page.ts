import { createSerializationAdapter } from "@tanstack/react-router";

import { errorText } from "@/lib/error-text";

import type { FirstFeedPage } from "./feed-page";

/**
 * D234 S6 — THE FEED'S FIRST PAGE AS THE ROOT LOADER HANDS IT OVER: the
 * server's read (src/server/first-screen.ts), unawaited so the page's shell is
 * sent at once, and — once it has arrived — the page itself, read without
 * waiting.
 *
 * Why the wrapper: the browser must draw the server's cards in its very first
 * render, or React cannot keep the server's HTML (a feed that waits for a
 * promise while the page hydrates is drawn again from scratch). The router
 * hands a promise over as a promise; this adapter (registered in src/start.ts)
 * wraps it the moment the browser reads the page's data, and notes the page
 * when it arrives — the stream delivers it before the page's code runs — so
 * the feed reads `settled` at once and asks React to wait only when it has not
 * arrived yet.
 */
export class HeldFirstPage {
  /** The page once it has arrived (null: no first page); undefined while it travels. */
  settled: { page: FirstFeedPage | null } | undefined = undefined;

  constructor(readonly page: Promise<FirstFeedPage | null>) {
    page.then(
      (value) => {
        this.settled = { page: value };
      },
      (error: unknown) => {
        console.warn("[first-screen] the first page did not arrive:", errorText(error));
        this.settled = { page: null };
      },
    );
  }
}

/** The router's adapter: a HeldFirstPage travels as its promise and is wrapped again on arrival. */
export const heldFirstPageAdapter = createSerializationAdapter({
  key: "ethio-held-first-page",
  test: (value: unknown): value is HeldFirstPage => value instanceof HeldFirstPage,
  toSerializable: (held: HeldFirstPage) => held.page,
  fromSerializable: (page: Promise<FirstFeedPage | null>) => new HeldFirstPage(page),
});
