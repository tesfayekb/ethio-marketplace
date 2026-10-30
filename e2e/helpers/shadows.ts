/**
 * S1-2 ruling 2: Tailwind's shadow composition puts transparent zero-size layers
 * (`rgba(0, 0, 0, 0) 0px 0px 0px 0px` — its ring and inset-ring slots) ahead of the token's
 * shadow. Exactly those leading layers are removed; the rest is compared whole.
 */
const EMPTY_LAYER = "rgba(0, 0, 0, 0) 0px 0px 0px 0px, ";
export function withoutEmptyLayers(value: string): string {
  let out = value;
  while (out.startsWith(EMPTY_LAYER)) out = out.slice(EMPTY_LAYER.length);
  return out;
}
