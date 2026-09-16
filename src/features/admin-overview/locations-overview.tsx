import { Link } from "@tanstack/react-router";
import { useMemo } from "react";

import { useAdminCountries } from "@/features/admin-countries/use-countries";
import { useCoveragePlans } from "@/features/admin-coverage/use-coverage";
import { useAdminLocations } from "@/features/admin-locations/use-locations";
import { useAdminShell } from "@/features/admin/admin-context";
import { useI18n } from "@/i18n";

const LINKS = [
  {
    permission: "locations:view",
    path: "/admin/places",
    key: "locations",
    titleKey: "admin.section.locations.title",
    bodyKey: "admin.section.locations.body",
  },
  {
    permission: "countries:view",
    path: "/admin/countries",
    key: "countries",
    titleKey: "admin.section.countries.title",
    bodyKey: "admin.section.countries.body",
  },
  {
    permission: "coverage:view",
    path: "/admin/coverage",
    key: "coverage",
    titleKey: "admin.section.coverage.title",
    bodyKey: "admin.section.coverage.body",
  },
] as const;

export function LocationsOverview() {
  const { t } = useI18n();
  const { permissions } = useAdminShell();
  const maySeePlaces = permissions.includes("locations:view");
  const maySeeCountries = permissions.includes("countries:view");
  const maySeeCoverage = permissions.includes("coverage:view");
  const countries = useAdminCountries({ enabled: maySeeCountries });
  const places = useAdminLocations("", { enabled: maySeePlaces });
  const coverage = useCoveragePlans({ enabled: maySeeCoverage });

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

  const loading = countries.isLoading || places.isLoading || coverage.isLoading;
  const error = countries.error ?? places.error ?? coverage.error;

  return (
    <div data-testid="admin-overview-locations" className="min-w-0 space-y-6">
      <div>
        <h1 className="text-lg font-semibold text-foreground">
          {t("admin.overview.locations.title")}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{t("admin.overview.locations.body")}</p>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">{t("admin.overview.loading")}</p>
      ) : null}
      {error ? (
        <p role="alert" className="text-sm text-destructive">
          {t("admin.overview.error")}
        </p>
      ) : null}

      <section
        className="grid grid-cols-1 gap-3 sm:grid-cols-3"
        aria-label={t("admin.overview.stats")}
      >
        <article
          className="rounded-md border border-border bg-card p-4"
          data-testid="overview-stat-markets"
        >
          <h2 className="text-sm font-semibold text-foreground">{t("admin.overview.markets")}</h2>
          <p className="mt-2 text-2xl font-semibold tabular-nums">{`${marketStats.open} · ${marketStats.closed}`}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {t("admin.overview.markets.caption")}
          </p>
        </article>
        <article
          className="rounded-md border border-border bg-card p-4"
          data-testid="overview-stat-places"
        >
          <h2 className="text-sm font-semibold text-foreground">{t("admin.overview.places")}</h2>
          <p className="mt-2 text-2xl font-semibold tabular-nums">{`${placeStats.active} · ${placeStats.total}`}</p>
          <p className="mt-1 text-xs text-muted-foreground">{t("admin.overview.places.caption")}</p>
          <p className="mt-2 text-xs tabular-nums text-muted-foreground">
            {placeStats.levels
              .map(({ level, count }) => `${t(`admin.locations.level.${level}`)} ${count}`)
              .join(" · ")}
          </p>
        </article>
        <article
          className="rounded-md border border-border bg-card p-4"
          data-testid="overview-stat-plans"
        >
          <h2 className="text-sm font-semibold text-foreground">{t("admin.overview.plans")}</h2>
          <p className="mt-2 text-2xl font-semibold tabular-nums">{coverage.data?.length ?? 0}</p>
          <p className="mt-1 text-xs text-muted-foreground">{t("admin.overview.plans.caption")}</p>
        </article>
      </section>

      <nav className="grid grid-cols-1 gap-3 sm:grid-cols-3" aria-label={t("admin.overview.links")}>
        {LINKS.filter((item) => permissions.includes(item.permission)).map((item) => (
          <Link
            key={item.key}
            to={item.path}
            data-testid={`overview-link-${item.key}`}
            className="flex min-h-16 flex-col justify-center rounded-md border border-border bg-card p-4 text-start transition-colors hover:bg-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="text-sm font-semibold text-foreground">{t(item.titleKey)}</span>
            <span className="mt-1 text-xs text-muted-foreground">{t(item.bodyKey)}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
