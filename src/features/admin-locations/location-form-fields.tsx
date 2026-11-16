import { useState } from "react";

import { controlClass } from "@/components/forms/control-class";
import { Field } from "@/components/forms/field";
import type { FormGate } from "@/components/forms/use-form-gate";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/i18n";
import { parseNumber, type ParsedNumber } from "@/lib/parse-input";
import type { Refusal } from "@/lib/refusal";

import { coordinatesRequired } from "./location-form-values";
import { LOCATION_REFUSALS } from "./location-refusals";
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

/** Each answer's refusal (the gate's mark or the parser's), by the door's field name. */
export type LocationFormRefusals = Partial<Record<keyof LocationFormValues, Refusal>>;

const answered = (parsed: ParsedNumber) => (parsed.kind === "number" ? parsed.value : null);

/**
 * DEC-339 — the form's typed numbers, read by the one parser (src/lib/parse-input.ts): a
 * coordinate is a number within its range or blank (null; the gate has already stopped a blank
 * one the level requires), the order a whole number. An unreadable answer is a `badType`
 * refusal under its own field, never a guessed value.
 */
export function readLocationNumbers(
  values: LocationFormValues,
):
  | { ok: true; centerLat: number | null; centerLng: number | null; displayOrder: number }
  | { ok: false; refusals: LocationFormRefusals } {
  const lat = parseNumber(values.centerLat, { min: -90, max: 90 });
  const lng = parseNumber(values.centerLng, { min: -180, max: 180 });
  const order = parseNumber(values.displayOrder, { integer: true });
  const refusals: LocationFormRefusals = {};
  if (lat.kind === "invalid") refusals.centerLat = { field: "centerLat", reason: "badType" };
  if (lng.kind === "invalid") refusals.centerLng = { field: "centerLng", reason: "badType" };
  if (order.kind !== "number") {
    refusals.displayOrder = { field: "displayOrder", reason: "badType" };
  }
  if (order.kind !== "number" || Object.keys(refusals).length > 0) return { ok: false, refusals };
  return { ok: true, centerLat: answered(lat), centerLng: answered(lng), displayOrder: order.value };
}

/** The gate's marks and the parser's refusals, one per field (the parser's wins once tried). */
export function locationRefusals(gate: FormGate, parsed: LocationFormRefusals): LocationFormRefusals {
  const marked: LocationFormRefusals = {};
  for (const mark of gate.marks) {
    if (mark.field in EMPTY_VALUES) marked[mark.field as keyof LocationFormValues] = mark;
  }
  return { ...marked, ...parsed };
}

const EMPTY_VALUES: Record<keyof LocationFormValues, true> = {
  nameEn: true,
  slug: true,
  iso: true,
  aliases: true,
  displayOrder: true,
  centerLat: true,
  centerLng: true,
};

const hintLine = (text: string) => <p className="text-xs text-muted-foreground">{text}</p>;

