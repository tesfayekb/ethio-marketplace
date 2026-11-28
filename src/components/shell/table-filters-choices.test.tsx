import { renderPanel as render } from "@/components/ui/dialog-parts-test-render";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { readFailed } from "@/lib/reader-failure";

import { FilterChips } from "./filter-chips";
import type { TableChoices, TableFilter } from "./table-filters";

vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, language: "en", setLanguage: () => {} }),
}));

const select = (id: string, choices: TableChoices): TableFilter => ({
  kind: "select",
  choices,
  id,
  chipKey: id,
  name: id,
  kept: true,
  options: [],
  value: [],
  onChange: () => {},
  clear: () => {},
  changed: () => {},
});
const failedRead = (failure: unknown, retry: () => void = vi.fn()): TableChoices => ({
  testid: "levels-error",
  ready: true,
  failure,
  retry,
});

describe("INC-1346 a select whose choices fail says so once", () => {
  it("UFF-1 a failed choices read draws its notice with the network words, even with no chip", () => {
    render(
      <FilterChips
        testid="f"
        filters={[select("tier", failedRead(new TypeError("Failed to fetch")))]}
      />,
    );
    expect(screen.getByTestId("levels-error")).toHaveTextContent("failure.network");
    expect(screen.queryByTestId("f")).toBeNull();
  });
  it("UFF-2 the notice's Retry reads the choices again", () => {
    const retry = vi.fn();
    render(
      <FilterChips
        testid="f"
        filters={[select("tier", failedRead(new TypeError("Failed to fetch"), retry))]}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "common.retry" }));
    expect(retry).toHaveBeenCalledTimes(1);
  });
  it("UFF-3 a refused choices read is said as refused and offers no Retry", async () => {
    render(
      <FilterChips
        testid="f"
        filters={[
          select("tier", failedRead(readFailed({ code: "P0D01", message: "badValue:x" }, 400))),
        ]}
      />,
    );
    await waitFor(() =>
      expect(screen.getByTestId("levels-error")).toHaveAttribute("data-failure-reason", "refused"),
    );
    expect(screen.queryByRole("button", { name: "common.retry" })).toBeNull();
  });
  it("UFF-4 two filters fed by one failed read draw one notice; a fixed list draws none", () => {
    const shared = failedRead(new TypeError("Failed to fetch"));
    render(
      <FilterChips
        testid="f"
        filters={[select("a", shared), select("b", shared), select("c", { fixed: true })]}
      />,
    );
    expect(screen.getAllByTestId("levels-error")).toHaveLength(1);
  });
});
