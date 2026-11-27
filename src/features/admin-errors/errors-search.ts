import { ERROR_KINDS, type ErrorKind } from "@/lib/error-clean";

import { DEFAULT_WINDOW, ERROR_WINDOWS, type ErrorWindow } from "./error-labels";

export type ErrorsSearch = { days: ErrorWindow; kind?: ErrorKind };

/** The Errors pages' address: a window the page offers (7 when not), and a known kind or none. */
export function errorsSearch(search: Record<string, unknown>): ErrorsSearch {
  const days = ERROR_WINDOWS.find((value) => String(value) === String(search["days"]));
  const kind = ERROR_KINDS.find((value) => value === search["kind"]);
  return { days: days ?? DEFAULT_WINDOW, ...(kind === undefined ? {} : { kind }) };
}
