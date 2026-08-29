import { Link } from "@tanstack/react-router";
import { useState } from "react";

import { DataTable, type DataTableColumn } from "@/components/shell/data-table";
import { FormField, FormSection } from "@/components/shell/form-section";
import { StatCard, StatGrid } from "@/components/shell/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useAdminShell } from "@/features/admin/admin-context";
import { StepUpGate } from "@/features/auth/mfa/step-up-gate";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { useI18n } from "@/i18n";
import { am } from "@/i18n/locales/am";
import { en } from "@/i18n/locales/en";
import type { MessageKey } from "@/i18n/types";

import {
  serverMessage,
  translationErrorKey,
  type LanguageRow,
  type SyncResult,
  type TranslationStats,
} from "./translations-service";
import {
  useLanguages,
  useSetLanguageFlags,
  useSyncUiKeys,
  useTranslationStats,
  useUpsertLanguage,
} from "./use-translations";

const LANGUAGE_CODE_RE = /^[a-z]{2,8}$/;

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

  const statsByLang = new Map<string, TranslationStats>(
    (stats.data ?? []).map((row) => [row.langCode, row]),
  );
  const rows = languages.data ?? [];
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
          <h1 className="min-w-0 truncate text-lg font-semibold text-foreground">
            {t("admin.translations.title")}
          </h1>
          <p className="text-sm text-muted-foreground">{t("admin.translations.subtitle")}</p>

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
            loading={languages.isLoading}
            error={languages.error}
            mayManage={mayManage}
            guard={guard}
          />

          {mayManage ? (
            <>
              <SyncKeysCard guard={guard} />
              <AddLanguageCard guard={guard} />
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
  loading,
  error,
  mayManage,
  guard,
}: {
  rows: LanguageRow[];
  statsByLang: Map<string, TranslationStats>;
  loading: boolean;
  error: unknown;
  mayManage: boolean;
  guard: GuardFn;
}) {
  const { t } = useI18n();
  const flags = useSetLanguageFlags();
  const [errorKey, setErrorKey] = useState<MessageKey | null>(null);
  const [errorDetail, setErrorDetail] = useState<string | null>(null);

  // Source-catalog size drives the publication gate's empty-set branch.
  const baseCode = rows.find((row) => row.isBase)?.code ?? "en";
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
      setErrorKey(translationErrorKey(failure));
      setErrorDetail(serverMessage(failure));
    });
  };

  const columns: DataTableColumn<LanguageRow>[] = [
    {
      key: "language",
      header: t("admin.translations.col.language"),
      priority: "primary",
      width: "w-[26%]",
      cell: (row) => (
        <span className="flex min-w-0 flex-wrap items-center gap-2">
          <span className="truncate font-medium text-foreground">{row.nameNative}</span>
          <span className="font-mono text-xs text-muted-foreground">{row.code}</span>
          {row.isBase ? (
            <Badge variant="outline" data-testid={`lang-base-${row.code}`}>
              {t("admin.translations.badge.base")}
            </Badge>
          ) : null}
          {row.rtl ? (
            <Badge variant="outline" data-testid={`lang-rtl-${row.code}`}>
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
      width: "w-[16%]",
      cell: (row) => <span className="block truncate text-muted-foreground">{row.nameEn}</span>,
    },
    {
      key: "coverage",
      header: t("admin.translations.col.coverage"),
      priority: "primary",
      width: "w-[24%]",
      cell: (row) => {
        const { total, approved } = coverageOf(statsByLang.get(row.code));
        const pct = total === 0 ? 0 : Math.round((approved / total) * 100);
        return (
          <span className="block min-w-0" data-testid={`lang-coverage-${row.code}`}>
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
      key: "admin",
      header: t("admin.translations.col.admin"),
      priority: "secondary",
      width: "w-[14%]",
      cell: (row) => (
        <Switch
          data-testid={`lang-admin-${row.code}`}
          aria-label={t("admin.translations.switch.admin")}
          checked={row.enabledAdmin}
          disabled={!mayManage || row.isBase || flags.isPending}
          onCheckedChange={(checked) => apply(row, { admin: checked })}
        />
      ),
    },
    {
      key: "public",
      header: t("admin.translations.col.public"),
      priority: "secondary",
      width: "w-[14%]",
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
          <span className="block min-w-0" title={blocked ? hint : undefined}>
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
                className="mt-1 block text-xs text-muted-foreground"
              >
                {hint}
              </span>
            ) : null}
          </span>
        );
      },
    },
  ];

  return (
    <>
      <DataTable
        columns={columns}
        rows={rows}
        rowKey={(row) => row.code}
        rowTestId={(row) => `lang-row-${row.code}`}
        caption={t("admin.translations.caption")}
        loading={loading}
        loadingState={
          <p className="text-sm text-muted-foreground">{t("admin.translations.loading")}</p>
        }
        error={error}
        errorState={<p className="text-sm text-destructive">{t("admin.translations.error")}</p>}
        emptyState={
          <p className="text-sm text-muted-foreground">{t("admin.translations.empty")}</p>
        }
        rowActions={(row) =>
          row.isBase ? (
            <span
              data-testid={`lang-source-${row.code}`}
              className="block max-w-52 text-xs text-muted-foreground"
            >
              {t("admin.translations.badge.source")}
            </span>
          ) : (
            <Link
              to="/admin/translations/$lang"
              params={{ lang: row.code }}
              data-testid={`lang-open-${row.code}`}
              className="inline-flex min-h-11 items-center rounded-md border border-input px-3 text-sm text-foreground"
            >
              {t("admin.translations.open")}
            </Link>
          )
        }
      />
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
              // `guard` resolves void, so the RPC's counts are carried out
              // through this box rather than the promise value.
              const box: { result: SyncResult | null } = { result: null };
              void guard(async () => {
                box.result = await sync.mutateAsync({
                  en: en as unknown as Record<string, string>,
                  am: am as unknown as Record<string, string>,
                });
              })
                .then(() => {
                  const result = box.result;
                  if (!result) return;
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

function AddLanguageCard({ guard }: { guard: GuardFn }) {
  const { t } = useI18n();
  const upsert = useUpsertLanguage();
  const [code, setCode] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [nameNative, setNameNative] = useState("");
  const [rtl, setRtl] = useState(false);
  const [errorKey, setErrorKey] = useState<MessageKey | null>(null);
  const [saved, setSaved] = useState(false);

  return (
    <FormSection
      testid="translations-add"
      title={t("admin.translations.add.title")}
      description={t("admin.translations.add.description")}
      columns={2}
      actions={
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
                }),
              )
                .then(() => {
                  setSaved(true);
                  setCode("");
                  setNameEn("");
                  setNameNative("");
                  setRtl(false);
                })
                .catch((failure: unknown) => setErrorKey(translationErrorKey(failure)));
            }}
          >
            {t("admin.translations.add.submit")}
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
      }
    >
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
      <FormField label={t("admin.translations.add.nameNative")} htmlFor="add-language-name-native">
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
    </FormSection>
  );
}

export default AdminTranslationsLanguagesPage;
