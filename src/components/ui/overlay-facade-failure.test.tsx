import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import type { OverlaysImpl } from "./overlay-loader";

/**
 * DEC-259 (Foundations turn 31) and DEC-260 (turn 32) — a failed download of the
 * overlay module leaves the closed trigger as it was (no half-open menu or dialog,
 * no crash) and the next press asks again. The loader is replaced here so the test decides when the module
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
      state.impl = real;
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

vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, language: "en", setLanguage: () => {} }),
}));

const { Button } = await import("./button");
const { Dialog, DialogContent, DialogTitle, DialogTrigger } = await import("./dialog");
const { useState } = await import("react");
const { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } =
  await import("./dropdown-menu");

describe("the overlay facades when the module fails to arrive (DEC-259, DEC-260)", () => {
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

  it("OVF-16 a failed download keeps the closed dialog; the next click asks again and opens it", async () => {
    state.impl = null;
    state.next = ["fail", "arrive"];
    state.asked = 0;
    render(
      <Dialog>
        <DialogTrigger asChild>
          <Button data-testid="dialog-trigger">Share</Button>
        </DialogTrigger>
        <DialogContent data-testid="dialog">
          <DialogTitle>Share the ad</DialogTitle>
        </DialogContent>
      </Dialog>,
    );
    await act(async () => {
      fireEvent.click(screen.getByTestId("dialog-trigger"));
    });
    expect(state.asked).toBe(1);
    expect(screen.queryByTestId("dialog")).toBeNull();
    expect(screen.getByTestId("dialog-trigger")).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByTestId("dialog-trigger")).toHaveAttribute("data-state", "closed");

    await act(async () => {
      fireEvent.click(screen.getByTestId("dialog-trigger"));
    });
    expect(state.asked).toBe(2);
    expect(screen.getByTestId("dialog")).toBeInTheDocument();
    expect(screen.getByTestId("dialog-trigger")).toHaveAttribute("aria-expanded", "true");
  });

  it("OVF-17 a controlled dialog whose download fails: its owner hears the closing, and the next click asks again and opens it (INC-908)", async () => {
    state.impl = null;
    state.next = ["fail", "arrive"];
    state.asked = 0;
    const heard: boolean[] = [];
    function Owned() {
      const [open, setOpen] = useState(false);
      return (
        <Dialog
          open={open}
          onOpenChange={(next) => {
            heard.push(next);
            setOpen(next);
          }}
        >
          <DialogTrigger asChild>
            <Button data-testid="owned-trigger">Report</Button>
          </DialogTrigger>
          <DialogContent data-testid="owned-dialog">
            <DialogTitle>Report the ad</DialogTitle>
          </DialogContent>
        </Dialog>
      );
    }
    render(<Owned />);
    await act(async () => {
      fireEvent.click(screen.getByTestId("owned-trigger"));
    });
    expect(state.asked).toBe(1);
    expect(heard).toEqual([true, false]);
    expect(screen.queryByTestId("owned-dialog")).toBeNull();

    await act(async () => {
      fireEvent.click(screen.getByTestId("owned-trigger"));
    });
    expect(state.asked).toBe(2);
    expect(heard).toEqual([true, false, true]);
    expect(screen.getByTestId("owned-dialog")).toBeInTheDocument();
  });

  it("OVF-18 a dialog its owner opens whose download fails: the owner hears the closing, and its next opening asks again (INC-908)", async () => {
    state.impl = null;
    state.next = ["fail", "arrive"];
    state.asked = 0;
    const heard: boolean[] = [];
    let reopen: () => void = () => undefined;
    function Opened() {
      const [open, setOpen] = useState(true);
      reopen = () => setOpen(true);
      return (
        <Dialog
          open={open}
          onOpenChange={(next) => {
            heard.push(next);
            setOpen(next);
          }}
        >
          <DialogContent data-testid="opened-dialog">
            <DialogTitle>Confirm it is you</DialogTitle>
          </DialogContent>
        </Dialog>
      );
    }
    await act(async () => {
      render(<Opened />);
    });
    expect(state.asked).toBe(1);
    expect(heard).toEqual([false]);
    expect(screen.queryByTestId("opened-dialog")).toBeNull();

    await act(async () => {
      reopen();
    });
    expect(state.asked).toBe(2);
    expect(screen.getByTestId("opened-dialog")).toBeInTheDocument();
  });
});
