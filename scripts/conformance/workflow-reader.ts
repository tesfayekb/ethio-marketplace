/**
 * The one workflow reader (K1): a workflow's jobs and their steps, read by indentation. Read by
 * CF-CID-1 (ci-deadlines.test.ts) and CF-CI-IMG-1 (ci-images.test.ts, DEC-309).
 */
export type Step = { line: number; text: string; timeout: boolean };
export type Job = {
  file: string;
  id: string;
  line: number;
  callsWorkflow: boolean;
  timeout: boolean;
  steps: Step[];
};

/** A workflow's jobs and their steps, read by indentation (two spaces a level, as every workflow here is written). */
export function readWorkflow(file: string, text: string): Job[] {
  const lines = text.split("\n");
  const jobs: Job[] = [];
  const start = lines.indexOf("jobs:");
  if (start < 0) return jobs;
  let job: Job | null = null;
  let step: Step | null = null;
  for (let index = start + 1; index < lines.length; index += 1) {
    const text = lines[index] ?? "";
    if (/^\S/.test(text)) break;
    const head = /^ {2}([A-Za-z0-9_-]+):\s*$/.exec(text);
    if (head) {
      job = {
        file,
        id: head[1] ?? "",
        line: index + 1,
        callsWorkflow: false,
        timeout: false,
        steps: [],
      };
      jobs.push(job);
      step = null;
      continue;
    }
    if (job === null) continue;
    if (/^ {4}timeout-minutes:\s*\d+\s*$/.test(text)) job.timeout = true;
    if (/^ {4}uses:\s*\S/.test(text)) job.callsWorkflow = true;
    if (/^ {6}- /.test(text)) {
      step = { line: index + 1, text: `${text}\n`, timeout: false };
      job.steps.push(step);
      continue;
    }
    if (/^ {0,5}\S/.test(text)) {
      step = null;
      continue;
    }
    if (step === null) continue;
    step.text += `${text}\n`;
    if (/^ {8}timeout-minutes:\s*\d+\s*$/.test(text)) step.timeout = true;
  }
  return jobs;
}
