import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

/**
 * INC-956 (Foundations turn C1-2; turn C1's stop 1) — a map whose own code arrived but whose
 * Leaflet or tile plan cannot download (offline, the still map below the fold at 360 px) says so
 * in its own place, once: the failure and Refresh, never the shell's notice besides — as the pin
 * map already does (PMD-1).
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
const reported = vi.hoisted(() => vi.fn());
const refreshed = vi.hoisted(() => vi.fn());
vi.mock("@/lib/on-demand-failure", async (original) => ({
  ...(await original<typeof import("@/lib/on-demand-failure")>()),
  reportOnDemandFailure: reported,
  refreshPage: refreshed,
}));

const { MapPreview } = await import("./map-preview");
const { MapLarge } = await import("./map-large");

describe("a map whose library cannot download says so in its place (INC-956)", () => {
  it("MOF-1 the still map shows the failure and Refresh over its box; the shell's notice is not raised", async () => {
    const errors = vi.spyOn(console, "error").mockImplementation(() => undefined);
    render(<MapPreview lat={9.0054} lng={38.7636} precision="approx" />);
    const failed = await screen.findByTestId("map-failed");
    expect(failed.getAttribute("role")).toBe("alert");
    expect(failed.textContent).toContain("common.loadFailed");
    expect(screen.getByTestId("map-refresh").textContent).toContain("common.refreshPage");
    expect(screen.getByTestId("listing-map-circle").parentElement).toContainElement(failed);
    expect(reported).not.toHaveBeenCalled();
    expect(String(errors.mock.calls[0]?.[0])).toMatch(/^\[client-error\] the map failed to load: /);
    errors.mockRestore();
  });

  it("MOF-2 the large map shows the failure and Refresh in its place; the shell's notice is not raised", async () => {
    const errors = vi.spyOn(console, "error").mockImplementation(() => undefined);
    render(<MapLarge lat={9.0054} lng={38.7636} precision="exact" />);
    const failed = await screen.findByTestId("map-large-failed");
    expect(failed.textContent).toContain("common.loadFailed");
    expect(screen.getByTestId("map-large-refresh").textContent).toContain("common.refreshPage");
    expect(reported).not.toHaveBeenCalled();
    expect(String(errors.mock.calls[0]?.[0])).toMatch(
      /^\[client-error\] the large map failed to load: /,
    );
    errors.mockRestore();
  });
});
