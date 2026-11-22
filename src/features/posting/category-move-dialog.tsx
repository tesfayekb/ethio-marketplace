import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useI18n } from "@/i18n";
import { CircleHelp } from "lucide-react";
import { PanelFooter, PanelHeader } from "@/components/ui/dialog-parts-facade";

import { fill } from "./refusal-text";

/**
 * Bundle 4 step 29 (DEC-095) — A {category:…} POINTER ASKS BEFORE IT MOVES.
 * "Yes" does exactly what choosing that category on step 1 does (the wizard's
 * chooseLeaf, with its reset offer), so this dialog only asks.
 */
export function CategoryMoveDialog({
  path,
  onCancel,
  onConfirm,
}: {
  /** The target's full path; null when no move is being asked. */
  path: string | null;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const { t } = useI18n();
  return (
    <AlertDialog
      open={path !== null}
      onOpenChange={(open) => {
        if (!open) onCancel();
      }}
    >
      <AlertDialogContent bands size="narrow" data-testid="post-category-move-confirm">
        <PanelHeader tone="confirm" icon={<CircleHelp />}>
          <AlertDialogTitle>
            {fill(t("post.catalog.moveAsk"), { path: path ?? "" })}
          </AlertDialogTitle>
          <AlertDialogDescription>{t("post.catalog.moveKeeps")}</AlertDialogDescription>
        </PanelHeader>
        <PanelFooter>
          <AlertDialogCancel data-testid="post-category-move-cancel">
            {t("common.cancel")}
          </AlertDialogCancel>
          <AlertDialogAction data-testid="post-category-move-yes" onClick={onConfirm}>
            {t("post.catalog.moveYes")}
          </AlertDialogAction>
        </PanelFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
