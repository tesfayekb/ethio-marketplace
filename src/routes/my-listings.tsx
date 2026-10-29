import { pageHead } from "@/lib/page-head";
import { createFileRoute } from "@tanstack/react-router";

import { MyListingsPage } from "@/features/my-listings/my-listings-page";
import { requireSignedIn } from "@/lib/signed-in-route";

/**
 * Bundle 16 turn 2 — /my-listings, the seller's own ads (D138). The My Listings
 * panel's home (src/config/panels.ts); signed-in only, like /account: the session
 * the browser holds decides the screen, and the door (`my_listings`) remains the
 * authority behind it.
 */
export const Route = createFileRoute("/my-listings")({
  ssr: false,
  beforeLoad: async () => {
    await requireSignedIn("/my-listings");
  },
  head: () => pageHead("head.site.pattern.title", "head.myListings.description", {
    meta: [
      { name: "robots", content: "noindex" },
      { title: "My listings — ethio.com" },
      { name: "description", content: "Your ads on ethio.com: live, in review, closed and sold." },
      { property: "og:title", content: "My listings — ethio.com" },
      {
        property: "og:description",
        content: "Your ads on ethio.com: live, in review, closed and sold.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }, "nav.myListings"),
  // DEC-258 — this screen shows the member strings layer; the shell's gate loads it first.
  staticData: { strings: ["member"] },
  component: MyListingsPage,
});
