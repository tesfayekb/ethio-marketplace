import { type ReactNode } from "react";

import { controlClass } from "@/components/forms/control-class";
import { Field } from "@/components/forms/field";
import { FieldSelect } from "@/components/forms/field-select";
import type { FormGate } from "@/components/forms/use-form-gate";
import { categoryGlyph, isKnownCategoryIcon } from "@/components/shell/category-glyphs";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import { useI18n } from "@/i18n";

import { activeParentOptions, deriveSlugPreview, type CategoryNode } from "./categories-service";
import type { CategoryFormRefusals } from "./category-form-values";
import { CATEGORY_REFUSALS } from "./category-refusals";

/**
 * C5k PART B — THE SHARED CATEGORY FORM.
 *
 * One field set, two consumers: the create dialog and the edit dialog. The
 * fields, their labels, their testids and their 360-first layout live here, so
 * a category is described the SAME way whichever door the operator came in
 * through (B3: extend via props, never copy-paste).
 *
 * Mode differences, all of them deliberate:
 *  - create renders the slug preview, the parent picker, the visibility
 *    window, the Countries multi-select and the Position select (C5l PART A —
 *    everything a creation needs is decided in ONE dialog now);
 *  - edit renders the live read-only order field (`extra`) and keeps the
 *    Visibility/Countries verb dialogs as the place those are CHANGED, because
 *    the update RPC does not carry them.
 *
 * C5l PART B — THE ICON IS EMPTY UNTIL NAMED. The field shows a translated
 * hint until the silent name-blur suggestion lands; "Package" is applied at
 * SAVE time if no suggestion ever succeeded, never as a prefilled value.
 */

export interface CategoryFormValues {
  nameEn: string;
  /** C5l — "" until the suggestion (or a Change) fills it; save maps "" → "Package". */
  icon: string;
  parentId: string;
  allowListings: boolean;
  priceEnabled: boolean;
  /** Kept as text: "" IS "no expiry" (INC-143 — never coalesced to a number). */
  expiryDays: string;
  /** `datetime-local` strings; "" removes that bound. */
  visibleFrom: string;
  visibleUntil: string;
  /** C5l — create only: the inline Countries selection (excluded codes). */
  excludedCodes: string[];
  /** C5l — create only: "" = "At the end"; otherwise the sibling id to precede. */
  positionBefore: string;
}

/** The live glyph a typed (or suggested) icon name resolves to. */
export function IconPreview({ name, testid }: { name: string; testid: string }) {
  const Glyph = categoryGlyph(name);
  return (
    <span
      data-testid={testid}
      data-icon={isKnownCategoryIcon(name) ? name.trim() : "Package"}
      className="flex size-9 shrink-0 items-center justify-center rounded-md border border-border text-muted-foreground"
    >
      <Glyph aria-hidden="true" className="size-5" />
    </span>
  );
}

