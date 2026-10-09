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
 *
 * INC-530 — a path may carry a query string (D119's `/post?category=…&place=…`);
 * the doors navigate to it by `href`, which keeps the query a query. A path
 * holding a control character is refused as well: defence in depth, since the
 * browser already refuses to move history to another site.
 */

const RETURN_RE = /^\/(?![/\\]).*$/;

export function safeReturnPath(raw: unknown): string {
  if (typeof raw !== "string" || raw === "") return "/";
  if (raw.includes("://") || raw.includes("\\")) return "/";
  for (let i = 0; i < raw.length; i += 1) {
    const code = raw.charCodeAt(i);
    if (code < 0x20 || code === 0x7f) return "/";
  }
  return RETURN_RE.test(raw) ? raw : "/";
}
