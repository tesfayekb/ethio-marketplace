import { useCallback, useEffect, useMemo, useState } from "react";

import { FormField } from "@/components/shell/form-section";
import { PageCard } from "@/components/shell/page-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { pathOf, useCategoryTree } from "@/features/categories/category-tree";
import { basisInForce, basisToken } from "@/features/posting/price-basis";
import { storedUnitNoun } from "@/features/posting/price-line";
import { FALLBACK_CURRENCY, readMarketCurrencies } from "@/features/posting/pricing-data";
import { readPostingSchemaAnswer, type AttrDef } from "@/features/posting/posting-service";
import { draftRefusalKey, fill, refusalFor } from "@/features/posting/refusal-text";
import { StepCategory } from "@/features/posting/step-category";
import { DESCRIPTION_MAX, TITLE_MAX } from "@/features/posting/step-details";
import { StepPricing, type PricingValues } from "@/features/posting/step-pricing";
import { StepSpecifications, type DealGroup } from "@/features/posting/step-specifications";
import type { CategoryFacts, Refusal } from "@/features/posting/types";
import { usePriceUnitLabels } from "@/features/posting/use-price-unit-labels";
import { useI18n, type MessageKey } from "@/i18n";
import { entityName } from "@/i18n/entity";

import {
  EDIT_REASONS,
  editChanges,
  editProblem,
  FORM_FIELDS,
  valuesOf,
  type EditValues,
} from "./edit-listing";
import { GROUP_LABEL, groupOf } from "./history";
import { ReasonNote } from "./reason-note";
import type { AdminListingDetail } from "./use-admin-listing";

/**
 * Bundle 11, the Listings console, turns L4a and L4b (D136, D140, DEC-173) — AN
 * ADMIN'S EDIT of a listing, on the listing's page: the title and the
 * description; the category; the specifications; the price.
 *
 * Every section is the seller's own control, so the edit offers what the door
 * accepts: the category tree with its filter (`StepCategory`, behind "Change
 * category"; the admin's own recent categories are not offered), the
 * specifications form (`StepSpecifications`) for the category in the form, and
 * the price form (`StepPricing`) with the category's price rules — drawn, as on
 * the seller's price page, inside the "How it is sold" rows when the category
 * has them. The price is drawn only once the category's rules and the market
 * money are read: a failed read leaves the price as it is and says so. A price
 * with none opens on the listing's market money, never the admin's.
 *
 * Only the changed fields travel (`editChanges`): the category when another
 * leaf was chosen; the specifications when they differ AND the admin changed
 * the category or worked in them (the seller's form fills defaults and tidies
 * hidden answers on its own — an admin who only looked must not send that); the
 * price whole. The door judges them with the seller's content rules for what an
 * admin can change (DEC-173): a moved listing keeps the answers its new
 * category also asks. Its refusals land under their field; one naming a field
 * the form does not draw is listed above Save.
 *
 * Testids: the card `listing-edit-form` (the page's Edit button is
 * `listing-edit`), the title `listing-edit-title`, the description
 * `listing-edit-description`, the category `listing-edit-category` (its path
 * `listing-edit-category-path`, "Change category" `listing-edit-category-change`,
 * the tree `post-category-*`, its Cancel `listing-edit-category-cancel`, its
 * refusal `listing-edit-category-refusal`), the specifications
 * `listing-edit-specs` (the seller's `post-spec` rows), the price `post-price-*`
 * (the seller's form), the reasons `listing-edit-reason-<reason>`, the note
 * `listing-edit-note`, the price's state `listing-edit-price-loading` /
 * `listing-edit-price-failed`, other refusals `listing-edit-other-refusals`, the
 * problem line `listing-edit-problem`, Cancel `listing-edit-cancel`, Save
 * `listing-edit-save`.
 */

type Load =
  | { state: "loading" }
  | { state: "ready"; facts: CategoryFacts | null; definitions: AttrDef[] }
  | { state: "failed" };

export interface ListingEditFormProps {
  listing: AdminListingDetail["listing"];
  busy: boolean;
  /** The door's refusals of the last save. */
  refusals: Refusal[];
  /** The door's error, already translated; null when there is none. */
  error: string | null;
  onCancel: () => void;
  onSave: (changes: Record<string, unknown>, reason: string, note: string) => void;
}

const sameKeys = (a: string[], b: string[]) =>
  a.length === b.length && a.every((key, index) => key === b[index]);

