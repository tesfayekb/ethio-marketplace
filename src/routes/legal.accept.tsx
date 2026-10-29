import { pageHead } from "@/lib/page-head";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { LegalAcceptScreen } from "@/features/legal/legal-accept-screen";
import { myLegalStatus } from "@/features/legal/legal-reader";
import { currentGateKinds, legalStatusKey } from "@/features/legal/use-legal-gate";
import { safeReturnPath } from "@/lib/return-path";
import { requireSignedIn } from "@/lib/signed-in-route";

type AcceptSearch = { next?: string };

/** Bundle 22 turn 3 — the acceptance at sign-in (a hard stop; see use-legal-gate.ts). */
export const Route = createFileRoute("/legal/accept")({
  ssr: false,
  validateSearch: (search: Record<string, unknown>): AcceptSearch =>
    typeof search.next === "string" ? { next: search.next } : {},
  beforeLoad: async ({ context, search, location }) => {
    const { userId } = await requireSignedIn(`/legal/accept${location.searchStr}`);
    const kinds = currentGateKinds();
    const rows = await context.queryClient
      .fetchQuery({
        queryKey: legalStatusKey(userId, kinds),
        queryFn: () => myLegalStatus(kinds),
        staleTime: 5 * 60 * 1000,
      })
      .catch((failure: unknown) => {
        // The screen shows its own load error and retry; the read is logged, never defaulted.
        console.error("[client-error] legal accept read failed", String(failure));
        return null;
      });
    if (rows !== null && rows.length === 0)
      throw redirect({ href: safeReturnPath(search.next), replace: true });
    return { userId, kinds };
  },
  head: () => ({
    meta: [
      ...pageHead("head.site.pattern.title", "head.legalAccept.description", "legal.accept.title", null, "Before you continue — ethio.com").meta,
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AcceptRoute,
});

function AcceptRoute() {
  const { userId, kinds } = Route.useRouteContext();
  const { next } = Route.useSearch();
  return <LegalAcceptScreen userId={userId} kinds={kinds} next={next} />;
}
