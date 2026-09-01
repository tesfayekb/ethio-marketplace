import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import {
  DataTable,
  DataTablePagination,
  type DataTableColumn,
} from "@/components/shell/data-table";
import { PageCard } from "@/components/shell/page-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAdminShell } from "@/features/admin/admin-context";
import { StepUpGate } from "@/features/auth/mfa/step-up-gate";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { useI18n } from "@/i18n";
import type { MessageKey } from "@/i18n/types";
import { relativeTime } from "@/lib/relative-time";

import { AiBulkBar } from "./ai-bulk-bar";
import { ApproveAllBar } from "./approve-bar";
import { DataScope } from "./data-scope";
import { HistoryDrawer } from "./history-drawer";
import { isOverlong, lengthRatio } from "./pseudo";
import { PseudoBar } from "./pseudo-bar";
import { TransferBar } from "./transfer-bar";
import {
  pickEntityStats,
  serverMessage,
  translationErrorKey,
  type LanguageRow,
  type TranslationRow,
} from "./translations-service";
import {
  useAiTranslate,
  useLanguages,
  useMyTranslatorLanguages,
  useSaveTranslation,
  useSetKeyContext,
  useTranslationStatusAction,
  useUsageMap,
  useEntityTranslationStats,
  useTranslations,
  useTranslationStats,
} from "./use-translations";

const PAGE_SIZE = 25;

interface MutationAction {
  (): Promise<void>;
}

const STATUS_CHIPS = [
  { value: "all", labelKey: "admin.translations.filter.all" },
  { value: "untranslated", labelKey: "admin.translations.status.untranslated" },
  { value: "machine", labelKey: "admin.translations.status.machine" },
  { value: "edited", labelKey: "admin.translations.status.edited" },
  { value: "approved", labelKey: "admin.translations.status.approved" },
  { value: "flagged", labelKey: "admin.translations.status.flagged" },
] as const satisfies readonly { value: string; labelKey: MessageKey }[];

export type StringsSearch = {
  status?: string;
  flagged?: boolean;
  q?: string;
  /** U4d — "interface" (default) or "data"; URL-derived like every filter (INC-073). */
  scope?: string;
};

const STATUS_LABELS: Record<string, MessageKey> = {
  untranslated: "admin.translations.status.untranslated",
  machine: "admin.translations.status.machine",
  edited: "admin.translations.status.edited",
  approved: "admin.translations.status.approved",
};

/**
 * U4b PART B — THE STRINGS PAGE (/admin/translations/$lang).
 *
 * FILTERS ARE URL-DERIVED (INC-073 law): status, flagged and q live in the
 * search params, so a filtered list is shareable and reproducible.
 *
 * ATTEMPT-AND-SURFACE (law F3): the editor never decides whether a save is
 * allowed. `get_my_translator_languages()` only INFORMS the operator that the
 * server will refuse ("not assigned to this language") — and, per the U4a
 * caveat, a `translations:manage` holder is scope-EXEMPT, so the notice is
 * suppressed on the PERMISSION, never on an empty list.
 */
