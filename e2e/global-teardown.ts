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
 *
 * DEC-059 (INC-189): teardown NEVER reds a green shard. Run 34741970648 shard 6
 * passed 75 tests, skipped 10, failed 0 — and exited 1 because one
 * `admin.deleteUser` answered `fetch failed`. A transient network fault in
 * cleanup is not a verdict on the suite, so every reap fault is reported as a
 * `[e2e:teardown]` WARNING line (the reporter's post-test band quotes them) and
 * the leftover rows are reaped by the nightly sweep. The ONE hard refusal that
 * remains is the safety rule: an out-of-namespace user is never deleted, and
 * that attempt still throws.
 */
export default async function globalTeardown() {
  const persisted = existsSync(STATE_FILE)
    ? ((JSON.parse(readFileSync(STATE_FILE, "utf8")) as E2EUser).processId ?? "")
    : "";
  const currentProcessId = persisted || processId();
  const supabase = adminClient();

  let users: ListedUser[] = [];
  try {
    users = await listAll(supabase);
  } catch (error) {
    console.warn(
      `[e2e:teardown] WARNING could not list users for process ${currentProcessId}: ${
        error instanceof Error ? error.message : String(error)
      } — the nightly sweep will reap them.`,
    );
    rmSync(STATE_FILE, { force: true });
    return;
  }
  const targets = users.filter((u) => ownedBy(u.email, currentProcessId));

  let deleted = 0;
  const faults: string[] = [];
  for (const user of targets) {
    // Hard rule: never delete anything outside the reserved namespace.
    if (!inNamespace(user.email)) {
      throw new Error(`[e2e:teardown] refusing to delete out-of-namespace user ${user.id}`);
    }
    try {
      const { error } = await supabase.auth.admin.deleteUser(user.id);
      if (error) throw new Error(error.message);
      deleted += 1;
    } catch (error) {
      faults.push(`${user.id}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  for (const fault of faults) {
    console.warn(
      `[e2e:teardown] WARNING failed to delete ${fault} — deferred to the nightly sweep`,
    );
  }

  console.log(
    `[e2e:teardown] deleted ${deleted} user(s) owned by process ${currentProcessId}` +
      (faults.length > 0 ? `, ${faults.length} deferred to the nightly sweep` : ""),
  );
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
