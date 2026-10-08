import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { FilterChips, FiltersButton } from "./filter-chips";

vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, language: "en", setLanguage: () => {} }),
}));

/** BUNDLE 9 B5 — chips, their removal, clear-all, and the count mark. */
describe("FilterChips and FiltersButton", () => {
  it("renders nothing with no chip", () => {
    const { container } = render(<FilterChips testid="f" chips={[]} onClearAll={() => {}} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("a chip's remove calls its onRemove; clear calls onClearAll", () => {
    const onRemove = vi.fn();
    const onClearAll = vi.fn();
    render(
      <FilterChips
        testid="f"
        chips={[{ key: "a", label: "Red", onRemove }]}
        onClearAll={onClearAll}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "prim.table.removeFilter — Red" }));
    expect(onRemove).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByTestId("f-clear"));
    expect(onClearAll).toHaveBeenCalledTimes(1);
  });

  it("shows the count mark only above zero", () => {
    const { rerender } = render(
      <FiltersButton testid="b" count={0}>
        {null}
      </FiltersButton>,
    );
    expect(screen.queryByTestId("b-count")).toBeNull();
    rerender(
      <FiltersButton testid="b" count={2}>
        {null}
      </FiltersButton>,
    );
    expect(screen.getByTestId("b-count")).toHaveTextContent("2");
  });
});
