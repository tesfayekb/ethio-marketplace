import { pageHead } from "@/lib/page-head";
import { createFileRoute } from "@tanstack/react-router";
import { LegalVersionView } from "@/features/admin/legal/legal-version-view";
export const Route = createFileRoute("/admin/legal_/$versionId")({
  // Bundle 22 turn 32 (INC-825) — `translate=1` opens the translation panel.
  validateSearch: (search: Record<string, unknown>): { translate?: "1" } =>
    search.translate === "1" || search.translate === 1 ? { translate: "1" } : {},
  head: () =>
    pageHead(
      "head.admin.pattern.title",
      "head.admin.legalVersion.description",
      {
        meta: [
          { title: "Legal version — ethio.com Admin" },
          {
            name: "description",
            content: "Read a legal document version and its frozen facts on ethio.com.",
          },
          { property: "og:title", content: "Legal version — ethio.com Admin" },
          {
            property: "og:description",
            content: "Read a legal document version and its frozen facts on ethio.com.",
          },
          { property: "og:type", content: "website" },
          { name: "twitter:card", content: "summary" },
        ],
      },
      "head.admin.legalVersion.title",
    ),
  component: LegalVersionRoute,
});
function LegalVersionRoute() {
  const { versionId } = Route.useParams();
  const { translate } = Route.useSearch();
  return <LegalVersionView versionId={versionId} openTranslation={translate === "1"} />;
}
