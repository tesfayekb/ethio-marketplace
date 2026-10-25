import { isE2E } from "@/lib/env-flags";

/**
 * Foundations turn 16 (DEC-249) — THE ONE STAND-IN SWITCH. A stand-in (fake
 * mode) exists only in the E2E build, and only when its own flag or the
 * harness-wide umbrella flag is set; a normal build answers false whatever
 * the environment says (INC-828). Every stand-in reader calls this — the AI
 * tasks through the gateway, the photo policy, the background removal, the
 * category images, the translations — and the geocoder's E2E_FAKE_GEOCODE,
 * which is not an AI call and stays outside the AI census by design.
 */
export function standInMode(flag: string): boolean {
  return isE2E && (process.env[flag] === "1" || process.env["E2E_FAKE_TRANSLATE"] === "1");
}
