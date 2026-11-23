import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, expect, it, vi } from "vitest";
const state = vi.hoisted(() => ({ loading: false, error: false }));
vi.mock("@/i18n", () => ({ useI18n: () => ({ t: (key: string) => key }) }));
vi.mock("./use-translations", () => ({
  useProviderLanguages: () => ({
    data: Array.from({ length: 50 }, (_, n) => ({ code: `scratch-${n}`, name: `Scratch ${n}` })),
    isLoading: state.loading,
    error: state.error ? new Error("read failed") : null,
  }),
}));
import { LanguagePicker } from "./language-picker";
beforeEach(() => {
  state.loading = false;
  state.error = false;
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
