import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useI18n } from "@/i18n";
import { refreshAfterWrite } from "@/lib/refresh-after-write";
import { certifyKey, refreshers, type CertifyState } from "./certify-refusal";
import { legalTextFor, myListingCertification } from "./legal-reader";
import { LegalText } from "./legal-text";

/** The statements that apply to an ad, with ONE tick, "I certify the above." (L1 v2 item 4). */
export function CertifyBlock({
  listingId,
  onChange,
}: {
  listingId: string;
  onChange: (value: CertifyState) => void;
}) {
  const { t, language } = useI18n();
  const client = useQueryClient();
  const query = useQuery({
    queryKey: certifyKey(listingId),
    queryFn: () => myListingCertification(listingId),
    staleTime: 0,
    gcTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
  });
  const [ticked, setTicked] = useState(false);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    const refresh = () => {
      setTicked(false);
      setChanged(true);
      void refreshAfterWrite(client, { queryKey: certifyKey(listingId) });
    };
    refreshers.add(refresh);
    return () => {
      refreshers.delete(refresh);
    };
  }, [client, listingId]);

  const statements = query.data?.statements ?? [];
  const state: CertifyState["state"] = query.isPending
    ? "loading"
    : query.isError
      ? "error"
      : statements.length === 0
        ? "none"
        : "ready";
  const ids = statements.map((s) => s.version_id).join(",");
  const pendingAcceptance = query.data?.acceptance_pending ?? false;
  const last = useRef("");
  const report = useRef(onChange);
  report.current = onChange;
  useEffect(() => {
    const next: CertifyState = {
      state,
      versionIds: ids === "" ? [] : ids.split(","),
      ticked: state === "ready" && ticked,
      acceptancePending: pendingAcceptance,
    };
    const sig = JSON.stringify(next);
    if (sig === last.current) return;
    last.current = sig;
    report.current(next);
  }, [state, ids, ticked, pendingAcceptance]);

  if (state === "loading" || state === "none") return null;
  if (state === "error")
    return (
      <div data-testid="certify-load-error" role="alert" className="space-y-2">
        <p className="text-destructive">{t("legal.certify.loadError")}</p>
        <Button type="button" variant="outline" onClick={() => void query.refetch()}>
          {t("common.tryAgain")}
        </Button>
      </div>
    );

  const regions = new Intl.DisplayNames([language], { type: "region" });
  return (
    <section data-testid="certify-block" className="space-y-3">
      <h3 className="text-base font-semibold text-foreground">{t("legal.certify.title")}</h3>
      <p className="text-sm text-muted-foreground">{t("legal.certify.leadOnce")}</p>
      {statements.map((s) => {
        const selected = legalTextFor(s, language);
        return (
        <div
          key={s.version_id}
          data-testid="certify-statement"
          data-kind={s.kind}
          data-country={s.country_code ?? "global"}
          className="rounded-md bg-muted/40 p-3"
        >
          {s.country_code ? (
            <h4 className="mb-2 text-sm font-semibold text-foreground">
              {t("legal.certify.forCountry").replace(
                "{country}",
                regions.of(s.country_code) ?? s.country_code,
              )}
            </h4>
          ) : null}
          {selected.fallback ? <p data-testid="legal-fallback-note" className="text-sm text-muted-foreground">{t("legal.fallbackNote")}</p> : null}
          <LegalText
            text={selected.text}
            facts={s.settings_snapshot ?? {}}
          />
        </div>
      ); })}
      <label className="flex min-h-11 items-start gap-3 text-sm text-foreground">
        <Checkbox
          data-testid="certify-tick"
          checked={ticked}
          onCheckedChange={(value) => {
            setTicked(value === true);
            if (value === true) setChanged(false);
          }}
          className="mt-1"
        />
        <span>{t("legal.certify.tick")}</span>
      </label>
      {changed ? (
        <p data-testid="certify-changed" role="alert" className="text-sm text-destructive">
          {t("legal.certify.changed")}
        </p>
      ) : null}
    </section>
  );
}
