import { Link, useNavigate } from "@tanstack/react-router";
import { Package } from "lucide-react";

import { NegotiableBadge } from "@/components/marketplace/listing-card";
import { ColumnsButton } from "@/components/shell/columns-button";
import { useHiddenColumns, visibleColumns } from "@/components/shell/columns-state";
import {
  DataTable,
  DataTablePagination,
  type DataTableColumn,
} from "@/components/shell/data-table";
import { DetailPanel } from "@/components/shell/detail-panel";
import { PageCard } from "@/components/shell/page-card";
import { TableActions } from "@/components/shell/table-actions";
import { TableToolbar } from "@/components/shell/table-toolbar";
import { useKeptPage } from "@/components/shell/use-kept-page";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCommission } from "@/features/posting/price-basis";
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
const TABLE_ID = "admin-impersonated-listings";
const LOCKED = ["title"];

/**
 * Bundle 11 G2b (D118, D128, D132) — the agreed look: the page's heading (whose
 * view this is) with the countdown in the header; the read-only note and End
 * now under it, unchanged; the seller's listings with Columns, one card per
 * listing below md (the title, its status pill, Price and Created as facts).
 * Nothing here writes: the session is read-only (the doors refuse every write).
 */
export function ImpersonationView({ sessionId }: { sessionId: string }) {
  const { t, language } = useI18n();
  const [hidden, toggleColumn] = useHiddenColumns(TABLE_ID);
  const navigate = useNavigate();
  const profile = useImpersonatedProfile(sessionId);
  /** G3a (the operator's walk; INC-546) — every table has its footer; the door pages the listings. */
  const paging = useKeptPage("ethio.admin.impersonation.pageSize");
  const listings = useImpersonatedListings(
    sessionId,
    paging.pageSize,
    paging.page * paging.pageSize,
  );
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
      card: "title",
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
      card: "badge",
      cell: (row) => (
        // D132 — a state as a soft pill; the stored status word, as before.
        <Badge variant="neutral" data-testid={`impersonated-listing-${row.id}-status`}>
          {row.status}
        </Badge>
      ),
    },
    {
      key: "price",
      header: t("impersonation.listings.price"),
      priority: "secondary",
      width: "w-[18%]",
      card: "meta",
      cell: (row) => (
        <span className="flex flex-wrap items-center gap-2 tabular-nums text-muted-foreground">
          <span>
            {row.priceMode === "commission" && row.priceBp !== null
              ? t("price.commission").replace("{percent}", formatCommission(row.priceBp))
              : row.priceAmount === null
                ? "—"
                : `${row.priceAmount} ${row.priceCurrency ?? ""}`}
          </span>
          {row.priceNegotiable ? <NegotiableBadge /> : null}
        </span>
      ),
    },
    {
      key: "created",
      header: t("impersonation.listings.created"),
      priority: "detail",
      width: "w-[18%]",
      card: "meta",
      cell: (row) => (
        <span className="block text-muted-foreground">{fmt.format(new Date(row.createdAt))}</span>
      ),
    },
  ];

  const visible = visibleColumns(columns, hidden, LOCKED);
  const targetName = profile.data?.displayName ?? t("impersonation.unknownTarget");

  return (
    <div data-testid="impersonation-view" className="min-w-0 space-y-4">
      <TableActions
        testid="impersonation-header"
        title={t("impersonation.title").replace("{name}", targetName)}
      >
        {countdown ? (
          <span
            data-testid="impersonation-countdown"
            className="text-sm tabular-nums text-muted-foreground"
          >
            {t("impersonation.endsIn")} {countdown}
          </span>
        ) : null}
      </TableActions>

      <PageCard testid="impersonation-readonly-note">
        <p className="text-sm text-foreground">{t("impersonation.readOnlyNote")}</p>
        <p data-testid="impersonation-roadmap-note" className="mt-2 text-xs text-muted-foreground">
          {t("impersonation.roadmapNote")}
        </p>
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

      <DataTable<ImpersonatedListing>
        columns={visible}
        rows={listings.data?.rows ?? []}
        pagination={
          <DataTablePagination
            testid="impersonation-listings-pagination"
            offset={paging.page * paging.pageSize}
            pageSize={paging.pageSize}
            total={listings.data?.totalCount ?? 0}
            onPrevious={() => paging.setPage((current) => Math.max(0, current - 1))}
            onNext={() => paging.setPage((current) => current + 1)}
            onPage={paging.setPage}
            pageSizeOptions={paging.pageSizeOptions}
            onPageSize={paging.setPageSize}
          />
        }
        rowKey={(row) => row.id}
        rowTestId={(row) => `impersonated-listing-${row.id}`}
        caption={t("impersonation.listings.caption")}
        cardLead={() => <Package />}
        toolbar={
          <TableToolbar
            testid="impersonation-listings-toolbar"
            columns={
              <ColumnsButton
                testid="impersonation-listings-columns"
                columns={columns.map((column) => ({
                  key: column.key,
                  label: String(column.header),
                  locked: LOCKED.includes(column.key),
                }))}
                hidden={hidden}
                onToggle={toggleColumn}
              />
            }
          />
        }
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
