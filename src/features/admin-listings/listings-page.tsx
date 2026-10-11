import { Package } from "lucide-react";
import { useState } from "react";

import { ColumnsButton } from "@/components/shell/columns-button";
import { useHiddenColumns, visibleColumns } from "@/components/shell/columns-state";
import {
  DataTable,
  DataTablePagination,
  type DataTableColumn,
} from "@/components/shell/data-table";
import { todayIso } from "@/components/shell/date-day";
import { DateField } from "@/components/shell/date-field";
import { FilterChips, FiltersButton } from "@/components/shell/filter-chips";
import { FilterChoices } from "@/components/shell/filter-choices";
import { useOpenMarkets } from "@/components/shell/location-data";
import { TableActions } from "@/components/shell/table-actions";
import { TableToolbar } from "@/components/shell/table-toolbar";
import { useKeptPage } from "@/components/shell/use-kept-page";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdminShell } from "@/features/admin/admin-context";
import { sectionById } from "@/features/admin/sections";
import { useDebounced } from "@/features/admin/users/use-admin-users";
import { rootsOf, useCategoryTree } from "@/features/categories/category-tree";
import { priceLine } from "@/features/posting/price-line";
import { useI18n, type MessageKey } from "@/i18n";
import { entityName } from "@/i18n/entity";

import {
  LISTING_TIERS,
  LISTING_VIEWS,
  useAdminListings,
  type AdminListingRow,
  type ListingView,
} from "./use-admin-listings";

/**
 * Bundle 11, the Listings console, turn L2 (D134, D136) — ADMIN › LISTINGS ›
 * ALL LISTINGS, on the agreed blocks (D118, D128, D132).
 *
 * Every listing but a seller's drafts, newest first, read through the one door
 * `admin_list_listings` (listings:view; the seller's e-mail only for
 * profiles:view — the door decides, F3). The views above the toolbar: All,
 * Live (active, reduced), Waiting (screening, held), Ended (expired, sold),
 * Removed (rejected, removed). The toolbar: search (a title's words or a
 * listing's id) · Filters (the country of the listing's place, a top category
 * with everything under it, the seller, the date posted, the tier) · Columns;
 * the chips under it. One card per listing below md; the footer's range, rows
 * per page (kept in this browser) and pages; the server pages the list.
 *
 * This turn reads only: Edit, Remove, Restore, Send back and the tick-boxes
 * come with the console's next turns (the doors exist since L1).
 */

const TABLE_ID = "admin-listings";
const LOCKED = ["title"];

const STATUS_TONE: Record<string, "success" | "warning" | "danger" | "neutral" | "info"> = {
  active: "success",
  reduced: "warning",
  screening: "info",
  held: "warning",
  expired: "neutral",
  sold: "neutral",
  rejected: "danger",
  removed: "danger",
};

