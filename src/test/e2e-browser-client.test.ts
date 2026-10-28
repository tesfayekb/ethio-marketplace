/**
 * INC-959 (Foundations turn C3) — a test reaches the browser's own database client one way
 * (e2e/helpers/browser-client.ts): after the app's hand-off, with a deadline and one message when the
 * client never arrived; the test's code runs in the page with the client handed to it, no `eval`.
 */
import { readFileSync } from "node:fs";
import type { Page } from "@playwright/test";
import { afterEach, describe, expect, it } from "vitest";

import {
  awaitBrowserClient,
  CLIENT_HANDOFF_MS,
  inBrowserClient,
  type BrowserClient,
} from "../../e2e/helpers/browser-client";

type HandOff = { __ethioSupabase?: unknown };
const handOff = window as unknown as HandOff;

afterEach(() => {
  delete handOff.__ethioSupabase;
});

/**
 * A page whose `waitForFunction` runs the predicate in this window (and fails as Playwright does when
 * it never holds), and whose handle hands the in-page function the object the page holds.
 */
function fakePage(calls: string[]) {
  const page = {
    waitForFunction: async (
      predicate: () => boolean,
      _arg: unknown,
      options: { timeout: number },
    ) => {
      calls.push(`wait ${options.timeout}`);
      if (!predicate())
        throw new Error(`page.waitForFunction: Timeout ${options.timeout}ms exceeded.`);
    },
    evaluateHandle: async (inPage: () => unknown) => {
      calls.push("handle");
      const held = inPage();
      return {
        evaluate: async (fn: (on: unknown, arg: unknown) => unknown, arg: unknown) => {
          calls.push("evaluate");
          return fn(held, arg);
        },
        dispose: async () => {
          calls.push("dispose");
        },
      };
    },
  };
  return page as unknown as Page;
}

const client = {
  rpc: async (fn: string, args?: Record<string, unknown>) => ({
    data: { fn, args },
    error: null,
  }),
} as unknown as BrowserClient;

describe("a test reaches the browser's client one way (INC-959)", () => {
  it("BCL-1 the wait reads the app's hand-off, with the 15-second deadline unless the caller gives one", async () => {
    const calls: string[] = [];
    handOff.__ethioSupabase = client;
    await awaitBrowserClient(fakePage(calls));
    await awaitBrowserClient(fakePage(calls), 2_000);
    expect(CLIENT_HANDOFF_MS).toBe(15_000);
    expect(calls).toEqual(["wait 15000", "wait 2000"]);
  });

  it("BCL-2 a client that never arrived fails in one message naming the hand-off, the deadline and the cause", async () => {
    const calls: string[] = [];
    await expect(awaitBrowserClient(fakePage(calls), 3_000)).rejects.toThrow(
      "[e2e:browser-client] the page's database client never arrived: the app hands it over after mount (DEC-261) and none was there within 3000 ms (page.waitForFunction: Timeout 3000ms exceeded.)",
    );
    // Nothing ran against a client that was not there.
    const ran: string[] = [];
    await expect(
      inBrowserClient(fakePage(ran), async (given) => given.rpc("e2e_never")),
    ).rejects.toThrow("never arrived");
    expect(ran).toEqual(["wait 15000"]);
  });

  it("BCL-3 the test's code runs after the hand-off with the client and its argument, and the handle is released", async () => {
    const calls: string[] = [];
    handOff.__ethioSupabase = client;
    const answer = await inBrowserClient(
      fakePage(calls),
      async (given, { name }) => given.rpc(name, { p_id: 1 }),
      { name: "e2e_probe" },
    );
    expect(answer).toEqual({ data: { fn: "e2e_probe", args: { p_id: 1 } }, error: null });
    expect(calls).toEqual(["wait 15000", "handle", "evaluate", "dispose"]);
    const bare = await inBrowserClient(fakePage([]), (given) => typeof given.rpc);
    expect(bare).toBe("function");
  });

  it("BCL-4 a failure inside the test's code is the test's own and still releases the handle", async () => {
    const calls: string[] = [];
    handOff.__ethioSupabase = client;
    await expect(
      inBrowserClient(fakePage(calls), () => {
        throw new Error("the test's own failure");
      }),
    ).rejects.toThrow("the test's own failure");
    expect(calls).toEqual(["wait 15000", "handle", "evaluate", "dispose"]);
  });

  it("BCL-5 the helper puts no eval or new Function in the page", () => {
    const text = readFileSync("e2e/helpers/browser-client.ts", "utf8").replace(
      /\/\*[\s\S]*?\*\/|\/\/[^\n]*/g,
      "",
    );
    expect(text).not.toMatch(/\beval\s*\(|\bnew\s+Function\b|\bFunction\s*\(/);
    expect(text).toMatch(/evaluateHandle\(/);
  });
});
