import type React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
const state = vi.hoisted(() => ({ query: vi.fn(), refetch: vi.fn() }));
vi.mock("@/i18n", () => ({ useI18n: () => ({ t: (key: string) => key, language: "en" }) }));
vi.mock("@tanstack/react-router", () => ({ useNavigate: () => vi.fn(), Link: () => null }));
vi.mock("./use-ai-calls", () => ({ useAiCalls: state.query }));
// The Filters panel opens on demand (overlay loader); its choices are drawn in place here.
vi.mock("@/components/shell/filter-chips", async (real) => ({
  ...(await real<typeof import("@/components/shell/filter-chips")>()),
  FiltersButton: ({ testid, children }: { testid: string; children: React.ReactNode }) => (
    <div data-testid={testid}>{children}</div>
  ),
}));
import { AiCalls } from "./ai-calls";
const row = {
  id: "one",
  created_at: "2026-10-29T00:00:00Z",
  feature: "name_check",
  model: "model",
  outcome: "ok",
  latency_ms: 4,
  fake: false,
  actor: { kind: "hidden" },
};
describe("AI call consumer", () => {
  it("ACR-3 sends the actual cursor and resets it on a filter change", () => {
    state.query.mockReturnValue({
      data: { rows: [row], next: { at: row.created_at, id: row.id } },
      isLoading: false,
      isFetching: false,
      error: null,
    });
    render(<AiCalls />);
    expect(within(screen.getByRole("table")).getByText("admin.ai.log.personHidden")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "prim.table.next" }));
    expect(state.query).toHaveBeenLastCalledWith("", "", { at: row.created_at, id: row.id });
    fireEvent.click(screen.getByTestId("ai-calls-outcome-timeout"));
    expect(state.query).toHaveBeenLastCalledWith("", "timeout", null);
  });
  it("TBS-3 the feature and outcome choices sit in Filters, show as chips, and a cleared chip goes back to the first page", () => {
    state.query.mockReturnValue({
      data: { rows: [row], next: { at: row.created_at, id: row.id } },
      isLoading: false,
      isFetching: false,
      error: null,
    });
    render(<AiCalls />);
    const toolbar = screen.getByTestId("ai-calls-toolbar");
    expect(within(toolbar).queryByRole("combobox")).toBeNull();
    const filters = screen.getByTestId("ai-calls-filters");
    fireEvent.click(within(filters).getByTestId("ai-calls-feature-name_check"));
    fireEvent.click(within(filters).getByTestId("ai-calls-outcome-timeout"));
    expect(screen.getByTestId("ai-calls-chips-chip-feature")).toBeTruthy();
    expect(screen.getByTestId("ai-calls-chips-chip-outcome")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "prim.table.next" }));
    expect(state.query).toHaveBeenLastCalledWith("name_check", "timeout", {
      at: row.created_at,
      id: row.id,
    });
    fireEvent.click(screen.getByTestId("ai-calls-chips-chip-outcome-remove"));
    expect(state.query).toHaveBeenLastCalledWith("name_check", "", null);
    expect(screen.queryByTestId("ai-calls-chips-chip-outcome")).toBeNull();
  });
  it("ACR-4 a failed read remains an error with retry, never an empty success", () => {
    state.query.mockReturnValue({
      error: new Error("failed"),
      isLoading: false,
      refetch: state.refetch,
    });
    render(<AiCalls />);
    expect(screen.getByRole("alert")).toBeTruthy();
    expect(screen.queryByTestId("data-table-empty")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "common.retry" }));
    expect(state.refetch).toHaveBeenCalledTimes(1);
  });
});
