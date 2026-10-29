import { pageHead } from "@/lib/page-head";
import { createFileRoute } from "@tanstack/react-router";

import { postReturnPath, postSearchOf, type PostSearch } from "@/features/posting/post-prefill";
import { PostingWizard } from "@/features/posting/wizard";
import { requireSignedIn } from "@/lib/signed-in-route";

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
 *
 * D119 — the invite card's category and place ride in the address, checked by
 * `postSearchOf`, and survive the sign-in round trip (INC-530).
 */
export const Route = createFileRoute("/post")({
  ssr: false,
  validateSearch: (search: Record<string, unknown>): PostSearch => postSearchOf(search),
  beforeLoad: async ({ search }) => {
    await requireSignedIn(postReturnPath(search));
  },
  head: () => ({
    meta: [
      ...pageHead(
        "head.site.pattern.title",
        "head.post.description",
        "post.title",
        null,
        "Post a listing — ethio.com",
        "Post what you are selling on ethio.com in a few short steps.",
      ).meta,
      { name: "robots", content: "noindex" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  // DEC-258 — this screen shows the member strings layer; the shell's gate loads it first.
  staticData: { strings: ["member"] },
  component: PostNewScreen,
});

function PostNewScreen() {
  const search = Route.useSearch();
  return (
    <PostingWizard
      listingId={null}
      prefill={{ categoryId: search.category ?? null, placeId: search.place ?? null }}
    />
  );
}
