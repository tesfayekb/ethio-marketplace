import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, fireEvent, screen, within } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { renderPanel as render } from "@/components/ui/dialog-parts-test-render";
import { tableViewTestShell } from "@/components/shell/table-view-test-shell";
import { forgetTableViewsForTests } from "@/components/shell/table-view-store";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { en } from "@/i18n/locales/en";
import { ownValue } from "@/lib/own-key";
import type { CountryRow } from "./countries-service";
import type { CategoryRow } from "@/features/admin-categories/categories-service";
const state = vi.hoisted(() => ({ list: vi.fn(), roots: vi.fn(), guard: vi.fn() }));
vi.mock("@/i18n", async (original) => ({
  ...(await original<typeof import("@/i18n")>()),
  useI18n: () => ({ t: (key: string) => ownValue(en, key) ?? key, language: "en" }),
}));
vi.mock("@/features/permissions/usePermissions", () => ({
  usePermissions: () => ({ permissions: ["countries:view"], loading: false, error: null }),
}));
vi.mock("@/features/auth/mfa/step-up-gate", () => ({
  StepUpGate: ({ children }: { children: (guard: GuardFn) => ReactNode }) => children(state.guard),
}));
vi.mock("./countries-service", async (original) => ({
  ...(await original<typeof import("./countries-service")>()),
  listCountries: state.list,
}));
vi.mock("@/features/admin-categories/categories-service", async (original) => ({
  ...(await original<typeof import("@/features/admin-categories/categories-service")>()),
  listCategories: state.roots,
}));
vi.mock("@/lib/route-client", async (original) => ({
  ...(await original<typeof import("@/lib/route-client")>()),
  downloadRoute: vi.fn(),
}));
import { AdminCountriesPage } from "./countries-page";
import { CountryRailOrderDialog } from "./country-verb-dialogs";
const country: CountryRow = {
  code: "ET",
  nameEn: "Ethiopia",
  isActive: true,
  unitSystem: "metric",
  currencyCode: "ETB",
  displayOrder: 1,
  updatedAt: "2026-10-21T00:00:00Z",
  anchorId: null,
  anchorActive: false,
  placeCount: 0,
  activePlaceCount: 0,
  scopedRoleCount: 0,
  rootOrder: [],
};
const root: CategoryRow = {
  id: "cat-1",
  parentId: null,
  slug: "vehicles",
  nameEn: "Vehicles",
  icon: null,
  displayOrder: 1,
  isActive: true,
  isCatchall: false,
  allowListings: true,
  priceEnabled: true,
  expiryDays: null,
  visibleFrom: null,
  visibleUntil: null,
  listingCount: 0,
  exclusionCount: 0,
  excludedCountryCodes: [],
  hasImage: true,
  attributeCount: 0,
  cardAttributeCount: 0,
  secondaryParentNames: [],
};
function draw(rail = false) {
  const Shell = tableViewTestShell("uf2-countries");
  return render(
    <QueryClientProvider
      client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}
    >
      <Shell>
        {rail ? (
          <CountryRailOrderDialog row={country} guard={state.guard} onClose={vi.fn()} />
        ) : (
          <AdminCountriesPage />
        )}
      </Shell>
    </QueryClientProvider>,
  );
}
beforeEach(() => {
  vi.resetAllMocks();
  localStorage.clear();
  forgetTableViewsForTests();
  state.list.mockResolvedValue([]);
  state.roots.mockResolvedValue([root]);
  state.guard.mockImplementation(async (action: () => Promise<unknown>) => action());
});
afterEach(() => {
  cleanup();
  localStorage.clear();
  forgetTableViewsForTests();
});
it("UFA-69 rail root read shows loading, failure with Retry, empty and only active roots uf:A23.7", async () => {
  state.roots.mockReturnValueOnce(new Promise(() => {}));
  draw(true);
  expect(await screen.findByText(en["admin.countries.loading"])).toBeVisible();
  expect(screen.getByRole("button", { name: en["admin.countries.rail.submit"] })).toBeDisabled();
  cleanup();
  state.roots.mockRejectedValueOnce(new TypeError("Failed to fetch"));
  state.roots.mockResolvedValueOnce([]);
  draw(true);
  const alert = await screen.findByTestId("country-rail-failed");
  expect(alert).toHaveTextContent(en["failure.network"]);
  const calls = state.roots.mock.calls.length;
  fireEvent.click(within(alert).getByRole("button", { name: en["common.retry"] }));
  expect(await screen.findByTestId("country-rail-empty")).toHaveTextContent(
    en["admin.countries.rail.empty"],
  );
  expect(state.roots).toHaveBeenCalledTimes(calls + 1);
  cleanup();
  state.roots.mockResolvedValue([
    root,
    { ...root, id: "child", parentId: root.id, slug: "child", nameEn: "Child" },
    { ...root, id: "retired", slug: "retired", nameEn: "Retired", isActive: false },
  ]);
  draw(true);
  expect(await screen.findByTestId("country-rail-cat-1")).toHaveTextContent("1. Vehicles");
  expect(screen.queryByTestId("country-rail-child")).toBeNull();
  expect(screen.queryByTestId("country-rail-retired")).toBeNull();
  expect(state.guard).not.toHaveBeenCalled();
});
it("UFA-70 countries roster shows loading, failure with its words and Retry to the empty answer uf:A23.10", async () => {
  state.list.mockReturnValueOnce(new Promise(() => {}));
  draw();
  expect(await screen.findByTestId("data-table-loading")).toHaveTextContent(
    en["admin.countries.loading"],
  );
  cleanup();
  state.list.mockRejectedValueOnce(new TypeError("Failed to fetch"));
  draw();
  const alert = await screen.findByTestId("data-table-error");
  expect(alert).toHaveTextContent(en["admin.countries.error"]);
  expect(alert).toHaveTextContent(en["failure.network"]);
  const calls = state.list.mock.calls.length;
  fireEvent.click(within(alert).getByRole("button", { name: en["common.retry"] }));
  expect(await screen.findByTestId("data-table-empty")).toHaveTextContent(
    en["admin.countries.empty"],
  );
  expect(state.list).toHaveBeenCalledTimes(calls + 1);
});
