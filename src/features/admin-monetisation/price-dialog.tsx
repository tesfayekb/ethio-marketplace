import { useState } from "react";

import { DateField } from "@/components/shell/date-field";
import { todayIso } from "@/components/shell/date-day";
import { FormField } from "@/components/shell/form-section";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import { CategoryModal } from "@/features/admin-categories/category-dialogs";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { currencyText, orderCurrencies, useCurrencies } from "@/features/posting/pricing-data";
import { useI18n } from "@/i18n";

import {
  MonetisationDialogActions,
  MonetisationErrorLine,
  NumberField,
} from "./monetisation-dialogs";
import type { PriceRow, ProductRow } from "./monetisation-service";
import {
  NEW_PRICE_FORM,
  flattenTree,
  priceFormInput,
  priceFormOf,
  type PriceFormValues,
} from "./price-forms";
import { useEditPrice, useSavePrice } from "./use-monetisation";
import { useMonetisationError } from "./use-monetisation-error";
import { useMonetisationNames } from "./use-monetisation-names";

/**
 * P-1b (D288, D304) — A PRICE, one surface for Add and Edit. The product is
 * picked FIRST (any enabled product of either kind), then the market (or every
 * market), the category (a root or any branch beneath it; or every category),
 * the amount (0 = free) with its currency, the credit cost and the window.
 * Edit stands while the row is unused and live; the door refuses otherwise
 * (`price in use`, `price already ended`) and a window overlapping another
 * row of the same scope.
 *
 * P-1c (D313) — opened from inside a product's own prices table, the product is
 * `fixedProduct`: named as a line, never picked.
 */
export function PriceDialog({
  row,
  products,
  fixedProduct,
  guard,
  openedBy,
  onClose,
}: {
  /** null = Add a price. */
  row: PriceRow | null;
  products: ProductRow[];
  /** The product this price belongs to, when the dialog sits inside its table. */
  fixedProduct?: string;
  guard: GuardFn;
  openedBy: string;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const save = useSavePrice();
  const edit = useEditPrice();
  const { refusal, clear, fail, render } = useMonetisationError();
  const { marketName, categoryName, productName, markets, tree } = useMonetisationNames(products);
  const { currencies } = useCurrencies();
  const ordered = orderCurrencies(currencies, null);
  const today = todayIso();
  const creating = row === null;
  const prefix = creating ? "monetisation-price-create" : "monetisation-price-edit";
  const [form, setForm] = useState<PriceFormValues>(() =>
    row === null
      ? { ...NEW_PRICE_FORM, packageKey: fixedProduct ?? NEW_PRICE_FORM.packageKey }
      : priceFormOf(row),
  );
  const keptFromDay = row === null ? null : priceFormOf(row).validFrom;
  // The currency list arrives after the first paint: the first curated one is the default.
  const currency = form.currency === "" ? (ordered[0]?.code ?? "") : form.currency;
  const change = (next: Partial<PriceFormValues>) => setForm((prev) => ({ ...prev, ...next }));
  const offered = products.filter((product) => product.enabled || product.key === form.packageKey);

  const submit = () => {
    clear();
    const judged = priceFormInput({ ...form, currency }, today, keptFromDay);
    if (!judged.ok) {
      render(judged.key);
      return;
    }
    void guard(async () => {
      try {
        if (row === null) await save.mutateAsync(judged.input);
        else await edit.mutateAsync({ id: row.id, price: judged.input });
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
      title={t(creating ? "admin.monetisation.price.add" : "admin.monetisation.price.edit")}
      onClose={onClose}
    >
      {fixedProduct === undefined ? (
        <FormField label={t("admin.monetisation.col.product")} htmlFor={`${prefix}-product`}>
          <NativeSelect
            id={`${prefix}-product`}
            data-testid={`${prefix}-product`}
            className="w-full"
            value={form.packageKey}
            onChange={(event) => change({ packageKey: event.target.value })}
          >
            {creating ? <option value="" /> : null}
            {offered.map((product) => (
              <option key={product.key} value={product.key}>
                {productName(product.key)}
              </option>
            ))}
          </NativeSelect>
        </FormField>
      ) : (
        <div className="min-w-0 space-y-1">
          <p className="text-sm font-medium text-foreground">
            {t("admin.monetisation.col.product")}
          </p>
          <p className="min-w-0 break-words text-sm" data-testid={`${prefix}-product`}>
            {productName(form.packageKey)}
          </p>
        </div>
      )}
      <FormField label={t("admin.packages.prices.field.market")} htmlFor={`${prefix}-market`}>
        <NativeSelect
          id={`${prefix}-market`}
          data-testid={`${prefix}-market`}
          className="w-full"
          value={form.countryCode}
          onChange={(event) => change({ countryCode: event.target.value })}
        >
          <option value="">{t("admin.packages.prices.everyMarket")}</option>
          {markets.map((market) => (
            <option key={market.code} value={market.code}>
              {marketName(market.code, "everyMarket")}
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
              {`${"\u00a0\u00a0".repeat(depth)}${categoryName(node.id, "everyCategory")}`}
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
          {ordered.map((entry) => (
            <option key={entry.code} value={entry.code}>
              {currencyText(entry)}
            </option>
          ))}
        </NativeSelect>
      </FormField>
      <NumberField
        id={`${prefix}-credit-cost`}
        labelKey="admin.monetisation.field.creditCost"
        value={form.creditCost}
        onChange={(next) => change({ creditCost: next })}
      />
      <FormField label={t("admin.packages.prices.field.from")} htmlFor={`${prefix}-from`}>
        <DateField
          id={`${prefix}-from`}
          testid={`${prefix}-from`}
          value={form.validFrom}
          min={keptFromDay !== null && keptFromDay < today ? keptFromDay : today}
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
      <MonetisationErrorLine refusal={refusal} testid={`${prefix}-error`} />
      <MonetisationDialogActions
        onCancel={onClose}
        onSubmit={submit}
        busy={save.isPending || edit.isPending}
        cancelTestId={`${prefix}-cancel`}
        submitTestId={`${prefix}-save`}
        submitLabel={t("common.save")}
      />
    </CategoryModal>
  );
}

export default PriceDialog;
