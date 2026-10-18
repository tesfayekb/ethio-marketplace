/**
 * DEC-197 (bundle 19 turn 27) — ONE table places the ad page's boxes in the
 * six-column grid: Details | Description, then Location | the safety box, from
 * 42rem; Details | Description | Location in one row, then the safety box
 * across the width, last, from 56rem. The seller card is no longer in the
 * grid — it sits in the right column under the title box. A missing box gives
 * its room to the others in its row. The DOM order is the order at every
 * width, so no order classes. Every string below is a whole literal so
 * Tailwind sees only whole class names; a hidden box gets the empty string.
 */
export function boxLayout(show: {
  details: boolean;
  description: boolean;
  location: boolean;
  safety: boolean;
}): Record<"details" | "description" | "location" | "safety" | "report", string> {
  const bothFacts = show.details && show.description;
  const wideCount = [show.details, show.description, show.location].filter(Boolean).length;
  const wideFact =
    wideCount === 3 ? "@4xl:col-span-2" : wideCount === 2 ? "@4xl:col-span-3" : "@4xl:col-span-6";
  const details = !show.details
    ? ""
    : `${bothFacts ? "@2xl:col-span-3" : "@2xl:col-span-6"} ${wideFact}`;
  const description = !show.description
    ? ""
    : `${bothFacts ? "@2xl:col-span-3" : "@2xl:col-span-6"} ${wideFact}`;
  const location = !show.location
    ? ""
    : `${show.safety ? "@2xl:col-span-3" : "@2xl:col-span-6"} ${wideFact}`;
  const safety = !show.safety
    ? ""
    : `${show.location ? "@2xl:col-span-3" : "@2xl:col-span-6"} @4xl:col-span-6`;
  const report = "@2xl:col-span-6 @4xl:col-span-6";
  return { details, description, location, safety, report };
}
