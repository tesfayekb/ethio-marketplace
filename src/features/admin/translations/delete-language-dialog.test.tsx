import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ preview: vi.fn() }));
vi.mock("@/i18n", () => ({ useI18n: () => ({ t: (key: string) => key, language: "en" }) }));
vi.mock("./translations-service", async (importOriginal) => ({
  ...(await importOriginal<typeof import("./translations-service")>()),
  languageDeletePreview: mocks.preview,
}));
import { DeleteLanguageDialog } from "./delete-language-dialog";
import type { LanguageRow } from "./translations-service";

const row = { code: "scratch-x", nameNative: "Scratch X", nameEn: "Scratch X" } as LanguageRow;

it("DLD-U1 failed counts show the notice with Retry; the counts sentence returns once they arrive", async () => {
  mocks.preview.mockRejectedValueOnce(new TypeError("TypeError: Failed to fetch"));
  mocks.preview.mockResolvedValue({ uiRows: 1, entityRows: 2, revisions: 3, assignments: 4 });
  render(
    <QueryClientProvider
      client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}
    >
      <DeleteLanguageDialog
        row={row}
        guard={async (run) => run()}
        onClose={vi.fn()}
        onDeleted={vi.fn()}
      />
    </QueryClientProvider>,
  );
  const retry = await waitFor(() => screen.getByTestId("lang-delete-counts-error-scratch-x-retry"));
  expect(screen.getByTestId("lang-delete-counts-error-scratch-x")).toHaveTextContent(
    "admin.translations.delete.countsError",
  );
  fireEvent.click(retry);
  await waitFor(() =>
    expect(screen.getByTestId("lang-delete-counts-scratch-x")).toHaveTextContent(
      "admin.translations.delete.counts",
    ),
  );
  expect(screen.queryByTestId("lang-delete-counts-error-scratch-x")).toBeNull();
  expect(mocks.preview).toHaveBeenCalledTimes(2);
});
