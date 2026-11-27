import { render } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { tableViewTestShell } from "@/components/shell/table-view-test-shell";
import { forgetTableViewsForTests } from "@/components/shell/table-view-store";
import type { TableFilter } from "@/components/shell/table-filters";

const seams = vi.hoisted(() => ({
  stats: { data: undefined, isSuccess: false, isError: true, isPending: false } as {
    data: unknown;
    isSuccess: boolean;
    isError: boolean;
    isPending: boolean;
  },
  bulk: vi.fn(),
  pager: vi.fn(),
  filters: vi.fn(),
  idle: () => ({ data: undefined, isLoading: false, isSuccess: false, error: null }),
  mutation: () => ({ mutateAsync: () => Promise.resolve(), isPending: false }),
}));
vi.mock("@/i18n", () => ({ useI18n: () => ({ t: (key: string) => key, language: "en" }) }));
vi.mock("@tanstack/react-router", () => ({ useNavigate: () => vi.fn(), Link: () => null }));
vi.mock("@/features/admin/admin-context", () => ({
  useAdminShell: () => ({ permissions: ["translations:machine", "translations:manage"] }),
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
  StepUpGate: ({ children }: { children: (guard: unknown) => ReactNode }) => children(vi.fn()),
}));
vi.mock("./use-translations", async (original) => ({
  ...(await original<typeof import("./use-translations")>()),
  useAiTranslate: seams.mutation,
  useLanguages: () => ({
    data: [
      {
        code: "xx",
        nameEn: "Test",
        nameNative: "Test",
        rtl: false,
        isBase: false,
        enabledAdmin: true,
        enabledPublic: false,
        sort: 1,
      },
    ],
    isLoading: false,
    isSuccess: true,
    error: null,
  }),
  useMyTranslatorLanguages: seams.idle,
  useSaveTranslation: seams.mutation,
  useSetKeyContext: seams.mutation,
  useTranslationStatusAction: seams.mutation,
  useUsageMap: seams.idle,
  useEntityTranslationStats: seams.idle,
  useTranslations: () => ({
    data: { rows: [], totalCount: 7 },
    isLoading: false,
    isSuccess: false,
    error: null,
  }),
  useTranslationStats: () => seams.stats,
}));
vi.mock("./ai-bulk-bar", () => ({
  AiBulkBar: (props: unknown) => {
    seams.bulk(props);
    return null;
  },
}));
vi.mock("./approve-bar", () => ({ ApproveAllBar: () => null }));
vi.mock("./transfer-bar", () => ({ TransferBar: () => null }));
vi.mock("./history-drawer", () => ({ HistoryDrawer: () => null }));
vi.mock("@/components/shell/filter-chips", () => ({
  FilterChips: () => null,
  FiltersButton: (props: { filters: readonly TableFilter[] }) => {
    seams.filters(props.filters);
    return null;
  },
}));
vi.mock("@/components/shell/data-table", () => ({
  DataTable: ({ toolbar, pagination }: { toolbar?: ReactNode; pagination?: ReactNode }) => (
    <div>
      {toolbar}
      {pagination}
    </div>
  ),
  DataTablePagination: (props: { total: number | undefined }) => {
    seams.pager(props);
    return null;
  },
}));
import { AdminTranslationsStringsPage } from "./strings-page";

beforeEach(() => {
  seams.stats = { data: undefined, isSuccess: false, isError: true, isPending: false };
  seams.bulk.mockClear();
  seams.pager.mockClear();
  seams.filters.mockClear();
});
afterEach(() => {
  localStorage.clear();
  forgetTableViewsForTests();
});

function lastOptionLabels(): string[] {
  const last = seams.filters.mock.calls.at(-1)?.[0] as readonly TableFilter[] | undefined;
  const status = last?.find((filter) => filter.id === "strings-status-filter");
  return status?.kind === "select" ? status.options.map((option) => option.label) : [];
}

it("ORPH-U1 a failed stats read draws no count: the orphaned and status choices are names alone, the bulk bar is told, the pager has no total", () => {
  render(<AdminTranslationsStringsPage lang="xx" search={{}} />, {
    wrapper: tableViewTestShell("strings-counts"),
  });
  const labels = lastOptionLabels();
  expect(labels).toContain("admin.translations.orphaned.label");
  for (const label of labels) expect(label).not.toMatch(/ · /);
  expect(seams.bulk).toHaveBeenCalled();
  expect(seams.bulk.mock.calls.at(-1)?.[0]).toMatchObject({ countState: "error" });
  for (const [props] of seams.pager.mock.calls) expect(props.total).toBeUndefined();
});
