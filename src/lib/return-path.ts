/**
 * D20 — THE RETURN PATH, AND WHY IT IS SO NARROW.
 *
 * A session-gated page sends a signed-out visitor to `/auth?return=<path>` and
 * expects to be come back to. That parameter is attacker-controlled, so it is
 * accepted ONLY as a same-origin relative path: it must start with a single `/`,
 * and it must not continue with `/` or `\` (which the browser reads as a
 * protocol-relative host) and must carry no scheme. `https://evil.example`,
 * `//evil.example` and `/\evil.example` are all ignored in favour of `/`.
 *
 * This is the anti-pattern the standard exists to prevent: an open redirect on a
 * sign-in page is a phishing primitive, not a convenience.
 *
 * INC-224 — the rule lives HERE, not inside the sign-in screen, because the
 * Google door comes back through `/auth/callback` and must apply exactly the
 * same test. One rule, two doors, no second regex (B2).
 */

const RETURN_RE = /^\/(?![/\\]).*$/;

export function safeReturnPath(raw: unknown): string {
  if (typeof raw !== "string" || raw === "") return "/";
  if (raw.includes("://") || raw.includes("\\")) return "/";
  return RETURN_RE.test(raw) ? raw : "/";
}
