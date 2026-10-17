import { ShareAd } from "@/features/ad-page/share-ad";
import { priceLine } from "@/features/posting/price-line";
import { ReportAd } from "@/features/ad-page/report-ad";
import { useEffect, useRef, useState } from "react";
import { adJsonLd } from "@/features/ad-page/json-ld";
import { listingSaved, saveListing, unsaveListing } from "@/features/ad-page/save";
import { revealContact, type ContactState } from "@/features/ad-page/contact";
import { countView } from "@/features/ad-page/count-view";
import { useAuth } from "@/features/auth/use-auth";
import { fill } from "@/features/posting/refusal-text";
import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { PageShell } from "@/components/layout/page-shell";
import { PageCard } from "@/components/shell/page-card";
import { ListingDetail } from "@/features/posting/preview/listing-detail";
import { adPageView } from "@/features/ad-page/public-listing";
import { ownValue } from "@/lib/own-key";
import { ribbonOf, SOLD_RIBBON } from "@/features/feed/feed-page";
import { useI18n } from "@/i18n";

const readAdPageFn = createServerFn({ method: "GET" })
  .inputValidator((input: { slug: string }) => {
    if (!input || typeof input.slug !== "string" || input.slug.length === 0) {
      throw new Error("invalid ad address");
    }
    return { slug: input.slug };
  })
  .handler(async ({ data }) => {
    const { readAdPage } = await import("@/server/ad-page");
    const answer = await readAdPage(getRequest(), data.slug);
    if (answer.kind === "rate") console.error("[ssr-error] /l rateLimited");
    return answer;
  });

export const Route = createFileRoute("/l/$slug")({
  loader: async ({ params }) => {
    const answer = await readAdPageFn({ data: { slug: params.slug } });
    if (answer.kind !== "ad") throw notFound();
    if (`/l/${params.slug}` !== answer.canonical) {
      throw redirect({ href: answer.canonical, statusCode: 301 });
    }
    return answer;
  },
  notFoundComponent: GonePage,
  head: ({ loaderData, matches }) => {
    if (!loaderData) return {};
    const { doc, canonical } = loaderData;
    const title = `${doc.title} — ethio.com`;
    const description = doc.description.slice(0, 160);
    const root = matches[0]?.loaderData as { origin?: string } | undefined;
    const url = root?.origin ? `${root.origin}${canonical}` : null;
    const image = root?.origin
      ? doc.photos.length > 0
        ? `${root.origin}/l/${doc.public_id}/photo.jpg`
        : doc.category?.illustration_url
          ? new URL(doc.category.illustration_url, root.origin).href
          : null
      : null;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(url ? [{ property: "og:url", content: url }] : []),
        ...(image
          ? [
              { property: "og:image", content: image },
              { name: "twitter:image", content: image },
            ]
          : []),
        ...(doc.is_sold ? [{ name: "robots", content: "noindex" }] : []),
      ],
      links: url ? [{ rel: "canonical", href: url }] : [],
      scripts: url ? [{ type: "application/ld+json", children: adJsonLd(doc, url, image) }] : [],
    };
  },
  component: AdPage,
});

function GonePage() {
  const { t } = useI18n();
  return (
    <PageShell as="main" width="wide" data-testid="ad-page-gone">
      <h1 className="text-xl font-semibold text-foreground">{t("adPage.gone.title")}</h1>
      <p className="text-sm text-muted-foreground">{t("adPage.gone.body")}</p>
      <Link
        to="/"
        data-testid="ad-page-gone-home"
        className="text-primary underline underline-offset-4"
      >
        {t("adPage.gone.home")}
      </Link>
    </PageShell>
  );
}

