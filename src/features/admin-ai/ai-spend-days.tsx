import { useId, useState } from "react";

import { PageCard } from "@/components/shell/page-card";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n";

import {
  AI_FEATURE_ORDER,
  countText,
  featureLabelKey,
  spendByDay,
  spendText,
  SPEND_DAYS,
} from "./ai-service";
import { useAiSpendDays } from "./use-ai-features";

/**
 * Bundle 13 turn 14 (the operator, 2026-10-14: "so we can see daily charges with
 * ability to turn on or off the feature") — SPEND BY DAY, under the features.
 *
 * One read (`admin_ai_spend_days`, services:view, the last 30 UTC days): every
 * feature's calls and cost per day, as the server counted them at each feature's
 * price — the same count the month's spend and the budgets use. A picker shows
 * all the features together or one of them; the days with no call are left
 * out; the total of the shown days closes the list. The switch stays in the
 * row's Edit, above.
 */
export function AiSpendDays() {
  const { t } = useI18n();
  const query = useAiSpendDays();
  const [feature, setFeature] = useState("");
  const pickerId = useId();
  const nameOf = (id: string) => {
    const key = featureLabelKey(id);
    return key === null ? id : t(key);
  };
  const days = spendByDay(query.data ?? [], feature === "" ? null : feature);
  const totalCalls = days.reduce((sum, line) => sum + line.calls, 0);
  const totalCost = days.reduce((sum, line) => sum + line.costMicrousd, 0);

  return (
    <PageCard testid="ai-days" className="min-w-0 space-y-3">
      <div className="space-y-1">
        <h2 className="text-sm font-semibold text-foreground">{t("admin.ai.days.title")}</h2>
        <p className="text-xs text-muted-foreground">
          {t("admin.ai.days.hint").replace("{days}", String(SPEND_DAYS))}
        </p>
      </div>

      <div className="flex min-w-0 flex-wrap items-center gap-2">
        <label htmlFor={pickerId} className="text-sm text-foreground">
          {t("admin.ai.col.feature")}
        </label>
        <select
          id={pickerId}
          data-testid="ai-days-feature"
          className="h-11 min-w-0 max-w-full rounded-md border border-input bg-background px-3 text-sm text-foreground"
          value={feature}
          onChange={(event) => setFeature(event.target.value)}
        >
          <option value="">{t("admin.ai.days.all")}</option>
          {AI_FEATURE_ORDER.map((id) => (
            <option key={id} value={id}>
              {nameOf(id)}
            </option>
          ))}
        </select>
      </div>

      {query.isLoading ? <p className="text-sm">{t("common.loading")}</p> : null}
      {query.error ? (
        <div className="flex flex-wrap items-center gap-2">
          <p role="alert" className="text-sm text-destructive">
            {t("admin.ai.days.error")}
          </p>
          <Button type="button" variant="outline" size="touch" onClick={() => void query.refetch()}>
            {t("common.retry")}
          </Button>
        </div>
      ) : null}
      {!query.isLoading && !query.error && days.length === 0 ? (
        <p className="text-sm text-muted-foreground" data-testid="ai-days-empty">
          {t("admin.ai.days.empty").replace("{days}", String(SPEND_DAYS))}
        </p>
      ) : null}

      {days.length > 0 ? (
        <>
          <table className="w-full min-w-0 text-sm" data-testid="ai-days-table">
            <thead>
              <tr className="border-b border-border text-start text-xs text-muted-foreground">
                <th scope="col" className="py-2 pe-2 text-start font-medium">
                  {t("admin.ai.days.day")}
                </th>
                <th scope="col" className="py-2 pe-2 text-end font-medium">
                  {t("admin.ai.col.calls")}
                </th>
                <th scope="col" className="py-2 text-end font-medium">
                  {t("admin.ai.days.spend")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {days.map((line) => (
                <tr key={line.day} data-testid="ai-days-row" data-day={line.day}>
                  <td className="py-2 pe-2 tabular-nums">{line.day}</td>
                  <td className="py-2 pe-2 text-end tabular-nums" data-testid="ai-days-calls">
                    {countText(line.calls)}
                  </td>
                  <td className="py-2 text-end tabular-nums" data-testid="ai-days-cost">
                    {spendText(line.costMicrousd)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-sm font-medium tabular-nums" data-testid="ai-days-total">
            {t("admin.ai.days.total")
              .replace("{days}", String(SPEND_DAYS))
              .replace("{spend}", spendText(totalCost))
              .replace("{calls}", countText(totalCalls))}
          </p>
        </>
      ) : null}
    </PageCard>
  );
}

export default AiSpendDays;
