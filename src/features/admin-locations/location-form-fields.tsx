import { useState } from "react";

import { FormField } from "@/components/shell/form-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/i18n";

import { deriveLocationSlug, type LocationLevel } from "./locations-service";

/**
 * LOCATIONS ERA L2a — THE SHARED LOCATION FORM.
 *
 * One field set, two consumers: the create-child dialog and the edit dialog
 * (B3 — extend via props, never copy-paste). Mode differences are deliberate:
 * create renders the derived slug preview; edit shows neither parent nor level,
 * because both belong to the Move door (`useMoveDoor`).
 *
 * The coordinate requirement below is a CLIENT MIRROR of the law, never its
 * authority: `loc_ancestry_guard` refuses `missingCoordinates` regardless.
 * Other-language names are not written here — Translations → Data is the single
 * writer for `name_am` (D3), so no `name_am` field exists in this console.
 */

export interface LocationFormValues {
  nameEn: string;
  /** Optional: the door derives one from the name when this is blank. */
  slug: string;
  iso: string;
  aliases: string[];
  displayOrder: string;
  centerLat: string;
  centerLng: string;
}

export function emptyLocationForm(): LocationFormValues {
  return {
    nameEn: "",
    slug: "",
    iso: "",
    aliases: [],
    displayOrder: "0",
    centerLng: "",
    centerLat: "",
  };
}

/** Both coordinates are required at city and sub-city level. */
export function coordinatesRequired(level: string): boolean {
  return level === "city" || level === "sub_city";
}

export function LocationFormFields({
  mode,
  level,
  values,
  onChange,
}: {
  mode: "create" | "edit";
  /** The level the row IS (edit) or will be born at (create). */
  level: LocationLevel | string;
  values: LocationFormValues;
  onChange: (patch: Partial<LocationFormValues>) => void;
}) {
  const { t } = useI18n();
  const p = mode === "create" ? "location-create" : "location-edit";
  const [alias, setAlias] = useState("");

  const addAlias = () => {
    const next = alias.trim();
    if (next === "" || values.aliases.includes(next)) return;
    onChange({ aliases: [...values.aliases, next] });
    setAlias("");
  };

  return (
    <>
      <FormField label={t("admin.locations.field.name")} htmlFor={`${p}-name`}>
        <Input
          id={`${p}-name`}
          data-testid={`${p}-name`}
          value={values.nameEn}
          onChange={(event) => onChange({ nameEn: event.target.value })}
        />
      </FormField>

      {mode === "create" ? (
        <p className="text-sm text-muted-foreground">
          <span>{t("admin.locations.create.slugPreview")}</span>{" "}
          <span data-testid="location-create-slug-preview" className="font-mono break-all">
            {values.slug.trim() === ""
              ? deriveLocationSlug(values.nameEn.trim())
              : values.slug.trim()}
          </span>
        </p>
      ) : null}

      <FormField
        label={t("admin.locations.field.slug")}
        htmlFor={`${p}-slug`}
        help={t("admin.locations.field.slugHint")}
      >
        <Input
          id={`${p}-slug`}
          data-testid={`${p}-slug`}
          value={values.slug}
          onChange={(event) => onChange({ slug: event.target.value })}
        />
      </FormField>

      {/* The door refuses `isoOnRegionsOnly` anywhere else, so the field only
          exists where it is legal. */}
      {level === "region" ? (
        <FormField label={t("admin.locations.field.iso")} htmlFor={`${p}-iso`}>
          <Input
            id={`${p}-iso`}
            data-testid={`${p}-iso`}
            value={values.iso}
            onChange={(event) => onChange({ iso: event.target.value })}
          />
        </FormField>
      ) : null}

      <FormField
        label={t("admin.locations.field.centerLat")}
        htmlFor={`${p}-lat`}
        help={
          coordinatesRequired(level)
            ? t("admin.locations.field.centerRequired")
            : t("admin.locations.field.centerOptional")
        }
      >
        <Input
          id={`${p}-lat`}
          data-testid={`${p}-lat`}
          inputMode="decimal"
          value={values.centerLat}
          onChange={(event) => onChange({ centerLat: event.target.value })}
        />
      </FormField>
      <FormField label={t("admin.locations.field.centerLng")} htmlFor={`${p}-lng`}>
        <Input
          id={`${p}-lng`}
          data-testid={`${p}-lng`}
          inputMode="decimal"
          value={values.centerLng}
          onChange={(event) => onChange({ centerLng: event.target.value })}
        />
      </FormField>

      <FormField
        label={t("admin.locations.field.aliases")}
        htmlFor={`${p}-alias`}
        help={t("admin.locations.field.aliasesHint")}
      >
        <span className="flex flex-wrap items-center gap-2">
          <Input
            id={`${p}-alias`}
            data-testid={`${p}-alias`}
            className="md:w-56"
            value={alias}
            onChange={(event) => setAlias(event.target.value)}
          />
          <Button
            type="button"
            variant="outline"
            size="touch"
            data-testid="location-alias-add"
            onClick={addAlias}
          >
            {t("admin.locations.field.aliasAdd")}
          </Button>
        </span>
        <span className="flex flex-wrap gap-1" data-testid="location-alias-list">
          {values.aliases.map((entry, index) => (
            <Badge key={entry} variant="outline" data-testid={`location-alias-chip-${index}`}>
              <span className="min-w-0 break-words">{entry}</span>
              <button
                type="button"
                className="ms-1"
                aria-label={t("admin.locations.field.aliasRemove")}
                data-testid={`location-alias-remove-${index}`}
                onClick={() =>
                  onChange({ aliases: values.aliases.filter((peer) => peer !== entry) })
                }
              >
                {"\u00d7"}
              </button>
            </Badge>
          ))}
        </span>
      </FormField>

      <FormField label={t("admin.locations.field.order")} htmlFor={`${p}-order`}>
        <Input
          id={`${p}-order`}
          data-testid={`${p}-order`}
          inputMode="numeric"
          value={values.displayOrder}
          onChange={(event) => onChange({ displayOrder: event.target.value })}
        />
      </FormField>
    </>
  );
}
