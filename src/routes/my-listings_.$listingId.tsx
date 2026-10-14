import { createFileRoute, redirect } from "@tanstack/react-router";

import { MyListingPage } from "@/features/my-listings/my-listing-page";
import { supabase } from "@/integrations/supabase/client";

/**
 * Bundle 16 turn 3 — /my-listings/<id>, one of the seller's own ads (D138; D173–D176):
 * the ad, its dates, its history and its actions. Signed-in only, like /my-listings
 * and /account: a signed-out visitor goes to sign in and comes back here; the door
 * (`my_listing`) remains the authority behind the page — another seller's ad is
 * "not yours" whatever the address says.
 */
export const Route = createFileRoute("/my-listings_/$listingId")({
  ssr: false,
  beforeLoad: async ({ params }) => {
    const { data } = await supabase.auth.getSession();
    if ((data.session?.user ?? null) === null)
      throw redirect({ to: "/auth", search: { return: `/my-listings/${params.listingId}` } });
  },
  head: () => ({
    meta: [
      { name: "robots", content: "noindex" },
      { title: "My listing — ethio.com" },
      {
        name: "description",
        content: "One of your ads on ethio.com: its state, history and actions.",
      },
      { property: "og:title", content: "My listing — ethio.com" },
      {
        property: "og:description",
        content: "One of your ads on ethio.com: its state, history and actions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MyListingRoute,
});

function MyListingRoute() {
  const { listingId } = Route.useParams();
  return <MyListingPage listingId={listingId} />;
}
