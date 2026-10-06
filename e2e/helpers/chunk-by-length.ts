/**
 * DEC-138 (INC-454) — BYTE-BATCHED READS. A PostgREST filter list rides in the
 * URL, and the answer echoes that URL back in its headers; Node's fetch refuses
 * a response whose headers pass 16 KB (UND_ERR_HEADERS_OVERFLOW). Every
 * `.in(...)` list the service client builds from an unbounded source is cut
 * here into batches whose comma-joined length stays at or under `maxChars`.
 * Order is kept and nothing is lost; a single value longer than the cap is its
 * own batch.
 */
export function chunkByLength(values: readonly string[], maxChars = 4000): string[][] {
  const batches: string[][] = [];
  let current: string[] = [];
  let length = 0;
  for (const value of values) {
    const added = current.length === 0 ? value.length : length + 1 + value.length;
    if (current.length > 0 && added > maxChars) {
      batches.push(current);
      current = [value];
      length = value.length;
      continue;
    }
    current.push(value);
    length = added;
  }
  if (current.length > 0) batches.push(current);
  return batches;
}
