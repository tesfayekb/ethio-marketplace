import { Children, type ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { DialogSize, DialogTone } from "./dialog-look";
import { PanelBody, PanelFooter, PanelHeader } from "./dialog-parts-facade";

/**
 * The staff consoles' one dialog shell (B3): a title, the opener's mark and a
 * body. Moved out of the categories console so the consoles that borrow it no
 * longer load that console's forms.
 *
 * Bundle 2 (INC-1146) — given a description, a subject or a footer it draws the panel anatomy:
 * the header band (an icon tile with its tone, the title, the description), the subject card,
 * the body that alone scrolls, and the footer band. Without them it draws as before.
 */
export function CategoryModal({
  testid,
  title,
  openedBy,
  onClose,
  children,
  size = "default",
  description,
  icon,
  tone = "plain",
  subject,
  footer,
}: {
  testid: string;
  title: string;
  /** C2-GHOST PART B — the confession channel: WHO opened this surface. */
  openedBy: string;
  onClose: () => void;
  children: ReactNode;
  /** narrow for a question, default for a form, wide for a table or a preview. */
  size?: DialogSize;
  /** What happens when the primary is pressed, in the house's plain words. */
  description?: ReactNode;
  icon?: ReactNode;
  tone?: DialogTone;
  /** What the dialog acts on (PanelSubject), drawn from what the opener holds. */
  subject?: ReactNode;
  /** The footer band's buttons. */
  footer?: ReactNode;
}) {
  const bands = description !== undefined || subject !== undefined || footer !== undefined;
  return (
    <Dialog
      open
      onOpenChange={(next) => {
        if (!next) onClose();
      }}
    >
      <DialogContent data-testid={testid} data-opened-by={openedBy} size={size} bands={bands}>
        {bands ? (
          <>
            <PanelHeader icon={icon} tone={tone}>
              <DialogTitle>{title}</DialogTitle>
              {description === undefined ? null : (
                <DialogDescription>{description}</DialogDescription>
              )}
            </PanelHeader>
            <PanelBody>
              {Children.toArray(subject).length === 0 &&
              Children.toArray(children).length === 0 ? null : (
                <>
                  {subject}
                  {Children.toArray(children).length === 0 ? null : (
                    <div className="min-w-0 space-y-3">{children}</div>
                  )}
                </>
              )}
            </PanelBody>
            {footer === undefined ? null : <PanelFooter>{footer}</PanelFooter>}
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
            </DialogHeader>
            <div className="min-w-0 space-y-3">{children}</div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
