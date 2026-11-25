import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";

import { buildTree } from "@/features/categories/category-tree";

import { StepCategory } from "./step-category";

/** DEC-464 — the category step's Retry calls the tree read's own retry, never a page reload. */
vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, entities: {}, language: "en" }),
}));
vi.mock("@/i18n/entity", () => ({ entityName: () => "" }));
vi.mock("./catalog-scope", () => ({ useCatalogScope: () => ({}) }));
vi.mock("./posting-service", () => ({ readRecentCategories: async () => [] }));
vi.mock("./catalog-finder", () => ({
  finderPending: () => false,
  useCatalogFinder: () => ({ state: "idle", hits: [] }),
  useMatchLine: () => null,
}));

it("SCR-U1 Retry on a failed tree calls the tree's retry", () => {
  const onTreeRetry = vi.fn();
  render(
    <StepCategory
      tree={buildTree([], [])}
      isLoading={false}
      treeError
      treeFailure={new TypeError("Failed to fetch")}
      onTreeRetry={onTreeRetry}
      onChoose={() => {}}
      cursor={null}
      onCursor={() => {}}
      term=""
      onTerm={() => {}}
      showRecent={false}
    />,
  );
  expect(screen.getByTestId("post-category-error")).toHaveAttribute(
    "data-failure-reason",
    "network",
  );
  fireEvent.click(screen.getByTestId("post-category-error-retry"));
  expect(onTreeRetry).toHaveBeenCalledTimes(1);
});
