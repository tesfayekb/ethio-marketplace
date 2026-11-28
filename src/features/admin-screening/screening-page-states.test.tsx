import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, fireEvent, screen, waitFor, within } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { renderPanel as render } from "@/components/ui/dialog-parts-test-render";
import { en } from "@/i18n/locales/en";
import { am } from "@/i18n/locales/am";
import { ownValue } from "@/lib/own-key";
import { readFailed } from "@/lib/reader-failure";
import { forgetTableViewsForTests } from "@/components/shell/table-view-store";
import { tableViewTestShell } from "@/components/shell/table-view-test-shell";
import type { ScreeningRow } from "./use-screening";
const state = vi.hoisted(() => ({
  list: vi.fn(),
  decide: vi.fn(),
  guard: vi.fn(),
  language: "en" as "en" | "am",
  may: true,
}));
vi.mock("@/i18n", async (original) => ({
  ...(await original<typeof import("@/i18n")>()),
  useI18n: () => ({
    t: (key: string) => ownValue(state.language === "am" ? am : en, key) ?? key,
    language: state.language,
    entities: { map: {}, lang: state.language },
    has: () => true,
  }),
}));
vi.mock("@/lib/error-report", () => ({ reportBrowserFailure: vi.fn() }));
vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => vi.fn(),
  Link: ({ children }: { children: ReactNode }) => <span>{children}</span>,
}));
vi.mock("@/features/admin/admin-context", () => ({ useAdminShell: () => ({ permissions: [] }) }));
vi.mock("@/features/permissions/use-may-call", () => ({
  useMayCall: () => ({
    mayCall: ({ door }: { door: string }) => state.may && door === "admin_review_listing",
  }),
}));
vi.mock("@/features/auth/mfa/step-up-gate", () => ({
  StepUpGate: ({ children }: { children: (guard: unknown) => ReactNode }) => children(state.guard),
}));
vi.mock("@/lib/refresh-after-write", () => ({ refreshAfterWrite: vi.fn() }));
vi.mock("@/components/shell/location-data", () => ({
  useOpenMarkets: () => ({ markets: [], isLoading: false }),
}));
vi.mock("@/features/levels/use-level-rows", () => ({
  useLevelRows: () => ({ rows: [], isLoading: false }),
}));
vi.mock("@/features/categories/category-tree", () => ({
  useCategoryTree: () => ({ tree: [] }),
  nearestCategoryPicture: () => null,
}));
vi.mock("@/features/posting/use-photo-links", () => ({ usePhotoLinks: () => ({}) }));
vi.mock("@/features/posting/use-price-unit-labels", () => ({ usePriceUnitLabels: () => null }));
vi.mock("./use-name-checks", async (original) => ({
  ...(await original<typeof import("./use-name-checks")>()),
  useNameQueue: () => ({ data: { rows: [], next: null }, error: null }),
  useJobLine: () => ({ isLoading: true }),
}));
vi.mock("./use-photo-reviews", async (original) => ({
  ...(await original<typeof import("./use-photo-reviews")>()),
  usePhotoReviews: () => ({ data: [], error: null, isLoading: false }),
}));
vi.mock("./use-photo-changes", async (original) => ({
  ...(await original<typeof import("./use-photo-changes")>()),
  usePhotoChanges: () => ({ data: [], error: null, isLoading: false }),
  useWarnedListings: () => ({ data: new Set(), error: null }),
}));
vi.mock("./use-screening", async (original) => {
  const { useQuery } = await import("@tanstack/react-query");
  return {
    ...(await original<typeof import("./use-screening")>()),
    decideListing: state.decide,
    useScreeningQueue: (
      page: number,
      search: string,
      size: number,
      filters: unknown,
      ready: boolean,
    ) =>
      useQuery({
        queryKey: ["uf-screening", page, search, size, filters],
        queryFn: () => state.list(page, search, size, filters),
        retry: false,
        enabled: ready,
      }),
    useScreeningPhotos: () => ({ data: [], isLoading: false, error: null }),
    useScreeningFacts: () => ({ data: null }),
    useScreeningSchema: () => ({ data: null }),
    useNameCheckSummary: () => ({ isLoading: true }),
  };
});
import { AdminScreeningPage } from "./screening-page";
import { decisionRefusalKey } from "./use-screening";

