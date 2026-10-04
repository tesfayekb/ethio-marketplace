import type { MessageKey } from "@/i18n";

/** Bundle 4 step 23 — the channels the profile keeps, in the contact step's order. */
export const CHANNEL_LABELS = {
  phone: "post.who.channel.phone",
  phone2: "post.who.channel.phone2",
  telegram: "post.who.channel.telegram",
  whatsapp: "post.who.channel.whatsapp",
} as const satisfies Record<string, MessageKey>;

type SavedChannel = { channel: keyof typeof CHANNEL_LABELS; value: string; show: boolean };

/** The profile's saved channels with a value; unreadable entries are skipped. */
export function savedChannels(prefs: unknown): SavedChannel[] {
  if (prefs === null || typeof prefs !== "object") return [];
  const record = prefs as Record<string, unknown>;
  return (Object.keys(CHANNEL_LABELS) as Array<keyof typeof CHANNEL_LABELS>).flatMap((channel) => {
    const entry = record[channel];
    if (entry === null || typeof entry !== "object") return [];
    const row = entry as Record<string, unknown>;
    const value = typeof row["value"] === "string" ? row["value"].trim() : "";
    return value === "" ? [] : [{ channel, value, show: row["show"] === true }];
  });
}
