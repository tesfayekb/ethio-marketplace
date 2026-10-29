import { REPORT_REASONS } from "@/features/ad-page/report";
import { useListingReports } from "./use-listing-reports";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useState, type ReactNode } from "react";

import { refreshAfterWrite } from "@/lib/refresh-after-write";
import { PageCard } from "@/components/shell/page-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CategoryModal } from "@/features/admin-categories/category-dialogs";
import { useAdminShell } from "@/features/admin/admin-context";
import { ImpersonationStarter } from "@/features/admin/impersonation/impersonation-starter";
import { useScreeningPhotos, useScreeningSchema } from "@/features/admin-screening/use-screening";
import { stepUpAbortKey } from "@/features/auth/mfa/mfa-service";
import { StepUpGate } from "@/features/auth/mfa/step-up-gate";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { useAuth } from "@/features/auth/use-auth";
import { nearestCategoryPicture, useCategoryTree } from "@/features/categories/category-tree";
import { priceLine, storedUnitNoun } from "@/features/posting/price-line";
import { ListingDetail } from "@/features/posting/preview/listing-detail";
import { usePriceUnitLabels } from "@/features/posting/use-price-unit-labels";
import { useI18n, type MessageKey } from "@/i18n";

import en from "@/i18n/locales/en";

import {
  changesOf,
  GROUP_LABEL,
  groupOf,
  reasonLabel,
  summarize,
  type FieldGroup,
} from "./history";
import { ListingPhotos } from "./listing-photos";
import { MoveDialog } from "./move-dialog";
import { MOVE_LABEL, MOVE_TARGET, moveErrorKey, movesFor, type MoveKind } from "./move-reasons";
import { UndoDialog } from "./undo-dialog";
import { mayUndo, undoErrorKey, undoRefusalGroups } from "./undo-edit";
import {
  undoAdminListingEdit,
  useAdminListing,
  useAdminListingCertifications,
  type AdminEditAnswer,
  type AdminListingHistoryEntry,
} from "./use-admin-listing";
import { ADMIN_LISTINGS_KEY, moveAdminListing } from "./use-admin-listings";
import { errorText } from "@/lib/error-text";
import { catalogText, entityName } from "@/i18n/entity";
import { languageRowName } from "@/lib/format-locale";
import { dateFormatter } from "@/lib/format";
import { formatCountryName } from "@/lib/country-name";

/**
 * Bundle 11, the Listings console, turn L3 (D134, D138, D139) — ONE LISTING'S
 * PAGE (/admin/listings/<id>), opened from All listings (the title, or Open in
 * the row's three-dots).
 *
 * The heading with the status pill; the actions the person holds (Send back,
 * Restore, Remove — listings:enforce, never on the admin's own listing; View as
 * seller — impersonation:use; Preview as buyer — the buyer's view, as Screening
 * shows it); Details (the listing's facts, the seller — the e-mail only for
 * profiles:view, and a link to the seller's account with it); History (every
 * revision, newest first: when, who, what, the admin's reason and note, and the
 * values before and after for the content, price, status and dates). One door
 * reads it all, `admin_listing_detail` (listings:view; the door decides what
 * this person may read — F3).
 *
 * Turn L4a (D140, DEC-173): Edit (listings:enforce, never on the admin's own
 * listing or a removed one) opens the edit form in place of Details and History
 * — the title, the description and the price, with a reason and a note for the
 * seller (`ListingEditForm`, through `admin_edit_listing`). INC-553: every price
 * here prints with its unit ("per kg"), as the card does.
 *
 * Turn L4d (D141): "Undo this edit" on the newest History line when it is an
 * edit by staff (`mayUndo`), for those who may edit; a dialog takes an optional
 * note, and the door (`admin_undo_listing_edit`) puts the edit's before-values
 * back as a new edit with the reason Undo, while nothing has changed since.
 *
 * Bundle 13 turn 8 (D154 B4): Photos — every stored photo, each with Remove for
 * those who may edit (`ListingPhotos`, through `admin_edit_listing`'s
 * `remove_photos` with a reason and a note for the seller). Undo does not bring
 * a removed photo back (D141: "removed no photo").
 *
 * Bundle 14 turn 1 (D169, the operator, 2026-10-14: "There should have been a
 * view just like a seller views its preview including activity on the add. the
 * remove button is more should be in edit panel for the admin rather than preview
 * as buyer"): the page shows the ad as buyers and its seller see it (the same
 * `ListingDetail` the previews draw) above Details and History, its activity;
 * "Preview as buyer" is gone from this page. The photos with their marks and
 * Remove are in the Edit panel, above the form.
 *
 * Bundle 17 turn 2 (D194): Edit opens the ad in the posting wizard's edit mode
 * (`/admin/listings/<id>/edit` — the same Review page as the seller's, the
 * reason box above it, every save through `admin_edit_listing` under the
 * step-up gate); Done comes back here. The form of L4a and its panel are gone;
 * the photos with their marks and Remove are a card of their own under the ad
 * as buyers see it (`listing-photos`), for everyone who reads the page.
 */

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

