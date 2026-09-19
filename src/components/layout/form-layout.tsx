import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** The responsive field rhythm and mobile action bar for forms. */
export function FormLayout({
  children,
  footer,
  className,
}: {
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("min-w-0", className)} data-testid="form-layout">
      <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2 md:[&>[data-span=full]]:col-span-2">
        {children}
      </div>
      {footer ? (
        <div
          className="sticky [inset-block-end:0] z-20 -mx-4 mt-4 border-t border-border bg-background px-4 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] md:static md:mx-0 md:border-0 md:bg-transparent md:px-0 md:pb-0"
          data-testid="form-layout-actions"
        >
          {footer}
        </div>
      ) : null}
    </div>
  );
}

export default FormLayout;
