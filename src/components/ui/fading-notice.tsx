import { useEffect, useState } from "react";

/**
 * D192 (the operator, 2026-10-16) — a confirmation that shows for a few seconds
 * and goes away, drawn in place (no <Toaster/> is mounted in this app; its
 * notices are inline live regions). `nonce` re-shows the same words when a
 * second save says the same thing. A screen reader hears it through the live
 * region; nothing else moves.
 */
export const FADING_NOTICE_MS = 4000;

export function FadingNotice({
  text,
  nonce,
  testid,
  ms = FADING_NOTICE_MS,
}: {
  text: string | null;
  nonce: number;
  testid: string;
  ms?: number;
}) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (text === null || nonce === 0) {
      setShown(false);
      return;
    }
    setShown(true);
    const timer = window.setTimeout(() => setShown(false), ms);
    return () => window.clearTimeout(timer);
  }, [text, nonce, ms]);
  return (
    <p
      role="status"
      aria-live="polite"
      data-testid={testid}
      data-shown={shown ? "true" : "false"}
      className={`text-sm text-foreground transition-opacity duration-500 ${shown ? "opacity-100" : "opacity-0"}`}
    >
      {shown ? text : ""}
    </p>
  );
}
