import { useState, type ReactNode } from "react";

import { TipBadge } from "@/components/shell/tip-badge";
import { CategoryModal } from "@/features/admin-categories/category-dialogs";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { useI18n, type MessageKey } from "@/i18n";

import {
  LocationDialogActions,
  LocationErrorLine,
  numberOrNull,
  useLocationError,
} from "./location-dialogs";
import {
  coordinatesRequired,
  LocationFormFields,
  type LocationFormValues,
} from "./location-form-fields";
import type { LocationNode } from "./locations-service";
import { useUpsertLocation } from "./use-locations";

/**
 * L2a-R — THE EDITOR IS THE ROW'S ONE SURFACE (the categories convention,
 * CT-8). The roster carries a single 44px pencil per row; everything an
 * operator can do to that place lives here: the fields, the save, and the verb
 * bar the page hands in. Nothing is rendered inside a table cell any more —
 * that was what clipped the roster at 1280 and forced a horizontal scroller.
 *
 * The write law is unchanged: the submit runs through the page's step-up
 * `guard`, the door re-checks permission AND step-up server-side (F3), and a
 * refusal is a translated sentence naming the door's own id (F4). Nothing
 * closes on failure. Other-language names stay in Translations → Data (D3).
 */
export function LocationEditorDialog({
  row,
  guard,
  verbBar,
  openedBy,
  onClose,
}: {
  row: LocationNode;
  guard: GuardFn;
  /** The verb bar, built by the page so every verb keeps its own dialog. */
  verbBar: ReactNode;
  openedBy: string;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const upsert = useUpsertLocation();
  const { refusal, clear, fail, render } = useLocationError();
  const [form, setForm] = useState<LocationFormValues>(() => ({
    nameEn: row.nameEn,
    slug: row.slug,
    iso: row.iso ?? "",
    aliases: row.aliases,
    displayOrder: String(row.displayOrder),
    centerLat: row.centerLat === null ? "" : String(row.centerLat),
    centerLng: row.centerLng === null ? "" : String(row.centerLng),
  }));
  const patch = (next: Partial<LocationFormValues>) => setForm((prev) => ({ ...prev, ...next }));

  const submit = () => {
    clear();
    if (form.nameEn.trim() === "") {
      render("admin.locations.error.nameRequired");
      return;
    }
    const lat = numberOrNull(form.centerLat);
    const lng = numberOrNull(form.centerLng);
    if (coordinatesRequired(row.level) && (lat === null || lng === null)) {
      render("admin.locations.error.missingCoordinates");
      return;
    }
    void guard(async () => {
      try {
        // INC-188 — every stored field this surface holds is sent back, so a
        // save never drops what the operator did not touch.
        await upsert.mutateAsync({
          id: row.id,
          parentId: row.parentId,
          level: null,
          nameEn: form.nameEn.trim(),
          slug: form.slug.trim() === "" ? null : form.slug.trim(),
          iso: row.level === "region" && form.iso.trim() !== "" ? form.iso.trim() : null,
          aliases: form.aliases,
          displayOrder: numberOrNull(form.displayOrder) ?? row.displayOrder,
          centerLat: lat,
          centerLng: lng,
        });
        onClose();
      } catch (error) {
        fail(error);
      }
    }).catch(fail);
  };

  return (
    <CategoryModal
      testid="location-editor"
      openedBy={openedBy}
      title={t("admin.locations.edit.title")}
      onClose={onClose}
    >
      <div className="flex min-w-0 flex-wrap items-center gap-2">
        <span className="min-w-0 break-words text-sm" data-testid="location-editor-path">
          {row.path}
        </span>
        <TipBadge
          variant="outline"
          label={t(`admin.locations.level.${row.level}` as MessageKey)}
          tip={t("admin.locations.field.readOnlyLevel")}
          testid="location-editor-level"
        />
        <TipBadge
          variant={row.isActive ? "secondary" : "destructive"}
          label={t(row.isActive ? "admin.locations.badge.active" : "admin.locations.badge.retired")}
          tip={t(row.isActive ? "admin.locations.tip.active" : "admin.locations.tip.retired")}
          testid="location-editor-status"
        />
      </div>

      <LocationFormFields mode="edit" level={row.level} values={form} onChange={patch} />
      <p className="text-sm text-muted-foreground">
        <a className="underline" data-testid="location-edit-translations" href="/admin/translations">
          {t("admin.locations.edit.translationsLink")}
        </a>
      </p>
      <LocationErrorLine refusal={refusal} />
      <LocationDialogActions
        onCancel={onClose}
        onSubmit={submit}
        busy={upsert.isPending}
        submitTestId="location-editor-save"
      />

      {verbBar}
    </CategoryModal>
  );
}

export default LocationEditorDialog;
