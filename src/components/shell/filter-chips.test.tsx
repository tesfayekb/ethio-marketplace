import { renderPanel as render } from "@/components/ui/dialog-parts-test-render";
import { fireEvent, screen } from "@testing-library/react";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";

import { FilterChips, FiltersButton } from "./filter-chips";
import type { TableFilter } from "./table-filters";

vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, language: "en", setLanguage: () => {} }),
}));
const select = (values: string[], onChange: (next: string[]) => void = vi.fn()): TableFilter => ({
  kind: "select",
  id: "colour",
  chipKey: "colour",
  name: "Colour",
  kept: true,
  options: [
    { value: "a", label: "Red" },
    { value: "b", label: "Blue" },
  ],
  value: values,
  onChange,
  clear: () => onChange([]),
  changed: () => {},
});

describe("FilterChips and FiltersButton", () => {
  it("renders nothing with no chip", () => {
    const { container } = render(<FilterChips testid="f" filters={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
  it("a chip's remove calls its onRemove; clear calls onClearAll", () => {
    const change = vi.fn();
    render(<FilterChips testid="f" filters={[select(["a"], change)]} />);
    fireEvent.click(screen.getByRole("button", { name: "prim.table.removeFilter — Red" }));
    expect(change).toHaveBeenCalledWith([]);
    change.mockClear();
    fireEvent.click(screen.getByTestId("f-clear"));
    expect(change).toHaveBeenCalledWith([]);
  });
  it("shows the count mark only above zero", () => {
    const { rerender } = render(<FiltersButton testid="b" filters={[select([])]} />);
    expect(screen.queryByTestId("b-count")).toBeNull();
    rerender(<FiltersButton testid="b" filters={[select(["a", "b"])]} />);
    expect(screen.getByTestId("b-count")).toHaveTextContent("2");
  });
  it("HS-20 the panel's footer clears every filter and closes with the result count (D132); its primary waits for a change (V2c)", () => {
    const onClearAll = vi.fn();
    function Harness() {
      const [value, setValue] = useState(["a"]);
      return (
        <FiltersButton
          testid="p"
          filters={[
            select(value, (next) => {
              onClearAll();
              setValue(next);
            }),
          ]}
          resultCount={41}
        />
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
