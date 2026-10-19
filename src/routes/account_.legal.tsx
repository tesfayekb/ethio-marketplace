import { createFileRoute, redirect } from "@tanstack/react-router";
import { MyLegalPage } from "@/features/legal/my-legal-page";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/account_/legal")({
  ssr: false,
  beforeLoad: async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session?.user == null)
      throw redirect({ to: "/auth", search: { return: "/account/legal" } });
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
