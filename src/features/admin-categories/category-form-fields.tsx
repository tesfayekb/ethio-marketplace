import { type ReactNode } from "react";

import { categoryGlyph } from "@/components/shell/app-rail";
import { FormField } from "@/components/shell/form-section";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/i18n";

import { activeParentOptions, deriveSlugPreview, type CategoryNode } from "./categories-service";

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

export const SELECT_CLASS =
  "h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground";

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

export function emptyCategoryForm(): CategoryFormValues {
  return {
    nameEn: "",
    icon: "",
    parentId: "",
    allowListings: true,
    priceEnabled: true,
    expiryDays: "",
    visibleFrom: "",
    visibleUntil: "",
    excludedCodes: [],
    positionBefore: "",
  };
}

/** The live glyph a typed (or suggested) icon name resolves to. */
export function IconPreview({ name, testid }: { name: string; testid: string }) {
  const Glyph = categoryGlyph(name);
  return (
    <span
      data-testid={testid}
      data-icon={categoryGlyph(name) === categoryGlyph("") ? "Package" : name.trim()}
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
  countries,
  positionOptions,
  positionEndLabel,
  positionCaption,
  extra,
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
}) {
  const { t } = useI18n();
  const p = mode === "create" ? "category-create" : "category-edit";
  const showIconInput = mode === "edit" || iconOpen === true;
  const toggleCode = (code: string, on: boolean) =>
    onChange({
      excludedCodes: on
        ? [...values.excludedCodes, code]
        : values.excludedCodes.filter((entry) => entry !== code),
    });

  return (
    <>
      <FormField label={t("admin.categories.field.name")} htmlFor={`${p}-name`}>
        <Input
          id={`${p}-name`}
          data-testid={`${p}-name`}
          value={values.nameEn}
          onChange={(event) => onChange({ nameEn: event.target.value })}
          onBlur={(event) => onNameBlur?.(event.target.value)}
        />
      </FormField>

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
      <FormField label={t("admin.categories.field.icon")} htmlFor={`${p}-icon`}>
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
              id={`${p}-icon`}
              data-testid={`${p}-icon`}
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
      </FormField>

      {mode === "create" ? (
        <FormField label={t("admin.categories.create.parent")} htmlFor="category-create-parent">
          <select
            id="category-create-parent"
            data-testid="category-create-parent"
            className={SELECT_CLASS}
            value={values.parentId}
            onChange={(event) => onChange({ parentId: event.target.value, positionBefore: "" })}
          >
            <option value="">{t("admin.categories.create.parentRoot")}</option>
            {activeParentOptions(parents ?? []).map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </FormField>
      ) : null}

      {mode === "create" && positionOptions !== undefined ? (
        /* C5l PARTS A+C — POSITION: "At the end" by default, or before a
           chosen ACTIVE sibling; placement rides admin_reorder_categories
           post-create (no RPC change). */
        <FormField label={t("admin.categories.create.position")} htmlFor="category-create-position">
          <select
            id="category-create-position"
            data-testid="category-create-position"
            className={SELECT_CLASS}
            value={values.positionBefore}
            onChange={(event) => onChange({ positionBefore: event.target.value })}
          >
            <option value="">{positionEndLabel ?? ""}</option>
            {positionOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
          <p data-testid="category-create-position-caption" className="text-xs text-muted-foreground">
            {positionCaption}
          </p>
        </FormField>
      ) : null}

      {extra}

      <FormField label={t("admin.categories.field.expiryDays")} htmlFor={`${p}-expiry`}>
        <Input
          id={`${p}-expiry`}
          data-testid={`${p}-expiry`}
          inputMode="numeric"
          placeholder={t("admin.categories.field.expiryNone")}
          value={values.expiryDays}
          onChange={(event) => onChange({ expiryDays: event.target.value })}
        />
      </FormField>

      <label className="flex min-h-11 items-center gap-2 text-sm text-foreground">
        <Checkbox
          data-testid={`${p}-allow`}
          checked={values.allowListings}
          onCheckedChange={(checked) => onChange({ allowListings: checked === true })}
        />
        {t("admin.categories.field.allowListings")}
      </label>
      <label className="flex min-h-11 items-center gap-2 text-sm text-foreground">
        <Checkbox
          data-testid={`${p}-price`}
          checked={values.priceEnabled}
          onCheckedChange={(checked) => onChange({ priceEnabled: checked === true })}
        />
        {t("admin.categories.field.priceEnabled")}
      </label>

      {mode === "create" ? (
        <>
          <p className="text-sm text-muted-foreground">{t("admin.categories.window.hint")}</p>
          <FormField
            label={t("admin.categories.window.from")}
            htmlFor="category-create-visible-from"
          >
            <Input
              id="category-create-visible-from"
              data-testid="category-create-visible-from"
              type="datetime-local"
              value={values.visibleFrom}
              onChange={(event) => onChange({ visibleFrom: event.target.value })}
            />
          </FormField>
          <FormField
            label={t("admin.categories.window.until")}
            htmlFor="category-create-visible-until"
          >
            <Input
              id="category-create-visible-until"
              data-testid="category-create-visible-until"
              type="datetime-local"
              value={values.visibleUntil}
              onChange={(event) => onChange({ visibleUntil: event.target.value })}
            />
          </FormField>
          {countries !== undefined ? (
            /* C5l PART A — INLINE COUNTRIES: the same exclusion set the editor's
               Countries verb manages, chained after the create call. */
            <FormField
              label={t("admin.categories.create.countries")}
              htmlFor="category-create-countries"
              help={t("admin.categories.create.countriesHint")}
            >
              <div
                id="category-create-countries"
                data-testid="category-create-countries"
                className="grid max-h-48 grid-cols-1 gap-1 overflow-y-auto sm:grid-cols-2"
              >
                {countries.map((country) => (
                  <label
                    key={country.code}
                    className="flex min-h-11 items-center gap-2 text-sm text-foreground"
                  >
                    <Checkbox
                      data-testid={`category-create-exclusion-${country.code}`}
                      checked={values.excludedCodes.includes(country.code)}
                      onCheckedChange={(checked) => toggleCode(country.code, checked === true)}
                    />
                    <span className="min-w-0 break-words">{`${country.code} — ${country.nameEn}`}</span>
                  </label>
                ))}
              </div>
            </FormField>
          ) : null}
        </>
      ) : null}
    </>
  );
}
