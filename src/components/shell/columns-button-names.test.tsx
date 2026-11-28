import { renderPanel as render } from "@/components/ui/dialog-parts-test-render";
import { fireEvent, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";

import { ColumnsButton } from "./columns-button";

vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, language: "en", setLanguage: () => {} }),
}));

afterEach(() => {
  window.localStorage.clear();
});

/** INC-1348 — a column keyed `title` shares no id with the panel's heading, so its switch keeps its name. */
it("UFC-1 every column switch has its column's name, a column keyed title included", () => {
  render(
    <ColumnsButton
      testid="c"
      columns={[
        { key: "title", label: "Ad title" },
        { key: "price", label: "Price" },
      ]}
      hidden={[]}
      onToggle={() => {}}
    />,
  );
  fireEvent.click(screen.getByTestId("c"));
  expect(screen.getByRole("switch", { name: "Ad title" })).toHaveAttribute(
    "data-testid",
    "c-title",
  );
  expect(screen.getByRole("switch", { name: "Price" })).toHaveAttribute("data-testid", "c-price");
});
