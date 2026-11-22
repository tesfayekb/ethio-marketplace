import { Suspense, useState } from "react";
import { Share2 } from "lucide-react";
import { Spinner } from "@/components/brand/spinner";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n";
import { LazyShareAdDialog } from "./share-ad-dialog-lazy";

export type ShareAdProps = {
  publicId: string;
  canonicalPath: string;
  title: string;
  priceText: string | null;
  /** D218 — a primary opener after posting; existing ad-page callers stay ghost. */
  prominent?: boolean;
  /** Sage S5 — the ghost opener's ink: the ad page's accent (card-tier.ts adPageLookOf().ink). */
  ink?: string;
  /**
   * D224 — OPTIONAL caller-held open state (My listings' ⋯ menu). With both
   * given, ShareAd renders no opener button of its own; the open-time setup
   * runs the same whichever way it opens. Without them, exactly as before.
   */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

/** Only the opener rides in the page; all Share content arrives on its first opening. */
export function ShareAd({
  publicId,
  canonicalPath,
  title,
  priceText,
  prominent = false,
  ink = "text-primary",
  open,
  onOpenChange,
}: ShareAdProps) {
  const { t } = useI18n();
  const callerHeld = open !== undefined && onOpenChange !== undefined;
  const [innerOpen, setInnerOpen] = useState(false);
  const shown = callerHeld ? open : innerOpen;
  const changeOpen = (next: boolean) => {
    if (callerHeld) onOpenChange(next);
    else setInnerOpen(next);
  };
  return (
    <>
      {!callerHeld && (
        <Button
          variant={prominent ? "default" : "ghost"}
          className={
            prominent
              ? "h-auto min-h-11 gap-2 font-semibold"
              : `h-auto min-h-11 gap-2 px-0 font-semibold hover:bg-transparent ${ink}`
          }
          data-testid="listing-share-open"
          onClick={() => changeOpen(true)}
        >
          <Share2 className="size-5" aria-hidden="true" />
          {t("adPage.share.open")}
        </Button>
      )}
      {shown && (
        <Suspense fallback={<Spinner label={t("common.loading")} />}>
          <LazyShareAdDialog
            publicId={publicId}
            canonicalPath={canonicalPath}
            title={title}
            priceText={priceText}
            open={shown}
            onOpenChange={changeOpen}
          />
        </Suspense>
      )}
    </>
  );
}
