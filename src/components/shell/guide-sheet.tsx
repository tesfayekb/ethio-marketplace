import { Suspense, useRef, type ReactNode, type RefObject } from "react";

import { Spinner } from "@/components/brand/spinner";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useI18n } from "@/i18n";
import { resilientLazy } from "@/lib/resilient-lazy";

import { LoadFailedHere } from "./on-demand-notice";
import { guideAnchor, type BlockGuideSpec, type GuidePart, type PartsKind } from "./page-guide";
import { StringsLayerGate } from "./strings-layer-gate";

/**
 * P-1c (D313, D315) — THE ONE GUIDE SHEET, the body host both forms open.
 *
 * `GuideSheetContent` is the side sheet (the dialog surface, DEC-260's facade):
 * its title is the block's or page's own name; the `guide` strings layer is
 * asked for around its body on the first open (StringsLayerGate's `layers`);
 * the body itself (block-guide-sheet.tsx) is fetched on demand through
 * resilientLazy and says so in its own place when it cannot be (INC-911). The
 * table form (block-guide.tsx) draws it inside its own `<Sheet>` with the tile
 * as the trigger; the page form (page-guide.tsx) fetches this module on the
 * first tap and draws `PageGuideSheet`, the same content inside a controlled
 * `<Sheet>` with no trigger (the dialog returns the focus to the control it
 * was opened from).
 *
 * The close after a pressed next-link: when the frame it leads to is on this
 * page, the focus goes to that frame instead of back to the control, so the
 * page stays where the router scrolled it.
 */
function GuideUnreachable({ anchor }: { anchor: string }) {
  return (
    <LoadFailedHere
      testid={`${anchor}-guide-failed`}
      refreshTestid={`${anchor}-guide-refresh`}
      className="min-h-40 justify-center gap-3"
    />
  );
}

const BlockGuideSheet = resilientLazy(
  () => import("./block-guide-sheet").then((module) => module.BlockGuideSheet),
  "the block guide",
  GuideUnreachable,
  { inPlace: true },
);

export type GuideSheetProps = {
  spec: BlockGuideSpec;
  /** The sheet's title: the block's caption or the page's name. */
  title: ReactNode;
  /** The parts in order (a table's visible columns, a page's parts); each gets its line. */
  parts: readonly GuidePart[];
  partsKind: PartsKind;
  /** The part the person is on (a wizard's step), marked `aria-current="step"`. */
  current?: string;
  /**
   * The control the focus returns to on close when no next-link landed it elsewhere.
   * The page form has no SheetTrigger (the sheet mounts on the first tap), so the
   * dialog knows no trigger of its own; the table form leaves this unset.
   */
  returnFocusTo?: RefObject<HTMLElement | null>;
};

export function GuideSheetContent({
  spec,
  title,
  parts,
  partsKind,
  current,
  returnFocusTo,
  onOpenChange,
}: GuideSheetProps & { onOpenChange: (open: boolean) => void }) {
  const { t } = useI18n();
  const anchor = guideAnchor(spec);
  // The hash a pressed next-link leads to: when its frame is on this page, the
  // sheet's close hands the focus to it instead of back to the control.
  const landing = useRef<string | null>(null);
  return (
    <SheetContent
      side="end"
      data-testid={`${anchor}-guide-sheet`}
      closeTestId={`${anchor}-guide-close`}
      aria-describedby={undefined}
      onCloseAutoFocus={(event) => {
        const hash = landing.current;
        landing.current = null;
        const frame = hash === null ? null : document.getElementById(hash);
        const target = frame ?? returnFocusTo?.current ?? null;
        if (target === null) return;
        event.preventDefault();
        target.focus({ preventScroll: true });
      }}
    >
      <SheetHeader>
        <SheetTitle>{title}</SheetTitle>
      </SheetHeader>
      <StringsLayerGate layers={["guide"]}>
        <Suspense
          fallback={
            <div className="flex justify-center py-12">
              <Spinner label={t("common.loading")} />
            </div>
          }
        >
          <BlockGuideSheet
            anchor={anchor}
            spec={spec}
            parts={parts}
            partsKind={partsKind}
            current={current}
            onNext={(hash) => {
              landing.current = hash ?? null;
              onOpenChange(false);
            }}
          />
        </Suspense>
      </StringsLayerGate>
    </SheetContent>
  );
}

/** The page form's sheet: controlled, trigger-less (page-guide.tsx mounts it on the first tap). */
export function PageGuideSheet({
  open,
  onOpenChange,
  ...content
}: GuideSheetProps & { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <GuideSheetContent {...content} onOpenChange={onOpenChange} />
    </Sheet>
  );
}

export default GuideSheetContent;
