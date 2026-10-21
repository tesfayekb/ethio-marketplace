import { useState } from "react";
import { PageShell } from "@/components/layout/page-shell";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n";
import { legalDate } from "./legal-kinds";
import { LegalText } from "./legal-text";
import { legalTextFor, type PublicLegalVersion } from "./legal-reader";

export type LegalPageAnswer = {
  inForce: PublicLegalVersion | null;
  scheduled: PublicLegalVersion | null;
};

/** Bundle 22 turn 3 — /terms, /privacy and the E2E scratch pages: the version in force, and the next. */
export function LegalDocumentPage({
  title,
  data,
}: {
  kind: string;
  title: string;
  data: LegalPageAnswer | null;
}) {
  const { t, language } = useI18n();
  const [showUpcoming, setShowUpcoming] = useState(false);
  const shown = showUpcoming && data?.scheduled ? data.scheduled : (data?.inForce ?? null);
  const selected = shown ? legalTextFor(shown, language) : null;
  return (
    <PageShell as="main" width="wide" data-testid="legal-public-page">
      <div data-print-root className="min-w-0 space-y-4">
        <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
        {data === null ? (
          <p role="alert" data-testid="legal-public-load-error" className="text-destructive">
            {t("legal.page.loadError")}
          </p>
        ) : !data.inForce ? (
          <p data-testid="legal-public-none" className="text-muted-foreground">
            {t("legal.page.none").replace("{document}", title)}
          </p>
        ) : (
          <>
            {shown ? (
              <p data-testid="legal-public-meta" className="text-sm text-muted-foreground">
                {t("legal.page.meta")
                  .replace("{n}", String(shown.version))
                  .replace("{label}", shown.label)
                  .replace("{date}", legalDate(shown.effective_at, language))}
              </p>
            ) : null}
            {/* Bundle 22 turn 20 (C9) — the notice and the text on the house card surface. */}
            <Section className="space-y-4">
              {data.scheduled ? (
                <div className="space-y-2">
                  <p data-testid="legal-public-upcoming">
                    {t("legal.page.upcoming").replace(
                      "{date}",
                      legalDate(data.scheduled.effective_at, language),
                    )}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant={showUpcoming ? "outline" : "default"}
                      aria-pressed={!showUpcoming}
                      data-testid="legal-public-show-current"
                      className="min-h-11"
                      onClick={() => setShowUpcoming(false)}
                    >
                      {t("legal.page.showCurrent")}
                    </Button>
                    <Button
                      type="button"
                      variant={showUpcoming ? "default" : "outline"}
                      aria-pressed={showUpcoming}
                      data-testid="legal-public-show-upcoming"
                      className="min-h-11"
                      onClick={() => setShowUpcoming(true)}
                    >
                      {t("legal.page.showUpcoming").replace(
                        "{date}",
                        legalDate(data.scheduled.effective_at, language),
                      )}
                    </Button>
                  </div>
                </div>
              ) : null}
              {shown ? (
                // Bundle 22 turn 20 (C8) — the site's language only; no switch, no print button.
                <>
                  {selected?.fallback ? <p data-testid="legal-fallback-note" className="text-sm text-muted-foreground">{t("legal.fallbackNote")}</p> : null}
                  <LegalText toc text={selected?.text ?? ""} facts={shown.settings_snapshot ?? {}} />
                </>
              ) : null}
            </Section>
          </>
        )}
      </div>
    </PageShell>
  );
}
