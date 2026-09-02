import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { LanguageSwitcher } from "./language-switcher";

/**
 * DEC-026 — U4i-4 (c) / INC-123. The menu had grown into a canvas: one tall
 * block per language with the star wrapped underneath. Density is a control:
 * N gated languages render N items, each ONE flex line holding the label and
 * its star side by side.
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
    setLanguage: () => {},
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
      // One flex row: label and star are siblings, never stacked.
      expect(item.className).toContain("items-center");
      expect(item.className).not.toContain("flex-col");
      // U4i-8: compact rows use a 2px vertical inset and no line-height slack.
      expect(item.className).toContain("py-0.5");
      expect(item.className).toContain("leading-none");
      expect(item.className).not.toContain("py-px");
      expect(item.className).not.toContain("py-1.5");
      const code = item.getAttribute("data-testid")?.replace("language-option-", "") ?? "";
      expect(item.querySelector(`[data-testid="language-star-${code}"]`)).not.toBeNull();
      expect(item.querySelector('[data-lucide="check"]')).toBeNull();
    }

    expect(screen.getByTestId("language-option-en").className).toContain("bg-accent");
    expect(screen.getByTestId("language-option-am").className).not.toContain("bg-accent");
  });
});
