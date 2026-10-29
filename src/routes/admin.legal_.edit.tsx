import { pageHead } from "@/lib/page-head";
import { createFileRoute } from "@tanstack/react-router";
import { LegalEditor } from "@/features/admin/legal/legal-editor";
export const Route = createFileRoute("/admin/legal_/edit")({
  validateSearch: (search: Record<string, unknown>): { kind: string; country?: string } => ({
    kind: typeof search.kind === "string" ? search.kind : "",
    ...(typeof search.country === "string" ? { country: search.country } : {}),
  }),
  head: () =>
    pageHead(
      "head.admin.pattern.title",
      "head.admin.legalDraft.description",
      {
        meta: [
          { title: "Legal draft — ethio.com Admin" },
          {
            name: "description",
            content: "Write and publish bilingual legal document drafts on ethio.com.",
          },
          { property: "og:title", content: "Legal draft — ethio.com Admin" },
          {
            property: "og:description",
            content: "Write and publish bilingual legal document drafts on ethio.com.",
          },
          { property: "og:type", content: "website" },
          { name: "twitter:card", content: "summary" },
        ],
      },
      "head.admin.legalDraft.title",
    ),
  component: LegalEditorRoute,
});
function LegalEditorRoute() {
  const { kind, country } = Route.useSearch();
  return <LegalEditor kind={kind} country={country} />;
}
