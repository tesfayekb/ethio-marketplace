import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { LanguageSwitcher } from "./language-switcher";

/**
 * DEC-026 — U4h, THE DEVICE ★.
 *
 * Three properties, each one a thing that would be expensive to learn from
 * production:
 *  * the star RENDERS its pressed state, so the operator can see which default
 *    is in force without opening settings;
 *  * ONE favourite — pressing a second language moves the star instead of
 *    adding one (the invariant is structural: the setter replaces);
 *  * a DB-only language (no compiled catalog) is starrable, because the option
 *    list is the publication gate's list, not the compiled registry (INC-107).
 */
const publicLanguages = [
  { code: "en", name_en: "English", name_native: "English", rtl: false, sort: 0 },
  { code: "am", name_en: "Amharic", name_native: "አማርኛ", rtl: false, sort: 1 },
  // DB-only: no compiled catalog exists for `sw`.
  { code: "sw", name_en: "Swahili", name_native: "Kiswahili", rtl: false, sort: 5 },
];

const setStar = vi.fn();
const setLanguage = vi.fn();
let star: string | null = "am";

vi.mock("@/i18n", () => ({
  useI18n: () => ({
    t: (key: string) => key,
    language: "en",
    setLanguage,
    publicLanguages,
    star,
    setStar,
  }),
}));

function openMenu() {
  const trigger = screen.getByTestId("language-switcher");
  // Radix opens on `pointerdown`; a follow-up click would toggle it shut.
  fireEvent.pointerDown(trigger, { button: 0, ctrlKey: false, pointerType: "mouse" });
}

describe("LanguageSwitcher — device star", () => {
  it("renders the pressed state on exactly the starred language", async () => {
    star = "am";
    render(<LanguageSwitcher />);
    openMenu();

    expect(await screen.findByTestId("language-star-am")).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByTestId("language-star-en")).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByTestId("language-star-sw")).toHaveAttribute("aria-pressed", "false");
  });

  it("keeps ONE favourite: starring another language calls the replacing setter", async () => {
    star = "am";
    render(<LanguageSwitcher />);
    openMenu();

    fireEvent.click(await screen.findByTestId("language-star-en"));
    expect(setStar).toHaveBeenCalledWith("en");
    // Starring must not ALSO fire the row's plain selection: the provider's
    // star setter already selects, and a double-apply would fight it.
    expect(setLanguage).not.toHaveBeenCalled();
  });

  it("lets a DB-only language be starred", async () => {
    star = null;
    render(<LanguageSwitcher />);
    openMenu();

    const swStar = await screen.findByTestId("language-star-sw");
    expect(swStar).toHaveAttribute("aria-pressed", "false");
    fireEvent.click(swStar);
    expect(setStar).toHaveBeenCalledWith("sw");
  });
});