export function AdminTranslationsStringsPage({
  lang,
  search,
}: {
  lang: string;
  search: StringsSearch;
}) {
  const { t } = useI18n();
  const navigate = useNavigate();
  const { permissions } = useAdminShell();

  const mayUpdate = permissions.includes("translations:update");
  const mayApprove = permissions.includes("translations:approve");
  const mayManage = permissions.includes("translations:manage");
  const mayMachine = permissions.includes("translations:machine");

  const languages = useLanguages();
  const stats = useTranslationStats(lang);
  /** U4k — the CONTENT meter, so untranslated data work is visible on arrival. */
  const entityStats = useEntityTranslationStats(lang);
  const scope = useMyTranslatorLanguages(!mayManage && (mayUpdate || mayApprove));

  const viewScope = search.scope === "data" ? "data" : "interface";
  const status = search.status ?? "all";
  const flagged = search.flagged === true || status === "flagged";
  const query = search.q ?? "";
  const [page, setPage] = useState(0);
  const [expanded, setExpanded] = useState<string | null>(null);
  /**
   * INC-104 — POST-ACTION FEEDBACK IS PAGE-LEVEL STATE, NEVER EXPANSION-LOCAL.
   * The saved marker used to live inside StringEditor, which the DataTable
   * re-creates whenever the invalidated list refetches (the table twin injects
   * the expansion as a separate `<tr>`), so the confirmation vanished. Keyed by
   * row key here, it survives any refetch on BOTH twins.
   */
  const [savedKey, setSavedKey] = useState<string | null>(null);

  const [searchDraft, setSearchDraft] = useState(query);
  /**
   * U4g — the orphaned set is a VIEW, not a status. It is component state
   * rather than a URL filter because the route file (the single parse point
   * for search params) is outside this task's scope.
   */
  const [orphanedView, setOrphanedView] = useState(false);

  const list = useTranslations({
    lang,
    status: status === "flagged" ? "all" : status,
    ...(flagged ? { flagged: true } : {}),
    search: query,
    limit: PAGE_SIZE,
    offset: page * PAGE_SIZE,
    orphaned: orphanedView,
  });

  const setSearchParams = (next: StringsSearch) => {
    setPage(0);
    // The scope rides along with every filter change, so a Data view stays Data.
    void navigate({
      to: "/admin/translations/$lang",
      params: { lang },
      search: { ...(viewScope === "data" ? { scope: "data" } : {}), ...next },
      replace: true,
    });
  };

  // Debounced search → URL (the URL stays the single filter truth).
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (searchDraft === query) return;
    if (debounce.current) clearTimeout(debounce.current);
    debounce.current = setTimeout(() => {
      setSearchParams({
        ...(status === "all" ? {} : { status }),
        ...(searchDraft === "" ? {} : { q: searchDraft }),
      });
    }, 350);
    return () => {
      if (debounce.current) clearTimeout(debounce.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchDraft]);

  /**
   * INVARIANT: admin surfaces read admin sources; the public gate list is for
   * the public switcher only. Language validity here comes from
   * `admin_list_languages` (enabled_admin OR base) via `useLanguages()` — never
   * from the i18n provider's public gate — and the page NEVER waits on it:
   * INC-102, an admin route that blanked while a readiness signal was pending.
   */
  const usage = useUsageMap();
  const known: LanguageRow | undefined = (languages.data ?? []).find((row) => row.code === lang);
  const unavailable =
    !languages.isLoading &&
    languages.data !== undefined &&
    (!known || (!known.enabledAdmin && !known.isBase));

  // Guard: unknown or staff-disabled language → back to the roster with a notice.
  useEffect(() => {
    if (unavailable) void navigate({ to: "/admin/translations", replace: true });
  }, [unavailable, navigate]);

  if (unavailable) {
    return (
      <PageCard testid="strings-unavailable">
        <p role="status" aria-live="polite" className="text-sm text-muted-foreground">
          {t("admin.translations.strings.unknown")}
        </p>
      </PageCard>
    );
  }

  const langStats = (stats.data ?? [])[0];
  const counts: Record<string, number> = {
    all: langStats?.total ?? 0,
    untranslated: langStats?.untranslated ?? 0,
    machine: langStats?.machineCount ?? 0,
    edited: langStats?.edited ?? 0,
    approved: langStats?.approved ?? 0,
    flagged: langStats?.flagged ?? 0,
    orphaned: langStats?.orphaned ?? 0,
  };
  const reviewable = langStats?.reviewable ?? 0;
  const dataStats = pickEntityStats(entityStats.data, lang);

  const rows = list.data?.rows ?? [];
  const baseLang = (languages.data ?? []).find((row) => row.isBase)?.code ?? "en";
  const total = list.data?.totalCount ?? 0;
  const outOfScope =
    !mayManage &&
    scope.data !== undefined &&
    !scope.data.includes(lang) &&
    (mayUpdate || mayApprove);

  return (
    <StepUpGate>
      {(guard) => (
        <div data-testid="admin-translations-strings" className="min-w-0 space-y-4">
          <div className="flex min-w-0 flex-wrap items-center gap-3">
            <h1 className="min-w-0 truncate text-lg font-semibold text-foreground">
              {t("admin.translations.strings.title").replace(
                "{language}",
                known?.nameNative ?? lang,
              )}
            </h1>
            <Link
              to="/admin/translations"
              data-testid="strings-back"
              className="text-sm text-muted-foreground underline underline-offset-4"
            >
              {t("admin.translations.strings.back")}
            </Link>
          </div>

          <p data-testid="strings-coverage" className="text-sm text-muted-foreground">
            {t("admin.translations.coverage")
              .replace("{approved}", String(counts["approved"] ?? 0))
              .replace("{total}", String(counts["all"] ?? 0))}
          </p>

          {/* U4k — both meters side by side: interface AND content names. */}
          <p data-testid="strings-meters" className="text-sm text-muted-foreground">
            {t("admin.translations.meters")
              .replace("{uiApproved}", String(counts["approved"] ?? 0))
              .replace("{uiTotal}", String(counts["all"] ?? 0))
              .replace("{dataApproved}", String(dataStats?.approved ?? 0))
              .replace("{dataTotal}", String(dataStats?.total ?? 0))}
          </p>

          <div
            className="flex min-w-0 flex-wrap gap-2"
            role="group"
            aria-label={t("admin.translations.scope.label")}
            data-testid="strings-scope"
          >
            {(["interface", "data"] as const).map((value) => (
              <Button
                key={value}
                type="button"
                variant={viewScope === value ? "default" : "outline"}
                className="min-h-11"
                data-testid={`strings-scope-${value}`}
                onClick={() =>
                  void navigate({
                    to: "/admin/translations/$lang",
                    params: { lang },
                    search: {
                      ...(value === "data" ? { scope: "data" } : {}),
                      ...(query === "" ? {} : { q: query }),
                    },
                    replace: true,
                  })
                }
              >
                {t(
                  value === "data"
                    ? "admin.translations.scope.data"
                    : "admin.translations.scope.interface",
                )}
              </Button>
            ))}
          </div>

          {viewScope === "data" ? (
            <>
              <p className="text-sm text-muted-foreground" data-testid="data-gate-note">
                {t("admin.translations.data.gateNote")}
              </p>
              <Input
                data-testid="data-search"
                value={searchDraft}
                aria-label={t("admin.translations.filter.search")}
                placeholder={t("admin.translations.filter.search")}
                onChange={(event) => setSearchDraft(event.target.value)}
              />
              <DataScope
                lang={lang}
                rtl={known?.rtl ?? false}
                status="all"
                query={query}
                mayUpdate={mayUpdate}
                mayApprove={mayApprove && !(known?.isBase ?? false)}
                mayMachine={mayMachine && !(known?.isBase ?? false)}
                guard={guard}
              />
            </>
          ) : (
            <>
              {mayApprove && !(known?.isBase ?? false) ? (
                <ApproveAllBar lang={lang} reviewable={reviewable} guard={guard} />
              ) : null}

              {mayMachine && !(known?.isBase ?? false) ? (
                <AiBulkBar lang={lang} untranslated={counts["untranslated"] ?? 0} guard={guard} />
              ) : null}

              {/* U4i ⑤⑦ — bulk delivery tools; manage-gated, server is the authority. */}
              {mayManage ? (
                <TransferBar lang={lang} baseLang={baseLang} rows={rows} guard={guard} />
              ) : null}
              {mayManage && (known?.isBase ?? false) ? <PseudoBar guard={guard} /> : null}

              {outOfScope ? (
                <p data-testid="strings-not-assigned" className="text-sm text-muted-foreground">
                  {t("admin.translations.editor.notAssigned")}
                </p>
              ) : null}

              <DataTable
                columns={stringColumns(t, known?.rtl ?? false)}
                rows={rows}
                rowKey={(row) => row.key}
                rowTestId={(row) => `string-row-${slug(row.key)}`}
                caption={t("admin.translations.strings.caption")}
                loading={list.isLoading}
                loadingState={
                  <p className="text-sm text-muted-foreground">
                    {t("admin.translations.strings.loading")}
                  </p>
                }
                error={list.error}
                errorState={
                  <p className="text-sm text-destructive">
                    {t("admin.translations.strings.error")}
                  </p>
                }
                emptyState={
                  <p className="text-sm text-muted-foreground">
                    {t("admin.translations.strings.empty")}
                  </p>
                }
                toolbar={
                  <div className="flex min-w-0 flex-col gap-2">
                    <Input
                      data-testid="strings-search"
                      value={searchDraft}
                      aria-label={t("admin.translations.filter.search")}
                      placeholder={t("admin.translations.filter.search")}
                      onChange={(event) => setSearchDraft(event.target.value)}
                    />
                    <div className="flex min-w-0 flex-wrap gap-2" data-testid="strings-chips">
                      {STATUS_CHIPS.map((chip) => (
                        <Button
                          key={chip.value}
                          type="button"
                          variant={status === chip.value ? "default" : "outline"}
                          className="min-h-11"
                          data-testid={`strings-chip-${chip.value}`}
                          onClick={() => {
                            setOrphanedView(false);
                            setSearchParams({
                              ...(chip.value === "all" ? {} : { status: chip.value }),
                              ...(query === "" ? {} : { q: query }),
                            });
                          }}
                        >
                          {`${t(chip.labelKey)} · ${counts[chip.value] ?? 0}`}
                        </Button>
                      ))}
                      {/* U4g — orphaned keys: excluded from coverage, never shipped. */}
                      <Button
                        type="button"
                        variant={orphanedView ? "default" : "outline"}
                        className="min-h-11"
                        data-testid="strings-chip-orphaned"
                        onClick={() => {
                          setPage(0);
                          setOrphanedView((current) => !current);
                        }}
                      >
                        {t("admin.translations.orphaned.chip").replace(
                          "{count}",
                          String(counts["orphaned"] ?? 0),
                        )}
                      </Button>
                    </div>
                    {orphanedView ? (
                      <p
                        data-testid="strings-orphaned-note"
                        className="text-xs text-muted-foreground"
                      >
                        {t("admin.translations.orphaned.note")}
                      </p>
                    ) : null}
                  </div>
                }
                expandedRow={(row) =>
                  row.key === expanded ? (
                    <StringEditor
                      row={row}
                      lang={lang}
                      rtl={known?.rtl ?? false}
                      mayUpdate={mayUpdate}
                      mayApprove={mayApprove}
                      mayMachine={mayMachine && !(known?.isBase ?? false)}
                      mayManage={mayManage}
                      usedOn={usage.data?.[row.key]}
                      guard={guard}
                      saved={savedKey === row.key}
                      onSaved={(next) => setSavedKey(next ? row.key : null)}
                    />
                  ) : null
                }
                rowActions={(row) => (
                  <Button
                    type="button"
                    variant="outline"
                    className="min-h-11"
                    data-testid={`string-expand-${slug(row.key)}`}
                    onClick={() => setExpanded((current) => (current === row.key ? null : row.key))}
                  >
                    {expanded === row.key
                      ? t("admin.translations.collapse")
                      : t("admin.translations.expand")}
                  </Button>
                )}
                pagination={
                  <DataTablePagination
                    testid="strings-pagination"
                    offset={page * PAGE_SIZE}
                    pageSize={PAGE_SIZE}
                    total={total}
                    onPrevious={() => setPage((current) => Math.max(0, current - 1))}
                    onNext={() =>
                      setPage((current) =>
                        (current + 1) * PAGE_SIZE < total ? current + 1 : current,
                      )
                    }
                  />
                }
              />
            </>
          )}
        </div>
      )}
    </StepUpGate>
  );
}

