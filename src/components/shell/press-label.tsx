import { useEffect, useRef, useState, type ReactNode, type SyntheticEvent } from "react";

/**
 * Bundle 11 V2 (D132) — THE NAME OF AN ICON TILE, ON A PHONE. A phone has no
 * hover, so an icon-only tile says its name when a finger holds it: about half
 * a second's press shows the name under the tile for a moment, and that press
 * does nothing else (the tap that would follow it is swallowed). A short tap
 * acts as before. A mouse never sees this label; the tile's own words (shown
 * from md) or its tooltip name it there.
 *
 * The label sits under the tile at its END edge, so a tile near the screen's
 * edge never pushes its label off the page. Only presses on the tile itself
 * count: a press inside a panel the tile opened (a portal, whose events still
 * pass through this wrapper in React) is left alone.
 */
const HOLD_MS = 450;
const SHOW_MS = 1600;

export function PressLabel({ label, children }: { label: string; children: ReactNode }) {
  const [shown, setShown] = useState(false);
  const holdTimer = useRef<number | null>(null);
  const hideTimer = useRef<number | null>(null);
  const fired = useRef(false);

  const clearHold = () => {
    if (holdTimer.current !== null) {
      window.clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
  };

  useEffect(
    () => () => {
      clearHold();
      if (hideTimer.current !== null) window.clearTimeout(hideTimer.current);
    },
    [],
  );

  /** True for an event whose target is in the wrapper's own DOM, not a portal. */
  const onTile = (event: SyntheticEvent) =>
    event.target instanceof Node && event.currentTarget.contains(event.target);

  const swallow = (event: SyntheticEvent) => {
    if (!onTile(event) || !fired.current) return;
    fired.current = false;
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <span
      className="relative inline-flex select-none [-webkit-touch-callout:none]"
      onPointerDown={(event) => {
        if (!onTile(event)) return;
        fired.current = false;
        clearHold();
        if (event.pointerType !== "touch") return;
        holdTimer.current = window.setTimeout(() => {
          holdTimer.current = null;
          fired.current = true;
          setShown(true);
          if (hideTimer.current !== null) window.clearTimeout(hideTimer.current);
          hideTimer.current = window.setTimeout(() => setShown(false), SHOW_MS);
        }, HOLD_MS);
      }}
      onPointerUp={clearHold}
      onPointerCancel={clearHold}
      onPointerLeave={clearHold}
      onClickCapture={swallow}
      onContextMenu={(event) => {
        if (onTile(event) && (fired.current || holdTimer.current !== null)) event.preventDefault();
      }}
    >
      {children}
      {shown ? (
        <span
          role="tooltip"
          className="pointer-events-none absolute end-0 top-full z-50 mt-1.5 whitespace-nowrap rounded-md bg-foreground px-2.5 py-1.5 text-xs font-medium text-background shadow-md"
        >
          {label}
        </span>
      ) : null}
    </span>
  );
}

export default PressLabel;
