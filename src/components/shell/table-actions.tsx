import { forwardRef, type ReactNode } from "react";

import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { PressLabel } from "./press-label";

/**
 * BUNDLE 11 B1 (D83, D118) — THE TABLE PAGE'S HEADER ACTIONS, one place for
 * every admin list: the page's own actions on one row above the table, at its
 * end — the plain ones (Export, Import) first, the one primary action
 * ("New …") last. A page with no action renders nothing here.
 *
 * B2 — a group inside the row (Export and Import travel together) wraps at
 * the same end as the row, so a phone shows one right-aligned column, never
 * a left-aligned pair between right-aligned buttons.
 *
 * Bundle 11 V2 (D132) — the row also carries the page's name (`title`, the
 * page's one heading) at its start, so the name and the actions share a line.
 * On a phone each action is a 44 px icon tile (`TableActionButton`): its words
 * stay for screen readers and show under the tile while a finger holds it.
 */
export function TableActions({
  testid,
  title,
  children,
}: {
  testid: string;
  /** The page's heading, drawn at the row's start. */
  title?: ReactNode;
  children?: ReactNode;
}) {
  const hasActions = !(children === null || children === undefined || children === false);
  if (!title && !hasActions) return null;
  return (
    <div data-testid={testid} className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2">
      {/* The name keeps its whole width; actions that do not fit beside it
          move under it, at the end. */}
      {title ? (
        <h1 className="me-auto min-w-0 max-w-full truncate text-xl font-bold leading-7 text-foreground md:text-2xl md:leading-8">
          {title}
        </h1>
      ) : null}
      {hasActions ? (
        <div className="ms-auto flex min-w-0 flex-wrap items-center justify-end gap-1.5 md:gap-2 [&>div]:justify-end">
          {children}
        </div>
      ) : null}
    </div>
  );
}

/**
 * Bundle 11 V2 (D132) — one header action: icon and words from md, the icon
 * alone in a 44 px tile below it (the words stay for screen readers and show
 * under the tile on a long press). The primary action keeps the filled look.
 */
export const TableActionButton = forwardRef<
  HTMLButtonElement,
  Omit<ButtonProps, "children"> & { icon: ReactNode; label: string }
>(({ icon, label, className, variant = "outline", type, ...props }, ref) => (
  <PressLabel label={label}>
    <Button
      ref={ref}
      type={type ?? "button"}
      variant={variant}
      size="touch"
      className={cn(
        "max-md:size-11 max-md:px-0 md:pointer-fine:h-9 md:pointer-fine:min-h-9 md:pointer-fine:px-3",
        className,
      )}
      {...props}
    >
      <span aria-hidden="true" className="inline-flex [&_svg]:size-[18px]">
        {icon}
      </span>
      <span className="max-md:sr-only">{label}</span>
    </Button>
  </PressLabel>
));
TableActionButton.displayName = "TableActionButton";
