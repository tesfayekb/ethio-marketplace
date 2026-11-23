import { renderPanel as render } from "@/components/ui/dialog-parts-test-render";
import { act, fireEvent, screen, waitFor } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import type { TableFilter } from "./table-filters";

const pending = vi.hoisted(() => ({ requested: 0, finish: undefined as (() => void) | undefined }));
vi.mock("@/i18n", () => ({ useI18n: () => ({ t: (key: string) => key, language: "en" }) }));
vi.mock("./filter-panel-body", async () => {
  pending.requested += 1;
  return await new Promise<{ FilterPanelBody: () => React.ReactNode }>((resolve) => {
    pending.finish = () =>
      resolve({ FilterPanelBody: () => <div data-testid="loaded-filter-rows" /> });
  });
});
vi.mock("./filter-panel-loader", async (original) => {
  const real = await original<typeof import("./filter-panel-loader")>();
  return { ...real, preloadFilterPanel: vi.fn(real.preloadFilterPanel) };
});
import { preloadFilterPanel } from "./filter-panel-loader";
import { FiltersButton } from "./filter-chips";

it("FP-U25 pointer and focus warm the rows; each declaration holds a placeholder until arrival", async () => {
  const filters: TableFilter[] = ["first", "second"].map((id) => ({
    kind: "select",
    id,
    chipKey: id,
    name: id,
    kept: true,
    value: [],
    options: [],
    onChange: vi.fn(),
    clear: vi.fn(),
    changed: vi.fn(),
  }));
  render(<FiltersButton testid="warming" filters={filters} />);
  expect(pending.requested).toBe(0);
  fireEvent.pointerEnter(screen.getByTestId("warming"));
  fireEvent.focus(screen.getByTestId("warming"));
  expect(preloadFilterPanel).toHaveBeenCalledTimes(2);
  await waitFor(() => expect(pending.requested).toBe(1));
  fireEvent.click(screen.getByTestId("warming"));
  await waitFor(() =>
    expect(document.querySelectorAll("[data-filter-placeholder]")).toHaveLength(2),
  );
  expect(
    Array.from(document.querySelectorAll("[data-filter-placeholder]")).map((row) =>
      row.getAttribute("data-filter-placeholder"),
    ),
  ).toEqual(["first", "second"]);
  await act(async () => pending.finish?.());
  expect(await screen.findByTestId("loaded-filter-rows")).toBeInTheDocument();
  expect(document.querySelectorAll("[data-filter-placeholder]")).toHaveLength(0);
});
