import { act, cleanup, render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * INC-974 — RFT-1…RFT-5. The rail's category names are in the first paint: the
 * server's first-rail seed draws them in the server's HTML for every variant;
 * the glyphs fill fixed boxes without moving a row; a failed glyph download
 * keeps the names; no seed keeps today's skeleton; two requests never share a
 * seed. The tree read and the glyph map are controlled stubs.
 */
const state = vi.hoisted(() => ({
  slug: null as string | null,
  read: "pending" as "pending" | "fail",
  glyphs: { settled: false, failed: false },
}));

vi.mock("@/lib/route-client", () => ({
  callRoute: () =>
    state.read === "pending"
      ? new Promise(() => undefined)
      : Promise.resolve({ kind: "answered", ok: false, status: 500, payload: null }),
}));
vi.mock("@/components/shell/use-category-glyphs", () => ({
  useCategoryGlyphs: () => ({
    settled: state.glyphs.settled,
    glyphOf: (name: string | null | undefined) =>
      state.glyphs.settled && !state.glyphs.failed && name
        ? ({ className }: { className?: string }) => (
            <svg data-testid="rail-glyph" className={className} />
          )
        : null,
  }),
}));
vi.mock("@/components/shell-context", () => ({
  useShell: () => ({ selectedCategorySlug: state.slug }),
}));
vi.mock("@tanstack/react-router", () => ({
  Link: ({ children, ...rest }: { children: ReactNode } & Record<string, unknown>) => (
    <a data-testid={rest["data-testid"] as string}>{children}</a>
  ),
  useRouterState: () => ({}),
}));
vi.mock("@/i18n", async (original) => ({
  ...(await original<Record<string, unknown>>()),
  useI18n: () => ({ t: (key: string) => key, entities: { map: {}, lang: "en" }, lang: "en" }),
}));

const { CategoryNav, RailVariantContext } = await import("./app-rail");
const { CategoryTreeSeedContext, forgetCategoryTree } =
  await import("@/features/categories/category-tree");
const { firstRailPayload } = await import("@/server/first-screen");
type Seed = import("@/features/categories/category-tree").CategoryTreeSeed;

function row(id: string, slug: string, order: number) {
  return {
    id,
    name_en: `Name ${slug}`,
    name_am: null,
    slug,
    icon: "Car",
    allow_listings: true,
    is_catchall: false,
    image_url: "https://example.test/i.png",
    image_thumb_url: "https://example.test/t.png",
    display_order: order,
  };
}
const FULL = {
  version: "v1",
  nodes: [
    row("a", "vehicles", 0),
    row("b", "homes", 1),
    row("c", "cars", 0),
    row("d", "sedans", 0),
    row("e", "flats", 0),
  ],
  pointers: [
    { child_id: "a", parent_id: null, display_order: 0, is_primary: true },
    { child_id: "b", parent_id: null, display_order: 1, is_primary: true },
    { child_id: "c", parent_id: "a", display_order: 0, is_primary: true },
    { child_id: "d", parent_id: "c", display_order: 0, is_primary: true },
    { child_id: "e", parent_id: "b", display_order: 0, is_primary: true },
  ],
};
function seedFor(slug: string | null): Seed {
  const payload = firstRailPayload(FULL, slug);
  if (payload === null) throw new Error("fixture does not parse");
  return { seed: "first-rail", payload };
}
function Rail({ seed, variant }: { seed: Seed | null; variant: "rail" | "strip" | "menu" }) {
  return (
    <CategoryTreeSeedContext.Provider value={seed}>
      <RailVariantContext.Provider value={variant}>
        <CategoryNav onNavigate={() => undefined} />
      </RailVariantContext.Provider>
    </CategoryTreeSeedContext.Provider>
  );
}

beforeEach(() => {
  forgetCategoryTree();
  state.slug = null;
  state.read = "pending";
  state.glyphs = { settled: false, failed: false };
});
afterEach(() => cleanup());

describe("the rail's first paint (INC-974)", () => {
  it("RFT-1 the server's HTML carries every root's name in rail, strip and menu, no skeleton", () => {
    for (const variant of ["rail", "strip", "menu"] as const) {
      const html = renderToString(<Rail seed={seedFor(null)} variant={variant} />);
      expect(html).toContain("Name vehicles");
      expect(html).toContain("Name homes");
      expect(html).not.toContain("category-skeleton");
      expect(html).toContain('data-rail-ready="1"');
    }
  });

  it("RFT-2 glyphs pending → names drawn in boxes the glyph's size; settled → same size, same rows", () => {
    const view = render(<Rail seed={seedFor(null)} variant="rail" />);
    const boxes = screen.getAllByTestId("rail-glyph-box");
    expect(boxes).toHaveLength(2);
    const before = boxes.map((box) => box.getAttribute("class"));
    const rowsBefore = screen.getAllByText(/^Name /).map((el) => el.textContent);
    state.glyphs = { settled: true, failed: false };
    view.rerender(<Rail seed={seedFor(null)} variant="rail" />);
    const glyphs = screen.getAllByTestId("rail-glyph");
    expect(screen.queryAllByTestId("rail-glyph-box")).toHaveLength(0);
    expect(glyphs.map((glyph) => glyph.getAttribute("class"))).toEqual(before);
    expect(before.every((cls) => cls?.includes("h-5") && cls.includes("w-5"))).toBe(true);
    expect(screen.getAllByText(/^Name /).map((el) => el.textContent)).toEqual(rowsBefore);
  });

  it("RFT-3 a failed glyph download keeps every name and draws no glyph", () => {
    state.glyphs = { settled: true, failed: true };
    render(<Rail seed={seedFor(null)} variant="menu" />);
    expect(screen.getByText("Name vehicles")).toBeTruthy();
    expect(screen.getByText("Name homes")).toBeTruthy();
    expect(screen.queryAllByTestId("rail-glyph")).toHaveLength(0);
  });

  it("RFT-4 no seed → today's skeleton, then the error when the read fails", async () => {
    expect(renderToString(<Rail seed={null} variant="rail" />)).toContain("rail-category-skeleton");
    state.read = "fail";
    render(<Rail seed={null} variant="rail" />);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    expect(screen.getByRole("alert").textContent).toBe("common.error");
    expect(screen.queryByText("Name vehicles")).toBeNull();
  });

  it("RFT-5 two requests never share a seed; the first-rail shape is roots + the selected path only", () => {
    const one = renderToString(<Rail seed={seedFor(null)} variant="rail" />);
    state.slug = "cars";
    const two = renderToString(<Rail seed={seedFor("cars")} variant="rail" />);
    const three = renderToString(<Rail seed={null} variant="rail" />);
    expect(one).not.toContain("Name sedans");
    expect(two).toContain("Name sedans");
    expect(three).not.toContain("Name ");
    const shaped = seedFor("cars").payload;
    expect(shaped.nodes.map((node) => node.slug).sort()).toEqual(
      ["cars", "homes", "sedans", "vehicles"].sort(),
    );
    expect(shaped.nodes.every((node) => node.image_url === null)).toBe(true);
  });
});
