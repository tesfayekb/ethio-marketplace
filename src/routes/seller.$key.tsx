import { createFileRoute } from "@tanstack/react-router";

import { SellerPage } from "@/features/seller/seller-page";

export const Route = createFileRoute("/seller/$key")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.key} — ethio.com` },
      // Bundle 19 turn 16 — noindex until stage 8's shop page keeps the address.
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SellerRoute,
});

function SellerRoute() {
  const { key } = Route.useParams();
  return <SellerPage sellerKey={key} />;
}
