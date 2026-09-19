import type { HTMLAttributes, ReactNode } from "react";

import type { ContentGridSpan } from "@/components/layout/content-grid";
import { cn } from "@/lib/utils";

/** The titled content card shared by settings and overview families. */
export function Section({
  title,
  description,
  children,
  className,
  testid = "layout-section",
  span = 1,
  ...props
}: {
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
  testid?: string;
  span?: ContentGridSpan;
} & HTMLAttributes<HTMLElement>) {
  return (
    <section
      data-testid={testid}
      data-grid-span={span}
      className={cn("min-w-0 rounded-lg border border-border bg-card p-4 md:p-6", className)}
      {...props}
    >
      {title ? <h2 className="text-base font-semibold text-foreground">{title}</h2> : null}
      {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
      {children}
    </section>
  );
}

export default Section;
