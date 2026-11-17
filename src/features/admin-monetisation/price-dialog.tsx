import { useState } from "react";

import { DateField } from "@/components/shell/date-field";
import { todayIso } from "@/components/shell/date-day";
import { Field } from "@/components/forms/field";
import { useFormGate } from "@/components/forms/use-form-gate";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import { CategoryModal } from "@/components/ui/category-modal";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { currencyText, orderCurrencies, useCurrencies } from "@/features/posting/pricing-data";
import { useI18n, type MessageKey } from "@/i18n";
import type { Refusal } from "@/lib/refusal";

import {
  MonetisationDialogActions,
  MonetisationErrorLine,
  NumberField,
} from "./monetisation-dialogs";
import { MONETISATION_REFUSALS, ownRefusals, refusalFor } from "./monetisation-refusals";
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

/** A single field's own refusal, by the judge's key (L8). */
const OWN_FIELDS: Readonly<Partial<Record<MessageKey, readonly string[]>>> = {
  "admin.packages.error.badAmount": ["amount"],
  "admin.monetisation.error.badCreditCost": ["credit_cost"],
};

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
  const gate = useFormGate();
  const [own, setOwn] = useState<Refusal[]>([]);
  const refused = (field: string) => refusalFor(field, gate.marks, own);
  const hintOf = (key: MessageKey) => (
    <p className="min-w-0 break-words text-xs text-muted-foreground">{t(key)}</p>
  );
  const offered = products.filter((product) => product.enabled || product.key === form.packageKey);

  const submit = () => {
    clear();
    setOwn([]);
    if (!gate.try()) return;
    const judged = priceFormInput({ ...form, currency }, today, keptFromDay);
    if (!judged.ok) {
      const mine = ownRefusals(judged.key, OWN_FIELDS);
      if (mine === null) render(judged.key);
      else setOwn(mine);
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
        <Field
          id={`${prefix}-product`}
          field="package_key"
          label={t("admin.monetisation.col.product")}
          required
          gate={gate}
          blank={form.packageKey === ""}
          refusal={refused("package_key")}
          family={MONETISATION_REFUSALS}
        >
          {(control) => (
            <NativeSelect
              {...control}
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
          )}
        </Field>
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
      <Field
        id={`${prefix}-market`}
        field="country_code"
        label={t("admin.packages.prices.field.market")}
        required
        marked={false}
        refusal={null}
      >
        {(control) => (
          <NativeSelect
            {...control}
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
        )}
      </Field>
      <Field
        id={`${prefix}-category`}
        field="category_id"
        label={t("admin.packages.prices.field.category")}
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
            <option value="">{t("admin.packages.prices.everyCategory")}</option>
            {flattenTree(tree).map(({ node, depth }) => (
              <option key={node.id} value={node.id}>
                {`${"\u00a0\u00a0".repeat(depth)}${categoryName(node.id, "everyCategory")}`}
              </option>
            ))}
          </NativeSelect>
        )}
      </Field>
      <Field
        id={`${prefix}-amount`}
        field="amount"
        label={t("admin.packages.prices.field.amount")}
        required
        gate={gate}
        blank={form.amount.trim() === ""}
        refusal={refused("amount")}
        family={MONETISATION_REFUSALS}
        hint={hintOf("admin.packages.prices.field.amountHint")}
      >
        {(control) => (
          <Input
            {...control}
            data-testid={`${prefix}-amount`}
            inputMode="decimal"
            value={form.amount}
            onChange={(event) => change({ amount: event.target.value })}
          />
        )}
      </Field>
      <Field
        id={`${prefix}-currency`}
        field="currency"
        label={t("admin.packages.prices.field.currency")}
        required
        marked={false}
        refusal={null}
      >
        {(control) => (
          <NativeSelect
            {...control}
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
        )}
      </Field>
      <NumberField
        id={`${prefix}-credit-cost`}
        field="credit_cost"
        required
        gate={gate}
        refusal={refused("credit_cost")}
        labelKey="admin.monetisation.field.creditCost"
        value={form.creditCost}
        onChange={(next) => change({ creditCost: next })}
      />
      <Field
        id={`${prefix}-from`}
        field="valid_from"
        label={t("admin.packages.prices.field.from")}
        required={false}
        refusal={null}
      >
        <DateField
          id={`${prefix}-from`}
          testid={`${prefix}-from`}
          value={form.validFrom}
          min={keptFromDay !== null && keptFromDay < today ? keptFromDay : today}
          max={form.validTo === "" ? undefined : form.validTo}
          onChange={(next) => change({ validFrom: next })}
        />
      </Field>
      <Field
        id={`${prefix}-to`}
        field="valid_to"
        label={t("admin.packages.prices.field.to")}
        required={false}
        refusal={null}
        hint={hintOf("admin.packages.prices.field.toHint")}
      >
        <DateField
          id={`${prefix}-to`}
          testid={`${prefix}-to`}
          value={form.validTo}
          min={form.validFrom === "" ? today : form.validFrom}
          onChange={(next) => change({ validTo: next })}
        />
      </Field>
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
