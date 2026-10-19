import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Copy, Eye, EyeOff, Pencil } from "lucide-react";
import { useState, type ReactNode } from "react";

import { canonicalSegment, listingPath } from "@/features/ad-page/address";
import { ShareAd, sharePriceText } from "@/features/ad-page/share-ad";
import { PageHeader } from "@/components/layout/page-header";
import { PageShell } from "@/components/layout/page-shell";
import { PageCard } from "@/components/shell/page-card";
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
import { FadingNotice } from "@/components/ui/fading-notice";
import { GROUP_LABEL as FIELD_WORD, groupsOf } from "@/features/admin-listings/history";
import { nearestCategoryPicture, useCategoryTree } from "@/features/categories/category-tree";
import { loadAttributeOptions, type AttrOption } from "@/features/posting/attribute-options";
import {
  readDraft,
  readPostingSchema,
  readSellerIdentity,
  readSellerLine,
  type AttrDef,
  type PlanCaps,
} from "@/features/posting/posting-service";
import { ribbonOf, SOLD_RIBBON } from "@/features/feed/feed-page";
import { storedUnitNoun } from "@/features/posting/price-line";
import { ListingDetail } from "@/features/posting/preview/listing-detail";
import { fill } from "@/features/posting/refusal-text";
import { usePriceUnitLabels } from "@/features/posting/use-price-unit-labels";
import { useI18n } from "@/i18n";
import { ownValue } from "@/lib/own-key";
import { authKey } from "@/lib/query-keys";
import { refreshAfterWrite } from "@/lib/refresh-after-write";

import {
  actionKey,
  actionsFor,
  ASKS_FIRST,
  confirmKeys,
  copyable,
  copyMyListing,
  doneKey,
  EDITABLE_STATUSES,
  editMyListing,
  primaryAction,
  readHistory,
  readListingCounts,
  readMyListing,
  runAction,
  sellerLines,
  STATUS_WORD,
  type HistoryLine,
  type ListingAction,
  type MyListing,
} from "./my-listing";
import { GROUP_LABEL, shareable } from "./my-listings";
import { REASON_WORD, SOLD_ON, stateLine, visibilityOf } from "./state-line";

