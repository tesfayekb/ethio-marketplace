import { readFileSync } from "node:fs";
import { createElement, Suspense, use } from "react";
import { renderToReadableStream } from "react-dom/server.browser";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  streamPlaced,
  PLACED_DEADLINE_MS,
  WAITING_SEGMENT,
  whenStreamPlaced,
} from "./hydrate-when-placed";

/**
 * DEC-266 (INC-913) — the browser hydrates the server's first screen once it is placed.
 * HWP-1…4 the wait; HWP-5 pins React's streamed-segment markers against the installed
 * react-dom (an upgrade that renames them fails here, not as a flake); HWP-6 the client
 * entry waits for it before it hydrates.
 */
function freshDocument(readyState: DocumentReadyState): Document {
  const doc = document.implementation.createHTMLDocument("first screen");
  Object.defineProperty(doc, "readyState", { configurable: true, get: () => readyState });
  return doc;
}

function addSegment(doc: Document): HTMLElement {
  const segment = doc.createElement("div");
  segment.hidden = true;
  segment.id = "S:0";
  doc.body.append(segment);
  return segment;
}

afterEach(() => {
  vi.useRealTimers();
});

describe("the first screen's hydration (DEC-266)", () => {
  it("HWP-1 a read document with no waiting segment is placed at once", async () => {
    const doc = freshDocument("interactive");
    expect(streamPlaced(doc)).toBe(true);
    await expect(whenStreamPlaced(doc)).resolves.toBe("placed");
  });

  it("HWP-2 a waiting segment holds the hydration until React removes it", async () => {
    const doc = freshDocument("complete");
    const segment = addSegment(doc);
    expect(streamPlaced(doc)).toBe(false);
    let outcome: string | null = null;
    const waiting = whenStreamPlaced(doc).then((value) => (outcome = value));
    await Promise.resolve();
    expect(outcome).toBeNull();
    segment.remove();
    await expect(waiting).resolves.toBe("placed");
  });

  it("HWP-3 a document still being read waits for it to be read", async () => {
    let state: DocumentReadyState = "loading";
    const doc = document.implementation.createHTMLDocument("streaming");
    Object.defineProperty(doc, "readyState", { configurable: true, get: () => state });
    let outcome: string | null = null;
    const waiting = whenStreamPlaced(doc).then((value) => (outcome = value));
    await Promise.resolve();
    expect(outcome).toBeNull();
    state = "interactive";
    doc.dispatchEvent(new Event("DOMContentLoaded"));
    await expect(waiting).resolves.toBe("placed");
  });

  it("HWP-4 a segment React never places ends the wait at the deadline", async () => {
    vi.useFakeTimers();
    const doc = freshDocument("complete");
    addSegment(doc);
    const waiting = whenStreamPlaced(doc);
    await vi.advanceTimersByTimeAsync(PLACED_DEADLINE_MS - 1);
    let outcome: string | null = null;
    void waiting.then((value) => (outcome = value));
    await Promise.resolve();
    expect(outcome).toBeNull();
    await vi.advanceTimersByTimeAsync(1);
    await expect(waiting).resolves.toBe("deadline");
  });

  it("HWP-5 react-dom streams a late boundary as the segment WAITING_SEGMENT names, revealed by $RC", async () => {
    let release: (value: string) => void = () => undefined;
    const late = new Promise<string>((resolve) => {
      release = resolve;
    });
    function Late() {
      return createElement("p", null, use(late));
    }
    const stream = await renderToReadableStream(
      createElement(
        "div",
        null,
        createElement(
          Suspense,
          { fallback: createElement("span", null, "…") },
          createElement(Late),
        ),
      ),
    );
    setTimeout(() => release("late"), 0);
    const html = await new Response(stream).text();
    const parsed = new DOMParser().parseFromString(html, "text/html");
    const segment = parsed.querySelector(WAITING_SEGMENT);
    expect(segment?.textContent).toBe("late");
    expect(html).toContain(`$RC("B:0","${segment?.id ?? "?"}")`);
  });

  it("HWP-6 the client entry hydrates only after the first screen is placed", () => {
    const entry = readFileSync("src/client.tsx", "utf8");
    const waits = entry.indexOf("whenStreamPlaced()");
    const hydrates = entry.indexOf("hydrateRoot(");
    expect(waits).toBeGreaterThan(-1);
    expect(hydrates).toBeGreaterThan(waits);
    expect(entry.match(/hydrateRoot\(/g) ?? []).toHaveLength(1);
  });
});
