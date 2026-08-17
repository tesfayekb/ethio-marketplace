import { existsSync, readFileSync, rmSync } from "node:fs";

import { adminClient, processId, STATE_FILE, type E2EUser } from "./global-setup";

const NAMESPACE = "@ethio-e2e.invalid";
const STALE_MAX_AGE_MS = 24 * 60 * 60 * 1000;

type ListedUser = { id: string; email?: string; created_at?: string };

async function listAll(supabase: ReturnType<typeof adminClient>): Promise<ListedUser[]> {
  const all: ListedUser[] = [];
  for (let page = 1; page <= 50; page += 1) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage: 200 });
    if (error) throw new Error(`[e2e:teardown] listUsers page ${page} failed: ${error.message}`);
    const users = data?.users ?? [];
    all.push(...users.map((u) => ({ id: u.id, email: u.email, created_at: u.created_at })));
    if (users.length < 200) break;
  }
  return all;
}

function inNamespace(email: string | undefined): email is string {
  return Boolean(email && email.startsWith("e2e+") && email.endsWith(NAMESPACE));
}

/** A fixture belongs to this process iff its local part carries the process id. */
function ownedBy(email: string | undefined, id: string): email is string {
  return inNamespace(email) && email.includes(`+${id}-`);
}

/**
 * INC-080: parallel shards share GITHUB_RUN_ID, so a namespace-wide sweep here
 * deleted sibling shards' fixtures mid-run. Teardown now deletes ONLY the users
 * minted by THIS process; stale orphans are reaped by the nightly sweep below.
 */
export default async function globalTeardown() {
  const persisted = existsSync(STATE_FILE)
    ? ((JSON.parse(readFileSync(STATE_FILE, "utf8")) as E2EUser).processId ?? "")
    : "";
  const currentProcessId = persisted || processId();
  const supabase = adminClient();

  const users = await listAll(supabase);
  const targets = users.filter((u) => ownedBy(u.email, currentProcessId));

  let deleted = 0;
  for (const user of targets) {
    // Hard rule: never delete anything outside the reserved namespace.
    if (!inNamespace(user.email)) {
      throw new Error(`[e2e:teardown] refusing to delete out-of-namespace user ${user.id}`);
    }
    const { error } = await supabase.auth.admin.deleteUser(user.id);
    if (error) throw new Error(`[e2e:teardown] failed to delete ${user.id}: ${error.message}`);
    deleted += 1;
  }

  const remaining = (await listAll(supabase)).filter((u) => ownedBy(u.email, currentProcessId));
  if (remaining.length > 0) {
    throw new Error(
      `[e2e:teardown] ${remaining.length} user(s) from process ${currentProcessId} survived teardown.`,
    );
  }

  console.log(`[e2e:teardown] deleted ${deleted} user(s) owned by process ${currentProcessId}`);
  rmSync(STATE_FILE, { force: true });
}

/**
 * NIGHTLY ONLY (single-process job). The one place a namespace-wide delete is
 * allowed: reaps @ethio-e2e.invalid users older than 24h left behind by
 * crashed runs. Standing proof fixtures live on other domains and are excluded
 * by the namespace check, which is asserted per user before every delete.
 */
export async function sweepStaleUsers(): Promise<number> {
  const supabase = adminClient();
  const users = await listAll(supabase);
  const cutoff = Date.now() - STALE_MAX_AGE_MS;
  const targets = users.filter((u) => {
    if (!inNamespace(u.email)) return false;
    const createdAt = u.created_at ? Date.parse(u.created_at) : Number.NaN;
    return Number.isFinite(createdAt) && createdAt < cutoff;
  });

  let deleted = 0;
  for (const user of targets) {
    if (!inNamespace(user.email)) {
      throw new Error(`[e2e:sweep] refusing to delete out-of-namespace user ${user.id}`);
    }
    const { error } = await supabase.auth.admin.deleteUser(user.id);
    if (error) throw new Error(`[e2e:sweep] failed to delete ${user.id}: ${error.message}`);
    deleted += 1;
  }

  console.log(`[e2e:sweep] deleted ${deleted} stale user(s) in ${NAMESPACE} older than 24h`);
  return deleted;
}
