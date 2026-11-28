import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, fireEvent, screen, waitFor, within } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { renderPanel as render } from "@/components/ui/dialog-parts-test-render";
import { tableViewTestShell } from "@/components/shell/table-view-test-shell";
import { forgetTableViewsForTests } from "@/components/shell/table-view-store";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { en } from "@/i18n/locales/en";
import { ownValue } from "@/lib/own-key";
import type { LocationRow } from "./locations-service";
const state = vi.hoisted(() => ({ list: vi.fn(), countries: vi.fn() }));
vi.mock("@/i18n", async (original) => ({
  ...(await original<typeof import("@/i18n")>()),
  useI18n: () => ({ t: (key: string) => ownValue(en, key) ?? key, language: "en" }),
}));
vi.mock("@/features/permissions/usePermissions", () => ({
  usePermissions: () => ({ permissions: ["locations:view"], loading: false, error: null }),
}));
vi.mock("@/features/auth/mfa/step-up-gate", () => ({
  StepUpGate: ({ children }: { children: (guard: GuardFn) => ReactNode }) =>
    children(async (action) => action()),
}));
vi.mock("./locations-service", async (original) => ({
  ...(await original<typeof import("./locations-service")>()),
  listLocations: state.list,
  listAllCountries: state.countries,
}));
vi.mock("@/lib/route-client", async (original) => ({
  ...(await original<typeof import("@/lib/route-client")>()),
  downloadRoute: vi.fn(),
}));
import { AdminLocationsPage } from "./locations-page";
const place: LocationRow = {
  id: "city-1",
  parentId: null,
  level: "city",
  countryCode: "ET",
  regionId: null,
  cityId: null,
  slug: "city-1",
  nameEn: "City 1",
  iso: null,
  aliases: [],
  displayOrder: 1,
  centerLat: null,
  centerLng: null,
  isActive: true,
  source: "test",
  path: "City 1",
  childCount: 0,
  listingCount: 0,
  coverageCount: 0,
  profileDefaultCount: 0,
};
function draw() {
  const Shell = tableViewTestShell("uf2-places");
  return render(
    <QueryClientProvider
      client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}
    >
      <Shell>
        <AdminLocationsPage />
      </Shell>
    </QueryClientProvider>,
  );
}
beforeEach(() => {
  vi.resetAllMocks();
  localStorage.clear();
  forgetTableViewsForTests();
  state.list.mockResolvedValue([]);
  state.countries.mockResolvedValue([]);
});
afterEach(() => {
  cleanup();
  localStorage.clear();
  forgetTableViewsForTests();
});
it("UFA-67 places Columns lists and toggles a column, next and previous pages and page size change drawn rows uf:A22.3", async () => {
  state.list.mockResolvedValue(
    Array.from({ length: 26 }, (_, n) => ({
      ...place,
      id: `city-${n + 1}`,
      slug: `city-${n + 1}`,
      nameEn: `City ${n + 1}`,
      displayOrder: n + 1,
    })),
  );
  draw();
  const table = await screen.findByRole("table");
  expect(table).toHaveTextContent("City 1");
  expect(table).not.toHaveTextContent("City 26");
  fireEvent.click(screen.getByTestId("location-columns"));
  const panel = await screen.findByRole("dialog");
  const option = within(panel).getByRole("switch", { name: en["admin.locations.col.path"] });
  expect(option).toHaveAttribute("aria-checked", "true");
  fireEvent.click(option);
  expect(option).toHaveAttribute("aria-checked", "false");
  fireEvent.keyDown(panel, { key: "Escape" });
  expect(
    within(table).queryByRole("columnheader", { name: en["admin.locations.col.path"] }),
  ).toBeNull();
  fireEvent.click(screen.getByTestId("location-pagination-next"));
  await waitFor(() => expect(table).toHaveTextContent("City 26"));
  expect(table).not.toHaveTextContent("City 1");
  fireEvent.click(screen.getByTestId("location-pagination-prev"));
  await waitFor(() => expect(table).toHaveTextContent("City 1"));
  fireEvent.change(screen.getByTestId("location-pagination-size"), { target: { value: "50" } });
  await waitFor(() => expect(table).toHaveTextContent("City 26"));
  expect(state.list).toHaveBeenCalledTimes(1);
});
it("UFA-68 places roster loads, fails with its words and Retry recovers the empty caption uf:A22.11", async () => {
  state.list.mockReturnValueOnce(new Promise(() => {}));
  draw();
  expect(await screen.findByTestId("data-table-loading")).toHaveTextContent(
    en["admin.locations.loading"],
  );
  cleanup();
  state.list.mockRejectedValueOnce(new TypeError("Failed to fetch"));
  draw();
  const alert = await screen.findByTestId("data-table-error");
  expect(alert).toHaveTextContent(en["admin.locations.error"]);
  expect(alert).toHaveTextContent(en["failure.network"]);
  const calls = state.list.mock.calls.length;
  fireEvent.click(within(alert).getByRole("button", { name: en["common.retry"] }));
  expect(await screen.findByTestId("data-table-empty")).toHaveTextContent(
    en["admin.locations.empty"],
  );
  expect(state.list).toHaveBeenCalledTimes(calls + 1);
});
