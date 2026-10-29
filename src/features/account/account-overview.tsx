import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { ContentGrid } from "@/components/layout/content-grid";
import { PageHeader } from "@/components/layout/page-header";
import { PageShell } from "@/components/layout/page-shell";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/use-auth";
import { useI18n } from "@/i18n";
import { supabase } from "@/integrations/supabase/client";

import { CHANNEL_LABELS, savedChannels } from "./saved-channels";
import {
  GROUP_LABEL,
  LISTING_GROUPS,
  readMyListings,
  totalOf,
  type GroupCounts,
} from "@/features/my-listings/my-listings";
import { dateFormatter } from "@/lib/format";
import { currentSession } from "@/lib/supabase-door";
import { readSellerReview } from "@/features/seller/seller-review";
import { SellerReviewNotice } from "@/features/seller/seller-review-notice";

type Profile = {
  seller_alias: string | null;
  seller_type: string | null;
  business_name: string | null;
  display_name: string;
  home_country_code: string | null;
  first_name: string | null;
  last_name: string | null;
  contact_prefs: unknown;
};

type State = {
  profile: Profile | null;
  memberSince: string | null;
  /** Bundle 16 turn 2 (INC-469) — the six groups of My listings, counted by the door. */
  counts: GroupCounts | null;
  /** N1b-2c (INC-977) — the owner's name is held for review. */
  underReview: boolean;
  error: boolean;
};

const initialState: State = {
  profile: null,
  memberSince: null,
  counts: null,
  underReview: false,
  error: false,
};

