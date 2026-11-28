import { fireEvent, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { en } from "@/i18n/locales/en";
import { readFailed } from "@/lib/reader-failure";
import { KINDS, failureKind, loadFailureReader } from "./failure-reason";

/**
 * UF-1 Part 1 (DEC-493) — the rail's category list (S6b.4, S6b.5): skeleton rows while the tree
 * is read, "No categories yet" for an empty tree, and a failed read that says so, never also
 * "empty", with a Retry that asks again. Seams: the category tree hook, the glyphs, the shell
 * and the router; the words are the real catalogue.
 */
const tree = vi.hoisted(() => ({ value: {} as Record<string, unknown> }));
vi.mock("@/features/categories/category-tree", async (original) => ({
  ...(await original<typeof import("@/features/categories/category-tree")>()),
  useCategoryTree: () => tree.value,
}));
vi.mock("@/components/shell/use-category-glyphs", () => ({
  useCategoryGlyphs: () => ({ settled: true, glyphOf: () => null }),
}));
vi.mock("@/components/shell-context", () => ({
  useShell: () => ({ selectedCategorySlug: null }),
}));
vi.mock("@tanstack/react-router", () => ({
  Link: ({ children, ...rest }: { children: ReactNode } & Record<string, unknown>) => (
    <a data-testid={rest["data-testid"] as string}>{children}</a>
  ),
  useRouterState: ({ select }: { select?: (state: unknown) => unknown } = {}) =>
    select ? select({ matches: [], location: { pathname: "/", hash: "" } }) : {},
}));
vi.mock("@/i18n", async (original) => {
  const { en: EN } = await import("@/i18n/locales/en");
  const { ownValue: own } = await import("@/lib/own-key");
  return {
    ...(await original<Record<string, unknown>>()),
    useI18n: () => ({
      t: (key: string) => own(EN, key) ?? key,
      entities: { map: {}, lang: "en" },
      language: "en",
    }),
  };
});

const { CategoryNav } = await import("./app-rail");
const { RailVariantContext } = await import("./rail-variant");
const { buildTree } = await import("@/features/categories/category-tree");

const EMPTY = buildTree([], []);
function draw() {
  return render(
    <RailVariantContext.Provider value="rail">
      <CategoryNav onNavigate={() => {}} />
    </RailVariantContext.Provider>,
  );
}

beforeEach(() => {
  tree.value = {
    tree: EMPTY,
    isLoading: false,
    error: false,
    failure: null,
    retry: vi.fn(),
    firstRail: false,
  };
});

describe("UF-1 the rail's categories", () => {
  it("UFP-30 while the tree is read the rail draws skeleton rows; an empty tree says No categories yet uf:S6b.4", () => {
    tree.value = { ...tree.value, isLoading: true };
    const { unmount } = draw();
    expect(screen.getAllByTestId("rail-category-skeleton")).toHaveLength(6);
    expect(screen.queryByText(en["shell.categoriesEmpty"])).toBeNull();
    unmount();
    tree.value = { ...tree.value, isLoading: false };
    draw();
    expect(screen.queryByTestId("rail-category-skeleton")).toBeNull();
    expect(screen.getByText(en["shell.categoriesEmpty"])).toBeInTheDocument();
  });

  it("UFP-31 a failed tree read says so, never also empty, and Retry asks for the tree again uf:S6b.5", async () => {
    const failure = readFailed("route 503", 503);
    const retry = vi.fn();
    tree.value = { ...tree.value, error: true, failure, retry };
    draw();
    await loadFailureReader();
    expect(await screen.findByTestId("rail-categories-failed")).toHaveTextContent(
      en[KINDS[failureKind(failure).kind].words],
    );
    expect(screen.queryByText(en["shell.categoriesEmpty"])).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: en["common.retry"] }));
    expect(retry).toHaveBeenCalledTimes(1);
  });
});
