import { useCallback, useState } from "react";

import { type MessageKey } from "@/i18n";

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
