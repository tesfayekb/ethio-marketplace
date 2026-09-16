import { useQueryClient } from "@tanstack/react-query";

import { ImportDialog } from "@/features/admin/import-dialog";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { useI18n } from "@/i18n";

import { ADMIN_COUNTRIES_KEY } from "./use-countries";

/**
 * L2b-C1 — THE COUNTRIES IMPORT DIALOG. The shared shell with the MARKETS file
 * alone, unscoped: a markets file names its own countries, so there is nothing
 * to scope it to. The route, the refusal vocabulary and the counted verbs are
 * the locations import family's — one server contract, one key namespace, one
 * dialog (B1/B3); only the title is the section's own.
 */

const PATH = "/api/admin/locations/import";

/** The planner's whole vocabulary, copied by name from the L1b doors (E7). */
const REASON_KEYS = new Set([
  "badCountryCode",
  "badUnitSystem",
  "badCurrency",
  "nameRequired",
  "notARoot",
  "duplicateCategory",
  "scopedRolesExist",
  "unknownCountry",
  "badAction",
  "outOfScope",
  "alreadyOpen",
  "alreadyClosed",
  "duplicateKey",
  "unknownKey",
  "statusNeedsAction",
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

export function ImportCountriesDialog({ guard, onClose }: { guard: GuardFn; onClose: () => void }) {
  const queryClient = useQueryClient();
  const { t } = useI18n();

  return (
    <ImportDialog
      testid="country-import-dialog"
      idPrefix="country-import"
      title={t("admin.countries.import.title")}
      path={PATH}
      keyPrefix="admin.locations.import"
      files={[
        {
          field: "countries",
          id: "country-import-countries",
          labelKey: "admin.locations.import.countriesFile",
        },
      ]}
      countFields={COUNT_FIELDS}
      reasonKeys={REASON_KEYS}
      family="locations"
      scope={null}
      guard={guard}
      onClose={onClose}
      onWritten={async () => {
        await queryClient.invalidateQueries({ queryKey: ADMIN_COUNTRIES_KEY });
      }}
    />
  );
}

export default ImportCountriesDialog;