const DATE_COLUMNS = ["expires_at", "poster_expires_at", "published_at", "published_first_at"];

function Fact({ label, value, testid }: { label: string; value: ReactNode; testid: string }) {
  return (
    <div className="min-w-0 space-y-0.5" data-testid={testid}>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="min-w-0 break-words text-sm text-foreground">{value}</dd>
    </div>
  );
}

export function AdminListingPage({ listingId }: { listingId: string }) {
  const { t, language, entities } = useI18n();
  const { permissions } = useAdminShell();
  const mayEnforce = permissions.includes("listings:enforce");
  const mayViewAs = permissions.includes("impersonation:use");
  const mayOpenSeller = permissions.includes("profiles:view");
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const query = useAdminListing(listingId);
  const mayReview = permissions.includes("listings:review");
  const reports = useListingReports(listingId, mayReview);
  const { tree } = useCategoryTree();

  const [move, setMove] = useState<MoveKind | null>(null);
  const [busy, setBusy] = useState(false);
  const [refusal, setRefusal] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [viewAs, setViewAs] = useState(false);
  const [opened, setOpened] = useState<number[]>([]);
  /** Turn L4d — the History line being undone (its moment), and the door's refusal in words. */
  const [undoing, setUndoing] = useState<string | null>(null);
  const [undoProblem, setUndoProblem] = useState<string | null>(null);

  const detail = query.data ?? null;
  // D169 — the ad as buyers see it is on the page, so its photos and its schema load with it.
  const photos = useScreeningPhotos(listingId);
  const schema = useScreeningSchema(detail?.listing.categoryId ?? null);
  // INC-553 — the unit words load only when this listing or a revision holds a unit.
  const unitLabels = usePriceUnitLabels(
    detail !== null &&
      (detail.listing.priceUnit !== null ||
        detail.history.some(
          (entry) =>
            typeof entry.before["price_unit"] === "string" ||
            typeof entry.after["price_unit"] === "string",
        )),
  );

  const dayFmt = dateFormatter("day", language);
  const momentFmt = dateFormatter("dayTime", language);
  const day = (iso: string | null) => (iso === null ? "—" : dayFmt.format(new Date(iso)));
  const both = (en: string | null, am: string | null) =>
    en === null ? "—" : catalogText(en, am, language);
  const statusLabel = (status: string) => t(`admin.listings.status.${status}` as MessageKey);
  const tierLabel = (tier: string) =>
    tier === "regular" ? t("admin.listings.tier.regular") : t(`tier.${tier}` as MessageKey);
  const categoryName = (id: unknown) => {
    if (typeof id !== "string") return "—";
    const node = tree.byId.get(id);
    return node
      ? entityName("category", { id: node.id, nameEn: node.nameEn, nameAm: node.nameAm }, entities)
      : "—";
  };

  if (query.isLoading) {
    return (
      <p role="status" aria-live="polite" className="text-sm text-muted-foreground">
        {t("common.loading")}
      </p>
    );
  }
  if (query.error || detail === null) {
    const missing = query.error != null && errorText(query.error) === "listing not found";
    return (
      <div data-testid="admin-listing-detail" className="space-y-3">
        <BackLink />
        <p role="alert" data-testid="listing-error" className="text-sm text-destructive">
          {missing ? t("admin.listings.detail.notFound") : t("common.error")}
        </p>
      </div>
    );
  }

  const { listing, seller, channels } = detail;
  const own = user !== null && seller.id === user.id;
  const moves = mayEnforce && !own ? movesFor(listing.status) : [];
  // The door's own rule: never the admin's own listing, never a removed one (drafts never reach this page).
  const mayEdit = mayEnforce && !own && listing.status !== "removed";
  // Bundle 16 turn 4b (D178) — a reviewer shows a photo kept hidden for review (never on their own ad).
  const mayAllowPhotos = permissions.includes("listings:review") && !own;
  const sellerName = seller.businessName ?? seller.alias ?? "—";
  const price = (side: Record<string, unknown> = {}) =>
    priceLine(
      {
        mode: typeof side["price_mode"] === "string" ? side["price_mode"] : listing.priceMode,
        amount:
          "price_amount" in side
            ? typeof side["price_amount"] === "number"
              ? side["price_amount"]
              : null
            : listing.priceAmount,
        currency:
          "price_currency" in side
            ? typeof side["price_currency"] === "string"
              ? side["price_currency"]
              : null
            : listing.priceCurrency,
        period:
          "price_period" in side
            ? typeof side["price_period"] === "string"
              ? side["price_period"]
              : null
            : listing.pricePeriod,
        bp:
          "price_bp" in side
            ? typeof side["price_bp"] === "number"
              ? side["price_bp"]
              : null
            : listing.priceBp,
        unit:
          "price_unit" in side
            ? storedUnitNoun(
                typeof side["price_unit"] === "string" ? side["price_unit"] : null,
                typeof side["price_unit_text"] === "string" ? side["price_unit_text"] : null,
                unitLabels,
                language,
              )
            : storedUnitNoun(listing.priceUnit, listing.priceUnitText, unitLabels, language),
      },
      t,
      "—",
      language,
    );

  /** One value of a revision, as the person reads it; null when the door kept no value to show. */
  const valueOf = (column: string, value: unknown): string | null => {
    if (value === null || value === undefined) return "—";
    if (column === "status" && typeof value === "string") return statusLabel(value);
    if (column === "tier" && typeof value === "string") return tierLabel(value);
    if (column === "category_id") return categoryName(value);
    if (DATE_COLUMNS.includes(column) && typeof value === "string") return day(value);
    if (column === "photos_removed" && typeof value === "number") {
      return t("admin.listings.history.photosRemoved").replace("{count}", String(value));
    }
    if (column === "renewed_count" && typeof value === "number") return String(value);
    if ((column === "title" || column === "description") && typeof value === "string") {
      return value;
    }
    return null;
  };

  /** The rows of "Show changes": the price as one line, every other kept value as its own. */
  const rowsOf = (entry: AdminListingHistoryEntry) => {
    const rows: Array<{ key: string; label: string; before: string; after: string }> = [];
    const changes = changesOf(entry);
    if (changes.some((change) => change.column.startsWith("price_"))) {
      rows.push({
        key: "price",
        label: t(GROUP_LABEL.price),
        before: price(entry.before),
        after: price(entry.after),
      });
    }
    for (const change of changes) {
      if (change.column.startsWith("price_")) continue;
      const before = valueOf(change.column, change.before);
      const after = valueOf(change.column, change.after);
      if (before === null || after === null) continue;
      rows.push({
        key: change.column,
        label: t(GROUP_LABEL[groupOf(change.column)]),
        before,
        after,
      });
    }
    return rows;
  };

  const whatOf = (entry: AdminListingHistoryEntry) => {
    const summary = summarize(entry);
    if (summary.type === "created") return t("admin.listings.history.created");
    if (summary.type === "renewed") return t("admin.listings.history.renewed");
    if (summary.type === "status") {
      return summary.from === null || summary.from === summary.to
        ? `${t("admin.listings.col.status")}: ${statusLabel(summary.to)}`
        : t("admin.listings.history.status")
            .replace("{from}", statusLabel(summary.from))
            .replace("{to}", statusLabel(summary.to));
    }
    return t("admin.listings.history.edited").replace(
      "{fields}",
      summary.groups.map((group) => t(GROUP_LABEL[group])).join(", "),
    );
  };

  const whoOf = (entry: AdminListingHistoryEntry) =>
    entry.by === "staff"
      ? entry.byName !== null
        ? `${t("admin.listings.history.by.staff")} · ${entry.byName}`
        : t("admin.listings.history.by.staff")
      : t(`admin.listings.history.by.${entry.by}` as MessageKey);

  const runMove = async (guard: GuardFn, reason: string, note: string) => {
    if (move === null) return;
    const kind = move;
    setBusy(true);
    setRefusal(null);
    try {
      await guard(() => moveAdminListing(listingId, MOVE_TARGET[kind], reason, note));
    } catch (error) {
      setBusy(false);
      const abort = stepUpAbortKey(error);
      // A cancelled second factor leaves the dialog open, as it was.
      if (abort === null) return;
      const message =
        error !== null && typeof error === "object" && "message" in error
          ? String((error as { message: unknown }).message)
          : "";
      setRefusal(t(abort ?? moveErrorKey(message)));
      return;
    }
    setBusy(false);
    setMove(null);
    setNotice(
      kind === "send_back"
        ? t("admin.listings.move.done.send_back")
        : t(`admin.listings.move.done.${kind}` as MessageKey).replace("{count}", "1"),
    );
    await refreshAfterWrite(queryClient, { queryKey: ADMIN_LISTINGS_KEY });
  };

  /** The fields a door names (title, price, …), as the person reads them. */
  const fieldNames = (fields: string[]) =>
    fields
      .map((field) =>
        field in GROUP_LABEL ? t(GROUP_LABEL[field as FieldGroup]) : t(GROUP_LABEL.other),
      )
      .join(", ");

  const runUndo = async (guard: GuardFn, note: string) => {
    if (undoing === null) return;
    const at = undoing;
    setBusy(true);
    setUndoProblem(null);
    let answer: AdminEditAnswer;
    try {
      answer = await guard(() => undoAdminListingEdit(listingId, at, note));
    } catch (error) {
      setBusy(false);
      const abort = stepUpAbortKey(error);
      // A cancelled second factor leaves the dialog open, as it was.
      if (abort === null) return;
      const message =
        error !== null && typeof error === "object" && "message" in error
          ? String((error as { message: unknown }).message)
          : "";
      const key = abort ?? undoErrorKey(message);
      setUndoProblem(t(key));
      // The History is stale: read it again, so the line it shows is the newest.
      if (key === "admin.listings.undo.changed") {
        await refreshAfterWrite(queryClient, { queryKey: ADMIN_LISTINGS_KEY });
      }
      return;
    }
    setBusy(false);
    // F4 — the before-values break today's rules: said in the dialog, nothing written.
    if (!answer.ok) {
      const groups = undoRefusalGroups(answer.refusals);
      setUndoProblem(
        t("admin.listings.undo.refused").replace(
          "{fields}",
          (groups.length > 0 ? groups : (["other"] as FieldGroup[]))
            .map((group) => t(GROUP_LABEL[group]))
            .join(", "),
        ),
      );
      return;
    }
    setUndoing(null);
    setNotice(t("admin.listings.undo.done").replace("{fields}", fieldNames(answer.fields)));
    await refreshAfterWrite(queryClient, { queryKey: ADMIN_LISTINGS_KEY });
  };

  return (
    <StepUpGate>
      {(guard) => (
        <div data-testid="admin-listing-detail" className="min-w-0 space-y-4">
          <BackLink />

          <div className="min-w-0 space-y-3">
            <div className="flex min-w-0 flex-wrap items-center gap-2">
              <h1
                data-testid="listing-title"
                className="min-w-0 break-words text-xl font-semibold text-foreground"
              >
                {listing.title}
              </h1>
              <Badge
                variant={STATUS_TONE[listing.status] ?? "neutral"}
                data-testid="listing-status"
              >
                {statusLabel(listing.status)}
              </Badge>
              {listing.tier !== "regular" ? (
                <Badge variant="info" data-testid="listing-tier">
                  {tierLabel(listing.tier)}
                </Badge>
              ) : null}
              {listing.severe ? (
                <Badge variant="danger" data-testid="listing-severe">
                  {t("admin.listings.detail.severe")}
                </Badge>
              ) : null}
            </div>
            <div className="flex flex-wrap gap-2">
              {mayEdit ? (
                <Button
                  type="button"
                  variant="outline"
                  size="touch"
                  data-testid="listing-edit"
                  // INC-558 — the edit opens on a fresh read, never while the page is re-reading.
                  disabled={query.isFetching}
                  onClick={() =>
                    void navigate({
                      to: "/admin/listings/$listingId/edit",
                      params: { listingId },
                    })
                  }
                >
                  {t("admin.listings.action.edit")}
                </Button>
              ) : null}
              {moves.map((kind) => (
                <Button
                  key={kind}
                  type="button"
                  size="touch"
                  variant={kind === "remove" ? "destructive" : "outline"}
                  data-testid={`listing-move-${kind}`}
                  onClick={() => {
                    setRefusal(null);
                    setNotice(null);
                    setMove(kind);
                  }}
                >
                  {t(MOVE_LABEL[kind])}
                </Button>
              ))}
              {mayViewAs && !own ? (
                <Button
                  type="button"
                  variant="outline"
                  size="touch"
                  data-testid="listing-view-as"
                  onClick={() => setViewAs(true)}
                >
                  {t("admin.listings.action.viewAsSeller")}
                </Button>
              ) : null}
            </div>
            {notice !== null ? (
              <p
                role="status"
                aria-live="polite"
                data-testid="listing-notice"
                className="text-sm text-foreground"
              >
                {notice}
              </p>
            ) : null}
          </div>

          <>
            {/* D169 — the ad as buyers and its seller see it. */}
            <PageCard testid="listing-as-seen" className="min-w-0 space-y-3">
              <h2 className="text-sm font-semibold text-foreground">{t("post.preview.title")}</h2>
              <ListingDetail
                actor="staff"
                title={listing.title}
                description={listing.description}
                priceMode={listing.priceMode}
                priceAmount={listing.priceAmount}
                priceCurrency={listing.priceCurrency}
                pricePeriod={listing.pricePeriod}
                priceBp={listing.priceBp}
                priceNegotiable={listing.priceNegotiable}
                // INC-553 — the price prints with its unit, as the card does.
                basisLabel={storedUnitNoun(
                  listing.priceUnit,
                  listing.priceUnitText,
                  unitLabels,
                  language,
                )}
                attributes={listing.attributes}
                definitions={schema.data?.definitions ?? []}
                attributeOptions={schema.data?.attributeOptions ?? {}}
                photos={photos.data ?? []}
                illustrationUrl={
                  listing.categoryId === null
                    ? null
                    : nearestCategoryPicture(tree, listing.categoryId)
                }
                photosSoon={listing.photosSoon}
                coverage={listing.locationId === null ? [] : [listing.locationId]}
                country={listing.countryCode}
                contactPref={Object.fromEntries(
                  Object.entries(channels).map(([channel, show]) => [channel, { show }]),
                )}
                sellerAlias={seller.alias}
                sellerBusinessName={seller.businessName}
              />
            </PageCard>
            {/* D169 / D194 — the photos, their marks and Remove, a card of their own. */}
            <ListingPhotos
              listingId={listingId}
              mayRemove={mayEdit}
              mayAllow={mayAllowPhotos}
              guard={guard}
              onRemoved={(key) => setNotice(t(key))}
            />
            {mayReview && (
              <PageCard testid="listing-reports" className="min-w-0 space-y-3">
                <h2 className="text-sm font-semibold text-foreground">
                  {t("admin.listings.reports.title")}
                </h2>
                {reports.isLoading ? null : reports.error ? (
                  <p role="alert" className="text-sm text-destructive">
                    {t("admin.listings.reports.failed")}
                  </p>
                ) : (reports.data?.length ?? 0) === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    {t("admin.listings.reports.none")}
                  </p>
                ) : (
                  <ul className="space-y-3">
                    {reports.data?.map((row) => (
                      <li
                        key={row.id}
                        data-testid="listing-report"
                        data-status={row.status}
                        className="min-w-0 text-sm"
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <span>
                            {REPORT_REASONS.some((reason) => reason === row.reason)
                              ? t(`adPage.report.reason.${row.reason}` as MessageKey)
                              : row.reason}
                          </span>
                          <Badge variant="neutral">
                            {t(
                              row.status === "open"
                                ? "admin.listings.reports.status.open"
                                : "admin.listings.reports.status.closed",
                            )}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {day(row.createdAt)}
                          </span>
                        </div>
                        {row.note !== null && <p className="mt-1 break-words">{row.note}</p>}
                      </li>
                    ))}
                  </ul>
                )}
              </PageCard>
            )}
            <div className="grid min-w-0 gap-4 lg:grid-cols-2">
              <PageCard testid="listing-details" className="min-w-0 space-y-3">
                <h2 className="text-sm font-semibold text-foreground">
                  {t("admin.listings.detail.details")}
                </h2>
                <dl className="grid min-w-0 gap-3 sm:grid-cols-2">
                  <Fact
                    testid="listing-fact-seller"
                    label={t("admin.listings.col.seller")}
                    value={
                      <span className="block min-w-0 space-y-0.5">
                        <span className="block">{sellerName}</span>
                        {seller.email !== null ? (
                          <span className="block break-all text-xs text-muted-foreground">
                            {seller.email}
                          </span>
                        ) : null}
                        {seller.accountStatus === "deactivated" ? (
                          <span className="block text-xs text-destructive">
                            {t("admin.listings.detail.deactivated")}
                          </span>
                        ) : null}
                        {mayOpenSeller ? (
                          <Link
                            to="/admin/users/$userId"
                            params={{ userId: seller.id }}
                            data-testid="listing-open-seller"
                            className="block text-xs text-primary underline underline-offset-4"
                          >
                            {t("admin.listings.detail.openSeller")}
                          </Link>
                        ) : null}
                      </span>
                    }
                  />
                  <Fact
                    testid="listing-fact-member-since"
                    label={t("admin.listings.detail.memberSince")}
                    value={day(seller.memberSince)}
                  />
                  <Fact
                    testid="listing-fact-place"
                    label={t("admin.listings.col.place")}
                    value={`${both(listing.placeNameEn, listing.placeNameAm)}${
                      listing.countryCode !== null ? ` · ${listing.countryCode}` : ""
                    }`}
                  />
                  <Fact
                    testid="listing-fact-category"
                    label={t("admin.listings.col.category")}
                    value={both(listing.categoryNameEn, listing.categoryNameAm)}
                  />
                  <Fact
                    testid="listing-fact-price"
                    label={t("admin.listings.col.price")}
                    value={price()}
                  />
                  <Fact
                    testid="listing-fact-photos"
                    label={t("admin.listings.detail.photos")}
                    value={String(listing.photoCount)}
                  />
                  <Fact
                    testid="listing-fact-first-posted"
                    label={t("admin.listings.detail.firstPosted")}
                    value={day(listing.publishedFirstAt)}
                  />
                  <Fact
                    testid="listing-fact-last-posted"
                    label={t("admin.listings.detail.lastPosted")}
                    value={day(listing.publishedAt)}
                  />
                  <Fact
                    testid="listing-fact-ends"
                    label={t("admin.listings.col.expires")}
                    value={day(listing.expiresAt)}
                  />
                  <Fact
                    testid="listing-fact-seller-end"
                    label={t("admin.listings.detail.sellerEnd")}
                    value={day(listing.posterExpiresAt)}
                  />
                  <Fact
                    testid="listing-fact-renewed"
                    label={t("admin.listings.history.field.renewals")}
                    value={String(listing.renewedCount)}
                  />
                  <Fact
                    testid="listing-fact-tier"
                    label={t("admin.listings.filter.tier")}
                    value={tierLabel(listing.tier)}
                  />
                  <Fact
                    testid="listing-fact-created"
                    label={t("admin.listings.detail.created")}
                    value={day(listing.createdAt)}
                  />
                  <Fact
                    testid="listing-fact-changed"
                    label={t("admin.listings.detail.changed")}
                    value={day(listing.updatedAt)}
                  />
                  <Fact
                    testid="listing-fact-id"
                    label={t("admin.listings.detail.id")}
                    value={<span className="break-all font-mono text-xs">{listing.id}</span>}
                  />
                </dl>
              </PageCard>

              <PageCard testid="listing-history" className="min-w-0 space-y-3">
                <h2 className="text-sm font-semibold text-foreground">
                  {t("admin.listings.detail.history")}
                </h2>
                {detail.history.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    {t("admin.listings.history.empty")}
                  </p>
                ) : (
                  <ol className="min-w-0 space-y-3">
                    {detail.history.map((entry, index) => {
                      const rows = rowsOf(entry);
                      const open = opened.includes(index);
                      return (
                        <li
                          key={`${entry.at}-${String(index)}`}
                          data-testid={`listing-history-entry-${String(index)}`}
                          className="min-w-0 space-y-1 border-b border-border pb-3 last:border-0 last:pb-0"
                        >
                          <p className="text-xs text-muted-foreground">
                            <time dateTime={entry.at}>{momentFmt.format(new Date(entry.at))}</time>
                            {" · "}
                            <span data-testid="listing-history-who">{whoOf(entry)}</span>
                          </p>
                          <p
                            data-testid="listing-history-what"
                            className="break-words text-sm text-foreground"
                          >
                            {whatOf(entry)}
                          </p>
                          {entry.reason !== null ? (
                            <p
                              data-testid="listing-history-reason"
                              className="break-words text-sm text-muted-foreground"
                            >
                              {t("admin.listings.history.reason").replace(
                                "{reason}",
                                reasonLabel(entry.reason, t, en),
                              )}
                            </p>
                          ) : null}
                          {entry.note !== null ? (
                            <p
                              data-testid="listing-history-note"
                              className="whitespace-pre-wrap break-words text-sm text-muted-foreground"
                            >
                              {t("admin.listings.history.note").replace("{note}", entry.note)}
                            </p>
                          ) : null}
                          {rows.length > 0 && entry.kind === "edit" ? (
                            <div className="min-w-0 space-y-2">
                              <Button
                                type="button"
                                variant="link"
                                className="h-auto min-h-11 px-0"
                                aria-expanded={open}
                                data-testid="listing-history-toggle"
                                onClick={() =>
                                  setOpened((current) =>
                                    open
                                      ? current.filter((value) => value !== index)
                                      : [...current, index],
                                  )
                                }
                              >
                                {open
                                  ? t("admin.listings.history.hide")
                                  : t("admin.listings.history.show")}
                              </Button>
                              {open ? (
                                <dl
                                  data-testid="listing-history-changes"
                                  className="min-w-0 space-y-2 rounded-md bg-muted/40 p-3"
                                >
                                  {rows.map((row) => (
                                    <div key={row.key} className="min-w-0 space-y-0.5">
                                      <dt className="text-xs font-semibold text-foreground">
                                        {row.label}
                                      </dt>
                                      <dd className="min-w-0 whitespace-pre-wrap break-words text-sm text-muted-foreground">
                                        <span className="block">
                                          {t("admin.listings.history.before")}: {row.before}
                                        </span>
                                        <span className="block text-foreground">
                                          {t("admin.listings.history.after")}: {row.after}
                                        </span>
                                      </dd>
                                    </div>
                                  ))}
                                </dl>
                              ) : null}
                            </div>
                          ) : null}
                          {mayEdit && mayUndo(entry, index) ? (
                            <Button
                              type="button"
                              variant="outline"
                              size="touch"
                              data-testid="listing-history-undo"
                              // INC-558's class — never on a read that is being replaced.
                              disabled={query.isFetching || busy}
                              onClick={() => {
                                setNotice(null);
                                setUndoProblem(null);
                                setUndoing(entry.at);
                              }}
                            >
                              {t("admin.listings.history.undo")}
                            </Button>
                          ) : null}
                        </li>
                      );
                    })}
                  </ol>
                )}
                {detail.historyTotal > detail.history.length ? (
                  <p className="text-xs text-muted-foreground" data-testid="listing-history-more">
                    {t("admin.listings.history.more")
                      .replace("{shown}", String(detail.history.length))
                      .replace("{total}", String(detail.historyTotal))}
                  </p>
                ) : null}
              </PageCard>
              <CertificationsCard listingId={listingId} />
            </div>
          </>

          {move !== null ? (
            <MoveDialog
              kind={move}
              count={1}
              busy={busy}
              refusal={refusal}
              onCancel={() => {
                setMove(null);
                setRefusal(null);
              }}
              onConfirm={(reason, note) => void runMove(guard, reason, note)}
            />
          ) : null}
          {undoing !== null ? (
            <UndoDialog
              busy={busy}
              problem={undoProblem}
              onCancel={() => {
                setUndoing(null);
                setUndoProblem(null);
              }}
              onConfirm={(note) => void runUndo(guard, note)}
            />
          ) : null}
          {viewAs ? (
            <CategoryModal
              testid="listings-view-as-dialog"
              openedBy="view-as"
              title={t("admin.listings.action.viewAsSeller")}
              onClose={() => setViewAs(false)}
            >
              <ImpersonationStarter userId={seller.id} guard={guard} />
            </CategoryModal>
          ) : null}
        </div>
      )}
    </StepUpGate>
  );
}

