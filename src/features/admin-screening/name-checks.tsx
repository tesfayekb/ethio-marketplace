import { useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { ColumnsButton } from "@/components/shell/columns-button";
import { useHiddenColumns, visibleColumns } from "@/components/shell/columns-state";
import { DataTable, type DataTableColumn } from "@/components/shell/data-table";
import { RowActions } from "@/components/shell/row-actions";
import { TableToolbar } from "@/components/shell/table-toolbar";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { CutText } from "@/components/ui/cut-text";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { stepUpAbortKey } from "@/features/auth/mfa/mfa-service";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { fill } from "@/features/posting/refusal-text";
import { SectionNotice, useSectionNotice } from "@/components/ui/section-notice";
import { useI18n, type MessageKey } from "@/i18n";
import { dateFormatter, numberFormatter } from "@/lib/format";
import { refreshAfterWrite } from "@/lib/refresh-after-write";

import { JobHealthLine } from "./job-line";

import {
  clearNameCheck,
  useNameQueue,
  type NameQueueCursor,
  type NameQueueRow,
} from "./use-name-checks";
import { ADMIN_SCREENING_KEY } from "./use-screening";

/**
 * N1b-3c (INC-977) — THE SELLER NAMES HELD FOR REVIEW, a section of Admin ›
 * Screening (its host draws the heading, T1 via SECTIONS).
 *
 * Read through admin_name_check_list (listings:view; the name and the model's
 * `of` only with profiles:view), oldest hold first, keyset pages of 50. `of` is
 * drawn as text (G54 b), never HTML or a link; a hold without one says "No
 * reason recorded", never blank. A failed read is the error state, never "none".
 *
 * Allow ("Allow this name", admin_name_check_clear) asks for the second factor
 * through the page's StepUpGate and takes an optional reason; a name that
 * changed after the list loaded answers stale and nothing is written. Rename
 * opens the user's page at its existing editor (admin_update_profile).
 *
 * Testids: `admin-name-checks`; rows `admin-name-check-<profileId>` (cards add
 * `-card`); the actions `admin-name-check-<profileId>-actions-more-{allow,rename}`;
 * the dialog `admin-name-check-allow` (`-reason`, `-go`); the owner link
 * `admin-name-check-owner`; the of line `admin-name-check-of`.
 */
const TABLE_ID = "admin-name-checks";
const LOCKED = ["name"];

export function NameChecks({
  mayList,
  mayClear,
  mayViewJob,
  mayResumeJob,
  guard,
}: {
  /** listings:view — the list door's gate. */
  mayList: boolean;
  /** profiles:update — Allow's and Rename's gate. */
  mayClear: boolean;
  /** services:view — the re-check job's line (INC-995: it sits with the names it checks). */
  mayViewJob: boolean;
  /** services:manage — Resume's gate. */
  mayResumeJob: boolean;
  guard: GuardFn;
}) {
  // INC-995 — this section's outcomes (Allow, Resume) are shown beside its own table (INC-570).
  const { notice, say: onNotice } = useSectionNotice();
  const { t, language } = useI18n();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [hidden, toggleColumn] = useHiddenColumns(TABLE_ID);
  const [history, setHistory] = useState<Array<NameQueueCursor | null>>([null]);
  const after = history[history.length - 1] ?? null;
  const query = useNameQueue(after, mayList);
  const [allowing, setAllowing] = useState<NameQueueRow | null>(null);
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState(false);

  if (!mayList && !mayViewJob) return null;

  const when = dateFormatter("dayTimeNumeric", language);
  const number = numberFormatter("count", language);
  const label = (row: NameQueueRow) => row.name ?? t("admin.screening.names.nameHidden");

  const allow = async () => {
    if (allowing === null) return;
    setBusy(true);
    let answer: "done" | "stale";
    // J-1: a name the AI could not check was never hidden, so its Clear says so.
    const visible = allowing.state === "needs_review";
    try {
      answer = await guard(() => clearNameCheck(allowing, reason));
    } catch (error) {
      setBusy(false);
      setAllowing(null);
      const abort = stepUpAbortKey(error);
      // A cancelled second factor changes nothing and says nothing.
      if (abort === null) return;
      console.error("[screening] allow name failed", error);
      onNotice(abort ?? "common.error", "error");
      return;
    }
    setBusy(false);
    setAllowing(null);
    setReason("");
    setHistory([null]);
    await refreshAfterWrite(queryClient, { queryKey: ADMIN_SCREENING_KEY });
    onNotice(
      answer === "done"
        ? visible
          ? "admin.screening.names.clear.doneVisible"
          : "admin.screening.names.clear.done"
        : "admin.screening.names.clear.stale",
      answer === "done" ? "ok" : "error",
    );
  };

  const columns: DataTableColumn<NameQueueRow>[] = [
    {
      key: "name",
      header: t("admin.screening.names.col.name"),
      priority: "primary",
      card: "title",
      cell: (row) => (
        <span className="block min-w-0">
          <span className="block font-medium" data-testid="admin-name-check-name">
            <CutText text={label(row)} />
          </span>
          {row.state === "needs_review" ? (
            <span
              className="mt-0.5 block break-words text-xs text-muted-foreground"
              data-testid="admin-name-check-unusable"
            >
              {t("admin.screening.names.unusable")}
            </span>
          ) : row.nameHidden ? null : (
            <span
              className="mt-0.5 block break-words text-xs text-muted-foreground"
              data-testid="admin-name-check-of"
            >
              {row.of === null
                ? t("admin.screening.names.noReason")
                : fill(t("admin.screening.names.of"), { of: row.of })}
            </span>
          )}
        </span>
      ),
    },
    {
      key: "since",
      header: t("admin.screening.names.col.since"),
      priority: "primary",
      card: "sub",
      cell: (row) => when.format(new Date(row.since)),
    },
    {
      key: "attempts",
      header: t("admin.screening.names.col.attempts"),
      priority: "secondary",
      card: "meta",
      cell: (row) => number.format(row.attempts),
    },
    {
      key: "owner",
      header: t("admin.screening.names.col.owner"),
      priority: "secondary",
      card: "meta",
      cell: (row) => (
        <Link
          to="/admin/users/$userId"
          params={{ userId: row.profileId }}
          className="block min-w-0 underline-offset-4 hover:underline"
          data-testid="admin-name-check-owner"
        >
          <CutText text={row.profileId} />
        </Link>
      ),
    },
  ];

  return (
    <section data-testid="admin-name-checks" className="min-w-0 space-y-3">
      <h2 className="text-sm font-semibold text-foreground">{t("admin.screening.names.title")}</h2>
      <JobHealthLine
        mayView={mayViewJob}
        mayResume={mayResumeJob}
        guard={guard}
        onNotice={onNotice}
      />
      <SectionNotice notice={notice} testid="admin-name-checks-notice" />
      {mayList ? (
        <DataTable
          columns={visibleColumns(columns, hidden, LOCKED)}
          rows={query.data?.rows ?? []}
          rowKey={(row) => `${row.profileId}:${row.subject}`}
          rowTestId={(row) => `admin-name-check-${row.profileId}`}
          caption={t("admin.screening.names.title")}
          cardUntil="lg"
          loading={query.isLoading}
          loadingState={<p>{t("common.loading")}</p>}
          error={query.error}
          errorState={
            <div className="flex flex-wrap items-center gap-2">
              <p role="alert" className="text-destructive" data-testid="admin-name-checks-error">
                {t("admin.screening.names.error")}
              </p>
              <Button variant="outline" size="touch" onClick={() => void query.refetch()}>
                {t("common.retry")}
              </Button>
            </div>
          }
          emptyState={
            <p className="text-muted-foreground" data-testid="admin-name-checks-empty">
              {t("admin.screening.names.empty")}
            </p>
          }
          toolbar={
            <TableToolbar
              testid="admin-name-checks-toolbar"
              columns={
                <ColumnsButton
                  testid="admin-name-checks-columns"
                  columns={columns.map((column) => ({
                    key: column.key,
                    label: String(column.header),
                    locked: LOCKED.includes(column.key),
                  }))}
                  hidden={hidden}
                  onToggle={toggleColumn}
                />
              }
            />
          }
          rowActions={(row) => (
            <RowActions
              testid={`admin-name-check-${row.profileId}-actions`}
              name={label(row)}
              more={[
                {
                  key: "allow",
                  label: t("admin.screening.names.action.clear"),
                  disabled: !mayClear || row.checkedText === null || busy,
                  onSelect: () => {
                    setReason("");
                    setAllowing(row);
                  },
                },
                {
                  key: "rename",
                  label: t("admin.screening.names.action.rename"),
                  disabled: !mayClear,
                  onSelect: () =>
                    void navigate({
                      to: "/admin/users/$userId",
                      params: { userId: row.profileId },
                      hash: "edit-seller-alias",
                    }),
                },
              ]}
            />
          )}
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
      ) : null}

      <AlertDialog
        open={allowing !== null}
        onOpenChange={(open) => {
          if (!open && !busy) setAllowing(null);
        }}
      >
        <AlertDialogContent data-testid="admin-name-check-allow">
          <AlertDialogTitle>{t("admin.screening.names.clear.title")}</AlertDialogTitle>
          <AlertDialogDescription>{t("admin.screening.names.clear.body")}</AlertDialogDescription>
          <div className="space-y-1">
            <Label htmlFor="admin-name-check-reason">
              {t("admin.screening.names.clear.reason")}
            </Label>
            <Textarea
              id="admin-name-check-reason"
              data-testid="admin-name-check-allow-reason"
              maxLength={500}
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              aria-describedby="admin-name-check-reason-help"
            />
            <p id="admin-name-check-reason-help" className="text-xs text-muted-foreground">
              {t("admin.screening.names.clear.reasonHelp")}
            </p>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={busy}>{t("common.cancel")}</AlertDialogCancel>
            <Button
              type="button"
              className="min-h-11"
              data-testid="admin-name-check-allow-go"
              disabled={busy}
              onClick={() => void allow()}
            >
              {t("admin.screening.names.action.clear")}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}

export default NameChecks;
