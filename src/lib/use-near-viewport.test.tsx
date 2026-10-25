import { act, render, screen } from "@testing-library/react";
import { useRef } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { useNearViewport } from "./use-near-viewport";

/**
 * D234 speed turn S1 — below-the-fold work starts when its place nears the screen.
 */
function Probe({ enabled }: { enabled?: boolean }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const near = useNearViewport(ref, enabled === undefined ? {} : { enabled });
  return <div ref={ref} data-testid="probe" data-near={String(near)} />;
}

const near = () => screen.getByTestId("probe").getAttribute("data-near");

describe("useNearViewport (D234)", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("NV-1 waits until its box nears the screen, then stays true and stops watching", () => {
    const notify: Array<(entries: Array<{ isIntersecting: boolean }>) => void> = [];
    const disconnect = vi.fn();
    const margins: string[] = [];
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        constructor(
          callback: (entries: Array<{ isIntersecting: boolean }>) => void,
          options: { rootMargin: string },
        ) {
          notify.push(callback);
          margins.push(options.rootMargin);
        }
        observe() {}
        disconnect = disconnect;
      },
    );
    render(<Probe />);
    expect(near()).toBe("false");
    expect(margins).toEqual(["400px 0px 400px 0px"]);
    act(() => notify[0]([{ isIntersecting: false }]));
    expect(near()).toBe("false");
    act(() => notify[0]([{ isIntersecting: true }]));
    expect(near()).toBe("true");
    expect(disconnect).toHaveBeenCalled();
  });

  it("NV-2 a surface that wants its work now (enabled: false) answers true at once", () => {
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        observe() {
          throw new Error("must not watch");
        }
        disconnect() {}
      },
    );
    render(<Probe enabled={false} />);
    expect(near()).toBe("true");
  });

  it("NV-3 without IntersectionObserver the work is never lost, only early", () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    render(<Probe />);
    expect(near()).toBe("true");
  });
});
