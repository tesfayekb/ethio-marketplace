import { useState } from "react";

import { FilterChoices } from "@/components/shell/filter-choices";
import { FormField } from "@/components/shell/form-section";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CategoryModal } from "@/features/admin-categories/category-dialogs";
import { levelNameOf } from "@/features/levels/level-fields";
import { useLevelRows } from "@/features/levels/use-level-rows";
import { useI18n, type MessageKey } from "@/i18n";

import { ReasonNote } from "./reason-note";
import { TIER_REASONS, tierDays, tierProblem } from "./tier-reasons";

/**
 * Turn T1 part B (D242, D276) — the dialog of staff's "Set level": one of the
 * enabled level rows (P-2 (c) c2a: the levels store, by their own names, in
 * their order) for one listing, with the reason (the door's list) and a
 * note (required when the reason is Other, at most 500 characters — the shared
 * block `ReasonNote`). It says what a tier does and how long it lasts. The door
 * decides (F3); its refusal is shown here and nothing closes on it (F4).
 * P-2 (b): the level's Days (blank = until staff change it; 1…3650; none on the
 * baseline), sent as the door's `p_days`.
 *
 * Testids: the dialog `listings-tier-dialog`, the tiers `listings-tier-pick`
 * (`listings-tier-pick-<tier>`), the reasons `listings-tier-reason-<reason>`,
 * the note `listings-tier-note`, the days `listings-tier-days` (its field
 * `listings-tier-days-field`), the problem line `listings-tier-problem`,
 * Cancel `listings-tier-cancel`, the change `listings-tier-confirm`.
 */

export interface TierDialogProps {
  /** The listing's tier now (null when the door answered none); the dialog refuses to send it unchanged. */
  current: string | null;
  busy: boolean;
  /** The door's refusal, already translated; null when there is none. */
  refusal: string | null;
  onCancel: () => void;
  /** `days` null is open-ended. */
  onConfirm: (tier: string, reason: string, note: string, days: number | null) => void;
}

const DAYS_PROBLEMS: ReadonlySet<MessageKey> = new Set([
  "admin.listings.level.error.days",
  "admin.listings.level.error.baselineDays",
]);

export function TierDialog({ current, busy, refusal, onCancel, onConfirm }: TierDialogProps) {
  const { t, language } = useI18n();
  const levels = useLevelRows({ looks: false });
  const [tier, setTier] = useState(current ?? "");
  const [reason, setReason] = useState("");
  const [note, setNote] = useState("");
  const [days, setDays] = useState("");
  const [problem, setProblem] = useState<MessageKey | null>(null);
  const daysRefused = problem !== null && DAYS_PROBLEMS.has(problem);

  return (
    <CategoryModal
      testid="listings-tier-dialog"
      openedBy="set-tier"
      title={t("admin.listings.level.title")}
      onClose={() => {
        if (!busy) onCancel();
      }}
    >
      <div className="min-w-0 space-y-3">
        <p className="text-sm text-muted-foreground">{t("admin.listings.level.hint")}</p>
        <FilterChoices
          testid="listings-tier-pick"
          label={t("admin.listings.filter.level")}
          value={tier}
          onChange={(value) => {
            setTier(value);
            setProblem(null);
          }}
          options={levels.rows.map((row) => ({
            value: row.key,
            label: levelNameOf(row, language) ?? t("admin.listings.level.unknown"),
          }))}
        />
        {levels.isLoading ? (
          <p data-testid="listings-tier-levels-loading" className="text-sm text-muted-foreground">
            {t("common.loading")}
          </p>
        ) : levels.error !== null ? (
          <p
            role="alert"
            data-testid="listings-tier-levels-error"
            className="text-sm text-destructive"
          >
            {t("common.error")}
          </p>
        ) : null}
        <FormField
          label={t("admin.listings.level.days")}
          htmlFor="listings-tier-days"
          help={t("admin.listings.level.daysHelp")}
          testid="listings-tier-days-field"
        >
          <Input
            id="listings-tier-days"
            data-testid="listings-tier-days"
            inputMode="numeric"
            value={days}
            maxLength={4}
            aria-invalid={daysRefused ? true : undefined}
            aria-describedby={daysRefused ? "listings-tier-problem" : undefined}
            onChange={(event) => {
              setDays(event.target.value);
              setProblem(null);
            }}
          />
        </FormField>
        <ReasonNote
          testid="listings-tier"
          reasons={TIER_REASONS}
          reason={reason}
          note={note}
          onReason={(value) => {
            setReason(value);
            setProblem(null);
          }}
          onNote={(value) => {
            setNote(value);
            setProblem(null);
          }}
        />
        {problem !== null || refusal !== null ? (
          <p
            role="alert"
            id="listings-tier-problem"
            data-testid="listings-tier-problem"
            className="text-sm text-destructive"
          >
            {problem !== null ? t(problem) : refusal}
          </p>
        ) : null}
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            size="touch"
            data-testid="listings-tier-cancel"
            disabled={busy}
            onClick={onCancel}
          >
            {t("common.cancel")}
          </Button>
          <Button
            type="button"
            size="touch"
            data-testid="listings-tier-confirm"
            disabled={busy || levels.isLoading || levels.error !== null}
            onClick={() => {
              const missing = tierProblem(tier, current, reason, note, days, levels.rows);
              const parsed = tierDays(days);
              if (missing !== null || parsed === undefined) {
                setProblem(missing ?? "admin.listings.level.error.days");
                return;
              }
              onConfirm(tier, reason, note.trim(), parsed);
            }}
          >
            {t("admin.listings.action.level")}
          </Button>
        </DialogFooter>
      </div>
    </CategoryModal>
  );
}

export default TierDialog;
