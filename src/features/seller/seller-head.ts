import { pageHead } from "@/lib/page-head";
/**
 * N1b-2c (INC-977, SPA-9) — the seller page's head, from the loader's answer only.
 *
 * The name comes from what the loader found, never from the address: a held name
 * ('imitates') or an unknown one is not found, and its head carries no name at all —
 * the root's title stands, exactly as for the ad page's not-found (l.$slug.tsx).
 */
export type SellerHeadData = { name: string } | undefined;

export function sellerHead(data: SellerHeadData) {
  // Bundle 19 turn 17 — noindex until the store spec ([6.19]) keeps the address.
  const robots = { name: "robots", content: "noindex" };
  if (data === undefined) return { meta: [robots] };
  const title = `${data.name} — ethio.com`;
  const description = `Ads by ${data.name} on ethio.com.`;
  return pageHead(
    "head.site.pattern.title",
    "head.seller.description",
    {
      meta: [
        { title },
        { name: "description", content: description },
        robots,
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
      ],
    },
    null,
    data.name,
  );
}
