import { ActionMessage } from "@/components/ui/action-message";
import { type SectionNoticeState } from "@/components/ui/section-notice-state";
import { useI18n } from "@/i18n";

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
export function SectionNotice({ notice, testid }: { notice: SectionNoticeState; testid: string }) {
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
