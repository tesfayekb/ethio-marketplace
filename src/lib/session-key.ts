/**
 * Foundations turn 34c-4 — THE SESSION'S STORAGE NAMES, ONE RULE FOR THE APP AND ITS TESTS.
 * supabase-js keeps a session under `sb-<the project URL's first host label>-auth-token`, and the
 * app keeps its session clocks beside it under the same `sb-<ref>-` prefix (turn 34c-2). The app
 * reads the names through src/lib/supabase-door.ts (`storedSessionKey()`, `besideStoredSession()`),
 * the tests through e2e/helpers/session.ts — both from these functions, so a test can never look
 * for a session under a name the app does not use. Pure: it imports nothing, so a Node test file
 * can load it. The census CF-PROJECT-1 (scripts/conformance/project-reads.test.ts) refuses the
 * names anywhere else in src/ and e2e/.
 */

/** The prefix supabase-js gives every name it keeps in the browser's storage. */
export const SUPABASE_PREFIX = "sb-";

const SESSION_NAME = "auth-token";

/** supabase-js's default storage key: `sb-<the URL's first host label>-auth-token`. */
export function authStorageKey(url: string): string | null {
  try {
    return `${SUPABASE_PREFIX}${new URL(url).hostname.split(".")[0]}-${SESSION_NAME}`;
  } catch {
    return null;
  }
}

/** A name kept beside a stored session's key: its `sb-<ref>-` prefix and the name. */
export function keyBeside(storedKey: string, name: string): string {
  return `${storedKey.slice(0, -SESSION_NAME.length)}${name}`;
}
