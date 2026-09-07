import { useState } from "react";

import { supabase } from "@/integrations/supabase/client";

import { Button } from "@/components/ui/button";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { CategoryModal } from "@/features/admin-categories/category-dialogs";
import { useI18n, type MessageKey } from "@/i18n";

/**
 * THE IMPORT DIALOG SHELL (IE-2, generalised by CAT-IE).
 *
 * One surface, two consumers: file pick → PREVIEW → Confirm / Discard, then
 * "Undo last import" for the batch just written. Everything console-specific
 * (the route, the file fields, the key namespace, the counted verbs) arrives
 * as PROPS — the shell is extended, never copied (B3).
 *
 * The browser reads each file as TEXT and posts it verbatim. It parses
 * NOTHING: the header law, the caps, the formula law and every semantic
 * refusal are the server's. The preview's digest travels with the commit, so
 * a file edited between the two clicks is refused rather than half-applied.
 */

export interface ImportFileField {
  /** The JSON body field the text is posted as. */
  field: string;
  /** The input's id and data-testid. */
  id: string;
  labelKey: MessageKey;
}

export interface ImportRefusal {
  file: string;
  row: number;
  key: string;
  reason: string;
  detail?: string;
}

type Counts = Record<string, number>;

interface Preview {
  counts: Counts;
  refusals: ImportRefusal[];
  digest: string;
}

export interface ImportDialogProps {
  testid: string;
  idPrefix: string;
  /** The server route: preview / commit / undo all POST here. */
  path: string;
  /** The i18n namespace, e.g. `admin.categories.import`. */
  keyPrefix: string;
  files: ImportFileField[];
  /** The count names this console renders inside its `counts` message. */
  countFields: readonly string[];
  /** The refusal vocabulary the server speaks; anything else reads "unknown". */
  reasonKeys: ReadonlySet<string>;
  scope: string | null;
  guard: GuardFn;
  onClose: () => void;
  /** Called after a successful commit or undo, so the console refetches. */
  onWritten?: () => Promise<void> | void;
}

async function bearer(): Promise<Record<string, string>> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token ?? "";
  return token === ""
    ? { "Content-Type": "application/json" }
    : { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
}

