import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useI18n } from "@/i18n";
import { entityName } from "@/i18n/entity";

import { loadAttributeOptions, optionLabel, type AttrOption } from "./attribute-options";
import { Field, controlClass } from "./field";
import { readPostingSchema, type AttrDef, type PostingSchema } from "./posting-service";
import { draftRefusalKey, fill, refusalFor } from "./refusal-text";
import type { Refusal } from "./types";

/**
 * U6-C1b / U6-C1-R3a-2 — STEP 3: THE SPECIFICATIONS, GENERATED FROM THE
 * CATEGORY'S OWN READ.
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
 * THREE NARROWINGS, in this order, every one of them a MIRROR of a door rule:
 *
 *   1 THE LINK (M-MAINT-2 §12) — `allowed_options` keeps only the values this
 *     category accepts, and `default_value` prefills an empty field. The door
 *     refuses anything else with `optionNotAllowed:<value>`.
 *   2 THE FOLD (DEC-050 `parent`) — a child detail shows only the options that
 *     hang under the value chosen for its PARENT detail (Model ← Make,
 *     Series ← Brand). With no parent value the child is closed and says which
 *     answer it is waiting for; a child value that no longer fits is cleared the
 *     moment the parent changes, never left to be refused later.
 *   3 THE FACTS (D18) — the chosen option may already know things about the
 *     item: `{ fuel: "petrol" }` prefills that sibling and says "from the model —
 *     edit if different", and `{ year: { min: 1968 } }` narrows the sibling's
 *     bounds in this mirror only.
 *
 * THE DOOR IS STILL THE AUTHORITY (F3). Bounds, lengths, presets and fact floors
 * are worded as guidance; `validate_listing_attributes` decides, and its refusal
 * lands under the control that earned it.
 *
 * HOW A FOLD IS KNOWN HERE (honest note): the posting read does not carry a
 * definition's `depends_on`, so the parent is resolved STRUCTURALLY — the sibling
 * picker whose option values are the ones this detail's options hang under. Small
 * option lists are therefore read up front (a big preset stays lazy, and a fold
 * whose parent list has not been read yet simply narrows once it has).
 */

type OptionState = { state: "idle" | "loading" | "ready" | "failed"; list: AttrOption[] };

const IDLE: OptionState = { state: "idle", list: [] };

/** A list small enough to read up front, so a fold is known before the first tap. */
const EAGER_OPTION_LIMIT = 200;

const SELECT_TYPES = ["single_select", "multi_select"];

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

function isEmpty(value: unknown): boolean {
  return (
    value === undefined ||
    value === null ||
    value === "" ||
    (Array.isArray(value) && value.length === 0)
  );
}

interface FactBound {
  min: number | null;
  max: number | null;
}

