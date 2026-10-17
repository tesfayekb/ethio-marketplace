import { useState } from "react";
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
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useI18n } from "@/i18n";
import { fill } from "@/features/posting/refusal-text";
import { countShare, type ShareChannel } from "./count-view";
import { priceLine, type PriceLineInput } from "@/features/posting/price-line";
import type { MessageKey } from "@/i18n";

/**
 * D201 §10 — the share sheet's price line, one rule for the buyer's page and
 * the seller's own ad page: no amount, or a contact or free price, means no
 * price in the share text; otherwise the ad's price line.
 */
export function sharePriceText(
  price: PriceLineInput,
  t: (key: MessageKey) => string,
  language: string,
): string | null {
  if (price.amount === null || price.mode === "contact" || price.mode === "free") return null;
  return priceLine(price, t, t("price.contact"), language);
}

/** D201 §10 — the dialog's responsive frame is a bottom sheet below sm. */
export function ShareAd({
  publicId,
  canonicalPath,
  title,
  priceText,
}: {
  publicId: string;
  canonicalPath: string;
  title: string;
  priceText: string | null;
}) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
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
    setOpen(next);
  };
  const key = priceText === null ? "adPage.share.textNoPrice" : "adPage.share.text";
  const text = fill(t(key), { title, price: priceText ?? "", url });
  const textWithoutUrl = fill(t(key), { title, price: priceText ?? "", url: "" })
    .replace(/(?:፦|:)\s*$/, "")
    .trim();
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
  const row = "min-h-11 w-full justify-start gap-3 whitespace-normal text-start";
  return (
    <>
      <Button
        variant="ghost"
        className="h-11 w-11 shrink-0 rounded-full bg-background/90 p-0 text-foreground shadow-sm"
        data-testid="listing-share-open"
        aria-label={t("adPage.share.open")}
        onClick={() => changeOpen(true)}
      >
        <Share2 className="size-5" aria-hidden="true" />
      </Button>
      <Dialog open={open} onOpenChange={changeOpen}>
        <DialogContent
          aria-describedby={undefined}
          className="inset-x-0 bottom-0 top-auto grid max-h-[85dvh] w-full max-w-none translate-x-0 translate-y-0 overflow-y-auto rounded-t-md sm:inset-x-auto sm:bottom-auto sm:start-1/2 sm:top-1/2 sm:max-w-lg sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-md"
        >
          <DialogTitle>{t("adPage.share.title")}</DialogTitle>
          <div className="flex min-w-0 flex-col gap-1">
            <Button asChild variant="ghost" className={row}>
              <a
                data-testid="listing-share-telegram"
                href={`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(textWithoutUrl)}`}
                target="_blank"
                rel="noopener"
                onClick={() => count("telegram")}
              >
                <Send aria-hidden="true" className="size-5 shrink-0" />
                {t("post.who.channel.telegram")}
              </a>
            </Button>
            <Button asChild variant="ghost" className={row}>
              <a
                data-testid="listing-share-whatsapp"
                href={`https://wa.me/?text=${encodeURIComponent(text)}`}
                target="_blank"
                rel="noopener"
                onClick={() => count("whatsapp")}
              >
                <MessageCircle aria-hidden="true" className="size-5 shrink-0" />
                {t("post.who.channel.whatsapp")}
              </a>
            </Button>
            <Button asChild variant="ghost" className={row}>
              <a
                data-testid="listing-share-facebook"
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
                target="_blank"
                rel="noopener"
                onClick={() => count("facebook")}
              >
                <Facebook aria-hidden="true" className="size-5 shrink-0" />
                {t("adPage.share.facebook")}
              </a>
            </Button>
            <Button
              variant="ghost"
              className={row}
              data-testid="listing-share-copy"
              onClick={() => void copy()}
            >
              <Copy aria-hidden="true" className="size-5 shrink-0" />
              {t("adPage.share.copy")}
            </Button>
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
            <Button
              variant="ghost"
              className={row}
              data-testid="listing-share-qr"
              onClick={() => {
                count("qr");
                setQr(true);
              }}
            >
              <QrCode aria-hidden="true" className="size-5 shrink-0" />
              {t("adPage.share.qr")}
            </Button>
            {qr && (
              <div className="flex flex-col items-center gap-2 py-2">
                <img
                  data-testid="listing-share-qr-image"
                  src={`/l/${publicId}/qr.svg`}
                  alt={t("adPage.share.qrHint")}
                  width={192}
                  height={192}
                />
                <p className="text-sm text-muted-foreground">{t("adPage.share.qrHint")}</p>
                <Button asChild variant="ghost" className="min-h-11">
                  <a
                    data-testid="listing-share-qr-download"
                    href={`/l/${publicId}/qr.svg`}
                    download={`ethio-${publicId}-qr.svg`}
                  >
                    <Download aria-hidden="true" className="size-5" />
                    {t("adPage.share.download")}
                  </a>
                </Button>
              </div>
            )}
            {canShare && (
              <Button
                variant="ghost"
                className={row}
                data-testid="listing-share-more"
                onClick={() => {
                  void navigator.share({ title, text: textWithoutUrl, url }).catch(() => {
                    /* dismissal is not a failed channel */
                  });
                }}
              >
                <ExternalLink aria-hidden="true" className="size-5 shrink-0" />
                {t("adPage.share.more")}
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
