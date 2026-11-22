import { readFileSync } from "node:fs";
import * as React from "react";
import { act, render as renderView, screen } from "@testing-library/react";
import { beforeEach, describe, expect, expectTypeOf, it, vi } from "vitest";

import type { OverlaysImpl } from "./overlay-loader";
import type * as RealParts from "./dialog-parts";
import type * as ThinParts from "./dialog-parts-facade";
import { PanelTestContext } from "./dialog-parts-test-context";

const render = (ui: React.ReactNode) => renderView(ui, { wrapper: PanelTestContext });

const state = vi.hoisted(() => ({
  impl: null as OverlaysImpl | null,
  listeners: new Set<() => void>(),
  finish: null as ((impl: OverlaysImpl) => void) | null,
  fail: null as ((error: Error) => void) | null,
  reports: [] as string[],
}));
vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, language: "en", setLanguage: () => {} }),
}));
vi.mock("@/lib/on-demand-failure", () => ({
  reportOnDemandFailure: (label: string) => state.reports.push(label),
}));
vi.mock("./overlay-loader", () => ({
  loadOverlays: () =>
    new Promise<OverlaysImpl>((resolve, reject) => {
      state.finish = (impl) => {
        state.impl = impl;
        for (const listener of state.listeners) listener();
        resolve(impl);
      };
      state.fail = reject;
    }),
  useOverlays: () =>
    React.useSyncExternalStore(
      (listener) => {
        state.listeners.add(listener);
        return () => state.listeners.delete(listener);
      },
      () => state.impl,
      () => null,
    ),
  warmOverlaysWhenIdle: () => undefined,
}));

import { CategoryModal } from "./category-modal";

beforeEach(() => {
  state.impl = null;
  state.finish = null;
  state.fail = null;
  state.reports = [];
});

describe("CategoryModal uses the modal's one on-demand arrival", () => {
  it("CMD-3 the category shell has no static import of the real anatomy", () => {
    const source = readFileSync("src/components/ui/category-modal.tsx", "utf8");
    expect(source).not.toMatch(/from\s+["']\.\/dialog-parts["']/);
  });

  it("CMD-4 a held first opening draws all three bands in its first panel insertion", async () => {
    const real = await vi.importActual<OverlaysImpl>("./overlays-impl");
    const arrivals: boolean[] = [];
    const observer = new MutationObserver((records) => {
      for (const record of records)
        for (const node of record.addedNodes) {
          if (!(node instanceof HTMLElement)) continue;
          const panel = node.matches("[data-dialog-panel]")
            ? node
            : node.querySelector("[data-dialog-panel]");
          if (panel)
            arrivals.push(
              ["head", "body", "foot"].every((band) => panel.querySelector(`[data-panel-${band}]`)),
            );
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    try {
      render(
        <CategoryModal
          testid="cold-panel"
          title="Title"
          openedBy="test"
          onClose={() => {}}
          description="Description"
          footer={<button type="button">Save</button>}
        >
          <input aria-label="Name" />
        </CategoryModal>,
      );
      expect(screen.queryByRole("dialog")).toBeNull();
      expect(state.finish).not.toBeNull();
      await act(async () => state.finish?.(real));
      expect(screen.getByRole("dialog")).toBeInTheDocument();
      expect(arrivals.length).toBeGreaterThan(0);
      expect(arrivals.every(Boolean)).toBe(true);
    } finally {
      observer.disconnect();
    }
  });

  it("CMD-5 a failed anatomy load follows the existing notice and closing path", async () => {
    const close = vi.fn();
    render(
      <CategoryModal
        testid="failed-panel"
        title="Title"
        openedBy="test"
        onClose={close}
        description="Description"
        footer={<button type="button">Save</button>}
      >
        body
      </CategoryModal>,
    );
    expect(state.fail).not.toBeNull();
    await act(async () => state.fail?.(new Error("offline")));
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(state.reports).toEqual(["a dialog's code"]);
    expect(close).toHaveBeenCalledTimes(1);
  });

  it("CMD-7 the thin parts keep every existing prop and the closed primary ref type", () => {
    expectTypeOf<React.ComponentProps<typeof ThinParts.PanelHeader>>().toEqualTypeOf<
      React.ComponentProps<typeof RealParts.PanelHeader>
    >();
    expectTypeOf<React.ComponentProps<typeof ThinParts.PanelBody>>().toEqualTypeOf<
      Omit<React.ComponentProps<typeof RealParts.PanelBody>, "cueLabel">
    >();
    expectTypeOf<React.ComponentProps<typeof ThinParts.PanelFooter>>().toEqualTypeOf<
      React.ComponentProps<typeof RealParts.PanelFooter>
    >();
    expectTypeOf<React.ComponentProps<typeof ThinParts.PanelSubject>>().toEqualTypeOf<
      React.ComponentProps<typeof RealParts.PanelSubject>
    >();
    expectTypeOf<React.ComponentProps<typeof ThinParts.StepTrack>>().toEqualTypeOf<
      React.ComponentProps<typeof RealParts.StepTrack>
    >();
    expectTypeOf<React.ComponentProps<typeof ThinParts.ActionRow>>().toEqualTypeOf<
      React.ComponentProps<typeof RealParts.ActionRow>
    >();
    type ThinClosed = React.ComponentProps<typeof ThinParts.ClosedPrimary>;
    type RealClosed = React.ComponentProps<typeof RealParts.ClosedPrimary>;
    expectTypeOf<ThinClosed>().toExtend<RealClosed>();
    expectTypeOf<RealClosed>().toExtend<ThinClosed>();
    expectTypeOf<ThinClosed["ref"]>().toEqualTypeOf<RealClosed["ref"]>();
  });
});
