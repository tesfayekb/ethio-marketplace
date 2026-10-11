import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
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
      <FiltersButton testid="b" count={0} state="">
        {null}
      </FiltersButton>,
    );
    expect(screen.queryByTestId("b-count")).toBeNull();
    rerender(
      <FiltersButton testid="b" count={2} state="">
        {null}
      </FiltersButton>,
    );
    expect(screen.getByTestId("b-count")).toHaveTextContent("2");
  });

  it("HS-20 the panel's footer clears every filter and closes with the result count (D132); its primary waits for a change (V2c)", () => {
    const onClearAll = vi.fn();
    function Harness() {
      const [level, setLevel] = useState("city");
      return (
        <FiltersButton
          testid="p"
          count={level === "" ? 0 : 1}
          state={level}
          onClearAll={() => {
            onClearAll();
            setLevel("");
          }}
          resultCount={41}
        >
          <p data-testid="p-body">body</p>
        </FiltersButton>
      );
    }
    render(<Harness />);
    fireEvent.click(screen.getByTestId("p"));
    expect(screen.getByTestId("p-done")).toHaveTextContent("prim.table.showResults");
    expect(screen.getByTestId("p-done")).toBeDisabled();
    fireEvent.click(screen.getByTestId("p-clear"));
    expect(onClearAll).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId("p-done")).toBeEnabled();
    fireEvent.click(screen.getByTestId("p-done"));
    expect(screen.queryByTestId("p-panel")).toBeNull();
  });
});