export function ListingEditForm({
  listing: current,
  busy,
  refusals,
  error,
  onCancel,
  onSave,
}: ListingEditFormProps) {
  const { t, language, entities } = useI18n();
  /**
   * INC-558 — THE LISTING AS THE FORM OPENED ON IT. Everything the edit sends
   * is measured against this snapshot, never against the page's live read: the
   * page refetches after a save, and a form opened before the new read arrived
   * held the old values — measured against the new read, the admin's untouched
   * title looked "changed" and was sent back, undoing the previous edit (AL-23,
   * CI on 98b0841b). Only what the admin changed in THIS form travels.
   */
  const [listing] = useState(current);
  const [values, setValues] = useState<EditValues>(() => valuesOf(listing, null));
  const [load, setLoad] = useState<Load>({ state: "loading" });
  const [currencyReady, setCurrencyReady] = useState(false);
  const [reason, setReason] = useState("");
  const [note, setNote] = useState("");
  const [problem, setProblem] = useState<MessageKey | null>(null);
  /** Turn L4b — true once the admin worked in the specifications (see `editChanges`). */
  const [specsEdited, setSpecsEdited] = useState(false);
  const [picking, setPicking] = useState(false);
  const [cursor, setCursor] = useState<string | null>(null);
  const [term, setTerm] = useState("");
  const [specFields, setSpecFields] = useState<string[]>([]);
  const [priceFields, setPriceFields] = useState<string[]>([]);
  const unitLabels = usePriceUnitLabels(listing.priceUnit !== null);
  const { tree, isLoading: treeLoading, error: treeError } = useCategoryTree();

  /** A price with none (free, on request) opens on the listing's market money. */
  const countryCode = listing.countryCode;
  useEffect(() => {
    let cancelled = false;
    void readMarketCurrencies().then((markets) => {
      if (cancelled) return;
      const currency =
        markets.find((market) => market.country === countryCode)?.currencyCode ?? FALLBACK_CURRENCY;
      setValues((current) =>
        current.price.priceCurrency !== null
          ? current
          : { ...current, price: { ...current.price, priceCurrency: currency } },
      );
      setCurrencyReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [countryCode]);

  /** The rules of the category IN THE FORM, read again when another leaf is chosen. */
  const categoryId = values.categoryId;
  useEffect(() => {
    let cancelled = false;
    setLoad({ state: "loading" });
    if (categoryId === null) {
      setLoad({ state: "failed" });
      return;
    }
    void readPostingSchemaAnswer(categoryId).then((answer) => {
      if (cancelled) return;
      // F4 — rules that did not load are not an empty rule book: the price is not drawn.
      setLoad(
        answer.schema === null
          ? { state: "failed" }
          : {
              state: "ready",
              facts: answer.schema.category,
              definitions: answer.schema.attributes,
            },
      );
    });
    return () => {
      cancelled = true;
    };
  }, [categoryId]);

  const onPrice = useCallback((patch: Partial<PricingValues>) => {
    setProblem(null);
    setValues((current) => ({ ...current, price: { ...current.price, ...patch } }));
  }, []);
  const onAttributes = useCallback((attributes: Record<string, unknown>) => {
    setValues((current) => ({ ...current, attributes }));
  }, []);
  const onSpecFields = useCallback((keys: string[]) => {
    setSpecFields((previous) => (sameKeys(previous, keys) ? previous : keys));
  }, []);
  const onPriceFields = useCallback((keys: string[]) => {
    setPriceFields((previous) => (sameKeys(previous, keys) ? previous : keys));
  }, []);
  /** Any tap or keystroke inside the specifications is the admin's own work there. */
  const markSpecs = () => {
    setProblem(null);
    setSpecsEdited(true);
  };

  const facts = load.state === "ready" ? load.facts : null;
  const definitions = load.state === "ready" ? load.definitions : null;
  /** DEC-109 — the "How it is sold" rows, drawn with the price as on the seller's price page. */
  const dealSignature = facts === null ? "" : JSON.stringify(facts.deal);
  const dealGroups = useMemo<DealGroup[]>(() => {
    if (facts === null) return [];
    const { deal } = facts;
    return [
      { id: "sold", headingKey: "post.price.group.sold", keys: [...deal.basis, ...deal.size] },
      { id: "quantity", headingKey: "post.price.group.quantity", keys: deal.quantity },
      { id: "terms", headingKey: "post.price.group.terms", keys: deal.terms },
    ];
    // Keyed by the lists' contents, so a re-read of the same rules keeps the same arrays (I3).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dealSignature]);
  const dealKeys = useMemo(() => dealGroups.flatMap((group) => group.keys), [dealGroups]);

  /** DEC-109 — the basis the form's specifications put in force (the door decides). */
  const basisKey =
    facts !== null && definitions !== null
      ? basisInForce(definitions, values.attributes, facts.deal.basis).key
      : null;
  const basisValue = basisKey === null ? null : basisToken(values.attributes[basisKey]);
  /** The stored unit names the listing's own basis; another basis is named after the save. */
  const basisLabel =
    values.categoryId === listing.categoryId &&
    basisKey !== null &&
    basisValue === basisToken(listing.attributes[basisKey])
      ? storedUnitNoun(listing.priceUnit, listing.priceUnitText, unitLabels, language)
      : null;

  const categoryPath =
    values.categoryId === null
      ? "—"
      : pathOf(tree, values.categoryId)
          .map((node) => entityName("category", node, entities))
          .join(" › ") || "—";
  const moved = values.categoryId !== listing.categoryId;

  const titleRefusal = refusalFor(refusals, "title");
  const descriptionRefusal = refusalFor(refusals, "description");
  const categoryRefusal = refusalFor(refusals, "category_id");
  const drawnHere = new Set([...FORM_FIELDS, ...specFields, ...priceFields]);
  const others = refusals.filter((entry) => !drawnHere.has(entry.field));

  const save = () => {
    const changes = editChanges(listing, values, specsEdited);
    const missing = editProblem(changes, reason, note);
    if (missing !== null || changes === null) {
      setProblem(missing ?? "admin.listings.edit.nothing");
      return;
    }
    onSave(changes, reason, note.trim());
  };

  const pricing =
    load.state === "ready" && currencyReady ? (
      <StepPricing
        key={values.categoryId ?? "none"}
        facts={load.facts}
        values={values.price}
        refusals={refusals}
        onChange={onPrice}
        basisKey={basisKey}
        basisValue={basisValue}
        basisLabel={basisLabel}
      />
    ) : null;

  return (
    <PageCard testid="listing-edit-form" className="min-w-0 max-w-2xl space-y-5">
      <div className="space-y-1">
        <h2 className="text-base font-semibold text-foreground">
          {t("admin.listings.edit.title")}
        </h2>
        <p className="text-sm text-muted-foreground">{t("admin.listings.edit.hint")}</p>
      </div>

      <FormField
        label={t("post.details.titleLabel")}
        htmlFor="listing-edit-title"
        help={fill(t("post.details.count"), { count: values.title.length, max: TITLE_MAX })}
        error={titleRefusal === null ? undefined : t(draftRefusalKey(titleRefusal.reason))}
        testid="listing-edit-title-field"
      >
        <Input
          id="listing-edit-title"
          data-testid="listing-edit-title"
          value={values.title}
          maxLength={TITLE_MAX}
          aria-invalid={titleRefusal !== null}
          onChange={(event) => {
            setProblem(null);
            setValues((current) => ({ ...current, title: event.target.value }));
          }}
        />
      </FormField>

      <FormField
        label={t("post.details.descriptionLabel")}
        htmlFor="listing-edit-description"
        help={fill(t("post.details.count"), {
          count: values.description.length,
          max: DESCRIPTION_MAX,
        })}
        error={
          descriptionRefusal === null ? undefined : t(draftRefusalKey(descriptionRefusal.reason))
        }
        testid="listing-edit-description-field"
      >
        <Textarea
          id="listing-edit-description"
          data-testid="listing-edit-description"
          value={values.description}
          maxLength={DESCRIPTION_MAX}
          rows={8}
          aria-invalid={descriptionRefusal !== null}
          onChange={(event) => {
            setProblem(null);
            setValues((current) => ({ ...current, description: event.target.value }));
          }}
        />
      </FormField>

      <section data-testid="listing-edit-category" className="min-w-0 space-y-2">
        <h3 className="text-sm font-semibold text-foreground">
          {t("admin.listings.col.category")}
        </h3>
        <p data-testid="listing-edit-category-path" className="break-words text-sm text-foreground">
          {categoryPath}
        </p>
        {moved ? (
          <p className="text-xs text-muted-foreground">{t("admin.listings.edit.categoryHint")}</p>
        ) : null}
        {categoryRefusal !== null ? (
          <p
            role="alert"
            data-testid="listing-edit-category-refusal"
            className="text-sm text-destructive"
          >
            {t(draftRefusalKey(categoryRefusal.reason))}
          </p>
        ) : null}
        {picking ? (
          <div className="min-w-0 space-y-2 rounded-md border border-border p-3">
            <StepCategory
              tree={tree}
              isLoading={treeLoading}
              treeError={treeError}
              cursor={cursor}
              onCursor={setCursor}
              term={term}
              onTerm={setTerm}
              selectedId={values.categoryId}
              showRecent={false}
              onChoose={(nextId) => {
                setProblem(null);
                setValues((current) => ({ ...current, categoryId: nextId }));
                setPicking(false);
                setTerm("");
                setCursor(null);
              }}
            />
            <Button
              type="button"
              variant="outline"
              size="touch"
              data-testid="listing-edit-category-cancel"
              onClick={() => {
                setPicking(false);
                setTerm("");
                setCursor(null);
              }}
            >
              {t("common.cancel")}
            </Button>
          </div>
        ) : (
          <Button
            type="button"
            variant="outline"
            size="touch"
            data-testid="listing-edit-category-change"
            onClick={() => setPicking(true)}
          >
            {t("admin.listings.edit.changeCategory")}
          </Button>
        )}
      </section>

      <section
        data-testid="listing-edit-specs"
        className="min-w-0 space-y-2"
        onClickCapture={markSpecs}
        onKeyDownCapture={markSpecs}
        onChangeCapture={markSpecs}
      >
        <h3 className="text-sm font-semibold text-foreground">
          {t("admin.listings.history.field.specs")}
        </h3>
        <StepSpecifications
          key={values.categoryId ?? "none"}
          categoryId={values.categoryId}
          values={values.attributes}
          onChange={onAttributes}
          refusals={refusals}
          onFields={onSpecFields}
          exclude={dealKeys.length === 0 ? null : dealKeys}
        />
      </section>

      <div
        className="min-w-0"
        onClickCapture={dealKeys.length === 0 ? undefined : markSpecs}
        onKeyDownCapture={dealKeys.length === 0 ? undefined : markSpecs}
        onChangeCapture={dealKeys.length === 0 ? undefined : markSpecs}
      >
        {load.state === "failed" ? (
          <p data-testid="listing-edit-price-failed" className="text-sm text-destructive">
            {t("admin.listings.edit.priceFailed")}
          </p>
        ) : pricing === null ? (
          <p
            role="status"
            aria-live="polite"
            data-testid="listing-edit-price-loading"
            className="text-sm text-muted-foreground"
          >
            {t("common.loading")}
          </p>
        ) : dealKeys.length === 0 ? (
          pricing
        ) : (
          <StepSpecifications
            key={values.categoryId ?? "none"}
            categoryId={values.categoryId}
            values={values.attributes}
            onChange={onAttributes}
            refusals={refusals}
            onFields={onPriceFields}
            only={dealKeys}
            groups={dealGroups}
            around={{ after: "sold", node: pricing }}
          />
        )}
      </div>

      <div className="min-w-0 space-y-3">
        <ReasonNote
          testid="listing-edit"
          reasons={EDIT_REASONS}
          reason={reason}
          note={note}
          onReason={(value) => {
            setReason(value);
            setProblem(null);
          }}
          onNote={(value) => {
            setNote(value);
            setProblem(null);
          }}
        />
      </div>

      {others.length > 0 ? (
        <ul
          data-testid="listing-edit-other-refusals"
          className="min-w-0 space-y-1 text-sm text-destructive"
        >
          {others.map((entry, index) => (
            <li key={`${entry.field}-${entry.reason}-${String(index)}`} className="break-words">
              {t(
                definitions?.some((def) => def.attrKey === entry.field)
                  ? GROUP_LABEL.specs
                  : GROUP_LABEL[groupOf(entry.field)],
              )}
              : {t(draftRefusalKey(entry.reason))}
            </li>
          ))}
        </ul>
      ) : null}

      {problem !== null || error !== null ? (
        <p role="alert" data-testid="listing-edit-problem" className="text-sm text-destructive">
          {problem !== null ? t(problem) : error}
        </p>
      ) : null}

      <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          size="touch"
          data-testid="listing-edit-cancel"
          disabled={busy}
          onClick={onCancel}
        >
          {t("common.cancel")}
        </Button>
        <Button
          type="button"
          size="touch"
          data-testid="listing-edit-save"
          disabled={busy}
          onClick={save}
        >
          {t("admin.listings.edit.save")}
        </Button>
      </div>
    </PageCard>
  );
}

export default ListingEditForm;
