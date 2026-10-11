import { useCallback, useEffect, useState } from "react";

import { FormField } from "@/components/shell/form-section";
import { PageCard } from "@/components/shell/page-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { basisInForce, basisToken } from "@/features/posting/price-basis";
import { storedUnitNoun } from "@/features/posting/price-line";
import { FALLBACK_CURRENCY, readMarketCurrencies } from "@/features/posting/pricing-data";
import { readPostingSchemaAnswer, type AttrDef } from "@/features/posting/posting-service";
import { draftRefusalKey, fill, refusalFor } from "@/features/posting/refusal-text";
import { DESCRIPTION_MAX, TITLE_MAX } from "@/features/posting/step-details";
import { StepPricing, type PricingValues } from "@/features/posting/step-pricing";
import type { CategoryFacts, Refusal } from "@/features/posting/types";
import { usePriceUnitLabels } from "@/features/posting/use-price-unit-labels";
import { useI18n, type MessageKey } from "@/i18n";

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
 * Bundle 11, the Listings console, turn L4a (D136, D140, DEC-173) — AN ADMIN'S
 * EDIT of a listing's title, description and price, on the listing's page.
 *
 * The price is the seller's own price form (`StepPricing`), drawn with the
 * category's price rules from `get_posting_schema` and the basis the listing's
 * specifications put in force, so it offers what the door accepts; it is drawn
 * only once those rules are read (a failed read leaves the price as it is and
 * says so). A price with none opens on the listing's market money. The reason
 * and the note are the console's one block (`ReasonNote`). Only the changed
 * fields travel (`editChanges`); the door judges them with the seller's content
 * rules and its refusals land under their field — a refusal naming a field this
 * form does not draw (the category, a specification) is listed above Save.
 *
 * Testids: the card `listing-edit-form` (the page's Edit button is
 * `listing-edit`), the title `listing-edit-title`, the
 * description `listing-edit-description`, the price `post-price-*` (the seller's
 * form), the reasons `listing-edit-reason-<reason>`, the note
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

export function ListingEditForm({
  listing,
  busy,
  refusals,
  error,
  onCancel,
  onSave,
}: ListingEditFormProps) {
  const { t, language } = useI18n();
  const [values, setValues] = useState<EditValues>(() => valuesOf(listing, null));
  const [load, setLoad] = useState<Load>({ state: "loading" });
  const [reason, setReason] = useState("");
  const [note, setNote] = useState("");
  const [problem, setProblem] = useState<MessageKey | null>(null);
  const unitLabels = usePriceUnitLabels(listing.priceUnit !== null);

  const categoryId = listing.categoryId;
  const countryCode = listing.countryCode;
  useEffect(() => {
    let cancelled = false;
    void Promise.all([
      categoryId === null ? Promise.resolve(null) : readPostingSchemaAnswer(categoryId),
      readMarketCurrencies(),
    ]).then(([answer, markets]) => {
      if (cancelled) return;
      // A price with none (free, on request) opens on the listing's market money.
      const currency =
        markets.find((market) => market.country === countryCode)?.currencyCode ?? FALLBACK_CURRENCY;
      setValues((current) =>
        current.price.priceCurrency !== null
          ? current
          : { ...current, price: { ...current.price, priceCurrency: currency } },
      );
      // F4 — rules that did not load are not an empty rule book: the price is not drawn.
      if (answer === null || answer.schema === null) {
        setLoad({ state: "failed" });
        return;
      }
      setLoad({
        state: "ready",
        facts: answer.schema.category,
        definitions: answer.schema.attributes,
      });
    });
    return () => {
      cancelled = true;
    };
  }, [categoryId, countryCode]);

  const onPrice = useCallback((patch: Partial<PricingValues>) => {
    setProblem(null);
    setValues((current) => ({ ...current, price: { ...current.price, ...patch } }));
  }, []);

  /** DEC-109 — the basis the listing's specifications put in force (the door decides). */
  const basisKey =
    load.state === "ready" && load.facts !== null
      ? basisInForce(load.definitions, listing.attributes, load.facts.deal.basis).key
      : null;
  const basisValue = basisKey === null ? null : basisToken(listing.attributes[basisKey]);
  const basisLabel = storedUnitNoun(listing.priceUnit, listing.priceUnitText, unitLabels, language);

  const titleRefusal = refusalFor(refusals, "title");
  const descriptionRefusal = refusalFor(refusals, "description");
  const others = refusals.filter((entry) => !FORM_FIELDS.includes(entry.field));

  const save = () => {
    const changes = editChanges(listing, values);
    const missing = editProblem(changes, reason, note);
    if (missing !== null || changes === null) {
      setProblem(missing ?? "admin.listings.edit.nothing");
      return;
    }
    onSave(changes, reason, note.trim());
  };

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

      {load.state === "loading" ? (
        <p
          role="status"
          aria-live="polite"
          data-testid="listing-edit-price-loading"
          className="text-sm text-muted-foreground"
        >
          {t("common.loading")}
        </p>
      ) : load.state === "failed" ? (
        <p data-testid="listing-edit-price-failed" className="text-sm text-destructive">
          {t("admin.listings.edit.priceFailed")}
        </p>
      ) : (
        <StepPricing
          facts={load.facts}
          values={values.price}
          refusals={refusals}
          onChange={onPrice}
          basisKey={basisKey}
          basisValue={basisValue}
          basisLabel={basisLabel}
        />
      )}

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
              {t(GROUP_LABEL[groupOf(entry.field)])}: {t(draftRefusalKey(entry.reason))}
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
