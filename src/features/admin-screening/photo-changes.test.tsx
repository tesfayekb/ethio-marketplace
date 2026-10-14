import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";

import type { GuardFn } from "@/features/auth/mfa/use-step-up";

import { PhotoChanges } from "./photo-changes";

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
  ListingPhotos: (props: { listingId: string; mayRemove: boolean; testid: string }) => (
    <div
      data-testid={props.testid}
      data-listing={props.listingId}
      data-may-remove={String(props.mayRemove)}
    />
  ),
}));
const reads = vi.hoisted(() => ({
  rows: [
    {
      id: "c1",
      kind: "added",
      photoId: "p1",
      replacedPhotoId: null,
      codes: ["not_relevant"],
      createdAt: "2026-10-14T09:00:00Z",
      listing: { id: "L1", title: "A used phone", status: "active" },
    },
    {
      id: "c2",
      kind: "removed",
      photoId: "p0",
      replacedPhotoId: null,
      codes: [],
      createdAt: "2026-10-14T09:05:00Z",
      listing: { id: "L1", title: "A used phone", status: "active" },
    },
  ],
  review: vi.fn(),
  refetch: vi.fn(),
}));
vi.mock("./use-photo-changes", async (importOriginal) => ({
  ...(await importOriginal<typeof import("./use-photo-changes")>()),
  usePhotoChanges: () => ({
    data: reads.rows,
    isLoading: false,
    error: null,
    refetch: reads.refetch,
  }),
  reviewPhotoChange: (...args: unknown[]) => reads.review(...args),
}));

function mount(options: { mayReview: boolean }, onNotice = vi.fn()) {
  const guard = vi.fn() as unknown as GuardFn;
  render(
    <QueryClientProvider client={new QueryClient()}>
      <PhotoChanges {...options} guard={guard} onNotice={onNotice} />
    </QueryClientProvider>,
  );
  return { onNotice };
}

/**
 * Bundle 13 turn 10 — D154 B5: the photo changes on live ads, for staff with
 * listings:review: each change with its kind, its time, its ad and its warning;
 * Mark reviewed through the door; the ad's photos, view-only (D169).
 */
describe("PhotoChanges (D154 B5)", () => {
  it("PCH-3 lists each change with its kind, its ad and its warning; a removal has no picture", () => {
    mount({ mayReview: true });
    const items = screen.getAllByTestId("admin-photo-change");
    expect(items.map((item) => item.getAttribute("data-kind"))).toEqual(["added", "removed"]);
    expect(within(items[0]!).getByTestId("admin-photo-change-kind")).toHaveTextContent(
      "admin.screening.changes.added",
    );
    expect(within(items[0]!).getByTestId("admin-photo-change-ad")).toHaveAttribute(
      "href",
      "/admin/listings/L1",
    );
    expect(within(items[0]!).getByTestId("admin-photo-change-warning")).toHaveTextContent(
      "admin.listings.photos.notRelevant",
    );
    expect(items[0]!.querySelector("img")).toHaveAttribute(
      "src",
      "https://x.example/p1-thumb.webp",
    );
    expect(items[1]!.querySelector("img")).toBeNull();
    expect(within(items[1]!).queryByTestId("admin-photo-change-warning")).toBeNull();
    expect(screen.getByTestId("admin-photo-changes-count")).toHaveTextContent("2");
  });

  it("PCH-4 Mark reviewed calls the door with the change; a change already reviewed is said so", async () => {
    reads.review.mockResolvedValueOnce(undefined);
    const { onNotice } = mount({ mayReview: true });
    const items = screen.getAllByTestId("admin-photo-change");
    fireEvent.click(within(items[0]!).getByTestId("admin-photo-change-review"));
    await waitFor(() => expect(reads.review).toHaveBeenCalledWith("c1"));
    expect(onNotice).not.toHaveBeenCalled();
    reads.review.mockRejectedValueOnce({ message: "changeGone" });
    fireEvent.click(within(items[1]!).getByTestId("admin-photo-change-review"));
    await waitFor(() =>
      expect(onNotice).toHaveBeenCalledWith("admin.screening.changes.gone", "error"),
    );
  });

  it("PCH-5 Show photos opens the ad's photos view-only: a photo is removed in Edit on the ad's page (D169)", () => {
    mount({ mayReview: true });
    const items = screen.getAllByTestId("admin-photo-change");
    const toggle = within(items[0]!).getByTestId("admin-photo-change-photos");
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    const photos = within(items[0]!).getByTestId("admin-photo-change-ad-photos");
    expect(photos).toHaveAttribute("data-listing", "L1");
    expect(photos).toHaveAttribute("data-may-remove", "false");
  });

  it("PCH-6 a person without listings:review sees no list", () => {
    mount({ mayReview: false });
    expect(screen.queryByTestId("admin-photo-changes")).toBeNull();
  });
});
