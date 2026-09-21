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

/**
 * D24 — IS THIS DETAIL ASKED FOR AT ALL? A link with no condition always is. A
 * condition is met when the sibling it names holds one of its listed answers —
 * a single answer, an `other` pick, or one of a multi-select's answers. The
 * door (`validate_listing_attributes`) decides the same way and DROPS a value
 * sent for an unmet link, so this is the mirror and never the authority (F3).
 */
function conditionMet(def: AttrDef, values: Record<string, unknown>): boolean {
  const condition = def.visibleWhen;
  if (condition === null) return true;
  const held = values[condition.key];
  const picked = selectedValue(held);
  if (picked !== "") return condition.in.includes(picked);
  return chosenList(held).some((entry) => condition.in.includes(entry));
}

function isEmpty(value: unknown): boolean {
  return (
    value === undefined ||
    value === null ||
    value === "" ||
    (Array.isArray(value) && value.length === 0)
  );
}

/**
 * INC-240 — TWO ANSWERS ARE THE SAME ANSWER. A detail's value may be a string, a
 * number, a boolean, an `other` pair or a list, so provenance is compared by
 * SHAPE, not by identity — one comparator, used by the reconciliation and by the
 * caption alike, so the screen and the re-derivation can never disagree.
 */
function same(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (isEmpty(a) && isEmpty(b)) return true;
  return JSON.stringify(a ?? null) === JSON.stringify(b ?? null);
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
  /**
   * INC-240 — WHO WROTE THIS ANSWER. For every detail this screen filled in from
   * a chosen option's facts (D18) we remember the EXACT value we wrote. The value
   * still standing in the draft then tells us who owns it:
   *   - equal to what we wrote → still the model's answer, ours to re-derive;
   *   - different → the seller typed over it, and a parent change never discards
   *     a person's own words (it offers the model's new value instead).
   */
  const [prefills, setPrefills] = useState<Record<string, unknown>>({});
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
    // D24 — only the details the answers actually ask for are reported, so a
    // hidden required field can never hold `Next` shut.
    onFields(
      schema === null
        ? []
        : schema.attributes.filter((def) => conditionMet(def, values)).map((def) => def.attrKey),
    );
  }, [schema, onFields, values]);

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

  /**
   * D24 — THE DETAILS THIS ANSWER SET ACTUALLY ASKS FOR, re-evaluated on every
   * change. A hidden detail is absent: it is not rendered, it is not counted as
   * required, and any answer it still holds is cleared below so nothing unasked
   * is ever sent.
   */
  const asked = useMemo(
    () => definitions.filter((def) => conditionMet(def, values)),
    [definitions, values],
  );

  useEffect(() => {
    const shown = new Set(asked.map((def) => def.attrKey));
    const orphans = definitions.filter(
      (def) => !shown.has(def.attrKey) && !isEmpty(values[def.attrKey]),
    );
    if (orphans.length === 0) return;
    const next = { ...values };
    for (const def of orphans) delete next[def.attrKey];
    onChange(next, false);
  }, [asked, definitions, values, onChange]);

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
   *
   * INC-242 — A BOUND COMES FROM WHATEVER WAS CHOSEN, NOT FROM A PARENT. The
   * model's year floor bounds the year although the year is nobody's child: the
   * facts of EVERY chosen option of EVERY picker on the form are collected here,
   * and `bounds` keeps them ALL per key (they are intersected in `boundsOf`
   * below) rather than letting the last one read win.
   *
   * `byOwner` keeps each picker's own contribution apart, because D25b must
   * re-prefill from ONE option — the make the seller just changed to — and not
   * from the stale facts of the children that change is about to clear.
   */
  const facts = useMemo(() => {
    const prefill: Record<string, unknown> = {};
    const bounds: Record<string, FactBound[]> = {};
    const byOwner: Record<string, Record<string, unknown>> = {};
    for (const def of definitions) {
      if (!SELECT_TYPES.includes(def.attrType)) continue;
      const picked = selectedValue(values[def.attrKey]);
      if (picked === "") continue;
      const option = allowedListOf(def).find((entry) => entry.value === picked);
      if (option?.facts === null || option?.facts === undefined) continue;
      const mine: Record<string, unknown> = {};
      for (const [key, raw] of Object.entries(option.facts)) {
        const bound = boundOf(raw);
        if (bound !== null) (bounds[key] ??= []).push(bound);
        else if (typeof raw === "string" || typeof raw === "number" || typeof raw === "boolean") {
          prefill[key] = raw;
          mine[key] = raw;
        }
      }
      byOwner[def.attrKey] = mine;
    }
    return { prefill, bounds, byOwner };
  }, [definitions, values, allowedListOf]);

  /**
   * INC-242 — THE EFFECTIVE BOUNDS OF ONE DETAIL: its definition's own bounds
   * NARROWED by every chosen option that speaks about it (the tightest floor and
   * the tightest ceiling win). One resolver, used by the year picker, the numeric
   * mirror, the bounds caption and the local judgement alike, so the screen can
   * never offer a value one part of it would refuse. The door remains the
   * authority (F3) — this is the mirror.
   */
  const boundsOf = useCallback(
    (def: AttrDef): { min: number | null; max: number | null; narrowed: boolean } => {
      const own = (raw: string | null): number | null => {
        if (raw === null) return null;
        const parsed = Number(raw);
        return Number.isFinite(parsed) ? parsed : null;
      };
      let min = own(def.minBound);
      let max = own(def.maxBound);
      const fromOptions = facts.bounds[def.attrKey] ?? [];
      for (const bound of fromOptions) {
        if (bound.min !== null) min = min === null ? bound.min : Math.max(min, bound.min);
        if (bound.max !== null) max = max === null ? bound.max : Math.min(max, bound.max);
      }
      return { min, max, narrowed: fromOptions.length > 0 };
    },
    [facts],
  );

  /**
   * D25 — WHICH DETAILS BELONG TO THE MODEL. A detail is MODEL-DEPENDENT when a
   * parent option speaks about it at all: a fact that fills it, a fact that
   * bounds it (a year), or a condition that decides whether it is asked. Every
   * other detail is the SELLER's (mileage, colour, condition, plate) and no
   * parent change may ever touch it.
   */
  const dependents = useMemo(() => {
    const out = new Set<string>();
    for (const def of definitions) {
      if (def.visibleWhen !== null) out.add(def.attrKey);
      if (!SELECT_TYPES.includes(def.attrType)) continue;
      for (const option of allowedListOf(def)) {
        for (const key of Object.keys(option.facts ?? {})) out.add(key);
      }
    }
    return out;
  }, [definitions, allowedListOf]);

  /**
   * D25 — THE PARENTS WHOSE CHANGE RESETS THOSE DETAILS: a picker whose options
   * carry facts (the model), and a picker another picker's options hang under
   * (the make). Their own answers are never reset by this rule — the narrowing
   * below still clears a child that no longer fits.
   */
  const parents = useMemo(() => {
    const out = new Set<string>();
    for (const def of definitions) {
      if (!SELECT_TYPES.includes(def.attrType)) continue;
      const list = allowedListOf(def);
      if (list.some((option) => Object.keys(option.facts ?? {}).length > 0)) out.add(def.attrKey);
    }
    for (const owner of Object.values(folds)) out.add(owner);
    return out;
  }, [definitions, allowedListOf, folds]);

  /**
   * D25b — THE ROOT OF THE CASCADE: a picker other pickers hang under which hangs
   * under nothing itself (the MAKE). Changing it does not adjust a car — it names
   * a DIFFERENT car, so every detail on the form starts over, the seller's own
   * answers included. A model change stays D25's narrower reset.
   */
  const roots = useMemo(() => {
    const out = new Set<string>();
    for (const owner of Object.values(folds)) if (!(owner in folds)) out.add(owner);
    return out;
  }, [folds]);

  /** The parent answers as this screen last saw them, to notice a change at all. */
  const parentsSeen = useRef<Record<string, string> | null>(null);
  /** D25 — an undo offer lives for ten seconds and never outlives its own step. */
  const [undoOffer, setUndoOffer] = useState<{
    values: Record<string, unknown>;
    prefills: Record<string, unknown>;
    model: string;
  } | null>(null);
  const skipReset = useRef(false);

  useEffect(() => {
    if (undoOffer === null) return;
    const timer = setTimeout(() => setUndoOffer(null), 10_000);
    return () => clearTimeout(timer);
  }, [undoOffer]);

  /**
   * D25 / INC-240 — ONE RECONCILIATION, RUN AFTER EVERY ANSWER.
   *
   * A parent change is not just a narrowing: everything the OLD parent spoke
   * about is stale the moment it changes. So this effect, in one patch:
   *   0 RESETS every model-dependent detail when a parent answer changes — the
   *     new option's fact, or EMPTY when it carries none — regardless of who
   *     typed the previous answer, and offers an Undo for ten seconds. Details
   *     no parent names keep their answers.
   *   1 clears a value the narrowing no longer offers (the fold, and the link's
   *     `allowed_options` — a value that no longer fits is never left to be
   *     refused at the door later),
   *   2 re-derives every prefilled answer the seller has not touched,
   *   3 fills a still-empty detail a fact speaks about.
   */
  const reconcile = useRef("");
  useEffect(() => {
    if (schema === null) return;
    const next = { ...values };
    let changed = false;
    const owned: Record<string, unknown> = { ...prefills };

    // 0 — A PARENT CHANGED: everything it speaks about is re-derived from it.
    const now: Record<string, string> = {};
    for (const key of parents) now[key] = selectedValue(values[key]);
    const before = parentsSeen.current;
    const movedKey =
      before === null
        ? null
        : (Object.keys(now).find((key) => (before[key] ?? "") !== now[key]) ?? null);
    parentsSeen.current = now;
    /**
     * A reset follows a parent the seller MOVED TO SOMETHING. A parent emptied by
     * the narrowing below (its own parent changed, or an Undo put back an answer
     * the new parent cannot hold) is not a new choice, and must not cascade a
     * second reset over the answers that were just restored.
     */
    if (movedKey !== null && now[movedKey] !== "" && !skipReset.current) {
      const snapshot = { ...values };
      const heldPrefills = { ...prefills };
      /**
       * D25b — HOW WIDE THE RESET IS. A ROOT change (the make) starts the whole
       * form over: every other detail, the seller's own included, and the only
       * facts that may prefill are the ones the NEW root option itself carries —
       * the children it is about to clear are stale by definition. A MODEL change
       * keeps D25's scope: the details some option speaks about, and no others.
       */
      const rootChange = roots.has(movedKey);
      const source = rootChange ? (facts.byOwner[movedKey] ?? {}) : facts.prefill;
      const scope = rootChange
        ? definitions.map((def) => def.attrKey).filter((key) => key !== movedKey)
        : [...dependents].filter((key) => !parents.has(key));
      for (const key of scope) {
        if (definitions.every((def) => def.attrKey !== key)) continue;
        const fact = source[key];
        if (fact === undefined) {
          if (!isEmpty(next[key])) {
            delete next[key];
            changed = true;
          }
          delete owned[key];
          continue;
        }
        if (!same(next[key], fact)) {
          next[key] = fact;
          changed = true;
        }
        owned[key] = fact;
      }
      if (changed) {
        const parentDef = definitions.find((def) => def.attrKey === movedKey) ?? null;
        const option =
          parentDef === null
            ? undefined
            : allowedListOf(parentDef).find((entry) => entry.value === now[movedKey]);
        setUndoOffer({
          values: snapshot,
          prefills: heldPrefills,
          model: option === undefined ? "" : optionLabel(option, entities.lang),
        });
      }
    }
    skipReset.current = false;

    for (const def of definitions) {
      if (!SELECT_TYPES.includes(def.attrType)) continue;
      const parentKey = folds[def.attrKey];
      if (parentKey === undefined && def.allowedOptions === null) continue;
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

    // 2 — the model's own answers, re-derived from whatever the parent now says.
    for (const [key, written] of Object.entries(owned)) {
      const def = definitions.find((entry) => entry.attrKey === key);
      if (def === undefined) continue;
      if (!same(next[key], written)) continue; // the seller owns it now
      const fact = facts.prefill[key];
      if (fact === undefined) {
        delete owned[key];
        if (!isEmpty(next[key])) {
          delete next[key];
          changed = true;
        }
        continue;
      }
      if (!same(fact, written)) {
        owned[key] = fact;
        next[key] = fact;
        changed = true;
      }
    }

    // 3 — a fact fills a detail that is still empty.
    for (const [key, value] of Object.entries(facts.prefill)) {
      if (key in owned) continue;
      const def = definitions.find((entry) => entry.attrKey === key);
      if (def === undefined) continue;
      if (!isEmpty(next[key])) continue;
      owned[key] = value;
      next[key] = value;
      changed = true;
    }

    // I3 — the mirror of provenance is written only when it actually moved.
    if (JSON.stringify(owned) !== JSON.stringify(prefills)) setPrefills(owned);

    if (!changed) return;
    // I3 — the same patch is never written twice: a reconciliation is identified
    // by what it produces, not by how many times this effect runs.
    const stamp = JSON.stringify(next);
    if (reconcile.current === stamp) return;
    reconcile.current = stamp;
    onChange(next, false);
  }, [
    schema,
    definitions,
    folds,
    options,
    values,
    facts,
    prefills,
    parents,
    dependents,
    allowedListOf,
    entities.lang,
    visibleOptionsOf,
    onChange,
  ]);

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

  /**
   * A number judged against the EFFECTIVE bounds (INC-242) — the definition's own
   * narrowed by every chosen option. The wording stays the model's, because a
   * floor only appears here when an option put it there; a definition-only bound
   * is the door's to refuse.
   */
  const judgeNumber = (def: AttrDef, value: number | null) => {
    const bound = boundsOf(def);
    setLocal((prev) => {
      const rest = prev.filter((entry) => entry.field !== def.attrKey);
      if (value === null || !bound.narrowed) return rest;
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

      {/* D25 — THE RESET SAYS SO, AND IS REVERSIBLE. A parent change re-derives
          every detail that parent speaks about; for ten seconds the previous
          answers can be taken back in one tap (F4: nothing happens silently). */}
      {undoOffer !== null && (
        <p
          role="status"
          aria-live="polite"
          className="flex flex-wrap items-center gap-2 rounded-md border border-border p-3 text-sm text-foreground"
          data-testid="post-specs-reset"
        >
          <span>{fill(t("post.specs.resetForModel"), { model: undoOffer.model })}</span>
          <button
            type="button"
            className="min-h-11 font-medium text-primary underline"
            data-testid="post-specs-reset-undo"
            onClick={() => {
              const offer = undoOffer;
              skipReset.current = true;
              /**
               * A RESTORED ANSWER IS THE SELLER'S. Handing provenance back
               * unchanged would let step 2 re-derive the very values this tap
               * just restored — the new model's fact would overwrite them on the
               * next pass. So only a restored answer that still MATCHES the
               * current fact stays the model's; every other one becomes the
               * seller's and is left alone.
               */
              const kept: Record<string, unknown> = {};
              for (const [key, written] of Object.entries(offer.prefills)) {
                if (same(facts.prefill[key], written)) kept[key] = written;
              }
              setPrefills(kept);
              onChange(offer.values, true);
              setUndoOffer(null);
            }}
          >
            {t("post.specs.resetUndo")}
          </button>
        </p>
      )}

      {/* D24 — only the details this answer set asks for are on screen. */}
      {asked.map((def) => {
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
        // INC-242 — the definition's bounds narrowed by every chosen option.
        const bound = boundsOf(def);
        /**
         * U6-C1-R2 — EVERY FIELD THROUGH THE PRIMITIVE. The asterisk, the word
         * "Optional", the refusal message and the red border all come from one
         * place now, so no detail can be presented differently from the rest.
         * A required answer that is still missing wears the SOFT border from the
         * start — visible guidance, not a refusal nobody made (F4).
         */
        const empty = isEmpty(value);
        const ctrl = controlClass(refusal !== null, def.isRequired && empty);
        /**
         * INC-240 — WHOSE ANSWER IS ON SCREEN. `fromModel` says the model's own
         * answer still stands; `modelDiffers` says the seller's own answer stands
         * and the model would say something else — offered, never imposed.
         */
        const written = def.attrKey in prefills ? prefills[def.attrKey] : undefined;
        const fromModel = def.attrKey in prefills && same(value, written);
        const modelValue = facts.prefill[def.attrKey];
        const modelDiffers =
          def.attrKey in prefills &&
          !fromModel &&
          !empty &&
          modelValue !== undefined &&
          !same(value, modelValue);
        /**
         * STEP 2 — A YEAR IS A PICKER, NOT A TYPED NUMBER. A `format = 'year'`
         * number offers the years the item can plausibly be: from the EFFECTIVE
         * floor (INC-242 — the definition's minimum narrowed by every chosen
         * option's bound, else 1900) to next year, newest first. There is no free
         * text and no negative year to type. The door's bounds remain the
         * authority (F3) — this control cannot produce a year it would refuse.
         */
        const yearMode = def.attrType === "number" && def.format === "year";
        const yearFloor = bound.min !== null ? Math.trunc(bound.min) : 1900;
        const nextYear = new Date().getFullYear() + 1;
        const yearCeiling = Math.trunc(
          bound.max !== null ? Math.min(bound.max, nextYear) : nextYear,
        );
        const years = yearMode
          ? Array.from({ length: Math.max(0, yearCeiling - yearFloor + 1) }, (_, index) =>
              String(yearCeiling - index),
            )
          : [];

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

              {def.attrType === "number" && yearMode && (
                <select
                  id={controlId}
                  data-testid="post-attr-control"
                  data-attr={def.attrKey}
                  data-year="1"
                  className={ctrl}
                  value={typeof value === "number" ? String(value) : ""}
                  onChange={(event) => {
                    const raw = event.target.value;
                    const next = raw === "" ? null : Number(raw);
                    judgeNumber(def, next);
                    write(def.attrKey, next === null ? undefined : next, true);
                  }}
                >
                  <option value="">{t("post.specs.choose")}</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              )}

              {def.attrType === "number" && !yearMode && (
                <input
                  id={controlId}
                  type="number"
                  inputMode="decimal"
                  data-testid="post-attr-control"
                  data-attr={def.attrKey}
                  className={ctrl}
                  value={typeof value === "number" ? String(value) : ""}
                  step={def.decimals === null || def.decimals === 0 ? 1 : 10 ** -def.decimals}
                  min={bound.min ?? undefined}
                  max={bound.max ?? undefined}
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
              {fromModel && (
                <p
                  className="text-xs text-muted-foreground"
                  data-testid="post-attr-from-model"
                  data-attr={def.attrKey}
                >
                  {t("post.specs.fromModel")}
                </p>
              )}

              {/* INC-240 — THE SELLER'S OWN ANSWER STANDS, and the model's newer
                  one is OFFERED beside it. Nothing is overwritten by a parent
                  change once a person has typed over it. */}
              {modelDiffers && (
                <p
                  className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground"
                  data-testid="post-attr-model-differs"
                  data-attr={def.attrKey}
                >
                  <span>{t("post.specs.modelDiffers")}</span>
                  <button
                    type="button"
                    className="min-h-11 text-start font-medium text-primary underline"
                    data-testid="post-attr-use-model"
                    data-attr={def.attrKey}
                    onClick={() => {
                      setPrefills((prev) => ({ ...prev, [def.attrKey]: modelValue }));
                      write(def.attrKey, modelValue, true);
                    }}
                  >
                    {t("post.specs.useModelValue")}
                  </button>
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
              {def.attrType === "number" && (bound.min !== null || bound.max !== null) && (
                <p className="text-xs text-muted-foreground" data-testid="post-attr-bounds">
                  {fill(t("post.specs.boundsHint"), {
                    min: bound.min ?? t("post.specs.noBound"),
                    max: bound.max ?? t("post.specs.noBound"),
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
