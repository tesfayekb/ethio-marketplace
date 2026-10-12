import { useNavigate } from "@tanstack/react-router";
import { ArrowDown, ArrowUp, Languages } from "lucide-react";
import { useState } from "react";

import { ColumnsButton } from "@/components/shell/columns-button";
import { useHiddenColumns, visibleColumns } from "@/components/shell/columns-state";
import {
  DataTable,
  DataTablePagination,
  type DataTableColumn,
} from "@/components/shell/data-table";
import { FormField, FormSection } from "@/components/shell/form-section";
import { RowActions } from "@/components/shell/row-actions";
import { StatCard, StatGrid } from "@/components/shell/stat-card";
import { TableActions } from "@/components/shell/table-actions";
import { TableToolbar } from "@/components/shell/table-toolbar";
import { useKeptPage } from "@/components/shell/use-kept-page";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useAdminShell } from "@/features/admin/admin-context";
import { useCountries } from "@/features/admin/users/use-admin-users";
import { StepUpGate } from "@/features/auth/mfa/step-up-gate";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { useI18n } from "@/i18n";
import { am } from "@/i18n/locales/am";
import { en } from "@/i18n/locales/en";
import type { MessageKey } from "@/i18n/types";

import { DeleteLanguageDialog } from "./delete-language-dialog";
import { LanguagePicker } from "./language-picker";
import { PseudoBar } from "./pseudo-bar";
import {
  serverMessage,
  translationErrorKey,
  type EntityTranslationStats,
  type LanguageRow,
  type ProviderLanguage,
  type SyncResult,
  type TranslationStats,
} from "./translations-service";
import {
  useEntityTranslationStats,
  useLanguages,
  useSetLanguageFlags,
  useSetLanguageOrder,
  useSyncUiKeys,
  useTranslationStats,
  useUpsertLanguage,
} from "./use-translations";

/** Provider codes can carry a region subtag (`zh-CN`); the roster stores them lowercased. */
const LANGUAGE_CODE_RE = /^[a-z]{2,8}(-[a-z0-9]{2,8})?$/;

/** U4j — RTL is derived, never guessed by the operator; it stays editable. */
const RTL_LANGUAGES = new Set(["ar", "he", "fa", "ur", "ps", "sd", "ug", "yi"]);

function nativeNameOf(code: string, fallback: string): string {
  try {
    const display = new Intl.DisplayNames([code], { type: "language" });
    return display.of(code) ?? fallback;
  } catch {
    return fallback;
  }
}

/**
 * U4g-10 (INC-103) — ONE SORTED SOURCE. The roster's order law is (sort, code),
 * identical to the public switcher's. Render AND the move controls' disabled
 * predicates read this same array, so a button can never describe a different
 * order from the one on screen.
 */
function sortLanguages(data: LanguageRow[] | undefined): LanguageRow[] {
  return [...(data ?? [])].sort((a, b) => a.sort - b.sort || a.code.localeCompare(b.code));
}

/**
 * U4b PART A — THE LANGUAGES PAGE (/admin/translations).
 *
 * Gate tier: translations:view for the page, translations:manage for every
 * control on it. Law F3 — hiding a switch is convenience; the definer RPCs
 * re-check the permission, the step-up and the coverage gate themselves, and
 * their refusal text is what the operator ultimately sees (law F4).
 */
