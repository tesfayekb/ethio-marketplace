import type { ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

/**
 * The staff consoles' one dialog shell (B3): a title, the opener's mark and a
 * body. Moved out of the categories console so the consoles that borrow it no
 * longer load that console's forms.
 */
export function CategoryModal({
  testid,
  title,
  openedBy,
  onClose,
  children,
}: {
  testid: string;
  title: string;
  /** C2-GHOST PART B — the confession channel: WHO opened this surface. */
  openedBy: string;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <Dialog
      open
      onOpenChange={(next) => {
        if (!next) onClose();
      }}
    >
      <DialogContent data-testid={testid} data-opened-by={openedBy}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="min-w-0 space-y-3">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
