import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";

import type { GuardFn } from "@/features/auth/mfa/use-step-up";

import { AiBulkBar } from "./ai-bulk-bar";
import { collectEntities, collectUi } from "./bulk-collect";
import {
  entityRowKey,
  listEntityTranslations,
  listTranslations,
  type EntityTranslationRow,
  type TranslationRow,
} from "./translations-service";

/**
 * DEC-026 — INC-119 CLASS: a count whose SOURCE failed used to render as a
 * quiet "(0)", which reads to an operator as "there is nothing to do". Only a
 * `success` count may be shown as digits or believed when it is zero; every
 * other state renders pending/error and disables the action.
 */
vi.mock("@/i18n", () => ({
  useI18n: () => ({
    // The real catalog interpolates `{count}`; the identity stub keeps the
    // placeholder so the component's own substitution stays observable.
    t: (key: string) => `${key} ({count})`,
    language: "en",
    setLanguage: () => {},
    publicLanguages: [],
  }),
}));

vi.mock("./translations-service", async (importOriginal) => ({
  ...(await importOriginal<typeof import("./translations-service")>()),
  listTranslations: vi.fn(),
  listEntityTranslations: vi.fn(),
  aiTranslate: vi.fn(),
  aiTranslateEntities: vi.fn(),
}));

function wrapper({ children }: { children: ReactNode }) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

// L5 (DEC-041): guard resolves with the action's own result.
const guard: GuardFn = async (action) => action();

describe("AiBulkBar", () => {
  it("renders the digits and no error caption for a success count", () => {
    render(<AiBulkBar lang="am" untranslated={12} guard={guard} countState="success" />, {
      wrapper,
    });

    const start = screen.getByTestId("ai-bulk-start");
    expect(start).toBeEnabled();
    expect(start).toHaveTextContent("12");
    expect(start).toHaveAttribute("data-count-state", "success");
    expect(screen.queryByTestId("ai-bulk-count-error")).toBeNull();
  });

  it("never renders a zero for a pending count", () => {
    render(<AiBulkBar lang="am" untranslated={0} guard={guard} countState="pending" />, {
      wrapper,
    });

    const start = screen.getByTestId("ai-bulk-start");
    expect(start).toBeDisabled();
    expect(start).toHaveTextContent("admin.translations.ai.pending");
    expect(start.textContent ?? "").not.toContain("0");
  });

  for (const countState of ["error", "missing"] as const) {
    it(`never renders a zero for a ${countState} count, and says so`, () => {
      render(<AiBulkBar lang="am" untranslated={0} guard={guard} countState={countState} />, {
        wrapper,
      });

      const start = screen.getByTestId("ai-bulk-start");
      expect(start).toBeDisabled();
      expect(start.textContent ?? "").not.toContain("0");
      expect(screen.getByTestId("ai-bulk-count-error")).toBeVisible();
    });
  }

  it("disables the action on a believed zero without claiming an error", () => {
    render(<AiBulkBar lang="am" untranslated={0} guard={guard} countState="success" />, {
      wrapper,
    });

    expect(screen.getByTestId("ai-bulk-start")).toBeDisabled();
    expect(screen.queryByTestId("ai-bulk-count-error")).toBeNull();
  });
});

/**
 * BT-U1 — INC-1141 CLASS: the collectors read by KEY. A fake door over a list
 * that changes between two page reads: a row added before the cursor must not
 * make the next page repeat one, a row added after it must be read, and none of
 * the rows that stood from the start may be skipped.
 */
function untranslatedRow(key: string): TranslationRow {
  return {
    key,
    langCode: "am",
    value: null,
    sourceValue: `source ${key}`,
    status: "untranslated",
    machine: false,
    flagged: false,
    flagNote: null,
    updatedBy: null,
    updatedAt: "2026-11-23T00:00:00Z",
    approvedBy: null,
    approvedAt: null,
    orphaned: false,
    context: "",
  };
}

describe("the bulk translate's collectors (BT-U1)", () => {
  it("reads the strings by key: a row added mid-run is neither skipped nor read twice", async () => {
    const keys = Array.from({ length: 250 }, (_, i) => `k${String(i).padStart(3, "0")}`);
    const seenAfter: (string | undefined)[] = [];
    let calls = 0;
    vi.mocked(listTranslations).mockImplementation(async (filters) => {
      calls += 1;
      seenAfter.push(filters.after);
      // After the first page: one row appears BEFORE the cursor (an offset
      // read would now repeat the page's last row) and one AFTER it.
      if (calls === 2) {
        keys.push("k0005", "k999");
        keys.sort();
      }
      const rest = keys.filter((key) => filters.after === undefined || key > filters.after);
      const rows = rest.slice(0, filters.limit).map(untranslatedRow);
      return { rows, totalCount: rest.length };
    });

    const items = await collectUi("am", "");
    const read = items.map((item) => item.key);

    expect(new Set(read).size).toBe(read.length);
    for (let i = 0; i < 250; i += 1) expect(read).toContain(`k${String(i).padStart(3, "0")}`);
    expect(read).toContain("k999");
    // Every page after the first carries the previous page's last key.
    expect(seenAfter).toEqual([undefined, "k099", "k199"]);
    expect(vi.mocked(listTranslations).mock.calls.every(([f]) => f.offset === 0)).toBe(true);
  });

  it("reads the content names by their four-part key and stops on a short page", async () => {
    const rows = Array.from({ length: 130 }, (_, i): EntityTranslationRow => {
      const id = `00000000-0000-4000-8000-${String(i).padStart(12, "0")}`;
      return {
        key: entityRowKey("category", id, "name"),
        translationId: null,
        entityType: "category",
        entityId: id,
        field: "name",
        label: `Label ${String(i).padStart(3, "0")}`,
        identifier: null,
        sourceValue: `source ${i}`,
        value: null,
        status: "untranslated",
        machine: false,
        flagged: false,
        flagNote: null,
        updatedBy: null,
        updatedAt: null,
        approvedBy: null,
        approvedAt: null,
      };
    });
    const seenAfter: unknown[] = [];
    vi.mocked(listEntityTranslations).mockImplementation(async (filters) => {
      seenAfter.push(filters.after);
      const start =
        filters.after === undefined
          ? 0
          : rows.findIndex((row) => row.entityId === filters.after?.eid) + 1;
      return { rows: rows.slice(start, start + (filters.limit ?? 25)), totalCount: 130 - start };
    });

    const items = await collectEntities("am", "");

    expect(items).toHaveLength(130);
    expect(new Set(items.map((item) => item.id)).size).toBe(130);
    expect(seenAfter).toEqual([
      undefined,
      {
        etype: "category",
        elabel: "Label 099",
        eid: "00000000-0000-4000-8000-000000000099",
        efield: "name",
      },
    ]);
  });

  it("stops with the page's own failure and returns no partial work", async () => {
    let calls = 0;
    vi.mocked(listTranslations).mockImplementation(async () => {
      calls += 1;
      if (calls === 2) throw new Error("page two failed");
      return {
        rows: Array.from({ length: 100 }, (_, i) => untranslatedRow(`k${i}`)),
        totalCount: 300,
      };
    });

    await expect(collectUi("am", "")).rejects.toThrow("page two failed");
    expect(calls).toBe(2);
  });
});
