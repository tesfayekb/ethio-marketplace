import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { LanguageSwitcher } from "./language-switcher";

/**
 * DEC-026 — U4i-4 (c) / INC-123. The menu had grown into a canvas: one tall
 * block per language with the star wrapped underneath. Density is a control:
 * N gated languages render N items, each ONE flex line holding the label
 * (D237: the item's own radio indicator marks the choice; no star control).
 */
const publicLanguages = [
  { code: "en", name_en: "English", name_native: "English", rtl: false, sort: 0 },
  { code: "am", name_en: "Amharic", name_native: "አማርኛ", rtl: false, sort: 1 },
  { code: "ti", name_en: "Tigrinya", name_native: "ትግርኛ", rtl: false, sort: 2 },
  { code: "sw", name_en: "Swahili", name_native: "Kiswahili", rtl: false, sort: 3 },
];

vi.mock("@/i18n", () => ({
  useI18n: () => ({
    t: (key: string) => key,
    language: "en",
    publicLanguages,
    star: "en",
    setStar: () => {},
  }),
}));

describe("LanguageSwitcher density", () => {
  it("renders one single-line item per gated language", async () => {
    render(<LanguageSwitcher />);
    fireEvent.pointerDown(screen.getByTestId("language-switcher"), {
      button: 0,
      ctrlKey: false,
      pointerType: "mouse",
    });

    const items = await screen.findAllByTestId(/^language-option-/);
    expect(items).toHaveLength(publicLanguages.length);

    for (const item of items) {
      // One flex row: the label and its indicator are siblings, never stacked.
      expect(item.className).toContain("items-center");
      expect(item.className).not.toContain("flex-col");
      // D264 (turn F, G38: was U4i-8's `py-0.5 leading-none`): the menu's own row —
      // 44 px to tap (min-h-11), 40 px on a fine pointer from md, one line.
      expect(item.className).toContain("min-h-11");
      expect(item.className).toContain("md:pointer-fine:h-10");
      expect(item.className).toContain("whitespace-nowrap");
      expect(item.className).not.toContain("py-0.5");
      expect(item.className).not.toContain("py-1.5");
      expect(item.querySelector('[data-lucide="check"]')).toBeNull();
    }

    // INC-1027 (turn F2, G38: was the `bg-nav-pill` class on the current row): the current
    // language is the checked radio item; LIST_ROW draws its look from that state.
    expect(screen.getByTestId("language-option-en")).toHaveAttribute("aria-checked", "true");
    expect(screen.getByTestId("language-option-en")).toHaveAttribute("data-state", "checked");
    expect(screen.getByTestId("language-option-am")).toHaveAttribute("aria-checked", "false");
    expect(screen.getByTestId("language-option-en").className).toContain(
      "data-[state=checked]:bg-nav-pill",
    );
  });
});
