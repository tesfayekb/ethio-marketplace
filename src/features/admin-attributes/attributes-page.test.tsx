import { fireEvent, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, expect, it, vi } from "vitest";

type Read = { data?: unknown; isLoading: boolean; error: unknown; refetch: () => void };
const read = (over: Partial<Read> = {}): Read => ({
  data: undefined,
  isLoading: false,
  error: null,
  refetch: vi.fn(),
  ...over,
});
const seen = vi.hoisted(() => ({
  table: vi.fn<(props: Record<string, unknown>) => null>(() => null),
  search: {} as Record<string, string>,
  reads: {} as Record<string, unknown>,
  download: vi.fn(),
}));
vi.mock("@tanstack/react-router", () => ({
  useSearch: () => seen.search,
  useNavigate: () => vi.fn(),
}));
vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, language: "en", has: () => false }),
}));
vi.mock("@/components/shell/data-table", () => ({
  DataTable: seen.table,
  DataTablePagination: () => null,
}));
vi.mock("@/features/admin/admin-context", () => ({
  useAdminShell: () => ({ permissions: ["categories:view"] }),
}));
// INC-1281 — the screens ask useMayCall, which reads the permissions read: the same list as the shell's.
vi.mock("@/features/permissions/usePermissions", async () => {
  const { useAdminShell } = await import("@/features/admin/admin-context");
  return {
    usePermissions: () => ({
      permissions: useAdminShell().permissions,
      loading: false,
      error: null,
    }),
  };
});
vi.mock("@/features/auth/mfa/step-up-gate", () => ({
  StepUpGate: ({ children }: { children: (guard: unknown) => ReactNode }) => (
    <>{children(async (run: () => Promise<void>) => run())}</>
  ),
}));
vi.mock("@/lib/route-client", () => ({ downloadRoute: seen.download }));
vi.mock("@/lib/use-settling", () => ({ useSettling: () => false }));
vi.mock("./use-attribute-label", () => ({
  useAttributeLabel: () => (_id: string, name: string) => name,
}));
vi.mock("./attribute-dialogs", () => ({
  AssignAttributeDialog: () => null,
  AttributeEditorDialog: () => null,
  DeleteAttributeDialog: () => null,
  MergeAttributesDialog: () => null,
  RemoveAttributeCategoryDialog: () => null,
}));
vi.mock("./import-dialog", () => ({ ImportAttributesDialog: () => null }));
vi.mock("@/features/admin-categories/use-categories", () => ({
  useAdminCategories: () => seen.reads["roster"],
}));
vi.mock("./use-attributes", () => ({
  ADMIN_ATTRIBUTES_KEY: ["admin", "attributes"],
  useAdminAttributes: () => seen.reads["attributes"],
  useAttributeCategories: () => seen.reads["usedBy"],
  useAttributeCoverage: () => seen.reads["coverage"],
  useEffectiveCategoryLinks: () => seen.reads["links"],
}));

import { AdminAttributesPage } from "./attributes-page";

const ROW = {
  id: "a1",
  attrKey: "colour",
  nameEn: "Colour",
  attrType: "single_select",
  options: [{ value: "red" }, { value: "blue" }],
};

beforeEach(() => {
  seen.search = {};
  seen.reads = {
    attributes: read({ data: [ROW] }),
    roster: read({ data: [] }),
    usedBy: read({ data: [] }),
    coverage: read({ data: [] }),
    links: read({ data: [] }),
  };
  seen.table.mockClear();
});

const table = () => seen.table.mock.calls.at(-1)?.[0] ?? {};
const cell = (key: string) => {
  const columns = table()["columns"] as Array<{ key: string; cell: (row: unknown) => ReactNode }>;
  const column = columns.find((c) => c.key === key);
  render(<>{column?.cell(ROW)}</>);
};

it("ATPG-1 with a category filter, a failed roster read is the table's failure with its own Retry, never the whole library", () => {
  seen.search = { category: "cars" };
  const roster = read({ error: new TypeError("Failed to fetch") });
  seen.reads["roster"] = roster;
  render(<AdminAttributesPage />);
  expect(table()["error"]).toBe(roster.error);
  (table()["retry"] as () => void)();
  expect(roster.refetch).toHaveBeenCalledTimes(1);
});

it("ATPG-2 a failed Used by read draws one notice with Retry and the cell's failed words, never none", () => {
  const usedBy = read({ error: new TypeError("Failed to fetch") });
  seen.reads["usedBy"] = usedBy;
  render(<AdminAttributesPage />);
  fireEvent.click(screen.getByTestId("attribute-reads-error-retry"));
  expect(usedBy.refetch).toHaveBeenCalledTimes(1);
  cell("usage");
  expect(screen.getByText("prim.state.error")).toBeInTheDocument();
  expect(screen.queryByText("admin.attributes.usage.none")).toBeNull();
});

it("ATPG-3 a failed coverage read draws the cell's failed words, never 0/N", () => {
  seen.reads["coverage"] = read({ error: new Error("down") });
  render(<AdminAttributesPage />);
  cell("coverage");
  expect(screen.getByText("prim.state.error")).toBeInTheDocument();
  expect(screen.queryByText("0/2")).toBeNull();
});

it("ATPG-4 a refused export reads the route's code in the export's words", async () => {
  seen.download.mockResolvedValue({
    kind: "answered",
    status: 403,
    ok: false,
    payload: { error: "forbidden" },
    error: "forbidden",
    detail: null,
    headers: new Headers(),
  });
  render(<AdminAttributesPage />);
  fireEvent.click(screen.getByTestId("attribute-export"));
  expect(await screen.findByTestId("attribute-export-error")).toHaveTextContent("failure.noAccess");
});
