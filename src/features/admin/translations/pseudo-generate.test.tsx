import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, fireEvent, render, renderHook, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { GuardFn } from "@/features/auth/mfa/use-step-up";

import { PseudoBar } from "./pseudo-bar";
import type { LanguageRow, TranslationRow } from "./translations-service";
import { usePseudoGenerate } from "./use-translations";

/**
 * INC-1137 (the app-fixes turn, part F) — THE PSEUDO GENERATOR FILLS FROM THE BASE LANGUAGE'S
 * KEYS. The target's own list holds only the rows it already owns, so a language just created
 * was empty and the run wrote nothing. The run now reads the roster's one base language through
 * the data-API reader (by key, once), writes every live key, and names what it could not write.
 */

const mocks = vi.hoisted(() => ({
  base: [] as TranslationRow[],
  asked: [] as { lang: string; after: string | null }[],
  write: vi.fn(),
  ensure: vi.fn(),
  list: vi.fn(),
}));

vi.mock("@/i18n", () => ({
  // The stub keeps the `{keys}` placeholder so the bar's own substitution stays observable.
  useI18n: () => ({ t: (key: string) => `${key}:{keys}`, language: "en", setLanguage: () => {} }),
}));

vi.mock("./translations-service", async (importOriginal) => {
  const real = await importOriginal<typeof import("./translations-service")>();
  return {
    ...real,
    ensurePseudoLanguage: mocks.ensure,
    writePseudoRow: mocks.write,
    // The target's own list (the old generator's read): a language with no rows yet.
    listTranslations: mocks.list,
    // The one reader over a stand-in page door that answers by key, as the export door does.
    fetchAllTranslationRows: (lang: string) =>
      real.fetchAllTranslationRows(lang, async (after, limit) => {
        mocks.asked.push({ lang, after });
        const rows = mocks.base
          .filter((row) => after === null || row.key > after)
          .sort((a, b) => (a.key < b.key ? -1 : 1))
          .slice(0, limit);
        return { data: rows, error: null };
      }),
  };
});

function language(code: string, isBase: boolean): LanguageRow {
  return {
    code,
    nameEn: code,
    nameNative: code,
    rtl: false,
    isBase,
    enabledAdmin: true,
    enabledPublic: isBase,
    sort: 0,
  };
}

function baseRow(key: string, value: string | null, orphaned = false): TranslationRow {
  return {
    key,
    langCode: "xb",
    value,
    sourceValue: value,
    status: "approved",
    machine: false,
    flagged: false,
    flagNote: null,
    updatedBy: null,
    updatedAt: "2026-11-13T00:00:00Z",
    approvedBy: null,
    approvedAt: null,
    orphaned,
    context: "",
  };
}

const ROSTER = [language("xb", true), language("am", false)];
const transform = (source: string) => `[${source}]`;

function wrapper({ children }: { children: ReactNode }) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

beforeEach(() => {
  vi.clearAllMocks();
  mocks.asked.length = 0;
  mocks.ensure.mockResolvedValue(undefined);
  mocks.write.mockResolvedValue(undefined);
  mocks.list.mockResolvedValue({ rows: [], totalCount: 0 });
  mocks.base = [
    baseRow("b.second", "Second"),
    baseRow("a.first", "First"),
    baseRow("c.gone", "Gone", true),
    baseRow("d.third", "Third"),
  ];
});

describe("usePseudoGenerate — the base language's keys (INC-1137)", () => {
  it("PSG-1 a target with no rows is filled from every live base key, each written once", async () => {
    const { result } = renderHook(() => usePseudoGenerate(), { wrapper });
    let summary: unknown;
    await act(async () => {
      summary = await result.current.mutateAsync({ roster: ROSTER, transform });
    });
    expect(summary).toEqual({ written: 3, failed: 0, total: 3, failedKeys: [] });
    expect(mocks.write.mock.calls.map(([row]) => row)).toEqual([
      { key: "a.first", value: "[First]" },
      { key: "b.second", value: "[Second]" },
      { key: "d.third", value: "[Third]" },
    ]);
    expect(mocks.asked.every(({ lang }) => lang === "xb")).toBe(true);
  });

  it("PSG-2 a refused write and an empty source are named, and the run goes on", async () => {
    mocks.base = [baseRow("a.first", "First"), baseRow("b.empty", ""), baseRow("c.third", "Third")];
    mocks.write.mockImplementation(async ({ key }: { key: string }) => {
      if (key === "a.first") throw new Error("permission denied");
    });
    const { result } = renderHook(() => usePseudoGenerate(), { wrapper });
    let summary: unknown;
    await act(async () => {
      summary = await result.current.mutateAsync({ roster: ROSTER, transform });
    });
    expect(summary).toEqual({
      written: 1,
      failed: 2,
      total: 3,
      failedKeys: ["a.first", "b.empty"],
    });
  });

  it.each([
    ["no base language", [language("am", false)]],
    ["two base languages", [language("xb", true), language("xc", true)]],
  ])("PSG-3 %s refuses before anything is written", async (_name, roster) => {
    const { result } = renderHook(() => usePseudoGenerate(), { wrapper });
    await act(async () => {
      await expect(result.current.mutateAsync({ roster, transform })).rejects.toThrow(
        /^noSingleBase: [02]$/,
      );
    });
    expect(mocks.ensure).not.toHaveBeenCalled();
    expect(mocks.write).not.toHaveBeenCalled();
    expect(mocks.asked).toEqual([]);
  });
});

describe("PseudoBar — the keys it could not write (INC-1137)", () => {
  const guard: GuardFn = async (action) => action();

  it("PSG-4 the summary names the first twenty keys it could not write", async () => {
    mocks.base = Array.from({ length: 25 }, (_, index) =>
      baseRow(`k.${String(index).padStart(2, "0")}`, "Text"),
    );
    mocks.write.mockRejectedValue(new Error("permission denied"));
    render(<PseudoBar guard={guard} roster={ROSTER} />, { wrapper });
    fireEvent.click(screen.getByTestId("pseudo-generate"));
    fireEvent.click(await screen.findByTestId("pseudo-generate-confirm-action"));
    const named = await screen.findByTestId("strings-pseudo-failed");
    const keys = Array.from({ length: 20 }, (_, index) => `k.${String(index).padStart(2, "0")}`);
    expect(named.textContent).toBe(`admin.translations.ai.failedList:${keys.join(", ")}`);
  });

  it("PSG-5 the run waits for the roster: Generate is disabled until it is read", () => {
    render(<PseudoBar guard={guard} roster={undefined} />, { wrapper });
    expect(screen.getByTestId("pseudo-generate")).toBeDisabled();
  });
});
