import { useCallback, useEffect, useRef, useState } from "react";

/**
 * U0k — SESSION POLICY (client-side enforcement).
 *
 * WHY THESE NUMBERS. OWASP's Session Management Cheat Sheet asks for BOTH an
 * idle timeout and an absolute (maximum) session lifetime, tightened according
 * to the privilege the session carries. NIST SP 800-63B bounds the bands:
 * AAL1 allows reauthentication as rarely as every 30 days, AAL2 requires a
 * 12-hour absolute limit with a 30-minute inactivity limit. ethio.com tiers
 * BETWEEN those bands — strict for staff (admin_panel:access, effectively
 * AAL2-shaped), consumer-friendly for buyers and sellers, whose sessions carry
 * no privileged capability and who browse on shared, data-expensive phones
 * where a forced re-login every few hours is hostile, not safe.
 *
 * THIS IS UX ENFORCEMENT. The authoritative bound is the Supabase Auth
 * refresh-token / session configuration (operator item); the client policy
 * cannot be trusted by the server and never decides authorization (law F3).
 */

/** Idle (inactivity) limits, milliseconds. */
export const IDLE_TIMEOUT_MS = {
  staff: 30 * 60_000, // 30 minutes
  regular: 4 * 60 * 60_000, // 4 hours
} as const;

/** Absolute (maximum) session lifetime, milliseconds. */
export const ABSOLUTE_MAX_MS = {
  staff: 12 * 60 * 60_000, // 12 hours
  regular: 7 * 24 * 60 * 60_000, // 7 days
} as const;

/** How long before idle expiry the warning appears. */
export const WARN_BEFORE_MS = 60_000;

/** Activity is recorded at most once per second (passive listeners). */
const ACTIVITY_THROTTLE_MS = 1_000;
const TICK_MS = 1_000;

export type SessionTier = "staff" | "regular";
export type SessionExpiryReason = "idle" | "absolute";

/** DEV-only overrides, used by the E2E session-policy specs. */
export type SessionPolicyOverrides = {
  idleMs?: number;
  warnMs?: number;
  absoluteMs?: number;
};

function overrides(): SessionPolicyOverrides {
  if (!import.meta.env.DEV || typeof window === "undefined") return {};
  return (
    (window as unknown as { __ethioSessionPolicy?: SessionPolicyOverrides }).__ethioSessionPolicy ??
    {}
  );
}

/**
 * Storage keys are sb-scoped like the supabase token itself, so a different
 * project (staging vs prod) in the same browser keeps its own clocks.
 */
function projectRef(): string {
  return (
    (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.match(/https?:\/\/([^.]+)\./)?.[1] ??
    "local"
  );
}

export function sessionPolicyKeys() {
  const ref = projectRef();
  return {
    lastActivityAt: `sb-${ref}-last-activity-at`,
    sessionStartedAt: `sb-${ref}-session-started-at`,
    /** U1f — cached "recently stepped up" hint (AAL2). Never authoritative. */
    steppedUpAt: `sb-${ref}-stepped-up-at`,
  };
}

/**
 * U1f — AAL AWARENESS.
 *
 * The AUTHORITATIVE assurance level is the JWT's `aal` claim, read by the
 * server gate (public.require_step_up_if_needed) and by GoTrue's
 * getAuthenticatorAssuranceLevel(). This stamp is only a client-side hint so
 * the UI does not have to ask GoTrue on every render.
 *
 * A staff IDLE timeout signs the session out, which clears this stamp along
 * with the clocks below — and a FRESH sign-in always starts at aal1, so the
 * first sensitive action after signing in asks for a code again.
 */
export function markSteppedUp(now = Date.now()) {
  writeStamp(sessionPolicyKeys().steppedUpAt, now);
}

export function readSteppedUpAt(): number | null {
  return readStamp(sessionPolicyKeys().steppedUpAt);
}

function readStamp(key: string): number | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(key);
  if (!raw) return null;
  const value = Number(raw);
  return Number.isFinite(value) ? value : null;
}

