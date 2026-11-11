import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Housekeeping turn 3 (concern 5c, ruling 1 Q13) — THE ONE DERIVATION of a temporary backend config
 * variant: scripts/ci/backend-config.py. The `images` variant is the toml with TLS and the
 * before_user_created hook off and nothing else changed; a switch not found once fails loudly. The
 * backend-images job calls it and its cache key hashes it.
 */

const TOML = "scripts/ci/local-backend-config.toml";
const WORKFLOW = readFileSync(".github/workflows/local-backend-proof.yml", "utf8");

function derive(
  variant: string,
  source = TOML,
): { status: number | null; text: string; err: string } {
  const dir = mkdtempSync(join(tmpdir(), "backend-config-"));
  try {
    const out = join(dir, "config.toml");
    const result = spawnSync("python3", ["scripts/ci/backend-config.py", variant, out, source], {
      encoding: "utf8",
      timeout: 20_000,
    });
    let text = "";
    try {
      text = readFileSync(out, "utf8");
    } catch {
      text = "";
    }
    return { status: result.status, text, err: result.stderr };
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

describe("one derivation of the backend config (housekeeping turn 3)", () => {
  it("CF-BCFG-1 images: TLS and the hook off, every other line unchanged", () => {
    const source = readFileSync(TOML, "utf8").split("\n");
    const derived = derive("images");
    expect(derived.status, derived.err).toBe(0);
    const lines = derived.text.split("\n");
    expect(lines).toHaveLength(source.length);
    const changed = lines
      .map((line, index) => ({ line, before: source[index], index }))
      .filter(({ line, before }) => line !== before)
      .map(({ line, index }) => `${source[index - 1] ?? ""} → ${line}`);
    expect(changed).toEqual([
      "[api.tls] → enabled = false",
      "[auth.hook.before_user_created] → enabled = false",
    ]);
  });

  it("CF-BCFG-2 an unknown variant or a switch not found once fails; the images job calls it", () => {
    expect(derive("other").status).not.toBe(0);
    const dir = mkdtempSync(join(tmpdir(), "backend-config-"));
    try {
      const planted = join(dir, "planted.toml");
      writeFileSync(
        planted,
        "[api.tls]\nenabled = false\n[auth.hook.before_user_created]\nenabled = true\n",
      );
      const result = derive("images", planted);
      expect(result.status).not.toBe(0);
      expect(result.err).toContain("[api.tls] enabled = true found 0 times");
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
    expect(WORKFLOW).toContain(
      'python3 scripts/ci/backend-config.py images "$wc/supabase/config.toml"',
    );
    expect(WORKFLOW).toContain(
      "cat scripts/ci/local-backend-config.toml scripts/ci/backend-config.py",
    );
    expect(WORKFLOW).not.toContain("re.sub(r'(\\[api\\.tls\\]");
  });
});
