import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

const WIDTHS = {
  narrow: "max-w-md",
  reading: "max-w-3xl",
  wide: "max-w-[96rem]",
  full: "max-w-none",
} as const;

/** The responsive content column shared by every page family. */
export function PageShell<T extends ElementType = "div">({
  as,
  width = "wide",
  className,
  children,
  ...props
}: {
  as?: T;
  width?: keyof typeof WIDTHS;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">) {
  const Component = as ?? "div";
  return (
    <Component
      className={cn(
        "mx-auto w-full min-w-0 px-4 py-4 md:px-6 md:py-6 xl:px-8",
        WIDTHS[width],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export default PageShell;
