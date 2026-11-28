import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useEffect, type ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { en } from "@/i18n/locales/en";
import { ownValue } from "@/lib/own-key";
import { actionErrorKey } from "@/features/my-listings/my-listing";
import { buildTree } from "@/features/categories/category-tree";

const editMyListing = vi.hoisted(() => vi.fn());
const readDraft = vi.hoisted(() => vi.fn());
const member = vi.hoisted(() => ({ id: "member-1" }));

vi.mock("@/i18n", async (original) => ({
  ...(await original<typeof import("@/i18n")>()),
  useI18n: () => ({
    t: (key: string) => ownValue(en, key) ?? key,
    language: "en",
    entities: { map: {}, lang: "en" },
  }),
}));
vi.mock("@tanstack/react-router", () => ({
  createFileRoute: () => (options: Record<string, unknown>) => ({
    options,
    useParams: () => ({ listingId: "listing-1" }),
  }),
  Link: ({ to, children, ...rest }: { to: string; children: ReactNode }) => (
    <a href={to} {...rest}>
      {children}
    </a>
  ),
  useNavigate: () => vi.fn(),
}));
vi.mock("@/lib/signed-in-route", () => ({ requireSignedIn: vi.fn() }));
vi.mock("@/lib/page-head", () => ({ pageHead: () => ({ meta: [] }) }));
vi.mock("@/components/shell-context", () => ({
  useShell: () => ({ user: member, authLoading: false }),
}));
vi.mock("@/components/shell/page-guide", () => ({ PageGuide: () => null }));
vi.mock("@/components/shell/location-data", () => ({
  readAreaCookie: () => null,
  useOpenMarkets: () => ({ markets: [] }),
}));
vi.mock("@/features/categories/category-tree", async (original) => ({
  ...(await original<typeof import("@/features/categories/category-tree")>()),
  useCategoryTree: () => ({
    tree: buildTree([], []),
    isLoading: false,
    error: false,
    failure: null,
    retry: vi.fn(),
  }),
}));
vi.mock("@/features/my-listings/my-listing", async (original) => ({
  ...(await original<typeof import("@/features/my-listings/my-listing")>()),
  editMyListing,
}));
vi.mock("@/features/admin-listings/use-admin-listing", async (original) => ({
  ...(await original<typeof import("@/features/admin-listings/use-admin-listing")>()),
  editAdminListing: vi.fn(),
  readAdminListing: vi.fn(),
}));
vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    from: () => ({
      select: () => ({
        eq: () => ({
          order: async () => ({ data: [], error: null }),
        }),
      }),
    }),
  },
}));
vi.mock("@/features/posting/posting-service", async (original) => ({
  ...(await original<typeof import("@/features/posting/posting-service")>()),
  readDraft,
  readSellerIdentity: async () => null,
  readPlaceCountry: async () => null,
  readPostingSchema: async () => null,
  readPostingSchemaAnswer: async () => ({ schema: null, rateLimited: false }),
}));
vi.mock("@/features/legal/certify-block", () => ({
  CertifyBlock: ({
    onChange,
  }: {
    onChange: (state: {
      state: "none";
      versionIds: string[];
      ticked: boolean;
      acceptancePending: boolean;
    }) => void;
  }) => {
    useEffect(() => {
      onChange({ state: "none", versionIds: [], ticked: false, acceptancePending: false });
    }, [onChange]);
    return null;
  },
}));
vi.mock("@/features/posting/listing-preview", () => ({ ListingPreview: () => null }));
vi.mock("@/features/posting/step-category", () => ({ StepCategory: () => null }));
vi.mock("@/features/posting/step-photos", () => ({ StepPhotos: () => null }));
vi.mock("@/features/posting/step-pricing", () => ({ StepPricing: () => null }));
vi.mock("@/features/posting/step-where", () => ({ StepWhere: () => null }));
vi.mock("@/features/posting/step-who", () => ({ StepWho: () => null }));
vi.mock("@/features/posting/step-specifications", () => ({ StepSpecifications: () => null }));
vi.mock("@/features/posting/step-details", () => ({
  StepDetails: ({
    onChange,
    onMissing,
  }: {
    onChange: (patch: { title: string }, immediate: boolean) => void;
    onMissing: (fields: string[]) => void;
  }) => {
    useEffect(() => onMissing([]), [onMissing]);
    return (
      <button type="button" onClick={() => onChange({ title: "Changed title" }, false)}>
        Change the title
      </button>
    );
  },
}));
vi.mock("@/features/posting/step-review", () => ({
  StepReview: ({ onGoTo }: { onGoTo: (step: number) => void }) => (
    <button type="button" onClick={() => onGoTo(5)}>
      Edit the title section
    </button>
  ),
}));

const { Route } = await import("./my-listings_.$listingId_.edit");
const EditPage = Route.options.component;
if (typeof EditPage !== "function") throw new Error("the edit route has no page component");

const answer = {
  draft: {
    id: "listing-1",
    categoryId: "leaf-1",
    draftStep: 8,
    status: "active",
    title: "Original title",
    description: "Description",
    videoUrl: null,
    attributes: {},
    priceMode: "fixed",
    priceAmount: 1000,
    priceCurrency: "ETB",
    pricePeriod: "once",
    priceBp: null,
    priceNegotiable: false,
    posterExpiresAt: null,
    contactPref: { messages: true },
    pin: null,
    pinZoom: null,
    streetAddress: null,
    directions: null,
    photosSoon: false,
  },
  photos: [],
  coverage: [],
};

beforeEach(() => {
  editMyListing.mockReset();
  readDraft.mockReset();
  readDraft.mockResolvedValue(answer);
});

describe("UF-1 the seller's edit route", () => {
  it("UFM-9 every edit door refusal draws its own words on the edit screen uf:S10.3", async () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <EditPage />
      </QueryClientProvider>,
    );
    fireEvent.click(await screen.findByRole("button", { name: "Edit the title section" }));

    const codes = [
      "nothingChanged",
      "inReview",
      "notYourListing",
      "listingNotFound",
      "notEditable",
      "draftNotEdited",
      "renewFirst",
      "listingNotEditable",
      "badShape",
      "streetTooLong",
      "contactInNote",
      "directionsTooLong",
    ];
    for (const code of codes) {
      const key = actionErrorKey(code);
      editMyListing.mockResolvedValueOnce({ ok: false, key });
      fireEvent.click(screen.getByRole("button", { name: "Change the title" }));
      fireEvent.click(screen.getByTestId("post-next"));
      await waitFor(() =>
        expect(screen.getByTestId("post-edit-problem")).toHaveTextContent(en[key]),
      );
      expect(editMyListing).toHaveBeenLastCalledWith("listing-1", { title: "Changed title" });
    }
    expect(editMyListing).toHaveBeenCalledTimes(codes.length);
  });
});
