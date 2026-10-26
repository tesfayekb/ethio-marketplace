import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

/**
 * INC-911 (Foundations turn 34b-3) — the pin map whose code cannot download says so in its own
 * place and offers to refresh the page (the browser keeps a failed download for the page's life,
 * INC-918). It said "The place search is unavailable. Tap the map instead." with no map to tap.
 */
vi.mock("./leaflet", async (importOriginal) => {
  const actual = await importOriginal<typeof import("./leaflet")>();
  return {
    ...actual,
    loadLeaflet: () => Promise.reject(new Error("Failed to fetch dynamically imported module")),
    loadTilePlan: () => Promise.resolve({ plan: actual.OSM_PLAN, reason: null }),
  };
});
vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, language: "en" }),
}));
const refreshed = vi.hoisted(() => vi.fn());
vi.mock("@/lib/on-demand-failure", () => ({ refreshPage: refreshed }));

const { MapPinDropper } = await import("./map-pin-dropper");

describe("the pin map offline (INC-911)", () => {
  it("PMD-1 a map whose code cannot download says so in place and offers a refresh", async () => {
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
