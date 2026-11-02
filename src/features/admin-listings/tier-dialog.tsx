import { useState } from "react";

import { FilterChoices } from "@/components/shell/filter-choices";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { CategoryModal } from "@/features/admin-categories/category-dialogs";
import { useI18n, type MessageKey } from "@/i18n";

import { ReasonNote } from "./reason-note";
import { TIER_LABEL, TIER_REASONS, TIERS, tierProblem } from "./tier-reasons";

/**
 * Turn T1 part B (D242, D276) — the dialog of staff's "Set tier": Premium,
 * Featured or Regular for one listing, with the reason (the door's list) and a
 * note (required when the reason is Other, at most 500 characters — the shared
 * block `ReasonNote`). It says what a tier does and how long it lasts. The door
 * decides (F3); its refusal is shown here and nothing closes on it (F4).
 *
 * Testids: the dialog `listings-tier-dialog`, the tiers `listings-tier-pick`
 * (`listings-tier-pick-<tier>`), the reasons `listings-tier-reason-<reason>`,
 * the note `listings-tier-note`, the problem line `listings-tier-problem`,
 * Cancel `listings-tier-cancel`, the change `listings-tier-confirm`.
 */

export interface TierDialogProps {
  /** The listing's tier now; the dialog opens on it and refuses to send it unchanged. */
  current: string;
  busy: boolean;
  /** The door's refusal, already translated; null when there is none. */
  refusal: string | null;
  onCancel: () => void;
  onConfirm: (tier: string, reason: string, note: string) => void;
}

export function TierDialog({ current, busy, refusal, onCancel, onConfirm }: TierDialogProps) {
  const { t } = useI18n();
  const [tier, setTier] = useState(current);
  const [reason, setReason] = useState("");
  const [note, setNote] = useState("");
  const [problem, setProblem] = useState<MessageKey | null>(null);

  return (
    <CategoryModal
      testid="listings-tier-dialog"
      openedBy="set-tier"
      title={t("admin.listings.tier.title")}
      onClose={() => {
        if (!busy) onCancel();
      }}
    >
      <div className="min-w-0 space-y-3">
        <p className="text-sm text-muted-foreground">{t("admin.listings.tier.hint")}</p>
        <FilterChoices
          testid="listings-tier-pick"
          label={t("admin.listings.filter.tier")}
          value={tier}
          onChange={(value) => {
            setTier(value);
            setProblem(null);
          }}
          options={TIERS.map((value) => ({ value, label: t(TIER_LABEL[value]) }))}
        />
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
          <p role="alert" data-testid="listings-tier-problem" className="text-sm text-destructive">
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
            disabled={busy}
            onClick={() => {
              const missing = tierProblem(tier, current, reason, note);
              if (missing !== null) {
                setProblem(missing);
                return;
              }
              onConfirm(tier, reason, note.trim());
            }}
          >
            {t("admin.listings.action.tier")}
          </Button>
        </DialogFooter>
      </div>
    </CategoryModal>
  );
}

export default TierDialog;
