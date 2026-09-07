import { useQueryClient } from "@tanstack/react-query";

import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { ImportDialog } from "@/features/admin/import-dialog";

import { ADMIN_CATEGORIES_KEY } from "./use-categories";

/**
 * CAT-IE PART C — THE CATEGORIES IMPORT DIALOG.
 *
 * The shared shell (`@/features/admin/import-dialog`) with the categories
 * preset: one file, the categories route, this console's key namespace and
 * the refusal vocabulary the planner speaks. Every semantic verdict — unknown
 * parent, cycle, catch-all parent, blast radius, scope — is the server's.
 */

const PATH = "/api/admin/categories/import";

const REASON_KEYS = new Set([
  "missingSlug",
  "duplicateSlug",
  "badAction",
  "missingName",
  "unknownSlug",
  "unknownParent",
  "catchallParent",
  "cycle",
  "slugRename",
  "hasChildren",
  "hasListings",
  "deleteActive",
  "unknownCountry",
  "badDate",
  "outOfScope",
  "formula",
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

export function ImportCategoriesDialog({
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
      testid="category-import-dialog"
      idPrefix="category-import"
      path={PATH}
      keyPrefix="admin.categories.import"
      files={[
        {
          field: "categories",
          id: "category-import-file",
          labelKey: "admin.categories.import.file",
        },
      ]}
      countFields={COUNT_FIELDS}
      reasonKeys={REASON_KEYS}
      scope={scope}
      guard={guard}
      onClose={onClose}
      onWritten={async () => {
        await queryClient.invalidateQueries({ queryKey: ADMIN_CATEGORIES_KEY });
      }}
    />
  );
}

export default ImportCategoriesDialog;
