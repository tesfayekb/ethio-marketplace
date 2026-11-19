import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import type { DataTableColumn } from "@/components/shell/data-table";
import type { LanguageRow } from "./translations-service";

const { calls, row } = vi.hoisted(() => ({
  calls: { upsert: vi.fn(), remove: vi.fn() },
  row: {
    code: "zxy-l6",
    nameEn: "Scratch language",
    nameNative: "Scratch name",
    rtl: false,
    isBase: false,
    enabledAdmin: false,
    enabledPublic: false,
    sort: 0,
  },
}));
vi.mock("@/i18n", () => ({
  useI18n: () => ({
    t: (key: string) => {
      if (key === "admin.translations.switch.admin") return "Available to staff";
      if (key === "admin.translations.switch.public") return "Published to visitors";
      return key;
    },
    language: "en",
  }),
  shippedCatalogues: vi.fn(),
}));
vi.mock("@tanstack/react-router", () => ({ useNavigate: () => vi.fn() }));
vi.mock("@/features/admin/admin-context", () => ({
  useAdminShell: () => ({ permissions: ["translations:manage"] }),
}));
vi.mock("@/features/admin/users/use-admin-users", () => ({
  useCountries: () => ({ data: [], isLoading: false }),
}));
vi.mock("@/features/auth/mfa/step-up-gate", () => ({
  StepUpGate: ({
    children,
  }: {
    children: (guard: (run: () => Promise<unknown>) => Promise<unknown>) => ReactNode;
  }) => children(async (run) => run()),
}));
vi.mock("@/components/shell/data-table", () => ({
  DataTable: ({
    columns,
    rows,
  }: {
    columns: DataTableColumn<LanguageRow>[];
    rows: LanguageRow[];
  }) => (
    <table>
      <tbody>
        {rows.map((entry) => (
          <tr key={entry.code} data-testid={`lang-row-${entry.code}`}>
            {columns.map((column) => (
              <td key={column.key}>{column.cell(entry)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
  DataTablePagination: () => null,
}));
vi.mock("./pseudo-bar", () => ({ PseudoBar: () => null }));
vi.mock("./use-translations", () => ({
  useLanguages: () => ({ data: [row], isLoading: false, error: null }),
  useTranslationStats: () => ({ data: [], isLoading: false }),
  useEntityTranslationStats: () => ({ data: [], isLoading: false }),
  useSetLanguageFlags: () => ({ mutateAsync: vi.fn(), isPending: false }),
  useSetLanguageOrder: () => ({ mutateAsync: vi.fn(), isPending: false }),
  useSyncUiKeys: () => ({ mutateAsync: vi.fn(), isPending: false }),
  useUpsertLanguage: () => ({ mutateAsync: calls.upsert, isPending: false }),
  useProviderLanguages: () => ({ data: [], isLoading: false, error: null }),
  useLanguageDeletePreview: () => ({
    data: { uiRows: 0, entityRows: 0, revisions: 0, assignments: 0 },
    isPending: false,
    isError: false,
  }),
  useDeleteLanguage: () => ({ mutateAsync: calls.remove, isPending: false }),
}));

import { AdminTranslationsLanguagesPage } from "./languages-page";
import { DeleteLanguageDialog } from "./delete-language-dialog";

const open = () => {
  render(
    <QueryClientProvider client={new QueryClient()}>
      <AdminTranslationsLanguagesPage />
    </QueryClientProvider>,
  );
  fireEvent.click(screen.getByTestId("translations-add-manual"));
};

describe("language form gates", () => {
  it.each([
    ["LTC-1", "admin", "Available to staff"],
    ["LTC-2", "public", "Published to visitors"],
  ])(
    "%s the %s switch retains its accessible name without a visible duplicate",
    (_id, flag, name) => {
      render(
        <QueryClientProvider client={new QueryClient()}>
          <AdminTranslationsLanguagesPage />
        </QueryClientProvider>,
      );
      const control = screen.getByRole("switch", { name });
      expect(control).toBe(screen.getByTestId(`lang-${flag}-${row.code}`));
      expect(control.id).toBe(`lang-${flag}-${row.code}`);
      const field = control.closest("[data-form-field]");
      expect(field?.querySelector("label .sr-only")?.textContent).toBe(name);
      expect(screen.getByTestId(`lang-row-${row.code}`)).toContainElement(control);
      expect(screen.getByTestId(`lang-public-gate-${row.code}`)).toBeInTheDocument();
      expect(screen.getByTestId(`lang-coverage-${row.code}`)).toBeInTheDocument();
      expect(screen.getByTestId(`lang-data-coverage-${row.code}`)).toBeInTheDocument();
    },
  );

  it("KFC2-6 blank language names hold the write until both are answered", async () => {
    calls.upsert.mockResolvedValue(undefined);
    open();
    fireEvent.change(screen.getByTestId("translations-add-code"), { target: { value: "zxy-l6" } });
    fireEvent.click(screen.getByTestId("translations-add-submit"));
    expect(calls.upsert).not.toHaveBeenCalled();
    expect(screen.getByTestId("translations-add-name-en").getAttribute("aria-invalid")).toBe(
      "true",
    );
    expect(screen.getByTestId("translations-add-name-native").getAttribute("aria-invalid")).toBe(
      "true",
    );
    fireEvent.change(screen.getByTestId("translations-add-name-en"), {
      target: { value: "Scratch language" },
    });
    fireEvent.change(screen.getByTestId("translations-add-name-native"), {
      target: { value: "Scratch name" },
    });
    fireEvent.click(screen.getByTestId("translations-add-submit"));
    await waitFor(() =>
      expect(calls.upsert).toHaveBeenCalledWith({
        code: "zxy-l6",
        nameEn: "Scratch language",
        nameNative: "Scratch name",
        rtl: false,
        countryCodes: [],
      }),
    );
  });

  it("KFC2-7 a blank language code holds the write", () => {
    calls.upsert.mockClear();
    open();
    fireEvent.change(screen.getByTestId("translations-add-name-en"), {
      target: { value: "Scratch language" },
    });
    fireEvent.change(screen.getByTestId("translations-add-name-native"), {
      target: { value: "Scratch name" },
    });
    fireEvent.click(screen.getByTestId("translations-add-submit"));
    expect(calls.upsert).not.toHaveBeenCalled();
    expect(screen.getByTestId("translations-add-code").getAttribute("aria-invalid")).toBe("true");
  });

  it("KFC2-8 deletion stays disarmed for blank or mismatched confirmation", async () => {
    calls.remove.mockResolvedValue({ uiRows: 0, entityRows: 0, revisions: 0, assignments: 0 });
    const onClose = vi.fn();
    render(
      <DeleteLanguageDialog
        row={{
          code: "zxy-l6",
          nameEn: "Scratch language",
          nameNative: "Scratch name",
          rtl: false,
          isBase: false,
          enabledAdmin: false,
          enabledPublic: false,
          sort: 0,
        }}
        guard={async (run) => run()}
        onClose={onClose}
        onDeleted={vi.fn()}
      />,
    );
    const submit = screen.getByTestId("lang-delete-submit-zxy-l6");
    expect((submit as HTMLButtonElement).disabled).toBe(true);
    fireEvent.change(screen.getByTestId("lang-delete-confirm-zxy-l6"), {
      target: { value: "wrong" },
    });
    expect((submit as HTMLButtonElement).disabled).toBe(true);
    expect(calls.remove).not.toHaveBeenCalled();
    fireEvent.change(screen.getByTestId("lang-delete-confirm-zxy-l6"), {
      target: { value: "zxy-l6" },
    });
    fireEvent.click(submit);
    await waitFor(() => expect(onClose).toHaveBeenCalledTimes(1));
    expect(calls.remove).toHaveBeenCalledWith("zxy-l6");
  });
});
