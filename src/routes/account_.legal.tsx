import { createFileRoute } from "@tanstack/react-router";
import { MyLegalPage } from "@/features/legal/my-legal-page";
import { requireSignedIn } from "@/lib/signed-in-route";

export const Route = createFileRoute("/account_/legal")({
  ssr: false,
  beforeLoad: async () => {
    await requireSignedIn("/account/legal");
  },
  head: () => ({
    meta: [
      { name: "robots", content: "noindex" },
      { title: "My legal documents — ethio.com" },
      { name: "description", content: "The legal documents you accepted on ethio.com." },
      { property: "og:title", content: "My legal documents — ethio.com" },
      {
        property: "og:description",
        content: "The legal documents you accepted on ethio.com.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: MyLegalPage,
});
