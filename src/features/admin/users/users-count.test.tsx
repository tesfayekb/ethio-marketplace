import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
const reads = vi.hoisted(() => ({ users: vi.fn() }));
vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => vi.fn(),
  useSearch: () => ({ role: undefined }),
}));
vi.mock("@/i18n", () => ({ useI18n: () => ({ t: (key: string) => key, language: "en" }) }));
vi.mock("./use-admin-users", () => ({
  useAdminRoles: () => ({ data: [], isLoading: false }),
  useAdminUsers: reads.users,
  useDebounced: (value: string) => value,
}));
vi.mock("@/components/shell/data-table", () => ({
  DataTable: ({ toolbar }: { toolbar: React.ReactNode }) => toolbar,
  DataTablePagination: () => null,
}));
vi.mock("@/components/shell/filter-chips", () => ({
  FilterChips: () => null,
  FiltersButton: ({ resultCount }: { resultCount?: number }) => (
    <span data-testid="count">{resultCount === undefined ? "none" : String(resultCount)}</span>
  ),
}));
vi.mock("@/components/shell/columns-button", () => ({ ColumnsButton: () => null }));
import { AdminUsersList } from "./users-list";

it("CNT-U1 the Users filter count is absent while its read failed, and drawn once it answered", () => {
  reads.users.mockReturnValue({
    data: undefined,
    isLoading: false,
    isFetching: false,
    error: new Error("down"),
  });
  const { rerender } = render(<AdminUsersList />);
  expect(screen.getByTestId("count")).toHaveTextContent("none");
  reads.users.mockReturnValue({
    data: { rows: [], totalCount: 7 },
    isLoading: false,
    isFetching: false,
    error: null,
  });
  rerender(<AdminUsersList />);
  expect(screen.getByTestId("count")).toHaveTextContent("7");
});
