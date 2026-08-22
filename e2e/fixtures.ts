import { test as base, expect, type Page } from "@playwright/test";

/**
 * DEC-018 / INC-085d — THE CENTRAL DOCUMENT-RESPONSE GUARD.
 *
 * Every spec imports `test` from this file instead of `@playwright/test`, so
 * the guard is armed for every page of every test — not only for navigations
 * that happen to go through `gotoReady`.
 *
 * CONTRACT (bounded, counted, central):
 *  - a document response that is 5xx, or whose body carries the SSR error
 *    page's marker, is a failed page delivery;
 *  - FIRST hit in a test: log `[e2e] ssr error page — retrying <url>` and
 *    reload the page ONCE;
 *  - SECOND hit anywhere in the same test: the test fails with the NAMED error
 *    `SSR error page twice for <url>: <cause>` — never a silent third try
 *    (drawer-retry law).
 */

const MARKER = "This page didn't load";

type GuardState = {
  hits: number;
  /** Set once the second hit lands; thrown by the fixture and by gotoReady. */
  failure: string | null;
  /** In-flight recovery reload, so a navigation helper can wait for it. */
  pending: Promise<void> | null;
};

const states = new WeakMap<Page, GuardState>();

function stateFor(page: Page): GuardState {
  let state = states.get(page);
  if (!state) {
    state = { hits: 0, failure: null, pending: null };
    states.set(page, state);
  }
  return state;
}

/** The visible cause the error page now prints (DEC-018), when present. */
async function readCause(page: Page): Promise<string> {
  try {
    const node = page.getByTestId("ssr-error-cause");
    if ((await node.count()) > 0) return (await node.first().innerText()).trim();
  } catch {
    /* a closed/navigating page simply has no readable cause */
  }
  return "(no visible cause — production build without VITE_E2E)";
}

function isErrorBody(body: string): boolean {
  return body.includes("data-ssr-error") || body.includes(MARKER);
}

/**
 * Arms the guard on a page. Exported so helpers that create their own pages or
 * contexts (switchUser and friends) can opt those pages in too.
 */
export function armSsrGuard(page: Page): void {
  const state = stateFor(page);
  page.on("response", (response) => {
    void (async () => {
      if (response.request().resourceType() !== "document") return;
      let hit = response.status() >= 500;
      if (!hit) {
        const type = response.headers()["content-type"] ?? "";
        if (!type.includes("text/html")) return;
        try {
          hit = isErrorBody(await response.text());
        } catch {
          return; // a body we cannot read is not evidence of anything
        }
      }
      if (!hit) return;

      state.hits += 1;
      const url = response.url();
      if (state.hits === 1) {
        console.log(`[e2e] ssr error page — retrying ${url}`);
        state.pending = (async () => {
          try {
            await page.waitForTimeout(500);
            await page.reload();
          } catch {
            /* the reload racing a test-driven navigation is not the failure */
          }
        })();
        await state.pending;
        state.pending = null;
        return;
      }
      const cause = await readCause(page);
      state.failure = `SSR error page twice for ${url}: ${cause}`;
    })();
  });
}

/**
 * Throws the guard's NAMED error if this page has already burned its one
 * retry. Navigation helpers call this so the failure surfaces at the
 * navigation, not 60 s later at an unrelated assertion.
 */
export async function assertSsrHealthy(page: Page): Promise<void> {
  const state = states.get(page);
  if (!state) return;
  if (state.pending) await state.pending;
  if (state.failure) throw new Error(state.failure);
}

export const test = base.extend<{ ssrGuard: void }>({
  ssrGuard: [
    async ({ page }, use) => {
      armSsrGuard(page);
      await use();
      const state = states.get(page);
      if (state?.failure) throw new Error(state.failure);
    },
    { auto: true },
  ],
});

export { expect };
