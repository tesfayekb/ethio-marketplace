/** Bundle 2 Q2 — `phone2` is the optional second phone, revealed on request. */
export const CHANNELS = ["phone", "phone2", "telegram", "whatsapp"] as const;
export type Channel = (typeof CHANNELS)[number];

export function channelOf(
  pref: Record<string, unknown>,
  channel: Channel,
): { show: boolean; value: string } {
  const entry = pref[channel];
  if (entry === null || typeof entry !== "object") return { show: false, value: "" };
  const row = entry as Record<string, unknown>;
  return {
    show: row["show"] === true,
    value: typeof row["value"] === "string" ? row["value"] : "",
  };
}

/**
 * Bundle 4 step 23 — the channels compared the way the profile keeps them:
 * each channel's value and show switch. Equal channels make no identity call.
 */
export function sameChannels(a: Record<string, unknown>, b: Record<string, unknown>): boolean {
  return CHANNELS.every((channel) => {
    const left = channelOf(a, channel);
    const right = channelOf(b, channel);
    return left.value === right.value && left.show === right.show;
  });
}
