/**
 * DEC-200 (bundle 19 turn 29, the operator, replacing DEC-199) — ONE table
 * places the ad page's boxes at three widths. In the medium range (42rem to
 * under 57.5rem) the top row, the right column and the boxes grid are
 * `display: contents` inside ONE flex wrapper, and these classes size and
 * order their children as flex items: Details | Description, then the seller
 * card | Location (the seller card | the safety box when there is no
 * Location, the seller card across when there is neither), then the safety
 * box across, then Report. The `half` items take a basis 1 px under half and
 * grow, so two always share a row and end equal; `order` puts the seller
 * card, Location, the safety box and Report after Description in the medium
 * range only. The large range (57.5rem and up) keeps DEC-197's six-column
 * grid (its `@2xl:grid-cols-6` stays; the large classes begin at 57.5rem,
 * where the seller card moves beside the photo, so both changes happen at
 * one width). Every string below is a whole literal so Tailwind sees only
 * whole class names; a hidden box gets the empty string.
 */
export function boxLayout(show: {
  details: boolean;
  description: boolean;
  location: boolean;
  safety: boolean;
}): Record<"details" | "description" | "seller" | "location" | "safety" | "report", string> {
  const half = "@2xl:@max-[57.5rem]:grow @2xl:@max-[57.5rem]:basis-[calc(50%-0.5rem-1px)]";
  const full = "@2xl:@max-[57.5rem]:basis-full";
  const wideCount = [show.details, show.description, show.location].filter(Boolean).length;
  const wide =
    wideCount === 3
      ? "@min-[57.5rem]:col-span-2"
      : wideCount === 2
        ? "@min-[57.5rem]:col-span-3"
        : "@min-[57.5rem]:col-span-6";
  const fact = show.details && show.description ? half : full;
  return {
    details: show.details ? `${fact} ${wide}` : "",
    description: show.description ? `${fact} ${wide}` : "",
    seller: `@2xl:@max-[57.5rem]:order-1 ${show.location || show.safety ? half : full}`,
    location: show.location ? `@2xl:@max-[57.5rem]:order-2 ${half} ${wide}` : "",
    safety: show.safety
      ? `@2xl:@max-[57.5rem]:order-3 ${show.location ? full : half} @min-[57.5rem]:col-span-6`
      : "",
    report: `@2xl:@max-[57.5rem]:order-4 ${full} @min-[57.5rem]:col-span-6`,
  };
}
