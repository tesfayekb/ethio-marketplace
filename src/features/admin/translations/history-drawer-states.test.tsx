import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, fireEvent, screen, waitFor, within } from "@testing-library/react";
import { useState } from "react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { renderPanel as render } from "@/components/ui/dialog-parts-test-render";
import { en } from "@/i18n/locales/en";
import { ownValue } from "@/lib/own-key";
import type { TranslationRevision } from "./translations-service";
const state = vi.hoisted(() => ({ list: vi.fn(), save: vi.fn(), status: vi.fn(), guard: vi.fn() }));
vi.mock("@/i18n", async (original) => ({
  ...(await original<typeof import("@/i18n")>()),
  useI18n: () => ({ t: (key: string) => ownValue(en, key) ?? key, language: "en" }),
}));
vi.mock("./translations-service", async (original) => ({
  ...(await original<typeof import("./translations-service")>()),
  listTranslationRevisions: state.list,
  saveTranslation: state.save,
  setTranslationStatus: state.status,
}));
import { HistoryDrawer } from "./history-drawer";
const revision: TranslationRevision = {
  id: "11111111-1111-4111-8111-111111111111",
  changedBy: "22222222-2222-4222-8222-222222222222",
  action: "save",
  prevValue: "Previous value",
  prevStatus: "machine",
  prevMachine: true,
  changedAt: "2026-09-01T10:00:00Z",
  changedByName: "Operator",
};
function Host() {
  const [restored, setRestored] = useState(false);
  return (
    <HistoryDrawer
      translationKey="admin.translations.title"
      lang="am"
      rtl={false}
      testId="row"
      mayUpdate
      mayApprove
      guard={state.guard}
      restored={restored}
      onRestored={() => setRestored(true)}
    />
  );
}
function draw() {
  render(
    <QueryClientProvider
      client={
        new QueryClient({
          defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
        })
      }
    >
      <Host />
    </QueryClientProvider>,
  );
  fireEvent.click(screen.getByRole("button", { name: en["admin.translations.history.open"] }));
}
beforeEach(() => {
  vi.resetAllMocks();
  state.list.mockResolvedValue([
    revision,
    { ...revision, id: "33333333-3333-4333-8333-333333333333", prevValue: null },
  ]);
  state.save.mockResolvedValue(undefined);
  state.status.mockResolvedValue(undefined);
  state.guard.mockImplementation(async (action: () => Promise<unknown>) => action());
});
afterEach(() => cleanup());
it("UFA-78 history loads, fails with shared Retry, lists old values and restores or clears the selected revision uf:A14.6", async () => {
  state.list.mockReturnValueOnce(new Promise(() => {}));
  draw();
  expect(await screen.findByTestId("history-loading-row")).toHaveTextContent(
    en["admin.translations.history.loading"],
  );
  cleanup();
  state.list.mockRejectedValueOnce(new TypeError("Failed to fetch"));
  draw();
  const failed = await screen.findByTestId("history-failed");
  expect(failed).toHaveTextContent(en["admin.translations.history.error"]);
  expect(failed).toHaveTextContent(en["failure.network"]);
  fireEvent.click(within(failed).getByRole("button", { name: en["common.retry"] }));
  expect(await screen.findByTestId("history-value-row-0")).toHaveTextContent(
    revision.prevValue ?? "",
  );
  expect(screen.getByTestId("history-clear-row-1")).toHaveTextContent(
    en["admin.translations.history.clearInstead"],
  );
  expect(screen.queryByTestId("history-restore-row-1")).toBeNull();
  fireEvent.click(screen.getByTestId("history-restore-row-0"));
  await waitFor(() =>
    expect(state.save.mock.calls[0]?.[0]).toEqual({
      lang: "am",
      key: "admin.translations.title",
      value: "Previous value",
    }),
  );
  expect(await screen.findByTestId("history-restored-row")).toBeInTheDocument();
  fireEvent.click(screen.getByTestId("history-clear-row-1"));
  await waitFor(() =>
    expect(state.status.mock.calls[0]?.[0]).toEqual({
      lang: "am",
      key: "admin.translations.title",
      action: "clear",
    }),
  );
  expect(state.guard).toHaveBeenCalledTimes(2);
  cleanup();
  state.list.mockResolvedValueOnce([]);
  draw();
  expect(await screen.findByTestId("history-empty-row")).toHaveTextContent(
    en["admin.translations.history.empty"],
  );
});
