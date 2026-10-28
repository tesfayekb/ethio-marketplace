import type { Page } from "@playwright/test";

import { errorText } from "../../src/lib/error-text";

/**
 * INC-959 (Foundations turn C3) — A TEST REACHES THE BROWSER'S OWN DATABASE CLIENT ONE WAY.
 *
 * The app hands its client to the page only in an E2E build, after mount (src/components/app-shell.tsx:
 * `window.__ethioSupabase`), and since DEC-261 the client itself arrives on demand — so a read made
 * the moment a page has drawn can find nothing there. Every test reaches the client here:
 * `awaitBrowserClient` waits for the hand-off with a deadline and, when the client never came, says so
 * in one message; `inBrowserClient` runs the test's own code in the page with the client handed to it
 * as its first argument (a handle on the page's object — no `eval` or `new Function` in the page, and
 * the code stays visible to the type checker). The client's type is declared once, here: a test that
 * needs another of its calls adds it to `BrowserClient`, never a cast of its own.
 * Guard: scripts/conformance/browser-client.test.ts (CF-BC-1/2).
 */

/** A refusal as the browser's client hands it back. */
export type BrowserClientError = {
  message: string;
  code?: string;
  details?: string | null;
  hint?: string | null;
};

/** The calls of the app's client the tests make — extend it here. */
export interface BrowserClient {
  rpc<T = unknown>(
    fn: string,
    args?: Record<string, unknown>,
  ): Promise<{ data: T | null; error: BrowserClientError | null }>;
  auth: {
    getSession(): Promise<{
      data: { session: { access_token: string; user: { id: string } } | null };
      error: { message: string } | null;
    }>;
    signOut(options?: {
      scope?: "local" | "global" | "others";
    }): Promise<{ error: { message: string } | null }>;
    mfa: {
      challengeAndVerify(args: {
        factorId: string;
        code: string;
      }): Promise<{ error: { message: string } | null }>;
      getAuthenticatorAssuranceLevel(): Promise<{
        data: { currentLevel: string | null } | null;
      }>;
    };
  };
}

declare global {
  interface Window {
    /** The app's client, handed to the page by its E2E hook (src/components/app-shell.tsx). */
    __ethioSupabase?: BrowserClient;
  }
}

/** How long a test waits for the hand-off before it fails (readAal's deadline before INC-959). */
export const CLIENT_HANDOFF_MS = 15_000;

/** The one message a test fails with when the page's client never arrived. */
export function clientNeverArrived(timeout: number, cause: unknown): string {
  return (
    `[e2e:browser-client] the page's database client never arrived: the app hands it over after ` +
    `mount (DEC-261) and none was there within ${timeout} ms (${errorText(cause)})`
  );
}

/** Waits for the app's hand-off of its client to the page. */
export async function awaitBrowserClient(page: Page, timeout = CLIENT_HANDOFF_MS): Promise<void> {
  try {
    await page.waitForFunction(() => Boolean(window.__ethioSupabase), undefined, { timeout });
  } catch (error) {
    throw new Error(clientNeverArrived(timeout, error));
  }
}

/**
 * Runs `fn` in the page with the app's client as its first argument (and `arg`, serialisable, as its
 * second), once the client has been handed over. `fn` runs in the browser: it reads nothing from the
 * test's own scope but its arguments.
 */
export async function inBrowserClient<R>(
  page: Page,
  fn: (client: BrowserClient) => R | Promise<R>,
): Promise<R>;
export async function inBrowserClient<R, A>(
  page: Page,
  fn: (client: BrowserClient, arg: A) => R | Promise<R>,
  arg: A,
): Promise<R>;
export async function inBrowserClient<R>(
  page: Page,
  fn: (client: BrowserClient, arg: unknown) => R | Promise<R>,
  arg?: unknown,
): Promise<R> {
  await awaitBrowserClient(page);
  const client = await page.evaluateHandle(() => {
    const handed = window.__ethioSupabase;
    if (handed === undefined) throw new Error("[e2e:browser-client] the page's client went away");
    return handed;
  });
  try {
    return await client.evaluate(fn, arg);
  } finally {
    await client.dispose();
  }
}
