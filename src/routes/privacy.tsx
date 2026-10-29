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

const TITLE = "Privacy Policy — ethio.com";
const DESCRIPTION = "The Privacy Policy of ethio.com, the version in force and the next one.";

export const Route = createFileRoute("/privacy")({
  loader: () => privacyPageFn(),
  head: ({ matches }) => {
    const root = matches[0]?.loaderData as { origin?: string } | undefined;
    const url = root?.origin ? `${root.origin}/privacy` : null;
    return pageHead(
      "head.site.pattern.title",
      "head.privacy.description",
      {
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
      },
      "legal.kind.privacy",
    );
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
