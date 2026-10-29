import { useI18n } from "@/i18n";

/**
 * N1b-2c (INC-977) — THE OWNER'S NOTICE that their seller name is held for review.
 *
 * Placed beside the seller line on every surface where the owner sees their own
 * name: the account overview, the posting review step, my listing page and the
 * owner's own ad page. A line and its help text, in the text-only form the app
 * already uses for a short status note (my-listing-info); the app has no boxed
 * status-note primitive, so none is styled here. Draws nothing unless held.
 */
export function SellerReviewNotice({
  underReview,
  testId,
}: {
  underReview: boolean;
  testId: string;
}) {
  const { t } = useI18n();
  if (!underReview) return null;
  return (
    <div role="status" className="space-y-1" data-testid={testId}>
      <p className="text-sm font-medium text-foreground">{t("post.seller.underReview")}</p>
      <p className="text-xs text-muted-foreground">{t("post.seller.underReviewHelp")}</p>
    </div>
  );
}
