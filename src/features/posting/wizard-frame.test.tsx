import { act, cleanup, render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { beforeEach, expect, it, vi } from "vitest";
import { en } from "@/i18n/locales/en";
import { am } from "@/i18n/locales/am";
import { ownValue } from "@/lib/own-key";
import { buildTree } from "@/features/categories/category-tree";
import type { UseDraft } from "./use-draft";
import type { UseEditDraft } from "./use-edit-draft";

const state = vi.hoisted(() => ({
  authLoading: false,
  amharic: false,
  draft: null as UseDraft | null,
  edit: null as UseEditDraft | null,
}));
vi.mock("@/i18n", async (original) => ({
  ...(await original<typeof import("@/i18n")>()),
  useI18n: () => ({
    t: (key: string) => ownValue(state.amharic ? am : en, key) ?? key,
    language: state.amharic ? "am" : "en",
    entities: { map: {}, lang: state.amharic ? "am" : "en" },
  }),
}));
vi.mock("@/components/shell-context", () => ({
  useShell: () => ({ user: { id: "member-1" }, authLoading: state.authLoading }),
}));
vi.mock("@tanstack/react-router", async (original) => ({
  ...(await original<typeof import("@tanstack/react-router")>()),
  useNavigate: () => vi.fn(),
}));
vi.mock("@/features/categories/category-tree", async (original) => ({
  ...(await original<typeof import("@/features/categories/category-tree")>()),
  useCategoryTree: () => ({
    tree: buildTree([], []),
    isLoading: false,
    error: false,
    retry: vi.fn(),
  }),
}));
vi.mock("@/components/shell/location-data", () => ({
  readAreaCookie: () => null,
  useOpenMarkets: () => ({ markets: [] }),
}));
vi.mock("./use-draft", () => ({ useDraft: () => state.draft }));
vi.mock("./use-edit-draft", () => ({ useEditDraft: () => state.edit }));
vi.mock("./posting-service", () => ({
  readSellerIdentity: async () => null,
  readPlaceCountry: async () => null,
  readPostingSchema: async () => null,
  readPostingSchemaAnswer: async () => ({ schema: null, rateLimited: false }),
}));
vi.mock("./step-category", () => ({ StepCategory: () => null }));
vi.mock("./step-details", () => ({ StepDetails: () => null }));
vi.mock("./step-review", () => ({ StepReview: () => null }));
vi.mock("./step-specifications", () => ({ StepSpecifications: () => null }));
vi.mock("./step-photos", () => ({ StepPhotos: () => null }));
vi.mock("./step-pricing", () => ({ StepPricing: () => null }));
vi.mock("./step-where", () => ({ StepWhere: () => null }));
vi.mock("./step-who", () => ({ StepWho: () => null }));
vi.mock("@/features/legal/certify-block", () => ({ CertifyBlock: () => null }));
import { PostingWizard, EditWizard } from "./wizard";

beforeEach(() => {
  state.authLoading = false;
  state.amharic = false;
  state.draft = {
    listingId: null,
    step: 1,
    draftStep: 1,
    values: {
      categoryId: null,
      attributes: {},
      title: "",
      description: "",
      videoUrl: "",
      priceMode: "fixed",
      priceAmount: null,
      priceCurrency: null,
      pricePeriod: null,
      priceBp: null,
      priceNegotiable: false,
      posterExpiresAt: "",
      coverage: [],
      contactPref: { messages: true },
    },
    saveState: "idle",
    refusals: [],
    goTo: vi.fn(),
    change: vi.fn(),
    saveAt: vi.fn(async () => false),
    rewindTo: vi.fn(async () => false),
    retry: vi.fn(),
    nextBlockedByTransport: false,
    pauseSeconds: 0,
    photos: [],
    reloadPhotos: vi.fn(),
    pin: null,
    setPin: vi.fn(),
    directions: null,
    setDirections: vi.fn(),
    photosSoon: false,
    setPhotosSoon: vi.fn(),
    tier: null,
    loading: false,
    loadError: null,
    loadFailure: null,
    reload: vi.fn(),
  };
  state.edit = {
    ...state.draft,
    mode: "edit",
    actor: "seller",
    locked: [1],
    outcome: null,
    problem: null,
    placeText: { streetAddress: null, directions: null },
    setPlaceText: vi.fn(),
    reason: { reason: "", note: "" },
    setReason: vi.fn(),
    status: "active",
    caps: null,
    discard: vi.fn(),
    setCertification: vi.fn(),
  };
});
async function draw(edit = false) {
  await act(async () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        {edit ? (
          <EditWizard listingId="member-ad" actor="seller" onDone={vi.fn()} />
        ) : (
          <PostingWizard listingId={null} />
        )}
      </QueryClientProvider>,
    );
  });
}
it("UFW-1 the opening form draws its loading caption uf:S7.2", async () => {
  state.authLoading = true;
  await draw();
  expect(screen.getByTestId("post-loading")).toHaveTextContent(en["post.loading"]);
});
it("UFW-2 a paused save draws the remaining seconds uf:S7.7", async () => {
  if (state.draft === null) throw new Error("missing draft");
  state.draft.pauseSeconds = 17;
  await draw();
  expect(screen.getByTestId("post-save-paused").textContent).toBe(
    en["post.save.paused"].replace("{seconds}", "17"),
  );
});
it("UFW-3 the edit frame draws its problem words uf:S7.8", async () => {
  if (state.edit === null) throw new Error("missing edit");
  state.edit.problem = "myListings.error.failed";
  await draw(true);
  expect(screen.getByTestId("post-edit-problem")).toHaveTextContent(en["myListings.error.failed"]);
});
it("UFW-4 submit refusals reach the wizard summary as words uf:S7.15", async () => {
  if (state.draft === null) throw new Error("missing draft");
  for (const [reason, key] of [
    ["notYourListing", "post.refusal.notYourListing"],
    ["notADraft", "post.refusal.alreadySubmitted"],
    ["listingNotFound", "post.refusal.listingNotFound"],
  ] as const) {
    state.draft.refusals = [{ field: "title", reason }];
    await draw();
    expect(screen.getByText(en[key])).toBeVisible();
    cleanup();
  }
});
it("UFW-5 the frame draws the Amharic catalogue uf:S7.17", async () => {
  state.amharic = true;
  state.authLoading = true;
  await draw();
  expect(screen.getByTestId("post-loading")).toHaveTextContent(am["post.loading"]);
  if (am["post.loading"] !== en["post.loading"])
    expect(screen.queryByText(en["post.loading"])).not.toBeInTheDocument();
});
it("UFW-7 a category refusal at Next draws the category words in the wizard uf:S7s1.10", async () => {
  if (state.draft === null) throw new Error("missing draft");
  state.draft.refusals = [{ field: "category_id", reason: "categoryNotPostable" }];
  await draw();
  expect(screen.getByText(en["post.refusal.categoryNotPostable"])).toBeVisible();
});
