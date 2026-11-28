import { useLayoutEffect, type ReactNode } from "react";
import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { useState } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { TreeNode } from "@/components/shell/location-data";
import { ReaderError } from "@/lib/reader-failure";
import { en } from "@/i18n/locales/en";
import { am } from "@/i18n/locales/am";
import { ownValue } from "@/lib/own-key";

/**
 * W6 (R4/R5) — THE NESTED PLACE LAYOUT, as a component (DEC-026).
 *
 * Seams mocked at their boundaries: the shell's geography reader (markets and
 * trees), the i18n hook, the entity-name resolver and the pin doors. The unit
 * under test is presentation only: where each add button puts its row, the red
 * border on a box without a city, and a region box vanishing with its last city.
 */

function node(id: string, parentId: string | null, level: string): TreeNode {
  return {
    id,
    parentId,
    level,
    slug: id,
    nameEn: id,
    centerLat: null,
    centerLng: null,
    isoCode: null,
  };
}

const TREES: Record<string, TreeNode[]> = {
  ET: [
    node("et", null, "country"),
    node("r1", "et", "region"),
    node("r2", "et", "region"),
    node("c1", "r1", "city"),
    node("c2", "r1", "city"),
    node("c3", "r2", "city"),
    node("s1", "c1", "sub_city"),
    // W2 — enough room left that the add buttons stay drawn in the layout tests.
    node("r3", "et", "region"),
    node("c4", "r1", "city"),
    node("c5", "r3", "city"),
    node("s2", "c1", "sub_city"),
  ],
  KE: [node("ke", null, "country"), node("kr", "ke", "region"), node("kc", "kr", "city")],
};

const lastPlaces = vi.hoisted(() => ({
  value: null as null | { country: string; itemId: string; placeIds: string[] },
  /** INC-1257 — a failed last-post read: thrown in place of the places. */
  failure: null as Error | null,
}));

const geography = vi.hoisted(() => ({
  marketFailed: false,
  treeFailed: false,
  marketRetry: vi.fn(),
  treeRetry: vi.fn(),
  catalogue: false,
  amharic: false,
  noRegions: false,
}));

vi.mock("@/components/shell/location-data", () => ({
  readAreaCookie: () => ({ country: "ET", id: "c1" }),
  resolveGuess: () => null,
  anchorOf: (nodes: TreeNode[]) =>
    nodes.find((entry) => entry.parentId === null && entry.level === "country") ?? null,
  useOpenMarkets: () => ({
    markets: [
      { code: "ET", nameEn: "Ethiopia", anchorId: null },
      { code: "KE", nameEn: "Kenya", anchorId: null },
    ],
    isLoading: false,
    failed: geography.marketFailed,
    failure: geography.marketFailed ? new TypeError("Failed to fetch") : null,
    retry: geography.marketRetry,
  }),
  useCountryTree: (country: string | null) => ({
    nodes: geography.noRegions
      ? [node("et", null, "country"), node("c1", "et", "city")]
      : country === null
        ? []
        : (TREES[country] ?? []),
    loadedCountry: country,
    isLoading: false,
    failed: geography.treeFailed,
    failure: geography.treeFailed ? new TypeError("Failed to fetch") : null,
    retry: geography.treeRetry,
  }),
}));

vi.mock("@/i18n", () => ({
  useI18n: () => ({
    t: (key: string) =>
      geography.catalogue ? (ownValue(geography.amharic ? am : en, key) ?? key) : key,
    entities: {},
    language: geography.amharic ? "am" : "en",
  }),
}));

vi.mock("@/i18n/entity", () => ({
  entityName: (_type: string, row: { nameEn: string | null }) => row.nameEn ?? "",
}));

vi.mock("./posting-service", () => ({
  savePin: vi.fn(async () => ({ ok: true })),
  clearPin: vi.fn(async () => true),
  clearPinAnswer: vi.fn(async () => ({ ok: true })),
  readSellerPlace: async () => null,
  readPlaceFacts: async () => null,
  readLastListingPlaces: vi.fn(async () => {
    if (lastPlaces.failure !== null) throw lastPlaces.failure;
    return lastPlaces.value;
  }),
}));

const { StepWhere } = await import("./step-where");

function Harness({
  caps,
}: {
  caps: { cities: number | null; regions: number | null; countries: number | null };
}) {
  const [coverage, setCoverage] = useState<string[]>([]);
  return (
    <>
      <StepWhere
        coverage={coverage}
        refusals={[]}
        onChange={(next) => setCoverage(next)}
        caps={{
          maxCities: caps.cities,
          maxRegions: caps.regions,
          maxCountries: caps.countries,
        }}
      />
      <output data-testid="coverage">{coverage.join(",")}</output>
    </>
  );
}

beforeEach(() => {
  geography.noRegions = false;
  geography.marketFailed = false;
  geography.treeFailed = false;
  geography.catalogue = false;
  geography.amharic = false;
  geography.marketRetry.mockClear();
  geography.treeRetry.mockClear();
  lastPlaces.value = null;
  lastPlaces.failure = null;
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => new Response(JSON.stringify({}), { status: 200 })),
  );
});

async function mount(
  caps: { cities: number | null; regions: number | null; countries: number | null } = {
    cities: 3,
    regions: 2,
    countries: 2,
  },
) {
  render(<Harness caps={caps} />);
  // Let the guess read and the prefill effects settle.
  await act(async () => {
    await Promise.resolve();
  });
  return screen.getByTestId("post-where-country-box", { exact: false });
}

function primaryBox(): HTMLElement {
  const box = document.querySelector<HTMLElement>(
    '[data-testid="post-where-country-box"][data-primary="1"]',
  );
  if (box === null) throw new Error("the primary country box is not drawn");
  return box;
}

/**
 * INC-1353 — the step reports its missing answers inside the commit that draws it: a parent's
 * layout effect (which runs after its children's layout effects and before any passive effect)
 * already sees the report, so a submit in that same tick meets a closed gate.
 */
function Probe({ onCommit, children }: { onCommit: () => void; children: ReactNode }) {
  useLayoutEffect(() => {
    onCommit();
  });
  return <>{children}</>;
}

it("UFR-3 the place step's missing coverage is heard by the gate in the commit that draws it", () => {
  const onMissing = vi.fn();
  let atCommit: unknown[][] = [];
  render(
    <Probe onCommit={() => (atCommit = onMissing.mock.calls.slice())}>
      <StepWhere
        coverage={[]}
        refusals={[]}
        onChange={() => {}}
        caps={{ maxCities: 3, maxRegions: 2, maxCountries: 2 }}
        onMissing={onMissing}
      />
    </Probe>,
  );
  expect(atCommit[0]).toEqual([["coverage"]]);
});
