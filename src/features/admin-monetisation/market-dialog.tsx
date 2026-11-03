import { useState } from "react";

import { FormField } from "@/components/shell/form-section";
import { NativeSelect } from "@/components/ui/native-select";
import { CategoryModal } from "@/features/admin-categories/category-dialogs";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { useI18n } from "@/i18n";

import {
  MonetisationDialogActions,
  MonetisationErrorLine,
  NumberField,
  Toggle,
} from "./monetisation-dialogs";
import {
  NEW_MARKET_FORM,
  marketFormInput,
  marketFormOf,
  type MarketFormValues,
} from "./monetisation-forms";
import type { MarketRow, ProductRow } from "./monetisation-service";
import { useSaveMarket } from "./use-monetisation";
import { useMonetisationError } from "./use-monetisation-error";
import { useMonetisationNames } from "./use-monetisation-names";

/**
 * P-1b (D311, D312) — A MARKET'S ROW, one surface for Add and Edit. The
 * country is picked once and fixed on edit (the door upserts by scope); the
 * reach picker offers the enabled reach products; switching paid levels on
 * needs the launch bundle (the door refuses without it, and records when it
 * went on). INC-188 — the save round-trips every stored field this surface holds.
 */
export function MarketDialog({
  row,
  products,
  taken,
  guard,
  openedBy,
  onClose,
}: {
  /** null = Add a market. */
  row: MarketRow | null;
  products: ProductRow[];
  /** The scopes that already hold a row (null = the default row), left out of the picker. */
  taken: Array<string | null>;
  guard: GuardFn;
  openedBy: string;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const save = useSaveMarket();
  const { refusal, clear, fail, render } = useMonetisationError();
  const { marketName, productName, markets } = useMonetisationNames(products);
  const creating = row === null;
  const prefix = creating ? "monetisation-market-create" : "monetisation-market-edit";
  const reaches = products.filter((product) => product.kind === "reach" && product.enabled);
  const [form, setForm] = useState<MarketFormValues>(() =>
    row === null ? { ...NEW_MARKET_FORM, includedReach: reaches[0]?.key ?? "" } : marketFormOf(row),
  );
  const change = (next: Partial<MarketFormValues>) => setForm((prev) => ({ ...prev, ...next }));
  const open = markets.filter((market) => !taken.includes(market.code));

  const submit = () => {
    clear();
    const judged = marketFormInput(form);
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
      title={t(creating ? "admin.monetisation.market.add" : "admin.monetisation.market.edit")}
      onClose={onClose}
    >
      {creating ? (
        <FormField label={t("admin.monetisation.col.market")} htmlFor={`${prefix}-market`}>
          <NativeSelect
            id={`${prefix}-market`}
            data-testid={`${prefix}-market`}
            className="w-full"
            value={form.countryCode}
            onChange={(event) => change({ countryCode: event.target.value })}
          >
            {taken.includes(null) ? null : (
              <option value="">{t("admin.monetisation.defaultMarket")}</option>
            )}
            {open.map((market) => (
              <option key={market.code} value={market.code}>
                {marketName(market.code, "countryAny")}
              </option>
            ))}
          </NativeSelect>
        </FormField>
      ) : (
        <p className="min-w-0 break-words text-sm" data-testid={`${prefix}-market`}>
          {row.countryCode === null
            ? t("admin.monetisation.defaultMarket")
            : marketName(row.countryCode, "countryAny")}
        </p>
      )}
      <NumberField
        id={`${prefix}-free-ads`}
        labelKey="admin.monetisation.col.freeAds"
        value={form.freeRegularAds}
        onChange={(next) => change({ freeRegularAds: next })}
      />
      <FormField label={t("admin.monetisation.col.includedReach")} htmlFor={`${prefix}-reach`}>
        <NativeSelect
          id={`${prefix}-reach`}
          data-testid={`${prefix}-reach`}
          className="w-full"
          value={form.includedReach}
          onChange={(event) => change({ includedReach: event.target.value })}
        >
          {reaches.map((product) => (
            <option key={product.key} value={product.key}>
              {productName(product.key)}
            </option>
          ))}
        </NativeSelect>
      </FormField>
      <Toggle
        id={`${prefix}-paid-levels`}
        labelKey="admin.monetisation.col.paidLevels"
        checked={form.paidLevels}
        onChange={(next) => change({ paidLevels: next })}
      />
      <NumberField
        id={`${prefix}-launch-credits`}
        labelKey="admin.monetisation.field.launchCredits"
        value={form.launchCredits}
        onChange={(next) => change({ launchCredits: next })}
      />
      <NumberField
        id={`${prefix}-launch-days`}
        labelKey="admin.monetisation.field.launchDays"
        value={form.launchDays}
        onChange={(next) => change({ launchDays: next })}
      />
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

export default MarketDialog;
