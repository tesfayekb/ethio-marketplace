import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { LegalDocumentPage } from "@/features/legal/legal-document-page";
import { useI18n } from "@/i18n";
import { isE2E } from "@/lib/env-flags";

const SCRATCH_KIND = /^e2e-[a-z0-9-]{1,40}$/;
const COUNTRY = /^[A-Z]{2}$/;
/** The root passes raw search through; only distinct uppercase country codes reach the door. */
function shapedCountries(value: unknown): string[] {
  const values = typeof value === "string" ? value.split(",") : Array.isArray(value) ? value : [];
  return [...new Set(values.filter((v): v is string => typeof v === "string" && COUNTRY.test(v)))].slice(0, 5);
}

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
      legalPage(data.kind), ...data.countries.map((code) => legalPage(data.kind, code)),
    ]);
    return { global, countries: data.countries.map((code, i) => ({ code, data: countries[i] })) };
  });

/** The public publishing page always carries the global statement plus the countries requested. */
const publishingPageFn = createServerFn({ method: "GET" })
  .inputValidator((input: { countries: string[] }) => ({ countries: shapedCountries(input?.countries) }))
  .handler(async ({ data }) => {
    const { legalPage } = await import("@/server/legal-page");
    const [global, ...countries] = await Promise.all([
      legalPage("publishing"), ...data.countries.map((code) => legalPage("publishing", code)),
    ]);
    return { global, countries: data.countries.map((code, i) => ({ code, data: countries[i] })) };
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
  validateSearch: (search: Record<string, unknown>): { countries: string[] } => ({
    countries: shapedCountries(search.country),
  }),
  loaderDeps: ({ search }) => ({ countries: shapedCountries(search.countries) }),
  loader: async ({ params, deps }) => {
    if (params.kind === "terms" || params.kind === "privacy")
      throw redirect({ href: `/${params.kind}`, statusCode: 301 });
    if (params.kind === "publishing") return publishingPageFn({ data: { countries: deps.countries } });
    if (!isE2E || !SCRATCH_KIND.test(params.kind)) throw notFound();
    return scratchPageFn({ data: { kind: params.kind, countries: deps.countries } });
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
  const answer = Route.useLoaderData();
  const title = useTitle(kind);
  return (
    <LegalDocumentPage
      kind={kind}
      title={title}
      data={answer.global ?? null}
      sections={answer.countries.map((section) => ({ countryCode: section.code, data: section.data ?? null }))}
    />
  );
}
function LegalKindError() {
  const { kind } = Route.useParams();
  const title = useTitle(kind);
  return <LegalDocumentPage kind={kind} title={title} data={null} />;
}
