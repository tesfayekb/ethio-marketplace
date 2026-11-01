import { useEffect, useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n";
import { CertifyBlock } from "./certify-block";
import { CERTIFY_LOADING, certifyAllows, certifyArgs, type CertifyState } from "./certify-refusal";

/**
 * Bundle 22 turn 4 — the Renew confirmation with the publishing statement (L1 v2 item 4). Mounted when the
 * seller taps Renew: while the statements are read nothing shows; when none applies the action runs at once,
 * as before this turn; when statements apply the dialog shows them with the one tick. Turn 32 (D231): the
 * confirm is drawn closed until the tick, never disabled for it; a tap while closed marks the tick refused.
 */
export function CertifyConfirm({
  listingId,
  title,
  yes,
  onCancel,
  onConfirm,
}: {
  listingId: string;
  title: string;
  yes: string;
  onCancel: () => void;
  onConfirm: (certification: { certified: string[]; language: string } | undefined) => void;
}) {
  const { t, language } = useI18n();
  const [certify, setCertify] = useState<CertifyState>(CERTIFY_LOADING);
  const [tried, setTried] = useState(0);
  const ran = useRef(false);
  const confirm = useRef(onConfirm);
  confirm.current = onConfirm;
  const none = certify.state === "none";
  useEffect(() => {
    if (!none || ran.current) return;
    ran.current = true;
    confirm.current(undefined);
  }, [none]);
  // Once statements (or a load error) show, the dialog stays open until the seller closes it.
  const [shown, setShown] = useState(false);
  const answered = certify.state === "ready" || certify.state === "error";
  useEffect(() => {
    if (answered) setShown(true);
  }, [answered]);
  return (
    <>
      {shown ? null : (
        <div hidden>
          <CertifyBlock listingId={listingId} onChange={setCertify} />
        </div>
      )}
      <AlertDialog
        open={shown}
        onOpenChange={(open) => {
          if (!open) onCancel();
        }}
      >
        {shown ? (
          <AlertDialogContent data-testid="certify-confirm">
            <AlertDialogHeader>
              <AlertDialogTitle>{title}</AlertDialogTitle>
              <AlertDialogDescription className="sr-only">{title}</AlertDialogDescription>
            </AlertDialogHeader>
            <div className="max-h-[60vh] overflow-y-auto">
              <CertifyBlock listingId={listingId} onChange={setCertify} tried={tried} />
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel data-testid="certify-confirm-cancel">
                {t("common.cancel")}
              </AlertDialogCancel>
              <Button
                type="button"
                className="min-h-11 data-[closed=1]:border data-[closed=1]:border-input data-[closed=1]:bg-secondary data-[closed=1]:text-secondary-foreground data-[closed=1]:hover:bg-secondary/80"
                data-testid="certify-confirm-yes"
                disabled={certify.state === "loading"}
                data-closed={certify.state === "ready" && !certify.ticked ? "1" : undefined}
                onClick={() => {
                  if (!certifyAllows(certify)) {
                    if (certify.state === "ready") setTried((n) => n + 1);
                    return;
                  }
                  if (ran.current) return;
                  ran.current = true;
                  onConfirm(certifyArgs(certify, language));
                }}
              >
                {yes}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        ) : null}
      </AlertDialog>
    </>
  );
}