/** Testid-safe key slug: dots and colons are not selector-friendly. */
function slug(key: string) {
  return key.replace(/[^a-zA-Z0-9]+/g, "-");
}

/**
 * U4g-24 (INC-115) — the placeholder grammar the server validator uses:
 * `{name}` tokens, in order of appearance.
 */
function matchTokens(text: string): string[] {
  return text.match(/\{[^{}]*\}/g) ?? [];
}

/** Positional rewrite: token i of the draft becomes token i of the source. */
function rewriteTokens(text: string, tokens: string[]): string {
  let index = 0;
  return text.replace(/\{[^{}]*\}/g, (whole) => tokens[index++] ?? whole);
}

function stringColumns(
  t: (key: MessageKey) => string,
  rtl: boolean,
): DataTableColumn<TranslationRow>[] {
  return [
    {
      key: "key",
      header: t("admin.translations.col.key"),
      priority: "primary",
      width: "w-[26%]",
      cell: (row) => (
        <span className="block truncate font-mono text-xs text-foreground" title={row.key}>
          {row.key}
        </span>
      ),
    },
    {
      key: "source",
      header: t("admin.translations.col.source"),
      priority: "secondary",
      width: "w-[26%]",
      cell: (row) => (
        <span className="block truncate text-muted-foreground" title={row.sourceValue ?? undefined}>
          {row.sourceValue ?? "—"}
        </span>
      ),
    },
    {
      key: "value",
      header: t("admin.translations.col.value"),
      priority: "primary",
      width: "w-[26%]",
      cell: (row) => (
        <span
          dir={rtl ? "rtl" : undefined}
          className="block truncate text-foreground"
          title={row.value ?? undefined}
        >
          {row.value ?? "—"}
        </span>
      ),
    },
    {
      key: "status",
      header: t("admin.translations.col.status"),
      priority: "primary",
      width: "w-[12%]",
      cell: (row) => (
        <span className="flex flex-wrap gap-1">
          <Badge variant="outline" data-testid={`string-status-${slug(row.key)}`}>
            {t(STATUS_LABELS[row.status] ?? "admin.translations.status.untranslated")}
          </Badge>
          {row.flagged ? (
            <Badge variant="destructive" data-testid={`string-flagged-${slug(row.key)}`}>
              {t("admin.translations.status.flagged")}
            </Badge>
          ) : null}
        </span>
      ),
    },
    {
      key: "provenance",
      header: t("admin.translations.col.provenance"),
      priority: "detail",
      width: "w-[10%]",
      /**
       * U4g-24 (INC-115) — PROVENANCE IS THE TEXT'S ORIGIN, NEVER ITS REVIEW
       * STATE. `machine=true` reads "Machine" even once the row is approved;
       * approval is APPENDED ("Approved by …"), never substituted, so nobody
       * can mistake reviewed machine text for human-written text.
       */
      cell: (row) => (
        <span className="block truncate text-xs text-muted-foreground">
          {row.status === "untranslated"
            ? t("admin.translations.provenance.none")
            : t(
                row.machine
                  ? "admin.translations.provenance.machine"
                  : "admin.translations.provenance.human",
              )}
          {row.approvedAt
            ? ` · ${t("admin.translations.provenance.approvedBy").replace(
                "{who}",
                row.approvedBy ?? "—",
              )}`
            : ""}
        </span>
      ),
    },
  ];
}

