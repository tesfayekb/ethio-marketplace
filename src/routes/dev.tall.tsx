import { createFileRoute } from "@tanstack/react-router";

import { useI18n } from "@/i18n";

/**
 * A deliberately tall, harmless page used by the desktop layout-law E2E tests
 * (U0g L1/L2/L3). It renders inside the normal shell so the fixed band, the
 * fixed rail and the full-width footer are all exercised against REAL page
 * content — no injected spacers, which React re-renders used to drop.
 *
 * Production-safe: no data access, no user input, noindex.
 */
export const Route = createFileRoute("/dev/tall")({
  head: () => ({
    meta: [
      { title: "Layout check — ethio.com" },
      { name: "description", content: "Internal layout reference page." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Layout check — ethio.com" },
      { property: "og:description", content: "Internal layout reference page." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: TallFixture,
});

function TallFixture() {
  const { t } = useI18n();
  return (
    <section data-testid="tall-fixture" className="mx-auto w-full max-w-6xl">
      <h1 className="text-xl font-semibold text-foreground">{t("app.name")}</h1>
      <div aria-hidden="true" className="h-[4000px]" />
      <p data-testid="tall-fixture-end" className="pb-4 text-sm text-muted-foreground">
        {t("app.name")}
      </p>
    </section>
  );
}
