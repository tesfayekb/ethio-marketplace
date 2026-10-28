import { readFileSync } from "node:fs";
import { relative, resolve } from "node:path";

import { describe, expect, it } from "vitest";

import { walkFiles } from "../../scripts/conformance/kit";

/** Every source file under src/, tests left out. */
function sources(dir: string): string[] {
  return walkFiles([dir], { ext: ["ts", "tsx"], skipTests: true });
}

/**
 * INC-621 (bundle 14 turn 2) — DEC-018 says every test-only window instrument
 * is gated on `isE2E` and compiled out of a production build. Two were not:
 * `__ethioStepUp` was read and `__ethioPublicLanguages` written in production.
 * The census below names every hook the app code holds; each file that holds
 * one takes the flag. A new hook fails here until it is listed and gated.
 */
describe("the E2E window instruments (DEC-018, INC-621)", () => {
  it("HOOK-1 every file that names a window instrument takes isE2E; the hooks are the census", () => {
    const root = resolve(process.cwd(), "src");
    const found = new Map<string, Set<string>>();
    for (const path of sources(root)) {
      const names = readFileSync(path, "utf8").match(/__ethio[A-Za-z]+/g) ?? [];
      if (names.length > 0) found.set(relative(process.cwd(), path), new Set(names));
    }
    const census = [...found.entries()]
      .map(([path, names]) => `${path}: ${[...names].sort().join(", ")}`)
      .sort();
    expect(census).toEqual([
      "src/components/app-shell.tsx: __ethioClientOff, __ethioHomeAhead, __ethioQueryClient, __ethioSupabase",
      "src/features/auth/mfa/mfa-service.ts: __ethioStepUp",
      "src/features/legal/use-legal-gate.ts: __ethioLegalKinds",
      "src/features/session/session-policy.ts: __ethioSessionPolicy",
      "src/i18n/provider.tsx: __ethioPublicLanguages",
    ]);
    for (const path of found.keys()) {
      expect(readFileSync(path, "utf8"), `${path} does not take the flag`).toContain(
        'import { isE2E } from "@/lib/env-flags";',
      );
    }
  });
});
