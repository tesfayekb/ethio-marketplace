import { en } from "@/i18n/locales/en";
import { am } from "@/i18n/locales/am";
import { ownValue } from "@/lib/own-key";
import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";

import { buildTree } from "@/features/categories/category-tree";

import { StepCategory } from "./step-category";

/** DEC-464 — the category step's Retry calls the tree read's own retry, never a page reload. */
const words = vi.hoisted(() => ({ real: false, amharic: false }));
vi.mock("@/i18n", () => ({
  useI18n: () => ({
    t: (key: string) => (words.real ? (ownValue(words.amharic ? am : en, key) ?? key) : key),
    language: words.amharic ? "am" : "en",
    entities: {},
  }),
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

it("UFW-6 a failed category tree says so and Retry reads again uf:S7s1.9", async () => {
  words.real = true;
  const retry = vi.fn();
  render(
    <StepCategory
      tree={buildTree([], [])}
      isLoading={false}
      treeError
      treeFailure={new TypeError("Failed to fetch")}
      onTreeRetry={retry}
      onChoose={vi.fn()}
      cursor={null}
      onCursor={vi.fn()}
      term=""
      onTerm={vi.fn()}
      showRecent={false}
    />,
  );
  const notice = screen.getByTestId("post-category-error");
  expect(notice).toHaveTextContent(en["post.category.treeError"]);
  fireEvent.click(await screen.findByRole("button", { name: en["common.retry"] }));
  expect(retry).toHaveBeenCalledTimes(1);
  words.real = false;
});
it("UFW-8 the category screen uses the Amharic catalogue uf:S7s1.12", () => {
  words.real = true;
  words.amharic = true;
  render(
    <StepCategory
      tree={buildTree(
        [
          {
            id: "c-1",
            nameEn: "Camera",
            nameAm: null,
            slug: "camera",
            icon: null,
            allowListings: true,
            isCatchall: false,
            imageUrl: null,
            imageThumbUrl: null,
            displayOrder: 0,
          },
        ],
        [],
      )}
      isLoading={false}
      treeError={false}
      onChoose={vi.fn()}
      cursor={null}
      onCursor={vi.fn()}
      term=""
      onTerm={vi.fn()}
      showRecent={false}
    />,
  );
  expect(screen.getByPlaceholderText(am["post.category.searchPlaceholder"])).toBeVisible();
  expect(screen.getByText(am["post.category.why"])).toBeVisible();
  if (am["post.category.why"] !== en["post.category.why"])
    expect(screen.queryByText(en["post.category.why"])).not.toBeInTheDocument();
  words.real = false;
  words.amharic = false;
});
