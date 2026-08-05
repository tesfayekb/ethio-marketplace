import { useCallback, useEffect, useState } from "react";

/**
 * The desktop rail's collapsed/expanded choice.
 *
 * Same shape as the theme store (src/providers/theme-provider.tsx): a tiny
 * pre-paint script writes the persisted choice onto <html> BEFORE the body
 * paints, so the first frame already has the right rail width and there is no
 * expand→collapse flash. React state only mirrors the attribute afterwards, for
 * behaviour that needs it (aria-pressed, tooltips) — never for layout.
 *
 * Layout keys off the attribute, not off React state:
 *   html[data-rail="collapsed"]
 */
export const RAIL_STORAGE_KEY = "ethio.rail";

/** Tailwind arbitrary variant matching the collapsed document. */
export const RAIL_COLLAPSED_VARIANT = "[html[data-rail=collapsed]_&]";

export const RAIL_INIT_SCRIPT = `(function(){try{var k=${JSON.stringify(
  RAIL_STORAGE_KEY,
)};var v=window.localStorage.getItem(k);document.documentElement.setAttribute("data-rail",v==="collapsed"?"collapsed":"expanded");}catch(e){}})();`;

function readAttribute(): boolean {
  return document.documentElement.getAttribute("data-rail") === "collapsed";
}

export function useRailCollapsed() {
  // null until the client has read the DOM — SSR renders nothing state-dependent.
  const [collapsed, setCollapsed] = useState<boolean | null>(null);

  useEffect(() => {
    setCollapsed(readAttribute());
  }, []);

  const toggle = useCallback(() => {
    const next = !readAttribute();
    document.documentElement.setAttribute("data-rail", next ? "collapsed" : "expanded");
    try {
      window.localStorage.setItem(RAIL_STORAGE_KEY, next ? "collapsed" : "expanded");
    } catch {
      // Private-mode storage refusal must not break the toggle; only the
      // persistence is lost, the attribute is already applied.
    }
    setCollapsed(next);
  }, []);

  return { collapsed, toggle };
}
