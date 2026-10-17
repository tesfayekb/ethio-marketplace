import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { PageShell } from "@/components/layout/page-shell";
import { PageCard } from "@/components/shell/page-card";
import { ListingDetail } from "@/features/posting/preview/listing-detail";
import { adPageView } from "@/features/ad-page/public-listing";
import { ribbonOf } from "@/features/feed/feed-page";
import { useI18n } from "@/i18n";

export const readAdPageFn = createServerFn({ method: "GET" })
  .inputValidator((input: { slug: string }) => {
    if (
      !input ||
      typeof input.slug !== "string" ||
      input.slug.length === 0 ||
      input.slug.length >= 200
    ) {
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
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(url ? [{ property: "og:url", content: url }] : []),
        ...(doc.is_sold ? [{ name: "robots", content: "noindex" }] : []),
      ],
      links: url ? [{ rel: "canonical", href: url }] : [],
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
  const { doc } = Route.useLoaderData();
  const { t, language } = useI18n();
  const ribbonKey = ribbonOf({
    soldWord: doc.sold_word,
    closed: false,
    reserved: doc.reserved,
    priceReduced: doc.price.was !== null,
  })[0];
  return (
    <PageShell as="main" width="wide" data-testid="ad-page">
      <PageCard className="min-w-0 space-y-3">
        <ListingDetail {...adPageView(doc, language)} ribbon={ribbonKey ? t(ribbonKey) : null} />
      </PageCard>
    </PageShell>
  );
}
