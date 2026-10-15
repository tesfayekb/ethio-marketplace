import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

import { PageHeader } from "@/components/layout/page-header";
import { PageShell } from "@/components/layout/page-shell";
import { ListingPicture } from "@/components/marketplace/listing-picture";
import { NegotiableBadge } from "@/components/marketplace/listing-card";
import {
  DataTable,
  DataTablePagination,
  type DataTableColumn,
} from "@/components/shell/data-table";
import { FilterChoices } from "@/components/shell/filter-choices";
import { useKeptPage } from "@/components/shell/use-kept-page";
import { Button } from "@/components/ui/button";
import { CutText } from "@/components/ui/cut-text";
import { nearestCategoryPicture, useCategoryTree } from "@/features/categories/category-tree";
import { SOLD_RIBBON } from "@/features/feed/feed-page";
import { CARD_THEN_THUMB, photoUrl } from "@/features/posting/photo-links";
import { priceLine, storedUnitNoun } from "@/features/posting/price-line";
import { usePhotoLinks } from "@/features/posting/use-photo-links";
import { usePriceUnitLabels } from "@/features/posting/use-price-unit-labels";
import { useI18n } from "@/i18n";
import { authKey } from "@/lib/query-keys";

import {
  GROUP_LABEL,
  LISTING_GROUPS,
  readMyListings,
  type GroupCounts,
  type ListingGroup,
  type MyListingRow,
} from "./my-listings";
import { stateLine } from "./state-line";

/**
 * Bundle 16 turn 2 — THE MY LISTINGS PAGE (D138; D173–D175; docs/features/my-listings.md).
 *
 * The signed-in seller's own ads, one group at a time, newest change first, from
 * `my_listings` (the door's only key is the caller, so no other seller's ad can
 * appear). Built from the console's table primitives: a table from 1280 px, cards
 * below it (mobile first, 360 / 768 / 1280). Each row: the cover photo (with the
 * seller's session — a photo of an ad that is not live is the seller's own), the
 * title, the price, the state in words and its date, and the Reserved and "Price
 * reduced" marks. A draft continues in the posting form; any other ad opens its
 * own page (turn 3, /my-listings/<id>: the ad, its dates, its history and its
 * actions).
 *
 * A refused or malformed answer is an error with Retry, never an empty list (F4).
 */

const EMPTY_COUNTS: GroupCounts = {
  live: 0,
  review: 0,
  attention: 0,
  closed: 0,
  sold: 0,
  drafts: 0,
};

export function MyListingsPage() {
  const { t, language } = useI18n();
  const { tree } = useCategoryTree();
  const [group, setGroup] = useState<ListingGroup>("live");
  const paging = useKeptPage("ethio.myListings.pageSize");

  const query = useQuery({
    queryKey: authKey("my-listings", { group, page: paging.page, size: paging.pageSize }),
    queryFn: async () => {
      const page = await readMyListings(group, paging.pageSize, paging.page * paging.pageSize);
      if (page === null) throw new Error("my_listings refused or malformed");
      return page;
    },
    placeholderData: keepPreviousData,
  });
  const rows = query.data?.rows ?? [];
  const counts = query.data?.counts ?? EMPTY_COUNTS;

  const links = usePhotoLinks(
    rows.flatMap((row) => (row.coverPhotoId === null ? [] : [{ id: row.coverPhotoId }])),
  );
  const unitLabels = usePriceUnitLabels(rows.some((row) => row.priceUnit !== null));
  const day = (iso: string | null) =>
    iso === null
      ? ""
      : new Intl.DateTimeFormat(language, { dateStyle: "medium" }).format(new Date(iso));

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

  const columns: DataTableColumn<MyListingRow>[] = [
    {
      key: "photo",
      header: "",
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
          <span className="block font-medium text-foreground">
            <CutText text={row.title ?? t("myListings.untitled")} />
          </span>
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
  ];

  return (
    <PageShell as="main" width="wide" data-testid="my-listings-page">
      <PageHeader title={t("nav.myListings")} />
      <div className="mt-4 min-w-0 space-y-4">
        <FilterChoices
          testid="my-listings-group"
          label={t("myListings.groupLabel")}
          value={group}
          onChange={(value) => {
            const next = LISTING_GROUPS.find((entry) => entry === value);
            if (next === undefined) return;
            setGroup(next);
            paging.setPage(0);
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
          rowActions={(row) =>
            row.status === "draft" ? (
              <Button asChild variant="outline" size="touch">
                <Link
                  to="/post/$listingId"
                  params={{ listingId: row.id }}
                  data-testid={`my-listing-${row.id}-continue`}
                >
                  {t("myListings.continue")}
                </Link>
              </Button>
            ) : (
              // Bundle 16 turn 3 — every other ad opens its own page.
              <Button asChild variant="outline" size="touch">
                <Link
                  to="/my-listings/$listingId"
                  params={{ listingId: row.id }}
                  data-testid={`my-listing-${row.id}-open`}
                >
                  {t("myListings.open")}
                </Link>
              </Button>
            )
          }
          pagination={
            <DataTablePagination
              testid="my-listings-pagination"
              offset={paging.page * paging.pageSize}
              pageSize={paging.pageSize}
              total={counts[group]}
              onPrevious={() => paging.setPage((current) => Math.max(0, current - 1))}
              onNext={() => paging.setPage((current) => current + 1)}
              onPage={(index) => paging.setPage(index)}
              pageSizeOptions={paging.pageSizeOptions}
              onPageSize={(size) => paging.setPageSize(size)}
            />
          }
        />
      </div>
    </PageShell>
  );
}

export default MyListingsPage;
