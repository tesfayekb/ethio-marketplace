import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { CARD_SURFACE } from "@/components/layout/surface";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n";
import { refreshPage, useOnDemandFailures } from "@/lib/on-demand-failure";
import { useTopNoticeOutlet } from "@/lib/notice-outlets";
import { cn } from "@/lib/utils";

/**
 * INC-911 — the shell's one notice for a piece of the page whose code did not download
 * (src/lib/on-demand-failure.ts): it says so and offers to refresh the page, the only cure
 * (the browser keeps a failed download for the page's life). It shows from the first failure
 * until the person closes it or refreshes; a later failure shows it again. Drawn above the
 * phone's bottom bar; a polite live region, so a screen reader hears it once. The region is
 * there from the first paint (a live region must exist before its words arrive) and carries no
 * role: an empty role="status" on every page answered a page's own getByRole("status") too
 * (the reset screen's R-2 and R-4, CI on turn 34b-2's landing). INC-955 — while a dialog, sheet,
 * drawer or alert is open, the notice is drawn inside the topmost one's NoticeOutlet
 * (src/lib/notice-outlets.ts), where the person can see, reach and tap it; the shell's
 * own region stays, empty, for when the overlay closes.
 */
export function OnDemandNotice() {
  const { t } = useI18n();
  const failures = useOnDemandFailures();
  const [closedAt, setClosedAt] = useState(0);
  useEffect(() => {
    if (failures === 0) setClosedAt(0);
  }, [failures]);
  const outlet = useTopNoticeOutlet();
  const notice =
    failures > closedAt ? (
      <div
        data-testid="on-demand-failed"
        className={cn(
          CARD_SURFACE,
          "pointer-events-auto flex max-w-md items-center gap-3 px-3 py-2 text-sm text-foreground",
        )}
      >
        <span>{t("common.loadFailed")}</span>
        <Button
          variant="link"
          size="touch"
          data-testid="on-demand-refresh"
          className="shrink-0 px-2"
          onClick={refreshPage}
        >
          {t("common.refreshPage")}
        </Button>
        <Button
          variant="ghost"
          size="touch"
          data-testid="on-demand-close"
          aria-label={t("common.close")}
          className="w-11 shrink-0 p-0"
          onClick={() => setClosedAt(failures)}
        >
          <X aria-hidden="true" />
        </Button>
      </div>
    ) : null;
  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-[calc(var(--bottom-bar)+var(--bar-rise)+0.5rem)] z-50 flex justify-center px-4 md:bottom-6"
    >
      {notice !== null && outlet !== null ? createPortal(notice, outlet) : notice}
    </div>
  );
}

/**
 * INC-911 — the same words and the same cure IN PLACE, for a piece whose own place has room to say
 * so (the calendar, the pin map, a page's strings): what the shell's notice says, and a Refresh
 * button. A piece that says so here does not also report to the shell's notice.
 */
export function LoadFailedHere({
  testid,
  refreshTestid,
  className,
}: {
  testid: string;
  refreshTestid: string;
  className?: string;
}) {
  const { t } = useI18n();
  return (
    <div
      role="alert"
      data-testid={testid}
      className={cn(
        "flex flex-col items-center gap-2 text-center text-sm text-muted-foreground",
        className,
      )}
    >
      <span>{t("common.loadFailed")}</span>
      <Button
        type="button"
        variant="outline"
        size="touch"
        data-testid={refreshTestid}
        onClick={refreshPage}
      >
        {t("common.refreshPage")}
      </Button>
    </div>
  );
}
