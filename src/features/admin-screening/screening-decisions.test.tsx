import { renderPanel as render } from "@/components/ui/dialog-parts-test-render";
import { fireEvent, screen, waitFor, within } from "@testing-library/react";
import type { ComponentProps, ReactNode } from "react";
import { beforeEach, expect, it, vi } from "vitest";
import { AdminScreeningPage } from "./screening-page";
import { StepUpCancelled, StepUpUnavailable } from "@/features/auth/mfa/use-step-up";

const seams = vi.hoisted(() => ({
  decide: vi.fn(),
  refresh: vi.fn(),
  abort: null as string | null,
  rows: [] as import("./use-screening").ScreeningRow[],
  photoRead: {
    data: [] as { id: string }[] | undefined,
    error: null as Error | null,
    isLoading: false,
  },
  subject: vi.fn(),
}));
vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, language: "en", entities: {} }),
}));
vi.mock("@tanstack/react-router", () => ({ useNavigate: () => vi.fn(), Link: () => null }));
vi.mock("@tanstack/react-query", async (original) => ({
  ...(await original<typeof import("@tanstack/react-query")>()),
  useQueryClient: () => ({}),
}));
vi.mock("@/lib/refresh-after-write", () => ({ refreshAfterWrite: seams.refresh }));
vi.mock("@/features/admin/admin-context", () => ({
  useAdminShell: () => ({ permissions: ["listings:review"] }),
}));
vi.mock("@/features/auth/mfa/step-up-gate", () => ({
  StepUpGate: ({
    children,
  }: {
    children: (guard: <T>(action: () => Promise<T>) => Promise<T>) => ReactNode;
  }) =>
    children(async (action) => {
      if (seams.abort === "StepUpCancelled") throw new StepUpCancelled();
      if (seams.abort === "StepUpUnavailable") throw new StepUpUnavailable();
      return action();
    }),
}));
vi.mock("@/components/shell/location-data", () => ({ useOpenMarkets: () => ({ markets: [] }) }));
vi.mock("@/features/levels/use-level-rows", () => ({ useLevelRows: () => ({ rows: [] }) }));
vi.mock("@/features/categories/category-tree", () => ({
  useCategoryTree: () => ({ tree: [] }),
  nearestCategoryPicture: () => "https://example.test/category.jpg",
}));
vi.mock("@/features/posting/use-photo-links", () => ({
  usePhotoLinks: (photos: { id: string }[]) =>
    Object.fromEntries(
      photos.map((photo) => [photo.id, { thumb: `https://example.test/${photo.id}.jpg` }]),
    ),
}));
vi.mock("@/components/ui/dialog-parts-facade", async (original) => {
  const real = await original<typeof import("@/components/ui/dialog-parts-facade")>();
  return {
    ...real,
    PanelSubject: (props: ComponentProps<typeof real.PanelSubject>) => {
      seams.subject(props);
      return <real.PanelSubject {...props} />;
    },
  };
});
vi.mock("@/features/posting/use-price-unit-labels", () => ({ usePriceUnitLabels: () => [] }));
vi.mock("@/features/posting/preview/preview-sheet", () => ({ PreviewSheet: () => null }));
vi.mock("@/features/admin-listings/listing-photos", () => ({ ListingPhotos: () => null }));
vi.mock("./name-checks", () => ({ NameChecks: () => null }));
vi.mock("./photo-changes", () => ({ PhotoChanges: () => null }));
vi.mock("./photo-reviews", () => ({ PhotoReviews: () => null }));
vi.mock("./use-photo-changes", () => ({ useWarnedListings: () => ({ data: new Set() }) }));
vi.mock("./use-screening", async (original) => ({
  ...(await original<typeof import("./use-screening")>()),
  decideListing: seams.decide,
  useScreeningQueue: () => ({
    data: { rows: seams.rows, total: seams.rows.length },
    error: null,
    isLoading: false,
  }),
  useScreeningPhotos: () => seams.photoRead,
  useScreeningFacts: () => ({ data: null }),
  useScreeningSchema: () => ({ data: null }),
  useNameCheckSummary: () => ({ isLoading: true }),
}));
// The table seam drives selected keys without inventing listing rows or a database fixture.
vi.mock("@/components/shell/data-table", () => ({
  DataTable: ({
    selection,
    selectionActions,
  }: {
    selection: { selectedKeys: string[]; onToggleRow: (row: { id: string }, on: boolean) => void };
    selectionActions: ReactNode;
  }) => (
    <div>
      {["first", "refused", "last"].map((id) => (
        <input
          key={id}
          type="checkbox"
          aria-label={id}
          checked={selection.selectedKeys.includes(id)}
          onChange={(event) => selection.onToggleRow({ id }, event.target.checked)}
        />
      ))}
      {selectionActions}
    </div>
  ),
  DataTablePagination: () => null,
}));

beforeEach(() => {
  seams.decide.mockReset();
  seams.refresh.mockReset();
  seams.abort = null;
  seams.rows = [];
  seams.photoRead = { data: [], error: null, isLoading: false };
  seams.subject.mockClear();
});
function open(ids: string[]) {
  render(<AdminScreeningPage />);
  for (const id of ids) fireEvent.click(screen.getByRole("checkbox", { name: id }));
  fireEvent.click(screen.getByTestId("admin-screening-bulk-approve"));
  fireEvent.click(screen.getByTestId("admin-screening-confirm-go"));
}

