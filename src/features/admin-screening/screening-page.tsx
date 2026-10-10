import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

import { ColumnsButton } from "@/components/shell/columns-button";
import { useHiddenColumns, visibleColumns } from "@/components/shell/columns-state";
import {
  DataTable,
  DataTablePagination,
  type DataTableColumn,
} from "@/components/shell/data-table";
import { FilterChips, FiltersButton } from "@/components/shell/filter-chips";
import { useOpenMarkets } from "@/components/shell/location-data";
import { RowActions } from "@/components/shell/row-actions";
import { TableToolbar } from "@/components/shell/table-toolbar";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import { useAdminShell } from "@/features/admin/admin-context";
import { sectionById } from "@/features/admin/sections";
import { StepUpGate } from "@/features/auth/mfa/step-up-gate";
import { stepUpAbortKey } from "@/features/auth/mfa/use-step-up";
import { nearestCategoryPicture, useCategoryTree } from "@/features/categories/category-tree";
import { PreviewSheet } from "@/features/posting/preview/preview-sheet";
import { useI18n, type MessageKey } from "@/i18n";
import { entityName } from "@/i18n/entity";

import {
  ADMIN_SCREENING_KEY,
  SCREENING_PAGE_SIZE,
  SCREENING_PAGE_SIZES,
  decideListing,
  revealContact,
  revealProblemKey,
  useScreeningFacts,
  useScreeningPhotos,
  useScreeningQueue,
  useScreeningSchema,
  type ScreeningRow,
} from "./use-screening";

/**
 * Bundle 10 E3a — ADMIN › SCREENING (D109); bundle 11 A2 — on the agreed blocks
 * (D118, D128).
 *
 * `listings:review` opens the section (the /admin layout's gate, DEC-163); the
 * queue's rows are read under `listings:view` (RLS `listings_admin_read`); the
 * decisions render only with `listings:review`, and the door
 * (`transition_listing`) re-checks `listings:review` and a fresh second factor
 * (F3). The outcome line is an inline live region: no <Toaster/> is mounted in
 * this app (the translations console's precedent).
 *
 * The table: the toolbar (search · Filters · Columns, chips under it), tick-boxes
 * for approving or rejecting several ads (D128 — a bulk action exists here), the
 * row's actions in its three-dots menu (RowActions), the footer's three zones.
 * "Preview as buyer" shows what a buyer will see (D120): the facts and their
 * options, the ad's country, the contact methods with "Show number" (logged by
 * the door, read in Admin › Audit) and the seller's public name.
 *
 * Bundle 11 A3: the market filter reads the ad's place (INC-537); every button
 * that rejects or confirms a rejection is drawn destructive, as the menu's
 * Reject is; "Show number" asks for no second factor (D129 — the door keeps
 * listings:review, its dial and its log) and a refusal is said under that
 * method's own row; the seller box is organised (D130, in ListingDetail).
 */

type Next = "active" | "rejected";
type Decision = { ids: string[]; next: Next } | null;
type Notice = { key: MessageKey; tone: "ok" | "error" } | null;
type RevealChannel = "phone" | "phone2" | "whatsapp";

const TABLE_ID = "admin-screening";
const LOCKED = ["title"];

