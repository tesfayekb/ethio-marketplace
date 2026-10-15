import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";

import { FormField, FormSection } from "@/components/shell/form-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { pathOf, useCategoryTree } from "@/features/categories/category-tree";
import { basisInForce, basisToken } from "@/features/posting/price-basis";
import { storedUnitNoun } from "@/features/posting/price-line";
import { FALLBACK_CURRENCY, readMarketCurrencies } from "@/features/posting/pricing-data";
import {
  readPostingSchemaAnswer,
  type AttrDef,
  type PlanCaps,
} from "@/features/posting/posting-service";
import { draftRefusalKey, fill, refusalFor } from "@/features/posting/refusal-text";
import type { PinValue } from "@/features/posting/map/map-pin-dropper";
import { DESCRIPTION_MAX, StepDetails, TITLE_MAX } from "@/features/posting/step-details";
import { StepPricing, type PricingValues } from "@/features/posting/step-pricing";
import { StepSpecifications, type DealGroup } from "@/features/posting/step-specifications";
import { StepWhere } from "@/features/posting/step-where";
import { StepWho } from "@/features/posting/step-who";
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
  type EditableListing,
  type EditValues,
} from "./edit-listing";
import { GROUP_LABEL, groupOf } from "./history";
import { ReasonNote } from "./reason-note";

/**
 * Bundle 11, the Listings console, turns L4a and L4b (D136, D140, DEC-173) — AN
 * ADMIN'S EDIT of a listing, on the listing's page: the title and the
 * description; the specifications; the price. D172 (the operator, 2026-10-14):
 * the category of a posted ad is never changed — it is shown, and "Change
 * category" is gone; an ad in the wrong category is sent back to review with
 * the reason Wrong category (the page's own action), and so is not an edit's
 * reason any more (`EDIT_REASONS`).
 *
 * Every box is the seller's own control, named as the seller's step (D171: the
 * console's FormSection, one box each — Title and description, Specifications,
 * Price — then the reason and Save): the specifications form
 * (`StepSpecifications`) for the listing's category, and the price form
 * (`StepPricing`) with the category's price rules — drawn, as on the seller's
 * price page, inside the "How it is sold" rows when the category has them. The
 * price is drawn only once the category's rules and the market money are read:
 * a failed read leaves the price as it is and says so. A price with none opens
 * on the listing's market money, never the admin's.
 *
 * Only the changed fields travel (`editChanges`): the specifications when they
 * differ AND the admin worked in them (the seller's form fills defaults and
 * tidies hidden answers on its own — an admin who only looked must not send
 * that); the price whole. The door judges them with the seller's content rules
 * for what an admin can change (DEC-173). Its refusals land under their field;
 * one naming a field the form does not draw is listed above Save.
 *
 * Testids: the boxes inside `listing-edit-form` (the page's Edit button is
 * `listing-edit`) — `listing-edit-text` (the title `listing-edit-title`, the
 * description `listing-edit-description`), `listing-edit-specs-box` (the
 * category `listing-edit-category`, its path `listing-edit-category-path`, its
 * refusal `listing-edit-category-refusal`; the specifications
 * `listing-edit-specs`, the seller's `post-spec` rows), `listing-edit-price-box`
 * (the price `post-price-*`, the seller's form; its state
 * `listing-edit-price-loading` / `listing-edit-price-failed`) and
 * `listing-edit-save-box` (the reasons `listing-edit-reason-<reason>`, the note
 * `listing-edit-note`, other refusals `listing-edit-other-refusals`, the problem
 * line `listing-edit-problem`; its bar `listing-edit-save-box-actions` with Save
 * `listing-edit-save` and Cancel `listing-edit-cancel`).
 *
 * Bundle 16 turn R2 (D172, D177) — THE SELLER'S EDIT is this form (`variant
 * "seller"`): the same boxes, a Photos box first (`listing-edit-photos-box`, the
 * page's own photo tools with the video link beside them — `photos`), and no
 * reason: Save sends the changed fields to `edit_my_listing`, which decides what
 * applies at once (amounts and picked answers) and what goes to review (words).
 * The save box says so (`myListings.editBox.hint`).
 *
 * Bundle 16 turn E2b (D187) — THE SELLER'S EDIT, COMPLETE, in the posting form's
 * order: Specifications → Photos → Title and description → Price → Place →
 * Contact → Save. The title box is the posting form's own (`StepDetails`, with
 * the writing helper — `listingId`, `photoIds`); the Place box is the posting
 * form's place step (`StepWhere`: the places into the form's values, the pin
 * through its own door at once, the two text lines into the form's values —
 * `textMode "form"` — so they ride Save and the door reviews them); the Contact
 * box is the posting form's contact step whole (`StepWho`: the channels into the
 * form's values; the identity block commits to the profile as when posting,
 * through the step's `saveRef`, called on Save when the seller worked in the
 * box). Save sends `coverage` and `contact_pref` only when the seller worked in
 * their box and they differ (`editChanges`); the door applies them at once.
 * Boxes: `listing-edit-place-box` (the step's `post-where-*`) and
 * `listing-edit-contact-box` (the step's `post-who-*`). The admin's form keeps
 * its order and boxes (D171): it gains nothing.
 */