export function ImportDialog({
  testid,
  idPrefix,
  path,
  keyPrefix,
  files,
  countFields,
  reasonKeys,
  scope,
  guard,
  onClose,
  onWritten,
}: ImportDialogProps) {
  const { t } = useI18n();
  const [texts, setTexts] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [preview, setPreview] = useState<Preview | null>(null);
  const [committed, setCommitted] = useState<{ batchId: string; counts: Counts } | null>(null);
  const [undone, setUndone] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const key = (suffix: string): MessageKey => `${keyPrefix}.${suffix}` as MessageKey;

  const reasonLabel = (refusal: ImportRefusal): string => {
    const name = reasonKeys.has(refusal.reason) ? refusal.reason : "unknown";
    const text = t(key(`reason.${name}`));
    return refusal.detail === undefined ? text : `${text} (${refusal.detail})`;
  };

  const failed = (payload: { error?: string }, status: number) => {
    const named = payload.error ?? "";
    if (status === 403) return setError(t(key("error.denied")));
    if (status === 428) return setError(t(key("error.stepUp")));
    if (status === 409 && named === "fileChanged") return setError(t(key("error.fileChanged")));
    if (status === 409) return setError(t(key("error.busy")));
    if (status === 413 || named === "fileTooLarge") return setError(t(key("error.tooLarge")));
    if (named === "tooManyRows") return setError(t(key("error.tooManyRows")));
    if (named === "badHeader") return setError(t(key("error.badHeader")));
    if (named === "emptyFile") return setError(t(key("error.emptyFile")));
    return setError(t(key("error.failed")));
  };

  const post = async (body: Record<string, unknown>): Promise<unknown | null> => {
    const response = await fetch(path, {
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

  const readFile = (field: string, file: File | undefined) => {
    setPreview(null);
    setCommitted(null);
    setError(null);
    if (file === undefined) {
      setTexts((prev) => ({ ...prev, [field]: "" }));
      return;
    }
    void file.text().then((text) => setTexts((prev) => ({ ...prev, [field]: text })));
  };

  const payload = (): Record<string, unknown> => {
    const body: Record<string, unknown> = { scope };
    for (const file of files) body[file.field] = texts[file.field] ?? "";
    return body;
  };

  const runPreview = async () => {
    setBusy(true);
    setError(null);
    setCommitted(null);
    try {
      const result = (await post({ mode: "preview", ...payload() })) as Preview | null;
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
          ...payload(),
          digest: preview.digest,
        })) as { batch_id: string; counts: Counts } | null;
        if (result !== null) {
          setCommitted({ batchId: result.batch_id, counts: result.counts });
          setPreview(null);
          await onWritten?.();
        }
      } finally {
        setBusy(false);
      }
    }).catch(() => setError(t(key("error.failed"))));
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
          await onWritten?.();
        }
      } finally {
        setBusy(false);
      }
    }).catch(() => setError(t(key("error.failed"))));
  };

  const chosen = files.some((file) => (texts[file.field] ?? "") !== "");
  const counts = preview?.counts ?? committed?.counts ?? null;
  const countsLine = (values: Counts): string => {
    let line = t(key("counts"));
    for (const name of countFields) {
      line = line.replace(`{${name}}`, String(values[name] ?? 0));
    }
    return line;
  };

  return (
    <CategoryModal
      testid={testid}
      openedBy="toolbar-import"
      title={t(key("title"))}
      onClose={onClose}
    >
      <p className="text-sm text-muted-foreground">{t(key("hint"))}</p>

      <div className="flex flex-col gap-3">
        {files.map((file) => (
          <label className="flex flex-col gap-1 text-sm" htmlFor={file.id} key={file.id}>
            <span>{t(file.labelKey)}</span>
            <input
              id={file.id}
              data-testid={file.id}
              type="file"
              accept=".csv,text/csv"
              className="min-h-11 w-full text-sm"
              onChange={(event) => readFile(file.field, event.target.files?.[0])}
            />
          </label>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        size="touch"
        data-testid={`${idPrefix}-preview`}
        disabled={!chosen || busy}
        onClick={() => void runPreview()}
      >
        {busy ? t(key("busy")) : t(key("preview"))}
      </Button>

      {counts === null ? null : (
        <p className="text-sm" role="status" data-testid={`${idPrefix}-counts`}>
          {countsLine(counts)}
        </p>
      )}

      {preview !== null && preview.refusals.length > 0 ? (
        <ul className="flex flex-col gap-1" data-testid={`${idPrefix}-refusals`}>
          {preview.refusals.map((refusal) => (
            <li
              key={`${refusal.file}-${refusal.row}-${refusal.reason}`}
              data-testid={`${idPrefix}-refusal-${refusal.row}`}
              className="text-sm text-destructive"
            >
              {t(key("refusalRow")).replace("{row}", String(refusal.row))}
              {" — "}
              {reasonLabel(refusal)}
            </li>
          ))}
        </ul>
      ) : null}

      {committed !== null ? (
        <div className="flex flex-col gap-2">
          <p className="text-sm" role="status" data-testid={`${idPrefix}-committed`}>
            {t(key("committed"))}
          </p>
          <Button
            type="button"
            variant="outline"
            size="touch"
            data-testid={`${idPrefix}-undo`}
            disabled={busy}
            onClick={runUndo}
          >
            {t(key("undo"))}
          </Button>
        </div>
      ) : null}

      {undone === null ? null : (
        <p className="text-sm" role="status" data-testid={`${idPrefix}-undone`}>
          {t(key("undone")).replace("{count}", String(undone))}
        </p>
      )}

      {error === null ? null : (
        <p role="alert" className="text-sm text-destructive" data-testid={`${idPrefix}-error`}>
          {error}
        </p>
      )}

      <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          size="touch"
          data-testid={`${idPrefix}-discard`}
          onClick={onClose}
        >
          {t(key("discard"))}
        </Button>
        <Button
          type="button"
          size="touch"
          data-testid={`${idPrefix}-confirm`}
          disabled={preview === null || busy}
          onClick={runCommit}
        >
          {t(key("confirm"))}
        </Button>
      </div>
    </CategoryModal>
  );
}

export default ImportDialog;