export function AdminScreeningPage() {
  const { t, language, entities } = useI18n();
  const { permissions } = useAdminShell();
  const mayReview = permissions.includes("listings:review");
  const section = sectionById("screening");
  const queryClient = useQueryClient();
  const markets = useOpenMarkets();

  const [search, setSearch] = useState("");
  const [country, setCountry] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(SCREENING_PAGE_SIZE);
  const [selected, setSelected] = useState<string[]>([]);
  const [decision, setDecision] = useState<Decision>(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<Notice>(null);
  const [previewRow, setPreviewRow] = useState<ScreeningRow | null>(null);
  const [revealed, setRevealed] = useState<Partial<Record<RevealChannel, string>>>({});
  const [revealProblems, setRevealProblems] = useState<Partial<Record<RevealChannel, MessageKey>>>(
    {},
  );
  const [revealing, setRevealing] = useState<RevealChannel | null>(null);
  // The ad the preview shows now: an answer that arrives after the preview has
  // closed or moved to another ad is dropped, never drawn under the wrong ad.
  const previewId = useRef<string | null>(null);
  useEffect(() => {
    previewId.current = previewRow?.id ?? null;
  }, [previewRow]);
  const [hidden, toggleColumn] = useHiddenColumns(TABLE_ID);
  // INC-525 — the preview draws the ad's category picture as the card does.
  const { tree } = useCategoryTree();

  const query = useScreeningQueue(page, search, pageSize, { country });
  const photos = useScreeningPhotos(previewRow?.id ?? null);
  const facts = useScreeningFacts(previewRow?.id ?? null);
  const schema = useScreeningSchema(previewRow?.categoryId ?? null);

  const named = (value: ScreeningRow["category"]) =>
    value === null ? "—" : language === "am" && value.name_am ? value.name_am : value.name_en;

  const sentAt = (iso: string) =>
    new Intl.DateTimeFormat(language, { dateStyle: "short", timeStyle: "short" }).format(
      new Date(iso),
    );

  const marketName = (code: string) => {
    const market = markets.markets.find((m) => m.code === code);
    if (!market) return code;
    return market.anchorId === null
      ? market.nameEn
      : entityName(
          "location",
          { id: market.anchorId, nameEn: market.nameEn, nameAm: null },
          entities,
        );
  };

  const allColumns: DataTableColumn<ScreeningRow>[] = [
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
  const columns = visibleColumns(allColumns, hidden, LOCKED);

  const resetPaging = () => {
    setPage(0);
    setSelected([]);
  };

  const openPreview = (row: ScreeningRow) => {
    setRevealed({});
    setRevealProblems({});
    setPreviewRow(row);
  };

  // D129 — no second factor: the door is called directly; a refusal is said
  // under the method's own row, never as a page-wide message.
  const reveal = async (row: ScreeningRow, channel: RevealChannel) => {
    setRevealing(channel);
    setRevealProblems((current) => ({ ...current, [channel]: undefined }));
    try {
      const answer = await revealContact(row.id, channel);
      if (previewId.current !== row.id) return;
      if (answer.ok) {
        setRevealed((current) => ({ ...current, [channel]: answer.value }));
      } else {
        setRevealProblems((current) => ({
          ...current,
          [channel]: revealProblemKey(answer.reason),
        }));
      }
    } catch (error) {
      console.error("[screening] reveal failed", error);
      if (previewId.current !== row.id) return;
      setRevealProblems((current) => ({ ...current, [channel]: "common.error" }));
    } finally {
      setRevealing(null);
    }
  };

  const channelAction = (row: ScreeningRow) =>
    function action(channel: "phone" | "phone2" | "telegram" | "whatsapp") {
      if (channel === "telegram") return null;
      const value = revealed[channel];
      if (value !== undefined) {
        return (
          <span
            data-testid={`admin-screening-number-${channel}`}
            className="font-medium tabular-nums text-foreground"
          >
            {value}
          </span>
        );
      }
      if (!mayReview) return null;
      const problem = revealProblems[channel];
      return (
        <>
          {problem === "admin.screening.revealNotShown" ? null : (
            <Button
              type="button"
              variant="outline"
              size="sm"
              data-testid={`admin-screening-show-${channel}`}
              disabled={revealing !== null}
              onClick={() => void reveal(row, channel)}
            >
              {t("admin.screening.showNumber")}
            </Button>
          )}
          {problem !== undefined ? (
            <p
              role="alert"
              data-testid={`admin-screening-reveal-problem-${channel}`}
              className="basis-full text-xs text-destructive"
            >
              {t(problem)}
            </p>
          ) : null}
        </>
      );
    };

  const rowActions = (row: ScreeningRow) => (
    <RowActions
      testid={`admin-screening-actions-${row.id}`}
      name={row.title}
      more={[
        { key: "open", label: t("admin.screening.open"), onSelect: () => openPreview(row) },
        ...(mayReview
          ? [
              {
                key: "approve",
                label: t("admin.screening.approve"),
                onSelect: () => setDecision({ ids: [row.id], next: "active" }),
              },
              {
                key: "reject",
                label: t("admin.screening.reject"),
                tone: "danger" as const,
                onSelect: () => setDecision({ ids: [row.id], next: "rejected" }),
              },
            ]
          : []),
      ]}
    />
  );

  const data = query.data;
  const rows = data?.rows ?? [];

  const chips =
    country === null
      ? []
      : [
          {
            key: "country",
            label: marketName(country),
            onRemove: () => {
              setCountry(null);
              resetPaging();
            },
          },
        ];

  return (
    <StepUpGate>
      {(guard) => {
        const decide = async () => {
          if (decision === null) return;
          const { ids, next } = decision;
          setBusy(true);
          setNotice(null);
          try {
            // One step-up for the whole set; the door judges each ad on its own.
            await guard(async () => {
              for (const id of ids) await decideListing(id, next);
            });
            setDecision(null);
            setSelected([]);
            setNotice({
              key: next === "active" ? "admin.screening.approved" : "admin.screening.rejected",
              tone: "ok",
            });
          } catch (error) {
            setDecision(null);
            const abort = stepUpAbortKey(error);
            if (abort === null) return;
            console.error("[screening] decision failed", error);
            setNotice({ key: abort ?? "common.error", tone: "error" });
          } finally {
            setBusy(false);
            await queryClient.invalidateQueries({ queryKey: ADMIN_SCREENING_KEY });
          }
        };

        const previewFacts = facts.data ?? null;
        const contactPref = previewFacts
          ? Object.fromEntries(
              Object.entries(previewFacts.channels).map(([channel, show]) => [channel, { show }]),
            )
          : {};

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
              rows={rows}
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
                <TableToolbar
                  testid="admin-screening-toolbar"
                  search={
                    <Input
                      data-testid="admin-screening-search"
                      aria-label={t("admin.screening.search")}
                      placeholder={t("admin.screening.search")}
                      value={search}
                      onChange={(event) => {
                        setSearch(event.target.value);
                        resetPaging();
                      }}
                    />
                  }
                  filters={
                    <FiltersButton testid="admin-screening-filters" count={chips.length}>
                      <label className="flex flex-col gap-1 text-sm">
                        <span>{t("location.country")}</span>
                        <NativeSelect
                          data-testid="admin-screening-filter-country"
                          value={country ?? ""}
                          onChange={(event) => {
                            setCountry(event.target.value === "" ? null : event.target.value);
                            resetPaging();
                          }}
                        >
                          <option value="">{t("prim.table.all")}</option>
                          {markets.markets.map((market) => (
                            <option key={market.code} value={market.code}>
                              {marketName(market.code)}
                            </option>
                          ))}
                        </NativeSelect>
                      </label>
                    </FiltersButton>
                  }
                  columns={
                    <ColumnsButton
                      testid="admin-screening-columns"
                      columns={allColumns.map((column) => ({
                        key: column.key,
                        label: String(column.header),
                        locked: LOCKED.includes(column.key),
                      }))}
                      hidden={hidden}
                      onToggle={toggleColumn}
                    />
                  }
                  chips={
                    <FilterChips
                      testid="admin-screening-chips"
                      chips={chips}
                      onClearAll={() => {
                        setCountry(null);
                        resetPaging();
                      }}
                    />
                  }
                />
              }
              selection={
                mayReview
                  ? {
                      selectedKeys: selected,
                      onToggleRow: (row, on) =>
                        setSelected((current) =>
                          on
                            ? [...new Set([...current, row.id])]
                            : current.filter((id) => id !== row.id),
                        ),
                      onToggleAll: (on) => setSelected(on ? rows.map((row) => row.id) : []),
                    }
                  : undefined
              }
              selectionActions={
                mayReview && selected.length > 0 ? (
                  <>
                    <Button
                      type="button"
                      size="sm"
                      data-testid="admin-screening-bulk-approve"
                      onClick={() => setDecision({ ids: selected, next: "active" })}
                    >
                      {t("admin.screening.approve")}
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="destructive"
                      data-testid="admin-screening-bulk-reject"
                      onClick={() => setDecision({ ids: selected, next: "rejected" })}
                    >
                      {t("admin.screening.reject")}
                    </Button>
                  </>
                ) : undefined
              }
              rowActions={rowActions}
              pagination={
                <DataTablePagination
                  testid="admin-screening-pagination"
                  offset={page * pageSize}
                  pageSize={pageSize}
                  total={data?.total ?? 0}
                  onPrevious={() => {
                    setPage((current) => Math.max(0, current - 1));
                    setSelected([]);
                  }}
                  onNext={() => {
                    setPage((current) => current + 1);
                    setSelected([]);
                  }}
                  onPage={(index) => {
                    setPage(index);
                    setSelected([]);
                  }}
                  pageSizeOptions={SCREENING_PAGE_SIZES}
                  onPageSize={(size) => {
                    setPageSize(size);
                    resetPaging();
                  }}
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
                  {decision !== null && decision.ids.length > 1
                    ? t(
                        decision.next === "rejected"
                          ? "admin.screening.confirmRejectMany"
                          : "admin.screening.confirmApproveMany",
                      ).replace("{count}", String(decision.ids.length))
                    : decision?.next === "rejected"
                      ? t("admin.screening.confirmReject")
                      : t("admin.screening.confirmApprove")}
                </AlertDialogTitle>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={busy} className="min-h-11">
                    {t("common.cancel")}
                  </AlertDialogCancel>
                  <Button
                    type="button"
                    variant={decision?.next === "rejected" ? "destructive" : "default"}
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
                footer={
                  mayReview ? (
                    <>
                      <Button
                        type="button"
                        className="min-h-11"
                        data-testid="admin-screening-preview-approve"
                        onClick={() => {
                          setDecision({ ids: [previewRow.id], next: "active" });
                          setPreviewRow(null);
                        }}
                      >
                        {t("admin.screening.approve")}
                      </Button>
                      <Button
                        type="button"
                        variant="destructive"
                        className="min-h-11"
                        data-testid="admin-screening-preview-reject"
                        onClick={() => {
                          setDecision({ ids: [previewRow.id], next: "rejected" });
                          setPreviewRow(null);
                        }}
                      >
                        {t("admin.screening.reject")}
                      </Button>
                    </>
                  ) : undefined
                }
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
                  definitions: schema.data?.definitions ?? [],
                  attributeOptions: schema.data?.attributeOptions ?? {},
                  photos: photos.data ?? [],
                  illustrationUrl: nearestCategoryPicture(tree, previewRow.categoryId),
                  photosSoon: previewRow.photosSoon,
                  coverage: previewRow.locationId === null ? [] : [previewRow.locationId],
                  country: previewFacts?.country ?? null,
                  contactPref,
                  sellerAlias: previewFacts?.alias ?? null,
                  sellerBusinessName: previewFacts?.businessName ?? null,
                  channelAction: channelAction(previewRow),
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
