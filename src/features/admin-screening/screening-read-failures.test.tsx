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
type Read = { error: unknown; refetch: () => void };
const reads = vi.hoisted(() => ({
  summary: { error: null, refetch: () => undefined } as Read,
  queue: { error: null, refetch: () => undefined } as Read,
  reviews: { error: null, refetch: () => undefined } as Read,
  changes: { error: null, refetch: () => undefined } as Read,
  job: { error: null, refetch: () => undefined } as Read,
  warned: { error: null, refetch: () => undefined } as Read,
}));
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
vi.mock("@/features/admin/admin-context", () => ({
  useAdminShell: () => ({ permissions: ["listings:view"] }),
}));
vi.mock("@/features/permissions/use-may-call", () => ({
  useMayCall: () => ({
    mayCall: () => state.may,
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
  useNameQueue: () => ({
    data: reads.queue.error === null ? { rows: [], next: null } : undefined,
    isLoading: false,
    error: reads.queue.error,
    refetch: reads.queue.refetch,
  }),
  useJobLine: () => ({
    isLoading: false,
    data: reads.job.error === null ? { kind: "fine" } : undefined,
    error: reads.job.error,
    refetch: reads.job.refetch,
  }),
}));
vi.mock("./use-photo-reviews", async (original) => ({
  ...(await original<typeof import("./use-photo-reviews")>()),
  usePhotoReviews: () => ({
    data: [],
    error: reads.reviews.error,
    isLoading: false,
    refetch: reads.reviews.refetch,
  }),
}));
vi.mock("./use-photo-changes", async (original) => ({
  ...(await original<typeof import("./use-photo-changes")>()),
  usePhotoChanges: () => ({
    data: [],
    error: reads.changes.error,
    isLoading: false,
    refetch: reads.changes.refetch,
  }),
  useWarnedListings: () => ({
    data: new Set(),
    error: reads.warned.error,
    refetch: reads.warned.refetch,
  }),
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
    useNameCheckSummary: () => ({
      isLoading: false,
      data: undefined,
      error: reads.summary.error,
      refetch: reads.summary.refetch,
    }),
  };
});
import { AdminScreeningPage } from "./screening-page";

function draw() {
  return render(
    <QueryClientProvider
      client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}
    >
      <AdminScreeningPage />
    </QueryClientProvider>,
    { wrapper: tableViewTestShell("screening-uf3") },
  );
}
const NAMES = ["summary", "queue", "reviews", "changes", "job", "warned"] as const;
beforeEach(() => {
  state.list.mockReset().mockResolvedValue({ rows: [], total: 0 });
  state.language = "en";
  state.may = true;
  for (const name of NAMES) reads[name] = { error: null, refetch: vi.fn() };
  localStorage.clear();
  forgetTableViewsForTests();
});
afterEach(cleanup);

/** Each read's notice: its test id, and the words the screen gives it (null: the notice's own). */
const NOTICES: Record<(typeof NAMES)[number], { testid: string; words: string | null }> = {
  summary: { testid: "admin-screening-name-checks", words: en["admin.screening.nameChecks.error"] },
  queue: { testid: "data-table-error", words: en["admin.screening.names.error"] },
  reviews: { testid: "admin-photo-reviews-error", words: null },
  changes: { testid: "admin-photo-changes-error", words: null },
  job: { testid: "admin-job-line-error", words: en["admin.screening.job.error"] },
  warned: { testid: "admin-screening-warned-failed", words: null },
};

function noticeOf(name: (typeof NAMES)[number]) {
  const { testid } = NOTICES[name];
  if (name === "queue") {
    const table = screen
      .getByTestId("admin-name-checks-error")
      .closest('[data-testid="data-table-error"]');
    if (!(table instanceof HTMLElement)) throw new Error("Missing the name queue's notice");
    return table;
  }
  return screen.getByTestId(testid);
}

it("UFA-82 uf:A8.11 screening: name, photo, change, job and warned-ads read failures each say their words with a Retry that reads again; a refused read offers no Retry", async () => {
  for (const name of NAMES) {
    reads[name].error = new TypeError("Failed to fetch");
    const view = draw();
    const notice = await waitFor(() => noticeOf(name));
    expect(notice).toHaveAttribute("role", "alert");
    expect(notice).toHaveTextContent(en["failure.network"]);
    const words = NOTICES[name].words;
    if (words !== null) expect(notice).toHaveTextContent(words);
    fireEvent.click(within(notice).getByRole("button", { name: en["common.retry"] }));
    expect(reads[name].refetch).toHaveBeenCalledTimes(1);
    for (const other of NAMES) {
      if (other !== name) expect(reads[other].refetch).not.toHaveBeenCalled();
    }
    view.unmount();

    reads[name].error = Object.assign(new Error("badValue:read"), { status: 400 });
    reads[name].refetch = vi.fn();
    const refused = draw();
    const refusedNotice = await waitFor(() => noticeOf(name));
    await waitFor(() => expect(refusedNotice).toHaveAttribute("data-failure-reason", "refused"));
    expect(within(refusedNotice).queryByRole("button", { name: en["common.retry"] })).toBeNull();
    refused.unmount();
    reads[name] = { error: null, refetch: vi.fn() };
  }
});
