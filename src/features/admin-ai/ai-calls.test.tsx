import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
const state = vi.hoisted(() => ({ query: vi.fn(), refetch: vi.fn() }));
vi.mock("@/i18n", () => ({ useI18n: () => ({ t: (key: string) => key, language: "en" }) }));
vi.mock("@tanstack/react-router", () => ({ useNavigate: () => vi.fn(), Link: () => null }));
vi.mock("./use-ai-calls", () => ({ useAiCalls: state.query }));
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
    fireEvent.change(screen.getByTestId("ai-calls-outcome"), { target: { value: "timeout" } });
    expect(state.query).toHaveBeenLastCalledWith("", "timeout", null);
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
