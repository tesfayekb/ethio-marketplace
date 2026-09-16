import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { CategoryModal } from "@/features/admin-categories/category-dialogs";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { useI18n } from "@/i18n";

import { CountryDialogActions, CountryErrorLine, useCountryError } from "./country-dialogs";
import type { CountryRow } from "./countries-service";
import { useRootCategories, useSetCountryActive, useSetCountryRootOrder } from "./use-countries";

/**
 * L2b-C1 — THE COUNTRY VERBS: opening and closing a market, and the rail order.
 *
 * Both doors re-check permission AND step-up server-side (F3); a refusal is a
 * translated sentence naming the door's own id and nothing closes on it (F4).
 * A close refused with `scopedRolesExist` is not a dead end: the count is named
 * and a SECOND, explicit confirm hides the market while keeping every grant.
 */

export function CountryActiveDialog({
  row,
  guard,
  onClose,
}: {
  row: CountryRow;
  guard: GuardFn;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const setActive = useSetCountryActive();
  const { refusal, clear, fail } = useCountryError();
  const [forced, setForced] = useState(false);
  const opening = !row.isActive;

  const run = (forceHide: boolean) => {
    clear();
    void guard(async () => {
      try {
        await setActive.mutateAsync({ code: row.code, active: opening, forceHide });
        onClose();
      } catch (error) {
        // The one refusal an operator can answer: the door names the grants.
        if (error instanceof Error && error.message.startsWith("scopedRolesExist")) {
          setForced(true);
        }
        fail(error);
      }
    }).catch(fail);
  };

  return (
    <CategoryModal
      testid="country-active-dialog"
      openedBy={opening ? "verb-open" : "verb-close"}
      title={t(opening ? "admin.countries.open.title" : "admin.countries.close.title")}
      onClose={onClose}
    >
      <p className="text-sm text-muted-foreground">
        {t(opening ? "admin.countries.open.hint" : "admin.countries.close.hint")}
      </p>
      <CountryErrorLine refusal={refusal} testid="country-verb-error" />
      {forced ? (
        <>
          <p
            role="status"
            data-testid="country-close-scoped"
            className="text-sm text-muted-foreground"
          >
            {t("admin.countries.close.scopedHint").replace("{count}", String(row.scopedRoleCount))}
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="destructive"
              size="touch"
              data-testid="country-close-force"
              disabled={setActive.isPending}
              onClick={() => run(true)}
            >
              {t("admin.countries.close.forceConfirm")}
            </Button>
          </div>
        </>
      ) : (
        <CountryDialogActions
          onCancel={onClose}
          onSubmit={() => run(false)}
          busy={setActive.isPending}
          submitTestId="country-active-confirm"
          submitLabel={t(
            opening ? "admin.countries.open.confirm" : "admin.countries.close.confirm",
          )}
        />
      )}
    </CategoryModal>
  );
}

/**
 * THE RAIL ORDER. The universe is every ACTIVE ROOT category; the starting
 * order is the market's own when it has one, and the global order otherwise —
 * which the dialog says in words rather than implying. Saving an EMPTY list is
 * the reset: the door then removes every row for this market.
 */
export function CountryRailOrderDialog({
  row,
  guard,
  onClose,
}: {
  row: CountryRow;
  guard: GuardFn;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const roots = useRootCategories();
  const save = useSetCountryRootOrder();
  const { refusal, clear, fail } = useCountryError();
  const [order, setOrder] = useState<string[] | null>(null);

  /** The market's stored order first, then any root it does not name yet. */
  const initial = useMemo(() => {
    const rows = roots.data ?? [];
    const bySlug = new Map(rows.map((entry) => [entry.slug, entry.id]));
    const named = row.rootOrder
      .map((slug) => bySlug.get(slug))
      .filter((id): id is string => id !== undefined);
    const rest = rows.map((entry) => entry.id).filter((id) => !named.includes(id));
    return [...named, ...rest];
  }, [roots.data, row.rootOrder]);

  const ids = order ?? initial;
  const nameOf = (id: string) => (roots.data ?? []).find((entry) => entry.id === id)?.nameEn ?? id;

  const move = (index: number, delta: number) => {
    const next = [...ids];
    const target = index + delta;
    if (target < 0 || target >= next.length) return;
    const moved = next[index] as string;
    next[index] = next[target] as string;
    next[target] = moved;
    setOrder(next);
  };

  const submit = (categoryIds: string[]) => {
    clear();
    void guard(async () => {
      try {
        await save.mutateAsync({ code: row.code, categoryIds });
        onClose();
      } catch (error) {
        fail(error);
      }
    }).catch(fail);
  };

  return (
    <CategoryModal
      testid="country-rail-dialog"
      openedBy="verb-rail-order"
      title={t("admin.countries.rail.title")}
      onClose={onClose}
    >
      <p className="text-sm text-muted-foreground">{t("admin.countries.rail.hintDialog")}</p>
      {row.rootOrder.length === 0 ? (
        <p className="text-sm text-muted-foreground" data-testid="country-rail-global">
          {t("admin.countries.rail.globalNote")}
        </p>
      ) : null}

      {roots.isLoading ? <p className="text-sm">{t("admin.countries.loading")}</p> : null}
      {!roots.isLoading && ids.length === 0 ? (
        <p className="text-sm text-muted-foreground" data-testid="country-rail-empty">
          {t("admin.countries.rail.empty")}
        </p>
      ) : null}

      <ol className="min-w-0 space-y-2" data-testid="country-rail-list">
        {ids.map((id, index) => (
          <li key={id} className="flex min-w-0 flex-wrap items-center gap-2">
            <span className="min-w-0 flex-1 break-words text-sm" data-testid={`country-rail-${id}`}>
              {`${index + 1}. ${nameOf(id)}`}
            </span>
            <Button
              type="button"
              variant="outline"
              className="size-11 p-0"
              data-testid={`country-rail-up-${id}`}
              aria-label={t("admin.countries.rail.up")}
              title={t("admin.countries.rail.up")}
              disabled={index === 0}
              onClick={() => move(index, -1)}
            >
              ↑
            </Button>
            <Button
              type="button"
              variant="outline"
              className="size-11 p-0"
              data-testid={`country-rail-down-${id}`}
              aria-label={t("admin.countries.rail.down")}
              title={t("admin.countries.rail.down")}
              disabled={index === ids.length - 1}
              onClick={() => move(index, 1)}
            >
              ↓
            </Button>
          </li>
        ))}
      </ol>

      <CountryErrorLine refusal={refusal} testid="country-verb-error" />
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          size="touch"
          data-testid="country-rail-reset"
          disabled={save.isPending}
          onClick={() => submit([])}
        >
          {t("admin.countries.rail.reset")}
        </Button>
        <Button
          type="button"
          size="touch"
          data-testid="country-rail-save"
          disabled={save.isPending || ids.length === 0}
          onClick={() => submit(ids)}
        >
          {t("admin.countries.rail.submit")}
        </Button>
      </div>
    </CategoryModal>
  );
}
