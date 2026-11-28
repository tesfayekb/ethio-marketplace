import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { am } from "@/i18n/locales/am";
import { en } from "@/i18n/locales/en";
import { ownValue } from "@/lib/own-key";
import { readFailed } from "@/lib/reader-failure";

const language = vi.hoisted(() => ({ value: "en" as "en" | "am" }));
const mySaved = vi.hoisted(() => vi.fn());

vi.mock("@/i18n", async (original) => ({
  ...(await original<typeof import("@/i18n")>()),
  useI18n: () => ({
    t: (key: string) => ownValue(language.value === "am" ? am : en, key) ?? key,
    language: language.value,
    entities: { map: {}, lang: language.value },
  }),
}));
vi.mock("@/features/ad-page/save", () => ({ mySaved, unsaveListing: vi.fn() }));
vi.mock("@/components/shell/page-guide", () => ({ PageGuide: () => null }));
vi.mock("@/components/layout/page-shell", () => ({
  PageShell: ({ children, ...rest }: { children: ReactNode }) => <main {...rest}>{children}</main>,
}));
vi.mock("@/components/marketplace/listing-card", () => ({ ListingCard: () => null }));
vi.mock("@/features/feed/use-card-photos", () => ({ useCardPhotos: () => () => null }));

import { SavedPage } from "./saved-page";

function draw() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={client}>
      <SavedPage />
    </QueryClientProvider>,
  );
}

beforeEach(() => {
  language.value = "en";
  mySaved.mockReset();
});

describe("UF-1 saved ads", () => {
  it("UFM-16 saved ads draw loading, their failed read, and Retry reads again uf:S12.1", async () => {
    mySaved
      .mockRejectedValueOnce(readFailed("route 503", 503))
      .mockResolvedValueOnce({ cards: [], next: null });
    draw();
    expect(screen.getByRole("status")).toHaveTextContent(en["common.loading"]);
    const failure = await screen.findByTestId("saved-failed");
    expect(failure).toHaveTextContent(en["account.saved.failed"]);
    expect(failure).toHaveAttribute("data-failure-class", "server 503");
    fireEvent.click(screen.getByRole("button", { name: en["common.retry"] }));
    expect(await screen.findByTestId("saved-empty")).toHaveTextContent(en["account.saved.empty"]);
    expect(mySaved).toHaveBeenCalledTimes(2);
  });

  it("UFM-17 Show more asks for the answered cursor uf:S12.6", async () => {
    mySaved
      .mockResolvedValueOnce({
        cards: [{ id: "saved-1", publicId: null, available: false, coverPhotoId: null }],
        next: "next-cursor",
      })
      .mockResolvedValueOnce({ cards: [], next: null });
    draw();
    fireEvent.click(await screen.findByRole("button", { name: en["account.saved.more"] }));
    await waitFor(() => expect(mySaved).toHaveBeenCalledTimes(2));
    expect(mySaved).toHaveBeenNthCalledWith(1, null, 20);
    expect(mySaved).toHaveBeenNthCalledWith(2, "next-cursor", 20);
    await waitFor(() => expect(screen.queryByTestId("saved-more")).toBeNull());
  });

  it("UFM-18 the saved screen's own words are the Amharic catalogue's uf:S12.8", async () => {
    language.value = "am";
    mySaved.mockRejectedValue(readFailed("route 503", 503));
    draw();
    expect(await screen.findByTestId("saved-failed")).toHaveTextContent(am["account.saved.failed"]);
    for (const key of ["nav.saved", "account.saved.failed", "common.retry"] as const) {
      expect(document.body.textContent).toContain(am[key]);
      if (am[key] !== en[key]) expect(document.body.textContent).not.toContain(en[key]);
    }
  });
});
