import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

import { QueryClient, QueryObserver } from "@tanstack/react-query";
import { describe, expect, it } from "vitest";

import { refreshAfterWrite } from "./refresh-after-write";

/**
 * INC-579 (bundle 13 turn 13) — a write that settles while a screen's first read
 * is still in flight. The table below stands for the database; the first read
 * is answered with the table as it was when the read was asked.
 */

interface Deferred<T> {
  promise: Promise<T>;
  resolve: (value: T) => void;
}

function deferred<T>(): Deferred<T> {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((done) => {
    resolve = done;
  });
  return { promise, resolve };
}

/** A screen's read: each call answers the rows as they stood when it was asked, when the test lets it. */
function screen() {
  const table = ["a", "b"];
  const pending: { rows: string[]; answer: Deferred<string[]> }[] = [];
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  const observer = new QueryObserver(client, {
    queryKey: ["admin", "rows"],
    queryFn: () => {
      const answer = deferred<string[]>();
      pending.push({ rows: [...table], answer });
      return answer.promise;
    },
  });
  const unsubscribe = observer.subscribe(() => {});
  return { table, pending, client, observer, unsubscribe };
}

async function flush(): Promise<void> {
  for (let i = 0; i < 5; i += 1) await Promise.resolve();
}

describe("refreshAfterWrite (INC-579)", () => {
  it("RAW-1 the library keeps the first read in flight: an invalidation after a write asks nothing new, and the written row stays missing", async () => {
    const { table, pending, client, observer, unsubscribe } = screen();
    await flush();
    expect(pending).toHaveLength(1);
    table.push("c"); // the write lands while the first read is on its way
    const invalidated = client.invalidateQueries({ queryKey: ["admin"] });
    await flush();
    pending[0]!.answer.resolve(pending[0]!.rows);
    await invalidated;
    await flush();
    expect(pending, "the library started a second read").toHaveLength(1);
    expect(observer.getCurrentResult().data).toEqual(["a", "b"]);
    unsubscribe();
  });

  it("RAW-2 refreshAfterWrite starts a new read after the write, with or without data, and the written row is shown", async () => {
    const { table, pending, observer, client, unsubscribe } = screen();
    await flush();
    table.push("c");
    const refreshed = refreshAfterWrite(client, { queryKey: ["admin"] });
    await flush();
    expect(pending).toHaveLength(2);
    pending[1]!.answer.resolve(pending[1]!.rows);
    await refreshed;
    await flush();
    expect(observer.getCurrentResult().data).toEqual(["a", "b", "c"]);

    // With data on screen and a read in flight, the same: a new read after the write.
    const third = client.refetchQueries({ queryKey: ["admin"] });
    await flush();
    table.push("d");
    const again = refreshAfterWrite(client, { queryKey: ["admin"] });
    await flush();
    const last = pending[pending.length - 1]!;
    expect(last.rows).toEqual(["a", "b", "c", "d"]);
    last.answer.resolve(last.rows);
    await again;
    await third.catch(() => undefined);
    await flush();
    expect(observer.getCurrentResult().data).toEqual(["a", "b", "c", "d"]);
    unsubscribe();
  });

  it("RAW-3 every invalidation in the app goes through refreshAfterWrite", () => {
    const root = join(process.cwd(), "src");
    const offenders: string[] = [];
    const walk = (dir: string) => {
      for (const name of readdirSync(dir)) {
        const path = join(dir, name);
        if (statSync(path).isDirectory()) {
          walk(path);
          continue;
        }
        if (!/\.(ts|tsx)$/.test(name) || /\.test\.(ts|tsx)$/.test(name)) continue;
        if (path.endsWith(join("lib", "refresh-after-write.ts"))) continue;
        if (readFileSync(path, "utf8").includes("invalidateQueries(")) {
          offenders.push(path.slice(root.length + 1));
        }
      }
    };
    walk(root);
    expect(offenders, "call refreshAfterWrite (src/lib/refresh-after-write.ts) instead").toEqual(
      [],
    );
  });
});
