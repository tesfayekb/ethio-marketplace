import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { useState } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { TreeNode } from "@/components/shell/location-data";

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
  ],
  KE: [node("ke", null, "country"), node("kr", "ke", "region"), node("kc", "kr", "city")],
};

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
    failed: false,
  }),
  useCountryTree: (country: string | null) => ({
    nodes: country === null ? [] : (TREES[country] ?? []),
    loadedCountry: country,
    isLoading: false,
    failed: false,
  }),
}));

vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, entities: {} }),
}));

vi.mock("@/i18n/entity", () => ({
  entityName: (_type: string, row: { nameEn: string | null }) => row.nameEn ?? "",
}));

vi.mock("./posting-service", () => ({
  savePin: vi.fn(async () => true),
  clearPin: vi.fn(async () => true),
}));

const { StepWhere } = await import("./step-where");

function Harness({ caps }: { caps: { cities: number; regions: number; countries: number } }) {
  const [coverage, setCoverage] = useState<string[]>([]);
  return (
    <>
      <StepWhere
        coverage={coverage}
        refusals={[]}
        onChange={(next) => setCoverage(next)}
        maxCities={caps.cities}
        maxRegions={caps.regions}
        maxCountries={caps.countries}
      />
      <output data-testid="coverage">{coverage.join(",")}</output>
    </>
  );
}

beforeEach(() => {
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => new Response(JSON.stringify({}), { status: 200 })),
  );
});

async function mount(caps = { cities: 3, regions: 2, countries: 2 }) {
  render(<Harness caps={caps} />);
  // Let the guess read and the prefill effects settle.
  await act(async () => {
    await Promise.resolve();
  });
  return screen.getByTestId("post-where-country-box", { exact: false });
}

function primaryBox() {
  return document.querySelector<HTMLElement>(
    '[data-testid="post-where-country-box"][data-primary="1"]',
  )!;
}

describe("StepWhere — the nested layout (W6 R4/R5)", () => {
  it("prefills a city, and the item's box carries no red border", async () => {
    await mount();
    expect(primaryBox()).toHaveAttribute("data-empty", "0");
    expect(screen.getByTestId("coverage")).toHaveTextContent("c1");
  });

  it("'Add a city' adds a row inside its region box", async () => {
    await mount();
    const region = document.querySelector<HTMLElement>(
      '[data-testid="post-where-region-box"][data-region="r1"]',
    )!;
    fireEvent.click(within(region).getByTestId("post-where-add-city"));
    const rows = within(region).getAllByTestId("post-where-row");
    expect(rows).toHaveLength(2);
    fireEvent.change(within(rows[1]!).getByTestId("post-where-row-city"), {
      target: { value: "c2" },
    });
    expect(screen.getByTestId("coverage")).toHaveTextContent("c1,c2");
  });

  it("'Add a region' adds a box inside the country box, red until it has a city; its last city's removal removes it", async () => {
    await mount();
    fireEvent.click(within(primaryBox()).getByTestId("post-where-add-region"));
    const pending = within(primaryBox())
      .getAllByTestId("post-where-region-box")
      .find((box) => box.getAttribute("data-region") === "");
    expect(pending).toBeDefined();
    expect(pending).toHaveAttribute("data-empty", "1");
    fireEvent.change(within(pending!).getByTestId("post-where-row-region"), {
      target: { value: "r2" },
    });
    const r2 = document.querySelector<HTMLElement>(
      '[data-testid="post-where-region-box"][data-region="r2"]',
    )!;
    fireEvent.change(within(r2).getByTestId("post-where-row-city"), { target: { value: "c3" } });
    expect(r2).toHaveAttribute("data-empty", "0");
    expect(screen.getByTestId("coverage")).toHaveTextContent("c1,c3");
    fireEvent.click(within(r2).getByTestId("post-where-remove"));
    expect(
      document.querySelector('[data-testid="post-where-region-box"][data-region="r2"]'),
    ).toBeNull();
    expect(screen.getByTestId("coverage")).toHaveTextContent(/^c1$/);
  });

  it("'Add a country' adds a box outside the item's country box, red until it has a city", async () => {
    await mount();
    fireEvent.click(screen.getByTestId("post-where-add-country"));
    const boxes = screen.getAllByTestId("post-where-country-box");
    expect(boxes).toHaveLength(2);
    const added = boxes.find((box) => box.getAttribute("data-primary") === "0")!;
    expect(primaryBox().contains(added)).toBe(false);
    expect(added).toHaveAttribute("data-empty", "1");
  });

  it("shows no add button when the plan leaves no room (1/1/1)", async () => {
    await mount({ cities: 1, regions: 1, countries: 1 });
    expect(screen.queryByTestId("post-where-add-city")).toBeNull();
    expect(screen.queryByTestId("post-where-add-region")).toBeNull();
    expect(screen.queryByTestId("post-where-add-country")).toBeNull();
  });
});
