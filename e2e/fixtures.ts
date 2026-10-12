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
    // eslint-disable-next-line no-restricted-syntax -- DEC-027 census: locator is already scoped to a single viewport twin (or a non-twin surface); grandfathered pending the twin-helper sweep
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
            // eslint-disable-next-line no-restricted-syntax -- DEC-027 census: deliberate wall-clock wait (rate-limit / session-expiry semantics), grandfathered pending a truth poll
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
const CLIENT_ERROR_MESSAGE_CHARS = 2000;
/** DEC-175 — the refusals kept apart, so they never push a page error out of the buffer. */
const REFUSAL_BUFFER = 12;
/** The posting doors whose 200 answer can still say `ok: false`. */
const POSTING_DOORS = new Set([
  "/api/listings/draft",
  "/api/listings/identity",
  "/api/listings/publish",
]);

/**
 * DEC-178 (bundle 11 turn C13; INC-577) — THE CATEGORY FINDER ANSWERS AS THE TEST
 * DECIDES. In CI every browser test reaches `/api/catalog/find` from one address,
 * so the route's E2E dial (two an hour on that one key) refused nearly every
 * search and let a few through. A search that got through was answered from the
 * finder's index, which holds no scratch leaf made since its last rebuild, so a
 * test's own leaf could drop out of step 1's list (PW-157, run 38218977877). And
 * the refusals were printed beside the posting doors' own (INC-533's two 429s).
 *
 * So every fixture page answers the finder with the route's own spent-dial answer
 * (429, `rateLimited`): step 1 shows the name matches and its notice, as nearly
 * every test saw already. A test that needs the finder routes it itself — a route
 * registered later runs first (PW-85 gives each request its own key; PW-86 and
 * PW-105 answer it). Pages a helper opens itself are not stubbed. The stub's
 * answers are left out of the client-error evidence: they say nothing about the test.
 */
const FINDER_ROUTE = "**/api/catalog/find**";
const FINDER_STUB_HEADER = "x-e2e-finder-stub";
/** The finder requests each page's stub answered, so their console lines are left out. */
const finderStubbed = new WeakMap<Page, Set<string>>();

async function stubFinder(page: Page): Promise<void> {
  const answered = new Set<string>();
  finderStubbed.set(page, answered);
  await page.route(FINDER_ROUTE, async (route) => {
    answered.add(route.request().url());
    await route.fulfill({
      status: 429,
      contentType: "application/json",
      headers: { [FINDER_STUB_HEADER]: "1" },
      body: JSON.stringify({ error: "rateLimited" }),
    });
  });
}

/**
 * DEC-175 (bundle 11 turn C8; INC-562's class) — a refusal nobody recorded is as
 * undiagnosable as a 500 (INC-109). Every 4xx answer of the app's own routes
 * (`/api/…`) and of the database and sign-in services (`/auth/v1/…`,
 * `/rest/v1/…`, `/functions/v1/…`) is named — method, path and status, never
 * the query (it can carry ids and filters), and the body's first 200
 * characters; and a 200 from a posting door that says `ok: false` names its
 * refusals. Printed with the other client errors, only when the test fails.
 */
function armRefusalCapture(page: Page, refusals: string[]): void {
  const push = (line: string) => {
    refusals.push(line);
    if (refusals.length > REFUSAL_BUFFER) refusals.shift();
  };
  page.on("response", (response) => {
    let path: string;
    try {
      path = new URL(response.url()).pathname;
    } catch {
      return;
    }
    const status = response.status();
    const watched = path.startsWith("/api/") || /^\/(auth|rest|functions)\/v1\//.test(path);
    if (!watched) return;
    // DEC-178 — the finder stub's answer says nothing about the test.
    if (response.headers()[FINDER_STUB_HEADER] === "1") return;
    const method = response.request().method();
    if (status >= 400 && status < 500) {
      void (async () => {
        let body = "";
        try {
          body = (await response.text()).replace(/\s+/g, " ").slice(0, 200);
        } catch {
          body = "(body unavailable)";
        }
        push(`HTTP ${status} ${method} ${path} (${body})`);
      })();
      return;
    }
    if (status === 200 && POSTING_DOORS.has(path)) {
      void (async () => {
        try {
          const answer = (await response.json()) as { ok?: unknown; refusals?: unknown };
          if (answer.ok !== false) return;
          const reasons = Array.isArray(answer.refusals)
            ? answer.refusals
                .map((r) => {
                  const row = (r ?? {}) as Record<string, unknown>;
                  return `${String(row["field"] ?? row["attr_key"] ?? "?")}:${String(row["reason"] ?? "?")}`;
                })
                .join(",")
            : "";
          push(`refused ${method} ${path}: ok=false (${reasons || "no reasons"})`);
        } catch {
          /* an answer that is not JSON is not a refusal this capture can name */
        }
      })();
    }
  });
}

function armClientErrorCapture(page: Page, buffer: string[]): void {
  const push = (line: string) => {
    buffer.push(line);
    if (buffer.length > CLIENT_ERROR_BUFFER) buffer.shift();
  };
  // INC-085i — preserve the complete stack in the attachment. Console lines
  // have a 2,000-character transport cap below; page errors are never capped.
  page.on("pageerror", (error) => push(`pageerror: ${error.stack ?? error.message}`));
  // INC-109 — a 500 whose URL nobody recorded is an undiagnosable failure.
  // Every 5xx response (document, fetch, xhr — any resource type) names its
  // endpoint here, on the same `[client-error]` tag the reporter greps.
  page.on("response", (response) => {
    if (response.status() < 500) return;
    void (async () => {
      let body = "";
      try {
        body = (await response.text()).replace(/\s+/g, " ").slice(0, 200);
      } catch {
        body = "(body unavailable)";
      }
      push(`HTTP ${response.status()} ${response.request().method()} ${response.url()} (${body})`);
    })();
  });
  page.on("console", (message) => {
    if (message.type() !== "error") return;
    // DEC-178 — the browser's "Failed to load resource" line for a stubbed finder
    // request names that request's address as its location.
    if (finderStubbed.get(page)?.has(message.location().url) === true) return;
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

export const test = base.extend<{ ssrGuard: void; clientErrors: string[]; finderStub: void }>({
  finderStub: [
    async ({ page }, use) => {
      await stubFinder(page);
      await use();
    },
    { auto: true },
  ],
  clientErrors: [
    async ({ page }, use, testInfo) => {
      const buffer: string[] = [];
      const refusals: string[] = [];
      armClientErrorCapture(page, buffer);
      armRefusalCapture(page, refusals);
      await use(buffer);
      const lines = [...buffer, ...refusals];
      if (testInfo.status === testInfo.expectedStatus || lines.length === 0) return;
      await testInfo.attach("client-errors", {
        body: lines.join("\n"),
        contentType: "text/plain",
      });
      for (const entry of lines) {
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
