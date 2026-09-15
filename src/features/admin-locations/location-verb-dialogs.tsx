import { useMemo, useState } from "react";

import { FormField } from "@/components/shell/form-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CategoryModal } from "@/features/admin-categories/category-dialogs";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { useI18n } from "@/i18n";

import { LocationDialogActions, LocationErrorLine, useLocationError } from "./location-dialogs";
import { levelRank, type LocationNode } from "./locations-service";
import {
  useDeleteLocation,
  useMoveLocation,
  useReorderLocations,
  useSetLocationActive,
} from "./use-locations";

/**
 * LOCATIONS ERA L2a — THE STATE VERBS: activate/retire, move, reorder, delete.
 *
 * Each one is its OWN door (L1a), which is why none of them is a field on the
 * edit form: the upsert door refuses `useMoveDoor` when a parent arrives
 * through it. Move and delete additionally demand a proven factor, so both run
 * inside `guard(...)` and render the server's refusal by name when the factor
 * is not proven (F4/F5 — a refused attempt leaves no trace).
 */

/* -------------------------- 4.3 activate / retire ------------------------- */

export function LocationActiveDialog({
  row,
  guard,
  onClose,
}: {
  row: LocationNode;
  guard: GuardFn;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const setActive = useSetLocationActive();
  const { refusal, clear, fail } = useLocationError();
  const activating = !row.isActive;

  const submit = () => {
    clear();
    void guard(async () => {
      try {
        await setActive.mutateAsync({ id: row.id, active: activating });
        onClose();
      } catch (error) {
        fail(error);
      }
    }).catch(fail);
  };

  return (
    <CategoryModal
      testid="location-active-dialog"
      openedBy={activating ? "row-activate" : "row-retire"}
      title={t(
        activating ? "admin.locations.active.titleActivate" : "admin.locations.active.titleRetire",
      )}
      onClose={onClose}
    >
      <p className="text-sm" data-testid="location-active-path">
        {row.path}
      </p>
      <p className="text-sm text-muted-foreground">
        {t(
          activating ? "admin.locations.active.hintActivate" : "admin.locations.active.hintRetire",
        )}
      </p>
      <LocationErrorLine refusal={refusal} />
      <LocationDialogActions
        onCancel={onClose}
        onSubmit={submit}
        busy={setActive.isPending}
        submitTestId="location-active-submit"
        submitLabel={t(
          activating
            ? "admin.locations.active.confirmActivate"
            : "admin.locations.active.confirmRetire",
        )}
      />
    </CategoryModal>
  );
}

/* --------------------------------- 4.4 move ------------------------------- */

/**
 * The picker offers ONLY rows of the same market one level above this one — the
 * door refuses everything else by name (`levelMismatch`, `crossCountry`,
 * `cannotMoveCountry`). The ancestry trigger moves the descendants and refills
 * their `region_id`/`city_id`, so a successful move only needs a refetch.
 */
export function LocationMoveDialog({
  row,
  roster,
  guard,
  onClose,
}: {
  row: LocationNode;
  roster: LocationNode[];
  guard: GuardFn;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const move = useMoveLocation();
  const { refusal, clear, fail } = useLocationError();
  const targets = useMemo(
    () =>
      roster.filter(
        (peer) =>
          peer.id !== row.id &&
          peer.countryCode === row.countryCode &&
          levelRank(peer.level) === levelRank(row.level) - 1,
      ),
    [roster, row.countryCode, row.id, row.level],
  );
  const [parentId, setParentId] = useState("");

  const submit = () => {
    clear();
    if (parentId === "") return;
    void guard(async () => {
      try {
        await move.mutateAsync({ id: row.id, newParentId: parentId });
        onClose();
      } catch (error) {
        fail(error);
      }
    }).catch(fail);
  };

  return (
    <CategoryModal
      testid="location-move-dialog"
      openedBy="row-move"
      title={t("admin.locations.move.title")}
      onClose={onClose}
    >
      <p className="text-sm" data-testid="location-move-path">
        {row.path}
      </p>
      {targets.length === 0 ? (
        <p className="text-sm text-muted-foreground" data-testid="location-move-empty">
          {t("admin.locations.move.noTargets")}
        </p>
      ) : (
        <FormField
          label={t("admin.locations.move.parent")}
          htmlFor="location-move-parent"
          help={t("admin.locations.move.hint")}
        >
          <select
            id="location-move-parent"
            data-testid="location-move-parent"
            className="min-h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
            value={parentId}
            onChange={(event) => setParentId(event.target.value)}
          >
            <option value="">{"—"}</option>
            {targets.map((target) => (
              <option key={target.id} value={target.id}>
                {target.path}
              </option>
            ))}
          </select>
        </FormField>
      )}
      <LocationErrorLine refusal={refusal} />
      <LocationDialogActions
        onCancel={onClose}
        onSubmit={submit}
        busy={move.isPending || parentId === ""}
        submitTestId="location-move-submit"
        submitLabel={t("admin.locations.move.submit")}
      />
    </CategoryModal>
  );
}

/* ------------------------------- 4.5 reorder ------------------------------ */

/** Country rows are excluded: markets are ordered in their own settings
 *  (`orderCountriesInProfile`), which is why the row action is disabled there. */
export function LocationReorderDialog({
  row,
  roster,
  guard,
  onClose,
}: {
  row: LocationNode;
  roster: LocationNode[];
  guard: GuardFn;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const reorder = useReorderLocations();
  const { refusal, clear, fail } = useLocationError();
  const [order, setOrder] = useState<LocationNode[]>(() =>
    roster.filter((peer) => peer.parentId === row.parentId),
  );

  const swap = (index: number, delta: number) => {
    const next = [...order];
    const target = index + delta;
    const a = next[index];
    const b = next[target];
    if (a === undefined || b === undefined) return;
    next[index] = b;
    next[target] = a;
    setOrder(next);
  };

  const submit = () => {
    clear();
    if (row.parentId === null) return;
    void guard(async () => {
      try {
        await reorder.mutateAsync({
          parentId: row.parentId as string,
          ids: order.map((peer) => peer.id),
        });
        onClose();
      } catch (error) {
        fail(error);
      }
    }).catch(fail);
  };

  return (
    <CategoryModal
      testid="location-reorder-dialog"
      openedBy="row-reorder"
      title={t("admin.locations.reorder.title")}
      onClose={onClose}
    >
      <p className="text-sm text-muted-foreground">{t("admin.locations.reorder.hint")}</p>
      <ol className="flex flex-col gap-2" data-testid="location-reorder-list">
        {order.map((peer, index) => (
          <li
            key={peer.id}
            data-testid={`location-reorder-item-${index}`}
            className="flex min-w-0 flex-wrap items-center justify-between gap-2"
          >
            <span className="min-w-0 break-words text-sm">{peer.nameEn}</span>
            <span className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="touch"
                data-testid={`location-reorder-up-${index}`}
                disabled={index === 0}
                onClick={() => swap(index, -1)}
              >
                {t("admin.locations.reorder.up")}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="touch"
                data-testid={`location-reorder-down-${index}`}
                disabled={index === order.length - 1}
                onClick={() => swap(index, 1)}
              >
                {t("admin.locations.reorder.down")}
              </Button>
            </span>
          </li>
        ))}
      </ol>
      <LocationErrorLine refusal={refusal} />
      <LocationDialogActions
        onCancel={onClose}
        onSubmit={submit}
        busy={reorder.isPending}
        submitTestId="location-reorder-submit"
        submitLabel={t("admin.locations.reorder.submit")}
      />
    </CategoryModal>
  );
}

/* -------------------------------- 4.6 delete ------------------------------ */

/**
 * The operator types the row's own address. The door checks it again
 * (`slugMismatch`) and refuses `retireInstead:<detail>` whenever a child, a
 * listing, a coverage row or a profile default still points at the row — the
 * detail renders beside the sentence.
 */
export function LocationDeleteDialog({
  row,
  guard,
  onClose,
}: {
  row: LocationNode;
  guard: GuardFn;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const remove = useDeleteLocation();
  const { refusal, clear, fail, render } = useLocationError();
  const [typed, setTyped] = useState("");

  const submit = () => {
    clear();
    if (typed.trim() !== row.slug) {
      render("admin.locations.delete.mismatch");
      return;
    }
    void guard(async () => {
      try {
        await remove.mutateAsync({ id: row.id, slug: row.slug });
        onClose();
      } catch (error) {
        fail(error);
      }
    }).catch(fail);
  };

  return (
    <CategoryModal
      testid="location-delete-dialog"
      openedBy="row-delete"
      title={t("admin.locations.delete.title")}
      onClose={onClose}
    >
      <p className="text-sm" data-testid="location-delete-path">
        {row.path}
      </p>
      <p className="text-sm text-muted-foreground">{t("admin.locations.delete.hint")}</p>
      <FormField label={t("admin.locations.delete.confirmLabel")} htmlFor="location-delete-confirm">
        <Input
          id="location-delete-confirm"
          data-testid="location-delete-confirm"
          value={typed}
          onChange={(event) => setTyped(event.target.value)}
        />
      </FormField>
      <LocationErrorLine refusal={refusal} />
      <LocationDialogActions
        onCancel={onClose}
        onSubmit={submit}
        busy={remove.isPending}
        submitTestId="location-delete-submit"
        submitLabel={t("admin.locations.delete.confirm")}
      />
    </CategoryModal>
  );
}
