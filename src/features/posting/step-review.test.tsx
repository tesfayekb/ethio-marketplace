import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { en } from "@/i18n/locales/en";
import { ownValue } from "@/lib/own-key";
import type { DraftValues } from "./use-draft";

const readMyListing = vi.hoisted(() => vi.fn());
vi.mock("@/features/my-listings/my-listing", () => ({ readMyListing }));
vi.mock("./use-price-unit-labels", () => ({ usePriceUnitLabels: () => null }));

const area = vi.hoisted(() => ({ country: null as string | null }));
vi.mock("@/i18n", async (original) => ({
  ...(await original<typeof import("@/i18n")>()),
  useI18n: () => ({
    t: (key: string) => ownValue(en, key) ?? key,
    language: "en",
    entities: { map: {}, lang: "en" },
  }),
}));
vi.mock("@/components/shell/location-data", async (original) => ({
  ...(await original<typeof import("@/components/shell/location-data")>()),
  readAreaCookie: () => (area.country === null ? null : { country: area.country }),
  useCountryTree: (country: string | null) => ({
    loadedCountry: country,
    nodes: country === "ET" ? [{ id: "scratch-city", nameEn: "Adama", slug: "scratch-city" }] : [],
  }),
}));
vi.mock("./posting-service", async (original) => ({
  ...(await original<typeof import("./posting-service")>()),
  readSellerIdentity: vi.fn().mockResolvedValue(null),
  readSellerLine: vi.fn().mockResolvedValue(null),
  publishListing: vi.fn().mockResolvedValue({ ok: true }),
}));
vi.mock("@tanstack/react-router", () => ({
  Link: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
  // Bundle 22 turn 4 — the review step's certification refusal navigates (certifyRefusal).
  useNavigate: () => () => undefined,
}));
// Bundle 22 turn 4 — no publishing statement applies in these tests (the block reports "none").
vi.mock("@/features/legal/legal-reader", () => ({
  myListingCertification: async () => ({ statements: [], acceptance_pending: false }),
}));

import { StepReview } from "./step-review";

const values: DraftValues = {
  categoryId: null,
  attributes: {},
  title: "Scratch draft",
  description: "",
  videoUrl: "",
  priceMode: "contact",
  priceAmount: null,
  priceCurrency: null,
  pricePeriod: null,
  priceBp: null,
  priceNegotiable: false,
  posterExpiresAt: "",
  coverage: ["scratch-city"],
  contactPref: { messages: true },
};

it("RV-1 the review card and sheet name the draft's city, not the visitor's other-country or absent area (INC-724)", async () => {
  for (const country of ["US", null]) {
    area.country = country;
    const { unmount } = render(
      <QueryClientProvider client={new QueryClient()}>
        <StepReview
          listingId={null}
          categoryPath="Scratch category"
          placeCountry="ET"
          values={values}
          photos={[]}
          illustrationUrl={null}
          expiryDays={null}
          refusals={[]}
          onChangeExpiry={vi.fn()}
          onGoTo={vi.fn()}
          maxPhotos={null}
        />
      </QueryClientProvider>,
    );
    await waitFor(() =>
      expect(screen.getByTestId("post-review-places")).toHaveTextContent("Adama"),
    );
    fireEvent.click(screen.getByTestId("post-preview-open"));
    await waitFor(() =>
      expect(screen.getByTestId("listing-detail-places")).toHaveTextContent("Adama"),
    );
    fireEvent.click(screen.getByTestId("post-preview-close"));
    expect(screen.queryByTestId("post-preview-sheet")).toBeNull();
    unmount();
  }
});

/** D218 rule proofs: timing, cap and stop paths, never styling or copy. */
const listingAnswer = (status = "screening", publicId: string | null = null) => ({
  listing: { status, publicId, title: "Scratch", priceUnit: null, priceUnitText: null },
});
async function publishedReview() {
  const view = render(
    <QueryClientProvider client={new QueryClient()}>
      <StepReview
        listingId="scratch-listing"
        categoryPath="Scratch category"
        values={values}
        photos={[]}
        illustrationUrl={null}
        expiryDays={null}
        refusals={[]}
        onChangeExpiry={vi.fn()}
        onGoTo={vi.fn()}
        maxPhotos={null}
      />
    </QueryClientProvider>,
  );
  // Bundle 22 turn 4 — Publish opens once the statement read answers "none" (no statement applies).
  await act(async () => {
    if (vi.isFakeTimers()) await vi.advanceTimersByTimeAsync(0);
    else await new Promise((resolve) => setTimeout(resolve, 0));
  });
  expect(screen.getByTestId("post-publish")).toHaveProperty("disabled", false);
  await act(async () => fireEvent.click(screen.getByTestId("post-publish")));
  return view;
}

