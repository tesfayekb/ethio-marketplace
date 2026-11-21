import type { MessageKey } from "@/i18n";

import type { RefusalFamily } from "./refusal";

/**
 * DEC-339 — the console doors' dialect beside the one refusal reader
 * (`src/lib/refusal.ts`, which holds its shapes: `splitRefusal`, `fillRefusal`,
 * `DOOR_KEY`). What stays here is the dialect's own words, which belong to the
 * admin strings layer and so never ride a member or a public page (DEC-258):
 * the consoles' shared family. (`doorKeyText`, the console families' own reader of a
 * door's key, had no caller left after F1-4a and was removed with INC-1229.)
 */
export { DOOR_KEY, fillRefusal, splitRefusal, type RefusalParts } from "./refusal";

/**
 * Turn D1 stop 11 (G0.2) — a database rate gate raises the bare code
 * `rateLimited` (rate_gate, INC-951). Every staff screen reads it as ONE shared
 * sentence; a screen with its own specific rateLimited key maps it before here.
 */
export const RATE_LIMITED_KEY = "admin.error.rateLimited" satisfies MessageKey;

/** L22 — the consoles' shared words that say when the rate gate opens again. */
export const ADMIN_WHEN = {
  rateLimited: "admin.error.rateLimitedWhen",
} as const satisfies Record<string, MessageKey>;

/** The consoles' shared words, for `readRefusal`: the rate gate's one sentence. */
export const ADMIN_REFUSALS: RefusalFamily = {
  words: { rateLimited: RATE_LIMITED_KEY },
  when: ADMIN_WHEN,
};
