/**
 * INC-464 / DEC-146 — the app under test must point at ethio-staging.
 *
 * The setup already proves where its service client points (E2E_SUPABASE_URL).
 * This proves where the APP points: the browser's client reads
 * VITE_SUPABASE_URL, and the server routes read SUPABASE_URL. A run whose app
 * would talk to any other project stops in setup. Pure: imports nothing, and
 * the message carries the URL only, never a key.
 */
export function assertAppTargetsStaging(
  env: Record<string, string | undefined>,
  stagingRef: string,
): void {
  const vite = env["VITE_SUPABASE_URL"] ?? "";
  const server = env["SUPABASE_URL"];
  const local = env["E2E_LOCAL_BACKEND"] === "1";
  const ok = local
    ? vite === "https://127.0.0.1:54321" &&
      (server === undefined || server === "https://127.0.0.1:54321")
    : vite.includes(stagingRef) && (server === undefined || server.includes(stagingRef));
  if (!ok) {
    throw new Error(
      `[e2e:setup] the app under test does not point at ethio-staging (VITE_SUPABASE_URL = ${vite || "(unset)"}). Start local runs with: bun run e2e:local`,
    );
  }
}
