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
 *  - create renders the slug preview, the parent picker and the visibility
 *    window (the create RPC now persists all of it in one call);
 *  - edit renders the live read-only order field (`extra`) and keeps the
 *    Visibility verb dialog as the place a window is CHANGED, because the
 *    update RPC does not carry the window.
 */

export const SELECT_CLASS =
  "h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground";

export interface CategoryFormValues {
  nameEn: string;
  icon: string;
  parentId: string;
  allowListings: boolean;
  priceEnabled: boolean;
  /** Kept as text: "" IS "no expiry" (INC-143 — never coalesced to a number). */
  expiryDays: string;
  /** `datetime-local` strings; "" removes that bound. */
  visibleFrom: string;
  visibleUntil: string;
}

export function emptyCategoryForm(): CategoryFormValues {
  return {
    nameEn: "",
    icon: "Package",
    parentId: "",
    allowListings: true,
    priceEnabled: true,
    expiryDays: "",
    visibleFrom: "",
    visibleUntil: "",
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
  /** Edit only: the live read-only display-order field. */
  extra?: ReactNode;
}) {
  const { t } = useI18n();
  const p = mode === "create" ? "category-create" : "category-edit";
  const showIconInput = mode === "edit" || iconOpen === true;

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

      {/* C5k — the icon is SUGGESTED silently and shown as a glyph; the name
          of the icon is machinery the operator only meets after Change. */}
      <FormField label={t("admin.categories.field.icon")} htmlFor={`${p}-icon`}>
        <span className="flex items-center gap-2">
          <IconPreview name={values.icon} testid={`${p}-icon-preview`} />
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
            onChange={(event) => onChange({ parentId: event.target.value })}
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
          {/* Countries live in the editor: they need the row to exist. */}
          <p data-testid="category-create-countries-later" className="text-sm text-muted-foreground">
            {t("admin.categories.create.countriesLater")}
          </p>
        </>
      ) : null}
    </>
  );
}
