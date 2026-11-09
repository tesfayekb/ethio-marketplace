import { useId, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { CARD_SURFACE } from "@/components/layout/surface";
import { LIST_ROW_CURRENT } from "@/components/shell/menu-row";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { levelNameOf } from "@/features/levels/level-fields";
import { fill } from "@/features/posting/refusal-text";
import { useI18n, type MessageKey } from "@/i18n";
import { doorCode } from "@/lib/door-codes";
import { formatDate, formatNumber, moneyText } from "@/lib/format";
import { authKey } from "@/lib/query-keys";
import { readerFailure } from "@/lib/reader-failure";
import { cn } from "@/lib/utils";

import {
  availabilityKey,
  promoteRefusalKey,
  readPromoteOptions,
  setListingLevel,
  setListingReach,
  type PromoteKind,
  type PromoteLevel,
  type PromoteOptions,
  type PromoteReach,
} from "./promote-service";

/**
 * P-2 turn (b) (DEC-349) — THE PROMOTE SHEET, one for the list's row menu and
 * the seller's ad page. It shows what `promote_options` answers and nothing it
 * works out itself: each level's name, days and amount (or the launch line
 * while paid levels are off), the current level named with its end, a lower
 * level not available, a level the ad cannot take with the door's reason.
 * Choosing calls `set_listing_level`; a refusal is named by its code.
 *
 * P-2 (c) c3 (DEC-351, DEC-358) — the Reach section below the levels draws the
 * door's reach rows the same way (the included reach marked, the current one
 * named with its end) and sets a wider reach through `set_listing_reach`.
 */

export type PromoteDoneKey = "myListings.promote.done" | "myListings.promote.reach.done";

type Row = PromoteLevel | PromoteReach;

/** Each kind's words and test ids; the rows draw the same way for both. */
const KIND = {
  level: {
    current: "myListings.promote.current",
    choose: "myListings.promote.choose",
    empty: "myListings.promote.empty",
    done: "myListings.promote.done",
    same: "myListings.promote.error.sameLevel",
    row: "promote-level",
    part: "promote",
  },
  reach: {
    current: "myListings.promote.reach.current",
    choose: "myListings.promote.reach.choose",
    empty: "myListings.promote.reach.empty",
    done: "myListings.promote.reach.done",
    same: "myListings.promote.error.sameReach",
    row: "promote-reach",
    part: "promote-reach",
  },
} as const satisfies Record<
  PromoteKind,
  { current: MessageKey; choose: MessageKey; empty: MessageKey; done: PromoteDoneKey } & Record<
    "same" | "row" | "part",
    string
  >
>;

export function PromoteSheet({
  listingId,
  open,
  onOpenChange,
  onDone,
}: {
  listingId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** A level or a reach was set; `until` is the door's end for it, `doneKey` the words for it. */
  onDone: (until: string, doneKey: PromoteDoneKey) => void;
}) {
  const { t } = useI18n();
  const query = useQuery({
    queryKey: authKey("promote-options", listingId),
    queryFn: () => readPromoteOptions(listingId),
    enabled: open,
    staleTime: 0,
  });
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent phone="sheet" data-testid="promote-sheet">
        <DialogHeader>
          <DialogTitle>{t("myListings.promote.title")}</DialogTitle>
          <DialogDescription>{t("myListings.promote.hint")}</DialogDescription>
        </DialogHeader>
        {query.isPending ? (
          <p role="status" className="text-sm text-muted-foreground">
            {t("common.loading")}
          </p>
        ) : query.isError ? (
          <p role="alert" data-testid="promote-load-error" className="text-sm text-destructive">
            {t(readErrorKey(query.error))}
          </p>
        ) : (
          <PromoteChoices
            listingId={listingId}
            options={query.data}
            onRefused={async () => (await query.refetch()).data}
            onDone={(until, doneKey) => {
              onDone(until, doneKey);
              onOpenChange(false);
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

function PromoteChoices({
  listingId,
  options,
  onRefused,
  onDone,
}: {
  listingId: string;
  options: PromoteOptions;
  /** Reads the door again after a refusal; the fresh answer, when it came. */
  onRefused: () => Promise<PromoteOptions | undefined>;
  onDone: (until: string, doneKey: PromoteDoneKey) => void;
}) {
  const { t, language } = useI18n();
  const reachTitle = useId();
  const [busy, setBusy] = useState(false);
  const [problem, setProblem] = useState<string | null>(null);
  const day = (value: string) => formatDate("day", value, language);
  /** sameLevel / sameReach name the ad's end as the fresh read gives it; without one it is the plain refusal. */
  const refusalText = (kind: PromoteKind, key: MessageKey, fresh: PromoteOptions | undefined) => {
    if (key !== KIND[kind].same) return t(key);
    const until = (kind === "level" ? fresh?.level.until : fresh?.reach.until) ?? null;
    return until === null ? t("door.refused") : fill(t(key), { date: day(until) });
  };
  const choose = async (kind: PromoteKind, row: Row) => {
    setBusy(true);
    setProblem(null);
    const set = kind === "level" ? setListingLevel : setListingReach;
    const outcome = await set(listingId, row.key);
    if (outcome.ok) {
      setBusy(false);
      onDone(outcome.until, KIND[kind].done);
      return;
    }
    const fresh = await onRefused();
    setBusy(false);
    setProblem(refusalText(kind, outcome.key, fresh));
  };
  const section = (kind: PromoteKind, rows: readonly Row[], until: string | null) => (
    <ChoiceSection
      kind={kind}
      rows={rows}
      until={until}
      paidLevels={options.paidLevels}
      busy={busy}
      onChoose={(row) => void choose(kind, row)}
    />
  );
  return (
    <div className="flex min-w-0 flex-col gap-4">
      {section("level", options.levels, options.level.until)}
      <section aria-labelledby={reachTitle} className="flex min-w-0 flex-col gap-2">
        <h3 id={reachTitle} className="font-semibold">
          {t("myListings.promote.reach.title")}
        </h3>
        <p className="text-sm text-muted-foreground">{t("myListings.promote.reach.hint")}</p>
        {section("reach", options.reaches, options.reach.until)}
      </section>
      {problem !== null && (
        <p role="alert" data-testid="promote-problem" className="text-sm text-destructive">
          {problem}
        </p>
      )}
    </div>
  );
}

function ChoiceSection({
  kind,
  rows,
  until,
  paidLevels,
  busy,
  onChoose,
}: {
  kind: PromoteKind;
  rows: readonly Row[];
  /** The current row's end, as the door answers it. */
  until: string | null;
  paidLevels: boolean;
  busy: boolean;
  onChoose: (row: Row) => void;
}) {
  const { t, language } = useI18n();
  const words = KIND[kind];
  const offer = (row: Row) =>
    [
      row.days === null
        ? null
        : fill(t("myListings.promote.days"), { count: formatNumber(row.days, language) }),
      !paidLevels
        ? t("myListings.promote.freeLaunch")
        : row.amount === null || row.currency === null
          ? null
          : moneyText(row.amount, row.currency, language),
    ]
      .filter((part) => part !== null)
      .join(" · ");
  const choosable = rows.some(
    (row) => !row.current && !row.below && row.availability === "available",
  );
  return (
    <div className="flex min-w-0 flex-col gap-3">
      {!choosable && (
        <p data-testid={`${words.part}-empty`} className="text-sm text-muted-foreground">
          {t(words.empty)}
        </p>
      )}
      <ul className="flex min-w-0 flex-col gap-2">
        {rows.map((row) => {
          const name = levelNameOf(row, language);
          return (
            <li
              key={row.key}
              data-testid={`${words.row}-${row.key}`}
              data-current={row.current ? "true" : undefined}
              aria-current={row.current ? "true" : undefined}
              className={cn(
                CARD_SURFACE,
                "flex min-w-0 flex-wrap items-center justify-between gap-x-3 gap-y-1 p-3",
                // P-2 (c) c2a (W1, ruling 8) — the current row takes the shell's one selected look,
                // heard through aria-current above.
                row.current && LIST_ROW_CURRENT,
              )}
            >
              <div className="flex min-w-0 flex-col">
                {name !== null && (
                  <span className="font-semibold" data-testid={`${words.part}-name-${row.key}`}>
                    {name}
                  </span>
                )}
                <span className="text-sm text-muted-foreground">{offer(row)}</span>
                {row.current && until !== null && (
                  <span
                    data-testid={`${words.part}-until`}
                    className="text-sm text-muted-foreground"
                  >
                    {fill(t("myListings.promote.until"), {
                      date: formatDate("day", until, language),
                    })}
                  </span>
                )}
              </div>
              <RowEnd kind={kind} row={row} busy={busy} onChoose={onChoose} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function RowEnd({
  kind,
  row,
  busy,
  onChoose,
}: {
  kind: PromoteKind;
  row: Row;
  busy: boolean;
  onChoose: (row: Row) => void;
}) {
  const { t } = useI18n();
  const words = KIND[kind];
  if (row.current)
    return (
      <span data-testid={`${words.part}-current-${row.key}`} className="text-sm font-semibold">
        {t(words.current)}
      </span>
    );
  const reason =
    row.availability === "includedReach"
      ? "myListings.promote.reach.included"
      : row.below
        ? "myListings.promote.notAvailable"
        : availabilityKey(row.availability, kind);
  if (reason !== null)
    return (
      <span
        data-testid={`${words.part}-reason-${row.key}`}
        className="text-sm text-muted-foreground"
      >
        {t(reason)}
      </span>
    );
  return (
    <Button
      className="min-h-11"
      data-testid={`${words.part}-choose-${row.key}`}
      disabled={busy}
      onClick={() => onChoose(row)}
    >
      {t(words.choose)}
    </Button>
  );
}

/** A read the door refused by a code is named; any other failure is the plain retry line. */
function readErrorKey(error: unknown): MessageKey {
  const failure = readerFailure(error);
  return doorCode(failure).code === null
    ? "myListings.error.failed"
    : promoteRefusalKey(failure, "level");
}
