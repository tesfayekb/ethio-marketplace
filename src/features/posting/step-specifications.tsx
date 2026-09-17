import { useEffect, useState } from "react";

import { useI18n } from "@/i18n";
import { entityName } from "@/i18n/entity";

import { loadAttributeOptions, optionLabel, type AttrOption } from "./attribute-options";
import { readPostingSchema, type AttrDef, type PostingSchema } from "./posting-service";
import { draftRefusalKey, fill, refusalFor } from "./refusal-text";
import type { Refusal } from "./types";

/**
 * U6-C1b — STEP 3: THE SPECIFICATIONS, GENERATED FROM THE CATEGORY'S OWN READ.
 *
 * NOTHING ON THIS SCREEN IS AUTHORED. `get_posting_schema` names the details a
 * category asks for, and each definition's `attr_type` chooses its control — so a
 * curator adding a detail to a category adds it to this form, with no code
 * change and no chance of a form and a validator disagreeing.
 *
 *   text          → a single-line field (`max_length` said, preset shape hinted)
 *   number        → a numeric field with its unit, DEC-050 bounds as a HINT
 *   single_select → a native picker whose options load on the FIRST TAP (DEC-053)
 *   multi_select  → the same lazy list as checkboxes, "choose all that apply"
 *   boolean       → an ATTESTATION the seller ticks, never a pre-ticked default
 *   date          → a date field
 *
 * TWO LAWS SHOW THROUGH EVERYWHERE HERE:
 *  - The bounds, lengths and presets are HINTS. The door validates (F3); a hint
 *    that disagreed with it would be a lie, so it is worded as guidance and the
 *    refusal underneath is the verdict.
 *  - An option list is never shipped with the form. A preset can hold thousands
 *    of rows, and a seller opens one or two controls.
 */

const fieldClass =
  "min-h-11 w-full rounded-md border border-input bg-background px-3 text-base text-foreground " +
  "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

type OptionState = { state: "idle" | "loading" | "ready" | "failed"; list: AttrOption[] };

const IDLE: OptionState = { state: "idle", list: [] };

/** The single-select value the door accepts: a plain value, or `other` + text. */
function selectedValue(raw: unknown): string {
  if (typeof raw === "string") return raw;
  if (raw !== null && typeof raw === "object") {
    const value = (raw as Record<string, unknown>)["value"];
    return typeof value === "string" ? value : "";
  }
  return "";
}

function otherText(raw: unknown): string {
  if (raw !== null && typeof raw === "object") {
    const text = (raw as Record<string, unknown>)["text"];
    return typeof text === "string" ? text : "";
  }
  return "";
}

function chosenList(raw: unknown): string[] {
  return Array.isArray(raw)
    ? raw.filter((entry): entry is string => typeof entry === "string")
    : [];
}

