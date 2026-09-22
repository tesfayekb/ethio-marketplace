import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { catalogText, useI18n } from "@/i18n";
import { entityName } from "@/i18n/entity";

import { loadAttributeOptions, optionLabel, type AttrOption } from "./attribute-options";
import { colourSwatch, isColourKey } from "./colour-swatches";
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
 *     Series ← Brand). INC-260 also accepts the published parent-prefixed value
 *     shape (`byd_seagull`) when the child list is reached through a surfaced
 *     leaf. With no parent value the child is closed and says which answer it is
 *     waiting for; a child value that no longer fits is cleared the moment the
 *     parent changes, never left to be refused later.
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

/**
 * INC-247 — A BOUND WRITTEN AS TEXT IS STILL A BOUND. A fact that arrives through
 * the attributes FILE carries its numbers as the file wrote them (`"1968"`), and
 * reading only JSON numbers here was how a model's floor was quietly ignored and
 * the picker offered years the catalogue had already ruled out. A numeric string
 * is read as the number it is; anything that is not a number is not a bound.
 */
function boundOf(raw: unknown): FactBound | null {
  if (raw === null || typeof raw !== "object" || Array.isArray(raw)) return null;
  const row = raw as Record<string, unknown>;
  const num = (key: string): number | null => {
    const held = row[key];
    if (typeof held === "number") return Number.isFinite(held) ? held : null;
    if (typeof held !== "string" || held.trim() === "") return null;
    const parsed = Number(held);
    return Number.isFinite(parsed) ? parsed : null;
  };
  const min = num("min");
  const max = num("max");
  if (min === null && max === null) return null;
  return { min, max };
}

function optionStems(value: string): string[] {
  const parts = value.split("_").filter((part) => part !== "");
  const out = [value];
  for (let index = 1; index < parts.length; index += 1) out.push(parts.slice(index).join("_"));
  return out;
}

