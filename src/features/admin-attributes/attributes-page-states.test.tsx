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
import type { AttributeRow, EffectiveLink } from "./attributes-service";
import type { CategoryRow } from "@/features/admin-categories/categories-service";
const state = vi.hoisted(() => ({
  list: vi.fn(),
  roster: vi.fn(),
  used: vi.fn(),
  coverage: vi.fn(),
  effective: vi.fn(),
  links: vi.fn(),
  navigate: vi.fn(),
  search: {} as { category?: string },
}));
vi.mock("@/i18n", async (original) => ({
  ...(await original<typeof import("@/i18n")>()),
  useI18n: () => ({ t: (key: string) => ownValue(en, key) ?? key, language: "en" }),
}));
vi.mock("@tanstack/react-router", async (original) => ({
  ...(await original<typeof import("@tanstack/react-router")>()),
  useNavigate: () => state.navigate,
  useSearch: () => state.search,
}));
vi.mock("@/lib/route-client", async (original) => ({
  ...(await original<typeof import("@/lib/route-client")>()),
  callRoute: vi.fn(),
  downloadRoute: vi.fn(),
}));
vi.mock("@/features/permissions/usePermissions", () => ({
  usePermissions: () => ({ permissions: ["categories:view"], loading: false, error: null }),
}));
vi.mock("@/features/auth/mfa/step-up-gate", () => ({
  StepUpGate: ({ children }: { children: (guard: GuardFn) => ReactNode }) =>
    children(async (work) => work()),
}));
vi.mock("./use-attribute-label", () => ({
  useAttributeLabel: () => (_id: string, name: string) => name,
}));
vi.mock("./attributes-service", async (original) => ({
  ...(await original<typeof import("./attributes-service")>()),
  listAttributes: state.list,
  listOptionCoverage: state.coverage,
  listAttributeCategories: state.used,
  listEffectiveCategoryLinks: state.effective,
  listCategoryLinks: state.links,
}));
vi.mock("@/features/admin-categories/categories-service", async (original) => ({
  ...(await original<typeof import("@/features/admin-categories/categories-service")>()),
  listCategories: state.roster,
}));
import { AdminAttributesPage } from "./attributes-page";
import { CategoryAttributesDialog } from "./category-attributes-dialog";
const row: AttributeRow = {
  id: "a1",
  attrKey: "colour",
  nameEn: "Colour",
  attrType: "single_select",
  options: [
    { value: "red", labelEn: "Red", labelAm: "", parent: "" },
    { value: "blue", labelEn: "Blue", labelAm: "", parent: "" },
  ],
  helpTextEn: null,
  usageCount: 0,
  dependsOnKey: null,
  helpTextAm: null,
  unit: null,
  unitAm: null,
  minBound: null,
  maxBound: null,
  decimals: null,
  format: null,
  preset: null,
  maxLength: null,
};
const category: CategoryRow = {
  id: "cat-1",
  parentId: null,
  slug: "cars",
  nameEn: "Cars",
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
const effective: EffectiveLink = {
  linkId: "link-1",
  attributeId: row.id,
  attrKey: row.attrKey,
  nameEn: row.nameEn,
  attrType: row.attrType,
  options: row.options,
  isRequired: false,
  isFilterable: false,
  displayOrder: 1,
  cardRank: null,
  factRank: null,
  dependsOnKey: null,
  allowedOptions: null,
  defaultValue: null,
  visibleWhen: null,
  inherited: false,
  originId: category.id,
  originSlug: category.slug,
  originNameEn: category.nameEn,
};
function draw(manager = false) {
  const Shell = tableViewTestShell("uf2-attributes");
  return render(
    <QueryClientProvider
      client={
        new QueryClient({
          defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
        })
      }
    >
      <Shell>
        {manager ? (
          <CategoryAttributesDialog
            categoryId={category.id}
            categoryName={category.nameEn}
            guard={async (work) => work()}
            onClose={vi.fn()}
          />
        ) : (
          <AdminAttributesPage />
        )}
      </Shell>
    </QueryClientProvider>,
  );
}
beforeEach(() => {
  vi.resetAllMocks();
  localStorage.clear();
  forgetTableViewsForTests();
  state.search = {};
  state.list.mockResolvedValue([row]);
  state.roster.mockResolvedValue([category]);
  state.used.mockResolvedValue([]);
  state.coverage.mockResolvedValue([
    { attributeId: row.id, attrKey: row.attrKey, total: 2, withAm: 1 },
  ]);
  state.effective.mockResolvedValue([effective]);
  state.links.mockResolvedValue([]);
});
afterEach(() => {
  cleanup();
  localStorage.clear();
  forgetTableViewsForTests();
});
it("UFA-56 coverage column shows returned counts and incomplete tooltip; failed and loading coverage never shows zero uf:A19.2", async () => {
  draw();
  const table = await screen.findByRole("table");
  const cell = await within(table).findByTestId("attribute-coverage-colour");
  expect(cell).toHaveTextContent("1/2");
  expect(cell).toHaveAttribute("data-incomplete", "true");
  expect(cell).toHaveAttribute(
    "title",
    en["admin.attributes.coverage.tooltip"].replace("{count}", "1").replace("{total}", "2"),
  );
  cleanup();
  state.coverage.mockReturnValueOnce(new Promise(() => {}));
  draw();
  const loadingTable = await screen.findByRole("table");
  expect(within(loadingTable).getByText(en["prim.state.loading"])).toBeVisible();
  expect(within(loadingTable).queryByTestId("attribute-coverage-colour")).toBeNull();
  cleanup();
  state.coverage.mockRejectedValueOnce(new TypeError("Failed to fetch"));
  draw();
  const alert = await screen.findByTestId("attribute-reads-error");
  expect(alert).toHaveTextContent(en["failure.network"]);
  const failedTable = screen.getByRole("table");
  expect(within(failedTable).getByText(en["prim.state.error"])).toBeVisible();
  expect(within(failedTable).queryByText("0/2")).toBeNull();
  fireEvent.click(within(alert).getByRole("button", { name: en["common.retry"] }));
  expect(await within(failedTable).findByTestId("attribute-coverage-colour")).toHaveTextContent(
    "1/2",
  );
});
it("UFA-57 attribute search narrows names and keys; category choices and Clear send the URL scope uf:A19.3", async () => {
  state.search = { category: "cars" };
  state.roster.mockResolvedValue([
    category,
    { ...category, id: "cat-2", slug: "boats", nameEn: "Boats", displayOrder: 2 },
  ]);
  state.list.mockResolvedValue([
    row,
    { ...row, id: "a2", attrKey: "doors", nameEn: "Doors", attrType: "number", options: [] },
  ]);
  state.effective.mockResolvedValue([effective, { ...effective, attributeId: "a2" }]);
  draw();
  const table = await screen.findByRole("table");
  await within(table).findByTestId("attribute-name-colour");
  const search = screen.getByRole("textbox", { name: en["admin.attributes.searchPlaceholder"] });
  fireEvent.change(search, { target: { value: "Colour" } });
  expect(within(table).getByTestId("attribute-name-colour")).toBeVisible();
  expect(within(table).queryByTestId("attribute-name-doors")).toBeNull();
  fireEvent.change(search, { target: { value: "doors" } });
  expect(within(table).getByTestId("attribute-name-doors")).toBeVisible();
  expect(within(table).queryByTestId("attribute-name-colour")).toBeNull();
  fireEvent.change(search, { target: { value: "" } });
  expect(within(table).getByTestId("attribute-name-colour")).toBeVisible();
  const picker = screen.getByRole("combobox", { name: en["admin.attributes.filter.category"] });
  expect(within(picker).getByRole("option", { name: "Cars" })).toHaveValue("cars");
  expect(within(picker).getByRole("option", { name: "Boats" })).toHaveValue("boats");
  fireEvent.change(picker, { target: { value: "boats" } });
  expect(state.navigate).toHaveBeenLastCalledWith({ search: { category: "boats" } });
  fireEvent.change(picker, { target: { value: "" } });
  expect(state.navigate).toHaveBeenLastCalledWith({ search: {} });
  const clear = screen.getByRole("button", { name: en["admin.attributes.filter.clear"] });
  clear.focus();
  fireEvent.keyDown(clear, { key: "Enter", code: "Enter" });
  fireEvent.click(clear, { detail: 0 });
  expect(state.navigate).toHaveBeenLastCalledWith({ search: {} });
  expect(state.effective).toHaveBeenCalledWith("cat-1");
});
it("UFA-59 attribute roster and category link manager show loading, empty and failed states with their own Retry uf:A19.14", async () => {
  state.list.mockReturnValueOnce(new Promise(() => {}));
  draw();
  expect(screen.getByTestId("data-table-loading")).toHaveTextContent(
    en["admin.attributes.loading"],
  );
  expect(screen.queryByTestId("attribute-empty")).toBeNull();
  cleanup();
  state.list.mockRejectedValueOnce(new TypeError("Failed to fetch"));
  state.list.mockResolvedValueOnce([]);
  draw();
  const alert = await screen.findByTestId("data-table-error");
  expect(alert).toHaveTextContent(en["admin.attributes.error"]);
  expect(alert).toHaveTextContent(en["failure.network"]);
  fireEvent.click(within(alert).getByRole("button", { name: en["common.retry"] }));
  expect(await screen.findByTestId("attribute-empty")).toHaveTextContent(
    en["admin.attributes.empty"],
  );
  cleanup();
  state.links.mockReturnValueOnce(new Promise(() => {}));
  draw(true);
  expect(await screen.findByText(en["common.loading"])).toBeVisible();
  expect(screen.queryByTestId("category-attributes-empty")).toBeNull();
  cleanup();
  state.links.mockRejectedValueOnce(new TypeError("Failed to fetch"));
  draw(true);
  const managerAlert = await screen.findByTestId("category-attributes-links-error");
  expect(managerAlert).toHaveTextContent(en["admin.attributes.links.error"]);
  expect(managerAlert).toHaveTextContent(en["failure.network"]);
  const calls = state.links.mock.calls.length;
  fireEvent.click(within(managerAlert).getByRole("button", { name: en["common.retry"] }));
  expect(await screen.findByTestId("category-attributes-empty")).toHaveTextContent(
    en["admin.attributes.links.empty"],
  );
  expect(state.links).toHaveBeenCalledTimes(calls + 1);
  expect(state.links).toHaveBeenLastCalledWith("cat-1");
});
it("UFA-60 category roster and effective links fail the scoped table; Used by fails its cells; each Retry rereads its own source uf:A19.15", async () => {
  state.search = { category: "cars" };
  state.roster.mockReturnValueOnce(new Promise(() => {}));
  draw();
  expect(screen.getByTestId("data-table-loading")).toHaveTextContent(
    en["admin.attributes.loading"],
  );
  cleanup();
  state.roster.mockRejectedValueOnce(new TypeError("Failed to fetch"));
  draw();
  const rosterAlert = await screen.findByTestId("data-table-error");
  expect(rosterAlert).toHaveTextContent(en["failure.network"]);
  expect(screen.queryByTestId("attribute-empty")).toBeNull();
  const rosterCalls = state.roster.mock.calls.length;
  fireEvent.click(within(rosterAlert).getByRole("button", { name: en["common.retry"] }));
  await screen.findByTestId("attribute-row-colour");
  expect(state.roster).toHaveBeenCalledTimes(rosterCalls + 1);
  cleanup();
  state.effective.mockReturnValueOnce(new Promise(() => {}));
  const beforeLoading = state.effective.mock.calls.length;
  draw();
  await waitFor(() => expect(state.effective).toHaveBeenCalledTimes(beforeLoading + 1));
  expect(screen.getByTestId("data-table-loading")).toHaveTextContent(
    en["admin.attributes.loading"],
  );
  cleanup();
  state.effective.mockRejectedValueOnce(new TypeError("Failed to fetch"));
  state.effective.mockResolvedValueOnce([]);
  draw();
  const linksAlert = await screen.findByTestId("data-table-error");
  expect(linksAlert).toHaveTextContent(en["failure.network"]);
  const linkCalls = state.effective.mock.calls.length;
  fireEvent.click(within(linksAlert).getByRole("button", { name: en["common.retry"] }));
  expect(await screen.findByTestId("attribute-empty")).toHaveTextContent(
    en["admin.attributes.filter.empty"],
  );
  expect(state.effective).toHaveBeenCalledTimes(linkCalls + 1);
  cleanup();
  state.search = {};
  state.used.mockReturnValueOnce(new Promise(() => {}));
  draw();
  const loadingTable = await screen.findByRole("table");
  expect(within(loadingTable).getByText(en["prim.state.loading"])).toBeVisible();
  expect(within(loadingTable).queryByText(en["admin.attributes.usage.none"])).toBeNull();
  cleanup();
  state.used.mockRejectedValueOnce(new TypeError("Failed to fetch"));
  state.used.mockResolvedValueOnce([
    {
      linkId: "link-1",
      attributeId: row.id,
      categoryId: category.id,
      categorySlug: "cars",
      nameEn: "Cars",
      isActive: true,
    },
  ]);
  draw();
  const cellsAlert = await screen.findByTestId("attribute-reads-error");
  expect(cellsAlert).toHaveTextContent(en["failure.network"]);
  const failedTable = screen.getByRole("table");
  expect(within(failedTable).getByText(en["prim.state.error"])).toBeVisible();
  expect(within(failedTable).queryByText(en["admin.attributes.usage.none"])).toBeNull();
  const usedCalls = state.used.mock.calls.length;
  const coverageCalls = state.coverage.mock.calls.length;
  fireEvent.click(within(cellsAlert).getByRole("button", { name: en["common.retry"] }));
  expect(await within(failedTable).findByTestId("attribute-usedby-colour-cars")).toHaveTextContent(
    "Cars",
  );
  expect(state.used).toHaveBeenCalledTimes(usedCalls + 1);
  expect(state.coverage).toHaveBeenCalledTimes(coverageCalls);
});
