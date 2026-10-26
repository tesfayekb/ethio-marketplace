import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * DEC-258 — the shell's one gate for the strings layers: a page that declares
 * none draws at once; a page that declares one waits for it, says so when it
 * fails (with Refresh page — INC-911), and draws once it is in.
 */

const state = vi.hoisted(() => ({
  matches: [] as { staticData: { strings?: string[] } }[],
  layers: "loading" as "loading" | "ready" | "failed",
  asked: [] as string[][],
  retry: vi.fn(),
}));

const refreshed = vi.hoisted(() => vi.fn());
vi.mock("@/lib/on-demand-failure", () => ({ refreshPage: refreshed }));
vi.mock("@tanstack/react-router", () => ({
  useMatches: ({ select }: { select: (matches: unknown[]) => unknown }) => select(state.matches),
}));
vi.mock("@/i18n", () => ({
  STRINGS_LAYERS: ["admin", "member"],
  isStringsLayer: (value: string) => value === "admin" || value === "member",
  useI18n: () => ({ t: (key: string) => key }),
  useStringsLayers: (layers: string[]) => {
    state.asked.push(layers);
    return { state: layers.length === 0 ? "ready" : state.layers, retry: state.retry };
  },
}));

const { StringsLayerGate } = await import("./strings-layer-gate");

function draw() {
  render(
    <StringsLayerGate>
      <p data-testid="route">route</p>
    </StringsLayerGate>,
  );
}

beforeEach(() => {
  state.matches = [];
  state.layers = "loading";
  state.asked = [];
  state.retry.mockReset();
  refreshed.mockReset();
});

describe("StringsLayerGate (DEC-258)", () => {
  it("SLG-1 a page that declares no layer draws at once and asks for none", () => {
    state.matches = [{ staticData: {} }, { staticData: {} }];
    draw();
    expect(screen.getByTestId("route")).toBeTruthy();
    expect(state.asked.every((layers) => layers.length === 0)).toBe(true);
  });

  it("SLG-2 a page that declares a layer waits for it: the waiting line, not the route", () => {
    state.matches = [{ staticData: {} }, { staticData: { strings: ["member"] } }];
    draw();
    expect(screen.getByTestId("strings-layer-waiting")).toBeTruthy();
    expect(screen.queryByTestId("route")).toBeNull();
    expect(state.asked.at(-1)).toEqual(["member"]);
  });

  it("SLG-3 a failed layer says so, and offers to refresh the page (INC-911)", () => {
    state.matches = [{ staticData: { strings: ["admin", "member"] } }];
    state.layers = "failed";
    draw();
    expect(screen.getByTestId("strings-layer-failed").textContent).toContain("common.loadFailed");
    expect(screen.queryByTestId("route")).toBeNull();
    fireEvent.click(screen.getByTestId("strings-layer-refresh"));
    expect(refreshed).toHaveBeenCalledTimes(1);
    expect(state.asked.at(-1)).toEqual(["admin", "member"]);
  });

  it("SLG-4 once the declared layers are in, the route draws", () => {
    state.matches = [{ staticData: {} }, { staticData: { strings: ["member"] } }];
    state.layers = "ready";
    draw();
    expect(screen.getByTestId("route")).toBeTruthy();
    expect(screen.queryByTestId("strings-layer-waiting")).toBeNull();
  });
});
