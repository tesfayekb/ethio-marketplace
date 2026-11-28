import { act, fireEvent, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { en } from "@/i18n/locales/en";
import { am } from "@/i18n/locales/am";
import type { UseSellerFeed } from "./use-seller-feed";

/**
 * UF-1 Part 1 (DEC-493) — a seller's page, one screen: empty, not found, failed with Retry, the
 * next page on scroll and its failure, and the page in Amharic. Seams: the seller's feed hook,
 * the card photos and the category tree; the words are the real catalogues.
 */
const lang = vi.hoisted(() => ({ value: "en" as "en" | "am" }));
const hook = vi.hoisted(() => ({ current: null as unknown }));
vi.mock("./use-seller-feed", () => ({ useSellerFeed: () => hook.current }));
vi.mock("@/i18n", async (original) => {
  const { en: EN } = await import("@/i18n/locales/en");
  const { am: AM } = await import("@/i18n/locales/am");
  const { ownValue: own } = await import("@/lib/own-key");
  return {
    ...(await original<typeof import("@/i18n")>()),
    useI18n: () => ({
      t: (key: string) => own(lang.value === "am" ? AM : EN, key) ?? key,
      language: lang.value,
      entities: { map: {}, lang: lang.value },
    }),
  };
});
vi.mock("@/features/feed/use-card-photos", () => ({ useCardPhotos: () => () => null }));
vi.mock("@/components/shell/page-guide", () => ({ PageGuide: () => null }));
vi.mock("@/components/layout/page-shell", () => ({
  PageShell: ({ children }: { children?: ReactNode }) => <main>{children}</main>,
}));
vi.mock("@/components/marketplace/listing-card", () => ({
  ListingCard: ({ listing }: { listing: { id: string } }) => <span>{listing.id}</span>,
}));

const { SellerPage } = await import("./seller-page");

const SELLER = { alias: "scratch", businessName: null, memberSince: null };
function state(over: Partial<UseSellerFeed> = {}): UseSellerFeed {
  return {
    seller: SELLER,
    cards: [],
    hasMore: false,
    isLoading: false,
    isLoadingMore: false,
    error: false,
    moreError: false,
    notFound: false,
    loadMore: vi.fn(),
    retry: vi.fn(),
    ...over,
  } as UseSellerFeed;
}
const card = (id: string) =>
  ({ id, coverPhotoId: null }) as unknown as UseSellerFeed["cards"][number];

let observed: ((entries: { isIntersecting: boolean }[]) => void) | null = null;
beforeEach(() => {
  lang.value = "en";
  observed = null;
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(callback: (entries: { isIntersecting: boolean }[]) => void) {
        observed = callback;
      }
      observe() {}
      disconnect() {}
    },
  );
});

describe("UF-1 a seller's page", () => {
  it("UFP-17 a seller with no ads says so beside the name uf:S3.4", () => {
    hook.current = state();
    render(<SellerPage sellerKey="scratch" />);
    expect(screen.getByTestId("seller-page-empty")).toHaveTextContent(en["sellerPage.empty"]);
  });

  it("UFP-18 a seller gone after the loader passed shows not found uf:S3.5", () => {
    hook.current = state({ notFound: true, seller: null });
    render(<SellerPage sellerKey="scratch" />);
    expect(screen.getByTestId("seller-page-not-found")).toHaveTextContent(
      en["sellerPage.notFound"],
    );
    expect(screen.queryByTestId("seller-page-empty")).toBeNull();
  });

  it("UFP-19 a failed read says so and Retry reads again uf:S3.6", () => {
    const retry = vi.fn();
    hook.current = state({ error: true, seller: null, retry });
    render(<SellerPage sellerKey="scratch" />);
    expect(screen.getByTestId("seller-page-error")).toHaveTextContent(en["sellerPage.failed"]);
    fireEvent.click(screen.getByRole("button", { name: en["common.retry"] }));
    expect(retry).toHaveBeenCalledTimes(1);
  });

  it("UFP-20 the end coming into view loads the next page, and a failed next page says so with Retry uf:S3.7", () => {
    const loadMore = vi.fn();
    const retry = vi.fn();
    hook.current = state({ cards: [card("a")], hasMore: true, loadMore });
    const { rerender } = render(<SellerPage sellerKey="scratch" />);
    act(() => observed?.([{ isIntersecting: true }]));
    expect(loadMore).toHaveBeenCalledTimes(1);
    hook.current = state({ cards: [card("a")], hasMore: true, moreError: true, loadMore, retry });
    rerender(<SellerPage sellerKey="scratch" />);
    expect(screen.getByTestId("seller-page-more-error")).toHaveTextContent(en["sellerPage.failed"]);
    fireEvent.click(screen.getByRole("button", { name: en["common.retry"] }));
    expect(retry).toHaveBeenCalledTimes(1);
    expect(screen.getByText("a")).toBeInTheDocument();
  });

  it("UFP-21 in Amharic the seller page's own words are the Amharic catalogue's uf:S3.8", () => {
    lang.value = "am";
    hook.current = state();
    const empty = render(<SellerPage sellerKey="scratch" />);
    expect(screen.getByTestId("seller-page-empty")).toHaveTextContent(am["sellerPage.empty"]);
    expect(screen.getByTestId("seller-page-title")).toHaveTextContent(
      am["sellerPage.title"].replace("{name}", "scratch"),
    );
    empty.unmount();
    hook.current = state({ error: true, seller: null });
    render(<SellerPage sellerKey="scratch" />);
    expect(screen.getByTestId("seller-page-error")).toHaveTextContent(am["sellerPage.failed"]);
    for (const key of ["sellerPage.failed", "common.retry"] as const) {
      expect(document.body.textContent).toContain(am[key]);
      if (am[key] !== en[key]) expect(document.body.textContent).not.toContain(en[key]);
    }
  });
});
