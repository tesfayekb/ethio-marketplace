import { act, render, renderHook, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { DIALOG_FIELD } from "@/components/ui/dialog-look";

import { CountryFormFields, useCountryError } from "./country-dialogs";

vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, language: "en", setLanguage: () => {} }),
}));

describe("useCountryError", () => {
  it("reads a database refusal object by its own message", () => {
    const { result } = renderHook(() => useCountryError());
    act(() =>
      result.current.fail({ message: "notARoot", code: "P0001", details: null, hint: null }),
    );
    expect(result.current.refusal).toMatchObject({
      key: "admin.countries.error.notARoot",
      raw: null,
    });
    act(() =>
      result.current.fail({ message: "something new", code: "P0001", details: null, hint: null }),
    );
    expect(result.current.refusal).toMatchObject({
      key: "admin.countries.error.unknown",
      raw: "something new",
    });
    act(() => result.current.fail(undefined));
    expect(result.current.refusal?.raw).toBeNull();
  });
});

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
