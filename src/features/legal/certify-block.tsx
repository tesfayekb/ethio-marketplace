import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n";
import { refreshAfterWrite } from "@/lib/refresh-after-write";
import { certifyKey, refreshers, type CertifyState } from "./certify-refusal";
import { AgreeToDocument } from "./agree-to-document";
import { myListingCertification } from "./legal-reader";

/**
 * The statements that apply to an ad, with ONE tick (L1 v2 item 4). Bundle 22 turn 32 (DEC-236, D231): the
 * statements are not printed here; the tick is AgreeToDocument with one link per applying statement to its
 * public page, and `tried` — bumped by the screen's closed action — marks the tick refused while unticked.
 */
export function CertifyBlock({
  listingId,
  onChange,
  tried = 0,
}: {
  listingId: string;
  onChange: (value: CertifyState) => void;
  tried?: number;
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
  const [triedAtTick, setTriedAtTick] = useState(0);

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
      <AgreeToDocument
        id="certification"
        testId="certify-tick"
        sentence="legal.certify.tickStatement"
        links={statements.map((s) => ({
          label: s.country_code
            ? `${t("legal.kind.publishing")} — ${t("legal.certify.forCountry").replace(
                "{country}",
                regions.of(s.country_code) ?? s.country_code,
              )}`
            : t("legal.kind.publishing"),
          href: s.country_code
            ? `/legal/publishing?country=${encodeURIComponent(s.country_code)}`
            : "/legal/publishing",
        }))}
        checked={ticked}
        onCheckedChange={(value) => {
          setTicked(value);
          setTriedAtTick(tried);
          if (value) setChanged(false);
        }}
        refused={tried > triedAtTick && !ticked}
        message="legal.agree.required"
      />
      {changed ? (
        <p data-testid="certify-changed" role="alert" className="text-sm text-destructive">
          {t("legal.certify.changed")}
        </p>
      ) : null}
    </section>
  );
}
