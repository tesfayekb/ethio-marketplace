import { createFileRoute, type ErrorComponentProps } from "@tanstack/react-router";
import { LegalDocumentPage } from "@/features/legal/legal-document-page";
import { legalPageData, shapedCountries } from "@/features/legal/legal-page-data";
import { useI18n } from "@/i18n";
import { supabase } from "@/integrations/supabase/client";
import { isE2E } from "@/lib/env-flags";
import { ReaderError } from "@/lib/reader-failure";
import { requireSignedIn } from "@/lib/signed-in-route";

const SCRATCH_PUBLISHING = /^e2e-pub-[a-z0-9-]{1,36}$/;
const PUBLISHING_TITLE = "Publishing statement — ethio.com";
const PUBLISHING_DESCRIPTION =
  "The publishing statement every seller certifies before an ad goes live.";

type PublishingSearch = { countries: string[]; kind: string };

/** The return path lands on the same statement: the countries, and the scratch kind under isE2E. */
function searchString(search: PublishingSearch): string {
  const params = new URLSearchParams();
  if (search.countries.length > 0) params.set("country", search.countries.join(","));
  if (isE2E && search.kind !== "publishing") params.set("kind", search.kind);
  const query = params.toString();
  return query === "" ? "" : `?${query}`;
}

/**
 * D236 (Foundations turn 1) — /legal/publishing: the publishing statement is for
 * signed-in people only. The door-step is requireSignedIn (a visitor goes to
 * /auth with the way back); the doors (legal_in_force/legal_scheduled, M24)
 * refuse an anonymous read, so the screen is convenience and the door stays
 * the authority. `?country=XX` adds a country's statement; a scratch
 * publishing kind (e2e-pub-…) reads the same way under the E2E build, so the
 * E2E proof reads its own statements (G27). noindex: a signed-in screen is
 * nobody's landing page.
 */
export const Route = createFileRoute("/legal/publishing")({
  ssr: false,
  validateSearch: (search: Record<string, unknown>): PublishingSearch => ({
    countries: shapedCountries(search.country),
    kind:
      isE2E && typeof search.kind === "string" && SCRATCH_PUBLISHING.test(search.kind)
        ? search.kind
        : "publishing",
  }),
  loaderDeps: ({ search }) => search,
  beforeLoad: async ({ search }) => {
    await requireSignedIn(`/legal/publishing${searchString(search)}`);
  },
  loader: async ({ deps }) => {
    const [global, ...countries] = await Promise.all([
      legalPageData(supabase, deps.kind),
      ...deps.countries.map((code) => legalPageData(supabase, deps.kind, code)),
    ]);
    return { global, countries: deps.countries.map((code, i) => ({ code, data: countries[i] })) };
  },
  head: () => ({
    meta: [
      { name: "robots", content: "noindex" },
      { title: PUBLISHING_TITLE },
      { name: "description", content: PUBLISHING_DESCRIPTION },
    ],
  }),
  errorComponent: PublishingError,
  component: PublishingPage,
});

function PublishingPage() {
  const answer = Route.useLoaderData();
  const { t } = useI18n();
  return (
    <LegalDocumentPage
      kind="publishing"
      title={t("legal.kind.publishing")}
      data={answer.global ?? null}
      sections={answer.countries.map((section) => ({
        countryCode: section.code,
        data: section.data ?? null,
      }))}
    />
  );
}

function PublishingError({ error }: ErrorComponentProps) {
  const { t } = useI18n();
  const failure = error instanceof ReaderError ? error.failure : null;
  return (
    <>
      <LegalDocumentPage kind="publishing" title={t("legal.kind.publishing")} data={null} />
      {failure ? (
        <span data-testid="legal-public-error-class">
          {` (${failure.class}${failure.status ? " " + failure.status : ""})`}
        </span>
      ) : null}
    </>
  );
}
