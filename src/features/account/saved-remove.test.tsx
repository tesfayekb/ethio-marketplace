import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { expect, it, vi } from "vitest";

const save = vi.hoisted(() => ({ mySaved: vi.fn(), unsaveListing: vi.fn() }));
vi.mock("@/features/ad-page/save", () => save);
vi.mock("@/i18n", () => ({ useI18n: () => ({ t: (key: string) => key, language: "en" }) }));
vi.mock("@/components/layout/page-shell", () => ({
  PageShell: ({ children }: { children: ReactNode }) => <main>{children}</main>,
}));
vi.mock("@/components/layout/page-header", () => ({ PageHeader: () => null }));
vi.mock("@/components/shell/page-guide", () => ({ PageGuide: () => null }));
vi.mock("@/components/marketplace/listing-card", () => ({ ListingCard: () => null }));
vi.mock("@/features/feed/use-card-photos", () => ({ useCardPhotos: () => () => null }));

import { SavedPage } from "./saved-page";

/** INC-1280 (10a-2, D27) — a refused Remove draws its code's words, never the page's load words. */
it("RWS-U1 a refused Remove says why, and a failed one says Remove failed", async () => {
  save.mySaved.mockResolvedValue({
    cards: [{ id: "c1", publicId: "p1", available: false, coverPhotoId: null }],
    next: null,
  });
  save.unsaveListing.mockResolvedValueOnce({ ok: false, reason: "listingNotAvailable" });
  render(
    <QueryClientProvider client={new QueryClient()}>
      <SavedPage />
    </QueryClientProvider>,
  );
  fireEvent.click(await screen.findByTestId("saved-remove"));
  await waitFor(() =>
    expect(screen.getByTestId("saved-failed")).toHaveTextContent("account.saved.unavailable"),
  );
  save.unsaveListing.mockResolvedValueOnce({ ok: false, reason: "failed" });
  fireEvent.click(screen.getByTestId("saved-remove"));
  await waitFor(() =>
    expect(screen.getByTestId("saved-failed")).toHaveTextContent("account.saved.removeFailed"),
  );
  expect(screen.getByTestId("saved-failed")).not.toHaveTextContent("account.saved.failed");
});
