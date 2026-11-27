import { CARD_SURFACE } from "@/components/layout/surface";
import { StatCard } from "@/components/shell/stat-card";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { useMemo } from "react";

import { useAdminCountries } from "@/features/admin-countries/use-countries";
import { useAdminLocations } from "@/features/admin-locations/use-locations";
import { useAdminShell } from "@/features/admin/admin-context";
import { useI18n } from "@/i18n";
import { useMayCall } from "@/features/permissions/use-may-call";

const LINKS = [
  {
    permission: "locations:view",
    path: "/admin/places",
    key: "locations",
    titleKey: "admin.section.places.title",
    bodyKey: "admin.section.places.body",
  },
  {
    permission: "countries:view",
    path: "/admin/countries",
    key: "countries",
    titleKey: "admin.section.countries.title",
    bodyKey: "admin.section.countries.body",
  },
  // P-1b (D290): the plans' tile left with Admin › Plans; the free plan's
  // posting caps now sit in Admin › Monetisation.
] as const;

export function LocationsOverview() {
  const { t } = useI18n();
  const { permissions } = useAdminShell();
  const { mayCall } = useMayCall();
  const maySeePlaces = mayCall({ door: "admin_list_locations" });
  const maySeeCountries = mayCall({ door: "admin_list_countries" });
  const countries = useAdminCountries({ enabled: maySeeCountries });
  const places = useAdminLocations("", { enabled: maySeePlaces });

  const marketStats = useMemo(() => {
    const rows = countries.data ?? [];
    return {
      open: rows.filter((row) => row.isActive).length,
      closed: rows.filter((row) => !row.isActive).length,
    };
  }, [countries.data]);
  const placeStats = useMemo(() => {
    const rows = (places.data ?? []).filter((row) => row.level !== "country");
    const levels = ["region", "city", "sub_city"] as const;
    return {
      active: rows.filter((row) => row.isActive).length,
      total: rows.length,
      levels: levels.map((level) => ({
        level,
        count: rows.filter((row) => row.level === level).length,
      })),
    };
  }, [places.data]);

  return (
    <div data-testid="admin-overview-locations" className="min-w-0 space-y-6">
      <div>
        <h1 className="text-lg font-semibold text-foreground">
          {t("admin.overview.locations.title")}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{t("admin.overview.locations.body")}</p>
      </div>

      <section
        className="grid grid-cols-1 gap-3 sm:grid-cols-2"
        aria-label={t("admin.overview.stats")}
      >
        {/* D52 — a tile is drawn only when its read may run: never a 0 that was never read. */}
        {maySeeCountries ? (
          <StatCard
            testid="overview-stat-markets"
            loading={countries.isLoading}
            failed={countries.isError}
            onRetry={() => void countries.refetch()}
            label={t("admin.overview.markets")}
            value={`${marketStats.open} · ${marketStats.closed}`}
            hint={t("admin.overview.markets.caption")}
            error={countries.error}
          />
        ) : null}
        {maySeePlaces ? (
          <StatCard
            testid="overview-stat-places"
            loading={places.isLoading}
            failed={places.isError}
            onRetry={() => void places.refetch()}
            label={t("admin.overview.places")}
            value={`${placeStats.active} · ${placeStats.total}`}
            hint={
              <>
                <span className="block">{t("admin.overview.places.caption")}</span>
                <span className="mt-2 block tabular-nums">
                  {placeStats.levels
                    .map(({ level, count }) => `${t(`admin.locations.level.${level}`)} ${count}`)
                    .join(" · ")}
                </span>
              </>
            }
            error={places.error}
          />
        ) : null}
      </section>

      <nav className="grid grid-cols-1 gap-3 sm:grid-cols-2" aria-label={t("admin.overview.links")}>
        {LINKS.filter((item) => permissions.includes(item.permission)).map((item) => (
          <Link
            key={item.key}
            to={item.path}
            data-testid={`overview-link-${item.key}`}
            className={cn(
              CARD_SURFACE,
              "flex min-h-16 flex-col justify-center p-4 text-start transition-colors hover:bg-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            )}
          >
            <span className="text-sm font-semibold text-foreground">{t(item.titleKey)}</span>
            <span className="mt-1 text-xs text-muted-foreground">{t(item.bodyKey)}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
