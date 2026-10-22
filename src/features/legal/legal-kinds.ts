import type { MessageKey } from "@/i18n";
import { formatLocale } from "@/lib/format-locale";

/** Bundle 22 turn 3 — pure rules of the acceptance gate; turn 12 (DEC-206): one tick, the 18+ statement only the first time. */
export type LegalRole = "terms" | "privacy" | "other";
const SCRATCH_TERMS = /^e2e-[a-z0-9-]*-terms$/;
const SCRATCH_PRIVACY = /^e2e-[a-z0-9-]*-privacy$/;
const SCRATCH_KIND = /^e2e-[a-z0-9-]{1,40}$/;

export function legalRole(kind: string): LegalRole {
  if (kind === "terms" || SCRATCH_TERMS.test(kind)) return "terms";
  if (kind === "privacy" || SCRATCH_PRIVACY.test(kind)) return "privacy";
  return "other";
}
export function tickKey(roles: LegalRole[], firstTime: boolean): MessageKey {
  const terms = roles.includes("terms");
  const privacy = roles.includes("privacy");
  if (firstTime) {
    if (terms && privacy) return "legal.accept.agreeFirst.both";
    if (terms) return "legal.accept.agreeFirst.terms";
    if (privacy) return "legal.accept.agreeFirst.privacy";
    return "legal.accept.agreeFirst.docs";
  }
  if (terms && privacy) return "legal.accept.agreeUpdated.both";
  if (terms) return "legal.accept.agreeUpdated.terms";
  if (privacy) return "legal.accept.agreeUpdated.privacy";
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
  const country =
    new Intl.DisplayNames([language], { type: "region" }).of(row.country_code) ?? row.country_code;
  return `${name} · ${country}`;
}

/** A legal date in the page's language (dateStyle medium). */
export function legalDate(value: string | null | undefined, language: string): string {
  if (!value) return "";
  return new Intl.DateTimeFormat(formatLocale(language), {
    dateStyle: "medium",
  }).format(new Date(value));
}
/**
 * Turn 12: an acceptance's or an e-mail's moment, stored in UTC, shown in the viewer's own time zone
 * with the zone named. `timeZone` is for tests only; the screens pass none.
 */
export function legalMoment(
  value: string | null | undefined,
  language: string,
  timeZone?: string,
): string {
  if (!value) return "";
  return new Intl.DateTimeFormat(formatLocale(language), {
    dateStyle: "medium",
    timeStyle: "long",
    timeZone,
  }).format(new Date(value));
}
