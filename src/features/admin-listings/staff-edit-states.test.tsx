import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, fireEvent, screen, waitFor } from "@testing-library/react";
import type { ComponentProps, ReactNode } from "react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { renderPanel as render } from "@/components/ui/dialog-parts-test-render";
import { en } from "@/i18n/locales/en";
import { ownValue } from "@/lib/own-key";
import type { DraftValues } from "@/features/posting/use-draft";

const state = vi.hoisted(() => ({ decide: vi.fn(), navigate: vi.fn(), guard: vi.fn(), may: true }));
vi.mock("@/i18n", async (original) => ({
  ...(await original<typeof import("@/i18n")>()),
  useI18n: () => ({
    t: (key: string) => ownValue(en, key) ?? key,
    language: "en",
    entities: { map: {}, lang: "en" },
  }),
}));
vi.mock("@tanstack/react-router", async (original) => ({
  ...(await original<typeof import("@tanstack/react-router")>()),
  useNavigate: () => state.navigate,
  Link: ({ children }: { children: ReactNode }) => <span>{children}</span>,
}));
vi.mock("@/features/permissions/use-may-call", () => ({
  useMayCall: () => ({ mayCall: () => state.may }),
}));
vi.mock("@/features/auth/mfa/step-up-gate", () => ({
  StepUpGate: ({ children }: { children: (guard: unknown) => ReactNode }) => children(state.guard),
}));
vi.mock("@/features/admin-screening/use-screening", async (original) => ({
  ...(await original<typeof import("@/features/admin-screening/use-screening")>()),
  decideListing: state.decide,
}));
vi.mock("@/features/posting/posting-service", async (original) => ({
  ...(await original<typeof import("@/features/posting/posting-service")>()),
  readSellerIdentity: vi.fn(),
  readSellerLine: vi.fn(),
  readPostingSchema: vi.fn(),
}));
vi.mock("@/features/posting/listing-preview", () => ({ ListingPreview: () => null }));
vi.mock("@/features/posting/use-price-unit-labels", () => ({ usePriceUnitLabels: () => null }));
vi.mock("@/components/shell/location-data", async (original) => ({
  ...(await original<typeof import("@/components/shell/location-data")>()),
  readAreaCookie: () => null,
  useCountryTree: () => ({ loadedCountry: null, nodes: [] }),
}));
vi.mock("@/features/posting/wizard", () => ({
  EditWizard: ({
    actor,
    onDone,
    onDecide,
  }: ComponentProps<typeof import("@/features/posting/wizard").EditWizard>) => (
    <StepReview
      listingId="l1"
      categoryPath=""
      tier={null}
      values={values}
      photos={[]}
      illustrationUrl={null}
      expiryDays={null}
      refusals={[]}
      onChangeExpiry={vi.fn()}
      onGoTo={vi.fn()}
      maxPhotos={null}
      edit={{
        actor: actor ?? "admin",
        reason: { reason: "other", note: "" },
        onReason: vi.fn(),
        onDone,
        onDecide,
      }}
    />
  ),
}));
import { StepReview } from "@/features/posting/step-review";
import { Route } from "@/routes/admin.listings_.$listingId_.edit";
import { decisionRefusalKey } from "@/features/admin-screening/use-screening";
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
  coverage: [],
  contactPref: { messages: true },
};
function draw() {
  const Component = Route.options.component;
  if (typeof Component !== "function") throw new Error("Missing staff edit component");
  render(
    <QueryClientProvider
      client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}
    >
      <Component />
    </QueryClientProvider>,
  );
}
beforeEach(() => {
  state.decide.mockReset();
  state.navigate.mockReset();
  state.guard.mockReset();
  state.may = true;
  state.guard.mockImplementation(async (run: () => Promise<void>) => run());
  vi.spyOn(Route, "useParams").mockReturnValue({ listingId: "l1" });
  vi.spyOn(Route, "useSearch").mockReturnValue({ from: "screening" });
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});
it("UFA-21 Approve and Reject ask confirmation before step-up and the door; ownListing, shared and badValue refusals show their real words uf:A7.5", async () => {
  const order: string[] = [];
  state.guard.mockImplementation(async (run: () => Promise<void>) => {
    order.push("step-up");
    return run();
  });
  for (const next of ["active", "rejected"] as const) {
    for (const code of [
      "ownListing",
      "listingNotFound",
      "illegalTransition",
      "severeRestore",
      "rateLimited",
      "permissionDenied",
      "noteRequired",
      "noteTooLong",
      "noFreeSlot",
      "badValue:status",
    ]) {
      const refusal = new Error(code);
      state.decide.mockReset().mockImplementation(async () => {
        order.push("door");
        throw refusal;
      });
      state.guard.mockClear();
      order.length = 0;
      draw();
      const action = screen.getByRole("button", {
        name: en[next === "active" ? "admin.screening.approve" : "admin.screening.reject"],
      });
      action.focus();
      fireEvent.keyDown(action, { key: "Enter" });
      fireEvent.click(action, { detail: 0 });
      expect(screen.getByTestId("post-edit-confirm")).toBeInTheDocument();
      expect(state.decide).not.toHaveBeenCalled();
      expect(state.guard).not.toHaveBeenCalled();
      if (next === "rejected") {
        fireEvent.click(screen.getByTestId("post-edit-confirm-reason-other"));
        fireEvent.change(screen.getByTestId("post-edit-confirm-note"), {
          target: { value: "Staff note" },
        });
      }
      fireEvent.click(screen.getByTestId("post-edit-confirm-go"));
      expect(await screen.findByTestId("post-edit-decide-problem")).toHaveTextContent(
        en[decisionRefusalKey(refusal)],
      );
      expect(state.decide).toHaveBeenCalledWith(
        "l1",
        next,
        next === "rejected" ? { reason: "other", note: "Staff note" } : null,
      );
      expect(order).toEqual(["step-up", "door"]);
      expect(state.navigate).not.toHaveBeenCalled();
      cleanup();
    }
  }
});
it("UFA-21p without the review door permission neither decision is offered uf:A7.5", () => {
  state.may = false;
  draw();
  expect(screen.queryByRole("button", { name: en["admin.screening.approve"] })).toBeNull();
  expect(screen.queryByRole("button", { name: en["admin.screening.reject"] })).toBeNull();
  expect(state.decide).not.toHaveBeenCalled();
});
