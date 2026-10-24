import { callRoute } from "@/lib/route-client";

const VIEW_SESSION_KEY = "ethio.viewSession";

/** Turn 23 — this tab's stable view-session id, or null when storage is
    unavailable and cannot be written (private windows, blocked storage).
    INC-805 — the id comes from the platform's own UUID generator: it is a
    de-duplication id, not a secret, and the generator removes the modulo
    question a hand-rolled alphabet mapping would carry. */
export function viewSessionId(): string | null {
  try {
    const existing = sessionStorage.getItem(VIEW_SESSION_KEY);
    if (existing) return existing;
    const id = crypto.randomUUID();
    sessionStorage.setItem(VIEW_SESSION_KEY, id);
    return id;
  } catch {
    return null;
  }
}

export async function countView(publicId: string): Promise<void> {
  try {
    const session = viewSessionId();
    await callRoute("/api/listings/view", {
      auth: "optional",
      json: session ? { publicId, session } : { publicId },
    });
  } catch {
    // a counter never disturbs the page
  }
}

export type ShareChannel = "telegram" | "whatsapp" | "facebook" | "copy" | "qr";

export async function countShare(publicId: string, channel: ShareChannel): Promise<void> {
  try {
    await callRoute("/api/listings/share", {
      auth: "optional",
      json: { publicId, channel },
    });
  } catch {
    // a counter never disturbs the page
  }
}
