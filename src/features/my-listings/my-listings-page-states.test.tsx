import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { useState, type ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { am } from "@/i18n/locales/am";
import { en } from "@/i18n/locales/en";
import { ownValue } from "@/lib/own-key";
import { readFailed } from "@/lib/reader-failure";
import { buildTree } from "@/features/categories/category-tree";
import type { MyListingRow, MyListingsPage as MyListingsAnswer } from "./my-listings";

const language = vi.hoisted(() => ({ value: "en" as "en" | "am" }));
const readMyListings = vi.hoisted(() => vi.fn());
const runListAction = vi.hoisted(() => vi.fn());

vi.mock("@/i18n", async (original) => ({
  ...(await original<typeof import("@/i18n")>()),
  useI18n: () => ({
    t: (key: string) => ownValue(language.value === "am" ? am : en, key) ?? key,
    language: language.value,
    entities: { map: {}, lang: language.value },
  }),
}));
vi.mock("@tanstack/react-router", () => ({
  Link: ({ to, children, ...rest }: { to: string; children: ReactNode }) => (
    <a href={to} {...rest}>
      {children}
    </a>
  ),
  useNavigate: () => vi.fn(),
}));
vi.mock("@/features/categories/category-tree", async (original) => ({
  ...(await original<typeof import("@/features/categories/category-tree")>()),
  useCategoryTree: () => ({ tree: buildTree([], []), isLoading: false }),
}));
vi.mock("@/components/shell/table-filters", async (original) => ({
  ...(await original<typeof import("@/components/shell/table-filters")>()),
  useTableFilters: () => ({ filters: [], ready: true }),
  filterValues: () => [],
}));
vi.mock("@/components/shell/use-kept-page", () => ({
  useKeptPage: () => {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(20);
    return {
      page,
      setPage,
      pageSize,
      setPageSize,
      pageSizeOptions: [20, 50],
      ready: true,
    };
  },
}));
vi.mock("@/components/shell/row-actions", () => ({
  RowActions: ({
    more = [],
    edit,
    remove,
  }: {
    more?: { key: string; label: string; onSelect: () => void }[];
    edit?: { label: string; onSelect: () => void };
    remove?: { label: string; onSelect: () => void };
  }) => (
    <div>
      {[...(edit === undefined ? [] : [edit]), ...(remove === undefined ? [] : [remove])].map(
        (item) => (
          <button key={item.label} type="button" onClick={item.onSelect}>
            {item.label}
          </button>
        ),
      )}
      {more.map((item) => (
        <button key={item.key} type="button" onClick={item.onSelect}>
          {item.label}
        </button>
      ))}
    </div>
  ),
}));
vi.mock("@/features/posting/use-photo-links", () => ({ usePhotoLinks: () => ({}) }));
vi.mock("@/features/posting/use-price-unit-labels", () => ({
  usePriceUnitLabels: () => null,
}));
vi.mock("@/lib/refresh-after-write", () => ({ refreshAfterWrite: vi.fn(async () => {}) }));
vi.mock("./my-listings", async (original) => ({
  ...(await original<typeof import("./my-listings")>()),
  readMyListings,
}));
vi.mock("./my-listing", async (original) => ({
  ...(await original<typeof import("./my-listing")>()),
  runListAction,
}));

import { MyListingsPage } from "./my-listings-page";

const counts = (live: number) => ({
  live,
  review: 0,
  attention: 0,
  closed: 0,
  sold: 0,
  drafts: 0,
});
const page = (rows: MyListingRow[], live = rows.length): MyListingsAnswer => ({
  counts: counts(live),
  rows,
  renewAllowed: true,
  renewDays: 30,
});
const row: MyListingRow = {
  id: "listing-1",
  publicId: "abcdefghjk",
  status: "active",
  title: "Fridge",
  categoryId: null,
  coverPhotoId: null,
  photosSoon: false,
  priceMode: "fixed",
  priceAmount: 1000,
  priceCurrency: "ETB",
  pricePeriod: "once",
  priceBp: null,
  priceNegotiable: false,
  priceUnit: null,
  priceUnitText: null,
  priceWas: null,
  reserved: false,
  publishedFirstAt: "2026-10-01T08:00:00Z",
  publishedAt: "2026-10-01T08:00:00Z",
  renewedAt: null,
  expiresAt: "2026-10-31T08:00:00Z",
  daysLeft: 17,
  daysKept: null,
  soldAt: null,
  soldWord: "sold",
  createdAt: "2026-09-30T08:00:00Z",
  updatedAt: null,
  staffReason: null,
  level: "regular",
  levelUntil: null,
  levelSource: null,
  reach: null,
  reachUntil: null,
};

function draw() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={client}>
      <MyListingsPage />
    </QueryClientProvider>,
  );
}

