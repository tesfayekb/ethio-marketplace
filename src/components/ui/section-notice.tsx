import { useCallback, useState } from "react";

import { ActionMessage } from "@/components/ui/action-message";
import { useI18n, type MessageKey } from "@/i18n";

/**
 * Foundations turn CI-2 (INC-995 follow-up) — A SECTION'S OWN OUTCOME MESSAGE, ONE MECHANISM.
 *
 * A console section that acts (allow, remove, resume…) says the outcome beside its own table
 * (INC-570, INC-995), never in a sibling's or the page's message. `useSectionNotice()` holds
 * the one message a section shows — a key and a tone, never a sentence — and `say(key, tone)`
 * replaces it; `<SectionNotice notice={…} testid="…" />` draws it through ActionMessage as a
 * persistent status region, so its first message is announced. A section never keeps its own
 * notice state: scripts/conformance/section-notices.test.ts (SNC-3) judges.
 */
export type SectionTone = "ok" | "error";
export type SectionNoticeState = { key: MessageKey; tone: SectionTone } | null;

export function useSectionNotice(): {
  notice: SectionNoticeState;
  say: (key: MessageKey, tone: SectionTone) => void;
} {
  const [notice, setNotice] = useState<SectionNoticeState>(null);
  const say = useCallback((key: MessageKey, tone: SectionTone) => setNotice({ key, tone }), []);
  return { notice, say };
}

export function SectionNotice({
  notice,
  testid,
}: {
  notice: SectionNoticeState;
  testid: string;
}) {
  const { t } = useI18n();
  const error = notice?.tone === "error";
  return (
    <ActionMessage
      persistent
      role="status"
      testid={testid}
      tone={error ? "error" : "done"}
      text={notice === null ? null : t(notice.key)}
      className={error ? undefined : "text-foreground"}
    />
  );
}
