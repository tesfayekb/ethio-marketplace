import { createFileRoute, redirect } from "@tanstack/react-router";

import { MyListingsPage } from "@/features/my-listings/my-listings-page";
import { supabase } from "@/integrations/supabase/client";

/**
 * Bundle 16 turn 2 — /my-listings, the seller's own ads (D138). The My Listings
 * panel's home (src/config/panels.ts); signed-in only, like /account: the session
 * the browser holds decides the screen, and the door (`my_listings`) remains the
 * authority behind it.
 */
export const Route = createFileRoute("/my-listings")({
  ssr: false,
  beforeLoad: async () => {
    const { data } = await supabase.auth.getSession();
    if ((data.session?.user ?? null) === null)
      throw redirect({ to: "/auth", search: { return: "/my-listings" } });
  },
  head: () => ({
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
  }),
  component: MyListingsPage,
});
