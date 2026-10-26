import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import type { OverlaysImpl } from "./overlay-loader";

/**
 * DEC-259 (Foundations turn 31) — a failed download of the overlay module leaves
 * the closed trigger as it was (no half-open menu, no crash) and the next press
 * asks again. The loader is replaced here so the test decides when the module
 * arrives or fails; overlay-loader.ts's own warning is its loadOnce's.
 */
const state = vi.hoisted(() => ({
  impl: null as OverlaysImpl | null,
  listeners: new Set<() => void>(),
  next: [] as Array<"fail" | "arrive">,
  asked: 0,
}));

vi.mock("./overlay-loader", async () => {
  const React = await import("react");
  const real = await vi.importActual<typeof import("./overlays-impl")>("./overlays-impl");
  return {
    loadOverlays: () => {
      state.asked += 1;
      const outcome = state.next.shift() ?? "arrive";
      if (outcome === "fail") return Promise.reject(new Error("offline"));
      state.impl = real as unknown as OverlaysImpl;
      for (const listener of state.listeners) listener();
      return Promise.resolve(state.impl);
    },
    useOverlays: () =>
      React.useSyncExternalStore(
        (listener: () => void) => {
          state.listeners.add(listener);
          return () => state.listeners.delete(listener);
        },
        () => state.impl,
        () => null,
      ),
    warmOverlaysWhenIdle: () => undefined,
  };
});

const { Button } = await import("./button");
const { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } =
  await import("./dropdown-menu");

describe("the overlay facades when the module fails to arrive (DEC-259)", () => {
  it("OVF-9 a failed download keeps the closed trigger; the next press asks again and opens the menu", async () => {
    state.impl = null;
    state.next = ["fail", "arrive"];
    state.asked = 0;
    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button data-testid="trigger">Open</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent data-testid="menu">
          <DropdownMenuItem>One</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    const trigger = screen.getByTestId("trigger");
    await act(async () => {
      fireEvent.pointerDown(trigger, { button: 0, ctrlKey: false, pointerType: "mouse" });
    });
    expect(state.asked).toBe(1);
    expect(screen.queryByTestId("menu")).toBeNull();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveAttribute("data-state", "closed");

    await act(async () => {
      fireEvent.pointerDown(trigger, { button: 0, ctrlKey: false, pointerType: "mouse" });
    });
    expect(state.asked).toBe(2);
    expect(screen.getByTestId("menu")).toBeInTheDocument();
    expect(screen.getByTestId("trigger")).toBe(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });
});