it("SDR-7 a refused decision stays in its open dialog, not the page notice; Cancel closes it", async () => {
  seams.decide.mockRejectedValue({ message: "ownListing" });
  open(["refused"]);
  const problem = await screen.findByTestId("admin-screening-confirm-problem");
  expect(problem).toHaveTextContent("admin.screening.error.ownListing");
  expect(within(screen.getByTestId("admin-screening-confirm")).getByRole("alert")).toBe(problem);
  expect(screen.getByTestId("admin-screening-notice")).toBeEmptyDOMElement();
  await waitFor(() => expect(seams.refresh).toHaveBeenCalledTimes(1));
  fireEvent.click(
    within(screen.getByTestId("admin-screening-confirm")).getByRole("button", {
      name: "common.cancel",
    }),
  );
  await waitFor(() => expect(screen.queryByTestId("admin-screening-confirm")).toBeNull());
});

it("SDR-8 bulk stops at the refusal, keeping only the undecided suffix; retry does not repeat the decided prefix", async () => {
  seams.decide.mockResolvedValueOnce(undefined).mockRejectedValueOnce({ message: "rateLimited" });
  open(["first", "refused", "last"]);
  await screen.findByTestId("admin-screening-confirm-problem");
  expect(seams.decide.mock.calls).toEqual([
    ["first", "active"],
    ["refused", "active"],
  ]);
  expect(screen.getByRole("checkbox", { name: "first", hidden: true })).not.toBeChecked();
  expect(screen.getByRole("checkbox", { name: "refused", hidden: true })).toBeChecked();
  expect(screen.getByRole("checkbox", { name: "last", hidden: true })).toBeChecked();
  seams.decide.mockResolvedValue(undefined);
  fireEvent.click(screen.getByTestId("admin-screening-confirm-go"));
  await waitFor(() =>
    expect(screen.getByTestId("admin-screening-notice")).toHaveTextContent(
      "admin.screening.approved",
    ),
  );
  expect(seams.decide.mock.calls.slice(2)).toEqual([
    ["refused", "active"],
    ["last", "active"],
  ]);
  expect(screen.queryByTestId("admin-screening-confirm")).toBeNull();
});

it("SDR-9 no second factor is said in the dialog without calling the door", async () => {
  seams.abort = "StepUpUnavailable";
  open(["refused"]);
  expect(await screen.findByTestId("admin-screening-confirm-problem")).toHaveTextContent(
    "mfa.stepUpUnavailableHint",
  );
  expect(seams.decide).not.toHaveBeenCalled();
});

it("SDR-10 cancelling step-up leaves the decision open silently and writes nothing", async () => {
  seams.abort = "StepUpCancelled";
  open(["refused"]);
  await waitFor(() => expect(seams.refresh).toHaveBeenCalledTimes(1));
  expect(screen.getByTestId("admin-screening-confirm")).toBeVisible();
  expect(screen.queryByTestId("admin-screening-confirm-problem")).toBeNull();
  expect(seams.decide).not.toHaveBeenCalled();
});

// Held row copied by script from use-screening.test.ts SF-5, not a database write.
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

function ask(ids: string[]) {
  render(<AdminScreeningPage />);
  for (const id of ids) fireEvent.click(screen.getByRole("checkbox", { name: id }));
  fireEvent.click(screen.getByTestId("admin-screening-bulk-approve"));
}

it("DP-U25 several held ads make one counted subject with three held titles", () => {
  seams.rows = ["first", "refused", "last"].map((id) => ({ ...held, id }));
  ask(["first", "refused", "last"]);
  expect(seams.subject).toHaveBeenLastCalledWith(
    expect.objectContaining({
      title: "3 prim.table.selected",
      lines: [held.title, held.title, held.title],
    }),
  );
});

it.each([
  ["unanswered", undefined, null, false, 0],
  ["loading", [], null, true, 0],
  ["failed", [], new Error("offline"), false, 0],
  ["empty", [], null, false, 1],
  ["one", [{ id: "first" }], null, false, 1],
  ["two", [{ id: "first" }, { id: "refused" }], null, false, 2],
  ["three", [{ id: "first" }, { id: "refused" }, { id: "last" }], null, false, 3],
] as const)(
  "DP-U26 the %s photos state never substitutes a category picture for a pending or failed read",
  (_name, data, error, isLoading, count) => {
    seams.rows = [{ ...held, id: "first" }];
    seams.photoRead = { data: data === undefined ? undefined : [...data], error, isLoading };
    ask(["first"]);
    const panel = screen.getByTestId("admin-screening-confirm");
    expect(panel.querySelectorAll("[data-picture-frame]")).toHaveLength(count);
    const pictures = Array.from(panel.querySelectorAll("img"), (image) =>
      image.getAttribute("src"),
    );
    expect(pictures).toEqual(
      count === 0
        ? []
        : data?.length === 0
          ? ["https://example.test/category.jpg"]
          : (data ?? []).map((photo) => `https://example.test/${photo.id}.jpg`),
    );
    if (error !== null)
      expect(seams.subject).toHaveBeenLastCalledWith(
        expect.objectContaining({ picture: undefined }),
      );
  },
);
