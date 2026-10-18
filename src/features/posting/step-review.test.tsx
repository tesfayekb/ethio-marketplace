import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { en } from "@/i18n/locales/en";
import { ownValue } from "@/lib/own-key";
import type { DraftValues } from "./use-draft";

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
}));
vi.mock("@tanstack/react-router", () => ({
  Link: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
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
