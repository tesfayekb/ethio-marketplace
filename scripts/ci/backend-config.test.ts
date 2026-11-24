import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Housekeeping turn 3 (concern 5c, ruling 1 Q13) — THE ONE DERIVATION of a temporary backend config
 * variant: scripts/ci/backend-config.py. The `images` variant is the toml with TLS, the
 * before_user_created hook and the six account-change notices (DEC-437) off, the three action-email template tables (INC-1276)
 * dropped, and nothing else changed; a switch or a table not found once fails loudly. The
 * backend-images job calls it and its cache key hashes it.
 */

const TOML = "scripts/ci/local-backend-config.toml";
/** A template table: its header to the blank line that ends it (the same shape backend-config.py reads). */
const TEMPLATE_TABLE = /^\[auth\.email\.template\.\w+\]\n(?:[^\n[][^\n]*\n)*\n?/gm;
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
  it("CF-BCFG-1 images: TLS, the hook and the six notices off, every other line unchanged", () => {
    // The three template tables are dropped (BCFG-3); what is left is compared line by line.
    const source = readFileSync(TOML, "utf8").replace(TEMPLATE_TABLE, "").split("\n");
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
      "[auth.email.notification.password_changed] → enabled = false",
      "[auth.email.notification.email_changed] → enabled = false",
      "[auth.email.notification.identity_linked] → enabled = false",
      "[auth.email.notification.identity_unlinked] → enabled = false",
      "[auth.email.notification.mfa_factor_enrolled] → enabled = false",
      "[auth.email.notification.mfa_factor_unenrolled] → enabled = false",
      "[auth.hook.before_user_created] → enabled = false",
    ]);
  });

  it("CF-BCFG-3 images drops the three action-email template tables and no other; a table missing fails loudly", () => {
    const source = readFileSync(TOML, "utf8");
    const dropped = [...source.matchAll(TEMPLATE_TABLE)].map(
      (match) => /^\[(.+)\]/.exec(match[0])?.[1],
    );
    expect(dropped).toEqual([
      "auth.email.template.confirmation",
      "auth.email.template.recovery",
      "auth.email.template.email_change",
    ]);
    const derived = derive("images");
    expect(derived.status, derived.err).toBe(0);
    expect(derived.text).not.toContain("[auth.email.template.");
    expect(derived.text).toContain("[auth.email.notification.password_changed]");
    const dir = mkdtempSync(join(tmpdir(), "backend-config-"));
    try {
      const planted = join(dir, "planted.toml");
      // The real file with one table taken out: the derivation names the table it did not find.
      writeFileSync(
        planted,
        source.replace(/^\[auth\.email\.template\.recovery\]\n(?:[^\n[][^\n]*\n)*\n?/m, ""),
      );
      const result = derive("images", planted);
      expect(result.status).not.toBe(0);
      expect(result.err).toContain("[auth.email.template.recovery] found 0 times");
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
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
