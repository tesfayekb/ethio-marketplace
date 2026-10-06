import { answerTokens } from "./answer-tokens";
import type { AttrOption } from "./attribute-options";
import type { AttrDef } from "./posting-service";
import { conditionMet } from "./visible-when";

/**
 * Bundle 7 Part A — DEC-144 RULE 1: A CHANGED ANSWER RESETS ONLY WHAT DEPENDS ON IT.
 *
 * DEPENDS ON. Question D depends on question P when P is D's fold owner, an option
 * of P carries a fact, a bound or an `allowed` list for D, or D's show-when
 * condition names P. Nothing else makes a dependency — not the step, not form
 * order, not a card rank, not being the identity (D25b, D46, D47 retired; DEC-139
 * absorbed).
 *
 * WHAT A MOVE OF P DOES, for each D that depends on P, in form order:
 *   1 D is not asked under the answers as they now stand → D stores nothing;
 *   2 the NEW option of P carries a fact for D → D takes it as a prefill;
 *   3 D holds what the form wrote and the seller left → it goes with the old
 *     choice: the link default, or empty;
 *   4 D holds the seller's own answer → kept when it fits what the catalogue now
 *     states (offered options, bounds in force), cleared when it does not.
 * FOLLOWED THROUGH: a D whose answer the pass changed is itself treated as moved,
 * once per pass. A question outside that chain is not read and not written.
 *
 * Pure: no React. step-specifications.tsx calls it and keeps no second copy.
 */

const SELECT_TYPES = ["single_select", "multi_select"];

export interface ScopeInput {
  /** The leaf's definitions, in form order. */
  definitions: AttrDef[];
  /** Each select's options as the link offers them (the link's subset), when loaded. */
  options: Record<string, AttrOption[]>;
  /** Child → fold owner. */
  folds: Record<string, string>;
  /** Each definition's own bounds, resolved (the door's vocabulary). */
  ownBounds: Record<string, { min: number | null; max: number | null }>;
}

export interface FactBound {
  min: number | null;
  max: number | null;
}

/** The single-select value the door accepts: a plain value, or `other` + text. */
export function selectedValue(raw: unknown): string {
  if (typeof raw === "string") return raw;
  if (raw !== null && typeof raw === "object") {
    const value = (raw as Record<string, unknown>)["value"];
    return typeof value === "string" ? value : "";
  }
  return "";
}

/** Part O — the tokens of a multi-choice answer, Other included (one reader). */
export function chosenList(raw: unknown): string[] {
  return Array.isArray(raw) ? answerTokens(raw) : [];
}

export function isEmpty(value: unknown): boolean {
  return (
    value === undefined ||
    value === null ||
    value === "" ||
    (Array.isArray(value) && value.length === 0)
  );
}

/** INC-240 — two answers are the same answer when their SHAPE matches. */
export function same(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (isEmpty(a) && isEmpty(b)) return true;
  return JSON.stringify(a ?? null) === JSON.stringify(b ?? null);
}

/**
 * INC-434 — ONE FOLD FOR ONE FACT. A scalar fact prefills its target; a LIST fact
 * prefills a multi_select target; a boolean target stays a hint (D27).
 */
export function foldFact(
  raw: unknown,
  targetType: string | null,
): { kind: "prefill" | "hint"; value: unknown } | { kind: "skip" } {
  if (Array.isArray(raw)) {
    const list = raw.filter((entry): entry is string => typeof entry === "string" && entry !== "");
    if (targetType !== "multi_select" || list.length === 0) return { kind: "skip" };
    return { kind: "prefill", value: list };
  }
  if (typeof raw !== "string" && typeof raw !== "number" && typeof raw !== "boolean") {
    return { kind: "skip" };
  }
  if (targetType === "boolean") return { kind: "hint", value: raw };
  return { kind: "prefill", value: raw };
}

