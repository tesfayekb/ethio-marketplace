import { render, screen } from "@testing-library/react";
import { Suspense } from "react";
import { describe, expect, it, vi } from "vitest";

import { reportOnDemandFailure } from "./on-demand-failure";
import { resilientLazy } from "./resilient-lazy";

vi.mock("./on-demand-failure", async (original) => ({
  ...(await original<typeof import("./on-demand-failure")>()),
  reportOnDemandFailure: vi.fn(),
}));

/** D234 speed turn S3 (INC-897) — a component fetched on demand never breaks the page. */
function Piece({ name }: { name: string }) {
  return <p data-testid="piece">{name}</p>;
}
function Fallback() {
  return <p data-testid="piece-fallback">—</p>;
}

describe("resilientLazy (D234)", () => {
  it("RLZ-1 a downloaded component renders with its props, as React.lazy does", async () => {
    const Lazy = resilientLazy(async () => Piece, "the piece", Fallback);
    render(
      <Suspense fallback={<p data-testid="piece-loading" />}>
        <Lazy name="hello" />
      </Suspense>,
    );
    expect((await screen.findByTestId("piece")).textContent).toBe("hello");
  });

  it("RLZ-2 a failed download renders the fallback and reports once to the shell's notice — never the error boundary", async () => {
    vi.mocked(reportOnDemandFailure).mockClear();
    const failure = new Error("offline");
    const Lazy = resilientLazy<{ name: string }>(
      () => Promise.reject(failure),
      "the piece",
      Fallback,
    );
    render(
      <Suspense fallback={<p data-testid="piece-loading" />}>
        <Lazy name="hello" />
      </Suspense>,
    );
    expect(await screen.findByTestId("piece-fallback")).toBeTruthy();
    expect(screen.queryByTestId("piece")).toBeNull();
    expect(vi.mocked(reportOnDemandFailure).mock.calls).toEqual([["the piece", failure]]);
  });

  it("RLZ-3 INC-911 — a fallback that says so in place (inPlace) is logged, not reported", async () => {
    vi.mocked(reportOnDemandFailure).mockClear();
    const errors = vi.spyOn(console, "error").mockImplementation(() => undefined);
    const Lazy = resilientLazy<{ name: string }>(
      () => Promise.reject(new Error("offline")),
      "the piece",
      Fallback,
      { inPlace: true },
    );
    render(
      <Suspense fallback={<p data-testid="piece-loading" />}>
        <Lazy name="hello" />
      </Suspense>,
    );
    expect(await screen.findByTestId("piece-fallback")).toBeTruthy();
    expect(reportOnDemandFailure).not.toHaveBeenCalled();
    expect(errors).toHaveBeenCalledWith("[client-error] the piece failed to load: offline");
    errors.mockRestore();
  });
});
