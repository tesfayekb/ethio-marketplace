import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, fireEvent, screen, waitFor, within } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { renderPanel as render } from "@/components/ui/dialog-parts-test-render";
import { tableViewTestShell } from "@/components/shell/table-view-test-shell";
import { forgetTableViewsForTests } from "@/components/shell/table-view-store";
import { en } from "@/i18n/locales/en";
import { ownValue } from "@/lib/own-key";
import { readFailed } from "@/lib/reader-failure";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import type { CategoryRow } from "./categories-service";
const state = vi.hoisted(() => ({
  list: vi.fn(),
  pointers: vi.fn(),
  generate: vi.fn(),
  may: true,
}));
vi.mock("@/i18n", async (original) => ({
  ...(await original<typeof import("@/i18n")>()),
  useI18n: () => ({
    t: (key: string) => ownValue(en, key) ?? key,
    language: "en",
    entities: { map: {}, lang: "en" },
  }),
}));
vi.mock("@tanstack/react-router", async (original) => ({
  ...(await original<typeof import("@tanstack/react-router")>()),
  useNavigate: () => vi.fn(),
  Link: ({ to, children, ...rest }: { to: string; children: ReactNode }) => (
    <a href={to} {...rest}>
      {children}
    </a>
  ),
}));
vi.mock("@/features/permissions/use-may-call", () => ({
  useMayCall: () => ({ mayCall: () => state.may }),
}));
vi.mock("@/features/admin/users/use-admin-users", () => ({
  useCountries: () => ({ data: [], error: null }),
}));
vi.mock("@/features/auth/mfa/step-up-gate", () => ({
  StepUpGate: ({ children }: { children: (guard: GuardFn) => ReactNode }) =>
    children(async (action) => action()),
}));
vi.mock("@/lib/route-client", async (original) => ({
  ...(await original<typeof import("@/lib/route-client")>()),
  downloadRoute: vi.fn(),
  callRoute: vi.fn(),
}));
vi.mock("./categories-service", async (original) => ({
  ...(await original<typeof import("./categories-service")>()),
  listCategories: state.list,
  listCategoryPointers: state.pointers,
}));
vi.mock("./category-images-service", async (original) => ({
  ...(await original<typeof import("./category-images-service")>()),
  generateCategoryImage: state.generate,
}));
import { AdminCategoriesPage } from "./categories-page";
function row(n: number): CategoryRow {
  return {
    id: `cat-${n}`,
    parentId: null,
    slug: `category-${n}`,
    nameEn: `Category ${n}`,
    icon: null,
    displayOrder: n,
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
}
function draw() {
  const Shell = tableViewTestShell("uf2-categories");
  return render(
    <QueryClientProvider
      client={
        new QueryClient({
          defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
        })
      }
    >
      <Shell>
        <AdminCategoriesPage />
      </Shell>
    </QueryClientProvider>,
  );
}
beforeEach(() => {
  vi.resetAllMocks();
  localStorage.clear();
  forgetTableViewsForTests();
  state.may = true;
  state.list.mockResolvedValue([row(1)]);
  state.pointers.mockResolvedValue([]);
  state.generate.mockResolvedValue(undefined);
});
afterEach(() => {
  cleanup();
  localStorage.clear();
  forgetTableViewsForTests();
});
it("UFA-55r INC-1347 refused category read shows refusal words, not generic failure uf:A18.14", async () => {
  state.list.mockRejectedValue(readFailed(new Error("denied"), 403));
  draw();
  const alert = await screen.findByTestId("data-table-error");
  await waitFor(() => expect(alert).toHaveTextContent(en["failure.noAccess"]));
  expect(alert).not.toHaveTextContent(en["failure.server"]);
  expect(screen.queryByTestId("data-table-error-retry")).toBeNull();
});
it("UFA-55 category loading, empty and failed reads show real words and Retry; paths dialog opens uf:A18.14", async () => {
  state.list.mockReturnValueOnce(new Promise(() => {}));
  draw();
  expect(screen.getByRole("status")).toHaveTextContent(en["admin.categories.loading"]);
  cleanup();
  state.list.mockResolvedValueOnce([]);
  draw();
  expect(await screen.findByText(en["admin.categories.empty"])).toBeInTheDocument();
  cleanup();
  state.list.mockRejectedValueOnce(new TypeError("Failed to fetch"));
  draw();
  const alert = await screen.findByTestId("data-table-error");
  expect(alert).toHaveTextContent(en["admin.categories.error"]);
  expect(alert).toHaveTextContent(en["failure.network"]);
  fireEvent.click(within(alert).getByRole("button", { name: en["common.retry"] }));
  await screen.findByTestId("category-row-category-1");
  const menu = within(screen.getByRole("table")).getByTestId("category-actions-category-1-more");
  menu.focus();
  fireEvent.keyDown(menu, { key: "Enter", code: "Enter" });
  const pointer = await screen.findByRole("menuitem", {
    name: en["admin.categories.action.pointer"],
  });
  pointer.focus();
  fireEvent.keyDown(pointer, { key: "Enter", code: "Enter" });
  expect(await screen.findByTestId("category-paths-dialog")).toBeInTheDocument();
  expect(await screen.findByTestId("category-paths-empty")).toHaveTextContent(
    en["admin.categories.paths.empty"],
  );
});
it("UFA-53 category Columns lists and toggles columns; pagination and page size change the drawn rows uf:A18.3", async () => {
  state.list.mockResolvedValue(Array.from({ length: 26 }, (_, n) => row(n + 1)));
  draw();
  await screen.findByTestId("category-row-category-1");
  fireEvent.click(screen.getByTestId("category-columns"));
  const panel = await screen.findByRole("dialog");
  expect(within(panel).getAllByRole("listitem").length).toBeGreaterThan(1);
  const toggle = within(panel)
    .getAllByRole("switch")
    .find((button) => !button.hasAttribute("disabled"));
  if (!toggle) throw new Error("No editable category column");
  const pressed = toggle.getAttribute("aria-checked");
  fireEvent.click(toggle);
  expect(toggle).toHaveAttribute("aria-checked", pressed === "true" ? "false" : "true");
  fireEvent.click(within(panel).getByRole("button", { name: en["prim.table.done"] }));
  fireEvent.click(screen.getByTestId("category-pagination-next"));
  expect(await screen.findByTestId("category-row-category-26")).toBeInTheDocument();
  expect(screen.queryByTestId("category-row-category-1")).toBeNull();
  fireEvent.click(screen.getByTestId("category-pagination-prev"));
  expect(await screen.findByTestId("category-row-category-1")).toBeInTheDocument();
  fireEvent.change(screen.getByTestId("category-pagination-size"), { target: { value: "10" } });
  expect(screen.queryByTestId("category-row-category-11")).toBeNull();
  fireEvent.click(screen.getByTestId("category-pagination-next"));
  expect(screen.getByTestId("category-row-category-11")).toBeInTheDocument();
});
it("UFA-54 bulk image generation draws progress, finishes successes and names failures uf:A18.11", async () => {
  state.list.mockResolvedValue([
    { ...row(1), hasImage: false },
    { ...row(2), hasImage: false },
  ]);
  let release: (() => void) | undefined;
  state.generate
    .mockImplementationOnce(
      () =>
        new Promise<void>((resolve) => {
          release = resolve;
        }),
    )
    .mockRejectedValueOnce(new Error("secret raw generation failure"));
  draw();
  await screen.findByTestId("category-row-category-1");
  fireEvent.click(
    screen.getByRole("button", { name: en["admin.categories.bulk.generateMissing"] }),
  );
  expect(await screen.findByTestId("category-bulk-progress")).toHaveTextContent("0/2");
  if (!release) throw new Error("Generation did not start");
  release();
  expect(await screen.findByTestId("category-bulk-summary")).toHaveTextContent(
    `1 ${en["admin.categories.bulk.generated"]} · 1 ${en["admin.categories.bulk.failed"]}`,
  );
  expect(screen.getByTestId("category-bulk-failures")).toHaveTextContent(
    `category-2: ${en["admin.categories.image.stageLabel"]}`,
  );
  expect(screen.queryByTestId("category-bulk-progress")).toBeNull();
  expect(document.body.textContent).not.toContain("secret raw generation failure");
  expect(state.generate.mock.calls.map((call) => call[0])).toEqual([
    { categoryId: "cat-1" },
    { categoryId: "cat-2" },
  ]);
});
