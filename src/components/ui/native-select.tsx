import * as React from "react";

import { cn } from "@/lib/utils";

/** BUNDLE 9 B4 — one styled native select (THE SIZE RULE for a field). */
export const NativeSelect = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(
      "h-11 md:pointer-fine:h-9 min-w-0 rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  />
));
NativeSelect.displayName = "NativeSelect";
