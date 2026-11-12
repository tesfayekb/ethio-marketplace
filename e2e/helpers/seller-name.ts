import { asPerson } from "./door-callers";
import { doorAnswer } from "./door-answer";
import { adminClient } from "./users";

/**
 * N1b-2c / N1b-3c (INC-977) — the two moves every seller-name spec makes: the
 * seller saves its own name through the real door (an 'unchecked' check row, the
 * door's own write), and a hold or its release is made only through the service
 * door name_check_mark (R7) — nothing is written to name_checks by hand.
 */
/** The seller's own door call, signed in from node. */
export async function saveOwnAlias(person: { email: string; password: string }, alias: string) {
  const saved = await (await asPerson(person)).rpc("save_posting_identity", { p_alias: alias });
  doorAnswer(saved, "[e2e:snh] saving the scratch name");
}

export async function markName(
  profileId: string,
  text: string,
  state: "clean" | "imitates" | "unusable",
  of?: string,
) {
  const { data, error } = await adminClient().rpc("name_check_mark", {
    p_profile: profileId,
    p_subject: "alias",
    p_text: text,
    p_state: state,
    ...(of === undefined ? {} : { p_of: of }),
  });
  if (error || data !== true)
    throw new Error(`[e2e:snh] name_check_mark ${state} failed: ${error?.message ?? "no row"}`);
}

/** DB truth (J4): the scratch seller's check row, read through the service client. */
export async function readNameCheck(profileId: string) {
  const { data, error } = await adminClient()
    .from("name_checks")
    .select("state, checked_text, imitates_of")
    .eq("profile_id", profileId)
    .eq("subject", "alias")
    .maybeSingle();
  if (error) throw new Error(`[e2e:snh] name_checks read failed: ${error.message}`);
  return data;
}

/** afterEach: a hold made by the test never outlives it, whatever the name became (J3). */
export async function releaseHold(profileId: string) {
  const row = await readNameCheck(profileId);
  if (row?.state === "imitates" || row?.state === "needs_review")
    await markName(profileId, row.checked_text, "clean");
}
