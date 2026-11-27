/**
 * The Errors pages' address. This file rides in the entry every page downloads (a route's
 * `validateSearch` is not split), so it imports nothing: the windows live here, and a kind is checked
 * by its shape only. The page narrows it to a known kind (`knownKind`, error-labels.ts).
 */

/** The windows offered, in days; 7 by default. */
export const ERROR_WINDOWS = [1, 7, 30, 90] as const;
export type ErrorWindow = (typeof ERROR_WINDOWS)[number];
export const DEFAULT_WINDOW: ErrorWindow = 7;

/** A kind as the address carries it: one short lowercase word. */
const KIND_SHAPE = /^[a-z]{1,16}$/;

export type ErrorsSearch = { days: ErrorWindow; kind?: string };

/** A window the page offers (7 when not), and a kind-shaped word or none. */
export function errorsSearch(search: Record<string, unknown>): ErrorsSearch {
  const days = ERROR_WINDOWS.find((value) => String(value) === String(search["days"]));
  const kind = search["kind"];
  return {
    days: days ?? DEFAULT_WINDOW,
    ...(typeof kind === "string" && KIND_SHAPE.test(kind) ? { kind } : {}),
  };
}