export function AdminTranslationsLanguagesPage() {
  const { t } = useI18n();
  const { permissions } = useAdminShell();
  const mayManage = permissions.includes("translations:manage");

  const languages = useLanguages();
  const stats = useTranslationStats();
  // U4j — the SECOND meter: content-name coverage, side by side with the UI one.
  const dataStats = useEntityTranslationStats();

  const dataByLang = new Map<string, EntityTranslationStats>(
    (dataStats.data ?? []).map((row) => [row.langCode, row]),
  );
  const statsByLang = new Map<string, TranslationStats>(
    (stats.data ?? []).map((row) => [row.langCode, row]),
  );
  const rows = sortLanguages(languages.data);
  const baseTotal = statsByLang.get("en")?.total ?? 0;
  const enabledCount = rows.filter((row) => row.enabledAdmin || row.enabledPublic).length;
  const totals = (stats.data ?? []).reduce(
    (acc, row) => ({ approved: acc.approved + row.approved, total: acc.total + row.total }),
    { approved: 0, total: 0 },
  );
  const approvedPct = totals.total === 0 ? 0 : Math.round((totals.approved / totals.total) * 100);

  return (
    <StepUpGate>
      {(guard) => (
        <div data-testid="admin-section-translations" className="min-w-0 space-y-4">
          {/* Bundle 11 G3a (D132) — the page's heading in the header, its line under it. */}
          <div className="min-w-0 space-y-1">
            <TableActions testid="lang-header" title={t("admin.translations.title")} />
            <p className="text-sm text-muted-foreground">{t("admin.translations.subtitle")}</p>
          </div>

          <StatGrid testid="translations-stats">
            <StatCard
              testid="translations-stat-keys"
              loading={stats.isLoading}
              label={t("admin.translations.stat.totalKeys")}
              value={baseTotal}
            />
            <StatCard
              testid="translations-stat-languages"
              loading={languages.isLoading}
              label={t("admin.translations.stat.languages")}
              value={enabledCount}
            />
            <StatCard
              testid="translations-stat-approved"
              loading={stats.isLoading}
              label={t("admin.translations.stat.approved")}
              value={`${approvedPct}%`}
            />
          </StatGrid>

          <LanguagesTable
            rows={rows}
            statsByLang={statsByLang}
            dataByLang={dataByLang}
            loading={languages.isLoading}
            error={languages.error}
            mayManage={mayManage}
            guard={guard}
          />

          <p className="text-sm text-muted-foreground" data-testid="translations-meter-note">
            {t("admin.translations.meterNote")}
          </p>

          {mayManage ? (
            <>
              <SyncKeysCard guard={guard} />
              <AddLanguageCard guard={guard} />
              {/**
               * U4i-3 (e) — PSEUDO-LOCALIZATION lives on the roster, next to
               * the other language-level tools. It used to render only inside
               * the BASE language's strings page, behind the manage gate, below
               * the export bar — a place an operator had no reason to open, so
               * the walk reported "not found".
               */}
              <PseudoBar guard={guard} />
            </>
          ) : null}
        </div>
      )}
    </StepUpGate>
  );
}

function coverageOf(stats: TranslationStats | undefined) {
  const total = stats?.total ?? 0;
  const approved = stats?.approved ?? 0;
  return { total, approved, remaining: Math.max(0, total - approved) };
}

