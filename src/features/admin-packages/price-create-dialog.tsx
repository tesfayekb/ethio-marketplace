import { useState } from "react";

import { DateField } from "@/components/shell/date-field";
import { todayIso } from "@/components/shell/date-day";
import { FormField } from "@/components/shell/form-section";
import { useOpenMarkets } from "@/components/shell/location-data";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import { CategoryModal } from "@/features/admin-categories/category-dialogs";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { useCategoryTree, type CategoryNode } from "@/features/categories/category-tree";
import { currencyText, orderCurrencies, useCurrencies } from "@/features/posting/pricing-data";
import { useI18n } from "@/i18n";
import { entityName } from "@/i18n/entity";

import { PackagesDialogActions, PackagesErrorLine } from "./packages-dialogs";
import { usePackagesError } from "./use-packages-error";
import {
  NEW_PRICE_FORM,
  flattenTree,
  priceFormInput,
  type PriceFormValues,
} from "./packages-forms";
import { useSavePrice } from "./use-packages";

/**
 * P-1 (D280) — ADD A PRICE to the chosen package: the market (or every market),
 * the category (a root or any branch beneath it; or every category), the
 * amount (0 = free) with its currency, and the window. The door inserts only —
 * a saved price is never edited, it ends (`PriceEndDialog`) and a new one is
 * added; the door refuses a window overlapping another row of the same scope.
 */

export function PriceCreateDialog({
  packageKey,
  guard,
  openedBy,
  onClose,
}: {
  packageKey: string;
  guard: GuardFn;
  openedBy: string;
  onClose: () => void;
}) {
  const { t, entities } = useI18n();
  const save = useSavePrice();
  const { refusal, clear, fail, render } = usePackagesError();
  const markets = useOpenMarkets();
  const { tree } = useCategoryTree();
  const { currencies } = useCurrencies();
  const ordered = orderCurrencies(currencies, null);
  const today = todayIso();
  const [form, setForm] = useState<PriceFormValues>(NEW_PRICE_FORM);
  // The currency list arrives after the first paint: the first curated one is the default.
  const currency = form.currency === "" ? (ordered[0]?.code ?? "") : form.currency;
  const change = (next: Partial<PriceFormValues>) => setForm((prev) => ({ ...prev, ...next }));
  const prefix = "packages-price-create";

  const marketName = (code: string, nameEn: string, anchorId: string | null) =>
    anchorId === null
      ? nameEn
      : entityName("location", { id: anchorId, nameEn, nameAm: null }, entities);
  const categoryName = (node: CategoryNode) =>
    entityName("category", { id: node.id, nameEn: node.nameEn, nameAm: node.nameAm }, entities);

  const submit = () => {
    clear();
    const judged = priceFormInput(packageKey, { ...form, currency }, today);
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

  return (
    <CategoryModal
      testid={prefix}
      openedBy={openedBy}
      title={t("admin.packages.prices.create.title")}
      onClose={onClose}
    >
      <p className="min-w-0 break-all text-sm" data-testid={`${prefix}-package`}>
        {packageKey}
      </p>
      <FormField label={t("admin.packages.prices.field.market")} htmlFor={`${prefix}-market`}>
        <NativeSelect
          id={`${prefix}-market`}
          data-testid={`${prefix}-market`}
          className="w-full"
          value={form.countryCode}
          onChange={(event) => change({ countryCode: event.target.value })}
        >
          <option value="">{t("admin.packages.prices.everyMarket")}</option>
          {markets.markets.map((market) => (
            <option key={market.code} value={market.code}>
              {marketName(market.code, market.nameEn, market.anchorId)}
            </option>
          ))}
        </NativeSelect>
      </FormField>
      <FormField label={t("admin.packages.prices.field.category")} htmlFor={`${prefix}-category`}>
        <NativeSelect
          id={`${prefix}-category`}
          data-testid={`${prefix}-category`}
          className="w-full"
          value={form.categoryId}
          onChange={(event) => change({ categoryId: event.target.value })}
        >
          <option value="">{t("admin.packages.prices.everyCategory")}</option>
          {flattenTree(tree).map(({ node, depth }) => (
            <option key={node.id} value={node.id}>
              {`${"\u00a0\u00a0".repeat(depth)}${categoryName(node)}`}
            </option>
          ))}
        </NativeSelect>
      </FormField>
      <FormField
        label={t("admin.packages.prices.field.amount")}
        htmlFor={`${prefix}-amount`}
        help={t("admin.packages.prices.field.amountHint")}
      >
        <Input
          id={`${prefix}-amount`}
          data-testid={`${prefix}-amount`}
          inputMode="decimal"
          value={form.amount}
          onChange={(event) => change({ amount: event.target.value })}
        />
      </FormField>
      <FormField label={t("admin.packages.prices.field.currency")} htmlFor={`${prefix}-currency`}>
        <NativeSelect
          id={`${prefix}-currency`}
          data-testid={`${prefix}-currency`}
          className="w-full"
          value={currency}
          onChange={(event) => change({ currency: event.target.value })}
        >
          {ordered.map((row) => (
            <option key={row.code} value={row.code}>
              {currencyText(row)}
            </option>
          ))}
        </NativeSelect>
      </FormField>
      <FormField label={t("admin.packages.prices.field.from")} htmlFor={`${prefix}-from`}>
        <DateField
          id={`${prefix}-from`}
          testid={`${prefix}-from`}
          value={form.validFrom}
          min={today}
          max={form.validTo === "" ? undefined : form.validTo}
          onChange={(next) => change({ validFrom: next })}
        />
      </FormField>
      <FormField
        label={t("admin.packages.prices.field.to")}
        htmlFor={`${prefix}-to`}
        help={t("admin.packages.prices.field.toHint")}
      >
        <DateField
          id={`${prefix}-to`}
          testid={`${prefix}-to`}
          value={form.validTo}
          min={form.validFrom === "" ? today : form.validFrom}
          onChange={(next) => change({ validTo: next })}
        />
      </FormField>
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

export default PriceCreateDialog;
