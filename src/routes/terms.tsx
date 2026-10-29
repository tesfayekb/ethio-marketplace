import { pageHead } from "@/lib/page-head";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { LegalDocumentPage } from "@/features/legal/legal-document-page";
import { useI18n } from "@/i18n";
import { NoInputSchema } from "@/lib/schemas/server-fns";

const termsPageFn = createServerFn({ method: "GET" })
  .validator(NoInputSchema)
  .handler(async () => {
    const { legalPage } = await import("@/server/legal-page");
    return legalPage("terms");
  });

const TITLE = "Terms of Service — ethio.com";
const DESCRIPTION = "The Terms of Service of ethio.com, the version in force and the next one.";

export const Route = createFileRoute("/terms")({
  loader: () => termsPageFn(),
  head: ({ matches }) => {
    const root = matches[0]?.loaderData as { origin?: string } | undefined;
    const url = root?.origin ? `${root.origin}/terms` : null;
    return pageHead("head.site.pattern.title", "head.terms.description", {
      meta: [
        { title: TITLE },
        { name: "description", content: DESCRIPTION },
        { property: "og:title", content: TITLE },
        { property: "og:description", content: DESCRIPTION },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
        ...(url ? [{ property: "og:url", content: url }] : []),
      ],
      links: url ? [{ rel: "canonical", href: url }] : [],
    }, "legal.kind.terms");
  },
  errorComponent: TermsError,
  component: TermsPage,
});

function TermsPage() {
  const { t } = useI18n();
  return (
    <LegalDocumentPage kind="terms" title={t("legal.kind.terms")} data={Route.useLoaderData()} />
  );
}
function TermsError() {
  const { t } = useI18n();
  return <LegalDocumentPage kind="terms" title={t("legal.kind.terms")} data={null} />;
}
