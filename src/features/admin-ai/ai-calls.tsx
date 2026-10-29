import { useState } from "react";
import { DataTable, type DataTableColumn } from "@/components/shell/data-table";
import { ColumnsButton } from "@/components/shell/columns-button";
import { useHiddenColumns, visibleColumns } from "@/components/shell/columns-state";
import { TableToolbar } from "@/components/shell/table-toolbar";
import { CutText } from "@/components/ui/cut-text";
import { Button } from "@/components/ui/button";
import { FilterChips, FiltersButton } from "@/components/shell/filter-chips";
import { FilterChoices } from "@/components/shell/filter-choices";
import { useI18n } from "@/i18n";
import { formatLocale } from "@/lib/format-locale";
import {
  AI_OUTCOMES,
  AI_FEATURE_ORDER,
  featureLabelKey,
  type AiCallRow,
  type AiCallsCursor,
} from "./ai-service";
import { useAiCalls } from "./use-ai-calls";

export function AiCalls() {
  const { t, language } = useI18n();
  const [feature, setFeature] = useState("");
  const [outcome, setOutcome] = useState("");
  const [hidden, toggleColumn] = useHiddenColumns("admin-ai-calls");
  const [history, setHistory] = useState<Array<AiCallsCursor | null>>([null]);
  const before = history[history.length - 1] ?? null;
  const query = useAiCalls(feature, outcome, before);
  const name = (id: string) => {
    const key = featureLabelKey(id);
    return key ? t(key) : id;
  };
  // INC-987 — the two choices narrow the rows, so they live in Filters (T2b),
  // shown as chips under the toolbar; any change goes back to the first page.
  const choose = (set: (value: string) => void) => (value: string) => {
    set(value);
    setHistory([null]);
  };
  const chips = [
    ...(feature === ""
      ? []
      : [{ key: "feature", label: name(feature), onRemove: () => choose(setFeature)("") }]),
    ...(outcome === ""
      ? []
      : [
          {
            key: "outcome",
            label: t(`admin.ai.log.outcome.${outcome}`),
            onRemove: () => choose(setOutcome)(""),
          },
        ]),
  ];
  const clearAll = () => {
    setFeature("");
    setOutcome("");
    setHistory([null]);
  };
  const locale = formatLocale(language);
  const date = new Intl.DateTimeFormat(locale, { dateStyle: "short", timeStyle: "medium" });
  const number = new Intl.NumberFormat(locale);
  const columns: DataTableColumn<AiCallRow>[] = [
    {
      key: "time",
      header: t("admin.audit.col.time"),
      priority: "primary",
      card: "sub",
      cell: (row) => date.format(new Date(row.created_at)),
    },
    {
      key: "feature",
      header: t("admin.ai.col.feature"),
      priority: "primary",
      card: "title",
      cell: (row) => <CutText text={name(row.feature)} />,
    },
    {
      key: "model",
      header: t("admin.ai.log.col.model"),
      priority: "secondary",
      card: "meta",
      cell: (row) => <CutText text={row.model} />,
    },
    {
      key: "outcome",
      header: t("admin.ai.log.col.outcome"),
      priority: "primary",
      card: "badge",
      cell: (row) => t(`admin.ai.log.outcome.${row.outcome}`),
    },
    {
      key: "latency",
      header: t("admin.ai.log.col.latency"),
      priority: "secondary",
      card: "meta",
      cell: (row) => t("admin.ai.log.latencyMs").replace("{ms}", number.format(row.latency_ms)),
    },
    {
      key: "person",
      header: t("admin.ai.log.col.person"),
      priority: "secondary",
      card: "meta",
      cell: (row) =>
        row.actor.kind === "person" ? (
          <CutText text={row.actor.name} />
        ) : (
          t(row.actor.kind === "system" ? "admin.audit.system" : "admin.ai.log.personHidden")
        ),
    },
  ];
  return (
    <section data-testid="ai-calls" className="min-w-0 space-y-3">
      <div className="space-y-1">
        <h2 className="text-sm font-semibold">{t("admin.ai.log.title")}</h2>
        <p className="text-xs text-muted-foreground">{t("admin.ai.log.hint")}</p>
      </div>
      <DataTable
        columns={visibleColumns(columns, hidden, ["time", "feature", "outcome"])}
        rows={query.data?.rows ?? []}
        rowKey={(row) => row.id}
        rowTestId={(row) => `ai-call-${row.id}`}
        caption={t("admin.ai.log.title")}
        cardUntil="lg"
        loading={query.isLoading}
        loadingState={<p>{t("admin.ai.log.loading")}</p>}
        error={query.error}
        errorState={
          <div className="flex flex-wrap items-center gap-2">
            <p role="alert" className="text-destructive">
              {t("admin.ai.log.error")}
            </p>
            <Button variant="outline" size="touch" onClick={() => void query.refetch()}>
              {t("common.retry")}
            </Button>
          </div>
        }
        emptyState={
          <p className="text-muted-foreground">
            {t("admin.ai.days.empty").replace("{days}", "90")}
          </p>
        }
        toolbar={
          <TableToolbar
            testid="ai-calls-toolbar"
            filters={
              <FiltersButton
                testid="ai-calls-filters"
                count={chips.length}
                state={`${feature}|${outcome}`}
                onClearAll={clearAll}
              >
                <FilterChoices
                  testid="ai-calls-feature"
                  label={t("admin.ai.col.feature")}
                  value={feature}
                  onChange={choose(setFeature)}
                  options={[
                    { value: "", label: t("admin.ai.days.all") },
                    ...AI_FEATURE_ORDER.map((id) => ({ value: id, label: name(id) })),
                  ]}
                />
                <FilterChoices
                  testid="ai-calls-outcome"
                  label={t("admin.ai.log.col.outcome")}
                  value={outcome}
                  onChange={choose(setOutcome)}
                  options={[
                    { value: "", label: t("admin.ai.log.allOutcomes") },
                    ...AI_OUTCOMES.map((id) => ({
                      value: id,
                      label: t(`admin.ai.log.outcome.${id}`),
                    })),
                  ]}
                />
              </FiltersButton>
            }
            chips={<FilterChips testid="ai-calls-chips" chips={chips} onClearAll={clearAll} />}
            columns={
              <ColumnsButton
                testid="ai-calls-columns"
                columns={columns.map((column) => ({
                  key: column.key,
                  label: String(column.header),
                  locked: ["time", "feature", "outcome"].includes(column.key),
                }))}
                hidden={hidden}
                onToggle={toggleColumn}
              />
            }
          />
        }
        keyset={{
          hasPrevious: history.length > 1,
          hasNext: query.data?.next !== null && query.data?.next !== undefined,
          busy: query.isFetching,
          onPrevious: () => setHistory((current) => current.slice(0, -1)),
          onNext: () => {
            const next = query.data?.next;
            if (next) setHistory((current) => [...current, next]);
          },
        }}
      />
    </section>
  );
}
