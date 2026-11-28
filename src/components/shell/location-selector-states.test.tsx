import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { en } from "@/i18n/locales/en";
import { readFailed } from "@/lib/reader-failure";

/**
 * UF-1 Part 1 (DEC-493) — the header's location row (S6c.4): a failed areas read says so and
 * its Retry asks the read that failed; no open market says the row is empty. Seams: the shell,
 * the two location reads; the words are the real catalogue.
 */
const reads = vi.hoisted(() => ({
  markets: {} as Record<string, unknown>,
  tree: {} as Record<string, unknown>,
}));
vi.mock("@/i18n", async () => {
  const { en: EN } = await import("@/i18n/locales/en");
  const { ownValue: own } = await import("@/lib/own-key");
  return {
    useI18n: () => ({ t: (key: string) => own(EN, key) ?? key, entities: {}, language: "en" }),
  };
});
vi.mock("@/components/shell-context", () => ({
  useShell: () => ({
    locationPath: [],
    setLocationPath: () => undefined,
    locationCountry: "ET",
    selectLocationCountry: () => undefined,
    guessInUse: false,
    guessNode: null,
    placeNotice: null,
  }),
}));
vi.mock("@/components/shell/location-data", () => ({
  useOpenMarkets: () => reads.markets,
  useCountryTree: () => reads.tree,
  asLocationNode: (n: unknown) => n,
}));

const { LocationSelector } = await import("./location-selector");

beforeEach(() => {
  reads.markets = { markets: [], failed: false, failure: null, isLoading: false, retry: vi.fn() };
  reads.tree = { loadedCountry: null, nodes: [], failed: false, failure: null, retry: vi.fn() };
  vi.spyOn(console, "warn").mockImplementation(() => {});
});

describe("UF-1 the location row", () => {
  it("UFP-33 a failed markets or tree read says the areas could not be loaded, and Retry asks that read again uf:S6c.4", () => {
    for (const which of ["markets", "tree"] as const) {
      const retry = vi.fn();
      const before = { ...reads[which] };
      reads[which] = { ...before, failed: true, failure: readFailed("route 503", 503), retry };
      const { unmount } = render(<LocationSelector />);
      expect(screen.getByTestId("location-error")).toHaveTextContent(en["location.readFailed"]);
      expect(screen.queryByText(en["location.empty"])).toBeNull();
      fireEvent.click(screen.getByRole("button", { name: en["common.retry"] }));
      expect(retry).toHaveBeenCalledTimes(1);
      unmount();
      reads[which] = before;
    }
  });

  it("UFP-34 with no open market the row says there are no areas uf:S6c.4", () => {
    render(<LocationSelector />);
    expect(screen.getByText(en["location.empty"])).toBeInTheDocument();
    expect(screen.queryByTestId("location-error")).toBeNull();
  });
});
