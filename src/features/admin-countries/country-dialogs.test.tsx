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
});
