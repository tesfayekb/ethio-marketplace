import { pageHead } from "@/lib/page-head";
import { certifyRefusal } from "@/features/legal/certify-refusal";
import { rememberRevealIntent, takeRevealIntent } from "@/features/ad-page/reveal-intent";
import { ShareAd, sharePriceText } from "@/features/ad-page/share-ad";
import { SimilarAds } from "@/features/ad-page/similar-ads";
import { ReportAd } from "@/features/ad-page/report-ad";
import { PageGuide, type BlockGuideSpec, type GuidePart } from "@/components/shell/page-guide";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { adJsonLd } from "@/features/ad-page/json-ld";
import { listingSaved, saveListing, unsaveListing } from "@/features/ad-page/save";
import { revealContact, type ContactState } from "@/features/ad-page/contact";
import { countView } from "@/features/ad-page/count-view";
import { readSellerReview } from "@/features/seller/seller-review";
import { useAuth } from "@/features/auth/use-auth";
import { fill } from "@/features/posting/refusal-text";
import { createFileRoute, Link, notFound, redirect, useNavigate } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { PageShell } from "@/components/layout/page-shell";
import { ListingDetail } from "@/features/posting/preview/listing-detail";
import { adPageLookOf, cardLookOf } from "@/components/marketplace/card-tier";
import { TierFlag, TierTag } from "@/components/marketplace/tier-flag";
import { adPageLevelName, adPageView } from "@/features/ad-page/public-listing";
import { ownValue } from "@/lib/own-key";
import { ribbonOf, SOLD_RIBBON } from "@/features/feed/feed-page";
import { useI18n } from "@/i18n";
import { AdPageInputSchema } from "@/lib/schemas/server-fns";

const readAdPageFn = createServerFn({ method: "GET" })
  .validator(AdPageInputSchema)
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
    const head = pageHead(
      "head.site.pattern.title",
      null,
      null,
      doc.title,
      undefined,
      doc.description.slice(0, 160),
    );
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
        ...head.meta,
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

/**
 * P-1c turn (b) (D315) — the ad page's Guide: its parts in reading order (the
 * photos, the title box, the facts, the description, the seller, the place,
 * Save and Share, Report), texts under `adPage.guide.*` in the guide layer;
 * next: Post an ad, in both sign-in states.
 */
const GUIDE: BlockGuideSpec = { prefix: "adPage", next: { to: "/post" } };
const GUIDE_PARTS: readonly GuidePart[] = [
  { key: "photos" },
  { key: "title" },
  { key: "facts" },
  { key: "description" },
  { key: "seller" },
  { key: "location" },
  { key: "save" },
  { key: "report" },
];

