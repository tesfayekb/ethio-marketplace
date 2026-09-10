import { useQueryClient } from "@tanstack/react-query";

import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { ImportDialog } from "@/features/admin/import-dialog";

import { ADMIN_ATTRIBUTES_KEY } from "./use-attributes";

/**
 * IE-2 — THE ATTRIBUTES IMPORT DIALOG.
 *
 * CAT-IE generalised the surface into `@/features/admin/import-dialog`; this
 * file is the attributes PRESET: the route, the two files, the key namespace
 * and the refusal vocabulary. Every testid, key and behaviour is unchanged.
 */

const PATH = "/api/admin/attributes/import";

/** The refusal vocabulary the server speaks; the UI renders it as a key (D1). */
const REASON_KEYS = new Set([
  "missingKey",
  "duplicateKey",
  "badAction",
  "unknownType",
  "malformedOptions",
  "badParent",
  // DEC-045b — the dependency column's refusals.
  "unknownParent",
  "dependsNotSelect",
  "dependsSelf",
  "dependsCycle",

  "blastRadius",
  "unknownCategory",
  "unknownAttribute",
  "outOfScope",
  "inheritedRow",
  "badCardRank",
  "formula",
  // UX-2 PART 6 / IE-8 — a new key that is really a renamed identity.
  "keyRename",
]);

const COUNT_FIELDS = ["adds", "changes", "unlinks", "deletes", "unchanged", "refusals"] as const;

export function ImportAttributesDialog({
  scope,
  guard,
  onClose,
}: {
  scope: string | null;
  guard: GuardFn;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();

  return (
    <ImportDialog
      testid="attribute-import-dialog"
      idPrefix="attribute-import"
      path={PATH}
      keyPrefix="admin.attributes.import"
      files={[
        {
          field: "definitions",
          id: "attribute-import-definitions",
          labelKey: "admin.attributes.import.definitionsFile",
        },
        {
          field: "links",
          id: "attribute-import-links",
          labelKey: "admin.attributes.import.linksFile",
        },
      ]}
      countFields={COUNT_FIELDS}
      reasonKeys={REASON_KEYS}
      family="attributes"
      scope={scope}
      guard={guard}
      onClose={onClose}
      onWritten={async () => {
        await queryClient.invalidateQueries({ queryKey: ADMIN_ATTRIBUTES_KEY });
      }}
    />
  );
}

export default ImportAttributesDialog;
