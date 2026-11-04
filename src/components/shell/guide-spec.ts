import { BookOpen } from "lucide-react";
import { createElement, type ReactNode } from "react";

import type { GuideNext } from "@/features/admin/guide-next";
import type { MessageKey } from "@/i18n";

/**
 * P-1c turn (b), ruling 2 (D315) — THE GUIDE'S SHARED CONTRACT, the one module
 * both forms import and neither form imports the other: the spec types, the
 * anchor helper, the icon and the accessible-name key.
 *
 * It is tiny on purpose. The table form (block-guide.tsx) rides with every
 * DataTable page and the page form (page-guide.tsx) with every page that
 * draws it; when the table form reached the page form for the icon and the
 * anchor, the 24 DataTable pages carried the page form's chunk — and with it
 * the bundler's preload list for the on-demand sheet — for nothing (measured,
 * stop 1 of P-1c (b): +1.3 KiB each). The sheet (guide-sheet.tsx) and its
 * body (block-guide-sheet.tsx) import from here too.
 */
export type BlockGuideSpec = {
  /** The block's or page's key prefix, e.g. `admin.monetisation.markets` or `adPage`; its guide keys hang under it. */
  readonly prefix: string;
  /** Where "What to do next" leads: an admin section (and a block's anchor), or a route of this site. */
  readonly next: GuideNext;
  /** The frame's id (an anchor other Guides may lead to); the prefix with dashes by default. */
  readonly anchor?: string;
  /**
   * The prefix the part lines hang under when they are another page's (the edit
   * wizard reads the posting wizard's eight step lines): `<partsPrefix>.guide.part.<key>`.
   */
  readonly partsPrefix?: string;
};

/**
 * One part the sheet explains: its key (the guide line's key) and, when the page
 * names the part itself, that name as the term — a drawn node (`label`, a
 * column's header) or the key of the page's own string (`labelKey`, a wizard
 * step's name, read by the sheet). A page's parts carry terms all or none:
 * named, the sheet draws a term list; unnamed, a plain list of lines in the
 * page's order.
 */
export type GuidePart = {
  readonly key: string;
  readonly label?: ReactNode;
  readonly labelKey?: MessageKey;
};
/** A table's column, explained as a part: its header is the term. */
export type GuideColumn = { readonly key: string; readonly label: ReactNode };

/**
 * Which grammar the parts follow: a table's columns (`Each column`,
 * `<prefix>.guide.col.<key>`) or a page's parts (`Each part`,
 * `<prefix>.guide.part.<key>`) — one primitive, one parameter, never a fork.
 */
export type PartsKind = "columns" | "parts";

/**
 * The control's accessible name in both forms. Each form writes the literal
 * `t("prim.guide.open" satisfies GuideOpenKey)`: the literal because the usage
 * map (scripts/i18n-usage-map.ts) attributes literal calls only, the
 * `satisfies` so the two literals cannot drift apart.
 */
export type GuideOpenKey = "prim.guide.open";

/** The frame id (and the hash a next-link lands on) of a guided block or page. */
export function guideAnchor(spec: BlockGuideSpec): string {
  return spec.anchor ?? spec.prefix.replace(/\./g, "-");
}

/** The Guide's one icon, in both forms. */
export function GuideIcon({ className }: { className?: string }) {
  return createElement(BookOpen, { "aria-hidden": "true", className });
}
