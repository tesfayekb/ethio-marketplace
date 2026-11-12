import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, within } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";

import type { GuardFn } from "@/features/auth/mfa/use-step-up";

import { PhotoReviews } from "./photo-reviews";

vi.mock("@/i18n", () => ({
  useI18n: () => ({
    t: (key: string) => key,
    language: "en",
    setLanguage: () => {},
    publicLanguages: [],
  }),
}));
vi.mock("@tanstack/react-router", () => ({
  Link: ({ children, params, ...rest }: { children: ReactNode; params: { listingId: string } }) => (
    <a href={`/admin/listings/${params.listingId}`} {...rest}>
      {children}
    </a>
  ),
}));
vi.mock("@/features/posting/use-photo-links", () => ({
  usePhotoLinks: () => ({ p1: { thumb: "https://x.example/p1-thumb.webp" } }),
}));
vi.mock("@/features/admin-listings/listing-photos", () => ({
  ListingPhotos: () => null,
}));
vi.mock("./use-photo-reviews", async (importOriginal) => ({
  ...(await importOriginal<typeof import("./use-photo-reviews")>()),
  usePhotoReviews: () => ({
    data: [
      {
        photoId: "p1",
        label: "unsure",
        code: null,
        evidence: null,
        createdAt: "2026-10-14T09:00:00Z",
        listing: { id: "L1", title: "A used phone", status: "active" },
      },
      {
        photoId: "p2",
        label: "unsure",
        code: null,
        evidence: null,
        createdAt: "2026-10-14T09:05:00Z",
        listing: { id: "L1", title: "A used phone", status: "active" },
      },
    ],
    isLoading: false,
    error: null,
    refetch: vi.fn(),
  }),
}));

function mount() {
  const guard = vi.fn() as unknown as GuardFn;
  render(
    <QueryClientProvider client={new QueryClient()}>
      <PhotoReviews mayReview guard={guard} />
    </QueryClientProvider>,
  );
  return screen.getAllByTestId("admin-photo-review");
}

/**
 * The pictures turn (INC-1121) — staff's photo-review thumbnail is drawn through Picture: a
 * cropped photo filling its 64 × 48 box, the empty-photo state when the address fails, and no
 * picture at all while the photo has no address.
 */
describe("PhotoReviews pictures (INC-1121)", () => {
  it("PRS-1 the thumbnail is a cover Picture filling its box; a failed load shows the empty-photo state", () => {
    const [first, second] = mount();
    if (first === undefined || second === undefined) throw new Error("two rows expected");
    const frame = first.querySelector("[data-picture-frame]");
    expect(frame).toHaveAttribute("data-picture-frame", "cover");
    expect(frame).toHaveClass("relative", "overflow-hidden", "h-full", "w-full");
    const img = within(first).getByRole("presentation");
    expect(img).toHaveAttribute("src", "https://x.example/p1-thumb.webp");
    expect(img).toHaveAttribute("loading", "lazy");
    expect(img).toHaveClass("absolute", "inset-0", "h-full", "w-full", "object-cover");
    fireEvent.error(img);
    expect(first.querySelector("img")).toBeNull();
    expect(frame).toHaveAttribute("data-picture-failed", "");
    expect(frame?.querySelector("svg")).not.toBeNull();
    expect(second.querySelector("[data-picture-frame]")).toBeNull();
  });
});
