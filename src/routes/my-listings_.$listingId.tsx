import { pageHead } from "@/lib/page-head";
import { createFileRoute } from "@tanstack/react-router";

import { MyListingPage } from "@/features/my-listings/my-listing-page";
import { requireSignedIn } from "@/lib/signed-in-route";

/**
 * Bundle 16 turn 3 — /my-listings/<id>, one of the seller's own ads (D138; D173–D176):
 * the ad, its dates, its history and its actions. Signed-in only, like /my-listings
 * and /account: a signed-out visitor goes to sign in and comes back here; the door
 * (`my_listing`) remains the authority behind the page — another seller's ad is
 * "not yours" whatever the address says.
 *
 * Bundle 16 turn R2's `?edit=1` (the edit panel) is gone with bundle 17 turn 2
 * (D194): the Edit is its own address, `/my-listings/<id>/edit`.
 */
export const Route = createFileRoute("/my-listings_/$listingId")({
  ssr: false,
  beforeLoad: async ({ params }) => {
    await requireSignedIn(`/my-listings/${encodeURIComponent(params.listingId)}`);
  },
  head: () => ({
    meta: [
      ...pageHead("head.site.pattern.title", "head.myListing.description", "head.myListing.title", null, "My listing — ethio.com", "One of your ads on ethio.com: its state, history and actions.").meta,
      { name: "robots", content: "noindex" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  // DEC-258 — this screen shows the member strings layer; the shell's gate loads it first.
  staticData: { strings: ["member"] },
  component: MyListingRoute,
});

function MyListingRoute() {
  const { listingId } = Route.useParams();
  return <MyListingPage listingId={listingId} />;
}
