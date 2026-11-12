import type { Page } from "@playwright/test";

import { errorText } from "../../src/lib/error-text";
import { inBrowserClient } from "./browser-client";
import { passwordGrant, publishableKey, sessionUserId, supabaseUrl } from "./session";

/**
 * Housekeeping turn 2 (INC-1065) — A TEST CALLS A DOOR ONE WAY. A door is called as a person in
 * one of three ways, each here once:
 *
 * - `asPerson(person)` — from node, signed in by `passwordGrant` (session.ts): `rpc(fn, args)` and
 *   `rest(path, init)` send the same REST requests the browser's client sends, with the person's
 *   bearer; `userId` is the signed-in account's id. The token lives as long as the caller object.
 *   `asBearer(token)` is the same caller over a token the test already holds.
 * - `asAnonymous()` — from node with the publishable key alone (no bearer).
 * - `pageDoor(page, fn, args)` — through the signed-in page's own client (`inBrowserClient`,
 *   browser-client.ts), once the app has handed it over.
 *
 * Each answers `{ data, error }` with the error as the text the client reads (`error.message`, or
 * `HTTP <status>` for a REST answer with no message). An envelope door's answer is read whole through
 * `doorAnswer` / `doorRefusal` (door-answer.ts, CF-DOOR-1). A spec never declares its own copy:
 * scripts/conformance/e2e-helpers.test.ts CF-HELPERS-1 refuses one.
 */

/** A door's answer as a test reads it: the payload, or the refusal's text. */
export type DoorCall = { data: unknown; error: string | null };

/** A REST request beyond a door call: the method, a JSON body, extra headers (`Prefer`, say). */
export type RestInit = { method?: string; body?: unknown; headers?: Record<string, string> };

export type RestCaller = {
  rpc(fn: string, args?: Record<string, unknown>): Promise<DoorCall>;
  rest(path: string, init?: RestInit): Promise<DoorCall>;
};

async function answerOf(response: Response): Promise<DoorCall> {
  const text = await response.text();
  const body: unknown = text === "" ? null : JSON.parse(text);
  if (!response.ok) {
    const message =
      body !== null && typeof body === "object" && "message" in body
        ? errorText(body)
        : `HTTP ${response.status}`;
    return { data: null, error: message };
  }
  return { data: body, error: null };
}

function restCaller(headers: Record<string, string>): RestCaller {
  const url = supabaseUrl();
  return {
    rpc: async (fn, args = {}) =>
      answerOf(
        await fetch(`${url}/rest/v1/rpc/${fn}`, {
          method: "POST",
          headers,
          body: JSON.stringify(args),
        }),
      ),
    rest: async (path, init = {}) =>
      answerOf(
        await fetch(`${url}/rest/v1/${path}`, {
          method: init.method ?? "GET",
          headers: { ...headers, ...init.headers },
          ...(init.body === undefined ? {} : { body: JSON.stringify(init.body) }),
        }),
      ),
  };
}

/** A caller with an access token the test already holds (a page's injected session, say). */
export function asBearer(token: string): RestCaller {
  return restCaller({
    apikey: publishableKey(),
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  });
}

/** A signed-in person from node: the door's data and its error, as the browser's client reads them. */
export async function asPerson(
  person: { email: string; password: string },
  opts: { fresh?: boolean } = {},
): Promise<RestCaller & { userId: string }> {
  const session = await passwordGrant(person.email, person.password, opts);
  return { ...asBearer(session.access_token), userId: sessionUserId(session) };
}

/** An anonymous caller from node: the publishable key and no bearer. */
export async function asAnonymous(): Promise<RestCaller> {
  return restCaller({ apikey: publishableKey(), "Content-Type": "application/json" });
}

/** A door called through the signed-in page's own client: its data and its error text. */
export async function pageDoor(
  page: Page,
  fn: string,
  args: Record<string, unknown> = {},
): Promise<DoorCall> {
  return inBrowserClient(
    page,
    async (client, call) => {
      const result = await client.rpc(call.fn, call.args);
      return { data: result.data, error: result.error?.message ?? null };
    },
    { fn, args },
  );
}
