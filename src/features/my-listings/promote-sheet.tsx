import { useState } from "react";
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
import { fill } from "@/features/posting/refusal-text";
import { useI18n, type MessageKey } from "@/i18n";
import { catalogText } from "@/i18n/entity";
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
  type PromoteLevel,
  type PromoteOptions,
} from "./promote-service";

/**
 * P-2 turn (b) (DEC-349) — THE PROMOTE SHEET, one for the list's row menu and
 * the seller's ad page. It shows what `promote_options` answers and nothing it
 * works out itself: each level's name, days and amount (or the launch line
 * while paid levels are off), the current level named with its end, a lower
 * level not available, a level the ad cannot take with the door's reason.
 * Choosing calls `set_listing_level`; a refusal is named by its code.
 */
export function PromoteSheet({
  listingId,
  open,
  onOpenChange,
  onDone,
}: {
  listingId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** The level was set; `until` is the door's end for it. */
  onDone: (until: string) => void;
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
          <LevelList
            listingId={listingId}
            options={query.data}
            onRefused={async () => (await query.refetch()).data}
            onDone={(until) => {
              onDone(until);
              onOpenChange(false);
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

function LevelList({
  listingId,
  options,
  onRefused,
  onDone,
}: {
  listingId: string;
  options: PromoteOptions;
  /** Reads the door again after a refusal; the fresh answer, when it came. */
  onRefused: () => Promise<PromoteOptions | undefined>;
  onDone: (until: string) => void;
}) {
  const { t, language } = useI18n();
  const [busy, setBusy] = useState(false);
  const [problem, setProblem] = useState<string | null>(null);
  const day = (value: string) => formatDate("day", value, language);
  /** sameLevel names the ad's end as the fresh read gives it; without one it is the plain refusal. */
  const refusalText = (key: MessageKey, fresh: PromoteOptions | undefined) => {
    if (key !== "myListings.promote.error.sameLevel") return t(key);
    const until = fresh?.level.until ?? null;
    return until === null ? t("door.refused") : fill(t(key), { date: day(until) });
  };
  const choose = async (level: PromoteLevel) => {
    setBusy(true);
    setProblem(null);
    const outcome = await setListingLevel(listingId, level.key);
    if (outcome.ok) {
      setBusy(false);
      onDone(outcome.until);
      return;
    }
    const fresh = await onRefused();
    setBusy(false);
    setProblem(refusalText(outcome.key, fresh));
  };
  const offer = (level: PromoteLevel) =>
    [
      level.days === null
        ? null
        : fill(t("myListings.promote.days"), { count: formatNumber(level.days, language) }),
      !options.paidLevels
        ? t("myListings.promote.freeLaunch")
        : level.amount === null || level.currency === null
          ? null
          : moneyText(level.amount, level.currency, language),
    ]
      .filter((part) => part !== null)
      .join(" · ");
  const choosable = options.levels.some(
    (level) => !level.current && !level.below && level.availability === "available",
  );
  return (
    <div className="flex min-w-0 flex-col gap-3">
      {!choosable && (
        <p data-testid="promote-empty" className="text-sm text-muted-foreground">
          {t("myListings.promote.empty")}
        </p>
      )}
      <ul className="flex min-w-0 flex-col gap-2">
        {options.levels.map((level) => (
          <li
            key={level.key}
            data-testid={`promote-level-${level.key}`}
            data-current={level.current ? "true" : undefined}
            aria-current={level.current ? "true" : undefined}
            className={cn(
              CARD_SURFACE,
              "flex min-w-0 flex-wrap items-center justify-between gap-x-3 gap-y-1 p-3",
              // P-2 (c) c2a (W1, ruling 8) — the current level row takes the shell's one selected look,
              // heard through aria-current above.
              level.current && LIST_ROW_CURRENT,
            )}
          >
            <div className="flex min-w-0 flex-col">
              <span className="font-semibold">
                {catalogText(level.nameEn, level.nameAm, language)}
              </span>
              <span className="text-sm text-muted-foreground">{offer(level)}</span>
              {level.current && options.level.until !== null && (
                <span data-testid="promote-until" className="text-sm text-muted-foreground">
                  {fill(t("myListings.promote.until"), { date: day(options.level.until) })}
                </span>
              )}
            </div>
            <LevelEnd level={level} busy={busy} onChoose={(chosen) => void choose(chosen)} />
          </li>
        ))}
      </ul>
      {problem !== null && (
        <p role="alert" data-testid="promote-problem" className="text-sm text-destructive">
          {problem}
        </p>
      )}
    </div>
  );
}

function LevelEnd({
  level,
  busy,
  onChoose,
}: {
  level: PromoteLevel;
  busy: boolean;
  onChoose: (level: PromoteLevel) => void;
}) {
  const { t } = useI18n();
  if (level.current)
    return (
      <span data-testid={`promote-current-${level.key}`} className="text-sm font-semibold">
        {t("myListings.promote.current")}
      </span>
    );
  const reason = level.below
    ? "myListings.promote.notAvailable"
    : availabilityKey(level.availability);
  if (reason !== null)
    return (
      <span data-testid={`promote-reason-${level.key}`} className="text-sm text-muted-foreground">
        {t(reason)}
      </span>
    );
  return (
    <Button
      className="min-h-11"
      data-testid={`promote-choose-${level.key}`}
      disabled={busy}
      onClick={() => onChoose(level)}
    >
      {t("myListings.promote.choose")}
    </Button>
  );
}

/** A read the door refused by a code is named; any other failure is the plain retry line. */
function readErrorKey(error: unknown): MessageKey {
  const failure = readerFailure(error);
  return doorCode(failure).code === null ? "myListings.error.failed" : promoteRefusalKey(failure);
}
