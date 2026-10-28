import { act, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { en } from "@/i18n/locales/en";
import { ownValue } from "@/lib/own-key";

/**
 * Turn C1-2's MINOR-11 (Foundations turn C2) — the wizard's pin preview whose map code cannot
 * download draws NoMap (step-where.tsx): the failure and Refresh in the still map's box
 * (MapFailedHere, the still map's test ids), logged once and never the shell's notice (inPlace).
 * Seams mocked at their boundaries, as in step-where.test.tsx; the map's own module fails.
 */

vi.mock("@/components/shell/location-data", () => ({
  readAreaCookie: () => ({ country: "ET", id: "c1" }),
  resolveGuess: () => null,
  anchorOf: () => null,
  useOpenMarkets: () => ({ markets: [], isLoading: false, failed: false }),
  useCountryTree: (country: string | null) => ({
    nodes: [],
    loadedCountry: country,
    isLoading: false,
    failed: false,
  }),
}));

vi.mock("@/i18n", async (original) => ({
  ...(await original<typeof import("@/i18n")>()),
  useI18n: () => ({ t: (key: string) => ownValue(en, key) ?? key, entities: {} }),
}));

vi.mock("@/i18n/entity", () => ({
  entityName: (_type: string, row: { nameEn: string | null }) => row.nameEn ?? "",
}));

vi.mock("./posting-service", async (original) => ({
  ...(await original<typeof import("./posting-service")>()),
  savePin: vi.fn(async () => true),
  clearPin: vi.fn(async () => true),
  readLastListingPlaces: vi.fn(async () => null),
  readSellerPlace: vi.fn(async () => null),
  readPlaceText: vi.fn(async () => ({ street: null, directions: null })),
  readPlaceFacts: vi.fn(async () => []),
}));

// The still map's code cannot download (offline).
vi.mock("./map/map-preview", () => {
  throw new Error("offline: the map's code did not download");
});

const reported = vi.hoisted(() => vi.fn());
vi.mock("@/lib/on-demand-failure", async (original) => ({
  ...(await original<typeof import("@/lib/on-demand-failure")>()),
  reportOnDemandFailure: reported,
}));

const { StepWhere } = await import("./step-where");

describe("the wizard's pin preview says in its box that its map did not load (INC-956)", () => {
  it("SWN-1 NoMap draws the failure and Refresh in the still map's box, logs one line and raises no notice", async () => {
    const errors = vi.spyOn(console, "error").mockImplementation(() => undefined);
    render(
      <StepWhere
        coverage={[]}
        refusals={[]}
        onChange={() => undefined}
        listingId="e2e-scratch-listing"
        pin={{ lat: 9.0054, lng: 38.7636, precision: "approx", street: null }}
      />,
    );
    await act(async () => {
      await Promise.resolve();
    });
    const preview = screen.getByTestId("post-where-pin-preview");
    const failed = await within(preview).findByTestId("map-failed");
    expect(failed).toHaveTextContent(en["common.loadFailed"]);
    expect(within(failed).getByTestId("map-refresh")).toHaveTextContent(en["common.refreshPage"]);
    expect(within(preview).getByTestId("map-frame")).toContainElement(failed);
    expect(preview).not.toHaveTextContent(en["post.pin.title"]);
    expect(reported).not.toHaveBeenCalled();
    expect(
      errors.mock.calls.filter((call) =>
        String(call[0]).startsWith("[client-error] the map failed to load: "),
      ),
    ).toHaveLength(1);
    errors.mockRestore();
  });
});
