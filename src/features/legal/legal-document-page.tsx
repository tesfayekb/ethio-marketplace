import { useState } from "react";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n";
import { legalDate } from "./legal-kinds";
import { LegalText } from "./legal-text";
import type { PublicLegalVersion } from "./legal-reader";

export type LegalPageAnswer = {
  inForce: PublicLegalVersion | null;
  scheduled: PublicLegalVersion | null;
};

/** The English / Amharic switch shared by the public page and the person's version page. */
export function LegalLangSwitch({
  value,
  onChange,
  testidPrefix,
}: {
  value: "en" | "am";
  onChange: (lang: "en" | "am") => void;
  testidPrefix: string;
}) {
  const { t } = useI18n();
  return (
    <div role="group" aria-label={t("legal.lang.label")} className="flex flex-wrap gap-2">
      {(["en", "am"] as const).map((lang) => (
        <Button
          key={lang}
          type="button"
          variant={value === lang ? "default" : "outline"}
          aria-pressed={value === lang}
          data-testid={`${testidPrefix}-${lang}`}
          className="min-h-11"
          onClick={() => onChange(lang)}
        >
          {t(`legal.lang.${lang}`)}
        </Button>
      ))}
    </div>
  );
}

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
  const [lang, setLang] = useState<"en" | "am">(language === "am" ? "am" : "en");
  const [showUpcoming, setShowUpcoming] = useState(false);
  const shown = showUpcoming && data?.scheduled ? data.scheduled : (data?.inForce ?? null);
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
              <>
                <p data-testid="legal-public-meta" className="text-sm text-muted-foreground">
                  {t("legal.page.meta")
                    .replace("{n}", String(shown.version))
                    .replace("{label}", shown.label)
                    .replace("{date}", legalDate(shown.effective_at, language))}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <LegalLangSwitch
                    value={lang}
                    onChange={setLang}
                    testidPrefix="legal-public-lang"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    data-testid="legal-public-print"
                    className="min-h-11"
                    onClick={() => window.print()}
                  >
                    {t("legal.page.print")}
                  </Button>
                </div>
                <LegalText
                  toc
                  text={lang === "am" ? shown.body_am : shown.body_en}
                  facts={shown.settings_snapshot ?? {}}
                />
              </>
            ) : null}
          </>
        )}
      </div>
    </PageShell>
  );
}
