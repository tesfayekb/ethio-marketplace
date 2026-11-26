import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";

vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, language: "en" }),
  shippedCatalogues: () => [],
}));
vi.mock("@tanstack/react-router", () => ({ useNavigate: () => vi.fn() }));
vi.mock("@/features/admin/admin-context", () => ({ useAdminShell: () => ({ permissions: [] }) }));
vi.mock("@/features/auth/mfa/step-up-gate", () => ({
  StepUpGate: ({ children }: { children: (guard: unknown) => React.ReactNode }) =>
    children(vi.fn()),
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
vi.mock("@/components/shell/data-table", () => ({
  DataTable: () => null,
  DataTablePagination: () => null,
}));
vi.mock("./language-picker", () => ({ LanguagePicker: () => null }));
vi.mock("./pseudo-bar", () => ({ PseudoBar: () => null }));
vi.mock("./delete-language-dialog", () => ({ DeleteLanguageDialog: () => null }));
const failed = {
  data: undefined,
  isLoading: false,
  isError: true,
  error: new Error("x"),
  refetch: vi.fn(),
};
const idle = { mutate: vi.fn(), mutateAsync: vi.fn(), isPending: false };
vi.mock("./use-translations", () => ({
  useLanguages: () => failed,
  useTranslationStats: () => failed,
  useEntityTranslationStats: () => failed,
  useSetLanguageFlags: () => idle,
  useSetLanguageOrder: () => idle,
  useSyncUiKeys: () => idle,
  useUpsertLanguage: () => idle,
}));
import { AdminTranslationsLanguagesPage } from "./languages-page";

it("LPG-U1 failed reads draw the three Translations tiles failed, never 0 keys or 0 %", () => {
  render(<AdminTranslationsLanguagesPage />);
  for (const id of ["keys", "languages", "approved"]) {
    const tile = screen.getByTestId(`translations-stat-${id}-failed`);
    expect(tile.textContent ?? "").not.toMatch(/\d|%/);
    expect(screen.getByTestId(`translations-stat-${id}-retry`)).toBeInTheDocument();
    expect(screen.queryByTestId(`translations-stat-${id}`)).toBeNull();
  }
});
