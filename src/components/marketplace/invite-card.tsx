import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { InviteSpot } from "@/features/feed/feed-page";
import { useI18n } from "@/i18n";

/** D119 — the invitation for the chosen place (and, on a category page, its category). */
export interface Invite {
  placeId: string | null;
  placeName: string | null;
  categoryId: string | null;
  categoryName: string | null;
  /**
   * The chosen place's own listings shown, or, with no place chosen, all the
   * listings shown: none → "Be the first", some → "Advertise …".
   */
  placeCount: number;
}

/** The sentence: the place alone on the home page; the category and the place on a category page. */
export function InviteText({ invite, className }: { invite: Invite; className: string }) {
  const { t } = useI18n();
  // The operator, 2026-10-10: "Be the first" only where nobody has advertised yet.
  const first = invite.placeCount === 0;
  const placeName = invite.placeName;
  const text =
    placeName === null
      ? invite.categoryName === null
        ? t(first ? "feed.invite.none" : "feed.invite.noneMore")
        : t(first ? "feed.invite.noneCategory" : "feed.invite.noneCategoryMore").replace(
            "{category}",
            invite.categoryName,
          )
      : invite.categoryName === null
        ? t(first ? "feed.invite.place" : "feed.invite.placeMore").replace("{place}", placeName)
        : t(first ? "feed.invite.placeCategory" : "feed.invite.placeCategoryMore")
            .replace("{category}", invite.categoryName)
            .replace("{place}", placeName);
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
      className="h-auto min-h-11 rounded-sm px-2 text-xs font-semibold whitespace-normal md:rounded-md @min-[11rem]:px-4 @min-[11rem]:text-sm"
    >
      <Link
        to="/post"
        search={{
          ...(invite.categoryId === null ? {} : { category: invite.categoryId }),
          ...(invite.placeId === null ? {} : { place: invite.placeId }),
        }}
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
 * Sage S4 (spec §9; ruling 4) — the warm fill (`invite`; in dark mode Premium's
 * fill), the card's lift, a raised star disc and a raised button; the sentence
 * in the display face, 12 px on a phone, 13 on a compact tablet card, 18 wider.
 */
export function InviteCard({ invite, at }: { invite: Invite; at: InviteSpot }) {
  // The operator, 2026-10-10: one card among the others, never a wider one; below
  // 11rem (three or four a row) it is compact, as the listing card is.
  // Bundle 11 V2b (the operator, 2026-10-11: every card one size) — never a
  // taller one either: it fills its cell and fits a listing card's height (a
  // smaller star; the sentence held to six lines on a compact card, four on a
  // wider one — the whole sentence stays in the page for a screen reader).
  return (
    <div
      data-testid="feed-invite"
      data-at={at}
      data-place={invite.placeId ?? undefined}
      data-category={invite.categoryId ?? undefined}
      className="@container h-full"
    >
      <div
        data-testid="feed-invite-surface"
        className="flex h-full flex-col items-center justify-center gap-1 overflow-hidden rounded-card border-2 border-gold bg-invite p-2 text-center shadow-card @min-[11rem]:gap-3 @min-[11rem]:p-4"
      >
        <span
          aria-hidden="true"
          data-testid="feed-invite-star"
          className="flex size-6 shrink-0 items-center justify-center rounded-full bg-gold text-gold-foreground shadow-badge md:@max-[11rem]:size-9 @min-[11rem]:size-[46px]"
        >
          <Star className="size-3 md:@max-[11rem]:size-5 @min-[11rem]:size-6" fill="currentColor" />
        </span>
        <InviteText
          invite={invite}
          className="line-clamp-6 text-xs leading-[14px] font-semibold break-words text-foreground md:@max-[11rem]:text-[13px] md:@max-[11rem]:leading-4 @min-[11rem]:line-clamp-4 @min-[11rem]:font-display @min-[11rem]:text-lg @min-[11rem]:leading-6 @min-[11rem]:font-bold"
        />
        <InvitePostButton invite={invite} />
      </div>
    </div>
  );
}
