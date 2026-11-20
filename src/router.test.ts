import type { QueryClient } from "@tanstack/react-query";
import { beforeAll, describe, expect, it, vi } from "vitest";

import { onUnauthorised } from "@/features/auth/session-end";

/**
 * F1-7d (INC-1218) — THE QUERY CLIENT'S RETRY RULE (the brief's conformance guard). The client
 * the router hands every route never retries an answer that ended the session — whatever retry
 * a query sets for itself — keeps every other query's own rule, and reports the end to the shell.
 */
vi.mock("./routeTree.gen", () => ({ routeTree: {} }));
vi.mock("@tanstack/react-router", () => ({
  createRouter: (options: { context: { queryClient: QueryClient } }) => ({
    options,
    subscribe: () => () => undefined,
  }),
}));

let client: QueryClient;
beforeAll(async () => {
  const { getRouter } = await import("./router");
  const router: unknown = getRouter();
  const context: unknown = Reflect.get(Reflect.get(Object(router), "options"), "context");
  client = Reflect.get(Object(context), "queryClient");
});

const unauthorised = { message: "notSignedIn", code: "P0D01", details: "", hint: "", status: 401 };

describe("the query client's retry rule", () => {
  it("RTR-1 a read that answered 401 is called once, even with its own retry, and the shell hears it", async () => {
    const heard: Array<string | null> = [];
    const off = onUnauthorised((code) => heard.push(code));
    const queryFn = vi.fn().mockRejectedValue(unauthorised);
    await expect(
      client.fetchQuery({ queryKey: ["rtr-1"], queryFn, retry: 3, retryDelay: 0 }),
    ).rejects.toBe(unauthorised);
    off();
    expect(queryFn).toHaveBeenCalledTimes(1);
    expect(heard).toEqual(["notSignedIn"]);
  });

  it("RTR-2 a stale token's code is not retried either", async () => {
    const stale = { message: "JWT expired", code: "PGRST301", details: "", hint: "" };
    const queryFn = vi.fn().mockRejectedValue(stale);
    await expect(
      client.fetchQuery({ queryKey: ["rtr-2"], queryFn, retry: 2, retryDelay: 0 }),
    ).rejects.toBe(stale);
    expect(queryFn).toHaveBeenCalledTimes(1);
  });

  it("RTR-3 every other failure keeps the query's own rule: its own count, or three", async () => {
    const failed = { message: "boom", status: 500 };
    const own = vi.fn().mockRejectedValue(failed);
    await expect(
      client.fetchQuery({ queryKey: ["rtr-3a"], queryFn: own, retry: 2, retryDelay: 0 }),
    ).rejects.toBe(failed);
    expect(own).toHaveBeenCalledTimes(3);
    const none = vi.fn().mockRejectedValue(failed);
    await expect(
      client.fetchQuery({ queryKey: ["rtr-3b"], queryFn: none, retry: false }),
    ).rejects.toBe(failed);
    expect(none).toHaveBeenCalledTimes(1);
    const defaulted = vi.fn().mockRejectedValue(failed);
    await expect(
      client.fetchQuery({ queryKey: ["rtr-3c"], queryFn: defaulted, retryDelay: 0 }),
    ).rejects.toBe(failed);
    expect(defaulted).toHaveBeenCalledTimes(4);
  });

  it("RTR-4 a write refused with notSignedIn reaches the shell; a write refused otherwise does not", async () => {
    const heard: Array<string | null> = [];
    const off = onUnauthorised((code) => heard.push(code));
    const refuse = (error: unknown) =>
      client
        .getMutationCache()
        .build(client, { mutationFn: () => Promise.reject(error) })
        .execute(undefined)
        .catch(() => undefined);
    await refuse(new Error("notSignedIn"));
    await refuse(new Error("permissionDenied"));
    off();
    expect(heard).toEqual(["notSignedIn"]);
  });
});
