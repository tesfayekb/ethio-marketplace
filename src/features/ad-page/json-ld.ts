import type { PublicListingDoc } from "./public-listing";

/** Public facts only; escape markup before placing JSON in a script element. */
export function adJsonLd(doc: PublicListingDoc, url: string, image: string | null): string {
  const offers =
    doc.price.mode === "fixed" &&
    (doc.price.period === null || doc.price.period === "once") &&
    doc.price.amount !== null &&
    doc.price.currency !== null
      ? {
          offers: {
            "@type": "Offer",
            url,
            price: String(doc.price.amount),
            priceCurrency: doc.price.currency,
            availability: doc.is_sold ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
          },
        }
      : {};
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Product",
    name: doc.title,
    description: doc.description.slice(0, 500),
    url,
    ...(image === null ? {} : { image: [image] }),
    ...offers,
  }).replace(/</g, "\\u003c");
}
