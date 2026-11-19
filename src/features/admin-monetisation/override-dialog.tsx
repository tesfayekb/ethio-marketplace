import { useState } from "react";

import { Field } from "@/components/forms/field";
import { useFormGate } from "@/components/forms/use-form-gate";
import { parseNumber } from "@/lib/parse-input";
import { NativeSelect } from "@/components/ui/native-select";
import { CategoryModal } from "@/components/ui/category-modal";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { rootsOf } from "@/features/categories/category-tree";
import { useI18n, type MessageKey } from "@/i18n";
import type { Refusal } from "@/lib/refusal";

import {
  BadgeSelect,
  MonetisationDialogActions,
  MonetisationProblemLine,
  NumberField,
  PlacementSelect,
} from "./monetisation-dialogs";
import {
  NEW_OVERRIDE_FORM,
  overrideFormInput,
  overrideFormOf,
  type OverrideFormValues,
} from "./monetisation-forms";
import { ownRefusals, refusalFor } from "./monetisation-refusals";
import type { OverrideRow, ProductRow } from "./monetisation-service";
import { useClearOverride, useSaveOverride } from "./use-monetisation";
import { useMonetisationError } from "./use-monetisation-error";
import { useMonetisationNames } from "./use-monetisation-names";

/**
 * P-1b (D295) — AN OVERRIDE ROW: Add (the scope picked: a level, a main
 * category or every category, a country or every country — the door upserts
 * on that scope), Edit (the scope fixed, the four cells), Clear (a destructive
 * verb, red: the row goes and the level's own values speak again). A blank
 * cell is the level's own value; every cell blank is refused by name.
 *
 * P-1c (D313) — opened from inside a level's own perks table, the level is
 * `fixedLevel`: named as a line, never picked; the help line it used to carry
 * is the table's Guide ("What this is").
 */
