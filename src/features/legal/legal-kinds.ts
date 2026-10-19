import type { MessageKey } from "@/i18n";

/** Bundle 22 turn 3 — pure rules of the acceptance gate (the door's consent rule uses the same patterns). */
export type LegalRole = "terms" | "privacy" | "other";
const SCRATCH_TERMS = /^e2e-[a-z0-9-]*-terms$/;
const SCRATCH_PRIVACY = /^e2e-[a-z0-9-]*-privacy$/;
const SCRATCH_KIND = /^e2e-[a-z0-9-]{1,40}$/;

export function legalRole(kind: string): LegalRole {
  if (kind === "terms" || SCRATCH_TERMS.test(kind)) return "terms";
  if (kind === "privacy" || SCRATCH_PRIVACY.test(kind)) return "privacy";
  return "other";
}
export function tickOneKey(roles: LegalRole[]): MessageKey {
  const terms = roles.includes("terms");
  const privacy = roles.includes("privacy");
  if (terms && privacy) return "legal.accept.tick1.both";
  if (terms) return "legal.accept.tick1.terms";
  if (privacy) return "legal.accept.tick1.privacy";
  return "legal.accept.tick1.docs";
}
export function needsConsent(rows: { kind: string }[]): boolean {
  return rows.some((row) => legalRole(row.kind) === "privacy");
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
