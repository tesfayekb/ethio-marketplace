import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { useI18n } from "@/i18n";
import type { MessageKey } from "@/i18n/types";

import {
  detectFormat,
  parseTransfer,
  partitionUnchanged,
  toCsv,
  toXliff,
  transferFilename,
  type TransferFormat,
  type TransferRow,
} from "./io-formats";

import { serverMessage, translationErrorKey, type TranslationRow } from "./translations-service";
import { useImportTranslations } from "./use-translations";

/**
 * U4i ⑤ — EXPORT / IMPORT BAR (`translations:manage`).
 *
 * EXPORT is a pure client-side serialisation of the rows the console already
 * holds for the CURRENT filter — what you see is what you get, and no extra
 * read is issued.
 *
 * IMPORT NEVER APPROVES. The file is parsed here and handed to
 * `admin_import_translations`, which writes each row through
 * `admin_save_translation`: gates re-run per row, placeholders validated, status
 * `edited`, revision captured, audited. Rows whose placeholders broke come back
 * FLAGGED with an "· import" note; unknown keys are SKIPPED, never invented.
 * The summary is the server's own count (F4).
 */
export function TransferBar({
  lang,
  baseLang,
  rows,
  guard,
}: {
  lang: string;
  baseLang: string;
  rows: TranslationRow[];
  guard: GuardFn;
}) {
  const { t } = useI18n();
  const importRows = useImportTranslations(lang);
  const fileInput = useRef<HTMLInputElement | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [errorKey, setErrorKey] = useState<MessageKey | null>(null);
  const [errorDetail, setErrorDetail] = useState<string | null>(null);

  const transferRows: TransferRow[] = rows.map((row) => ({
    key: row.key,
    source: row.sourceValue ?? "",
    value: row.value ?? "",
    context: row.context,
  }));

  const download = (format: TransferFormat) => {
    const text = format === "csv" ? toCsv(transferRows) : toXliff(transferRows, baseLang, lang);
    // A Blob URL keeps Ge'ez intact (UTF-8) where a data: URI would need escaping.
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = transferFilename(lang, format);
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  };

  const onFile = (file: File) => {
    setSummary(null);
    setErrorKey(null);
    setErrorDetail(null);
    void guard(async () => {
      const text = await file.text();
      const parsed = parseTransfer(detectFormat(file.name, text), text);
      if (parsed.rows.length === 0) {
        // An empty file is a REFUSAL, never a silent success (F4, E6).
        throw new Error("no rows in file");
      }
      const result = await importRows.mutateAsync(parsed.rows);
      setSummary(
        t("admin.translations.transfer.summary")
          .replace("{imported}", String(result.imported))
          .replace("{flagged}", String(result.flagged))
          .replace("{skipped}", String(result.skipped + parsed.malformed)),
      );
    }).catch((failure: unknown) => {
      setErrorKey(translationErrorKey(failure));
      setErrorDetail(serverMessage(failure));
    });
  };

  return (
    <div
      data-testid="strings-transfer"
      className="flex min-w-0 flex-col gap-2 rounded-md border border-border p-3"
    >
      <p className="text-sm font-medium text-foreground">
        {t("admin.translations.transfer.title")}
      </p>
      <p className="text-xs text-muted-foreground">{t("admin.translations.transfer.note")}</p>
      <div className="flex min-w-0 flex-wrap gap-2">
        <Button
          type="button"
          variant="outline"
          className="min-h-11"
          data-testid="strings-export-csv"
          disabled={transferRows.length === 0}
          onClick={() => download("csv")}
        >
          {t("admin.translations.transfer.exportCsv")}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="min-h-11"
          data-testid="strings-export-xliff"
          disabled={transferRows.length === 0}
          onClick={() => download("xliff")}
        >
          {t("admin.translations.transfer.exportXliff")}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="min-h-11"
          data-testid="strings-import"
          disabled={importRows.isPending}
          onClick={() => fileInput.current?.click()}
        >
          {importRows.isPending
            ? t("admin.translations.transfer.importing")
            : t("admin.translations.transfer.import")}
        </Button>
        <input
          ref={fileInput}
          type="file"
          accept=".csv,.xlf,.xliff,.xml,text/csv,application/xml"
          className="sr-only"
          data-testid="strings-import-input"
          aria-label={t("admin.translations.transfer.import")}
          onChange={(event) => {
            const file = event.target.files?.[0];
            // Reset first: re-picking the same filename must fire again.
            event.target.value = "";
            if (file) onFile(file);
          }}
        />
      </div>
      {summary ? (
        <p role="status" data-testid="strings-transfer-summary" className="text-sm text-foreground">
          {summary}
        </p>
      ) : null}
      {errorKey ? (
        <p role="alert" data-testid="strings-transfer-error" className="text-sm text-destructive">
          {t(errorKey)}
          {errorDetail ? <span className="block text-xs opacity-80">{errorDetail}</span> : null}
        </p>
      ) : null}
    </div>
  );
}

export default TransferBar;
