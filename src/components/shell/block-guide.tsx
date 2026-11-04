import { useState, type ReactNode } from "react";

import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { useI18n } from "@/i18n";

import { GuideSheetContent } from "./guide-sheet";
import {
  GuideIcon,
  guideAnchor,
  type BlockGuideSpec,
  type GuideColumn,
  type GuideOpenKey,
} from "./guide-spec";
import { TableActionButton } from "./table-actions";

export { guideAnchor, type BlockGuideSpec, type GuideColumn } from "./guide-spec";

/**
 * P-1c (D313) — THE GUIDE OF AN ADMIN BLOCK, one mechanism for every block.
 *
 * Every admin table (DataTable's `guide` prop) carries one Guide control at the
 * end of its toolbar: a tile with the book, its word "Guide" from md and for
 * screen readers below it (`prim.guide.open`), the sheet's trigger (asChild:
 * `aria-haspopup="dialog"`, `aria-expanded`, and the focus back on close). It
 * opens the one Guide sheet (guide-sheet.tsx) whose four parts never vary —
 * What this is · Each column · How to add, change or remove · What to do next,
 * with ONE link — and whose texts are the block's own keys under its prefix
 * (`<prefix>.guide.what`, `.guide.col.<key>`, `.guide.how`, `.guide.next`) in
 * the `guide` strings layer, asked for on the first open. The sheet's body is
 * fetched on demand; the control, the facade and the title (the table's own
 * caption) ride with the table. CF-GUIDE-1 (scripts/conformance/admin-guides.ts)
 * judges that every admin table has one and every visible column its line.
 *
 * P-1c turn (b) (D315) — this is the TABLE form; a page without a table carries
 * the page form (page-guide.tsx). Both share the icon, the label and the
 * dialog contract through guide-spec.ts (ruling 2: neither form imports the
 * other), and open the same sheet.
 */
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
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* The facade's trigger (asChild, DEC-260): it states the dialog's
          aria-haspopup / aria-expanded / aria-controls and the sheet's close
          hands the focus back to it (AG-4) — a bare onClick gave neither. */}
      <SheetTrigger asChild>
        <TableActionButton
          icon={<GuideIcon />}
          label={t("prim.guide.open" satisfies GuideOpenKey)}
          data-testid={`${anchor}-guide`}
        />
      </SheetTrigger>
      <GuideSheetContent
        spec={spec}
        title={title}
        parts={columns}
        partsKind="columns"
        onOpenChange={setOpen}
      />
    </Sheet>
  );
}

export default BlockGuide;
