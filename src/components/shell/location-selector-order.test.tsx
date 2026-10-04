import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Bundle 3 Part D — the header's location selector lists a level A to Z by
 * the shown name in the reader's language. The stored order (Oromia, Tigray,
 * Amhara) disagrees with the English and the Amharic alphabetical orders.
 * The dropdown primitive is drawn flat so every option is in the document.
 */

const state = vi.hoisted(() => ({ language: "en", names: {} as Record<string, string> }));

vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, entities: {}, language: state.language }),
}));
vi.mock("@/i18n/entity", () => ({
  entityName: (_type: string, row: { id: string; nameEn: string }) =>
    state.names[row.id] ?? row.nameEn,
}));
vi.mock("@/components/ui/dropdown-menu", () => ({
  DropdownMenu: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  DropdownMenuTrigger: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  DropdownMenuContent: ({ children }: { children: ReactNode }) => (
    <div data-testid="menu">{children}</div>
  ),
  DropdownMenuItem: ({ children }: { children: ReactNode; onSelect?: () => void }) => (
    <div data-testid="menu-item">{children}</div>
  ),
}));

const node = (id: string, parentId: string | null, level: string, nameEn: string) => ({
  id,
  parentId,
  level,
  slug: id,
  nameEn,
  centerLat: null,
  centerLng: null,
  isoCode: null,
});

vi.mock("@/components/shell-context", () => ({
  useShell: () => ({
    locationPath: [
      { id: "et", name_en: "Ethiopia", name_am: null, level: "country", parent_id: null },
    ],
    setLocationPath: () => undefined,
    locationCountry: "ET",
    selectLocationCountry: () => undefined,
    guessInUse: false,
    guessNode: null,
  }),
}));
vi.mock("@/components/shell/location-data", () => ({
  useOpenMarkets: () => ({
    markets: [{ code: "ET", nameEn: "Ethiopia", anchorId: "et" }],
    failed: false,
    isLoading: false,
  }),
  useCountryTree: () => ({
    loadedCountry: "ET",
    failed: false,
    nodes: [
      node("et", null, "country", "Ethiopia"),
      node("r-or", "et", "region", "Oromia"),
      node("r-ti", "et", "region", "Tigray"),
      node("r-am", "et", "region", "Amhara"),
    ],
  }),
  asLocationNode: (n: { id: string }) => n,
}));

const { LocationSelector } = await import("./location-selector");

function regionNames(): string[] {
  const menus = screen.getAllByTestId("menu");
  // Second menu is the region level; its first item is "any area".
  return Array.from(menus[1]!.querySelectorAll('[data-testid="menu-item"]'))
    .slice(1)
    .map((item) => item.textContent ?? "");
}

describe("header location selector order", () => {
  beforeEach(() => {
    state.names = {};
  });

  it("lists regions A to Z in English", () => {
    state.language = "en";
    render(<LocationSelector />);
    expect(regionNames()).toEqual(["Amhara", "Oromia", "Tigray"]);
  });

  it("lists regions in Amharic order by the Amharic names", () => {
    state.language = "am";
    state.names = { "r-ti": "ትግራይ", "r-am": "አማራ", "r-or": "ኦሮሚያ" };
    render(<LocationSelector />);
    expect(regionNames()).toEqual(["ትግራይ", "አማራ", "ኦሮሚያ"]);
  });
});