beforeEach(() => {
  language.value = "en";
  readMyListings.mockReset();
  runListAction.mockReset();
  window.localStorage.clear();
});

describe("UF-1 the member's listings", () => {
  it("UFM-1 the list draws its loading caption and then its empty words uf:S8.4", async () => {
    let answer: ((value: MyListingsAnswer) => void) | undefined;
    readMyListings.mockReturnValueOnce(
      new Promise<MyListingsAnswer>((resolve) => {
        answer = resolve;
      }),
    );
    draw();
    expect(await screen.findByRole("status")).toHaveTextContent(en["common.loading"]);
    await act(async () => answer?.(page([])));
    expect(await screen.findByTestId("my-listings-empty")).toHaveTextContent(
      en["myListings.empty"],
    );
  });

  it("UFM-2 a failed list carries its class and Retry reads it again uf:S8.5", async () => {
    readMyListings
      .mockRejectedValueOnce(readFailed("route 503", 503))
      .mockResolvedValueOnce(page([]));
    draw();
    const failure = await screen.findByTestId("my-listings-error");
    expect(failure).toHaveTextContent(en["myListings.loadError"]);
    expect(failure).toHaveAttribute("data-failure-class", "server 503");
    fireEvent.click(screen.getByRole("button", { name: en["common.retry"] }));
    expect(await screen.findByTestId("my-listings-empty")).toBeInTheDocument();
    expect(readMyListings).toHaveBeenCalledTimes(2);
  });

  it("UFM-3 an action refusal reaches the list in the seller family's words uf:S8.9", async () => {
    readMyListings.mockResolvedValue(page([row]));
    runListAction.mockResolvedValue({ ok: false, key: "myListings.error.notYours" });
    draw();
    const [reserve] = await screen.findAllByRole("button", {
      name: en["myListings.action.reserve"],
    });
    if (reserve === undefined) throw new Error("missing Reserve action");
    fireEvent.click(reserve);
    expect(await screen.findByTestId("my-listings-notice")).toHaveTextContent(
      en["myListings.error.notYours"],
    );
    expect(runListAction).toHaveBeenCalledWith("listing-1", "reserve", undefined);
  });

  it("UFM-4 the keyset pager asks the door for the next and previous offsets uf:S8.10", async () => {
    readMyListings.mockResolvedValue(page([row], 41));
    draw();
    const next = await screen.findByRole("button", { name: en["prim.table.next"] });
    await act(async () => fireEvent.click(next));
    await screen.findAllByTestId("my-listing-listing-1");
    expect(readMyListings).toHaveBeenLastCalledWith("live", 20, 20, {
      search: "",
      category: [],
      mark: null,
    });
    const previous = screen.getByRole("button", { name: en["prim.table.previous"] });
    await act(async () => fireEvent.click(previous));
    await screen.findAllByTestId("my-listing-listing-1");
    expect(readMyListings).toHaveBeenLastCalledWith("live", 20, 0, {
      search: "",
      category: [],
      mark: null,
    });
  });

  it("UFM-5 the list's own words are the Amharic catalogue's uf:S8.11", async () => {
    language.value = "am";
    readMyListings.mockResolvedValue(page([]));
    draw();
    expect(await screen.findByTestId("my-listings-empty")).toHaveTextContent(
      am["myListings.empty"],
    );
    expect(screen.getByTestId("my-listings-header")).toHaveTextContent(am["nav.myListings"]);
    expect(screen.getByTestId("my-listings-search")).toHaveAttribute(
      "placeholder",
      am["myListings.searchPlaceholder"],
    );
    for (const key of [
      "myListings.empty",
      "nav.myListings",
      "myListings.searchPlaceholder",
    ] as const) {
      if (am[key] !== en[key]) expect(document.body.textContent).not.toContain(en[key]);
    }
  });
});