function AdPage() {
  const navigate = useNavigate();
  const { doc, canonical, photoLinks } = Route.useLoaderData();
  const countedId = useRef<string | null>(null);
  const { user, loading: authLoading } = useAuth();
  // the reveal is a tap: a signed-in tap on Show contact, or a signed-out tap on
  // Contact seller in this tab within the last 15 minutes, carried through the
  // sign-in by a tab-only intent (D201 §14 — never an address)
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
  // N1b-2c (INC-977, R3) — the owner's own ad page tells them their name is held; the
  // public read already shows them the neutral label. Asked only of the owner; a failed
  // read is logged and the notice is not drawn (the page never claims "not held").
  const [underReview, setUnderReview] = useState(false);
  const owner = user !== null && (doc.viewer.owner || ownAd);
  useEffect(() => {
    setUnderReview(false);
    if (!owner) return;
    let active = true;
    readSellerReview().then(
      (held) => {
        if (active) setUnderReview(held);
      },
      (error: unknown) => console.error("[seller-review] my_seller_line", error),
    );
    return () => {
      active = false;
    };
  }, [owner]);
  const revealing = useRef(false);
  const returnedReveal = useRef<string | null>(null);
  const onReveal = useCallback(() => {
    if (revealing.current) return;
    revealing.current = true;
    setContactState({ kind: "loading" });
    void revealContact(doc.public_id)
      .then((answer) => {
        if (answer.ok) {
          setContactState({ kind: "revealed", channels: answer.channels });
        } else if (answer.reason === "acceptanceRequired") {
          certifyRefusal("acceptanceRequired", navigate);
          setContactState({ kind: "idle" });
        } else {
          setContactState({ kind: "refused", reason: answer.reason });
        }
      })
      .finally(() => {
        revealing.current = false;
      });
  }, [doc.public_id, navigate]);
  const [contactFocusOnReturn, setContactFocusOnReturn] = useState(false);
  useEffect(() => {
    if (authLoading || user === null || doc.is_sold || returnedReveal.current === doc.public_id)
      return;
    returnedReveal.current = doc.public_id;
    // DEC-196 — the return carries the visitor back to the contact; it never reveals.
    if (takeRevealIntent(doc.public_id)) setContactFocusOnReturn(true);
  }, [authLoading, user, doc.is_sold, doc.public_id]);
  useEffect(() => {
    if (countedId.current === doc.public_id) return;
    countedId.current = doc.public_id;
    void countView(doc.public_id);
  }, [doc.public_id]);
  const { t, language } = useI18n();
  // INC-958 — one view (and one pin) per document and language, so the map effects run once.
  const view = useMemo(() => adPageView(doc, language), [doc, language]);
  // Sage S5 (spec §12) — a badged ad's flag on its main photo and its tag above the title.
  // P-2 (c) c2a (DEC-351 §8, ruling 6 §3) — the look and the word are the document's own:
  // no store and no read, so a direct landing draws its flag from the server's answer.
  const badgeLook = view.look === null ? null : cardLookOf(view.look).badge;
  const levelWord = adPageLevelName(doc, language);
  const badge =
    badgeLook === null || levelWord === null || view.tier === null
      ? null
      : { levelKey: view.tier, name: levelWord, look: badgeLook };
  const sharePrice = sharePriceText(
    {
      mode: doc.price.mode,
      amount: doc.price.amount,
      currency: doc.price.currency,
      period: doc.price.period,
      bp: doc.price.bp,
      unit: view.basisLabel ?? null,
    },
    t,
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
      <ListingDetail
        {...view}
        photoLinks={photoLinks}
        tierFlag={badge === null ? null : <TierFlag {...badge} on="photo" />}
        tierTag={badge === null ? null : <TierTag {...badge} />}
        share={
          <ShareAd
            publicId={doc.public_id}
            canonicalPath={canonical}
            title={doc.title}
            priceText={sharePrice}
            ink={adPageLookOf(view.look).ink}
          />
        }
        guide={
          <PageGuide
            spec={GUIDE}
            title={doc.title}
            parts={GUIDE_PARTS}
            className={cn(
              "h-auto min-h-11 gap-2 px-0 font-semibold hover:bg-transparent",
              adPageLookOf(view.look).ink,
            )}
          />
        }
        publicCounts={{ views: doc.counts.views, shares: doc.counts.shares }}
        sellerAdsKey={doc.seller.alias === null ? null : doc.seller.alias.toLowerCase()}
        sellerUnderReview={underReview}
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
          onSignInTap: () => rememberRevealIntent(doc.public_id),
          focusOnReturn: contactFocusOnReturn,
          state: contactState,
          onReveal,
          whatsappText: fill(t("adPage.contact.whatsappText"), { url: canonical }),
        }}
      />
      {/* D201 §12 — similar ads: never on a sold ad, never for the owner. The
          document carries no internal listing id, so the ad is excluded by its
          public id. INC-704: the component draws its own card frame, only when
          it has cards. */}
      {!doc.is_sold && !doc.viewer.owner && !ownAd && doc.category !== null ? (
        <SimilarAds
          categoryId={doc.category.id}
          placeId={doc.places.location_id}
          excludeId={doc.public_id}
        />
      ) : null}
    </PageShell>
  );
}
