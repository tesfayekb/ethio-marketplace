import { BookOpen } from "lucide-react";
import { Suspense, useRef, useState, type ReactNode } from "react";

import { Spinner } from "@/components/brand/spinner";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import type { GuideNext } from "@/features/admin/guide-next";
import { useI18n } from "@/i18n";
import { resilientLazy } from "@/lib/resilient-lazy";

import { LoadFailedHere } from "./on-demand-notice";
import { StringsLayerGate } from "./strings-layer-gate";
import { TableActionButton } from "./table-actions";

/**
 * P-1c (D313) — THE GUIDE OF AN ADMIN BLOCK, one mechanism for every block.
 *
 * Every admin table (DataTable's `guide` prop) carries one Guide control at the
 * end of its toolbar: a tile with the book, its word "Guide" from md and for
 * screen readers below it (`prim.guide.open`), the sheet's trigger (asChild:
 * `aria-haspopup="dialog"`, `aria-expanded`, and the focus back on close). It
 * opens a side sheet (the dialog surface, DEC-260's facade) whose four parts
 * never vary — What this is · Each column · How to add, change or remove ·
 * What to do next, with ONE link — and whose texts are the block's own keys
 * under its prefix (`<prefix>.guide.what`, `.guide.col.<key>`, `.guide.how`,
 * `.guide.next`) in the `guide` strings layer, asked for on the first open
 * (StringsLayerGate's `layers`, around the body). The sheet's body is fetched
 * on demand (resilientLazy); the control, the gate and the title (the table's
 * own caption) ride with the table. CF-GUIDE-1
 * (scripts/conformance/admin-guides.ts) judges that every admin table has one
 * and every visible column its line.
 */
export type BlockGuideSpec = {
  /** The block's key prefix, e.g. `admin.monetisation.markets`; its guide keys hang under it. */
  readonly prefix: string;
  /** Where "What to do next" leads: a section (and a block's anchor), resolved through sections.ts. */
  readonly next: GuideNext;
  /** The frame's id (an anchor other Guides may lead to); the prefix with dashes by default. */
  readonly anchor?: string;
};

/** A column the sheet explains: its key (the guide line's key) and its visible label. */
export type GuideColumn = { readonly key: string; readonly label: ReactNode };

/** The frame id (and the hash a next-link lands on) of a guided block. */
export function guideAnchor(spec: BlockGuideSpec): string {
  return spec.anchor ?? spec.prefix.replace(/\./g, "-");
}

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

export function BlockGuide({
  spec,
  title,
  columns,
}: {
  spec: BlockGuideSpec;
  /** The sheet's title: the table's own caption. */
  title: ReactNode;
  /** The visible columns in the table's order; each gets its line. */
  columns: readonly GuideColumn[];
}) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const anchor = guideAnchor(spec);
  // The hash a pressed next-link leads to: when its frame is on this page, the
  // sheet's close hands the focus to it instead of back to the control, so the
  // page stays where the router scrolled it.
  const landing = useRef<string | null>(null);
  const label = t("prim.guide.open");
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* The facade's trigger (asChild, DEC-260): it states the dialog's
          aria-haspopup / aria-expanded / aria-controls and the sheet's close
          hands the focus back to it (AG-4) — a bare onClick gave neither. */}
      <SheetTrigger asChild>
        <TableActionButton icon={<BookOpen />} label={label} data-testid={`${anchor}-guide`} />
      </SheetTrigger>
      <SheetContent
        side="end"
        data-testid={`${anchor}-guide-sheet`}
        closeTestId={`${anchor}-guide-close`}
        aria-describedby={undefined}
        onCloseAutoFocus={(event) => {
          const hash = landing.current;
          landing.current = null;
          const frame = hash === null ? null : document.getElementById(hash);
          if (frame === null) return;
          event.preventDefault();
          frame.focus({ preventScroll: true });
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
              columns={columns}
              onNext={(hash) => {
                landing.current = hash ?? null;
                setOpen(false);
              }}
            />
          </Suspense>
        </StringsLayerGate>
      </SheetContent>
    </Sheet>
  );
}

export default BlockGuide;