function LanguagesTable({
  rows,
  statsByLang,
  dataByLang,
  loading,
  error,
  mayManage,
  guard,
}: {
  rows: LanguageRow[];
  statsByLang: Map<string, TranslationStats>;
  dataByLang: Map<string, EntityTranslationStats>;
  loading: boolean;
  error: unknown;
  mayManage: boolean;
  guard: GuardFn;
}) {
  const { t } = useI18n();
  const navigate = useNavigate();
  const flags = useSetLanguageFlags();
  const order = useSetLanguageOrder();
  const [errorKey, setErrorKey] = useState<MessageKey | null>(null);
  /**
   * Bundle 11 G3d — the row's red Delete opens ONE typed-confirm dialog for the
   * row it names; its result line lives here, because the deleted row (and
   * anything it drew) leaves the roster when the list re-reads.
   */
  const [deleting, setDeleting] = useState<LanguageRow | null>(null);
  const [deleteSummary, setDeleteSummary] = useState<string | null>(null);
  /**
   * Bundle 11 G3a (D128; the operator's walk, 2026-10-11) — Columns and the
   * footer, as every table. The roster is ordered by hand (the moves below), so
   * its page holds 100 languages by default: the whole order on one page.
   */
  const [hidden, toggleColumn] = useHiddenColumns("admin-languages");
  const paging = useKeptPage("ethio.admin.languages.pageSize", 100);
  const [errorDetail, setErrorDetail] = useState<string | null>(null);

  /**
   * U4g-10 (INC-103) — the ONE sorted source this component renders from and
   * reasons about; the disabled predicates and `move` both index into it.
   */
  const ordered = sortLanguages(rows);

  // Source-catalog size drives the publication gate's empty-set branch.
  const baseCode = ordered.find((row) => row.isBase)?.code ?? "en";
  const baseKeyCount = coverageOf(statsByLang.get(baseCode)).total;

  const apply = (row: LanguageRow, next: { admin?: boolean; public?: boolean }) => {
    setErrorKey(null);
    setErrorDetail(null);
    void guard(() =>
      flags.mutateAsync({
        code: row.code,
        enabledAdmin: next.admin ?? row.enabledAdmin,
        enabledPublic: next.public ?? row.enabledPublic,
      }),
    ).catch((failure: unknown) => {
      // Both server refusals read translated: the coverage one through the
      // shared mapper, the empty-catalog one through the sync-first line.
      const raw = serverMessage(failure) ?? "";
      setErrorKey(
        /catalog empty/i.test(raw)
          ? "admin.translations.syncFirstTooltip"
          : translationErrorKey(failure),
      );
      setErrorDetail(raw === "" ? null : raw);
    });
  };

  /**
   * U4g — ROSTER ORDER. The roster arrives sorted by `languages.sort`, and the
   * public switcher reads the same column, so this order IS the visitor's
   * order. The base language is pinned first; a swap into its slot is refused
   * client-side and by the RPC.
   */
  const move = (row: LanguageRow, direction: -1 | 1) => {
    setErrorKey(null);
    setErrorDetail(null);
    const codes = ordered.map((entry) => entry.code);
    const index = codes.indexOf(row.code);
    const target = index + direction;
    const neighbour = ordered[target];
    if (index < 0 || neighbour === undefined || neighbour.isBase) return;
    const next = [...codes];
    next[index] = neighbour.code;
    next[target] = row.code;
    void guard(() => order.mutateAsync(next)).catch((failure: unknown) => {
      setErrorKey(translationErrorKey(failure));
      setErrorDetail(serverMessage(failure));
    });
  };

  /**
   * Bundle 11 G3d (DEC-170) — the order moves live in the row's three-dots menu,
   * read from the one sorted source (INC-103): Move up is off for the row under
   * the pinned base language, Move down for the last row, and both while an
   * order write is in flight (it spans the re-read).
   */
  const moveItems = (row: LanguageRow) => {
    const index = ordered.findIndex((entry) => entry.code === row.code);
    const above = index > 0 ? ordered[index - 1] : undefined;
    return [
      {
        key: "up",
        label: t("admin.translations.order.up").replace("{language}", row.nameNative),
        icon: <ArrowUp />,
        disabled: order.isPending || above === undefined || above.isBase,
        onSelect: () => move(row, -1),
      },
      {
        key: "down",
        label: t("admin.translations.order.down").replace("{language}", row.nameNative),
        icon: <ArrowDown />,
        disabled: order.isPending || index < 0 || index >= ordered.length - 1,
        onSelect: () => move(row, 1),
      },
    ];
  };

  /**
   * Bundle 11 G3d — a coverage meter as ONE fact of the phone card: its word,
   * a short bar and the count on one line (the table keeps the full-width bar).
   */
  const cardMeter = (
    testid: string,
    label: string,
    approved: number,
    total: number,
    tone: string,
  ) => {
    const pct = total === 0 ? 0 : Math.round((approved / total) * 100);
    return (
      <span data-testid={testid} className="inline-flex min-w-0 items-center gap-1.5">
        <span className="text-xs font-normal text-muted-foreground">{label}</span>
        <span aria-hidden="true" className="block h-1.5 w-14 overflow-hidden rounded-full bg-muted">
          <span className={`block h-full rounded-full ${tone}`} style={{ width: `${pct}%` }} />
        </span>
        <span className="text-xs tabular-nums">{`${approved} / ${total}`}</span>
      </span>
    );
  };

  /** The headers carry tooltips (ReactNode), so Columns names each column by its plain word. */
  const columnLabels: Record<string, string> = {
    language: t("admin.translations.col.language"),
    nameEn: t("admin.translations.col.nameEn"),
    coverage: t("admin.translations.col.coverage"),
    coverageData: t("admin.translations.col.coverageData"),
    admin: t("admin.translations.col.admin"),
    public: t("admin.translations.col.public"),
  };

  const allColumns: DataTableColumn<LanguageRow>[] = [
    {
      key: "language",
      header: t("admin.translations.col.language"),
      priority: "primary",
      card: "title",
      width: "w-fit max-w-40",
      cell: (row) => (
        <span className="flex min-w-0 flex-nowrap items-center gap-1.5">
          <span className="min-w-0 truncate font-medium text-foreground" title={row.nameNative}>
            {row.nameNative}
          </span>
          <span className="shrink-0 font-mono text-xs text-muted-foreground">{row.code}</span>
          {row.isBase ? (
            <Badge variant="outline" className="shrink-0" data-testid={`lang-base-${row.code}`}>
              {t("admin.translations.badge.base")}
            </Badge>
          ) : null}
          {row.rtl ? (
            <Badge variant="outline" className="shrink-0" data-testid={`lang-rtl-${row.code}`}>
              {t("admin.translations.badge.rtl")}
            </Badge>
          ) : null}
        </span>
      ),
    },
    {
      key: "nameEn",
      header: t("admin.translations.col.nameEn"),
      priority: "detail",
      card: "sub",
      width: "w-fit max-w-32",
      cell: (row) => (
        <span className="block max-w-28 truncate text-muted-foreground" title={row.nameEn}>
          {row.nameEn}
        </span>
      ),
    },
    {
      key: "coverage",
      header: (
        <span title={t("admin.translations.col.interfaceTooltip")}>
          {t("admin.translations.col.coverage")}
        </span>
      ),
      priority: "primary",
      card: "meta",
      cardCell: (row) => {
        const { total, approved } = coverageOf(statsByLang.get(row.code));
        return cardMeter(
          `lang-coverage-${row.code}`,
          t("admin.translations.col.coverage"),
          approved,
          total,
          "bg-primary",
        );
      },
      width: "w-auto",
      cell: (row) => {
        const { total, approved } = coverageOf(statsByLang.get(row.code));
        const pct = total === 0 ? 0 : Math.round((approved / total) * 100);
        return (
          <span className="block min-w-0" data-testid={`lang-coverage-${row.code}`}>
            <span className="mb-1 block text-xs font-medium text-foreground md:hidden">
              {t("admin.translations.col.coverage")}
            </span>
            <span
              aria-hidden="true"
              className="block h-2 w-full overflow-hidden rounded-full bg-muted"
            >
              <span className="block h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
            </span>
            <span className="mt-1 block text-xs tabular-nums text-muted-foreground">
              {t("admin.translations.coverage")
                .replace("{approved}", String(approved))
                .replace("{total}", String(total))}
            </span>
          </span>
        );
      },
    },
    {
      key: "coverageData",
      header: (
        <span title={t("admin.translations.col.contentTooltip")}>
          {t("admin.translations.col.coverageData")}
        </span>
      ),
      priority: "secondary",
      card: "meta",
      cardCell: (row) => {
        const entry = dataByLang.get(row.code);
        return cardMeter(
          `lang-data-coverage-${row.code}`,
          t("admin.translations.col.coverageData"),
          entry?.approved ?? 0,
          entry?.total ?? 0,
          "bg-secondary-foreground",
        );
      },
      width: "w-auto",
      cell: (row) => {
        const entry = dataByLang.get(row.code);
        const total = entry?.total ?? 0;
        const approved = entry?.approved ?? 0;
        const pct = total === 0 ? 0 : Math.round((approved / total) * 100);
        return (
          <span className="block min-w-0" data-testid={`lang-data-coverage-${row.code}`}>
            <span className="mb-1 block text-xs font-medium text-foreground md:hidden">
              {t("admin.translations.col.coverageData")}
            </span>
            <span
              aria-hidden="true"
              className="block h-2 w-full overflow-hidden rounded-full bg-muted"
            >
              <span
                className="block h-full rounded-full bg-secondary-foreground"
                style={{ width: `${pct}%` }}
              />
            </span>
            <span className="mt-1 block text-xs tabular-nums text-muted-foreground">
              {t("admin.translations.coverage")
                .replace("{approved}", String(approved))
                .replace("{total}", String(total))}
            </span>
          </span>
        );
      },
    },
    {
      key: "admin",
      header: (
        <span title={t("admin.translations.col.staffTooltip")}>
          {t("admin.translations.col.admin")}
        </span>
      ),
      priority: "secondary",
      card: "meta",
      width: "w-16",
      cell: (row) => (
        <span className="inline-flex min-w-0 items-center gap-2 xl:block">
          <span className="text-xs font-normal text-muted-foreground xl:hidden">
            {t("admin.translations.col.admin")}
          </span>
          <Switch
            data-testid={`lang-admin-${row.code}`}
            aria-label={t("admin.translations.switch.admin")}
            checked={row.enabledAdmin}
            disabled={!mayManage || row.isBase || flags.isPending}
            onCheckedChange={(checked) => apply(row, { admin: checked })}
          />
        </span>
      ),
    },
    {
      key: "public",
      header: (
        <span title={t("admin.translations.col.publicTooltip")}>
          {t("admin.translations.col.public")}
        </span>
      ),
      priority: "secondary",
      card: "meta",
      // Bundle 11 G3d — room for the gate's line under the switch (it broke inside words at w-16).
      width: "w-36",
      cell: (row) => {
        const { total, remaining } = coverageOf(statsByLang.get(row.code));
        // EMPTY-SET LAW (INC-095h): an empty catalog is not vacuously complete.
        // The server refuses it explicitly; the switch says so before the click.
        const catalogEmpty = baseKeyCount === 0;
        const blocked = !row.enabledPublic && (catalogEmpty || remaining > 0);
        const hint = catalogEmpty
          ? t("admin.translations.syncFirstTooltip")
          : t("admin.translations.publicGate")
              .replace("{remaining}", String(remaining))
              .replace("{total}", String(total));
        return (
          <span
            className="inline-flex min-w-0 flex-wrap items-center gap-x-2 xl:block"
            title={blocked ? hint : undefined}
          >
            <span className="text-xs font-normal text-muted-foreground xl:hidden">
              {t("admin.translations.col.public")}
            </span>
            <Switch
              data-testid={`lang-public-${row.code}`}
              aria-label={t("admin.translations.switch.public")}
              checked={row.enabledPublic}
              disabled={!mayManage || row.isBase || blocked || flags.isPending}
              onCheckedChange={(checked) => apply(row, { public: checked })}
            />
            {blocked ? (
              <span
                data-testid={`lang-public-gate-${row.code}`}
                className="mt-1 block basis-full text-xs font-normal text-muted-foreground"
              >
                {hint}
              </span>
            ) : null}
          </span>
        );
      },
    },
  ];

  const columns = visibleColumns(allColumns, hidden, ["language"]);

  return (
    <>
      <DataTable
        columns={columns}
        rows={ordered}
        rowKey={(row) => row.code}
        rowTestId={(row) => `lang-row-${row.code}`}
        caption={t("admin.translations.caption")}
        toolbar={
          <TableToolbar
            testid="lang-toolbar"
            columns={
              <ColumnsButton
                testid="lang-columns"
                columns={allColumns.map((column) => ({
                  key: column.key,
                  label: columnLabels[column.key] ?? column.key,
                  locked: column.key === "language",
                }))}
                hidden={hidden}
                onToggle={toggleColumn}
              />
            }
          />
        }
        page={paging.page}
        pageSize={paging.pageSize}
        pagination={
          <DataTablePagination
            testid="lang-pagination"
            offset={paging.page * paging.pageSize}
            pageSize={paging.pageSize}
            total={ordered.length}
            onPrevious={() => paging.setPage((current) => Math.max(0, current - 1))}
            onNext={() => paging.setPage((current) => current + 1)}
            onPage={paging.setPage}
            pageSizeOptions={paging.pageSizeOptions}
            onPageSize={paging.setPageSize}
          />
        }
        loading={loading}
        loadingState={
          <p className="text-sm text-muted-foreground">{t("admin.translations.loading")}</p>
        }
        error={error}
        errorState={<p className="text-sm text-destructive">{t("admin.translations.error")}</p>}
        emptyState={
          <p className="text-sm text-muted-foreground">{t("admin.translations.empty")}</p>
        }
        className="md:[&_table]:min-w-[56rem]"
        /**
         * Bundle 11 G3d — seven columns and the actions need about 56rem: below
         * xl the roster is cards (two to a row from md), never a table that
         * scrolls sideways inside its frame.
         */
        cardUntil="xl"
        cardLead={() => <Languages />}
        actionsWidth="w-44"
        rowActions={(row) =>
          row.isBase ? (
            <span
              data-testid={`lang-source-${row.code}`}
              className="block max-w-52 text-xs text-muted-foreground"
            >
              {t("admin.translations.badge.source")}
            </span>
          ) : (
            /**
             * Bundle 11 G3d (DEC-170) — the row's actions on the agreed blocks:
             * Open strings (the row's edit: the language's strings page), the
             * red Delete (off for a published language — the door refuses it,
             * turn Public off first), and the three-dots with the order moves.
             * On a phone the three-dots sit in the card's corner, Open and
             * Delete in its footer.
             */
            <RowActions
              testid={`lang-actions-${row.code}`}
              name={row.nameNative}
              edit={{
                label: t("admin.translations.open"),
                onSelect: () =>
                  void navigate({ to: "/admin/translations/$lang", params: { lang: row.code } }),
              }}
              remove={
                mayManage
                  ? {
                      label: t("admin.translations.delete.action"),
                      disabled: row.enabledPublic,
                      onSelect: () => {
                        setDeleteSummary(null);
                        setDeleting(row);
                      },
                    }
                  : undefined
              }
              more={mayManage ? moveItems(row) : undefined}
            />
          )
        }
      />
      {/* U4i-4 (b) — destructive, typed-confirmed and step-upped (INC-123). */}
      {deleting !== null ? (
        <DeleteLanguageDialog
          key={deleting.code}
          row={deleting}
          guard={guard}
          onClose={() => setDeleting(null)}
          onDeleted={setDeleteSummary}
        />
      ) : null}
      {deleteSummary ? (
        <p role="status" data-testid="lang-delete-summary" className="text-xs text-foreground">
          {deleteSummary}
        </p>
      ) : null}
      {mayManage ? (
        <p data-testid="lang-order-note" className="text-xs text-muted-foreground">
          {t("admin.translations.order.note")}
        </p>
      ) : null}
      {errorKey ? (
        <p role="alert" data-testid="lang-flags-error" className="text-sm text-destructive">
          {t(errorKey)}
          {errorDetail ? <span className="block text-xs opacity-80">{errorDetail}</span> : null}
        </p>
      ) : null}
    </>
  );
}

