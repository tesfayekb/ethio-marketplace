import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import {
  DataTable,
  DataTablePagination,
  type DataTableColumn,
} from "@/components/shell/data-table";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdminShell } from "@/features/admin/admin-context";
import { sectionById } from "@/features/admin/sections";
import { StepUpGate } from "@/features/auth/mfa/step-up-gate";
import { stepUpAbortKey } from "@/features/auth/mfa/use-step-up";
import { nearestCategoryPicture, useCategoryTree } from "@/features/categories/category-tree";
import { PreviewSheet } from "@/features/posting/preview/preview-sheet";
import { useI18n, type MessageKey } from "@/i18n";

import {
  ADMIN_SCREENING_KEY,
  SCREENING_PAGE_SIZE,
  decideListing,
  useScreeningPhotos,
  useScreeningQueue,
  type ScreeningRow,
} from "./use-screening";

/**
 * Bundle 10 E3a — ADMIN › SCREENING (D109).
 *
 * `listings:review` opens the section (the /admin layout's gate, DEC-163); the
 * queue's rows are read under `listings:view` (RLS `listings_admin_read`); the
 * Approve/Reject buttons render only with `listings:review`, and the door
 * (`transition_listing`) re-checks `listings:review` and a fresh second factor
 * (F3). The outcome line is an inline live region: no <Toaster/> is mounted in
 * this app (the translations console's precedent).
 */

type Decision = { row: ScreeningRow; next: "active" | "rejected" } | null;
type Notice = { key: MessageKey; tone: "ok" | "error" } | null;

