import { priceSent, sameAnswers, samePlaces } from "@/features/admin-listings/edit-listing";
import { sameChannels } from "./step-who";
import type { DraftValues } from "./use-draft";

/**
 * Bundle 17 turn 2 (D194) — THE EDIT IS THE WIZARD: a step's Next sends only
 * that step's CHANGED fields through the edit door (`edit_my_listing` for the
 * seller, `admin_edit_listing` for staff) — never the whole draft, because a
 * live ad is not a draft (submit_listing refuses it) and because the door
 * decides per field what applies at once and what goes to review (D177).
 *
 * The baseline is the ad as the door last confirmed it; a step whose change
 * set is empty saves nothing (spec v1, call C4).
 */
export interface EditBaseline extends DraftValues {
  streetAddress: string | null;
  directions: string | null;
}

export type EditActor = "seller" | "admin";

/** The door keys each actor may send (edit_my_listing :51–56; admin_edit_listing :70–71). */
export const SELLER_KEYS: ReadonlySet<string> = new Set([
  "title",
  "description",
  "video_url",
  "attributes",
  "price_mode",
  "price_amount",
  "price_currency",
  "price_period",
  "price_bp",
  "price_negotiable",
  "coverage",
  "contact_pref",
  "street_address",
  "directions",
]);
export const ADMIN_KEYS: ReadonlySet<string> = new Set([
  "title",
  "description",
  "attributes",
  "price_mode",
  "price_amount",
  "price_currency",
  "price_period",
  "price_bp",
  "price_negotiable",
]);

/** The wizard steps whose section has no Edit link for this actor (the Category always). */
export function lockedSteps(actor: EditActor): number[] {
  // Staff edit words, answers and the price through their door; the photos' removal,
  // the places and the contact are the seller's own (and the console's photo list).
  return actor === "admin" ? [1, 2, 6, 7] : [1];
}

/**
 * The change set of one wizard step, or `{}` when nothing on that step differs
 * from the baseline. Keys the actor's door does not take are never produced.
 */
export function stepChanges(
  step: number,
  baseline: EditBaseline,
  values: DraftValues,
  text: { streetAddress: string | null; directions: string | null },
  actor: EditActor,
): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  switch (step) {
    case 3:
      if (!sameAnswers(values.attributes, baseline.attributes))
        out["attributes"] = values.attributes;
      break;
    case 4: {
      const before = priceSent(baseline);
      const after = priceSent(values);
      if (
        (Object.keys(after) as (keyof typeof after)[]).some((key) => before[key] !== after[key])
      ) {
        Object.assign(out, after);
      }
      break;
    }
    case 2: {
      // The video link is a Photos-step box (wizard.tsx, StepPhotos `videoUrl`); the
      // photos themselves act at once through their own routes and are never a change set.
      const video = values.videoUrl.trim();
      if (video !== (baseline.videoUrl ?? "")) out["video_url"] = video === "" ? null : video;
      break;
    }
    case 5: {
      const title = values.title.trim();
      if (title !== baseline.title) out["title"] = title;
      if (values.description !== baseline.description) out["description"] = values.description;
      break;
    }
    case 6: {
      if (!samePlaces(values.coverage, baseline.coverage)) out["coverage"] = values.coverage;
      const street = (text.streetAddress ?? "").trim();
      if (street !== (baseline.streetAddress ?? ""))
        out["street_address"] = street === "" ? null : street;
      const directions = (text.directions ?? "").trim();
      if (directions !== (baseline.directions ?? "")) {
        out["directions"] = directions === "" ? null : directions;
      }
      break;
    }
    case 7:
      if (!sameChannels(values.contactPref, baseline.contactPref))
        out["contact_pref"] = values.contactPref;
      break;
    default:
      break;
  }
  const allowed = actor === "admin" ? ADMIN_KEYS : SELLER_KEYS;
  for (const key of Object.keys(out)) if (!allowed.has(key)) delete out[key];
  return out;
}

/** The baseline after a door accepted a change set: the sent values become the ad's. */
export function applyToBaseline(
  baseline: EditBaseline,
  values: DraftValues,
  text: { streetAddress: string | null; directions: string | null },
  changes: Record<string, unknown>,
): EditBaseline {
  const next: EditBaseline = { ...baseline };
  if ("attributes" in changes) next.attributes = values.attributes;
  if ("price_mode" in changes) {
    next.priceMode = values.priceMode;
    next.priceAmount = values.priceAmount;
    next.priceCurrency = values.priceCurrency;
    next.pricePeriod = values.pricePeriod;
    next.priceBp = values.priceBp;
    next.priceNegotiable = values.priceNegotiable;
  }
  if ("title" in changes) next.title = String(changes["title"]);
  if ("description" in changes) next.description = values.description;
  if ("video_url" in changes)
    next.videoUrl = changes["video_url"] === null ? "" : String(changes["video_url"]);
  if ("coverage" in changes) next.coverage = values.coverage;
  if ("street_address" in changes)
    next.streetAddress = (changes["street_address"] as string | null) ?? null;
  if ("directions" in changes) next.directions = (changes["directions"] as string | null) ?? null;
  if ("contact_pref" in changes) next.contactPref = values.contactPref;
  return next;
}
