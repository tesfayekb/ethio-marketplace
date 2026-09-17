import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/integrations/supabase/types";

/**
 * U6-B1 — THE STORAGE ADAPTER (DEC-075).
 *
 * ONE PARTITION TODAY, A COPY TOMORROW. Every object key begins with its
 * PARTITION segment:
 *
 *     <partition>/<user_id>/<listing_id>/<photo_id>/<variant>.<ext>
 *
 * so moving a partition to another provider is a copy of one prefix and a
 * configuration change, never a migration of the database. The database stores
 * `{ partition, key }` per variant and NEVER a URL (anti-pattern): a URL is a
 * rendering of the target, computed by `publicUrl` at read time.
 *
 * TWO PROVIDERS. `supabase` (today's default, the private `listing-photos`
 * bucket written by the service client) and `r2` (Cloudflare R2 through its S3
 * API, signed in-house with AWS SigV4 — WebCrypto only, no SDK, no dependency).
 * Every environment name is read INSIDE the call, never at module scope and
 * never through `VITE_` (F1).
 *
 * NOTE — the bucket's owner-read policy keys on `(storage.foldername(name))[1]
 * = auth.uid()`, which the partition-first key law no longer satisfies. That is
 * deliberate and harmless: the route writes and deletes as the service role, and
 * public reads are governed by the `exif_stripped AND status = 'active'` policy
 * that matches on the stored path, not on the prefix.
 */

export type Partition = "default";

export type MediaProvider = "supabase" | "r2";

export interface StorageTarget {
  provider: MediaProvider;
  bucket: string;
  publicBase: string;
}

export interface ObjectRef {
  partition: Partition;
  key: string;
}

function serverEnv(name: string): string {
  return process.env[name] ?? "";
}

export function storageTargetFor(partition: Partition): StorageTarget {
  const provider = serverEnv("MEDIA_PROVIDER").trim() === "r2" ? "r2" : "supabase";
  if (provider === "r2") {
    return {
      provider,
      bucket: serverEnv("R2_BUCKET").trim() || "listing-photos",
      publicBase: serverEnv("R2_PUBLIC_BASE").trim(),
    };
  }
  return {
    provider,
    bucket: serverEnv("MEDIA_BUCKET").trim() || "listing-photos",
    publicBase:
      serverEnv("MEDIA_PUBLIC_BASE").trim() ||
      `${serverEnv("SUPABASE_URL").replace(/\/$/, "")}/storage/v1/object/public/${
        serverEnv("MEDIA_BUCKET").trim() || "listing-photos"
      }`,
  };
  // `partition` is the key's first segment, not a separate target — yet. When a
  // second partition arrives it selects its own env prefix here.
}

export function objectKey(
  partition: Partition,
  userId: string,
  listingId: string,
  photoId: string,
  variant: string,
  ext: string,
): string {
  return `${partition}/${userId}/${listingId}/${photoId}/${variant}.${ext}`;
}

export function publicUrl(partition: Partition, key: string): string {
  const target = storageTargetFor(partition);
  return `${target.publicBase.replace(/\/$/, "")}/${key}`;
}

/* ------------------------------ AWS SigV4 (R2) ---------------------------- */

const encoder = new TextEncoder();

async function sha256Hex(bytes: Uint8Array | string): Promise<string> {
  const data = typeof bytes === "string" ? encoder.encode(bytes) : bytes;
  const digest = await crypto.subtle.digest("SHA-256", data as unknown as ArrayBuffer);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function hmac(key: Uint8Array, message: string): Promise<Uint8Array> {
  const imported = await crypto.subtle.importKey(
    "raw",
    key as unknown as ArrayBuffer,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    imported,
    encoder.encode(message) as unknown as ArrayBuffer,
  );
  return new Uint8Array(signature);
}

function hex(bytes: Uint8Array): string {
  return [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("");
}

/** One signed S3 request against R2. `auto` is R2's only region. */
async function r2Request(
  method: "PUT" | "DELETE",
  key: string,
  body: Uint8Array | null,
  contentType: string | null,
): Promise<Response> {
  const account = serverEnv("R2_ACCOUNT_ID").trim();
  const accessKey = serverEnv("R2_ACCESS_KEY_ID").trim();
  const secret = serverEnv("R2_SECRET_ACCESS_KEY").trim();
  const bucket = serverEnv("R2_BUCKET").trim() || "listing-photos";
  if (account === "" || accessKey === "" || secret === "") {
    throw new Error("r2 storage env missing");
  }

  const host = `${account}.r2.cloudflarestorage.com`;
  const path = `/${bucket}/${key.split("/").map(encodeURIComponent).join("/")}`;
  const now = new Date();
  const stamp = now.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const day = stamp.slice(0, 8);
  const payloadHash = await sha256Hex(body ?? "");

  const headers: Record<string, string> = {
    host,
    "x-amz-content-sha256": payloadHash,
    "x-amz-date": stamp,
  };
  if (contentType !== null) headers["content-type"] = contentType;

  const signedNames = Object.keys(headers).sort();
  const canonicalHeaders = signedNames.map((name) => `${name}:${headers[name]}\n`).join("");
  const signedHeaders = signedNames.join(";");
  const canonicalRequest = [
    method,
    path,
    "",
    canonicalHeaders,
    signedHeaders,
    payloadHash,
  ].join("\n");

  const scope = `${day}/auto/s3/aws4_request`;
  const stringToSign = [
    "AWS4-HMAC-SHA256",
    stamp,
    scope,
    await sha256Hex(canonicalRequest),
  ].join("\n");

  let signingKey = await hmac(encoder.encode(`AWS4${secret}`), day);
  signingKey = await hmac(signingKey, "auto");
  signingKey = await hmac(signingKey, "s3");
  signingKey = await hmac(signingKey, "aws4_request");
  const signature = hex(await hmac(signingKey, stringToSign));

  return await fetch(`https://${host}${path}`, {
    method,
    headers: {
      ...headers,
      Authorization: `AWS4-HMAC-SHA256 Credential=${accessKey}/${scope}, SignedHeaders=${signedHeaders}, Signature=${signature}`,
    },
    ...(body === null ? {} : { body: body as unknown as BodyInit }),
  });
}

/* -------------------------------- operations ------------------------------ */

type ServiceClient = SupabaseClient<Database>;

export async function putObject(
  service: ServiceClient,
  partition: Partition,
  key: string,
  bytes: Uint8Array,
  contentType: string,
): Promise<void> {
  const target = storageTargetFor(partition);
  if (target.provider === "r2") {
    const response = await r2Request("PUT", key, bytes, contentType);
    if (!response.ok) throw new Error(`r2 put ${key}: ${response.status}`);
    return;
  }
  const { error } = await service.storage
    .from(target.bucket)
    .upload(key, bytes as unknown as ArrayBuffer, { contentType, upsert: true });
  if (error) throw new Error(`storage put ${key}: ${error.message}`);
}

export async function deleteObject(
  service: ServiceClient,
  partition: Partition,
  key: string,
): Promise<void> {
  const target = storageTargetFor(partition);
  if (target.provider === "r2") {
    const response = await r2Request("DELETE", key, null, null);
    // 404 is success for a delete: the object is not there either way.
    if (!response.ok && response.status !== 404) {
      throw new Error(`r2 delete ${key}: ${response.status}`);
    }
    return;
  }
  const { error } = await service.storage.from(target.bucket).remove([key]);
  if (error) throw new Error(`storage delete ${key}: ${error.message}`);
}