function AdPage() {
  const { doc, canonical } = Route.useLoaderData();
  const countedId = useRef<string | null>(null);
  const { user, loading: authLoading } = useAuth();
  // Bundle 19 turn 11 (D201 §6) — the reveal is a tap, never automatic; the
  // values exist only in this client state after the door's answer.
  const [contactState, setContactState] = useState<ContactState>({ kind: "idle" });
  const [saved, setSaved] = useState<boolean | null>(null);
  const [saveCount, setSaveCount] = useState(doc.counts.saves);
  const [saveBusy, setSaveBusy] = useState(false);
  const [saveRefusal, setSaveRefusal] = useState<"rateLimited" | "failed" | null>(null);
  const [ownAd, setOwnAd] = useState(false);
  useEffect(() => {
    let active = true;
    setSaved(user === null ? false : null);
    setOwnAd(false);
    setSaveCount(doc.counts.saves);
    setSaveRefusal(null);
    if (user !== null)
      void listingSaved(doc.public_id).then((answer) => {
        if (active) setSaved(answer);
      });
    return () => {
      active = false;
    };
  }, [user, doc.public_id, doc.counts.saves]);
  const onToggle = () => {
    if (saveBusy || saved === null || user === null) return;
    setSaveBusy(true);
    setSaveRefusal(null);
    void (saved ? unsaveListing(doc.public_id) : saveListing(doc.public_id))
      .then((answer) => {
        if (answer.ok) {
          setSaved(answer.saved);
          setSaveCount(answer.count);
        } else if (answer.reason === "ownListing") setOwnAd(true);
        else setSaveRefusal(answer.reason === "rateLimited" ? "rateLimited" : "failed");
      })
      .finally(() => setSaveBusy(false));
  };
  const onReveal = () => {
    if (contactState.kind === "loading") return;
    setContactState({ kind: "loading" });
    void revealContact(doc.public_id).then((answer) => {
      setContactState(
        answer.ok
          ? { kind: "revealed", channels: answer.channels }
          : { kind: "refused", reason: answer.reason },
      );
    });
  };
  useEffect(() => {
    if (countedId.current === doc.public_id) return;
    countedId.current = doc.public_id;
    void countView(doc.public_id);
  }, [doc.public_id]);
  const { t, language } = useI18n();
  const view = adPageView(doc, language);
  const sharePrice =
    doc.price.amount === null || doc.price.mode === "contact" || doc.price.mode === "free"
      ? null
      : priceLine(
          {
            mode: doc.price.mode,
            amount: doc.price.amount,
            currency: doc.price.currency,
            period: doc.price.period,
            bp: doc.price.bp,
            unit: view.basisLabel ?? null,
          },
          t,
          t("price.contact"),
          language,
        );
  const soldKey = doc.sold_word === null ? undefined : ownValue(SOLD_RIBBON, doc.sold_word);
  const ribbonKey = ribbonOf({
    soldWord: doc.sold_word,
    closed: false,
    reserved: doc.reserved,
    priceReduced: doc.price.was !== null,
  })[0];
  return (
    <PageShell as="main" width="wide" data-testid="ad-page">
      <PageCard className="min-w-0 space-y-3">
        <ListingDetail
          {...view}
          share={
            <ShareAd
              publicId={doc.public_id}
              canonicalPath={canonical}
              title={doc.title}
              priceText={sharePrice}
            />
          }
          publicCounts={{ views: doc.counts.views, shares: doc.counts.shares }}
          ribbon={ribbonKey ? t(ribbonKey) : null}
          soldBadge={doc.is_sold && soldKey !== undefined ? t(soldKey) : null}
          save={
            ownAd
              ? undefined
              : {
                  viewer: authLoading ? "unknown" : user === null ? "signedOut" : "signedIn",
                  saved,
                  count: saveCount,
                  busy: saveBusy,
                  refusal: saveRefusal,
                  signInTo: { to: "/auth", search: { return: canonical } },
                  onToggle,
                }
          }
          report={
            ownAd ? undefined : (
              <ReportAd
                publicId={doc.public_id}
                viewer={authLoading ? "unknown" : user === null ? "signedOut" : "signedIn"}
                signInTo={{ to: "/auth", search: { return: `${canonical}#report` } }}
                onOwn={() => setOwnAd(true)}
              />
            )
          }
          contact={{
            viewer: authLoading ? "unknown" : user === null ? "signedOut" : "signedIn",
            signInTo: { to: "/auth", search: { return: `${canonical}#contact` } },
            state: contactState,
            onReveal,
            whatsappText: fill(t("adPage.contact.whatsappText"), { url: canonical }),
          }}
        />
      </PageCard>
    </PageShell>
  );
}
