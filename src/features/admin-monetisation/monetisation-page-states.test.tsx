import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, fireEvent, screen, waitFor, within } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { renderPanel as render } from "@/components/ui/dialog-parts-test-render";
import { tableViewTestShell } from "@/components/shell/table-view-test-shell";
import { forgetTableViewsForTests } from "@/components/shell/table-view-store";
import { en } from "@/i18n/locales/en";
import { ownValue } from "@/lib/own-key";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import type { MonetisationConsole, PriceRow, ProductRow } from "./monetisation-service";
const state = vi.hoisted(() => ({
  list: vi.fn(),
  save: vi.fn(),
  guard: vi.fn(),
  permissions: ["packages:view", "packages:update"],
}));
vi.mock("@/i18n", async (original) => ({
  ...(await original<typeof import("@/i18n")>()),
  useI18n: () => ({ t: (key: string) => ownValue(en, key) ?? key, language: "en" }),
}));
vi.mock("@tanstack/react-router", async (original) => ({
  ...(await original<typeof import("@tanstack/react-router")>()),
  useNavigate: () => vi.fn(),
  Link: ({ to, children }: { to: string; children: ReactNode }) => <a href={to}>{children}</a>,
  useLocation: ({ select }: { select: (location: { hash: string }) => string }) =>
    select({ hash: "" }),
}));
vi.mock("@/lib/route-client", async (original) => ({
  ...(await original<typeof import("@/lib/route-client")>()),
  callRoute: vi.fn(),
  downloadRoute: vi.fn(),
}));
vi.mock("@/features/permissions/usePermissions", () => ({
  usePermissions: () => ({ permissions: state.permissions, loading: false, error: null }),
}));
vi.mock("@/features/auth/mfa/step-up-gate", () => ({
  StepUpGate: ({ children }: { children: (guard: GuardFn) => ReactNode }) => children(state.guard),
}));
vi.mock("./monetisation-service", async (original) => ({
  ...(await original<typeof import("./monetisation-service")>()),
  listMonetisation: state.list,
  saveProduct: state.save,
}));
vi.mock("./use-monetisation-names", () => ({
  useMonetisationNames: (products: ProductRow[]) => ({
    marketName: (code: string | null) => code ?? "Every market",
    categoryName: (id: string | null) => id ?? "Every category",
    scopeParts: (code: string | null, id: string | null) => ({
      market: code ?? "Every market",
      category: id ?? "Every category",
    }),
    scopeOf: (row: { countryCode: string | null; categoryId: string | null }) =>
      `${row.countryCode ?? "Every market"} · ${row.categoryId ?? "Every category"}`,
    productName: (key: string) => products.find((product) => product.key === key)?.nameEn ?? key,
    markets: [],
    tree: { roots: [], byId: new Map() },
  }),
}));
import { AdminMonetisationPage } from "./monetisation-page";
const attribution = {
  createdByName: "Abebe",
  updatedByName: "Sara",
  updatedAt: "2026-11-03T09:00:00+00:00",
};
const product: ProductRow = {
  ...attribution,
  key: "featured",
  kind: "level",
  nameEn: "Featured",
  nameAm: null,
  days: 30,
  maxPhotos: 10,
  placement: "boost",
  badge: true,
  maxCities: null,
  maxRegions: null,
  maxCountries: null,
  enabled: true,
  selfServe: true,
  extendsLifetime: false,
  sort: 2,
};
const consoleData: MonetisationConsole = {
  markets: [
    {
      ...attribution,
      id: "m1",
      countryCode: null,
      freeRegularAds: 3,
      includedReach: "city",
      paidLevels: false,
      launchCredits: null,
      launchDays: null,
      paidLevelsSince: null,
    },
  ],
  products: [
    product,
    {
      ...product,
      key: "country",
      kind: "reach",
      nameEn: "Country",
      maxPhotos: null,
      placement: null,
      badge: false,
      maxCountries: 1,
      sort: 1,
    },
  ],
  overrides: [],
  prices: [],
};
function price(n: number): PriceRow {
  return {
    ...attribution,
    id: `p${n}`,
    packageKey: "featured",
    countryCode: n === 26 ? "KE" : null,
    categoryId: n === 26 ? "cars" : null,
    amount: 100,
    currency: "USD",
    creditCost: 2,
    validFrom: "2026-11-01T00:00:00Z",
    validTo: null,
    usedCount: 0,
  };
}
function draw() {
  const Shell = tableViewTestShell("uf2-monetisation");
  return render(
    <QueryClientProvider
      client={
        new QueryClient({
          defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
        })
      }
    >
      <Shell>
        <AdminMonetisationPage />
      </Shell>
    </QueryClientProvider>,
  );
}
beforeEach(() => {
  vi.resetAllMocks();
  localStorage.clear();
  forgetTableViewsForTests();
  state.permissions = ["packages:view", "packages:update"];
  state.list.mockResolvedValue(consoleData);
  state.save.mockResolvedValue(undefined);
  state.guard.mockImplementation(async (action: () => Promise<unknown>) => action());
});
afterEach(() => {
  cleanup();
  localStorage.clear();
  forgetTableViewsForTests();
});
it("UFA-71 product prices search by scope and currency, Columns toggle and next, previous and page size change rows uf:A25.7", async () => {
  state.list.mockResolvedValue({
    ...consoleData,
    prices: Array.from({ length: 26 }, (_, n) => price(n + 1)),
  });
  draw();
  const level = await screen.findByTestId("monetisation-levels");
  const levelTable = await within(level).findByRole("table");
  fireEvent.click(within(levelTable).getByTestId("product-featured-open"));
  const frame = within(levelTable).getByTestId("product-featured-prices");
  const table = within(frame).getByRole("table");
  expect(within(table).getByTestId("price-p1")).toBeVisible();
  expect(within(table).queryByTestId("price-p26")).toBeNull();
  fireEvent.click(within(frame).getByTestId("product-featured-prices-pagination-next"));
  expect(within(table).getByTestId("price-p26")).toBeVisible();
  fireEvent.click(within(frame).getByTestId("product-featured-prices-pagination-prev"));
  expect(within(table).getByTestId("price-p1")).toBeVisible();
  fireEvent.change(within(frame).getByTestId("product-featured-prices-pagination-size"), {
    target: { value: "50" },
  });
  expect(within(table).getByTestId("price-p26")).toBeVisible();
  const search = within(frame).getByRole("textbox", {
    name: en["admin.monetisation.prices.searchLabel"],
  });
  fireEvent.change(search, { target: { value: "cars" } });
  expect(within(table).getByTestId("price-p26")).toBeVisible();
  expect(within(table).queryByTestId("price-p1")).toBeNull();
  fireEvent.change(search, { target: { value: "KE" } });
  expect(within(table).getByTestId("price-p26")).toBeVisible();
  fireEvent.change(search, { target: { value: "USD" } });
  expect(within(table).getByTestId("price-p1")).toBeVisible();
  fireEvent.click(within(frame).getByTestId("product-featured-prices-columns"));
  const panel = await screen.findByRole("dialog");
  for (const key of [
    "admin.monetisation.col.scope",
    "admin.packages.prices.col.amount",
    "admin.monetisation.col.creditCost",
    "admin.packages.prices.col.from",
    "admin.packages.prices.col.to",
    "admin.monetisation.col.used",
  ] as const)
    expect(within(panel).getByText(en[key])).toBeVisible();
  const toggle = within(panel).getByRole("switch", { name: en["admin.monetisation.col.used"] });
  fireEvent.click(toggle);
  expect(toggle).toHaveAttribute("aria-checked", "false");
  fireEvent.click(within(panel).getByRole("button", { name: en["prim.table.done"] }));
  expect(
    within(table).queryByRole("columnheader", { name: en["admin.monetisation.col.used"] }),
  ).toBeNull();
});
it("UFA-72 unmapped product save shows generic catalogue words and no raw refusal text after step-up uf:A25.9", async () => {
  state.save.mockRejectedValue({ code: "P0001", message: "unmapped-private-product-detail" });
  draw();
  const level = await screen.findByTestId("monetisation-levels");
  const table = await within(level).findByRole("table");
  fireEvent.click(within(table).getByTestId("product-actions-featured-edit"));
  const save = await screen.findByRole("button", { name: en["common.save"] });
  save.focus();
  fireEvent.keyDown(save, { key: "Enter", code: "Enter" });
  fireEvent.click(save, { detail: 0 });
  expect(await screen.findByTestId("monetisation-level-edit-error")).toHaveTextContent(
    en["admin.packages.error.unknown"],
  );
  expect(screen.queryByTestId("monetisation-level-edit-error-reason")).toBeNull();
  expect(document.body).not.toHaveTextContent("unmapped-private-product-detail");
  expect(state.guard).toHaveBeenCalledTimes(1);
  expect(state.save).toHaveBeenCalledTimes(1);
  expect(state.guard.mock.invocationCallOrder[0]).toBeLessThan(
    state.save.mock.invocationCallOrder[0] ?? 0,
  );
  expect(screen.getByRole("button", { name: en["common.save"] })).toBeEnabled();
  cleanup();
  state.permissions = ["packages:view"];
  draw();
  const readOnly = await within(await screen.findByTestId("monetisation-levels")).findByRole(
    "table",
  );
  expect(within(readOnly).queryByTestId("product-actions-featured-edit")).toBeNull();
});
it("UFA-73 markets, levels and reach show loading, empty and failed catalogue states with Retry uf:A25.10", async () => {
  state.list.mockReturnValueOnce(new Promise(() => {}));
  draw();
  for (const id of ["markets", "levels", "reach"]) {
    const frame = screen.getByTestId(`monetisation-${id}`);
    expect(within(frame).getByTestId("data-table-loading")).toHaveTextContent(
      en["admin.monetisation.loading"],
    );
    expect(within(frame).queryByTestId("data-table-empty")).toBeNull();
  }
  cleanup();
  state.list.mockRejectedValueOnce(new TypeError("Failed to fetch"));
  draw();
  const frames = ["markets", "levels", "reach"].map((id) =>
    screen.getByTestId(`monetisation-${id}`),
  );
  for (const frame of frames) {
    const alert = await within(frame).findByTestId("data-table-error");
    expect(alert).toHaveTextContent(en["admin.monetisation.error"]);
    expect(alert).toHaveTextContent(en["failure.network"]);
    expect(within(frame).queryByTestId("data-table-empty")).toBeNull();
    expect(within(alert).getByRole("button", { name: en["common.retry"] })).toBeVisible();
  }
  state.list.mockResolvedValueOnce({ markets: [], products: [], prices: [], overrides: [] });
  const first = frames[0];
  if (!first) throw new Error("Missing markets section");
  const calls = state.list.mock.calls.length;
  fireEvent.click(within(first).getByRole("button", { name: en["common.retry"] }));
  await waitFor(() => expect(state.list).toHaveBeenCalledTimes(calls + 1));
  for (const [id, key] of [
    ["markets", "admin.monetisation.empty.marketsWhy"],
    ["levels", "admin.monetisation.empty.levelsWhy"],
    ["reach", "admin.monetisation.empty.reachWhy"],
  ] as const)
    expect(await screen.findByTestId(`monetisation-${id}-empty`)).toHaveTextContent(en[key]);
});