function StringEditor({
  row,
  lang,
  rtl,
  mayUpdate,
  mayApprove,
  mayMachine,
  mayManage,
  usedOn,
  guard,
  saved,
  onSaved,
}: {
  row: TranslationRow;
  lang: string;
  rtl: boolean;
  mayUpdate: boolean;
  mayApprove: boolean;
  mayMachine: boolean;
  /** U4i ① — only a manage holder may write the shared translator note. */
  mayManage: boolean;
  /** U4i ② — surfaces from the build-time map; `undefined` = not yet known. */
  usedOn: string[] | undefined;
  guard: GuardFn;
  /** INC-104 — owned by the page, so a refetch cannot erase the marker. */
  saved: boolean;
  onSaved: (next: boolean) => void;
}) {
  const { t, language } = useI18n();
  const save = useSaveTranslation(lang);
  const ai = useAiTranslate(lang);
  const statusAction = useTranslationStatusAction(lang);
  const contextAction = useSetKeyContext();
  const [draft, setDraft] = useState(row.value ?? "");
  const [contextDraft, setContextDraft] = useState(row.context);
  const [errorKey, setErrorKey] = useState<MessageKey | null>(null);
  const [errorDetail, setErrorDetail] = useState<string | null>(null);
  const id = slug(row.key);

  // U4g-24 (INC-115) — positional placeholder repair (see the button below).
  const sourceTokens = matchTokens(row.sourceValue ?? "");
  const draftTokens = matchTokens(draft);
  const canRestoreTokens = sourceTokens.length > 0 && draftTokens.length === sourceTokens.length;

  // MutationAction alias: the hardcoded-string scan reads an inline
  // arrow return type as JSX text (known scanner shape, not a violation).
  const run = (action: MutationAction) => {
    onSaved(false);
    setErrorKey(null);
    setErrorDetail(null);
    void guard(action)
      .then(() => onSaved(true))
      .catch((failure: unknown) => {
        setErrorKey(translationErrorKey(failure));
        setErrorDetail(serverMessage(failure));
      });
  };

  return (
    <div className="min-w-0 space-y-3" data-testid={`string-editor-${id}`}>
      <div className="min-w-0 space-y-1">
        <p className="text-xs font-medium text-muted-foreground">
          {t("admin.translations.editor.source")}
        </p>
        <p
          data-testid={`string-source-${id}`}
          className="min-w-0 break-words text-sm text-foreground"
        >
          {row.sourceValue ?? "—"}
        </p>
      </div>

      {/**
       * U4i ① — CONTEXT NOTE. One note per KEY (stored on the base row), so a
       * note written here is visible to every language's translator, and the
       * AI route sends it to the provider as translation context.
       */}
      <div className="min-w-0 space-y-1">
        <p className="text-xs font-medium text-muted-foreground">
          {t("admin.translations.editor.context")}
        </p>
        {mayManage ? (
          <div className="flex min-w-0 flex-col gap-2">
            <Input
              id={`string-context-${id}`}
              data-testid={`string-context-${id}`}
              value={contextDraft}
              aria-label={t("admin.translations.editor.context")}
              placeholder={t("admin.translations.editor.contextPlaceholder")}
              onChange={(event) => setContextDraft(event.target.value)}
            />
            <Button
              type="button"
              variant="outline"
              className="min-h-11 self-start"
              data-testid={`string-context-save-${id}`}
              disabled={contextAction.isPending || contextDraft === row.context}
              onClick={() =>
                run(() => contextAction.mutateAsync({ key: row.key, context: contextDraft }))
              }
            >
              {t("admin.translations.editor.contextSave")}
            </Button>
          </div>
        ) : (
          <p data-testid={`string-context-${id}`} className="text-sm text-foreground">
            {row.context === "" ? t("admin.translations.editor.contextNone") : row.context}
          </p>
        )}
      </div>

      {/**
       * U4i ② — USED ON. Build-time truth from scripts/i18n-usage-map.ts.
       * `undefined` (map not loaded) and an empty list (key not found in any
       * literal call site → dynamic or unused) are DIFFERENT answers (E6).
       */}
      <p data-testid={`string-usedon-${id}`} className="text-xs text-muted-foreground">
        {usedOn === undefined
          ? t("admin.translations.editor.usedOnUnknown")
          : usedOn.length === 0
            ? t("admin.translations.editor.usedOnDynamic")
            : t("admin.translations.editor.usedOn").replace("{surfaces}", usedOn.join(", "))}
      </p>

      {row.flagged && row.flagNote ? (
        <p data-testid={`string-flagnote-${id}`} className="text-sm text-destructive">
          {`${t("admin.translations.editor.flagNote").replace("{note}", row.flagNote)} ${t(
            "admin.translations.editor.placeholderRule",
          )}`}
        </p>
      ) : null}

      <label className="block text-sm font-medium text-foreground" htmlFor={`string-input-${id}`}>
        {t("admin.translations.editor.label")}
      </label>
      <Textarea
        id={`string-input-${id}`}
        data-testid={`string-input-${id}`}
        dir={rtl ? "rtl" : undefined}
        rows={3}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
      />

      {/**
       * U4i ③ — LENGTH WARNING. Advisory only: never a flag, never a block —
       * the row still saves. Long Amharic renderings are legitimate; the chip
       * exists so a translator can SEE a layout risk before QA does.
       */}
      {isOverlong(row.sourceValue, draft) ? (
        <p
          data-testid={`string-length-warning-${id}`}
          className="text-xs font-medium text-amber-600 dark:text-amber-500"
        >
          {t("admin.translations.editor.lengthWarning").replace(
            "{ratio}",
            String(lengthRatio(row.sourceValue, draft)),
          )}
        </p>
      ) : null}

      {/**
       * U4g-24 (INC-115) — ONE-CLICK PLACEHOLDER REPAIR. Positional rewrite
       * only, and only when the counts already match: the tool never invents,
       * drops or reorders a placeholder. It fills the EDITOR; nothing is
       * written until Save, which re-runs the server-side validator.
       */}
      {row.flagged && mayUpdate ? (
        <div className="min-w-0 space-y-1">
          <Button
            type="button"
            variant="outline"
            className="min-h-11"
            data-testid={`string-restore-tokens-${id}`}
            disabled={!canRestoreTokens}
            onClick={() => setDraft(rewriteTokens(draft, sourceTokens))}
          >
            {t("admin.translations.editor.restorePlaceholders")}
          </Button>
          {!canRestoreTokens ? (
            <p data-testid={`string-restore-hint-${id}`} className="text-xs text-muted-foreground">
              {t("admin.translations.editor.restoreHint")
                .replace("{got}", String(draftTokens.length))
                .replace("{want}", String(sourceTokens.length))}
            </p>
          ) : null}
        </div>
      ) : null}

      <p data-testid={`string-provenance-${id}`} className="text-xs text-muted-foreground">
        {row.status === "untranslated"
          ? t("admin.translations.provenance.none")
          : `${t(
              row.machine
                ? "admin.translations.provenance.machine"
                : "admin.translations.provenance.human",
            )} · ${relativeTime(row.updatedAt, language)}`}
        {row.approvedAt
          ? ` · ${t("admin.translations.provenance.approvedBy").replace(
              "{who}",
              row.approvedBy ?? "—",
            )}`
          : ""}
      </p>

      <div className="flex min-w-0 flex-wrap gap-2">
        {mayUpdate ? (
          <Button
            className="min-h-11"
            data-testid={`string-save-${id}`}
            disabled={save.isPending}
            onClick={() => run(() => save.mutateAsync({ key: row.key, value: draft }))}
          >
            {t("admin.translations.editor.save")}
          </Button>
        ) : null}
        {mayMachine ? (
          <Button
            variant="outline"
            className="min-h-11"
            data-testid={`string-ai-${id}`}
            disabled={ai.isPending || row.sourceValue === null}
            onClick={() =>
              run(async () => {
                const result = await ai.mutateAsync([
                  { key: row.key, source: row.sourceValue ?? "" },
                ]);
                const failure = result.failed[0];
                // F4 — a per-item refusal is an ERROR here, never a quiet no-op.
                if (failure) throw new Error(failure.reason);
              })
            }
          >
            {ai.isPending ? t("admin.translations.ai.pending") : t("admin.translations.ai.row")}
          </Button>
        ) : null}
        {mayApprove ? (
          <>
            <Button
              variant="outline"
              className="min-h-11"
              data-testid={`string-approve-${id}`}
              disabled={statusAction.isPending}
              onClick={() =>
                run(() => statusAction.mutateAsync({ key: row.key, action: "approve" }))
              }
            >
              {t("admin.translations.editor.approve")}
            </Button>
            <Button
              variant="outline"
              className="min-h-11"
              data-testid={`string-clear-${id}`}
              disabled={statusAction.isPending}
              onClick={() => run(() => statusAction.mutateAsync({ key: row.key, action: "clear" }))}
            >
              {t("admin.translations.editor.clear")}
            </Button>
          </>
        ) : null}
        {/* U4e — the page itself is translations:view-gated, so History rides along. */}
        <HistoryDrawer
          translationKey={row.key}
          lang={lang}
          rtl={rtl}
          testId={id}
          mayUpdate={mayUpdate}
          mayApprove={mayApprove}
          guard={guard}
          restored={saved}
          onRestored={onSaved}
        />
      </div>

      {saved ? (
        <p
          role="status"
          data-testid={`string-saved-${id}`}
          className="text-sm text-muted-foreground"
        >
          {t("admin.translations.editor.saved")}
        </p>
      ) : null}
      {errorKey ? (
        <p role="alert" data-testid={`string-error-${id}`} className="text-sm text-destructive">
          {t(errorKey)}
          {errorDetail ? <span className="block text-xs opacity-80">{errorDetail}</span> : null}
        </p>
      ) : null}
    </div>
  );
}

export default AdminTranslationsStringsPage;
