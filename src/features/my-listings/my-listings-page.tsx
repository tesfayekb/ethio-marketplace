import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useState } from "react";

import { PageShell } from "@/components/layout/page-shell";
import { ListingPicture } from "@/components/marketplace/listing-picture";
import { NegotiableBadge } from "@/components/marketplace/listing-card";
import { ColumnsButton } from "@/components/shell/columns-button";
import { useHiddenColumns, visibleColumns } from "@/components/shell/columns-state";
import {
  DataTable,
  DataTablePagination,
  type DataTableColumn,
} from "@/components/shell/data-table";
import { FilterChips, FiltersButton } from "@/components/shell/filter-chips";
import { FilterChoices } from "@/components/shell/filter-choices";
import { RowActions } from "@/components/shell/row-actions";
import { TableActionButton, TableActions } from "@/components/shell/table-actions";
import { TableToolbar } from "@/components/shell/table-toolbar";
import { useKeptPage } from "@/components/shell/use-kept-page";
import { ActionMessage } from "@/components/ui/action-message";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { CutText } from "@/components/ui/cut-text";
import { Input } from "@/components/ui/input";
import {
  nearestCategoryPicture,
  rootsOf,
  useCategoryTree,
} from "@/features/categories/category-tree";
import { SOLD_RIBBON } from "@/features/feed/feed-page";
import { CARD_THEN_THUMB, photoUrl } from "@/features/posting/photo-links";
import { priceLine, storedUnitNoun } from "@/features/posting/price-line";
import { fill } from "@/features/posting/refusal-text";
import { usePhotoLinks } from "@/features/posting/use-photo-links";
import { usePriceUnitLabels } from "@/features/posting/use-price-unit-labels";
import { useDebounced } from "@/hooks/use-debounced";
import { CertifyConfirm } from "@/features/legal/certify-confirm";
import { certifyRefusal } from "@/features/legal/certify-refusal";
import { useI18n, type MessageKey } from "@/i18n";
import { authKey } from "@/lib/query-keys";
import { refreshAfterWrite } from "@/lib/refresh-after-write";

import {
  actionKey,
  ASKS_FIRST,
  BULK_ACTIONS,
  BULK_BODY_KEY,
  bulkLabelKey,
  bulkTargets,
  confirmKeys,
  copyable,
  copyMyListing,
  DELETED_KEY,
  doneKey,
  EDITABLE_STATUSES,
  rowActionsFor,
  runListAction,
  soldWordsOf,
  type BulkAction,
  type ListingAction,
} from "./my-listing";
import {
  GROUP_LABEL,
  LISTING_GROUPS,
  LISTING_MARKS,
  readMyListings,
  SEARCH_MAX,
  shareable,
  type GroupCounts,
  type ListingGroup,
  type ListingMark,
  type MyListingRow,
  type MyListingsFilters,
} from "./my-listings";
import { listingPath } from "@/features/ad-page/address";
import { ShareAd, sharePriceText } from "@/features/ad-page/share-ad";
import { stateLine } from "./state-line";

/**
 * Bundle 16 turn 2 — THE MY LISTINGS PAGE (D138; D173–D175; docs/features/my-listings.md).
 *
 * The signed-in seller's own ads, one group at a time, newest change first, from
 * `my_listings` (the door's only key is the caller, so no other seller's ad can
 * appear). Each row: the cover photo (with the seller's session — a photo of an ad
 * that is not live is the seller's own), the title, the price, the state in words
 * and its date, and the gold marks. A draft continues in the posting form; any
 * other ad opens its own page (turn 3, /my-listings/<id>).
 *
 * Bundle 16 turn R1 (D181, D182; INC-630) — ON THE SITE'S AGREED TABLE BLOCKS
 * (docs/features/display-primitives.md, T1–T9), as every admin table is:
 * - the header (`TableActions`): the page's name and Post listing;
 * - the status groups with their counts above the table (`my-listings-group`, as
 *   the admin's All listings shows its views);
 * - the toolbar (`TableToolbar`): the search by title, Filters (a top category with
 *   everything under it; Reserved; Price reduced) with their chips, and Columns
 *   (the title locked). The door filters, and the six counts follow the filters;
 * - each row's actions (`RowActions`): Edit — on a draft the posting form, on a
 *   live, closed or refused ad the posting form in its edit mode (bundle 17
 *   turn 2, D194: `/my-listings/<id>/edit`, opened on its Review) — a red Delete
 *   on every ad that can be
 *   deleted, and the three-dots with Open, what this ad offers — the same rule as
 *   its own page (`rowActionsFor` / `actionsFor`) — and, last, Post a similar ad
 *   (D182 4; `-more-copy`: a new draft with the ad's details, opened in the posting
 *   form). Mark as sold and Delete ask first. Each action reads the ad again before
 *   it runs (`runListAction`), and the list is read again whatever the answer (F4);
 * - tick-boxes from tablet width up (D182 2) with Mark as sold, No longer
 *   available, Renew and Delete for the ticked ads that offer each, asking first
 *   with their count; a phone acts one ad at a time;
 * - the footer: 20 a page by default, the size kept in this browser;
 * - on a phone one card per ad: its photo on the left, the title, the marks, the
 *   price and the state beside it, the three-dots in the corner, Edit and Delete in
 *   the card's foot.
 *
 * A refused or malformed answer is an error with Retry, never an empty list (F4).
 */

