/**
 * Bundle 4 step 13 — THE WRITING HELPER'S FACTS, built in one pure place so a
 * unit test can read them. The answers reach the prompt as facts (unit, size
 * and terms included, now that the price page comes first), plus one line for
 * "negotiable" when the switch is on and one for the period when it is not
 * "once". The amount and the currency are never part of it: the body carries
 * neither, and any attribute key that names a price is dropped here as well.
 *
 * D166 — every line a person could have written enters the prompt as ONE
 * quoted string through the gateway's template (src/server/ai/template.ts),
 * so nothing in it can pose as a line of the instruction; the task's
 * instruction ends with the shared rule. Foundations turn 16: the prompt
 * itself is the `writing_helper` task's declared fields; this module keeps
 * only the pure fact builders.
 */

const PRICE_KEY = /^(price|amount|currency)(_|$)/i;

/** The facts, flattened to `key: value` lines — nothing else reaches the model. */
export function assistFactLines(attrs: unknown, photoFacts: unknown): string[] {
  const lines: string[] = [];
  const push = (source: unknown) => {
    if (source === null || typeof source !== "object" || Array.isArray(source)) return;
    for (const [key, value] of Object.entries(source as Record<string, unknown>)) {
      if (value === null || value === undefined || value === "") continue;
      if (PRICE_KEY.test(key)) continue;
      const rendered = Array.isArray(value)
        ? value.map((entry) => String(entry)).join(", ")
        : typeof value === "object"
          ? JSON.stringify(value)
          : String(value);
      lines.push(`${key}: ${rendered.slice(0, 200)}`);
    }
  };
  push(attrs);
  push(photoFacts);
  return lines.slice(0, 40);
}

/** The deal facts the body may carry: never an amount or a currency. */
export function assistDealLines(negotiable: unknown, period: unknown): string[] {
  const lines: string[] = [];
  if (negotiable === true) lines.push("negotiable: yes");
  if (typeof period === "string" && /^(hour|day|week|month|year)$/.test(period)) {
    lines.push(`price period: per ${period}`);
  }
  return lines;
}
