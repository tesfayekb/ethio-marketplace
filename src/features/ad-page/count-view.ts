import { supabase } from "@/integrations/supabase/client";

const VIEW_SESSION_KEY = "ethio.viewSession";

/** Turn 23 — this tab's stable view-session id, or null when storage is
    unavailable and cannot be written (private windows, blocked storage). */
export function viewSessionId(): string | null {
  try {
    const existing = sessionStorage.getItem(VIEW_SESSION_KEY);
    if (existing) return existing;
    const bytes = crypto.getRandomValues(new Uint8Array(22));
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let id = "";
    for (const byte of bytes) id += alphabet[byte % alphabet.length];
    sessionStorage.setItem(VIEW_SESSION_KEY, id);
    return id;
  } catch {
    return null;
  }
}

export async function countView(publicId: string): Promise<void> {
  try {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token ?? null;
    const session = viewSessionId();
    await fetch("/api/listings/view", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token === null ? {} : { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(session ? { publicId, session } : { publicId }),
    });
  } catch {
    // a counter never disturbs the page
  }
}

export type ShareChannel = "telegram" | "whatsapp" | "facebook" | "copy" | "qr";

export async function countShare(publicId: string, channel: ShareChannel): Promise<void> {
  try {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token ?? null;
    await fetch("/api/listings/share", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token === null ? {} : { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({ publicId, channel }),
    });
  } catch {
    // a counter never disturbs the page
  }
}
