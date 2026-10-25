export type AiAuditRow = {
  feature: string; task: string; taskVersion: number; model: string; actorId: string | null;
  inputHash: string; outcome: string; providerStatus: number | null; latencyMs: number; fake: boolean;
};

/** Awaited before returning a verdict; audit failure never changes a billed answer. */
export async function recordAiCall(row: AiAuditRow, log: (message: string) => void): Promise<void> {
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
    if (error) log(`ai audit ${row.task} ${row.outcome}: write failed`);
  } catch {
    log(`ai audit ${row.task} ${row.outcome}: write failed`);
  }
}