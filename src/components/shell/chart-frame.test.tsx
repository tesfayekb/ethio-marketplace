import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ChartFrame } from "./chart-frame";

/**
 * Bundle 11 G3b (INC-547) — the plot is measured whenever it appears. The
 * events-per-day chart on Admin › Audit stayed blank: the frame mounted while
 * its data loaded, the one measurement at mount found no plot, and nothing
 * measured it again.
 */
vi.mock("@/i18n", () => ({
  useI18n: () => ({
    t: (key: string) => key,
    language: "en",
    setLanguage: () => {},
    publicLanguages: [],
  }),
}));

const drawn = (size: { width: number; height: number }) => (
  <span data-testid="drawn">{`${size.width}x${size.height}`}</span>
);

function frame(props: { loading?: boolean; empty?: boolean }) {
  return (
    <ChartFrame testid="cf" title="Events" variant="sparkline" {...props}>
      {drawn}
    </ChartFrame>
  );
}

describe("ChartFrame measurement (INC-547)", () => {
  beforeEach(() => {
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({
      width: 320,
      height: 64,
      top: 0,
      left: 0,
      right: 320,
      bottom: 64,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    } as DOMRect);
  });
  afterEach(() => vi.restoreAllMocks());

  it("CFM-1 a frame that mounts loading draws its chart once the data arrives", () => {
    const view = render(frame({ loading: true }));
    expect(screen.getByTestId("cf-loading")).toBeTruthy();
    expect(screen.queryByTestId("drawn")).toBeNull();
    view.rerender(frame({ loading: false }));
    expect(screen.getByTestId("drawn").textContent).toBe("320x64");
  });

  it("CFM-2 a frame that mounts empty draws its chart once rows arrive", () => {
    const view = render(frame({ empty: true }));
    expect(screen.getByTestId("cf-empty")).toBeTruthy();
    view.rerender(frame({ empty: false }));
    expect(screen.getByTestId("drawn").textContent).toBe("320x64");
  });

  it("CFM-3 a frame that mounts with its data draws at once", () => {
    render(frame({}));
    expect(screen.getByTestId("drawn").textContent).toBe("320x64");
  });
});
