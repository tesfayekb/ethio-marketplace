import { Link, useNavigate } from "@tanstack/react-router";

import { DataTable, type DataTableColumn } from "@/components/shell/data-table";
import { DetailPanel } from "@/components/shell/detail-panel";
import { PageCard } from "@/components/shell/page-card";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n";

import { isExpiredSessionError, type ImpersonatedListing } from "./impersonation-service";
import {
  useActiveImpersonation,
  useCountdown,
  useEndImpersonation,
  useImpersonatedListings,
  useImpersonatedProfile,
} from "./use-impersonation";

/**
 * U3 / DEC-016 — THE IMPERSONATION VIEW (v1, READ-ONLY BY CONSTRUCTION).
 *
 * Everything on this page comes from two definer RPCs that re-verify the
 * session box (owner, not ended, not expired) on every call. There is no
 * write path here at all: no row actions, no forms, no mutations except
 * ending the session itself.
 */
export function ImpersonationView({ sessionId }: { sessionId: string }) {
  const { t, language } = useI18n();
  const navigate = useNavigate();
  const profile = useImpersonatedProfile(sessionId);
  const listings = useImpersonatedListings(sessionId);
  const end = useEndImpersonation();

  const active = useActiveImpersonation(true);
  const expired =
    isExpiredSessionError(profile.error) ||
    isExpiredSessionError(listings.error) ||
    (active.isFetched && active.data?.id !== sessionId);
  const countdown = useCountdown(expired ? null : (active.data?.expiresAt ?? null));

  const fmt = new Intl.DateTimeFormat(language === "am" ? "am-ET" : "en-GB", {
    dateStyle: "medium",
  });

  if (expired) {
    return (
      <PageCard testid="impersonation-expired" className="space-y-3">
        <p role="alert" className="text-sm text-destructive">
          {t("impersonation.expired")}
        </p>
        <Link
          to="/admin/users"
          data-testid="impersonation-back"
          className="inline-flex min-h-11 items-center text-sm text-muted-foreground underline underline-offset-4"
        >
          {t("impersonation.backToUser")}
        </Link>
      </PageCard>
    );
  }

  const columns: DataTableColumn<ImpersonatedListing>[] = [
    {
      key: "title",
      header: t("impersonation.listings.title"),
      priority: "primary",
      width: "w-[46%]",
      cell: (row) => (
        <span className="block truncate text-foreground" title={row.title}>
          {row.title}
        </span>
      ),
    },
    {
      key: "status",
      header: t("impersonation.listings.status"),
      priority: "primary",
      width: "w-[18%]",
      cell: (row) => <span className="block text-muted-foreground">{row.status}</span>,
    },
    {
      key: "price",
      header: t("impersonation.listings.price"),
      priority: "secondary",
      width: "w-[18%]",
      cell: (row) => (
        <span className="block tabular-nums text-muted-foreground">
          {row.priceAmount === null ? "—" : `${row.priceAmount} ${row.priceCurrency ?? ""}`}
        </span>
      ),
    },
    {
      key: "created",
      header: t("impersonation.listings.created"),
      priority: "detail",
      width: "w-[18%]",
      cell: (row) => (
        <span className="block text-muted-foreground">{fmt.format(new Date(row.createdAt))}</span>
      ),
    },
  ];

  const targetName = profile.data?.displayName ?? t("impersonation.unknownTarget");

  return (
    <div data-testid="impersonation-view" className="min-w-0 space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="min-w-0 truncate text-lg font-semibold text-foreground">
          {t("impersonation.title").replace("{name}", targetName)}
        </h1>
        {countdown ? (
          <span data-testid="impersonation-countdown" className="text-sm tabular-nums">
            {t("impersonation.endsIn")} {countdown}
          </span>
        ) : null}
      </div>

      <PageCard testid="impersonation-readonly-note">
        <p className="text-sm text-muted-foreground">{t("impersonation.readOnlyNote")}</p>
        <Button
          className="mt-3 min-h-11 w-full sm:w-auto"
          variant="destructive"
          data-testid="impersonation-end"
          disabled={end.isPending}
          onClick={() => {
            end.mutate(sessionId, {
              onSuccess: () => {
                const targetId = profile.data?.targetId;
                void (targetId
                  ? navigate({ to: "/admin/users/$userId", params: { userId: targetId } })
                  : navigate({ to: "/admin/users" }));
              },
            });
          }}
        >
          {t("impersonation.endNow")}
        </Button>
      </PageCard>

      <DetailPanel
        testid="impersonation-profile"
        title={t("impersonation.profileTitle")}
        loading={profile.isLoading}
        error={profile.error}
        pairs={
          profile.data
            ? [
                { label: t("impersonation.profile.name"), value: profile.data.displayName },
                {
                  label: t("impersonation.profile.alias"),
                  value: profile.data.sellerAlias ?? "—",
                },
                {
                  label: t("impersonation.profile.country"),
                  value: profile.data.homeCountryCode ?? "—",
                },
                { label: t("impersonation.profile.status"), value: profile.data.accountStatus },
                {
                  label: t("impersonation.profile.joined"),
                  value: fmt.format(new Date(profile.data.createdAt)),
                },
              ]
            : []
        }
      />

      <DataTable
        columns={columns}
        rows={listings.data?.rows ?? []}
        rowKey={(row) => row.id}
        rowTestId={(row) => `impersonated-listing-${row.id}`}
        caption={t("impersonation.listings.caption")}
        loading={listings.isLoading}
        error={listings.error}
        emptyState={
          <p className="text-sm text-muted-foreground">{t("impersonation.listings.empty")}</p>
        }
      />
    </div>
  );
}

export default ImpersonationView;