it("D218 reads immediately, at 10-second intervals, and never more than 12 times", async () => {
  vi.useFakeTimers();
  readMyListing.mockReset().mockResolvedValue(listingAnswer());
  let view: Awaited<ReturnType<typeof publishedReview>> | undefined;
  try {
    view = await publishedReview();
    expect(readMyListing).toHaveBeenCalledExactlyOnceWith("scratch-listing");
    await act(() => vi.advanceTimersByTimeAsync(9_999));
    expect(readMyListing).toHaveBeenCalledTimes(1);
    await act(() => vi.advanceTimersByTimeAsync(1));
    expect(readMyListing).toHaveBeenCalledTimes(2);
    await act(() => vi.advanceTimersByTimeAsync(100_000));
    expect(readMyListing).toHaveBeenCalledTimes(12);
    await act(() => vi.advanceTimersByTimeAsync(120_000));
    expect(readMyListing).toHaveBeenCalledTimes(12);
  } finally {
    view?.unmount();
    vi.useRealTimers();
  }
});

it("D218 stops on the first active answer with a string public id", async () => {
  vi.useFakeTimers();
  readMyListing
    .mockReset()
    .mockResolvedValueOnce(listingAnswer("active", null))
    .mockResolvedValueOnce(listingAnswer("screening", "2345678923"))
    .mockResolvedValueOnce(listingAnswer("active", "2345678923"));
  let view: Awaited<ReturnType<typeof publishedReview>> | undefined;
  try {
    view = await publishedReview();
    expect(screen.queryByTestId("listing-share-open")).toBeNull();
    await act(() => vi.advanceTimersByTimeAsync(10_000));
    expect(screen.queryByTestId("listing-share-open")).toBeNull();
    await act(() => vi.advanceTimersByTimeAsync(10_000));
    expect(screen.getByTestId("listing-share-open")).toBeEnabled();
    await act(() => vi.advanceTimersByTimeAsync(120_000));
    expect(readMyListing).toHaveBeenCalledTimes(3);
  } finally {
    view?.unmount();
    vi.useRealTimers();
  }
});

it("D218 stops at notYours and never enables sharing", async () => {
  vi.useFakeTimers();
  readMyListing.mockReset().mockResolvedValue("notYours");
  let view: Awaited<ReturnType<typeof publishedReview>> | undefined;
  try {
    view = await publishedReview();
    await act(() => vi.advanceTimersByTimeAsync(120_000));
    expect(readMyListing).toHaveBeenCalledTimes(1);
    // D223 — the diamond is gone; only the note stands, never a grey button.
    expect(screen.queryByTestId("post-review-share-checking")).toBeNull();
    expect(screen.queryByTestId("post-review-share-wait")).toBeNull();
    expect(screen.queryByTestId("listing-share-open")).toBeNull();
    expect(screen.getByTestId("post-review-share-note")).toHaveTextContent(
      en["post.review.shareWait"],
    );
  } finally {
    view?.unmount();
    vi.useRealTimers();
  }
});

it("D218 stops and warns exactly once on a thrown read, keeping Share disabled", async () => {
  vi.useFakeTimers();
  const failure = new Error("scratch read failure");
  const warning = vi.spyOn(console, "warn").mockImplementation(() => {});
  readMyListing.mockReset().mockRejectedValue(failure);
  let view: Awaited<ReturnType<typeof publishedReview>> | undefined;
  try {
    view = await publishedReview();
    await act(() => vi.advanceTimersByTimeAsync(120_000));
    expect(readMyListing).toHaveBeenCalledTimes(1);
    expect(warning).toHaveBeenCalledExactlyOnceWith("[post-review-share] read failed", failure);
    // D223 — a failed read ends the diamond; only the note stands.
    expect(screen.queryByTestId("post-review-share-checking")).toBeNull();
    expect(screen.queryByTestId("post-review-share-wait")).toBeNull();
    expect(screen.queryByTestId("listing-share-open")).toBeNull();
    expect(screen.getByTestId("post-review-share-note")).toHaveTextContent(
      en["post.review.shareWait"],
    );
  } finally {
    view?.unmount();
    warning.mockRestore();
    vi.useRealTimers();
  }
});

it("D218 unmount clears subsequent reads", async () => {
  vi.useFakeTimers();
  readMyListing.mockReset().mockResolvedValue(listingAnswer());
  let view: Awaited<ReturnType<typeof publishedReview>> | undefined;
  try {
    view = await publishedReview();
    view.unmount();
    await act(() => vi.advanceTimersByTimeAsync(120_000));
    expect(readMyListing).toHaveBeenCalledTimes(1);
  } finally {
    view?.unmount();
    vi.useRealTimers();
  }
});