/**
 * Bundle 16 turn 3 — ONE OF THE SELLER'S ADS (/my-listings/<id>; D138; D173–D176;
 * docs/features/my-listings.md, "One ad's page").
 *
 * From the top: the way back to My listings; the title; the status card — the
 * ad's group, its Reserved and "Price reduced" marks, its state in the same words
 * as the list (`stateLine`), and its dates: first posted, renewed (D175 3), ends,
 * sold; the actions card — the one-tap actions this ad offers (`actionsFor`), Mark
 * as sold (rented, filled — turn 3b, call H) and Delete (turn 3b, call F) behind a
 * confirm because they cannot be undone; the ad as buyers see it
 * (the same `ListingDetail` the posting preview and the admin page draw); and its
 * history (`listing_history`: you, staff or the system, never a staff member's
 * name, with staff's reason and note).
 *
 * Every action goes to its own door, which re-checks everything (F3). Whatever the
 * answer, the ad, its history and the list are read again, so the page never
 * shows a state the database does not hold (F4); a refusal is said in words.
 *
 * Bundle 16 turn R1 (D181) — the actions are one bar under the title, as on the
 * admin's listing page: one row of buttons that wraps (each button full width on a
 * phone), the ad's main next step filled — Reopen on a closed ad, Renew on an
 * expired one, Mark as sold on a live one — the others outlined, Delete red and
 * last; the status card, the ad as buyers see it and its history follow. The
 * bar's container keeps its testid (`my-listing-actions`); it has no heading.
 *
 * Testids: the page `my-listing-page`; back `my-listing-back`; status
 * `my-listing-status`, its group `my-listing-group`, its state `my-listing-state`,
 * Reserved `my-listing-reserved`, "Price reduced" `my-listing-price-reduced`, the
 * dates `my-listing-first-posted`, `my-listing-renewed`, `my-listing-ends`,
 * `my-listing-sold`; actions `my-listing-actions`, each button
 * `my-listing-action-<reserve|unreserve|sell|close|reopen|renew>`, Continue on a
 * draft `my-listing-continue`, the done line `my-listing-notice` (D192: shown for a
 * few seconds, then faded — bundle 17 turn 3), the refusal
 * `my-listing-problem`, the words for no action `my-listing-no-action` (a removed
 * ad), the line on why an action is not there `my-listing-info` (in review; renew
 * switched off); the
 * confirm `my-listing-confirm` with `my-listing-confirm-cancel` and
 * `my-listing-confirm-yes`; the ad `my-listing-as-seen`; history
 * `my-listing-history`, each line `my-listing-history-line`; the refusal to read
 * `my-listing-not-found`, a failed read `my-listing-error`.
 *
 * Bundle 16 turn R2 (D172, D177, D182 4) — EDIT IN BOXES AND POST A SIMILAR AD.
 * Edit (`my-listing-edit`, outlined, first in the bar) is on a live, closed or
 * refused ad (`EDITABLE_STATUSES`); it opens the edit panel in the place of the ad
 * as buyers see it — the heading `my-listing-edit-heading` and the admin's edit
 * form in its seller form (`ListingEditForm variant="seller"`): the photos and the
 * video link first (the posting form's own photo tools — a photo is added, moved
 * or removed at once, as in the posting form), then the title and description,
 * the specifications and the price, and Save. Save sends the changed fields to
 * `edit_my_listing`: amounts and picked answers apply at once
 * (`myListings.editBox.done`); words go to review (`myListings.editBox.doneReview`);
 * a refusal lands under its field and nothing closes (F4). The list's row Edit
 * opens this page with the panel open (`?edit=1`). "Post a similar ad"
 * (`my-listing-copy`, before Delete) copies the ad into a new draft
 * (`copy_my_listing`) and opens it in the posting form.
 *
 * Bundle 16 turn E2b (D187) — the edit is complete and in the posting form's
 * order: Specifications → Photos → Title and description (with the writing
 * helper) → Price → Place → Contact → Save. The page hands the form the ad's
 * places, channels, text lines and pin (`readDraft`), its id and its first three
 * photo ids. Places, the pin and the channels apply at once; a changed directions
 * or street line goes to review with the words (edit_my_listing, turn E2a).
 *
 * Bundle 17 turn 2 (D194) — THE EDIT IS THE WIZARD. Edit opens the posting form
 * in its edit mode at the ad's own edit address (`/my-listings/<id>/edit`): the
 * Review first, every section with its Edit link but the Category, each step
 * saving on Next through `edit_my_listing`, Done coming back here. The panel of
 * turns R2 and E2b (`my-listing-edit-panel`, the stacked boxes) is gone, and the
 * page shows the ad as buyers see it in every state; `?edit=1` is no more.
 */

const adKey = (listingId: string) => authKey("my-listing", listingId);
const historyKey = (listingId: string) => authKey("my-listing-history", listingId);
const countsKey = (listingId: string) => authKey("my-listing-counts", listingId);
const contentKey = (listingId: string) => authKey("my-listing-content", listingId);

function BackLink() {
  const { t } = useI18n();
  return (
    <Link
      to="/my-listings"
      data-testid="my-listing-back"
      className="inline-flex min-h-11 items-center gap-1 text-sm text-muted-foreground underline underline-offset-4"
    >
      <ArrowLeft aria-hidden="true" className="size-4" />
      {t("nav.myListings")}
    </Link>
  );
}

function Mark({ testid, children }: { testid: string; children: ReactNode }) {
  return (
    <span
      data-testid={testid}
      className="inline-flex items-center rounded-full bg-gold px-2 py-0.5 text-xs font-semibold text-gold-foreground"
    >
      {children}
    </span>
  );
}

