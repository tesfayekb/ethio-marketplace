import { useState } from "react";

import { FormField } from "@/components/shell/form-section";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import { CategoryModal } from "@/features/admin-categories/category-dialogs";
import { TIER_LABEL } from "@/features/admin-listings/tier-reasons";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { useI18n, type MessageKey } from "@/i18n";

import { PackagesDialogActions, PackagesErrorLine } from "./packages-dialogs";
import { usePackagesError } from "./use-packages-error";
import {
  NEW_PACKAGE_FORM,
  defaultPackageLabelKey,
  packageFormInput,
  packageFormOf,
  type PackageFormValues,
} from "./packages-forms";
import { PACKAGE_TIERS, type PackageRow } from "./packages-service";
import { useSavePackage } from "./use-packages";

/**
 * P-1 (D280) — THE PACKAGE EDITOR, one surface for Add and Edit (CT-8). The key
 * is typed once and fixed on edit (the door upserts by key); the label key
 * follows the typed key as `package.<key>` until the operator types it
 * (ruling 1, answer 6). There is no delete door: a package is switched off,
 * never removed.
 *
 * INC-188 — the save round-trips EVERY stored field this surface holds.
 */
export function PackageEditorDialog({
  row,
  guard,
  openedBy,
  onClose,
}: {
  /** null = Add a package. */
  row: PackageRow | null;
  guard: GuardFn;
  openedBy: string;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const save = useSavePackage();
  const { refusal, clear, fail, render } = usePackagesError();
  const creating = row === null;
  const [form, setForm] = useState<PackageFormValues>(() =>
    row === null ? NEW_PACKAGE_FORM : packageFormOf(row),
  );
  const [labelTyped, setLabelTyped] = useState(!creating);
  const prefix = creating ? "packages-create" : "packages-editor";

  const change = (next: Partial<PackageFormValues>) => {
    if (next.labelKey !== undefined) setLabelTyped(true);
    setForm((prev) => {
      const merged = { ...prev, ...next };
      if (next.key !== undefined && !labelTyped) {
        merged.key = next.key.toLowerCase();
        merged.labelKey = defaultPackageLabelKey(merged.key);
      }
      return merged;
    });
  };

  const submit = () => {
    clear();
    const judged = packageFormInput(form);
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

  const toggle = (key: "enabled" | "selfServe" | "extendsLifetime", label: MessageKey) => (
    <label className="flex min-h-11 min-w-0 items-center gap-2 text-sm">
      <input
        type="checkbox"
        className="size-5"
        data-testid={`${prefix}-${key}`}
        checked={form[key]}
        onChange={(event) => change({ [key]: event.target.checked })}
      />
      <span>{t(label)}</span>
    </label>
  );

  return (
    <CategoryModal
      testid={prefix}
      openedBy={openedBy}
      title={t(creating ? "admin.packages.create.title" : "admin.packages.edit.title")}
      onClose={onClose}
    >
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
      <FormField label={t("admin.packages.field.tier")} htmlFor={`${prefix}-tier`}>
        <NativeSelect
          id={`${prefix}-tier`}
          data-testid={`${prefix}-tier`}
          className="w-full"
          value={form.tier}
          onChange={(event) => change({ tier: event.target.value })}
        >
          {PACKAGE_TIERS.map((tier) => (
            <option key={tier} value={tier}>
              {t(TIER_LABEL[tier])}
            </option>
          ))}
        </NativeSelect>
      </FormField>
      <FormField label={t("admin.packages.field.days")} htmlFor={`${prefix}-days`}>
        <Input
          id={`${prefix}-days`}
          data-testid={`${prefix}-days`}
          inputMode="numeric"
          value={form.days}
          onChange={(event) => change({ days: event.target.value })}
        />
      </FormField>
      {toggle("enabled", "admin.packages.field.enabled")}
      {toggle("selfServe", "admin.packages.field.selfServe")}
      {toggle("extendsLifetime", "admin.packages.field.extends")}
      <FormField label={t("admin.packages.field.label")} htmlFor={`${prefix}-label`}>
        <Input
          id={`${prefix}-label`}
          data-testid={`${prefix}-label`}
          value={form.labelKey}
          maxLength={80}
          onChange={(event) => change({ labelKey: event.target.value })}
        />
      </FormField>
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
      <PackagesErrorLine refusal={refusal} testid={`${prefix}-error`} />
      <PackagesDialogActions
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

export default PackageEditorDialog;
