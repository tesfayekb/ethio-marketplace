import { forwardRef, type ReactNode } from "react";

import { Button, type ButtonProps } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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
 *
 * P-1c (D313) — `level`: the title is the page's one `<h1>` by default; a block
 * inside a page that already has its heading (Monetisation's six tables) passes
 * "h2", so a page keeps exactly one h1.
 */
export function TableActions({
  testid,
  title,
  level = "h1",
  children,
}: {
  testid: string;
  /** The page's heading, drawn at the row's start. */
  title?: ReactNode;
  /** The heading's level: the page's one h1 (default), or h2 for a block inside a page. */
  level?: "h1" | "h2";
  children?: ReactNode;
}) {
  const hasActions = !(children === null || children === undefined || children === false);
  if (!title && !hasActions) return null;
  const Heading = level;
  return (
    <div data-testid={testid} className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2">
      {/* The name keeps its whole width; actions that do not fit beside it
          move under it, at the end. */}
      {title ? (
        <Heading
          className={cn(
            "me-auto min-w-0 max-w-full truncate font-bold text-foreground",
            level === "h1" ? "text-xl leading-7 md:text-2xl md:leading-8" : "text-lg leading-7",
          )}
        >
          {title}
        </Heading>
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
 *
 * Bundle 11 V2b (the operator's walk) — no header action carries the
 * browser's own `title` tooltip. A `hint` (a cost to state where it is spent,
 * DEC-032) shows in the house tooltip on hover or keyboard focus.
 */
export const TableActionButton = forwardRef<
  HTMLButtonElement,
  Omit<ButtonProps, "children" | "title"> & { icon: ReactNode; label: string; hint?: string }
>(({ icon, label, hint, className, variant = "outline", type, ...props }, ref) => {
  const button = (
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
  );
  return (
    <PressLabel label={label}>
      {hint ? (
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>{button}</TooltipTrigger>
            <TooltipContent className="max-w-72">{hint}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        button
      )}
    </PressLabel>
  );
});
TableActionButton.displayName = "TableActionButton";
