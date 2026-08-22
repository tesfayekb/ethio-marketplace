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

/**
 * INC-085f — CLIENT-ERROR CAPTURE.
 *
 * Every runtime error channel needs a capture path into the evidence file.
 * The server has `[ssr-error]`; the browser had none, so a crash during
 * hydration produced blank ARIA snapshots and silence. This buffers the last
 * 20 `pageerror` throws and console errors per test and, when the test fails,
 * attaches them AND prints each as a `[client-error]` line the reporter greps
 * out of the job log.
 */
const CLIENT_ERROR_BUFFER = 20;
const CLIENT_ERROR_MESSAGE_CHARS = 500;

function armClientErrorCapture(page: Page, buffer: string[]): void {
  const push = (line: string) => {
    buffer.push(line);
    if (buffer.length > CLIENT_ERROR_BUFFER) buffer.shift();
  };
  page.on("pageerror", (error) => push(`pageerror: ${error.stack ?? error.message}`));
  page.on("console", (message) => {
    if (message.type() !== "error") return;
    // INC-085g — React prints the message in arg 0 and the COMPONENT STACK in a
    // later arg; message.text() alone threw the only useful half away.
    // INC-085h — but jsonValue() on an Error yields `{"name":"Error"}`: the
    // message and the stack are non-enumerable, so the capture regressed to
    // noise. Read every arg IN THE PAGE as `stack ?? String(value)`, and keep
    // message.text() as the baseline so a fully unreadable arg list still
    // records something.
    void (async () => {
      const parts: string[] = [];
      for (const arg of message.args()) {
        try {
          const value = await arg.evaluate((v: unknown) => {
            if (v instanceof Error) return v.stack ?? `${v.name}: ${v.message}`;
            if (typeof v === "string") return v;
            try {
              return JSON.stringify(v) ?? String(v);
            } catch {
              return String(v);
            }
          });
          if (typeof value === "string" && value.length > 0) parts.push(value);
        } catch {
          /* a handle we cannot serialise contributes nothing, never throws */
        }
      }
      const text = message.text();
      const joined = parts.length > 0 ? parts.join(" ") : text;
      // Keep the plain text when the arg walk produced something different,
      // so neither channel can hide the failure.
      const line = joined.includes(text) ? joined : `${text} :: ${joined}`;
      push(`console.error: ${line.slice(0, CLIENT_ERROR_MESSAGE_CHARS)}`);
    })();
  });

}

export const test = base.extend<{ ssrGuard: void; clientErrors: string[] }>({
  clientErrors: [
    async ({ page }, use, testInfo) => {
      const buffer: string[] = [];
      armClientErrorCapture(page, buffer);
      await use(buffer);
      if (testInfo.status === testInfo.expectedStatus || buffer.length === 0) return;
      await testInfo.attach("client-errors", {
        body: buffer.join("\n"),
        contentType: "text/plain",
      });
      for (const entry of buffer) {
        console.log(
          `[client-error] ${entry.replace(/\s+/g, " ").slice(0, CLIENT_ERROR_MESSAGE_CHARS)}`,
        );
      }
    },
    { auto: true },
  ],
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
