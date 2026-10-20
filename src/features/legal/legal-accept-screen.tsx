import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useShell } from "@/components/shell-context";
import { useI18n, type MessageKey } from "@/i18n";
import { refreshAfterWrite } from "@/lib/refresh-after-write";
import { safeReturnPath } from "@/lib/return-path";
import { legalDocName, legalRole, tickKey } from "./legal-kinds";
import { acceptLegal, legalRefusal, myLegalStatus, myLegalVersion } from "./legal-reader";
import { LegalText } from "./legal-text";
import { legalStatusKey } from "./use-legal-gate";

function DocText({ id }: { id: string }) {
  const { t, language } = useI18n();
  const version = useQuery({
    queryKey: ["legal", "accept-text", id],
    queryFn: () => myLegalVersion(id),
    retry: false,
  });
  if (version.isPending) return <p role="status">{t("common.loading")}</p>;
  if (version.error)
    return (
      <p role="alert" className="text-destructive">
        {t("legal.accept.loadError")}
      </p>
    );
  return (
    <div data-testid="legal-accept-text" className="rounded-md bg-muted/40 p-3">
      <LegalText
        text={language === "am" ? version.data.body_am : version.data.body_en}
        facts={version.data.settings_snapshot ?? {}}
      />
    </div>
  );
}

/** Bundle 22 turn 3 — the acceptance screen: Agree and continue, or Decline, sign out (the operator's hard stop). */
export function LegalAcceptScreen({
  userId,
  kinds,
  next,
}: {
  userId: string;
  kinds: string[];
  next: string | undefined;
}) {
  const { t, language } = useI18n();
  const { requestSignOut } = useShell();
  const navigate = useNavigate();
  const client = useQueryClient();
  const key = legalStatusKey(userId, kinds);
  const status = useQuery({
    queryKey: key,
    queryFn: () => myLegalStatus(kinds),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: false,
  });
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [agreed, setAgreed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<MessageKey | null>(null);
  const rows = status.data ?? [];
  const firstTime = rows.some((row) => !row.adult_confirmed);
  const ready = agreed && !busy && rows.length > 0;
  const left = useRef(false);
  const leave = () => {
    if (left.current) return;
    left.current = true;
    void navigate({ href: safeReturnPath(next), replace: true });
  };
  const nothingToAccept = status.data !== undefined && status.data.length === 0;
  useEffect(() => {
    if (nothingToAccept) leave();
  });
  if (nothingToAccept) return null;
  return (
    <PageShell as="main" width="wide" data-testid="legal-accept-screen">
      <div className="mx-auto w-full max-w-2xl min-w-0 space-y-4">
        <h1 className="text-2xl font-semibold text-foreground">{t("legal.accept.title")}</h1>
        <p>{t("legal.accept.lead")}</p>
        <p className="text-sm text-muted-foreground">{t("legal.accept.liability")}</p>
        {status.isPending ? (
          <p role="status">{t("common.loading")}</p>
        ) : status.error ? (
          <div data-testid="legal-accept-load-error" className="space-y-2">
            <p role="alert" className="text-destructive">
              {t("legal.accept.loadError")}
            </p>
            <Button variant="outline" className="min-h-11" onClick={() => void status.refetch()}>
              {t("common.tryAgain")}
            </Button>
          </div>
        ) : (
          <>
            <ul className="space-y-3">
              {rows.map((row) => (
                <li
                  key={row.version_id}
                  data-testid="legal-accept-doc"
                  data-kind={row.kind}
                  className="min-w-0 space-y-2"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="break-words font-medium">{legalDocName(row, t, language)}</p>
                      <p className="break-words text-sm text-muted-foreground">
                        {t("legal.accept.version")
                          .replace("{n}", String(row.version))
                          .replace("{label}", row.label)}
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      className="min-h-11"
                      data-testid="legal-accept-read"
                      aria-expanded={Boolean(open[row.version_id])}
                      onClick={() =>
                        setOpen((prev) => ({ ...prev, [row.version_id]: !prev[row.version_id] }))
                      }
                    >
                      {open[row.version_id] ? t("legal.accept.hide") : t("legal.accept.read")}
                    </Button>
                  </div>
                  {open[row.version_id] ? <DocText id={row.version_id} /> : null}
                </li>
              ))}
            </ul>
            <label className="flex min-h-11 items-start gap-3">
              <Checkbox
                data-testid="legal-accept-tick"
                checked={agreed}
                onCheckedChange={(value) => setAgreed(value === true)}
                className="mt-1"
              />
              <span>
                {t(
                  tickKey(
                    rows.map((row) => legalRole(row.kind)),
                    firstTime,
                  ),
                )}
              </span>
            </label>
            {error ? (
              <p role="alert" data-testid="legal-accept-error" className="text-destructive">
                {t(error)}
              </p>
            ) : null}
            <div className="flex flex-wrap gap-2">
              <Button
                data-testid="legal-accept-submit"
                className="min-h-11"
                disabled={!ready}
                onClick={() => {
                  setBusy(true);
                  setError(null);
                  acceptLegal({
                    versionIds: rows.map((row) => row.version_id),
                    language,
                    adult: firstTime,
                    dataConsent: false,
                  })
                    .then(async () => {
                      client.setQueryData(key, []);
                      await refreshAfterWrite(client, { queryKey: key });
                      leave();
                    })
                    .catch(async (failure: unknown) => {
                      console.error("[client-error] accept_legal", legalRefusal(failure));
                      if (legalRefusal(failure) === "notInForce") {
                        setAgreed(false);
                        setError("legal.accept.changed");
                        await status.refetch();
                      } else setError("legal.accept.error");
                    })
                    .finally(() => setBusy(false));
                }}
              >
                {t("legal.accept.submit")}
              </Button>
              <Button
                variant="outline"
                className="min-h-11"
                data-testid="legal-accept-signout"
                onClick={requestSignOut}
              >
                {t("legal.accept.decline")}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">{t("legal.accept.note")}</p>
          </>
        )}
      </div>
    </PageShell>
  );
}
