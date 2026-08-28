/**
 * DEC-019 / INC-088 — SERVE THE E2E BUILD ON NODE, NOT ON WORKERD.
 *
 * `wrangler dev` boots a pinned workerd binary, and nitro stamps the worker's
 * `compatibility_date` with the BUILD DAY. Any build made after the pinned
 * wrangler's release day therefore dies before the first request:
 *
 *   ✘ [ERROR] service core:user:ethio-marketplace: This Worker requires
 *     compatibility date "2026-08-28", but the newest date supported by this
 *     server binary is "2026-08-27".
 *
 * That is a runtime-class failure in wrangler/workerd — it is unrelated to the
 * application bundle, it cannot be fixed forward from our code, and it turns
 * every E2E job red on a calendar boundary. So the per-push suite serves the
 * SAME built application through nitro's `node-server` preset, and the nightly
 * `cloudflare-parity` job keeps one wrangler-served smoke so a genuine
 * workerd-only regression still has a tripwire.
 *
 * The entry is nitro's node-server output. It listens on PORT/HOST; this
 * wrapper only translates the `--port` flag Playwright's webServer command
 * passes and fails LOUDLY (never silently) when the artifact is missing.
 */
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";

const ENTRY = path.resolve("dist/server/index.mjs");
const HOST = "127.0.0.1";

function readPort(argv: string[]): string {
  const flag = argv.indexOf("--port");
  if (flag !== -1 && argv[flag + 1]) return String(argv[flag + 1]);
  const inline = argv.find((arg) => arg.startsWith("--port="));
  if (inline) return inline.slice("--port=".length);
  return process.env["E2E_PORT"] ?? "4173";
}

if (!existsSync(ENTRY)) {
  // INC-085e's lesson: a missing artifact must name itself, not ENOENT later.
  console.error(
    `[serve:e2e:built] missing ${ENTRY} — the e2e build did not emit the ` +
      `node-server entry (nitro preset drift). Run: bun run build:e2e`,
  );
  process.exit(1);
}

const port = readPort(process.argv.slice(2));
const child = spawn(process.execPath, [ENTRY], {
  stdio: "inherit",
  env: { ...process.env, PORT: port, HOST, NITRO_PORT: port, NITRO_HOST: HOST },
});

const stop = (signal: NodeJS.Signals) => () => child.kill(signal);
process.on("SIGINT", stop("SIGINT"));
process.on("SIGTERM", stop("SIGTERM"));
child.on("exit", (code, signal) => {
  process.exit(signal ? 1 : (code ?? 0));
});
