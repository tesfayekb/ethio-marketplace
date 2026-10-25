import { z } from "zod";

import { PUBLIC_ID_RE } from "@/features/ad-page/address";
import { UUID_RE } from "@/lib/uuid";

/**
 * Foundations turn 2 (DEC-237) — THE SHARED SHAPES. Every server endpoint
 * parses its input through a schema built from these primitives (B1); the
 * regexes are the ones the i18n and locations code already accepts, written
 * once. zod only — no import from src/server or the browser client, so this
 * module stays off the first paint (MUST_STAY_LAZY, INC-864) and a client
 * imports `type` only.
 */

/** The one UUID shape lives in src/lib/uuid.ts (CF-RT-3); re-exported for the schemas. */
export { UUID_RE };
export const uuid = z.string().regex(UUID_RE);

/** A listing's public address id (src/features/ad-page/address.ts, isPublicId). */
export const publicId = z.string().regex(PUBLIC_ID_RE);

/** The language-code shape src/routes/api/i18n.$lang.ts accepts today, verbatim. */
export const langCode = z.string().regex(/^[a-z]{2,8}(-[a-z0-9]{2,8})?$/);

/** Opt-in normalisation for the public language reader; langCode stays unchanged. */
export const langCodeLoose = z.string().trim().toLowerCase().pipe(langCode);

/** A country code: two letters, stored upper-case. */
export const countryCode = z
  .string()
  .regex(/^[A-Za-z]{2}$/)
  .transform((s) => s.toUpperCase());

/** Opt-in trimming for the public country reader; countryCode stays unchanged. */
export const countryCodeLoose = z.string().trim().pipe(countryCode);

/** Required text, trimmed, bounded. */
export const boundedText = (max: number) => z.string().trim().min(1).max(max);

/** Optional text, trimmed, bounded (empty allowed). */
export const optionalText = (max: number) => z.string().trim().max(max);

/** A bounded list of uuids. */
export const idList = (max: number) => z.array(uuid).max(max);

/** A bounded non-negative integer. */
export const positiveInt = (max: number) => z.number().int().min(0).max(max);

/** A query-string coordinate within ±limit; missing or empty is refused (never 0). */
export const coordinate = (limit: number) =>
  z.string().trim().min(1).transform(Number).pipe(z.number().finite().min(-limit).max(limit));

/** The parsed type of a schema, for clients that import `type` only. */
export type Infer<T extends z.ZodTypeAny> = z.infer<T>;
