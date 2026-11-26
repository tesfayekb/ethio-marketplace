import { useState } from "react";

import { callRoute, routeFailure, type RouteAnswer, type RoutePath } from "@/lib/route-client";

import { Button } from "@/components/ui/button";
import { stepUpAbortKey } from "@/features/auth/mfa/mfa-service";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { StepTrack } from "@/components/ui/dialog-parts-facade";
import { CategoryModal } from "@/components/ui/category-modal";
import { useI18n, type MessageKey } from "@/i18n";
import type { DoorFamily } from "@/lib/door-family";
import { failureDetail } from "@/lib/reader-failure";
import { readRefusal, refusalText, splitRefusal, type RefusalFamily } from "@/lib/refusal";
import { ADMIN_REFUSALS } from "@/lib/refusal-tail";

/**
 * L1 import-reason-words — THE SHARED IMPORT WORDS. A refused commit or undo
 * names its reason in words, the same way in every import dialog. Read after
 * the consoles' shared words and before a dialog's own `refusals` (which win
 * for their codes). A new shared import code is one more line here. Its doors
 * are the places import's, whose dialogs hand no console family in.
 */
const IMPORT_REFUSALS = {
  words: {
    planHasRefusals: "admin.import.reason.planHasRefusals",
    batchAlreadyUndone: "admin.import.reason.batchAlreadyUndone",
    undoBlocked: "admin.import.reason.undoBlocked",
    unknownBatch: "admin.import.reason.unknownBatch",
  },
} as const satisfies DoorFamily<{
  doors:
    | "admin_preview_location_import"
    | "admin_commit_location_import"
    | "admin_undo_location_import";
  unreachable: Record<
    "badValue" | "baseLocked" | "unknownEntity",
    "the commit saves only the pair language's name of a row it wrote"
  >;
  generic: Record<
    | "badCoordinates"
    | "badSlug"
    | "crossCountry"
    | "levelMismatch"
    | "missingCoordinates"
    | "parentInactive"
    | "parentMissing"
    | "rootMustBeCountry",
    "the commit refuses a plan with refusals before it writes; the undo restores the rows it wrote, and meets these only when places changed after the import"
  > & {
    importRunning: "the dialog's own busy line words it by name before the reader";
    unknownCountry: "met only when the market chosen as the scope was removed while the dialog was open";
  };
}>;

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
  /**
   * C3-UX-8 — a slot the ROUTE does not require. Preview enables without it
   * (as long as some file is chosen) and its picker says so in words.
   */
  optional?: boolean;
}

export interface ImportIgnored {
  file: string;
  row: number;
  column: string;
  key?: string;
}

export interface ImportRefusal {
  file: string;
  row: number;
  key: string;
  reason: string;
  detail?: string;
  /** IE-3c — the cells the door judged, so the sentence can name them. */
  values?: Record<string, string>;
}

type Counts = Record<string, number>;

/** ES3 — an unlinked link or a removed answer, with the listings that hold it. */
export interface ImportHolder {
  file: string;
  row: number;
  key: string;
  slug?: string;
  value?: string;
  count: number;
}

interface Preview {
  /** ES3 — sent by the attributes door only; the confirm is never blocked by it. */
  holders?: ImportHolder[];
  counts: Counts;
  refusals: ImportRefusal[];
  /** IE-3 — edited read-only cells: reported, never applied. */
  ignored?: ImportIgnored[];
  digest: string;
}

/**
 * IE-3 — FILE IDENTITY. Read from the first line only, before any row is
 * parsed, so the wrong file is refused with a sentence that names where it
 * belongs rather than a header mismatch.
 */
export type ImportFamily = "attributes" | "categories" | "locations";

