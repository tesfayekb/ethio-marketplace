import { act, fireEvent, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { GuardFn } from "@/features/auth/mfa/use-step-up";

const mutateAsync = vi.fn();

vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, has: () => false, language: "en" }),
}));
vi.mock("@/components/ui/category-modal", () => ({
  CategoryModal: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));
vi.mock("./use-countries", () => ({
  useUpsertCountry: () => ({ mutateAsync, isPending: false }),
}));

import { CountryEditorDialog } from "./country-editor";
import type { CountryRow } from "./countries-service";

const ROW = {
  code: "KE",
  nameEn: "Kenya",
  unitSystem: "metric",
  currencyCode: "KES",
  displayOrder: 3,
  isActive: true,
} as unknown as CountryRow;

const guard = vi.fn(((action) => Promise.resolve(action())) as GuardFn);

function draw() {
  render(
    <CountryEditorDialog
      row={ROW}
      guard={guard as unknown as GuardFn}
      verbBar={null}
      openedBy="test"
      onClose={() => {}}
    />,
  );
}
const type = (part: string, value: string) =>
  fireEvent.change(screen.getByTestId(`country-editor-${part}`), { target: { value } });
const save = async () => {
  await act(async () => {
    fireEvent.click(screen.getByTestId("country-editor-save"));
  });
};
const refusalOf = (part: string) =>
  screen
    .queryAllByTestId("form-field-refusal")
    .find((line) => line.getAttribute("data-field") === `country-editor-${part}`) ?? null;

describe("the markets editor on the one Field, gate and parser (L2, DEC-339)", () => {
  beforeEach(() => {
    mutateAsync.mockReset();
    mutateAsync.mockResolvedValue(undefined);
    guard.mockClear();
  });

  it("KFM-2 a blank name keeps the gate closed, its Field says so, nothing is sent; given, the gate opens", async () => {
    draw();
    type("name", "   ");
    await save();
    expect(refusalOf("name")?.textContent).toBe("post.refusal.required");
    expect(screen.getByTestId("country-editor-name").getAttribute("aria-invalid")).toBe("true");
    expect(guard).not.toHaveBeenCalled();
    expect(mutateAsync).not.toHaveBeenCalled();
    type("name", "Kenya");
    expect(refusalOf("name")).toBeNull();
    await save();
    expect(mutateAsync).toHaveBeenCalledTimes(1);
  });

  it("KFM-3 a blank or unreadable order is the parser's refusal under its Field; nothing is sent", async () => {
    draw();
    for (const raw of ["", "1.5", "abc"]) {
      type("order", raw);
      await save();
      expect([raw, refusalOf("order")?.textContent]).toEqual([raw, "post.refusal.badType"]);
    }
    expect(guard).not.toHaveBeenCalled();
    expect(mutateAsync).not.toHaveBeenCalled();
  });

  it("KFM-4 a valid form sends the trimmed name, the trimmed currency or null, and the parsed order", async () => {
    draw();
    type("name", "  Kenya Republic ");
    type("currency", " kes ");
    type("order", " 12 ");
    await save();
    expect(mutateAsync).toHaveBeenLastCalledWith({
      code: "KE",
      nameEn: "Kenya Republic",
      unitSystem: "metric",
      currencyCode: "KES",
      displayOrder: 12,
    });
    type("currency", "  ");
    await save();
    expect(mutateAsync).toHaveBeenLastCalledWith(
      expect.objectContaining({ currencyCode: null, displayOrder: 12 }),
    );
    expect(refusalOf("order")).toBeNull();
  });
});
