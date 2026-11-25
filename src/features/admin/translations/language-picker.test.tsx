import { loadSelectList } from "@/components/select-list-loader";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, expect, it, vi } from "vitest";
const state = vi.hoisted(() => ({
  loading: false,
  error: false,
  network: false,
  refetch: vi.fn(),
}));
vi.mock("@/i18n", () => ({ useI18n: () => ({ t: (key: string) => key }) }));
vi.mock("./use-translations", () => ({
  useProviderLanguages: () => ({
    data: Array.from({ length: 50 }, (_, n) => ({ code: `scratch-${n}`, name: `Scratch ${n}` })),
    isLoading: state.loading,
    error: state.network
      ? new TypeError("TypeError: Failed to fetch")
      : state.error
        ? new Error("read failed")
        : null,
    refetch: state.refetch,
  }),
}));
import { LanguagePicker } from "./language-picker";
beforeEach(() => {
  state.loading = false;
  state.error = false;
  state.network = false;
  state.refetch.mockReset();
});
it("LP-U3 a failed provider list shows the notice with Retry that refetches it", () => {
  state.network = true;
  render(<LanguagePicker onSelect={vi.fn()} onManual={vi.fn()} />);
  expect(screen.getByTestId("translations-add-option")).toBeDisabled();
  const notice = screen.getByTestId("translations-add-picker-error");
  expect(notice).toHaveAttribute("role", "alert");
  expect(notice).toHaveTextContent("admin.translations.add.pickError");
  fireEvent.click(screen.getByTestId("translations-add-picker-error-retry"));
  expect(state.refetch).toHaveBeenCalledTimes(1);
});
it("LP-U1 catalogue choice searches beyond forty entries and selects the whole provider row at once", () => {
  const select = vi.fn();
  render(<LanguagePicker onSelect={select} onManual={vi.fn()} />);
  fireEvent.click(screen.getByTestId("translations-add-option"));
  fireEvent.change(screen.getByTestId("translations-add-option-search"), {
    target: { value: "scratch-49" },
  });
  fireEvent.click(screen.getByTestId("translations-add-option-scratch-49"));
  expect(select).toHaveBeenCalledWith({ code: "scratch-49", name: "Scratch 49" });
  expect(screen.queryByTestId("translations-add-option-list")).toBeNull();
});
it.each(["loading", "error"] as const)(
  "LP-U2 %s keeps the choice closed and manual entry available",
  (kind) => {
    state[kind] = true;
    const manual = vi.fn();
    render(<LanguagePicker onSelect={vi.fn()} onManual={manual} />);
    expect(screen.getByTestId("translations-add-option")).toBeDisabled();
    fireEvent.click(screen.getByTestId("translations-add-manual"));
    expect(manual).toHaveBeenCalledTimes(1);
  },
);

// The existing choice assertions run after the intent-fetched module has arrived.
beforeEach(async () => {
  await loadSelectList();
});
