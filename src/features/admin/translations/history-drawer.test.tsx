import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { GuardFn } from "@/features/auth/mfa/use-step-up";

import { HistoryDrawer } from "./history-drawer";
import { listTranslationRevisions, type TranslationRevision } from "./translations-service";

/**
 * DEC-026 — LAW C4: every surface has loading, empty, error and populated
 * states, and each of them is translated. The drawer is the cheapest place to
 * hold that line, because its read is gated, asynchronous and easy to leave
 * blank on failure.
 */
vi.mock("@/i18n", () => ({
  useI18n: () => ({
    t: (key: string) => key,
    language: "en",
    setLanguage: () => {},
    publicLanguages: [],
  }),
}));

vi.mock("./translations-service", async (importOriginal) => ({
  ...(await importOriginal<typeof import("./translations-service")>()),
  listTranslationRevisions: vi.fn(),
  saveTranslation: vi.fn(),
  setTranslationStatus: vi.fn(),
}));

const listRevisions = vi.mocked(listTranslationRevisions);

function wrapper({ children }: { children: ReactNode }) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

const guard: GuardFn = async (action) => {
  await action();
};

const revision: TranslationRevision = {
  id: "11111111-1111-4111-8111-111111111111",
  changedBy: "22222222-2222-4222-8222-222222222222",
  action: "save",
  prevValue: "የቀድሞ ዋጋ",
  prevStatus: "machine",
  prevMachine: true,
  changedAt: new Date("2026-09-01T10:00:00Z").toISOString(),
  changedByName: "Operator",
};

function renderDrawer() {
  render(
    <HistoryDrawer
      translationKey="admin.translations.title"
      lang="am"
      rtl={false}
      testId="row"
      mayUpdate
      mayApprove
      guard={guard}
      restored={false}
      onRestored={() => {}}
    />,
    { wrapper },
  );
  fireEvent.click(screen.getByTestId("string-history-row"));
}

beforeEach(() => {
  listRevisions.mockReset();
});

describe("HistoryDrawer", () => {
  it("renders the loading state while the gated read is in flight", async () => {
    listRevisions.mockReturnValue(new Promise<TranslationRevision[]>(() => {}));
    renderDrawer();

    expect(await screen.findByTestId("history-loading-row")).toBeVisible();
  });

  it("renders the empty state when the key has no revisions", async () => {
    listRevisions.mockResolvedValue([]);
    renderDrawer();

    expect(await screen.findByTestId("history-empty-row")).toBeVisible();
  });

  it("renders an error, never a blank drawer, when the read fails", async () => {
    listRevisions.mockRejectedValue(new Error("permission denied"));
    renderDrawer();

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent("admin.translations.history.error");
    });
    expect(screen.queryByTestId("history-empty-row")).toBeNull();
  });

  it("renders the populated state with the historical value and a restore control", async () => {
    listRevisions.mockResolvedValue([revision]);
    renderDrawer();

    expect(await screen.findByTestId("history-list-row")).toBeVisible();
    expect(screen.getByTestId("history-value-row-0")).toHaveTextContent("የቀድሞ ዋጋ");
    expect(screen.getByTestId("history-restore-row-0")).toBeEnabled();
  });
});
