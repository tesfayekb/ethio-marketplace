import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import { PageShell } from "@/components/layout/page-shell";
import { sellerHead } from "@/features/seller/seller-head";
import { SellerPage } from "@/features/seller/seller-page";
import { useI18n } from "@/i18n";
import { SellerPageInputSchema } from "@/lib/schemas/server-fns";

const sellerExistsFn = createServerFn({ method: "GET" })
  .validator(SellerPageInputSchema)
  .handler(async ({ data }) => {
    const { sellerExists } = await import("@/server/seller-page");
    return sellerExists(data.name);
  });

/**
 * Bundle 19 turn 17 (DEC-107, DEC-108) — the seller's page at
 * ethio.com/<name>. Every site page is a static first segment, which the
 * router ranks before this dynamic one (isFrameMoreSpecific compares statics
 * first — node_modules/@tanstack/router-core/dist/esm/new-process-route-tree.js),
 * so this route only ever sees names no page claims. An upper-case letter
 * redirects 301 to the lower-cased address; an unknown or malformed name is a
 * 404. The guard scripts/check-root-routes.ts allows `$name` as the only
 * dynamic first segment.
 */
export const Route = createFileRoute("/$name")({
  loader: async ({ params }) => {
    if (/[A-Z]/.test(params.name)) {
      throw redirect({ href: `/${params.name.toLowerCase()}`, statusCode: 301 });
    }
    const exists = await sellerExistsFn({ data: { name: params.name } });
    // N1b-2c (INC-977) — a held name is not found, exactly like an unknown one (SPA-3).
    if (!exists) throw notFound();
    return { name: params.name };
  },
  notFoundComponent: SellerGonePage,
  // N1b-2c (SPA-9) — the head names only what the loader found; a not-found carries no name.
  head: ({ loaderData }) => sellerHead(loaderData),
  component: SellerRoute,
});

function SellerGonePage() {
  const { t } = useI18n();
  return (
    <PageShell as="main" width="wide" data-testid="seller-page-gone">
      <h1 className="text-xl font-semibold text-foreground">{t("sellerPage.notFound")}</h1>
      <Link to="/" className="text-primary underline underline-offset-4">
        {t("adPage.gone.home")}
      </Link>
    </PageShell>
  );
}

function SellerRoute() {
  const { name } = Route.useParams();
  return <SellerPage sellerKey={name} />;
}
