import { pageHead } from "@/lib/page-head";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { LegalDocumentPage } from "@/features/legal/legal-document-page";
import { useI18n } from "@/i18n";
import { NoInputSchema } from "@/lib/schemas/server-fns";

const privacyPageFn = createServerFn({ method: "GET" })
  .validator(NoInputSchema)
  .handler(async () => {
    const { legalPage } = await import("@/server/legal-page");
    return legalPage("privacy");
  });

export const Route = createFileRoute("/privacy")({
  loader: () => privacyPageFn(),
  head: ({ matches }) => {
    const root = matches[0]?.loaderData as { origin?: string } | undefined;
    const url = root?.origin ? `${root.origin}/privacy` : null;
    return {
      meta: [
        ...pageHead(
          "head.site.pattern.title",
          "head.privacy.description",
          "legal.kind.privacy",
          null,
          "Privacy Policy — ethio.com",
        ).meta,
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
        ...(url ? [{ property: "og:url", content: url }] : []),
      ],
      links: url ? [{ rel: "canonical", href: url }] : [],
    };
  },
  errorComponent: PrivacyError,
  component: PrivacyPage,
});

function PrivacyPage() {
  const { t } = useI18n();
  return (
    <LegalDocumentPage
      kind="privacy"
      title={t("legal.kind.privacy")}
      data={Route.useLoaderData()}
    />
  );
}
function PrivacyError() {
  const { t } = useI18n();
  return <LegalDocumentPage kind="privacy" title={t("legal.kind.privacy")} data={null} />;
}
