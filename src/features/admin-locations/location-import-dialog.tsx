import { useQueryClient } from "@tanstack/react-query";

import { ImportDialog } from "@/features/admin/import-dialog";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { useI18n } from "@/i18n";

import { ADMIN_LOCATIONS_KEY } from "./use-locations";

/**
 * LOCATIONS ERA L2a — THE PLACES IMPORT DIALOG.
 *
 * The shared shell (`@/features/admin/import-dialog`) with the places preset.
 * L2b-C1 — the MARKETS file moved to the Countries section, so this dialog
 * offers the PLACES file alone; the whole-or-nothing sentence stays in the
 * shell's header. Every semantic verdict (the header law, the caps, the formula
 * law, `parentLaterInFile`, the delete guards, `planHasRefusals`) is the
 * server's; this file names the vocabulary so each refusal renders as a
 * sentence rather than a token (F4).
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
  country,
  guard,
  onClose,
}: {
  /** The toolbar's selected country, or "" for every market (L2b-C1). */
  scope: string;
  country: string;
  guard: GuardFn;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();
  const { t } = useI18n();

  return (
    <ImportDialog
      testid="location-import-dialog"
      idPrefix="location-import"
      title={
        scope === ""
          ? t("admin.locations.import.titleAll")
          : t("admin.locations.import.titleScoped").replace("{country}", country)
      }
      path={PATH}
      keyPrefix="admin.locations.import"
      files={[
        {
          field: "locations",
          id: "location-import-locations",
          labelKey: "admin.locations.import.locationsFile",
        },
      ]}
      countFields={COUNT_FIELDS}
      reasonKeys={REASON_KEYS}
      family="locations"
      scope={scope === "" ? null : scope}
      guard={guard}
      onClose={onClose}
      onWritten={async () => {
        await queryClient.invalidateQueries({ queryKey: ADMIN_LOCATIONS_KEY });
      }}
    />
  );
}

export default ImportLocationsDialog;