/**
 * "Sync keys" imports the COMPILED catalogs (the developer seed) into the DB,
 * which is the runtime truth once a bundle exists (D3).
 */
function SyncKeysCard({ guard }: { guard: GuardFn }) {
  const { t } = useI18n();
  const sync = useSyncUiKeys();
  const [done, setDone] = useState<string | null>(null);
  const [errorKey, setErrorKey] = useState<MessageKey | null>(null);

  return (
    <FormSection
      testid="translations-sync"
      title={t("admin.translations.sync.title")}
      description={t("admin.translations.sync.description")}
      actions={
        <>
          <Button
            className="min-h-11 w-full sm:w-auto"
            data-testid="translations-sync-run"
            disabled={sync.isPending}
            onClick={() => {
              setDone(null);
              setErrorKey(null);
              // L5 (DEC-041): `guard` resolves with the ACTION's own result,
              // after step-up too — the result box that used to carry the
              // counts out of the closure is gone (INC-166: it was still empty
              // when the old guard resolved on the modal opening).
              void guard(() =>
                sync.mutateAsync({
                  en: en as unknown as Record<string, string>,
                  am: am as unknown as Record<string, string>,
                }),
              )
                .then((result: SyncResult) => {
                  setDone(
                    t("admin.translations.sync.done")
                      .replace("{inserted}", String(result.inserted))
                      .replace("{languages}", String(result.languages))
                      .replace("{seeded}", String(result.seeded)),
                  );
                })
                .catch((failure: unknown) => setErrorKey(translationErrorKey(failure)));
            }}
          >
            {t("admin.translations.sync.action")}
          </Button>
          {done ? (
            <p
              role="status"
              data-testid="translations-sync-done"
              className="text-sm text-foreground"
            >
              {done}
            </p>
          ) : null}
          {errorKey ? (
            <p
              role="alert"
              data-testid="translations-sync-error"
              className="text-sm text-destructive"
            >
              {t(errorKey)}
            </p>
          ) : null}
        </>
      }
    >
      <p className="text-xs text-muted-foreground">{t("admin.translations.sync.note")}</p>
    </FormSection>
  );
}

