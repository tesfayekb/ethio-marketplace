import { PanelSubject } from "@/components/ui/dialog-parts-facade";
import { useState } from "react";

import { Field } from "@/components/forms/field";
import { useFormGate } from "@/components/forms/use-form-gate";
import { Input } from "@/components/ui/input";
import { CategoryModal } from "@/components/ui/category-modal";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { useI18n, type MessageKey } from "@/i18n";
import type { Refusal } from "@/lib/refusal";

import {
  MonetisationDialogActions,
  MonetisationProblemLine,
  NumberField,
  PlacementSelect,
  Toggle,
} from "./monetisation-dialogs";
import {
  NEW_PRODUCT_FORM,
  capOf,
  productFormInput,
  productFormOf,
  type ProductFormValues,
} from "./monetisation-forms";
import { MONETISATION_REFUSALS, ownRefusals, refusalFor } from "./monetisation-refusals";
import { PRODUCT_NAME_MAX, type ProductKind, type ProductRow } from "./monetisation-service";
import { useSaveProduct } from "./use-monetisation";
import { useMonetisationError } from "./use-monetisation-error";

/** A reach row's three place limits (DEC-356), in the table's column order. */
const CAP_FIELDS: ReadonlyArray<{
  field: "maxCities" | "maxRegions" | "maxCountries";
  /** The door's name for the answer. */
  door: string;
  suffix: string;
  labelKey: MessageKey;
}> = [
  {
    field: "maxCities",
    door: "max_cities",
    suffix: "cities",
    labelKey: "admin.monetisation.reach.field.cities",
  },
  {
    field: "maxRegions",
    door: "max_regions",
    suffix: "regions",
    labelKey: "admin.monetisation.reach.field.regions",
  },
  {
    field: "maxCountries",
    door: "max_countries",
    suffix: "countries",
    labelKey: "admin.monetisation.reach.field.countries",
  },
];

/**
 * P-1b (D290, D295) — THE PRODUCT EDITOR, one surface for Add and Edit (CT-8).
 * The key is typed once and fixed on edit (the door upserts by key; its kind
 * never changes). The name is one field per language, the way the categories
 * editor names a category (EN required, AM optional — the English stands in).
 * A level carries its own perks; a reach product shows none (the door refuses
 * them) and carries its three place limits instead, blank for no limit. There
 * is no delete door: a product is switched off, never removed.
 *
 * INC-188 — the save round-trips EVERY stored field this surface holds.
 */
