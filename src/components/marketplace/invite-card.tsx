import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n";

/** D119 — the invitation for the chosen place (and, on a category page, its category). */
export interface Invite {
  placeId: string;
  placeName: string;
  categoryId: string | null;
  categoryName: string | null;
  /** How many of the place's own listings are shown: none → "Be the first", some → "… too". */
  placeCount: number;
}

/** The sentence: the place alone on the home page; the category and the place on a category page. */
export function InviteText({ invite, className }: { invite: Invite; className: string }) {
  const { t } = useI18n();
  // The operator, 2026-10-10: "Be the first" only where nobody has advertised yet.
  const first = invite.placeCount === 0;
  const text =
    invite.categoryName === null
      ? t(first ? "feed.invite.place" : "feed.invite.placeToo").replace("{place}", invite.placeName)
      : t(first ? "feed.invite.placeCategory" : "feed.invite.placeCategoryToo")
          .replace("{category}", invite.categoryName)
          .replace("{place}", invite.placeName);
  return (
    <p data-testid="feed-invite-text" className={className}>
      {text}
    </p>
  );
}

/** The one action: Post listing, with the place (and category) carried in the address. */
export function InvitePostButton({ invite }: { invite: Invite }) {
  const { t } = useI18n();
  return (
    <Button
      asChild
      className="h-auto min-h-11 px-2 text-xs whitespace-normal @min-[11rem]:px-4 @min-[11rem]:text-sm"
    >
      <Link
        to="/post"
        search={
          invite.categoryId === null
            ? { place: invite.placeId }
            : { category: invite.categoryId, place: invite.placeId }
        }
        data-testid="feed-invite-post"
      >
        {t("nav.postListing")}
      </Link>
    </Button>
  );
}

/**
 * D119 — the card at the end of the chosen place's row, or first when it has none.
 * DEC-169 — it stands out in gold, the token's third placement (the operator's
 * choice of 2026-10-09): a gold border and tint, a star, the green button.
 */
export function InviteCard({ invite }: { invite: Invite }) {
  // The operator, 2026-10-10: one card among the others, never a wider one; below
  // 11rem (three or four a row) it is compact, as the listing card is.
  return (
    <div
      data-testid="feed-invite"
      data-place={invite.placeId}
      data-category={invite.categoryId ?? undefined}
      className="@container h-full"
    >
      <div className="flex h-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-gold bg-gold/15 p-2 text-center @min-[11rem]:min-h-56 @min-[11rem]:gap-4 @min-[11rem]:p-6">
        <span
          aria-hidden="true"
          className="flex h-7 w-7 items-center justify-center rounded-full bg-gold text-gold-foreground @min-[11rem]:h-12 @min-[11rem]:w-12"
        >
          <Star className="h-4 w-4 @min-[11rem]:h-6 @min-[11rem]:w-6" fill="currentColor" />
        </span>
        <InviteText
          invite={invite}
          className="text-xs font-semibold break-words text-foreground @min-[11rem]:text-base"
        />
        <InvitePostButton invite={invite} />
      </div>
    </div>
  );
}