// Fixture copied from screening-decisions.test.tsx; no database rows authored.
const held = {
  id: "l-1",
  countryCode: "ET",
  tier: null,
  title: "Fridge",
  description: "Cold",
  categoryId: "c-1",
  locationId: "p-1",
  priceMode: "fixed",
  priceAmount: 1500,
  priceCurrency: "ETB",
  pricePeriod: "once",
  priceBp: null,
  priceNegotiable: false,
  priceUnit: null,
  priceUnitText: null,
  attributes: { colour: "red" },
  photosSoon: false,
  updatedAt: "2026-10-16T00:00:00Z",
  category: { name_en: "Fridges", name_am: null },
  place: { name_en: "Bole", name_am: null },
  sellerAlias: null,
  sellerBusinessName: null,
  sellerEmail: null,
} satisfies import("./use-screening").ScreeningRow;
function draw() {
  return render(
    <QueryClientProvider
      client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}
    >
      <AdminScreeningPage />
    </QueryClientProvider>,
    { wrapper: tableViewTestShell("screening-uf2") },
  );
}
beforeEach(() => {
  state.list.mockReset();
  state.decide.mockReset();
  state.guard.mockReset();
  state.language = "en";
  state.may = true;
  state.guard.mockImplementation(async (run: () => Promise<void>) => run());
  localStorage.clear();
  forgetTableViewsForTests();
});
afterEach(cleanup);
async function assertDecisionRefusal(code: string) {
  state.list.mockResolvedValue({ rows: [held], total: 1 });
  const refusal = new Error(code);
  state.decide.mockReset().mockRejectedValue(refusal);
  draw();
  await screen.findByTestId(`admin-screening-row-${held.id}`);
  const menu = screen.getAllByRole("button", {
    name: `${en["prim.table.actions"]} — ${held.title}`,
  })[0];
  if (!menu) throw new Error("Missing screening actions");
  menu.focus();
  fireEvent.keyDown(menu, { key: "Enter", code: "Enter" });
  const approve = await screen.findByRole("menuitem", { name: en["admin.screening.approve"] });
  approve.focus();
  fireEvent.keyDown(approve, { key: "Enter", code: "Enter" });
  await screen.findByTestId("admin-screening-confirm-go");
  expect(state.decide).not.toHaveBeenCalled();
  fireEvent.click(screen.getByTestId("admin-screening-confirm-go"));
  expect(await screen.findByTestId("admin-screening-confirm-problem")).toHaveTextContent(
    en[decisionRefusalKey(refusal)],
  );
  expect(state.decide).toHaveBeenCalledWith(held.id, "active", null);
}
it("UFA-22a listingNotFound decision refusal shows its shared-reader words uf:A8.4", async () => {
  await assertDecisionRefusal("listingNotFound");
});
it("UFA-22b ownListing decision refusal shows its shared-reader words uf:A8.4", async () => {
  await assertDecisionRefusal("ownListing");
});
it("UFA-22c illegalTransition decision refusal shows its shared-reader words uf:A8.4", async () => {
  await assertDecisionRefusal("illegalTransition");
});
it("UFA-22d severeRestore decision refusal shows its shared-reader words uf:A8.4", async () => {
  await assertDecisionRefusal("severeRestore");
});
it("UFA-22e rateLimited decision refusal shows its shared-reader words uf:A8.4", async () => {
  await assertDecisionRefusal("rateLimited");
});
it("UFA-22f permissionDenied decision refusal shows its shared-reader words uf:A8.4", async () => {
  await assertDecisionRefusal("permissionDenied");
});
it("UFA-22g noteRequired decision refusal shows its shared-reader words uf:A8.4", async () => {
  await assertDecisionRefusal("noteRequired");
});
it("UFA-22h noteTooLong decision refusal shows its shared-reader words uf:A8.4", async () => {
  await assertDecisionRefusal("noteTooLong");
});
it("UFA-22i noFreeSlot decision refusal shows its shared-reader words uf:A8.4", async () => {
  await assertDecisionRefusal("noFreeSlot");
});
it("UFA-22j badValue:status decision refusal shows its shared-reader words uf:A8.4", async () => {
  await assertDecisionRefusal("badValue:status");
});
it("UFA-23 queue loading, empty, failed words and Retry reread, then pager reads the next page uf:A8.10", async () => {
  state.list.mockReturnValue(new Promise<unknown>(() => {}));
  draw();
  expect(await screen.findByTestId("data-table-loading")).toHaveTextContent(en["common.loading"]);
  cleanup();
  forgetTableViewsForTests();
  state.list.mockReset().mockResolvedValue({ rows: [], total: 0 });
  draw();
  expect(await screen.findByTestId("admin-screening-empty")).toHaveTextContent(
    en["admin.screening.empty"],
  );
  cleanup();
  forgetTableViewsForTests();
  const failure = readFailed(new Error("boom"), 503);
  state.list
    .mockReset()
    .mockRejectedValueOnce(failure)
    .mockResolvedValue({ rows: [held], total: 100 });
  draw();
  const notice = await screen.findByTestId("data-table-error");
  expect(notice).toHaveTextContent(en[decisionRefusalKey(failure)]);
  expect(notice).toHaveTextContent(en["failure.server"]);
  fireEvent.click(within(notice).getByRole("button", { name: en["common.retry"] }));
  await screen.findByTestId(`admin-screening-row-${held.id}`);
  expect(state.list).toHaveBeenCalledTimes(2);
  fireEvent.click(
    within(screen.getByTestId("admin-screening-pagination")).getByRole("button", {
      name: en["prim.table.next"],
    }),
  );
  await waitFor(() =>
    expect(state.list).toHaveBeenLastCalledWith(1, "", expect.any(Number), expect.any(Object)),
  );
});
it("UFA-24 screening's heading, search and empty section words are Amharic, not English uf:A8.12", async () => {
  state.language = "am";
  state.list.mockResolvedValue({ rows: [], total: 0 });
  draw();
  await screen.findByTestId("admin-screening-empty");
  expect(screen.getByRole("textbox", { name: am["admin.screening.search"] })).toBeInTheDocument();
  expect(screen.queryByRole("textbox", { name: en["admin.screening.search"] })).toBeNull();
  for (const key of [
    "admin.section.screening.title",
    "admin.screening.empty",
    "admin.screening.reviews.empty",
    "admin.screening.changes.empty",
  ] as const) {
    expect(screen.getAllByText(am[key]).length).toBeGreaterThan(0);
    expect(screen.queryByText(en[key])).toBeNull();
  }
});
