import { useState } from "react";

import { FormField } from "@/components/shell/form-section";
import { Input } from "@/components/ui/input";
import { CategoryModal } from "@/features/admin-categories/category-dialogs";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { useI18n, type MessageKey } from "@/i18n";

import {
  MonetisationDialogActions,
  MonetisationErrorLine,
  NumberField,
  PlacementSelect,
  Toggle,
} from "./monetisation-dialogs";
import {
  NEW_PRODUCT_FORM,
  productFormInput,
  productFormOf,
  type ProductFormValues,
} from "./monetisation-forms";
import { PRODUCT_NAME_MAX, type ProductKind, type ProductRow } from "./monetisation-service";
import { useSaveProduct } from "./use-monetisation";
import { useMonetisationError } from "./use-monetisation-error";

/**
 * P-1b (D290, D295) — THE PRODUCT EDITOR, one surface for Add and Edit (CT-8).
 * The key is typed once and fixed on edit (the door upserts by key; its kind
 * never changes). The name is one field per language, the way the categories
 * editor names a category (EN required, AM optional — the English stands in).
 * A level carries its own perks; a reach product shows none (the door refuses
 * them). There is no delete door: a product is switched off, never removed.
 *
 * INC-188 — the save round-trips EVERY stored field this surface holds.
 */
export function ProductEditorDialog({
  kind,
  row,
  guard,
  openedBy,
  onClose,
}: {
  kind: ProductKind;
  /** null = Add a product of this kind. */
  row: ProductRow | null;
  guard: GuardFn;
  openedBy: string;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const save = useSaveProduct();
  const { refusal, clear, fail, render } = useMonetisationError();
  const creating = row === null;
  const [form, setForm] = useState<ProductFormValues>(() =>
    row === null ? NEW_PRODUCT_FORM : productFormOf(row),
  );
  const prefix = `monetisation-${kind}-${creating ? "create" : "edit"}`;
  const change = (next: Partial<ProductFormValues>) =>
    setForm((prev) => ({
      ...prev,
      ...next,
      ...(next.key === undefined ? {} : { key: next.key.toLowerCase() }),
    }));

  const submit = () => {
    clear();
    const judged = productFormInput(kind, form);
    if (!judged.ok) {
      render(judged.key);
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

  const name = (field: "nameEn" | "nameAm", label: MessageKey, suffix: string) => (
    <FormField label={t(label)} htmlFor={`${prefix}-${suffix}`}>
      <Input
        id={`${prefix}-${suffix}`}
        data-testid={`${prefix}-${suffix}`}
        value={form[field]}
        maxLength={PRODUCT_NAME_MAX}
        onChange={(event) => change({ [field]: event.target.value })}
      />
    </FormField>
  );

  const title: MessageKey = creating
    ? "admin.monetisation.product.add"
    : kind === "level"
      ? "admin.monetisation.level.edit"
      : "admin.packages.edit.title";

  return (
    <CategoryModal testid={prefix} openedBy={openedBy} title={t(title)} onClose={onClose}>
      {creating ? (
        <FormField
          label={t("admin.packages.field.key")}
          htmlFor={`${prefix}-key`}
          help={t("admin.packages.field.keyHint")}
        >
          <Input
            id={`${prefix}-key`}
            data-testid={`${prefix}-key`}
            value={form.key}
            maxLength={32}
            autoCapitalize="none"
            onChange={(event) => change({ key: event.target.value })}
          />
        </FormField>
      ) : (
        <p className="min-w-0 break-all text-sm" data-testid={`${prefix}-key`}>
          {form.key}
        </p>
      )}
      {name("nameEn", "admin.monetisation.field.nameEn", "name-en")}
      {name("nameAm", "admin.monetisation.field.nameAm", "name-am")}
      <NumberField
        id={`${prefix}-days`}
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
            labelKey="admin.monetisation.col.badge"
            checked={form.badge}
            onChange={(next) => change({ badge: next })}
          />
        </>
      ) : null}
      <Toggle
        id={`${prefix}-enabled`}
        labelKey="admin.packages.field.enabled"
        checked={form.enabled}
        onChange={(next) => change({ enabled: next })}
      />
      <Toggle
        id={`${prefix}-self-serve`}
        labelKey="admin.packages.field.selfServe"
        checked={form.selfServe}
        onChange={(next) => change({ selfServe: next })}
      />
      <Toggle
        id={`${prefix}-extends`}
        labelKey="admin.packages.field.extends"
        checked={form.extendsLifetime}
        onChange={(next) => change({ extendsLifetime: next })}
      />
      <FormField label={t("admin.packages.field.sort")} htmlFor={`${prefix}-sort`}>
        <Input
          id={`${prefix}-sort`}
          data-testid={`${prefix}-sort`}
          inputMode="numeric"
          value={form.sort}
          onChange={(event) => {
            // Digits only: the order has no refusal of its own, so none can be typed.
            const next = event.target.value;
            if (/^\d*$/.test(next)) change({ sort: next });
          }}
        />
      </FormField>
      <p className="text-sm text-muted-foreground">{t("admin.packages.noDelete")}</p>
      <MonetisationErrorLine refusal={refusal} testid={`${prefix}-error`} />
      <MonetisationDialogActions
        onCancel={onClose}
        onSubmit={submit}
        busy={save.isPending}
        cancelTestId={`${prefix}-cancel`}
        submitTestId={`${prefix}-save`}
        submitLabel={t("common.save")}
      />
    </CategoryModal>
  );
}

export default ProductEditorDialog;
