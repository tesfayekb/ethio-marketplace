import { render, screen } from "@testing-library/react";
import { Suspense } from "react";
import { describe, expect, it, vi } from "vitest";

import { resilientLazy } from "./resilient-lazy";

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

  it("RLZ-2 a failed download renders the fallback and logs once — never the error boundary", async () => {
    const errors = vi.spyOn(console, "error").mockImplementation(() => undefined);
    const Lazy = resilientLazy<{ name: string }>(
      () => Promise.reject(new Error("offline")),
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
    expect(errors).toHaveBeenCalledWith(
      "[client-error] the piece failed to load",
      expect.anything(),
    );
    errors.mockRestore();
  });
});
