import type { MessageKey } from "@/i18n";
import { isCountryCode } from "@/lib/locale";
import { formatCountryName } from "@/lib/country-name";

/** Bundle 22 turn 3 — pure rules of the acceptance gate; turn 12 (DEC-206): one tick, the 18+ statement only the first time. */
export type LegalRole = "terms" | "privacy" | "other";
const SCRATCH_TERMS = /^e2e-[a-z0-9-]*-terms$/;
const SCRATCH_PRIVACY = /^e2e-[a-z0-9-]*-privacy$/;
export const SCRATCH_KIND = /^e2e-[a-z0-9-]{1,40}$/;

export function legalRole(kind: string): LegalRole {
  if (kind === "terms" || SCRATCH_TERMS.test(kind)) return "terms";
  if (kind === "privacy" || SCRATCH_PRIVACY.test(kind)) return "privacy";
  return "other";
}
export function tickKey(roles: LegalRole[], firstTime: boolean): MessageKey {
  const terms = roles.includes("terms");
  const privacy = roles.includes("privacy");
  if (firstTime) {
    if (terms && privacy) return "legal.agree.first.both";
    if (terms) return "legal.agree.first.terms";
    if (privacy) return "legal.agree.first.privacy";
    return "legal.accept.agreeFirst.docs";
  }
  if (terms && privacy) return "legal.agree.updated.both";
  if (terms) return "legal.agree.updated.terms";
  if (privacy) return "legal.agree.updated.privacy";
  return "legal.accept.agreeUpdated.docs";
}
export function gateKinds(extra: unknown): string[] {
  const kinds = ["terms", "privacy"];
  if (!Array.isArray(extra)) return kinds;
  const scratch = extra.filter(
    (k): k is string => typeof k === "string" && SCRATCH_KIND.test(k) && !kinds.includes(k),
  );
  return [...kinds, ...scratch.slice(0, 4)];
}
export function gateExempt(pathname: string): boolean {
  return (
    pathname === "/legal/accept" ||
    pathname === "/terms" ||
    pathname === "/privacy" ||
    pathname.startsWith("/legal/") ||
    pathname === "/auth" ||
    pathname.startsWith("/auth/")
  );
}

/** A document's name as the acceptance screen and the person's history show it (D2). */
export function legalDocName(
  row: { kind: string; country_code: string | null },
  t: (key: MessageKey) => string,
  language: string,
): string {
  const role = legalRole(row.kind);
  const name =
    role === "terms"
      ? t("legal.kind.terms")
      : role === "privacy"
        ? t("legal.kind.privacy")
        : row.kind;
  if (!row.country_code) return name;
  const country = formatCountryName(row.country_code, language);
  return `${name} · ${country}`;
}

/**
 * D236 — a legal kind's audience, mirrored from public.legal_kind_signed_in_only
 * (M24): the publishing statement and the e2e-pub- scratch class are for
 * signed-in people; terms, privacy and the other scratch kinds stay public.
 * The LK-mirror test reads the migration, so the two never drift.
 */
export function signedInOnlyKind(kind: string): boolean {
  return kind === "publishing" || /^e2e-pub-/.test(kind);
}

/** The root passes raw search through; only distinct uppercase country codes reach the door. */
export function shapedCountries(value: unknown): string[] {
  const values = typeof value === "string" ? value.split(",") : Array.isArray(value) ? value : [];
  return [...new Set(values.filter((v): v is string => isCountryCode(v)))].slice(0, 5);
}
