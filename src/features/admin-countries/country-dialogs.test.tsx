import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { DIALOG_FIELD } from "@/components/ui/dialog-look";

import { CountryFormFields } from "./country-dialogs";

vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, language: "en", setLanguage: () => {} }),
}));

describe("CountryFormFields (turn S6-2)", () => {
  it("CNF-1 the unit system is the one native select: the control look, pressed in inside a panel", () => {
    render(
      <CountryFormFields
        idPrefix="country-create"
        values={{ nameEn: "", unitSystem: "metric", currencyCode: "", displayOrder: "" }}
        onChange={() => {}}
      />,
    );
    const unit = screen.getByTestId("country-create-unit");
    expect(unit.tagName).toBe("SELECT");
    for (const cls of ["md:pointer-fine:h-9", "w-full", ...DIALOG_FIELD.split(/\s+/)])
      expect(unit).toHaveClass(cls);
    expect(unit).not.toHaveClass("bg-background");
  });

  it("KFM-1 each answer sits in the one Field with its id and label; the marks follow their meaning", () => {
    render(
      <CountryFormFields
        idPrefix="country-editor"
        values={{ nameEn: "Kenya", unitSystem: "metric", currencyCode: "", displayOrder: "3" }}
        onChange={() => {}}
      />,
    );
    const boxes = screen.getAllByTestId("form-field");
    expect(boxes.map((box) => box.getAttribute("data-field"))).toEqual([
      "country-editor-name",
      "country-editor-unit",
      "country-editor-currency",
      "country-editor-order",
    ]);
    const labels = ["name", "unit", "currency", "order"];
    for (const [index, part] of labels.entries()) {
      const control = screen.getByTestId(`country-editor-${part}`);
      expect(control.id).toBe(`country-editor-${part}`);
      expect(boxes[index]?.contains(control)).toBe(true);
      expect(screen.getByLabelText(new RegExp(`^admin.countries.field.${part}`))).toBe(control);
    }
    const marks = boxes.map((box) => box.querySelector("[data-testid='required-mark']") !== null);
    expect(marks).toEqual([true, false, false, true]);
    expect(screen.getAllByText("post.optional")).toHaveLength(1);
    expect(boxes[2]?.textContent).toContain("post.optional");
    expect(screen.getByTestId("country-editor-currency").getAttribute("aria-describedby")).toBe(
      "country-editor-currency-hint",
    );
    expect(screen.getByText("admin.countries.field.currencyHint")).toBeTruthy();
  });
});
