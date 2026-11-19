import { Field } from "@/components/forms/field";
import { useFormGate } from "@/components/forms/use-form-gate";
import { controlClass } from "@/components/forms/control-class";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n, type MessageKey } from "@/i18n";

import type { AiRefusal } from "./ai-refusals";
import {
  budgetCentsOf,
  budgetField,
  priceCeilingText,
  priceField,
  unitCostOf,
  type AiFeatureRow,
  type SetAiFeatureInput,
} from "./ai-service";

const AI_FORM_REFUSALS = {
  words: { required: "post.refusal.required", badBudget: "admin.ai.error.badBudget" },
} as const;

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
  const [budgetRefused, setBudgetRefused] = useState(false);
  const gate = useFormGate();

  const submit = () => {
    setLocal(null);
    setBudgetRefused(false);
    if (!gate.try()) return;
    const cents = budgetCentsOf(budget);
    if (!cents.ok) {
      setBudgetRefused(true);
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
      <Field
        id={"ai-editor-on"}
        field="enabled"
        label={
          <>
            <span>{t("admin.ai.field.on")}</span>
          </>
        }
        required={false}
        refusal={null}
        layout="choice"
      >
        {(control) => (
          <input
            {...control}
            type="checkbox"
            className="size-5"
            data-testid="ai-editor-on"
            checked={enabled}
            onChange={(event) => setEnabled(event.target.checked)}
          />
        )}
      </Field>
      {screening ? (
        <p className="text-sm text-muted-foreground" data-testid="ai-editor-screening-note">
          {t("admin.ai.field.screeningOffNote")}
        </p>
      ) : null}
      <Field
        id={"ai-editor-budget"}
        field="monthlyBudgetCents"
        label={t("admin.ai.field.budget")}
        required={false}
        refusal={budgetRefused ? { field: "monthlyBudgetCents", reason: "badBudget" } : null}
        family={AI_FORM_REFUSALS}
        hint={<p className="text-xs text-muted-foreground">{t("admin.ai.field.budgetHint")}</p>}
      >
        {(control) => (
          <>
            <Input
              {...control}
              data-testid="ai-editor-budget"
              inputMode="decimal"
              className={controlClass(budgetRefused, false, "dialog")}
              value={budget}
              onChange={(event) => {
                setBudget(event.target.value);
                setBudgetRefused(false);
              }}
            />
          </>
        )}
      </Field>
      <Field
        id={"ai-editor-price"}
        field="unitCostMicrousd"
        label={t(row.unit === "call" ? "admin.ai.field.priceCall" : "admin.ai.field.priceMillion")}
        required
        gate={gate}
        blank={price.trim() === ""}
        refusal={gate.marks.find((mark) => mark.field === "unitCostMicrousd") ?? null}
        family={AI_FORM_REFUSALS}
        hint={<p className="text-xs text-muted-foreground">{t("admin.ai.field.priceHint")}</p>}
      >
        {(control) => (
          <>
            <Input
              {...control}
              data-testid="ai-editor-price"
              inputMode="decimal"
              className={controlClass(gate.marks.length > 0, false, "dialog")}
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </>
        )}
      </Field>
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