export function LocationFormFields({
  mode,
  level,
  values,
  onChange,
  gate,
  refusals = {},
}: {
  mode: "create" | "edit";
  /** The level the row IS (edit) or will be born at (create). */
  level: LocationLevel | string;
  values: LocationFormValues;
  onChange: (patch: Partial<LocationFormValues>) => void;
  gate?: FormGate;
  refusals?: LocationFormRefusals;
}) {
  const { t } = useI18n();
  const coordsRequired = coordinatesRequired(level);
  const refusalOf = (field: keyof LocationFormValues) => refusals[field] ?? null;
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
      <Field
        id={`${p}-name`}
        field="nameEn"
        label={t("admin.locations.field.name")}
        required
        refusal={refusalOf("nameEn")}
        family={LOCATION_REFUSALS}
        gate={gate}
        blank={values.nameEn.trim() === ""}
      >
        {(control) => (
          <Input
            {...control}
            data-testid={`${p}-name`}
            className={controlClass(refusalOf("nameEn") !== null, false, "dialog")}
            value={values.nameEn}
            onChange={(event) => onChange({ nameEn: event.target.value })}
          />
        )}
      </Field>

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

      <Field
        id={`${p}-slug`}
        field="slug"
        label={t("admin.locations.field.slug")}
        required={false}
        hint={hintLine(t("admin.locations.field.slugHint"))}
        refusal={refusalOf("slug")}
        family={LOCATION_REFUSALS}
      >
        {(control) => (
          <Input
            {...control}
            data-testid={`${p}-slug`}
            className={controlClass(refusalOf("slug") !== null, false, "dialog")}
            value={values.slug}
            onChange={(event) => onChange({ slug: event.target.value })}
          />
        )}
      </Field>

      {/* The door refuses `isoOnRegionsOnly` anywhere else, so the field only
          exists where it is legal. */}
      {level === "region" ? (
        <Field
          id={`${p}-iso`}
          field="iso"
          label={t("admin.locations.field.iso")}
          required={false}
          refusal={refusalOf("iso")}
          family={LOCATION_REFUSALS}
        >
          {(control) => (
            <Input
              {...control}
              data-testid={`${p}-iso`}
              className={controlClass(refusalOf("iso") !== null, false, "dialog")}
              value={values.iso}
              onChange={(event) => onChange({ iso: event.target.value })}
            />
          )}
        </Field>
      ) : null}

      <Field
        id={`${p}-lat`}
        field="centerLat"
        label={t("admin.locations.field.centerLat")}
        required={coordsRequired}
        hint={hintLine(
          coordsRequired
            ? t("admin.locations.field.centerRequired")
            : t("admin.locations.field.centerOptional"),
        )}
        refusal={refusalOf("centerLat")}
        family={LOCATION_REFUSALS}
        gate={gate}
        blank={coordsRequired && values.centerLat.trim() === ""}
      >
        {(control) => (
          <Input
            {...control}
            data-testid={`${p}-lat`}
            inputMode="decimal"
            className={controlClass(refusalOf("centerLat") !== null, false, "dialog")}
            value={values.centerLat}
            onChange={(event) => onChange({ centerLat: event.target.value })}
          />
        )}
      </Field>
      <Field
        id={`${p}-lng`}
        field="centerLng"
        label={t("admin.locations.field.centerLng")}
        required={coordsRequired}
        refusal={refusalOf("centerLng")}
        family={LOCATION_REFUSALS}
        gate={gate}
        blank={coordsRequired && values.centerLng.trim() === ""}
      >
        {(control) => (
          <Input
            {...control}
            data-testid={`${p}-lng`}
            inputMode="decimal"
            className={controlClass(refusalOf("centerLng") !== null, false, "dialog")}
            value={values.centerLng}
            onChange={(event) => onChange({ centerLng: event.target.value })}
          />
        )}
      </Field>

      <Field
        id={`${p}-alias`}
        field="aliases"
        label={t("admin.locations.field.aliases")}
        required={false}
        hint={hintLine(t("admin.locations.field.aliasesHint"))}
        refusal={refusalOf("aliases")}
        family={LOCATION_REFUSALS}
      >
        {(control) => (
        <>
        <span className="flex flex-wrap items-center gap-2">
          <Input
            {...control}
            data-testid={`${p}-alias`}
            className={`${controlClass(refusalOf("aliases") !== null, false, "dialog")} md:w-56`}
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
        </>
        )}
      </Field>

      {/*
       * Bundle 3 Part D — regions, cities and sub-cities are listed A to Z by
       * name, so their order field leaves the screen; the stored value still
       * round-trips unchanged (INC-188). A country row keeps it.
       */}
      {level === "country" ? (
        <Field
          id={`${p}-order`}
          field="displayOrder"
          label={t("admin.locations.field.order")}
          required
          refusal={refusalOf("displayOrder")}
          family={LOCATION_REFUSALS}
        >
          {(control) => (
            <Input
              {...control}
              data-testid={`${p}-order`}
              inputMode="numeric"
              className={controlClass(refusalOf("displayOrder") !== null, false, "dialog")}
              value={values.displayOrder}
              onChange={(event) => onChange({ displayOrder: event.target.value })}
            />
          )}
        </Field>
      ) : null}
    </>
  );
}
