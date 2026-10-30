import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

import {
  DEFAULT_THEME,
  THEME_NAMES,
  parseThemeChoice,
  storedThemeText,
  type ThemeMode,
  type ThemeName,
} from "@/lib/theme-resolver";

export type { ThemeMode };

/** Shared with the inline no-flash script in src/routes/__root.tsx. */
export const THEME_STORAGE_KEY = "ethio.theme";

/**
 * The pre-paint script. It runs in <head>, BEFORE the body paints, so the
 * document never renders one theme and then swaps to the other.
 *
 * It is deliberately tiny and dependency-free, and follows theme-resolver.ts's device →
 * system order (theme-provider.test.ts runs both on the same stored values): the stored
 * `{name, mode}` (a legacy bare "light"/"dark" reads as the default theme in that mode);
 * an unknown name, a bad mode or malformed text falls through to the default theme in the
 * device's preferred mode. It writes data-theme, data-mode and the .dark class. Nothing else.
 */
export const THEME_INIT_SCRIPT = `(function(){var d=document.documentElement,t=${JSON.stringify(THEME_NAMES)},n=${JSON.stringify(DEFAULT_THEME)},m=null;try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var v=window.localStorage.getItem(k);if(v==="light"||v==="dark"){m=v;}else if(v){try{var o=JSON.parse(v);if(o&&t.indexOf(o.name)>=0&&(o.mode==="light"||o.mode==="dark")){n=o.name;m=o.mode;}}catch(e){}}}catch(e){}if(!m){try{m=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}catch(e){m="light";}}d.setAttribute("data-theme",n);d.setAttribute("data-mode",m);d.classList.toggle("dark",m==="dark");})();`;

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

/** The theme the pre-paint script applied; the default when it is absent or unknown. */
function appliedTheme(): ThemeName {
  const name = document.documentElement.getAttribute("data-theme");
  return parseThemeChoice({ name, mode: "light" })?.name ?? DEFAULT_THEME;
}

/** Attribute flip + CSS-var cascade. No re-render of the app tree. */
export function applyMode(mode: ThemeMode) {
  const root = document.documentElement;
  root.setAttribute("data-theme", appliedTheme());
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
      window.localStorage.setItem(
        THEME_STORAGE_KEY,
        storedThemeText({ name: appliedTheme(), mode: next }),
      );
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