export function AdminListingsPage() {
  const { t, language, entities } = useI18n();
  const { permissions } = useAdminShell();
  const mayReadEmail = permissions.includes("profiles:view");
  const section = sectionById("listings");
  const markets = useOpenMarkets();
  const { tree } = useCategoryTree();
  const paging = useKeptPage("ethio.admin.listings.pageSize");
  const [hidden, toggleColumn] = useHiddenColumns(TABLE_ID);

  const [view, setView] = useState<ListingView>("all");
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [seller, setSeller] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [tier, setTier] = useState<string | null>(null);
  const debouncedSearch = useDebounced(search);
  const debouncedSeller = useDebounced(seller);
  const today = todayIso();

  const query = useAdminListings({
    view,
    search: debouncedSearch,
    country,
    category,
    seller: debouncedSeller,
    from,
    to,
    tier,
    limit: paging.pageSize,
    offset: paging.page * paging.pageSize,
  });
  const rows = query.data?.rows ?? [];
  const total = query.data?.total ?? 0;

  const reset = () => paging.setPage(0);
  const locale = language === "am" ? "am-ET" : "en-GB";
  const dateFmt = new Intl.DateTimeFormat(locale, { dateStyle: "medium" });
  const fullFmt = new Intl.DateTimeFormat(locale, { dateStyle: "full" });
  const shortFmt = new Intl.DateTimeFormat(locale, { day: "numeric", month: "short" });
  const thisYear = new Date().getFullYear();
  /** The card's date: day, month and year. */
  const day = (iso: string | null) => (iso === null ? "—" : dateFmt.format(new Date(iso)));
  /** The table's date: day and month, the year only when it is not this year; the full date on hover. */
  const tableDay = (iso: string | null) => {
    if (iso === null) return <span className="text-muted-foreground">—</span>;
    const date = new Date(iso);
    return (
      <time
        dateTime={iso}
        title={fullFmt.format(date)}
        className="tabular-nums text-muted-foreground"
      >
        {date.getFullYear() === thisYear ? shortFmt.format(date) : dateFmt.format(date)}
      </time>
    );
  };
  const both = (en: string | null, am: string | null) =>
    language === "am" && am !== null ? am : (en ?? "—");

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
  const roots = rootsOf(tree);
  const categoryName = (id: string) => {
    const node = tree.byId.get(id);
    return node ? both(node.nameEn, node.nameAm) : id;
  };
  const tierLabel = (value: string) =>
    value === "regular" ? t("admin.listings.tier.regular") : t(`tier.${value}` as MessageKey);
  const viewLabel = (value: ListingView) =>
    value === "all" ? t("prim.table.all") : t(`admin.listings.view.${value}` as MessageKey);
  const sellerName = (row: AdminListingRow) => row.sellerBusinessName ?? row.sellerAlias ?? "—";

  /*
   * The row of the agreed spec: title, seller, place, category, price, status,
   * posted, ends. Cards up to lg (a dense roster, as on Screening); from lg the
   * table, with the category and the end date from xl, where the row has room.
   */
  const allColumns: DataTableColumn<AdminListingRow>[] = [
    {
      key: "title",
      header: t("admin.listings.col.title"),
      priority: "primary",
      width: "w-[20%]",
      card: "title",
      cell: (row) => (
        <span className="block min-w-0 break-words font-medium text-foreground">{row.title}</span>
      ),
    },
    {
      key: "seller",
      header: t("admin.listings.col.seller"),
      priority: "primary",
      width: "w-[16%]",
      card: "sub",
      cell: (row) => (
        <span className="block min-w-0 max-w-full">
          <span className="block truncate text-foreground" title={sellerName(row)}>
            {sellerName(row)}
          </span>
          {row.sellerEmail !== null ? (
            <span className="block truncate text-xs text-muted-foreground" title={row.sellerEmail}>
              {row.sellerEmail}
            </span>
          ) : null}
        </span>
      ),
    },
    {
      key: "place",
      header: t("admin.listings.col.place"),
      priority: "secondary",
      width: "w-[11%]",
      card: "meta",
      cell: (row) => (
        <span className="block text-muted-foreground">
          {both(row.placeNameEn, row.placeNameAm)}
          {row.countryCode !== null ? ` · ${row.countryCode}` : ""}
        </span>
      ),
    },
    {
      key: "category",
      header: t("admin.listings.col.category"),
      priority: "wide",
      width: "w-[12%]",
      card: "meta",
      cell: (row) => (
        <span className="block text-muted-foreground">
          {both(row.categoryNameEn, row.categoryNameAm)}
        </span>
      ),
    },
    {
      key: "price",
      header: t("admin.listings.col.price"),
      priority: "secondary",
      width: "w-[11%]",
      card: "meta",
      cell: (row) => (
        <span className="block tabular-nums text-muted-foreground [overflow-wrap:normal]">
          {priceLine(
            {
              mode: row.priceMode,
              amount: row.priceAmount,
              currency: row.priceCurrency,
              period: row.pricePeriod,
              bp: row.priceBp,
              unit: null,
            },
            t,
            "—",
            language,
          )}
        </span>
      ),
    },
    {
      key: "status",
      header: t("admin.listings.col.status"),
      priority: "secondary",
      width: "w-[12%]",
      card: "badge",
      cell: (row) => (
        <Badge
          variant={STATUS_TONE[row.status] ?? "neutral"}
          data-testid={`listing-row-${row.id}-status`}
        >
          {t(`admin.listings.status.${row.status}` as MessageKey)}
        </Badge>
      ),
    },
    {
      key: "posted",
      header: t("admin.listings.col.posted"),
      priority: "detail",
      width: "w-[9%]",
      card: "meta",
      cell: (row) => tableDay(row.publishedAt ?? row.createdAt),
      cardCell: (row) => day(row.publishedAt ?? row.createdAt),
    },
    {
      key: "expires",
      header: t("admin.listings.col.expires"),
      priority: "wide",
      width: "w-[9%]",
      card: "meta",
      cell: (row) => tableDay(row.expiresAt),
      cardCell: (row) => day(row.expiresAt),
    },
  ];
  const columns = visibleColumns(allColumns, hidden, LOCKED);

  const chips = [
    ...(country === null
      ? []
      : [
          {
            key: "country",
            label: marketName(country),
            onRemove: () => (setCountry(null), reset()),
          },
        ]),
    ...(category === null
      ? []
      : [
          {
            key: "category",
            label: categoryName(category),
            onRemove: () => (setCategory(null), reset()),
          },
        ]),
    ...(seller.trim() === ""
      ? []
      : [
          {
            key: "seller",
            label: `${t("admin.listings.filter.seller")}: ${seller.trim()}`,
            onRemove: () => (setSeller(""), reset()),
          },
        ]),
    ...(from === ""
      ? []
      : [
          {
            key: "from",
            label: `${t("admin.listings.filter.from")} ${from}`,
            onRemove: () => (setFrom(""), reset()),
          },
        ]),
    ...(to === ""
      ? []
      : [
          {
            key: "to",
            label: `${t("admin.listings.filter.to")} ${to}`,
            onRemove: () => (setTo(""), reset()),
          },
        ]),
    ...(tier === null
      ? []
      : [{ key: "tier", label: tierLabel(tier), onRemove: () => (setTier(null), reset()) }]),
  ];
  const clearAll = () => {
    setCountry(null);
    setCategory(null);
    setSeller("");
    setFrom("");
    setTo("");
    setTier(null);
    reset();
  };

  return (
    <div data-testid="admin-section-listings" className="min-w-0 space-y-4">
      <div className="min-w-0 space-y-1">
        <TableActions testid="listings-header" title={t(section.titleKey)} />
        <p className="text-sm text-muted-foreground">{t(section.bodyKey)}</p>
      </div>

      <FilterChoices
        testid="listings-view"
        label={t("admin.listings.view")}
        value={view}
        onChange={(value) => {
          setView(value as ListingView);
          reset();
        }}
        options={LISTING_VIEWS.map((value) => ({ value, label: viewLabel(value) }))}
      />

      <DataTable<AdminListingRow>
        columns={columns}
        rows={rows}
        rowKey={(row) => row.id}
        rowTestId={(row) => `listing-row-${row.id}`}
        cardUntil="lg"
        caption={t(section.titleKey)}
        cardLead={() => <Package />}
        loading={query.isLoading}
        loadingState={
          <p role="status" aria-live="polite" className="text-sm text-muted-foreground">
            {t("common.loading")}
          </p>
        }
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
          <p data-testid="listings-empty" className="text-sm text-muted-foreground">
            {t("admin.listings.empty")}
          </p>
        }
        toolbar={
          <TableToolbar
            testid="listings-toolbar"
            search={
              <Input
                id="admin-listings-search"
                data-testid="listings-search"
                aria-label={t("admin.listings.searchLabel")}
                placeholder={t("admin.listings.searchPlaceholder")}
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  reset();
                }}
              />
            }
            filters={
              <FiltersButton
                testid="listings-filters"
                count={chips.length}
                state={`${country ?? ""}|${category ?? ""}|${seller}|${from}|${to}|${tier ?? ""}`}
                resultCount={total}
                onClearAll={clearAll}
              >
                <FilterChoices
                  testid="listings-filter-country"
                  label={t("location.country")}
                  value={country ?? ""}
                  onChange={(value) => {
                    setCountry(value === "" ? null : value);
                    reset();
                  }}
                  options={[
                    { value: "", label: t("prim.table.all") },
                    ...markets.markets.map((market) => ({
                      value: market.code,
                      label: marketName(market.code),
                    })),
                  ]}
                />
                <FilterChoices
                  testid="listings-filter-category"
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
                <div className="flex min-w-0 flex-col gap-2">
                  <label
                    htmlFor="listings-filter-seller"
                    className="text-sm font-semibold text-foreground"
                  >
                    {t("admin.listings.filter.seller")}
                  </label>
                  <Input
                    id="listings-filter-seller"
                    data-testid="listings-filter-seller"
                    value={seller}
                    placeholder={
                      mayReadEmail
                        ? t("admin.listings.filter.sellerPlaceholderEmail")
                        : t("admin.listings.filter.sellerPlaceholder")
                    }
                    onChange={(event) => {
                      setSeller(event.target.value);
                      reset();
                    }}
                  />
                </div>
                <div className="grid min-w-0 grid-cols-1 gap-3">
                  <div className="flex min-w-0 flex-col gap-2">
                    <label
                      htmlFor="listings-filter-from"
                      className="text-sm font-semibold text-foreground"
                    >
                      {t("admin.listings.filter.from")}
                    </label>
                    <DateField
                      id="listings-filter-from"
                      testid="listings-filter-from"
                      value={from}
                      max={to !== "" && to < today ? to : today}
                      onChange={(next) => {
                        setFrom(next);
                        reset();
                      }}
                    />
                  </div>
                  <div className="flex min-w-0 flex-col gap-2">
                    <label
                      htmlFor="listings-filter-to"
                      className="text-sm font-semibold text-foreground"
                    >
                      {t("admin.listings.filter.to")}
                    </label>
                    <DateField
                      id="listings-filter-to"
                      testid="listings-filter-to"
                      value={to}
                      min={from !== "" ? from : undefined}
                      max={today}
                      onChange={(next) => {
                        setTo(next);
                        reset();
                      }}
                    />
                  </div>
                </div>
                <FilterChoices
                  testid="listings-filter-tier"
                  label={t("admin.listings.filter.tier")}
                  value={tier ?? ""}
                  onChange={(value) => {
                    setTier(value === "" ? null : value);
                    reset();
                  }}
                  options={[
                    { value: "", label: t("prim.table.all") },
                    ...LISTING_TIERS.map((value) => ({ value, label: tierLabel(value) })),
                  ]}
                />
              </FiltersButton>
            }
            columns={
              <ColumnsButton
                testid="listings-columns"
                columns={allColumns.map((column) => ({
                  key: column.key,
                  label: String(column.header),
                  locked: LOCKED.includes(column.key),
                }))}
                hidden={hidden}
                onToggle={toggleColumn}
              />
            }
            chips={<FilterChips testid="listings-chips" chips={chips} onClearAll={clearAll} />}
          />
        }
        pagination={
          <DataTablePagination
            testid="listings-pagination"
            offset={paging.page * paging.pageSize}
            pageSize={paging.pageSize}
            total={total}
            onPrevious={() => paging.setPage((current) => Math.max(0, current - 1))}
            onNext={() => paging.setPage((current) => current + 1)}
            onPage={paging.setPage}
            pageSizeOptions={paging.pageSizeOptions}
            onPageSize={paging.setPageSize}
          />
        }
      />
    </div>
  );
}

export default AdminListingsPage;
