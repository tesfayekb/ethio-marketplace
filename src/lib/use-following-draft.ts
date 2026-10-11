import { useState } from "react";

/**
 * Bundle 11, turn G3c (INC-558's class, G29) — A DRAFT THAT FOLLOWS THE STORED
 * VALUE UNTIL IT IS EDITED.
 *
 * An editor seeded once from a read (`useState(row.value)`) keeps the text it
 * opened on while the stored value moves under it: after the AI writes a
 * translation, or History restores an older one, the box still showed the old
 * text and Save wrote it back over the new one.
 *
 * Here the draft holds the value it was seeded from; when the stored value
 * changes and the draft is still that seed (nobody typed), the draft follows.
 * A draft the admin has edited is kept: it is the admin's work, and Save sends
 * it on purpose. Render-time reconcile, equality-guarded (no effect loop), as
 * the translator note already does (U4i-3).
 */
export function useFollowingDraft(stored: string): [string, (next: string) => void] {
  const [seed, setSeed] = useState(stored);
  const [draft, setDraft] = useState(stored);
  if (stored !== seed) {
    setSeed(stored);
    if (draft === seed) setDraft(stored);
  }
  return [draft, setDraft];
}