/**
 * U4j — GUIDED LANGUAGE CREATION.
 *
 * The code and English name come from the PROVIDER's supported list (so a
 * created language is one the AI can actually fill), the native name is
 * derived with `Intl.DisplayNames` and stays editable, RTL is derived from the
 * script and stays editable, and the countries multi-select rides the same
 * `countries` reference table the rest of the console reads. "Not listed"
 * reveals the original free-text form — the guide is help, never a wall.
 */
function AddLanguageCard({ guard }: { guard: GuardFn }) {
  const { t } = useI18n();
  const upsert = useUpsertLanguage();
  const countries = useCountries();
  const [manual, setManual] = useState(false);
  const [picked, setPicked] = useState<ProviderLanguage | null>(null);
  const [code, setCode] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [nameNative, setNameNative] = useState("");
  const [rtl, setRtl] = useState(false);
  const [countryCodes, setCountryCodes] = useState<string[]>([]);
  const [errorKey, setErrorKey] = useState<MessageKey | null>(null);
  const [saved, setSaved] = useState(false);

  const reset = () => {
    setPicked(null);
    setCode("");
    setNameEn("");
    setNameNative("");
    setRtl(false);
    setCountryCodes([]);
  };

  const select = (language: ProviderLanguage) => {
    const slug = language.code.trim().toLowerCase();
    setPicked(language);
    setCode(slug);
    setNameEn(language.name);
    setNameNative(nativeNameOf(slug, language.name));
    setRtl(RTL_LANGUAGES.has(slug.split("-")[0] ?? slug));
    setSaved(false);
    setErrorKey(null);
  };

  const toggleCountry = (value: string) =>
    setCountryCodes((current) =>
      current.includes(value)
        ? current.filter((entry) => entry !== value)
        : [...current, value].sort(),
    );

  const showForm = manual || picked !== null;

  return (
    <FormSection
      testid="translations-add"
      title={t("admin.translations.add.title")}
      description={t("admin.translations.add.description")}
      columns={2}
      actions={
        showForm ? (
          <>
            <Button
              className="min-h-11 w-full sm:w-auto"
              data-testid="translations-add-submit"
              disabled={upsert.isPending}
              onClick={() => {
                setSaved(false);
                const slug = code.trim().toLowerCase();
                if (
                  !LANGUAGE_CODE_RE.test(slug) ||
                  nameEn.trim() === "" ||
                  nameNative.trim() === ""
                ) {
                  setErrorKey("admin.translations.error.codeInvalid");
                  return;
                }
                setErrorKey(null);
                void guard(() =>
                  upsert.mutateAsync({
                    code: slug,
                    nameEn: nameEn.trim(),
                    nameNative: nameNative.trim(),
                    rtl,
                    countryCodes,
                  }),
                )
                  .then(() => {
                    setSaved(true);
                    setManual(false);
                    reset();
                  })
                  .catch((failure: unknown) => setErrorKey(translationErrorKey(failure)));
              }}
            >
              {t("admin.translations.add.submit")}
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="min-h-11 w-full sm:w-auto"
              data-testid="translations-add-back"
              onClick={() => {
                setManual(false);
                reset();
              }}
            >
              {t("admin.translations.add.fromList")}
            </Button>
            {saved ? (
              <p
                role="status"
                data-testid="translations-add-saved"
                className="text-sm text-muted-foreground"
              >
                {t("admin.translations.add.added")}
              </p>
            ) : null}
            {errorKey ? (
              <p
                role="alert"
                data-testid="translations-add-error"
                className="text-sm text-destructive"
              >
                {t(errorKey)}
              </p>
            ) : null}
          </>
        ) : saved ? (
          <p
            role="status"
            data-testid="translations-add-saved"
            className="text-sm text-muted-foreground"
          >
            {t("admin.translations.add.added")}
          </p>
        ) : null
      }
    >
      {showForm ? null : (
        <FormField label={t("admin.translations.add.pick")} full>
          <LanguagePicker onSelect={select} onManual={() => setManual(true)} />
        </FormField>
      )}

      {showForm ? (
        <>
          {picked ? (
            <p className="text-sm text-muted-foreground" data-testid="translations-add-picked">
              {t("admin.translations.add.pickSelected").replace("{language}", picked.name)}
            </p>
          ) : null}
          <FormField label={t("admin.translations.add.code")} htmlFor="add-language-code">
            <Input
              id="add-language-code"
              data-testid="translations-add-code"
              value={code}
              placeholder={t("admin.translations.add.codePlaceholder")}
              onChange={(event) => setCode(event.target.value)}
            />
          </FormField>
          <FormField label={t("admin.translations.add.nameEn")} htmlFor="add-language-name-en">
            <Input
              id="add-language-name-en"
              data-testid="translations-add-name-en"
              value={nameEn}
              onChange={(event) => setNameEn(event.target.value)}
            />
          </FormField>
          <FormField
            label={t("admin.translations.add.nameNative")}
            htmlFor="add-language-name-native"
          >
            <Input
              id="add-language-name-native"
              data-testid="translations-add-name-native"
              value={nameNative}
              onChange={(event) => setNameNative(event.target.value)}
            />
          </FormField>
          <FormField label={t("admin.translations.add.rtl")} htmlFor="add-language-rtl">
            <Switch
              id="add-language-rtl"
              data-testid="translations-add-rtl"
              checked={rtl}
              aria-label={t("admin.translations.add.rtl")}
              onCheckedChange={setRtl}
            />
          </FormField>
          <FormField
            full
            label={t("admin.translations.add.countries")}
            help={t("admin.translations.add.countriesHint")}
            htmlFor="translations-add-countries"
          >
            {countries.isLoading ? (
              <p className="text-sm text-muted-foreground">
                {t("admin.translations.add.countriesLoading")}
              </p>
            ) : (
              <div
                id="translations-add-countries"
                data-testid="translations-add-countries"
                className="max-h-48 min-w-0 space-y-1 overflow-y-auto"
              >
                {(countries.data ?? []).map((country) => (
                  <label
                    key={country.code}
                    className="flex min-h-11 min-w-0 items-center gap-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      data-testid={`translations-add-country-${country.code}`}
                      checked={countryCodes.includes(country.code)}
                      onChange={() => toggleCountry(country.code)}
                    />
                    <span className="truncate">{country.nameEn}</span>
                    <span className="font-mono text-xs text-muted-foreground">{country.code}</span>
                  </label>
                ))}
              </div>
            )}
          </FormField>
        </>
      ) : null}
    </FormSection>
  );
}

export default AdminTranslationsLanguagesPage;
