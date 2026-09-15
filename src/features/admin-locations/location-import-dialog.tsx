import { useQueryClient } from "@tanstack/react-query";

import { ImportDialog } from "@/features/admin/import-dialog";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";

import { ADMIN_LOCATIONS_KEY } from "./use-locations";

/**
 * LOCATIONS ERA L2a — THE LOCATIONS IMPORT DIALOG.
 *
 * The shared shell (`@/features/admin/import-dialog`) with the locations
 * preset: TWO files — markets and places — either of which is a complete run
 * on its own; the route refuses an empty pair. Every semantic verdict (the
 * header law, the caps, the formula law, `parentLaterInFile`, the delete
 * guards, `planHasRefusals`) is the server's; this file names the vocabulary so
 * each refusal renders as a sentence rather than a token (F4).
 */

const PATH = "/api/admin/locations/import";

/** The planner's whole vocabulary, copied by name from the L1b doors (E7). */
const REASON_KEYS = new Set([
  "badKey",
  "unknownParent",
  "parentLaterInFile",
  "levelMismatch",
  "parentInactive",
  "crossCountry",
  "duplicateKey",
  "missingCoordinates",
  "isoOnRegionsOnly",
  "nameRequired",
  "countryRowByActivation",
  "unknownKey",
  "deleteBlocked",
  "hasChildren",
  "hasListings",
  "hasCoverage",
  "hasProfileDefaults",
  "statusNeedsAction",
  "badCountryCode",
  "badUnitSystem",
  "badCurrency",
  "notARoot",
  "duplicateCategory",
  "scopedRolesExist",
  "unknownCountry",
  "badAction",
  "outOfScope",
  "alreadyOpen",
  "alreadyClosed",
  "alreadyActive",
  "alreadyRetired",
  "planHasRefusals",
  "batchAlreadyUndone",
  "formula",
  "badNumber",
  "badBoolean",
  "tooLong",
  "required",
]);

const COUNT_FIELDS = [
  "adds",
  "changes",
  "retires",
  "reactivations",
  "deletes",
  "unchanged",
  "refusals",
] as const;

export function ImportLocationsDialog({
  scope,
  guard,
  onClose,
}: {
  /** The country filter's code, or null for every market. */
  scope: string | null;
  guard: GuardFn;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();

  return (
    <ImportDialog
      testid="location-import-dialog"
      idPrefix="location-import"
      path={PATH}
      keyPrefix="admin.locations.import"
      files={[
        {
          field: "countries",
          id: "location-import-countries",
          labelKey: "admin.locations.import.countriesFile",
          optional: true,
        },
        {
          field: "locations",
          id: "location-import-locations",
          labelKey: "admin.locations.import.locationsFile",
          optional: true,
        },
      ]}
      countFields={COUNT_FIELDS}
      reasonKeys={REASON_KEYS}
      family="locations"
      scope={scope}
      guard={guard}
      onClose={onClose}
      onWritten={async () => {
        await queryClient.invalidateQueries({ queryKey: ADMIN_LOCATIONS_KEY });
      }}
    />
  );
}

export default ImportLocationsDialog;