export function OverrideDialog({
  mode,
  row,
  products,
  fixedLevel,
  guard,
  openedBy,
  onClose,
}: {
  mode: "create" | "edit" | "clear";
  row: OverrideRow | null;
  products: ProductRow[];
  /** The level these perks belong to, when the dialog sits inside its table. */
  fixedLevel?: string;
  guard: GuardFn;
  openedBy: string;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const save = useSaveOverride();
  const clearRow = useClearOverride();
  const { refusal, clear, fail, render } = useMonetisationError();
  const { marketName, categoryName, productName, markets, tree } = useMonetisationNames(products);
  const levels = products.filter((product) => product.kind === "level");
  const prefix = `monetisation-override-${mode}`;
  const [form, setForm] = useState<OverrideFormValues>(() =>
    row === null
      ? { ...NEW_OVERRIDE_FORM, levelKey: fixedLevel ?? levels[0]?.key ?? "" }
      : overrideFormOf(row),
  );
  const gate = useFormGate();
  const [own, setOwn] = useState<Refusal[]>([]);
  const refused = (field: string) => refusalFor(field, gate.marks, own);
  /** An optional cell the judge refuses: typed, and outside its whole-number range. */
  const badCell = (raw: string, min: number, max?: number) =>
    raw.trim() !== "" && parseNumber(raw, { integer: true, min, max }).kind !== "number";
  const ownFields: Readonly<Partial<Record<MessageKey, readonly string[]>>> = {
    "admin.packages.error.badDays": badCell(form.days, 1) ? ["days"] : [],
    "admin.monetisation.error.badPhotos": badCell(form.maxPhotos, 0, 30) ? ["max_photos"] : [],
  };
  const change = (next: Partial<OverrideFormValues>) => setForm((prev) => ({ ...prev, ...next }));

  const submit = () => {
    clear();
    if (mode === "clear") {
      if (row === null) return;
      void guard(async () => {
        try {
          await clearRow.mutateAsync({ id: row.id });
          onClose();
        } catch (error) {
          fail(error);
        }
      }).catch(fail);
      return;
    }
    setOwn([]);
    if (!gate.try()) return;
    const judged = overrideFormInput(form);
    if (!judged.ok) {
      const mine = ownRefusals(judged.key, ownFields);
      if (mine === null) render(judged.key);
      else setOwn(mine);
      return;
    }
    void guard(async () => {
      try {
        await save.mutateAsync(judged.input);
        onClose();
      } catch (error) {
        fail(error);
      }
    }).catch(fail);
  };

  const title =
    mode === "create"
      ? "admin.monetisation.override.add"
      : mode === "edit"
        ? "admin.monetisation.override.edit"
        : "admin.monetisation.override.clear";

  const scopeLine = (
    <p className="min-w-0 break-words text-sm" data-testid={`${prefix}-scope`}>
      {`${productName(form.levelKey)} · ${categoryName(form.categoryId === "" ? null : form.categoryId, "mainCategoryAny")} · ${marketName(form.countryCode === "" ? null : form.countryCode, "countryAny")}`}
    </p>
  );

  return (
    <CategoryModal testid={prefix} openedBy={openedBy} title={t(title)} onClose={onClose}>
      {mode === "create" ? (
        <>
          {fixedLevel === undefined ? (
            <Field
              id={`${prefix}-level`}
              field="level_key"
              label={t("admin.monetisation.col.level")}
              required
              marked={false}
              refusal={null}
            >
              {(control) => (
                <NativeSelect
                  {...control}
                  data-testid={`${prefix}-level`}
                  className="w-full"
                  value={form.levelKey}
                  onChange={(event) => change({ levelKey: event.target.value })}
                >
                  {levels.map((level) => (
                    <option key={level.key} value={level.key}>
                      {productName(level.key)}
                    </option>
                  ))}
                </NativeSelect>
              )}
            </Field>
          ) : (
            <div className="min-w-0 space-y-1">
              <p className="text-sm font-medium text-foreground">
                {t("admin.monetisation.col.level")}
              </p>
              <p className="min-w-0 break-words text-sm" data-testid={`${prefix}-level`}>
                {productName(form.levelKey)}
              </p>
            </div>
          )}
          <Field
            id={`${prefix}-category`}
            field="category_id"
            label={t("admin.monetisation.col.category")}
            required
            marked={false}
            refusal={null}
          >
            {(control) => (
              <NativeSelect
                {...control}
                data-testid={`${prefix}-category`}
                className="w-full"
                value={form.categoryId}
                onChange={(event) => change({ categoryId: event.target.value })}
              >
                <option value="">{t("admin.monetisation.mainCategoryAny")}</option>
                {rootsOf(tree).map((node) => (
                  <option key={node.id} value={node.id}>
                    {categoryName(node.id, "mainCategoryAny")}
                  </option>
                ))}
              </NativeSelect>
            )}
          </Field>
          <Field
            id={`${prefix}-country`}
            field="country_code"
            label={t("admin.monetisation.col.country")}
            required
            marked={false}
            refusal={null}
          >
            {(control) => (
              <NativeSelect
                {...control}
                data-testid={`${prefix}-country`}
                className="w-full"
                value={form.countryCode}
                onChange={(event) => change({ countryCode: event.target.value })}
              >
                <option value="">{t("admin.monetisation.countryAny")}</option>
                {markets.map((market) => (
                  <option key={market.code} value={market.code}>
                    {marketName(market.code, "countryAny")}
                  </option>
                ))}
              </NativeSelect>
            )}
          </Field>
        </>
      ) : (
        scopeLine
      )}
      {mode === "clear" ? null : (
        <>
          <NumberField
            id={`${prefix}-days`}
            field="days"
            refusal={refused("days")}
            labelKey="admin.monetisation.col.days"
            value={form.days}
            onChange={(next) => change({ days: next })}
          />
          <NumberField
            id={`${prefix}-photos`}
            field="max_photos"
            refusal={refused("max_photos")}
            labelKey="admin.monetisation.col.photos"
            helpKey="admin.monetisation.field.photosHint"
            value={form.maxPhotos}
            onChange={(next) => change({ maxPhotos: next })}
          />
          <PlacementSelect
            id={`${prefix}-placement`}
            value={form.placement}
            onChange={(next) => change({ placement: next })}
            blank
          />
          <BadgeSelect
            id={`${prefix}-badge`}
            value={form.badge}
            onChange={(next) => change({ badge: next })}
          />
        </>
      )}
      <MonetisationProblemLine refusal={refusal} testid={`${prefix}-error`} />
      <MonetisationDialogActions
        onCancel={onClose}
        onSubmit={submit}
        busy={save.isPending || clearRow.isPending}
        cancelTestId={`${prefix}-cancel`}
        submitTestId={`${prefix}-${mode === "clear" ? "confirm" : "save"}`}
        submitLabel={t(mode === "clear" ? "admin.monetisation.override.clear" : "common.save")}
        destructive={mode === "clear"}
      />
    </CategoryModal>
  );
}

export default OverrideDialog;
