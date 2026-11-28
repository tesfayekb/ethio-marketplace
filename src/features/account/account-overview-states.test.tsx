import { fireEvent, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { am } from "@/i18n/locales/am";
import { en } from "@/i18n/locales/en";
import { ownValue } from "@/lib/own-key";

const language = vi.hoisted(() => ({ value: "en" as "en" | "am" }));
const session = vi.hoisted(() => vi.fn());
const maybeSingle = vi.hoisted(() => vi.fn());
const readMyListings = vi.hoisted(() => vi.fn());
const readSellerReview = vi.hoisted(() => vi.fn());
const member = vi.hoisted(() => ({ id: "member-1" }));

vi.mock("@/i18n", async (original) => ({
  ...(await original<typeof import("@/i18n")>()),
  useI18n: () => ({
    t: (key: string) => ownValue(language.value === "am" ? am : en, key) ?? key,
    language: language.value,
    entities: { map: {}, lang: language.value },
  }),
}));
vi.mock("@/components/shell-context", () => ({
  useShell: () => ({ user: member }),
}));
vi.mock("@tanstack/react-router", () => ({
  Link: ({ to, children, ...rest }: { to: string; children: ReactNode }) => (
    <a href={to} {...rest}>
      {children}
    </a>
  ),
}));
vi.mock("@/components/shell/page-guide", () => ({ PageGuide: () => null }));
vi.mock("@/lib/supabase-door", () => ({ currentSession: session }));
vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    from: () => ({
      select: () => ({ eq: () => ({ maybeSingle }) }),
    }),
  },
}));
vi.mock("@/features/my-listings/my-listings", async (original) => ({
  ...(await original<typeof import("@/features/my-listings/my-listings")>()),
  readMyListings,
}));
vi.mock("@/features/seller/seller-review", () => ({ readSellerReview }));

import { AccountOverview } from "./account-overview";

const counts = {
  live: 0,
  review: 0,
  attention: 0,
  closed: 0,
  sold: 0,
  drafts: 0,
};
const profile = {
  seller_alias: "scratch",
  seller_type: "individual",
  business_name: null,
  display_name: "Scratch",
  home_country_code: "ET",
  first_name: "A",
  last_name: "Member",
  contact_prefs: null,
};
const goodSession = {
  failed: false,
  session: { user: { created_at: "2026-01-01T00:00:00Z" } },
};

beforeEach(() => {
  language.value = "en";
  session.mockReset();
  maybeSingle.mockReset();
  readMyListings.mockReset();
  readSellerReview.mockReset();
  session.mockResolvedValue(goodSession);
  maybeSingle.mockResolvedValue({ data: profile, error: null });
  readMyListings.mockResolvedValue({
    counts,
    rows: [],
    renewAllowed: true,
    renewDays: 30,
  });
  readSellerReview.mockResolvedValue(false);
});

describe("UF-1 the account overview", () => {
  it("UFM-10 the overview draws loading, its failed read, and Retry reads again uf:S11.1", async () => {
    session.mockReset();
    session
      .mockResolvedValueOnce({ failed: true, session: null })
      .mockResolvedValueOnce(goodSession);
    render(<AccountOverview />);
    expect(screen.getByText(en["common.loading"])).toBeInTheDocument();
    expect(await screen.findByTestId("account-overview-failed")).toHaveTextContent(
      en["account.overview.loadError"],
    );
    fireEvent.click(screen.getByRole("button", { name: en["common.retry"] }));
    expect(await screen.findByTestId("account-profile-card")).toBeInTheDocument();
    expect(session).toHaveBeenCalledTimes(2);
  });

  it("UFM-11 Edit profile is a named link to Settings uf:S11.3", async () => {
    render(<AccountOverview />);
    const link = await screen.findByRole("link", { name: en["account.overview.editProfile"] });
    expect(link).toHaveAttribute("href", "/settings");
  });

  it("UFM-12 the Saved and notifications cards draw their empty words uf:S11.5", async () => {
    render(<AccountOverview />);
    expect(await screen.findByTestId("account-saved-card")).toHaveTextContent(
      en["account.overview.nothingSaved"],
    );
    expect(screen.getByTestId("account-notifications-card")).toHaveTextContent(
      en["account.overview.noNotifications"],
    );
  });

  it("UFM-13 both quick actions are named links to their own screens uf:S11.7", async () => {
    render(<AccountOverview />);
    expect(await screen.findByRole("link", { name: en["nav.postListing"] })).toHaveAttribute(
      "href",
      "/post",
    );
    expect(screen.getByRole("link", { name: en["nav.signInSecurity"] })).toHaveAttribute(
      "href",
      "/settings",
    );
  });

  it("UFM-14 a seller name held for review draws the shared notice uf:S11.8", async () => {
    readSellerReview.mockResolvedValue(true);
    render(<AccountOverview />);
    expect(await screen.findByTestId("account-seller-review")).toHaveTextContent(
      en["post.seller.underReview"],
    );
  });

  it("UFM-15 the overview's own words are the Amharic catalogue's uf:S11.9", async () => {
    language.value = "am";
    readSellerReview.mockResolvedValue(true);
    render(<AccountOverview />);
    expect(await screen.findByTestId("account-profile-card")).toBeInTheDocument();
    const keys = [
      "account.overview.title",
      "account.overview.profile",
      "account.overview.editProfile",
      "account.overview.nothingSaved",
      "account.overview.noNotifications",
      "account.overview.quickActions",
      "nav.postListing",
      "nav.signInSecurity",
      "post.seller.underReview",
    ] as const;
    for (const key of keys) {
      expect(document.body.textContent).toContain(am[key]);
      if (am[key] !== en[key]) expect(document.body.textContent).not.toContain(en[key]);
    }
  });
});
