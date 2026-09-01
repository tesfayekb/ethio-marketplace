import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { LanguageSwitcher } from "./language-switcher";

/**
 * DEC-026 — INC-098 / INC-107 CLASS. Two expensive lessons in one component:
 *  * the option list is the PUBLICATION GATE's own list, never a static copy
 *    (INC-098), so a DB-only language with no compiled catalog must still
 *    appear, labelled with its native name (INC-107);
 *  * the order is (sort, code) — the same law the admin roster applies
 *    (INC-099b), so what the operator arranges is what visitors see.
 *
 * Seam: `@/i18n` alone. The real provider fetches the gate over the network;
 * the list is injected here instead, which is exactly the unit under test.
 */
const publicLanguages = [
  { code: "ti", name_en: "Tigrinya", name_native: "ትግርኛ", rtl: false, sort: 5 },
  // DB-only: no compiled catalog exists for `sw`, so the native name labels it.
  { code: "sw", name_en: "Swahili", name_native: "Kiswahili", rtl: false, sort: 5 },
  { code: "am", name_en: "Amharic", name_native: "አማርኛ", rtl: false, sort: 1 },
  { code: "en", name_en: "English", name_native: "English", rtl: false, sort: 0 },
];

vi.mock("@/i18n", () => ({
  useI18n: () => ({
    t: (key: string) => key,
    language: "en",
    setLanguage: () => {},
    publicLanguages,
  }),
}));

function openMenu() {
  const trigger = screen.getByTestId("language-switcher");
  // Radix opens on `pointerdown`; a follow-up click would toggle it shut.
  fireEvent.pointerDown(trigger, { button: 0, ctrlKey: false, pointerType: "mouse" });
}

describe("LanguageSwitcher", () => {
  it("lists every gated language, including a DB-only one", async () => {
    render(<LanguageSwitcher />);
    openMenu();

    for (const code of ["en", "am", "ti", "sw"]) {
      expect(await screen.findByTestId(`language-option-${code}`)).toBeInTheDocument();
    }
    // A DB-only language has no compiled label, so the native name is shown.
    expect(screen.getByTestId("language-option-sw")).toHaveTextContent("Kiswahili");
  });

  it("orders the options by (sort, code)", async () => {
    render(<LanguageSwitcher />);
    openMenu();

    await screen.findByTestId("language-option-en");
    const codes = screen
      .getAllByTestId(/^language-option-/)
      .map((node) => node.getAttribute("data-testid"));
    expect(codes).toEqual([
      "language-option-en",
      "language-option-am",
      // sort ties break on the code: sw before ti.
      "language-option-sw",
      "language-option-ti",
    ]);
  });
});
