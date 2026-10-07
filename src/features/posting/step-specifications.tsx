import { Fragment, useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

import { catalogText, catalogWords, drawCatalog, useI18n } from "@/i18n";
import { entityName } from "@/i18n/entity";
import { useCatalogScope } from "./catalog-scope";
import { CatalogWords } from "./catalog-words";

import { resolveBound, settledRanges, yearLabel } from "./attribute-display";
import {
  findHeldOption,
  loadAttributeOptions,
  optionLabel,
  type AttrOption,
} from "./attribute-options";
import { isColourKey, optionSwatch, type ColourSwatch } from "./colour-swatches";
import { Field, controlClass } from "./field";
import { readPostingSchemaAnswer, type AttrDef, type PostingSchema } from "./posting-service";
import { contactRuleApplies, looksLikeContact } from "./contact-like";
import { answerOtherText, answerTokens, multiAnswer } from "./answer-tokens";
import { draftRefusalKey, fill, refusalFor } from "./refusal-text";
import type { Refusal } from "./types";
import { conditionMet } from "./visible-when";
import {
  boundOf,
  chosenList,
  dependencyMap,
  foldFact,
  isEmpty,
  optionBelongsToParent,
  resetAfterMove,
  same,
  selectedValue,
  type FactBound,
} from "./reset-scope";
import type { MessageKey } from "@/i18n";

/** DEC-109 — one headed group of the price page's rows (the door's `deal` lists). */
export interface DealGroup {
  id: string;
  headingKey: MessageKey;
  keys: readonly string[];
}

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

type OptionState = {
  state: "idle" | "loading" | "ready" | "failed";
  list: AttrOption[];
  /** Step 20 — the failed read was the options route's 429. */
  rateLimited?: boolean;
};

const IDLE: OptionState = { state: "idle", list: [] };

/** A list small enough to read up front, so a fold is known before the first tap. */
const EAGER_OPTION_LIMIT = 200;

const SELECT_TYPES = ["single_select", "multi_select"];

function otherText(raw: unknown): string {
  if (raw !== null && typeof raw === "object") {
    const text = (raw as Record<string, unknown>)["text"];
    return typeof text === "string" ? text : "";
  }
  return "";
}

/** INC-434 — the form's provenance per category, kept across remounts (this tab only). */
const PREFILLS_HELD = new Map<string, Record<string, unknown>>();

/**
 * D36 — HELP IS ONE SENTENCE UNTIL IT IS ASKED FOR. A curator's guidance can run
 * to a paragraph, and a paragraph under every field is what makes a 360-pixel
 * form unreadable. The FIRST sentence stays inline; the rest waits behind the
 * (i) tap beside the label. Amharic's own full stop (`።`) ends a sentence here
 * exactly as a full stop does.
 */
function firstSentence(text: string): { head: string; rest: string } {
  // INC-294 — "e.g." / "i.e." / "etc." / "vs." / "approx." / "cf." do not end
  // a sentence. Amharic's `።` is never an abbreviation.
  const terminator = /[.!?…።](?=\s|$)/g;
  for (let match = terminator.exec(text); match !== null; match = terminator.exec(text)) {
    const before = text.slice(0, match.index);
    if (match[0] !== "።" && /(?:^|[^\p{L}])(?:e\.g|i\.e|etc|vs|approx|cf)$/iu.test(before)) {
      continue;
    }
    const end = match.index + 1;
    return { head: text.slice(0, end).trim(), rest: text.slice(end).trim() };
  }
  return { head: text.trim(), rest: "" };
}

export function StepSpecifications({
  categoryId,
  values,
  onChange,
  refusals,
  onFields,
  only = null,
  exclude = null,
  groups = null,
  testId = "post-price-basis",
  around = null,
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
  onFields?: (attrKeys: string[], names: Readonly<Record<string, string>>) => void;
  /**
   * DEC-109 — WHICH ROWS THIS COPY DRAWS. The deal rows (the door's `deal`
   * lists) are asked on the price page: the specifications page passes
   * `exclude=<all four lists>`, the price page mounts the SAME form with
   * `only=<its lists>`, so each control, its option loading and its refusal are
   * one implementation. Every pass still runs over the whole schema.
   */
  only?: readonly string[] | null;
  exclude?: readonly string[] | null;
  /** DEC-109 — headed groups for an `only` copy; a group with no visible row draws nothing. */
  groups?: readonly DealGroup[] | null;
  /** The `only` copy's wrapper id; the price page mounts two copies. */
  testId?: string;
  /**
   * DEC-109 — the price page's one copy draws `node` (the price controls) after
   * the group `after`, so its rows and the price share one read and one report.
   * The node is drawn whatever the rows' state: loading, failed or empty.
   */
  around?: { after: string; node: ReactNode } | null;
}) {
  const { t, entities, language } = useI18n();
  const catalogScope = useCatalogScope();
  const [schema, setSchema] = useState<PostingSchema | null>(null);
  const [failed, setFailed] = useState(false);
  const [rateLimited, setRateLimited] = useState(false);
  const [options, setOptions] = useState<Record<string, OptionState>>({});
  /**
   * INC-240 — WHO WROTE THIS ANSWER. For every detail this screen filled in from
   * a chosen option's facts (D18) we remember the EXACT value we wrote. The value
   * still standing in the draft then tells us who owns it:
   *   - equal to what we wrote → still the model's answer, ours to re-derive;
   *   - different → the seller typed over it, and a parent change never discards
   *     a person's own words (it offers the model's new value instead).
   */
  /**
   * INC-434 — provenance outlives the page: Next and Back remount this form, and
   * a seller who emptied a fact-filled list must not see the fact tick it again.
   */
  const [prefills, setPrefills] = useState<Record<string, unknown>>(() =>
    categoryId === null ? {} : (PREFILLS_HELD.get(categoryId) ?? {}),
  );
  /** What this screen alone saw wrong — the door's own refusal always wins. */
  const [local, setLocal] = useState<Refusal[]>([]);
  /** D36 — the details whose full guidance the (i) tap has opened. */
  const [helpOpen, setHelpOpen] = useState<Record<string, boolean>>({});
  /** D62-2 — string identities, so a fresh array prop never re-fires an effect (I3). */
  const onlyKey = only === null ? null : only.join("\u0000");
  const excludeKey = exclude === null ? "" : exclude.join("\u0000");
  const drawn = (attrKey: string): boolean =>
    (only === null || only.includes(attrKey)) && !(exclude ?? []).includes(attrKey);

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
    setRateLimited(false);
    void readPostingSchemaAnswer(categoryId).then((read) => {
      if (cancelled) return;
      setSchema(read.schema);
      setFailed(read.schema === null);
      setRateLimited(read.rateLimited);
    });
    return () => {
      cancelled = true;
    };
  }, [categoryId]);

  /**
   * D36 — an opened guidance belongs to the definitions that have just been
   * replaced, so it starts over per category.
   */
  useEffect(() => {
    if (categoryId === null) return;
    setHelpOpen({});
  }, [categoryId]);

  /** A definition's name, drawn through the one catalogue renderer (INC-455). */
  const nameOf = (def: AttrDef) =>
    drawCatalog(
      entityName(
        "attribute",
        { id: def.attributeId, nameEn: def.nameEn, nameAm: def.nameAm },
        entities,
      ),
      catalogScope,
    );

  useEffect(() => {
    if (!onFields) return;
    // D24 — only the details the answers actually ask for are reported, so a
    // hidden required field can never hold `Next` shut.
    const shown =
      schema === null
        ? []
        : schema.attributes.filter((def) => conditionMet(def, values) && drawn(def.attrKey));
    // INC-455 — each key travels with its name, so the red summary names the
    // question exactly as its own label does, in the screen's language.
    const names: Record<string, string> = {};
    for (const def of shown) names[def.attrKey] = nameOf(def);
    onFields(
      shown.map((def) => def.attrKey),
      names,
    );
    // `drawn` reads only `only`/`exclude`; `nameOf` reads `entities`/`catalogScope`; all listed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schema, onFields, values, onlyKey, excludeKey, entities, catalogScope]);

  /** One control's list, fetched once, on the tap that opens it (DEC-053). */
  const openOptions = useCallback((def: AttrDef) => {
    setOptions((prev) => {
      const held = prev[def.attrKey] ?? IDLE;
      if (held.state === "loading" || held.state === "ready") return prev;
      return { ...prev, [def.attrKey]: { state: "loading", list: [] } };
    });
    let limited = false;
    void loadAttributeOptions(def.attributeId, {
      onRateLimited: () => {
        limited = true;
      },
    }).then((list) => {
      setOptions((prev) => ({
        ...prev,
        [def.attrKey]:
          list === null
            ? { state: "failed", list: [], rateLimited: limited }
            : { state: "ready", list },
      }));
    });
  }, []);

  /**
   * THE SHORT LISTS ARE READ UP FRONT. A fold must be knowable before the seller
   * taps the child, and a list of a few dozen options costs one cached public
   * read; a big preset (every make and model) stays strictly lazy (DEC-053).
   */
  /**
   * THE LISTS READ UP FRONT, NAMED ONCE (INC-271). The eager set is derived here
   * rather than inside the effect, because TWO things need it: the fetch itself,
   * and the question "is what this form knows about its own folds settled yet?"
   * — the answer that decides whether the trailing cut may run at all.
   *
   * DEC-053 STANDS: a list is still fetched on the tap that opens it. Only two
   * things are known before a tap, and both need the rows themselves:
   *   - a FOLD, which exists only between TWO pickers, and
   *   - a link's `default_value`, which must prefill an empty field.
   * So a single small picker with no default stays lazy, exactly as before.
   */
  const eager = useMemo(() => {
    if (schema === null) return [] as AttrDef[];
    const selects = schema.attributes.filter((def) => SELECT_TYPES.includes(def.attrType));
    const foldsPossible = selects.length > 1;
    return selects.filter((def) => {
      if (def.optionCount === 0 || def.optionCount > EAGER_OPTION_LIMIT) return false;
      // D26 — a colour's swatches ARE the control's face, so they cannot wait for
      // a tap on the picker beside them.
      const colour = def.attrType === "single_select" && isColourKey(def.attrKey);
      return colour || foldsPossible || def.defaultValue !== null;
    });
  }, [schema]);

  useEffect(() => {
    for (const def of eager) openOptions(def);
  }, [eager, openOptions]);

  /**
   * INC-320 — DEC-053 AMENDED: AN ANSWERED LIST IS READ UP FRONT SO ITS ANSWER
   * CAN BE SHOWN. A big list (every model) stays lazy until tapped, but a select
   * that mounts WITH a stored answer and no matching <option> shows its
   * placeholder while the draft still holds the value. Such a list is requested
   * once per key per mount; the effect is keyed on WHICH selects are answered,
   * never on every value change.
   */
  const requestedAnswered = useRef<Set<string>>(new Set());
  const answeredSelects = useMemo(() => {
    if (schema === null) return "";
    return schema.attributes
      .filter((def) => SELECT_TYPES.includes(def.attrType) && !isEmpty(values[def.attrKey]))
      .map((def) => def.attrKey)
      .join("\u0000");
  }, [schema, values]);
  useEffect(() => {
    if (schema === null || answeredSelects === "") return;
    for (const key of answeredSelects.split("\u0000")) {
      if (requestedAnswered.current.has(key)) continue;
      const def = schema.attributes.find((entry) => entry.attrKey === key);
      if (def === undefined) continue;
      requestedAnswered.current.add(key);
      openOptions(def);
    }
  }, [answeredSelects, schema, openOptions]);

  /**
   * INC-336 — A BIG LIST IS READ ONCE A POSSIBLE PARENT IS ANSWERED. Every
   * behaviour that reasons over a dependent list (the fold, DEC-086's mark,
   * DEC-085/INC-244's fill-and-hide, `lockedByModel`, the narrowing) needs its
   * rows, and the schema does not say which sibling a list hangs under. So a
   * list above EAGER_OPTION_LIMIT is requested — once per key per mount, the
   * INC-320 budget — the moment ANOTHER select is answered; with no sibling
   * answered there is no parent to hang under and nothing is read. The limit
   * itself is unchanged.
   */
  const requestedBig = useRef<Set<string>>(new Set());
  useEffect(() => {
    if (schema === null || answeredSelects === "") return;
    const answered = new Set(answeredSelects.split("\u0000"));
    for (const def of schema.attributes) {
      if (!SELECT_TYPES.includes(def.attrType)) continue;
      if (def.optionCount <= EAGER_OPTION_LIMIT) continue;
      if (requestedBig.current.has(def.attrKey)) continue;
      if (requestedAnswered.current.has(def.attrKey)) continue;
      const siblingAnswered = [...answered].some((key) => key !== def.attrKey);
      if (!siblingAnswered) continue;
      requestedBig.current.add(def.attrKey);
      requestedAnswered.current.add(def.attrKey);
      openOptions(def);
    }
  }, [answeredSelects, schema, openOptions]);

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
          owner === null || cover > bestCover || (cover === bestCover && answered && !bestAnswered);
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
   * the answer door's rule in public.validate_listing_attributes; the door
   * remains the authority (F3).
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
   * DEC-086 — AN EXACT-MODEL QUESTION IS REQUIRED WHENEVER IT MATTERS. The mirror
   * of the door's rule in `validate_listing_draft` (step 3): a dependent pick-list
   * whose options carry facts, allowed or bounds is required once its parent is
   * answered and that answer offers two or more child options ('other' counts).
   * The door decides (F3); this only shows the mark and the soft border early.
   */
  const requiredByModel = useCallback(
    (def: AttrDef): boolean => {
      if (!SELECT_TYPES.includes(def.attrType)) return false;
      const parentKey = folds[def.attrKey];
      if (parentKey === undefined) return false;
      const list = allowedListOf(def);
      const speaks = list.some(
        (option) =>
          (option.facts !== null && option.facts !== undefined) ||
          (option.allowed !== null && option.allowed !== undefined) ||
          (option.bounds !== null && option.bounds !== undefined),
      );
      if (!speaks) return false;
      const parentValue = selectedValue(values[parentKey]);
      if (parentValue.trim() === "") return false;
      const children = list.filter(
        (option) =>
          option.parent === parentValue ||
          (option.value === "other" && (option.parent === null || option.parent === "")),
      );
      return children.length >= 2;
    },
    [folds, allowedListOf, values],
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
        const target = definitions.find((entry) => entry.attrKey === key) ?? null;
        const folded = foldFact(raw, target?.attrType ?? null);
        if (folded.kind === "skip") continue;
        if (folded.kind === "hint") {
          hints[key] = folded.value;
          continue;
        }
        prefill[key] = folded.value;
        mine[key] = folded.value;
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
      // INC-288 — the door's vocabulary (`year`, `year±N`, a literal), not Number().
      const own = (raw: string | null): number | null => resolveBound(raw);
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

  /** DEC-085 — the one value a number's effective bounds leave, or `null`. */
  const pinnedNumber = useCallback(
    (def: AttrDef): number | null => {
      if (def.attrType !== "number") return null;
      const bound = boundsOf(def);
      return bound.min !== null && bound.max !== null && bound.min === bound.max ? bound.min : null;
    },
    [boundsOf],
  );

  /** INC-374 — the numbers the chosen options settle as a range; not asked. */
  const settled = useMemo(
    () => settledRanges(definitions, values, allowedListOf),
    [definitions, values, allowedListOf],
  );

  /**
   * DEC-144 rule 1 (Bundle 7 Part A) — WHAT DEPENDS ON WHAT. The one rule lives in
   * reset-scope.ts; this screen hands it the definitions, the loaded option lists,
   * the folds and the definitions' own bounds. A question is a PARENT when some
   * other question depends on it (fold, fact, bound, allowed list, condition) —
   * the identity is a parent like any other (D25b, D46, D47 retired).
   */
  const scopeInput = useMemo(() => {
    const loaded: Record<string, AttrOption[]> = {};
    const ownBounds: Record<string, { min: number | null; max: number | null }> = {};
    for (const def of definitions) {
      ownBounds[def.attrKey] = { min: resolveBound(def.minBound), max: resolveBound(def.maxBound) };
      if (!SELECT_TYPES.includes(def.attrType)) continue;
      if ((options[def.attrKey] ?? IDLE).state !== "ready") continue;
      loaded[def.attrKey] = allowedListOf(def);
    }
    return { definitions, options: loaded, folds, ownBounds };
  }, [definitions, options, allowedListOf, folds]);

  const parents = useMemo(
    () =>
      new Set(
        Object.entries(dependencyMap(scopeInput))
          .filter(([, children]) => children.length > 0)
          .map(([key]) => key),
      ),
    [scopeInput],
  );

  /** D46 — the leaf's identity (card 1): Undo of its move puts the identity itself back. */
  const identityKey = useMemo(
    () =>
      definitions.find((def) => def.attrType === "single_select" && def.cardRank === 1)?.attrKey ??
      null,
    [definitions],
  );

  /** The parent answers as this screen last saw them, to notice a change at all. */
  const parentsSeen = useRef<Record<string, string> | null>(null);
  /** D25 — an undo offer lives for ten seconds and never outlives its own step. */
  const [undoOffer, setUndoOffer] = useState<{
    values: Record<string, unknown>;
    prefills: Record<string, unknown>;
    model: string;
  } | null>(null);
  const skipReset = useRef(false);
  /**
   * D46 — the answers as they stood before a card-1 reset (the identity and every
   * detail it hid included); Undo puts them back. `settledAnswers` is the last
   * pass in which no parent moved.
   */
  const identityBefore = useRef<Record<string, unknown> | undefined>(undefined);
  const settledAnswers = useRef<Record<string, unknown>>({});
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
    /**
     * D62-2 — A BORROWED ROW RECONCILES NOTHING. The price step mounts this form
     * with `only=[basisKey]`; the step-3 form already reconciled every other
     * answer, and a second pass here would see the identity's options arrive as
     * a "moved" root and start the whole form over — the basis just chosen with it.
     */
    if (onlyKey !== null) return;
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
    // INC-329 — joining the parent set is not a move; only a changed answer resets.
    const movedKey =
      before === null
        ? null
        : (Object.keys(now).find((key) => key in before && before[key] !== now[key]) ?? null);
    parentsSeen.current = now;
    // D46 — the identity's previous answer, so Undo can name the old thing again.
    if (movedKey === null) {
      settledAnswers.current = { ...view };
    } else if (now[movedKey] !== "" && !skipReset.current) {
      identityBefore.current =
        movedKey === identityKey && before !== null && before[movedKey] !== ""
          ? {
              ...settledAnswers.current,
              [movedKey]: settledAnswers.current[movedKey] ?? before[movedKey],
            }
          : undefined;
    }
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
       * DEC-144 rule 1 — ONLY WHAT DEPENDS ON THE MOVED ANSWER is re-derived, by
       * the one rule in reset-scope.ts (hidden → nothing; the new option's fact →
       * prefill; the form's untouched answer → the link default or empty; the
       * seller's own → kept when it fits), followed down the chain. Every other
       * question is neither read nor written. INC-257 and INC-245 hold inside it.
       */
      const result = resetAfterMove(scopeInput, movedKey, next, owned);
      for (const key of Object.keys(next)) if (!(key in result.answers)) delete next[key];
      Object.assign(next, result.answers);
      for (const key of Object.keys(owned)) if (!(key in result.prefills)) delete owned[key];
      Object.assign(owned, result.prefills);
      if (result.changed) changed = true;
      if (result.changed) {
        const parentDef = definitions.find((def) => def.attrKey === movedKey) ?? null;
        const option =
          parentDef === null
            ? undefined
            : allowedListOf(parentDef).find((entry) => entry.value === now[movedKey]);
        setUndoOffer({
          values: snapshot,
          prefills: heldPrefills,
          model: option === undefined ? "" : optionLabel(option, entities.lang, catalogScope),
        });
        // INC-245 — a reset empties fields the LINK has a default for, and a
        // default is what an empty field starts from. So the defaults pass below
        // is re-opened by this reset, not spent once per category.
        defaultsAgain.current = true;
      }
    }
    skipReset.current = false;

    /** Keys whose answer the narrowing below cleared in THIS patch. */
    const narrowedOut = new Set<string>();
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
        narrowedOut.add(def.attrKey);
      }
    }

    // 2 — the model's own answers, re-derived from whatever the parent now says.
    for (const [key, written] of Object.entries(owned)) {
      const def = definitions.find((entry) => entry.attrKey === key);
      if (def === undefined) continue;
      // N2 (PW-88) — a value the narrowing just cleared (the link default
      // `per_kg` under Milk's `allowed`) is not the seller's: the fact refills it.
      if (!same(next[key], written) && !narrowedOut.has(key)) continue; // the seller owns it now
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
      if (!same(fact, written) || !same(next[key], fact)) {
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
      // INC-357 (N1) — a settled "other" carries the seller's write-in
      // (`{ value: "other", text }`); it already holds the one answer, so the
      // fill must not flatten it back to a bare "other" and drop the text.
      if (only === "" || selectedValue(next[def.attrKey]) === only) continue;
      next[def.attrKey] = only;
      changed = true;
    }

    /**
     * DEC-085 — ONE ADMISSIBLE NUMBER IS THE ANSWER. When the chosen options pin
     * a number or a year to one value (effective bounds with min = max), the form
     * writes that value, exactly like INC-244's single-option fill, and the row
     * below is hidden like D44. The door still judges it (F3).
     */
    for (const def of definitions) {
      if (def.attrType !== "number") continue;
      if (!conditionMet(def, next)) continue;
      const pin = pinnedNumber(def);
      if (pin === null || same(next[def.attrKey], pin)) continue;
      next[def.attrKey] = pin;
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
    if (JSON.stringify(owned) !== JSON.stringify(prefills)) {
      if (categoryId !== null) PREFILLS_HELD.set(categoryId, owned);
      setPrefills(owned);
    }

    if (!changed) return;
    // I3 — the same patch is never written twice: a reconciliation is identified
    // by what it produces, not by how many times this effect runs.
    const stamp = JSON.stringify(next);
    if (reconcile.current === stamp) return;
    reconcile.current = stamp;
    emit(next, false);
  }, [
    onlyKey,
    categoryId,
    schema,
    definitions,
    folds,
    options,
    values,
    facts,
    narrowing,
    pinnedNumber,
    prefills,
    parents,
    identityKey,
    scopeInput,
    allowedListOf,
    entities.lang,
    catalogScope,
    visibleOptionsOf,
    emit,
  ]);

  /**
   * W6b-2 A3 (INC-347) — A BORROWED ROW STILL OBEYS THE ANSWERS OF OTHER STEPS.
   * The price step draws the basis alone (`only=[basisKey]`) and skips the full
   * reconciliation above (D62-2), but the answers that SPEAK about the basis —
   * a step-3 type's `facts` and `allowed` — are answered on another screen. So
   * the drawn rows get the two passes that apply to them, from the same derived
   * `facts` / `visibleOptionsOf` the step-3 form uses:
   *   - a value the chosen options no longer offer (the link default `per_kg`
   *     under Milk's `allowed`) is replaced by the fact, or cleared;
   *   - an empty drawn row takes the fact when the fact is offered.
   * A value the seller chose that is still offered is never touched.
   */
  useEffect(() => {
    if (schema === null || only === null) return;
    const view = latestRef.current;
    const next = { ...view };
    let changed = false;
    for (const key of only) {
      const def = definitions.find((entry) => entry.attrKey === key);
      if (def === undefined || def.attrType !== "single_select") continue;
      if (!conditionMet(def, view)) continue;
      const held = options[key] ?? IDLE;
      if (held.state !== "ready") continue;
      const offered = new Set(visibleOptionsOf(def).map((option) => option.value));
      const current = selectedValue(view[key]);
      const fact = facts.prefill[key];
      const factValue = typeof fact === "string" && offered.has(fact) ? fact : null;
      const stale = current !== "" && current !== "other" && !offered.has(current);
      if (current === "" || stale) {
        if (factValue !== null) {
          next[key] = factValue;
          changed = true;
        } else if (stale) {
          delete next[key];
          changed = true;
        }
      }
    }
    if (!changed) return;
    const stamp = JSON.stringify(next);
    if (reconcile.current === stamp) return;
    reconcile.current = stamp;
    emit(next, false);
    // `only` is read through its string identity (I3).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onlyKey, schema, definitions, options, values, facts, visibleOptionsOf, emit]);

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
    // D62-2 — the link defaults belong to step 3; the price step never re-offers them.
    if (onlyKey !== null) return;
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
  }, [onlyKey, schema, categoryId, definitions, values, emit]);

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
  /** Part D — a phone number in free text is flagged as typed (advice; the door decides). */
  const judgeText = (def: AttrDef, text: string) => {
    setLocal((prev) => {
      const rest = prev.filter((entry) => entry.field !== def.attrKey);
      if (!contactRuleApplies(def.preset) || !looksLikeContact(text)) return rest;
      return [...rest, { field: def.attrKey, reason: "contactInText" }];
    });
  };

  /** Step 3 — an Other write-in (single or multi) is flagged the same way; no preset governs it. */
  const judgeOther = (def: AttrDef, text: string) => {
    setLocal((prev) => {
      const rest = prev.filter((entry) => entry.field !== def.attrKey);
      if (!looksLikeContact(text)) return rest;
      return [...rest, { field: def.attrKey, reason: "contactInText" }];
    });
  };

  const judgeNumber = (def: AttrDef, value: number | null) => {
    const bound = boundsOf(def);
    setLocal((prev) => {
      const rest = prev.filter((entry) => entry.field !== def.attrKey);
      if (value === null) return rest;
      // Part A — a definition-only bound turns red as it is typed, in the
      // door's own words (`outOfBounds`); the door stays the authority.
      if (!bound.narrowed) {
        const below = bound.min !== null && value < bound.min;
        const above = bound.max !== null && value > bound.max;
        return below || above ? [...rest, { field: def.attrKey, reason: "outOfBounds" }] : rest;
      }
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

  if (around !== null && (failed || schema === null)) {
    return (
      <div className="space-y-5" data-testid={testId} data-options="0">
        {failed ? (
          <p className="text-sm text-destructive" data-testid="post-specs-error">
            {t(rateLimited ? "post.specs.rateLimited" : "post.specs.loadFailed")}
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">{t("post.loading")}</p>
        )}
        {around.node}
      </div>
    );
  }

  if (failed) {
    return (
      <p className="text-sm text-destructive" data-testid="post-specs-error">
        {t(rateLimited ? "post.specs.rateLimited" : "post.specs.loadFailed")}
      </p>
    );
  }

  if (schema === null) {
    return <p className="text-sm text-muted-foreground">{t("post.loading")}</p>;
  }

  const drawnRows = asked.filter((def) => drawn(def.attrKey));
  // D62-2 — the price step's copy draws its one row or nothing at all.
  if (only !== null && drawnRows.length === 0) return around === null ? null : <>{around.node}</>;

  if (only === null && drawnRows.length === 0) {
    return (
      <p className="text-sm text-muted-foreground" data-testid="post-specs-none">
        {t("post.specs.none")}
      </p>
    );
  }

  /**
   * D36 — ONE ROW, WHEREVER IT SITS. The same renderer draws a detail in the
   * first block and inside "More details", so an optional field moved behind the
   * expander is the SAME control with the same anchors and the same refusal.
   */
  const renderDef = (def: AttrDef) => {
    // U4d/B2 — the shared resolver names a definition, never an inline ternary.
    const label = nameOf(def);
    const held = options[def.attrKey] ?? IDLE;
    const refusal = refusalFor(seen, def.attrKey);
    const controlId = `post-attr-${def.attrKey}`;
    /** INC-369 — an owed Other write-in takes the field's id, so Next focuses it. */
    const otherOwed = refusal?.reason === "otherNeedsText";
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
    // DEC-086 — a model question that matters is required from the moment the rule applies.
    const required = def.isRequired || requiredByModel(def);
    const ctrl = controlClass(refusal !== null, required && empty);
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
    // INC-288 — a stated ceiling is honoured as stated (no clamp to next year).
    const nextYear = new Date().getUTCFullYear() + 1;
    const yearCeiling = Math.trunc(bound.max !== null ? bound.max : nextYear);
    const years = yearMode
      ? Array.from({ length: Math.max(0, yearCeiling - yearFloor + 1) }, (_, index) =>
          String(yearCeiling - index),
        )
      : [];
    /**
     * D36 — the guidance, split: one sentence inline, the rest behind (i). The
     * split reads the STORED words, tokens unopened, so a sentence that ends in a
     * token stays whole; each half is then drawn by the one renderer (step 29).
     */
    const help = firstSentence(catalogText(def.helpTextEn ?? "", def.helpTextAm, entities.lang));
    /**
     * D44 (supersedes D35's strip on the form) — A SETTLED ANSWER IS STORED, NOT
     * SHOWN. When the chosen options leave exactly one admissible answer and the
     * reconciliation has written it, the row renders nothing here; the value
     * still travels in the draft, review and preview still show it, and the door
     * judges it unchanged (F3). A prefill-only fact keeps its input.
     */
    // INC-357 (N1) — a settled "other" still owes its text at the door
    // (otherNeedsText), so it is never hidden: it renders as its own write-in box.
    const settledOther = lockedByModel && chosen === "other";
    if (lockedByModel && !empty && !settledOther) return null;
    // DEC-085 — a number or year pinned to one value is stored and hidden the same way.
    const pin = pinnedNumber(def);
    if (pin !== null && same(value, pin)) return null;
    // INC-374 — a number the chosen options settle as a range is not asked; the
    // review, the preview and the detail show the range instead.
    if (def.attrKey in settled) return null;

    return (
      <div
        key={def.attrKey}
        className="space-y-1"
        data-testid="post-spec"
        data-attr={def.attrKey}
        data-parent={parentKey ?? ""}
      >
        {
          <Field
            id={controlId}
            label={label}
            required={required}
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
                onChange={(event) => {
                  judgeText(def, event.target.value);
                  write(def.attrKey, event.target.value);
                }}
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
                    {yearLabel(Number(year), language, t("post.specs.yearEcSuffix"))}
                  </option>
                ))}
              </select>
            )}

            {def.attrType === "number" && !yearMode && (
              /* D36 — THE UNIT IS A SUFFIX, NOT A LINE. It sits inside the input's
                   end edge (a logical inset, so RTL keeps it beside the digits)
                   instead of spending a line of a 360-pixel form on "In km". */
              <div className="relative">
                <input
                  id={controlId}
                  type="number"
                  inputMode="decimal"
                  data-testid="post-attr-control"
                  data-attr={def.attrKey}
                  className={`${ctrl} ${def.unit === null ? "" : "pe-16"}`}
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
                {def.unit !== null && (
                  <span
                    className="pointer-events-none absolute inset-y-0 end-3 flex items-center text-sm text-muted-foreground"
                    data-testid="post-attr-unit"
                    data-attr={def.attrKey}
                  >
                    {catalogWords(def.unit, def.unitAm, entities.lang, catalogScope)}
                  </span>
                )}
              </div>
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

            {def.attrType === "single_select" && !settledOther && (
              <select
                id={otherOwed && chosen === "other" ? undefined : controlId}
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
                {(() => {
                  // INC-466 — a held answer whose option was switched off is drawn
                  // as the current choice by its words; disabled, so never offered.
                  if (chosen === "" || shown.some((option) => option.value === chosen)) return null;
                  const kept = findHeldOption(chosen, [], def.attributeId);
                  return kept === undefined ? null : (
                    <option value={chosen} disabled data-retired="1">
                      {optionLabel(kept, entities.lang, catalogScope)}
                    </option>
                  );
                })()}
                {shown.map((option) => (
                  <option key={option.value} value={option.value}>
                    {optionLabel(option, entities.lang, catalogScope)}
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
                  const label = optionLabel(option, entities.lang, catalogScope);
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
                      {/* D28 — ONE TILE PER KIND: a single fill, a diagonal half
                            and half for a two-tone, and a simple striped tile for
                            a pattern. The inks are the catalogue's own DATA; every
                            frame around them stays a design token (C3). */}
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
                          swatch.kind === "solid"
                            ? { backgroundColor: swatch.ink }
                            : swatch.kind === "duo"
                              ? {
                                  backgroundImage: `linear-gradient(135deg, ${swatch.inks[0]} 0 50%, ${swatch.inks[1]} 50% 100%)`,
                                }
                              : undefined
                        }
                      />
                    </button>
                  );
                })}
              </div>
            )}

            {def.attrType === "single_select" && chosen === "other" && (
              <input
                id={settledOther || otherOwed ? controlId : undefined}
                data-settled={settledOther ? "1" : "0"}
                aria-invalid={otherOwed ? true : undefined}
                data-testid="post-attr-other"
                data-attr={def.attrKey}
                className={ctrl}
                value={otherText(value)}
                maxLength={120}
                placeholder={t("post.specs.otherPlaceholder")}
                onChange={(event) => {
                  judgeOther(def, event.target.value);
                  write(
                    def.attrKey,
                    event.target.value === ""
                      ? { value: "other" }
                      : { value: "other", text: event.target.value },
                  );
                }}
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
                {held.state === "loading" ? t("post.specs.optionsLoading") : t("post.specs.choose")}
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
                              multiAnswer(
                                event.target.checked
                                  ? [...list, option.value]
                                  : list.filter((entry) => entry !== option.value),
                                answerOtherText(value),
                              ),
                              option.value !== "other",
                            )
                          }
                        />
                        <span>{optionLabel(option, entities.lang, catalogScope)}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            )}

            {/* INC-370 — a multi-choice Other gets its own write-in box. */}
            {def.attrType === "multi_select" && chosenList(value).includes("other") && (
              <input
                id={otherOwed ? controlId : undefined}
                aria-invalid={otherOwed ? true : undefined}
                data-testid="post-attr-other"
                data-attr={def.attrKey}
                className={ctrl}
                value={answerOtherText(value)}
                maxLength={120}
                placeholder={t("post.specs.otherPlaceholder")}
                onChange={(event) => {
                  judgeOther(def, event.target.value);
                  write(def.attrKey, multiAnswer(chosenList(value), event.target.value));
                }}
              />
            )}

            {/* INC-244 — a locked answer says whose answer it is. */}
            {lockedByModel && !settledOther && (
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
              <p
                className="text-xs text-destructive"
                data-testid="post-attr-options-error"
                data-attr={def.attrKey}
                data-reason={held.rateLimited ? "rateLimited" : "failed"}
              >
                {t(held.rateLimited ? "post.specs.rateLimited" : "post.specs.optionsFailed")}
              </p>
            )}

            {/* D36 — THE GUIDANCE IS ONE SENTENCE UNTIL IT IS ASKED FOR. The first
                  sentence stays inline; the rest opens on the (i) tap beside it.
                  Advice, never the verdict: the door decides and its refusal lands
                  below. */}
            {help.head !== "" && (
              <p className="text-xs text-muted-foreground" data-testid="post-attr-help">
                <span>
                  <CatalogWords text={help.head} />
                </span>
                {help.rest !== "" && (
                  <>
                    {" "}
                    <button
                      type="button"
                      className="font-medium text-primary underline"
                      data-testid="post-attr-help-more"
                      data-attr={def.attrKey}
                      aria-expanded={helpOpen[def.attrKey] === true}
                      aria-label={t("post.specs.helpMore")}
                      onClick={() =>
                        setHelpOpen((prev) => ({
                          ...prev,
                          [def.attrKey]: prev[def.attrKey] !== true,
                        }))
                      }
                    >
                      {t("post.specs.helpMoreMark")}
                    </button>
                    {helpOpen[def.attrKey] === true && (
                      <span data-testid="post-attr-help-rest">
                        {" "}
                        <CatalogWords text={help.rest} />
                      </span>
                    )}
                  </>
                )}
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
        }
      </div>
    );
  };

  /**
   * INC-271 — THE FORM SAYS WHEN ITS OPTION LISTS HAVE SETTLED (`data-options`),
   * so a reader waits on that word rather than a clock. D41 removed the trailing
   * "More details" cut this once gated: every asked row renders, in display
   * order (INC-269), from the first frame.
   */
  const optionsSettled = eager.every((def) => {
    const state = (options[def.attrKey] ?? IDLE).state;
    return state === "ready" || state === "failed";
  });

  if (only !== null) {
    return (
      <div className="space-y-5" data-testid={testId} data-options={optionsSettled ? "1" : "0"}>
        {groups === null
          ? drawnRows.map(renderDef)
          : groups.map((group) => {
              // DEC-109 — a group with no visible row draws nothing, heading included.
              const rows = drawnRows.filter((def) => group.keys.includes(def.attrKey));
              const after = around !== null && around.after === group.id ? around.node : null;
              if (rows.length === 0)
                return after === null ? null : <Fragment key={group.id}>{after}</Fragment>;
              return (
                <Fragment key={group.id}>
                  <section
                    className="space-y-4"
                    data-testid={`post-price-group-${group.id}`}
                    aria-label={t(group.headingKey)}
                  >
                    <h3 className="text-sm font-semibold text-foreground">{t(group.headingKey)}</h3>
                    {rows.map(renderDef)}
                  </section>
                  {after}
                </Fragment>
              );
            })}
      </div>
    );
  }

  return (
    <div className="space-y-5" data-testid="post-specs" data-options={optionsSettled ? "1" : "0"}>
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
              // D46 — undoing an identity reset restores the identity itself too.
              const restored = identityBefore.current ?? offer.values;
              identityBefore.current = undefined;
              onChange(restored, true);
              setUndoOffer(null);
            }}
          >
            {t("post.specs.resetUndo")}
          </button>
        </p>
      )}

      {/* D24 — only the details this answer set asks for are on screen. */}
      {/* D41 — every asked row, open, in display order: nothing waits behind a tap. */}
      <div className="space-y-5">{drawnRows.map(renderDef)}</div>
    </div>
  );
}

export default StepSpecifications;

/** Pure pieces of this screen, one export so the module stays a component file (unit tests). */
export const stepSpecificationsPure = { firstSentence, foldFact };
