import { codeOf } from "./kit";

/**
 * Foundations turn 16 (DEC-250) — THE VENDOR-SEAMS CENSUS. The four seams are
 * the only modules new code may reach a vendor through: the generated
 * Supabase clients (src/integrations/supabase/**), the server's Supabase
 * clients and staff check (src/server/supabase/**), object storage
 * (src/server/media/storage.ts) and the browser's route calls
 * (src/lib/route-client.ts) — and, since DEC-261 (Foundations turn 34), the browser's
 * door to the Supabase client (src/lib/supabase-door.ts), the fifth. Everything else the
 * census finds is frozen in vendor-seams-allowlist.txt until INC-877.
 */
export const SEAM_EXEMPT = [
  /^src\/integrations\/supabase\//,
  /^src\/server\/supabase\//,
  /^src\/server\/media\/storage\.ts$/,
  /^src\/lib\/route-client\.ts$/,
  /^src\/lib\/supabase-door\.ts$/,
];

export function seamExempt(file: string): boolean {
  return SEAM_EXEMPT.some((pattern) => pattern.test(file));
}

const AUTH_METHODS =
  "(?:getSession|getUser|signIn[A-Za-z]*|signUp|signOut|onAuthStateChange|mfa|verifyOtp|refreshSession|setSession|resetPasswordForEmail|updateUser|admin|resend)";

/** The two ties the census reports: a direct Supabase reach, a Lovable naming. */
export function vendorTies(source: string): { supabase: boolean; lovable: boolean } {
  const code = codeOf(source);
  return {
    supabase:
      /from\s+["']@supabase\/supabase-js["']/.test(code) ||
      /from\s+["']@\/integrations\/supabase\/client["']/.test(code) ||
      new RegExp(`\\.auth\\.${AUTH_METHODS}\\b`).test(code) ||
      /\.storage\.from\(/.test(code),
    lovable: /lovable/i.test(code),
  };
}
