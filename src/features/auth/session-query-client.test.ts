import { describe, expect, it, vi } from "vitest";

import { loadFailureReader } from "@/components/shell/failure-reason";

import { sessionQueryClient } from "./session-query-client";

/** An error the way a route or the database answers it: a message and the status it arrived at. */
const answered = (status: number, message = "x") => Object.assign(new Error(message), { status });

/** How many times a read ran before its caller was told, with TanStack's own delay switched off. */
async function runs(failure: Error, retry: Parameters<typeof retryOf>[0]): Promise<number> {
  const read = vi.fn().mockRejectedValue(failure);
  const client = sessionQueryClient();
  await client
    .fetchQuery({
      queryKey: ["sqc", Math.random()],
      queryFn: read,
      retry: retryOf(retry),
      retryDelay: 0,
    })
    .catch(() => undefined);
  client.clear();
  return read.mock.calls.length;
}
function retryOf(retry: number | boolean | (() => boolean)) {
  return retry;
}

describe("the query client retries only what can succeed (INC-1288)", () => {
  it("SQC-1 a refusal is asked once, whatever the query's own count says", async () => {
    expect(await runs(answered(403), 3)).toBe(1);
    expect(await runs(answered(404), true)).toBe(1);
    expect(await runs(answered(429), () => true)).toBe(1);
  });

  it("SQC-2 a network failure keeps the query's own count", async () => {
    expect(await runs(new TypeError("Failed to fetch"), 2)).toBe(3);
    expect(await runs(new TypeError("Failed to fetch"), false)).toBe(1);
  });

  it("SQC-3 a server failure keeps the query's own count", async () => {
    expect(await runs(answered(500), 1)).toBe(2);
    expect(await runs(answered(503), 3)).toBe(4);
  });

  it("SQC-4 a database refusal that carries its mark and no status is not retried once the reader is here", async () => {
    await loadFailureReader();
    const refusal = Object.assign(new Error("listingNotFound"), { code: "P0D01" });
    expect(await runs(refusal, 3)).toBe(1);
  });
});
