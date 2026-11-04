import type { BlockGuideSpec, GuidePart } from "@/components/shell/page-guide";

/**
 * P-1c turn (b) (D315) — THE WIZARD'S ONE GUIDE.
 *
 * The posting wizard and the edit wizard draw one Guide each from the header
 * (wizard.tsx); its parts are the eight steps, in the wizard's order, each
 * named by its step's own name and explained by `post.guide.part.<key>`; the
 * step the person is on is marked current. The edit wizard reads the same
 * eight lines (`partsPrefix`) under its own what / how / next (`post.edit`).
 * The list is literal so CF-GUIDE-1 can name every line; wizard-guide.test.ts
 * pins it to STEPS (types.ts).
 */
export const POST_GUIDE: BlockGuideSpec = { prefix: "post", next: { to: "/my-listings" } };

export const EDIT_GUIDE: BlockGuideSpec = {
  prefix: "post.edit",
  partsPrefix: "post",
  next: { to: "/my-listings" },
};

export const WIZARD_GUIDE_PARTS: readonly GuidePart[] = [
  { key: "category", labelKey: "post.step.category" },
  { key: "photos", labelKey: "post.step.photos" },
  { key: "specifications", labelKey: "post.step.specifications" },
  { key: "price", labelKey: "post.step.price" },
  { key: "details", labelKey: "post.step.details" },
  { key: "place", labelKey: "post.step.place" },
  { key: "contact", labelKey: "post.step.contact" },
  { key: "review", labelKey: "post.step.review" },
];

/** The part key of a step: the last segment of its name key (`post.step.<key>`). */
export function stepPartKey(nameKey: string): string {
  return nameKey.slice(nameKey.lastIndexOf(".") + 1);
}
