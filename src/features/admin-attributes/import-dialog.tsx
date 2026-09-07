import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { supabase } from "@/integrations/supabase/client";

import { Button } from "@/components/ui/button";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { CategoryModal } from "@/features/admin-categories/category-dialogs";
import { useI18n, type MessageKey } from "@/i18n";

import { ADMIN_ATTRIBUTES_KEY } from "./use-attributes";

/**
 * IE-2 — THE IMPORT DIALOG: file pick → PREVIEW → Confirm / Discard, then
 * "Undo last import" for the batch that was just written.
 *
 * The browser reads the two files as TEXT and posts them verbatim. It parses
 * NOTHING: the header law, the caps, the formula law and every semantic
 * refusal are the server's (`/api/admin/attributes/import` → the gated RPCs).
 * The preview's digest travels with the commit, so a file edited between the
 * two clicks is refused rather than half-applied.
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
  "blastRadius",
  "unknownCategory",
  "unknownAttribute",
  "outOfScope",
  "inheritedRow",
  "badCardRank",
  "formula",
]);

interface Refusal {
  file: string;
  row: number;
  key: string;
  reason: string;
  detail?: string;
}

interface Counts {
  adds: number;
  changes: number;
  unlinks: number;
  deletes: number;
  unchanged: number;
  refusals: number;
}

interface Preview {
  counts: Counts;
  refusals: Refusal[];
  digest: string;
}

async function bearer(): Promise<Record<string, string>> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token ?? "";
  return token === ""
    ? { "Content-Type": "application/json" }
    : { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
}

export function ImportAttributesDialog({
  scope,
  guard,
  onClose,
}: {
  scope: string | null;
  guard: GuardFn;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const queryClient = useQueryClient();
  const [definitions, setDefinitions] = useState("");
  const [links, setLinks] = useState("");
  const [busy, setBusy] = useState(false);
  const [preview, setPreview] = useState<Preview | null>(null);
  const [committed, setCommitted] = useState<{ batchId: string; counts: Counts } | null>(null);
  const [undone, setUndone] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const reasonLabel = (refusal: Refusal): string => {
    const key = REASON_KEYS.has(refusal.reason) ? refusal.reason : "unknown";
    const text = t(`admin.attributes.import.reason.${key}` as MessageKey);
    return refusal.detail === undefined ? text : `${text} (${refusal.detail})`;
  };

  const failed = (payload: { error?: string }, status: number) => {
    const named = payload.error ?? "";
    if (status === 403) return setError(t("admin.attributes.import.error.denied"));
    if (status === 428) return setError(t("admin.attributes.import.error.stepUp"));
    if (status === 409 && named === "fileChanged")
      return setError(t("admin.attributes.import.error.fileChanged"));
    if (status === 409) return setError(t("admin.attributes.import.error.busy"));
    if (status === 413 || named === "fileTooLarge")
      return setError(t("admin.attributes.import.error.tooLarge"));
    if (named === "tooManyRows") return setError(t("admin.attributes.import.error.tooManyRows"));
    if (named === "badHeader") return setError(t("admin.attributes.import.error.badHeader"));
    if (named === "emptyFile") return setError(t("admin.attributes.import.error.emptyFile"));
    return setError(t("admin.attributes.import.error.failed"));
  };

  const post = async (body: Record<string, unknown>): Promise<unknown | null> => {
    const response = await fetch(PATH, {
      method: "POST",
      headers: await bearer(),
      body: JSON.stringify(body),
    });
    const payload = (await response.json().catch(() => ({}))) as { error?: string };
    if (!response.ok) {
      failed(payload, response.status);
      return null;
    }
    return payload;
  };

  const readFile = (file: File | undefined, set: (text: string) => void) => {
    setPreview(null);
    setCommitted(null);
    setError(null);
    if (file === undefined) {
      set("");
      return;
    }
    void file.text().then(set);
  };

  const runPreview = async () => {
    setBusy(true);
    setError(null);
    setCommitted(null);
    try {
      const result = (await post({ mode: "preview", definitions, links, scope })) as Preview | null;
      setPreview(result);
    } finally {
      setBusy(false);
    }
  };

  const runCommit = () => {
    if (preview === null) return;
    setError(null);
    void guard(async () => {
      setBusy(true);
      try {
        const result = (await post({
          mode: "commit",
          definitions,
          links,
          scope,
          digest: preview.digest,
        })) as { batch_id: string; counts: Counts } | null;
        if (result !== null) {
          setCommitted({ batchId: result.batch_id, counts: result.counts });
          setPreview(null);
          await queryClient.invalidateQueries({ queryKey: ADMIN_ATTRIBUTES_KEY });
        }
      } finally {
        setBusy(false);
      }
    }).catch(() => setError(t("admin.attributes.import.error.failed")));
  };

  const runUndo = () => {
    if (committed === null) return;
    setError(null);
    void guard(async () => {
      setBusy(true);
      try {
        const result = (await post({ mode: "undo", batchId: committed.batchId })) as {
          restored: number;
        } | null;
        if (result !== null) {
          setUndone(result.restored);
          setCommitted(null);
          await queryClient.invalidateQueries({ queryKey: ADMIN_ATTRIBUTES_KEY });
        }
      } finally {
        setBusy(false);
      }
    }).catch(() => setError(t("admin.attributes.import.error.failed")));
  };

  const chosen = definitions !== "" || links !== "";
  const counts = preview?.counts ?? committed?.counts ?? null;

  return (
    <CategoryModal
      testid="attribute-import-dialog"
      openedBy="toolbar-import"
      title={t("admin.attributes.import.title")}
      onClose={onClose}
    >
      <p className="text-sm text-muted-foreground">{t("admin.attributes.import.hint")}</p>

      <div className="flex flex-col gap-3">
        <label className="flex flex-col gap-1 text-sm" htmlFor="attribute-import-definitions">
          <span>{t("admin.attributes.import.definitionsFile")}</span>
          <input
            id="attribute-import-definitions"
            data-testid="attribute-import-definitions"
            type="file"
            accept=".csv,text/csv"
            className="min-h-11 w-full text-sm"
            onChange={(event) => readFile(event.target.files?.[0], setDefinitions)}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm" htmlFor="attribute-import-links">
          <span>{t("admin.attributes.import.linksFile")}</span>
          <input
            id="attribute-import-links"
            data-testid="attribute-import-links"
            type="file"
            accept=".csv,text/csv"
            className="min-h-11 w-full text-sm"
            onChange={(event) => readFile(event.target.files?.[0], setLinks)}
          />
        </label>
      </div>

      <Button
        type="button"
        variant="outline"
        size="touch"
        data-testid="attribute-import-preview"
        disabled={!chosen || busy}
        onClick={() => void runPreview()}
      >
        {busy ? t("admin.attributes.import.busy") : t("admin.attributes.import.preview")}
      </Button>

      {counts === null ? null : (
        <p className="text-sm" role="status" data-testid="attribute-import-counts">
          {t("admin.attributes.import.counts")
            .replace("{adds}", String(counts.adds))
            .replace("{changes}", String(counts.changes))
            .replace("{unlinks}", String(counts.unlinks))
            .replace("{deletes}", String(counts.deletes))
            .replace("{unchanged}", String(counts.unchanged))
            .replace("{refusals}", String(counts.refusals))}
        </p>
      )}

      {preview !== null && preview.refusals.length > 0 ? (
        <ul className="flex flex-col gap-1" data-testid="attribute-import-refusals">
          {preview.refusals.map((refusal) => (
            <li
              key={`${refusal.file}-${refusal.row}-${refusal.reason}`}
              data-testid={`attribute-import-refusal-${refusal.row}`}
              className="text-sm text-destructive"
            >
              {t("admin.attributes.import.refusalRow").replace("{row}", String(refusal.row))}
              {" — "}
              {reasonLabel(refusal)}
            </li>
          ))}
        </ul>
      ) : null}

      {committed !== null ? (
        <div className="flex flex-col gap-2">
          <p className="text-sm" role="status" data-testid="attribute-import-committed">
            {t("admin.attributes.import.committed")}
          </p>
          <Button
            type="button"
            variant="outline"
            size="touch"
            data-testid="attribute-import-undo"
            disabled={busy}
            onClick={runUndo}
          >
            {t("admin.attributes.import.undo")}
          </Button>
        </div>
      ) : null}

      {undone === null ? null : (
        <p className="text-sm" role="status" data-testid="attribute-import-undone">
          {t("admin.attributes.import.undone").replace("{count}", String(undone))}
        </p>
      )}

      {error === null ? null : (
        <p role="alert" className="text-sm text-destructive" data-testid="attribute-import-error">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          size="touch"
          data-testid="attribute-import-discard"
          onClick={onClose}
        >
          {t("admin.attributes.import.discard")}
        </Button>
        <Button
          type="button"
          size="touch"
          data-testid="attribute-import-confirm"
          disabled={preview === null || busy}
          onClick={runCommit}
        >
          {t("admin.attributes.import.confirm")}
        </Button>
      </div>
    </CategoryModal>
  );
}

export default ImportAttributesDialog;
