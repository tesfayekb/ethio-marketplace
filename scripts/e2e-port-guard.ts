/**
 * TR-24/TR-26 (local runs) — THE PORT IS NEVER SHARED.
 *
 * A stale server left on 4173 from an earlier session answers with the ENV IT
 * WAS STARTED WITH, so `E2E_FAKE_TRANSLATE=1` never reached the served build
 * and the ⟪am⟫ fake answers were real 401s from the translate gateway. The
 * local lane now refuses to start when the port is occupied: it prints the
 * listener PID and exits 1, and playwright.config passes
 * reuseExistingServer=false for the local run so Playwright can never adopt a
 * foreign server either.
 */
import { spawnSync } from "node:child_process";
import { createServer } from "node:net";

const PORT = Number(process.env["E2E_PORT"] ?? 4173);

function listenerPids(port: number): string[] {
  for (const cmd of [
    ["lsof", ["-t", `-i:${port}`, "-sTCP:LISTEN"]],
    ["fuser", [`${port}/tcp`]],
  ] as const) {
    const result = spawnSync(cmd[0], [...cmd[1]], { encoding: "utf8" });
    if (result.status === 0 && result.stdout.trim()) {
      return result.stdout.trim().split(/\s+/);
    }
  }
  return [];
}

await new Promise<void>((resolve) => {
  const probe = createServer();
  probe.once("error", (error: NodeJS.ErrnoException) => {
    if (error.code !== "EADDRINUSE") {
      console.error(`[e2e:port-guard] probe failed on ${PORT}: ${error.message}`);
      process.exit(1);
    }
    const pids = listenerPids(PORT);
    console.error(
      `[e2e:port-guard] TCP ${PORT} is already occupied` +
        (pids.length ? ` by PID(s): ${pids.join(", ")}` : " (listener PID unavailable)") +
        `. A stale server answers with a stale env (E2E_FAKE_TRANSLATE would not reach the ` +
        `served build). Kill it, then rerun.`,
    );
    process.exit(1);
  });
  probe.once("listening", () => probe.close(() => resolve()));
  probe.listen(PORT, "127.0.0.1");
});

console.log(`[e2e:port-guard] TCP ${PORT} is free`);
