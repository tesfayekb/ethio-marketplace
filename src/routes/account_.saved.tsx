import { createFileRoute, redirect } from "@tanstack/react-router";
import { SavedPage } from "@/features/account/saved-page";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/account_/saved")({
  ssr: false,
  beforeLoad: async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session?.user == null) throw redirect({ to: "/auth", search: { return: "/account/saved" } });
  },
  head: () => ({
    meta: [
      { name: "robots", content: "noindex" },
      { title: "Saved — ethio.com" },
      { name: "description", content: "Your saved ads on ethio.com." },
      { property: "og:title", content: "Saved — ethio.com" },
      { property: "og:description", content: "Your saved ads on ethio.com." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SavedPage,
});
