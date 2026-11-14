import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { Refusal } from "@/lib/refusal";

/**
 * DEC-339 (D193, D231) — THE ONE FORM GATE. Each part of a form reports the
 * required answers it still lacks; the gate holds them for the scope they were
 * reported in (a wizard's step), and the submit stays CLOSED while any remain:
 * `try()` marks them (`tried`, `marks`) and moves to the first, and nothing is
 * sent. The gate blocks blanks only — the door still judges every answer it
 * receives (F3); a gate that says "missing" for an answer the door would take is
 * a defect of the gate, never a rule.
 */
export type FormGate = {
  /** The fields still blank in this scope, in the order they were reported. */
  readonly missing: readonly string[];
  /** A submit was tried while something was missing; cleared when the scope changes. */
  readonly tried: boolean;
  /** Once tried: each missing field as a `required` refusal, for the fields and the summary. */
  readonly marks: readonly Refusal[];
  /** A part's whole list of blank fields (a step's mirror of the door's rule). */
  report: (source: string, fields: readonly string[]) => void;
  /** One field's own answer: blank or not. */
  register: (field: string, blank: boolean) => void;
  /** Open → true. Closed → marks the blanks, moves to the first, false. */
  try: () => boolean;
};

type Lists = { scope: string | number; by: Readonly<Record<string, readonly string[]>> };

const NONE: readonly string[] = [];
const NO_MARKS: readonly Refusal[] = [];

function sameList(a: readonly string[] | undefined, b: readonly string[]): boolean {
  return (a ?? NONE).length === b.length && b.every((field, index) => a?.[index] === field);
}

export function useFormGate(
  scope: string | number = 0,
  reveal?: (fields: readonly string[]) => void,
): FormGate {
  const scopeRef = useRef(scope);
  scopeRef.current = scope;
  const revealRef = useRef(reveal);
  revealRef.current = reveal;
  const [lists, setLists] = useState<Lists>({ scope, by: {} });
  const report = useCallback((source: string, fields: readonly string[]) => {
    const at = scopeRef.current;
    setLists((prev) => {
      if (prev.scope === at && sameList(prev.by[source], fields)) return prev;
      const list = [...fields];
      return {
        scope: at,
        by: prev.scope === at ? { ...prev.by, [source]: list } : { [source]: list },
      };
    });
  }, []);
  const register = useCallback(
    (field: string, blank: boolean) => report(`field:${field}`, blank ? [field] : NONE),
    [report],
  );
  const missing = useMemo(() => {
    if (lists.scope !== scope) return NONE;
    const all = Object.values(lists.by).flat();
    return all.length === 0 ? NONE : all;
  }, [lists, scope]);
  const [tried, setTried] = useState(false);
  useEffect(() => {
    setTried(false);
  }, [scope]);
  const marks = useMemo<readonly Refusal[]>(
    () => (tried ? missing.map((field) => ({ field, reason: "required" })) : NO_MARKS),
    [tried, missing],
  );
  const tryGate = useCallback(() => {
    if (missing.length === 0) return true;
    setTried(true);
    revealRef.current?.(missing);
    return false;
  }, [missing]);
  return useMemo(
    () => ({ missing, tried, marks, report, register, try: tryGate }),
    [missing, tried, marks, report, register, tryGate],
  );
}
