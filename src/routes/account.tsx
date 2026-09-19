import { createFileRoute, redirect } from "@tanstack/react-router";

import { AccountOverview } from "@/features/account/account-overview";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/account")({
  ssr: false,
  beforeLoad: async () => {
    const { data } = await supabase.auth.getUser();
    if (data.user === null) throw redirect({ to: "/auth", search: { return: "/account" } });
  },
  head: () => ({
    meta: [
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
