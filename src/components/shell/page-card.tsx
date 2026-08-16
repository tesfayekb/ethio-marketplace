import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * U0l — THE PAGE-CARD STANDARD (shell law).
 *
 * One card primitive for every page block, so auth, settings, the admin
 * section pages and the feed's empty state are visually the SAME object:
 * `bg-card`, one hairline border, `rounded-lg`, `p-6`.
 *
 * RULE:
 *  - a SINGLE-CONTENT page (sign-in, an admin section) renders exactly ONE
 *    PageCard inside a `PAGE_MAIN_CLASS` main at the standard width;
 *  - a MULTI-CARD page (admin landing, settings sections) renders the SAME
 *    primitive once per block — never a hand-rolled card.
 *
 * The classes are censused from the existing settings/admin cards, not
 * invented: `rounded-lg border border-border bg-card p-6` and the
 * `mx-auto w-full max-w-sm px-4 py-10` single-column main.
 */
export const PAGE_MAIN_CLASS = "mx-auto w-full max-w-sm px-4 py-10";

export const PAGE_CARD_CLASS = "rounded-lg border border-border bg-card p-6";

export function PageCard({
  children,
  className,
  /** Placeholder/coming-soon blocks use the dashed edge. */
  dashed = false,
  testid = "page-card",
  as: As = "section",
}: {
  children: ReactNode;
  className?: string;
  dashed?: boolean;
  testid?: string;
  as?: "section" | "div";
}) {
  return (
    <As
      data-testid={testid}
      className={cn(PAGE_CARD_CLASS, dashed && "border-dashed", className)}
    >
      {children}
    </As>
  );
}

export default PageCard;
