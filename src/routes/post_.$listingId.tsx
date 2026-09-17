import { createFileRoute } from "@tanstack/react-router";

import { PostingWizard } from "@/features/posting/wizard";

/**
 * U6-C1a — `/post/<id>`: RESUMING a draft.
 *
 * The draft's own address. The wizard reads the row as its owner (RLS decides,
 * not the URL), opens at the step the server recorded, and says plainly when the
 * draft belongs to another account — the one case where a wrong id must not look
 * like an empty form.
 *
 * `noindex`: a draft is nobody's landing page.
 *
 * The trailing underscore in the FILE name (`post_.$listingId.tsx`) opts this
 * route out of nesting under `post.tsx`: the URL stays `/post/<id>`, while the
 * screen is its own leaf instead of a child rendered inside `/post`. Without it
 * the flat-file convention makes `post.tsx` a layout, and a wizard that renders
 * no `<Outlet />` silently shows the CREATE screen at a draft's own address.
 */
export const Route = createFileRoute("/post_/$listingId")({
  head: () => ({
    meta: [
      { title: "Continue your listing — ethio.com" },
      { name: "description", content: "Finish the listing you started on ethio.com." },
      { property: "og:title", content: "Continue your listing — ethio.com" },
      { property: "og:description", content: "Finish the listing you started on ethio.com." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PostResumeScreen,
});

function PostResumeScreen() {
  const { listingId } = Route.useParams();
  return <PostingWizard listingId={listingId} />;
}
