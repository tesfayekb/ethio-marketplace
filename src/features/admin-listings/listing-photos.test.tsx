import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import type { GuardFn } from "@/features/auth/mfa/use-step-up";

import { ListingPhotos } from "./listing-photos";

vi.mock("@/i18n", () => ({
  useI18n: () => ({
    t: (key: string) => key,
    language: "en",
    setLanguage: () => {},
    publicLanguages: [],
  }),
}));

const rows = vi.hoisted(() => [
  { id: "p1", displayOrder: 0, paths: null, storagePath: "s/p1", unscreened: false },
  { id: "p2", displayOrder: 1, paths: null, storagePath: "s/p2", unscreened: true },
]);
vi.mock("@/features/admin-screening/use-screening", () => ({
  ADMIN_SCREENING_KEY: ["admin", "screening"],
  useScreeningPhotos: () => ({ data: rows }),
}));
vi.mock("@/features/posting/use-photo-links", () => ({
  usePhotoLinks: () => ({
    p1: { thumb: "https://x.example/p1-thumb.webp", card: "https://x.example/p1-card.webp" },
    p2: { thumb: "https://x.example/p2-thumb.webp", card: "https://x.example/p2-card.webp" },
  }),
}));
const door = vi.hoisted(() => ({ edit: vi.fn() }));
vi.mock("./use-admin-listing", () => ({
  editAdminListing: (...args: unknown[]) => door.edit(...args),
}));

function mount(mayRemove: boolean, onRemoved = vi.fn()) {
  const guard = vi.fn(async <T,>(work: () => T | Promise<T>) => work()) as unknown as GuardFn & {
    mock: { calls: unknown[][] };
  };
  render(
    <QueryClientProvider client={new QueryClient()}>
      <ListingPhotos listingId="L1" mayRemove={mayRemove} guard={guard} onRemoved={onRemoved} />
    </QueryClientProvider>,
  );
  return { guard, onRemoved };
}

/**
 * Bundle 13 turn 8 (D154 B4) — a listing's photos for staff: each in order, a
 * held one marked; Remove only for those who may edit; a reason first, a note
 * for Other; the door through the second factor; its refusal kept in the dialog.
 */
describe("ListingPhotos (D154 B4)", () => {
  it("LP-3 the photos in order, a held one marked; no Remove without the right", () => {
    mount(false);
    const items = screen.getAllByTestId("listing-photos-item");
    expect(items.map((item) => item.getAttribute("data-photo-id"))).toEqual(["p1", "p2"]);
    expect(items[0]!.querySelector("img")).toHaveAttribute(
      "src",
      "https://x.example/p1-thumb.webp",
    );
    expect(within(items[1]!).getByText("post.gallery.unscreened")).toBeInTheDocument();
    expect(screen.queryByTestId("listing-photos-remove")).toBeNull();
  });

  it("LP-4 Remove asks a reason, a note for Other, then sends that photo alone through the second factor", async () => {
    door.edit.mockResolvedValueOnce({ ok: true, status: "active", fields: ["photos"] });
    const { guard, onRemoved } = mount(true);
    const removes = screen.getAllByTestId("listing-photos-remove");
    expect(removes).toHaveLength(2);
    expect(removes[1]).toHaveAttribute("aria-label", "admin.listings.photos.removeOne");
    fireEvent.click(removes[1]!);
    const dialog = await screen.findByTestId("listing-photo-remove-dialog");
    fireEvent.click(within(dialog).getByTestId("listing-photo-remove-confirm"));
    expect(within(dialog).getByTestId("listing-photo-remove-problem")).toHaveTextContent(
      "admin.listings.move.pickReason",
    );
    fireEvent.click(within(dialog).getByTestId("listing-photo-remove-reason-other"));
    fireEvent.click(within(dialog).getByTestId("listing-photo-remove-confirm"));
    expect(within(dialog).getByTestId("listing-photo-remove-problem")).toHaveTextContent(
      "admin.listings.move.noteRequired",
    );
    fireEvent.change(within(dialog).getByTestId("listing-photo-remove-note"), {
      target: { value: "  A phone number is written on it.  " },
    });
    fireEvent.click(within(dialog).getByTestId("listing-photo-remove-confirm"));
    await waitFor(() => expect(onRemoved).toHaveBeenCalledWith("admin.listings.photos.done"));
    expect(guard.mock.calls).toHaveLength(1);
    expect(door.edit).toHaveBeenCalledWith(
      "L1",
      { remove_photos: ["p2"] },
      "other",
      "A phone number is written on it.",
    );
    expect(screen.queryByTestId("listing-photo-remove-dialog")).toBeNull();
  });

  it("LP-5 the door's refusal stays in the dialog, which stays open", async () => {
    door.edit.mockRejectedValueOnce({ message: "photo not found on this listing" });
    const { onRemoved } = mount(true);
    fireEvent.click(screen.getAllByTestId("listing-photos-remove")[0]!);
    const dialog = await screen.findByTestId("listing-photo-remove-dialog");
    fireEvent.click(within(dialog).getByTestId("listing-photo-remove-reason-photo"));
    fireEvent.click(within(dialog).getByTestId("listing-photo-remove-confirm"));
    await waitFor(() =>
      expect(within(dialog).getByTestId("listing-photo-remove-problem")).toHaveTextContent(
        "admin.listings.photos.error.gone",
      ),
    );
    expect(onRemoved).not.toHaveBeenCalled();
    expect(screen.getByTestId("listing-photo-remove-dialog")).toBeInTheDocument();
  });
});
