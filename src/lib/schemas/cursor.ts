import { z } from "zod";

/** The feed/seller codec, with decode failures expressed as schema issues. */
function decode(value: string, ctx: z.RefinementCtx): unknown {
  try {
    if (!/^[A-Za-z0-9_-]+$/.test(value)) throw new Error("invalid cursor encoding");
    const padded = value.replace(/-/g, "+").replace(/_/g, "/");
    const binary = atob(padded + "=".repeat((4 - (padded.length % 4)) % 4));
    const bytes = Uint8Array.from(binary, (ch) => ch.charCodeAt(0));
    const parsed: unknown = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
    if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("invalid cursor object");
    return parsed;
  } catch {
    ctx.addIssue({ code: "custom", message: "invalid cursor" });
    return z.NEVER;
  }
}

export const cursor = <T extends z.ZodTypeAny>(shape: T) => z.string().max(512).transform(decode).pipe(shape);

/** UTF-8 JSON, encoded as unpadded base64url, matching both existing readers. */
export function encodeCursor(value: unknown): string {
  const json = JSON.stringify(value);
  if (json === undefined) throw new Error("cursor is not JSON");
  const bytes = new TextEncoder().encode(json);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}