import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import type { OverlaysImpl } from "./overlay-loader";

/**
 * DEC-259 (Foundations turn 31) and DEC-260 (turn 32) — a failed download of the
 * overlay module leaves the closed trigger as it was (no half-open menu or dialog,
 * no crash) and the next press asks again. The loader is replaced here so the test decides when the module
 * arrives or fails; overlay-loader.ts's own warning is its loadOnce's. INC-911 —
 * every failure is reported to the shell's notice (src/lib/on-demand-failure.ts,
 * replaced here so the test reads the reports), and a modal's owner that passes
 * `onUnavailable` hears it before the closing.
 */
const reported = vi.hoisted(() => [] as string[]);
vi.mock("@/lib/on-demand-failure", () => ({
  reportOnDemandFailure: (label: string) => {
    reported.push(label);
  },
}));
const state = vi.hoisted(() => ({
  impl: null as OverlaysImpl | null,
  listeners: new Set<() => void>(),
  next: [] as Array<"fail" | "arrive" | "hold">,
  /** Turn 34c-3 — a held download fails when the test says so. */
  held: [] as Array<(error: Error) => void>,
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
      if (outcome === "hold")
        return new Promise<never>((_, reject) => {
          state.held.push(reject);
        });
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
    reported.length = 0;
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
    expect(reported).toEqual(["a menu's code"]);
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
    reported.length = 0;
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
    expect(reported).toEqual(["a dialog's code"]);
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
    // Turn 34c-3 (turn 32b's reviewer) — the trigger says closed again.
    expect(screen.getByTestId("owned-trigger")).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByTestId("owned-trigger")).toHaveAttribute("data-state", "closed");

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
    // Turn 34c-3 — the owner's own reopening tells it nothing more.
    expect(heard).toEqual([false]);
  });

  it("OVF-19 an uncontrolled dialog's listener hears the trigger's opening and its failure, then the opening that works (turn 32b's reviewer)", async () => {
    reported.length = 0;
    state.impl = null;
    state.next = ["fail", "arrive"];
    state.asked = 0;
    const heard: boolean[] = [];
    render(
      <Dialog onOpenChange={(next) => heard.push(next)}>
        <DialogTrigger asChild>
          <Button data-testid="listened-trigger">Share</Button>
        </DialogTrigger>
        <DialogContent data-testid="listened-dialog">
          <DialogTitle>Share the ad</DialogTitle>
        </DialogContent>
      </Dialog>,
    );
    await act(async () => {
      fireEvent.click(screen.getByTestId("listened-trigger"));
    });
    expect(heard).toEqual([true, false]);
    expect(screen.queryByTestId("listened-dialog")).toBeNull();
    await act(async () => {
      fireEvent.click(screen.getByTestId("listened-trigger"));
    });
    expect(state.asked).toBe(2);
    expect(heard).toEqual([true, false, true]);
    expect(screen.getByTestId("listened-dialog")).toBeInTheDocument();
  });

  it("OVF-21 a late failure tells no stale closing: an owner that closed meanwhile hears nothing, and an older ask's failure says nothing once a newer one opened it (turn 32b's reviewer)", async () => {
    reported.length = 0;
    state.impl = null;
    state.next = ["hold"];
    state.held = [];
    state.asked = 0;
    const heard: boolean[] = [];
    let close: () => void = () => undefined;
    function Owned() {
      const [open, setOpen] = useState(false);
      close = () => setOpen(false);
      return (
        <Dialog
          open={open}
          onOpenChange={(next) => {
            heard.push(next);
            setOpen(next);
          }}
        >
          <DialogTrigger asChild>
            <Button data-testid="late-trigger">Report</Button>
          </DialogTrigger>
          <DialogContent data-testid="late-dialog">
            <DialogTitle>Report the ad</DialogTitle>
          </DialogContent>
        </Dialog>
      );
    }
    render(<Owned />);
    await act(async () => {
      fireEvent.click(screen.getByTestId("late-trigger"));
    });
    expect(heard).toEqual([true]);
    await act(async () => {
      close();
    });
    await act(async () => {
      state.held.shift()?.(new Error("offline"));
    });
    expect(heard).toEqual([true]);
    expect(reported).toEqual(["a dialog's code"]);

    // An older ask still pending when a newer one opens the dialog: its failure says nothing.
    reported.length = 0;
    state.next = ["hold", "arrive"];
    await act(async () => {
      fireEvent.click(screen.getByTestId("late-trigger"));
    });
    await act(async () => {
      close();
    });
    await act(async () => {
      fireEvent.click(screen.getByTestId("late-trigger"));
    });
    expect(screen.getByTestId("late-dialog")).toBeInTheDocument();
    await act(async () => {
      state.held.shift()?.(new Error("offline"));
    });
    expect(screen.getByTestId("late-dialog")).toBeInTheDocument();
    expect(heard).toEqual([true, true, true]);
    expect(reported).toEqual([]);
  });

  it("OVF-22 a menu's older press that fails late says nothing once a newer press opened it (turn 34c-3)", async () => {
    reported.length = 0;
    state.impl = null;
    state.next = ["hold", "arrive"];
    state.held = [];
    state.asked = 0;
    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button data-testid="late-menu-trigger">Open</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent data-testid="late-menu">
          <DropdownMenuItem>One</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    const trigger = screen.getByTestId("late-menu-trigger");
    await act(async () => {
      fireEvent.pointerDown(trigger, { button: 0, ctrlKey: false, pointerType: "mouse" });
    });
    await act(async () => {
      fireEvent.pointerDown(trigger, { button: 0, ctrlKey: false, pointerType: "mouse" });
    });
    expect(state.asked).toBe(2);
    expect(screen.getByTestId("late-menu")).toBeInTheDocument();
    await act(async () => {
      state.held.shift()?.(new Error("offline"));
    });
    expect(screen.getByTestId("late-menu")).toBeInTheDocument();
    expect(reported).toEqual([]);
  });

  it("OVF-20 a dialog whose download fails tells an owner that asked `onUnavailable` before its closing, and reports it once (INC-911)", async () => {
    reported.length = 0;
    state.impl = null;
    state.next = ["fail"];
    state.asked = 0;
    const heard: string[] = [];
    function Gate() {
      const [open, setOpen] = useState(true);
      return (
        <Dialog
          open={open}
          onUnavailable={() => heard.push("unavailable")}
          onOpenChange={(next) => {
            heard.push(`open ${String(next)}`);
            setOpen(next);
          }}
        >
          <DialogContent data-testid="gate-dialog">
            <DialogTitle>Enter your code</DialogTitle>
          </DialogContent>
        </Dialog>
      );
    }
    await act(async () => {
      render(<Gate />);
    });
    expect(state.asked).toBe(1);
    expect(heard).toEqual(["unavailable", "open false"]);
    expect(reported).toEqual(["a dialog's code"]);
    expect(screen.queryByTestId("gate-dialog")).toBeNull();
  });
});
