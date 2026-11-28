import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, fireEvent, screen, waitFor, within } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { renderPanel as render } from "@/components/ui/dialog-parts-test-render";
import { en } from "@/i18n/locales/en";
import { am } from "@/i18n/locales/am";
import { ownValue } from "@/lib/own-key";
import type { CountryRow } from "@/features/admin-countries/countries-service";
import type { LocationRow } from "@/features/admin-locations/locations-service";
const state = vi.hoisted(() => ({
  countries: vi.fn(),
  places: vi.fn(),
  permissions: ["countries:view", "locations:view"],
  language: "en",
}));
vi.mock("@/i18n", async (original) => ({
  ...(await original<typeof import("@/i18n")>()),
  useI18n: () => ({
    t: (key: string) => ownValue(state.language === "am" ? am : en, key) ?? key,
    language: state.language,
  }),
}));
vi.mock("@tanstack/react-router", async (original) => ({
  ...(await original<typeof import("@tanstack/react-router")>()),
  Link: ({
    to,
    children,
    ...rest
  }: {
    to: string;
    children: ReactNode;
    className?: string;
    "data-testid"?: string;
  }) => (
    <a href={to} {...rest}>
      {children}
    </a>
  ),
}));
vi.mock("@/features/admin/admin-context", () => ({
  useAdminShell: () => ({ permissions: state.permissions }),
}));
vi.mock("@/features/permissions/usePermissions", () => ({
  usePermissions: () => ({ permissions: state.permissions, loading: false, error: null }),
}));
vi.mock("@/features/admin-countries/countries-service", async (original) => ({
  ...(await original<typeof import("@/features/admin-countries/countries-service")>()),
  listCountries: state.countries,
}));
vi.mock("@/features/admin-locations/locations-service", async (original) => ({
  ...(await original<typeof import("@/features/admin-locations/locations-service")>()),
  listLocations: state.places,
}));
import { LocationsOverview } from "./locations-overview";
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
const place: LocationRow = {
  id: "city-1",
  parentId: null,
  level: "city",
  countryCode: "ET",
  regionId: null,
  cityId: null,
  slug: "city-1",
  nameEn: "City",
  iso: null,
  aliases: [],
  displayOrder: 1,
  centerLat: null,
  centerLng: null,
  isActive: true,
  source: "test",
  path: "City",
  childCount: 0,
  listingCount: 0,
  coverageCount: 0,
  profileDefaultCount: 0,
};
function draw() {
  return render(
    <QueryClientProvider
      client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}
    >
      <LocationsOverview />
    </QueryClientProvider>,
  );
}
beforeEach(() => {
  vi.resetAllMocks();
  state.language = "en";
  state.permissions = ["countries:view", "locations:view"];
  state.countries.mockResolvedValue([country, { ...country, code: "KE", isActive: false }]);
  state.places.mockResolvedValue([
    place,
    { ...place, id: "region", level: "region", isActive: false },
    { ...place, id: "sub", level: "sub_city" },
    { ...place, id: "anchor", level: "country" },
  ]);
});
afterEach(() => cleanup());
it("UFA-62 Markets tile shows open and closed counts only with the countries read permission uf:A21.2", async () => {
  draw();
  const tile = await screen.findByTestId("overview-stat-markets");
  expect(tile).toHaveTextContent(en["admin.overview.markets"]);
  expect(tile).toHaveTextContent("1 · 1");
  expect(tile).toHaveTextContent(en["admin.overview.markets.caption"]);
  expect(state.countries).toHaveBeenCalledTimes(1);
  cleanup();
  state.countries.mockClear();
  state.permissions = ["locations:view"];
  draw();
  await screen.findByTestId("overview-stat-places");
  expect(state.countries).not.toHaveBeenCalled();
  expect(screen.queryByTestId("overview-stat-markets")).toBeNull();
  expect(screen.queryByTestId("overview-stat-markets-loading")).toBeNull();
});
it("UFA-63 Places tile excludes country anchors and shows active, total and every level count uf:A21.3", async () => {
  draw();
  const tile = await screen.findByTestId("overview-stat-places");
  expect(tile).toHaveTextContent(en["admin.overview.places"]);
  expect(tile).toHaveTextContent("2 · 3");
  expect(tile).toHaveTextContent(en["admin.overview.places.caption"]);
  for (const level of ["region", "city", "sub_city"] as const)
    expect(tile).toHaveTextContent(`${en[`admin.locations.level.${level}`]} 1`);
  expect(state.places).toHaveBeenCalledWith("");
});
it("UFA-64 both overview tiles show loading, network failure without numbers and Retry their own read uf:A21.4", async () => {
  state.countries.mockReturnValueOnce(new Promise(() => {}));
  state.places.mockReturnValueOnce(new Promise(() => {}));
  draw();
  for (const id of ["markets", "places"])
    expect(screen.getByTestId(`overview-stat-${id}-loading`)).toHaveTextContent(
      en["prim.state.loading"],
    );
  cleanup();
  for (const id of ["markets", "places"]) {
    state.countries.mockRejectedValueOnce(new TypeError("Failed to fetch"));
    state.places.mockRejectedValueOnce(new TypeError("Failed to fetch"));
    draw();
    const alert = await screen.findByTestId(`overview-stat-${id}-failed`);
    expect(alert).toHaveTextContent(en["failure.network"]);
    expect(alert).not.toHaveTextContent(/\d/);
    const read = id === "markets" ? state.countries : state.places;
    const calls = read.mock.calls.length;
    fireEvent.click(within(alert).getByRole("button", { name: en["common.retry"] }));
    await screen.findByTestId(`overview-stat-${id}`);
    expect(read).toHaveBeenCalledTimes(calls + 1);
    cleanup();
  }
});
it("UFA-65 overview Locations and Countries links have their catalogue names and destinations without following uf:A21.5", async () => {
  draw();
  await screen.findByTestId("overview-stat-markets");
  expect(
    screen.getByRole("link", {
      name: `${en["admin.section.places.title"]}${en["admin.section.places.body"]}`,
    }),
  ).toHaveAttribute("href", "/admin/places");
  expect(
    screen.getByRole("link", {
      name: `${en["admin.section.countries.title"]}${en["admin.section.countries.body"]}`,
    }),
  ).toHaveAttribute("href", "/admin/countries");
});
it("UFA-66 Amharic overview heading, tiles, levels and both links use the Amharic catalogue uf:A21.6", async () => {
  state.language = "am";
  draw();
  expect(screen.getByRole("heading", { name: am["admin.overview.locations.title"] })).toBeVisible();
  const tile = await screen.findByTestId("overview-stat-places");
  expect(tile).toHaveTextContent(am["admin.overview.places"]);
  for (const level of ["region", "city", "sub_city"] as const)
    expect(tile).toHaveTextContent(`${am[`admin.locations.level.${level}`]} 1`);
  expect(await screen.findByTestId("overview-stat-markets")).toHaveTextContent(
    am["admin.overview.markets"],
  );
  expect(
    screen.getByRole("link", {
      name: `${am["admin.section.places.title"]}${am["admin.section.places.body"]}`,
    }),
  ).toHaveAttribute("href", "/admin/places");
  expect(
    screen.getByRole("link", {
      name: `${am["admin.section.countries.title"]}${am["admin.section.countries.body"]}`,
    }),
  ).toHaveAttribute("href", "/admin/countries");
  await waitFor(() => expect(screen.queryByText(en["admin.overview.locations.title"])).toBeNull());
});
