import { useState } from "react";

import { FormField } from "@/components/shell/form-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n, type MessageKey } from "@/i18n";

import {
  budgetCentsOf,
  budgetField,
  priceCeilingText,
  priceField,
  unitCostOf,
  type AiFeatureRow,
  type AiRefusal,
  type SetAiFeatureInput,
} from "./ai-service";

/**
 * Bundle 13 turn 5 (D158) — ONE FEATURE'S SWITCH, BUDGET AND PRICE.
 *
 * Presentation only: the editor owns the door and the second factor; this form
 * checks the two numbers against the door's own ceilings first (F3 — the door
 * still decides) and hands a whole record back (INC-188: a save never drops a
 * field the surface holds). Photo screening's switch says what switching it off
 * does (D158, bundle 13 turn 6): new photos are held for staff, and a live ad
 * takes no new photo until it is on again.
 * 360-first: full-width controls, 44 px targets, logical spacing.
 */
export function AiFeatureForm({
  row,
  name,
  busy,
  refusal,
  onCancel,
  onSave,
}: {
  row: AiFeatureRow;
  /** The feature's name, already in the reader's language. */
  name: string;
  busy: boolean;
  refusal: AiRefusal | null;
  onCancel: () => void;
  onSave: (input: SetAiFeatureInput) => void;
}) {
  const { t } = useI18n();
  const screening = row.feature === "photo_screen";
  const [enabled, setEnabled] = useState(row.on);
  const [budget, setBudget] = useState(() => budgetField(row.monthlyBudgetCents));
  const [price, setPrice] = useState(() => priceField(row.unit, row.unitCostMicrousd));
  const [local, setLocal] = useState<MessageKey | null>(null);

  const submit = () => {
    setLocal(null);
    const cents = budgetCentsOf(budget);
    if (!cents.ok) {
      setLocal("admin.ai.error.badBudget");
      return;
    }
    const micro = unitCostOf(row.unit, price);
    if (micro === null) {
      setLocal("admin.ai.error.badPrice");
      return;
    }
    onSave({
      feature: row.feature,
      enabled,
      monthlyBudgetCents: cents.cents,
      unitCostMicrousd: micro,
    });
  };

  const shown: AiRefusal | null = local === null ? refusal : { key: local, raw: null };

  return (
    <div className="min-w-0 space-y-3" data-testid="ai-editor-form">
      <p className="min-w-0 break-words text-sm font-medium" data-testid="ai-editor-feature">
        {name}
      </p>
      <label className="flex min-h-11 min-w-0 items-center gap-2 text-sm">
        <input
          type="checkbox"
          className="size-5"
          data-testid="ai-editor-on"
          checked={enabled}
          onChange={(event) => setEnabled(event.target.checked)}
        />
        <span>{t("admin.ai.field.on")}</span>
      </label>
      {screening ? (
        <p className="text-sm text-muted-foreground" data-testid="ai-editor-screening-note">
          {t("admin.ai.field.screeningOffNote")}
        </p>
      ) : null}
      <FormField
        label={t("admin.ai.field.budget")}
        htmlFor="ai-editor-budget"
        help={t("admin.ai.field.budgetHint")}
      >
        <Input
          id="ai-editor-budget"
          data-testid="ai-editor-budget"
          inputMode="decimal"
          value={budget}
          onChange={(event) => setBudget(event.target.value)}
        />
      </FormField>
      <FormField
        label={t(row.unit === "call" ? "admin.ai.field.priceCall" : "admin.ai.field.priceMillion")}
        htmlFor="ai-editor-price"
        help={t("admin.ai.field.priceHint")}
      >
        <Input
          id="ai-editor-price"
          data-testid="ai-editor-price"
          inputMode="decimal"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
      </FormField>
      {shown === null ? null : (
        <>
          <p role="alert" data-testid="ai-editor-error" className="text-sm text-destructive">
            {t(shown.key).replace("{max}", priceCeilingText(row.unit))}
          </p>
          {shown.raw === null ? null : (
            <p
              className="text-sm break-words text-muted-foreground"
              data-testid="ai-editor-error-reason"
            >
              {t("admin.ai.error.reason").replace("{reason}", shown.raw)}
            </p>
          )}
        </>
      )}
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          size="touch"
          data-testid="ai-editor-cancel"
          onClick={onCancel}
        >
          {t("common.cancel")}
        </Button>
        <Button
          type="button"
          size="touch"
          data-testid="ai-editor-save"
          disabled={busy}
          onClick={submit}
        >
          {t("common.save")}
        </Button>
      </div>
    </div>
  );
}

export default AiFeatureForm;
