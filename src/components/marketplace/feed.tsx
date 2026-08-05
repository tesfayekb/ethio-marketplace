import { useShell } from "@/components/app-shell";
import { WovenMark } from "@/components/brand/logo";
import { Spinner } from "@/components/brand/spinner";
import { ListingCard } from "@/components/marketplace/listing-card";
import { Button } from "@/components/ui/button";
import { useFeed } from "@/features/feed/use-feed";
import { useI18n } from "@/i18n";

/** The Marketplace body: the ranked feed, narrowed by the rail's category. */
export function Feed() {
  const { t } = useI18n();
  const { selectedCategoryId, locationPath } = useShell();
  // The two axes travel together: category (applied) x area (accepted, stubbed).
  const { listings, isLoading, error, retry } = useFeed({
    categoryId: selectedCategoryId,
    locationNodeId: locationPath[locationPath.length - 1]?.id ?? null,
  });

  return (
    // INC-044: the body column is centred with EQUAL left/right gutters — the
    // container carries symmetric auto margins, so the empty-state card sits in
    // the middle of the available space at every width instead of hugging the
    // rail edge.
    <section data-testid="feed-container" className="mx-auto w-full max-w-6xl">
      <h1 className="text-xl font-semibold text-foreground">

        {t("feed.heading").replace("{location}", t("feed.scopeAll"))}
      </h1>

      <div className="mt-4">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Spinner label={t("feed.loading")} />
          </div>
        ) : (
          <>
            {/* Law F4: a soft failure stays VISIBLE — contained to this panel,
                never thrown to the shell. */}
            {error ? (
              <div
                role="alert"
                className="mb-4 rounded-lg border border-border bg-card p-6 text-center"
              >
                <h2 className="text-base font-semibold text-foreground">{t("feed.errorTitle")}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{t("feed.errorBody")}</p>
                <Button type="button" className="mt-4 min-h-11" onClick={retry}>
                  {t("common.retry")}
                </Button>
              </div>
            ) : null}

            {listings.length === 0 ? (
              <div
                data-testid="feed-empty"
                className="flex flex-col items-center rounded-lg border border-border bg-card p-10 text-center"
              >
                {/* Allowed motif placement: logo, spinner, empty state. */}
                <WovenMark className="h-10 w-10" />
                <h2 className="mt-4 text-base font-semibold text-foreground">
                  {t("feed.emptyTitle")}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">{t("feed.emptyBody")}</p>
              </div>
            ) : (
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {listings.map((listing) => (
                  <li key={listing.id}>
                    <ListingCard listing={listing} />
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default Feed;
