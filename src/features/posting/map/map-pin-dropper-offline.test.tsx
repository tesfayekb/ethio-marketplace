import { en } from "@/i18n/locales/en";
import { ownValue } from "@/lib/own-key";
import { renderPanel as render } from "@/components/ui/dialog-parts-test-render";
import { act, cleanup, fireEvent, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { DIALOG_LAYER } from "@/components/ui/dialog-look";

/**
 * INC-911 (Foundations turn 34b-3) — the pin map whose code cannot download says so in its own
 * place and offers to refresh the page (the browser keeps a failed download for the page's life,
 * INC-918). It said "The place search is unavailable. Tap the map instead." with no map to tap.
 */
const mapState = vi.hoisted(() => ({ works: false, realWords: false }));
vi.mock("./geocode", () => ({
  reverseStreet: async () => ({ street: null }),
  readOutline: async () => null,
  searchPlaces: async () => ({ results: [], reason: null }),
}));
vi.mock("./leaflet", async (importOriginal) => {
  const actual = await importOriginal<typeof import("./leaflet")>();
  return {
    ...actual,
    loadLeaflet: async () => {
      if (!mapState.works) throw new Error("Failed to fetch dynamically imported module");
      const map = {
        on: vi.fn(),
        getZoom: () => 16,
        getCenter: () => ({ lat: 9, lng: 38 }),
        remove: vi.fn(),
      };
      const marker = { addTo: () => marker, on: vi.fn(), setLatLng: vi.fn() };
      return {
        map: () => map,
        marker: () => marker,
        latLng: () => ({ distanceTo: () => 6000 }),
        circle: () => ({ addTo: vi.fn() }),
      };
    },
    addTileLayers: () => [],
    pinIcon: () => ({}),
    loadTilePlan: () => Promise.resolve({ plan: actual.OSM_PLAN, reason: null }),
  };
});
vi.mock("@/i18n", () => ({
  useI18n: () => ({
    t: (key: string) => (mapState.realWords ? (ownValue(en, key) ?? key) : key),
    language: "en",
  }),
}));
const refreshed = vi.hoisted(() => vi.fn());
vi.mock("@/lib/on-demand-failure", async (original) => ({
  ...(await original<typeof import("@/lib/on-demand-failure")>()),
  refreshPage: refreshed,
}));

const { MapPinDropper } = await import("./map-pin-dropper");

describe("the pin map offline (INC-911)", () => {
  it("PMD-1 the pin sheet is the one dialog; a map whose code cannot download says so in its place inside it, once the panel is drawn, and offers a refresh (turn S6-4)", async () => {
    const errors = vi.spyOn(console, "error").mockImplementation(() => undefined);
    render(
      <MapPinDropper
        saved={null}
        place={{ lat: 9.03, lng: 38.74, level: "city", query: null }}
        note=""
        onNote={() => undefined}
        onSave={async () => true}
        onClose={() => undefined}
      />,
    );
    const failed = await screen.findByTestId("post-pin-load-failed");
    const sheet = screen.getByTestId("post-pin-sheet");
    expect(sheet).toHaveAttribute("role", "dialog");
    expect(sheet).toHaveAttribute("data-dialog-panel");
    expect(sheet).toHaveClass(DIALOG_LAYER.modal);
    expect(sheet.contains(failed)).toBe(true);
    expect(failed.getAttribute("role")).toBe("alert");
    expect(failed.textContent).toContain("common.loadFailed");
    expect(screen.queryByText("post.pin.geocodeUnavailable")).toBeNull();
    fireEvent.click(screen.getByTestId("post-pin-load-refresh"));
    expect(refreshed).toHaveBeenCalledTimes(1);
    expect(errors).toHaveBeenCalledWith(
      "[client-error] the pin map failed to load: Failed to fetch dynamically imported module",
    );
    errors.mockRestore();
  });
});

it("UFW-30 the pin sheet names map-download failure, an outside pin and a failed Save uf:S7s6.10", async () => {
  mapState.realWords = true;
  mapState.works = false;
  const log = vi.spyOn(console, "error").mockImplementation(() => {});
  try {
    render(
      <MapPinDropper
        saved={null}
        place={{ lat: 9, lng: 38, level: "city", query: null }}
        note=""
        onNote={vi.fn()}
        onSave={vi.fn(async () => false)}
        onClose={vi.fn()}
      />,
    );
    const failed = await screen.findByTestId("post-pin-load-failed");
    expect(screen.getByRole("dialog").contains(failed)).toBe(true);
    expect(failed).toHaveTextContent(en["common.loadFailed"]);
    cleanup();
    mapState.works = true;
    const save = vi.fn(async () => false);
    render(
      <MapPinDropper
        saved={{ lat: 9.1, lng: 38.2, precision: "exact", street: null }}
        place={{ lat: 9, lng: 38, level: "city", query: null }}
        note=""
        onNote={vi.fn()}
        onSave={save}
        onClose={vi.fn()}
      />,
    );
    await waitFor(() =>
      expect(screen.getByTestId("post-pin-map")).toHaveAttribute("data-ready", "1"),
    );
    expect(screen.getByTestId("post-pin-outside")).toHaveTextContent(en["post.pin.outsidePlace"]);
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: en["post.pin.saveLocation"] }));
    });
    expect(screen.getByTestId("post-pin-error")).toHaveTextContent(en["post.pin.saveFailed"]);
    expect(save).toHaveBeenCalledExactlyOnceWith({
      lat: 9.1,
      lng: 38.2,
      precision: "exact",
      zoom: 16,
    });
  } finally {
    mapState.works = false;
    mapState.realWords = false;
    log.mockRestore();
  }
});
