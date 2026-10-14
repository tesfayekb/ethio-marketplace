import { useState } from "react";

import { CategoryModal } from "@/features/admin-categories/category-dialogs";
import { stepUpAbortKey } from "@/features/auth/mfa/mfa-service";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { useI18n, type MessageKey } from "@/i18n";

import { AiFeatureForm } from "./ai-feature-form";
import {
  aiErrorKey,
  type AiFeatureRow,
  type AiRefusal,
  type SetAiFeatureInput,
} from "./ai-service";
import { useSetAiFeature } from "./use-ai-features";

/**
 * Bundle 13 turn 5 (D158) — THE FEATURE EDITOR: the form, the door and the
 * second factor. Every save runs through the page's step-up `guard`; the door
 * re-checks `services:manage` and the step-up itself (F3), and its refusal is a
 * translated sentence naming it, never a silent no-op (F4). Nothing closes on
 * failure.
 */
export function AiEditorDialog({
  row,
  name,
  guard,
  openedBy,
  onClose,
}: {
  row: AiFeatureRow;
  name: string;
  guard: GuardFn;
  openedBy: string;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const save = useSetAiFeature();
  const [refusal, setRefusal] = useState<AiRefusal | null>(null);

  const fail = (error: unknown) => {
    const abort = stepUpAbortKey(error);
    if (abort !== undefined) {
      setRefusal(abort === null ? null : { key: abort as MessageKey, raw: null });
      return;
    }
    setRefusal(aiErrorKey(error instanceof Error ? error.message : String(error ?? "")));
  };

  const submit = (input: SetAiFeatureInput) => {
    setRefusal(null);
    void guard(async () => {
      try {
        await save.mutateAsync(input);
        onClose();
      } catch (error) {
        fail(error);
      }
    }).catch(fail);
  };

  return (
    <CategoryModal
      testid="ai-editor"
      openedBy={openedBy}
      title={t("admin.ai.edit.title")}
      onClose={onClose}
    >
      <AiFeatureForm
        row={row}
        name={name}
        busy={save.isPending}
        refusal={refusal}
        onCancel={onClose}
        onSave={submit}
      />
    </CategoryModal>
  );
}

export default AiEditorDialog;