type Load =
  | { state: "loading" }
  | { state: "ready"; facts: CategoryFacts | null; definitions: AttrDef[]; plan: PlanCaps | null }
  | { state: "failed" };

export interface ListingEditFormProps {
  listing: EditableListing;
  /** Turn R2 — "seller": no reason, the seller's words on the save box. */
  variant?: "admin" | "seller";
  /** Turn R2 — the seller's Photos box: the page's photo tools, given the video link the form holds. */
  photos?: (video: {
    value: string;
    refusal: Refusal | null;
    onChange: (value: string) => void;
  }) => ReactNode;
  /** Turn E2b — the ad, for the writing helper, the pin door and the contact step (the seller's form only). */
  listingId?: string | null;
  /** Turn E2b — the ad's first three stored photos, by id, for the writing helper. */
  photoIds?: string[];
  /** Turn E2b — the pin as the door holds it; the form keeps what the pin door writes. */
  pin?: PinValue | null;
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
  variant = "admin",
  photos,
  listingId = null,
  photoIds = [],
  pin: savedPin = null,
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
  const [specFields, setSpecFields] = useState<string[]>([]);
  const [priceFields, setPriceFields] = useState<string[]>([]);
  /** Turn E2b — true once the seller worked in the Place box / the Contact box (see `editChanges`). */
  const [placeEdited, setPlaceEdited] = useState(false);
  const [contactEdited, setContactEdited] = useState(false);
  /** Turn E2b — the pin as its door last wrote it (the door is the authority; the form only keeps its answer). */
  const [pin, setPin] = useState<PinValue | null>(savedPin);
  /** Turn E2b — the contact step's claim: the checked name and the profile's channels, as when posting. */
  const [whoSaveRef] = useState<{ current: (() => Promise<boolean>) | null }>(() => ({
    current: null,
  }));
  const unitLabels = usePriceUnitLabels(listing.priceUnit !== null);
  const { tree } = useCategoryTree();

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
              plan: answer.schema.plan,
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
  /** Turn E2b — the same for the seller's Place and Contact boxes. */
  const markPlace = () => {
    setProblem(null);
    setPlaceEdited(true);
  };
  const markContact = () => {
    setProblem(null);
    setContactEdited(true);
  };
  const onCoverage = useCallback((coverage: string[]) => {
    setValues((current) => ({ ...current, coverage }));
  }, []);
  const onContactPref = useCallback((contactPref: Record<string, unknown>) => {
    setValues((current) => ({ ...current, contactPref }));
  }, []);
  const onPlaceText = useCallback((text: { street: string | null; directions: string | null }) => {
    setValues((current) => ({
      ...current,
      streetAddress: text.street ?? "",
      directions: text.directions ?? "",
    }));
  }, []);
  const onDetails = useCallback(
    (patch: { title?: string; description?: string; videoUrl?: string }) => {
      setProblem(null);
      setValues((current) => ({ ...current, ...patch }));
    },
    [],
  );

  const facts = load.state === "ready" ? load.facts : null;
  const definitions = load.state === "ready" ? load.definitions : null;
  const plan = load.state === "ready" ? load.plan : null;
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

  const titleRefusal = refusalFor(refusals, "title");
  const descriptionRefusal = refusalFor(refusals, "description");
  const categoryRefusal = refusalFor(refusals, "category_id");
  const videoRefusal = refusalFor(refusals, "video_url");
  const seller = variant === "seller";
  const drawnHere = new Set([
    ...FORM_FIELDS,
    ...specFields,
    ...priceFields,
    ...(photos === undefined ? [] : ["video_url"]),
  ]);
  const others = refusals.filter(
    (entry) =>
      !drawnHere.has(entry.field) &&
      // Turn E2b — the contact step draws its refusals under `contact_pref.<channel>`.
      !(seller && entry.field.startsWith("contact_pref")),
  );

