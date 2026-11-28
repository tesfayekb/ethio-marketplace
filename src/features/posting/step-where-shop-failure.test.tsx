import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { en } from "@/i18n/locales/en";
import { ownValue } from "@/lib/own-key";

import { draftRefusalText } from "./refusal-text";

/**
 * Cursor 8c-3a ruling 1 (INC-1351) — the place step's "also my shop or office" tick keeps what its
 * failed action was refused with: a door's code is worded by the posting family, the draft dial by
 * the family's dial words with its when, a failure that names no code keeps the line's own words.
 * Seams mocked at their boundaries, as in step-where-pin-failure.test.tsx.
 */
const door = vi.hoisted(() => ({ save: vi.fn(), clear: vi.fn() }));

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
  saveSellerPlace: door.save,
  clearSellerPlace: door.clear,
  readLastListingPlaces: vi.fn(async () => null),
  readSellerPlace: vi.fn(async () => null),
  readPlaceText: vi.fn(async () => ({ street: null, directions: null })),
  readPlaceFacts: vi.fn(async () => []),
}));

const { StepWhere } = await import("./step-where");

const words = (key: string) => ownValue(en, key) ?? key;
const RESET = "2030-01-01T00:00:00.000Z";

async function tickShop() {
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
  fireEvent.click(await screen.findByTestId("post-where-shop"));
}

describe("the shop tick's failed save keeps what failed", () => {
  beforeEach(() => {
    door.save.mockReset();
    door.clear.mockReset();
  });

  it("SWSH-1 a refusal that named a code is worded by the posting family, in the same element", async () => {
    door.save.mockResolvedValue({ ok: false, refusal: "notYourListing" });
    await tickShop();
    const line = await screen.findByTestId("post-where-shop-error");
    expect(line).toHaveTextContent(draftRefusalText("notYourListing", words, "en"));
    expect(line).not.toHaveTextContent(en["post.where.shopFailed"]);
  });

  it("SWSH-2 the draft dial's refusal says its words with when it opens again", async () => {
    door.save.mockResolvedValue({ ok: false, refusal: `rateLimited:${RESET}` });
    await tickShop();
    const line = await screen.findByTestId("post-where-shop-error");
    expect(line).toHaveTextContent(draftRefusalText(`rateLimited:${RESET}`, words, "en"));
    expect(line).not.toHaveTextContent(en["post.where.shopFailed"]);
  });

  it("SWSH-3 a failure that names no code keeps the line's own words", async () => {
    door.save.mockResolvedValue({ ok: false, refusal: null });
    await tickShop();
    expect(await screen.findByTestId("post-where-shop-error")).toHaveTextContent(
      en["post.where.shopFailed"],
    );
  });

  it("SWSH-4 an answered save draws no failure", async () => {
    door.save.mockResolvedValue({ ok: true });
    await tickShop();
    await waitFor(() => expect(door.save).toHaveBeenCalledTimes(1));
    expect(screen.queryByTestId("post-where-shop-error")).toBeNull();
  });
});