function writeStamp(key: string, value: number) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, String(value));
}

/** Fresh session start + activity clock (sign-in success, or first mount). */
export function startSessionClocks(now = Date.now()) {
  const keys = sessionPolicyKeys();
  writeStamp(keys.sessionStartedAt, now);
  writeStamp(keys.lastActivityAt, now);
}

/** Sign-out (manual or policy) removes both clocks. */
export function clearSessionClocks() {
  if (typeof window === "undefined") return;
  const keys = sessionPolicyKeys();
  window.localStorage.removeItem(keys.lastActivityAt);
  window.localStorage.removeItem(keys.sessionStartedAt);
  // U1f: the step-up hint dies with the session it belonged to.
  window.localStorage.removeItem(keys.steppedUpAt);
}

export function idleLimitFor(tier: SessionTier) {
  return overrides().idleMs ?? IDLE_TIMEOUT_MS[tier];
}

export function absoluteLimitFor(tier: SessionTier) {
  return overrides().absoluteMs ?? ABSOLUTE_MAX_MS[tier];
}

export function warnBefore() {
  return overrides().warnMs ?? WARN_BEFORE_MS;
}

type Options = {
  /** Only a signed-in session is policed. */
  active: boolean;
  /**
   * FAIL-SAFE: pass `true` while permissions are still unknown, so the STRICT
   * tier applies until we can prove the user is not staff.
   */
  tier: SessionTier;
  onExpire: (reason: SessionExpiryReason) => void;
};

/**
 * The policy clock. One 1s interval reads the persisted stamps, so the policy
 * survives reloads and is cross-tab by construction (every tab reads the same
 * localStorage stamps; activity in one tab extends all of them).
 */
export function useSessionPolicy({ active, tier, onExpire }: Options) {
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const firedRef = useRef(false);
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  const extend = useCallback(() => {
    writeStamp(sessionPolicyKeys().lastActivityAt, Date.now());
    setSecondsLeft(null);
  }, []);

  useEffect(() => {
    if (!active || typeof window === "undefined") {
      setSecondsLeft(null);
      return;
    }
    firedRef.current = false;
    const keys = sessionPolicyKeys();
    if (readStamp(keys.sessionStartedAt) === null) startSessionClocks();
    if (readStamp(keys.lastActivityAt) === null) writeStamp(keys.lastActivityAt, Date.now());

    let lastWrite = 0;
    const record = () => {
      const now = Date.now();
      if (now - lastWrite < ACTIVITY_THROTTLE_MS) return;
      lastWrite = now;
      writeStamp(keys.lastActivityAt, now);
    };
    const onVisible = () => {
      if (document.visibilityState === "visible") record();
    };

    const passive = { passive: true } as const;
    window.addEventListener("pointerdown", record, passive);
    window.addEventListener("keydown", record, passive);
    window.addEventListener("scroll", record, passive);
    document.addEventListener("visibilitychange", onVisible);

    const tick = () => {
      if (firedRef.current) return;
      const now = Date.now();
      const startedAt = readStamp(keys.sessionStartedAt) ?? now;
      const lastActivityAt = readStamp(keys.lastActivityAt) ?? now;

      if (now - startedAt >= absoluteLimitFor(tier)) {
        firedRef.current = true;
        setSecondsLeft(null);
        onExpireRef.current("absolute");
        return;
      }

      const idleLeft = idleLimitFor(tier) - (now - lastActivityAt);
      if (idleLeft <= 0) {
        firedRef.current = true;
        setSecondsLeft(null);
        onExpireRef.current("idle");
        return;
      }
      setSecondsLeft(idleLeft <= warnBefore() ? Math.ceil(idleLeft / 1000) : null);
    };

    tick();
    const timer = window.setInterval(tick, TICK_MS);

    return () => {
      window.clearInterval(timer);
      window.removeEventListener("pointerdown", record);
      window.removeEventListener("keydown", record);
      window.removeEventListener("scroll", record);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [active, tier]);

  return { warningSecondsLeft: secondsLeft, extend };
}