export function StepSpecifications({
  categoryId,
  values,
  onChange,
  refusals,
  onFields,
}: {
  categoryId: string | null;
  values: Record<string, unknown>;
  onChange: (attributes: Record<string, unknown>, immediate: boolean) => void;
  refusals: Refusal[];
  /**
   * The detail keys this form actually renders, reported upward so the wizard
   * knows which refusals already have a control of their own on screen — and
   * shows every OTHER refusal rather than swallowing it (F4).
   */
  onFields?: (attrKeys: string[]) => void;
}) {
  const { t, entities } = useI18n();
  const [schema, setSchema] = useState<PostingSchema | null>(null);
  const [failed, setFailed] = useState(false);
  const [options, setOptions] = useState<Record<string, OptionState>>({});

  useEffect(() => {
    if (categoryId === null) return;
    let cancelled = false;
    setFailed(false);
    void readPostingSchema(categoryId).then((read) => {
      if (cancelled) return;
      setSchema(read);
      setFailed(read === null);
    });
    return () => {
      cancelled = true;
    };
  }, [categoryId]);

  useEffect(() => {
    if (!onFields) return;
    onFields(schema === null ? [] : schema.attributes.map((def) => def.attrKey));
  }, [schema, onFields]);

  /** One control's list, fetched once, on the tap that opens it (DEC-053). */
  const openOptions = (def: AttrDef) => {
    const held = options[def.attrKey] ?? IDLE;
    if (held.state === "loading" || held.state === "ready") return;
    setOptions((prev) => ({ ...prev, [def.attrKey]: { state: "loading", list: [] } }));
    void loadAttributeOptions(def.attributeId).then((list) => {
      setOptions((prev) => ({
        ...prev,
        [def.attrKey]: list === null ? { state: "failed", list: [] } : { state: "ready", list },
      }));
    });
  };

  /** A written answer, debounced by the draft; an absent answer drops its key. */
  const write = (attrKey: string, value: unknown, immediate = false) => {
    const next = { ...values };
    if (value === undefined || value === "" || (Array.isArray(value) && value.length === 0)) {
      delete next[attrKey];
    } else {
      next[attrKey] = value;
    }
    onChange(next, immediate);
  };

  if (categoryId === null) {
    return <p className="text-sm text-muted-foreground">{t("post.specs.needCategory")}</p>;
  }

  if (failed) {
    return (
      <p className="text-sm text-destructive" data-testid="post-specs-error">
        {t("post.specs.loadFailed")}
      </p>
    );
  }

  if (schema === null) {
    return <p className="text-sm text-muted-foreground">{t("post.loading")}</p>;
  }

  if (schema.attributes.length === 0) {
    return (
      <p className="text-sm text-muted-foreground" data-testid="post-specs-none">
        {t("post.specs.none")}
      </p>
    );
  }

  return (
    <div className="space-y-5" data-testid="post-specs">
      <p className="text-sm text-muted-foreground">{t("post.specs.why")}</p>

      {schema.attributes.map((def) => {
        // U4d/B2 — the shared resolver names a definition, never an inline ternary.
        const label = entityName(
          "attribute",
          { id: def.attributeId, nameEn: def.nameEn, nameAm: null },
          entities,
        );
        const held = options[def.attrKey] ?? IDLE;
        const refusal = refusalFor(refusals, def.attrKey);
        const controlId = `post-attr-${def.attrKey}`;
        const value = values[def.attrKey];
        const chosen = selectedValue(value);

        return (
          <div
            key={def.attrKey}
            className="space-y-1"
            data-testid="post-spec"
            data-attr={def.attrKey}
          >
            <label htmlFor={controlId} className="text-sm font-medium text-foreground">
              {label}
            </label>
            {!def.isRequired && (
              <span className="ms-2 text-xs text-muted-foreground">{t("post.optional")}</span>
            )}

            {def.attrType === "text" && (
              <input
                id={controlId}
                data-testid="post-attr-control"
                data-attr={def.attrKey}
                className={fieldClass}
                value={typeof value === "string" ? value : ""}
                maxLength={def.maxLength ?? undefined}
                onChange={(event) => write(def.attrKey, event.target.value)}
              />
            )}

            {def.attrType === "number" && (
              <input
                id={controlId}
                type="number"
                inputMode="decimal"
                data-testid="post-attr-control"
                data-attr={def.attrKey}
                className={fieldClass}
                value={typeof value === "number" ? String(value) : ""}
                step={def.decimals === null || def.decimals === 0 ? 1 : 10 ** -def.decimals}
                onChange={(event) => {
                  const raw = event.target.value;
                  const parsed = Number(raw);
                  write(def.attrKey, raw === "" || !Number.isFinite(parsed) ? undefined : parsed);
                }}
              />
            )}

            {def.attrType === "date" && (
              <input
                id={controlId}
                type="date"
                data-testid="post-attr-control"
                data-attr={def.attrKey}
                className={fieldClass}
                value={typeof value === "string" ? value : ""}
                onChange={(event) => write(def.attrKey, event.target.value, true)}
              />
            )}

            {def.attrType === "boolean" && (
              <label className="flex min-h-11 items-center gap-2 text-sm text-foreground">
                <input
                  id={controlId}
                  type="checkbox"
                  data-testid="post-attr-control"
                  data-attr={def.attrKey}
                  className="h-5 w-5 rounded border-input"
                  checked={value === true}
                  onChange={(event) =>
                    write(def.attrKey, event.target.checked ? true : undefined, true)
                  }
                />
                <span>{t("post.specs.attest")}</span>
              </label>
            )}

            {def.attrType === "single_select" && (
              <select
                id={controlId}
                data-testid="post-attr-control"
                data-attr={def.attrKey}
                data-options={held.state}
                className={fieldClass}
                value={chosen}
                onFocus={() => openOptions(def)}
                onPointerDown={() => openOptions(def)}
                onChange={(event) => {
                  const picked = event.target.value;
                  if (picked === "other") {
                    write(def.attrKey, { value: "other", text: otherText(value) }, false);
                    return;
                  }
                  write(def.attrKey, picked === "" ? undefined : picked, true);
                }}
              >
                <option value="">{t("post.specs.choose")}</option>
                {held.list.map((option) => (
                  <option key={option.value} value={option.value}>
                    {optionLabel(option, entities.lang)}
                  </option>
                ))}
              </select>
            )}

            {def.attrType === "single_select" && chosen === "other" && (
              <input
                data-testid="post-attr-other"
                data-attr={def.attrKey}
                className={fieldClass}
                value={otherText(value)}
                maxLength={120}
                placeholder={t("post.specs.otherPlaceholder")}
                onChange={(event) =>
                  write(
                    def.attrKey,
                    event.target.value === ""
                      ? { value: "other" }
                      : { value: "other", text: event.target.value },
                  )
                }
              />
            )}

            {def.attrType === "multi_select" && held.state !== "ready" && (
              <button
                type="button"
                data-testid="post-attr-open"
                data-attr={def.attrKey}
                data-options={held.state}
                className={`${fieldClass} text-start`}
                onClick={() => openOptions(def)}
              >
                {held.state === "loading" ? t("post.specs.optionsLoading") : t("post.specs.choose")}
              </button>
            )}

            {def.attrType === "multi_select" && held.state === "ready" && (
              <ul className="space-y-1" data-testid="post-attr-checks" data-attr={def.attrKey}>
                {held.list.map((option) => {
                  const list = chosenList(value);
                  return (
                    <li key={option.value}>
                      <label className="flex min-h-11 items-center gap-2 text-sm text-foreground">
                        <input
                          type="checkbox"
                          data-testid="post-attr-check"
                          data-value={option.value}
                          className="h-5 w-5 rounded border-input"
                          checked={list.includes(option.value)}
                          onChange={(event) =>
                            write(
                              def.attrKey,
                              event.target.checked
                                ? [...list, option.value]
                                : list.filter((entry) => entry !== option.value),
                              true,
                            )
                          }
                        />
                        <span>{optionLabel(option, entities.lang)}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            )}

            {held.state === "failed" && (
              <p className="text-xs text-destructive" data-testid="post-attr-options-error">
                {t("post.specs.optionsFailed")}
              </p>
            )}

            {/* The definition's own guidance, then the DEC-050 hints — advice, never
                the verdict: the door decides and its refusal lands below. */}
            {def.helpTextEn !== null && (
              <p className="text-xs text-muted-foreground">{def.helpTextEn}</p>
            )}
            {def.attrType === "number" && (def.minBound !== null || def.maxBound !== null) && (
              <p className="text-xs text-muted-foreground" data-testid="post-attr-bounds">
                {fill(t("post.specs.boundsHint"), {
                  min: def.minBound ?? t("post.specs.noBound"),
                  max: def.maxBound ?? t("post.specs.noBound"),
                })}
              </p>
            )}
            {def.attrType === "number" && def.unit !== null && (
              <p className="text-xs text-muted-foreground">
                {fill(t("post.specs.unitHint"), { unit: def.unit })}
              </p>
            )}
            {def.attrType === "text" && def.maxLength !== null && (
              <p className="text-xs text-muted-foreground">
                {fill(t("post.specs.lengthHint"), { max: def.maxLength })}
              </p>
            )}
            {def.attrType === "text" && def.preset !== null && (
              <p className="text-xs text-muted-foreground">{t("post.specs.presetHint")}</p>
            )}
            {def.attrType === "multi_select" && (
              <p className="text-xs text-muted-foreground">{t("post.specs.multiHint")}</p>
            )}

            {refusal !== null && (
              <p
                className="text-sm text-destructive"
                data-testid="post-attr-refusal"
                data-attr={def.attrKey}
              >
                {t(draftRefusalKey(refusal.reason))}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default StepSpecifications;
