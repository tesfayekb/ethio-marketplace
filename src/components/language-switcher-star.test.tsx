import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { LanguageSwitcher } from "./language-switcher";

/**
 * D237 (Foundations turn 1) — THE MENU IS THE ONE CHOICE.
 *
 * Three properties, each one a thing that would be expensive to learn from
 * production:
 *  * the current language is the CHECKED item (aria-checked on exactly one),
 *    so the operator can see the device default without a separate control;
 *  * a pick calls the replacing star setter with the code and nothing else —
 *    one choice per device, no second path that could drift (INC-851);
 *  * a DB-only language (no compiled catalog) can be picked, because the
 *    option list is the publication gate's list, not the compiled registry
 *    (INC-107).
 */
const publicLanguages = [
  { code: "en", name_en: "English", name_native: "English", rtl: false, sort: 0 },
  { code: "am", name_en: "Amharic", name_native: "አማርኛ", rtl: false, sort: 1 },
  // DB-only: no compiled catalog exists for `sw`.
  { code: "sw", name_en: "Swahili", name_native: "Kiswahili", rtl: false, sort: 5 },
];

const setStar = vi.fn();

vi.mock("@/i18n", () => ({
  useI18n: () => ({
    t: (key: string) => key,
    language: "en",
    publicLanguages,
    star: "en",
    setStar,
  }),
}));

function openMenu() {
  const trigger = screen.getByTestId("language-switcher");
  // Radix opens on `pointerdown`; a follow-up click would toggle it shut.
  fireEvent.pointerDown(trigger, { button: 0, ctrlKey: false, pointerType: "mouse" });
}

describe("LanguageSwitcher — one choice per device (D237)", () => {
  it("the current language is the checked item (aria-checked on exactly one)", async () => {
    render(<LanguageSwitcher />);
    openMenu();

    expect(await screen.findByTestId("language-option-en")).toHaveAttribute(
      "aria-checked",
      "true",
    );
    expect(screen.getByTestId("language-option-am")).toHaveAttribute("aria-checked", "false");
    expect(screen.getByTestId("language-option-sw")).toHaveAttribute("aria-checked", "false");
  });

  it("a pick calls the replacing star setter with the code and nothing else", async () => {
    render(<LanguageSwitcher />);
    openMenu();

    fireEvent.click(await screen.findByTestId("language-option-am"));
    expect(setStar).toHaveBeenCalledWith("am");
    expect(setStar).toHaveBeenCalledTimes(1);
  });

  it("a DB-only public language can be picked", async () => {
    render(<LanguageSwitcher />);
    openMenu();

    const option = await screen.findByTestId("language-option-sw");
    expect(option).toHaveAttribute("aria-checked", "false");
    fireEvent.click(option);
    expect(setStar).toHaveBeenCalledWith("sw");
  });
});
