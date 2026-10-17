import { supabase } from "@/integrations/supabase/client";

export async function countView(publicId: string): Promise<void> {
  try {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token ?? null;
    await fetch("/api/listings/view", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token === null ? {} : { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({ publicId }),
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