function familyOf(text: string): ImportFamily | null {
  const first = text.replace(/^\ufeff/, "").split(/\r?\n/)[0] ?? "";
  const names = first.split(",").map((cell) =>
    cell
      .replace(/"/g, "")
      .trim()
      .replace(/\s*\(read-only\)$/i, "")
      .trim(),
  );
  if (names.includes("attribute_key")) return "attributes";
  // LOCATIONS ERA L2a — the locations family is sniffed BEFORE the categories
  // test: the places file also carries a parent column, so `location_key`
  // (places) and `unit_system` (markets) must win first.
  if (names.includes("location_key") || names.includes("unit_system")) return "locations";
  if (names.includes("parent_slug") || names.includes("allow_listings")) return "categories";
  return null;
}

export interface ImportDialogProps {
  testid: string;
  idPrefix: string;
  title?: string;
  /** The server route: preview / commit / undo all POST here. */
  path: RoutePath;
  /** The i18n namespace, e.g. `admin.categories.import`. */
  keyPrefix: string;
  files: ImportFileField[];
  /** The count names this console renders inside its `counts` message. */
  countFields: readonly string[];
  /** The refusal vocabulary the server speaks; anything else reads "unknown". */
  reasonKeys: ReadonlySet<string>;
  /** Which import this dialog is; a file of the other family is refused. */
  family: ImportFamily;
  scope: string | null;
  guard: GuardFn;
  onClose: () => void;
  /** Called after a successful commit or undo, so the console refetches. */
  onWritten?: () => Promise<void> | void;
  /** The console's own words for its doors' codes; the consoles' shared words otherwise. */
  refusals?: RefusalFamily;
}

export function ImportDialog({
  testid,
  idPrefix,
  title,
  path,
  keyPrefix,
  files,
  countFields,
  reasonKeys,
  family,
  scope,
  guard,
  onClose,
  onWritten,
  refusals = ADMIN_REFUSALS,
}: ImportDialogProps) {
  const { t, has, language } = useI18n();
  const [texts, setTexts] = useState<Record<string, string>>({});
  /** IE-7 — the chosen filename, spoken beside its picker. */
  const [names, setNames] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [preview, setPreview] = useState<Preview | null>(null);
  const [committed, setCommitted] = useState<{ batchId: string; counts: Counts } | null>(null);
  const [undone, setUndone] = useState<number | null>(null);
  const [ignored, setIgnored] = useState<ImportIgnored[]>([]);
  const [error, setError] = useState<string | null>(null);
  /**
   * INC-196 L2 — THE REASON BENEATH THE SENTENCE. A failed commit used to read
   * "The import could not be completed" and nothing else: the RPC's message and
   * the Postgres detail were dropped, so an operator had nothing to paste. The
   * generic line stays; this is the second line, rendered as DATA (never HTML).
   */
  const [reason, setReason] = useState<string | null>(null);

  const key = (suffix: string): MessageKey => `${keyPrefix}.${suffix}` as MessageKey;

  const reasonLabel = (refusal: ImportRefusal): string => {
    const name = reasonKeys.has(refusal.reason) ? refusal.reason : "unknown";
    const detail = refusal.detail ?? "";
    // IE-3c — the message names the values it judged: every cell of the
    // operator's own row is available by column name, plus `detail` (the
    // server's own judged value, e.g. the address it wants restored).
    // The door's own structured fields (badCell's `cell`/`value`, rankInherited's
    // origins) travel beside `values`; they are named the same way.
    const structured: Record<string, string> = {};
    for (const [field, value] of Object.entries(refusal as unknown as Record<string, unknown>)) {
      if (field === "values" || field === "detail" || field === "reason") continue;
      if (typeof value === "string" || typeof value === "number") structured[field] = String(value);
    }
    const values: Record<string, string> = { ...structured, ...(refusal.values ?? {}), detail };
    /**
     * DEC-050 L2b — A DETAILED REFUSAL SPEAKS ITS OWN SENTENCE. The last
     * pipe-separated segment of `detail` is the token (`badBound`,
     * `activeNotBoolean`, `aliasLength:<alias>`); a `:` suffix becomes
     * `{arg}`; the leading segments are the door's structured fields
     * (badCell: cell, value · badOption: key, value). A token with no key of
     * its own falls back to the top-level message, which names the row — no
     * raw token is ever printed inside a sentence.
     */
    const segments = detail === "" ? [] : detail.split("|");
    const last = segments.length > 0 ? (segments[segments.length - 1] ?? "") : "";
    const { key: token, tail: arg } = splitRefusal(last);
    if (arg !== undefined) values["arg"] = arg;
    const leading = segments.slice(0, -1);
    const fields = refusal.reason === "badOption" ? ["key", "value"] : ["cell", "value"];
    leading.forEach((segment, index) => {
      const field = fields[index];
      if (field !== undefined && segment !== "") values[field] = segment;
    });

    /**
     * INC-198/199 L2 — A DETAIL OF NAMED VALUES NAMES ITS OWN PLACEHOLDERS.
     * A door whose detail is `name=value` pairs (`stored=false requested=true`)
     * spends them INSIDE the sentence — `{stored}` / `{requested}` — instead of
     * making the operator read a raw token. A detail with no `=` is untouched.
     */
    for (const pair of last.split(/\s+/)) {
      const equals = pair.indexOf("=");
      if (equals > 0) values[pair.slice(0, equals)] = pair.slice(equals + 1);
    }

    const detailed = token !== "" && reasonKeys.has(`${name}.${token}`);
    const messageKey = detailed ? key(`reason.${name}.${token}`) : key(`reason.${name}`);
    let text = t(messageKey);
    for (const [field, value] of Object.entries(values)) {
      text = text.split(`{${field}}`).join(value === "" ? "—" : value);
    }
    // IE-3 — a guided message spends its detail INSIDE the sentence; a
    // message with no placeholder keeps the old parenthetical.
    if (t(messageKey).includes("{")) return text;
    return detail === "" || detailed ? text : `${text} (${detail})`;
  };

  /**
   * Foundations turn 12 (CHANGE 4) — the door's declared code, resolved. The
   * route client's typed failure (`routeFailure`) carries the code; a code the
   * console's words name, or a door key (`admin.<family>.error.*`) the
   * catalogue holds, renders translated through the one reader with the
   * route's detail as the tail (F1-4a) — the failure's message keeps only a
   * short-code detail, and a commit's names its rows (`cat: parent → child`),
   * read from the detail the typed failure carries (cursor-bundle-8a). A code
   * no family words draws no reason line: the general failure line says it
   * alone (INC-1280).
   */
  const reasonOf = (failure: Error): string | null => {
    const family: RefusalFamily = {
      ...refusals,
      words: { ...ADMIN_REFUSALS.words, ...IMPORT_REFUSALS.words, ...refusals.words },
    };
    const read = readRefusal(failure, family, has);
    if (read.branch !== "family" && read.branch !== "doorKey") return null;
    const detail = failureDetail(failure)?.trim();
    const tail = read.tail ?? (detail === "" ? undefined : detail);
    return refusalText({ ...read, tail }, t, undefined, language);
  };

  /**
   * A code or status whose error line already says why draws NO reason line;
   * the reason is set only beneath the general failure line.
   */
  const failed = (answer: RouteAnswer, failure: Error) => {
    const status =
      answer.kind === "answered" ? answer.status : answer.kind === "signedOut" ? 401 : 0;
    const named = answer.kind === "answered" ? (answer.error ?? "") : "";
    const own = (suffix: string) => {
      setReason(null);
      setError(t(key(suffix)));
    };
    // INC-1274 — an ended sign-in is said as ended (the route client told the shell), never as a failure.
    if (status === 401 || named === "notSignedIn") {
      setReason(null);
      return setError(t("session.expired"));
    }
    if (status === 403) return own("error.denied");
    if (status === 428) return own("error.stepUp");
    if (named === "wrongFile") return own("error.wrongFile");
    if (status === 409 && named === "fileChanged") return own("error.fileChanged");
    if (named === "importRunning" || (status === 409 && named === "import already running"))
      return own("error.busy");
    if (status === 413 || named === "fileTooLarge") return own("error.tooLarge");
    if (named === "tooManyRows") return own("error.tooManyRows");
    if (named === "badHeader") return own("error.badHeader");
    if (named === "emptyFile") return own("error.emptyFile");
    setReason(reasonOf(failure));
    return setError(t(key("error.failed")));
  };

  const post = async (body: Record<string, unknown>): Promise<unknown | null> => {
    const answer = await callRoute(path, { json: body, auth: "required" });
    if (answer.kind === "answered" && answer.ok) return answer.payload ?? {};
    failed(answer, await routeFailure(answer));
    return null;
  };

  const readFile = (field: string, file: File | undefined) => {
    setPreview(null);
    setCommitted(null);
    setError(null);
    setReason(null);
    setIgnored([]);
    if (file === undefined) {
      setTexts((prev) => ({ ...prev, [field]: "" }));
      setNames((prev) => ({ ...prev, [field]: "" }));
      return;
    }
    setNames((prev) => ({ ...prev, [field]: file.name }));
    void file.text().then((text) => {
      const found = familyOf(text);
      if (found !== null && found !== family) {
        setTexts((prev) => ({ ...prev, [field]: "" }));
        setError(t(key("error.wrongFile")));
        return;
      }
      setTexts((prev) => ({ ...prev, [field]: text }));
    });
  };

  const payload = (): Record<string, unknown> => {
    const body: Record<string, unknown> = { scope };
    for (const file of files) body[file.field] = texts[file.field] ?? "";
    return body;
  };

  const runPreview = async () => {
    setBusy(true);
    setError(null);
    setReason(null);
    setCommitted(null);
    try {
      const result = (await post({ mode: "preview", ...payload() })) as Preview | null;
      setPreview(result);
      setIgnored(result?.ignored ?? []);
    } finally {
      setBusy(false);
    }
  };

  const runCommit = () => {
    if (preview === null) return;
    setError(null);
    setReason(null);
    void guard(async () => {
      setBusy(true);
      try {
        const result = (await post({
          mode: "commit",
          ...payload(),
          digest: preview.digest,
        })) as { batch_id: string; counts: Counts } | null;
        if (result !== null) {
          // IE-7 — a family whose commit answers with the batch alone keeps the
          // verdict the operator confirmed: the counts are never invented.
          setCommitted({
            batchId: result.batch_id,
            counts: { ...preview.counts, ...(result.counts ?? {}) },
          });
          setPreview(null);
          await onWritten?.();
        }
      } finally {
        setBusy(false);
      }
    }).catch((failure: unknown) => {
      // FIX-SCAN-1 ISSUE 2 — a gate that did not run the action leaves the
      // dialog usable: busy cleared, cancelled stays silent, no-factor hints.
      setBusy(false);
      const abort = stepUpAbortKey(failure);
      setError(abort === undefined ? t(key("error.failed")) : abort === null ? null : t(abort));
    });
  };

  const runUndo = () => {
    if (committed === null) return;
    setError(null);
    setReason(null);
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
    }).catch((failure: unknown) => {
      // FIX-SCAN-1 ISSUE 2 — a gate that did not run the action leaves the
      // dialog usable: busy cleared, cancelled stays silent, no-factor hints.
      setBusy(false);
      const abort = stepUpAbortKey(failure);
      setError(abort === undefined ? t(key("error.failed")) : abort === null ? null : t(abort));
    });
  };

  /**
   * IE-7 PART A — every REQUIRED file must be held before Preview opens, so a
   * half-chosen pair never reaches the door and comes back as a refusal.
   * C3-UX-8 — a slot the route treats as optional does not hold Preview shut;
   * at least one file is still needed (the route refuses an empty pair).
   */
  const chosen =
    files.every((file) => file.optional === true || (texts[file.field] ?? "") !== "") &&
    files.some((file) => (texts[file.field] ?? "") !== "");
  const counts = preview?.counts ?? committed?.counts ?? null;
  /**
   * IE-7 PART B — ONE STATE AT A TIME. Ready (pick + preview) · Previewed
   * (the verdict, Discard + Confirm) · Applied (the banner, Undo + Close).
   */
  const state: "ready" | "previewed" | "applied" =
    committed !== null || undone !== null ? "applied" : preview !== null ? "previewed" : "ready";
  /** The banner counts WRITES: everything the run changed, not what it left alone. */
  const written = (values: Counts): number =>
    countFields.reduce(
      (total, name) =>
        name === "unchanged" || name === "refusals" ? total : total + (values[name] ?? 0),
      0,
    );
  /** IE-3b — one line per read-only column, in first-seen order. */
  const ignoredGroups: [string, ImportIgnored[]][] = [];
  for (const cell of ignored) {
    const group = ignoredGroups.find(([column]) => column === cell.column);
    if (group === undefined) ignoredGroups.push([cell.column, [cell]]);
    else group[1].push(cell);
  }
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
      title={title ?? t(key("title"))}
      onClose={onClose}
      size="wide"
      description={<span data-testid={`${idPrefix}-guidance`}>{t(key("guidance"))}</span>}
      footer={
        <>
          {state === "applied" ? (
            <>
              {committed === null ? null : (
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
              )}
              <Button
                type="button"
                size="touch"
                data-testid={`${idPrefix}-close`}
                onClick={onClose}
              >
                {t(key("close"))}
              </Button>
            </>
          ) : (
            <>
              <Button
                type="button"
                variant="outline"
                size="touch"
                data-testid={`${idPrefix}-discard`}
                title={t(key("discardHint"))}
                onClick={onClose}
              >
                {t(key("discard"))}
              </Button>
              {state === "ready" ? (
                <Button
                  type="button"
                  size="touch"
                  data-testid={`${idPrefix}-preview`}
                  disabled={!chosen || busy}
                  onClick={() => void runPreview()}
                >
                  {busy ? t(key("busy")) : t(key("preview"))}
                </Button>
              ) : null}

              {state !== "previewed" ? null : (
                <Button
                  type="button"
                  size="touch"
                  data-testid={`${idPrefix}-confirm`}
                  disabled={busy}
                  onClick={runCommit}
                >
                  {t(key("confirm"))}
                </Button>
              )}
            </>
          )}
        </>
      }
    >
      <StepTrack
        steps={[t(key("preview")), t(key("confirm"))]}
        current={state === "ready" ? 0 : state === "previewed" ? 1 : 2}
        label={title ?? t(key("title"))}
      />
      <p className="text-sm text-muted-foreground">{t(key("hint"))}</p>

      {state !== "ready" ? null : (
        <>
          {/*
            IE-7 PART A — A REAL BUTTON, NOT A BROWSER WIDGET. The native input
            keeps its id and testid (it is still the file's only owner) but is
            visually hidden behind a touch-sized secondary button, with the
            chosen filename spoken beside it.
          */}
          <div className="flex flex-col gap-3">
            {files.map((file) => (
              <div className="flex flex-col gap-1 text-sm" key={file.id}>
                <span id={`${file.id}-label`}>{t(file.labelKey)}</span>
                {/* C3-UX-8 — an optional slot says so where it is chosen. */}
                {file.optional === true ? (
                  <span className="text-muted-foreground" data-testid={`${file.id}-optional`}>
                    {t(key("optionalFile"))}
                  </span>
                ) : null}
                <input
                  id={file.id}
                  data-testid={file.id}
                  type="file"
                  accept=".csv,text/csv"
                  className="sr-only"
                  aria-labelledby={`${file.id}-label`}
                  onChange={(event) => readFile(file.field, event.target.files?.[0])}
                />
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    size="touch"
                    data-testid={`${file.id}-choose`}
                    onClick={() => document.getElementById(file.id)?.click()}
                  >
                    {t(key("choose")).replace("{file}", t(file.labelKey))}
                  </Button>
                  <span className="text-sm text-muted-foreground" data-testid={`${file.id}-chosen`}>
                    {(names[file.field] ?? "") === "" ? t(key("noFile")) : names[file.field]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

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

      {preview !== null && (preview.holders ?? []).some((holder) => holder.count > 0) ? (
        <ul className="flex flex-col gap-1" data-testid="import-holders">
          {(preview.holders ?? [])
            .filter((holder) => holder.count > 0)
            .map((holder) => (
              <li
                key={`${holder.file}-${holder.row}-${holder.key}-${holder.value ?? ""}`}
                data-testid={`import-holders-${holder.row}`}
                className="text-sm text-foreground"
              >
                {t(key("refusalRow")).replace("{row}", String(holder.row))}
                {" — "}
                {holder.value === undefined || holder.value === ""
                  ? holder.key
                  : `${holder.key} · ${holder.value}`}
                {" — "}
                {t(key("holders")).replace("{count}", String(holder.count))}
              </li>
            ))}
        </ul>
      ) : null}

      {ignored.length === 0 ? null : (
        <div className="flex flex-col gap-1" data-testid={`${idPrefix}-ignored`}>
          <p className="text-sm font-medium">{t(key("ignored"))}</p>
          {/*
            IE-3b — GROUPED BY COLUMN. A derived column edited across the whole
            roster is one line ("is_catchall — 154 rows not applied"), not 154;
            the rows themselves are one disclosure away.
          */}
          {ignoredGroups.map(([column, cells]) => (
            <details key={column} data-testid={`${idPrefix}-ignored-column-${column}`}>
              <summary className="min-h-11 text-sm text-muted-foreground">
                {t(key("ignoredColumn"))
                  .replace("{column}", column)
                  .replace("{count}", String(cells.length))}
              </summary>
              <ul className="flex flex-col gap-1 ps-4">
                {cells.map((cell) => (
                  <li
                    key={`${cell.file}-${cell.row}-${cell.column}`}
                    data-testid={`${idPrefix}-ignored-${cell.row}`}
                    className="text-sm text-muted-foreground"
                  >
                    {t(key("ignoredRow"))
                      .replace("{row}", String(cell.row))
                      .replace("{column}", cell.column)}
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      )}

      {/*
        IE-7 PART B — THE APPLIED STATE. The banner speaks in the design
        system's own affirmative token (primary), keeps the counts above it,
        and offers exactly two doors: take it back, or close.
      */}
      {committed === null ? null : (
        <p
          role="status"
          data-testid={`${idPrefix}-applied`}
          className="rounded-md border border-primary/30 bg-primary/10 px-3 py-2 text-sm text-primary"
        >
          {t(key("applied")).replace("{count}", String(written(committed.counts)))}
        </p>
      )}

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

      {/* INC-196 L2 — the reason, beneath the sentence, as data (F2, F4). */}
      {error === null || reason === null ? null : (
        <p
          className="text-sm break-words text-muted-foreground"
          data-testid={`${idPrefix}-error-reason`}
        >
          {t(key("error.reason")).replace("{reason}", reason)}
        </p>
      )}
    </CategoryModal>
  );
}

export default ImportDialog;
