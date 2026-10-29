/**
 * N1b-1 (INC-977/INC-981, S4 + S5's CI halves) — WHO CAN CALL OUT, AND IS net EXPOSED.
 *
 * S4: the catalogue (TSV: `fn <TAB> calls_net`) lists every function outside
 * the extension's own schema whose body names a `net.` function. Only
 * public.job_call(text) may; it must be present (an empty census fails).
 *
 * S5: a config text's [api] `schemas` must hold neither `net` nor `extensions`,
 * and its `extra_search_path` must not hold `net`. `extensions` in
 * extra_search_path stays: it is the platform's default and governs name
 * lookup, not exposure (stop 7 ruling 2). The live half (a REST request with
 * Accept-Profile: net refused with PGRST106) runs in the workflow step.
 */
import { readFileSync } from "node:fs";

const ALLOWED = "public.job_call(text)";

export function inspect(catalogue: string, config: string): string[] {
  const failures: string[] = [];
  let sawAllowed = false;
  for (const line of catalogue.split(/\r?\n/).filter((l) => l.trim())) {
    const [fn, calls, extra] = line.split("\t");
    if (!fn || !["t", "f"].includes(calls ?? "") || extra !== undefined) {
      failures.push(`${fn ?? "catalogue"}: malformed catalogue row`);
      continue;
    }
    if (calls !== "t") continue;
    if (fn === ALLOWED) sawAllowed = true;
    else failures.push(`${fn}: calls net.* outside job_call`);
  }
  if (!sawAllowed) failures.push(`${ALLOWED}: absent from the census`);

  const api = /^\[api\]\s*$([\s\S]*?)(?=^\[)/m.exec(`${config}\n[end]`)?.[1] ?? "";
  const list = (key: string): string[] => {
    const m = new RegExp(`^\\s*${key}\\s*=\\s*\\[([^\\]]*)\\]`, "m").exec(api);
    return m ? [...(m[1] ?? "").matchAll(/"([^"]*)"/g)].map((x) => x[1] ?? "") : [];
  };
  for (const s of list("schemas"))
    if (s === "net" || s === "extensions") failures.push(`[api] schemas exposes ${s}`);
  if (list("extra_search_path").includes("net"))
    failures.push("[api] extra_search_path holds net");
  return failures;
}

if (process.env["SELF_TEST"] === "1") {
  const [catalogue, config] = readFileSync("scripts/fixtures/outbound-calls-bad.txt", "utf8").split(
    /\r?\n----\r?\n/,
  );
  const f = inspect(catalogue ?? "", config ?? "");
  const want = [
    "public.e2e_planted_caller(): calls net.* outside job_call",
    "[api] schemas exposes net",
    "[api] extra_search_path holds net",
  ];
  if (!want.every((w) => f.includes(w))) {
    console.error("Outbound-calls self-test FAILED: not every planted case refused");
    process.exit(1);
  }
  console.log("Outbound-calls self-test OK: the planted caller and both exposures refused");
} else {
  const [catalogue, config] = process.argv.slice(2);
  if (!catalogue || !config) throw new Error("usage: check-outbound-calls.ts <catalogue.tsv> <config.toml>");
  const failures = inspect(readFileSync(catalogue, "utf8"), readFileSync(config, "utf8"));
  if (failures.length) {
    for (const line of failures) console.error(`Outbound-calls guard FAIL: ${line}`);
    process.exit(1);
  }
  console.log("Outbound-calls guard OK: only public.job_call calls net.*; net is not exposed");
}
