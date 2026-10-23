import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { LegalDocumentPage } from "@/features/legal/legal-document-page";
import { useI18n } from "@/i18n";
import { isE2E } from "@/lib/env-flags";

const SCRATCH_KIND = /^e2e-[a-z0-9-]{1,40}$/;
const COUNTRY = /^[A-Z]{2}$/;
/** The page's country: two capital letters, else none (the root passes raw search through). */
function shapedCountry(value: unknown): string | undefined {
  return typeof value === "string" && COUNTRY.test(value) ? value : undefined;
}

const scratchPageFn = createServerFn({ method: "GET" })
  .inputValidator((input: { kind: string; country?: string }) => {
    if (!input || typeof input.kind !== "string" || !SCRATCH_KIND.test(input.kind))
      throw new Error("invalid legal kind");
    const country =
      typeof input.country === "string" && COUNTRY.test(input.country) ? input.country : undefined;
    return { kind: input.kind, country };
  })
  .handler(async ({ data }) => {
    if (!isE2E) throw new Error("legal scratch page: not an E2E build");
    const { legalPage } = await import("@/server/legal-page");
    return legalPage(data.kind, data.country);
  });

/** Bundle 22 turn 32 (DEC-236) — the public publishing statement, global or a country's. */
const publishingPageFn = createServerFn({ method: "GET" })
  .inputValidator((input: { country?: string }) => {
    const country = input?.country;
    return { country: typeof country === "string" && COUNTRY.test(country) ? country : undefined };
  })
  .handler(async ({ data }) => {
    const { legalPage } = await import("@/server/legal-page");
    return legalPage("publishing", data.country);
  });

const PUBLISHING_TITLE = "Publishing statement — ethio.com";
const PUBLISHING_DESCRIPTION =
  "The publishing statement every seller certifies before an ad goes live.";

/**
 * Bundle 22 turn 3 — the test seam. /legal/terms and /legal/privacy move (301) to their pages; a scratch
 * kind (e2e-…) is served only by the E2E build (DEC-018), unindexed; anything else is not found.
 * Turn 32 (DEC-236): /legal/publishing serves the publishing statement, `?country=XX` a country's; a scratch
 * publishing kind reads the same way, so the E2E proof reads its own statements (G27).
 */
export const Route = createFileRoute("/legal/$kind")({
  // An unshaped country is dropped explicitly: the root passes raw search through, so `{}` would keep it.
  validateSearch: (search: Record<string, unknown>): { country?: string } => ({
    country:
      typeof search.country === "string" && COUNTRY.test(search.country)
        ? search.country
        : undefined,
  }),
  loaderDeps: ({ search }) => ({ country: shapedCountry(search.country) }),
  loader: async ({ params, deps }) => {
    if (params.kind === "terms" || params.kind === "privacy")
      throw redirect({ href: `/${params.kind}`, statusCode: 301 });
    if (params.kind === "publishing") return publishingPageFn({ data: { country: deps.country } });
    if (!isE2E || !SCRATCH_KIND.test(params.kind)) throw notFound();
    return scratchPageFn({ data: { kind: params.kind, country: deps.country } });
  },
  head: ({ params, matches }) => {
    if (params.kind === "publishing") {
      const root = matches[0]?.loaderData as { origin?: string } | undefined;
      const url = root?.origin ? `${root.origin}/legal/publishing` : null;
      return {
        meta: [
          { title: PUBLISHING_TITLE },
          { name: "description", content: PUBLISHING_DESCRIPTION },
          { property: "og:title", content: PUBLISHING_TITLE },
          { property: "og:description", content: PUBLISHING_DESCRIPTION },
          { property: "og:type", content: "website" },
          { name: "twitter:card", content: "summary" },
          ...(url ? [{ property: "og:url", content: url }] : []),
        ],
        links: url ? [{ rel: "canonical", href: url }] : [],
      };
    }
    return {
      meta: [
        { title: `${params.kind} — ethio.com` },
        { name: "description", content: "A test legal document." },
        { property: "og:title", content: `${params.kind} — ethio.com` },
        { property: "og:description", content: "A test legal document." },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
        { name: "robots", content: "noindex" },
      ],
    };
  },
  errorComponent: LegalKindError,
  component: LegalKindPage,
});

function useTitle(kind: string): string {
  const { t } = useI18n();
  return kind === "publishing" ? t("legal.kind.publishing") : kind;
}
function LegalKindPage() {
  const { kind } = Route.useParams();
  const country = shapedCountry(Route.useSearch().country);
  const title = useTitle(kind);
  return (
    <LegalDocumentPage
      kind={kind}
      title={title}
      countryCode={country}
      data={Route.useLoaderData()}
    />
  );
}
function LegalKindError() {
  const { kind } = Route.useParams();
  const title = useTitle(kind);
  return <LegalDocumentPage kind={kind} title={title} data={null} />;
}
