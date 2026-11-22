import { useEffect, useState } from "react";
import {
  Share2,
  Send,
  MessageCircle,
  Facebook,
  Copy,
  QrCode,
  Download,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import {
  ActionRow,
  PanelBody,
  PanelHeader,
  PanelSubject,
} from "@/components/ui/dialog-parts-facade";
import { Picture } from "@/components/ui/picture";
import { useI18n } from "@/i18n";
import { safeHref } from "@/lib/safe-href";
import { fill } from "@/features/posting/refusal-text";
import { countShare, type ShareChannel } from "./count-view";

/** D201 §10 — the dialog's responsive frame is a bottom sheet on a phone (turn S6-1: the
 *  primitive's `phone="sheet"`, below md, with the grabber). */
export function ShareAd({
  publicId,
  canonicalPath,
  title,
  priceText,
  prominent = false,
  ink = "text-primary",
  open,
  onOpenChange,
}: {
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
}) {
  const { t } = useI18n();
  const callerHeld = open !== undefined && onOpenChange !== undefined;
  const [innerOpen, setInnerOpen] = useState(false);
  const shown = callerHeld ? open : innerOpen;
  const [url, setUrl] = useState("");
  const [canShare, setCanShare] = useState(false);
  const [qr, setQr] = useState(false);
  const [status, setStatus] = useState<"copied" | "failed" | null>(null);
  const changeOpen = (next: boolean) => {
    if (next) {
      setUrl(window.location.origin + canonicalPath);
      setCanShare(typeof navigator.share === "function");
      setQr(false);
      setStatus(null);
    }
    if (callerHeld) onOpenChange(next);
    else setInnerOpen(next);
  };
  // D224 — a caller-held open mounts the sheet already open, so the open-time
  // setup runs here as well as in changeOpen: the same either way it opens.
  useEffect(() => {
    if (!shown) return;
    setUrl(window.location.origin + canonicalPath);
    setCanShare(typeof navigator.share === "function");
    setQr(false);
    setStatus(null);
  }, [shown, canonicalPath]);
  const key = priceText === null ? "adPage.share.textNoPrice" : "adPage.share.text";
  const text = fill(t(key), { title, price: priceText ?? "", url });
  const textWithoutUrl = fill(t(key), { title, price: priceText ?? "", url: "" })
    .replace(/(?:፦|:)\s*$/, "")
    .trim();
  const telegram = safeHref(
    `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(textWithoutUrl)}`,
  );
  const whatsapp = safeHref(`https://wa.me/?text=${encodeURIComponent(text)}`);
  const facebook = safeHref(
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  );
  const qrFile = safeHref(`/l/${publicId}/qr.svg`);
  const count = (channel: ShareChannel) => void countShare(publicId, channel);
  const copy = async () => {
    count("copy");
    try {
      await navigator.clipboard.writeText(url);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
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
      <Dialog open={shown} onOpenChange={changeOpen}>
        <DialogContent bands phone="sheet">
          <PanelHeader icon={<Share2 />}>
            <DialogTitle>{t("adPage.share.title")}</DialogTitle>
            <DialogDescription>{t("adPage.share.description")}</DialogDescription>
          </PanelHeader>
          <PanelBody>
            <PanelSubject title={title} lines={priceText === null ? [] : [priceText]} />
            <div className="flex min-w-0 flex-col gap-1">
              {telegram !== null && (
                <ActionRow asChild icon={<Send />}>
                  <a
                    data-testid="listing-share-telegram"
                    href={telegram}
                    target="_blank"
                    rel="noopener"
                    onClick={() => count("telegram")}
                  >
                    {t("post.who.channel.telegram")}
                  </a>
                </ActionRow>
              )}
              {whatsapp !== null && (
                <ActionRow asChild icon={<MessageCircle />}>
                  <a
                    data-testid="listing-share-whatsapp"
                    href={whatsapp}
                    target="_blank"
                    rel="noopener"
                    onClick={() => count("whatsapp")}
                  >
                    {t("post.who.channel.whatsapp")}
                  </a>
                </ActionRow>
              )}
              {facebook !== null && (
                <ActionRow asChild icon={<Facebook />}>
                  <a
                    data-testid="listing-share-facebook"
                    href={facebook}
                    target="_blank"
                    rel="noopener"
                    onClick={() => count("facebook")}
                  >
                    {t("adPage.share.facebook")}
                  </a>
                </ActionRow>
              )}
              <ActionRow
                icon={<Copy />}
                data-testid="listing-share-copy"
                onClick={() => void copy()}
              >
                {t("adPage.share.copy")}
              </ActionRow>
              {status !== null && (
                <p
                  role="status"
                  data-testid="listing-share-status"
                  data-state={status}
                  className="text-sm text-muted-foreground"
                >
                  {t(status === "copied" ? "adPage.share.copied" : "adPage.share.copyFailed")}
                </p>
              )}
              <ActionRow
                icon={<QrCode />}
                data-testid="listing-share-qr"
                onClick={() => {
                  count("qr");
                  setQr(true);
                }}
              >
                {t("adPage.share.qr")}
              </ActionRow>
              {qr && (
                <div className="flex flex-col items-center gap-2 py-2">
                  <Picture
                    imgTestId="listing-share-qr-image"
                    src={`/l/${publicId}/qr.svg`}
                    fit="contain"
                    alt={t("adPage.share.qrHint")}
                    width={192}
                    height={192}
                    className="size-48"
                  />
                  <p className="text-sm text-muted-foreground">{t("adPage.share.qrHint")}</p>
                  {qrFile !== null && (
                    <Button asChild variant="ghost" className="min-h-11">
                      <a
                        data-testid="listing-share-qr-download"
                        href={qrFile}
                        download={`ethio-${publicId}-qr.svg`}
                      >
                        <Download aria-hidden="true" className="size-5" />
                        {t("adPage.share.download")}
                      </a>
                    </Button>
                  )}
                </div>
              )}
              {canShare && (
                <ActionRow
                  icon={<ExternalLink />}
                  data-testid="listing-share-more"
                  onClick={() => {
                    void navigator.share({ title, text: textWithoutUrl, url }).catch(() => {
                      /* dismissal is not a failed channel */
                    });
                  }}
                >
                  {t("adPage.share.more")}
                </ActionRow>
              )}
            </div>
          </PanelBody>
        </DialogContent>
      </Dialog>
    </>
  );
}