/** INC-247 — a bound written as text is still a bound. */
export function boundOf(raw: unknown): FactBound | null {
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

export function optionBelongsToParent(option: AttrOption, parentValue: string): boolean {
  if (option.parent === parentValue) return true;
  return optionStems(option.value).some((stem) => stem.startsWith(`${parentValue}_`));
}

/** The keys a definition's show-when condition names. */
function conditionKeys(def: AttrDef): string[] {
  const condition = def.visibleWhen;
  if (condition === null) return [];
  return condition.and === undefined ? [condition.key] : [condition.key, condition.and.key];
}

/** P → the questions that depend on P, in form order (the five clauses above). */
export function dependencyMap(input: ScopeInput): Record<string, string[]> {
  const sets: Record<string, Set<string>> = {};
  const add = (parent: string, child: string) => {
    if (parent === child) return;
    (sets[parent] ??= new Set()).add(child);
  };
  for (const [child, owner] of Object.entries(input.folds)) add(owner, child);
  for (const def of input.definitions) {
    for (const key of conditionKeys(def)) add(key, def.attrKey);
    if (!SELECT_TYPES.includes(def.attrType)) continue;
    for (const option of input.options[def.attrKey] ?? []) {
      for (const key of Object.keys(option.facts ?? {})) add(def.attrKey, key);
      for (const key of Object.keys(option.bounds ?? {})) add(def.attrKey, key);
      for (const key of Object.keys(option.allowed ?? {})) add(def.attrKey, key);
    }
  }
  const known = new Set(input.definitions.map((def) => def.attrKey));
  const out: Record<string, string[]> = {};
  for (const [parent, children] of Object.entries(sets)) {
    out[parent] = input.definitions
      .map((def) => def.attrKey)
      .filter((key) => children.has(key) && known.has(key));
  }
  return out;
}

function chosenOption(
  input: ScopeInput,
  key: string,
  answers: Record<string, unknown>,
): AttrOption | undefined {
  const picked = selectedValue(answers[key]);
  if (picked === "") return undefined;
  return (input.options[key] ?? []).find((option) => option.value === picked);
}

/** The values a choice may hold under these answers, or `null` when no list is known. */
function offeredValues(
  input: ScopeInput,
  def: AttrDef,
  answers: Record<string, unknown>,
): Set<string> | null {
  const held = input.options[def.attrKey];
  if (held === undefined) return null;
  let list = held;
  for (const other of input.definitions) {
    if (!SELECT_TYPES.includes(other.attrType)) continue;
    const allowed = chosenOption(input, other.attrKey, answers)?.allowed?.[def.attrKey];
    if (allowed !== undefined) list = list.filter((option) => allowed.includes(option.value));
  }
  const owner = input.folds[def.attrKey];
  if (owner !== undefined) {
    const parentValue = selectedValue(answers[owner]);
    list = parentValue === "" ? [] : list.filter((o) => optionBelongsToParent(o, parentValue));
  }
  return new Set(list.map((option) => option.value));
}

/** The bounds in force for a number under these answers. */
function boundsIn(input: ScopeInput, key: string, answers: Record<string, unknown>): FactBound {
  let { min, max } = input.ownBounds[key] ?? { min: null, max: null };
  for (const other of input.definitions) {
    if (!SELECT_TYPES.includes(other.attrType)) continue;
    const option = chosenOption(input, other.attrKey, answers);
    if (option === undefined) continue;
    for (const raw of [option.bounds?.[key], option.facts?.[key]]) {
      const bound = boundOf(raw);
      if (bound === null) continue;
      if (bound.min !== null) min = min === null ? bound.min : Math.max(min, bound.min);
      if (bound.max !== null) max = max === null ? bound.max : Math.min(max, bound.max);
    }
  }
  return { min, max };
}

/** Rule 4 — the seller's own answer, kept where it fits and cut where it does not. */
function fitted(input: ScopeInput, def: AttrDef, value: unknown, answers: Record<string, unknown>) {
  if (SELECT_TYPES.includes(def.attrType)) {
    const offered = offeredValues(input, def, answers);
    if (offered === null) return value;
    if (def.attrType === "multi_select") {
      if (!Array.isArray(value)) return value;
      const kept = value.filter((entry) => {
        const token = selectedValue(entry);
        return token === "other" || offered.has(token);
      });
      return kept.length === 0 ? undefined : kept;
    }
    const picked = selectedValue(value);
    return picked === "" || picked === "other" || offered.has(picked) ? value : undefined;
  }
  if (def.attrType === "number") {
    const num = typeof value === "number" ? value : Number(value);
    if (typeof value === "boolean" || !Number.isFinite(num)) return value;
    const { min, max } = boundsIn(input, def.attrKey, answers);
    if (min !== null && num < min) return undefined;
    if (max !== null && num > max) return undefined;
  }
  return value;
}

/**
 * Apply a move of `moved` (its new answer already in `answers`). Returns the new
 * answers and provenance; `changed` is true when any answer moved.
 */
export function resetAfterMove(
  input: ScopeInput,
  moved: string,
  answers: Record<string, unknown>,
  prefills: Record<string, unknown>,
): { answers: Record<string, unknown>; prefills: Record<string, unknown>; changed: boolean } {
  const deps = dependencyMap(input);
  const byKey = new Map(input.definitions.map((def) => [def.attrKey, def] as const));
  const next = { ...answers };
  const owned = { ...prefills };
  let changed = false;
  const write = (key: string, value: unknown) => {
    if (isEmpty(value)) {
      if (!isEmpty(next[key])) changed = true;
      delete next[key];
    } else {
      if (!same(next[key], value)) changed = true;
      next[key] = value;
    }
  };

  const visited = new Set<string>([moved]);
  const queue = [moved];
  while (queue.length > 0) {
    const parent = queue.shift()!;
    const option = chosenOption(input, parent, next);
    for (const key of deps[parent] ?? []) {
      if (visited.has(key)) continue;
      visited.add(key);
      const def = byKey.get(key);
      if (def === undefined) continue;
      const before = next[key];
      if (!conditionMet(def, next)) {
        // 1 — not asked now: stores nothing.
        write(key, undefined);
        delete owned[key];
      } else {
        const raw = option?.facts?.[key];
        const folded =
          raw === undefined || boundOf(raw) !== null
            ? ({ kind: "skip" } as const)
            : foldFact(raw, def.attrType);
        if (folded.kind === "prefill") {
          // 2 — the new option's fact.
          write(key, folded.value);
          owned[key] = folded.value;
        } else if (key in owned && same(before, owned[key])) {
          // 3 — the form's answer, left as written: goes with the old choice.
          write(key, def.defaultValue ?? undefined);
          delete owned[key];
        } else if (!isEmpty(before)) {
          // 4 — the seller's own answer: kept when it fits.
          const kept = fitted(input, def, before, next);
          write(key, kept);
          if (isEmpty(kept)) delete owned[key];
        }
      }
      if (!same(before, next[key]) && (deps[key]?.length ?? 0) > 0) queue.push(key);
    }
  }
  return { answers: next, prefills: owned, changed };
}