export function ProductEditorDialog({
  kind,
  row,
  guard,
  openedBy,
  onClose,
  onCreated,
}: {
  kind: ProductKind;
  /** null = Add a product of this kind. */
  row: ProductRow | null;
  guard: GuardFn;
  openedBy: string;
  onClose: () => void;
  /** L16 — told the new product's key once Add has saved it (never on Edit). */
  onCreated?: (key: string) => void;
}) {
  const { t } = useI18n();
  const save = useSaveProduct();
  const { refusal, clear, fail, render } = useMonetisationError();
  const creating = row === null;
  const [form, setForm] = useState<ProductFormValues>(() =>
    row === null ? NEW_PRODUCT_FORM : productFormOf(row),
  );
  const prefix = `monetisation-${kind}-${creating ? "create" : "edit"}`;
  const gate = useFormGate();
  const [own, setOwn] = useState<Refusal[]>([]);
  const refused = (field: string) => refusalFor(field, gate.marks, own);
  const ownFields: Readonly<Partial<Record<MessageKey, readonly string[]>>> = {
    "admin.packages.error.badKey": creating ? ["key"] : [],
    "admin.monetisation.error.badName": [
      form.nameAm.trim().length > PRODUCT_NAME_MAX ? "name_am" : "name_en",
    ],
    "admin.packages.error.badDays": ["days"],
    "admin.monetisation.error.badPhotos": ["max_photos"],
    "admin.monetisation.error.badCaps": CAP_FIELDS.filter(
      ({ field }) => !capOf(form[field]).ok,
    ).map(({ door }) => door),
  };
  const change = (next: Partial<ProductFormValues>) =>
    setForm((prev) => ({
      ...prev,
      ...next,
      ...(next.key === undefined ? {} : { key: next.key.toLowerCase() }),
    }));

  const submit = () => {
    clear();
    setOwn([]);
    if (!gate.try()) return;
    const judged = productFormInput(kind, form);
    if (!judged.ok) {
      const mine = ownRefusals(judged.key, ownFields);
      if (mine === null) render(judged.key);
      else setOwn(mine);
      return;
    }
    void guard(async () => {
      try {
        await save.mutateAsync(judged.input);
        if (creating) onCreated?.(judged.input.key);
        onClose();
      } catch (error) {
        fail(error);
      }
    }).catch(fail);
  };

  const name = (
    field: "nameEn" | "nameAm",
    door: string,
    required: boolean,
    label: MessageKey,
    suffix: string,
  ) => (
    <Field
      id={`${prefix}-${suffix}`}
      field={door}
      label={t(label)}
      required={required}
      gate={gate}
      blank={form[field].trim() === ""}
      refusal={refused(door)}
      family={MONETISATION_REFUSALS}
    >
      {(control) => (
        <Input
          {...control}
          data-testid={`${prefix}-${suffix}`}
          value={form[field]}
          maxLength={PRODUCT_NAME_MAX}
          onChange={(event) => change({ [field]: event.target.value })}
        />
      )}
    </Field>
  );

  const title: MessageKey = creating
    ? "admin.monetisation.product.add"
    : kind === "level"
      ? "admin.monetisation.level.edit"
      : "admin.packages.edit.title";

  return (
    <CategoryModal
      testid={prefix}
      openedBy={openedBy}
      title={t(title)}
      onClose={onClose}
      description={t("admin.packages.product.description")}
      size="default"
      subject={row === null ? undefined : <PanelSubject title={row.nameEn} />}
      footer={
        <MonetisationDialogActions
          bare
          onCancel={onClose}
          onSubmit={submit}
          busy={save.isPending}
          cancelTestId={`${prefix}-cancel`}
          submitTestId={`${prefix}-save`}
          submitLabel={t("common.save")}
        />
      }
    >
      {creating ? (
        <Field
          id={`${prefix}-key`}
          field="key"
          label={t("admin.packages.field.key")}
          required
          gate={gate}
          blank={form.key.trim() === ""}
          refusal={refused("key")}
          family={MONETISATION_REFUSALS}
          hint={
            <p className="min-w-0 break-words text-xs text-muted-foreground">
              {t("admin.packages.field.keyHint")}
            </p>
          }
        >
          {(control) => (
            <Input
              {...control}
              data-testid={`${prefix}-key`}
              value={form.key}
              maxLength={32}
              autoCapitalize="none"
              onChange={(event) => change({ key: event.target.value })}
            />
          )}
        </Field>
      ) : (
        <p className="min-w-0 break-all text-sm" data-testid={`${prefix}-key`}>
          {form.key}
        </p>
      )}
      {name("nameEn", "name_en", true, "admin.monetisation.field.nameEn", "name-en")}
      {name("nameAm", "name_am", false, "admin.monetisation.field.nameAm", "name-am")}
      <NumberField
        id={`${prefix}-days`}
        field="days"
        required
        gate={gate}
        refusal={refused("days")}
        labelKey={
          kind === "level" ? "admin.monetisation.col.defaultDays" : "admin.packages.field.days"
        }
        value={form.days}
        onChange={(next) => change({ days: next })}
      />
      {kind === "level" ? (
        <>
          <NumberField
            id={`${prefix}-photos`}
            field="max_photos"
            required
            gate={gate}
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
          />
          <Toggle
            id={`${prefix}-badge`}
            field="badge"
            labelKey="admin.monetisation.col.badge"
            checked={form.badge}
            onChange={(next) => change({ badge: next })}
          />
        </>
      ) : (
        <>
          {CAP_FIELDS.map(({ field, door, suffix, labelKey }) => (
            <NumberField
              key={field}
              id={`${prefix}-${suffix}`}
              field={door}
              refusal={refused(door)}
              labelKey={labelKey}
              placeholderKey="admin.monetisation.reach.field.unlimited"
              value={form[field]}
              onChange={(next) => change({ [field]: next })}
            />
          ))}
          <p className="text-sm text-muted-foreground" data-testid={`${prefix}-caps-hint`}>
            {t("admin.monetisation.reach.field.capsHint")}
          </p>
        </>
      )}
      <Toggle
        id={`${prefix}-enabled`}
        field="enabled"
        labelKey="admin.packages.field.enabled"
        checked={form.enabled}
        onChange={(next) => change({ enabled: next })}
      />
      <Toggle
        id={`${prefix}-self-serve`}
        field="self_serve"
        labelKey="admin.packages.field.selfServe"
        checked={form.selfServe}
        onChange={(next) => change({ selfServe: next })}
      />
      <Toggle
        id={`${prefix}-extends`}
        field="extends_lifetime"
        labelKey="admin.packages.field.extends"
        checked={form.extendsLifetime}
        onChange={(next) => change({ extendsLifetime: next })}
      />
      <Field
        id={`${prefix}-sort`}
        field="sort"
        label={t("admin.packages.field.sort")}
        required={false}
        refusal={null}
      >
        {(control) => (
          <Input
            {...control}
            data-testid={`${prefix}-sort`}
            inputMode="numeric"
            value={form.sort}
            onChange={(event) => {
              // Digits only: the order has no refusal of its own, so none can be typed.
              const next = event.target.value;
              if (/^\d*$/.test(next)) change({ sort: next });
            }}
          />
        )}
      </Field>
      <p className="text-sm text-muted-foreground">{t("admin.packages.noDelete")}</p>
      <MonetisationProblemLine refusal={refusal} testid={`${prefix}-error`} />
    </CategoryModal>
  );
}

export default ProductEditorDialog;
