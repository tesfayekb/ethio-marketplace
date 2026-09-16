import { useState } from "react";

import { FormField } from "@/components/shell/form-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CategoryModal, SELECT_CLASS } from "@/features/admin-categories/category-dialogs";
import { stepUpAbortKey } from "@/features/auth/mfa/mfa-service";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { useI18n, type MessageKey } from "@/i18n";

import {
  childLevelOf,
  locationErrorKey,
  type LocationNode,
  type LocationRefusal,
} from "./locations-service";
import {
  coordinatesRequired,
  emptyLocationForm,
  LocationFormFields,
  type LocationFormValues,
} from "./location-form-fields";
import { useUpsertLocation } from "./use-locations";

/**
 * LOCATIONS ERA L2a — THE WRITE SURFACES (create-child and edit).
 *
 * Every submit runs through the page's step-up `guard`; the door behind it
 * re-checks the permission AND the step-up server-side (F3), so a refusal here
 * is a translated sentence naming the door's own id, never a silent no-op (F4).
 * Nothing closes on failure. 360-first: full-width controls, ≥44px targets,
 * logical spacing only (C5).
 */

/** F4 — one refusal mapping for every locations surface (B2). */
export function useLocationError() {
  const { t } = useI18n();
  const [refusal, setRefusal] = useState<LocationRefusal | null>(null);
  const clear = () => setRefusal(null);
  const fail = (error: unknown) => {
    const abort = stepUpAbortKey(error);
    if (abort !== undefined) {
      setRefusal(abort === null ? null : { key: abort as MessageKey, detailKey: null, raw: null });
      return;
    }
    setRefusal(locationErrorKey(error instanceof Error ? error.message : String(error ?? "")));
  };
  const render = (message: MessageKey) => setRefusal({ key: message, detailKey: null, raw: null });
  return { refusal, clear, fail, render, t };
}

export function LocationErrorLine({ refusal }: { refusal: LocationRefusal | null }) {
  const { t } = useI18n();
  if (refusal === null) return null;
  return (
    <>
      <p role="alert" data-testid="location-dialog-error" className="text-sm text-destructive">
        {t(refusal.key)}
        {refusal.detailKey === null ? null : ` — ${t(refusal.detailKey)}`}
      </p>
      {refusal.raw === null ? null : (
        <p
          className="text-sm break-words text-muted-foreground"
          data-testid="location-dialog-error-reason"
        >
          {t("admin.locations.error.reason").replace("{reason}", refusal.raw)}
        </p>
      )}
    </>
  );
}

export function LocationDialogActions({
  onCancel,
  onSubmit,
  busy,
  submitTestId,
  submitLabel,
}: {
  onCancel: () => void;
  onSubmit: () => void;
  busy: boolean;
  submitTestId: string;
  submitLabel?: string;
}) {
  const { t } = useI18n();
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
      <Button
        type="button"
        variant="outline"
        size="touch"
        data-testid="location-dialog-cancel"
        onClick={onCancel}
      >
        {t("common.cancel")}
      </Button>
      <Button
        type="button"
        size="touch"
        data-testid={submitTestId}
        disabled={busy}
        onClick={onSubmit}
      >
        {submitLabel ?? t("common.save")}
      </Button>
    </div>
  );
}

