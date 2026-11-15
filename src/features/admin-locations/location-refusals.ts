import { useState } from "react";

import { useI18n, type MessageKey } from "@/i18n";
import { ownValue } from "@/lib/own-key";
import { readRefusal, refusalText, type RefusalFamily } from "@/lib/refusal";
import { RATE_LIMITED_KEY } from "@/lib/refusal-tail";

/**
 * DEC-333 (F1-4b) — the places console's own words for its doors' codes. Every id the console
 * spoke before the doors moved to codes keeps its line, the seven the ancestry trigger raises as
 * plain sentences (`rootMustBeCountry`, `badSlug`, `missingCoordinates`, `parentMissing`,
 * `levelMismatch`, `crossCountry`, `parentInactive`) among them: whatever the SQLSTATE, the reader
 * hears an error's `message` as its code. `permissionDenied` (with or without its `:scope`) reads
 * the console's denied line; the gate's step-up sentence (SQLSTATE P0009) still reads its own
 * line; a code with no words of its own (`notSignedIn`, `accountDeactivated`, `unknownBatch`,
 * `undoBlocked`) draws the console's generic line.
 */
export const LOCATION_REFUSALS = {
  words: {
    rateLimited: RATE_LIMITED_KEY,
    permissionDenied: "admin.locations.error.denied",
    locationMissing: "admin.locations.error.locationMissing",
    parentMissing: "admin.locations.error.parentMissing",
    parentInactive: "admin.locations.error.parentInactive",
    levelMismatch: "admin.locations.error.levelMismatch",
    crossCountry: "admin.locations.error.crossCountry",
    badSlug: "admin.locations.error.badSlug",
    missingCoordinates: "admin.locations.error.missingCoordinates",
    rootMustBeCountry: "admin.locations.error.rootMustBeCountry",
    badLevel: "admin.locations.error.badLevel",
    isoOnRegionsOnly: "admin.locations.error.isoOnRegionsOnly",
    nameRequired: "admin.locations.error.nameRequired",
    unknownCountry: "admin.locations.error.unknownCountry",
    useMoveDoor: "admin.locations.error.useMoveDoor",
    cannotMoveCountry: "admin.locations.error.cannotMoveCountry",
    orderCountriesInProfile: "admin.locations.error.orderCountriesInProfile",
    notAChild: "admin.locations.error.notAChild",
    slugMismatch: "admin.locations.error.slugMismatch",
    retireInstead: "admin.locations.error.retireInstead",
  },
  sentences: [[/step[ -]?up/i, "admin.locations.error.stepUp"]],
  generic: "admin.locations.error.unknown",
} as const satisfies RefusalFamily;

/** `retireInstead`'s closed list of details, each beside its sentence. */
const RETIRE_DETAILS = {
  hasChildren: "admin.locations.error.detail.hasChildren",
  hasListings: "admin.locations.error.detail.hasListings",
  hasCoverage: "admin.locations.error.detail.hasCoverage",
  hasProfileDefaults: "admin.locations.error.detail.hasProfileDefaults",
} as const satisfies Record<string, MessageKey>;

/**
 * A places screen's refusal state: `fail` reads a door's refusal through the one reader with this
 * family's words and the catalogue's own check for a key another table's trigger still raises; a
 * cancelled step-up says nothing, a refused delete names what still holds the place. `render`
 * shows a client-side check's own key.
 */
export function useLocationRefusal() {
  const { t, has } = useI18n();
  const [message, setMessage] = useState<string | null>(null);
  const clear = () => setMessage(null);
  const fail = (error: unknown) => {
    const read = readRefusal(error, LOCATION_REFUSALS, has);
    if (read.silent) {
      setMessage(null);
      return;
    }
    const text = refusalText(read, t);
    const detail =
      read.key === LOCATION_REFUSALS.words.retireInstead && read.tail !== undefined
        ? ownValue(RETIRE_DETAILS, read.tail)
        : undefined;
    setMessage(detail === undefined ? text : `${text} — ${t(detail)}`);
  };
  const render = (key: MessageKey) => setMessage(t(key));
  return { message, clear, fail, render };
}
