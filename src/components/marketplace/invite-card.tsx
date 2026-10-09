import { Link } from "@tanstack/react-router";
import { Megaphone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n";

/** D119 — the invitation for the chosen place (and, on a category page, its category). */
export interface Invite {
  placeId: string;
  placeName: string;
  categoryId: string | null;
  categoryName: string | null;
}

/** The sentence: the place alone on the home page; the category and the place on a category page. */
export function InviteText({ invite, className }: { invite: Invite; className: string }) {
  const { t } = useI18n();
  const text =
    invite.categoryName === null
      ? t("feed.invite.place").replace("{place}", invite.placeName)
      : t("feed.invite.placeCategory")
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
    <Button asChild className="min-h-11">
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

/** D119 — the card at the end of the chosen place's row, or first when it has none. */
export function InviteCard({ invite }: { invite: Invite }) {
  return (
    <div
      data-testid="feed-invite"
      data-place={invite.placeId}
      data-category={invite.categoryId ?? undefined}
      className="flex h-full min-h-56 flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-primary/30 bg-card p-6 text-center"
    >
      <span
        aria-hidden="true"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary"
      >
        <Megaphone className="h-6 w-6" />
      </span>
      <InviteText invite={invite} className="text-base font-semibold break-words text-foreground" />
      <InvitePostButton invite={invite} />
    </div>
  );
}
