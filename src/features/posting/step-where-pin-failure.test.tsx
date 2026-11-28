import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { en } from "@/i18n/locales/en";
import { ownValue } from "@/lib/own-key";

import { draftRefusalText } from "./refusal-text";

/**
 * INC-1351 (cursor-bundle-8c-3a) — the place step's pin line keeps what its failed action was
 * refused with: a door's code is worded by the posting family (`draftRefusalText`), a failure that
 * names no code says "not saved" as before; the element, its test id and its words for that case
 * are unchanged. Seams mocked at their boundaries, as in step-where-no-map.test.tsx.
 */
const door = vi.hoisted(() => ({ clear: vi.fn() }));

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
  useI18n: () => ({
    t: (key: string) => ownValue(en, key) ?? key,
    entities: {},
    language: "en",
  }),
}));
vi.mock("./map/map-preview", () => {
  throw new Error("offline: the map's code did not download");
});
vi.mock("@/lib/on-demand-failure", async (original) => ({
  ...(await original<typeof import("@/lib/on-demand-failure")>()),
  reportOnDemandFailure: vi.fn(),
}));
vi.mock("./posting-service", async (original) => ({
  ...(await original<typeof import("./posting-service")>()),
  clearPinAnswer: door.clear,
  readLastListingPlaces: vi.fn(async () => null),
  readSellerPlace: vi.fn(async () => null),
  readPlaceText: vi.fn(async () => ({ street: null, directions: null })),
  readPlaceFacts: vi.fn(async () => []),
}));

const { StepWhere } = await import("./step-where");

const words = (key: string) => ownValue(en, key) ?? key;

async function removePin() {
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
  fireEvent.click(screen.getByTestId("post-pin-remove"));
}

describe("INC-1351 — the pin line's failed removal keeps what failed", () => {
  beforeEach(() => door.clear.mockReset());

  it("SWPF-1 a refusal that named a code is worded by the posting family, in the same element", async () => {
    door.clear.mockResolvedValue({ ok: false, refusal: "directionsTooLong:400" });
    await removePin();
    const line = await screen.findByTestId("post-pin-error");
    expect(line).toHaveTextContent(draftRefusalText("directionsTooLong:400", words, "en"));
    expect(line).not.toHaveTextContent(en["post.pin.saveFailed"]);
    expect(screen.queryByTestId("post-pin-removed")).toBeNull();
  });

  it("SWPF-2 a failure that names no code says it was not saved, as before", async () => {
    door.clear.mockResolvedValue({ ok: false, refusal: null });
    await removePin();
    expect(await screen.findByTestId("post-pin-error")).toHaveTextContent(
      en["post.pin.saveFailed"],
    );
  });

  it("SWPF-3 a removal that the door answered says removed and draws no failure", async () => {
    door.clear.mockResolvedValue({ ok: true });
    await removePin();
    await waitFor(() => expect(screen.getByTestId("post-pin-removed")).toBeTruthy());
    expect(screen.queryByTestId("post-pin-error")).toBeNull();
  });
});
