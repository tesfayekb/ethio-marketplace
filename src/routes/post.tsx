import { createFileRoute } from "@tanstack/react-router";

import { PostingWizard } from "@/features/posting/wizard";

/**
 * U6-C1a — `/post`: the wizard for a listing that does not exist yet.
 *
 * The route is PUBLIC and server-rendered: a signed-out visitor who taps "Post a
 * listing" must see the form's first question and a sign-in invitation, not a
 * redirect that loses their intent. The draft itself is created by the door at
 * step 1, which is where authentication actually becomes non-negotiable.
 */
export const Route = createFileRoute("/post")({
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
