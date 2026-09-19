import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { useShell } from "@/components/app-shell";
import { ContentGrid } from "@/components/layout/content-grid";
import { PageHeader } from "@/components/layout/page-header";
import { PageShell } from "@/components/layout/page-shell";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/use-auth";
import { useI18n } from "@/i18n";
import { supabase } from "@/integrations/supabase/client";
import type { MessageKey } from "@/i18n";

type Profile = {
  seller_alias: string | null;
  seller_type: string | null;
  business_name: string | null;
  display_name: string;
  home_country_code: string | null;
};

type State = {
  profile: Profile | null;
  memberSince: string | null;
  counts: Record<string, number>;
  error: boolean;
};

const initialState: State = { profile: null, memberSince: null, counts: {}, error: false };
const STATUS_KEYS: Record<string, MessageKey> = {
  draft: "account.overview.status.draft",
  screening: "account.overview.status.screening",
  active: "account.overview.status.active",
  paused: "account.overview.status.paused",
  sold: "account.overview.status.sold",
  expired: "account.overview.status.expired",
  rejected: "account.overview.status.rejected",
};

/** The signed-in Account overview, composed only from existing owner reads. */
export function AccountOverview() {
  const { t, language } = useI18n();
  const { user } = useAuth();
  const { setActivePanel } = useShell();
  const [state, setState] = useState<State>(initialState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user === null) return;
    let active = true;
    void (async () => {
      const [profile, listings, authUser] = await Promise.all([
        supabase
          .from("profiles")
          .select("seller_alias,seller_type,business_name,display_name,home_country_code")
          .eq("user_id", user.id)
          .maybeSingle(),
        supabase.from("listings").select("status").eq("seller_id", user.id),
        supabase.auth.getUser(),
      ]);
      if (!active) return;
      if (profile.error || listings.error || authUser.error) {
        setState((current) => ({ ...current, error: true }));
        setLoading(false);
        return;
      }
      const counts = (listings.data ?? []).reduce<Record<string, number>>((result, row) => {
        result[row.status] = (result[row.status] ?? 0) + 1;
        return result;
      }, {});
      setState({
        profile: profile.data,
        memberSince: authUser.data.user?.created_at ?? null,
        counts,
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
                    ? new Intl.DateTimeFormat(language, { dateStyle: "medium" }).format(
                        new Date(state.memberSince),
                      )
                    : t("account.overview.notSet")}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">{t("account.overview.homeCountry")}</dt>
                <dd className="text-foreground">
                  {state.profile?.home_country_code ?? t("account.overview.notSet")}
                </dd>
              </div>
            </dl>
            <Button asChild variant="outline" className="mt-4 min-h-11">
              <Link to="/settings">{t("account.overview.editProfile")}</Link>
            </Button>
          </Section>
          <Section title={t("account.overview.listings")} testid="account-listings-card">
            {Object.keys(state.counts).length === 0 ? (
              <p className="mt-3 text-sm text-muted-foreground">
                {t("account.overview.noListings")}
              </p>
            ) : (
              <dl className="mt-3 grid grid-cols-2 gap-3">
                {Object.entries(state.counts).map(([status, count]) => (
                  <div key={status}>
                    <dt className="text-xs text-muted-foreground">
                      {t(STATUS_KEYS[status] ?? "account.overview.status.draft")}
                    </dt>
                    <dd className="text-lg font-semibold text-foreground">{count}</dd>
                  </div>
                ))}
              </dl>
            )}
            <Button
              variant="outline"
              className="mt-4 min-h-11"
              onClick={() => setActivePanel("my-listings")}
            >
              {t("panel.myListings")}
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
