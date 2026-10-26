import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

/**
 * Bundle 11 turn C8 (INC-570) — AN ACTION'S OUTCOME IS SEEN WHERE THE ACTION WAS TAKEN.
 *
 * One live region for one action's outcome: a refusal (`tone="error"`) or a
 * confirmation (`tone="done"`). It is placed beside the control that produced
 * it, and whenever its text appears or changes it brings itself into view with
 * `block: "nearest"` — nothing moves when it is already on screen; the move is
 * smooth unless the person asked for reduced motion. Its scroll margins keep it
 * clear of the fixed top band and of the phone's bottom bar (`--bottom-bar`).
 *
 * The role follows the tone (`alert` for a refusal, `status` for a confirmation)
 * unless the caller names one. Without text it renders nothing, unless
 * `persistent` keeps the empty region in the page so its first message is
 * announced — that empty region is a live region with no role (INC-929, S446's
 * class): an empty role answered a page's own getByRole too; the role comes with
 * the words.
 */
export function ActionMessage({
  text,
  tone,
  role,
  testid,
  persistent = false,
  className,
}: {
  text: string | null;
  tone: "error" | "done";
  role?: "alert" | "status";
  testid?: string;
  persistent?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const shown = text !== null && text !== "";

  useEffect(() => {
    if (!shown) return;
    const node = ref.current;
    if (node === null || typeof node.scrollIntoView !== "function") return;
    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    node.scrollIntoView({ block: "nearest", behavior: reduced ? "auto" : "smooth" });
  }, [shown, text]);

  if (!shown && !persistent) return null;
  const liveRole = role ?? (tone === "error" ? "alert" : "status");
  return (
    <p
      ref={ref}
      role={shown ? liveRole : undefined}
      aria-live={liveRole === "status" ? "polite" : persistent ? "assertive" : undefined}
      data-testid={testid}
      data-tone={tone}
      className={cn(
        "scroll-mt-20 scroll-mb-[calc(var(--bottom-bar)+1rem)] text-sm",
        tone === "error" ? "text-destructive" : "text-muted-foreground",
        className,
      )}
    >
      {shown ? text : null}
    </p>
  );
}
