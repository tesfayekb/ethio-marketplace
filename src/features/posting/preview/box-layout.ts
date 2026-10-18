/**
 * DEC-192 (bundle 19 turn 22) — ONE table places the ad page's boxes in the
 * six-column grid: two a row from 42rem; Details | Description | Seller, then
 * the safety box | Location, from 56rem (option A). A missing box gives its
 * room to the others in its row. Every string below is a whole literal so
 * Tailwind sees only whole class names; a hidden box gets the empty string.
 */
export function boxLayout(show: {
  details: boolean;
  description: boolean;
  safety: boolean;
}): Record<"details" | "description" | "seller" | "location" | "safety" | "report", string> {
  const details = !show.details
    ? ""
    : show.description
      ? "@2xl:col-span-3 @4xl:order-1 @4xl:col-span-2"
      : "@2xl:col-span-6 @4xl:order-1 @4xl:col-span-3";
  const description = !show.description
    ? ""
    : show.details
      ? "@2xl:col-span-3 @4xl:order-2 @4xl:col-span-2"
      : "@2xl:col-span-6 @4xl:order-2 @4xl:col-span-3";
  const seller =
    show.details && show.description
      ? "@2xl:col-span-3 @4xl:order-3 @4xl:col-span-2"
      : show.details || show.description
        ? "@2xl:col-span-3 @4xl:order-3 @4xl:col-span-3"
        : "@2xl:col-span-3 @4xl:order-3 @4xl:col-span-6";
  const location = show.safety
    ? "@2xl:col-span-3 @4xl:col-span-4 @4xl:order-5"
    : "@2xl:col-span-3 @4xl:col-span-6 @4xl:order-5";
  const safety = show.safety ? "@2xl:col-span-6 @4xl:col-span-2 @4xl:order-4" : "";
  const report = "@2xl:col-span-6 @4xl:col-span-6 @4xl:order-6";
  return { details, description, seller, location, safety, report };
}
