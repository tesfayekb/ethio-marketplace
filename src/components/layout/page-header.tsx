import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** The title, context, and primary actions shared by page families. */
export function PageHeader({
  title,
  description,
  breadcrumb,
  actions,
  className,
}: {
  title: ReactNode;
  description?: ReactNode;
  breadcrumb?: ReactNode;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn("grid min-w-0 grid-cols-[minmax(0,1fr)_auto] gap-4", className)}
      data-testid="page-header"
    >
      {breadcrumb ? <div className="col-span-full min-w-0">{breadcrumb}</div> : null}
      <div className="min-w-0">
        <h1 className="text-xl font-semibold text-foreground">{title}</h1>
        {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
      </div>
      {actions ? <div className="hidden shrink-0 items-start gap-2 md:flex">{actions}</div> : null}
      {actions ? (
        <div
          className="sticky [inset-block-end:0] z-20 col-span-full flex min-h-11 items-center gap-2 border-t border-border bg-background py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] md:hidden"
          data-testid="page-header-mobile-actions"
        >
          {actions}
        </div>
      ) : null}
    </header>
  );
}

export default PageHeader;