  const save = () => {
    const changes = editChanges(listing, values, specsEdited, {
      place: placeEdited,
      contact: contactEdited,
    });
    if (seller) {
      void (async () => {
        // Turn E2b — the contact step's claim first, as the posting form's Next does: a
        // changed name or the profile's channels; a refusal lands at its control and holds Save.
        if (contactEdited && whoSaveRef.current !== null && !(await whoSaveRef.current())) return;
        // Turn R2 — the seller gives no reason: only "nothing changed" holds Save back.
        if (changes === null) {
          setProblem("myListings.editBox.nothing");
          return;
        }
        onSave(changes, "", "");
      })();
      return;
    }
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

  // D171, D172 — Edit in the console's own boxes (FormSection, as Users and Roles), each
  // at the page's width and named as the seller's own steps: the title and the
  // description, the specifications, the price; then the reason, with Save and Cancel in
  // a bar that stays at the bottom on a phone. The category is shown, never changed.
  // Turn E2b (D187) — the seller's boxes come in the posting form's order.
  const photosBox =
    photos !== undefined ? (
      <FormSection
        key="photos"
        testid="listing-edit-photos-box"
        title={t("post.step.photos")}
        description={t("myListings.editBox.photosHint")}
      >
        {photos({
          value: values.videoUrl,
          refusal: videoRefusal,
          onChange: (videoUrl) => {
            setProblem(null);
            setValues((current) => ({ ...current, videoUrl }));
          },
        })}
      </FormSection>
    ) : null;

  const textBox = seller ? (
    <FormSection key="text" testid="listing-edit-text" title={t("post.step.details")}>
      {/* Turn E2b — the posting form's own title box, with the writing helper. */}
      <StepDetails
        listingId={listingId}
        categoryId={values.categoryId}
        categoryPath={categoryPath}
        photoIds={photoIds}
        attributes={values.attributes}
        definitions={definitions ?? []}
        dealKeys={dealKeys.length === 0 ? null : dealKeys}
        negotiable={values.price.priceNegotiable}
        period={values.price.pricePeriod}
        title={values.title}
        description={values.description}
        refusals={refusals}
        onChange={onDetails}
      />
    </FormSection>
  ) : (
    <FormSection key="text" testid="listing-edit-text" title={t("post.step.details")}>
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
    </FormSection>
  );

  const specsBox = (
    <FormSection key="specs" testid="listing-edit-specs-box" title={t("post.step.specifications")}>
      {/* D172 — the category is the ad's for good: shown, never changed here. */}
      <section data-testid="listing-edit-category" className="min-w-0 space-y-1">
        <h4 className="text-sm font-semibold text-foreground">
          {t("admin.listings.col.category")}
        </h4>
        <p data-testid="listing-edit-category-path" className="break-words text-sm text-foreground">
          {categoryPath}
        </p>
        {categoryRefusal !== null ? (
          <p
            role="alert"
            data-testid="listing-edit-category-refusal"
            className="text-sm text-destructive"
          >
            {t(draftRefusalKey(categoryRefusal.reason))}
          </p>
        ) : null}
      </section>

      <section
        data-testid="listing-edit-specs"
        className="min-w-0 space-y-2"
        onClickCapture={markSpecs}
        onKeyDownCapture={markSpecs}
        onChangeCapture={markSpecs}
      >
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
    </FormSection>
  );

  const priceBox = (
    <FormSection key="price" testid="listing-edit-price-box" title={t("post.step.price")}>
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
    </FormSection>
  );

  // Turn E2b — the Place and Contact boxes: the posting form's own steps.
  const placeBox = seller ? (
    <FormSection
      key="place"
      testid="listing-edit-place-box"
      title={t("post.step.place")}
      description={t("myListings.editBox.placeHint")}
    >
      <div
        className="min-w-0"
        onClickCapture={markPlace}
        onKeyDownCapture={markPlace}
        onChangeCapture={markPlace}
      >
        <StepWhere
          coverage={values.coverage}
          refusals={refusals}
          onChange={onCoverage}
          listingId={listingId}
          pin={pin}
          onPinSaved={setPin}
          ownPlace={facts === null ? null : facts.capabilities.includes("own_place")}
          maxCities={plan?.maxCities ?? null}
          maxRegions={plan?.maxRegions ?? null}
          maxCountries={plan?.maxCountries ?? null}
          textMode="form"
          onTextChange={onPlaceText}
        />
      </div>
    </FormSection>
  ) : null;

  const contactBox = seller ? (
    <FormSection
      key="contact"
      testid="listing-edit-contact-box"
      title={t("post.step.contact")}
      description={t("myListings.editBox.contactHint")}
    >
      <div
        className="min-w-0"
        onClickCapture={markContact}
        onKeyDownCapture={markContact}
        onChangeCapture={markContact}
      >
        <StepWho
          listingId={listingId}
          contactPref={values.contactPref}
          refusals={refusals}
          onChange={onContactPref}
          itemCountry={listing.countryCode}
          saveRef={whoSaveRef}
          categoryId={values.categoryId}
        />
      </div>
    </FormSection>
  ) : null;

  const saveBox = (
    <FormSection
      key="save"
      testid="listing-edit-save-box"
      title={t(seller ? "myListings.editBox.save" : "admin.listings.edit.save")}
      description={t(seller ? "myListings.editBox.hint" : "admin.listings.edit.hint")}
      actions={
        <>
          <Button
            type="button"
            size="touch"
            className="flex-1 sm:flex-none"
            data-testid="listing-edit-save"
            disabled={busy}
            onClick={save}
          >
            {t(seller ? "myListings.editBox.save" : "admin.listings.edit.save")}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="touch"
            className="flex-1 sm:flex-none"
            data-testid="listing-edit-cancel"
            disabled={busy}
            onClick={onCancel}
          >
            {t("common.cancel")}
          </Button>
        </>
      }
    >
      {seller ? null : (
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
      )}

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
    </FormSection>
  );

  return (
    <div data-testid="listing-edit-form" className="min-w-0 space-y-4">
      {seller
        ? [specsBox, photosBox, textBox, priceBox, placeBox, contactBox, saveBox]
        : [photosBox, textBox, specsBox, priceBox, saveBox]}
    </div>
  );
}

export default ListingEditForm;
