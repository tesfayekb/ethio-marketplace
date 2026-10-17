import { useInfiniteQuery, useQueryClient, type InfiniteData } from "@tanstack/react-query";
import { useState } from "react";
import { PageShell } from "@/components/layout/page-shell";
import { PageHeader } from "@/components/layout/page-header";
import { ListingCard } from "@/components/marketplace/listing-card";
import { Button } from "@/components/ui/button";
import { mySaved, unsaveListing } from "@/features/ad-page/save";
import { useCardPhotos } from "@/features/feed/use-card-photos";
import { useI18n } from "@/i18n";

type SavedPageData = Awaited<ReturnType<typeof mySaved>>;
const KEY = ["my-saved-listings"] as const;

export function SavedPage() {
  const { t } = useI18n();
  const queryClient = useQueryClient();
  const [busy, setBusy] = useState<ReadonlySet<string>>(new Set());
  const [failed, setFailed] = useState<ReadonlySet<string>>(new Set());
  const query = useInfiniteQuery({
    queryKey: KEY,
    initialPageParam: null as unknown | null,
    queryFn: ({ pageParam }) => mySaved(pageParam, 20),
    getNextPageParam: (page) => page.next ?? undefined,
    retry: false,
  });
  const cards = query.data?.pages.flatMap((page) => page.cards) ?? [];
  const availableCards = cards.filter((card) => card.available);
  const coverOf = useCardPhotos(availableCards);
  const remove = async (id: string, publicId: string | null) => {
    if (busy.has(id)) return;
    setBusy((current) => new Set(current).add(id));
    setFailed((current) => {
      const next = new Set(current);
      next.delete(id);
      return next;
    });
    try {
      if (publicId === null) {
        setFailed((current) => new Set(current).add(id));
        return;
      }
      const answer = await unsaveListing(publicId);
      if (!answer.ok) {
        setFailed((current) => new Set(current).add(id));
        return;
      }
      queryClient.setQueryData<InfiniteData<SavedPageData>>(KEY, (current) =>
        current
          ? {
              ...current,
              pages: current.pages.map((page) => ({
                ...page,
                cards: page.cards.filter((card) => card.id !== id),
              })),
            }
          : current,
      );
    } finally {
      setBusy((current) => {
        const next = new Set(current);
        next.delete(id);
        return next;
      });
    }
  };
  return (
    <PageShell as="main" width="wide" data-testid="saved-page">
      <PageHeader title={t("nav.saved")} />
      {query.isPending && (
        <p role="status" className="mt-4 text-sm text-muted-foreground">
          {t("common.loading")}
        </p>
      )}
      {query.isError && (
        <p role="alert" data-testid="saved-failed" className="mt-4 text-sm text-destructive">
          {t("account.saved.failed")}
        </p>
      )}
      {query.isSuccess && cards.length === 0 && (
        <p data-testid="saved-empty" className="mt-4 text-sm text-muted-foreground">
          {t("account.saved.empty")}
        </p>
      )}
      <ul className="mt-4 grid auto-rows-fr grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-4 lg:grid-cols-5">
        {cards.map((card) => (
          <li
            key={card.id}
            data-testid="saved-item"
            data-public-id={card.publicId}
            data-available={String(card.available)}
            className="flex min-w-0 flex-col gap-2"
          >
            <div className="flex-1">
              {card.available ? (
                <ListingCard listing={card} photoUrl={coverOf(card.coverPhotoId)} />
              ) : (
                <div
                  data-testid="saved-unavailable"
                  className="flex h-full min-h-64 items-center justify-center rounded-md bg-muted p-4 text-center text-muted-foreground"
                >
                  {t("account.saved.unavailable")}
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="min-h-11 self-start text-destructive"
              data-testid="saved-remove"
              disabled={busy.has(card.id)}
              onClick={() => void remove(card.id, card.publicId)}
            >
              {t("account.saved.remove")}
            </Button>
            {failed.has(card.id) && (
              <p role="status" data-testid="saved-failed" className="text-sm text-destructive">
                {t("account.saved.failed")}
              </p>
            )}
          </li>
        ))}
      </ul>
      {query.hasNextPage && (
        <Button
          className="mt-4 min-h-11"
          data-testid="saved-more"
          disabled={query.isFetchingNextPage}
          onClick={() => void query.fetchNextPage()}
        >
          {t("account.saved.more")}
        </Button>
      )}
    </PageShell>
  );
}