function boundOf(raw: unknown): FactBound | null {
  if (raw === null || typeof raw !== "object" || Array.isArray(raw)) return null;
  const row = raw as Record<string, unknown>;
  const num = (key: string) =>
    typeof row[key] === "number" && Number.isFinite(row[key]) ? Number(row[key]) : null;
  const min = num("min");
  const max = num("max");
  if (min === null && max === null) return null;
  return { min, max };
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
  /** The details this screen filled in from a chosen option's facts (D18). */
  const [fromModel, setFromModel] = useState<string[]>([]);
  /** What this screen alone saw wrong — the door's own refusal always wins. */
  const [local, setLocal] = useState<Refusal[]>([]);

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
  const openOptions = useCallback((def: AttrDef) => {
    setOptions((prev) => {
      const held = prev[def.attrKey] ?? IDLE;
      if (held.state === "loading" || held.state === "ready") return prev;
      return { ...prev, [def.attrKey]: { state: "loading", list: [] } };
    });
    void loadAttributeOptions(def.attributeId).then((list) => {
      setOptions((prev) => ({
        ...prev,
        [def.attrKey]: list === null ? { state: "failed", list: [] } : { state: "ready", list },
      }));
    });
  }, []);

  /**
   * THE SHORT LISTS ARE READ UP FRONT. A fold must be knowable before the seller
   * taps the child, and a list of a few dozen options costs one cached public
   * read; a big preset (every make and model) stays strictly lazy (DEC-053).
   */
  useEffect(() => {
    if (schema === null) return;
    const selects = schema.attributes.filter((def) => SELECT_TYPES.includes(def.attrType));
    /**
     * DEC-053 STANDS: a list is still fetched on the tap that opens it. Only two
     * things are known before a tap, and both need the rows themselves:
     *   - a FOLD, which exists only between TWO pickers, and
     *   - a link's `default_value`, which must prefill an empty field.
     * So a single small picker with no default stays lazy, exactly as before.
     */
    const foldsPossible = selects.length > 1;
    for (const def of selects) {
      if (def.optionCount === 0 || def.optionCount > EAGER_OPTION_LIMIT) continue;
      if (!foldsPossible && def.defaultValue === null) continue;
      openOptions(def);
    }
  }, [schema, openOptions]);

  /** A written answer, debounced by the draft; an absent answer drops its key. */
  const write = useCallback(
    (attrKey: string, value: unknown, immediate = false) => {
      const next = { ...values };
      if (isEmpty(value)) delete next[attrKey];
      else next[attrKey] = value;
      onChange(next, immediate);
    },
    [values, onChange],
  );

  const definitions = useMemo(() => schema?.attributes ?? [], [schema]);

  /** The narrowed option list of one definition, before the fold is applied. */
  const allowedListOf = useCallback(
    (def: AttrDef): AttrOption[] => {
      const held = options[def.attrKey] ?? IDLE;
      const allowed = def.allowedOptions;
      return allowed === null
        ? held.list
        : held.list.filter((option) => allowed.includes(option.value));
    },
    [options],
  );

  /**
   * THE FOLD MAP: for every child whose options hang under a parent value, the
   * sibling definition that owns those values. Resolved structurally (see the
   * file header), preferring a sibling asked BEFORE this one.
   */
  const folds = useMemo(() => {
    const out: Record<string, string> = {};
    for (const def of definitions) {
      if (!SELECT_TYPES.includes(def.attrType)) continue;
      const parents = new Set(
        allowedListOf(def)
          .map((option) => option.parent)
          .filter((parent): parent is string => parent !== null && parent !== ""),
      );
      if (parents.size === 0) continue;
      const candidates = definitions.filter(
        (other) => other.attrKey !== def.attrKey && SELECT_TYPES.includes(other.attrType),
      );
      const owner = candidates.find((other) =>
        allowedListOf(other).some((option) => parents.has(option.value)),
      );
      if (owner !== undefined) out[def.attrKey] = owner.attrKey;
    }
    return out;
  }, [definitions, allowedListOf]);

  /** The options a control may actually offer: the link's subset, then the fold. */
  const visibleOptionsOf = useCallback(
    (def: AttrDef): AttrOption[] => {
      const list = allowedListOf(def);
      const parentKey = folds[def.attrKey];
      if (parentKey === undefined) return list;
      const parentValue = selectedValue(values[parentKey]);
      if (parentValue === "") return [];
      return list.filter((option) => option.parent === parentValue);
    },
    [allowedListOf, folds, values],
  );

  /**
   * THE FACTS OF EVERY CHOSEN OPTION (D18), gathered once: the values to prefill
   * and the bounds to narrow. A later option wins over an earlier one for the
   * same sibling, which is the order the seller answered them in.
   */
  const facts = useMemo(() => {
    const prefill: Record<string, unknown> = {};
    const bounds: Record<string, FactBound> = {};
    for (const def of definitions) {
      if (!SELECT_TYPES.includes(def.attrType)) continue;
      const picked = selectedValue(values[def.attrKey]);
      if (picked === "") continue;
      const option = allowedListOf(def).find((entry) => entry.value === picked);
      if (option?.facts === null || option?.facts === undefined) continue;
      for (const [key, raw] of Object.entries(option.facts)) {
        const bound = boundOf(raw);
        if (bound !== null) bounds[key] = bound;
        else if (typeof raw === "string" || typeof raw === "number" || typeof raw === "boolean") {
          prefill[key] = raw;
        }
      }
    }
    return { prefill, bounds };
  }, [definitions, values, allowedListOf]);

  /**
   * A CHILD VALUE THAT NO LONGER FITS IS CLEARED, and a fact's value fills a
   * sibling that is still empty. Both are ordinary changes to the draft, written
   * in ONE patch so a parent change costs one save.
   */
  const reconcile = useRef("");
  useEffect(() => {
    if (schema === null) return;
    const next = { ...values };
    let changed = false;
    const filled: string[] = [];

    for (const def of definitions) {
      if (!SELECT_TYPES.includes(def.attrType)) continue;
      const parentKey = folds[def.attrKey];
      if (parentKey === undefined) continue;
      const held = options[def.attrKey] ?? IDLE;
      if (held.state !== "ready") continue;
      const offered = new Set(visibleOptionsOf(def).map((option) => option.value));
      const held_value = values[def.attrKey];
      if (def.attrType === "multi_select") {
        const list = chosenList(held_value);
        const kept = list.filter((entry) => offered.has(entry));
        if (kept.length !== list.length) {
          changed = true;
          if (kept.length === 0) delete next[def.attrKey];
          else next[def.attrKey] = kept;
        }
        continue;
      }
      const picked = selectedValue(held_value);
      if (picked !== "" && picked !== "other" && !offered.has(picked)) {
        changed = true;
        delete next[def.attrKey];
      }
    }

    for (const [key, value] of Object.entries(facts.prefill)) {
      const def = definitions.find((entry) => entry.attrKey === key);
      if (def === undefined) continue;
      if (!isEmpty(next[key])) continue;
      next[key] = value;
      filled.push(key);
      changed = true;
    }

    if (!changed) return;
    // I3 — the same patch is never written twice: a reconciliation is identified
    // by what it produces, not by how many times this effect runs.
    const stamp = JSON.stringify(next);
    if (reconcile.current === stamp) return;
    reconcile.current = stamp;
    if (filled.length > 0) {
      setFromModel((prev) => [...new Set([...prev, ...filled])]);
    }
    onChange(next, false);
  }, [schema, definitions, folds, options, values, facts, visibleOptionsOf, onChange]);

  /** M-MAINT-2 §12 — the LINK's default fills an empty field, once. */
  const defaulted = useRef<string | null>(null);
  useEffect(() => {
    if (schema === null || categoryId === null || defaulted.current === categoryId) return;
    defaulted.current = categoryId;
    const next = { ...values };
    let changed = false;
    for (const def of definitions) {
      if (def.defaultValue === null || def.defaultValue === undefined) continue;
      if (!isEmpty(next[def.attrKey])) continue;
      next[def.attrKey] = def.defaultValue;
      changed = true;
    }
    if (changed) onChange(next, false);
  }, [schema, categoryId, definitions, values, onChange]);

  const seen = useMemo(() => {
    const named = new Set(refusals.map((entry) => entry.field));
    return [...refusals, ...local.filter((entry) => !named.has(entry.field))];
  }, [refusals, local]);

  /** A number judged against the door's bounds AND the chosen model's floor. */
  const judgeNumber = (def: AttrDef, value: number | null) => {
    const bound = facts.bounds[def.attrKey] ?? null;
    setLocal((prev) => {
      const rest = prev.filter((entry) => entry.field !== def.attrKey);
      if (value === null || bound === null) return rest;
      if (bound.min !== null && value < bound.min) {
        return [
          ...rest,
          { field: def.attrKey, reason: "belowModelYear", detail: String(bound.min) },
        ];
      }
      if (bound.max !== null && value > bound.max) {
        return [
          ...rest,
          { field: def.attrKey, reason: "aboveModelYear", detail: String(bound.max) },
        ];
      }
      return rest;
    });
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

  const nameOf = (def: AttrDef) =>
    entityName("attribute", { id: def.attributeId, nameEn: def.nameEn, nameAm: null }, entities);

  return (
    <div className="space-y-5" data-testid="post-specs">
      <p className="text-sm text-muted-foreground">{t("post.specs.why")}</p>

      {schema.attributes.map((def) => {
        // U4d/B2 — the shared resolver names a definition, never an inline ternary.
        const label = nameOf(def);
        const held = options[def.attrKey] ?? IDLE;
        const refusal = refusalFor(seen, def.attrKey);
        const controlId = `post-attr-${def.attrKey}`;
        const value = values[def.attrKey];
        const chosen = selectedValue(value);
        const shown = visibleOptionsOf(def);
        const parentKey = folds[def.attrKey];
        const parentDef =
          parentKey === undefined
            ? null
            : (schema.attributes.find((entry) => entry.attrKey === parentKey) ?? null);
        /** A fold with no parent answer yet: closed, and saying what it waits for. */
        const waiting = parentDef !== null && selectedValue(values[parentKey ?? ""]) === "";
        const bound = facts.bounds[def.attrKey] ?? null;
        /**
         * U6-C1-R2 — EVERY FIELD THROUGH THE PRIMITIVE. The asterisk, the word
         * "Optional", the refusal message and the red border all come from one
         * place now, so no detail can be presented differently from the rest.
         * A required answer that is still missing wears the SOFT border from the
         * start — visible guidance, not a refusal nobody made (F4).
         */
        const empty = isEmpty(value);
        const ctrl = controlClass(refusal !== null, def.isRequired && empty);

        return (
          <div
            key={def.attrKey}
            className="space-y-1"
            data-testid="post-spec"
            data-attr={def.attrKey}
            data-parent={parentKey ?? ""}
          >
            <Field
              id={controlId}
              label={label}
              required={def.isRequired}
              refusal={refusal}
              refusalTestId="post-attr-refusal"
              refusalAttr={def.attrKey}
            >
              {def.attrType === "text" && (
                <input
                  id={controlId}
                  data-testid="post-attr-control"
                  data-attr={def.attrKey}
                  className={ctrl}
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
                  className={ctrl}
                  value={typeof value === "number" ? String(value) : ""}
                  step={def.decimals === null || def.decimals === 0 ? 1 : 10 ** -def.decimals}
                  min={bound?.min ?? undefined}
                  max={bound?.max ?? undefined}
                  onChange={(event) => {
                    const raw = event.target.value;
                    const parsed = Number(raw);
                    const next = raw === "" || !Number.isFinite(parsed) ? null : parsed;
                    judgeNumber(def, next);
                    write(def.attrKey, next === null ? undefined : next);
                  }}
                  onBlur={(event) => {
                    const parsed = Number(event.target.value);
                    judgeNumber(def, Number.isFinite(parsed) ? parsed : null);
                  }}
                />
              )}

              {def.attrType === "date" && (
                <input
                  id={controlId}
                  type="date"
                  data-testid="post-attr-control"
                  data-attr={def.attrKey}
                  className={ctrl}
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
                  data-waiting={waiting ? "1" : "0"}
                  disabled={waiting}
                  className={ctrl}
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
                  {shown.map((option) => (
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
                  className={ctrl}
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
                  disabled={waiting}
                  className={`${ctrl} text-start`}
                  onClick={() => openOptions(def)}
                >
                  {held.state === "loading"
                    ? t("post.specs.optionsLoading")
                    : t("post.specs.choose")}
                </button>
              )}

              {def.attrType === "multi_select" && held.state === "ready" && !waiting && (
                <ul className="space-y-1" data-testid="post-attr-checks" data-attr={def.attrKey}>
                  {shown.map((option) => {
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

              {/* THE FOLD, IN WORDS: the child says which answer it waits for, so a
                  closed control is never a dead end (F4). */}
              {waiting && parentDef !== null && (
                <p
                  className="text-xs text-muted-foreground"
                  data-testid="post-attr-parent-first"
                  data-attr={def.attrKey}
                >
                  {fill(t("post.specs.parentFirst"), { parent: nameOf(parentDef) })}
                </p>
              )}
              {!waiting && parentDef !== null && held.state === "ready" && shown.length === 0 && (
                <p
                  className="text-xs text-muted-foreground"
                  data-testid="post-attr-no-options"
                  data-attr={def.attrKey}
                >
                  {t("post.specs.noneForParent")}
                </p>
              )}

              {/* D18 — filled in from the chosen model, and said so. */}
              {fromModel.includes(def.attrKey) && (
                <p
                  className="text-xs text-muted-foreground"
                  data-testid="post-attr-from-model"
                  data-attr={def.attrKey}
                >
                  {t("post.specs.fromModel")}
                </p>
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
              {def.attrType === "number" &&
                (bound !== null || def.minBound !== null || def.maxBound !== null) && (
                  <p className="text-xs text-muted-foreground" data-testid="post-attr-bounds">
                    {fill(t("post.specs.boundsHint"), {
                      min: bound?.min ?? def.minBound ?? t("post.specs.noBound"),
                      max: bound?.max ?? def.maxBound ?? t("post.specs.noBound"),
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
            </Field>
          </div>
        );
      })}
    </div>
  );
}

export default StepSpecifications;
