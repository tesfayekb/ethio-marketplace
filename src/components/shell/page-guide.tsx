import { Suspense, useRef, useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n";
import { resilientLazy } from "@/lib/resilient-lazy";

import {
  GuideIcon,
  guideAnchor,
  type BlockGuideSpec,
  type GuideOpenKey,
  type GuidePart,
} from "./guide-spec";

export type { BlockGuideSpec, GuidePart } from "./guide-spec";

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
 * The spec types, `guideAnchor`, the icon and the name key live in guide-spec.ts,
 * the contract both forms import (ruling 2: neither form imports the other, so
 * a DataTable page never carries this chunk). CF-GUIDE-1
 * (scripts/conformance/admin-guides.ts) judges that every user-facing route
 * draws exactly one Guide and every part has its line.
 */
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
  const control = useRef<HTMLButtonElement>(null);
  const anchor = guideAnchor(spec);
  return (
    <>
      <Button
        ref={control}
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
        {t("prim.guide.open" satisfies GuideOpenKey)}
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
            returnFocusTo={control}
          />
        </Suspense>
      )}
    </>
  );
}

export default PageGuide;
