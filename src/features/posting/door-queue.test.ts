import { describe, expect, it } from "vitest";

import { createDoorQueue } from "./door-queue";

/** A promise this test settles by hand. */
function gate<T>() {
  let open: (value: T) => void = () => {};
  let fail: (error: Error) => void = () => {};
  const promise = new Promise<T>((resolve, reject) => {
    open = resolve;
    fail = reject;
  });
  return { promise, open, fail };
}

/** Lets every queued microtask run. */
const settle = () => new Promise<void>((resolve) => setTimeout(resolve, 0));

describe("the place step's door queue (INC-526)", () => {
  it("DQ-1 a job starts only after the job before it has answered, in the order queued", async () => {
    const queue = createDoorQueue();
    const started: string[] = [];
    const first = gate<string>();
    const a = queue(async () => {
      started.push("a");
      return first.promise;
    });
    const b = queue(async () => {
      started.push("b");
      return "b";
    });
    await settle();
    expect(started).toEqual(["a"]);
    first.open("a");
    await expect(a).resolves.toBe("a");
    await expect(b).resolves.toBe("b");
    expect(started).toEqual(["a", "b"]);
  });

  it("DQ-2 a job that fails rejects its own caller and the next job still runs", async () => {
    const queue = createDoorQueue();
    const first = gate<string>();
    const a = queue(() => first.promise);
    const b = queue(async () => "after");
    first.fail(new Error("refused"));
    await expect(a).rejects.toThrow("refused");
    await expect(b).resolves.toBe("after");
  });

  it("DQ-3 a job builds what it restates when it runs, so it sees what the job before it saved", async () => {
    const queue = createDoorQueue();
    const saved = { directions: null as string | null };
    const sent: Array<string | null> = [];
    const first = gate<void>();
    const directionsSave = queue(async () => {
      sent.push("Behind the blue gate");
      await first.promise;
      saved.directions = "Behind the blue gate";
    });
    // Queued while the directions save is unanswered: it restates the directions.
    const pinSave = queue(async () => {
      sent.push(saved.directions);
    });
    await settle();
    expect(sent).toEqual(["Behind the blue gate"]);
    first.open();
    await directionsSave;
    await pinSave;
    expect(sent).toEqual(["Behind the blue gate", "Behind the blue gate"]);
  });
});
