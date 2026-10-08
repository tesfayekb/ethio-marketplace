import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { RowActions } from "./row-actions";

vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, language: "en", setLanguage: () => {} }),
}));

/** BUNDLE 9 B2 — names, order, the danger entries last, one call per choice. */
describe("RowActions", () => {
  it("renders nothing with no action", () => {
    const { container } = render(<RowActions testid="r" name="Alpha" more={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("names each control '<label> — <name>' in the order edit, delete, more", () => {
    render(
      <RowActions
        testid="r"
        name="Alpha"
        edit={{ label: "Edit", onSelect: () => {} }}
        remove={{ label: "Delete", onSelect: () => {} }}
        more={[{ key: "a", label: "Copy", onSelect: () => {} }]}
      />,
    );
    const names = screen.getAllByRole("button").map((b) => b.getAttribute("aria-label"));
    expect(names).toEqual(["Edit — Alpha", "Delete — Alpha", "prim.table.actions — Alpha"]);
  });

  it("puts danger entries last behind a separator and fires onSelect once", () => {
    const edit = vi.fn();
    const danger = vi.fn();
    render(
      <RowActions
        testid="r"
        name="Alpha"
        edit={{ label: "Edit", onSelect: edit }}
        more={[
          { key: "d", label: "Erase", tone: "danger", onSelect: danger },
          { key: "a", label: "Copy", onSelect: () => {} },
        ]}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Edit — Alpha" }));
    expect(edit).toHaveBeenCalledTimes(1);

    const trigger = screen.getByTestId("r-more");
    fireEvent.pointerDown(trigger, { button: 0, ctrlKey: false, pointerType: "mouse" });
    const menu = screen.getByTestId("r-menu");
    const children = Array.from(menu.children);
    expect(children.map((c) => c.getAttribute("data-testid") ?? c.getAttribute("role"))).toEqual(
      ["r-more-a", "separator", "r-more-d"],
    );
    fireEvent.click(within(menu).getByTestId("r-more-d"));
    expect(danger).toHaveBeenCalledTimes(1);
  });
});