/** The signed-in Account overview, composed only from existing owner reads. */
export function AccountOverview() {
  const { t, language } = useI18n();
  const { user } = useAuth();
  const [state, setState] = useState<State>(initialState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user === null) return;
    let active = true;
    void (async () => {
      // Turn 34c-5 (INC-933) — the member-since date from the door's session read (local), not
      // a server round trip (`auth.getUser()` was one); a read that failed is the page's error.
      const read = await currentSession();
      const [profile, listings, review] = await Promise.all([
        supabase
          .from("profiles")
          .select(
            "seller_alias,seller_type,business_name,display_name,home_country_code,first_name,last_name,contact_prefs",
          )
          .eq("user_id", user.id)
          .maybeSingle(),
        // Bundle 16 turn 2 (INC-469) — the counts of the six groups come from the
        // door that serves My listings (one row asked for; the counts cover all),
        // so no status is mapped twice and none can fall through to a wrong word.
        readMyListings("live", 1, 0),
        // N1b-2c (INC-977) — a failed review read is the page's error, never "not held".
        readSellerReview().then(
          (held) => ({ held }),
          (error: unknown) => {
            console.error("[seller-review] my_seller_line", error);
            return null;
          },
        ),
      ]);
      if (!active) return;
      if (read.failed || profile.error || listings === null || review === null) {
        setState((current) => ({ ...current, error: true }));
        setLoading(false);
        return;
      }
      setState({
        profile: profile.data,
        memberSince: read.session?.user.created_at ?? null,
        counts: listings.counts,
        underReview: review.held,
        error: false,
      });
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [user]);

  return (
    <PageShell as="main" width="wide" data-testid="account-page-shell">
      <PageHeader title={t("account.overview.title")} />
      {loading ? <p className="mt-4 text-sm text-muted-foreground">{t("common.loading")}</p> : null}
      {state.error ? (
        <p role="alert" className="mt-4 text-sm text-destructive">
          {t("account.overview.loadError")}
        </p>
      ) : null}
      {!loading && !state.error ? (
        <ContentGrid className="mt-6">
          <Section title={t("account.overview.profile")} testid="account-profile-card">
            <dl className="mt-4 grid gap-3 text-sm">
              <div>
                <dt className="text-muted-foreground">{t("account.overview.alias")}</dt>
                <dd className="text-foreground">
                  {state.profile?.seller_alias ?? t("account.overview.notSet")}
                </dd>
                <dd className="mt-1">
                  <SellerReviewNotice
                    underReview={state.underReview}
                    testId="account-seller-review"
                  />
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">{t("account.overview.sellerType")}</dt>
                <dd className="text-foreground">
                  {state.profile?.seller_type ?? t("account.overview.notSet")}
                </dd>
              </div>
              {state.profile?.business_name ? (
                <div>
                  <dt className="text-muted-foreground">{t("account.overview.business")}</dt>
                  <dd className="text-foreground">{state.profile.business_name}</dd>
                </div>
              ) : null}
              <div>
                <dt className="text-muted-foreground">{t("account.overview.memberSince")}</dt>
                <dd className="text-foreground">
                  {state.memberSince
                    ? dateFormatter("day", language).format(new Date(state.memberSince))
                    : t("account.overview.notSet")}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">{t("account.overview.homeCountry")}</dt>
                <dd className="text-foreground">
                  {state.profile?.home_country_code ?? t("account.overview.notSet")}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">{t("account.overview.fullName")}</dt>
                <dd className="text-foreground" data-testid="account-profile-name">
                  {[state.profile?.first_name, state.profile?.last_name]
                    .filter(
                      (part): part is string => typeof part === "string" && part.trim() !== "",
                    )
                    .join(" ") || t("account.overview.notSet")}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">{t("account.overview.channels")}</dt>
                <dd className="text-foreground">
                  {savedChannels(state.profile?.contact_prefs ?? null).length === 0 ? (
                    t("account.overview.notSet")
                  ) : (
                    <ul className="grid gap-1" data-testid="account-profile-channels">
                      {savedChannels(state.profile?.contact_prefs ?? null).map((entry) => (
                        <li key={entry.channel} data-channel={entry.channel}>
                          <span className="text-muted-foreground">
                            {t(CHANNEL_LABELS[entry.channel])}:{" "}
                          </span>
                          <bdi dir="ltr">{entry.value}</bdi>{" "}
                          <span className="text-xs text-muted-foreground">
                            {t(
                              entry.show
                                ? "account.overview.channelShown"
                                : "account.overview.channelHidden",
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </dd>
              </div>
            </dl>
            <Button asChild variant="outline" className="mt-4 min-h-11">
              <Link to="/settings">{t("account.overview.editProfile")}</Link>
            </Button>
          </Section>
          <Section title={t("account.overview.listings")} testid="account-listings-card">
            {state.counts === null || totalOf(state.counts) === 0 ? (
              <p className="mt-3 text-sm text-muted-foreground">
                {t("account.overview.noListings")}
              </p>
            ) : (
              <dl className="mt-3 grid grid-cols-2 gap-3" data-testid="account-listings-counts">
                {LISTING_GROUPS.filter((group) => (state.counts?.[group] ?? 0) > 0).map((group) => (
                  <div key={group} data-group={group}>
                    <dt className="text-xs text-muted-foreground">{t(GROUP_LABEL[group])}</dt>
                    <dd className="text-lg font-semibold text-foreground">
                      {state.counts?.[group]}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
            <Button asChild variant="outline" className="mt-4 min-h-11">
              <Link to="/my-listings" data-testid="account-open-listings">
                {t("account.overview.openListings")}
              </Link>
            </Button>
          </Section>
          <Section title={t("account.overview.saved")} testid="account-saved-card">
            <p className="mt-3 text-sm text-muted-foreground">
              {t("account.overview.nothingSaved")}
            </p>
          </Section>
          <Section title={t("account.overview.notifications")} testid="account-notifications-card">
            <p className="mt-3 text-sm text-muted-foreground">
              {t("account.overview.noNotifications")}
            </p>
          </Section>
          <Section title={t("account.legal.title")} testid="account-legal-card">
            <p className="mt-3 text-sm text-muted-foreground">{t("account.legal.body")}</p>
            <Button asChild variant="outline" className="mt-4 min-h-11">
              <Link to="/account/legal" data-testid="account-open-legal">
                {t("account.legal.open")}
              </Link>
            </Button>
          </Section>
          <Section title={t("account.overview.quickActions")} testid="account-actions-card">
            <div className="mt-4 flex flex-wrap gap-2">
              <Button asChild>
                <Link to="/post">{t("nav.postListing")}</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/settings">{t("nav.signInSecurity")}</Link>
              </Button>
            </div>
          </Section>
        </ContentGrid>
      ) : null}
    </PageShell>
  );
}

export default AccountOverview;
