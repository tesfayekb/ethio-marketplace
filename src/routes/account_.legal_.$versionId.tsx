import { createFileRoute } from "@tanstack/react-router";
import { MyLegalVersion } from "@/features/legal/my-legal-version";
import { requireSignedIn } from "@/lib/signed-in-route";

export const Route = createFileRoute("/account_/legal_/$versionId")({
  ssr: false,
  beforeLoad: async ({ params }) => {
    await requireSignedIn(`/account/legal/${encodeURIComponent(params.versionId)}`);
  },
  head: () => ({
    meta: [
      { name: "robots", content: "noindex" },
      { title: "A legal document — ethio.com" },
      { name: "description", content: "A legal document you accepted on ethio.com." },
      { property: "og:title", content: "A legal document — ethio.com" },
      { property: "og:description", content: "A legal document you accepted on ethio.com." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: VersionRoute,
});

function VersionRoute() {
  const { versionId } = Route.useParams();
  return <MyLegalVersion versionId={versionId} />;
}
