import { useState } from "react";

import { Field } from "@/components/forms/field";
import { useFormGate } from "@/components/forms/use-form-gate";
import { parseNumber } from "@/lib/parse-input";
import { NativeSelect } from "@/components/ui/native-select";
import { CategoryModal } from "@/components/ui/category-modal";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { useI18n, type MessageKey } from "@/i18n";
import type { Refusal } from "@/lib/refusal";

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
import { ownRefusals, refusalFor } from "./monetisation-refusals";
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
  const gate = useFormGate();
  const [own, setOwn] = useState<Refusal[]>([]);
  const refused = (field: string) => refusalFor(field, gate.marks, own);
  /** A launch answer the judge refuses: typed, and not a whole number of 1 or more. */
  const badLaunch = (raw: string) =>
    raw.trim() !== "" && parseNumber(raw, { integer: true, min: 1 }).kind !== "number";
  const ownFields: Readonly<Partial<Record<MessageKey, readonly string[]>>> = {
    "admin.monetisation.error.badFreeAds": ["free_regular_ads"],
    "admin.monetisation.error.badLaunch": [
      ...(badLaunch(form.launchCredits) ? ["launch_credits"] : []),
      ...(badLaunch(form.launchDays) ? ["launch_days"] : []),
    ],
  };
  const open = markets.filter((market) => !taken.includes(market.code));

  const submit = () => {
    clear();
    setOwn([]);
    if (!gate.try()) return;
    const judged = marketFormInput(form);
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

  return (
    <CategoryModal
      testid={prefix}
      openedBy={openedBy}
      title={t(creating ? "admin.monetisation.market.add" : "admin.monetisation.market.edit")}
      onClose={onClose}
    >
      {creating ? (
        <Field
          id={`${prefix}-market`}
          field="country_code"
          label={t("admin.monetisation.col.market")}
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
              {taken.includes(null) ? null : (
                <option value="">{t("admin.monetisation.defaultMarket")}</option>
              )}
              {open.map((market) => (
                <option key={market.code} value={market.code}>
                  {marketName(market.code, "countryAny")}
                </option>
              ))}
            </NativeSelect>
          )}
        </Field>
      ) : (
        <p className="min-w-0 break-words text-sm" data-testid={`${prefix}-market`}>
          {row.countryCode === null
            ? t("admin.monetisation.defaultMarket")
            : marketName(row.countryCode, "countryAny")}
        </p>
      )}
      <NumberField
        id={`${prefix}-free-ads`}
        field="free_regular_ads"
        required
        gate={gate}
        refusal={refused("free_regular_ads")}
        labelKey="admin.monetisation.col.freeAds"
        value={form.freeRegularAds}
        onChange={(next) => change({ freeRegularAds: next })}
      />
      <Field
        id={`${prefix}-reach`}
        field="included_reach"
        label={t("admin.monetisation.col.includedReach")}
        required
        marked={false}
        refusal={null}
      >
        {(control) => (
          <NativeSelect
            {...control}
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
        )}
      </Field>
      <Toggle
        id={`${prefix}-paid-levels`}
        field="paid_levels"
        labelKey="admin.monetisation.col.paidLevels"
        checked={form.paidLevels}
        onChange={(next) => change({ paidLevels: next })}
      />
      <NumberField
        id={`${prefix}-launch-credits`}
        field="launch_credits"
        refusal={refused("launch_credits")}
        labelKey="admin.monetisation.field.launchCredits"
        value={form.launchCredits}
        onChange={(next) => change({ launchCredits: next })}
      />
      <NumberField
        id={`${prefix}-launch-days`}
        field="launch_days"
        refusal={refused("launch_days")}
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
