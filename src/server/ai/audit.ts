export type AiAuditRow = {
  feature: string;
  task: string;
  taskVersion: number;
  model: string;
  actorId: string | null;
  inputHash: string;
  outcome: string;
  providerStatus: number | null;
  latencyMs: number;
  fake: boolean;
};

/**
 * Awaited before returning a verdict. Answers whether the row was written (F4: a failure is
 * logged here); the gateway turns a failure into `unavailable` for a task that judges a person
 * (INC-952, DEC-280) and leaves every other answer as it was (best-effort).
 */
export async function recordAiCall(
  row: AiAuditRow,
  log: (message: string) => void,
): Promise<boolean> {
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.rpc("ai_record_call", {
      p_feature: row.feature,
      p_task: row.task,
      p_task_version: row.taskVersion,
      p_model: row.model,
      p_input_hash: row.inputHash,
      p_outcome: row.outcome,
      p_latency_ms: row.latencyMs,
      p_fake: row.fake,
      ...(row.actorId === null ? {} : { p_actor: row.actorId }),
      ...(row.providerStatus === null ? {} : { p_provider_status: row.providerStatus }),
    });
    if (error) {
      log(`ai audit ${row.task} ${row.outcome}: write failed`);
      return false;
    }
    return true;
  } catch {
    log(`ai audit ${row.task} ${row.outcome}: write failed`);
    return false;
  }
}
