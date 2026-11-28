import type { TablesInsert } from "../../src/integrations/supabase/types";
import { chunkByLength } from "./chunk-by-length";
import { SCRATCH_PREFIXES } from "./scratch";
import { adminClient } from "./users";

/**
 * CURSOR BUNDLE 8c-2a, PART C (INC-1334, G41) — THE SCRATCH LEGAL CHAIN, ONE HELPER (J1, J3).
 * Nine files seeded and destroyed `legal_documents` → `legal_versions` → `legal_acceptances` /
 * `legal_notices` each in its own words, and their destroys differed (one removed no notices).
 * The keys are RESTRICT (versions → document; acceptances and notices → version), so the order of
 * a removal is the law: acceptances and notices of the versions, then the versions, then the
 * documents.
 *
 *   seedLegalDocument / seedLegalVersion  the service client's direct writes (J3);
 *   destroyLegalKind / destroyLegalChain  the throwing removals, each delete naming its phase;
 *   deleteLegalVersions                   the bare delete of scratch versions, answered as the
 *                                         client answers it (a door test's subject, LG-3).
 *
 * J1: a kind carries the scratch prefix (`SCRATCH_PREFIXES.dash`, e2e/helpers/scratch.ts). Every
 * seed and every removal refuses a kind without it — so a test can never edit or remove a real
 * legal document — and the shard-1 setup's sweep (e2e/global-setup.ts) removes a dead run's
 * documents through `destroyLegalChain`. Acceptances a test makes as its subject stay in the test;
 * the removal takes them by version. Deletes of acceptances by user (the pool's reset,
 * e2e/helpers/users.ts) are not the chain. scripts/conformance/e2e-helpers.test.ts CF-HELPERS-14
 * holds every other file off these tables.
 */

type Failure = { message: string } | null;

export type LegalVersionSeed = TablesInsert<"legal_versions">;

function failed(scope: string, error: Failure, phase: string): void {
  if (error) throw new Error(`[e2e:${scope}] ${phase}: ${error.message}`);
}

function refuseKind(scope: string, kind: string): never {
  throw new Error(
    `[e2e:${scope}] the legal kind ${JSON.stringify(kind)} lacks the scratch prefix ${JSON.stringify(SCRATCH_PREFIXES.dash)}: no test seeds or removes a real document`,
  );
}

/** The kind, or a refusal: a scratch kind starts with the scratch prefix (J1). */
export function scratchLegalKind(scope: string, kind: string): string {
  if (!kind.startsWith(SCRATCH_PREFIXES.dash)) refuseKind(scope, kind);
  return kind;
}

/** A scratch document with no version yet; answers its id. */
export async function seedLegalDocument(
  scope: string,
  kind: string,
  countryCode: string | null,
): Promise<string> {
  scratchLegalKind(scope, kind);
  const doc = await adminClient()
    .from("legal_documents")
    .insert({ kind, country_code: countryCode })
    .select("id")
    .single();
  failed(scope, doc.error, "seed document");
  if (!doc.data) throw new Error(`[e2e:${scope}] document not seeded`);
  return doc.data.id;
}

/** One version row of a scratch document, as the test gives it; answers its id and label. */
export async function seedLegalVersion(
  scope: string,
  row: LegalVersionSeed,
): Promise<{ id: string; label: string }> {
  await refuseRealDocuments(scope, [row.document_id], []);
  const version = await adminClient()
    .from("legal_versions")
    .insert(row)
    .select("id, label")
    .single();
  failed(scope, version.error, "seed version");
  if (!version.data) throw new Error(`[e2e:${scope}] version not seeded`);
  return version.data;
}

/** Throws unless every document these ids reach (directly, or by their versions) is a scratch one. */
async function refuseRealDocuments(
  scope: string,
  documentIds: string[],
  versionIds: string[],
): Promise<void> {
  const client = adminClient();
  const reached = new Set(documentIds);
  for (const batch of chunkByLength(versionIds)) {
    const owners = await client.from("legal_versions").select("document_id").in("id", batch);
    failed(scope, owners.error, "cleanup version owners read");
    for (const owner of owners.data ?? []) reached.add(owner.document_id);
  }
  for (const batch of chunkByLength([...reached])) {
    const docs = await client.from("legal_documents").select("kind").in("id", batch);
    failed(scope, docs.error, "cleanup document kinds read");
    for (const doc of docs.data ?? []) scratchLegalKind(scope, doc.kind);
  }
}

/**
 * The bare delete of scratch versions, answered as the client answers it: LG-3 proves the service
 * role's cleanup of a published scratch row is allowed. A version of a real document is refused.
 */
export async function deleteLegalVersions(scope: string, versionIds: string[]) {
  await refuseRealDocuments(scope, [], versionIds);
  return adminClient().from("legal_versions").delete().in("id", versionIds);
}

/**
 * Removes scratch versions and documents in the one safe order (the keys are RESTRICT): the
 * acceptances and notices of every version (the listed ones and every version of the listed
 * documents), the versions, the documents. Each delete throws, naming its phase. Idempotent: an
 * id already gone removes nothing.
 */
export async function destroyLegalChain(
  scope: string,
  ids: { documentIds?: string[]; versionIds?: string[] },
): Promise<void> {
  const documentIds = [...new Set(ids.documentIds ?? [])];
  const listed = [...new Set(ids.versionIds ?? [])];
  const client = adminClient();
  await refuseRealDocuments(scope, documentIds, listed);
  const versionIds = new Set(listed);
  for (const batch of chunkByLength(documentIds)) {
    const found = await client.from("legal_versions").select("id").in("document_id", batch);
    failed(scope, found.error, "cleanup versions read");
    for (const row of found.data ?? []) versionIds.add(row.id);
  }
  for (const batch of chunkByLength([...versionIds])) {
    failed(
      scope,
      (await client.from("legal_acceptances").delete().in("version_id", batch)).error,
      "cleanup acceptances",
    );
    failed(
      scope,
      (await client.from("legal_notices").delete().in("version_id", batch)).error,
      "cleanup notices",
    );
    failed(
      scope,
      (await client.from("legal_versions").delete().in("id", batch)).error,
      "cleanup versions",
    );
  }
  for (const batch of chunkByLength(documentIds))
    failed(
      scope,
      (await client.from("legal_documents").delete().in("id", batch)).error,
      "cleanup documents",
    );
}

/** Removes every document of a scratch kind, with its chain (a kind with no document removes nothing). */
export async function destroyLegalKind(scope: string, kind: string): Promise<void> {
  scratchLegalKind(scope, kind);
  const docs = await adminClient().from("legal_documents").select("id").eq("kind", kind);
  failed(scope, docs.error, "cleanup documents read");
  await destroyLegalChain(scope, { documentIds: (docs.data ?? []).map((doc) => doc.id) });
}
