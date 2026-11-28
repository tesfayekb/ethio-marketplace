import { fireEvent, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { en } from "@/i18n/locales/en";

/**
 * UF-1 Part 1 (DEC-493) — the phone's search toggle (S6a.2). The shell holds `searchOpen`
 * and draws SearchRow while it is true (app-shell.tsx:1160); this harness holds the same
 * state so the header's toggle and the row's two ways out are pressed as a person does.
 */
const shell = vi.hoisted(() => ({ value: {} as Record<string, unknown> }));
vi.mock("@/components/shell-context", () => ({ useShell: () => shell.value }));
vi.mock("@/i18n", async () => {
  const { en: EN } = await import("@/i18n/locales/en");
  const { ownValue: own } = await import("@/lib/own-key");
  return { useI18n: () => ({ t: (key: string) => own(EN, key) ?? key, language: "en" }) };
});
vi.mock("@tanstack/react-router", () => ({
  Link: ({ to, children, ...rest }: { to: string; children: ReactNode }) => (
    <a href={String(to)} {...rest}>
      {children}
    </a>
  ),
}));
vi.mock("@/components/language-switcher", () => ({ LanguageSwitcher: () => null }));
vi.mock("@/components/shell/theme-toggle", () => ({ ThemeToggle: () => null }));
vi.mock("@/components/shell/sign-in-link", () => ({ SignInLink: () => null }));
vi.mock("@/components/brand/logo", () => ({ Logo: () => null }));

const { AppHeader, SearchRow } = await import("./app-header");

function Harness() {
  const [searchOpen, setSearchOpen] = useState(false);
  shell.value = {
    auth: "signedOut",
    authLoading: false,
    user: null,
    requestSignOut: vi.fn(),
    navOpen: false,
    setNavOpen: vi.fn(),
    signingOut: false,
    searchOpen,
    setSearchOpen,
  };
  return (
    <>
      <AppHeader />
      {searchOpen ? <SearchRow onClose={() => setSearchOpen(false)} /> : null}
    </>
  );
}

describe("UF-1 the phone's search toggle", () => {
  it("UFP-29 the search toggle opens the search row; Close search and Escape close it uf:S6a.2", () => {
    render(<Harness />);
    const toggle = screen.getByTestId("search-toggle");
    expect(toggle).toHaveAccessibleName(en["shell.searchLabel"]);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByTestId("search-row")).toBeNull();

    fireEvent.click(toggle);
    expect(screen.getByTestId("search-row")).toBeInTheDocument();
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByTestId("search-input")).toHaveFocus();
    fireEvent.click(screen.getByRole("button", { name: en["shell.searchClose"] }));
    expect(screen.queryByTestId("search-row")).toBeNull();

    fireEvent.click(toggle);
    fireEvent.keyDown(screen.getByTestId("search-input"), { key: "Escape" });
    expect(screen.queryByTestId("search-row")).toBeNull();
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });
});
