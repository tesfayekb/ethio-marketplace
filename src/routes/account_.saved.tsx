import { pageHead } from "@/lib/page-head";
import { createFileRoute } from "@tanstack/react-router";
import { SavedPage } from "@/features/account/saved-page";
import { requireSignedIn } from "@/lib/signed-in-route";

export const Route = createFileRoute("/account_/saved")({
  ssr: false,
  beforeLoad: async () => {
    await requireSignedIn("/account/saved");
  },
  head: () => ({
    meta: [
      ...pageHead(
        "head.site.pattern.title",
        "head.saved.description",
        "nav.saved",
        null,
        "Saved — ethio.com",
        "Your saved ads on ethio.com.",
      ).meta,
      { name: "robots", content: "noindex" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  // DEC-258 — this screen shows the member strings layer; the shell's gate loads it first.
  staticData: { strings: ["member"] },
  component: SavedPage,
});