export function MyListingPage({ listingId }: { listingId: string }) {
  const { t, language } = useI18n();
  const queryClient = useQueryClient();
  const { tree } = useCategoryTree();
  const [busy, setBusy] = useState(false);
  const [notice, setNoticeText] = useState<string | null>(null);
  /** D192 — each new line re-shows the notice, the same words included. */
  const [noticeNonce, setNoticeNonce] = useState(0);
  const setNotice = (text: string | null) => {
    setNoticeText(text);
    if (text !== null) setNoticeNonce((n) => n + 1);
  };
  const [problem, setProblem] = useState<string | null>(null);
  const [confirming, setConfirming] = useState<"sell" | "delete" | null>(null);
  const navigate = useNavigate();

  const query = useQuery({
    queryKey: adKey(listingId),
    queryFn: () => readMyListing(listingId),
  });
  const ad: MyListing | null =
    query.data !== undefined && query.data !== "notYours" ? query.data : null;
  const row = ad?.listing ?? null;

  // The ad as buyers see it: its content (the owner's own read, as the posting form reads it), its category's
  // questions and answers, the seller's public line, and the unit words when its price has a unit.
  const content = useQuery({
    queryKey: contentKey(listingId),
    queryFn: () => readDraft(listingId),
    enabled: ad !== null,
  });
  const categoryId = row?.categoryId ?? null;
  const schema = useQuery({
    queryKey: ["my-listing-schema", categoryId],
    enabled: categoryId !== null,
    queryFn: async (): Promise<{
      definitions: AttrDef[];
      attributeOptions: Record<string, AttrOption[]>;
      /** Turn R2 — the seller's plan caps: the photos box obeys `maxPhotos`, as the posting form does. */
      plan: PlanCaps | null;
    }> => {
      const found = await readPostingSchema(categoryId as string);
      const definitions = found?.attributes ?? [];
      const entries = await Promise.all(
        definitions
          .filter((definition) => ["single_select", "multi_select"].includes(definition.attrType))
          .map(
            async (definition) =>
              [
                definition.attrKey,
                (await loadAttributeOptions(definition.attributeId)) ?? [],
              ] as const,
          ),
      );
      return {
        definitions,
        attributeOptions: Object.fromEntries(entries),
        plan: found?.plan ?? null,
      };
    },
  });
  const identity = useQuery({
    queryKey: authKey("seller-identity"),
    queryFn: readSellerIdentity,
    enabled: ad !== null,
  });
  const line = useQuery({
    queryKey: authKey("seller-line"),
    queryFn: readSellerLine,
    enabled: ad !== null,
  });
  const history = useQuery({
    queryKey: historyKey(listingId),
    queryFn: () => readHistory(listingId),
    enabled: ad !== null,
  });
  const counts = useQuery({
    queryKey: countsKey(listingId),
    queryFn: () => readListingCounts(listingId),
    enabled: ad !== null && row !== null && row.publishedFirstAt !== null,
  });
  const unitLabels = usePriceUnitLabels(row !== null && row.priceUnit !== null);

  const day = (iso: string | null) =>
    iso === null
      ? ""
      : new Intl.DateTimeFormat(language, { dateStyle: "medium" }).format(new Date(iso));
  const moment = (iso: string) =>
    new Intl.DateTimeFormat(language, { dateStyle: "medium", timeStyle: "short" }).format(
      new Date(iso),
    );

  const reload = async () => {
    await refreshAfterWrite(queryClient, { queryKey: adKey(listingId) });
    await refreshAfterWrite(queryClient, { queryKey: historyKey(listingId) });
    await refreshAfterWrite(queryClient, { queryKey: contentKey(listingId) });
    await refreshAfterWrite(queryClient, { queryKey: authKey("my-listings") });
  };

  const act = async (action: ListingAction) => {
    if (ad === null || busy) return;
    setBusy(true);
    setNotice(null);
    setProblem(null);
    try {
      const outcome = await runAction(ad, action);
      if (!outcome.ok) setProblem(t(outcome.key));
      else if (action === "delete") {
        // Turn 3b (call F) — a deleted ad has no page: back to My listings, read again.
        await reload();
        void navigate({ to: "/my-listings" });
        return;
      } else setNotice(t(doneKey(action, ad.listing.soldWord)));
    } catch {
      setProblem(t("myListings.error.failed"));
    } finally {
      await reload();
      setBusy(false);
    }
  };

  /** D182 4 — Post a similar ad: a new draft with this ad's details, opened in the posting form. */
  const runCopy = async () => {
    if (busy) return;
    setBusy(true);
    setNotice(null);
    setProblem(null);
    try {
      const outcome = await copyMyListing(listingId);
      if (outcome.ok) {
        await refreshAfterWrite(queryClient, { queryKey: authKey("my-listings") });
        void navigate({ to: "/post/$listingId", params: { listingId: outcome.listingId } });
        return;
      }
      setProblem(t(outcome.key));
    } catch {
      setProblem(t("myListings.error.failed"));
    }
    setBusy(false);
  };

  if (query.isLoading) {
    return (
      <PageShell as="main" width="wide" data-testid="my-listing-page">
        <BackLink />
        <p role="status" aria-live="polite" className="mt-4 text-sm text-muted-foreground">
          {t("common.loading")}
        </p>
      </PageShell>
    );
  }
  if (query.isError) {
    return (
      <PageShell as="main" width="wide" data-testid="my-listing-page">
        <BackLink />
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <p role="alert" data-testid="my-listing-error" className="text-sm text-destructive">
            {t("myListings.ad.loadError")}
          </p>
          <Button type="button" variant="outline" size="touch" onClick={() => void query.refetch()}>
            {t("common.retry")}
          </Button>
        </div>
      </PageShell>
    );
  }
  if (ad === null || row === null) {
    return (
      <PageShell as="main" width="wide" data-testid="my-listing-page">
        <BackLink />
        <p data-testid="my-listing-not-found" className="mt-4 text-sm text-muted-foreground">
          {t("myListings.ad.notFound")}
        </p>
      </PageShell>
    );
  }

  const actions = actionsFor(ad);
  const primary = primaryAction(actions);
  // Turn R2 — Edit on a live, closed or refused ad; Post a similar ad on any but a draft, a removed or a refused one.
  const mayEdit = EDITABLE_STATUSES.has(row.status);
  const mayCopy = copyable(row.status);
  const steps = actions.filter((action) => action !== "delete");
  const mayDelete = actions.includes("delete");
  const live = row.status === "active" || row.status === "reduced";
  // D180 — the marks, the picture's ribbon (the first mark) and what buyers see of the ad.
  const sold = row.status === "sold";
  const soldKey = ownValue(SOLD_RIBBON, row.soldWord);
  const reduced = row.priceWas !== null && !sold;
  const ribbonKey = ribbonOf({
    soldWord: sold ? row.soldWord : null,
    closed: row.status === "closed",
    reserved: row.reserved,
    priceReduced: reduced,
  })[0];
  const seen = visibilityOf(row);

  // Why an action is not there: an ad in review waits for its answer (call G); renewing may be switched off.
  const info =
    ad.group === "review"
      ? t("myListings.ad.waiting")
      : row.status === "expired" && !ad.renewAllowed
        ? t("myListings.renewOff")
        : null;

  const historyWhat = (entry: HistoryLine): string => {
    const word = (status: string | null) => {
      const key = status === null ? undefined : ownValue(STATUS_WORD, status);
      return key === undefined ? (status ?? "") : t(key);
    };
    if (entry.kind === "create") return t("admin.listings.history.created");
    if (entry.fields.includes("renewed_count")) return t("admin.listings.history.renewed");
    if (entry.reserved !== null)
      return t(entry.reserved ? "myListings.history.reserved" : "myListings.history.unreserved");
    if (entry.to !== null)
      return fill(t("admin.listings.history.status"), {
        from: word(entry.from),
        to: word(entry.to),
      });
    return fill(t("admin.listings.history.edited"), {
      fields: groupsOf(entry.fields)
        .map((group) => t(FIELD_WORD[group]))
        .join(", "),
    });
  };
  const historyWho = (entry: HistoryLine): string =>
    entry.by === "you"
      ? t("myListings.history.you")
      : entry.by === "staff"
        ? t("admin.listings.history.by.staff")
        : t("admin.listings.history.by.system");

  const draft = content.data ?? null;
  const lines = history.data === undefined ? undefined : sellerLines(history.data);
  return (
    <PageShell as="main" width="wide" data-testid="my-listing-page">
      <BackLink />
      <PageHeader
        className="mt-2"
        title={<span className="break-words">{row.title ?? t("myListings.untitled")}</span>}
      />
      <div data-testid="my-listing-actions" className="mt-3 min-w-0 space-y-2">
        {typeof row.publicId === "string" && (row.status === "active" || row.status === "sold") ? (
          <Button asChild variant="outline" size="touch">
            <Link
              to="/l/$slug"
              params={{ slug: canonicalSegment(row.title ?? "", row.publicId) }}
              target="_blank"
              rel="noopener"
              data-testid="my-listing-open-public"
            >
              <Eye aria-hidden="true" />
              {t("myListings.ad.openPublic")}
            </Link>
          </Button>
        ) : null}
        {info !== null ? (
          <p data-testid="my-listing-info" className="text-sm text-muted-foreground">
            {info}
          </p>
        ) : null}
        {actions.length === 0 && !mayEdit && !mayCopy && row.status !== "draft" ? (
          <p data-testid="my-listing-no-action" className="text-sm text-muted-foreground">
            {t("myListings.ad.none")}
          </p>
        ) : (
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            {/* D194 — Edit first: the posting form in its edit mode, on its Review. */}
            {mayEdit ? (
              <Button
                type="button"
                size="touch"
                variant="outline"
                data-testid="my-listing-edit"
                disabled={busy}
                onClick={() =>
                  void navigate({ to: "/my-listings/$listingId/edit", params: { listingId } })
                }
              >
                <Pencil aria-hidden="true" />
                {t("myListings.edit")}
              </Button>
            ) : null}
            {/* A draft's next step is the posting form. */}
            {row.status === "draft" ? (
              <Button asChild variant="default" size="touch">
                <Link
                  to="/post/$listingId"
                  params={{ listingId: row.id }}
                  data-testid="my-listing-continue"
                >
                  {t("myListings.continue")}
                </Link>
              </Button>
            ) : null}
            {steps.map((action) => (
              <Button
                key={action}
                type="button"
                size="touch"
                variant={action === primary ? "default" : "outline"}
                data-testid={`my-listing-action-${action}`}
                disabled={busy}
                onClick={() => {
                  if (action === "sell") setConfirming(action);
                  else void act(action);
                }}
              >
                {action === "renew"
                  ? fill(t(actionKey("renew", row.soldWord)), {
                      days: String(ad.renewDays ?? ""),
                    })
                  : t(actionKey(action, row.soldWord))}
              </Button>
            ))}
            {/* D182 4 — a new draft with this ad's details; Delete stays last. */}
            {mayCopy ? (
              <Button
                type="button"
                size="touch"
                variant="outline"
                data-testid="my-listing-copy"
                disabled={busy}
                onClick={() => void runCopy()}
              >
                <Copy aria-hidden="true" />
                {t("myListings.action.copy")}
              </Button>
            ) : null}
            {mayDelete ? (
              <Button
                type="button"
                size="touch"
                variant="destructiveOutline"
                data-testid="my-listing-action-delete"
                disabled={busy}
                onClick={() => setConfirming("delete")}
              >
                {t(actionKey("delete", row.soldWord))}
              </Button>
            ) : null}
          </div>
        )}
        {/* D192 (bundle 17 turn 3) — the done line shows for a few seconds and fades. */}
        <FadingNotice testid="my-listing-notice" nonce={noticeNonce} text={notice} />
        {problem !== null ? (
          <p role="alert" data-testid="my-listing-problem" className="text-sm text-destructive">
            {problem}
          </p>
        ) : null}
      </div>
      <div className="mt-4 min-w-0 space-y-4">
        <PageCard testid="my-listing-status" className="min-w-0 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span data-testid="my-listing-group" className="text-sm font-semibold text-foreground">
              {t(GROUP_LABEL[ad.group])}
            </span>
            {sold ? (
              <Mark testid="my-listing-sold-mark">{t(SOLD_RIBBON[row.soldWord])}</Mark>
            ) : null}
            {row.status === "closed" ? (
              <Mark testid="my-listing-closed-mark">{t("feed.ribbon.closed")}</Mark>
            ) : null}
            {row.reserved ? (
              <Mark testid="my-listing-reserved">{t("myListings.reserved")}</Mark>
            ) : null}
            {reduced ? (
              <Mark testid="my-listing-price-reduced">{t("myListings.priceReduced")}</Mark>
            ) : null}
          </div>
          <p data-testid="my-listing-state" className="text-sm text-muted-foreground">
            {stateLine(row, t, day)}
          </p>
          <p
            data-testid="my-listing-visibility"
            data-visible={seen}
            className="flex items-start gap-1.5 text-sm font-medium text-foreground"
          >
            {seen === "hidden" ? (
              <EyeOff className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            ) : (
              <Eye className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            )}
            <span>
              {seen === "seen"
                ? t("myListings.ad.seen")
                : seen === "soldSeen"
                  ? fill(t("myListings.ad.soldSeen"), { word: t(SOLD_RIBBON[row.soldWord]) })
                  : t("myListings.ad.hidden")}
            </span>
          </p>
          <ul className="space-y-0.5 text-sm text-muted-foreground">
            {row.publishedFirstAt !== null ? (
              <li data-testid="my-listing-first-posted">
                {fill(t("myListings.ad.firstPosted"), { date: day(row.publishedFirstAt) })}
              </li>
            ) : null}
            {row.renewedAt !== null ? (
              <li data-testid="my-listing-renewed">
                {fill(t("myListings.ad.renewed"), { date: day(row.renewedAt) })}
              </li>
            ) : null}
            {live && row.expiresAt !== null ? (
              <li data-testid="my-listing-ends">
                {fill(t("myListings.ad.ends"), { date: day(row.expiresAt) })}
              </li>
            ) : null}
            {row.soldAt !== null ? (
              <li data-testid="my-listing-sold">
                {fill(t(SOLD_ON[row.soldWord]), { date: day(row.soldAt) })}
              </li>
            ) : null}
          </ul>
        </PageCard>

        <PageCard testid="my-listing-as-seen" className="min-w-0 space-y-3">
          <h2 className="text-sm font-semibold text-foreground">{t("post.preview.title")}</h2>
          {draft === null ? (
            <p role="status" aria-live="polite" className="text-sm text-muted-foreground">
              {/* readDraft answers null for an ad that is not the caller's: a refusal, never a wait. */}
              {content.isError || content.isSuccess
                ? t("myListings.ad.loadError")
                : t("common.loading")}
            </p>
          ) : (
            <ListingDetail
              actor="owner"
              soldBadge={sold && soldKey !== undefined ? t(soldKey) : null}
              counts={
                row.publishedFirstAt === null
                  ? undefined
                  : counts.isError
                    ? null
                    : counts.data === undefined
                      ? undefined
                      : {
                          views: counts.data.views,
                          shares: counts.data.shares,
                          contacts: counts.data.contacts,
                          saves: counts.data.saves,
                        }
              }
              title={draft.draft.title ?? ""}
              description={draft.draft.description ?? ""}
              priceMode={draft.draft.priceMode ?? "contact"}
              priceAmount={draft.draft.priceAmount}
              priceCurrency={draft.draft.priceCurrency}
              pricePeriod={draft.draft.pricePeriod}
              priceBp={draft.draft.priceBp}
              priceNegotiable={draft.draft.priceNegotiable}
              basisLabel={storedUnitNoun(row.priceUnit, row.priceUnitText, unitLabels, language)}
              attributes={draft.draft.attributes}
              definitions={schema.data?.definitions ?? []}
              attributeOptions={schema.data?.attributeOptions ?? {}}
              photos={draft.photos}
              illustrationUrl={
                categoryId === null ? null : nearestCategoryPicture(tree, categoryId)
              }
              photosSoon={draft.draft.photosSoon}
              ribbon={ribbonKey === undefined ? null : t(ribbonKey)}
              coverage={draft.coverage}
              country={ad.countryCode}
              contactPref={draft.draft.contactPref}
              sellerAlias={identity.data?.alias ?? null}
              sellerBusinessName={
                identity.data?.sellerType === "business"
                  ? (identity.data.businessName ?? null)
                  : null
              }
              sellerPreviousAlias={line.data?.previousAlias ?? null}
              sellerMemberSince={line.data?.memberSince ?? null}
              pinLat={draft.draft.pinLat}
              pinLng={draft.draft.pinLng}
              pinPrecision={draft.draft.pinPrecision}
              pinZoom={draft.draft.pinZoom}
              directions={draft.draft.directions}
              streetAddress={draft.draft.streetAddress}
              share={
                shareable(row) ? (
                  <ShareAd
                    publicId={row.publicId}
                    canonicalPath={listingPath(row.title ?? "", row.publicId)}
                    title={row.title ?? ""}
                    priceText={sharePriceText(
                      {
                        mode: draft.draft.priceMode ?? "contact",
                        amount: draft.draft.priceAmount,
                        currency: draft.draft.priceCurrency,
                        period: draft.draft.pricePeriod,
                        bp: draft.draft.priceBp,
                        unit: storedUnitNoun(
                          row.priceUnit,
                          row.priceUnitText,
                          unitLabels,
                          language,
                        ),
                      },
                      t,
                      language,
                    )}
                  />
                ) : undefined
              }
            />
          )}
        </PageCard>

        <PageCard testid="my-listing-history" className="min-w-0 space-y-3">
          <h2 className="text-sm font-semibold text-foreground">
            {t("admin.listings.detail.history")}
          </h2>
          {lines === undefined ? (
            <p role="status" aria-live="polite" className="text-sm text-muted-foreground">
              {history.isError ? t("myListings.ad.loadError") : t("common.loading")}
            </p>
          ) : lines.length === 0 ? (
            <p className="text-sm text-muted-foreground">{t("myListings.history.empty")}</p>
          ) : (
            <ol className="min-w-0 space-y-3">
              {lines.map((entry, index) => {
                const reason =
                  entry.reason === null ? undefined : ownValue(REASON_WORD, entry.reason);
                return (
                  <li
                    key={`${entry.at}-${index}`}
                    data-testid="my-listing-history-line"
                    className="min-w-0 space-y-0.5 border-b border-border pb-2 text-sm last:border-b-0"
                  >
                    <p className="text-xs text-muted-foreground">
                      {moment(entry.at)} · {historyWho(entry)}
                    </p>
                    <p className="break-words text-foreground">{historyWhat(entry)}</p>
                    {reason !== undefined ? (
                      <p className="text-muted-foreground">
                        {fill(t("admin.listings.history.reason"), { reason: t(reason) })}
                      </p>
                    ) : null}
                    {entry.note !== null ? (
                      <p className="break-words text-muted-foreground">
                        {fill(t("admin.listings.history.note"), { note: entry.note })}
                      </p>
                    ) : null}
                  </li>
                );
              })}
            </ol>
          )}
        </PageCard>
      </div>

      <AlertDialog
        open={confirming !== null}
        onOpenChange={(open) => {
          if (!open) setConfirming(null);
        }}
      >
        {confirming !== null ? (
          <AlertDialogContent data-testid="my-listing-confirm">
            <AlertDialogHeader>
              <AlertDialogTitle>{t(confirmKeys(confirming, row.soldWord).title)}</AlertDialogTitle>
              <AlertDialogDescription>
                {t(confirmKeys(confirming, row.soldWord).body)}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="min-h-11" data-testid="my-listing-confirm-cancel">
                {t("common.cancel")}
              </AlertDialogCancel>
              <AlertDialogAction
                className={
                  confirming === "delete"
                    ? "min-h-11 bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    : "min-h-11"
                }
                data-testid="my-listing-confirm-yes"
                onClick={() => {
                  const action = confirming;
                  setConfirming(null);
                  if (ASKS_FIRST.has(action)) void act(action);
                }}
              >
                {t(confirmKeys(confirming, row.soldWord).yes)}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        ) : null}
      </AlertDialog>
    </PageShell>
  );
}

export default MyListingPage;
