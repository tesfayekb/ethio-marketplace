import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { LegalDocumentPage } from "@/features/legal/legal-document-page";
import { isE2E } from "@/lib/env-flags";

const SCRATCH_KIND = /^e2e-[a-z0-9-]{1,40}$/;

const scratchPageFn = createServerFn({ method: "GET" })
  .inputValidator((input: { kind: string }) => {
    if (!input || typeof input.kind !== "string" || !SCRATCH_KIND.test(input.kind))
      throw new Error("invalid legal kind");
    return { kind: input.kind };
  })
  .handler(async ({ data }) => {
    if (!isE2E) throw new Error("legal scratch page: not an E2E build");
    const { legalPage } = await import("@/server/legal-page");
    return legalPage(data.kind);
  });

/**
 * Bundle 22 turn 3 — the test seam. /legal/terms and /legal/privacy move (301) to their pages; a scratch
 * kind (e2e-…) is served only by the E2E build (DEC-018), unindexed; anything else is not found.
 */
export const Route = createFileRoute("/legal/$kind")({
  loader: async ({ params }) => {
    if (params.kind === "terms" || params.kind === "privacy")
      throw redirect({ href: `/${params.kind}`, statusCode: 301 });
    if (!isE2E || !SCRATCH_KIND.test(params.kind)) throw notFound();
    return scratchPageFn({ data: { kind: params.kind } });
  },
  head: ({ params }) => ({
    meta: [
      { title: `${params.kind} — ethio.com` },
      { name: "description", content: "A test legal document." },
      { property: "og:title", content: `${params.kind} — ethio.com` },
      { property: "og:description", content: "A test legal document." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  errorComponent: ScratchError,
  component: ScratchPage,
});

function ScratchPage() {
  const { kind } = Route.useParams();
  return <LegalDocumentPage kind={kind} title={kind} data={Route.useLoaderData()} />;
}
function ScratchError() {
  const { kind } = Route.useParams();
  return <LegalDocumentPage kind={kind} title={kind} data={null} />;
}
