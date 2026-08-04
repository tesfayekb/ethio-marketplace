import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

export type ThemeMode = "light" | "dark";

/** Shared with the inline no-flash script in src/routes/__root.tsx. */
export const THEME_STORAGE_KEY = "ethio.theme";

/**
 * The pre-paint script. It runs in <head>, BEFORE the body paints, so the
 * document never renders one theme and then swaps to the other.
 *
 * It is deliberately tiny and dependency-free: read the stored choice, fall
 * back to prefers-color-scheme, write the attribute + class. Nothing else.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var k=${JSON.stringify(
  THEME_STORAGE_KEY,
)};var m=window.localStorage.getItem(k);if(m!=="light"&&m!=="dark"){m=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}var d=document.documentElement;d.setAttribute("data-mode",m);d.classList.toggle("dark",m==="dark");}catch(e){}})();`;

type ThemeValue = {
  /** null until the client has read the DOM — SSR renders no mode-dependent markup. */
  mode: ThemeMode | null;
  setMode: (mode: ThemeMode) => void;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeValue | null>(null);

export function useTheme(): ThemeValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within <ThemeProvider>");
  return ctx;
}

/** Attribute flip + CSS-var cascade. No re-render of the app tree. */
function applyMode(mode: ThemeMode) {
  const root = document.documentElement;
  root.setAttribute("data-mode", mode);
  root.classList.toggle("dark", mode === "dark");
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode | null>(null);

  // The inline script already set the attribute; adopt it rather than
  // recomputing (and never write during render — that would flash).
  useEffect(() => {
    const attr = document.documentElement.getAttribute("data-mode");
    setModeState(attr === "dark" ? "dark" : "light");
  }, []);

  const setMode = useCallback((next: ThemeMode) => {
    applyMode(next);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Private-mode storage refusal must not break the flip; the attribute
      // is already applied, only the persistence is lost.
    }
    setModeState(next);
  }, []);

  const toggle = useCallback(() => {
    const current =
      document.documentElement.getAttribute("data-mode") === "dark" ? "dark" : "light";
    setMode(current === "dark" ? "light" : "dark");
  }, [setMode]);

  const value = useMemo<ThemeValue>(() => ({ mode, setMode, toggle }), [mode, setMode, toggle]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export default ThemeProvider;
