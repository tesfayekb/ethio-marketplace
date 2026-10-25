/**
 * Foundations turn 22 (INC-857) — THE ONE UUID SHAPE, for the browser and the
 * server alike. No imports: a screen reads it without pulling zod onto the
 * first paint (src/lib/schemas/primitives.ts builds its zod shape from it).
 * CF-RT-3: this literal lives nowhere else under src/.
 */
export const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
