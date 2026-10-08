import * as React from "react";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

/**
 * BUNDLE 9 B1 — an icon-only button that cannot exist without a name.
 *
 * `label` is the accessible name and the tooltip's text. `IconButtonBare` is
 * the same button without the tooltip and its provider: it is the child an
 * `asChild` trigger (a menu trigger) is handed, so that the tooltip can sit
 * OUTSIDE that trigger (INC-089, app-rail.tsx WithTooltip).
 */

export type IconButtonTone = "neutral" | "danger" | "success" | "warning" | "info";
export type IconButtonSize = "row" | "touch";

const ICON_BUTTON_TONES: Record<IconButtonTone, string> = {
  neutral: "text-muted-foreground hover:bg-accent hover:text-foreground",
  danger: "text-destructive hover:bg-destructive-soft",
  success: "text-success hover:bg-success-soft",
  warning: "text-warning hover:bg-warning-soft",
  info: "text-info hover:bg-info-soft",
};

const ICON_BUTTON_SIZES: Record<IconButtonSize, string> = {
  // THE SIZE RULE: 44 px for a finger, 36 px from md with a fine pointer.
  row: "size-11 md:pointer-fine:size-9",
  touch: "size-11",
};

export interface IconButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "children" | "title"
> {
  label: string;
  icon: React.ReactNode;
  tone?: IconButtonTone;
  size?: IconButtonSize;
  /** The tooltip's text when it differs from the accessible name (RowActions). */
  tooltip?: string;
}

export const IconButtonBare = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    { label, icon, tone = "neutral", size = "row", tooltip: _tooltip, className, type, ...props },
    ref,
  ) => (
    <Button
      ref={ref}
      type={type ?? "button"}
      variant="ghost"
      aria-label={label}
      className={cn("p-0", ICON_BUTTON_SIZES[size], ICON_BUTTON_TONES[tone], className)}
      {...props}
    >
      <span aria-hidden="true" className="inline-flex [&_svg]:size-4">
        {icon}
      </span>
    </Button>
  ),
);
IconButtonBare.displayName = "IconButtonBare";

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>((props, ref) => (
  <TooltipProvider delayDuration={150}>
    <Tooltip>
      <TooltipTrigger asChild>
        <IconButtonBare ref={ref} {...props} />
      </TooltipTrigger>
      <TooltipContent>{props.tooltip ?? props.label}</TooltipContent>
    </Tooltip>
  </TooltipProvider>
));
IconButton.displayName = "IconButton";
