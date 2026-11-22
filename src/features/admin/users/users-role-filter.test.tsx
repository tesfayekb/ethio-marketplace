import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
const reads = vi.hoisted(() => ({ users: vi.fn() }));
vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => vi.fn(),
  useSearch: () => ({ role: "not-in-roster" }),
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
  FiltersButton: ({
    filters,
  }: {
    filters: import("@/components/shell/table-filters").TableFilter[];
  }) =>
    filters.map((filter) =>
      filter.kind === "select" ? (
        <span key={filter.id}>
          {filter.options.map((option) => (
            <span key={option.value}>{option.label}</span>
          ))}
        </span>
      ) : null,
    ),
}));
vi.mock("@/components/shell/columns-button", () => ({ ColumnsButton: () => null }));
import { AdminUsersList } from "./users-list";
it("FP-U41 an address role missing from the roster is shown by its raw name and sent to the reader", () => {
  reads.users.mockReturnValue({
    data: undefined,
    isLoading: false,
    isFetching: false,
    error: null,
  });
  render(<AdminUsersList />);
  expect(screen.getByText("not-in-roster")).toBeInTheDocument();
  expect(reads.users).toHaveBeenLastCalledWith(
    expect.objectContaining({ role: "not-in-roster" }),
    true,
  );
});
