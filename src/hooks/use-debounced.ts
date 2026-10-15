import { useEffect, useState } from "react";

/**
 * 300ms debounce for a search box (U1: one request per pause, not per key).
 *
 * Bundle 16 turn R1 (INC-630) — moved here from the admin users' hooks, so the
 * seller's My listings search uses the same one without reaching into admin code;
 * the admin hooks re-export it.
 */
export function useDebounced<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}