export function numberOrNull(raw: string): number | null {
  const value = raw.trim();
  if (value === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

/* ------------------------------- create ---------------------------------- */

/**
 * 4.1 / L2a-R — CREATE A PLACE INSIDE A PLACE. A country anchor is born by
 * opening a market (L2b), never here, so the dialog always has a parent — and
 * the level is DERIVED from it.
 *
 * Two entrances, one surface (B3): the section header's button offers a PARENT
 * PICKER (the market's rows that can still hold a child, the anchor
 * preselected), and the editor's create-child verb hands the parent in fixed.
 * A new row is born RETIRED by the door's own INSERT, so the dialog says so.
 */
export function LocationCreateDialog({
  parents,
  parentId,
  fixed,
  guard,
  onClose,
}: {
  /** The market's rows that can hold a child, in roster order. */
  parents: LocationNode[];
  parentId: string;
  /** True when the editor named the parent: the picker becomes a read-only path. */
  fixed: boolean;
  guard: GuardFn;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const upsert = useUpsertLocation();
  const { refusal, clear, fail, render } = useLocationError();
  const [chosen, setChosen] = useState(parentId);
  const [form, setForm] = useState<LocationFormValues>(emptyLocationForm);
  const [created, setCreated] = useState(false);
  const parent = parents.find((row) => row.id === chosen) ?? null;
  const level = parent === null ? null : childLevelOf(parent.level);
  const patch = (next: Partial<LocationFormValues>) => setForm((prev) => ({ ...prev, ...next }));

  const submit = () => {
    clear();
    if (parent === null || level === null) {
      render("admin.locations.error.badLevel");
      return;
    }
    if (form.nameEn.trim() === "") {
      render("admin.locations.error.nameRequired");
      return;
    }
    const lat = numberOrNull(form.centerLat);
    const lng = numberOrNull(form.centerLng);
    // A client MIRROR of the guard's law; the door remains the authority.
    if (coordinatesRequired(level) && (lat === null || lng === null)) {
      render("admin.locations.error.missingCoordinates");
      return;
    }
    void guard(async () => {
      try {
        await upsert.mutateAsync({
          id: null,
          parentId: parent.id,
          level,
          nameEn: form.nameEn.trim(),
          slug: form.slug.trim() === "" ? null : form.slug.trim(),
          iso: level === "region" && form.iso.trim() !== "" ? form.iso.trim() : null,
          aliases: form.aliases,
          displayOrder: numberOrNull(form.displayOrder) ?? 0,
          centerLat: lat,
          centerLng: lng,
        });
        setCreated(true);
      } catch (error) {
        fail(error);
      }
    }).catch(fail);
  };

  return (
    <CategoryModal
      testid="location-create-dialog"
      openedBy={fixed ? "verb-create-child" : "create-button"}
      title={t("admin.locations.create.title")}
      onClose={onClose}
    >
      <FormField label={t("admin.locations.create.parent")} htmlFor="location-create-parent">
        {fixed ? (
          <p id="location-create-parent" data-testid="location-create-parent" className="text-sm">
            {parent?.path ?? "—"}
          </p>
        ) : (
          <select
            id="location-create-parent"
            data-testid="location-create-parent"
            className={SELECT_CLASS}
            value={chosen}
            onChange={(event) => setChosen(event.target.value)}
          >
            {/* L2b-C1 — with every market in the roster the picker also offers
                CLOSED countries' anchors, suffixed so the operator can see a
                place is being prepared before its market opens. */}
            {parents.map((row) => (
              <option key={row.id} value={row.id}>
                {row.isActive
                  ? row.path
                  : `${row.path} · ${t("admin.locations.filter.closedSuffix")}`}
              </option>
            ))}
          </select>
        )}
      </FormField>
      <p className="text-sm text-muted-foreground" data-testid="location-create-level">
        {t("admin.locations.create.level").replace(
          "{level}",
          level === null ? "—" : t(`admin.locations.level.${level}` as MessageKey),
        )}
      </p>

      {created ? (
        <>
          <p
            role="status"
            data-testid="location-create-retired"
            className="rounded-md border border-primary/30 bg-primary/10 px-3 py-2 text-sm text-primary"
          >
            {t("admin.locations.create.bornRetired")}
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              size="touch"
              data-testid="location-create-close"
              onClick={onClose}
            >
              {t("common.close")}
            </Button>
          </div>
        </>
      ) : (
        <>
          <LocationFormFields
            mode="create"
            level={level ?? parent?.level ?? "region"}
            values={form}
            onChange={patch}
          />
          <LocationErrorLine refusal={refusal} />
          <LocationDialogActions
            onCancel={onClose}
            onSubmit={submit}
            busy={upsert.isPending}
            submitTestId="location-create-submit"
          />
        </>
      )}
    </CategoryModal>
  );
}
