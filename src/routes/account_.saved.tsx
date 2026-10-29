import { pageHead } from "@/lib/page-head";
import { createFileRoute } from "@tanstack/react-router";
import { SavedPage } from "@/features/account/saved-page";
import { requireSignedIn } from "@/lib/signed-in-route";

export const Route = createFileRoute("/account_/saved")({
  ssr: false,
  beforeLoad: async () => {
    await requireSignedIn("/account/saved");
  },
  head: () =>
    pageHead(
      "head.site.pattern.title",
      "head.saved.description",
      {
        meta: [
          { name: "robots", content: "noindex" },
          { title: "Saved — ethio.com" },
          { name: "description", content: "Your saved ads on ethio.com." },
          { property: "og:title", content: "Saved — ethio.com" },
          { property: "og:description", content: "Your saved ads on ethio.com." },
          { property: "og:type", content: "website" },
          { name: "twitter:card", content: "summary_large_image" },
        ],
      },
      "nav.saved",
    ),
  // DEC-258 — this screen shows the member strings layer; the shell's gate loads it first.
  staticData: { strings: ["member"] },
  component: SavedPage,
});
