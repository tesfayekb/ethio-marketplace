import { useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { ImageIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { refreshAfterWrite } from "@/lib/refresh-after-write";
import { ColumnsButton } from "@/components/shell/columns-button";
import { useHiddenColumns, visibleColumns } from "@/components/shell/columns-state";
import {
  DataTable,
  DataTablePagination,
  type DataTableColumn,
} from "@/components/shell/data-table";
import { FilterChips, FiltersButton } from "@/components/shell/filter-chips";
import { FilterChoices } from "@/components/shell/filter-choices";
import { useOpenMarkets } from "@/components/shell/location-data";
import { RowActions } from "@/components/shell/row-actions";
import { TableActions } from "@/components/shell/table-actions";
import { TableToolbar } from "@/components/shell/table-toolbar";
import { useKeptPage } from "@/components/shell/use-kept-page";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ActionMessage } from "@/components/ui/action-message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdminShell } from "@/features/admin/admin-context";
import { sectionById } from "@/features/admin/sections";
import { StepUpGate } from "@/features/auth/mfa/step-up-gate";
import { stepUpAbortKey } from "@/features/auth/mfa/use-step-up";
import { ListingPhotos } from "@/features/admin-listings/listing-photos";
import { nearestCategoryPicture, useCategoryTree } from "@/features/categories/category-tree";
import { heldWithAd } from "@/features/posting/posting-service";
import { PreviewSheet } from "@/features/posting/preview/preview-sheet";
import { fill } from "@/features/posting/refusal-text";
import { storedUnitNoun } from "@/features/posting/price-line";
import { usePriceUnitLabels } from "@/features/posting/use-price-unit-labels";
import { useI18n, type MessageKey } from "@/i18n";
import { entityName } from "@/i18n/entity";

import { NameChecks } from "./name-checks";
import { PhotoChanges } from "./photo-changes";
import { PhotoReviews } from "./photo-reviews";
import { useWarnedListings } from "./use-photo-changes";
import {
  ADMIN_SCREENING_KEY,
  SCREENING_PAGE_SIZE,
  SCREENING_PAGE_SIZES,
  decideListing,
  readScreeningRow,
  revealContact,
  revealProblemKey,
  useNameCheckSummary,
  useScreeningFacts,
  useScreeningPhotos,
  useScreeningQueue,
  useScreeningSchema,
  type ScreeningRow,
} from "./use-screening";
import { formatLocale } from "@/lib/format-locale";
import { catalogText } from "@/i18n/entity";

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
 *
 * Bundle 17 turn 2 (D194) — the preview's Edit opens the ad in the posting
 * wizard's edit mode (`/admin/listings/<id>/edit?from=screening`), the same
 * Review page as the seller's; Done brings the reviewer back here with the
 * preview re-opened on the ad as the edit left it (`?open=<id>`, read fresh),
 * Approve and Reject at hand again (D188). The edit boxes of turn E3 and the
 * at-once row patch of E3b are gone with the form they served.
 */

type Next = "active" | "rejected";
type Decision = { ids: string[]; next: Next } | null;
type Notice = { key: MessageKey; tone: "ok" | "error" } | null;
type RevealChannel = "phone" | "phone2" | "whatsapp";

const TABLE_ID = "admin-screening";
const LOCKED = ["title"];

export function AdminScreeningPage({
  openId = null,
  decided = null,
}: {
  openId?: string | null;
  /** Bundle 17 turn 3 (D188) — a decision made on the Edit's Review: its outcome line. */
  decided?: "active" | "rejected" | null;
}) {
  const { t, language, entities } = useI18n();
  const navigate = useNavigate();
  const { permissions } = useAdminShell();
  const mayReview = permissions.includes("listings:review");
  /** Bundle 13 turn 8 (D154 B4) — staff who may edit a listing see its photos with their marks. */
  const mayEnforce = permissions.includes("listings:enforce");
  /** D169 — the preview links to the ad's own page in Admin › Listings, where Edit removes a photo. */
  const mayOpenListing = permissions.includes("listings:view");
  // N1b-3c (INC-977) — the held names' queue and the re-check's line; each door re-checks (F3).
  const mayRename = permissions.includes("profiles:update");
  const mayViewJob = permissions.includes("services:view");
  const mayResumeJob = permissions.includes("services:manage");
  const section = sectionById("screening");
  const queryClient = useQueryClient();
  const markets = useOpenMarkets();

  const [search, setSearch] = useState("");
  const [country, setCountry] = useState<string | null>(null);
  // Bundle 11 C1 — the page and its size kept in this browser, one hook for every table.
  const { page, setPage, pageSize, setPageSize, pageSizeOptions } = useKeptPage(
    "ethio.admin.screening.pageSize",
    SCREENING_PAGE_SIZE,
    SCREENING_PAGE_SIZES,
  );
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
  const unitLabels = usePriceUnitLabels(previewRow !== null && previewRow.priceUnit !== null);

  const query = useScreeningQueue(page, search, pageSize, { country });
  const photos = useScreeningPhotos(previewRow?.id ?? null);
  // Bundle 16 turn 4b (D178) — only photos held while checking was off are approved with
  // the ad; a photo the check judged carries its own mark and Allow.
  const heldCount = (photos.data ?? []).filter(heldWithAd).length;
  const facts = useScreeningFacts(previewRow?.id ?? null);
  const schema = useScreeningSchema(previewRow?.categoryId ?? null);
  const nameChecks = useNameCheckSummary();
  // The audit page's day format (admin/audit/audit-page.tsx), for the oldest waiting name.
  const dayFmt = new Intl.DateTimeFormat(formatLocale(language), {
    day: "numeric",
    month: "short",
  });

  const named = (value: ScreeningRow["category"]) =>
    value === null ? "—" : catalogText(value.name_en, value.name_am, language);

  const sentAt = (iso: string) =>
    new Intl.DateTimeFormat(formatLocale(language), {
      dateStyle: "short",
      timeStyle: "short",
    }).format(new Date(iso));

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
      card: "title",
      priority: "primary",
      cell: (row) => (
        <span className="block min-w-0">
          <span className="break-words font-medium">{row.title}</span>
          {/* D154 B3 — the screen warned that a photo of this ad may not fit it. */}
          {warned.has(row.id) ? (
            <span
              className="mt-0.5 block text-xs font-normal text-foreground"
              data-testid={`admin-screening-row-${row.id}-photo-warning`}
            >
              {t("admin.screening.photoWarning")}
            </span>
          ) : null}
        </span>
      ),
    },
    {
      key: "category",
      header: t("admin.screening.col.category"),
      card: "sub",
      priority: "secondary",
      cell: (row) => <span className="text-sm">{named(row.category)}</span>,
    },
    {
      key: "place",
      header: t("admin.screening.col.place"),
      card: "sub",
      priority: "secondary",
      cell: (row) => <span className="text-sm">{named(row.place)}</span>,
    },
    {
      key: "sent",
      header: t("admin.screening.col.sent"),
      card: "foot",
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
  const closePreview = () => setPreviewRow(null);
  /**
   * Turn 2 (D194) — back from the ad's Edit: the preview re-opens on the ad read
   * fresh, and the address drops `open` so a reload shows the queue. An ad no
   * longer in screening opens nothing. A read that fails leaves the queue as it
   * is — the row is still in the table.
   */
  const reopened = useRef<string | null>(null);
  useEffect(() => {
    if (openId === null || reopened.current === openId) return;
    reopened.current = openId;
    let cancelled = false;
    void (async () => {
      try {
        const row = await readScreeningRow(openId);
        if (cancelled) return;
        if (row !== null) openPreview(row);
      } catch {
        // The queue stands; the reviewer opens the row from its menu.
      }
      // Turn 4 — the ad was edited on another page: the queue's rows are read again too.
      void refreshAfterWrite(queryClient, { queryKey: ADMIN_SCREENING_KEY });
      void navigate({ to: "/admin/screening", search: {}, replace: true });
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- openPreview and navigate are stable for one address.
  }, [openId]);
  /** Turn 3 — the outcome of a decision made on the Edit's Review, said here, once. */
  const toldDecided = useRef<string | null>(null);
  useEffect(() => {
    if (decided === null || toldDecided.current === decided) return;
    toldDecided.current = decided;
    setNotice({
      key: decided === "active" ? "admin.screening.approved" : "admin.screening.rejected",
      tone: "ok",
    });
    // Bundle 17 turn 4 (SC-26 on run 959) — the decision was made on another page: the queue
    // is read again here, as the page's own decisions re-read it, so the ad's row is gone.
    void refreshAfterWrite(queryClient, { queryKey: ADMIN_SCREENING_KEY });
    void navigate({ to: "/admin/screening", search: {}, replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- navigate is stable for one address.
  }, [decided]);
  /** Turn E3 — the preview follows the queue's fresh read of its ad (after an edit, the ad as it now stands). */
  const freshRows = query.data?.rows;
  useEffect(() => {
    if (freshRows === undefined) return;
    setPreviewRow((current) => {
      if (current === null) return current;
      const found = freshRows.find((row) => row.id === current.id);
      return found === undefined || found.updatedAt === current.updatedAt ? current : found;
    });
  }, [freshRows]);
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
  // D154 B3 — the page's ads that hold a photo the screen warned about.
  const warned = useWarnedListings(rows.map((row) => row.id)).data ?? new Set<string>();

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
            await refreshAfterWrite(queryClient, { queryKey: ADMIN_SCREENING_KEY });
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
            <div className="space-y-1">
              <TableActions testid="admin-screening-header" title={t(section.titleKey)} />
              <p className="text-sm text-muted-foreground">{t(section.bodyKey)}</p>
              {/* N1a (INC-977) — the names waiting for the seller-name check; a failed read says so, never 0. */}
              {nameChecks.isLoading ? null : (
                <p data-testid="admin-screening-name-checks" className="text-sm">
                  {nameChecks.error !== null || nameChecks.data === undefined
                    ? t("admin.screening.nameChecks.error")
                    : nameChecks.data.unchecked === 0 || nameChecks.data.oldestSince === null
                      ? t("admin.screening.nameChecks.none")
                      : t("admin.screening.nameChecks.waiting")
                          .replace("{n}", String(nameChecks.data.unchecked))
                          .replace("{date}", dayFmt.format(new Date(nameChecks.data.oldestSince)))}
                </p>
              )}
            </div>

            {/* INC-570 — the outcome of a decision comes into view wherever the row was. */}
            <ActionMessage
              persistent
              role="status"
              testid="admin-screening-notice"
              tone={notice?.tone === "error" ? "error" : "done"}
              text={notice === null ? null : t(notice.key)}
              className={notice?.tone === "error" ? undefined : "text-foreground"}
            />

            <DataTable<ScreeningRow>
              columns={columns}
              rows={rows}
              rowKey={(row) => row.id}
              rowTestId={(row) => `admin-screening-row-${row.id}`}
              caption={t(section.titleKey)}
              cardUntil="lg"
              cardLead={() => <ImageIcon />}
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
                    <FiltersButton
                      testid="admin-screening-filters"
                      count={chips.length}
                      state={country ?? ""}
                      onClearAll={() => {
                        setCountry(null);
                        resetPaging();
                      }}
                    >
                      {/* Bundle 11 V2 (INC-543) — one pill per market, never a dropdown. */}
                      <FilterChoices
                        testid="admin-screening-filter-country"
                        label={t("location.country")}
                        value={country ?? ""}
                        onChange={(value) => {
                          setCountry(value === "" ? null : value);
                          resetPaging();
                        }}
                        options={[
                          { value: "", label: t("prim.table.all") },
                          ...markets.markets.map((market) => ({
                            value: market.code,
                            label: marketName(market.code),
                          })),
                        ]}
                      />
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
                  pageSizeOptions={pageSizeOptions}
                  onPageSize={(size) => {
                    setPageSize(size);
                    resetPaging();
                  }}
                />
              }
            />

            {/* Bundle 16 turn 4b (D178) — the photos kept hidden for a person. */}
            <PhotoReviews mayReview={mayReview} guard={guard} />

            {/* N1b-3c (INC-977) — the seller names held for review. */}
            <NameChecks
              mayList={mayOpenListing}
              mayClear={mayRename}
              mayViewJob={mayViewJob}
              mayResumeJob={mayResumeJob}
              guard={guard}
            />

            {/* D154 B5 (bundle 13 turn 10) — the photo changes sellers made on live ads. */}
            <PhotoChanges mayReview={mayReview} guard={guard} />

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
                onClose={closePreview}
                footer={
                  mayReview || mayEnforce ? (
                    <>
                      {/* Bundle 13 turn 8 (D154 B4) — the ad's photos with their marks. D169
                          (the operator, 2026-10-14) kept the preview view-only; D188 (2026-10-15)
                          put Edit inside it; D194 (bundle 17 turn 2) opens the ad in the wizard's
                          edit mode instead, and a photo's removal is on the ad's own page
                          (`admin-screening-open-listing`), as D169 placed it. */}
                      {mayEnforce ? (
                        <div className="basis-full">
                          <ListingPhotos
                            listingId={previewRow.id}
                            mayRemove={false}
                            mayAllow={mayReview}
                            guard={guard}
                            testid="admin-screening-photos"
                            onRemoved={(key) => setNotice({ key, tone: "ok" })}
                          />
                        </div>
                      ) : null}
                      {mayEnforce ? (
                        <Button
                          type="button"
                          variant="outline"
                          className="min-h-11"
                          data-testid="admin-screening-preview-edit"
                          disabled={busy || query.isFetching}
                          onClick={() =>
                            void navigate({
                              to: "/admin/listings/$listingId/edit",
                              params: { listingId: previewRow.id },
                              search: { from: "screening" },
                            })
                          }
                        >
                          {t("admin.listings.action.edit")}
                        </Button>
                      ) : null}
                      {mayOpenListing ? (
                        <Link
                          to="/admin/listings/$listingId"
                          params={{ listingId: previewRow.id }}
                          data-testid="admin-screening-open-listing"
                          className="basis-full text-sm text-primary underline underline-offset-4"
                        >
                          {t("admin.screening.openListing")}
                        </Link>
                      ) : null}
                      {/* D158 (bundle 13 turn 6) — photos held while photo screening was
                          off: approving the ad approves them (the operator's answer). */}
                      {mayReview && heldCount > 0 ? (
                        <p
                          className="basis-full text-sm text-muted-foreground"
                          data-testid="admin-screening-preview-unscreened"
                        >
                          {fill(t("admin.screening.unscreenedNote"), { count: heldCount })}
                        </p>
                      ) : null}
                      {mayReview ? (
                        <>
                          <Button
                            type="button"
                            className="min-h-11"
                            data-testid="admin-screening-preview-approve"
                            onClick={() => {
                              setDecision({ ids: [previewRow.id], next: "active" });
                              closePreview();
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
                              closePreview();
                            }}
                          >
                            {t("admin.screening.reject")}
                          </Button>
                        </>
                      ) : null}
                    </>
                  ) : undefined
                }
                view={{
                  actor: "staff",
                  title: previewRow.title,
                  description: previewRow.description,
                  priceMode: previewRow.priceMode,
                  priceAmount: previewRow.priceAmount,
                  priceCurrency: previewRow.priceCurrency,
                  pricePeriod: previewRow.pricePeriod,
                  priceBp: previewRow.priceBp,
                  priceNegotiable: previewRow.priceNegotiable,
                  // INC-553 — the price prints with its unit, as the card does.
                  basisLabel: storedUnitNoun(
                    previewRow.priceUnit,
                    previewRow.priceUnitText,
                    unitLabels,
                    language,
                  ),
                  attributes: previewRow.attributes,
                  definitions: schema.data?.definitions ?? [],
                  attributeOptions: schema.data?.attributeOptions ?? {},
                  photos: photos.data ?? [],
                  markUnscreened: true,
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
