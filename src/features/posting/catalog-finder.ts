import { useEffect, useState } from "react";

import { catalogWords, type CatalogTokens } from "@/i18n";

import { loadAttributeOptions, optionLabel } from "./attribute-options";
import { readPostingSchema, type PostingSchema } from "./posting-service";

/**
 * D37-2 — THE WIZARD'S CATEGORY SEARCH ASKS THE CATALOG FINDER.
 *
 * `GET /api/catalog/find` indexes option labels, aliases and units, so "sugar" or
 * a brand name reaches a leaf that its name never would. The finder is a HINT:
 * every `{ key, value }` it proposes is revalidated against the chosen leaf's own
 * schema and current options before it becomes a prefill (catalog-finder.md,
 * forward scan), and the door still judges the answer.
 *
 * Requests are debounced (250 ms) and the previous one aborted, so typing never
 * sends one request per keystroke. A failure (network, 429, 5xx) is reported, so
 * the step can say it is showing name matches only (F4).
 */

export const FINDER_MIN = 2;
export const FINDER_DEBOUNCE_MS = 250;

export interface FinderMatch {
  key: string;
  value: string;
}

export interface FinderHit {
  leafId: string;
  matches: FinderMatch[];
}

export type FinderState =
  | { state: "idle" }
  | { state: "waiting"; term: string }
  | { state: "ready"; term: string; hits: FinderHit[] }
  | { state: "failed"; term: string };

function shapeMatches(raw: unknown): FinderMatch[] {
  if (!Array.isArray(raw)) return [];
  const out: FinderMatch[] = [];
  for (const entry of raw) {
    if (entry === null || typeof entry !== "object") continue;
    const row = entry as Record<string, unknown>;
    if (typeof row["key"] === "string" && typeof row["value"] === "string") {
      out.push({ key: row["key"], value: row["value"] });
    }
  }
  return out;
}

export async function findLeaves(
  term: string,
  lang: string,
  signal: AbortSignal,
): Promise<FinderHit[]> {
  const params = new URLSearchParams({ q: term, lang });
  const response = await fetch(`/api/catalog/find?${params.toString()}`, {
    headers: { Accept: "application/json" },
    signal,
  });
  if (!response.ok) throw new Error(`catalog finder answered ${response.status}`);
  const body = (await response.json()) as { results?: unknown };
  const rows = Array.isArray(body.results) ? (body.results as Record<string, unknown>[]) : [];
  return rows
    .filter((row) => typeof row["leaf_id"] === "string")
    .map((row) => ({ leafId: row["leaf_id"] as string, matches: shapeMatches(row["matches"]) }));
}

/**
 * S3 / INC-362 — THE FINDER HAS NOT ANSWERED FOR THIS TERM YET. True while a
 * term the finder will be asked about has no `ready` or `failed` answer of its
 * own (debouncing, in flight, or a previous term's answer still held). While
 * true, the screen shows the searching row, never "Nothing matched".
 */
export function finderPending(answer: FinderState, term: string): boolean {
  const needle = term.trim();
  if (needle.length < FINDER_MIN || needle.length > 64) return false;
  if (answer.state === "ready" || answer.state === "failed") return answer.term !== needle;
  return true;
}

/** The finder's answer for `term`, debounced and abortable. */
export function useCatalogFinder(term: string, lang: string): FinderState {
  const [answer, setAnswer] = useState<FinderState>({ state: "idle" });
  const needle = term.trim();
  useEffect(() => {
    if (needle.length < FINDER_MIN || needle.length > 64) {
      setAnswer({ state: "idle" });
      return;
    }
    setAnswer({ state: "waiting", term: needle });
    const controller = new AbortController();
    const timer = setTimeout(() => {
      findLeaves(needle, lang, controller.signal).then(
        (hits) => setAnswer({ state: "ready", term: needle, hits }),
        (error: unknown) => {
          if (controller.signal.aborted) return;
          console.warn("[catalog-finder] falling back to name matches", error);
          setAnswer({ state: "failed", term: needle });
        },
      );
    }, FINDER_DEBOUNCE_MS);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [needle, lang]);
  return answer;
}

const schemas = new Map<string, Promise<PostingSchema | null>>();

function schemaOf(leafId: string): Promise<PostingSchema | null> {
  let held = schemas.get(leafId);
  if (held === undefined) {
    held = readPostingSchema(leafId);
    schemas.set(leafId, held);
    void held.then((schema) => {
      if (schema === null) schemas.delete(leafId);
    });
  }
  return held;
}

const SELECTS = ["single_select", "multi_select"];

interface Fitted {
  key: string;
  type: string;
  attributeLabel: string;
  optionLabel: string;
  value: string;
}

/** Revalidates each pair against the leaf's effective links and current options. */
async function fit(
  leafId: string,
  matches: FinderMatch[],
  lang: string,
  tokens: CatalogTokens,
): Promise<Fitted[]> {
  if (matches.length === 0) return [];
  const schema = await schemaOf(leafId);
  if (schema === null) return [];
  const kept: Fitted[] = [];
  for (const match of matches) {
    const def = schema.attributes.find((entry) => entry.attrKey === match.key);
    if (def === undefined || !SELECTS.includes(def.attrType)) continue;
    if (def.visibleWhen !== null) continue;
    if (def.allowedOptions !== null && !def.allowedOptions.includes(match.value)) continue;
    if (kept.some((entry) => entry.key === def.attrKey && def.attrType !== "multi_select")) {
      continue;
    }
    const options = await loadAttributeOptions(def.attributeId);
    const option = options?.find((entry) => entry.value === match.value);
    if (option === undefined) continue;
    if (option.parent !== null && !kept.some((entry) => entry.value === option.parent)) continue;
    kept.push({
      key: def.attrKey,
      type: def.attrType,
      attributeLabel: catalogWords(def.nameEn, def.nameAm, lang, tokens),
      optionLabel: optionLabel(option, lang, tokens),
      value: option.value,
    });
  }
  return kept;
}

/** The pairs that fit, as specification answers (single → value, multi → list). */
export async function prefillFromMatches(
  leafId: string,
  matches: FinderMatch[],
  lang: string,
): Promise<Record<string, unknown>> {
  const out: Record<string, unknown> = {};
  // Only the values are used here; the labels are never drawn.
  const unseen: CatalogTokens = { country: "", categoryPath: () => null };
  for (const entry of await fit(leafId, matches, lang, unseen)) {
    if (entry.type === "multi_select") {
      const held = Array.isArray(out[entry.key]) ? (out[entry.key] as string[]) : [];
      out[entry.key] = [...held, entry.value];
    } else {
      out[entry.key] = entry.value;
    }
  }
  return out;
}

/** The first pair that fits, labelled with its own labels — the hit's match line. */
export function useMatchLine(
  leafId: string,
  matches: FinderMatch[],
  lang: string,
  tokens: CatalogTokens,
): { attribute: string; option: string } | null {
  const [line, setLine] = useState<{ attribute: string; option: string } | null>(null);
  const signature = matches.map((entry) => `${entry.key}=${entry.value}`).join("|");
  useEffect(() => {
    let cancelled = false;
    setLine(null);
    if (signature === "") return;
    void fit(leafId, matches, lang, tokens).then((kept) => {
      if (cancelled) return;
      const first = kept[0];
      setLine(
        first === undefined ? null : { attribute: first.attributeLabel, option: first.optionLabel },
      );
    });
    return () => {
      cancelled = true;
    };
    // `signature` stands for `matches` (a fresh array each render).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leafId, signature, lang, tokens]);
  return line;
}