export function AdminScreeningPage() {
  const { t, language } = useI18n();
  const { permissions } = useAdminShell();
  const mayReview = permissions.includes("listings:review");
  const section = sectionById("screening");
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [decision, setDecision] = useState<Decision>(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<Notice>(null);
  const [previewRow, setPreviewRow] = useState<ScreeningRow | null>(null);
  // INC-525 — the preview draws the ad's category picture as the card does.
  const { tree } = useCategoryTree();

  const query = useScreeningQueue(page, search);
  const photos = useScreeningPhotos(previewRow?.id ?? null);

  const named = (value: ScreeningRow["category"]) =>
    value === null ? "—" : language === "am" && value.name_am ? value.name_am : value.name_en;

  const sentAt = (iso: string) =>
    new Intl.DateTimeFormat(language, { dateStyle: "short", timeStyle: "short" }).format(
      new Date(iso),
    );

  const columns: DataTableColumn<ScreeningRow>[] = [
    {
      key: "title",
      header: t("admin.screening.col.title"),
      priority: "primary",
      cell: (row) => <span className="min-w-0 break-words font-medium">{row.title}</span>,
    },
    {
      key: "category",
      header: t("admin.screening.col.category"),
      priority: "secondary",
      cell: (row) => <span className="text-sm">{named(row.category)}</span>,
    },
    {
      key: "place",
      header: t("admin.screening.col.place"),
      priority: "secondary",
      cell: (row) => <span className="text-sm">{named(row.place)}</span>,
    },
    {
      key: "sent",
      header: t("admin.screening.col.sent"),
      priority: "detail",
      cell: (row) => <span className="text-sm tabular-nums">{sentAt(row.updatedAt)}</span>,
    },
  ];

  const rowActions = (row: ScreeningRow) => (
    <span className="flex flex-wrap items-center gap-2 xl:justify-end">
      <Button
        type="button"
        variant="outline"
        size="touch"
        data-testid={`admin-screening-open-${row.id}`}
        onClick={() => setPreviewRow(row)}
      >
        {t("admin.screening.open")}
      </Button>
      {mayReview ? (
        <>
          <Button
            type="button"
            size="touch"
            data-testid={`admin-screening-approve-${row.id}`}
            onClick={() => setDecision({ row, next: "active" })}
          >
            {t("admin.screening.approve")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="touch"
            data-testid={`admin-screening-reject-${row.id}`}
            onClick={() => setDecision({ row, next: "rejected" })}
          >
            {t("admin.screening.reject")}
          </Button>
        </>
      ) : null}
    </span>
  );

  const data = query.data;

  return (
    <StepUpGate>
      {(guard) => {
        const decide = async () => {
          if (decision === null) return;
          const { row, next } = decision;
          setBusy(true);
          setNotice(null);
          try {
            await guard(() => decideListing(row.id, next));
            setDecision(null);
            setNotice({
              key: next === "active" ? "admin.screening.approved" : "admin.screening.rejected",
              tone: "ok",
            });
            await queryClient.invalidateQueries({ queryKey: ADMIN_SCREENING_KEY });
          } catch (error) {
            setDecision(null);
            const abort = stepUpAbortKey(error);
            if (abort === null) return;
            console.error("[screening] decision failed", error);
            setNotice({ key: abort ?? "common.error", tone: "error" });
          } finally {
            setBusy(false);
          }
        };

        return (
          <div data-testid="admin-section-screening" className="min-w-0 space-y-4">
            <div>
              <h1 className="min-w-0 truncate text-lg font-semibold text-foreground">
                {t(section.titleKey)}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">{t(section.bodyKey)}</p>
            </div>

            <p
              role="status"
              aria-live="polite"
              data-testid="admin-screening-notice"
              className={
                notice?.tone === "error" ? "text-sm text-destructive" : "text-sm text-foreground"
              }
            >
              {notice === null ? null : t(notice.key)}
            </p>

            <DataTable<ScreeningRow>
              columns={columns}
              rows={data?.rows ?? []}
              rowKey={(row) => row.id}
              rowTestId={(row) => `admin-screening-row-${row.id}`}
              caption={t(section.titleKey)}
              cardUntil="lg"
              loading={query.isLoading}
              loadingState={<p className="text-sm">{t("common.loading")}</p>}
              error={query.error}
              errorState={
                <div className="flex flex-wrap items-center gap-2">
                  <p role="alert" className="text-sm text-destructive">
                    {t("common.error")}
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="touch"
                    onClick={() => void query.refetch()}
                  >
                    {t("common.retry")}
                  </Button>
                </div>
              }
              emptyState={
                <p data-testid="admin-screening-empty" className="text-sm text-muted-foreground">
                  {t("admin.screening.empty")}
                </p>
              }
              toolbar={
                <div className="flex flex-wrap items-center gap-2">
                  <Input
                    data-testid="admin-screening-search"
                    className="md:w-72"
                    aria-label={t("admin.screening.search")}
                    placeholder={t("admin.screening.search")}
                    value={search}
                    onChange={(event) => {
                      setSearch(event.target.value);
                      setPage(0);
                    }}
                  />
                </div>
              }
              rowActions={rowActions}
              pagination={
                <DataTablePagination
                  testid="admin-screening-pagination"
                  offset={page * SCREENING_PAGE_SIZE}
                  pageSize={SCREENING_PAGE_SIZE}
                  total={data?.total ?? 0}
                  onPrevious={() => setPage((current) => Math.max(0, current - 1))}
                  onNext={() => setPage((current) => current + 1)}
                />
              }
            />

            <AlertDialog
              open={decision !== null}
              onOpenChange={(open) => {
                if (!open && !busy) setDecision(null);
              }}
            >
              <AlertDialogContent data-testid="admin-screening-confirm">
                <AlertDialogTitle>
                  {decision?.next === "rejected"
                    ? t("admin.screening.confirmReject")
                    : t("admin.screening.confirmApprove")}
                </AlertDialogTitle>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={busy} className="min-h-11">
                    {t("common.cancel")}
                  </AlertDialogCancel>
                  <Button
                    type="button"
                    className="min-h-11"
                    data-testid="admin-screening-confirm-go"
                    disabled={busy}
                    onClick={() => void decide()}
                  >
                    {decision?.next === "rejected"
                      ? t("admin.screening.reject")
                      : t("admin.screening.approve")}
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {previewRow !== null ? (
              <PreviewSheet
                onClose={() => setPreviewRow(null)}
                view={{
                  title: previewRow.title,
                  description: previewRow.description,
                  priceMode: previewRow.priceMode,
                  priceAmount: previewRow.priceAmount,
                  priceCurrency: previewRow.priceCurrency,
                  pricePeriod: previewRow.pricePeriod,
                  priceBp: previewRow.priceBp,
                  priceNegotiable: previewRow.priceNegotiable,
                  attributes: previewRow.attributes,
                  definitions: [],
                  attributeOptions: {},
                  photos: photos.data ?? [],
                  illustrationUrl: nearestCategoryPicture(tree, previewRow.categoryId),
                  photosSoon: previewRow.photosSoon,
                  coverage: previewRow.locationId === null ? [] : [previewRow.locationId],
                  country: null,
                  contactPref: {},
                  sellerAlias: null,
                  sellerBusinessName: null,
                }}
              />
            ) : null}
          </div>
        );
      }}
    </StepUpGate>
  );
}

export default AdminScreeningPage;
