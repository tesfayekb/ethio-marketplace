import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** The responsive main-and-aside frame for wizards and detail pages. */
export function SplitLayout({
  main,
  aside,
  asideCollapsible = false,
  className,
}: {
  main: ReactNode;
  aside: ReactNode;
  asideCollapsible?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-6 xl:grid-cols-[minmax(0,1fr)_24rem]",
        className,
      )}
      data-testid="split-layout"
    >
      <div className="min-w-0">{main}</div>
      <aside
        className={cn(
          "min-w-0 lg:sticky lg:[inset-block-start:6rem] lg:self-start",
          asideCollapsible && "hidden lg:block",
        )}
        data-testid="split-layout-aside"
      >
        {aside}
      </aside>
    </div>
  );
}

export default SplitLayout;
