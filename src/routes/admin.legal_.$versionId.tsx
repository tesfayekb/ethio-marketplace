import { pageHead } from "@/lib/page-head";
import { createFileRoute } from "@tanstack/react-router";
import { LegalVersionView } from "@/features/admin/legal/legal-version-view";
export const Route = createFileRoute("/admin/legal_/$versionId")({
  // Bundle 22 turn 32 (INC-825) — `translate=1` opens the translation panel.
  validateSearch: (search: Record<string, unknown>): { translate?: "1" } =>
    search.translate === "1" || search.translate === 1 ? { translate: "1" } : {},
  head: () => ({
    meta: [
      ...pageHead("head.admin.pattern.title", "head.admin.legalVersion.description", "head.admin.legalVersion.title", null, "Legal version — ethio.com Admin", "Read a legal document version and its frozen facts on ethio.com.").meta,
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LegalVersionRoute,
});
function LegalVersionRoute() {
  const { versionId } = Route.useParams();
  const { translate } = Route.useSearch();
  return <LegalVersionView versionId={versionId} openTranslation={translate === "1"} />;
}
