import { createFileRoute, redirect } from "@tanstack/react-router";

import { PostingWizard } from "@/features/posting/wizard";
import { supabase } from "@/integrations/supabase/client";

/**
 * U6-C2a — `/post`: the wizard for a listing that does not exist yet.
 *
 * D20 — THE SIGN-IN REDIRECT STANDARD (replaces C1a's "please sign in" card).
 * A session-gated page sends a signed-out visitor to `/auth` carrying the page it
 * was asked for as a RELATIVE `return` path, and `/auth` comes back to it after a
 * successful sign-in. The intent is never lost, and the seller never has to find
 * "Post a listing" a second time.
 *
 * `ssr: false` is what makes the guard honest rather than a redirect loop: the
 * Supabase session lives in `localStorage`, which the server cannot read, so a
 * server-rendered gate would bounce a signed-in seller on every hard refresh.
 * The wizard's own screen is not a shareable landing page, so nothing is lost by
 * rendering it on the client alone.
 */
export const Route = createFileRoute("/post")({
  ssr: false,
  beforeLoad: async () => {
    const { data } = await supabase.auth.getUser();
    if (data.user === null) throw redirect({ to: "/auth", search: { return: "/post" } });
  },
  head: () => ({
    meta: [
      { title: "Post a listing — ethio.com" },
      {
        name: "description",
        content: "Post what you are selling on ethio.com in a few short steps.",
      },
      { property: "og:title", content: "Post a listing — ethio.com" },
      {
        property: "og:description",
        content: "Post what you are selling on ethio.com in a few short steps.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PostNewScreen,
});

function PostNewScreen() {
  return <PostingWizard listingId={null} />;
}