function BackLink() {
  const { t } = useI18n();
  return (
    <Link
      to="/admin/listings"
      data-testid="listing-back"
      className="inline-flex min-h-11 items-center gap-1 text-sm text-muted-foreground underline underline-offset-4"
    >
      <ArrowLeft aria-hidden="true" className="size-4" />
      {t("admin.listings.detail.back")}
    </Link>
  );
}

export default AdminListingPage;

/**
 * Bundle 22 turn 4 — the ad's certifications for staff (admin_listing_certifications, listings:view): one
 * row per publish, edit or renew, newest first, with the statements certified; a statement links to its
 * version only for a viewer holding legal:view (the door there checks again).
 */
function CertificationsCard({ listingId }: { listingId: string }) {
  const { t, language, publicLanguages } = useI18n();
  const { permissions } = useAdminShell();
  const mayViewLegal = permissions.includes("legal:view");
  const query = useAdminListingCertifications(listingId);
  const when = dateFormatter("dayTime", language, "UTC");
  const kindName = (kind: string) =>
    kind === "terms" || kind === "privacy" || kind === "publishing"
      ? t(`legal.kind.${kind}`)
      : kind;
  const rows = query.data ?? [];
  return (
    <PageCard testid="listing-certifications" className="min-w-0 space-y-3">
      <h2 className="text-sm font-semibold text-foreground">{t("admin.listings.cert.title")}</h2>
      {query.isPending ? (
        <p role="status" className="text-sm text-muted-foreground">
          {t("common.loading")}
        </p>
      ) : query.isError ? (
        <p role="alert" className="text-sm text-destructive">
          {t("common.error")}
        </p>
      ) : rows.length === 0 ? (
        <p className="text-sm text-muted-foreground" data-testid="listing-certifications-none">
          {t("admin.listings.cert.none")}
        </p>
      ) : (
        <ol className="min-w-0 space-y-3">
          {rows.map((row) => (
            <li
              key={row.id}
              data-testid="listing-certification"
              data-action={row.action}
              className="min-w-0 space-y-1 border-b border-border pb-2 text-sm last:border-b-0"
            >
              <p className="font-medium text-foreground">
                {t(`admin.listings.cert.action.${row.action}`)}
              </p>
              <p className="text-xs text-muted-foreground">
                {t("admin.listings.cert.meta")
                  .replace("{date}", row.certifiedAt ? when.format(new Date(row.certifiedAt)) : "")
                  .replace(
                    "{language}",
                    row.language === "en" || row.language === "am"
                      ? t(`admin.legal.lang.${row.language}`)
                      : languageRowName(row.language, publicLanguages),
                  )
                  .replace("{countries}", row.countries.join(", "))}
              </p>
              <ul className="min-w-0 space-y-0.5">
                {row.versions.map((v) => {
                  const line = [
                    kindName(v.kind),
                    v.countryCode === null
                      ? t("admin.legal.scope.global")
                      : formatCountryName(v.countryCode, language),
                    t("admin.legal.version").replace("{n}", String(v.version)),
                    v.label,
                  ].join(" · ");
                  return (
                    <li key={v.versionId} className="break-words text-foreground">
                      {mayViewLegal ? (
                        <Link
                          to="/admin/legal/$versionId"
                          params={{ versionId: v.versionId }}
                          className="text-primary underline"
                        >
                          {line}
                        </Link>
                      ) : (
                        line
                      )}
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ol>
      )}
    </PageCard>
  );
}
