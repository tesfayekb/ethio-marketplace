import { pageHead } from "@/lib/page-head";
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
      ...pageHead("head.site.pattern.title", "head.myLegal.description", "myLegal.title", null, "My legal documents — ethio.com", "The legal documents you accepted on ethio.com.").meta,
      { name: "robots", content: "noindex" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  // DEC-258 — this screen shows the member strings layer; the shell's gate loads it first.
  staticData: { strings: ["member"] },
  component: MyLegalPage,
});
