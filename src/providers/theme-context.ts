import { createContext, useContext } from "react";

import type { ThemeMode } from "@/lib/theme-resolver";

export type ThemeValue = {
  /** null until the client has read the DOM — SSR renders no mode-dependent markup. */
  mode: ThemeMode | null;
  setMode: (mode: ThemeMode) => void;
  toggle: () => void;
};

export const ThemeContext = createContext<ThemeValue | null>(null);

export function useTheme(): ThemeValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within <ThemeProvider>");
  return ctx;
}
