import { createFileRoute } from "@tanstack/react-router";

import { AccountOverview } from "@/features/account/account-overview";
import { requireSignedIn } from "@/lib/signed-in-route";

export const Route = createFileRoute("/account")({
  ssr: false,
  beforeLoad: async () => {
    await requireSignedIn("/account");
  },
  head: () => ({
    meta: [
      { name: "robots", content: "noindex" },
      { title: "Account — ethio.com" },
      { name: "description", content: "Review your ethio.com account and listing activity." },
      { property: "og:title", content: "Account — ethio.com" },
      {
        property: "og:description",
        content: "Review your ethio.com account and listing activity.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AccountOverview,
});
