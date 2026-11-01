import * as React from "react";

import { cn } from "@/lib/utils";
import { DIALOG_FIELD } from "./dialog-look";

/**
 * BUNDLE 9 B4, turn S6-2 — THE ONE NATIVE SELECT: the only file that draws a `<select>`
 * (CF-LIST-1). Two looks (ruling 2 of the S6 plan):
 *  - control (the default): the shared closed control (THE SIZE RULE: 44 px, 36 px on a fine
 *    pointer from md), pressed in inside a dialog, a sheet or the filter panel (DIALOG_FIELD);
 *  - form: the posting form kit's look, which the step passes whole as its className
 *    (controlClass in features/posting/field.tsx), so the form's selects match its inputs.
 */
const SELECT_LOOK = {
  control: cn(
    "h-11 md:pointer-fine:h-9 min-w-0 rounded-md border border-input bg-card px-3 text-sm text-foreground shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
    DIALOG_FIELD,
  ),
  form: "",
} as const;
export type SelectLook = keyof typeof SELECT_LOOK;

export const NativeSelect = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement> & { look?: SelectLook }
>(({ className, look = "control", ...props }, ref) => (
  <select ref={ref} className={cn(SELECT_LOOK[look], className)} {...props} />
));
NativeSelect.displayName = "NativeSelect";
