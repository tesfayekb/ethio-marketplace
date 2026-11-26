import { CARD_SURFACE } from "@/components/layout/surface";
import { NOTICE_DOCK_SURFACE } from "@/components/shell/notice-dock";
import { useOfflinePaused } from "@/components/shell/use-offline-paused";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

/**
 * INC-1286 — THE SHELL SAYS OFFLINE ONCE. While the device is offline and a read waits for it
 * (use-offline-paused.ts), the notice dock carries the one line (`shell.offline`): what you open
 * will load when you are back, and it does so by itself. It sits inside the dock's live region
 * (on-demand-notice.tsx), above that notice, and carries no role of its own. While a dialog is
 * open the dock's own line is not drawn (the dialog's outlet carries the download notice only).
 */
export function OfflineLine() {
  const { t } = useI18n();
  const waiting = useOfflinePaused();
  if (!waiting) return null;
  return (
    <div
      data-testid="shell-offline"
      className={cn(
        CARD_SURFACE,
        "pointer-events-auto flex max-w-md items-center gap-3 px-3 py-2 text-sm text-foreground",
        NOTICE_DOCK_SURFACE,
        "max-md:w-full",
      )}
    >
      <span>{t("shell.offline")}</span>
    </div>
  );
}
