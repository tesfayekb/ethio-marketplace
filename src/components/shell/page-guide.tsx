import { BookOpen } from "lucide-react";
import { Suspense, useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import type { GuideNext } from "@/features/admin/guide-next";
import { useI18n, type MessageKey } from "@/i18n";
import { resilientLazy } from "@/lib/resilient-lazy";

/**
 * P-1c turn (b) (D315) — THE GUIDE OF A PAGE, the form every seller's and
 * buyer's page carries (the table form is block-guide.tsx; both open the one
 * sheet, guide-sheet.tsx).
 *
 * A page explains itself in place — What this is · Each part · How · What to
 * do next — in the reader's language, one tap away, never on the first paint:
 * this module is the lightest of the Guide's, and it is all a public page's
 * first download carries of it (measured, P-1c (b): the control alone). The
 * control is a plain button with the Guide's one icon and one label
 * (`prim.guide.open`, the one key both forms read) and the dialog contract the table's tile
 * states through its trigger (`aria-haspopup="dialog"`, `aria-expanded`). The
 * first tap fetches guide-sheet.tsx (the facade, the `guide` strings layer's
 * gate and the body) and mounts the sheet, which then stays mounted shut, so a
 * second open is instant; the sheet's close hands the focus back here (the
 * dialog's own return). A failed download reports through resilientLazy to the
 * shell's one notice (INC-911).
 *
 * The spec types and `guideAnchor` live here so that every other Guide module
 * imports from the lightest one and the first-paint control carries nothing of
 * theirs. CF-GUIDE-1 (scripts/conformance/admin-guides.ts) judges that every
 * user-facing route draws exactly one Guide and every part has its line.
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

/** The frame id (and the hash a next-link lands on) of a guided block or page. */
export function guideAnchor(spec: BlockGuideSpec): string {
  return spec.anchor ?? spec.prefix.replace(/\./g, "-");
}

/** The Guide's one icon, in both forms. */
export function GuideIcon({ className }: { className?: string }) {
  return <BookOpen aria-hidden="true" className={className} />;
}

const PageGuideSheet = resilientLazy(
  () => import("./guide-sheet").then((module) => module.PageGuideSheet),
  "the page guide",
  () => null,
);

export function PageGuide({
  spec,
  title,
  parts,
  current,
  className,
}: {
  spec: BlockGuideSpec;
  /** The sheet's title: the page's own name. */
  title: ReactNode;
  /** The page's parts in reading order; each gets its line. */
  parts: readonly GuidePart[];
  /** The part the person is on (a wizard's step): marked `aria-current="step"`. */
  current?: string;
  className?: string;
}) {
  const { t } = useI18n();
  // never: nothing but the control exists; the first tap mounts the sheet for good.
  const [state, setState] = useState<"never" | "open" | "shut">("never");
  const anchor = guideAnchor(spec);
  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="touch"
        aria-haspopup="dialog"
        aria-expanded={state === "open"}
        data-testid={`${anchor}-guide`}
        className={className}
        onClick={() => setState("open")}
      >
        <GuideIcon />
        {t("prim.guide.open")}
      </Button>
      {state === "never" ? null : (
        <Suspense fallback={null}>
          <PageGuideSheet
            open={state === "open"}
            onOpenChange={(open) => setState(open ? "open" : "shut")}
            spec={spec}
            title={title}
            parts={parts}
            partsKind="parts"
            current={current}
          />
        </Suspense>
      )}
    </>
  );
}

export default PageGuide;
