import { loadSelectList } from "@/components/select-list-loader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, expect, it, vi } from "vitest";
const mocks = vi.hoisted(() => ({ save: vi.fn(), rpc: vi.fn(), error: false, empty: false }));
vi.mock("@/i18n", () => ({ useI18n: () => ({ t: (key: string) => key }) }));
vi.mock("@/integrations/supabase/client", () => ({ supabase: { rpc: mocks.rpc } }));
vi.mock("@/lib/refresh-after-write", () => ({ refreshAfterWrite: vi.fn() }));
vi.mock("./use-translations", () => ({
  useLanguages: () => ({
    data: mocks.empty
      ? []
      : [
          { code: "scratch-a", nameNative: "Scratch A", isBase: false, enabledAdmin: true },
          { code: "scratch-b", nameNative: "Scratch B", isBase: false, enabledAdmin: true },
        ],
    isLoading: false,
    error: null,
  }),
  useSetTranslatorLanguages: () => ({ mutateAsync: mocks.save, isPending: false }),
}));
import { TranslatorLanguagesCard } from "./translator-card";
beforeEach(() => {
  mocks.empty = false;
  mocks.save.mockReset();
  mocks.save.mockResolvedValue(undefined);
  mocks.rpc.mockReset();
  mocks.rpc.mockResolvedValue({
    data: [{ eligible: true, languages: ["scratch-a"] }],
    error: null,
  });
});
function draw() {
  render(
    <QueryClientProvider
      client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}
    >
      <TranslatorLanguagesCard userId="scratch-user" guard={async (run) => run()} />
    </QueryClientProvider>,
  );
}
it("TL-U1 the select reads existing assignments and sends the entire replacement set", async () => {
  draw();
  await waitFor(() => expect(screen.getByTestId("translator-lang")).not.toBeDisabled());
  fireEvent.click(screen.getByTestId("translator-lang"));
  expect(screen.getByTestId("translator-lang-scratch-a")).toHaveAttribute("aria-selected", "true");
  fireEvent.click(screen.getByTestId("translator-lang-scratch-b"));
  fireEvent.click(screen.getByTestId("translator-save"));
  await waitFor(() => expect(mocks.save).toHaveBeenCalledWith(["scratch-a", "scratch-b"]));
});
it("TL-U2 a failed scope read is an unavailable line, never no-role or an empty list", async () => {
  mocks.rpc.mockResolvedValue({ data: null, error: { message: "permissionDenied" } });
  draw();
  await waitFor(() =>
    expect(screen.getByTestId("translator-check-error")).toHaveAttribute("role", "alert"),
  );
  expect(screen.getByTestId("translator-lang")).toBeDisabled();
  expect(screen.queryByTestId("translator-no-role")).toBeNull();
  expect(mocks.save).not.toHaveBeenCalled();
});

// The existing choice assertions run after the intent-fetched module has arrived.
beforeEach(async () => {
  await loadSelectList();
});

it("TL-U3 a loaded empty assignable roster shows the existing caption and no select", async () => {
  mocks.empty = true;
  draw();
  await waitFor(() =>
    expect(screen.getByText("admin.translations.translator.none")).toBeInTheDocument(),
  );
  expect(screen.queryByTestId("translator-lang")).toBeNull();
});
