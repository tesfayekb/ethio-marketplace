import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

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

const BASE_ROWS = [
  { id: "p1", displayOrder: 0, paths: null, storagePath: "s/p1", unscreened: false },
  { id: "p2", displayOrder: 1, paths: null, storagePath: "s/p2", unscreened: true },
];
const state = vi.hoisted(() => ({ rows: [] as Record<string, unknown>[] }));
vi.mock("@/features/admin-screening/use-screening", () => ({
  ADMIN_SCREENING_KEY: ["admin", "screening"],
  useScreeningPhotos: () => ({ data: state.rows }),
}));
vi.mock("@/features/posting/use-photo-links", () => ({
  usePhotoLinks: () => ({
    p1: { thumb: "https://x.example/p1-thumb.webp", card: "https://x.example/p1-card.webp" },
    p2: { thumb: "https://x.example/p2-thumb.webp", card: "https://x.example/p2-card.webp" },
  }),
}));
const door = vi.hoisted(() => ({ edit: vi.fn(), allow: vi.fn() }));
vi.mock("./use-admin-listing", () => ({
  editAdminListing: (...args: unknown[]) => door.edit(...args),
}));
vi.mock("@/features/admin-screening/use-photo-reviews", async (original) => ({
  ...(await original<typeof import("@/features/admin-screening/use-photo-reviews")>()),
  allowListingPhoto: (...args: unknown[]) => door.allow(...args),
}));

state.rows = BASE_ROWS;
afterEach(() => {
  state.rows = BASE_ROWS;
});

function mount(mayRemove: boolean, onRemoved = vi.fn(), mayAllow = false) {
  const guard = vi.fn(async <T,>(work: () => T | Promise<T>) => work()) as unknown as GuardFn & {
    mock: { calls: unknown[][] };
  };
  render(
    <QueryClientProvider client={new QueryClient()}>
      <ListingPhotos
        listingId="L1"
        mayRemove={mayRemove}
        mayAllow={mayAllow}
        guard={guard}
        onRemoved={onRemoved}
      />
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

  it("LP-6 the console's card heading; with Remove, what Remove does, and each Remove an icon and its word (D171)", () => {
    mount(true);
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      "admin.listings.detail.photos",
    );
    expect(screen.getByTestId("listing-photos-hint")).toHaveTextContent(
      "admin.listings.photos.hint",
    );
    for (const remove of screen.getAllByTestId("listing-photos-remove")) {
      expect(remove.querySelector("svg")).not.toBeNull();
      expect(remove).toHaveTextContent("admin.listings.action.remove");
    }
  });

  it("LP-7 view-only: the heading without the removal line (Screening's preview and Show photos)", () => {
    mount(false);
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      "admin.listings.detail.photos",
    );
    expect(screen.queryByTestId("listing-photos-hint")).toBeNull();
  });
});

/** Bundle 16 turn 4b (D178) — photos kept hidden for a person: their reasons, and Allow. */
describe("ListingPhotos (D178)", () => {
  const REVIEWED = [
    { id: "p1", displayOrder: 0, paths: null, storagePath: "s/p1", unscreened: false },
    {
      id: "p2",
      displayOrder: 1,
      paths: null,
      storagePath: "s/p2",
      unscreened: true,
      review: { label: "fail", code: "weapon", evidence: "a knife in the first image" },
    },
    {
      id: "p3",
      displayOrder: 2,
      paths: null,
      storagePath: "s/p3",
      unscreened: true,
      warnings: ["not_relevant"],
      review: { label: "not_right", code: null, evidence: null },
    },
    {
      id: "p4",
      displayOrder: 3,
      paths: null,
      storagePath: "s/p4",
      unscreened: true,
      review: { label: "held", code: null, evidence: null },
    },
  ];

  it("LP-8 each hidden photo says why: a fail its rule and the check's phrase, a held one its pause; a not-right one by its warning; no Allow without the right", () => {
    state.rows = REVIEWED;
    mount(false);
    const items = screen.getAllByTestId("listing-photos-item");
    expect(within(items[1]!).getByText("post.gallery.inReview")).toBeInTheDocument();
    expect(within(items[1]!).getByTestId("listing-photos-review")).toHaveTextContent(
      "admin.listings.photos.review.fail · post.photo.refusal.weapon",
    );
    expect(within(items[1]!).getByTestId("listing-photos-evidence")).toHaveTextContent(
      "admin.listings.photos.review.evidence",
    );
    expect(within(items[2]!).getByText("post.gallery.inReview")).toBeInTheDocument();
    expect(within(items[2]!).queryByTestId("listing-photos-review")).toBeNull();
    expect(within(items[2]!).getByTestId("listing-photos-warning")).toHaveTextContent(
      "admin.listings.photos.notRelevant",
    );
    expect(within(items[3]!).getByText("post.gallery.unscreened")).toBeInTheDocument();
    expect(within(items[3]!).getByTestId("listing-photos-review")).toHaveAttribute(
      "data-label",
      "held",
    );
    expect(within(items[0]!).queryByTestId("listing-photos-review")).toBeNull();
    expect(screen.queryByTestId("listing-photos-allow")).toBeNull();
  });

  it("LP-9 Allow is offered on each hidden photo under review, goes through the second factor, and a refusal is said under its photo", async () => {
    state.rows = REVIEWED;
    door.allow.mockResolvedValueOnce(undefined);
    const { guard, onRemoved } = mount(false, vi.fn(), true);
    const allows = screen.getAllByTestId("listing-photos-allow");
    expect(allows).toHaveLength(3);
    expect(allows[0]).toHaveAttribute("aria-label", "admin.listings.photos.allowOne");
    fireEvent.click(allows[0]!);
    await waitFor(() => expect(onRemoved).toHaveBeenCalledWith("admin.listings.photos.allowed"));
    expect(guard.mock.calls).toHaveLength(1);
    expect(door.allow).toHaveBeenCalledWith("p2");

    door.allow.mockRejectedValueOnce({ message: "reviewGone" });
    fireEvent.click(screen.getAllByTestId("listing-photos-allow")[1]!);
    expect(await screen.findByTestId("listing-photos-allow-problem")).toHaveTextContent(
      "admin.listings.photos.allowGone",
    );
    expect(door.allow).toHaveBeenLastCalledWith("p3");
  });
});
