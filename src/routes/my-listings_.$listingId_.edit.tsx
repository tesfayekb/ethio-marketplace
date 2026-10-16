import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";

import { EditWizard } from "@/features/posting/wizard";
import { supabase } from "@/integrations/supabase/client";

/**
 * Bundle 17 turn 2 (D194) — `/my-listings/<id>/edit`: THE EDIT IS THE WIZARD.
 * The seller's Edit (a row's menu, the ad page's bar) opens the posting wizard
 * in edit mode on its Review step: every section with its Edit link but the
 * Category, each step saving on Next through `edit_my_listing` and coming back
 * to the Review, Done returning to the ad's page. The stacked boxes of bundle
 * 16 (turns R2, E2b) are gone with it.
 *
 * Signed-in only, with the sign-in standard of `/post` (D20): a signed-out
 * visitor goes to sign in and comes back here. `ssr: false` for the same reason
 * as `/post` — the session lives in the browser. The door stays the authority:
 * another seller's ad answers "not yours" whatever the address says, and a
 * draft's address is `/post/<id>` (the row's own link), never this one.
 *
 * The second trailing underscore (`$listingId_`) keeps this screen its own leaf
 * instead of a child rendered inside the ad's page (which draws no <Outlet />).
 */
export const Route = createFileRoute("/my-listings_/$listingId_/edit")({
  ssr: false,
  beforeLoad: async ({ params }) => {
    const { data } = await supabase.auth.getSession();
    if ((data.session?.user ?? null) === null) {
      throw redirect({
        to: "/auth",
        search: { return: `/my-listings/${encodeURIComponent(params.listingId)}/edit` },
      });
    }
  },
  head: () => ({
    meta: [
      { name: "robots", content: "noindex" },
      { title: "Edit your ad — ethio.com" },
      { name: "description", content: "Change one of your ads on ethio.com, step by step." },
      { property: "og:title", content: "Edit your ad — ethio.com" },
      {
        property: "og:description",
        content: "Change one of your ads on ethio.com, step by step.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MyListingEditRoute,
});

function MyListingEditRoute() {
  const { listingId } = Route.useParams();
  const navigate = useNavigate();
  return (
    <EditWizard
      listingId={listingId}
      actor="seller"
      onDone={() => void navigate({ to: "/my-listings/$listingId", params: { listingId } })}
    />
  );
}
