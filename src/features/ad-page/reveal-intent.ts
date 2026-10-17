/** D201 §14: only a visitor's tap in this tab can carry a reveal through sign-in. */
const KEY = "ethio.revealIntent";
const MAX_AGE = 15 * 60_000;

export function rememberRevealIntent(publicId: string): void {
  try {
    sessionStorage.setItem(KEY, JSON.stringify({ publicId, at: Date.now() }));
  } catch {
    // Blocked tab storage cannot carry an intent; the signed-in tap remains available.
  }
}

export function takeRevealIntent(publicId: string, now = Date.now()): boolean {
  try {
    const raw = sessionStorage.getItem(KEY);
    sessionStorage.removeItem(KEY);
    if (raw === null) return false;
    const intent: unknown = JSON.parse(raw);
    if (intent === null || typeof intent !== "object") return false;
    const { publicId: remembered, at } = intent as { publicId?: unknown; at?: unknown };
    return (
      remembered === publicId &&
      typeof at === "number" &&
      Number.isFinite(at) &&
      now - at >= 0 &&
      now - at <= MAX_AGE
    );
  } catch {
    return false;
  }
}