function optionBelongsToParent(option: AttrOption, parentValue: string): boolean {
  if (option.parent === parentValue) return true;
  return optionStems(option.value).some((stem) => stem.startsWith(`${parentValue}_`));
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

  /**
   * INC-257 — EVERY PATCH IS BUILT ON THE LATEST ANSWERS, NEVER ON THE PROP.
   *
   * Three passes on this screen write answers — the hidden-answer sweep, the
   * reconciliation (D25/D18) and the link defaults (M-MAINT-2 §12) — and React
   * runs all three in the SAME commit, where the `values` prop is still the one
   * that opened it. Each used to spread that stale prop, so the LAST pass erased
   * what an earlier one had just written: a fact prefilled onto a sibling the
   * same selection had unhidden (Treadmill → Power Source) was wiped by the
   * defaults pass before it could ever reach the door, and the published listing
   * showed the detail empty. The latest answers live here instead — the prop
   * whenever it moves, our own patch whenever we write one — so the passes
   * COMPOSE rather than overwrite one another.
   */
  const latestRef = useRef(values);
  const propSeen = useRef(values);
  if (propSeen.current !== values) {
    propSeen.current = values;
    latestRef.current = values;
  }
  const emit = useCallback(
    (next: Record<string, unknown>, immediate = false) => {
      latestRef.current = next;
      onChange(next, immediate);
    },
    [onChange],
  );

  useEffect(() => {
    if (categoryId === null) return;
    let cancelled = false;
    setFailed(false);
    /**
     * INC-243 — A NEW READ ASKS AGAIN. The lists held for the previous category
     * are dropped with the schema that named them, so a form never renders one
     * category's options against another's definitions, and the re-open pays a
     * conditional request the edge answers with 304 when nothing moved.
     */
    setOptions({});
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
      // D26 — a colour's swatches ARE the control's face, so they cannot wait for
      // a tap on the picker beside them.
      const colour = def.attrType === "single_select" && isColourKey(def.attrKey);
      if (!colour && !foldsPossible && def.defaultValue === null) continue;
      openOptions(def);
    }
  }, [schema, openOptions]);

  /** A written answer, debounced by the draft; an absent answer drops its key. */
  const write = useCallback(
    (attrKey: string, value: unknown, immediate = false) => {
      const next = { ...latestRef.current };
      if (isEmpty(value)) delete next[attrKey];
      else next[attrKey] = value;
      emit(next, immediate);
    },
    [emit],
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
    const view = latestRef.current;
    const shown = new Set(
      definitions.filter((def) => conditionMet(def, view)).map((def) => def.attrKey),
    );
    const orphans = definitions.filter(
      (def) => !shown.has(def.attrKey) && !isEmpty(view[def.attrKey]),
    );
    if (orphans.length === 0) return;
    const next = { ...view };
    for (const def of orphans) delete next[def.attrKey];
    emit(next, false);
  }, [asked, definitions, values, emit]);

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
   * file header).
   *
   * INC-260 (follow-up) — THE OWNER IS THE LIST THAT COVERS THE PARENTS, NOT THE
   * FIRST LIST TO SHARE ONE VALUE. At Travel › Vehicle Hire the first question
   * (`hire_vehicle_type`) offers `other`, and `model-cars` files a handful of
   * models under the parent `other` — so a first-match search named that question
   * the model's parent (1 of 45 parents covered) instead of `make-cars` (43 of
   * 45), and every make left the model list empty. The owner is now the candidate
   * covering the MOST of the child's parent values, so an incidental `other`
   * cannot outrank a real parent list; ties are broken by the sibling that is
   * already answered with one of those parents, then by form order.
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
      let owner: AttrDef | null = null;
      let bestCover = 0;
      let bestAnswered = false;
      for (const other of candidates) {
        const cover = allowedListOf(other).filter((option) => parents.has(option.value)).length;
        if (cover === 0) continue;
        const own = selectedValue(values[other.attrKey]);
        const answered = own !== "" && parents.has(own);
        const better =
          owner === null ||
          cover > bestCover ||
          (cover === bestCover && answered && !bestAnswered);
        if (!better) continue;
        owner = other;
        bestCover = cover;
        bestAnswered = answered;
      }
      if (owner !== null) out[def.attrKey] = owner.attrKey;
    }
    return out;
  }, [definitions, allowedListOf, values]);

  /**
   * INC-244 — WHAT THE CHOSEN OPTIONS RULE OUT. An option's `allowed` names
   * sibling details and the ONLY answers they may hold under it
   * (`{ fuel: ["electric"] }`). Every chosen option of every picker contributes,
   * and two contributions for the same sibling meet at their INTERSECTION — the
   * stricter reading, the one the door itself applies. This is the mirror of
   * `attr_allowed_check`; the door remains the authority (F3).
   */
  const narrowing = useMemo(() => {
    const out: Record<string, string[]> = {};
    for (const def of definitions) {
      if (!SELECT_TYPES.includes(def.attrType)) continue;
      const picked = selectedValue(values[def.attrKey]);
      if (picked === "") continue;
      const option = allowedListOf(def).find((entry) => entry.value === picked);
      const allowed = option?.allowed;
      if (allowed === null || allowed === undefined) continue;
      for (const [key, list] of Object.entries(allowed)) {
        const held = out[key];
        out[key] = held === undefined ? [...list] : held.filter((entry) => list.includes(entry));
      }
    }
    return out;
  }, [definitions, values, allowedListOf]);

  /** The options a control may actually offer: the link's subset, the fold, then
   * whatever the chosen options allow (INC-244). */
  const visibleOptionsOf = useCallback(
    (def: AttrDef): AttrOption[] => {
      const only = narrowing[def.attrKey];
      let list = allowedListOf(def);
      if (only !== undefined) list = list.filter((option) => only.includes(option.value));
      const parentKey = folds[def.attrKey];
      if (parentKey === undefined) return list;
      const parentValue = selectedValue(values[parentKey]);
      if (parentValue === "") return [];
      return list.filter((option) => optionBelongsToParent(option, parentValue));
    },
    [allowedListOf, folds, values, narrowing],
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
    /**
     * D27 — A FACT NEVER TICKS A BOX FOR THE SELLER. A boolean detail is an
     * ATTESTATION: the seller states it, nobody states it for them. What the
     * catalogue knows about the model is shown BESIDE the unticked box as a hint,
     * so the seller can agree in one tap without the form having agreed already.
     */
    const hints: Record<string, unknown> = {};
    for (const def of definitions) {
      if (!SELECT_TYPES.includes(def.attrType)) continue;
      const picked = selectedValue(values[def.attrKey]);
      if (picked === "") continue;
      const option = allowedListOf(def).find((entry) => entry.value === picked);
      if (option === undefined) continue;
      /**
       * R-SW / INC-249 — A BOUND LIVES IN `bounds`, NOT IN `facts`. The catalogue's
       * own option records (DEC-050) carry a SEPARATE `bounds` object beside
       * `facts` — `{"bounds": {"year": {"min": 2020}}}` on BYD Han — and this
       * screen only ever looked inside `facts`, so every real model's floor was
       * ignored and a 2020 car offered 1900. Both places are read now: `bounds`
       * first, because it is where the door writes them.
       */
      for (const [key, raw] of Object.entries(option.bounds ?? {})) {
        const bound = boundOf(raw);
        if (bound !== null) (bounds[key] ??= []).push(bound);
      }
      const mine: Record<string, unknown> = {};
      for (const [key, raw] of Object.entries(option.facts ?? {})) {
        const bound = boundOf(raw);
        if (bound !== null) {
          (bounds[key] ??= []).push(bound);
          continue;
        }
        if (typeof raw !== "string" && typeof raw !== "number" && typeof raw !== "boolean")
          continue;
        const target = definitions.find((entry) => entry.attrKey === key) ?? null;
        if (target !== null && target.attrType === "boolean") {
          hints[key] = raw;
          continue;
        }
        prefill[key] = raw;
        mine[key] = raw;
      }
      byOwner[def.attrKey] = mine;
    }
    return { prefill, bounds, byOwner, hints };
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
        // R-SW — a bound is an option speaking about a detail too (the year).
        for (const key of Object.keys(option.bounds ?? {})) out.add(key);
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
      if (
        list.some(
          (option) =>
            Object.keys(option.facts ?? {}).length > 0 ||
            Object.keys(option.bounds ?? {}).length > 0,
        )
      )
        out.add(def.attrKey);
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
  /** INC-245 — a reset re-opens the link defaults for the fields it emptied. */
  const defaultsAgain = useRef(false);

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
   *
   * INC-257 — VISIBILITY IS DECIDED BEFORE A FACT IS APPLIED, against the answers
   * AS THIS SELECTION LEAVES THEM (`next`), not as they were before it. The same
   * choice that carries the fact often also UNHIDES its target (Treadmill unhides
   * Power Source and says it is electric), so a fact judged against the previous
   * answers would be dropped for a detail that is now on screen. The rule runs
   * both ways: a target the choice UNHID receives its prefill, a target the choice
   * HID stores nothing (R3b), and the final sweep below drops whatever the last
   * word of this patch leaves unasked.
   */
  const reconcile = useRef("");
  useEffect(() => {
    if (schema === null) return;
    const view = latestRef.current;
    const next = { ...view };
    let changed = false;
    const owned: Record<string, unknown> = { ...prefills };
    /** D24 — is this detail asked for, given the answers this patch now holds? */
    const shown = (key: string): boolean => {
      const def = definitions.find((entry) => entry.attrKey === key) ?? null;
      return def === null ? false : conditionMet(def, next);
    };

    // 0 — A PARENT CHANGED: everything it speaks about is re-derived from it.
    const now: Record<string, string> = {};
    for (const key of parents) now[key] = selectedValue(view[key]);
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
      const snapshot = { ...view };
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
        const keyDef = definitions.find((def) => def.attrKey === key) ?? null;
        if (keyDef === null) continue;
        /**
         * INC-257 — A DETAIL THIS CHOICE HID STORES NOTHING (R3b). The condition is
         * read from `next`, which already holds the answer just chosen, so the
         * question is "is it asked NOW" and not "was it asked before".
         */
        if (!conditionMet(keyDef, next)) {
          if (!isEmpty(next[key])) {
            delete next[key];
            changed = true;
          }
          delete owned[key];
          continue;
        }
        const fact = source[key];
        if (fact === undefined) {
          /**
           * INC-245 — A DEFAULT IS WHAT AN EMPTY FIELD STARTS FROM. The reset empties
           * the field, so the LINK's own opening answer takes the place the fact would
           * have had; with no default the field is simply empty again.
           */
          const opening = keyDef.defaultValue ?? undefined;
          if (opening === undefined) {
            if (!isEmpty(next[key])) {
              delete next[key];
              changed = true;
            }
          } else if (!same(next[key], opening)) {
            next[key] = opening;
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
        // INC-245 — a reset empties fields the LINK has a default for, and a
        // default is what an empty field starts from. So the defaults pass below
        // is re-opened by this reset, not spent once per category.
        defaultsAgain.current = true;
      }
    }
    skipReset.current = false;

    for (const def of definitions) {
      if (!SELECT_TYPES.includes(def.attrType)) continue;
      const parentKey = folds[def.attrKey];
      // INC-244 — an answer outside what the chosen options allow is cleared here
      // too, never left for the door to refuse at the end.
      if (
        parentKey === undefined &&
        def.allowedOptions === null &&
        narrowing[def.attrKey] === undefined
      ) {
        continue;
      }
      const held = options[def.attrKey] ?? IDLE;
      if (held.state !== "ready") continue;
      const offered = new Set(visibleOptionsOf(def).map((option) => option.value));
      const held_value = view[def.attrKey];
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
      // INC-257 — a detail the answers no longer ask for keeps nothing, whoever
      // wrote it: the sweep below would drop it anyway, and our provenance must
      // not claim an answer that is not on screen.
      if (fact === undefined || !shown(key)) {
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

    // 3 — a fact fills a detail that is still empty AND asked for (INC-257): the
    // very selection that carries the fact is what unhid its target, so the
    // condition is judged on `next`, after this patch's own answers.
    for (const [key, value] of Object.entries(facts.prefill)) {
      if (key in owned) continue;
      const def = definitions.find((entry) => entry.attrKey === key);
      if (def === undefined) continue;
      if (!isEmpty(next[key])) continue;
      if (!conditionMet(def, next)) continue;
      owned[key] = value;
      next[key] = value;
      changed = true;
    }

    /**
     * INC-244 — ONE ALLOWED ANSWER IS THE ANSWER. When the chosen options leave a
     * single-select picker with exactly one admissible value, the form fills it and
     * the control below says so and locks: there is nothing to choose, and leaving
     * it empty would only earn a refusal at the door.
     */
    for (const def of definitions) {
      if (def.attrType !== "single_select") continue;
      if (narrowing[def.attrKey] === undefined) continue;
      if (!conditionMet(def, next)) continue;
      const held = options[def.attrKey] ?? IDLE;
      if (held.state !== "ready") continue;
      const offered = visibleOptionsOf(def);
      if (offered.length !== 1) continue;
      const only = offered[0]?.value ?? "";
      if (only === "" || same(next[def.attrKey], only)) continue;
      next[def.attrKey] = only;
      changed = true;
    }

    /**
     * INC-257 — THE LAST WORD IS VISIBILITY. Every pass above may have moved an
     * answer a condition reads, so the patch is swept once at the end: a detail
     * this patch leaves unasked carries nothing out of this screen, and the door
     * (validate_listing_attributes) drops it too, so what the seller sees and what
     * is saved are the same thing (F3, D24).
     */
    for (const def of definitions) {
      if (isEmpty(next[def.attrKey])) continue;
      if (conditionMet(def, next)) continue;
      delete next[def.attrKey];
      delete owned[def.attrKey];
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
    emit(next, false);
  }, [
    schema,
    definitions,
    folds,
    options,
    values,
    facts,
    narrowing,
    prefills,
    parents,
    roots,
    dependents,
    allowedListOf,
    entities.lang,
    visibleOptionsOf,
    emit,
  ]);

  /**
   * M-MAINT-2 §12 / INC-245 — THE LINK's DEFAULT FILLS AN EMPTY FIELD: on the
   * first render of the step for this category, and again after a make or model
   * reset has emptied fields (D25/D25b). It never overwrites an answer that is
   * there, so a seller who cleared a field between those two moments keeps it
   * clear.
   */
  const defaulted = useRef<string | null>(null);
  useEffect(() => {
    if (schema === null || categoryId === null) return;
    /**
     * INC-257 — THE PASS IS SPENT PER SET OF ASKED FIELDS, not once per category.
     * A default is only written into a field the seller is asked for, so a field a
     * later answer UNHIDES (voltage, once the power source is electric) must get
     * its turn when it appears — while a field already offered keeps whatever the
     * seller has since done to it, because its own entry in this stamp has not
     * moved.
     */
    const stamp = [
      categoryId,
      ...definitions
        .filter(
          (def) =>
            def.defaultValue !== null &&
            def.defaultValue !== undefined &&
            conditionMet(def, latestRef.current),
        )
        .map((def) => def.attrKey)
        .sort(),
    ].join("|");
    if (defaulted.current === stamp && !defaultsAgain.current) return;
    defaulted.current = stamp;
    defaultsAgain.current = false;
    const next = { ...latestRef.current };
    let changed = false;
    for (const def of definitions) {
      if (def.defaultValue === null || def.defaultValue === undefined) continue;
      if (!isEmpty(next[def.attrKey])) continue;
      // INC-257 — a default belongs to a field the seller is ASKED for. Voltage's
      // 220v used to be written into a hidden field on mount, which both saved an
      // unasked answer and, built on the stale prop, erased the fact the same
      // commit had just prefilled onto Power Source.
      if (!conditionMet(def, next)) continue;
      next[def.attrKey] = def.defaultValue;
      changed = true;
    }
    if (changed) emit(next, false);
  }, [schema, categoryId, definitions, values, emit]);

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
    entityName(
      "attribute",
      { id: def.attributeId, nameEn: def.nameEn, nameAm: def.nameAm },
      entities,
    );

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
        /**
         * D28 / M-SWATCH — THE RECORD'S OWN SWATCH FIRST. `optionSwatch` reads the
         * option's declared `swatch` cell (one hex, two for a two-tone, or
         * `pattern:<name>`) and falls back to the value's name only when the cell
         * is absent (INC-259). Nothing resolves → no tray at all.
         */
        const colourOptions =
          def.attrType === "single_select" && isColourKey(def.attrKey)
            ? shown
                .map((option) => ({ option, swatch: optionSwatch(option) }))
                .filter(
                  (entry): entry is { option: AttrOption; swatch: ColourSwatch } =>
                    entry.swatch !== null,
                )
            : [];
        /**
         * INC-244 — SET BY THE MODEL. The chosen options leave exactly one
         * admissible answer, so the reconciliation above has already written it and
         * the picker has nothing to offer: it shows that answer, says where it came
         * from and takes no taps.
         */
        const lockedByModel =
          def.attrType === "single_select" &&
          narrowing[def.attrKey] !== undefined &&
          shown.length === 1;
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

              {/*
               * D27 — THE BOX SAYS WHAT IT IS, AND NOBODY TICKS IT BUT THE SELLER.
               * The box carries the DETAIL's own name (an attestation the seller
               * recognises), and what the catalogue knows about the chosen model is
               * a hint beside it — never a tick already made on their behalf.
               */}
              {def.attrType === "boolean" && (
                <div className="space-y-1">
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
                    <span>{label}</span>
                  </label>
                  {facts.hints[def.attrKey] === true && (
                    <p
                      className="text-xs text-muted-foreground"
                      data-testid="post-attr-fact-hint"
                      data-attr={def.attrKey}
                    >
                      {fill(t("post.specs.factHint"), { value: label })}
                    </p>
                  )}
                </div>
              )}

              {def.attrType === "single_select" && (
                <select
                  id={controlId}
                  data-testid="post-attr-control"
                  data-attr={def.attrKey}
                  data-options={held.state}
                  data-waiting={waiting ? "1" : "0"}
                  data-locked={lockedByModel ? "1" : "0"}
                  disabled={waiting || lockedByModel}
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

              {/* D26 / INC-259 — THE COLOUR IS SHOWN. The picker above stays (it is
                  the accessible control and the door's own vocabulary); swatches are
                  shown only for options that resolve to a colour or pattern, so an
                  unrelated list never becomes a tray of empty circles. */}
              {colourOptions.length > 0 && (
                <div
                  className="flex flex-wrap gap-2"
                  data-testid="post-attr-swatches"
                  data-attr={def.attrKey}
                >
                  {colourOptions.map(({ option, swatch }) => {
                    const label = optionLabel(option, entities.lang);
                    return (
                      <button
                        key={option.value}
                        type="button"
                        data-testid="post-attr-swatch"
                        data-attr={def.attrKey}
                        data-value={option.value}
                        data-swatch={swatch.kind}
                        aria-pressed={chosen === option.value}
                        title={label}
                        aria-label={label}
                        className={
                          "flex min-h-11 min-w-11 items-center justify-center rounded-md border p-1 " +
                          (chosen === option.value
                            ? "border-primary ring-2 ring-ring"
                            : "border-input")
                        }
                        onClick={() => {
                          if (option.value === "other") {
                            write(def.attrKey, { value: "other", text: otherText(value) }, false);
                            return;
                          }
                          write(def.attrKey, option.value, true);
                        }}
                      >
                        <span
                          aria-hidden="true"
                          data-testid="post-attr-swatch-ink"
                          className={
                            "block size-7 rounded-full border border-border " +
                            (swatch.kind === "pattern"
                              ? "bg-[repeating-linear-gradient(45deg,var(--muted)_0_4px,var(--border)_4px_8px)]"
                              : "")
                          }
                          style={
                            swatch.kind === "solid" ? { backgroundColor: swatch.ink } : undefined
                          }
                        />
                      </button>
                    );
                  })}
                </div>
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

              {/* INC-244 — a locked answer says whose answer it is. */}
              {lockedByModel && (
                <p
                  className="text-xs text-muted-foreground"
                  data-testid="post-attr-set-by-model"
                  data-attr={def.attrKey}
                >
                  {t("post.specs.setByModel")}
                </p>
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
              {catalogText(def.helpTextEn ?? "", def.helpTextAm, entities.lang) !== "" && (
                <p className="text-xs text-muted-foreground" data-testid="post-attr-help">
                  {catalogText(def.helpTextEn ?? "", def.helpTextAm, entities.lang)}
                </p>
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
                  {fill(t("post.specs.unitHint"), {
                    unit: catalogText(def.unit, null, entities.lang),
                  })}
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
