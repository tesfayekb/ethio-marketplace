import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
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
  readLastListingPlaces: vi.fn(async () => lastPlaces.value),
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
  lastPlaces.value = null;
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

/**
 * W6b-1 (R2–R4) — WHERE THE AD IS SHOWN: one tick across every city box, the
 * ticked place first, a city box only under a chosen region, and the last post
 * as the first prefill. Plan: 3 cities / 2 regions / 2 countries.
 */
describe("StepWhere — the ad's places and the item tick (W6b-1)", () => {
  const regionBox = (id: string) =>
    document.querySelector<HTMLElement>(
      `[data-testid="post-where-region-box"][data-region="${id}"]`,
    )!;
  const ticks = () => screen.getAllByTestId("post-where-item-tick") as HTMLInputElement[];

  it("shows a city box only after its region is chosen", async () => {
    await mount();
    fireEvent.click(within(primaryBox()).getByTestId("post-where-add-region"));
    const pending = within(primaryBox())
      .getAllByTestId("post-where-region-box")
      .find((box) => box.getAttribute("data-region") === "")!;
    expect(within(pending).queryAllByTestId("post-where-row")).toHaveLength(0);
    fireEvent.change(within(pending).getByTestId("post-where-row-region"), {
      target: { value: "r2" },
    });
    expect(within(regionBox("r2")).getAllByTestId("post-where-row")).toHaveLength(1);
  });

  /**
   * INC-360 — J, as amended by bundle 2 P2: "+ Add city" closes its region box
   * after every city row; "+ Add region" is the last child of the COUNTRY box,
   * below its region boxes, and sits in no region box. The
   * no-region-box state is not mountable here (the cookie prefill always
   * opens r1, and its only city cannot be removed), so that branch is
   * covered by the e2e staircase, not this test.
   */
  it("puts each add button where the staircase ruling places it (J)", async () => {
    await mount({ cities: 3, regions: 3, countries: 2 });
    fireEvent.click(within(primaryBox()).getByTestId("post-where-add-region"));
    const pending = within(primaryBox())
      .getAllByTestId("post-where-region-box")
      .find((box) => box.getAttribute("data-region") === "")!;
    fireEvent.change(within(pending).getByTestId("post-where-row-region"), {
      target: { value: "r2" },
    });

    const r1 = regionBox("r1");
    const addCity = within(r1).getByTestId("post-where-add-city");
    const cityRows = within(r1).getAllByTestId("post-where-row");
    for (const row of cityRows) {
      expect(row.compareDocumentPosition(addCity) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    }

    const boxes = within(primaryBox()).getAllByTestId("post-where-region-box");
    const last = boxes[boxes.length - 1]!;
    const addRegion = within(primaryBox()).getByTestId("post-where-add-region");
    expect(primaryBox().lastElementChild).toBe(addRegion);
    expect(last.compareDocumentPosition(addRegion) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    for (const box of boxes) expect(box.contains(addRegion)).toBe(false);

    expect(primaryBox().contains(screen.getByTestId("post-where-add-country"))).toBe(false);
  });

  it("has exactly one tick, and moving it puts that place first", async () => {
    await mount();
    fireEvent.click(within(regionBox("r1")).getByTestId("post-where-add-city"));
    const rows = within(regionBox("r1")).getAllByTestId("post-where-row");
    fireEvent.change(within(rows[1]!).getByTestId("post-where-row-city"), {
      target: { value: "c2" },
    });
    expect(ticks()).toHaveLength(2);
    expect(ticks().filter((tick) => tick.checked)).toHaveLength(1);
    expect(screen.getByTestId("coverage")).toHaveTextContent(/^c1,c2$/);
    fireEvent.click(within(rows[1]!).getByTestId("post-where-item-tick"));
    expect(ticks().filter((tick) => tick.checked)).toHaveLength(1);
    expect(screen.getByTestId("coverage")).toHaveTextContent(/^c2,c1$/);
  });

  it("moves the tick when the ticked city is removed, and announces it", async () => {
    await mount();
    fireEvent.click(within(regionBox("r1")).getByTestId("post-where-add-city"));
    const rows = within(regionBox("r1")).getAllByTestId("post-where-row");
    fireEvent.change(within(rows[1]!).getByTestId("post-where-row-city"), {
      target: { value: "c2" },
    });
    fireEvent.click(within(rows[0]!).getByTestId("post-where-remove"));
    expect(ticks()).toHaveLength(1);
    expect(ticks()[0]!.checked).toBe(true);
    expect(screen.getByTestId("coverage")).toHaveTextContent(/^c2$/);
    expect(screen.getByTestId("post-where-announce")).toHaveTextContent("post.where.itemMoved");
  });

  it("makes a chosen sub-city the item place", async () => {
    await mount();
    fireEvent.change(screen.getByTestId("post-where-subcity"), { target: { value: "s1" } });
    expect(screen.getByTestId("coverage")).toHaveTextContent(/^s1$/);
  });

  it("prefills a new post from the last post before the saved area", async () => {
    lastPlaces.value = { country: "ET", itemId: "c3", placeIds: ["c3"] };
    await mount();
    await act(async () => {
      await Promise.resolve();
    });
    expect(screen.getByTestId("coverage")).toHaveTextContent(/^c3$/);
    expect(ticks()[0]!.checked).toBe(true);
    expect(primaryBox()).toHaveAttribute("data-empty", "0");
  });
});

/**
 * Bundle 2 P2/P3 (PW-110) — each add control sits inside the box it adds a child
 * to, below that box's children, never inside a box it adds a sibling of; the
 * marker sits on its own lower line of the city box, with Remove at its end.
 */
describe("StepWhere — where the add controls and the marker sit (bundle 2 P2/P3)", () => {
  const following = (later: Element, earlier: Element) =>
    Boolean(earlier.compareDocumentPosition(later) & Node.DOCUMENT_POSITION_FOLLOWING);

  it("PW-110 Add region closes the country box, below its region boxes, outside every region box", async () => {
    await mount({ cities: 3, regions: 3, countries: 2 });
    const country = primaryBox();
    const addRegion = within(country).getByTestId("post-where-add-region");
    expect(addRegion.closest('[data-testid="post-where-region-box"]')).toBeNull();
    const regions = within(country).getAllByTestId("post-where-region-box");
    expect(following(addRegion, regions.at(-1)!)).toBe(true);
    fireEvent.click(addRegion);
    const after = within(primaryBox()).getAllByTestId("post-where-region-box");
    expect(after.length).toBe(regions.length + 1);
    const moved = within(primaryBox()).getByTestId("post-where-add-region");
    expect(moved.closest('[data-testid="post-where-region-box"]')).toBeNull();
    expect(following(moved, after.at(-1)!)).toBe(true);
  });

  it("PW-110 Add city sits in its region box below its city boxes, outside every city box", async () => {
    await mount();
    const region = document.querySelector<HTMLElement>(
      '[data-testid="post-where-region-box"][data-region="r1"]',
    )!;
    fireEvent.click(within(region).getByTestId("post-where-add-city"));
    const addCity = within(region).getByTestId("post-where-add-city");
    expect(addCity.closest('[data-testid="post-where-row"]')).toBeNull();
    const rows = within(region).getAllByTestId("post-where-row");
    expect(following(addCity, rows.at(-1)!)).toBe(true);
  });

  it("PW-110 Add country sits below the country boxes, outside every country box", async () => {
    await mount();
    const addCountry = screen.getByTestId("post-where-add-country");
    expect(addCountry.closest('[data-testid="post-where-country-box"]')).toBeNull();
    const boxes = screen.getAllByTestId("post-where-country-box");
    expect(following(addCountry, boxes.at(-1)!)).toBe(true);
  });

  it("PW-110 the marker has its own line under the city, and Remove ends that line", async () => {
    await mount();
    const region = document.querySelector<HTMLElement>(
      '[data-testid="post-where-region-box"][data-region="r1"]',
    )!;
    fireEvent.click(within(region).getByTestId("post-where-add-city"));
    for (const row of within(region).getAllByTestId("post-where-row")) {
      const line = within(row).getByTestId("post-where-item-line");
      const tick = within(line).getByTestId("post-where-item-tick");
      const city = row.querySelector(
        '[data-testid="post-where-city"], [data-testid="post-where-row-city"]',
      );
      if (city !== null) {
        expect(city.closest('[data-testid="post-where-item-line"]')).toBeNull();
        expect(following(line, city)).toBe(true);
      }
      expect(tick).toBeTruthy();
      expect(line.lastElementChild).toHaveAttribute("data-testid", "post-where-remove");
    }
  });
});

/**
 * Bundle 2 step 12 (P6) — the item / service location box is optional and
 * says so: its heading carries the Optional key, and nothing inside it is
 * starred, red or required.
 */
describe("StepWhere — the item location box is optional (bundle 2 P6)", () => {
  it("P6 heading says Optional; nothing in the box is required or red", async () => {
    await mount();
    const box = screen.getByTestId("post-where-item-box");
    expect(within(box).getByRole("heading")).toHaveTextContent("post.where.itemBoxTitleOptional");
    expect(within(box).queryAllByTestId("post-required-mark")).toHaveLength(0);
    expect(
      box.querySelectorAll("[aria-required='true'],[required],[aria-invalid='true']"),
    ).toHaveLength(0);
    expect(box.querySelectorAll(".text-destructive,.border-destructive")).toHaveLength(0);
  });
});

describe("StepWhere — one city box per city, no repeats (walk round 2 W1/W2)", () => {
  it("W1 two sub-cities of one city draw ONE city box holding two sub-city boxes", async () => {
    await mount();
    const region = document.querySelector<HTMLElement>(
      '[data-testid="post-where-region-box"][data-region="r1"]',
    )!;
    fireEvent.change(within(region).getByTestId("post-where-subcity"), {
      target: { value: "s1" },
    });
    fireEvent.click(within(region).getByTestId("post-where-add-subcity"));
    const rows = within(region).getAllByTestId("post-where-row");
    expect(rows).toHaveLength(1);
    const subs = within(rows[0]!).getAllByTestId("post-where-subcity-box");
    expect(subs).toHaveLength(2);
    const second = within(subs[1]!).getByTestId("post-where-row-subcity") as HTMLSelectElement;
    // W2 — the second sub-city picker leaves out the first one's choice.
    expect([...second.options].map((option) => option.value)).toEqual(["", "s2"]);
    fireEvent.change(second, { target: { value: "s2" } });
    expect(screen.getByTestId("coverage")).toHaveTextContent("s1,s2");
    // Nothing left: "Add sub-city" is gone; each sub-city box holds its own tick.
    expect(within(region).queryByTestId("post-where-add-subcity")).toBeNull();
    expect(within(subs[1]!).getByTestId("post-where-item-tick")).toBeInTheDocument();
  });

  it("W2 a city picker leaves out a city chosen in the region's other box; Add city hides", async () => {
    await mount({ cities: 5, regions: 3, countries: 2 });
    const region = () =>
      document.querySelector<HTMLElement>(
        '[data-testid="post-where-region-box"][data-region="r1"]',
      )!;
    fireEvent.click(within(region()).getByTestId("post-where-add-city"));
    const picker = within(region()).getAllByTestId("post-where-row-city")[0] as HTMLSelectElement;
    expect([...picker.options].map((option) => option.value)).toEqual(["", "c2", "c4"]);
    fireEvent.change(picker, { target: { value: "c2" } });
    fireEvent.click(within(region()).getByTestId("post-where-add-city"));
    fireEvent.change(within(region()).getAllByTestId("post-where-row-city")[1]!, {
      target: { value: "c4" },
    });
    expect(within(region()).queryByTestId("post-where-add-city")).toBeNull();
  });

  it("W2 a region picker leaves out regions already chosen; Add region hides", async () => {
    await mount({ cities: 5, regions: 3, countries: 2 });
    fireEvent.click(screen.getByTestId("post-where-add-region"));
    const picker = screen.getByTestId("post-where-row-region") as HTMLSelectElement;
    expect([...picker.options].map((option) => option.value)).toEqual(["", "r2", "r3"]);
    fireEvent.change(picker, { target: { value: "r2" } });
    fireEvent.click(screen.getByTestId("post-where-add-region"));
    fireEvent.change(screen.getAllByTestId("post-where-row-region")[1]!, {
      target: { value: "r3" },
    });
    expect(screen.queryByTestId("post-where-add-region")).toBeNull();
  });
});

/** Turn S6-2 — the place step's selects on NativeSelect keep the step's own form look. */
function expectFormLook(select: HTMLElement) {
  expect(select.tagName).toBe("SELECT");
  for (const cls of ["min-h-11", "w-full", "border-input", "bg-background", "text-base"])
    expect(select).toHaveClass(cls);
  for (const cls of ["shadow-xs", "bg-card", "md:pointer-fine:h-9", "disabled:opacity-50"])
    expect(select).not.toHaveClass(cls);
}

describe("StepWhere — the refusal still reaches its selects (turn S6-2)", () => {
  it("SWR-1 a refused coverage rings the item's country box around its market select; an empty region box is red with its mark", async () => {
    render(
      <StepWhere
        coverage={[]}
        refusals={[{ field: "coverage", reason: "required" }]}
        onChange={() => {}}
        caps={{ maxCities: 3, maxRegions: 2, maxCountries: 2 }}
      />,
    );
    await act(async () => {
      await Promise.resolve();
    });
    expect(primaryBox()).toHaveClass("border-destructive", "ring-1", "ring-destructive");
    expectFormLook(within(primaryBox()).getByTestId("post-where-market"));
    expect(screen.getByTestId("post-where-refusal")).toHaveAttribute("role", "alert");

    fireEvent.click(within(primaryBox()).getByTestId("post-where-add-region"));
    const pending = within(primaryBox())
      .getAllByTestId("post-where-region-box")
      .find((box) => box.getAttribute("data-region") === "");
    if (pending === undefined) throw new Error("no pending region box");
    expect(pending).toHaveAttribute("data-red", "1");
    expect(pending).toHaveClass("border-destructive");
    const region = within(pending).getByTestId("post-where-row-region");
    expectFormLook(region);
    const label = pending.querySelector(`label[for="${region.id}"]`);
    expect(label?.querySelector('[data-testid="post-required-mark"]')).not.toBeNull();
  });
});

describe("StepWhere — a null cap is no limit, unknown caps show nothing (INC-1084)", () => {
  it("SWR-2 a NULL city cap keeps Add a city past the first city and says the no-limit line; caps not known keep no add button and the unknown line", async () => {
    await mount({ cities: null, regions: 1, countries: 1 });
    const region = document.querySelector<HTMLElement>(
      '[data-testid="post-where-region-box"][data-region="r1"]',
    );
    if (region === null) throw new Error("no r1 region box");
    fireEvent.click(within(region).getByTestId("post-where-add-city"));
    const added = within(region).getAllByTestId("post-where-row")[1];
    if (added === undefined) throw new Error("no second city row");
    fireEvent.change(within(added).getByTestId("post-where-row-city"), {
      target: { value: "c2" },
    });
    expect(screen.getByTestId("coverage")).toHaveTextContent("c1,c2");
    // r1's third city is still free, and no cap stops it.
    expect(within(region).getByTestId("post-where-add-city")).toBeInTheDocument();
    // One region and one country: those levels stay full.
    expect(screen.queryByTestId("post-where-add-region")).toBeNull();
    expect(screen.queryByTestId("post-where-add-country")).toBeNull();
    const count = screen.getByTestId("post-where-plan-count");
    expect(count).toHaveTextContent("post.where.planLineNoLimit");
    expect(count).toHaveAttribute("data-used", "2");
    expect(count).not.toHaveAttribute("data-max");
    fireEvent.click(screen.getByTestId("post-where-plan-toggle"));
    expect(screen.getByTestId("post-where-plan")).toHaveTextContent(
      "post.where.reachCaptionNoLimit",
    );

    // Caps not known: no add button, the unknown line, no count and no reach caption.
    cleanup();
    render(<StepWhere coverage={[]} refusals={[]} onChange={() => {}} />);
    await act(async () => {
      await Promise.resolve();
    });
    expect(screen.queryByTestId("post-where-add-city")).toBeNull();
    expect(screen.queryByTestId("post-where-add-region")).toBeNull();
    expect(screen.queryByTestId("post-where-add-country")).toBeNull();
    expect(screen.getByTestId("post-where-plan-line")).toHaveTextContent(
      "post.where.planLineUnknown",
    );
    expect(screen.queryByTestId("post-where-plan-count")).toBeNull();
    fireEvent.click(screen.getByTestId("post-where-plan-toggle"));
    expect(screen.queryByTestId("post-where-plan")).toBeNull();
  });
});