export function CategoryFormFields({
  mode,
  values,
  onChange,
  parents,
  iconOpen,
  onIconOpen,
  onNameBlur,
  iconFallback,
  countries,
  positionOptions,
  positionEndLabel,
  positionCaption,
  extra,
  gate,
  refusals = {},
}: {
  mode: "create" | "edit";
  values: CategoryFormValues;
  onChange: (patch: Partial<CategoryFormValues>) => void;
  /** Create only: the parent picker's options. */
  parents?: CategoryNode[];
  /** Create only: whether the icon input is revealed (Change pressed). */
  iconOpen?: boolean;
  onIconOpen?: () => void;
  onNameBlur?: (name: string) => void;
  /** Create only (bundle 2 step 18): the suggestion fell back to the default. */
  iconFallback?: boolean;
  /** Create only (C5l): the inline Countries multi-select's options. */
  countries?: { code: string; nameEn: string }[];
  /** Create only (C5m): ACTIVE siblings of the chosen parent, in roster order. */
  positionOptions?: { id: string; label: string }[];
  /** Create only (C5m): "At the end (position N+1)". */
  positionEndLabel?: string;
  /** Create only (C5m): "N subcategories in <parent>". */
  positionCaption?: string;
  /** Edit only: the live read-only display-order field. */
  extra?: ReactNode;
  /** DEC-339 — the dialog's one gate: the name reports its blank here. */
  gate?: FormGate;
  /** The gate's marks and the parser's refusals, by the door's field name. */
  refusals?: CategoryFormRefusals;
}) {
  const { t } = useI18n();
  const refusalOf = (field: keyof CategoryFormValues) => refusals[field] ?? null;
  const p = mode === "create" ? "category-create" : "category-edit";
  const showIconInput = mode === "edit" || iconOpen === true;

  return (
    <>
      <Field
        id={`${p}-name`}
        field="nameEn"
        label={t("admin.categories.field.name")}
        required
        refusal={refusalOf("nameEn")}
        family={CATEGORY_REFUSALS}
        gate={gate}
        blank={values.nameEn.trim() === ""}
      >
        {(control) => (
          <Input
            {...control}
            data-testid={`${p}-name`}
            className={controlClass(refusalOf("nameEn") !== null, false, "dialog")}
            value={values.nameEn}
            onChange={(event) => onChange({ nameEn: event.target.value })}
            onBlur={(event) => onNameBlur?.(event.target.value)}
          />
        )}
      </Field>

      {mode === "create" ? (
        /* C2c — the slug is derived by the SERVER; this is only a preview. */
        <p className="text-sm text-muted-foreground">
          <span>{t("admin.categories.create.slugPreview")}</span>{" "}
          <span data-testid="category-create-slug-preview" className="break-all font-mono">
            {deriveSlugPreview(values.nameEn.trim())}
          </span>
        </p>
      ) : null}

      {/* C5l PART B — EMPTY UNTIL NAMED: no icon yet shows the hint, not a
          prefilled Package; the suggestion (or Change) fills the glyph. */}
      <Field
        id={`${p}-icon`}
        field="icon"
        label={t("admin.categories.field.icon")}
        required={false}
        hint={
          iconFallback === true ? (
            <p className="text-sm text-muted-foreground" data-testid={`${p}-icon-fallback`}>
              {t("admin.categories.field.iconFallbackNote")}
            </p>
          ) : undefined
        }
        refusal={refusalOf("icon")}
        family={CATEGORY_REFUSALS}
      >
        {(control) => (
          <span className="flex items-center gap-2">
            {values.icon.trim() === "" && !showIconInput ? (
              <span data-testid={`${p}-icon-hint`} className="text-sm text-muted-foreground italic">
                {t("admin.categories.field.iconHint")}
              </span>
            ) : (
              <IconPreview name={values.icon} testid={`${p}-icon-preview`} />
            )}
            {showIconInput ? (
              <Input
                {...control}
                data-testid={`${p}-icon`}
                className={controlClass(refusalOf("icon") !== null, false, "dialog")}
                value={values.icon}
                onChange={(event) => onChange({ icon: event.target.value })}
              />
            ) : (
              <Button
                type="button"
                variant="outline"
                className="min-h-11"
                data-testid={`${p}-icon-change`}
                onClick={() => onIconOpen?.()}
              >
                {t("admin.categories.field.iconChange")}
              </Button>
            )}
          </span>
        )}
      </Field>

      {mode === "create" ? (
        <Field
          id="category-create-parent"
          field="parentId"
          label={t("admin.categories.create.parent")}
          required={false}
          refusal={refusalOf("parentId")}
          family={CATEGORY_REFUSALS}
        >
          {(control) => (
            <NativeSelect
              {...control}
              data-testid="category-create-parent"
              className="w-full"
              value={values.parentId}
              onChange={(event) => onChange({ parentId: event.target.value, positionBefore: "" })}
            >
              <option value="">{t("admin.categories.create.parentRoot")}</option>
              {activeParentOptions(parents ?? []).map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </NativeSelect>
          )}
        </Field>
      ) : null}

      {mode === "create" && positionOptions !== undefined ? (
        /* C5l PARTS A+C — POSITION: "At the end" by default, or before a
           chosen ACTIVE sibling; placement rides admin_reorder_categories
           post-create (no RPC change). */
        <Field
          id="category-create-position"
          field="positionBefore"
          label={t("admin.categories.create.position")}
          required={false}
          hint={
            <p
              data-testid="category-create-position-caption"
              className="text-xs text-muted-foreground"
            >
              {positionCaption}
            </p>
          }
          refusal={refusalOf("positionBefore")}
          family={CATEGORY_REFUSALS}
        >
          {(control) => (
            <NativeSelect
              {...control}
              data-testid="category-create-position"
              className="w-full"
              value={values.positionBefore}
              onChange={(event) => onChange({ positionBefore: event.target.value })}
            >
              <option value="">{positionEndLabel ?? ""}</option>
              {positionOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </NativeSelect>
          )}
        </Field>
      ) : null}

      {extra}

      <Field
        id={`${p}-expiry`}
        field="expiryDays"
        label={t("admin.categories.field.lifetimeDays")}
        required={false}
        refusal={refusalOf("expiryDays")}
        family={CATEGORY_REFUSALS}
      >
        {(control) => (
          <Input
            {...control}
            data-testid={`${p}-expiry`}
            inputMode="numeric"
            className={controlClass(refusalOf("expiryDays") !== null, false, "dialog")}
            placeholder={t("admin.categories.field.lifetimeNone")}
            value={values.expiryDays}
            onChange={(event) => onChange({ expiryDays: event.target.value })}
          />
        )}
      </Field>

      <Field
        id={`${p}-allow`}
        field="allowListings"
        label={t("admin.categories.field.allowListings")}
        required={false}
        layout="choice"
        refusal={refusalOf("allowListings")}
        family={CATEGORY_REFUSALS}
      >
        {(control) => (
          <Checkbox
            {...control}
            data-testid={`${p}-allow`}
            checked={values.allowListings}
            onCheckedChange={(checked) => onChange({ allowListings: checked === true })}
          />
        )}
      </Field>
      <Field
        id={`${p}-price`}
        field="priceEnabled"
        label={t("admin.categories.field.priceEnabled")}
        required={false}
        layout="choice"
        refusal={refusalOf("priceEnabled")}
        family={CATEGORY_REFUSALS}
      >
        {(control) => (
          <Checkbox
            {...control}
            data-testid={`${p}-price`}
            checked={values.priceEnabled}
            onCheckedChange={(checked) => onChange({ priceEnabled: checked === true })}
          />
        )}
      </Field>

      {mode === "create" ? (
        <>
          <p className="text-sm text-muted-foreground">{t("admin.categories.window.hint")}</p>
          <Field
            id="category-create-visible-from"
            field="visibleFrom"
            label={t("admin.categories.window.from")}
            required={false}
            refusal={refusalOf("visibleFrom")}
            family={CATEGORY_REFUSALS}
          >
            {(control) => (
              <Input
                {...control}
                data-testid="category-create-visible-from"
                type="datetime-local"
                className={controlClass(refusalOf("visibleFrom") !== null, false, "dialog")}
                value={values.visibleFrom}
                onChange={(event) => onChange({ visibleFrom: event.target.value })}
              />
            )}
          </Field>
          <Field
            id="category-create-visible-until"
            field="visibleUntil"
            label={t("admin.categories.window.until")}
            required={false}
            refusal={refusalOf("visibleUntil")}
            family={CATEGORY_REFUSALS}
          >
            {(control) => (
              <Input
                {...control}
                data-testid="category-create-visible-until"
                type="datetime-local"
                className={controlClass(refusalOf("visibleUntil") !== null, false, "dialog")}
                value={values.visibleUntil}
                onChange={(event) => onChange({ visibleUntil: event.target.value })}
              />
            )}
          </Field>
          {countries !== undefined ? (
            /* C5l PART A — INLINE COUNTRIES: the same exclusion set the editor's
               Countries verb manages, chained after the create call. */
            <FieldSelect
              id="category-create-exclusion"
              field="excludedCodes"
              label={t("admin.categories.create.countries")}
              required={false}
              hint={
                <p className="min-w-0 break-words text-xs text-muted-foreground">
                  {t("admin.categories.create.countriesHint")}
                </p>
              }
              refusal={refusalOf("excludedCodes")}
              family={CATEGORY_REFUSALS}
              gate={gate}
              multiple
              options={countries.map((country) => ({
                value: country.code,
                label: `${country.code} — ${country.nameEn}`,
              }))}
              value={values.excludedCodes}
              onChange={(excludedCodes) => onChange({ excludedCodes })}
            />
          ) : null}
        </>
      ) : null}
    </>
  );
}
