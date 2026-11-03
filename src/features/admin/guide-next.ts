import type { FileRoutesByPath } from "@tanstack/react-router";

import { sectionById, type AdminSectionId } from "./sections";

/**
 * P-1c (D313) — WHERE A GUIDE'S "WHAT TO DO NEXT" LEADS.
 *
 * A block's Guide names its next step as a typed `{ section, block? }`, never a
 * translation key or a path: the section is one of sections.ts's ids (the one
 * register — F3's permission comes with it), the block the anchor of a frame on
 * that section's page (`BlockGuide`'s `anchor`, DataTable's frame id). The link
 * resolves here, in one place: the section's path and the block as the hash. A
 * section the caller may not see resolves to the admin landing, where the grid
 * shows what they may — never a page that answers "no permission".
 *
 * P-1c turn (b) (D315) — a page's Guide (seller's and buyer's pages) names its
 * next step as `{ to, hash? }`: `to` is a full path of the route register the
 * router generates (`FileRoutesByPath`, the router's own module augmentation —
 * read from the router package, never from the generated file, whose import
 * the usage map would follow into every route), so it is a route of this site
 * at compile time — one without a parameter and never an API route — and no
 * path is ever built from data. Outside the admin shell there are no
 * permissions to ask; a section form met there resolves to the landing, as a
 * refused section does.
 */
export type GuideRoute = Exclude<
  FileRoutesByPath[keyof FileRoutesByPath]["fullPath"],
  `${string}$${string}` | `/api/${string}`
>;

export type GuideNext =
  | {
      readonly section: AdminSectionId;
      /** The frame to land on inside that section's page (its anchor id). */
      readonly block?: string;
    }
  | {
      /** A parameterless route of this site, from the router's own register. */
      readonly to: GuideRoute;
      /** The id of the piece to land on inside that page. */
      readonly hash?: string;
    };

export type ResolvedGuideNext = {
  to: string;
  hash: string | undefined;
  /** False when the caller lacks the section's permission (the link then leads to the landing). */
  allowed: boolean;
};

const LANDING = "/admin";

export function resolveGuideNext(
  next: GuideNext,
  /** The caller's permission slugs; null outside the admin shell. */
  permissions: readonly string[] | null,
): ResolvedGuideNext {
  if ("to" in next) return { to: next.to, hash: next.hash, allowed: true };
  const section = sectionById(next.section);
  if (permissions === null || !permissions.includes(section.permission)) {
    return { to: LANDING, hash: undefined, allowed: false };
  }
  return { to: section.path, hash: next.block, allowed: true };
}
