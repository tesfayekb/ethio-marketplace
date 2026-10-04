/**
 * Bundle 4 step 13 — THE WRITING HELPER'S PROMPT, composed in one pure place so
 * a unit test can read it. The answers reach it as facts (unit, size and terms
 * included, now that the price page comes first), plus one line for
 * "negotiable" when the switch is on and one for the period when it is not
 * "once". The amount and the currency are never part of it: the body carries
 * neither, and any attribute key that names a price is dropped here as well.
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

export function composeAssistPrompt(input: {
  locale: string;
  categoryPath: string;
  facts: string[];
  sellerTitle: string;
  sellerDescription: string;
  photoCount: number;
  previous: { title: string; description: string }[];
}): string {
  const { locale, categoryPath, facts, sellerTitle, sellerDescription, photoCount, previous } =
    input;
  return [
    `Language: ${locale}`,
    `Category: ${categoryPath}`,
    "Facts:",
    ...(facts.length === 0 ? ["(none)"] : facts.map((line) => `- ${line}`)),
    sellerTitle === "" ? "Seller's draft title: (none)" : `Seller's draft title: ${sellerTitle}`,
    sellerDescription === ""
      ? "Seller's draft description: (none)"
      : `Seller's draft description: ${sellerDescription}`,
    photoCount === 0 ? "Photos: (none)" : `Photos attached: ${photoCount}`,
    ...(previous.length === 0
      ? []
      : [
          "Earlier suggestions to differ from:",
          ...previous.map((pair, index) => `- ${index + 1}: ${pair.title} — ${pair.description}`),
        ]),
  ].join("\n");
}