const TABLE_ID = "my-listings";
const LOCKED = ["title"];

const EMPTY_COUNTS: GroupCounts = {
  live: 0,
  review: 0,
  attention: 0,
  closed: 0,
  sold: 0,
  drafts: 0,
};

const MARK_LABEL: Record<ListingMark, MessageKey> = {
  reserved: "myListings.reserved",
  reduced: "myListings.priceReduced",
};

type Asking = { action: ListingAction; rows: MyListingRow[]; bulk: boolean } | null;
type Notice = { text: string; tone: "done" | "error" } | null;

export function MyListingsPage() {
  const { t, language } = useI18n();
  const { tree } = useCategoryTree();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const paging = useKeptPage("ethio.myListings.pageSize");
  const [hidden, toggleColumn] = useHiddenColumns(TABLE_ID);

  const [group, setGroup] = useState<ListingGroup>("live");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [mark, setMark] = useState<ListingMark | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [asking, setAsking] = useState<Asking>(null);
  const [renewing, setRenewing] = useState<MyListingRow | null>(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<Notice>(null);
  // D224 — the row whose Share sheet is open; one ShareAd serves the whole list.
  const [sharing, setSharing] = useState<MyListingRow | null>(null);
  const debouncedSearch = useDebounced(search);
  const filters: MyListingsFilters = { search: debouncedSearch, category, mark };

  const query = useQuery({
    queryKey: authKey("my-listings", {
      group,
      page: paging.page,
      size: paging.pageSize,
      ...filters,
    }),
    queryFn: async () => {
      const page = await readMyListings(
        group,
        paging.pageSize,
        paging.page * paging.pageSize,
        filters,
      );
      if (page === null) throw new Error("my_listings refused or malformed");
      return page;
    },
    placeholderData: keepPreviousData,
  });
  const rows = query.data?.rows ?? [];
  const counts = query.data?.counts ?? EMPTY_COUNTS;
  const renewAllowed = query.data?.renewAllowed ?? false;
  const renewDays = query.data?.renewDays ?? null;

  const links = usePhotoLinks(
    rows.flatMap((row) => (row.coverPhotoId === null ? [] : [{ id: row.coverPhotoId }])),
  );
  const unitLabels = usePriceUnitLabels(rows.some((row) => row.priceUnit !== null));
  const locale = language === "am" ? "am-ET" : "en-GB";
  const day = (iso: string | null) =>
    iso === null
      ? ""
      : new Intl.DateTimeFormat(language, { dateStyle: "medium" }).format(new Date(iso));
  const tableDay = (iso: string | null) =>
    iso === null ? (
      <span className="text-muted-foreground">—</span>
    ) : (
      <time
        dateTime={iso}
        title={new Intl.DateTimeFormat(locale, { dateStyle: "full" }).format(new Date(iso))}
        className="tabular-nums text-muted-foreground"
      >
        {new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(new Date(iso))}
      </time>
    );
  const roots = rootsOf(tree);
  const both = (en: string | null, am: string | null) =>
    language === "am" && am !== null ? am : (en ?? "—");
  const categoryName = (id: string) => {
    const node = tree.byId.get(id);
    return node ? both(node.nameEn, node.nameAm) : id;
  };

  const reset = () => {
    paging.setPage(0);
    setSelected([]);
  };

  const picture = (row: MyListingRow) => (
    <div className="w-20 shrink-0" data-testid={`my-listing-${row.id}-picture`}>
      <ListingPicture
        photoUrl={
          row.coverPhotoId === null
            ? null
            : photoUrl({ id: row.coverPhotoId }, CARD_THEN_THUMB, links ?? {})
        }
        categoryUrl={nearestCategoryPicture(tree, row.categoryId)}
        photosSoon={row.photosSoon}
        hasPhoto={row.coverPhotoId !== null}
        rounded="rounded-md"
        fill
        crop
      />
    </div>
  );

  const price = (row: MyListingRow) =>
    row.priceMode === null
      ? ""
      : priceLine(
          {
            mode: row.priceMode,
            amount: row.priceAmount,
            currency: row.priceCurrency,
            period: row.pricePeriod ?? "once",
            bp: row.priceBp,
            unit: storedUnitNoun(row.priceUnit, row.priceUnitText, unitLabels, language),
          },
          t,
          t("price.contact"),
          language,
        );

  /**
   * D180 (the operator's walk, 2026-10-14) — the marks are ribbons in the site's second colour, the most important
   * first: Sold (Rented, Filled), No longer available, Reserved, Price reduced (not on a sold ad).
   */
  const marks = (row: MyListingRow) => {
    const sold = row.status === "sold";
    const closed = row.status === "closed";
    const reduced = row.priceWas !== null && !sold;
    return sold || closed || row.reserved || reduced ? (
      <span className="mt-1 flex flex-wrap gap-1">
        {sold ? (
          <span
            data-testid={`my-listing-${row.id}-sold-mark`}
            className="inline-flex items-center rounded-full bg-gold px-2 py-0.5 text-xs font-semibold text-gold-foreground"
          >
            {t(SOLD_RIBBON[row.soldWord])}
          </span>
        ) : null}
        {closed ? (
          <span
            data-testid={`my-listing-${row.id}-closed-mark`}
            className="inline-flex items-center rounded-full bg-gold px-2 py-0.5 text-xs font-semibold text-gold-foreground"
          >
            {t("feed.ribbon.closed")}
          </span>
        ) : null}
        {row.reserved ? (
          <span
            data-testid={`my-listing-${row.id}-reserved`}
            className="inline-flex items-center rounded-full bg-gold px-2 py-0.5 text-xs font-semibold text-gold-foreground"
          >
            {t("myListings.reserved")}
          </span>
        ) : null}
        {reduced ? (
          <span
            data-testid={`my-listing-${row.id}-price-reduced`}
            className="inline-flex items-center rounded-full bg-gold px-2 py-0.5 text-xs font-semibold text-gold-foreground"
          >
            {t("myListings.priceReduced")}
          </span>
        ) : null}
      </span>
    ) : null;
  };

  /** The row's name opens it: a draft in the posting form, any other ad on its own page. */
  const titleLink = (row: MyListingRow) => {
    const name = <CutText text={row.title ?? t("myListings.untitled")} />;
    const className =
      "block min-w-0 break-words font-medium text-foreground underline-offset-4 hover:underline";
    return row.status === "draft" ? (
      <Link
        to="/post/$listingId"
        params={{ listingId: row.id }}
        data-testid={`my-listing-${row.id}-continue`}
        className={className}
      >
        {name}
      </Link>
    ) : (
      <Link
        to="/my-listings/$listingId"
        params={{ listingId: row.id }}
        data-testid={`my-listing-${row.id}-open`}
        className={className}
      >
        {name}
      </Link>
    );
  };

  const actionLabel = (action: ListingAction, row: MyListingRow) =>
    action === "renew"
      ? fill(t(actionKey("renew", row.soldWord)), { days: String(renewDays ?? "") })
      : t(actionKey(action, row.soldWord));

  /**
   * One action on one ad or on several, ad by ad (each re-read first, its door
   * re-checking everything). A refusal of one ad does not stop the others; the rate
   * dial's refusal stops the set. The list is read again whatever the answers.
   */
  const act = async (
    action: ListingAction,
    targets: MyListingRow[],
    bulk: boolean,
    certification?: { certified: string[]; language: string },
  ) => {
    if (busy || targets.length === 0) return;
    setBusy(true);
    setNotice(null);
    let done = 0;
    let reason: string | null = null;
    let handled = false;
    const needsStatement: string[] = [];
    try {
      for (const row of targets) {
        const outcome = await runListAction(row.id, action, certification);
        if (outcome.ok) {
          done += 1;
          continue;
        }
        // Bundle 22 turn 5 — a bulk set names the ads that need the statement and goes on;
        // an owed acceptance stops any set and opens the acceptance screen.
        if (bulk && outcome.reason === "certificationRequired") {
          needsStatement.push(row.title ?? t("myListings.untitled"));
          continue;
        }
        if (
          (!bulk || outcome.reason === "acceptanceRequired") &&
          outcome.reason !== undefined &&
          certifyRefusal(outcome.reason, navigate)
        ) {
          handled = true;
          break;
        }
        reason ??= t(outcome.key);
        if (outcome.key === "myListings.error.rateLimited") break;
      }
    } catch {
      reason ??= t("myListings.error.failed");
    } finally {
      await refreshAfterWrite(queryClient, { queryKey: authKey("my-listings") });
      await refreshAfterWrite(queryClient, { queryKey: authKey("my-listing") });
      setBusy(false);
      setSelected([]);
    }
    if (handled) return;
    const first = targets[0];
    if (!bulk && first !== undefined) {
      setNotice(
        reason === null
          ? {
              text: action === "delete" ? t(DELETED_KEY) : t(doneKey(action, first.soldWord)),
              tone: "done",
            }
          : { text: reason, tone: "error" },
      );
      return;
    }
    const notChanged = targets.length - done - needsStatement.length;
    setNotice(bulkNotice(t, { done, notChanged, reason, needsStatement }));
  };

  /** D182 4 — Post a similar ad: a new draft with this ad's details, opened in the posting form. */
  const copyRow = async (row: MyListingRow) => {
    if (busy) return;
    setBusy(true);
    setNotice(null);
    try {
      const outcome = await copyMyListing(row.id);
      if (outcome.ok) {
        await refreshAfterWrite(queryClient, { queryKey: authKey("my-listings") });
        void navigate({ to: "/post/$listingId", params: { listingId: outcome.listingId } });
        return;
      }
      setNotice({ text: t(outcome.key), tone: "error" });
    } catch {
      setNotice({ text: t("myListings.error.failed"), tone: "error" });
    }
    setBusy(false);
  };

  /** Mark as sold and Delete ask first, and every action on ticked ads asks with their count. */
  const take = (action: ListingAction, targets: MyListingRow[], bulk: boolean) => {
    if (bulk || ASKS_FIRST.has(action)) setAsking({ action, rows: targets, bulk });
    // Bundle 22 turn 4 — one ad's Renew passes through the publishing statement (CertifyConfirm).
    else if (action === "renew" && targets[0] !== undefined) setRenewing(targets[0]);
    else void act(action, targets, false);
  };

  const rowActions = (row: MyListingRow) => {
    const offer = rowActionsFor(row, renewAllowed);
    const draft = row.status === "draft";
    return (
      <RowActions
        testid={`my-listing-${row.id}`}
        name={row.title ?? t("myListings.untitled")}
        edit={
          draft
            ? {
                label: t("myListings.edit"),
                onSelect: () =>
                  void navigate({ to: "/post/$listingId", params: { listingId: row.id } }),
              }
            : EDITABLE_STATUSES.has(row.status)
              ? {
                  // D194 — the posting form in its edit mode, on its Review (turn R2's `?edit=1` panel is gone).
                  label: t("myListings.edit"),
                  onSelect: () =>
                    void navigate({
                      to: "/my-listings/$listingId/edit",
                      params: { listingId: row.id },
                    }),
                }
              : undefined
        }
        remove={
          offer.includes("delete")
            ? {
                label: t("myListings.action.delete"),
                disabled: busy,
                onSelect: () => take("delete", [row], false),
              }
            : undefined
        }
        more={
          draft
            ? []
            : [
                {
                  key: "open",
                  label: t("myListings.open"),
                  onSelect: () =>
                    void navigate({
                      to: "/my-listings/$listingId",
                      params: { listingId: row.id },
                    }),
                },
                // D224 — a live ad with a public address can be shared, right after Open.
                ...(shareable(row)
                  ? [
                      {
                        key: "share",
                        label: t("adPage.share.open"),
                        onSelect: () => setSharing(row),
                      },
                    ]
                  : []),
                ...offer
                  .filter((action) => action !== "delete")
                  .map((action) => ({
                    key: action,
                    label: actionLabel(action, row),
                    disabled: busy,
                    onSelect: () => take(action, [row], false),
                  })),
                ...(copyable(row.status)
                  ? [
                      {
                        key: "copy",
                        label: t("myListings.action.copy"),
                        disabled: busy,
                        onSelect: () => void copyRow(row),
                      },
                    ]
                  : []),
              ]
        }
      />
    );
  };

  const ticked = rows.filter((row) => selected.includes(row.id));
  const bulkOf = (action: BulkAction) => bulkTargets(ticked, action, renewAllowed);

  const allColumns: DataTableColumn<MyListingRow>[] = [
    {
      key: "photo",
      header: t("myListings.col.photo"),
      priority: "primary",
      width: "w-24",
      card: "hide",
      cell: (row) => picture(row),
    },
    {
      key: "title",
      header: t("admin.listings.col.title"),
      priority: "primary",
      card: "title",
      cell: (row) => (
        <span className="block min-w-0" data-testid={`my-listing-${row.id}-title`}>
          {titleLink(row)}
          {marks(row)}
        </span>
      ),
    },
    {
      key: "price",
      header: t("admin.listings.col.price"),
      priority: "secondary",
      card: "sub",
      cell: (row) => (
        <span
          className="flex flex-wrap items-center gap-1"
          data-testid={`my-listing-${row.id}-price`}
        >
          <span>{price(row)}</span>
          {row.priceNegotiable ? <NegotiableBadge /> : null}
        </span>
      ),
    },
    {
      key: "state",
      header: t("myListings.groupLabel"),
      priority: "primary",
      card: "meta",
      cell: (row) => (
        <span className="block text-muted-foreground" data-testid={`my-listing-${row.id}-state`}>
          {stateLine(row, t, day)}
        </span>
      ),
    },
    {
      key: "posted",
      header: t("admin.listings.col.posted"),
      priority: "detail",
      width: "w-[11%]",
      cell: (row) => tableDay(row.publishedFirstAt),
    },
    {
      key: "expires",
      header: t("admin.listings.col.expires"),
      priority: "detail",
      width: "w-[11%]",
      cell: (row) =>
        row.status === "active" || row.status === "reduced"
          ? tableDay(row.expiresAt)
          : tableDay(null),
    },
  ];
  const columns = visibleColumns(allColumns, hidden, LOCKED);

  const chips = [
    ...(category === null
      ? []
      : [
          {
            key: "category",
            label: categoryName(category),
            onRemove: () => (setCategory(null), reset()),
          },
        ]),
    ...(mark === null
      ? []
      : [{ key: "mark", label: t(MARK_LABEL[mark]), onRemove: () => (setMark(null), reset()) }]),
  ];
  const clearAll = () => {
    setCategory(null);
    setMark(null);
    reset();
  };

  const askingRows = asking?.rows ?? [];
  const askingFirst = askingRows[0];
  const confirmTitle =
    asking === null || askingFirst === undefined
      ? ""
      : asking.bulk
        ? fill(t("myListings.bulk.title"), { count: askingRows.length })
        : t(confirmKeys(asking.action === "sell" ? "sell" : "delete", askingFirst.soldWord).title);
  const confirmBody =
    asking === null || askingFirst === undefined
      ? ""
      : asking.bulk
        ? fill(t(BULK_BODY_KEY[asking.action as BulkAction]), {
            word: soldWordsOf(askingRows)
              .map((word) => t(SOLD_RIBBON[word]))
              .join(" / "),
            days: String(renewDays ?? ""),
          })
        : t(confirmKeys(asking.action === "sell" ? "sell" : "delete", askingFirst.soldWord).body);
  const confirmYes =
    asking === null || askingFirst === undefined
      ? ""
      : asking.bulk
        ? fill(t(bulkLabelKey(asking.action as BulkAction, soldWordsOf(askingRows))), {
            days: String(renewDays ?? ""),
          })
        : t(confirmKeys(asking.action === "sell" ? "sell" : "delete", askingFirst.soldWord).yes);

  return (
    <PageShell as="main" width="wide" data-testid="my-listings-page">
      <div className="min-w-0 space-y-4">
        <TableActions testid="my-listings-header" title={t("nav.myListings")}>
          <TableActionButton
            variant="default"
            data-testid="my-listings-post"
            icon={<Plus />}
            label={t("nav.postListing")}
            onClick={() => void navigate({ to: "/post" })}
          />
        </TableActions>

        {/* INC-570 — the outcome of a row's action comes into view wherever the row was. */}
        <ActionMessage
          testid="my-listings-notice"
          tone={notice?.tone ?? "done"}
          text={notice?.text ?? null}
          className={notice?.tone === "error" ? undefined : "text-foreground"}
        />

        <FilterChoices
          testid="my-listings-group"
          label={t("myListings.groupLabel")}
          value={group}
          onChange={(value) => {
            const next = LISTING_GROUPS.find((entry) => entry === value);
            if (next === undefined) return;
            setGroup(next);
            reset();
          }}
          options={LISTING_GROUPS.map((value) => ({
            value,
            label: `${t(GROUP_LABEL[value])} (${counts[value]})`,
          }))}
        />

        <DataTable<MyListingRow>
          columns={columns}
          rows={rows}
          rowKey={(row) => row.id}
          rowTestId={(row) => `my-listing-${row.id}`}
          cardUntil="xl"
          caption={t("nav.myListings")}
          cardLead={(row) => picture(row)}
          cardLeadKind="picture"
          loading={query.isLoading}
          loadingState={
            <p role="status" aria-live="polite" className="text-sm text-muted-foreground">
              {t("common.loading")}
            </p>
          }
          error={query.error}
          errorState={
            <div className="flex flex-wrap items-center gap-2">
              <p role="alert" data-testid="my-listings-error" className="text-sm text-destructive">
                {t("myListings.loadError")}
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
            <p data-testid="my-listings-empty" className="text-sm text-muted-foreground">
              {t("myListings.empty")}
            </p>
          }
          toolbar={
            <TableToolbar
              testid="my-listings-toolbar"
              search={
                <Input
                  id="my-listings-search"
                  data-testid="my-listings-search"
                  type="search"
                  maxLength={SEARCH_MAX}
                  aria-label={t("admin.listings.searchLabel")}
                  placeholder={t("myListings.searchPlaceholder")}
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    reset();
                  }}
                />
              }
              filters={
                <FiltersButton
                  testid="my-listings-filters"
                  count={chips.length}
                  state={`${category ?? ""}|${mark ?? ""}`}
                  resultCount={counts[group]}
                  onClearAll={clearAll}
                >
                  <FilterChoices
                    testid="my-listings-filter-category"
                    label={t("admin.listings.filter.category")}
                    value={category ?? ""}
                    onChange={(value) => {
                      setCategory(value === "" ? null : value);
                      reset();
                    }}
                    options={[
                      { value: "", label: t("prim.table.all") },
                      ...roots.map((node) => ({
                        value: node.id,
                        label: both(node.nameEn, node.nameAm),
                      })),
                    ]}
                  />
                  <FilterChoices
                    testid="my-listings-filter-mark"
                    label={t("myListings.filter.mark")}
                    value={mark ?? ""}
                    onChange={(value) => {
                      setMark(LISTING_MARKS.find((entry) => entry === value) ?? null);
                      reset();
                    }}
                    options={[
                      { value: "", label: t("prim.table.all") },
                      ...LISTING_MARKS.map((value) => ({ value, label: t(MARK_LABEL[value]) })),
                    ]}
                  />
                </FiltersButton>
              }
              columns={
                <ColumnsButton
                  testid="my-listings-columns"
                  columns={allColumns.map((column) => ({
                    key: column.key,
                    label: String(column.header),
                    locked: LOCKED.includes(column.key),
                  }))}
                  hidden={hidden}
                  onToggle={toggleColumn}
                />
              }
              chips={<FilterChips testid="my-listings-chips" chips={chips} onClearAll={clearAll} />}
            />
          }
          selection={{
            selectedKeys: selected,
            onToggleRow: (row, on) =>
              setSelected((current) =>
                on ? [...new Set([...current, row.id])] : current.filter((id) => id !== row.id),
              ),
            onToggleAll: (on) => setSelected(on ? rows.map((row) => row.id) : []),
          }}
          selectionFrom="md"
          selectionActions={
            selected.length > 0 ? (
              <>
                {BULK_ACTIONS.map((action) => {
                  const targets = bulkOf(action);
                  if (targets.length === 0) return null;
                  return (
                    <Button
                      key={action}
                      type="button"
                      size="sm"
                      variant={action === "delete" ? "destructive" : "outline"}
                      data-testid={`my-listings-bulk-${action}`}
                      disabled={busy}
                      onClick={() => take(action, targets, true)}
                    >
                      {fill(t(bulkLabelKey(action, soldWordsOf(targets))), {
                        days: String(renewDays ?? ""),
                      })}
                    </Button>
                  );
                })}
              </>
            ) : undefined
          }
          rowActions={rowActions}
          actionsWidth="w-44"
          pagination={
            <DataTablePagination
              testid="my-listings-pagination"
              offset={paging.page * paging.pageSize}
              pageSize={paging.pageSize}
              total={counts[group]}
              onPrevious={() => {
                paging.setPage((current) => Math.max(0, current - 1));
                setSelected([]);
              }}
              onNext={() => {
                paging.setPage((current) => current + 1);
                setSelected([]);
              }}
              onPage={(index) => {
                paging.setPage(index);
                setSelected([]);
              }}
              pageSizeOptions={paging.pageSizeOptions}
              onPageSize={(size) => {
                paging.setPageSize(size);
                setSelected([]);
              }}
            />
          }
        />
      </div>

      <AlertDialog
        open={asking !== null}
        onOpenChange={(open) => {
          if (!open) setAsking(null);
        }}
      >
        {asking !== null ? (
          <AlertDialogContent data-testid="my-listings-confirm">
            <AlertDialogHeader>
              <AlertDialogTitle>{confirmTitle}</AlertDialogTitle>
              <AlertDialogDescription>{confirmBody}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="min-h-11" data-testid="my-listings-confirm-cancel">
                {t("common.cancel")}
              </AlertDialogCancel>
              <AlertDialogAction
                className={
                  asking.action === "delete"
                    ? "min-h-11 bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    : "min-h-11"
                }
                data-testid="my-listings-confirm-yes"
                onClick={() => {
                  const { action, rows: targets, bulk } = asking;
                  setAsking(null);
                  void act(action, targets, bulk);
                }}
              >
                {confirmYes}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        ) : null}
      </AlertDialog>
      {renewing !== null ? (
        <CertifyConfirm
          listingId={renewing.id}
          title={actionLabel("renew", renewing)}
          yes={actionLabel("renew", renewing)}
          onCancel={() => setRenewing(null)}
          onConfirm={(certification) => {
            const target = renewing;
            setRenewing(null);
            void act("renew", [target], false, certification);
          }}
        />
      ) : null}
      {/* D224 — one ShareAd for the whole list, opened by the ⋯ menu's Share;
          the same sheet the ad's own page shows. */}
      {sharing !== null && shareable(sharing) ? (
        <ShareAd
          open
          onOpenChange={(next) => {
            if (!next) setSharing(null);
          }}
          publicId={sharing.publicId as string}
          canonicalPath={listingPath(sharing.title ?? "", sharing.publicId as string)}
          title={sharing.title ?? ""}
          priceText={sharePriceText(
            {
              mode: sharing.priceMode ?? "contact",
              amount: sharing.priceAmount,
              currency: sharing.priceCurrency,
              period: sharing.pricePeriod,
              bp: sharing.priceBp,
              unit: storedUnitNoun(sharing.priceUnit, sharing.priceUnitText, unitLabels, language),
            },
            t,
            language,
          )}
        />
      ) : null}
    </PageShell>
  );
}

export default MyListingsPage;
