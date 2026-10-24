import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { LegalDocumentPage } from "@/features/legal/legal-document-page";
import { shapedCountries, signedInOnlyKind } from "@/features/legal/legal-page-data";
import { useI18n } from "@/i18n";
import { isE2E } from "@/lib/env-flags";

const SCRATCH_KIND = /^e2e-[a-z0-9-]{1,40}$/;

const scratchPageFn = createServerFn({ method: "GET" })
  .inputValidator((input: { kind: string; countries: string[] }) => {
    if (!input || typeof input.kind !== "string" || !SCRATCH_KIND.test(input.kind))
      throw new Error("invalid legal kind");
    return { kind: input.kind, countries: shapedCountries(input.countries) };
  })
  .handler(async ({ data }) => {
    if (!isE2E) throw new Error("legal scratch page: not an E2E build");
    const { legalPage } = await import("@/server/legal-page");
    const [global, ...countries] = await Promise.all([
      legalPage(data.kind),
      ...data.countries.map((code) => legalPage(data.kind, code)),
    ]);
    return { global, countries: data.countries.map((code, i) => ({ code, data: countries[i] })) };
  });

/**
 * Bundle 22 turn 3 — the test seam. /legal/terms and /legal/privacy move (301) to their pages; a scratch
 * kind (e2e-…) is served only by the E2E build (DEC-018), unindexed; anything else is not found.
 * Foundations turn 1 (D236): a publishing-class kind (publishing, e2e-pub-…) is signed-in only and is
 * served only by the signed-in route /legal/publishing — here it is not found.
 */
export const Route = createFileRoute("/legal/$kind")({
  validateSearch: (search: Record<string, unknown>): { countries: string[] } => ({
    countries: shapedCountries(search.country),
  }),
  loaderDeps: ({ search }) => ({ countries: shapedCountries(search.countries) }),
  loader: async ({ params, deps }) => {
    if (params.kind === "terms" || params.kind === "privacy")
      throw redirect({ href: `/${params.kind}`, statusCode: 301 });
    if (!isE2E || !SCRATCH_KIND.test(params.kind) || signedInOnlyKind(params.kind))
      throw notFound();
    return scratchPageFn({ data: { kind: params.kind, countries: deps.countries } });
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
  errorComponent: LegalKindError,
  component: LegalKindPage,
});

function LegalKindPage() {
  const { kind } = Route.useParams();
  const answer = Route.useLoaderData();
  return (
    <LegalDocumentPage
      kind={kind}
      title={kind}
      data={answer.global ?? null}
      sections={answer.countries.map((section) => ({
        countryCode: section.code,
        data: section.data ?? null,
      }))}
    />
  );
}
function LegalKindError() {
  const { kind } = Route.useParams();
  return <LegalDocumentPage kind={kind} title={kind} data={null} />;
}
