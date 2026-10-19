import { createFileRoute } from "@tanstack/react-router";
import { LegalVersionView } from "@/features/admin/legal/legal-version-view";
export const Route = createFileRoute("/admin/legal_/$versionId")({
  head: () => ({
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
  }),
  component: LegalVersionRoute,
});
function LegalVersionRoute() {
  const { versionId } = Route.useParams();
  return <LegalVersionView versionId={versionId} />;
}
